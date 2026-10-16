// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { offlinePrecache } from "./src/integrations/offline-precache.ts";

export default defineConfig({
  site: "https://harshh.pages.dev",
  // Cloudflare Pages and wrangler.toml both read the repo-root dist/.
  outDir: "../dist",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  // React only for the intro preloader island (src/components/ui).
  // offlinePrecache writes the offline worker's file list into dist/sw.js.
  integrations: [react(), offlinePrecache()],
  // Keep the whitespace between tags: the copied design has inline elements
  // whose spacing depends on it, exactly as the live page ships.
  compressHTML: false,
  // No per-page CSP <meta>: the copied design sets inline style attributes and
  // its engine needs 'unsafe-eval', which a hash-based policy would block. The
  // policy lives in public/_headers instead, matching what the live site sends.
  // That policy blocks inline scripts, so never inline our bundled ones.
  vite: { build: { assetsInlineLimit: 0 } },
});
