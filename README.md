# Chequamegon Symphony Orchestra — website

The source for **chequamegonsymphony.org**. A small static site: four pages, a concert
season, a few images. It costs $0/month to run.

If you are the new webmaster and nobody is around to explain this, start here. There is
also a `CLAUDE.md` in this folder written for an AI coding assistant; pointing one at this
repository and asking "explain how this site works" is a legitimate way to get oriented.

## How the site is built and hosted

| Piece | What it is | Where it lives |
|---|---|---|
| **Source** | This repository. Every change to the site is a commit here. | GitHub, in the CSO-owned organization |
| **Builder** | [Astro](https://astro.build) turns the source into plain HTML. | Runs automatically on Cloudflare |
| **Host** | [Cloudflare Pages](https://pages.cloudflare.com) serves the HTML. Free tier. | Cloudflare account owned by the CSO |
| **Domain / DNS** | `chequamegonsymphony.org` is registered at Namecheap; its DNS is managed in Cloudflare. | Namecheap (registration), Cloudflare (DNS) |
| **Editor** | [Decap CMS](https://decapcms.org) at `/admin` — a visual editor that saves to this repo. | Part of this site |

**The flow:** someone edits (in `/admin` or by editing files here) → a commit lands on
`main` → Cloudflare Pages notices, runs `npm run build`, and publishes the result. One to
two minutes, no manual steps.

See `docs/adr/0001-static-site-hosting-platform.md` for *why* it's built this way.

## Editing the site (no technical knowledge needed)

1. Go to `https://chequamegonsymphony.org/admin`
2. Sign in with GitHub (you need to be a member of the CSO GitHub organization).
3. Pick what to edit:
   - **Concert Season** — dates, times, venue, and the program for each concert.
   - **Pages** — the Home and Our Director text.
   - **Site Details** — email, donation address, sponsor logos, the reminder sign-up link.
4. Click **Publish**. The site updates within a couple of minutes.

The concert-reminder sign-up form is a link to an external form (Google Form or similar).
Change the link under **Site Details → Concert reminder sign-up**.

## Editing the site (technical)

```bash
npm install        # once
npm run dev        # local preview at http://localhost:4321
npm run build      # produce dist/ — what Cloudflare serves
```

- Season: `src/data/season.json`
- Contact / donations / sponsors: `src/data/site.json`
- Page copy: `src/content/pages/*.md`
- Layout, nav, footer: `src/layouts/Base.astro`
- Styles: `src/styles/global.css` (one file, no framework)
- Images: `public/images/`

Open a pull request; the `build` workflow checks it; merge to `main` to publish.

## Accounts the CSO owns (keep these in the board's password manager)

- **GitHub organization** — owns this repository. At least two board members should be
  *owners*; the webmaster is an *admin*.
- **Cloudflare account** — DNS for the domain and the Pages project. Same rule: two owners.
- **Namecheap** — the domain registration. Renew yearly (~$15). Do not let this lapse; it's
  the only thing on this list that costs money and the only one that can be lost.
- **MFA** for all three uses an authenticator (TOTP) whose *seed and recovery codes are
  stored in the password manager* — not on any one person's phone. That way the site
  survives any individual leaving.

## If something breaks

- **Site is down / shows an old version:** check the Cloudflare Pages dashboard → Deployments.
  A failed build shows its error there. Fix the file it names, commit, it redeploys.
- **Domain doesn't resolve:** Cloudflare DNS → confirm the `CNAME` for `@` and `www` point to
  the Pages project. Confirm Namecheap still lists Cloudflare's nameservers. Confirm the
  domain hasn't expired.
- **`/admin` won't sign in:** the GitHub OAuth proxy (see `public/admin/config.yml`) may need
  its secret rotated, or the editor isn't in the GitHub organization.
- **You have no idea:** the whole site is in this repository. Anyone who can run
  `npm run build` can host it anywhere. Nothing is locked in.

## History

- 2012–2026: Weebly. Square acquired Weebly and began charging to map the root domain.
- 2026-09: rebuilt as this repository. Content ported from the Weebly site; see ADR-0001.
