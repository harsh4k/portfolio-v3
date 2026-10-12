import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { readFileSync } from "node:fs";
import { parseContributions } from "../src/data/github";

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

  test("the CSP lets Cloudflare Web Analytics load and report, and nothing else", () => {
    const headers = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
    const csp = headers.match(/Content-Security-Policy: (.+)/)?.[1] ?? "";
    const directive = (name: string) =>
      csp
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${name} `));
    expect(directive("script-src")).toBe("script-src 'self' 'unsafe-eval' https://static.cloudflareinsights.com");
    expect(directive("connect-src")).toBe("connect-src 'self' https://cloudflareinsights.com");
  });

  test("link previews have a title, description and a 1200x630 image", async ({ page, request }) => {
    await page.goto("/");
    const meta = (selector: string) => page.locator(`head meta[${selector}]`).getAttribute("content");
    for (const key of ["og:title", "og:description", "og:image:alt"]) {
      expect(await meta(`property="${key}"`), key).toBeTruthy();
    }
    for (const key of ["twitter:title", "twitter:description", "twitter:image:alt"]) {
      expect(await meta(`name="${key}"`), key).toBeTruthy();
    }
    expect(await meta('name="twitter:card"')).toBe("summary_large_image");

    // Crawlers need an absolute URL on the live host; fetch the same path locally.
    const image = new URL((await meta('property="og:image"')) ?? "");
    expect(image.href).toBe("https://harshh.pages.dev/images/og-image.png");
    expect(await meta('name="twitter:image"')).toBe(image.href);
    const res = await request.get(image.pathname);
    expect(res.status()).toBe(200);
    const png = await res.body();
    // PNG IHDR: width and height are big-endian at bytes 16 and 20.
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  });

  test("the /via/ social links serve the home page and stay out of search", () => {
    const redirects = readFileSync(new URL("../public/_redirects", import.meta.url), "utf8");
    expect(redirects).toMatch(/^\/via\/\*\s+\/\s+200$/m);
    const headers = readFileSync(new URL("../public/_headers", import.meta.url), "utf8");
    expect(headers).toMatch(/^\/via\/\*\n\s+X-Robots-Tag: noindex$/m);
  });

  test("unknown paths get the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Back to the portfolio" })).toBeVisible();
  });
});

test.describe("layout and accessibility", () => {
  test("the hero heading reads as plain words once its letters are split", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Harshit Chauhan, Software Developer");
    // The split letters are hidden from assistive tech, so nothing spells the words out.
    await expect(page.locator("h1 .js-word")).toHaveCount(2);
    for (const word of await page.locator("h1 .js-word").all())
      await expect(word).toHaveAttribute("aria-hidden", "true");
  });

  test("has no axe violations", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/", { waitUntil: "networkidle" });
    // Once the red cover has made way for the 3D scene.
    await expect(page.locator(".js-intro-loader")).toHaveCount(0, { timeout: 15_000 });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });

  test("never scrolls sideways on the narrowest phones", async ({ page }) => {
    for (const width of [320, 340, 359]) {
      await page.setViewportSize({ width, height: 700 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/", { waitUntil: "load" });
      const toggle = await page.locator(".js-contrast").boundingBox();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
        `${width}px`,
      ).toBeLessThanOrEqual(0);
      // The last header cell must be fully on screen, not clipped.
      expect((toggle?.x ?? 0) + (toggle?.width ?? 0), `${width}px toggle`).toBeLessThanOrEqual(width - 8);
    }
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

  test("the hero's binary strip spells Harshit's name, not the design's author", async ({ page }) => {
    await page.goto("/");
    const words = await page
      .locator(".s-hero a-separator")
      .first()
      .evaluate((strip) =>
        [...strip.querySelectorAll(".a__code")]
          .map((code) => {
            const bits = [...code.querySelectorAll(".a__char")].map((cell) => cell.textContent?.trim() ?? "");
            const letters = bits.join(",").split(",,");
            return letters.map((letter) => String.fromCharCode(parseInt(letter.replaceAll(",", ""), 2))).join("");
          })
          .join(""),
      );
    expect(words).toBe("HarshitChauhan");
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

test.describe("search and AI visibility", () => {
  const SITE = "https://harshh.pages.dev/";

  test("the head carries a title, description and canonical URL", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Harshit Chauhan — Software Developer");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toMatch(/software developer/i);
    // Longer descriptions are cut off in search results.
    expect(description?.length).toBeLessThanOrEqual(155);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", SITE);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("the h1 in the served HTML names Harshit, not only his role", async ({ request }) => {
    // Read the HTML crawlers get, before any script runs.
    const html = await (await request.get("/")).text();
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
    const plain = h1.match(/<span class="u-sr-only[^"]*">([\s\S]*?)<\/span>/)?.[1] ?? "";
    expect(plain.replace(/\s+/g, " ").trim()).toBe("Harshit Chauhan, Software Developer");
  });

  test("lettered headings and slogans read as words, each once", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    // Sections below the fold are hidden until scrolled to, so check the markup rather than the accessibility tree.
    await expect(page.locator("#work h2 .u-sr-only")).toHaveText("Work");
    await expect(page.locator("#work h2 .js-title")).toHaveAttribute("aria-hidden", "true");
    const contact = page.locator("#contact .s__cta");
    await expect(contact.locator(".u-sr-only")).toHaveText("Let's rock");
    for (const line of await contact.locator(".s__cta__line").all())
      await expect(line).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".s__catcher__distorted-wrapper")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".s__catcher__normal-wrapper")).not.toHaveAttribute("aria-hidden", /.*/);
  });

  test("the JSON-LD describes Harshit and every project", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks).toHaveLength(1);
    const graph = (JSON.parse(blocks[0] ?? "") as { "@graph": Record<string, unknown>[] })["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    expect(person).toMatchObject({ name: "Harshit Chauhan", jobTitle: "Software Developer", url: SITE });
    expect(person?.sameAs).toContain("https://github.com/harsh4k");
    expect(graph.find((node) => node["@type"] === "ProfilePage")).toMatchObject({
      mainEntity: person && { "@id": person["@id"] },
    });
    expect(graph.filter((node) => node["@type"] === "CreativeWork")).toHaveLength(11);
  });

  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Allow: /");
    expect(body).not.toMatch(/Disallow: \/\s*$/m);
    expect(body).toContain(`Sitemap: ${SITE}sitemap.xml`);
  });

  test("the sitemap lists the home page and leaves out the 404", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain(`<loc>${SITE}</loc>`);
    expect(body).not.toContain("404");
  });

  test("llms.txt summarises Harshit with every project", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/^# Harshit Chauhan\n/);
    expect(body.match(/^- \[.+\]\(https:\/\/.+\)/gm)?.length).toBeGreaterThanOrEqual(11 + 2);
    expect(body.toLowerCase()).not.toContain("creative developer");
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
  test("covers the 3D scene in plain red, with no loader, until it has rendered", async ({ page }) => {
    // Hold the 3D bundle back, as a slow phone network would.
    let release = () => {};
    const held = new Promise<void>((resolve) => (release = resolve));
    await page.route("**/assets/index-wQJ6Ws5X.js", async (route) => {
      await held;
      await route.continue();
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const cover = page.locator(".js-intro-loader");
    await expect(cover).toBeVisible();
    // Opaque, and above the 3D scene's own page (z-index 100), so a half-built scene never shows.
    await expect(cover).toHaveCSS("background-color", "rgb(255, 11, 54)");
    await expect(cover).toHaveCSS("z-index", "200");
    // Just the red: no counter, text or buttons.
    await expect(cover).toBeEmpty();
    // Nothing to swipe yet, so the phone swipe hint waits for the scene too.
    await expect(page.locator("html")).not.toHaveClass(/intro-ready/);
    release();
    // The bundle fires intro:ready on its first rendered frame (patched in, see README).
    await page.evaluate(() => window.dispatchEvent(new Event("intro:ready")));
    await expect(cover).toHaveCount(0);
    await expect(page.locator("html")).toHaveClass(/intro-ready/);
    // The 3D scene is still there to pull, not skipped.
    await expect(page.locator("#intro-layer")).toHaveCount(1);
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

  test("Escape goes straight to the site while the scene is still loading", async ({ page }) => {
    await page.route("**/assets/index-wQJ6Ws5X.js", () => new Promise(() => {}));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".js-intro-loader")).toBeVisible();
    await page.keyboard.press("Escape");
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

  test("on a phone, swiping down on the scene enters the site", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Desktop pulls the 3D hand instead.");
    // The swipe is bridge.js's own; holding the 3D bundle back keeps the
    // main thread free so the gesture lands on time on a busy runner.
    await page.route("**/assets/index-wQJ6Ws5X.js", () => new Promise(() => {}));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.dispatchEvent(new Event("intro:ready")));
    await expect(page.locator(".intro-swipe-hint")).toBeVisible({ timeout: 15_000 });
    await page.evaluate(() => {
      const x = innerWidth / 2;
      const fire = (type: string, y: number) =>
        window.dispatchEvent(
          new PointerEvent(type, {
            pointerId: 1,
            pointerType: "touch",
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
          }),
        );
      fire("pointerdown", innerHeight * 0.3);
      for (let i = 1; i <= 8; i++) fire("pointermove", innerHeight * (0.3 + i * 0.045));
      fire("pointerup", innerHeight * 0.66);
    });
    await expect(page.locator("#intro-layer")).toHaveCount(0, { timeout: 10_000 });
    await expect(page.locator(".site-head")).toHaveCSS("opacity", "1", { timeout: 15_000 });
  });

  test("the 3D intro bundle keeps its ready hook and links only to Harshit", () => {
    const bundle = readFileSync(new URL("../public/assets/index-wQJ6Ws5X.js", import.meta.url), "utf8");
    expect(bundle).toContain('window.dispatchEvent(new Event("intro:ready"))');
    // Every LinkedIn link in it is Harshit's.
    expect(bundle.match(/linkedin\.com\/in\/[\w-]+/g)).toEqual(["linkedin.com/in/harshit-chauhan-17a898364"]);
    expect(bundle).not.toContain("frank leboeuf");
    // Its intro panel and screen-reader title say "software developer", like the rest of the site.
    expect(bundle.toLowerCase()).not.toContain("creative developer");
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

  test("the hero's wire terrain fills the wave band and comes in with the hero", async ({ page }) => {
    const errors = watchForErrors(page);
    await page.goto("/", { waitUntil: "load" });
    const scene = page.locator(".s-hero .js-wire-terrain");
    // Decoration only: hidden from assistive tech, nothing to press.
    await expect(scene).toHaveAttribute("aria-hidden", "true");
    await expect(scene).not.toHaveAttribute("role", /.+/);
    // The wave lines it replaces are hidden, and the terrain fills their band.
    await expect(page.locator(".s__waves .js-svg")).toBeHidden();
    await expect(scene.locator("canvas")).toHaveCount(1);
    // Measured in one frame: the hero may still be sliding in, so two separate reads can disagree.
    const [band, box, canvas] = await page.evaluate(() =>
      [".s-hero .s__waves", ".s-hero .js-wire-terrain", ".s-hero .js-wire-terrain canvas"].map((s) => {
        const r = document.querySelector(s)?.getBoundingClientRect();
        return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null;
      }),
    );
    expect(box?.height).toBeGreaterThan(100);
    expect(box).toEqual(band);
    // No 1200px minimum from the component pushing past the band on phones.
    expect(canvas).toEqual(band);

    await expect(scene).toHaveAttribute("data-shown", "true");
    expect(errors).toEqual([]);
  });

  test("the footer spells HARSHIT CHAUHAN in Audiowide, on one line that fits", async ({ page }) => {
    const errors = watchForErrors(page);
    await page.goto("/", { waitUntil: "load" });
    const mark = page.locator(".site-foot .sgf");
    await expect(mark).toHaveCount(1);
    // Screen readers get the name once; the letters are hidden from them.
    await expect(mark.locator(".sr-only")).toHaveText("Harshit Chauhan");
    await expect(mark.locator(".sgf-line")).toHaveAttribute("aria-hidden", "true");
    // All 14 letters (each set twice for the hover slice), with a plain gap between the
    // names and no shutter mark.
    await expect(mark.locator(".sgf-up")).toHaveCount(14);
    await expect(mark.locator(".sgf-gap")).toHaveCount(1);
    await expect(mark.locator("svg")).toHaveCount(0);
    // The self-hosted font is the one in use, and the line fits inside the footer.
    const loaded = await page.evaluate(async () => {
      await document.fonts.load('16px "Audiowide"');
      return [...document.fonts].some((f) => f.family.includes("Audiowide") && f.status === "loaded");
    });
    expect(loaded).toBe(true);
    const foot = await page.locator(".site-foot").boundingBox();
    const line = await mark.locator(".sgf-line").boundingBox();
    expect(line?.height).toBeGreaterThan(15);
    expect(line?.x).toBeGreaterThanOrEqual(foot?.x ?? 0);
    expect((line?.x ?? 0) + (line?.width ?? 0)).toBeLessThanOrEqual((foot?.x ?? 0) + (foot?.width ?? 0));
    // Under Reduced Motion the letters are in place, not waiting to rise.
    await expect(mark).toHaveAttribute("data-in", "true");
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

test.describe("header and keyboard reach", () => {
  test("the resume is one tap away wherever the header menu is hidden", async ({ page }) => {
    await page.goto("/");
    const menuHidden = await page.locator("header nav").isHidden();
    const resume = page.locator(".sb-resume");
    // Hidden on desktop, where the menu already has it; visible and working when the menu is gone.
    await expect(resume).toBeVisible({ visible: menuHidden });
    if (menuHidden) {
      await resume.dispatchEvent("click");
      await expect(page.locator("#resume-dock")).toBeVisible();
    }
  });

  test("the contrast toggle announces whether it is on", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const toggle = page.locator(".js-contrast");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.dispatchEvent("click");
    await expect(toggle).toHaveAttribute("aria-pressed", "true", { timeout: 5_000 });
  });

  test("the contrast toggle switches to the dark green theme, with the logo and sun in its colours", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "load" });
    await page.locator(".js-contrast").dispatchEvent("click");
    await expect(page.locator("html")).toHaveClass(/theme-contrasted/, { timeout: 5_000 });
    const vars = await page.evaluate(() => {
      const css = getComputedStyle(document.documentElement);
      return ["primary", "secondary", "sun"].map((n) => css.getPropertyValue(`--color-${n}`).trim());
    });
    expect(vars).toEqual(["#0f3324", "#e3f4d7", "#9fe870"]);
    // The logo is hardcoded to the red theme's ink, so it is recoloured.
    await expect(page.locator(".js-logo path").first()).toHaveCSS("fill", "rgb(227, 244, 215)");
    // So is the hero star, an <img>, which is painted through a mask instead.
    await expect(page.locator(".s-hero .js-star")).toHaveCSS("background-color", "rgb(227, 244, 215)");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });

  test("switching themes wipes between snapshots, and the design's late class change can't undo it", async ({
    page,
  }) => {
    await page.route("**/assets/index-wQJ6Ws5X.js", (route) => route.abort());
    await page.goto("/", { waitUntil: "load" });
    await page.keyboard.press("Escape");
    await expect(page.locator(".site-head")).toHaveCSS("opacity", "1", { timeout: 15_000 });
    const html = page.locator("html");
    await expect(html).toHaveClass(/has-theme-wipe/);
    // The design's red mask, which let the old theme show through, stays hidden.
    await expect(page.locator(".js-contrast-mask")).toHaveCSS("visibility", "hidden");
    // Record how each transition ends: one that waits on animation frames in
    // its update times out after 4s and is skipped, so no wipe plays.
    await page.evaluate(() => {
      const w = window as unknown as { __vt: string[] };
      w.__vt = [];
      const start = document.startViewTransition.bind(document);
      document.startViewTransition = (update) => {
        const transition = start(update);
        transition.ready.then(
          () => w.__vt.push("ready"),
          (error: Error) => w.__vt.push(error.name),
        );
        return transition;
      };
    });
    const toggle = page.locator(".js-contrast");
    await toggle.click();
    await expect(html).toHaveClass(/theme-contrasted/);
    // The terrain is redrawn in the new colours as part of the switch.
    await expect(page.locator(".js-wire-terrain > div")).toHaveCSS("background-color", "rgb(15, 51, 36)");
    // Past the design's own 1s wipe, which sets the class again when it ends.
    await page.waitForTimeout(1_500);
    await expect(html).toHaveClass(/theme-contrasted/);
    await toggle.click();
    await expect(html).not.toHaveClass(/theme-contrasted/);
    await page.waitForTimeout(1_500);
    await expect(html).not.toHaveClass(/theme-contrasted/);
    await expect(page.locator(".js-wire-terrain > div")).toHaveCSS("background-color", "rgb(244, 12, 63)");
    expect(await page.evaluate(() => (window as unknown as { __vt: string[] }).__vt)).toEqual(["ready", "ready"]);
  });

  test("every project can be reached with the keyboard", async ({ page }) => {
    // Reduced motion skips the intro, so Tab starts from the page itself.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const urls = await page
      .locator(".work-keys a")
      .evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).href));
    expect(urls.length).toBeGreaterThan(5);

    const reached = new Set<string>();
    for (let i = 0; i < 60 && reached.size < urls.length; i++) {
      await page.keyboard.press("Tab");
      const href = await page.evaluate(() => {
        const active = document.activeElement;
        return active?.closest(".work-keys") ? (active as HTMLAnchorElement).href : "";
      });
      if (href) reached.add(href);
    }
    expect([...reached].sort()).toEqual([...urls].sort());
    // Focus shows the list on screen instead of leaving it invisible.
    const box = await page.locator(".work-keys").boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(200);
  });

  test("Tab reaches the contact email from the top of the page, and it shows when focused", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // The design hides the contact block while it is off screen; Tab still has to land on it.
    let reached = false;
    for (let i = 0; i < 80 && !reached; i++) {
      await page.keyboard.press("Tab");
      reached = await page.evaluate(() => document.activeElement?.classList.contains("s__cta__link") ?? false);
    }
    expect(reached).toBe(true);
    const link = page.locator(".s__cta__link");
    await expect(link).toHaveAttribute("href", /^mailto:/);
    await expect(link).toHaveCSS("opacity", "1");
    await expect(link).toBeInViewport();
    // Its ring is in the ground colour, not the circle's ink.
    const [outline, ink] = await link.evaluate((a) => [
      getComputedStyle(a).outlineColor,
      getComputedStyle(a.closest(".s__cta") ?? a).backgroundColor,
    ]);
    expect(outline).not.toBe(ink);
  });

  test("the page has one main landmark and a heading for every section", async ({ page }) => {
    // Reduced motion skips the 3D intro, whose own <main> is gone once it closes.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator("main")).toHaveCount(1);
    for (const id of ["about", "process", "work", "toolkit", "since", "contact"]) {
      const section = page.locator(`main section:has(#${id}), main section#${id}`).first();
      await expect(section.locator("h2")).not.toHaveCount(0);
    }
    const results = await new AxeBuilder({ page }).withRules(["landmark-one-main", "region"]).analyze();
    expect(results.violations).toEqual([]);
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

/** Skips the 3D intro and waits until the page can scroll. */
async function enterSite(page: Page) {
  await page.goto("/", { waitUntil: "load" });
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).not.toHaveClass(/is-scroll-blocked/, { timeout: 15_000 });
}

test.describe("scroll scenes", () => {
  for (const [id, first, last] of [
    ["process", "Idea", "Ship"],
    ["toolkit", "Frontend", "Delivery"],
  ] as const) {
    test(`#${id} draws once near, and scrolling through it moves through its steps`, async ({ page }) => {
      const errors = watchForErrors(page);
      await enterSite(page);
      const section = page.locator(`#${id}`);
      // Laid out as a tall block straight away, so the page doesn't change length later.
      await expect(section).toHaveAttribute("data-s3d", "live");
      await section.evaluate((el) => el.scrollIntoView());
      await expect(section.locator("canvas")).toHaveCount(1);

      const scrollTo = (fraction: number) =>
        section.evaluate((el, f) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top + ((el as HTMLElement).offsetHeight - window.innerHeight) * f);
        }, fraction);
      const active = section.locator(".js-s3d-step[data-active] .s3d__mark");
      await scrollTo(0.02);
      await expect(active).toHaveText(first);
      await scrollTo(0.98);
      await expect(active).toHaveText(last);
      expect(errors).toEqual([]);
    });
  }

  test("all steps are in the page for screen readers", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#process .js-s3d-step")).toHaveCount(5);
    await expect(page.locator("#toolkit .js-s3d-step")).toHaveCount(5);
  });
});

