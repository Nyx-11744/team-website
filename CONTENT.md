# Editing the Nyx website

All the words on this site live in `src/content/` as **MDX** files. MDX is just Markdown
with a few extra layout blocks available. Edit a file, commit, push — the site rebuilds
itself.

You do not need to touch anything in `src/pages/` for routine updates.

> Text that still says `PLACEHOLDER — …` renders in a muted italic style, so unfinished
> copy is easy to spot on the live site. Replace the text and the styling clears itself.

---

## How a content file is put together

Every file has two parts: **frontmatter** between `---` lines, and the **body** below it.

```mdx
---
name: Drivetrain          ← frontmatter: structured facts
order: 1
---

This is the body. ←        ← body: prose, written in Markdown
```

Frontmatter is YAML. Rules that catch people out:

- Wrap a value in quotes if it contains a `:` or starts with `#`, `*`, or `[`.
- Lists are either `[a, b, c]` on one line, or `- item` on indented lines.
- Comment a line out with `#` — used throughout to show optional fields.
- Indentation must be spaces, never tabs.

---

## Where everything lives

| Folder | What it holds | Adding one |
| --- | --- | --- |
| `src/content/pages/` | The copy for each page — title, intro, and body prose | Fixed set; edit, don't add |
| `src/content/robots/` | One file per robot, subsystems included in its frontmatter | New file = new robot page at `/robots/<filename>` |

Some lists are plain **JSON** instead, because they are short and get edited as a set
rather than one at a time:

- `src/data/sponsors.json` — every sponsor, plus the fiscal sponsor
- `src/data/sponsorship.json` — the sponsorship tiers and the perks table
- `src/data/subteams.json` — the subteam cards on `/team`

And two files are **not** content at all, because they appear in many places at once:

- `src/config/site.ts` — team number, location, email, social links, sponsor-packet path
- `src/config/nav.ts` — the top navigation menu

### Ordering

Anything with an `order:` number sorts low to high. Ties keep alphabetical order by
filename. To move a card up, lower its number.

### Filenames matter

A file's name becomes its id. `src/content/robots/2026-offseason.mdx` becomes the page
`/robots/2026-offseason`. Renaming a file changes its URL, so rename with care once links
are out in the world.

---

## Layout blocks you can use in a body

These work in any content file — no import needed. Everything between the open and close
tag is normal Markdown.

**`<Cards>` / `<Card>`** — a row of boxes. `cols` accepts 2, 3, or 4.

```mdx
<Cards cols={3}>
  <Card title="Build">
    We design, machine, and wire everything ourselves.
  </Card>
  <Card title="Learn">
    Every student rotates through at least two subteams.
  </Card>
</Cards>
```

**`<Steps>` / `<Step>`** — a numbered sequence; numbering is automatic.

```mdx
<Steps>
  <Step title="Reach out">Email us and tell us a bit about yourself.</Step>
  <Step title="Visit a meeting">Come see what a build night looks like.</Step>
</Steps>
```

**`<Timeline>` / `<Milestone>`** — dated history entries.

```mdx
<Timeline>
  <Milestone year="2026" title="Rookie season">
    Our first competition as FRC 11744.
  </Milestone>
</Timeline>
```

**`<Stats>` / `<Stat>`** — big numbers. Self-closing, no body.

```mdx
<Stats>
  <Stat value="450" label="Students Reached" />
  <Stat value="12" label="Events Hosted" />
</Stats>
```

**`<Note>`** — a highlighted callout.

Two gotchas: component tags need a blank line before them if they follow a paragraph, and
numbers go in braces (`cols={3}`) while text goes in quotes (`title="Build"`).

---

## Common jobs

### Add a sponsor

Every sponsor is one entry in `src/data/sponsors.json`. Copy an existing block and edit it:

```json
{
  "name": "Acme Robotics",
  "tier": "gold",
  "logo": "acme.svg",
  "url": "https://acme.example.com",
  "since": 2026,
  "order": 1
}
```

