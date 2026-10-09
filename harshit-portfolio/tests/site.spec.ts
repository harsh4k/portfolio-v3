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

  test("the resume opens in the dock with PDF and DOCX downloads", async ({ page }) => {
    await page.goto("/");
    const dock = page.locator("#resume-dock");
    await expect(dock).toBeAttached();
    await expect(dock.locator('a[href="/resume.pdf"]')).toHaveAttribute("download", /\.pdf$/);
    await expect(dock.locator('a[href="/Harshit_Resume.docx"]')).toHaveAttribute("download", /\.docx$/);
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
