import { useEffect, useRef, useState } from "react";
import SlatCountPreloader, { scpSimulated } from "@/components/ui/slat-count-preloader";
import { profile } from "../data/profile";

/**
 * The loader on the red intro cover, shown until the 3D scene draws its first
 * frame. The scene only reports "ready" (intro:ready), never a percentage, so
 * the count runs a simulated load that waits at 90% for that event, then
 * reaches 100 and opens the blinds onto the scene. It counts in tens (010,
 * 020 … 100) and shows every one, even when the scene is ready at once.
 *
 * Talks to public/scripts/bridge.js through window events:
 *   - intro:ready        (from the scene)  lets the count finish
 *   - intro:loader-done  (from here)       bridge marks the cover ready and removes us
 *   - intro:skip         (from here)       "Skip intro" before the scene was ready:
 *                                          bridge goes straight to the site instead
 */

declare global {
  interface Window {
    /** Set by bridge.js when intro:ready fired, in case it beat this island's hydration. */
    __introSceneReady?: boolean;
  }
}

const SIMULATED_MS = 4200;
const WAIT_AT = 90;

export default function IntroPreloader() {
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const startedAt = performance.now();
    const update = () => {
      const simulated = scpSimulated((performance.now() - startedAt) / SIMULATED_MS) * 100;
      const value = readyRef.current ? 100 : Math.floor(Math.min(WAIT_AT, simulated));
      setProgress(value);
      if (value >= 100) window.clearInterval(interval);
    };
    const markReady = () => {
      readyRef.current = true;
      update();
    };
    const interval = window.setInterval(update, 200);
    if (window.__introSceneReady) markReady();
    window.addEventListener("intro:ready", markReady, { once: true });
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("intro:ready", markReady);
    };
  }, []);

  const onComplete = () => {
    // Only "Skip intro" can finish the count before the scene is ready.
    if (!readyRef.current) window.dispatchEvent(new CustomEvent("intro:skip"));
    window.dispatchEvent(new CustomEvent("intro:loader-done"));
  };

  return (
    <SlatCountPreloader
      progress={progress}
      palette={{ background: "#ff0b36", ink: "#160000", accent: "#fff0eb" }}
      fontFamily='var(--font-family-fraktion, "Fraktion Mono", monospace)'
      label={`${profile.name} — ${profile.role}`}
      caption="Setting up the 3D intro. Every figure is twenty-one bars, shunted into place."
      height="100%"
      stepMs={400}
      step={10}
      onComplete={onComplete}
    />
  );
}
