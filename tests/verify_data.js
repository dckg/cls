// Verify that the generated checker_data.js is consistent with the generated
// data/minor_availability.json — guards against a half-run of the generator
// or hand-edits to either file. Run: node tests/verify_data.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const dataJs = fs.readFileSync(path.join(root, 'checker_data.js'), 'utf8');
eval(dataJs + ';globalThis.__d = { META, COURSES, SEM1, SEM2, RECOG };');
const { META, COURSES, SEM1, SEM2, RECOG } = global.__d;

const json = JSON.parse(fs.readFileSync(path.join(root, 'data', 'minor_availability.json'), 'utf8'));

let problems = [];

// Every checker language must exist in the availability data.
for (const lang of Object.keys(COURSES)) {
  if (!json[lang]) problems.push(`no availability entry for ${lang}`);
}

// SEM1/SEM2 levels must match where each level's course code appears.
for (const [lang, pairs] of Object.entries(COURSES)) {
  const entry = json[lang];
  if (!entry) continue;
  const s1 = new Set(entry.sem1.map(c => c.code));
  const s2 = new Set(entry.sem2.map(c => c.code));
  for (const [lvl, code] of pairs) {
    if (s1.has(code) !== (SEM1[lang] || []).includes(lvl))
      problems.push(`${lang} level ${lvl} (${code}): SEM1 tag disagrees with availability data`);
    if (s2.has(code) !== (SEM2[lang] || []).includes(lvl))
      problems.push(`${lang} level ${lvl} (${code}): SEM2 tag disagrees with availability data`);
  }
}

// RECOG lists must match the offered non-language courses of each track.
for (const [lang, entries] of Object.entries(RECOG)) {
  const entry = json[lang];
  if (!entry) { problems.push(`RECOG track ${lang} missing from availability data`); continue; }
  const s1 = new Set(entry.sem1.filter(c => !c.lang).map(c => c.code));
  const s2 = new Set(entry.sem2.filter(c => !c.lang).map(c => c.code));
  const expected = {};
  for (const c of [...s1, ...s2])
    expected[c] = (s1.has(c) && s2.has(c)) ? 'Sem 1·2' : (s1.has(c) ? 'Sem 1' : 'Sem 2');
  const embedded = {};
  for (const [code, , sem] of entries) embedded[code] = sem;
  for (const c of Object.keys(expected))
    if (!(c in embedded)) problems.push(`${lang}: recognised course ${c} offered but missing from dropdown`);
  for (const c of Object.keys(embedded)) {
    if (!(c in expected)) problems.push(`${lang}: dropdown lists ${c} but it is not offered`);
    else if (embedded[c] !== expected[c]) problems.push(`${lang}: ${c} sem tag ${embedded[c]} should be ${expected[c]}`);
  }
}

if (!META || !META.ay || !META.checked) problems.push('META is missing ay/checked fields');

if (problems.length) {
  console.log('DATA MISMATCH:');
  for (const p of problems) console.log(' - ' + p);
  process.exit(1);
}
console.log(`checker_data.js is consistent with data/minor_availability.json (${META.ay}, checked ${META.checked}).`);
