/**
 * Fail if anything the built site points at is missing from dist/.
 *
 * A renamed image or a path typo in build.mjs still produces a "successful"
 * build; the page just ships a broken image or a 404ing script. This walks the
 * files that reference other files — the HTML pages, the web manifest and the
 * stylesheets — and checks every same-origin reference resolves to a file.
 *
 * Runs against dist/, so `npm run build` must have run first.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(root, "..", "..");
const repoRoot = path.resolve(appRoot, "..");
const distDir = path.resolve(repoRoot, "dist");

if (!fs.existsSync(distDir)) {
  console.error(`check-refs: missing ${distDir}. Run npm run build first.`);
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const ATTR_RE = /\s(?:src|href|poster|srcset|data-src)\s*=\s*["']([^"']+)["']/gi;
const META_RE = /<meta\b[^>]*\scontent\s*=\s*["'](\/[^"']*)["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

/** Pull candidate URLs out of a file, by type. srcset values carry descriptors. */
function extract(file, text) {
  const ext = path.extname(file);
  const urls = [];
  if (ext === ".html") {
    for (const [, value] of text.matchAll(ATTR_RE)) {
      for (const part of value.split(",")) urls.push(part.trim().split(/\s+/)[0]);
    }
    for (const [, value] of text.matchAll(META_RE)) urls.push(value);
    // Inline <style> blocks.
    for (const [, value] of text.matchAll(CSS_URL_RE)) urls.push(value);
  } else if (ext === ".css") {
    for (const [, value] of text.matchAll(CSS_URL_RE)) urls.push(value);
  } else if (ext === ".webmanifest") {
    const manifest = JSON.parse(text);
    const icons = [...(manifest.icons || []), ...(manifest.shortcuts || []).flatMap((s) => s.icons || [])];
    for (const icon of icons) urls.push(icon.src);
    for (const shot of manifest.screenshots || []) urls.push(shot.src);
    for (const shortcut of manifest.shortcuts || []) urls.push(shortcut.url);
    if (manifest.start_url) urls.push(manifest.start_url);
  }
  return urls.filter(Boolean);
}

/** Map a reference to a path inside dist/, or null if it is not ours to check. */
function toDistPath(fromFile, url) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return null; // https:, data:, mailto:, //cdn, #anchor
  const clean = url.split(/[?#]/)[0];
  if (!clean) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    decoded = clean;
  }
  const base = decoded.startsWith("/") ? distDir : path.dirname(fromFile);
  const target = path.join(base, decoded);
  if (decoded.endsWith("/")) return path.join(target, "index.html");
  return target;
}

const sources = walk(distDir).filter((file) => {
  const rel = path.relative(distDir, file).split(path.sep).join("/");
  if (/\.(html|webmanifest)$/.test(rel)) return true;
  // Only our own stylesheets. The vendored engine CSS under _astro/ and
  // assets/ points at upstream asset paths the engines resolve themselves.
  return rel.startsWith("styles/") && rel.endsWith(".css");
});

const missing = [];
let checked = 0;

for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const url of extract(file, text)) {
    const target = toDistPath(file, url);
    if (!target) continue;
    checked += 1;
    if (!target.startsWith(distDir + path.sep) && target !== distDir) {
      missing.push(`${path.relative(distDir, file)} -> ${url} (outside dist/)`);
    } else if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      missing.push(`${path.relative(distDir, file)} -> ${url}`);
    }
  }
}

if (missing.length) {
  console.error(`check-refs: ${missing.length} broken reference(s):`);
  for (const line of missing) console.error(`  ${line}`);
  process.exit(1);
}

console.log(`check-refs: ${checked} references across ${sources.length} files, all present`);
