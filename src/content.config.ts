import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * All site copy lives in src/content/ as MDX. Frontmatter holds the structured
 * bits (names, links, ordering); the body holds the prose, written in Markdown
 * with a small set of layout components documented in CONTENT.md.
 *
 * Adding a file to a folder adds it to the site. Ordering is by the `order`
 * field, low to high.
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
    /** Newest robots get the lowest order so they list first. */
    order: z.number().default(0),
  }),
});

const subsystems = defineCollection({
  loader: glob({ base: 'src/content/subsystems', pattern: '**/*.mdx' }),
  schema: z.object({
    robot: reference('robots'),
    name: z.string(),
    /** Filename inside public/robots/<robot>/ — leave unset for a placeholder. */
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const sponsorshipTiers = defineCollection({
  loader: glob({ base: 'src/content/sponsorship-tiers', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    /** Contribution threshold, e.g. "$500+". */
    amount: z.string(),
    /** Ascending: 1 is the entry tier. Drives both table columns and sections. */
    order: z.number(),
    /** Card size for sponsors in this tier. */
    size: z.enum(['lg', 'md', 'sm']).default('md'),
  }),
});

const sponsorshipPerks = defineCollection({
  loader: glob({ base: 'src/content/sponsorship-perks', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    /** Tier ids (filenames) that include this perk. */
    tiers: z.array(reference('sponsorshipTiers')),
    /** Adds an asterisk to the perk, explained by the footnote below the table. */
    asterisk: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const sponsors = defineCollection({
  loader: glob({ base: 'src/content/sponsors', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    /** Omit for the fiscal sponsor, which is featured separately. */
    tier: reference('sponsorshipTiers').optional(),
    /** Set on the fiscal sponsor only. */
    fiscal: z.boolean().default(false),
    /** Shown under the name of the fiscal sponsor, e.g. "Fiscal Sponsor". */
    role: z.string().optional(),
    /** Filename inside public/sponsors/ — leave unset to show the name instead. */
    logo: z.string().optional(),
    url: z.string().optional(),
    since: z.number().optional(),
    order: z.number().default(0),
  }),
});

const subteams = defineCollection({
  loader: glob({ base: 'src/content/subteams', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    skills: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const programs = defineCollection({
  loader: glob({ base: 'src/content/programs', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    when: z.string().optional(),
    /** Filename inside public/outreach/ — leave unset for a placeholder. */
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const resources = defineCollection({
  loader: glob({ base: 'src/content/resources', pattern: '**/*.mdx' }),
  schema: z.object({
    name: z.string(),
    links: z.array(linkSchema).default([]),
    order: z.number().default(0),
  }),
});

export const collections = {
  pages,
  robots,
  subsystems,
  sponsorshipTiers,
  sponsorshipPerks,
  sponsors,
  subteams,
  programs,
  resources,
};
