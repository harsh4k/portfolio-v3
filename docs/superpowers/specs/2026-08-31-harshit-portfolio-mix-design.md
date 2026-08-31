# Harshit Portfolio Mix Design

## Goal

Build Harshit Chauhan's portfolio as one motion-led experience: a red, pull-to-enter personal intro inspired by the interaction language of adrienlamy.fr, followed by a high-contrast editorial portfolio inspired by the structural rhythm of wodniack.dev.

## Scope

- The page is a single local website with no server-side features.
- The opening view is an interactive pull gesture, not a static hero or ordinary navigation button.
- A successful pull launches a short handoff animation into the portfolio.
- The portfolio uses Harshit's own name, biography, resume, links, project data, photos, posters, thoughts, timeline, and media from `X:/Projects/websites/portfolio-v2-main`.
- All 11 projects appear in the Work section. The first six use the highest visual prominence; the remaining five remain discoverable within the same scroll experience.
- The unrelated `wanderlust.zip` is excluded.

## Interaction Model

1. The visitor lands in a saturated-red field with a dotted paper texture, a central portrait, personal handwritten-style copy, and a visible pull handle.
2. On pointer devices, dragging the handle rightward fills the pull track. On touch, a horizontal drag does the same.
3. Releasing before the threshold springs the handle back. Passing the threshold triggers the portfolio reveal.
4. The reveal uses a quick radial wipe, red flash, and line-field expansion. It respects `prefers-reduced-motion`; in that mode the action becomes an immediate fade.
5. Keyboard users can press Enter or Space on the pull control. The control exposes its current progress to assistive technology.

## Portfolio Structure

- Fixed editorial header: monogram, status message, in-page About / Work / Contact navigation, and a contrast switch.
- About: current identity, working focus, education/experience highlights, portrait and resume link.
- Work: 11 user-owned projects populated from the existing portfolio's data; project covers animate on hover/focus and use meaningful project links.
- Archive: selected posters, timeline images, visual experiments, and thoughts with staggered editorial layouts.
- Contact: email, GitHub, LinkedIn, Instagram, Discord, location, and resume.

## Content Sources

- `X:/Projects/websites/portfolio-v2-main/src/data.ts` is the canonical source for projects, poster captions, thoughts, and timeline copy.
- `X:/Projects/websites/portfolio-v2-main/Harshit_resume.pdf` is authoritative for identity, education dates, and employment facts when it conflicts with older UI copy.
- `X:/Projects/websites/portfolio-v2-main/public/images/` and `public/fonts/` contain the reusable user-owned media and fonts.

## Visual Rules

- Use named CSS variables for every colour, shadow, spacing value, and type family; no repeated raw colour values outside the token definition.
- Keep the two visual worlds connected by black ink lines, paper texture, red accent, dense type, and purposeful motion.
- Do not reuse reference-site branding, copy, logo geometry, or images.
- Keep interaction usable at 320px through large desktop screens and offer a reduced-motion path.

## Technical Approach

The new site is a small dependency-free static project in `X:/Projects/websites/ProtypH/harshit-portfolio/`. It deliberately avoids changing the existing React project and avoids a new package installation. Focused HTML, CSS, and JavaScript modules support a local Node static server with proper media MIME types and byte-range video support.
