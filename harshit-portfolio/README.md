# Harshit Portfolio

An interactive 3D WebGL and motion-driven creative developer portfolio for **Harshit Chauhan**.

---

## Directory Architecture

```text
harshit-portfolio/
├── public/                     # Static public assets (zero build step)
│   ├── _astro/                 # GSAP engine & portfolio core stylesheets
│   ├── assets/                 # Bundled Vue 3 + Three.js WebGL intro application
│   ├── fonts/                  # Editorial New, Fraktion Mono, Bigger Display
│   ├── icons/                  # Web icons & favicons
│   ├── images/                 # Project screenshots, profile portrait, and visual artwork
│   ├── videos/                 # Background video loops
│   ├── webgl/                  # 3D character textures with custom "HARSHIT" drawings
│   ├── favicon.png             # Site favicon
│   └── resume.pdf              # Downloadable resume
│
├── src/                        # Developer source code
│   ├── scripts/
│   │   ├── bridge.js           # Hand pull → layer teardown → site intro handover
│   │   ├── build.mjs           # Portfolio compiler (index.html)
│   │   ├── clean-adrien.mjs    # Patches the 3D intro bundle (hand exit, titles)
│   │   └── patch-intro.mjs     # Gates the site intro behind the hand pull
│   └── styles/
│       └── integration.css     # Layer overlay & typography styles
│
├── index.html                  # Production entry point
├── package.json                # Project scripts & metadata
└── server.mjs                  # Fast local dev HTTP server
```

---

## Commands

```bash
# 1. Start local dev server (Port 4175)
npm run dev

# 2. Re-compile index.html from references/ and re-apply the bundle patches
npm run build
```

Both bundle patches are idempotent, so restoring `public/_astro/` or
`public/assets/` from `references/` and re-running `npm run build` is safe.
See `walkthrough.md` for what each patch does and why.

