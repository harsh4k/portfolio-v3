/**
 * bridge.js — hands off from the 3D intro layer to the portfolio.
 *
 * The page stacks two independent apps: the Three.js intro scene (#intro-layer)
 * and the GSAP portfolio underneath it. This file owns the handover.
 *
 *   1. Load the 3D laptop scene on every pointer type (desktop, phone, DevTools).
 *   2. Desktop (hover): hand pulled → scene clears itself over EXIT_MS.
 *      Phone / narrow: swipe down on the scene → same handover, with a hint.
 *   3. Reduced Motion: immediately bypasses intro layer without animation delay.
 *   3. Scene empty / entry triggered → engine stopped, canvas WebGL context released,
 *      intro stylesheet detached, and site intro dispatched.
 */
(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSwipeIntro =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(max-width: 768px)").matches;

  /** Time for the 3D scene to fade after GSAP has painted the loader's first frame */
  const DEFAULT_EXIT_MS = 520;
  const TOUCH_EXIT_MS = 120;
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
      // Wait until the home intro has restored .js-border / a-waves transforms
      // before measuring. Immediate resize here was freezing the collapsed hero.
      setTimeout(triggerRefresh, 400);
      setTimeout(triggerRefresh, 900);
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    setTimeout(() => {
      if (html.classList.contains("is-scroll-blocked")) {
        html.classList.remove("is-scroll-blocked");
        triggerRefresh();
      }
    }, 8000);
  };

  /** Immediate bypass for prefers-reduced-motion */
  if (prefersReducedMotion) {
    const introLayer = document.getElementById("intro-layer");
    stopIntroEngine(introLayer);
    document
      .querySelectorAll("link[data-intro-style]")
      .forEach((link) => link.remove());
    introLayer?.remove();
    document.documentElement.classList.add("intro-started", "intro-done");
    document.documentElement.classList.remove("is-scroll-blocked");
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new CustomEvent("startPortfolioIntro"));
    window.dispatchEvent(new CustomEvent("portfolio:entered"));
    return;
  }

  /**
   * Hand pull → Wodniack loader, then drop the 3D layer.
   *
   * intro() must run *before* the canvas fades. The loader overlay sits in its
   * CSS rest state (assembled HC). If that overlay is uncovered first, that
   * end-frame flashes, then GSAP rewinds to scale 0 and plays — the jitter.
   * Scroll stays locked until intro() removes the overlay, same as Wodniack.
   */
  const revealPortfolio = (isFast = false) => {
    if (navigating) return;
    navigating = true;

    const introLayer = document.getElementById("intro-layer");
    document.documentElement.classList.add("intro-started");
    document.documentElement.classList.remove("intro-swipe");
    window.dispatchEvent(new CustomEvent("startPortfolioIntro"));
    watchScrollUnblock();

    const fadeIntroLayer = () => {
      if (introLayer) introLayer.classList.add("is-leaving");

      const exitDelay = isFast ? TOUCH_EXIT_MS : DEFAULT_EXIT_MS;

      window.setTimeout(() => {
        stopIntroEngine(introLayer);

        document
          .querySelectorAll("link[data-intro-style]")
          .forEach((link) => link.remove());

        document.documentElement.classList.add("intro-done");

        window.setTimeout(() => {
          introLayer?.remove();
          window.dispatchEvent(new CustomEvent("portfolio:entered"));
        }, CROSSFADE_MS);
      }, exitDelay);
    };

    requestAnimationFrame(() => requestAnimationFrame(fadeIntroLayer));
  };

  const bindSwipeToEnter = (introLayer) => {
    if (!introLayer || introLayer.querySelector(".intro-swipe-catch")) return;

    introLayer.classList.add("intro-layer--swipe");
    document.documentElement.classList.add("intro-swipe");

    const catcher = document.createElement("div");
    catcher.className = "intro-swipe-catch";
    catcher.innerHTML = `
      <p class="intro-swipe-hint">
        <span class="intro-swipe-hint__chevrons" aria-hidden="true">
          <span></span><span></span>
        </span>
        <span class="intro-swipe-hint__label">Swipe down</span>
      </p>
    `;
    introLayer.appendChild(catcher);

    const commitAt = () => Math.max(96, window.innerHeight * 0.2);
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let pointerId = null;

    const follow = (dy) => {
      const pull = Math.max(0, dy);
      const t = Math.min(1, pull / commitAt());
      introLayer.style.transition = "none";
      introLayer.style.transform = `translate3d(0, ${pull * 0.35}px, 0)`;
      introLayer.style.opacity = String(1 - t * 0.28);
      catcher.style.setProperty("--swipe-t", String(t));
    };

    const onPointerDown = (event) => {
      if (navigating || event.button) return;
      tracking = true;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      catcher.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!tracking || event.pointerId !== pointerId) return;
      const dy = event.clientY - startY;
      const dx = event.clientX - startX;
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        event.preventDefault();
      }
      follow(dy);
    };

    const endGesture = (event) => {
      if (!tracking || (event && event.pointerId !== pointerId)) return;
      tracking = false;
      const dy = (event?.clientY ?? startY) - startY;
      const dx = (event?.clientX ?? startX) - startX;
      pointerId = null;
      const vertical = dy > Math.abs(dx) * 1.15;
      if (vertical && dy >= commitAt()) {
        catcher.classList.add("is-committed");
        revealPortfolio(false);
        return;
      }
      introLayer.style.transition = "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease";
      introLayer.style.transform = "translate3d(0, 0, 0)";
      introLayer.style.opacity = "1";
      catcher.style.setProperty("--swipe-t", "0");
    };

    catcher.addEventListener("pointerdown", onPointerDown);
    catcher.addEventListener("pointermove", onPointerMove, { passive: false });
    catcher.addEventListener("pointerup", endGesture);
    catcher.addEventListener("pointercancel", endGesture);
  };

  const introLayer = document.getElementById("intro-layer");
  if (isSwipeIntro) bindSwipeToEnter(introLayer);

  import("/assets/index-wQJ6Ws5X.js")
    .then(() => {
      window.__resetIntroHand?.();
    })
    .catch((err) => {
      console.warn("Could not load 3D intro bundle, falling back to direct entry", err);
      revealPortfolio(true);
    });

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
