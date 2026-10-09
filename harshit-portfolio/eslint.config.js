import js from "@eslint/js";
import globals from "globals";

/**
 * Lints only the code written in this repo. The engine bundles under
 * public/_astro/ and public/assets/ are vendored builds that our scripts patch
 * in place, so they are not ours to lint. dist/ sits outside this folder.
 */
export default [
  {
    ignores: ["public/_astro/**", "public/assets/**", "test-results/**", "playwright-report/**"],
  },
  js.configs.recommended,
  {
    // Loaded by index.html with type="module".
    files: ["src/scripts/bridge.js", "src/scripts/pwa.js", "src/scripts/resume-dock.js"],
    languageOptions: { sourceType: "module", globals: globals.browser },
  },
  {
    // Loaded by index.html as a classic script.
    files: ["src/scripts/img-media.js"],
    languageOptions: { sourceType: "script", globals: globals.browser },
  },
  {
    files: ["public/sw.js"],
    languageOptions: { sourceType: "script", globals: globals.serviceworker },
  },
  {
    // Build scripts, the local server and Playwright specs run in Node. Specs
    // also hand callbacks to page.evaluate, which run in the browser.
    files: ["**/*.mjs", "tests/**/*.js", "playwright.config.js", "eslint.config.js"],
    languageOptions: { sourceType: "module", globals: { ...globals.node, ...globals.browser } },
  },
];
