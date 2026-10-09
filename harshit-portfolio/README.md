# Harshit Chauhan — portfolio

A single-page portfolio built with [Astro](https://astro.build) and TypeScript, deployed as static files to Cloudflare Pages.

## Commands

Run from this folder. Node 22.12 or newer.

| Command           | What it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Dev server at http://localhost:4321                        |
| `npm run build`   | Production build into the repo-root `dist/`                |
| `npm run preview` | Serve the build locally                                    |
| `npm run lint`    | ESLint (TypeScript and Astro rules)                        |
| `npm run format`  | Prettier, write                                            |
| `npm run check`   | Astro and TypeScript type check                            |
| `npm test`        | Playwright tests against the built site, desktop and phone |
| `npm run verify`  | Everything CI runs, in order                               |

From the repo root, `npm run build` and `npm run dev` forward here.

## Layout

```text
src/
├── content/            # projects.json, archive.json: the site's data
├── content.config.ts   # schemas the data is validated against at build time
├── data/profile.ts     # name, links, highlights, focus areas
├── assets/             # project screenshots and archive photos (optimized by Astro)
├── components/         # one component per section
├── layouts/Base.astro  # <head> and meta tags
├── pages/              # index and 404
├── scripts/            # small client scripts
└── styles/a11y.css     # accessibility utilities only (see Design below)
public/                 # served as-is: icons, resume, headers, manifest
tests/                  # Playwright
```

## Editing content

- **Add a project:** drop a screenshot in `src/assets/projects/`, then add an entry to `src/content/projects.json` with the next `order`. `summary` is optional.
- **Add a photo:** drop it in `src/assets/archive/` and add an entry to `src/content/archive.json`.
- **Change bio, links or highlights:** `src/data/profile.ts`.

The build fails, rather than shipping a broken page, when a project URL is not `https://`, an image file is missing, two entries share an `order`, or the About text links to a project that no longer exists.

## Guardrails

- **Content validation:** Zod schemas in `src/content.config.ts`.
- **Types:** `astro/tsconfigs/strictest`, checked by `astro check`.
- **Lint and format:** ESLint (typescript-eslint strict, eslint-plugin-astro) and Prettier.
- **Tests** (`tests/site.spec.ts`): axe accessibility scan, no console errors or failed requests, every local link returns 200, every in-page anchor resolves, external links are https and open with `noopener`, no sideways scroll on phones, content visible without JavaScript, Hire me is a well-formed `mailto:`, resume links open in a new tab, copy-email works, strict CSP present, 404 page.
- **Security headers:** `public/_headers` sets the outer CSP and other headers; Astro adds a per-page CSP `<meta>` with a hash for every inline script and style, so nothing unhashed runs.
- **CI** (`.github/workflows/ci.yml`) runs all of the above on every pull request. Dependabot opens weekly update PRs.

## Notes

- `public/sw.js` exists only to retire the service worker the previous site installed: it clears its caches, unregisters itself and reloads the tab. The new site registers no worker. Keep the file for a few months, until returning visitors have cycled through.
- Section ids `#about`, `#work` and `#contact` are linked from the Android app's shortcuts; keep them stable.

## Design

The site ships deliberately unstyled: semantic HTML, the content and the guardrails, with no colours, fonts, layout or motion. The visual design will be added separately. `src/styles/a11y.css` holds only accessibility utilities (visually hidden text, the skip link, responsive images); keep design out of it.
