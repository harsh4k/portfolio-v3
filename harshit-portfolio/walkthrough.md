# Intro → Portfolio Handover

The page stacks two independent apps: the Three.js intro scene (`#intro-layer`,
`/assets/index-wQJ6Ws5X.js`) sitting on top of the GSAP portfolio
(`/_astro/hoisted.BvNyQ0G_.js`). `src/scripts/bridge.js` owns the handover
between them.

---

## Sequence

| t | what happens |
|---|---|
| — | site intro is held; `is-scroll-blocked` stays on `<html>` |
| pull | hand released past the drag threshold → bundle emits `intro:pull` |
| +0→520ms | the 3D scene animates itself empty (hand retracts, face and scribbles leave) |
| +520ms | engine stopped, WebGL context released, canvases hidden, intro stylesheet detached, layout re-measured, `startPortfolioIntro` dispatched, `intro-done` starts the cross-fade |
| +520ms→+5.5s | site intro plays: logo lines draw, black border frame draws in, and the leftover red panel fades off it over 500ms |
| +5.5s | site intro removed, `.js-mount` revealed, scroll unblocked |

---

## Why each patch exists

### `src/scripts/patch-intro.mjs` — the transition has to wait
The GSAP engine plays its site intro from `init()` on DOMContentLoaded. With the
intro layer stacked on top, that 5s animation ran and finished under an opaque
layer, so pulling the hand dropped straight onto a finished page with no
transition. The patch defers `intro()` until `startPortfolioIntro` fires,
**only** when `#intro-layer` is present.

### `src/scripts/clean-adrien.mjs` — the hand, the engine, the title

**The hand has to leave.**
`showUI()` was authored to open an about panel. Repurposed as a doorway it must
retract instead: `hideUIOutside()` hides every hand part and slides the group off
the right edge, which also unwinds the finger's drag stretch. Skipping those
hides left the finger frozen at whatever stretch it had on release, the palm
parked mid-screen, and the hand centred — which is where the never-hidden CLOSE
placard becomes visible.

**The hand stays pinned to the edge.** The hand group drifted left as drag
intensity rose, so the fist floated in from the screen edge. That reads as
anchored in the original only because a black panel is dragged in behind it —
this build hides that panel, so the drift just looked like the hand coming
loose. The drift term is removed; only the finger stretches now.

**The engine has to stop.** Removing `#intro-layer` detaches the canvas but does
not stop the engine — its RAF manager kept updating the whole scene and
rendering into a detached canvas for the rest of the session, roughly doubling
per-frame work and making the transition and scrolling stutter (measured: 320
rAF/s after the handover, against 158 for the portfolio alone; now 48). The RAF
manager gets a `window.__introTornDown` kill switch that bridge.js sets, and the
WebGL context is released with it.

It also hides the UI background plane and renames the document title the intro
app writes on focus/blur.

### `bridge.js` — the intro stylesheet has to go
`/assets/index-DG8As337.css` loads after the portfolio's stylesheet and carries a
global reset — `html,body{padding:0;background-color:#ff0b36}` plus Tailwind
preflight. That reset overrode the portfolio's `body{padding:1rem}` frame, so the
hero ended 16px short of the viewport and the next section showed underneath it.
The link is tagged `data-intro-style` in `build.mjs` and detached once the intro
layer is gone, before the site intro plays.

---

## Rebuilding

```bash
npm run build   # regenerates index.html, then re-applies both bundle patches
```

Both patch scripts are idempotent and fail loudly, so restoring either bundle
from `references/` and re-running the build is safe.

## Live access
- **[http://127.0.0.1:4175/](http://127.0.0.1:4175/)** (`npm run dev`)
