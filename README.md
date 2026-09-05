# ProtypH — Workspace & Repository Architecture

A creative developer portfolio combining Adrien Lamy's interactive 3D WebGL character intro with Antoine Wodniack's motion-driven, high-impact portfolio engine.

---

## Directory Structure

```text
ProtypH/
├── harshit-portfolio/             # Primary production web application
│   ├── _astro/                    # GSAP ScrollTrigger engine, Lenis, and core styles
│   ├── assets/                    # Bundled Vue 3 + Three.js WebGL intro scene
│   ├── fonts/                     # Web fonts (Editorial New, Fraktion Mono, Bigger Display)
│   ├── images/                    # Project thumbnails, profile portraits, and graphics
│   ├── scripts/                   # Build compiler (build.mjs) and bridge controller (bridge.js)
│   ├── styles/                    # Layer integration styles (integration.css)
│   ├── videos/                    # Motion loops & media
│   ├── webgl/                     # Three.js doodle textures & shaders ("HARSHIT")
│   ├── index.html                 # Production entry point
│   ├── package.json               # NPM scripts (dev, build, start)
│   ├── server.mjs                 # Local static HTTP server (Port 4175)
│   └── Harshit_resume.pdf         # Resume download asset
│
├── references/                    # Reference mirrors, archives & source artifacts
│   ├── adrienlamy/                # Mirror of adrienlamy.fr (Three.js intro reference)
│   ├── wodniack/                  # Mirror of wodniack.dev (GSAP portfolio engine reference)
│   ├── archives/                  # Raw zip backups
│   │   ├── adrienlamy.fr-mirror.zip
│   │   └── wodniack.dev-mirror.zip
│   ├── legacy-experiments/        # Early prototype iterations and scratch scripts
│   └── getcited.png               # High-res project graphic asset
│
├── docs/                          # Architectural documentation and design specifications
│   └── NOTHING-PHONE-4B.md        # PWA + Phone (4b) lock screen / Glyph reality check
├── dist/                          # Production static output (deploy this folder)
├── android/                       # Optional Trusted Web Activity + home-screen widget
└── README.md                      # Workspace documentation
```

---

## Quick Start

### 1. Build, then run the local static server
```bash
npm run build
cd harshit-portfolio
npm run dev
# Server starts at http://127.0.0.1:4175/ from repo dist/
# Phone on LAN: HOST=0.0.0.0 npm run dev
```

Deploy **only** `dist/` (Cloudflare Pages output directory). Do not run `server.mjs` in production.

PP Editorial / Fraktion / Bigger Display are self-hosted from the Wodniack reference. Confirm you have a license to serve them on https://harshh.pages.dev/.

### 2. Compile / Rebuild Portfolio
```bash
cd harshit-portfolio
npm run build
```
The build script reads the reference template from `references/wodniack/index.html` and compiles `index.html` with Harshit's 11 real projects, full 10-slot Highlights masonry grid, 3D rotating text, and layer bridge logic.

Phone (4b) install, lock-screen limits, and Glyph facts: [`docs/NOTHING-PHONE-4B.md`](docs/NOTHING-PHONE-4B.md).

---

## Key Features & Architecture

1. **Seamless Layer Transition**: The 3D head and interactive hand pull intro (`#intro-layer`) smoothly fades and dispatches page lifecycle events to wake up GSAP ScrollTrigger and Lenis smooth scroll.
2. **Work Showcase**: 11 flagship projects (Velsaro, Nexcart, Synapical, Attendo, Coffee Digital, Coffee Rebuild, Oysnk, Shipd, Rudo AI, Bunny OS, GetCited) with live links and poster covers.
3. **Visual Archive**: 3D interactive floating cards orbiting the rotating text "Building with intent since 2024".
4. **Clean Monorepo Organization**: Reference sources, raw ZIPs, and experimental scripts are isolated in `references/`, keeping the production app clean.
5. **Fully Offline**: After one visit the site runs with no connection — see below.

---

## Offline Support

The site is a complete offline application, not a shell with a fallback card. One
visit is enough; after that the 3D intro, GSAP engine, fonts, images, WebGL
textures, video and the resume viewer all run with the network unplugged.

**How it is built.** `src/scripts/generate-precache.mjs` runs last in the build,
walks the assembled `dist/`, and rewrites the manifest inside `dist/sw.js` with
every shipped file and its content hash. The list is never maintained by hand, so
it cannot drift from what actually deploys. Currently 111 files, 10.8 MB.

**Two tiers**, because precaching 11 MB during first paint is hostile on mobile:

| Tier | When | What |
| --- | --- | --- |
| `shell` | service worker install | HTML, CSS, engine bundles, fonts — enough to render offline |
| `bulk` | after load, at idle | images, WebGL textures, video, resume + pdf.js viewer |

`scripts/pwa.js` triggers the bulk warm and skips it entirely on a `saveData` or
2G connection.

**Updates are cheap.** The cache name carries a hash of the whole manifest, so any
changed asset produces a new cache — but unchanged files are copied across from
the previous one instead of being re-downloaded. A deploy that only touches
`index.html` costs 3 requests, not 10.8 MB. Measured, not assumed.

**What is deliberately excluded** (see the `EXCLUDED` list in the generator, each
entry with a reason): source maps, `robots.txt` / `sitemap.xml` / `llms.txt`,
social card images, and three stale duplicate trees left by the reference sync
(`/assets/images/`, `/webgl/webgl/`, `/assets/resume.pdf`) that nothing
references. Anything fetched at runtime but outside the manifest is still cached
on first use, so an omission degrades rather than breaks.

**Tests.** `tests/offline.spec.js` runs in its own Playwright project — the only
one that allows service workers — and pulls the network out from under a warmed
browser to check the manifest is fully cached, the 3D intro still becomes
interactive, images and fonts still resolve, and a half-installed worker falls
back to `/offline.html`.
