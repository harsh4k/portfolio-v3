/**
 * Rewrite the precache manifest inside dist/sw.js from what the build actually
 * produced.
 *
 * Runs last, after patch-intro.mjs has copied the patched engines and the
 * pristine public/sw.js into dist/ — so the hashes here describe the bytes that
 * ship, not the ones public/ happened to hold.
 *
 * Output is deterministic: paths are sorted and hashes come from file contents,
 * so re-running the build produces a byte-identical dist/. CI checks that.
 */

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(root, "..", "..");
const repoRoot = path.resolve(appRoot, "..");
const distDir = path.resolve(repoRoot, "dist");

/**
 * Files that ship but can never contribute to rendering the site offline.
 * Every entry costs a returning visitor real bandwidth, so each one is here
 * for a stated reason rather than "it looked unused".
 */
const EXCLUDED = [
  [/^\/sw\.js$/, "the worker itself; caching it would freeze updates"],
  [/^\/_headers$/, "Cloudflare Pages directive file, never served to a browser"],
  [/^\/\.well-known\//, "TWA asset links; verified over the live network by design"],
  [/\.map$/, "source maps, 1.7 MB of them, only ever loaded by devtools"],
  [/^\/(robots\.txt|sitemap\.xml|llms\.txt)$/, "crawler metadata, not page assets"],
  [/^\/images\/og-image\./, "social card art, fetched by scrapers and never by the page"],
  // Verified dead: nothing in dist/ references these paths, and a full browser
  // run of the site (intro handover plus a scroll to the footer) requests
  // /images/** and /webgl/textures/** exclusively. They are stale copies left
  // by the reference sync, and precaching them would cost 5.6 MB for nothing.
  [/^\/assets\/images\//, "duplicate of /images/, unreferenced"],
  [/^\/webgl\/webgl\//, "duplicate of /webgl/textures/, unreferenced"],
  [/^\/assets\/resume\.pdf$/, "duplicate of /resume.pdf, unreferenced"],
];

/**
 * The install tier: enough to paint the site with the network unplugged.
 * Everything else is warmed in the background afterwards.
 */
const SHELL = [
  /^\/$/,
  /^\/offline\.html$/,
  /^\/site\.webmanifest$/,
  /^\/favicon\.png$/,
  /^\/fonts\//,
  /^\/_astro\//,
  /^\/styles\//,
  /^\/assets\/index-[^/]+\.(js|css)$/,
  /^\/scripts\/(bridge|pwa|resume-dock|img-media)\.js$/,
];

/** Every file under dir, as repo-root-relative POSIX paths, sorted. */
function walk(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(full));
    else if (entry.isFile()) found.push(full);
  }
  return found;
}

function toUrl(filePath) {
  const relative = path.relative(distDir, filePath).split(path.sep).join("/");
  return relative === "index.html" ? "/" : `/${relative}`;
}

if (!fs.existsSync(distDir)) {
  throw new Error(`generate-precache: ${distDir} does not exist. Run the build first.`);
}

const swPath = path.join(distDir, "sw.js");
if (!fs.existsSync(swPath)) {
  throw new Error(`generate-precache: ${swPath} is missing. build.mjs should have copied it.`);
}

const shell = [];
const bulk = [];
let bytes = 0;

for (const filePath of walk(distDir).sort()) {
  const url = toUrl(filePath);
  if (EXCLUDED.some(([pattern]) => pattern.test(url))) continue;

  const contents = fs.readFileSync(filePath);
  const hash = createHash("sha256").update(contents).digest("hex").slice(0, 16);
  bytes += contents.byteLength;

  (SHELL.some((pattern) => pattern.test(url)) ? shell : bulk).push([url, hash]);
}

// A missing shell means the build moved a file and this list went stale, which
// would silently degrade offline support. Fail the build instead.
for (const required of ["/", "/offline.html", "/site.webmanifest"]) {
  if (!shell.some(([url]) => url === required)) {
    throw new Error(`generate-precache: ${required} is not in dist/. Offline support would be broken.`);
  }
}

const version = createHash("sha256")
  .update([...shell, ...bulk].map(([url, hash]) => `${url}:${hash}`).join("\n"))
  .digest("hex")
  .slice(0, 16);

const manifest = JSON.stringify({ version, shell, bulk });
const block = `/* precache:start */\nconst PRECACHE_MANIFEST = ${manifest};\n/* precache:end */`;

const source = fs.readFileSync(swPath, "utf8");
const marker = /\/\* precache:start \*\/[\s\S]*?\/\* precache:end \*\//;
if (!marker.test(source)) {
  throw new Error("generate-precache: precache markers missing from sw.js.");
}

fs.writeFileSync(swPath, source.replace(marker, block), "utf8");

const mb = (bytes / 1024 / 1024).toFixed(1);
console.log(
  `generate-precache: ${shell.length} shell + ${bulk.length} bulk files, ${mb} MB, version ${version}`
);
