import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

/**
 * Offline tests for the service worker.
 *
 * The worker used to precache seven URLs and leave everything else to runtime
 * caching, which meant a visitor who lost connection got the shell and a page
 * full of missing textures, fonts and images. These tests pull the network out
 * from under a warmed browser and check the site is still the site.
 *
 * They run in their own Playwright project because every other spec blocks
 * service workers on purpose — see playwright.config.js.
 */

const CACHE_PREFIX = "hc-precache-";

/** Read the precache manifest the build wrote into dist/sw.js. */
async function readManifest(request) {
  const response = await request.get("/sw.js");
  expect(response.ok(), "sw.js should be served").toBe(true);

  const source = await response.text();
  const match = source.match(
    /\/\* precache:start \*\/\s*const PRECACHE_MANIFEST = ([\s\S]*?);\s*\/\* precache:end \*\//
  );
  expect(match, "sw.js must carry a generated precache manifest").not.toBeNull();

  const manifest = JSON.parse(match[1]);
  expect(
    manifest.version,
    "generate-precache.mjs did not run — sw.js still holds the placeholder"
  ).not.toBe("dev");
  return manifest;
}

/** Load the site and wait for the background warm to finish. */
async function warmUp(page) {
  await page.goto("/");
  await page.waitForFunction(() => window.__precacheComplete, null, { timeout: 120_000 });
}

/** Everything the worker currently holds, as pathnames. */
function cachedPaths(page) {
  return page.evaluate(async (prefix) => {
    const name = (await caches.keys()).find((key) => key.startsWith(prefix));
    if (!name) return [];
    const cache = await caches.open(name);
    const keys = await cache.keys();
    return keys.map((request) => new URL(request.url).pathname);
  }, CACHE_PREFIX);
}

test.describe("offline", () => {
  test.slow();

  test("every file in the manifest is cached after the warm", async ({ page, request }) => {
    const manifest = await readManifest(request);
    await warmUp(page);

    const cached = new Set(await cachedPaths(page));
    const expected = [...manifest.shell, ...manifest.bulk].map(([url]) => url);
    const missing = expected.filter((url) => !cached.has(url));

    expect(missing, "the warm must cache the whole manifest").toEqual([]);
    // The shipped asset set is ~111 files. A manifest that collapses to a
    // handful means the generator's walk or filters broke, which would pass
    // every other assertion here while quietly removing offline support.
    expect(expected.length, "manifest should cover the whole site").toBeGreaterThan(90);
  });

  test("the site loads and runs the 3D intro with the network unplugged", async ({
    page,
    context,
  }) => {
    await warmUp(page);
    await context.setOffline(true);

    const failed = [];
    page.on("requestfailed", (r) => {
      // The worker pings /sw.js for an update on every load. Offline, that
      // failing is correct behaviour, not a broken asset.
      if (!new URL(r.url()).pathname.startsWith("/sw.js")) failed.push(r.url());
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.reload();

    // The real document, not the offline fallback card.
    await expect(page.locator("#intro-layer")).toBeAttached();
    expect(await page.locator("h1").count()).toBe(1);

    // The intro cannot reach "grab" without the engine bundle and the hand
    // texture, so this single poll proves /assets/, /webgl/textures/ and the
    // fonts they depend on all came out of the cache.
    await expect
      .poll(
        async () => {
          await page.mouse.move(1380, 414);
          await page.mouse.move(1360, 414);
          return page.evaluate(() => document.body.style.cursor);
        },
        { message: "3D intro never became interactive offline", timeout: 60_000 }
      )
      .toBe("grab");

    expect(failed, "no asset should fail to load offline").toEqual([]);
    expect(errors, "no page errors offline").toEqual([]);
  });

  test("images and fonts are served from the cache offline", async ({ page, context }) => {
    await warmUp(page);
    await context.setOffline(true);
    await page.reload();

    // Fetched through the page, so they go through the worker exactly as the
    // document's own subresource requests do.
    const results = await page.evaluate(async () => {
      const urls = [
        "/images/velsaro.webp",
        "/images/media/tex-phone-close.webp",
        "/fonts/PPEditorialNew-Regular.woff2",
        "/webgl/textures/hand/tex_hand.webp",
        "/resume.pdf",
        "/scripts/pdf.worker.min.mjs",
        "/site.webmanifest",
      ];
      const out = {};
      for (const url of urls) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          out[url] = response.ok && blob.size > 0 ? blob.size : `empty (${response.status})`;
        } catch (error) {
          out[url] = `failed: ${error}`;
        }
      }
      return out;
    });

    for (const [url, result] of Object.entries(results)) {
      expect(typeof result, `${url} should come back from the cache offline`).toBe("number");
    }
  });

  test("navigating straight to a file offline returns the file, not the document", async ({
    page,
    context,
  }) => {
    // The resume dock's PDF and DOCX links are downloads, which reach the
    // worker as navigations. Treating every navigation as "serve the cached
    // document" handed back index.html renamed to Harshit_Chauhan_Resume.pdf.
    await warmUp(page);
    await context.setOffline(true);

    for (const [path, signature] of [
      ["/resume.pdf", "%PDF"],
      ["/Harshit_Resume.docx", "PK"],
    ]) {
      // Chromium turns both of these into downloads, so page.goto rejects with
      // "Download is starting" rather than returning a response. That it
      // downloads at all while offline is half the point; the magic bytes are
      // the other half, since a served index.html would start with "<".
      const started = page.waitForEvent("download");
      await page.goto(path).catch(() => {});
      const download = await started;

      const head = readFileSync(await download.path())
        .subarray(0, signature.length)
        .toString("latin1");
      expect(head, `${path} should come back as itself, not the document`).toBe(signature);
    }
  });

  test("a half-installed worker falls back to the offline card", async ({ page, context }) => {
    // offline.html only earns its place when the document itself is missing —
    // an install that was interrupted after the fallback was stored but before
    // the page was. Evicting just "/" reproduces that; dropping the whole cache
    // would take offline.html with it and prove nothing.
    await page.goto("/");
    await page.waitForFunction(() => window.__precacheComplete, null, { timeout: 120_000 });

    const evicted = await page.evaluate(async (prefix) => {
      const name = (await caches.keys()).find((key) => key.startsWith(prefix));
      const cache = await caches.open(name);
      return cache.delete("/");
    }, CACHE_PREFIX);
    expect(evicted, "the document should have been cached to begin with").toBe(true);

    await context.setOffline(true);
    await page.reload();

    await expect(page.locator("body")).toContainText(/offline/i);
  });
});
