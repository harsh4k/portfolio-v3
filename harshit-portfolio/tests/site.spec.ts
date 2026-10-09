import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { readFileSync } from "node:fs";

/** Sections the Android app shortcuts and the header nav link to. */
const SECTIONS = ["about", "work", "contact"];

/** Fails the test on any console error, uncaught exception or failed local request. */
function watchForErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(`console: ${msg.text()}`));
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("response", (res) => res.status() >= 400 && errors.push(`${res.status()} ${res.url()}`));
  page.on("requestfailed", (req) => errors.push(`failed: ${req.url()}`));
  return errors;
}

test.describe("page contract", () => {
  test("loads with no errors and the expected structure", async ({ page }) => {
    const errors = watchForErrors(page);
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page).toHaveTitle(/Harshit Chauhan/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("header nav")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toHaveCount(1);

    expect(errors).toEqual([]);
  });

  test("every in-page anchor points at an element that exists", async ({ page }) => {
    await page.goto("/");
    const missing = await page.evaluate(() =>
      // .js-resume-open links open the resume dock rather than scrolling.
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.js-resume-open)')]
        .map((a) => (a.getAttribute("href") ?? "").slice(1))
        .filter((id) => id && !document.getElementById(id)),
    );
    expect(missing).toEqual([]);
  });

  test("every local link and asset responds 200", async ({ page, request }) => {
    await page.goto("/");
    const urls = await page.evaluate(() => {
      const found = new Set<string>();
      document.querySelectorAll<HTMLElement>("[href], [src]").forEach((el) => {
        const raw = el.getAttribute("href") ?? el.getAttribute("src");
        if (!raw || raw.startsWith("#") || raw.startsWith("mailto:")) return;
        const url = new URL(raw, location.href);
        if (url.origin === location.origin) found.add(url.pathname);
      });
      return [...found];
    });
    expect(urls.length).toBeGreaterThan(5);
    for (const url of urls) {
      const res = await request.get(url);
      expect(res.status(), url).toBe(200);
    }
  });

  test("external links are https and open safely in a new tab", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>("a[href^='http']")]
        .filter((a) => {
          if (a.origin === location.origin) return false;
          return a.protocol !== "https:" || a.target !== "_blank" || !a.relList.contains("noopener");
        })
        .map((a) => a.href),
    );
    expect(unsafe).toEqual([]);
  });

  test("lists all eleven projects, each with a screenshot", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#work a-work")).toHaveCount(11);
    await expect(page.locator("#work a-work img")).toHaveCount(11);
  });

  test("the CSP header never allows inline scripts", () => {
    // astro preview doesn't apply _headers, so this reads the file Cloudflare serves from.
    const headers = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
    const csp = headers.match(/Content-Security-Policy: (.+)/)?.[1] ?? "";
    const scriptSrc = csp.split(";").find((part) => part.trim().startsWith("script-src")) ?? "";
    expect(scriptSrc.trim()).toMatch(/^script-src 'self'/);
    expect(scriptSrc).not.toContain("unsafe-inline");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  test("unknown paths get the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Back to the portfolio" })).toBeVisible();
  });
});

test.describe("layout and accessibility", () => {
  test("has no axe violations", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });

  test("never scrolls sideways", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("every image has alt text, empty only where a caption already names it", async ({ page }) => {
    await page.goto("/");
    const missingAlt = await page.locator("img:not([alt])").count();
    expect(missingAlt).toBe(0);
  });

  test("all content is in the HTML, readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Developer");
    await expect(page.locator("#about h2").first()).toHaveText("About");
    await expect(page.locator("#work a-work")).toHaveCount(11);
    await expect(page.locator("#contact a[href^='mailto:']")).toContainText("harshitsinhchauhan250@gmail.com");
    await context.close();
  });
});

test.describe("personal links", () => {
  test("every Hire me link is a well-formed mailto with an encoded subject", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThanOrEqual(2);
    for (const href of hrefs) expect(href).toBe("mailto:harshitsinhchauhan250@gmail.com?subject=Hello%20Harshit");
  });

  test("the header links GitHub and LinkedIn", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".sb-socials a[aria-label='GitHub']")).toHaveAttribute(
      "href",
      "https://github.com/harsh4k",
    );
    await expect(page.locator(".sb-socials a[aria-label='LinkedIn']")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/harshit-chauhan-17a898364/",
    );
  });

  test("the GitHub icon is the GitHub mark, not the design's CodePen cube", async ({ page }) => {
    await page.goto("/");
    const icon = page.locator(".sb-socials a[aria-label='GitHub'] .sb__icon");
    await expect(icon).toHaveClass(/sb__icon--github/);
    await expect(page.locator(".sb__icon--codepen")).toHaveCount(0);
  });

  test("the resume opens in the dock with PDF and DOCX downloads", async ({ page }) => {
    await page.goto("/");
    const dock = page.locator("#resume-dock");
    await expect(dock).toBeAttached();
    await expect(dock.locator('a[href="/resume.pdf"][download]')).toHaveAttribute("download", /\.pdf$/);
    await expect(dock.locator('a[href="/Harshit_Resume.docx"]')).toHaveAttribute("download", /\.docx$/);
    await expect(dock.locator('a[href="/resume.pdf"][target="_blank"]')).toHaveText("Open");
  });
});

