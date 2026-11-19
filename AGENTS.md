# Portfolio v3

The Astro/TypeScript website lives in `harshit-portfolio/`. The root package
only forwards dev/build commands. `android/` contains the companion widget app.

## Website checks

Install dependencies inside `harshit-portfolio/` with `npm ci`; Node 22.12+
is required by the app package. Run these existing commands from that folder:

```sh
npm run lint
npm run format:check
npm run check
npm run build
npm test -- --workers=2
```

From the collection root, `node "$HOME/.agents/gates/verify.mjs"` runs those
same checks via `.agent/checks.json`, including the browser tests with two
workers. Use `astro check` rather than a standalone compiler on a clean checkout:
Astro generates its content and environment declarations as part of that check.

## Boundaries

- Read `harshit-portfolio/README.md` before changing content or presentation.
- Build output goes to root `dist/`; Playwright tests serve that static build.
- Keep section IDs stable: the Android app links to them.
- Prebuilt assets in `public/` are documented in the app README. Do not rewrite
  them as part of tooling cleanup.
- Several existing components/tests exceed 300 lines; unrelated splitting is
  outside a verification configuration change.
- These checks cover the website, not the Android build or live Cloudflare
  deployment. Do not report either of those as verified from a web build.
