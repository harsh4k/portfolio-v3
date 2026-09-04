# Harshit Chauhan — Creative Developer Portfolio (v3)

A static, zero-framework, high-performance personal portfolio for **Harshit Chauhan** (Computer Engineering student at NMIMS Mumbai & Creative Developer).

---

## Architecture & Technology

- **No Framework / Zero Bundler**: Pure vanilla HTML5 + CSS3 + modern ES modules.
- **Intro Layer**: Interactive Three.js WebGL intro scene with hand-pull interaction and 3D character animation.
  - Dynamically imported (`import()` in `bridge.js`), so the 819 KB bundle is not render-blocking.
  - Desktop: grab the 3D hand and pull it. Touch and narrow viewports get the same scene with a visible "Swipe down" affordance, since the engine only builds the hand on desktop.
  - `prefers-reduced-motion: reduce` bypasses the 3D layer *and* fast-forwards the site intro timeline, settling in ~150 ms instead of ~5.2 s. The timeline is GSAP-driven, so CSS `animation-duration` overrides alone do not shorten it.
- **Portfolio Layer**: GSAP + Lenis smooth scrolling + ScrollTrigger animation pipeline.
- **Handover (`src/scripts/bridge.js`)**: Manages seamless transition from WebGL intro scene to the GSAP portfolio with complete GPU resource release and style detachment.
- **Mobile First Responsive Redesign**:
  - Clean vertical flex card stack for all 11 production projects below 900px.
  - Accessible touch buttons for contact and navigation.
  - 44×44px tap targets, extended via an invisible `::after` on the header and footer monograms so nothing shifts visually. The four inline project links inside the About paragraph are deliberately left at text size — WCAG 2.5.8 exempts targets inline in a sentence, and padding them would break the line box.
  - Zero horizontal overflow (`document.scrollWidth === viewport width`).
- **SEO & Performance**:
  - OpenGraph & Twitter Card metadata with 1200×630 preview image.
  - JSON-LD `Person` structured data for search engine knowledge graphs.
  - Canonical link, `sitemap.xml`, `robots.txt`, and `site.webmanifest`.
  - Responsive WebP images with `loading="lazy"` and `decoding="async"`.

---

## Directory Architecture

```text
harshit-portfolio/
├── public/                     # Static public assets
│   ├── _astro/                 # GSAP engine & portfolio core stylesheets
│   ├── assets/                 # Bundled Three.js WebGL intro application
│   ├── fonts/                  # Editorial New, Fraktion Mono, Bigger Display
│   ├── icons/                  # Web icons & favicons
│   ├── images/                 # Project screenshots, OG images & visual archive
│   ├── videos/                 # Background video loops
│   ├── webgl/                  # 3D character textures with custom "HARSHIT" drawings
│   ├── robots.txt              # Search crawler directives
│   ├── sitemap.xml             # XML sitemap
│   ├── site.webmanifest        # PWA / web manifest
│   ├── favicon.png             # Site favicon
│   └── resume.pdf              # Downloadable resume
│
├── src/                        # Developer source code
│   ├── scripts/
│   │   ├── bridge.js           # Hand pull / touch entry → layer teardown → portfolio intro
│   │   ├── build.mjs           # Portfolio compiler (generates index.html)
│   │   ├── clean-adrien.mjs    # Patches the 3D intro bundle (hand exit, titles, RAF stop)
│   │   └── patch-intro.mjs     # Gates the site intro & silences null GSAP targets
│   └── styles/
│       └── integration.css     # Mobile responsive layout, tap targets, focus states & overrides
│
├── index.html                  # Generated production entry point
├── package.json                # Project scripts & metadata
└── server.mjs                  # Fast local dev HTTP server
```

---

## Fonts

The site self-hosts **PP Editorial New**, **PP Fraktion Mono**, **Bigger Display**, and **Comic CAT** from the Wodniack reference. You need a valid web license to serve these on a public host.

---

## Development & Build Commands

```bash
# 1. Compile assets into repo dist/
npm run build   # from repo root, or from this folder

# 2. Serve dist/ locally (Port 4175)
npm run dev
```

Both bundle patchers (`src/scripts/clean-adrien.mjs` and `src/scripts/patch-intro.mjs`) are idempotent and safe to re-run.

---

## Testing

```bash
npm test              # full smoke suite (desktop + mobile projects)
npm run test:desktop  # desktop only
```

`tests/smoke.spec.js` drives the real handover — no mocks. Every assertion maps
to something that has actually regressed in this repo: the site intro playing
unseen beneath the 3D layer, the hero bleeding into the next section, the engine
rendering forever after teardown, `NO_LCP` making Lighthouse unable to score,
the reference author's content shipping in the DOM, duplicate `<h1>`, and the
reduced-motion loader.

Two things worth knowing before editing tests:

- **`server.mjs` serves `../dist`, not `src/`.** Edits to `src/` have no effect
  until `npm run build` has run. Mutation-testing an assertion without
  rebuilding will silently pass and tell you nothing.
- Assertions avoid machine-dependent thresholds. The engine check verifies the
  `__introTornDown` kill switch is in the shipped bundle and set at runtime,
  rather than sampling a frame rate — measured, the rAF rate *rises* after
  teardown (45/s → 125/s) because the portfolio's own loops start then.

CI runs the same command Cloudflare Pages does, asserts a deployable `dist/` was
produced, diffs a second build against the first to catch non-idempotent patch
guards, then runs the suite.

## Measured

Live, on the deployed site (Chrome trace, no throttling):

| Metric | Value |
| --- | --- |
| LCP | 127 ms |
| CLS | 0.00 |
| Render-blocking savings | 0 ms (FCP and LCP) |
| Lighthouse Accessibility / Best Practices / SEO | 100 / 100 / 100 |
