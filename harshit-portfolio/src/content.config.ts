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
    /** Optional case-study lines for the project's own page (src/pages/work/[id].astro); each shows only when set. */
    role: z.string().trim().min(1).max(120).optional(),
    stack: z.array(z.string().trim().min(1).max(30)).max(12).optional(),
    problem: z.string().trim().min(1).max(600).optional(),
    outcome: z.string().trim().min(1).max(600).optional(),
    /** Source code, when it lives somewhere other than `url`. */
    repo: httpsUrl.refine((value) => value.startsWith("https://github.com/"), "Repos link to github.com").optional(),
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
