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
  const isSwipeMode = () =>
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(max-width: 768px)").matches ||
    (navigator.maxTouchPoints > 0 && window.innerWidth <= 900);

  /** Match #intro-layer opacity transition — do not stack extra waits on top */
  const LAYER_FADE_MS = 450;

  let navigating = false;
  let unbindSwipe = () => {};

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
   * Hand pull or swipe → start the Wodniack loader immediately, fade the 3D
   * cover, then drop it. Navbar timing is owned by Wodniack's header intro().
   */
  const revealPortfolio = (isFast = false, { fullPage = false } = {}) => {
    if (navigating) return;
    navigating = true;
    unbindSwipe();

    const introLayer = document.getElementById("intro-layer");
    document.documentElement.classList.add("intro-started");
    document.documentElement.classList.remove("intro-swipe");
    window.dispatchEvent(new CustomEvent("startPortfolioIntro"));
    watchScrollUnblock();

    const dropIntroLayer = () => {
      stopIntroEngine(introLayer);
      document
        .querySelectorAll("link[data-intro-style]")
        .forEach((link) => link.remove());
      introLayer?.remove();
      window.dispatchEvent(new CustomEvent("portfolio:entered"));
    };

    if (!introLayer) {
      dropIntroLayer();
      return;
    }

    introLayer.querySelectorAll("canvas").forEach((canvas) => {
      canvas.style.opacity = "0";
      canvas.style.visibility = "hidden";
    });

    if (fullPage) {
      introLayer.style.transition =
        "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)";
      introLayer.style.opacity = "1";
      introLayer.style.transform = `translate3d(0, ${Math.max(window.innerHeight, 1)}px, 0)`;
      introLayer.classList.add("intro-layer--exit-down");
      window.setTimeout(dropIntroLayer, isFast ? 80 : 480);
      return;
    }

    introLayer.classList.add("is-leaving");
    window.setTimeout(dropIntroLayer, isFast ? 80 : LAYER_FADE_MS);
  };

  const bindSwipeToEnter = (introLayer) => {
    if (!introLayer) return;

    const ensureHint = () => {
      if (navigating) return introLayer.querySelector(".intro-swipe-catch");
      introLayer.classList.add("intro-layer--swipe");
      document.documentElement.classList.add("intro-swipe");
      if (introLayer.querySelector(".intro-swipe-catch")) {
        return introLayer.querySelector(".intro-swipe-catch");
      }
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
      return catcher;
    };

    let catcher = isSwipeMode() ? ensureHint() : introLayer.querySelector(".intro-swipe-catch");
    const commitAt = () => Math.max(56, window.innerHeight * 0.12);
    let startX = 0;
    let startY = 0;
    let startT = 0;
    let tracking = false;
    let pointerId = null;
    let wheelAcc = 0;

    const clientPoint = (event) => {
      if (event.touches && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
      if (event.changedTouches && event.changedTouches[0]) {
        return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
      }
      return { x: event.clientX, y: event.clientY };
    };

    const follow = (dy) => {
      const pull = Math.max(0, dy);
      const t = Math.min(1, pull / commitAt());
      introLayer.style.transition = "none";
      introLayer.style.transform = `translate3d(0, ${pull}px, 0)`;
      introLayer.style.opacity = "1";
      catcher?.style.setProperty("--swipe-t", String(t));
    };

    const snapBack = () => {
      introLayer.style.transition =
        "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease";
      introLayer.style.transform = "translate3d(0, 0, 0)";
      introLayer.style.opacity = "1";
      catcher?.style.setProperty("--swipe-t", "0");
    };

    const tryCommit = (dy, dx, dt) => {
      const vertical = dy > Math.abs(dx) * 0.85;
      const flicked = vertical && dy > 36 && dt < 420;
      if (vertical && (dy >= commitAt() || flicked)) {
        catcher?.classList.add("is-committed");
        revealPortfolio(false, { fullPage: true });
        return true;
      }
      return false;
    };

    const ignoreTarget = (event) =>
      event.target instanceof Element && event.target.closest(".mobile-switch");

    const onStart = (event) => {
      if (tracking || navigating || !isSwipeMode() || ignoreTarget(event)) return;
      if (event.pointerType === "mouse" && event.button) return;
      const point = clientPoint(event);
      tracking = true;
      pointerId = event.pointerId ?? "touch";
      startX = point.x;
      startY = point.y;
      startT = performance.now();
    };

    const onMove = (event) => {
      if (!tracking) return;
      if (event.pointerId != null && pointerId !== "touch" && event.pointerId !== pointerId) return;
      const point = clientPoint(event);
      const dy = point.y - startY;
      const dx = point.x - startX;
      if (Math.abs(dy) > 6 && Math.abs(dy) >= Math.abs(dx)) {
        event.preventDefault();
      }
      follow(dy);
    };

    const onEnd = (event) => {
      if (!tracking) return;
      if (event.pointerId != null && pointerId !== "touch" && event.pointerId !== pointerId) return;
      tracking = false;
      const point = clientPoint(event);
      const dy = point.y - startY;
      const dx = point.x - startX;
      const dt = performance.now() - startT;
      pointerId = null;
      if (!tryCommit(dy, dx, dt)) snapBack();
    };

    const onWheel = (event) => {
      if (navigating || !isSwipeMode() || ignoreTarget(event)) return;
      if (event.deltaY <= 0) {
        wheelAcc = Math.max(0, wheelAcc + event.deltaY);
        return;
      }
      event.preventDefault();
      wheelAcc += event.deltaY;
      follow(wheelAcc);
      if (wheelAcc >= commitAt()) {
        catcher?.classList.add("is-committed");
        revealPortfolio(false, { fullPage: true });
      }
    };

    const opts = { capture: true, passive: false };
    window.addEventListener("pointerdown", onStart, opts);
    window.addEventListener("pointermove", onMove, opts);
    window.addEventListener("pointerup", onEnd, opts);
    window.addEventListener("pointercancel", onEnd, opts);
    if (!window.PointerEvent) {
      window.addEventListener("touchstart", onStart, opts);
      window.addEventListener("touchmove", onMove, opts);
      window.addEventListener("touchend", onEnd, opts);
    }
    window.addEventListener("wheel", onWheel, opts);
    const onResize = () => {
      if (navigating) return;
      if (isSwipeMode()) catcher = ensureHint();
    };
    window.addEventListener("resize", onResize);

    unbindSwipe = () => {
      window.removeEventListener("pointerdown", onStart, opts);
      window.removeEventListener("pointermove", onMove, opts);
      window.removeEventListener("pointerup", onEnd, opts);
      window.removeEventListener("pointercancel", onEnd, opts);
      window.removeEventListener("touchstart", onStart, opts);
      window.removeEventListener("touchmove", onMove, opts);
      window.removeEventListener("touchend", onEnd, opts);
      window.removeEventListener("wheel", onWheel, opts);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("intro-swipe");
    };
  };

  bindSwipeToEnter(document.getElementById("intro-layer"));

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
