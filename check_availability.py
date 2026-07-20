"""Check availability of CLS language-minor courses against NUSMods data.

Downloads the NUSMods module list for the target academic year, then reports
which eligible language courses and recognised track courses of each Minor in
Language Studies run in Semester 1, Semester 2, or not at all.

Writes two generated files (both committed to the repo):
  - data/minor_availability.json  -- full availability data, all 12 minors
  - checker_data.js               -- the data the eligibility checker
                                     (index.html) reads: level courses,
                                     semester tags, recognised courses

The academic year is derived from today's date (from May onward, the AY
starting that August; before May, the AY already in progress). Override with
an argument or environment variable, e.g.:

    python3 check_availability.py 2027-2028
    ACAD_YEAR=2027-2028 python3 check_availability.py

Pass --offline to reuse a previously downloaded module list from data/.
"""

import datetime
import json
import os
import sys
import urllib.request


def default_acad_year(today=None):
    today = today or datetime.date.today()
    if today.month >= 5:  # NUSMods publishes the new AY's data around May
        return f"{today.year}-{today.year + 1}"
    return f"{today.year - 1}-{today.year}"


args = [a for a in sys.argv[1:] if not a.startswith("-")]
OFFLINE = "--offline" in sys.argv
ACAD_YEAR = args[0] if args else os.environ.get("ACAD_YEAR") or default_acad_year()
AY_SHORT = f"AY{ACAD_YEAR[:4]}/{ACAD_YEAR[7:]}"  # e.g. AY2026/27
CACHE = f"data/moduleList_{ACAD_YEAR}.json"

if OFFLINE and os.path.exists(CACHE):
    print(f"Using cached {CACHE}")
else:
    url = f"https://api.nusmods.com/v2/{ACAD_YEAR}/moduleList.json"
    print(f"Downloading {url} ...")
    os.makedirs("data", exist_ok=True)
    urllib.request.urlretrieve(url, CACHE)

data = json.load(open(CACHE))
if len(data) < 1000:
    sys.exit(f"ERROR: module list for {ACAD_YEAR} has only {len(data)} entries "
             "- refusing to generate from suspicious data.")
mods = {m['moduleCode']: m for m in data}