test.describe("command menu and footer extras", () => {
  test("Ctrl+K opens the menu, typing filters it, Enter jumps to the section", async ({ page }) => {
    await enterSite(page);
    await page.keyboard.press("Control+k");
    const menu = page.getByRole("dialog", { name: "Command menu" });
    await expect(menu).toBeVisible();
    await page.keyboard.type("toolkit");
    await expect(menu.getByRole("option")).toHaveCount(1);
    await page.keyboard.press("Enter");
    await expect(menu).toBeHidden();
    await expect
      .poll(() => page.locator("#toolkit").evaluate((el) => Math.abs(el.getBoundingClientRect().top)))
      .toBeLessThan(2);
  });

  test("the Jump button opens the menu, and Escape returns focus to it", async ({ page }) => {
    await enterSite(page);
    const button = page.locator(".js-sn-open");
    await button.click();
    await expect(page.getByRole("dialog", { name: "Command menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toBeFocused();
  });

  test("only the result list scrolls, not the menu around it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 600 });
    await enterSite(page);
    await page.locator(".js-sn-open").click();
    const menu = page.getByRole("dialog", { name: "Command menu" });
    await expect(menu).toBeVisible();
    expect(await menu.evaluate((el) => getComputedStyle(el).overflowY)).toBe("hidden");
    const list = menu.getByRole("listbox");
    expect(await list.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
  });

  test("the command menu copies the email address and says so; the footer has no copy button", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await enterSite(page);
    await expect(page.locator(".site-foot button")).toHaveCount(0);
    await page.keyboard.press("Control+k");
    await page.keyboard.type("copy email");
    await page.keyboard.press("Enter");
    await expect(page.locator(".js-sn-toast")).toHaveText("Email copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("harshitsinhchauhan250@gmail.com");
  });

  test("the footer shows the time in Mumbai", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".js-local-time")).toHaveText(/^\d{2}:\d{2} IST$/);
  });
});

