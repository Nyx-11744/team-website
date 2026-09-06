# Editing the NYX website

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
| `src/content/robots/` | One file per robot | New file = new robot page at `/robots/<filename>` |
| `src/content/subsystems/<robot>/` | One file per subsystem of that robot | New file = new subsystem block |
| `src/content/sponsors/` | One file per sponsor | New file = new sponsor |
| `src/content/sponsorship-tiers/` | Bronze / Silver / Gold / Platinum | Rarely changes |
| `src/content/sponsorship-perks/` | One file per row of the perks table | New file = new row |
| `src/content/subteams/` | One file per subteam | New file = new card on `/team` |
| `src/content/programs/` | One file per outreach program | New file = new card on `/outreach` |
| `src/content/resources/` | One file per link group on `/resources` | New file = new group |

Two things are **not** content, because they appear in many places at once:

- `src/config/site.ts` — team number, location, email, social links, sponsor-packet path
- `src/config/nav.ts` — the top navigation menu

### Ordering

Anything with an `order:` number sorts low to high. Ties keep alphabetical order by
filename. To move a card up, lower its number.

### Filenames matter

A file's name becomes its id. `src/content/robots/2026-offseason.mdx` becomes the page
`/robots/2026-offseason`, and subsystems point at it with `robot: 2026-offseason`.
Renaming a file changes its URL, so rename with care once links are out in the world.

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

**`<Disciplines>` / `<Discipline>`** — the four-panel engineering breakdown used inside
subsystem files. See below.

Two gotchas: component tags need a blank line before them if they follow a paragraph, and
numbers go in braces (`cols={3}`) while text goes in quotes (`title="Build"`).

---

## Common jobs

### Add a sponsor

1. Put the logo in `public/sponsors/` — SVG if you have it, otherwise a transparent PNG at
   least 600px wide.
2. Create `src/content/sponsors/<company>.mdx`:

```mdx
---
name: Acme Robotics
tier: gold          # bronze | silver | gold | platinum
logo: acme.svg      # filename in public/sponsors/ — omit for a name-only card
url: https://acme.example.com
since: 2026
order: 1
---

A sentence about what Acme does for NYX.
```

Omit `logo:` and the sponsor's name renders in a styled card instead — which is what all
the current sponsors do until logos arrive. Sponsors with no matching tier file are not
shown, and a tier with no sponsors is skipped on the page automatically.

### Change the sponsorship tiers or perks

Tier amounts live in `src/content/sponsorship-tiers/*.mdx` (`amount: $500+`). Each row of
the perks table is one file in `src/content/sponsorship-perks/`:

```mdx
---
title: Company Logo on Team Shirt
tiers: [silver, gold, platinum]   # which columns get a checkmark
asterisk: true                    # adds a * explained under the table
order: 3
---
```

The asterisk footnote text is the body of `src/content/pages/sponsorship.mdx`.

### Add a robot

1. Create `src/content/robots/<year>-<name>.mdx`. Copy an existing one for the frontmatter
   shape — `specs`, `links`, and `gallery` are all optional lists.
2. Create `src/content/subsystems/<same-filename>/` and add one file per subsystem, each
   with `robot: <same-filename>` in its frontmatter.
3. Make `public/robots/<same-filename>/`, drop photos in, then reference the filenames in
   `hero:` (the robot), `image:` (a subsystem), and `gallery:` (the photo grid).

The robot file's body renders as a full-width prose section below the subsystems — use it
for the design-philosophy write-up and the retrospective.

### Write up a subsystem

The overview goes at the top as plain prose. The four engineering disciplines go in
`<Discipline>` blocks, and each one takes as much Markdown as you want:

```mdx
---
robot: 2026-offseason
name: Drivetrain
order: 1
image: drivetrain.jpg
---

Swerve, because the game rewarded defense-dodging more than raw speed.

<Disciplines>
  <Discipline name="Design">
    Four MK4i modules on a 27" square frame. We iterated the belly pan twice.
  </Discipline>
  <Discipline name="Fabrication">
    Belly pan waterjet by Fabworks; everything else cut in-house.
  </Discipline>
  <Discipline name="Electrical">
    Kraken X60s, CANivore bus, CANcoders for absolute steering position.
  </Discipline>
  <Discipline name="Code">
    WPILib swerve with PathPlanner autos. Tuning notes in the repo.
  </Discipline>
</Disciplines>
```

You can rename the panels, drop one, or add a fifth — `name` is just a label.

### Add photos

Placeholders are already sized at the final aspect ratio, so real photos drop in without
shifting the layout.

| Folder | Referenced by |
| --- | --- |
| `public/robots/<robot>/` | `hero:`, a subsystem's `image:`, and `gallery:` |
| `public/outreach/` | a program's `image:` |
| `public/sponsors/` | a sponsor's `logo:` |
| `public/team/` | team photos |

### Add a resource link

Edit a file in `src/content/resources/`, or add a new one for a new group:

```mdx
---
name: Chief Delphi
order: 2
links:
  - label: 2026 Offseason build thread
    detail: Chief Delphi
    url: https://www.chiefdelphi.com/t/...
  - label: Coming later
    url: '#'
    placeholder: true    # dims it and adds a "Coming soon" badge
    internal: false      # true for files in public/, e.g. /logo.png
---

Build threads and open-source posts.
```

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
