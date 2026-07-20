// GENERATED FILE - do not edit by hand.
// Regenerate with: python3 check_availability.py
// Source: NUSMods API, AY2026/27, checked 20 Jul 2026.
const META = {
  "ay": "AY2026/27",
  "acadYear": "2026-2027",
  "checked": "20 Jul 2026"
};
const COURSES = {
  "Arabic": [
    [
      1,
      "LAR1201"
    ],
    [
      2,
      "LAR2201"
    ],
    [
      3,
      "LAR3201"
    ],
    [
      4,
      "LAR3202"
    ]
  ],
  "Bahasa Indonesia": [
    [
      1,
      "LAB1201"
    ],
    [
      2,
      "LAB2201"
    ],
    [
      3,
      "LAB3201"
    ],
    [
      4,
      "LAB3202"
    ]
  ],
  "Chinese": [
    [
      1,
      "LAC1201"
    ],
    [
      2,
      "LAC2201"
    ],
    [
      3,
      "LAC3201"
    ],
    [
      4,
      "LAC3202"
    ],
    [
      5,
      "LAC4201"
    ],
    [
      6,
      "LAC4202"
    ]
  ],
  "French": [
    [
      1,
      "LAF1201"
    ],
    [
      2,
      "LAF2201"
    ],
    [
      3,
      "LAF3201"
    ],
    [
      4,
      "LAF3202"
    ],
    [
      5,
      "LAF4201"
    ],
    [
      6,
      "LAF4202"
    ]
  ],
  "German": [
    [
      1,
      "LAG1201"
    ],
    [
      2,
      "LAG2201"
    ],
    [
      3,
      "LAG3201"
    ],
    [
      4,
      "LAG3202"
    ],
    [
      5,
      "LAG4201"
    ],
    [
      6,
      "LAG4202"
    ]
  ],
  "Japanese": [
    [
      1,
      "LAJ1201"
    ],
    [
      2,
      "LAJ2201"
    ],
    [
      3,
      "LAJ2202"
    ],
    [
      4,
      "LAJ2203"
    ],
    [
      5,
      "LAJ3201"
    ],
    [
      6,
      "LAJ3202"
    ]
  ],
  "Korean": [
    [
      1,
      "LAK1201"
    ],
    [
      2,
      "LAK2201"
    ],
    [
      3,
      "LAK3201"
    ],
    [
      4,
      "LAK3202"
    ],
    [
      5,
      "LAK4201"
    ],
    [
      6,
      "LAK4202"
    ]
  ],
  "Spanish": [
    [
      1,
      "LAS1201"
    ],
    [
      2,
      "LAS2201"
    ],
    [
      3,
      "LAS3201"
    ],
    [
      4,
      "LAS3202"
    ],
    [
      5,
      "LAS4201"
    ],
    [
      6,
      "LAS4202"
    ]
  ],
  "Thai": [
    [
      1,
      "LAT1201"
    ],
    [
      2,
      "LAT2201"
    ],
    [
      3,
      "LAT3201"
    ],
    [
      4,
      "LAT3202"
    ]
  ],
  "Hindi": [
    [
      1,
      "LAH1201"
    ],
    [
      2,
      "LAH2201"
    ]
  ],
  "Malay": [
    [
      1,
      "LAM1201"
    ],
    [
      2,
      "LAM2201"
    ],
    [
      3,
      "LAM3201"
    ]
  ],
  "Vietnamese": [
    [
      1,
      "LAV1201"
    ],
    [
      2,
      "LAV2201"
    ]
  ]
};
const SEM1 = {
  "Arabic": [
    1,
    2,
    3
  ],
  "Bahasa Indonesia": [
    1,
    2,
    3,
    4
  ],
  "Chinese": [
    1,
    2,
    3,
    4,
    5
  ],
  "French": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "German": [
    1,
    2,
    3,
    5
  ],
  "Japanese": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "Korean": [
    1,
    2,
    3,
    4,
    5
  ],
  "Spanish": [
    1,
    2,
    3,
    4,
    5
  ],
  "Thai": [
    1,
    2,
    3,
    4
  ],
  "Hindi": [
    1,
    2
  ],
  "Malay": [
    1,
    2,
    3
  ],
  "Vietnamese": [
    1,
    2
  ]
};
const SEM2 = {
  "Arabic": [
    1,
    2,
    4
  ],
  "Bahasa Indonesia": [
    1,
    2,
    3
  ],
  "Chinese": [
    1,
    2,
    3,
    4,
    6
  ],
  "French": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "German": [
    1,
    2,
    3,
    4,
    6
  ],
  "Japanese": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "Korean": [
    1,
    2,
    3,
    4,
    6
  ],
  "Spanish": [
    1,
    2,
    3,
    4,
    6
  ],
  "Thai": [
    1,
    2,
    3
  ],
  "Hindi": [
    1,
    2
  ],
  "Malay": [
    1,
    2
  ],
  "Vietnamese": [
    1
  ]
};
const RECOG = {
  "Chinese": [
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "GEC1001",
      "Chinese Music, Language and Literature (in English)",
      "Sem 2"
    ],
    [
      "HY1101E",
      "Engaging Asia: A Global History",
      "Sem 1·2"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ]
  ],
  "French": [
    [
      "AH2101",
      "Introduction to Art History",
      "Sem 2"
    ],
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "HY2245",
      "Empires, Colonies and Imperialism",
      "Sem 2"
    ],
    [
      "HY2253",
      "Christianity in World History",
      "Sem 2"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ],
    [
      "PH3207",
      "Continental European Philosophy",
      "Sem 1"
    ],
    [
      "PS3880H",
      "The Politics of European Integration",
      "Sem 1"
    ],
    [
      "SC3101",
      "Social Thought & Social Theory",
      "Sem 1·2"
    ]
  ],
  "German": [
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "HY2245",
      "Empires, Colonies and Imperialism",
      "Sem 2"
    ],
    [
      "PH2212",
      "Introduction to Continental Philosophy",
      "Sem 1"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ],
    [
      "PH3207",
      "Continental European Philosophy",
      "Sem 1"
    ],
    [
      "PS3880H",
      "The Politics of European Integration",
      "Sem 1"
    ],
    [
      "SC3101",
      "Social Thought & Social Theory",
      "Sem 1·2"
    ]
  ],
  "Japanese": [
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "HY1101E",
      "Engaging Asia: A Global History",
      "Sem 1·2"
    ],
    [
      "JS2213",
      "Visual Analysis of Japanese Popular Culture",
      "Sem 1"
    ],
    [
      "JS2216",
      "Postwar Japanese Film and Anime",
      "Sem 1"
    ],
    [
      "JS2225",
      "Marketing and Consumer Culture in Japan",
      "Sem 1"
    ],
    [
      "JS2230",
      "Itadakimasu - Food In Japan",
      "Sem 2"
    ],
    [
      "JS3213",
      "Alternative Lives in Contemporary Japan",
      "Sem 1"
    ],
    [
      "JS4229",
      "Japanese Translation - Theory & Practice",
      "Sem 2"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ]
  ],
  "Korean": [
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "HY1101E",
      "Engaging Asia: A Global History",
      "Sem 1·2"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ]
  ],
  "Spanish": [
    [
      "EL1101E",
      "The Nature of Language",
      "Sem 1·2"
    ],
    [
      "EL2101",
      "Structure of Sentences and Meanings",
      "Sem 2"
    ],
    [
      "HY2253",
      "Christianity in World History",
      "Sem 2"
    ],
    [
      "PH2242",
      "Philosophy of Language",
      "Sem 2"
    ],
    [
      "PS3880H",
      "The Politics of European Integration",
      "Sem 1"
    ]
  ]
};
