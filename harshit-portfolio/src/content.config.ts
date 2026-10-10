import { existsSync } from "node:fs";
import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Every entry is validated at build time. A bad URL, a missing image or a
 * duplicate position fails `astro build` instead of shipping a broken card.
 */

const httpsUrl = z.url().refine((value) => value.startsWith("https://"), "Links must use https://");

/** A path under public/images, checked to exist so a typo can't ship a broken image. */
const publicImage = z
  .string()
  .regex(/^\/images\/[\w.-]+\.webp$/, "Images live in public/images as .webp")
  .refine((path) => existsSync(new URL(`../public${path}`, import.meta.url)), "Image file not found in public/");

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: z.object({
    order: z.number().int().positive(),
    title: z.string().trim().min(1).max(40),
    /** Short slug shown in the card caption, e.g. "vlsr" → #vlsr-0001/11. */
    code: z.string().regex(/^[a-z]{3,5}$/),
    url: httpsUrl,
    image: publicImage,
    summary: z.string().trim().min(1).max(120).optional(),
  }),
});

const archive = defineCollection({
  loader: file("src/content/archive.json"),
  schema: z.object({
    order: z.number().int().positive(),
    caption: z.string().trim().min(1).max(60),
    image: publicImage,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
});

export const collections = { projects, archive };
