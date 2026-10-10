import { useEffect, useRef, useState } from "react";
import SlatCountPreloader, { scpSimulated } from "@/components/ui/slat-count-preloader";
import { profile } from "../data/profile";

/**
 * The loader on the red intro cover, shown until the 3D scene draws its first
 * frame. The scene only reports "ready" (intro:ready), never a percentage, so
 * the count runs a simulated load that waits at 90% for that event and only
 * then reaches 100 and opens the blinds onto the scene.
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
const READY_RAMP_MS = 1500;

export default function IntroPreloader() {
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const markReady = () => {
      readyRef.current = true;
    };
    if (window.__introSceneReady) markReady();
    window.addEventListener("intro:ready", markReady, { once: true });
    return () => window.removeEventListener("intro:ready", markReady);
  }, []);

  // Runs the simulated load up to WAIT_AT, then, once the scene is ready, ramps
  // the rest of the way over READY_RAMP_MS so a fast load still shows a count
  // instead of jumping straight to 100.
  useEffect(() => {
    const start = performance.now();
    let readyAt = 0;
    let readyFrom = 0;
    let frame = 0;
    const step = (now: number) => {
      const simulated = Math.min(WAIT_AT, scpSimulated((now - start) / SIMULATED_MS) * 100);
      let value = simulated;
      if (readyRef.current) {
        if (!readyAt) {
          readyAt = now;
          readyFrom = simulated;
        }
        value = readyFrom + (100 - readyFrom) * Math.min(1, (now - readyAt) / READY_RAMP_MS);
      }
      // Whole numbers only: React skips the re-render when the value is unchanged.
      setProgress(Math.floor(value));
      if (value < 100) frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
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
      stepMs={480}
      onComplete={onComplete}
    />
  );
}
