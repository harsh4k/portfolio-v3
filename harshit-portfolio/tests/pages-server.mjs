/**
 * dist/ served the way Cloudflare Pages serves it, which is not the way
 * server.mjs does.
 *
 * Pages automatically 308-redirects "/offline.html" to "/offline". server.mjs
 * returns the file directly, so a service worker bug that only appears behind
 * that redirect passed every local test and still broke in production. This
 * server exists so that class of bug fails here first.
 *
 * Test-only. Never run it in production — server.mjs is the local host.
 */

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const root = resolve(appRoot, "..", "dist");
const port = Number(process.env.PORT || 4177);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

if (!existsSync(root)) {
  console.error(`Missing ${root}. Run npm run build first.`);
  process.exit(1);
}

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  } catch {
    response.writeHead(400);
    return response.end();
  }

  // The behaviour this server exists for.
  if (pathname.endsWith(".html") && pathname !== "/index.html") {
    response.writeHead(308, { Location: pathname.slice(0, -".html".length) });
    return response.end();
  }

  let file = resolve(root, pathname === "/" ? "index.html" : pathname.slice(1));
  if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;

  if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return response.end("404 Not Found");
  }

  response.writeHead(200, {
    "Content-Type": types[extname(file).toLowerCase()] || "application/octet-stream",
    "Content-Length": statSync(file).size,
    "Cache-Control": "no-store",
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Pages-alike server on http://127.0.0.1:${port}/ (root: ${root})`);
});
