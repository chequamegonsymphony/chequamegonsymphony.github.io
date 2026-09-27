# CLAUDE.md — Chequamegon Symphony Orchestra website

This file is for an AI coding assistant helping whoever maintains this site. The human
`README.md` says *what* and *how*; this file says *why*, and records the decisions so a
future maintainer doesn't have to reverse-engineer a stranger's choices.

## What this is

A four-page static website for a community orchestra in Ashland, Wisconsin. Astro 5,
static output, no client-side framework, one CSS file. Hosted on GitHub Pages (free, public
repo), built and deployed by one GitHub Actions workflow. Domain and DNS at Namecheap. No
visual editor: changes are made in git, usually by the webmaster with an AI assistant.

**Scale and stakes:** a few hundred visitors a month, content changes a few times a season.
Optimize for *a volunteer can maintain this in 2036*, not for features. When in doubt, do
less.

## Decisions and why (the part that evaporates otherwise)

- **Static site, not a CMS-with-a-database.** The content is four pages and a season. A
  database is a thing that needs backups, updates, and someone who remembers the password.
  Git *is* the database here, and GitHub keeps it. See `docs/adr/0001-*.md`.
- **GitHub Pages, not Cloudflare Pages or Azure.** Decided in two steps. ADR-0001 chose
  Cloudflare over Azure on *ownership* (fewest board-held accounts; the original webmaster
  knew Azure better and chose against familiarity on purpose). ADR-0002 then noticed
  GitHub Pages had been missed: it needs no account beyond the GitHub org the site already
  requires, and DNS stays at Namecheap, so nameservers never move and the domain's
  Namecheap email forwarding keeps working. Free only because the repo is **public** — a
  paid plan was ruled out. Switching hosts is ~1 hour because the site lives in git.
- **No visual editor** (ADR-0002). Decap CMS was scaffolded and removed before launch:
  changes arrive by email and the webmaster makes them in git. The non-technical fallback is
  GitHub's web editor (README, "Editing the site without technical tools"). Revisit if a
  non-git person starts making regular changes.
- **The season is one data file** (`src/data/season.json`), not four HTML pages. "Update
  the program" is the single most common edit; it should touch one file, and be safe to
  make in GitHub's web editor. Do not move concert data into page templates.
- **Page copy is Markdown** (`src/content/pages/`) so it reads cleanly in a browser editor.
  Astro's content collection (`src/content.config.ts`) validates the frontmatter.
- **Old Weebly URLs keep working.** `build.format: 'file'` produces `/our-director.html`-style
  URLs; `contact-us.astro` is named after Weebly's page, and
  `public/2026-27-concert-series.html` is a one-line redirect to `/concert-series.html`
  (Weebly named the season page after the season). GitHub Pages has no server-side redirects,
  so keep these unless you move hosts. Don't rename pages without leaving a redirect behind.
- **No analytics** were carried over. The old site's Google Analytics tag was Universal
  Analytics (`UA-…`), which Google shut down in 2023; it had been collecting nothing for
  years. If the board wants stats, add Cloudflare Web Analytics (free, no cookies, works on
  any host) rather than GA4.
- **The reminder sign-up form links out** (Google Form / Formspree) instead of being
  processed by the site. Static hosts don't process forms, and an orchestra that runs on a
  Gmail address is well served by a Google Form feeding a Sheet.
- **The Weebly search box and "Powered by Weebly" badge were dropped** deliberately.

## Things that look wrong but aren't

- `contact.jpg` is the *original-resolution* upload from Weebly (their `_orig` suffix); the
  smaller Weebly rendition was discarded.
- The repository is named `chequamegonsymphony.github.io`. That is GitHub's convention for
  the one repo served at the root of the org's Pages address, so root-relative links
  (`/images/…`) work on the preview before the custom domain is attached. A repo named
  anything else is served under a `/repo-name/` subpath and would need Astro's `base` set.
- The one workflow (`.github/workflows/ci.yml`) both *checks* PRs and *deploys* `main`.
  Nothing else publishes the site. Settings → Pages → Source must be "GitHub Actions".
- Nav links are extensionless (`/our-director`) while the files are `.html`; GitHub Pages
  resolves one to the other.

## Conventions

- Keep it to one CSS file. If you feel the need for a framework, the site has grown past its
  purpose — stop and ask whether the board actually wants that.
- Every image goes in `public/images/` with a descriptive filename.
- Dates in `season.json` are ISO (`YYYY-MM-DD`) for the `<time>` element *and* a
  `dateDisplay` string for humans, because "Saturday, November 7" is what a poster says.
- Commit messages: plain English, present tense. "Update spring program." Nobody here needs
  conventional-commit prefixes.
- Don't add a build step, a package, or a service without writing a line in this file
  saying why.

## Accounts and ownership

Board-owned: the CSO Gmail (`chequamegonsymphony@gmail.com`, the recovery address for
everything else), the GitHub organization (owned by a CSO user account signed up with that
Gmail), and the Namecheap registration and DNS. The webmaster is a second org owner, never
the sole owner. MFA seeds and recovery codes live in the board's password manager. If you're reading this and the previous webmaster is unreachable,
the README's "Accounts the CSO owns" section is the checklist, and *the domain renewal is the
only thing that can actually be lost.*

## History

Rebuilt in September 2026 from the Weebly site by Adam Zeuske (webmaster) with Claude, after
Square began charging for root-domain mapping. Content was ported verbatim from the live
Weebly pages; images were pulled at original resolution from Weebly's `/uploads/` paths.
The old site's "Peter and the Wold" typo was fixed in passing.

*The best maintenance instruction for this site is the one Rose French put in a horn method
book: don't proceed to the next thing until you're comfortable with the current one.*
