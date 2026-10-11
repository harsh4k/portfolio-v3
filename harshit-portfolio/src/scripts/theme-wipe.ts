/**
 * The theme switch as a wipe between two snapshots of the page.
 *
 * The design switches themes with a red mask (mix-blend-mode) that slides over
 * the page, and swaps the theme class only when the mask is done. That works
 * when the ink is the same colour in both themes, as it was with the
 * off-white one. In the dark green theme the ink changes too, so the old
 * theme's text and hero terrain showed through the red until the very end,
 * then everything flipped at once and the terrain caught up a frame later.
 *
 * Where the browser has view transitions, the click instead swaps the class
 * at once and wipes the new page in over a snapshot of the old one, after the
 * terrain has redrawn in the new colours. The design's own handler still
 * runs, so it finishes its bookkeeping, but its mask is hidden. Without view
 * transitions, or with Reduced Motion, the design's wipe is left as it was.
 */

/** The design's wipe takes 1s; its handler sets the class again when done. */
const DESIGN_WIPE_MS = 1100;

const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>(".js-contrast");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

if (button && "startViewTransition" in document) {
  root.classList.add("has-theme-wipe");
  let passThrough = false;
  let busy = false;

  document.addEventListener(
    "click",
    (event) => {
      if (passThrough || reduced.matches || !(event.target instanceof Node) || !button.contains(event.target)) return;
      event.stopImmediatePropagation();
      if (busy) return;
      busy = true;
      window.setTimeout(() => (busy = false), DESIGN_WIPE_MS);

      const contrasted = !root.classList.contains("theme-contrasted");
      const transition = document.startViewTransition(async () => {
        // The design's handler reads the class to pick a direction, so it
        // runs first; its class change lands at the end and changes nothing.
        passThrough = true;
        button.click();
        passThrough = false;
        root.classList.toggle("theme-contrasted", contrasted);
        // The design's wipe runs right to left into the green theme and left
        // to right back out of it; site.css picks the direction from this.
        root.classList.toggle("theme-wipe-back", !contrasted);
        // The hero terrain hears the class change in a microtask and redraws
        // in the new colours right away. No waiting on animation frames:
        // they are held back until this callback ends, so it would hang
        // until the browser gave up on the transition.
        await Promise.resolve();
      });
      transition.finished.finally(() => root.classList.remove("theme-wipe-back")).catch(() => {});
    },
    true,
  );
}

export {};
