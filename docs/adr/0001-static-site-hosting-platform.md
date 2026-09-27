# ADR-0001: Where the CSO website will be hosted

| | |
|---|---|
| **Status** | Accepted by the board 2026-09-23 · **Hosting choice superseded by [ADR-0002](0002-github-pages-no-visual-editor.md) (2026-09-27)** |
| **Date** | 2026-09-16 |
| **Author** | Adam Zeuske, Webmaster |
| **Deciders** | CSO Board of Directors |

---

## What this document is (read this first)

An **Architecture Decision Record** (ADR) is a one-page memo that captures a technical
decision *and the reasoning behind it*, so that in five years — when everyone in this room
has moved on — whoever inherits the website can read why things are the way they are
instead of guessing.

It has four parts: the **situation** we're in, the **criteria** that matter to us, the
**options** we considered (scored against those criteria), and the **decision** with its
consequences. The board's job is to check that the criteria are the right ones and then
choose. The webmaster's job is to make the options honest and to recommend one.

You do not need to understand any of the technology to make this decision well. Every
criterion below is a plain question about cost, ownership, or risk.

---

## 1. Situation

The CSO website (`chequamegonsymphony.org`) has been hosted on **Weebly**, a
click-to-edit website builder, with the domain name registered at **Namecheap**.
Weebly was acquired by **Square**, which now requires an additional **$15/month** to keep
the site reachable at our own domain name. Without paying, the site is only reachable at
`chequamegonsymphony.weebly.com`, and the root domain currently does not load.

The site itself is small and almost entirely static:

- 4 pages — Home, Our Director, Concert Series, Contact Us
- 5 images — orchestra photo, contact-page photo, three sponsor logos (WPR, Northern State Bank, Ringenberg)
- 1 form — the concert-reminder email signup
- Content changes roughly **once per season** (the concert programs) plus occasional bio or sponsor updates

The current editing process is: log into Weebly, edit in a visual editor, click Publish.
Any replacement must give editors a comparably simple experience.

## 2. Decision criteria

These are the questions the board should actually care about, in rough priority order.

| # | Criterion | Why it matters to the CSO |
|---|-----------|---------------------------|
| C1 | **Ongoing cost** | We are a 501(c)(3) with a small budget. Every recurring dollar competes with music. |
| C2 | **Board ownership & handoff** | The site must belong to the *organization*, not to whoever built it. How many accounts must the board hold, and can a future webmaster take over with only what's in the board's password manager? |
| C3 | **Editor experience** | A board member or volunteer must be able to update the concert season without technical training. |
| C4 | **Our own domain + secure (HTTPS) connection** | `chequamegonsymphony.org` must work, with the padlock, at no extra charge. This is the exact thing Square wants to charge for. |
| C5 | **Reliability & maintenance burden** | Set-and-forget. No servers to patch, no surprise outages, no renewals to babysit beyond the domain itself. |
| C6 | **Room to grow** | If we later want online ticketing, donations, or a members' area, does the platform allow it without starting over? |
| C7 | **Vendor risk** | How likely is the provider to do to us what Square just did — change terms or add fees on a captive customer? What's the cost of leaving? |
| C8 | **Current webmaster's familiarity** | Faster delivery and fewer mistakes now. Weighted *low* on purpose — the site must outlive any one person's skills. |

## 3. What is the same regardless of the choice

To keep the comparison honest, these are **fixed** — they don't depend on which option
the board picks:

- The site will be rebuilt as a **static website** (plain pages, no database), stored in a
  **GitHub repository owned by a CSO-controlled GitHub organization**. GitHub is free for
  this, and the repository *is* the site: every change is recorded, reversible, and
  independent of the hosting provider.
- Editors get a **visual editing screen** (Decap CMS — free, open source) that looks and
  feels like Weebly's editor. Saving a change publishes the site automatically within a
  minute or two. No technical steps.
- The domain stays registered at **Namecheap**; only the DNS (the "phone book" entry that
  says where the site lives) moves.
