import type { APIRoute } from "astro";

/**
 * Every .astro page under src/pages, so a new page is listed without editing
 * this file. 404 and files starting with "_" are left out.
 */
const pages = Object.keys(import.meta.glob("./**/*.astro"))
  .filter((file) => !/(^|\/)(_|404\.astro$)/.test(file.slice(2)))
  .map((file) => file.slice(1).replace(/(index)?\.astro$/, ""))
  .map((path) => (path.endsWith("/") ? path : `${path}/`))
  .sort();

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("sitemap.xml needs `site` set in astro.config.mjs");
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
