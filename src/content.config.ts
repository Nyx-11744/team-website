import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * All site copy lives in src/content/ as MDX. Frontmatter holds the structured
 * bits (names, links, ordering); the body holds the prose, written in Markdown
 * with a small set of layout components documented in CONTENT.md.
 *
 * Adding a file to a folder adds it to the site. Ordering is by the `order`
 * field, low to high.
 *
 * Some lists are plain JSON in src/data/ instead, because they are short, purely
 * structural, and edited as a set rather than one at a time:
 *   - src/data/sponsors.json     (sponsors and the fiscal sponsor)
 *   - src/data/sponsorship.json  (sponsorship tiers and the perks table)
 *   - src/data/subteams.json     (subteam cards on /about)
 */

const linkSchema = z.object({
  label: z.string(),
  detail: z.string().optional(),
  url: z.string(),
  /** Internal links are prefixed with the site base path automatically. */
  internal: z.boolean().default(false),
  /** Renders dimmed with a "Coming soon" badge and does not navigate. */
  placeholder: z.boolean().default(false),
});

/** One subsystem write-up, embedded in the robot that owns it. */
const subsystemSchema = z.object({
  name: z.string(),
  /** Filename inside public/robots/<robot>/ — leave unset for a placeholder. */
  image: z.string().optional(),
  overview: z.string(),
  /** The four engineering disciplines — leave any of these unset to skip that panel. */
  design: z.string().optional(),
  fabrication: z.string().optional(),
  electrical: z.string().optional(),
  code: z.string().optional(),
  order: z.number().default(0),
});

/** Page-level copy: title, intro, and any free-form body prose. */
const pages = defineCollection({
  loader: glob({ base: 'src/content/pages', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string().optional(),
    description: z.string().optional(),
  }),
});

const robots = defineCollection({
  loader: glob({ base: 'src/content/robots', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    year: z.number(),
    season: z.string(),
    game: z.string(),
    status: z.string().default('Complete'),
    summary: z.string(),
    /** Filename inside public/robots/<id>/ — leave unset for a placeholder. */
    hero: z.string().optional(),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    links: z.array(linkSchema).default([]),
    gallery: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    /** Each robot's subsystem breakdown, sorted by `order` low to high. */
    subsystems: z.array(subsystemSchema).default([]),
    /** Newest robots get the lowest order so they list first. */
    order: z.number().default(0),
  }),
});

export const collections = {
  pages,
  robots,
};
