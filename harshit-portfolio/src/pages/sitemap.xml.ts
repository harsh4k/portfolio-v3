import type { APIRoute } from "astro";
import { getOrdered } from "../data/collections";

/**
 * Every .astro page under src/pages, so a new page is listed without editing
 * this file. 404, the offline fallback, files starting with "_" and dynamic routes ([param]) are left
 * out; the project pages they generate are added from the collection.
 */
const pages = Object.keys(import.meta.glob("./**/*.astro"))
  .filter((file) => !/(^|\/)(_|(404|offline)\.astro$)|\[/.test(file.slice(2)))
  .map((file) => file.slice(1).replace(/(index)?\.astro$/, ""))
  .map((path) => (path.endsWith("/") ? path : `${path}/`))
  .sort();

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("sitemap.xml needs `site` set in astro.config.mjs");
  const projects = (await getOrdered("projects")).map(({ id }) => `/work/${id}/`);
  const urls = [...pages, ...projects].map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