- The concert-reminder signup form will be handled by a free form service, since neither
  option processes forms itself. (Recommended: a Google Form feeding a Google Sheet, which
  matches how the orchestra already uses Gmail.)
- Documentation for the next webmaster lives in the repository: a `README.md` for
  humans and a `CLAUDE.md` capturing the reasoning for AI-assisted maintenance.

Because the repository is the source of truth, **switching between the two options
later costs about an hour.** This decision is important but it is not permanent.

## 4. Options considered

### Option 0 — Stay on Weebly and pay Square ($15/month)

The status quo, kept for honesty.

- **C1 Cost:** ~$180/year, indefinitely, with no guarantee it stays at $15.
- **C2 Ownership:** One Weebly login; the *content* lives inside Weebly's system and is hard to export in full. The board does not truly own the site — it rents it.
- **C3 Editor:** Familiar visual editor. The best score on this row.
- **C4 Domain/HTTPS:** Only if we pay. This is the trigger for the whole decision.
- **C5 Reliability:** Fine; Square runs it.
- **C6 Growth:** Weebly's paid tiers offer store/booking features at additional monthly cost.
- **C7 Vendor risk:** **Demonstrated.** We are in this meeting because the vendor changed the terms. Leaving later is harder than leaving now, since content export is limited.
- **C8 Familiarity:** N/A.

**Verdict:** Pays a recurring fee for a feature (pointing a domain at a site) that is free
everywhere else, and leaves the CSO with the same exposure next time Square changes terms.

### Option A — Cloudflare Pages (+ Cloudflare DNS)

Cloudflare is one of the largest internet infrastructure companies; Pages is its free
static-site hosting. Cloudflare would also hold our DNS.

- **C1 Cost:** **$0/month.** The free tier includes custom domain, HTTPS certificate, and bandwidth far beyond what a symphony site will ever use. Cloudflare's business model is large enterprises; free small sites are how they market.
- **C2 Ownership:** **Two accounts total** — the CSO GitHub organization and **one** Cloudflare account that holds *both* DNS and hosting. The board keeps two logins in its password manager and can hand the whole site to a new webmaster in one email.
- **C3 Editor:** Identical (Decap CMS, see §3).
- **C4 Domain/HTTPS:** Included. Because DNS and hosting are in the same account, connecting the domain is a single checkbox and the root domain works without any workaround.
- **C5 Reliability:** Excellent; Cloudflare serves a large fraction of the internet. Nothing to maintain.
- **C6 Growth:** Free "Functions" allow small server-side features later (forms, simple integrations). Ticketing and donations would link out to a dedicated service (as they would on any option).
- **C7 Vendor risk:** Low. The free tier has been stable for years. Exit cost ≈ one hour (repoint DNS elsewhere), because the site lives in GitHub, not in Cloudflare.
- **C8 Familiarity:** The webmaster already manages DNS for two other sites in Cloudflare; Pages itself would be new but is well-documented and simple.

**Immediate benefit:** moving DNS to Cloudflare *now* lets us restore `chequamegonsymphony.org`
today by redirecting it to the Weebly address, at no cost, while the new site is built.
This step is required for Option A and harmless for Option B.

### Option B — Azure Static Web Apps (Microsoft Azure)

Microsoft's equivalent free static hosting, running in an Azure subscription.

