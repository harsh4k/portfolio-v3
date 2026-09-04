import { test, expect } from "@playwright/test";

/**
 * Smoke tests for the intro -> portfolio handover.
 *
 * Every assertion here corresponds to something that has actually broken in
 * this repo, not to a hypothetical. In the order they bit:
 *
 *   - the site intro ran underneath the 3D layer and was never seen
 *   - the hero overflowed into the next section
 *   - the 3D engine kept rendering forever after teardown
 *   - the page reported no LCP at all, so Lighthouse could not score it
 *   - the reference author's links, bio and images shipped in the DOM
 *   - two <h1> elements in one document
 *   - a five second animated loader played for prefers-reduced-motion users
 */

const THIRD_PARTY =
  /adrienlamy|Adrien Lamy|Based in Paris|Mercenary|harshitchauhan\.dev|dogstudio|cosmicshelter|melius\.com|myli\.io|blast\.co\.uk|waaark|portfolio-20\d\d/;

const ALLOWED_HOSTS =
  /github\.com|linkedin\.com|velsaro\.in|nexcart|synapical|attendov1|coffeedigital|threedwebs|oysnk|harsh4k\.github\.io/;

/** Collect console errors and failed responses for the whole test. */
function watchForFailures(page) {
  const errors = [];
  const failed = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.status() + " " + r.url());
  });
  return { errors, failed };
}

/** Desktop: hover the 3D hand until it is grabbable, then pull it left. */
async function pullHand(page) {
  const box = page.viewportSize();
  const y = box.height * 0.46;

  await expect
    .poll(
      async () => {
        await page.mouse.move(box.width - 60, y);
        await page.mouse.move(box.width - 80, y);
        return page.evaluate(() => document.body.style.cursor);
      },
      { message: "3D hand never became grabbable", timeout: 30000 }
    )
    .toBe("grab");

  await page.mouse.down();
  for (let i = 1; i <= 20; i++) {
    await page.mouse.move(box.width - 80 - (box.width * 0.45 * i) / 20, y);
  }
  await page.mouse.up();
}

/** Mobile: swipe down on the intro scene. */
async function swipeIn(page) {
  await page.waitForSelector("#intro-layer .intro-swipe-catch", { timeout: 30000 });
  await page.evaluate(async () => {
    const layer = document.getElementById("intro-layer");
    const target = layer.querySelector(".intro-swipe-catch") || layer;
    const frame = () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const send = (type, clientY) =>
      target.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          cancelable: true,
          pointerId: 1,
          pointerType: "touch",
          clientX: 195,
          clientY,
          isPrimary: true,
        })
      );
    send("pointerdown", 300);
    await frame();
    for (let i = 1; i <= 24; i++) {
      send("pointermove", 300 + i * 14);
      await frame();
    }
    send("pointerup", 300 + 24 * 14);
  });
}

/** The site intro takes ~5s; wait for the state it leaves behind. */
async function waitForPortfolio(page) {
  await expect
    .poll(
      async () =>
        page.evaluate(() => ({
          layer: !!document.getElementById("intro-layer"),
          loader: !!document.querySelector(".js-intro"),
          blocked: document.documentElement.classList.contains("is-scroll-blocked"),
        })),
      { message: "handover never completed", timeout: 30000 }
    )
    .toEqual({ layer: false, loader: false, blocked: false });
}

