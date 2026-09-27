# Follow-ups after the move off Weebly

Work that is known, agreed in principle, and not yet done. Each item says *why*, so it still
makes sense if the person who wrote it isn't around. Delete an item when it's done; if it
turns into a real decision, record it as the next ADR in `docs/adr/`.

## Before cancelling Weebly

- [ ] **Reminder sign-up form.** Create a Google Form from the CSO Gmail, link it to a Sheet,
  paste the exported Weebly submissions in as the first rows, and put the form's URL in
  `src/data/site.json` → `reminderForm.url`. *Why:* static hosts don't process forms; the
  Sheet is the replacement for Weebly's "Form Submission Reports." The Weebly list had bot
  sign-ups mixed in — expect some on the Google Form too.
- [ ] **Check the Weebly editor for anything not published.** Hidden or draft pages, a blog,
  the file manager's unused uploads, and a site export/archive download if Square still
  offers one. *Why:* once the account is cancelled, anything only in the editor is gone.

## Credentials (proposed — needs the board's agreement)

- [ ] **A board-owned password manager.** A free Bitwarden organization signed up with the
  CSO Gmail, with the webmaster and one board member (currently Kristin) as members and a
  shared collection holding the Gmail, GitHub, and Namecheap logins, their TOTP setup keys,
  and recovery codes. *Why:* credentials in one person's personal manager (or on one
  person's phone) leave with that person. A vault the CSO owns hands off like the rest of
  the site. Bitwarden generates TOTP codes itself, so no phone is a single point of failure.
- [ ] **First handover to the board member:** a one-time expiring link (Bitwarden Send or
  similar), with its passphrase given by voice. *Why:* an intercepted email alone is useless.
- [ ] **Break-glass envelope.** Print the Gmail and GitHub recovery codes, seal them, and
  keep them with the board's physical records. *Why:* if every device and password manager
  is lost, the envelope recovers the Gmail, and the Gmail recovers everything else.
- [ ] **Check the CSO Gmail's own recovery settings.** Recovery phone and email should point
  at current board members, and its 2FA should not live on one person's phone. *Why:* the
  Gmail is the recovery address for every other account; it is the master key.
- [ ] When the above is done and agreed, record it as **ADR-0003** and delete the webmaster's
  local credential notes (or keep them as a second copy — webmaster's call).

## Content

- [ ] **Past seasons.** Wayback Machine copies of every season page from 2014–15 through
  2025–26 (plus Spring 2022 and the 2014 home page) were saved outside this repository,
  along with four photos not on the current site (a group press photo, a horn-section
  rehearsal, a 2024 performance banner, an old violin banner). Decide whether the site
  should have a "Past Seasons" page. *Why:* the old site deleted each season when the next
  began; this is the orchestra's program history, and the archive is its only copy.

## Housekeeping

- [ ] **Namecheap email forwarding.** The domain has Namecheap mail forwarding (MX records to
  `eforward*.registrar-servers.com`). Write down which addresses forward where. *Why:*
  nothing in this migration touches it, but nobody currently knows what it does, and it
  breaks if DNS ever moves away from Namecheap.
