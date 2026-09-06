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

Almost everything on the site is text in `src/data/*.json`. Change a file, commit, push —
the site rebuilds itself. You do not need to touch any `.astro` file for routine updates.

| File | Controls |
| --- | --- |
| `src/data/site.json` | Team name/number, tagline, contact email, social links, sponsor-packet path |
| `src/data/nav.json` | The top navigation menu |
| `src/data/team.json` | Subteams, mentor info, how-to-join steps (**no student roster by design**) |
| `src/data/robots.json` | Every robot, its specs, subsystems, links, and gallery |
| `src/data/sponsors.json` | Sponsors, tiers, fiscal sponsor, benefits table |
| `src/data/outreach.json` | Outreach stats and programs |
| `src/data/resources.json` | Link groups on the Resources page |

Every one of these files starts with a `_readme` key explaining how to add entries.

Anything still reading `PLACEHOLDER — …` renders in a muted italic style, so unfinished
copy is easy to spot on the live site. Replace the text and the styling goes away on its own.

### Adding a sponsor

1. Put the logo in `public/sponsors/` — SVG if you have it, otherwise a transparent PNG at
   least 600px wide.
2. Add an entry to the right tier in `src/data/sponsors.json` and set `"logo"` to the
   filename (e.g. `"qualcomm.svg"`).
3. Leave `"logo": null` and the sponsor's name renders in a styled card instead — that is
   what all three current sponsors do until logos arrive.

### Adding a robot

1. Copy an entry in `src/data/robots.json` and give it a new `"slug"`. That slug becomes the
   URL: `/robots/<slug>`.
2. Create `public/robots/<slug>/`, drop photos in, and reference the filenames in `"hero"`,
   each subsystem's `"image"`, and the `"gallery"` array.
3. Each subsystem documents four disciplines — `design`, `fabrication`, `electrical`,
   `code` — which render as a four-column breakdown on the robot page.

### Adding the sponsorship packet

Drop the PDF at `public/nyx-sponsor-packet.pdf`. The download button on `/sponsors` is
already wired to it. To use a different filename, update `sponsorPacket` in `site.json`.

### Photos

Placeholders are sized at the final aspect ratio, so real photos drop in without shifting
the layout.

| Folder | Used by |
| --- | --- |
| `public/robots/<slug>/` | Robot hero, subsystem, and gallery photos |
| `public/outreach/` | Outreach program photos |
| `public/sponsors/` | Sponsor logos |
| `public/team/` | Team photos |

---

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
  data/         All editable content (JSON)
  components/   Header, Footer, CTA, SponsorCard, Placeholder, PageHeader
  layouts/      Base.astro — <head>, meta tags, page shell
  pages/        One file per route; robots/[slug].astro generates a page per robot
  styles/       global.css — the design tokens live at the top
  lib/url.ts    Base-path-aware URL helper (use this for every internal link)
public/         Static files copied verbatim to the site root
```

### Design tokens

Colors, fonts, and spacing are CSS custom properties at the top of `src/styles/global.css`.
The palette is drawn from the team logo: near-black surfaces with a violet accent
(`--accent: #8b5cf6`). Change the accent there and it updates the entire site.
