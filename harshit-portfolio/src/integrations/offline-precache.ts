import type { AstroIntegration } from "astro";
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";

/**
 * Writes the offline worker's file list (public/sw.js) from the finished build,
 * so a new page, image or bundle is cached for offline use without editing
 * anything by hand.
 */

/** Host config and crawler files: nothing a visitor needs offline. */
const SKIP = new Set([
  "_headers",
  "_redirects",
  "sw.js",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "images/og-image.png",
]);
const SKIP_DIRS = [".well-known/"];

/** Downloads and the resume viewer: cached at idle after the page loads, not up front. */
const isBulk = (file: string) => /\.(pdf|docx|mp4)$/.test(file) || /^scripts\/pdf(\.worker)?\.min\.mjs$/.test(file);

const START = "/* precache:start */";
const END = "/* precache:end */";

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => join(entry.parentPath, entry.name));
}

/** "index.html" -> "/", "work/x/index.html" -> "/work/x/", "fonts/a.woff2" -> "/fonts/a.woff2". */
function urlOf(file: string) {
  return `/${file.replace(/(^|\/)index\.html$/, "$1")}`;
}

export function offlinePrecache(): AstroIntegration {
  return {
    name: "offline-precache",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const shell: [string, string][] = [];
        const bulk: [string, string][] = [];

        for (const path of (await walk(root)).sort()) {
          const file = relative(root, path).split(sep).join("/");
          if (SKIP.has(file) || SKIP_DIRS.some((prefix) => file.startsWith(prefix))) continue;
          const hash = createHash("sha256")
            .update(await readFile(path))
            .digest("hex")
            .slice(0, 16);
          (isBulk(file) ? bulk : shell).push([urlOf(file), hash]);
        }

        const version = createHash("sha256")
          .update(JSON.stringify([shell, bulk]))
          .digest("hex")
          .slice(0, 12);

        const swPath = join(root, "sw.js");
        const sw = await readFile(swPath, "utf8");
        const start = sw.indexOf(START);
        const end = sw.indexOf(END);
        if (start === -1 || end < start) throw new Error(`sw.js is missing the ${START} / ${END} markers`);

        const manifest = `const MANIFEST = ${JSON.stringify({ version, shell, bulk })};`;
        await writeFile(swPath, `${sw.slice(0, start + START.length)}\n${manifest}\n${sw.slice(end)}`);
        logger.info(`sw.js: ${shell.length} files up front, ${bulk.length} at idle, version ${version}`);
      },
    },
  };
}