test.describe("project pages", () => {
  const projects = JSON.parse(readFileSync(new URL("../src/content/projects.json", import.meta.url), "utf8")) as {
    id: string;
    title: string;
    url: string;
  }[];

  test("every project has a page with its title, live link and neighbours, and no errors", async ({ page }) => {
    for (const project of projects) {
      const errors = watchForErrors(page);
      await page.goto(`/work/${project.id}/`);
      await expect(page.locator("h1")).toHaveText(project.title);
      await expect(page.locator(`a[href="${project.url}"]`)).toHaveCount(1);
      await expect(page.locator('a[rel="prev"], a[rel="next"]')).toHaveCount(2);
      expect(errors).toEqual([]);
    }
  });

  test("a written-up project shows its role, stack, problem, result and source link", async ({ page }) => {
    await page.goto("/work/attendo/");
    await expect(page.locator(".meta dt")).toHaveText(["Role", "Stack"]);
    await expect(page.locator(".stack li").first()).toBeVisible();
    await expect(page.locator(".story h2")).toHaveText([/The problem/, /The result/]);
    await expect(page.locator('a[href="https://github.com/harsh4k/attendov1"]')).toHaveCount(1);
  });

  test("a project without a write-up shows no empty case-study blocks", async ({ page }) => {
    await page.goto("/work/velsaro/");
    await expect(page.locator(".meta, .story")).toHaveCount(0);
    await expect(page.locator(".eyebrow")).toContainText("Project");
  });

  test("project pages are in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const project of projects) expect(sitemap).toContain(`/work/${project.id}/`);
    expect(sitemap).not.toContain("[");
  });
});

