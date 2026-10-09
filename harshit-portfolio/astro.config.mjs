// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://harshh.pages.dev",
  // Cloudflare Pages and wrangler.toml both read the repo-root dist/.
  outDir: "../dist",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  // Emits a per-page CSP <meta> with hashes for every inline script and style,
  // so the page never needs 'unsafe-inline' or 'unsafe-eval'.
  security: { csp: true },
});
