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
    // Not mid-way through the loader's exit animation, where fading type is
    // briefly low contrast. The loader itself is checked in the intro tests.
    await expect(page.locator(".js-intro-loader")).toHaveCount(0, { timeout: 15_000 });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });

  test("never scrolls sideways", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("the hero title fits inside its box and clear of the star", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const boxes = await page.evaluate(() => {
      const title = document.querySelector(".s-hero .s__title");
      const style = title ? getComputedStyle(title) : null;
      const box = title?.getBoundingClientRect();
      const [first, star, second] = [".js-word", ".js-star", ".js-word:last-of-type"].map((s) =>
        title?.querySelector(s)?.getBoundingClientRect(),
      );
      const left = (box?.left ?? 0) + parseFloat(style?.paddingLeft ?? "0");
      const right = (box?.right ?? 0) - parseFloat(style?.paddingRight ?? "0");
      return { left, right, first, star, second };
    });
    for (const word of [boxes.first, boxes.second]) {
      expect(word?.left ?? 0).toBeGreaterThanOrEqual(boxes.left - 1);
      expect(word?.right ?? Infinity).toBeLessThanOrEqual(boxes.right + 1);
    }
    expect(boxes.first?.right ?? Infinity).toBeLessThan(boxes.star?.left ?? 0);
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

test.describe("images", () => {
  test("tapping a link or button never flashes the browser's blue highlight", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    // The intro's stylesheet used to be the only thing turning it off.
    await page.evaluate(() => document.querySelectorAll("link[data-intro-style]").forEach((l) => l.remove()));
    await expect(page.locator(".js-button-text").first()).toHaveCSS("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)");
  });

  test("project and archive images load in the background, before they are scrolled to", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    // No scrolling: they should still all arrive.
    await expect
      .poll(
        () =>
          page.evaluate(
            () =>
              [...document.querySelectorAll<HTMLImageElement>("#work img, .s-my-way img")].filter(
                (img) => !img.complete || img.naturalWidth === 0,
              ).length,
          ),
        { timeout: 20_000 },
      )
      .toBe(0);
  });
});