- `tier` must be `bronze`, `silver`, `gold`, or `platinum` — matching a tier `id` in
  `src/data/sponsorship.json`. A tier with no sponsors is skipped on the page.
- `order` sorts tiles within a tier, low to high.
- `url` may be left as `""` — the tile simply will not be clickable.

Sponsor tiles carry **no description**. The sponsor's name appears when you hover over the
tile (and on keyboard focus; on phones and tablets, where hovering is impossible, the name
is shown permanently).

Watch the JSON punctuation: every entry needs a comma after its closing `}` except the
last one in the list. `npm run check` will not catch a broken JSON file, but `npm run dev`
will fail immediately and name the line.

### Add a sponsor's logo

1. Put the image in `public/sponsors/`. SVG is best; otherwise a PNG with a **transparent
   background**, at least 600px wide.
2. In `src/data/sponsors.json`, set that sponsor's `"logo"` to the filename:

```json
"logo": "acme.svg"
```

The logo then replaces the sponsor's name on the tile. Leave `"logo": ""` and the name
shows as text instead — which is what every sponsor does right now, until logos arrive.

### Edit the subteams

All six cards on `/team` live in `src/data/subteams.json`:

```json
{
  "name": "Electrical",
  "order": 3,
  "description": "What this subteam owns across a season."
}
```

`order` sorts the cards low to high. Add a subteam by copying a block and giving it the
next number.

### Change the sponsorship tiers or perks

Both the tiers and the perks table live in `src/data/sponsorship.json`:

```json
{
  "title": "Company Logo on Team Shirt",
  "tiers": ["silver", "gold", "platinum"],
  "asterisk": true,
  "order": 3
}
```

- `tiers` on a perk is which columns get a checkmark — use the tier `id`s from the
  `tiers` list at the top of the file.
- `asterisk: true` adds a `*` next to the perk, explained under the table.
- `order` sorts both tiers and perk rows, low to high.

The asterisk footnote text is the body of `src/content/pages/sponsorship.mdx`.

### Add a robot

1. Create `src/content/robots/<year>-<name>.mdx`. Copy an existing one for the frontmatter
   shape — `specs`, `links`, `gallery`, and `subsystems` are all optional lists.
2. Make `public/robots/<same-filename>/`, drop photos in, then reference the filenames in
   `hero:` (the robot), a subsystem's `image:`, and `gallery:` (the photo grid).

The robot file's body renders as a full-width prose section below the subsystems — use it
for the design-philosophy write-up and the retrospective.

### Write up a subsystem

Every subsystem is a block inside that robot's `subsystems:` list — there is no separate
file. Each subsystem has an `overview` plus one paragraph for each of the four engineering
disciplines:

```yaml
subsystems:
  - name: Drivetrain
    order: 1
    # image: drivetrain.jpg
    overview: Swerve, because the game rewarded defense-dodging more than raw speed.
    design: Four MK4i modules on a 27" square frame. We iterated the belly pan twice.
    fabrication: Belly pan waterjet by Fabworks; everything else cut in-house.
    electrical: Kraken X60s, CANivore bus, CANcoders for absolute steering position.
    code: WPILib swerve with PathPlanner autos. Tuning notes in the repo.
```

Add a subsystem by copying a block and giving it the next `order` number. Each field is
plain text (not Markdown) — wrap a value in quotes if it contains a `:`.

### Add photos

Placeholders are already sized at the final aspect ratio, so real photos drop in without
shifting the layout.

| Folder | Referenced by |
| --- | --- |
| `public/robots/<robot>/` | `hero:`, a subsystem's `image:`, and `gallery:` |
| `public/sponsors/` | a sponsor's `logo:` |
| `public/team/` | team photos |

---

## Checking your work

```bash
npm run dev      # live preview at http://localhost:4321/nyx-website
npm run check    # catches typos in frontmatter before they reach the site
```

`npm run check` is the useful one. If you misspell a field, use a tier that doesn't exist,
or forget a required value, it tells you the file and line. The GitHub Actions build runs
the same checks, so a broken frontmatter field fails the deploy rather than publishing a
broken page.
