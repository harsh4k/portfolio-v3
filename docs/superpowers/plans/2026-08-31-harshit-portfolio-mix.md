# Harshit Portfolio Mix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a locally runnable portfolio that transitions from a pull-to-enter intro to an editorial project archive using Harshit's existing content.

**Architecture:** A standalone static site owns its UI, styles, motion, content mapping, and local server. It copies user-owned portfolio media into its own `assets/` directory and never reads the old project at runtime. The intro controller is isolated from the portfolio renderer so the page can progressively reveal without a reload.

**Tech Stack:** Semantic HTML, CSS custom properties, native CSS animation, vanilla JavaScript, Node.js standard library.

## Global Constraints

- Use only user-owned content from `X:/Projects/websites/portfolio-v2-main`.
- Do not import `wanderlust.zip`.
- Use CSS tokens for all visual constants.
- Support pointer, touch, keyboard, and reduced-motion interaction.
- Keep every source file below 300 lines.
- Add no package dependencies.

---

### Task 1: Create the self-contained project and asset library

**Files:**
- Create: `harshit-portfolio/index.html`
- Create: `harshit-portfolio/styles/tokens.css`
- Create: `harshit-portfolio/styles/base.css`
- Create: `harshit-portfolio/styles/intro.css`
- Create: `harshit-portfolio/styles/portfolio.css`
- Create: `harshit-portfolio/styles/responsive.css`
- Create: `harshit-portfolio/scripts/app.js`
- Create: `harshit-portfolio/scripts/intro.js`
- Create: `harshit-portfolio/scripts/portfolio.js`
- Create: `harshit-portfolio/data.js`
- Create: `harshit-portfolio/server.mjs`
- Copy: `harshit-portfolio/assets/images/*`
- Copy: `harshit-portfolio/assets/fonts/*`
- Copy: `harshit-portfolio/assets/resume.pdf`

**Interfaces:**
- `data.js` exports `profile`, `projects`, `archiveItems`, and `socials`.
- `server.mjs` exposes `GET /` and byte-range video responses on port 4175.

- [ ] Copy the existing public images, fonts, and resume without modifying their sources.
- [ ] Define data objects from `src/data.ts` and validated resume details.
- [ ] Add a Node static server with MIME and range handling.
- [ ] Verify `node server.mjs` serves `/`, a font, an image, and the MP4 successfully.

### Task 2: Implement the pull-to-enter intro

**Files:**
- Modify: `harshit-portfolio/index.html`
- Modify: `harshit-portfolio/styles/intro.css`
- Modify: `harshit-portfolio/scripts/intro.js`

**Interfaces:**
- `scripts/intro.js` dispatches `portfolio:entered` after a successful gesture.
- `#pull-control` is keyboard-operable and updates `aria-valuenow` from 0 to 100.

- [ ] Build the intro canvas with a central portrait, copy, dots, pull track, and accessible control.
- [ ] Implement pointer/touch drag, a 70% completion threshold, visual progress, and release reset.
- [ ] Add keyboard activation and the reduced-motion instant path.
- [ ] Verify the intro remains navigable with Tab and triggers with Enter.

### Task 3: Implement the portfolio reveal and editorial header

**Files:**
- Modify: `harshit-portfolio/index.html`
- Modify: `harshit-portfolio/styles/portfolio.css`
- Modify: `harshit-portfolio/scripts/portfolio.js`

**Interfaces:**
- `revealPortfolio()` in `scripts/portfolio.js` removes the intro interaction, marks `#portfolio` visible, and moves focus to `#portfolio-title`.
- The contrast switch toggles `data-contrast` on `<html>`.

- [ ] Create the radial/line transition and portfolio visibility states.
- [ ] Build the fixed grid header with anchored navigation and contrast toggle.
- [ ] Implement focus transfer and contrast persistence for the active session.
- [ ] Verify anchor navigation works after reveal and contrast remains readable.

### Task 4: Render personal content and project archive

**Files:**
- Modify: `harshit-portfolio/data.js`
- Modify: `harshit-portfolio/index.html`
- Modify: `harshit-portfolio/styles/responsive.css`
- Modify: `harshit-portfolio/scripts/intro.js`

**Interfaces:**
- `renderProjects(projects)` creates all 11 project entries from data.
- `renderArchive(archiveItems)` creates visual archive cards with lazy-loaded images.

- [ ] Add About, Work, Archive, and Contact semantic sections.
- [ ] Render all 11 projects with cover images, roles, years, tags, live/repository destinations, and accessible links.
- [ ] Render local archive items, timeline cards, and project video with a poster/fallback treatment.
- [ ] Verify no remote image URL is required and all asset paths resolve locally.

### Task 5: Quality, responsive behavior, and local handoff

**Files:**
- Modify: `harshit-portfolio/styles.css`
- Modify: `harshit-portfolio/app.js`

**Interfaces:**
- No new interfaces.

- [ ] Add responsive layouts for 320px, tablet, and desktop widths.
- [ ] Add `prefers-reduced-motion` rules and lazy image loading.
- [ ] Run a local reference audit for HTML, CSS, JavaScript, images, fonts, and video.
- [ ] Start the server at `http://127.0.0.1:4175`, inspect the local page, and report the exact preview address.
