// Headless test of the eligibility checker's verdict logic.
// Loads checker_data.js + the <script> from index.html against a stub DOM,
// then drives scenarios through render(). Run: node tests/test_checker.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const dataJs = fs.readFileSync(path.join(root, 'checker_data.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

function stubEl() {
  return {
    innerHTML: '', disabled: false, value: '', textContent: '',
    insertAdjacentHTML(_, h) { this.innerHTML += h; },
    querySelectorAll() { return []; },
  };
}
const els = {};
global.document = {
  querySelector(s) { return els[s] || (els[s] = stubEl()); },
  querySelectorAll() { return []; },
};

const harness = `
;globalThis.__run = function(scenario){
  for(const k of Object.keys(studied)) delete studied[k];
  for(const [lang, v] of Object.entries(scenario)){
    const levels = Array.isArray(v) ? v : v.levels;
    const recog = Array.isArray(v) ? '' : (v.recog || '');
    studied[lang] = { levels: new Set(levels), recognised: recog };
  }
  render();
  return document.querySelector('#result').innerHTML + '||CARDS||' + document.querySelector('#cards').innerHTML;
};`;

eval(dataJs + script + harness);

let failures = 0;
function check(name, scenario, mustContain, mustNotContain = []) {
  const out = global.__run(scenario);
  const text = out.replace(/<[^>]+>/g, '');
  let ok = true;
  for (const s of mustContain) if (!text.includes(s)) { ok = false; console.log(`  MISSING: "${s}"`); }
  for (const s of mustNotContain) if (text.includes(s)) { ok = false; console.log(`  UNEXPECTED: "${s}"`); }
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name}`);
  if (!ok) { failures++; console.log('  got: ' + text.slice(0, 600)); }
}

check('either + started Thai names Thai with 2 courses',
  { Chinese: [1,2,3,4,5,6], Thai: [1,2] },
  ['Either minor — but not both at once',
   'Quickest unlock based on what you’ve already studied',
   'Thai', '2 more courses (LAT3201, LAT3202)',
   'Chinese double-counting as your Level 2 language',
   '(Results based on the current offer of CLS courses']);

check('either + only Malay (not in the nine) stays generic',
  { Chinese: [1,2,3,4,5,6], Malay: [1,2] },
  ['Either minor — but not both at once',
   '(Results based on the current offer of CLS courses'],
  ['Quickest unlock']);

check('Thai at Level 4 gives BOTH',
  { Chinese: [1,2,3,4,5,6], Thai: [1,2,3,4] },
  ['You qualify for BOTH minors',
   '(Results based on the current offer of CLS courses']);

check('either + Thai lv1 only needs 3 more courses',
  { Chinese: [1,2,3,4,5,6], Thai: [1], Malay: [1,2] },
  ['Either minor — but not both at once',
   '3 more courses (LAT2201, LAT3201, LAT3202)']);

check('either + two started candidates picks the closer (Spanish lv1-3)',
  { Chinese: [1,2,3,4,5,6], Thai: [1], Spanish: [1,2,3], Malay: [1,2] },
  ['1 more course (LAS3202)']);

check('LS only (no second language) unchanged',
  { Chinese: [1,2,3,4,5,6] },
  ['✓ Minor in Language Studies']);

check('MC only unchanged',
  { Thai: [1,2,3,4], Malay: [1,2] },
  ['✓ Minor in Multilingual Communication']);

check('not there yet',
  { Thai: [1] },
  ['Not there yet']);

check('4+1 route: 4 Chinese courses incl Lv6 + recognised course = LS met',
  { Chinese: {levels:[3,4,5,6], recog:'PH2242'} },
  ['✓ Minor in Language Studies']);

check('same 4 courses without a recognised course is not LS',
  { Chinese: [3,4,5,6] },
  ['Not there yet']);

check('recognised dropdown lists options from generated data',
  { Chinese: [1,2] },
  ['— none —', 'PH2242 — Philosophy of Language (Sem 2)']);

check('no recognised dropdown for a Level-4-only language',
  { Thai: [1] },
  ['Currently offered up to CLS Level 4'], ['— none —']);

const raw = global.__run({ Chinese: {levels:[1,2], recog:'EL1101E'} });
const selOk = raw.includes('value="EL1101E" selected');
if (!selOk) failures++;
console.log((selOk ? 'PASS' : 'FAIL') + ' — selected option persists across re-render');

if (failures) { console.log(`\n${failures} test(s) FAILED`); process.exit(1); }
console.log('\nAll checker tests passed.');