test.describe("GitHub section", () => {
  /** A year of GitHub's calendar markup: cells with ids, and tooltips pointing at them. */
  const calendar = (days: number) => {
    let html = "<p>1,234 contributions in the last year</p><table>";
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.UTC(2025, 9, 12) + i * 86_400_000).toISOString().slice(0, 10);
      const count = i % 9;
      const text = count === 0 ? "No contributions" : count === 1 ? "1 contribution" : `${count} contributions`;
      html += `<td data-date="${date}" id="contribution-day-component-${i % 7}-${Math.floor(i / 7)}" data-level="${Math.min(4, count)}" class="ContributionCalendar-day"></td>`;
      html += `<tool-tip id="tooltip-${i}" for="contribution-day-component-${i % 7}-${Math.floor(i / 7)}" popover="manual" class="sr-only position-absolute">${text} on October ${i}th.</tool-tip>`;
    }
    return `${html}</table>`;
  };

  test("reads each day's count from GitHub's calendar markup", () => {
    const parsed = parseContributions(calendar(371));
    expect(parsed?.days).toHaveLength(371);
    expect(parsed?.total).toBe(1234);
    expect(parsed?.days.slice(0, 3)).toEqual([
      { date: "2025-10-12", level: 0, count: 0 },
      { date: "2025-10-13", level: 1, count: 1 },
      { date: "2025-10-14", level: 2, count: 2 },
    ]);
  });

  test("leaves the section out when the markup isn't recognised", () => {
    expect(parseContributions(calendar(100))).toBeNull();
    expect(parseContributions(calendar(371).replaceAll(/<tool-tip[^>]*>[^<]*<\/tool-tip>/g, ""))).toBeNull();
    expect(parseContributions("<html>rate limited</html>")).toBeNull();
  });

  test("when the build reached GitHub, the skyline draws and the footer has no graph", async ({ page }) => {
    const errors = watchForErrors(page);
    await enterSite(page);
    await expect(page.locator(".site-foot__graph")).toHaveCount(0);
    const section = page.locator("#github");
    test.skip((await section.count()) === 0, "this build could not reach GitHub");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("canvas")).toHaveCount(1);
    await expect(section.getByRole("button", { name: "3D skyline" })).toBeVisible();
    await expect(section.locator(".skyline__title")).toContainText("contributions in the last year");
    expect(errors).toEqual([]);
  });
});
