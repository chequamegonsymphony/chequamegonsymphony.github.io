# CLAUDE.md — Chequamegon Symphony Orchestra website

This file is for an AI coding assistant helping whoever maintains this site. The human
`README.md` says *what* and *how*; this file says *why*, and records the decisions so a
future maintainer doesn't have to reverse-engineer a stranger's choices.

## What this is

A four-page static website for a community orchestra in Ashland, Wisconsin. Astro 5,
static output, no client-side framework, one CSS file. Hosted on Cloudflare Pages (free),
DNS on Cloudflare, domain at Namecheap. Decap CMS at `/admin` gives non-technical board
members a visual editor whose saves are git commits.

**Scale and stakes:** a few hundred visitors a month, content changes a few times a season.
Optimize for *a volunteer can maintain this in 2036*, not for features. When in doubt, do
less.

## Decisions and why (the part that evaporates otherwise)

- **Static site, not a CMS-with-a-database.** The content is four pages and a season. A
  database is a thing that needs backups, updates, and someone who remembers the password.
  Git *is* the database here, and GitHub keeps it. See `docs/adr/0001-*.md`.
- **Cloudflare Pages over Azure Static Web Apps.** Both are free and both were viable. Pages
  won on *ownership*: DNS and hosting live in one board-owned account, so the handoff to the
  next webmaster is two logins (GitHub org, Cloudflare) instead of three (plus an Azure
  subscription with billing). The original webmaster knew Azure better and chose against
  familiarity on purpose. If the board ever picks up Azure for other reasons, switching is
  ~1 hour because the site lives in git, not in the host.
- **The season is one data file** (`src/data/season.json`), not four HTML pages. "Update
  the program" is the single most common edit; it should touch one file, and the Decap form
  for it should be obvious. Do not move concert data into page templates.
- **Page copy is Markdown** (`src/content/pages/`) so Decap can offer a rich-text editor.
  Astro's content collection (`src/content.config.ts`) validates the frontmatter.
- **`build.format: 'file'`** produces `/our-director.html`-style URLs to match the old Weebly
  links people may have bookmarked. Keep it unless you also add redirects.
- **No analytics** were carried over. The old site's Google Analytics tag was Universal
  Analytics (`UA-…`), which Google shut down in 2023; it had been collecting nothing for
  years. If the board wants stats, add Cloudflare Web Analytics (free, no cookies) rather
  than GA4.
- **The reminder sign-up form links out** (Google Form / Formspree) instead of being
  processed by the site. Static hosts don't process forms, and an orchestra that runs on a
  Gmail address is well served by a Google Form feeding a Sheet.
- **The Weebly search box and "Powered by Weebly" badge were dropped** deliberately.

## Things that look wrong but aren't

- `contact.jpg` is the *original-resolution* upload from Weebly (their `_orig` suffix); the
  smaller Weebly rendition was discarded.
- `public/admin/config.yml` has a `TODO` for the repo name and a commented-out OAuth
  `base_url`. Decap on Cloudflare Pages needs a tiny OAuth proxy (a Cloudflare Worker running
  something like `decap-proxy`) because Pages doesn't host the GitHub OAuth handshake. Until
  that's deployed, `/admin` won't sign in and edits happen in git directly. This is the one
  piece of setup that isn't finished by scaffolding alone.
- The CI workflow only *builds*; it does not deploy. Cloudflare Pages deploys from `main` on
  its own. The workflow exists to fail a PR before a broken change reaches `main`.

## Conventions

- Keep it to one CSS file. If you feel the need for a framework, the site has grown past its
  purpose — stop and ask whether the board actually wants that.
- Every image goes in `public/images/` with a descriptive filename. Decap uploads there too.
- Dates in `season.json` are ISO (`YYYY-MM-DD`) for the `<time>` element *and* a
  `dateDisplay` string for humans, because "Saturday, November 7" is what a poster says.
- Commit messages: plain English, present tense. "Update spring program." Nobody here needs
  conventional-commit prefixes.
- Don't add a build step, a package, or a service without writing a line in this file
  saying why.

## Accounts and ownership

Board-owned: the GitHub organization, the Cloudflare account, the Namecheap registration.
The webmaster is an admin, never the sole owner. MFA seeds and recovery codes live in the
board's password manager. If you're reading this and the previous webmaster is unreachable,
the README's "Accounts the CSO owns" section is the checklist, and *the domain renewal is the
only thing that can actually be lost.*

## History

Rebuilt in September 2026 from the Weebly site by Adam Zeuske (webmaster) with Claude, after
Square began charging for root-domain mapping. Content was ported verbatim from the live
Weebly pages; images were pulled at original resolution from Weebly's `/uploads/` paths.
The old site's "Peter and the Wold" typo was fixed in passing.

*The best maintenance instruction for this site is the one Rose French put in a horn method
book: don't proceed to the next thing until you're comfortable with the current one.*