test.describe("intro handover", () => {
  test("desktop: pulling the hand reaches a scrollable portfolio", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "hand only exists on desktop");
    const seen = watchForFailures(page);

    await page.goto("/");
    await pullHand(page);
    await waitForPortfolio(page);

    // The hero must end exactly on the viewport edge. When the intro stylesheet
    // leaked its html/body reset, body padding was lost and the next section
    // showed through the bottom of the hero.
    const heroGap = await page.evaluate(() => {
      const r = document.querySelector(".s-hero").getBoundingClientRect();
      return Math.abs(r.bottom - window.innerHeight);
    });
    expect(heroGap, "hero should end on the viewport edge").toBeLessThan(2);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled, "page should scroll").toBeGreaterThan(500);

    expect(seen.failed, "no failed requests").toEqual([]);
    expect(seen.errors, "no console errors").toEqual([]);
  });

  test("mobile: swiping reaches a portfolio with no sideways overflow", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "swipe is the touch entry");
    const seen = watchForFailures(page);

    await page.goto("/");
    await expect(page.locator(".intro-swipe-hint__label")).toHaveText(/swipe/i);
    await swipeIn(page);
    await waitForPortfolio(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, "no horizontal overflow").toBeLessThanOrEqual(1);

    expect(seen.failed, "no failed requests").toEqual([]);
    expect(seen.errors, "no console errors").toEqual([]);
  });

  test("the 3D engine stops rendering once the layer is gone", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "one platform is enough");

    await page.addInitScript(() => {
      const raf = window.requestAnimationFrame.bind(window);
      window.__rafCount = 0;
      window.requestAnimationFrame = (cb) => {
        window.__rafCount++;
        return raf(cb);
      };
    });

    // Deliberately not asserting on requestAnimationFrame rate. Measured, it
    // rises after teardown (45/s to 125/s) because the portfolio's GSAP, Lenis
    // and ScrollTrigger loops only start once the intro hands over — so a low
    // idle rate proves nothing and a threshold is just a machine-speed guess.
    //
    // The contract is instead checked at both ends: the patch that gives the
    // engine a kill switch is present in the shipped bundle, and the flag it
    // keys on is actually set at runtime.
    const bundle = await page.request.get("/assets/index-wQJ6Ws5X.js");
    expect(bundle.ok(), "intro bundle should be served").toBe(true);
    // Compared as a boolean rather than with toContain, so a failure reports one
    // line instead of dumping 800KB of minified bundle into the report.
    const hasKillSwitch = (await bundle.text()).includes("__introTornDown");
    expect(
      hasKillSwitch,
      "engine RAF manager must carry the __introTornDown kill switch"
    ).toBe(true);

    await page.goto("/");
    await pullHand(page);
    await waitForPortfolio(page);

    // Removing #intro-layer only detaches the canvas; without the kill switch
    // the engine's RAF manager kept updating the scene into it for the rest of
    // the session, roughly doubling per-frame work.
    const stopped = await page.evaluate(() => window.__introTornDown === true);
    expect(stopped, "engine kill switch should be set after teardown").toBe(true);

    const canvasGone = await page.evaluate(
      () => document.querySelectorAll("#intro-layer canvas").length === 0
    );
    expect(canvasGone, "intro canvas should be gone").toBe(true);
  });
});

test.describe("page contract", () => {
  test("reports a Largest Contentful Paint", async ({ page }) => {
    await page.goto("/");
    // Guards NO_LCP: the hero used to sit at opacity 0 behind a <canvas>, and
    // canvas is never an LCP candidate, so Lighthouse could not score at all.
    const lcp = await page.evaluate(
      () =>
        new Promise((resolve) => {
          let last = null;
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) last = e;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          setTimeout(
            () => resolve(last ? { start: Math.round(last.startTime), size: last.size } : null),
            4000
          );
        })
    );
    // The guard is simply that an LCP is reported at all. Previously none was,
    // and Lighthouse failed the whole Performance category with NO_LCP.
    //
    // Not asserting which element or how large: the candidate legitimately
    // differs by viewport — the hero headline on desktop (~170k px2), an
    // intro-layer element on mobile (~10k) — and pinning either would make this
    // a brittle snapshot rather than a regression guard.
    expect(lcp, "an LCP entry must be reported").not.toBeNull();
    expect(lcp.size, "LCP candidate should be a real element").toBeGreaterThan(1000);
  });

  test("has exactly one h1", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    expect(await page.locator("h1").count()).toBe(1);
  });

  test("ships none of the reference author's content", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);

    const html = await page.content();
    expect(html).not.toMatch(THIRD_PARTY);

    const foreign = await page.evaluate((allowed) => {
      const re = new RegExp(allowed);
      return [
        ...new Set(
          [...document.querySelectorAll("a[href]")]
            .map((a) => {
              try {
                return new URL(a.href).host;
              } catch {
                return null;
              }
            })
            .filter((h) => h && h !== location.host && !re.test(h))
        ),
      ];
    }, ALLOWED_HOSTS.source);

    expect(foreign, "only Harshit's links may leave the site").toEqual([]);
  });

  test("prefers-reduced-motion skips the animated loader", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const p = await ctx.newPage();
    await p.goto("http://127.0.0.1:4175/");

    // Not just "eventually correct" - it must be fast. GSAP drives the loader,
    // so CSS reduced-motion overrides cannot shorten it; the engine is patched
    // to fast-forward the timeline instead.
    await expect
      .poll(
        async () =>
          p.evaluate(() => ({
            loader: !!document.querySelector(".js-intro"),
            blocked: document.documentElement.classList.contains("is-scroll-blocked"),
          })),
        { message: "reduced-motion path should settle immediately", timeout: 5000 }
      )
      .toEqual({ loader: false, blocked: false });

    await ctx.close();
  });
});
