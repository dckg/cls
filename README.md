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
python3 check_availability.py
```

No dependencies beyond the Python 3 standard library. The script downloads and
caches the NUSMods module list for AY2026/2027 into `data/`, then writes the
result to `data/minor_availability_ay2627.json` and prints a summary.

## Files

- `check_availability.py` — the checker script, with the minor requirements encoded inline
- `data/minor_availability_ay2627.json` — generated availability data (Sem 1 / Sem 2 / not offered, per minor)
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
