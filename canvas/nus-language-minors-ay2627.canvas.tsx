import {
  Callout,
  Grid,
  H1,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type CourseItem = { code: string; title: string; lang: boolean };
type MinorData = { sem1: CourseItem[]; sem2: CourseItem[]; notOffered: CourseItem[] };

const DATA: Record<string, MinorData> = {
  Arabic: {
    sem1: [
      { code: "LAR1201", title: "Arabic 1", lang: true },
      { code: "LAR2201", title: "Arabic 2", lang: true },
      { code: "LAR3201", title: "Arabic 3", lang: true },
      { code: "LAR4201", title: "Arabic 5", lang: true },
      { code: "MS3216", title: "Gender and Islam", lang: false },
      { code: "GESS1012", title: "Islam and Contemporary Malay Society", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAR1201", title: "Arabic 1", lang: true },
      { code: "LAR2201", title: "Arabic 2", lang: true },
      { code: "LAR3202", title: "Arabic 4", lang: true },
      { code: "LAR4202", title: "Arabic 6", lang: true },
      { code: "MS3218", title: "The Religious Life of the Malays", lang: false },
      { code: "MS3217", title: "Political Economy, Ethnicity, Religion", lang: false },
      { code: "GESS1012", title: "Islam and Contemporary Malay Society", lang: false },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "SE3211", title: "Religion, Society & Politics in SE Asia", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "HY2261", title: "Modern Middle East History: 1699 to the Present", lang: false },
      { code: "HY3246", title: "History of Islam in Southeast Asia", lang: false },
      { code: "HY2255", title: "Islam in World History", lang: false },
      { code: "MS2221", title: "Sufism in Southeast Asia", lang: false },
      { code: "GES1014", title: "Islam and Contemporary Malay Society (old code; GESS1012 is offered)", lang: false },
    ],
  },
  "Bahasa Indonesia": {
    sem1: [
      { code: "LAB1201", title: "Bahasa Indonesia 1", lang: true },
      { code: "LAB2201", title: "Bahasa Indonesia 2", lang: true },
      { code: "LAB3201", title: "Bahasa Indonesia 3", lang: true },
      { code: "LAB3202", title: "Bahasa Indonesia 4", lang: true },
      { code: "SE2217", title: "War and Southeast Asia", lang: false },
      { code: "SE2224", title: "Unmasked! An Introduction to Traditional Dance in SEA", lang: false },
      { code: "SE1101E", title: "The Lands Below the Winds: Southeast Asia in the World", lang: false },
      { code: "PS2245", title: "Southeast Asian Politics", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAB1201", title: "Bahasa Indonesia 1", lang: true },
      { code: "LAB2201", title: "Bahasa Indonesia 2", lang: true },
      { code: "LAB3201", title: "Bahasa Indonesia 3", lang: true },
      { code: "LAB4202", title: "Bahasa Indonesia 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "SE2225", title: "Forbidden Pleasures: Vice in Southeast Asia", lang: false },
      { code: "SE3214", title: "Heritage and Heritagescapes in Southeast Asia", lang: false },
      { code: "SE3233", title: "Martial Arts in Southeast Asia", lang: false },
      { code: "SE3219", title: "Maritime Southeast Asia in Depth (Country Studies)", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAB4201", title: "Bahasa Indonesia 5", lang: true },
      { code: "SE2213", title: "Democratisation in Southeast Asia", lang: false },
      { code: "SE2223", title: "Doing Research in Southeast Asia", lang: false },
      { code: "SE2218", title: "Changing Economic Landscape of SE Asia", lang: false },
      { code: "SE3222", title: "Gender in Southeast Asia (listed as SE33222 in the minor doc)", lang: false },
    ],
  },
  Chinese: {
    sem1: [
      { code: "LAC1201", title: "Chinese 1", lang: true },
      { code: "LAC2201", title: "Chinese 2", lang: true },
      { code: "LAC3201", title: "Chinese 3", lang: true },
      { code: "LAC3202", title: "Chinese 4", lang: true },
      { code: "LAC4201", title: "Chinese 5", lang: true },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
    ],
    sem2: [
      { code: "LAC1201", title: "Chinese 1", lang: true },
      { code: "LAC2201", title: "Chinese 2", lang: true },
      { code: "LAC3201", title: "Chinese 3", lang: true },
      { code: "LAC3202", title: "Chinese 4", lang: true },
      { code: "LAC4202", title: "Chinese 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "GEC1001", title: "Chinese Music, Language and Literature (in English)", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
    ],
    notOffered: [
      { code: "CH2293", title: "Introduction to Chinese Art (In English)", lang: false },
      { code: "CH2299", title: "Art of Modern and Contemporary China (In English)", lang: false },
      { code: "CH3298", title: "Chinese in Southeast Asia (In English)", lang: false },
      { code: "GEH1006", title: "Chinese Music, Language, and Literature (old code; GEC1001 is offered)", lang: false },
      { code: "GEC1042", title: "Fashion: East and West", lang: false },
    ],
  },
  French: {
    sem1: [
      { code: "LAF1201", title: "French 1", lang: true },
      { code: "LAF2201", title: "French 2", lang: true },
      { code: "LAF3201", title: "French 3", lang: true },
      { code: "LAF3202", title: "French 4", lang: true },
      { code: "LAF4201", title: "French 5", lang: true },
      { code: "LAF4202", title: "French 6", lang: true },
      { code: "SC3101", title: "Social Thought & Social Theory", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "PH3207", title: "Continental European Philosophy", lang: false },
      { code: "PS3880H", title: "The Politics of European Integration", lang: false },
    ],
    sem2: [
      { code: "LAF1201", title: "French 1", lang: true },
      { code: "LAF2201", title: "French 2", lang: true },
      { code: "LAF3201", title: "French 3", lang: true },
      { code: "LAF3202", title: "French 4", lang: true },
      { code: "LAF4201", title: "French 5", lang: true },
      { code: "LAF4202", title: "French 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY2245", title: "Empires, Colonies and Imperialism", lang: false },
      { code: "SC3101", title: "Social Thought & Social Theory", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
      { code: "HY2253", title: "Christianity in World History", lang: false },
      { code: "AH2101", title: "Introduction to Art History", lang: false },
    ],
    notOffered: [
      { code: "LAF4203", title: "French Language and Society", lang: true },
      { code: "LAF4204", title: "Francophone Studies in Context", lang: true },
      { code: "EU1101E", title: "Making of Modern Europe", lang: false },
      { code: "EU2213", title: "Upheaval in Europe: 1848-1918", lang: false },
      { code: "EU2221", title: "Empires, Colonies and Imperialism (HY2245 is offered)", lang: false },
      { code: "EU3224", title: "Social Thought & Social Theory (SC3101 is offered)", lang: false },
      { code: "HY2210", title: "State and Society in Early-Modern Europe", lang: false },
      { code: "EN3227", title: "Romanticism", lang: false },
      { code: "GEC1042", title: "Fashion: East and West", lang: false },
      { code: "PS4218", title: "European Foreign Policy", lang: false },
      { code: "PS2236", title: "European Politics", lang: false },
      { code: "EU2217", title: "European Politics", lang: false },
      { code: "EU3228", title: "The EU and ASEAN in the World", lang: false },
      { code: "HY2264", title: "Making of Modern Europe", lang: false },
      { code: "HY4205", title: "Early Modern Europe and its World", lang: false },
    ],
  },
  German: {
    sem1: [
      { code: "LAG1201", title: "German 1", lang: true },
      { code: "LAG2201", title: "German 2", lang: true },
      { code: "LAG3201", title: "German 3", lang: true },
      { code: "LAG4201", title: "German 5", lang: true },
      { code: "LAG4203", title: "German Studies 1", lang: true },
      { code: "SC3101", title: "Social Thought & Social Theory", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "PH2212", title: "Introduction to Continental Philosophy", lang: false },
      { code: "PH3207", title: "Continental European Philosophy", lang: false },
      { code: "PS3880H", title: "The Politics of European Integration", lang: false },
    ],
    sem2: [
      { code: "LAG1201", title: "German 1", lang: true },
      { code: "LAG2201", title: "German 2", lang: true },
      { code: "LAG3201", title: "German 3", lang: true },
      { code: "LAG3202", title: "German 4", lang: true },
      { code: "LAG4202", title: "German 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY2245", title: "Empires, Colonies and Imperialism", lang: false },
      { code: "SC3101", title: "Social Thought & Social Theory", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAG3203", title: "German for Academic Purposes", lang: true },
      { code: "LAG4204", title: "German Studies 2", lang: true },
      { code: "EU1101E", title: "Making of Modern Europe", lang: false },
      { code: "EU2213", title: "Upheaval in Europe: 1848-1918", lang: false },
      { code: "EU2221", title: "Empires, Colonies and Imperialism (HY2245 is offered)", lang: false },
      { code: "EU3224", title: "Social Thought & Social Theory (SC3101 is offered)", lang: false },
      { code: "HY2210", title: "State and Society in Early-Modern Europe", lang: false },
      { code: "HY2264", title: "Making of Modern Europe", lang: false },
      { code: "GEK2030", title: "Introduction to Continental Philosophy (PH2212 is offered)", lang: false },
      { code: "EU2214", title: "Introduction to Continental Philosophy (PH2212 is offered)", lang: false },
      { code: "EU3227", title: "Continental European Philosophy (PH3207 is offered)", lang: false },
      { code: "PS2236", title: "European Politics", lang: false },
      { code: "EU2217", title: "European Politics", lang: false },
      { code: "EU3228", title: "The EU and ASEAN in the World", lang: false },
      { code: "PS3267", title: "German Political Thought", lang: false },
      { code: "HY3209", title: "Cold War in Europe, 1945-1991", lang: false },
      { code: "EU3230", title: "Cold War in Europe, 1945-1991", lang: false },
      { code: "HY3227", title: "Europe of the Dictators", lang: false },
      { code: "EU3212", title: "Europe of the Dictators", lang: false },
    ],
  },
  Hindi: {
    sem1: [
      { code: "LAH1201", title: "Hindi 1", lang: true },
      { code: "LAH2201", title: "Hindi 2", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SN2213", title: "South Asian Democracies - Violence, Conflict, and Hope", lang: false },
      { code: "SN2274", title: "South Asian Cultures: An Introduction", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "GEX1000", title: "Framing Bollywood: Unpacking The Magic", lang: false },
      { code: "SN2285", title: "What's Cooking: Food and Drink in South Asian Cultures", lang: false },
      { code: "GEN2000", title: "Living Culture: Engaging Indian Communities in Singapore", lang: false },
    ],
    sem2: [
      { code: "LAH1201", title: "Hindi 1", lang: true },
      { code: "LAH2201", title: "Hindi 2", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SN1101E", title: "Discover South Asia: People, Culture, Development", lang: false },
      { code: "SN2234", title: "Gendered Lives: Women in South Asia", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
      { code: "GEX1000", title: "Framing Bollywood: Unpacking The Magic", lang: false },
      { code: "SN2285", title: "What's Cooking: Food and Drink in South Asian Cultures", lang: false },
      { code: "GEN2000", title: "Living Culture: Engaging Indian Communities in Singapore", lang: false },
      { code: "AN2203", title: "Peoples and Cultures of Southeast Asia", lang: false },
    ],
    notOffered: [
      { code: "LAH3201", title: "Hindi 3", lang: true },
      { code: "LAH3202", title: "Hindi 4", lang: true },
      { code: "LAH4201", title: "Hindi 5", lang: true },
      { code: "LAH4202", title: "Hindi 6", lang: true },
      { code: "SN2277", title: "Indian Communities in SouthEast Asia", lang: false },
      { code: "SN2280", title: "Marriage, Sex and Love in South Asia", lang: false },
      { code: "SN3274", title: "South Asian Cinema", lang: false },
      { code: "GEH1009", title: "Framing Bollywood (old code; GEX1000 is offered)", lang: false },
      { code: "AH2204", title: "Art in Southeast Asia, 4th-14th centuries CE", lang: false },
    ],
  },
  Japanese: {
    sem1: [
      { code: "LAJ1201", title: "Japanese 1", lang: true },
      { code: "LAJ2201", title: "Japanese 2", lang: true },
      { code: "LAJ2202", title: "Japanese 3", lang: true },
      { code: "LAJ2203", title: "Japanese 4", lang: true },
      { code: "LAJ3201", title: "Japanese 5", lang: true },
      { code: "LAJ3202", title: "Japanese 6", lang: true },
      { code: "LAJ3204", title: "Business Japanese 2", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "JS2213", title: "Visual Analysis of Japanese Popular Culture", lang: false },
      { code: "JS2216", title: "Postwar Japanese Film and Anime", lang: false },
      { code: "JS2225", title: "Marketing and Consumer Culture in Japan", lang: false },
      { code: "JS3213", title: "Alternative Lives in Contemporary Japan", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAJ1201", title: "Japanese 1", lang: true },
      { code: "LAJ2201", title: "Japanese 2", lang: true },
      { code: "LAJ2202", title: "Japanese 3", lang: true },
      { code: "LAJ2203", title: "Japanese 4", lang: true },
      { code: "LAJ3201", title: "Japanese 5", lang: true },
      { code: "LAJ3202", title: "Japanese 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "JS2230", title: "Itadakimasu - Food In Japan", lang: false },
      { code: "JS4229", title: "Japanese Translation - Theory & Practice", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAJ4203", title: "Media Japanese 2", lang: true },
      { code: "JS2203", title: "Sound, Grammar and Meaning", lang: false },
      { code: "JS3214", title: "Japanese Philosophy and Thought", lang: false },
      { code: "JS3223", title: "Japan and the Asia-Pacific Region", lang: false },
      { code: "JS3227", title: "Entrepreneurship: Self-made in Japan", lang: false },
      { code: "JS3230", title: "Men and Women in Modern Japanese Literature", lang: false },
    ],
  },
  Korean: {
    sem1: [
      { code: "LAK1201", title: "Korean 1", lang: true },
      { code: "LAK2201", title: "Korean 2", lang: true },
      { code: "LAK3201", title: "Korean 3", lang: true },
      { code: "LAK3202", title: "Korean 4", lang: true },
      { code: "LAK4201", title: "Korean 5", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAK1201", title: "Korean 1", lang: true },
      { code: "LAK2201", title: "Korean 2", lang: true },
      { code: "LAK3201", title: "Korean 3", lang: true },
      { code: "LAK3202", title: "Korean 4", lang: true },
      { code: "LAK4202", title: "Korean 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAK3203", title: "Korean for Academic Purposes", lang: true },
      { code: "LAK4203", title: "Korean 7", lang: true },
      { code: "LAK4204", title: "Korean 8", lang: true },
      { code: "HY3206", title: "East Asian International Relations", lang: false },
    ],
  },
  Malay: {
    sem1: [
      { code: "LAM1201", title: "Malay 1", lang: true },
      { code: "LAM2201", title: "Malay 2", lang: true },
      { code: "LAM3201", title: "Malay 3", lang: true },
      { code: "LAM4201", title: "Malay 5", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2224", title: "Unmasked! An Introduction to Traditional Dance in SEA", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAM1201", title: "Malay 1", lang: true },
      { code: "LAM2201", title: "Malay 2", lang: true },
      { code: "LAM3202", title: "Malay 4", lang: true },
      { code: "LAM4202", title: "Malay 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2225", title: "Forbidden Pleasures: Vice in Southeast Asia", lang: false },
      { code: "SE3214", title: "Heritage and Heritagescapes in Southeast Asia", lang: false },
      { code: "SE3233", title: "Martial Arts in Southeast Asia", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [],
  },
  Spanish: {
    sem1: [
      { code: "LAS1201", title: "Spanish 1", lang: true },
      { code: "LAS2201", title: "Spanish 2", lang: true },
      { code: "LAS3201", title: "Spanish 3", lang: true },
      { code: "LAS3202", title: "Spanish 4", lang: true },
      { code: "LAS4201", title: "Spanish 5", lang: true },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "PS3880H", title: "The Politics of European Integration", lang: false },
    ],
    sem2: [
      { code: "LAS1201", title: "Spanish 1", lang: true },
      { code: "LAS2201", title: "Spanish 2", lang: true },
      { code: "LAS3201", title: "Spanish 3", lang: true },
      { code: "LAS3202", title: "Spanish 4", lang: true },
      { code: "LAS4202", title: "Spanish 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY2253", title: "Christianity in World History", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAS4203", title: "Spanish 7", lang: true },
      { code: "LAS4204", title: "Spanish 8", lang: true },
      { code: "EU1101E", title: "Making of Modern Europe", lang: false },
      { code: "EU2213", title: "Upheaval in Europe: 1848-1918", lang: false },
      { code: "HY2231", title: "Upheaval in Europe: 1848-1918", lang: false },
      { code: "HY2210", title: "State and Society in Early-Modern Europe", lang: false },
      { code: "HY2264", title: "The Making of Modern Europe", lang: false },
      { code: "HY3257", title: "The Philippines: A Social and Cultural History", lang: false },
    ],
  },
  Thai: {
    sem1: [
      { code: "LAT1201", title: "Thai 1", lang: true },
      { code: "LAT2201", title: "Thai 2", lang: true },
      { code: "LAT3201", title: "Thai 3", lang: true },
      { code: "LAT3202", title: "Thai 4", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2214", title: "Beyond the Frame: Arts and Lives in Southeast Asia", lang: false },
      { code: "SE2217", title: "War and Southeast Asia", lang: false },
      { code: "SE2224", title: "Unmasked! An Introduction to Traditional Dance in SEA", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAT1201", title: "Thai 1", lang: true },
      { code: "LAT2201", title: "Thai 2", lang: true },
      { code: "LAT3201", title: "Thai 3", lang: true },
      { code: "LAT4202", title: "Thai 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2210", title: "Popular Culture in Southeast Asia", lang: false },
      { code: "SE2221", title: "Old and New Music in Southeast Asia", lang: false },
      { code: "SE2225", title: "Forbidden Pleasures: Vice in Southeast Asia", lang: false },
      { code: "SE3214", title: "Heritage and Heritagescapes in Southeast Asia", lang: false },
      { code: "SE3224", title: "Thai Drawing and Painting", lang: false },
      { code: "SE3233", title: "Martial Arts in Southeast Asia", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAT4201", title: "Thai 5", lang: true },
      { code: "LAT4203", title: "Analysing Thai Media", lang: true },
      { code: "LAT4204", title: "Thai for Academic Purposes", lang: true },
      { code: "SE2212", title: "Cities and Urban Life in Southeast Asia", lang: false },
      { code: "SE2213", title: "Politics in Southeast Asia", lang: false },
      { code: "SE2223", title: "Doing Research in Southeast Asia", lang: false },
      { code: "SE2229", title: "Southeast Asia as a Field of Study", lang: false },
    ],
  },
  Vietnamese: {
    sem1: [
      { code: "LAV1201", title: "Vietnamese 1", lang: true },
      { code: "LAV2201", title: "Vietnamese 2", lang: true },
      { code: "LAV3202", title: "Vietnamese 4", lang: true },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2217", title: "War and Southeast Asia", lang: false },
      { code: "SE1101E", title: "The Lands Below the Winds: Southeast Asia in the World", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
    ],
    sem2: [
      { code: "LAV1201", title: "Vietnamese 1", lang: true },
      { code: "LAV4202", title: "Vietnamese 6", lang: true },
      { code: "PH2242", title: "Philosophy of Language", lang: false },
      { code: "HY1101E", title: "Engaging Asia: A Global History", lang: false },
      { code: "SE2210", title: "Popular Culture in Southeast Asia", lang: false },
      { code: "EL1101E", title: "The Nature of Language", lang: false },
      { code: "EL2101", title: "Structure of Sentences and Meanings", lang: false },
    ],
    notOffered: [
      { code: "LAV3201", title: "Vietnamese 3", lang: true },
      { code: "LAV4201", title: "Vietnamese 5", lang: true },
    ],
  },
};

const MINORS = Object.keys(DATA);

function SemesterTable({ heading, items }: { heading: string; items: CourseItem[] }) {
  return (
    <Stack gap={8}>
      <H3>{heading}</H3>
      <Table
        headers={["Code", "Course"]}
        rows={items.map((c) => [c.code, c.title])}
        rowTone={items.map((c) => (c.lang ? ("info" as const) : undefined))}
        striped
      />
    </Stack>
  );
}

export default function LanguageMinorsAY2627() {
  const theme = useHostTheme();
  const [selected, setSelected] = useCanvasState<string>("selected-minor", MINORS[0]);
  const minor = DATA[selected] ?? DATA[MINORS[0]];

  return (
    <Stack gap={20} style={{ padding: 24, maxWidth: 1100 }}>
      <Stack gap={4}>
        <H1>CLS Language Minors: course availability in AY2026/27</H1>
        <Text size="small" tone="tertiary">
          Source: NUSMods API (api.nusmods.com), AY2026/2027 module data, checked 21 Jul 2026.
          Filtered to the eligible language courses and recognised track courses of each Minor in
          Language Studies. Special Term offerings are not shown.
        </Text>
      </Stack>

      <Row gap={6} wrap>
        {MINORS.map((name) => (
          <span key={name}>
            <Pill active={name === selected} onClick={() => setSelected(name)}>
              {name}
            </Pill>
          </span>
        ))}
      </Row>

      <Grid columns={3} gap={16}>
        <Stat value={minor.sem1.length} label="Courses in Semester 1" />
        <Stat value={minor.sem2.length} label="Courses in Semester 2" />
        <Stat
          value={minor.notOffered.length}
          label="Not offered in AY26/27"
          tone={minor.notOffered.length > 0 ? "warning" : "success"}
        />
      </Grid>

      <Text size="small" tone="tertiary">
        A blue dot marks eligible language courses; unmarked rows are recognised courses from the
        language track. Courses offered in both semesters appear in both tables.
      </Text>

      <Grid columns={2} gap={16} align="start">
        <SemesterTable heading="Semester 1 (AY2026/27)" items={minor.sem1} />
        <SemesterTable heading="Semester 2 (AY2026/27)" items={minor.sem2} />
      </Grid>

      {minor.notOffered.length > 0 && (
        <Stack gap={8}>
          <H3>Not offered in AY2026/27 (either semester)</H3>
          <Table
            headers={["Code", "Course"]}
            rows={minor.notOffered.map((c) => [c.code, c.title])}
            rowTone={minor.notOffered.map((c) => (c.lang ? ("danger" as const) : undefined))}
          />
          <Text size="small" tone="tertiary">
            A red dot marks a missing <Text as="span" weight="semibold" style={{ color: theme.text.secondary }}>language</Text> course
            (affects the level sequence); unmarked rows are recognised track courses.
          </Text>
        </Stack>
      )}

      <Callout tone="info" title="Reading notes">
        Dual-coded courses are checked under each code: where an old code is dead but the new code
        runs (GES1014 vs GESS1012, GEH1006 vs GEC1001, GEH1009 vs GEX1000, EU2221 vs HY2245, EU3224
        vs SC3101, EU2214/GEK2030 vs PH2212, EU3227 vs PH3207), the offered code is shown in the
        semester tables and the dead code is noted under "not offered". NUSMods mirrors EduRec data;
        Semester 2 offerings can still change before Sem 2 ModReg (around October or November).
      </Callout>
    </Stack>
  );
}
