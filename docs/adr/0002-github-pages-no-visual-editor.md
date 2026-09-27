# ADR-0002: Host on GitHub Pages; no visual editor

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-09-27 |
| **Author** | Adam Zeuske, Webmaster |
| **Deciders** | Webmaster, under the board's 2026-09-23 mandate ("fix it in whatever manner you see fit"). Confirmed with the board (via Kristin) 2026-09-27: the webmaster is also the content manager for the foreseeable future. |
| **Supersedes** | The hosting choice (Option A, Cloudflare Pages) and the visual-editor assumption in [ADR-0001](0001-static-site-hosting-platform.md) |

---

## Why revisit a decision four days old

ADR-0001 was accepted on 2026-09-23. On the morning the work began, two things became clear
that ADR-0001 had not weighed:

1. **It missed an option.** ADR-0001 compared Cloudflare Pages and Azure Static Web Apps.
   It did not consider **GitHub Pages**, which is free and runs inside the GitHub
   organization the CSO needs anyway.
2. **The editor assumption did not match reality.** ADR-0001 fixed a visual editor (Decap
   CMS) as a given (§3). In practice, content changes arrive as an email to the webmaster,
   who makes them in git. A visual editor would serve an editor who does not exist.

ADR-0001's criteria (§2) still stand. This record re-scores against them.

## Decision

**Host the site on GitHub Pages from a public repository in the `chequamegonsymphony`
GitHub organization. Keep DNS at Namecheap. Do not run a visual editor.**

## Why GitHub Pages beats Cloudflare Pages on ADR-0001's own criteria

| Criterion | Cloudflare Pages (ADR-0001) | GitHub Pages (this ADR) |
|---|---|---|
| C1 Ongoing cost | $0 | $0 — for a **public** repository (private needs a paid plan) |
| C2 Accounts the board must hold | GitHub + Cloudflare + Namecheap = **3** | GitHub + Namecheap = **2** |
| C4 Own domain + HTTPS | Requires moving nameservers to Cloudflare | Plain DNS records at Namecheap; GitHub issues the certificate |
| C5 Maintenance | None | None |
| C7 Exit cost | ~1 hour | ~1 hour — the site is plain files built from this repository |

ADR-0001 counted Cloudflare as "two accounts" by leaving out Namecheap, which the board holds
under every option. Counted honestly, GitHub Pages removes a whole vendor.

It also leaves the domain's **email forwarding** untouched. The domain's mail is forwarded
by Namecheap, which only works while Namecheap runs the DNS. Moving nameservers to Cloudflare
would have meant rebuilding that forwarding first. With GitHub Pages the nameservers never move.

**What we give up:** automatic per-change preview links (Cloudflare builds one for every pull
request) and server-side redirects. Neither matters at this site's size. Old Weebly addresses
are kept by naming pages after them (`contact-us.html`) or with a one-line redirect page
(`2026-27-concert-series.html`).

**Why public:** everything in the repository is already published on the website. There
are no secrets in it. A public repository is free on GitHub Pages and lets the next
webmaster find it without an invitation. Commit history (including authors' email
addresses) is public too; that was accepted knowingly.

## Why no visual editor

The webmaster makes content changes in git, with AI assistance, and expects to for the
foreseeable future. Board members send changes by email. Decap CMS would have added a
GitHub OAuth sign-in proxy (a Cloudflare Worker) — the only piece of setup the site could
not finish on its own — for editors who were not going to use it.

**The fallback for a non-technical person** is GitHub's own web editor: open
`src/data/season.json` on github.com, click the pencil, edit, click *Commit changes*. The
site republishes in a couple of minutes. The README walks through it.

## When to revisit

- **Add a visual editor** if the site's changes are ever made regularly by someone who is not
  comfortable in git. Decap CMS is two files plus a sign-in proxy; ADR-0001 §3 and the git
  history (commit removing `public/admin/`) show the configuration that was prepared.
- **Need a private repository?** Don't pay: verified nonprofits get a free GitHub Team plan
  through GitHub for Nonprofits. The CSO is a 501(c)(3) (Chequamegon Symphony Orchestra Inc,
  EIN 45-4281372, IRS ruling May 2012). Not applied for in 2026 because nothing needed it.
- **Move hosts** if GitHub Pages changes terms for public repositories, or if the CSO wants
  server-side features (forms, member areas). Cloudflare Pages is the prepared alternative;
  see ADR-0001.

---

*Future decisions about this site get the next number (ADR-0003, …) in this folder.*
