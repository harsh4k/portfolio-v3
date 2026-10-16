import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

/**
 * The offline worker (public/sw.js). Each test warms a fresh browser, pulls the
 * network and checks the site is still the site. Desktop only: the worker does
 * not depend on the viewport, and a warm downloads the whole site.
 */

test.use({ serviceWorkers: "allow" });
test.skip(({ isMobile }) => isMobile, "desktop only");

const CACHE_PREFIX = "hc-precache-";

type Manifest = { version: string; shell: [string, string][]; bulk: [string, string][] };

function readManifest(): Manifest {
  const source = readFileSync(new URL("../../dist/sw.js", import.meta.url), "utf8");
  const match = /\/\* precache:start \*\/\s*const PRECACHE_MANIFEST = ([\s\S]*?);\s*\/\* precache:end \*\//.exec(
    source,
  );
  if (!match?.[1]) throw new Error("dist/sw.js must carry a precache manifest");
  const manifest = JSON.parse(match[1]) as Manifest;
  expect(manifest.version, "scripts/precache.ts did not run after the build").not.toBe("dev");
  return manifest;
}

/** Load the site and wait until the worker has cached everything. */
async function warmUp(page: Page, path = "/") {
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-offline-ready", "", { timeout: 120_000 });
}

/**
 * Cut the network. setOffline alone does not always reach the worker's own
 * fetches in Chromium, so every request that leaves the browser is aborted too.
 */
async function goOffline(context: BrowserContext) {
  await context.setOffline(true);
  await context.route("**/*", (route) => route.abort("internetdisconnected"));
}

function cachedPaths(page: Page) {
  return page.evaluate(async (prefix) => {
    const name = (await caches.keys()).find((key) => key.startsWith(prefix));
    if (!name) return [];
    const keys = await (await caches.open(name)).keys();
    return keys.map((request) => new URL(request.url).pathname);
  }, CACHE_PREFIX);
}

test.describe("offline", () => {
  test.slow();

  test("every file in the manifest is cached after the warm", async ({ page }) => {
    const manifest = readManifest();
    await warmUp(page);

    const cached = new Set(await cachedPaths(page));
    const expected = [...manifest.shell, ...manifest.bulk].map(([url]) => url);
    expect(expected.filter((url) => !cached.has(url))).toEqual([]);
    // Every page and the assets behind them. A handful would mean the walk broke.
    expect(expected.length).toBeGreaterThan(80);
    for (const page of ["/", "/404", "/work/getcited"]) expect(expected).toContain(page);
  });

  test("the home page loads with the network unplugged", async ({ page, context }) => {
    await warmUp(page);
    await goOffline(context);

    const failed: string[] = [];
    page.on("requestfailed", (request) => {
      // The browser checks /sw.js for updates; offline, that failing is correct.
      if (!new URL(request.url()).pathname.startsWith("/sw.js")) failed.push(request.url());
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.reload();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#work")).toBeAttached();

    // Fetched through the page, so they take the same path as its own requests.
    const sizes = await page.evaluate(async () => {
      const out: Record<string, number | string> = {};
      for (const url of [
        "/images/velsaro.webp",
        "/fonts/PPFraktionMono-Regular.woff2",
        "/resume.pdf",
        "/site.webmanifest",
      ]) {
        try {
          const response = await fetch(url);
          out[url] = response.ok ? (await response.blob()).size : `status ${response.status}`;
        } catch (error) {
          out[url] = String(error);
        }
      }
      return out;
    });
    for (const [url, size] of Object.entries(sizes)) expect(typeof size, `${url} offline: ${size}`).toBe("number");

    expect(failed).toEqual([]);
    expect(errors).toEqual([]);
  });

  test("project pages open offline, with or without the trailing slash", async ({ page, context }) => {
    await warmUp(page);
    await goOffline(context);
    for (const path of ["/work/getcited", "/work/getcited/", "/via/linkedin"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
    }
    await page.goto("/work/bunny-os");
    await expect(page.locator("h1")).toHaveText("Bunny OS");
  });

  test("a file link offline returns the file, not a page", async ({ page, context }) => {
    await warmUp(page);
    await goOffline(context);
    // Headless Chromium downloads the PDF: the bytes must be the PDF, since a
    // page served in its place starts with "<". Chromium with its PDF viewer
    // shows it instead, and the response type is what tells the two apart.
    const download = page.waitForEvent("download").then(async (file) =>
      readFileSync(await file.path())
        .subarray(0, 4)
        .toString("latin1"),
    );
    const shown = page
      .goto("/resume.pdf")
      .then((response) => response?.headers()["content-type"] ?? Promise.reject(new Error("no response")));
    expect(await Promise.any([download, shown])).toMatch(/^(%PDF|application\/pdf)$/);
  });

  test("online visitors get the live page, not the saved copy", async ({ page }) => {
    await warmUp(page);
    await page.evaluate(async (prefix) => {
      const name = (await caches.keys()).find((key) => key.startsWith(prefix));
      if (!name) throw new Error("no precache");
      await (
        await caches.open(name)
      ).put("/", new Response("<h1>stale copy</h1>", { headers: { "Content-Type": "text/html" } }));
    }, CACHE_PREFIX);
    await page.reload();
    await expect(page.locator("body")).not.toContainText("stale copy");
  });

  test("caches left by an older worker are deleted", async ({ page }) => {
    // A returning visitor whose browser still holds the previous site's cache.
    // robots.txt runs no script, so nothing registers the worker before this.
    await page.goto("/robots.txt");
    await page.evaluate(async () => {
      await (await caches.open("portfolio-old-build")).put("/stale", new Response("old site"));
    });
    await warmUp(page);
    const names = await page.evaluate(() => caches.keys());
    expect(names).toHaveLength(1);
    expect(names[0]).toMatch(new RegExp(`^${CACHE_PREFIX}`));
  });
});