test.describe("intro", () => {
  test("shows a loader on the red cover until the 3D scene has rendered", async ({ page }) => {
    // Hold the 3D bundle back, as a slow phone network would.
    let release = () => {};
    const held = new Promise<void>((resolve) => (release = resolve));
    await page.route("**/assets/index-wQJ6Ws5X.js", async (route) => {
      await held;
      await route.continue();
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const loader = page.locator(".js-intro-loader");
    await expect(loader).toBeVisible();
    // Nothing to swipe yet, so the phone swipe hint waits for the scene too.
    await expect(page.locator("html")).not.toHaveClass(/intro-ready/);
    release();
    // The bundle fires intro:ready on its first rendered frame (patched in, see README).
    await page.evaluate(() => window.dispatchEvent(new Event("intro:ready")));
    await expect(loader).toHaveCount(0);
    await expect(page.locator("html")).toHaveClass(/intro-ready/);
  });

  test("Enter skips the intro, shows the site and restores the tab title", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const title = await page.title();
    // The intro scene renames the tab while it plays.
    await page.evaluate(() => (document.title = "Harshit Chauhan :D"));
    await page.keyboard.press("Enter");
    await expect(page.locator("#intro-layer")).toHaveCount(0, { timeout: 10_000 });
    await expect(page).toHaveTitle(title);
    await expect(page.locator(".site-head")).toHaveCSS("opacity", "1");
  });

  test("the 3D intro bundle keeps its ready hook and none of its author's details", () => {
    const bundle = readFileSync(new URL("../public/assets/index-wQJ6Ws5X.js", import.meta.url), "utf8");
    expect(bundle).toContain('window.dispatchEvent(new Event("intro:ready"))');
    expect(bundle).not.toContain("adrien-lamy");
    expect(bundle).not.toContain("frank leboeuf");
  });
});

test.describe("input", () => {
  test.use({ reducedMotion: "reduce" });

  test("middle clicks are never cancelled, so links still open in a new tab", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const cancelled = await page.evaluate(() => {
      const results: string[] = [];
      for (const target of [document.querySelector("#work a"), document.body]) {
        if (!target) continue;
        for (const type of ["mousedown", "auxclick"]) {
          const event = new MouseEvent(type, { button: 1, bubbles: true, cancelable: true });
          if (!target.dispatchEvent(event)) results.push(`${type} on ${target.nodeName}`);
        }
      }
      return results;
    });
    expect(cancelled).toEqual([]);
  });

  test("with Reduced Motion the header and hero still appear", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator("#intro-layer")).toHaveCount(0);
    await expect(page.locator(".site-head")).toHaveCSS("opacity", "1");
    await expect(page.locator(".s-hero")).toHaveCSS("opacity", "1");
  });

  test("the resume dock scrolls itself and keeps focus inside", async ({ page, isMobile }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.locator(".js-resume-open").first().dispatchEvent("click");
    const dock = page.locator("#resume-dock");
    await expect(dock).toBeVisible();
    await expect(page.locator(".js-site-wrapper")).toHaveJSProperty("inert", true);
    await expect(dock.locator(".resume-dock__page").first()).toBeVisible({ timeout: 15_000 });

    if (!isMobile) {
      const frame = dock.locator(".resume-dock__frame");
      const box = await frame.boundingBox();
      if (!box) throw new Error("resume frame has no box");
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.wheel(0, 600);
      await expect.poll(() => frame.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
    }

    await page.keyboard.press("Escape");
    await expect(dock).toBeHidden();
    await expect(page.locator(".js-site-wrapper")).toHaveJSProperty("inert", false);
  });

  test("Ctrl+click on Resume is left to the browser", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const prevented = await page.evaluate(() => {
      let seen: boolean | null = null;
      // Runs after the dock's handler; also stops this tab following #resume.
      window.addEventListener(
        "click",
        (e) => {
          seen = e.defaultPrevented;
          e.preventDefault();
        },
        { once: true },
      );
      const event = new MouseEvent("click", { ctrlKey: true, bubbles: true, cancelable: true });
      document.querySelector(".js-resume-open")?.dispatchEvent(event);
      return seen;
    });
    expect(prevented).toBe(false);
    await expect(page.locator("#resume-dock")).toBeHidden();
  });

  test("the wheel scrolls the page once the intro is done", async ({ page, isMobile }) => {
    test.skip(isMobile, "phones scroll by touch");
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveClass(/intro-done/);
    await page.mouse.move(400, 400);
    await page.mouse.wheel(0, 1200);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(600);
  });
});

test.describe("service worker retirement", () => {
  test.use({ serviceWorkers: "allow" });

  test("the old offline worker clears its caches and unregisters", async ({ page }) => {
    await page.goto("/");
    // Simulate a returning visitor whose browser still has the old site's cache.
    await page.evaluate(async () => {
      const cache = await caches.open("portfolio-old-build");
      await cache.put("/stale", new Response("old site"));
      await navigator.serviceWorker.register("/sw.js");
    });

    await expect
      .poll(
        () =>
          page.evaluate(async () => ({
            caches: (await caches.keys()).length,
            workers: (await navigator.serviceWorker.getRegistrations()).length,
          })),
        { timeout: 15_000 },
      )
      .toEqual({ caches: 0, workers: 0 });
  });
});
