import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import WireTerrain from "@/components/ui/wire-terrain";

/**
 * The hero band's wire terrain (src/components/ui/wire-terrain.tsx, from
 * Originkit), drawn in the page's colours: --color-primary for the ground and
 * sky, --color-secondary for the wires, --color-shadow for the sun. The
 * component needs real colour values, not var(), so they are read from the
 * page and read again when the theme switch changes them. A theme can set
 * --color-sun to give the sun its own colour.
 *
 * It starts drawing only once the visitor leaves the 3D intro, so the two
 * don't compete for the GPU. It draws one hidden frame under the HC loader
 * that follows, so its shaders are ready, then fades in and moves as the
 * title and header arrive, not ahead of them. Reduced Motion gets one still
 * frame.
 */

interface Palette {
  ground: string;
  wire: string;
  sun: string;
}

const FALLBACK: Palette = { ground: "#f40c3f", wire: "#160000", sun: "#540000" };

function readPalette(el: Element): Palette {
  const css = getComputedStyle(el);
  const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    ground: read("--color-primary", FALLBACK.ground),
    wire: read("--color-secondary", FALLBACK.wire),
    sun: read("--color-sun", "") || read("--color-shadow", FALLBACK.sun),
  };
}

/**
 * After leaving the intro, when to draw the hidden warm-up frame under the HC
 * loader: late enough to stay off the intro's way out, early enough that the
 * shader compile is done before the hero shows. Only one frame, so the loader
 * keeps the GPU to itself.
 */
const WARMUP_MS = 1000;
/**
 * Fallback only: the most the hero's entrance should take after the visitor
 * leaves the intro. Normally the scroll unlock or the waves' introend shows
 * the terrain first.
 */
const ENTRANCE_MAX_MS = 8000;

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
/**
 * The hero is on screen once the intro is over and the engine has unlocked
 * scrolling, which it does as the title comes in after the HC loader.
 */
const entered = () => {
  const html = document.documentElement.classList;
  return still() || (html.contains("intro-done") && !html.contains("is-scroll-blocked"));
};

export default function HeroTerrain({ mount }: { mount: HTMLElement }) {
  const [palette, setPalette] = useState(() => readPalette(mount));
  const [shown, setShown] = useState(entered);
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    // The theme switch swaps the colour variables through a class on <html>.
    const theme = new MutationObserver(() => {
      const next = readPalette(mount);
      // Synchronously, so the terrain's next frame is already in the new
      // colours when the theme wipe (scripts/theme-wipe.ts) snapshots it.
      flushSync(() =>
        setPalette((prev) =>
          prev.ground === next.ground && prev.wire === next.wire && prev.sun === next.sun ? prev : next,
        ),
      );
      if (entered()) setShown(true);
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const show = () => setShown(true);
    // The class watcher above shows it on the scroll unlock; the long timer
    // only covers an engine that never unlocks.
    let warmTimer = 0;
    let warmFrame = 0;
    let timer = 0;
    const warmUp = () => {
      setWarm(true);
      // Two frames: one for React to pass running down, one for the draw.
      warmFrame = requestAnimationFrame(() => (warmFrame = requestAnimationFrame(() => setWarm(false))));
    };
    const showLater = () => {
      warmTimer = window.setTimeout(warmUp, WARMUP_MS);
      timer = window.setTimeout(show, ENTRANCE_MAX_MS);
    };
    const waves = mount.closest("a-waves");
    waves?.addEventListener("introend", show, { once: true });
    window.addEventListener("portfolio:entered", showLater, { once: true });
    return () => {
      theme.disconnect();
      window.clearTimeout(warmTimer);
      cancelAnimationFrame(warmFrame);
      window.clearTimeout(timer);
      waves?.removeEventListener("introend", show);
      window.removeEventListener("portfolio:entered", showLater);
    };
  }, [mount]);

  useEffect(() => {
    if (shown) mount.dataset["shown"] = "true";
  }, [mount, shown]);

  const reduced = still();
  return (
    <WireTerrain
      background={palette.ground}
      lineColor={palette.wire}
      accent={palette.sun}
      running={shown || warm}
      speed={reduced ? 0 : 100}
      hover={reduced ? 0 : 200}
      // The component's own 1200x800 minimum would overflow the band on phones.
      style={{ minWidth: 0, minHeight: 0 }}
    />
  );
}
