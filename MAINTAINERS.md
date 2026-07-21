# Looking after the CLS minor checker

*You do not need any technical skills to keep this site running. This page
tells you the whole job.*

**The site:** [cls.nusu.town](https://cls.nusu.town) — an interactive checker
that tells NUS students which CLS language minor(s) they can qualify for
(Minor in Language Studies / Minor in Multilingual Communication), based on
which courses actually run this academic year according to
[nusmods.com](https://www.nusmods.com).

---

## The good news: it mostly runs itself

Every **Monday morning** (10:00 Singapore time), an automatic process checks
nusmods.com for changes to the course offerings.

- **If nothing changed** — nothing happens. Most weeks are like this.
- **If something changed** — the system prepares the update and then **waits
  for a human to approve it**. Nothing ever goes live on the website without
  that approval. You'll get an email from GitHub with the subject:

  > **Course availability update — please review and merge**

## When that email arrives (about 1 minute of work)

1. **Click the link in the email.** (Or go to
   [github.com/dckg/cls](https://github.com/dckg/cls), click the
   **"Pull requests"** tab, and open the one waiting there.)
2. **Read the summary on that page.** It lists, in plain English, how many
   courses each language has next semester and which ones are not offered.
   You are only checking one thing: *does anything look clearly absurd?*
   (For example: a language that suddenly has zero courses.)
3. **If it looks reasonable:** scroll down and press the green
   **"Merge pull request"** button, then **"Confirm merge"**.
   That's it — the website updates itself within a few minutes.
4. **If it looks wrong, or you see a red ❌ instead of green ✅ near the
   bottom of the page: do nothing and ask for help** (see below). Doing
   nothing is always safe — the site simply keeps running with its current
   data.

You cannot break the website by merging a page whose checks are green. The
system tests every update automatically before it ever asks for your
approval.

## Once a year, around June (about 10 minutes)

Around June, NUS publishes the coming academic year's courses, and the Monday
check picks the new year up **automatically** — you'll simply get one of the
usual emails, likely with a longer summary than usual.

The one thing automation cannot know is whether **CLS has changed the rules
of the minors themselves**. So once a year:

1. Visit the CLS minor pages:
   [fass.nus.edu.sg/cls/minor-programmes](https://fass.nus.edu.sg/cls/minor-programmes)
2. Compare with what the checker says (the coloured footer at the bottom of
   [cls.nusu.town](https://cls.nusu.town) states the rules it assumes —
   which languages go to which level, the recognised courses, and so on).
3. **If the rules are unchanged:** you're done for the year.
4. **If CLS changed something** (a new language, different recognised
   courses, a restructured minor): this needs a technical edit — ask for
   help, as below.

## When and how to ask for help

Ask for help if:

- a pull request page shows a **red ❌** in its checks,
- an update summary looks absurd (a language losing everything),
- CLS has changed the minors' rules,
- or the site itself is down.

**Who to ask:** anyone comfortable with code — or an AI coding assistant
(such as Claude). They will need access to
[github.com/dckg/cls](https://github.com/dckg/cls). It is enough to tell
them:

> "The CLS minor checker at cls.nusu.town needs attention. Everything about
> how it works is in MAINTAINERS.md in the repo — the technical notes are at
> the bottom."

---

## Technical notes (for whoever gets that message)

Architecture, in five lines:

1. `check_availability.py` downloads the NUSMods module list for the target
   AY (derived from today's date; override with an argument, e.g.
   `python3 check_availability.py 2027-2028`) and writes two generated
   files: `data/minor_availability.json` and `checker_data.js`.
2. `minor.html` (the "Two Ways to Minor in Languages" poster landing page,
   served at cls.nusu.town/minor) links to `minor-checker.html` (the checker,
   at /minor-checker), a static page that reads
   `checker_data.js` via a script tag — no build step, no server code.
3. `tests/test_checker.js` (verdict logic) and `tests/verify_data.js`
   (generated-data consistency) must both pass; run them with `node`.
4. `.github/workflows/update-availability.yml` runs steps 1 and 3 every
   Monday and opens a PR (branch `auto/nusmods-refresh`) if the data
   changed. Merging to `main` is the human gate.
5. Cloudflare (Workers Builds, config in `wrangler.jsonc`; `worker.js`
   handles redirects and clean URLs) deploys `main`
   to cls.nusu.town automatically on every push.

**Policy vs availability.** Course *availability* updates itself from
NUSMods. CLS *policy* is hand-encoded and needs a human when CLS changes the
minors: the `minors` master lists, `CHECKER_LEVELS` and `LEVEL6_TRACKS` in
`check_availability.py`, plus the `NINE` list and the policy sentences in the
footer of `index.html`.

**Known infrastructure couplings:** the GitHub→Cloudflare link is the
"Cloudflare Workers and Pages" GitHub App (if deploys silently stop, check
github.com/settings/installations); PRs from the workflow require the repo
setting "Allow GitHub Actions to create and approve pull requests" to stay
enabled.
