# Chequamegon Symphony Orchestra — website

The source for **chequamegonsymphony.org**. A small static site: four pages, a concert
season, a few images. It costs $0/month to run.

If you are the new webmaster and nobody is around to explain this, start here. There is
also a `CLAUDE.md` in this folder written for an AI coding assistant; pointing one at this
repository and asking "explain how this site works" is a legitimate way to get oriented.

## How the site is built and hosted

| Piece | What it is | Where it lives |
|---|---|---|
| **Source** | This repository. Every change to the site is a commit here. | GitHub, in the CSO-owned `chequamegonsymphony` organization |
| **Builder** | [Astro](https://astro.build) turns the source into plain HTML. | GitHub Actions (`.github/workflows/ci.yml`) |
| **Host** | [GitHub Pages](https://pages.github.com) serves the HTML. Free for public repositories. | Same GitHub organization |
| **Domain / DNS** | `chequamegonsymphony.org` is registered at Namecheap, and its DNS is managed there too. | Namecheap |

**The flow:** a commit lands on `main` → the `build` workflow runs `npm run build` and
publishes the result to GitHub Pages. One to two minutes, no manual steps.

See `docs/adr/` for *why* it's built this way — ADR-0001 for the move off Weebly, ADR-0002
for GitHub Pages and the decision not to run a visual editor. Known unfinished work is in
`docs/follow-ups.md`.

## Editing the site without technical tools

Most changes are the concert season. You need a GitHub account that is a member of the
`chequamegonsymphony` organization.

1. On github.com, open this repository and go to `src/data/season.json`.
2. Click the **pencil** (Edit this file).
3. Change the text between the quotes. Keep the quotes, commas, and brackets as they are —
   copying an existing concert and changing its words is the safest way to add one.
   Dates appear twice on purpose: `date` is `YYYY-MM-DD` for computers, `dateDisplay` is
   what a poster would say ("Saturday, November 7, 2026").
4. Click **Commit changes**. The site updates within a couple of minutes.
5. If something went wrong, the **Actions** tab shows a red ✗ with the error, and the live
   site keeps the last good version. Undo by editing again.

Other files you might edit the same way:

- Contact email, donation address, sponsors, the reminder sign-up link: `src/data/site.json`
- Home and Our Director text: `src/content/pages/*.md` (Markdown — plain text with `**bold**`
  and `[links](https://…)`)

The concert-reminder sign-up is a link to a Google Form owned by the CSO Gmail account;
its responses land in a Google Sheet in that account's Drive.

## Editing the site (technical)

```bash
npm install        # once
npm run dev        # local preview at http://localhost:4321
npm run build      # produce dist/ — what GitHub Pages serves
```

- Season: `src/data/season.json`
- Contact / donations / sponsors: `src/data/site.json`
- Page copy: `src/content/pages/*.md`
- Layout, nav, footer: `src/layouts/Base.astro`
- Styles: `src/styles/global.css` (one file, no framework)
- Images: `public/images/`

Open a pull request; the `build` workflow checks it; merge to `main` to publish.

## Accounts the CSO owns (keep these in the board's password manager)

- **CSO Gmail** (`chequamegonsymphony@gmail.com`) — the recovery address for everything
  below. Whoever controls it controls the site. Its recovery phone and email must point at
  current board members.
- **GitHub** — a CSO user account (signed up with the CSO Gmail) that owns the
  `chequamegonsymphony` organization. The webmaster's personal account is a second owner.
  Never leave the organization with only one owner.
- **Namecheap** — the domain registration and its DNS. Renew yearly (~$15). Do not let
  this lapse; it's the only thing on this list that costs money and the only one that can
  be lost.
- **MFA** for all of these uses an authenticator (TOTP) whose *seed and recovery codes are
  stored in the password manager* — not on any one person's phone. That way the site
  survives any individual leaving.

## If something breaks

- **Site shows an old version:** check the repository's **Actions** tab. A failed build
  shows its error there. Fix the file it names, commit, it redeploys.
- **Domain doesn't resolve:** in Namecheap → Advanced DNS, the `@` host needs four `A`
  records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and
  `www` needs a `CNAME` to `chequamegonsymphony.github.io`. In the repository, Settings →
  Pages → Custom domain should read `chequamegonsymphony.org`. Confirm the domain hasn't
  expired.
- **You have no idea:** the whole site is in this repository. Anyone who can run
  `npm run build` can host it anywhere. Nothing is locked in.

## History

- 2012–2026: Weebly. Square acquired Weebly and began charging to map the root domain.
- 2026-09: rebuilt as this repository. Content ported from the Weebly site; see ADR-0001
  and ADR-0002.
