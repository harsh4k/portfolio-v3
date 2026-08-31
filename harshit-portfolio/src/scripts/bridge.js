/**
 * bridge.js — hands off from the 3D intro layer to the portfolio.
 *
 * The page stacks two independent apps: the Three.js intro scene (#intro-layer)
 * and the GSAP portfolio underneath it. This file owns the handover.
 *
 *   1. Desktop (fine pointer): dynamically loads 3D scene. Hand pulled → scene
 *      clears itself over EXIT_MS.
 *   2. Mobile / Touch (coarse pointer): skips 819 KB 3D bundle completely,
 *      presents an instant brutalist tap-to-enter badge with snappy handover.
 *   3. Reduced Motion: immediately bypasses intro layer without animation delay.
 *   4. Scene empty / entry triggered → engine stopped, canvas WebGL context released,
 *      intro stylesheet detached, and site intro dispatched.
 */
(() => {
  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Time for the 3D scene to animate itself empty after the pull (or snappy on touch) */
  const DEFAULT_EXIT_MS = 520;
  const TOUCH_EXIT_MS = 120;
  /** Cross-fade of the leftover red panel into the site intro */
  const CROSSFADE_MS = 450;

  let navigating = false;

  /**
   * Stop the intro engine and release WebGL contexts.
   */
  const stopIntroEngine = (introLayer) => {
    window.__introTornDown = true;

    introLayer?.querySelectorAll("canvas").forEach((canvas) => {
      try {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        // Context already gone — nothing to release.
      }
      canvas.style.display = "none";
    });
  };

  /** Re-measure once the site intro releases the scroll lock */
  const watchScrollUnblock = () => {
    const html = document.documentElement;
    const triggerRefresh = () => {
      window.dispatchEvent(new Event("resize"));
      if (window.lenis) window.lenis.resize();
    };

    if (!html.classList.contains("is-scroll-blocked")) {
      triggerRefresh();
      return;
    }

    const observer = new MutationObserver(() => {
      if (html.classList.contains("is-scroll-blocked")) return;
      observer.disconnect();
      triggerRefresh();
      setTimeout(triggerRefresh, 150);
      setTimeout(triggerRefresh, 500);
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    setTimeout(() => {
      if (html.classList.contains("is-scroll-blocked")) {
        html.classList.remove("is-scroll-blocked");
        triggerRefresh();
      }
    }, 4500);
  };

  /** Immediate bypass for prefers-reduced-motion */
  if (prefersReducedMotion) {
    const introLayer = document.getElementById("intro-layer");
    stopIntroEngine(introLayer);
    document
      .querySelectorAll("link[data-intro-style]")
      .forEach((link) => link.remove());
    introLayer?.remove();
    document.documentElement.classList.add("intro-done");
    document.documentElement.classList.remove("is-scroll-blocked");
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new CustomEvent("startPortfolioIntro"));
    window.dispatchEvent(new CustomEvent("portfolio:entered"));
    return;
  }

  /** Tear down the intro layer, then play the portfolio's own intro */
  const revealPortfolio = (isFast = false) => {
    if (navigating) return;
    navigating = true;

    const exitDelay = isFast || isTouchDevice ? TOUCH_EXIT_MS : DEFAULT_EXIT_MS;

    window.setTimeout(() => {
      const introLayer = document.getElementById("intro-layer");

      stopIntroEngine(introLayer);

      document
        .querySelectorAll("link[data-intro-style]")
        .forEach((link) => link.remove());

      window.dispatchEvent(new Event("resize"));
      watchScrollUnblock();

      window.dispatchEvent(new CustomEvent("startPortfolioIntro"));

      document.documentElement.classList.add("intro-done");

      window.setTimeout(() => {
        introLayer?.remove();
        window.dispatchEvent(new CustomEvent("portfolio:entered"));
      }, CROSSFADE_MS + 50);
    }, exitDelay);
  };

  // --- Dynamic 3D Bundle Loading (Desktop Only) ---
  if (!isTouchDevice) {
    import("/assets/index-wQJ6Ws5X.js").catch((err) => {
      console.warn("Could not load 3D intro bundle, falling back to direct entry", err);
      revealPortfolio(true);
    });
  } else {
    // Mobile / Touch: Render brutalist tap affordance
    const introLayer = document.getElementById("intro-layer");
    if (introLayer) {
      const entryBtn = document.createElement("button");
      entryBtn.type = "button";
      entryBtn.className = "mobile-intro-entry";
      entryBtn.setAttribute("aria-label", "Enter Harshit Chauhan Portfolio");
      entryBtn.innerHTML = `<strong>HARSHIT CHAUHAN</strong><span>TAP TO ENTER →</span>`;
      entryBtn.addEventListener("click", () => revealPortfolio(true));
      introLayer.appendChild(entryBtn);

      introLayer.addEventListener("pointerup", () => revealPortfolio(true), { once: true });
    }
  }

  // --- Primary trigger: the 3D hand was grabbed & pulled far enough ---
  window.addEventListener("intro:pull", () => revealPortfolio(false), { once: true });

  // --- Fallback: the Vue panel opening also means the pull completed ---
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      const el = record.target;
      if (
        el instanceof Element &&
        el.classList.contains("side-panel__content") &&
        !el.classList.contains("is-hidden")
      ) {
        observer.disconnect();
        revealPortfolio(false);
        return;
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  // --- Keyboard skip for accessibility ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Enter") {
      observer.disconnect();
      revealPortfolio(true);
    }
  });
})();
