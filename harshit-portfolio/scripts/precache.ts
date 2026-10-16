/**
 * Writes the offline precache manifest into the built dist/sw.js.
 *
 * Runs at the end of `npm run build`. It walks dist/, so every shipped file is
 * listed with a hash of its contents and nothing is kept up to date by hand.
 * Paths are sorted, so building the same source twice writes the same sw.js.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const swPath = join(dist, "sw.js");

/** Shipped files a visitor's browser never requests, each with the reason. */
const EXCLUDED: [RegExp, string][] = [
  [/^\/sw\.js$/, "the worker itself, which the browser fetches on its own"],
  [/^\/_(headers|redirects)$/, "Cloudflare Pages config, not served"],
  [/^\/(robots\.txt|sitemap\.xml|llms\.txt)$/, "for crawlers"],
  [/^\/\.well-known\//, "Android app verification"],
  [/^\/images\/og-image\.png$/, "the link preview card social apps fetch"],
  [/\.map$/, "source maps"],
  [/^\/assets\/images\//, "a duplicate image tree from the copied design that no page references"],
  [
    /^\/fonts\/(Fraunces-|IBMPlexMono-|BigShouldersDisplay-|Comic_CAT\.(ttf|woff)$)/,
    "fonts no stylesheet or script loads",
  ],
];

/** Needed to render a page at all, so fetched during install. The rest waits for idle. */
const SHELL = /\.(html|css|js|mjs|woff2?|webmanifest|ico)$|^\/icons\//;
// The PDF viewer's worker is 1.3 MB and only runs when someone opens the resume.
const BULK_OVERRIDE = /^\/scripts\/pdf\.worker/;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** The url the worker caches a file under. Pages use their clean url: /, /work/x, /404. */
function urlFor(file: string): string {
  const path = `/${relative(dist, file).split(sep).join("/")}`;
  if (path === "/index.html") return "/";
  return path.replace(/\/index\.html$/, "").replace(/\.html$/, "");
}

const shell: [string, string][] = [];
const bulk: [string, string][] = [];
let bytes = 0;

for (const file of walk(dist).sort()) {
  const path = `/${relative(dist, file).split(sep).join("/")}`;
  if (EXCLUDED.some(([pattern]) => pattern.test(path))) continue;

  const contents = readFileSync(file);
  const hash = createHash("sha256").update(contents).digest("hex").slice(0, 16);
  const tier = SHELL.test(path) && !BULK_OVERRIDE.test(path) ? shell : bulk;
  tier.push([urlFor(file), hash]);
  bytes += contents.length;
}

const version = createHash("sha256")
  .update(JSON.stringify([shell, bulk]))
  .digest("hex")
  .slice(0, 12);
const manifest = JSON.stringify({ version, shell, bulk });

const source = readFileSync(swPath, "utf8");
const block = /\/\* precache:start \*\/[\s\S]*?\/\* precache:end \*\//;
if (!block.test(source)) throw new Error("dist/sw.js has no precache:start/precache:end block");
writeFileSync(
  swPath,
  source.replace(block, () => `/* precache:start */\nconst PRECACHE_MANIFEST = ${manifest};\n/* precache:end */`),
);

const mb = (bytes / 1024 / 1024).toFixed(1);
console.log(`precache ${version}: ${shell.length} shell + ${bulk.length} bulk files, ${mb} MB`);
