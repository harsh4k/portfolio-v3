# Harshit Chauhan — Creative Developer Portfolio (v3)

A static, zero-framework, high-performance personal portfolio for **Harshit Chauhan** (Computer Engineering student at NMIMS Mumbai & Creative Developer).

---

## Architecture & Technology

- **No Framework / Zero Bundler**: Pure vanilla HTML5 + CSS3 + modern ES modules.
- **Intro Layer**: Interactive Three.js WebGL intro scene with hand-pull interaction and 3D character animation.
  - Dynamically loaded on desktop (fine-pointer) devices only.
  - Automatically skipped on mobile / touch devices (saving 819 KB on initial load) and replaced by an instant, brutalist tap-to-enter affordance.
  - Bypassed cleanly when `prefers-reduced-motion: reduce` is enabled.
- **Portfolio Layer**: GSAP + Lenis smooth scrolling + ScrollTrigger animation pipeline.
- **Handover (`src/scripts/bridge.js`)**: Manages seamless transition from WebGL intro scene to the GSAP portfolio with complete GPU resource release and style detachment.
- **Mobile First Responsive Redesign**:
  - Clean vertical flex card stack for all 11 production projects below 900px.
  - Accessible touch buttons for contact and navigation.
  - 44×44px minimum tap targets across all interactive elements.
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

The site self-hosts OFL-licensed **Fraunces**, **IBM Plex Mono**, and **Syne** (via `@fontsource` at build time). Paid PP Editorial / Fraktion / Bigger Display files are not shipped.

---

## Development & Build Commands

```bash
# 1. Compile assets into repo dist/
npm run build   # from repo root, or from this folder

# 2. Serve dist/ locally (Port 4175)
npm run dev
```

Both bundle patchers (`src/scripts/clean-adrien.mjs` and `src/scripts/patch-intro.mjs`) are idempotent and safe to re-run.
