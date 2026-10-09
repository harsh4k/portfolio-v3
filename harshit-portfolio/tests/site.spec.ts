import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Sections the Android app shortcuts and the header nav link to. */
const SECTIONS = ["about", "work", "archive", "contact"];

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
    await expect(page.locator("main#main")).toHaveCount(1);
    await expect(page.locator("header nav")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    for (const id of SECTIONS) await expect(page.locator(`section#${id}`)).toHaveCount(1);

    expect(errors).toEqual([]);
  });

  test("every in-page anchor points at an element that exists", async ({ page }) => {
    await page.goto("/");
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
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
    const cards = page.locator("#work li");
    await expect(cards).toHaveCount(11);
    await expect(page.locator("#work li img")).toHaveCount(11);
  });

  test("ships a strict CSP with no unsafe-inline or unsafe-eval", async ({ page }) => {
    await page.goto("/");
    const csp = await page.locator('meta[http-equiv="content-security-policy"]').getAttribute("content");
    expect(csp).toContain("script-src 'self' 'sha256-");
    expect(csp).not.toContain("unsafe-inline");
    expect(csp).not.toContain("unsafe-eval");
  });

  test("unknown paths get the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Back to the portfolio" })).toBeVisible();
  });
});

test.describe("layout and accessibility", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`has no axe violations in ${colorScheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.goto("/", { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }

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

  test("content is fully visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity !== "1").length,
    );
    expect(hidden).toBe(0);
    await context.close();
  });

  test("reduced motion shows content without waiting for scroll", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity !== "1").length,
    );
    expect(hidden).toBe(0);
  });

  test("revealed sections become visible when scrolled to", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const last = page.locator("#contact [data-reveal]").first();
    await last.scrollIntoViewIfNeeded();
    await expect(last).toHaveCSS("opacity", "1");
  });
});

test.describe("interactions", () => {
  test("theme toggle switches theme and remembers it", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const toggle = page.locator("[data-theme-toggle]");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  test("copy email puts the address on the clipboard and announces it", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: "Copy email" }).click();
    await expect(page.getByRole("status")).toHaveText("Copied to clipboard");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("harshitsinhchauhan250@gmail.com");
  });

  test("header nav scrolls to its section", async ({ page }) => {
    await page.goto("/");
    await page.locator("header nav").getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator("#work h2")).toBeInViewport();
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("hero and personal links", () => {
  test("the hero names the role and shows the portrait", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Software Developer");
    await expect(page.getByRole("img", { name: "Illustrated portrait of Harshit Chauhan" })).toBeVisible();
  });

  test("the header GitHub icon links to the GitHub profile", async ({ page }) => {
    await page.goto("/");
    const github = page.locator("header").getByRole("link", { name: /GitHub/ });
    await expect(github).toHaveAttribute("href", "https://github.com/harsh4k");
    await expect(github).toHaveAttribute("target", "_blank");
  });

  test("every Hire me link is a well-formed mailto", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .getByRole("link", { name: "Hire me" })
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toBe("mailto:harshitsinhchauhan250@gmail.com?subject=Hello%20Harshit");
  });

  test("every resume PDF link opens /resume.pdf in a new tab", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[href="/resume.pdf"]');
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) await expect(link).toHaveAttribute("target", "_blank");
  });

  test("middle clicks and wheel scrolling are never cancelled", async ({ page }) => {
    await page.goto("/");
    const cancelled = await page.evaluate(() => {
      const targets = [document.querySelector("[data-sky]"), document.querySelector("#work a"), document.body];
      const results: string[] = [];
      for (const target of targets) {
        if (!target) continue;
        const events = [
          new MouseEvent("mousedown", { button: 1, bubbles: true, cancelable: true }),
          new PointerEvent("pointerdown", { button: 1, bubbles: true, cancelable: true }),
          new MouseEvent("auxclick", { button: 1, bubbles: true, cancelable: true }),
          new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true }),
        ];
        for (const event of events)
          if (!target.dispatchEvent(event)) results.push(`${event.type} on ${target.nodeName}`);
      }
      return results;
    });
    expect(cancelled).toEqual([]);
  });

  test("the starfield is decorative and holds still under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const sky = page.locator("[data-hero] [data-sky]");
    await expect(sky).toHaveAttribute("aria-hidden", "true");
    const frame = () => sky.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
    const first = await frame();
    await page.waitForTimeout(600);
    expect(await frame()).toBe(first);
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