- **C1 Cost:** **$0/month** for hosting on the free tier, which includes custom domain and HTTPS. *However*, an Azure subscription must exist to hold it (see C2). Note: Microsoft offers nonprofit Azure credits (currently ~$2,000/year via Microsoft for Nonprofits) — worth checking eligibility if the board has any other Azure ambitions.
- **C2 Ownership:** **Three accounts** — GitHub organization, Cloudflare (or Namecheap) for DNS, and an **Azure subscription in the CSO's name** with a payment method on file. Standing up a nonprofit Azure subscription is a real administrative task (tax-exempt verification, billing contact). The temptation would be to host it in the webmaster's *personal* subscription — which works, but means the board does not own its site. That is the exact failure this ADR exists to prevent.
- **C3 Editor:** Identical (Decap CMS).
- **C4 Domain/HTTPS:** Included, with one extra step: DNS still lives elsewhere, so the root domain needs a small DNS workaround (CNAME flattening) that Cloudflare DNS provides. Slightly more moving parts than Option A.
- **C5 Reliability:** Excellent; Microsoft. Nothing to maintain.
- **C6 Growth:** Strong. Managed Azure Functions attach directly to the site; Azure has the broadest catalog if the CSO ever wanted a real application (member portal, ticketing built in-house). This is the one row where B genuinely leads — but only if that future is plausible.
- **C7 Vendor risk:** Low. Exit cost ≈ one hour, same reason as A. Free tier is stable.
- **C8 Familiarity:** **Highest.** The webmaster runs two production sites on exactly this platform with an identical deployment pipeline. Fastest, lowest-risk delivery *today*.

## 5. Comparison at a glance

| Criterion | Option 0: Pay Square | Option A: Cloudflare Pages | Option B: Azure SWA |
|---|---|---|---|
| C1 Ongoing cost | **$180+/yr** | **$0** | **$0** (+ subscription admin) |
| C2 Accounts the board must own | 1 (but content is captive) | **2** | **3** (incl. Azure subscription) |
| C3 Editor experience | Weebly editor | Decap CMS | Decap CMS |
| C4 Own domain + HTTPS | Only if paid | ✅ included, simplest | ✅ included, one extra DNS step |
| C5 Reliability / maintenance | Good | Excellent / none | Excellent / none |
| C6 Room to grow | Paid add-ons | Good | **Best** |
| C7 Vendor risk / exit cost | **High / hard** | Low / ~1 hour | Low / ~1 hour |
| C8 Webmaster familiarity | — | Medium | **High** |

## 6. Webmaster's recommendation

**Option A — Cloudflare Pages.**

The deciding criterion is **C2, ownership and handoff.** A volunteer organization's
website should be transferable to the next volunteer with the fewest possible credentials,
and Option A achieves that with two board-held accounts and no subscription to administer.
Option B's only clear advantages are the webmaster's current familiarity (C8, which this
ADR deliberately weights low) and headroom for a full application (C6) that the CSO has no
current plan to build. If that future arrives, the switch costs an hour because the site
lives in GitHub either way.

Option 0 is not recommended: it pays annually for something both alternatives include free,
and leaves the CSO exposed to the same vendor decision that prompted this document.

**The board may reasonably choose Option B** if it has, or intends to pursue, a broader
relationship with Microsoft (nonprofit credits, Microsoft 365 for the organization,
future applications). In that case the board should commit to standing up an Azure
subscription *in the CSO's name* rather than hosting in an individual's account.

## 7. Consequences of the recommended option

**If Option A is chosen:**

1. Board creates (or delegates creation of) a CSO GitHub organization and a Cloudflare
   account; both logins go in the board's password manager with at least two board
   members as owners.
2. Webmaster moves DNS to Cloudflare and restores the root domain immediately via redirect.
3. Webmaster rebuilds the four pages, sets up Decap CMS, and deploys to a preview URL for
   board review.
4. On approval, DNS is pointed at the new site; the Weebly account is cancelled the
   following day. Square is paid nothing.
5. Ongoing cost: **$0/month** plus the existing Namecheap domain renewal (~$15/year, unchanged).

**What we give up:** the Weebly editor the current editors know, replaced by a similar
one; and the webmaster's day-one familiarity with Azure, traded for a simpler handoff.

**What we must remember:** this decision is recorded here. If a future board revisits it,
start by re-reading §2 — the criteria — and asking whether they've changed.

---

*ADR format after Michael Nygard's "Documenting Architecture Decisions." Future decisions
about this site get the next number (ADR-0002, …) in this folder.*
