import { useEffect, useState } from "react";
import WireTerrain from "@/components/ui/wire-terrain";

/**
 * The hero band's wire terrain (src/components/ui/wire-terrain.tsx, from
 * Originkit), drawn in the page's colours: --color-primary for the ground and
 * sky, --color-secondary for the wires, --color-shadow for the sun. The
 * component needs real colour values, not var(), so they are read from the
 * page and read again when the theme switch changes them.
 *
 * It waits for the hero's entrance before it starts moving, so it doesn't
 * compete with the 3D intro for the GPU. Reduced Motion gets one still frame.
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
    sun: read("--color-shadow", FALLBACK.sun),
  };
}

const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const entered = () => still() || document.documentElement.classList.contains("intro-done");

export default function HeroTerrain({ mount }: { mount: HTMLElement }) {
  const [palette, setPalette] = useState(() => readPalette(mount));
  const [shown, setShown] = useState(entered);

  useEffect(() => {
    // The theme switch swaps the colour variables through a class on <html>.
    const theme = new MutationObserver(() => {
      const next = readPalette(mount);
      setPalette((prev) =>
        prev.ground === next.ground && prev.wire === next.wire && prev.sun === next.sun ? prev : next,
      );
      if (entered()) setShown(true);
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const show = () => setShown(true);
    const waves = mount.closest("a-waves");
    waves?.addEventListener("introend", show, { once: true });
    window.addEventListener("portfolio:entered", show, { once: true });
    return () => {
      theme.disconnect();
      waves?.removeEventListener("introend", show);
      window.removeEventListener("portfolio:entered", show);
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
      running={shown}
      speed={reduced ? 0 : 100}
      hover={reduced ? 0 : 200}
      // The component's own 1200x800 minimum would overflow the band on phones.
      style={{ minWidth: 0, minHeight: 0 }}
    />
  );
}
