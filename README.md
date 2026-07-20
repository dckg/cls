# CLS Language Minors — AY2026/27 Course Availability

Checks which courses of the NUS Centre for Language Studies (CLS) **Minors in
Language Studies** (Arabic, Bahasa Indonesia, Chinese, French, German, Hindi,
Japanese, Korean, Malay, Spanish, Thai, Vietnamese) are actually offered in
AY2026/2027, using the [NUSMods API](https://api.nusmods.com/v2/).

For each minor it reports, per Semester 1 and Semester 2:

- the **eligible language courses** (e.g. `LAF1201` French 1 … `LAF4202` French 6), and
- the **recognised courses** from the language track,

plus everything **not offered at all** this academic year.

## Usage

```bash
python3 check_availability.py            # current AY, fresh download
python3 check_availability.py 2027-2028  # explicit AY
python3 check_availability.py --offline  # reuse the cached module list
```

No dependencies beyond the Python 3 standard library. The target academic year
is derived from today's date (from May onward, the AY starting that August).
The script downloads the NUSMods module list into `data/` (gitignored), then
writes two generated files — `data/minor_availability.json` (full availability
data) and `checker_data.js` (the data the eligibility checker reads) — and
prints a summary.

Data freshness is automated: a GitHub Action re-runs the script every Monday
and opens a pull request for human review whenever NUSMods data changed.
Merging it deploys the site. **See [MAINTAINERS.md](MAINTAINERS.md) for the
maintainer guide (no technical skills required).**

## Files

- `check_availability.py` — the checker script; encodes the minor requirements (CLS policy) inline and generates everything below
- `data/minor_availability.json` — *generated*: availability data (Sem 1 / Sem 2 / not offered, per minor)
- `checker_data.js` — *generated*: course levels, semester tags and recognised-course options for the eligibility checker
- `index.html` — landing page: the "Two Ways to Minor in Languages" poster (same wording and
  layout as the printed A5 poster), linking on to the checker
- `checker.html` — standalone interactive eligibility checker for the
  Minor in Language Studies and the Minor in Multilingual Communication: add the relevant CLS
  level courses for each language you plan to complete and it works out which minor(s) you would
  qualify for, including whether the two can be held together. Live at
  [cls.nusu.town](https://cls.nusu.town); also works opened directly in a browser —
  no build step or server needed. Results are based on the current offer of CLS courses and may
  vary according to the availability of the listed courses in each AY and the condition that a
  prescribed number of enrolments is met in those courses. Indicative only — confirm with CLS.
- `tests/` — headless tests: `test_checker.js` (verdict logic), `verify_data.js` (generated-data consistency)
- `.github/workflows/update-availability.yml` — the weekly auto-update (opens a PR; a human merges)
- `wrangler.jsonc` — Cloudflare deployment config (static assets)
- `MAINTAINERS.md` — plain-English guide to keeping the site current
- `canvas/nus-language-minors-ay2627.canvas.tsx` — interactive Cursor Canvas view of the same data

## Key findings (as of 21 Jul 2026)

- **Hindi** has nothing above Hindi 2 listed this year — the minor's required `LAH4202` Hindi 6 is unavailable.
- **Vietnamese** is missing Levels 3 and 5; **Bahasa Indonesia** and **Thai** are missing Level 5.
- **Malay** is the only minor with every listed course available.
- Upper-level language courses generally alternate: Level 5 runs in Sem 1 only and Level 6 in Sem 2 only (Arabic, Chinese, German, Korean, Malay, Spanish).
- `PH2242` Philosophy of Language — the recognised course shared by all twelve minors — runs in Sem 2 only.
- Several recognised courses survive only under a newer cross-listed code (e.g. `GESS1012` for GES1014, `GEC1001` for GEH1006, `GEX1000` for GEH1009, `HY2245` for EU2221, `SC3101` for EU3224).

NUSMods mirrors NUS EduRec data; Semester 2 offerings can still change before
Sem 2 ModReg (around October–November).
