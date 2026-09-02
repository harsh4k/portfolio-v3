import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(fileURLToPath(new URL(".", import.meta.url)));
const root = resolve(appRoot, "..", "dist");
const port = Number(process.env.PORT || 4175);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
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
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(request, response, filePath) {
  const info = statSync(filePath);
  const type = types[extname(filePath).toLowerCase()] || "application/octet-stream";
  const baseHeaders = {
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "SAMEORIGIN",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self'; worker-src 'self' blob:; frame-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'",
  };
  const range = request.headers.range;

  if (!range) {
    response.writeHead(200, { ...baseHeaders, "Content-Length": info.size });
    if (request.method === "HEAD") return response.end();
    return createReadStream(filePath).pipe(response);
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) {
    response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
    return response.end();
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
  if (start > end || start >= info.size) {
    response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
    return response.end();
  }

  response.writeHead(206, {
    ...baseHeaders,
    "Content-Length": end - start + 1,
    "Content-Range": `bytes ${start}-${end}/${info.size}`,
  });
  if (request.method === "HEAD") return response.end();
  return createReadStream(filePath, { start, end }).pipe(response);
}

function resolveFile(pathname) {
  const relative = pathname === "/" ? "index.html" : normalize(pathname).replace(/^[/\\]+/, "");
  const candidate = resolve(root, relative);
  if (!candidate.startsWith(root + sep) && candidate !== resolve(root, "index.html")) {
    return null;
  }
  try {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  } catch {
    return null;
  }
  return null;
}

if (!existsSync(root)) {
  console.error(`Missing ${root}. Run npm run build first.`);
  process.exit(1);
}

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1`).pathname);
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  const filePath = resolveFile(pathname);
  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 Not Found");
    return;
  }

  sendFile(request, response, filePath);
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/ (root: ${root})`);
});
