/**
 * bridge.js — hands off from the 3D intro layer to the portfolio.
 *
 * The page stacks two independent apps: the Three.js intro scene (#intro-layer)
 * and the GSAP portfolio underneath it. This file owns the handover.
 *
 *   1. hand pulled       → the scene clears itself (hand retracts, face and
 *                          scribbles animate out) over EXIT_MS
 *   2. scene is empty    → the engine is stopped, the canvas destroyed and the
 *                          intro's global stylesheet detached (its html/body
 *                          reset overrides the portfolio's own body padding,
 *                          background and typography), then the site intro is
 *                          released as the page-change transition
 *   3. same moment       → what is left of #intro-layer is a plain red panel, so
 *                          it cross-fades away over the opening of the site
 *                          intro rather than cutting to it
 *
 * Scroll stays blocked throughout; the site intro removes `is-scroll-blocked`
 * itself when it finishes, exactly like the reference implementation.
 */
(() => {
  /** Time for the 3D scene to animate itself empty after the pull */
  const EXIT_MS = 520;
  /** Cross-fade of the leftover red panel into the site intro */
  const CROSSFADE_MS = 500;

  let navigating = false;

  /**
   * Stop the intro engine.
   *
   * Removing the layer only detaches the canvas — the engine's RAF manager keeps
   * updating the scene and rendering into it for the rest of the session, which
   * roughly doubles per-frame work and makes the portfolio stutter. The flag is
   * read by the patched RAF manager (see clean-adrien.mjs); losing the context
   * releases the GPU resources with it.
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
      // Hidden rather than detached: the engine's resize handler reads
      // canvas.parentNode.offsetWidth and throws on a parentless canvas. It goes
      // away with the layer.
      canvas.style.display = "none";
    });
  };

  /** Re-measure once the site intro releases the scroll lock */
  const watchScrollUnblock = () => {
    const html = document.documentElement;
    if (!html.classList.contains("is-scroll-blocked")) return;

    const observer = new MutationObserver(() => {
      if (html.classList.contains("is-scroll-blocked")) return;
      observer.disconnect();
      window.dispatchEvent(new Event("resize"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
  };

  /** Tear down the intro layer, then play the portfolio's own intro */
  const revealPortfolio = () => {
    if (navigating) return;
    navigating = true;

    window.setTimeout(() => {
      const introLayer = document.getElementById("intro-layer");

      // Engine and canvas go first, so detaching the stylesheet below cannot
      // restyle a canvas that is still on screen.
      stopIntroEngine(introLayer);

      document
        .querySelectorAll("link[data-intro-style]")
        .forEach((link) => link.remove());

      // Let GSAP/ScrollTrigger and Lenis re-measure against the clean layout
      // before the site intro starts positioning things.
      window.dispatchEvent(new Event("resize"));
      watchScrollUnblock();

      // Release the site intro — the page-change transition.
      window.dispatchEvent(new CustomEvent("startPortfolioIntro"));

      // #intro-layer is now a plain red panel matching the site intro's own
      // background, so fading it reveals the transition instead of cutting to it.
      document.documentElement.classList.add("intro-done");

      window.setTimeout(() => {
        introLayer?.remove();
        window.dispatchEvent(new CustomEvent("portfolio:entered"));
      }, CROSSFADE_MS + 50);
    }, EXIT_MS);
  };

  // --- Primary trigger: the 3D hand was grabbed & pulled far enough ---
  window.addEventListener("intro:pull", revealPortfolio, { once: true });

  // --- Touch devices: the intro scene builds no hand, so a pull is impossible.
  //     Without this the layer is a dead end. A tap anywhere enters instead. ---
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    document
      .getElementById("intro-layer")
      ?.addEventListener("pointerup", revealPortfolio, { once: true });
  }

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
        revealPortfolio();
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
      revealPortfolio();
    }
  });
})();