test.describe("intro", () => {
  test("shows a loader on the red cover until the 3D scene has rendered", async ({ page }) => {
    // The count runs on real timers (about 5s to its 90% wait), so give it room on a busy CI runner.
    test.setTimeout(60_000);
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
    // Opaque, so the scene drawing underneath never shows through it. The slat
    // loader's blinds paint the red, so they can slide off at the end.
    await expect(loader.locator(".scp-blind").first()).toHaveCSS("background-color", "rgb(255, 11, 54)");
    // Hydrated: the count is running, not just the server-rendered frame.
    await expect(loader.locator(".scp-gate")).toHaveAttribute("data-phase", /intro|count/);
    // It waits short of 100 for the scene.
    await expect(loader.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "90", { timeout: 20_000 });
    const loaderAxe = await new AxeBuilder({ page })
      .include(".js-intro-loader")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(loaderAxe.violations.map((v) => v.id)).toEqual([]);
    // Above the 3D scene's own page (z-index 100), which hid it before.
    await expect(loader).toHaveCSS("z-index", "200");
    // Nothing to swipe yet, so the phone swipe hint waits for the scene too.
    await expect(page.locator("html")).not.toHaveClass(/intro-ready/);
    release();
    // The bundle fires intro:ready on its first rendered frame (patched in, see README).
    await page.evaluate(() => window.dispatchEvent(new Event("intro:ready")));
    // It counts to 100, holds, and opens its blinds before it goes.
    await expect(loader.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    await expect(loader).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator("html")).toHaveClass(/intro-ready/);
    // The 3D scene is still there to pull, not skipped.
    await expect(page.locator("#intro-layer")).toHaveCount(1);
  });

  test("the count shows every ten on its way to 100, even when the scene is ready at once", async ({ page }) => {
    test.setTimeout(60_000);
    await page.addInitScript(() => {
      const seen: string[] = [];
      (window as unknown as { __seen: string[] }).__seen = seen;
      // Every value the progressbar takes, recorded as it changes.
      new MutationObserver(() => {
        const value = document.querySelector(".js-intro-loader [role=progressbar]")?.getAttribute("aria-valuenow");
        if (value && seen.at(-1) !== value) seen.push(value);
      }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-valuenow"] });
      window.addEventListener("DOMContentLoaded", () => window.dispatchEvent(new Event("intro:ready")));
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".js-intro-loader")).toHaveCount(0, { timeout: 20_000 });
    const seen = await page.evaluate(() => (window as unknown as { __seen: string[] }).__seen);
    expect(seen).toEqual(["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]);
  });

  test("no page text shows through the HC loader after the intro", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.keyboard.press("Escape");
    await expect(page.locator("html")).toHaveClass(/intro-started/);
    // While the engine's loader plays, the text below the hero stays hidden...
    await expect(page.locator("#about .s__content p").first()).toBeHidden();
    // ...and comes back once it is done and the page can scroll.
    await expect(page.locator("html")).not.toHaveClass(/is-scroll-blocked/, { timeout: 15_000 });
    await expect(page.locator("#about .s__content p").first()).toBeVisible();
  });

  test("Skip intro on the loader goes straight to the site while the scene is still loading", async ({ page }) => {
    await page.route("**/assets/index-wQJ6Ws5X.js", () => new Promise(() => {}));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator(".js-intro-loader .scp-gate[data-phase='count']").waitFor();
    await page.getByRole("button", { name: /Skip intro/ }).click();
    await expect(page.locator("#intro-layer")).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator(".site-head")).toHaveCSS("opacity", "1");
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

  test("the hero's stardust scene fills the wave band as one still scene, with no loader parts", async ({ page }) => {
    const errors = watchForErrors(page);
    await page.goto("/", { waitUntil: "load" });
    const scene = page.locator(".s-hero .js-stardust");
    // Decoration only: hidden from assistive tech, nothing to press.
    await expect(scene).toHaveAttribute("aria-hidden", "true");
    await expect(scene).not.toHaveAttribute("role", /.+/);
    // The wave lines it replaces are hidden, and the scene fills their band.
    await expect(page.locator(".s__waves .js-svg")).toBeHidden();
    // Both boxes are read in the same frame: the hero is still settling on
    // phones, so two separate reads can land a few pixels apart.
    const { band, box } = await page.evaluate(() => {
      const rect = (selector: string) => {
        const r = document.querySelector(selector)?.getBoundingClientRect();
        return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null;
      };
      return { band: rect(".s-hero .s__waves"), box: rect(".s-hero .js-stardust") };
    });
    expect(box?.height).toBeGreaterThan(100);
    expect(box).toEqual(band);

    // It shows once the hero is in, with its planets, and has no counter or rewind.
    await expect(scene).toHaveAttribute("data-shown", "true");
    expect(await scene.locator(".ssp-planet").count()).toBeGreaterThanOrEqual(2);
    await expect(scene.locator(".ssp-count, .ssp-hint, .ssp-veil")).toHaveCount(0);
    await scene.click();
    await expect(scene).toHaveAttribute("data-shown", "true");
    expect(errors).toEqual([]);
  });

  test("Highlights tiles start uncovering as they come on screen, not half way", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    // Record how much of each tile is on screen when its wipe starts.
    await page.evaluate(() => {
      const w = window as Window & { shares?: number[] };
      w.shares = [];
      for (const tile of document.querySelectorAll(".js-award")) {
        const watch = new MutationObserver(() => {
          if (!tile.classList.contains("is-revealed")) return;
          watch.disconnect();
          const box = tile.getBoundingClientRect();
          const shown = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
          w.shares?.push(Math.max(0, shown) / box.height);
        });
        watch.observe(tile, { attributes: true, attributeFilter: ["class"] });
      }
    });
    // Scroll down through the section in small steps, like a visitor would.
    const start = await page.evaluate(
      () => (document.querySelector("#about")?.getBoundingClientRect().top ?? 0) + window.scrollY,
    );
    for (let y = start; y < start + 3000; y += 20) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(20);
    }
    const shares = await page.evaluate(() => (window as Window & { shares?: number[] }).shares ?? []);
    expect(shares.length).toBeGreaterThan(3);
    // The design's engine waits for half a tile; most should start well before that.
    const early = shares.filter((share) => share < 0.5).length;
    expect(early).toBeGreaterThan(shares.length / 2);
  });

  test("scrolling with a finger over a Highlights tile throws no smileys", async ({ page, isMobile }) => {
    test.skip(!isMobile, "touch only");
    await page.goto("/", { waitUntil: "load" });
    const tile = page.locator(".js-award").first();
    await tile.scrollIntoViewIfNeeded();
    // The engine marks a tile is-active while it throws smileys.
    await tile.evaluate((el) => {
      const w = window as Window & { thrown?: number };
      w.thrown = 0;
      new MutationObserver(() => {
        if (el.classList.contains("is-active")) w.thrown = (w.thrown ?? 0) + 1;
      }).observe(el, { attributes: true, attributeFilter: ["class"] });
    });
    const box = await tile.boundingBox();
    if (!box) throw new Error("tile has no box");
    const cdp = await page.context().newCDPSession(page);
    const at = (y: number) => [{ x: box.x + 20, y }];
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(box.y + 40) });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(box.y - 60) });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => (window as Window & { thrown?: number }).thrown)).toBe(0);
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
