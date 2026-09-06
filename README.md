# NYX — FRC Team 11744

Website for FRC Team 11744 (NYX), San Diego, CA. Built with [Astro](https://astro.build)
and deployed to GitHub Pages.

**Live:** https://neur0n-7.github.io/nyx-website

---

## Running it locally

Requires **Node 20 or newer**.

```bash
npm install
npm run dev      # http://localhost:4321/nyx-website
npm run build    # static output in dist/
npm run preview  # serve the built site
npm run check    # type-check .astro files
```

---

## First-time GitHub Pages setup

Do this once, in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**
   (not "Deploy from a branch").
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes
   automatically. Watch it under the **Actions** tab.

---

## Editing content

**See [CONTENT.md](CONTENT.md) for the full guide** — it is written for students and
covers every common job.

The short version: all site copy lives in `src/content/` as MDX files (Markdown plus a
few layout blocks). Add a file to a folder and it appears on the site.

| Folder | Controls |
| --- | --- |
| `src/content/pages/` | Per-page title, intro, and body copy |
| `src/content/robots/` | One file per robot |
| `src/content/subsystems/<robot>/` | One file per subsystem, with the four-discipline breakdown |
| `src/content/sponsors/` | One file per sponsor |
| `src/content/sponsorship-tiers/` | Bronze / Silver / Gold / Platinum and their amounts |
| `src/content/sponsorship-perks/` | One file per row of the perks table |
| `src/content/subteams/` | Subteam cards on `/team` (no student roster, by design) |
| `src/content/programs/` | Outreach program cards |
| `src/content/resources/` | Link groups on `/resources` |

Team-wide facts that appear in many places are TypeScript instead, so they get
autocomplete and type-checking:

| File | Controls |
| --- | --- |
| `src/config/site.ts` | Team number, location, email, social links, sponsor-packet path |
| `src/config/nav.ts` | The top navigation menu |

Anything still reading `PLACEHOLDER — …` renders in a muted italic style, so unfinished
copy is easy to spot on the live site. Replace the text and the styling goes away on its own.

Run `npm run check` before pushing — it validates every content file against its schema
and names the file and line if something is off.

### Adding the sponsorship packet

Drop the PDF at `public/nyx-sponsor-packet.pdf`. The download button on `/sponsors` is
already wired to it. To use a different filename, update `sponsorPacket` in
`src/config/site.ts`.

## Moving to a custom domain

Two edits, both flagged with comments in `astro.config.mjs`:

```js
site: 'https://your-domain.org',
base: '/',
```

Then rename `public/CNAME.example` to `public/CNAME`, put the bare domain in it
(no `https://`), point your DNS at GitHub Pages, and set the domain under
**Settings → Pages → Custom domain**.

Every internal link and asset path is built through the `url()` helper in
`src/lib/url.ts`, so nothing else needs changing. Also update the `Sitemap:` line in
`public/robots.txt`.

---

## Project layout

```
src/
  content/          All site copy, as MDX (see CONTENT.md)
  content.config.ts Schemas for every content collection — the source of truth for
                    which frontmatter fields exist and which are required
  config/           site.ts and nav.ts — facts used across many pages
  components/       Header, Footer, CTA, SponsorCard, Placeholder, PageHeader, Prose
  components/mdx/   Layout blocks usable inside content files (Cards, Steps, Stats,
                    Timeline, Disciplines, Note)
  layouts/          Base.astro — <head>, meta tags, page shell
  pages/            One file per route; robots/[slug].astro generates a page per robot
  styles/           global.css — the design tokens live at the top
  lib/              url.ts (base-path-aware links), content.ts (collection helpers)
public/             Static files copied verbatim to the site root
```

### Design tokens

Colors, fonts, and spacing are CSS custom properties at the top of `src/styles/global.css`.
The palette is drawn from the team logo: near-black surfaces with a violet accent
(`--accent: #8b5cf6`). Change the accent there and it updates the entire site.