# ---------------------------------------------------------------------------
# Master lists: the requirements of each Minor in Language Studies.
# This encodes CLS POLICY (which courses count), not availability, and is the
# one part of this repo that needs a human update if CLS revises a minor.
# (code, fallback title, is_language_course)
# ---------------------------------------------------------------------------
minors = {
"Arabic": [
 ("LAR1201","Arabic 1",1),("LAR2201","Arabic 2",1),("LAR3201","Arabic 3",1),
 ("LAR3202","Arabic 4",1),("LAR4201","Arabic 5",1),("LAR4202","Arabic 6",1),
 ("HY2261","Modern Middle East History: 1699 to the Present",0),
 ("HY3246","History of Islam in Southeast Asia",0),
 ("HY2255","Islam in World History",0),
 ("MS3218","The Religious Life of the Malays",0),
 ("MS2221","Sufism in Southeast Asia",0),
 ("MS3217","Political Economy, Ethnicity, Religion",0),
 ("MS3216","Gender and Islam",0),
 ("GES1014","Islam and Contemporary Malay Society",0),
 ("GESS1012","Islam and Contemporary Malay Society",0),
 ("PH2242","Philosophy of Language",0),
 ("SE3211","Religion, Society & Politics in SE Asia",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Bahasa Indonesia": [
 ("LAB1201","Bahasa Indonesia 1",1),("LAB2201","Bahasa Indonesia 2",1),("LAB3201","Bahasa Indonesia 3",1),
 ("LAB3202","Bahasa Indonesia 4",1),("LAB4201","Bahasa Indonesia 5",1),("LAB4202","Bahasa Indonesia 6",1),
 ("PH2242","Philosophy of Language",0),
 ("SE2213","Democratisation in Southeast Asia",0),
 ("SE2217","War and Southeast Asia",0),
 ("SE2223","Doing Research in Southeast Asia",0),
 ("SE2224","Unmasked! An Introduction to Traditional Dance in SEA",0),
 ("SE2225","Forbidden Pleasures: Vice in Southeast Asia",0),
 ("SE3214","Heritage and Heritagescapes in Southeast Asia",0),
 ("SE3233","Martial Arts in Southeast Asia",0),
 ("SE1101E","The Lands Below the Winds: Southeast Asia in the World",0),
 ("SE2218","Changing Economic Landscape of Southeast Asia",0),
 ("SE3222","Gender in Southeast Asia (listed as SE33222)",0),
 ("SE3219","Country Studies: Islands Southeast Asia",0),
 ("PS2245","Southeast Asian Politics",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Chinese": [
 ("LAC1201","Chinese 1",1),("LAC2201","Chinese 2",1),("LAC3201","Chinese 3",1),
 ("LAC3202","Chinese 4",1),("LAC4201","Chinese 5",1),("LAC4202","Chinese 6",1),
 ("PH2242","Philosophy of Language",0),
 ("CH2293","Introduction to Chinese Art (In English)",0),
 ("CH2299","Art of Modern and Contemporary China (In English)",0),
 ("CH3298","Chinese in Southeast Asia (In English)",0),
 ("GEH1006","Chinese Music, Language, and Literature",0),
 ("GEC1001","Chinese Music, Language, and Literature",0),
 ("GEC1042","Fashion: East and West",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
 ("HY1101E","Engaging Asia: A Global History",0),
],
"French": [
 ("LAF1201","French 1",1),("LAF2201","French 2",1),("LAF3201","French 3",1),("LAF3202","French 4",1),
 ("LAF4201","French 5",1),("LAF4202","French 6",1),("LAF4203","French Language and Society",1),
 ("LAF4204","Francophone Studies in Context",1),
 ("PH2242","Philosophy of Language",0),
 ("EU1101E","Making of Modern Europe",0),
 ("EU2213","Upheaval in Europe: 1848-1918",0),
 ("EU2221","Empires, Colonies and Imperialism",0),
 ("HY2245","Empires, Colonies and Imperialism",0),
 ("EU3224","Social Thought & Social Theory",0),
 ("SC3101","Social Thought & Social Theory",0),
 ("HY2210","State and Society in Early-Modern Europe",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
 ("EN3227","Romanticism",0),
 ("PH3207","Continental European Philosophy",0),
 ("GEC1042","Fashion: East and West",0),
 ("PS4218","European Foreign Policy",0),
 ("PS2236","European Politics",0),
 ("EU2217","European Politics",0),
 ("PS3880H","The Politics of European Integration",0),
 ("EU3228","The EU and ASEAN in the World",0),
 ("HY2253","Christianity in World History",0),
 ("HY2264","Making of Modern Europe",0),
 ("HY4205","Early Modern Europe and its World",0),
 ("AH2101","Introduction to Art History",0),
],
"German": [
 ("LAG1201","German 1",1),("LAG2201","German 2",1),("LAG3201","German 3",1),("LAG3202","German 4",1),
 ("LAG3203","German for Academic Purposes",1),("LAG4201","German 5",1),("LAG4202","German 6",1),
 ("LAG4203","German Studies",1),("LAG4204","German Studies 2",1),
 ("PH2242","Philosophy of Language",0),
 ("EU1101E","Making of Modern Europe",0),
 ("EU2213","Upheaval in Europe: 1848-1918",0),
 ("EU2221","Empires, Colonies and Imperialism",0),
 ("HY2245","Empires, Colonies and Imperialism",0),
 ("EU3224","Social Thought & Social Theory",0),
 ("SC3101","Social Thought & Social Theory",0),
 ("HY2210","State and Society in Early-Modern Europe",0),
 ("HY2264","Making of Modern Europe",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
 ("PH2212","Introduction to Continental Philosophy",0),
 ("GEK2030","Introduction to Continental Philosophy",0),
 ("EU2214","Introduction to Continental Philosophy",0),
 ("PH3207","Continental European Philosophy",0),
 ("EU3227","Continental European Philosophy",0),
 ("PS2236","European Politics",0),
 ("EU2217","European Politics",0),
 ("PS3880H","The Politics of European Integration",0),
 ("EU3228","The EU and ASEAN in the World",0),
 ("PS3267","German Political Thought",0),
 ("HY3209","Cold War in Europe, 1945-1991",0),
 ("EU3230","Cold War in Europe, 1945-1991",0),
 ("HY3227","Europe of the Dictators",0),
 ("EU3212","Europe of the Dictators",0),
],
"Hindi": [
 ("LAH1201","Hindi 1",1),("LAH2201","Hindi 2",1),("LAH3201","Hindi 3",1),
 ("LAH3202","Hindi 4",1),("LAH4201","Hindi 5",1),("LAH4202","Hindi 6",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("SN1101E","Discover South Asia: People, Culture, Development",0),
 ("SN2213","South Asian Democracies - Violence, Conflict and Hope",0),
 ("SN2234","Gender and Society in South Asia",0),
 ("SN2274","South Asian Cultures: An Introduction",0),
 ("SN2277","Indian Communities in SouthEast Asia",0),
 ("SN2280","Marriage, Sex and Love in South Asia",0),
 ("SN3274","South Asian Cinema",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
 ("GEH1009","Framing Bollywood: Unpacking The Magic",0),
 ("GEX1000","Framing Bollywood: Unpacking The Magic",0),
 ("SN2285","What's Cooking: Food and Drink in South Asian Cultures",0),
 ("GEN2000","Living Culture: Engaging Indian Communities in Singapore",0),
 ("AN2203","Peoples and Cultures of Southeast Asia",0),
 ("AH2204","Art in Southeast Asia, 4th-14th centuries CE",0),
],
"Japanese": [
 ("LAJ1201","Japanese 1",1),("LAJ2201","Japanese 2",1),("LAJ2202","Japanese 3",1),("LAJ2203","Japanese 4",1),
 ("LAJ3201","Japanese 5",1),("LAJ3202","Japanese 6",1),("LAJ3204","Business Japanese 2",1),
 ("LAJ4203","Media Japanese 2",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("JS2203","Sound, Grammar and Meaning",0),
 ("JS2213","Visual Analysis of Japanese Popular Culture",0),
 ("JS2216","Postwar Japanese Film and Anime",0),
 ("JS2225","Marketing and Consumer Culture in Japan",0),
 ("JS2230","Itadakimasu - Food in Japan",0),
 ("JS3213","Alternative Lives in Contemporary Japan",0),
 ("JS3214","Japanese Philosophy and Thought",0),
 ("JS3223","Japan and the Asia-Pacific Region",0),
 ("JS3227","Entrepreneurship: Self-made in Japan",0),
 ("JS3230","Men and Women in Modern Japanese Literature",0),
 ("JS4229","Japanese Translation - Theory & Practice",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Korean": [
 ("LAK1201","Korean 1",1),("LAK2201","Korean 2",1),("LAK3201","Korean 3",1),("LAK3202","Korean 4",1),
 ("LAK3203","Korean for Academic Purposes",1),("LAK4201","Korean 5",1),("LAK4202","Korean 6",1),
 ("LAK4203","Korean 7",1),("LAK4204","Korean 8",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("HY3206","East Asian International Relations",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Malay": [
 ("LAM1201","Malay 1",1),("LAM2201","Malay 2",1),("LAM3201","Malay 3",1),
 ("LAM3202","Malay 4",1),("LAM4201","Malay 5",1),("LAM4202","Malay 6",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("SE2224","Unmasked! An Introduction to Traditional Dance in SEA",0),
 ("SE2225","Forbidden Pleasures: Vice in Southeast Asia",0),
 ("SE3214","Heritage and Heritagescapes in Southeast Asia",0),
 ("SE3233","Martial Arts in Southeast Asia",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Spanish": [
 ("LAS1201","Spanish 1",1),("LAS2201","Spanish 2",1),("LAS3201","Spanish 3",1),("LAS3202","Spanish 4",1),
 ("LAS4201","Spanish 5",1),("LAS4202","Spanish 6",1),("LAS4203","Spanish 7",1),("LAS4204","Spanish 8",1),
 ("PH2242","Philosophy of Language",0),
 ("EU1101E","Making of Modern Europe",0),
 ("EU2213","Upheaval in Europe: 1848-1918",0),
 ("HY2231","Upheaval in Europe: 1848-1918",0),
 ("HY2210","State and Society in Early-Modern Europe",0),
 ("HY2264","The Making of Modern Europe",0),
 ("HY2253","Christianity in World History",0),
 ("HY3257","The Philippines: A Social and Cultural History",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
 ("PS3880H","The Politics of European Integration",0),
],
"Thai": [
 ("LAT1201","Thai 1",1),("LAT2201","Thai 2",1),("LAT3201","Thai 3",1),("LAT3202","Thai 4",1),
 ("LAT4201","Thai 5",1),("LAT4202","Thai 6",1),("LAT4203","Analysing Thai Media",1),
 ("LAT4204","Thai for Academic Purposes",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("SE2210","Popular Culture in Southeast Asia",0),
 ("SE2212","Cities and Urban Life in Southeast Asia",0),
 ("SE2213","Politics in Southeast Asia",0),
 ("SE2214","Arts of Southeast Asia",0),
 ("SE2217","War and Southeast Asia",0),
 ("SE2221","Old and New Music in Southeast Asia",0),
 ("SE2223","Doing Research in Southeast Asia",0),
 ("SE2224","Unmasked! An Introduction to Traditional Dance in SEA",0),
 ("SE2225","Forbidden Pleasures: Vice in Southeast Asia",0),
 ("SE2229","Southeast Asia as a Field of Study",0),
 ("SE3214","Heritage and Heritagescapes in Southeast Asia",0),
 ("SE3224","Thai Drawing and Painting",0),
 ("SE3233","Martial Arts in Southeast Asia",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
"Vietnamese": [
 ("LAV1201","Vietnamese 1",1),("LAV2201","Vietnamese 2",1),("LAV3201","Vietnamese 3",1),
 ("LAV3202","Vietnamese 4",1),("LAV4201","Vietnamese 5",1),("LAV4202","Vietnamese 6",1),
 ("PH2242","Philosophy of Language",0),
 ("HY1101E","Asia and the Modern World: Engaged Histories",0),
 ("SE2210","Popular Culture in Southeast Asia",0),
 ("SE2217","War and Southeast Asia",0),
 ("SE1101E","The Lands Below the Winds: Southeast Asia in the World",0),
 ("EL1101E","The Nature of Language",0),
 ("EL2101","Structure of Sentences and Meanings",0),
],
}

# ---------------------------------------------------------------------------
# More CLS policy, used by the eligibility checker (index.html):
# which course fills each CLS level of each language, per the minor documents.
# ---------------------------------------------------------------------------
CHECKER_LEVELS = {
  'Arabic':           [(1,'LAR1201'),(2,'LAR2201'),(3,'LAR3201'),(4,'LAR3202')],
  'Bahasa Indonesia': [(1,'LAB1201'),(2,'LAB2201'),(3,'LAB3201'),(4,'LAB3202')],
  'Chinese':          [(1,'LAC1201'),(2,'LAC2201'),(3,'LAC3201'),(4,'LAC3202'),(5,'LAC4201'),(6,'LAC4202')],
  'French':           [(1,'LAF1201'),(2,'LAF2201'),(3,'LAF3201'),(4,'LAF3202'),(5,'LAF4201'),(6,'LAF4202')],
  'German':           [(1,'LAG1201'),(2,'LAG2201'),(3,'LAG3201'),(4,'LAG3202'),(5,'LAG4201'),(6,'LAG4202')],
  'Japanese':         [(1,'LAJ1201'),(2,'LAJ2201'),(3,'LAJ2202'),(4,'LAJ2203'),(5,'LAJ3201'),(6,'LAJ3202')],
  'Korean':           [(1,'LAK1201'),(2,'LAK2201'),(3,'LAK3201'),(4,'LAK3202'),(5,'LAK4201'),(6,'LAK4202')],
  'Spanish':          [(1,'LAS1201'),(2,'LAS2201'),(3,'LAS3201'),(4,'LAS3202'),(5,'LAS4201'),(6,'LAS4202')],
  'Thai':             [(1,'LAT1201'),(2,'LAT2201'),(3,'LAT3201'),(4,'LAT3202')],
  'Hindi':            [(1,'LAH1201'),(2,'LAH2201')],
  'Malay':            [(1,'LAM1201'),(2,'LAM2201'),(3,'LAM3201')],
  'Vietnamese':       [(1,'LAV1201'),(2,'LAV2201')],
}
# Tracks where the Minor in Language Studies (CLS Level 6) is available,
# i.e. where the checker offers the recognised-course "4 + 1" dropdown.
LEVEL6_TRACKS = ['Chinese','French','German','Japanese','Korean','Spanish']

# ---------------------------------------------------------------------------
# Availability report (all 12 minors)
# ---------------------------------------------------------------------------
out = {}
for minor, courses in minors.items():
    sem1, sem2, none = [], [], []
    for code, fallback, is_lang in courses:
        m = mods.get(code)
        title = m['title'] if m else fallback
        sems = m.get('semesters', []) if m else []
        item = {"code": code, "title": title, "lang": bool(is_lang)}
        if 1 in sems: sem1.append(item)
        if 2 in sems: sem2.append(item)
        if 1 not in sems and 2 not in sems: none.append(item)
    if not sem1 and not sem2:
        sys.exit(f"ERROR: no {minor} course is offered at all in {ACAD_YEAR} "
                 "- this looks like bad upstream data; refusing to generate.")
    out[minor] = {"sem1": sem1, "sem2": sem2, "notOffered": none}

out_path = "data/minor_availability.json"
with open(out_path, "w") as f:
    json.dump(out, f, indent=1)
print(f"Wrote {out_path}")

# ---------------------------------------------------------------------------
# Checker data (index.html)
# ---------------------------------------------------------------------------
def sems_of(code):
    m = mods.get(code)
    return m.get('semesters', []) if m else []

def sem_tag(code):
    s = sems_of(code)
    if 1 in s and 2 in s: return 'Sem 1·2'
    if 1 in s: return 'Sem 1'
    if 2 in s: return 'Sem 2'
    return None

courses_js = {l: [[lvl, code] for lvl, code in pairs] for l, pairs in CHECKER_LEVELS.items()}
sem1_js = {l: [lvl for lvl, code in pairs if 1 in sems_of(code)] for l, pairs in CHECKER_LEVELS.items()}
sem2_js = {l: [lvl for lvl, code in pairs if 2 in sems_of(code)] for l, pairs in CHECKER_LEVELS.items()}

recog_js = {}
for track in LEVEL6_TRACKS:
    entries = []
    for code, fallback, is_lang in minors[track]:
        if is_lang: continue
        tag = sem_tag(code)
        if not tag: continue  # not offered this AY
        title = mods[code]['title'] if code in mods else fallback
        entries.append([code, title, tag])
    entries.sort(key=lambda e: e[0])
    recog_js[track] = entries

meta = {
    "ay": AY_SHORT,
    "acadYear": ACAD_YEAR,
    "checked": datetime.date.today().strftime("%-d %b %Y"),
}

def js(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)

with open("checker_data.js", "w") as f:
    f.write(
        "// GENERATED FILE - do not edit by hand.\n"
        "// Regenerate with: python3 check_availability.py\n"
        f"// Source: NUSMods API, {AY_SHORT}, checked {meta['checked']}.\n"
        f"const META = {js(meta)};\n"
        f"const COURSES = {js(courses_js)};\n"
        f"const SEM1 = {js(sem1_js)};\n"
        f"const SEM2 = {js(sem2_js)};\n"
        f"const RECOG = {js(recog_js)};\n"
    )
print("Wrote checker_data.js")

# ---------------------------------------------------------------------------
# Human-readable summary (also used as the pull-request body in CI)
# ---------------------------------------------------------------------------
print(f"\nSummary for {AY_SHORT} (NUSMods, checked {meta['checked']}):")
for minor, v in out.items():
    missing = ", ".join(c["code"] for c in v["notOffered"]) or "(all listed courses offered)"
    print(f"- {minor}: {len(v['sem1'])} courses in Sem 1, {len(v['sem2'])} in Sem 2 | not offered: {missing}")
