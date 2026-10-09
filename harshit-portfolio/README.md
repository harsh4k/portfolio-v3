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
├── data/profile.ts     # name, links, highlights
├── components/         # one component per section, emitting the design's markup
├── layouts/Base.astro  # <head>, meta tags, and the design's styles and scripts
└── pages/              # index and 404
public/                 # served as-is
├── _astro/, assets/    # the design's styles, motion engine and 3D intro (copied unchanged)
├── scripts/, styles/   # intro hand-off, resume dock and the CSS joining them (copied unchanged)
├── fonts/, webgl/      # the design's fonts and 3D textures
├── images/             # project screenshots and archive photos
└── _headers, sw.js     # security headers; the old service worker's retirement
tests/                  # Playwright
```

## Editing content

- **Add a project:** drop a 1082×636 `.webp` screenshot in `public/images/`, then add an entry to `src/content/projects.json` with the next `order` and a short `code` for its caption. `summary` is optional.
- **Add a photo:** drop a `.webp` in `public/images/` and add an entry to `src/content/archive.json` with its pixel `width` and `height`.
- **Change bio, links or highlights:** `src/data/profile.ts`.

The build fails, rather than shipping a broken page, when a project URL is not `https://`, an image file is missing, two entries share an `order`, or the About text links to a project that no longer exists.

## Guardrails

- **Content validation:** Zod schemas in `src/content.config.ts`.
- **Types:** `astro/tsconfigs/strictest`, checked by `astro check`.
- **Lint and format:** ESLint (typescript-eslint strict, eslint-plugin-astro) and Prettier.
- **Tests** (`tests/site.spec.ts`): axe accessibility scan, no console errors or failed requests, every local link returns 200, every in-page anchor resolves, external links are https and open with `noopener`, no sideways scroll on phones, content in the HTML without JavaScript, Hire me is a well-formed `mailto:`, the resume dock offers PDF and DOCX, middle clicks aren't swallowed, the wheel scrolls, no inline scripts allowed by the CSP, 404 page.
- **Security headers:** `public/_headers` sets the CSP and other headers, matching what the live site sends.
- **CI** (`.github/workflows/ci.yml`) runs all of the above on every pull request. Dependabot opens weekly update PRs.

## Notes

- `public/sw.js` exists only to retire the service worker the previous site installed: it clears its caches, unregisters itself and reloads the tab. The new site registers no worker. Keep the file for a few months, until returning visitors have cycled through.
- Section ids `#about`, `#work` and `#contact` are linked from the Android app's shortcuts; keep them stable.

## Design

The design is the live site's, carried over unchanged: the files in `public/_astro/`, `public/assets/`, `public/scripts/`, `public/styles/`, `public/fonts/` and `public/webgl/` are byte-for-byte copies, and lint and Prettier skip them. The components in `src/components/` emit the same markup and class names those files expect, with the text, links and lists coming from `src/content/` and `src/data/profile.ts`. Keep the class names (including the `astro-…` ones) as they are: the stylesheet and motion engine select on them.

PP Editorial New and PP Fraktion Mono (Pangram Pangram) need a web licence for use on this site.
