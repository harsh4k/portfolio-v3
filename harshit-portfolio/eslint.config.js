import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [
      "dist/",
      "../dist/",
      ".astro/",
      "node_modules/",
      "test-results/",
      "playwright-report/",
      // The design, copied unchanged from the live site. Kept byte-for-byte so
      // the page renders exactly as it does today, so it is not linted or reformatted.
      "public/_astro/",
      "public/assets/",
      "public/scripts/",
      "public/styles/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ["public/sw.js"],
    languageOptions: { globals: { ...globals.serviceworker } },
  },
  {
    files: ["*.config.{js,mjs,ts}", "tests/**"],
    languageOptions: { globals: { ...globals.node } },
  },
);
