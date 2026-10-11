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

const afterFrames = (n: number) =>
  new Promise<void>((resolve) => {
    const step = () => (n-- <= 0 ? resolve() : requestAnimationFrame(step));
    step();
  });

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
        // Let the hero terrain redraw in the new colours before the snapshot.
        await afterFrames(2);
      });
      transition.finished.catch(() => {});
    },
    true,
  );
}

export {};
