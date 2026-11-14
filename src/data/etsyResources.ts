import type { EtsyProduct, Resource } from './types';

/**
 * Original CleveRNurses infographics verified in the live Etsy shop on 2026-11-14.
 * Titles, URLs and prices come from the shop and listing pages. "artworkTitle" is the name
 * used in the All-in-One bundle contents. The educational text on each page is CleveRNurses
 * web content (pending clinical review), not the Etsy description.
 *
 * Artwork: Etsy images could not be downloaded from this build environment. Put each file in
 * src/art/ using the name in `artwork.file` and it will replace the placeholder automatically.
 */

const CHECKED = '2026-11-14';
const L = (id: string, slug: string) => `https://www.etsy.com/listing/${id}/${slug}`;

const BUNDLES = {
  cardio: { name: 'Cardiology bundle', url: L('1415576970', 'cardiology-medical-bundle-prints-digital') },
  endocrine: { name: 'Endocrine bundle', url: L('1417973174', 'endocrine-medical-bundle-prints-digital') },
  gi: { name: 'Gastrointestinal bundle', url: L('1417992074', 'gastrointestinal-medical-bundle-prints') },
  neuro: { name: 'Neurology bundle', url: L('1433510681', 'neurology-medical-bundle-prints-digital') },
  renal: { name: 'Renal bundle', url: L('1419322710', 'renal-medical-bundle-prints-digital') },
  resp: { name: 'Respiratory bundle', url: L('1419387090', 'respiratory-medical-bundle-prints') },
  all: { name: 'All-in-One bundle (56 infographics)', url: L('1419499364', 'all-in-one-medical-bundle-prints-digital') },
};

function etsy(p: Omit<EtsyProduct, 'checkedOn'>): EtsyProduct {
  return { ...p, checkedOn: CHECKED };
}

const base = {
  status: 'draft' as const,
  access: 'free' as const,
  references: [] as string[],
  reviewedOn: null,
  source: 'etsy' as const,
  format: 'Infographic' as const,
};

export const ETSY_RESOURCES: Resource[] = [
  {
    ...base,
    slug: 'how-blood-flows-through-the-heart',
    title: 'How Blood Flows Through the Heart',
    topic: 'cardiovascular', secondaryTopics: ['anatomy-physiology'], subcategories: [],
    tags: ['Heart', 'Circulation', 'Blood Flow', 'Cardiac Anatomy', 'Heart Valves'],
    specialty: 'Cardiac / Fundamentals', audience: ['Student', 'Practicing RN'], difficulty: 'Foundational', accent: 'coral',
    summary: 'Follow one loop: body → right heart → lungs → left heart → body, through four chambers and four valves.',
    keyPoints: [
      'Deoxygenated blood returns through the superior and inferior vena cava into the right atrium.',
      'Right atrium → tricuspid valve → right ventricle → pulmonic valve → pulmonary arteries → lungs.',
      'Oxygenated blood returns through the pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta.',
      'Pulmonary arteries carry deoxygenated blood and pulmonary veins carry oxygenated blood, the exception to the usual rule.',
    ],
    considerations: [
      'Right-sided failure backs up into the body (JVD, edema); left-sided failure backs up into the lungs (crackles, dyspnea).',
      'Valve problems disrupt one-way flow and are often heard as murmurs.',
    ],
    pearl: 'Valves in order of flow: “Try Pulling My Aorta”: tricuspid, pulmonic, mitral, aortic.',
    thumb: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
    artwork: { file: 'how-blood-flows-through-the-heart.webp', alt: 'CleveRNurses infographic showing blood flow through the heart chambers and valves', ratio: 11 / 8.5 },
    etsy: etsy({
      artworkTitle: 'How Blood Flows Through the Heart',
      listingSummary: 'A poster that uses arrows to show how blood moves through the heart’s chambers, valves and vessels.',
      digital: { url: L('887053738', 'how-blood-flows-through-the-heart-print'), price: '$4.99' },
      print: { url: L('808684778', 'how-blood-flows-through-the-heart-print'), price: 'from $49.99' },
      collection: BUNDLES.cardio,
    }),
  },
  {
    ...base,
    slug: 'stages-of-high-blood-pressure',
    title: 'Stages of High Blood Pressure',
    topic: 'cardiovascular', secondaryTopics: ['fundamentals'], subcategories: ['hypertension', 'vital-signs'],
    tags: ['Hypertension', 'Blood Pressure', 'Vital Signs', 'Patient Education'],
    specialty: 'Cardiac / Primary Care', audience: ['Student', 'Practicing RN'], difficulty: 'Foundational', accent: 'coral',
    summary: 'Blood pressure categories at a glance, and why accurate measurement matters as much as the number.',
    keyPoints: [
      'ACC/AHA categories: normal below 120/80; elevated 120–129 systolic with diastolic below 80.',
      'Stage 1: 130–139 systolic or 80–89 diastolic. Stage 2: 140 or higher systolic, or 90 or higher diastolic.',
      'When systolic and diastolic fall in different categories, classify by the higher one.',
    ],
    considerations: [
      'Readings above 180 systolic and/or 120 diastolic need prompt evaluation for symptoms and target-organ damage.',
      'Technique changes the number: correct cuff size, back and arm supported, feet flat, rest before measuring, and average repeated readings.',
    ],
    pearl: 'One high reading is a data point, not a diagnosis. Recheck with good technique.',
    thumb: ['Normal', 'Elevated', 'Stage 1', 'Stage 2'],
    artwork: { file: 'stages-of-high-blood-pressure.webp', alt: 'CleveRNurses Stages of High Blood Pressure infographic' },
    etsy: etsy({
      artworkTitle: 'Stages of High Blood Pressure',
      digital: { url: L('887061806', 'stages-of-high-blood-pressure-print'), price: '$4.99' },
      print: { url: L('808684776', 'stages-of-high-blood-pressure-print'), price: 'from $49.99' },
      collection: BUNDLES.cardio,
    }),
  },
  {
    ...base,
    slug: 'locations-of-chest-pain',
    title: 'Locations of Chest Pain',
    topic: 'cardiovascular', secondaryTopics: ['emergency', 'critical-care'], subcategories: ['acs'],
    tags: ['Myocardial Infarction', 'Chest Pain', 'ACS', 'Referred Pain', 'Atypical Presentation'],
    specialty: 'Cardiac / Emergency', audience: ['Student', 'Practicing RN'], difficulty: 'Intermediate', accent: 'coral',
    summary: 'Where heart attack pain can show up: substernal pressure, and pain referred to the arm, jaw, back or upper abdomen.',
    keyPoints: [
      'Classic MI pain is substernal pressure or tightness that may radiate to the left arm, jaw, neck or back.',
      'Some people feel it mainly in the epigastrium and mistake it for indigestion.',
      'Women, older adults and people with diabetes more often have atypical symptoms such as fatigue, nausea or shortness of breath.',
    ],
    considerations: [
      'Suspected ACS: obtain a 12-lead ECG quickly per protocol and notify the provider.',
      'Assess onset, quality, radiation, severity and associated symptoms.',
    ],
    pearl: 'No chest pain doesn’t mean no MI.',
    thumb: ['Substernal', 'Left arm', 'Jaw & neck', 'Epigastric'],
    artwork: { file: 'locations-of-chest-pain.webp', alt: 'CleveRNurses infographic of chest pain locations during a myocardial infarction' },
    etsy: etsy({
      artworkTitle: '8 Locations of Pain During a Myocardial Infarction',
      digital: { url: L('900974033', 'locations-of-chest-pain-print-digital'), price: '$4.99' },
      print: { url: L('824888329', 'locations-of-chest-pain-print'), price: 'from $49.99' },
      collection: BUNDLES.cardio,
    }),
  },
  {
    ...base,
    slug: '12-cranial-nerves',
    title: '12 Cranial Nerves',
    topic: 'neurological', secondaryTopics: ['anatomy-physiology', 'fundamentals'], subcategories: ['neuroanatomy', 'neuro-assessment', 'health-assessment'],
    tags: ['Cranial Nerves', 'Neuro Assessment', 'Neuroanatomy', 'Swallow Screen'],
    specialty: 'Neuro / Health Assessment', audience: ['Student', 'Practicing RN', 'Advanced Practice'], difficulty: 'Intermediate', accent: 'sky',
    summary: 'Twelve nerves, what each one does, and how they show up in a bedside neuro exam.',
    keyPoints: [
      'I Olfactory (smell) and II Optic (vision). III Oculomotor, IV Trochlear and VI Abducens move the eyes.',
      'V Trigeminal: facial sensation and chewing. VII Facial: facial expression and taste (front of tongue).',
      'VIII Vestibulocochlear: hearing and balance. IX Glossopharyngeal and X Vagus: swallow, gag and voice.',
      'XI Accessory: shoulder shrug and head turn. XII Hypoglossal: tongue movement.',
    ],
    considerations: [
      'Check gag and swallow (IX, X) before oral intake after a stroke.',
      'A new fixed, dilated pupil can signal CN III compression from rising intracranial pressure. Escalate immediately.',
    ],
    pearl: 'Sensory, motor or both: “Some Say Marry Money, But My Brother Says Big Brains Matter More.”',
    thumb: ['I–II', 'III–VI', 'VII–X', 'XI–XII'],
    artwork: { file: '12-cranial-nerves.webp', alt: 'CleveRNurses 12 Cranial Nerves infographic' },
    etsy: etsy({
      artworkTitle: '12 Cranial Nerves',
      digital: { url: L('887502138', '12-cranial-nerves-print-digital-download'), price: '$4.99' },
      print: { url: L('857633432', '12-cranial-nerves-print-neurology-gift'), price: 'from $49.99' },
      collection: BUNDLES.neuro,
    }),
  },
  {
    ...base,
    slug: 'signs-of-parkinsons-disease',
    title: 'Signs of Parkinson’s Disease',
    topic: 'neurological', secondaryTopics: ['pathophysiology'], subcategories: ['neurodegenerative'],
    tags: ['Parkinson’s Disease', 'TRAP', 'Movement Disorders', 'Fall Risk', 'Geriatrics'],
    specialty: 'Neuro / Geriatrics', audience: ['Student', 'Practicing RN'], difficulty: 'Foundational', accent: 'sky',
    summary: 'Motor and non-motor signs of Parkinson’s disease, and the nursing priorities that follow from them.',
    keyPoints: [
      'Classic motor signs: resting tremor, rigidity, akinesia/bradykinesia, postural instability (TRAP).',
      'Other common signs: shuffling gait, masked face, small handwriting and a soft voice.',
      'Non-motor symptoms such as constipation, sleep problems, depression and loss of smell can appear early.',
    ],
    considerations: [
      'Fall prevention is a core nursing priority.',
      'Give carbidopa-levodopa on schedule; late doses can worsen symptoms.',
      'Screen swallowing to reduce aspiration risk.',
    ],
    pearl: 'The tremor is worse at rest and often eases with purposeful movement.',
    thumb: ['Tremor', 'Rigidity', 'Akinesia', 'Posture'],
    artwork: { file: 'signs-of-parkinsons-disease.webp', alt: 'CleveRNurses infographic of 10 signs and symptoms of Parkinson’s disease' },
    etsy: etsy({
      artworkTitle: '10 Signs and Symptoms of Parkinson’s Disease',
      digital: { url: L('887488566', 'signs-of-parkinsons-disease-print-o'), price: '$4.99' },
      print: { url: L('824806269', 'signs-of-parkinsons-disease-print-o'), price: 'from $49.99' },
      collection: BUNDLES.neuro,
    }),
  },
  {
    ...base,
    slug: 'seizure-classification',
    title: 'Seizure Classification',
    topic: 'neurological', secondaryTopics: ['emergency'], subcategories: ['seizures'],
    tags: ['Seizures', 'Epilepsy', 'Focal Seizure', 'Generalized Seizure', 'Status Epilepticus'],
    specialty: 'Neuro / Emergency', audience: ['Student', 'Practicing RN'], difficulty: 'Intermediate', accent: 'sky',
    summary: 'Seizures are sorted by where they start: focal, generalized, unknown onset, or unclassified.',
    keyPoints: [
      'Focal onset seizures start in one hemisphere. Awareness may be kept or impaired.',
      'Generalized onset seizures involve both hemispheres from the start, for example tonic-clonic or absence seizures.',
      'Unknown onset is used when the start wasn’t observed; unclassified when there isn’t enough information.',
    ],
    considerations: [
      'During a seizure: protect from injury, turn to the side, don’t put anything in the mouth, and time it.',
      'A seizure lasting 5 minutes or more, or repeated seizures without recovery in between, is an emergency (status epilepticus).',
    ],
    pearl: 'Describe what you saw, not just a label: how it started, the movements, how long it lasted and the post-ictal state.',
    thumb: ['Focal', 'Generalized', 'Unknown', 'Unclassified'],
    artwork: { file: 'seizure-classification.webp', alt: 'CleveRNurses Seizure Classification infographic' },
    etsy: etsy({
      artworkTitle: 'Seizure Classification',
      listingSummary: 'Describes a seizure as an uncontrolled electrical discharge of brain neurons and lists four types: focal onset, generalized onset, unknown onset and unclassified.',
      digital: { url: L('887505702', 'seizure-classification-print-digital'), price: '$4.99' },
      collection: BUNDLES.neuro,
    }),
  },
  {
    ...base,
    slug: 'nervous-system',
    title: 'The Nervous System',
    topic: 'neurological', secondaryTopics: ['anatomy-physiology'], subcategories: ['neuroanatomy'],
    tags: ['CNS', 'PNS', 'Autonomic Nervous System', 'Sympathetic', 'Parasympathetic'],
    specialty: 'Neuro / Fundamentals', audience: ['Student'], difficulty: 'Foundational', accent: 'sky',
    summary: 'The big map: central vs. peripheral, and the autonomic split that explains so many medication effects.',
    keyPoints: [
      'Central nervous system: the brain and spinal cord.',
      'Peripheral nervous system: cranial and spinal nerves linking the CNS to the rest of the body.',
      'The autonomic system has two branches: sympathetic (“fight or flight”) and parasympathetic (“rest and digest”).',
    ],
    considerations: [
      'Sympathetic and parasympathetic effects explain many medication side effects, such as anticholinergic dry mouth, urinary retention and constipation.',
    ],
    pearl: 'Sympathetic = stress mode: pupils dilate, heart rate rises, digestion slows.',
    thumb: ['Brain', 'Spinal cord', 'Peripheral', 'Autonomic'],
    artwork: { file: 'nervous-system.webp', alt: 'CleveRNurses The Nervous System infographic' },
    etsy: etsy({
      artworkTitle: 'The Nervous System',
      digital: { url: L('901436443', 'nervous-system-print-digital-download'), price: '$4.99' },
      print: { url: L('857633986', 'nervous-system-print-neurology-gift'), price: 'from $49.99' },
      collection: BUNDLES.neuro,
    }),
  },
  {
    ...base,
    slug: 'anatomy-of-the-nephron',
    title: 'Anatomy of the Nephron',
    topic: 'renal', secondaryTopics: ['anatomy-physiology', 'pharmacology'], subcategories: ['renal-anatomy'],
    tags: ['Nephron', 'Kidney', 'Diuretics', 'Urine Formation'],
    specialty: 'Renal / Fundamentals', audience: ['Student', 'Practicing RN'], difficulty: 'Intermediate', accent: 'teal',
    summary: 'Filter, reabsorb, secrete, concentrate: the kidney’s working unit, step by step.',
    keyPoints: [
      'The glomerulus filters blood into Bowman’s capsule.',
      'The proximal convoluted tubule reabsorbs most of the filtered water, sodium and glucose.',
      'The loop of Henle concentrates urine. The distal tubule and collecting duct fine-tune it under aldosterone and ADH.',
    ],
    considerations: [
      'Loop diuretics such as furosemide act on the loop of Henle; thiazides act on the distal tubule.',
      'Falling urine output can be an early sign of kidney injury.',
    ],
    pearl: 'Know where a diuretic works and you can predict its effect on potassium.',
    thumb: ['Glomerulus', 'PCT', 'Loop of Henle', 'Collecting duct'],
    artwork: { file: 'anatomy-of-the-nephron.webp', alt: 'CleveRNurses Anatomy of the Nephron infographic' },
    etsy: etsy({
      artworkTitle: 'Anatomy of the Nephron',
      digital: { url: L('887535156', 'anatomy-of-nephron-print-digital'), price: '$4.99' },
      print: { url: L('857634608', 'anatomy-of-nephron-print-nephrologist'), price: 'from $49.99' },
      collection: BUNDLES.renal,
    }),
  },
  {
    ...base,
    slug: 'signs-of-kidney-stones',
    title: 'Signs of Kidney Stones',
    topic: 'renal', secondaryTopics: ['pathophysiology', 'emergency'], subcategories: ['urinary'],
    tags: ['Kidney Stones', 'Renal Colic', 'Hematuria', 'Flank Pain'],
    specialty: 'Renal / Med-Surg', audience: ['Student', 'Practicing RN'], difficulty: 'Foundational', accent: 'teal',
    summary: 'The classic picture of renal colic, and the one finding that turns a painful stone into an urgent one.',
    keyPoints: [
      'Severe flank pain that may radiate to the lower abdomen or groin, often in waves.',
      'Hematuria, nausea and vomiting are common.',
      'Fever with a stone suggests infection behind an obstruction, which is an urgent finding.',
    ],
    considerations: [
      'Pain control is a priority.',
      'Encourage fluids unless contraindicated, and strain urine to catch the stone for analysis.',
    ],
    pearl: 'Stone plus fever: escalate. It’s no longer just a pain problem.',
    thumb: ['Flank pain', 'Hematuria', 'Nausea', 'Strain urine'],
    artwork: { file: 'signs-of-kidney-stones.webp', alt: 'CleveRNurses infographic of 8 signs and symptoms of kidney stones' },
    etsy: etsy({
      artworkTitle: '8 Signs and Symptoms of Kidney Stones',
      digital: { url: L('901456687', 'signs-of-kidney-stones-print-digital'), price: '$4.99' },
      print: { url: L('857634246', 'signs-of-kidney-stones-print'), price: 'from $49.99' },
      collection: BUNDLES.renal,
    }),
  },
  {
    ...base,
    slug: 'respiratory-system-anatomy',
    title: 'Respiratory System Anatomy',
    topic: 'respiratory', secondaryTopics: ['anatomy-physiology'], subcategories: ['respiratory-anatomy'],
    tags: ['Airway', 'Lungs', 'Alveoli', 'Bronchi', 'Aspiration'],
    specialty: 'Respiratory / Fundamentals', audience: ['Student'], difficulty: 'Foundational', accent: 'sky',
    summary: 'From nose to alveoli: the airway map behind oxygenation, aspiration and tube placement.',
    keyPoints: [
      'Upper airway: nose, pharynx and larynx. Lower airway: trachea, bronchi, bronchioles and alveoli.',
      'Gas exchange happens in the alveoli, across the alveolar-capillary membrane.',
      'The right mainstem bronchus is wider, shorter and more vertical than the left.',
    ],
    considerations: [
      'Aspirated material, and an endotracheal tube placed too deep, more often enter the right mainstem bronchus.',
      'After intubation, diminished breath sounds on one side need to be reported right away.',
    ],
    pearl: 'Aspiration favors the right lung.',
    thumb: ['Upper airway', 'Trachea', 'Bronchi', 'Alveoli'],
    artwork: { file: 'respiratory-system-anatomy-a.webp', alt: 'CleveRNurses Anatomy of the Respiratory System infographic (Print A)' },
    etsy: etsy({
      artworkTitle: 'Anatomy of the Respiratory System Print A (Print B also available)',
      digital: { url: L('901472263', 'respiratory-system-anatomy-print-a'), price: '$4.99' },
      print: { url: L('857634344', 'respiratory-system-anatomy-print-a'), price: 'from $49.99' },
      collection: BUNDLES.resp,
    }),
  },
  {
    ...base,
    slug: 'adrenal-glands',
    title: 'Understanding the Adrenal Glands',
    topic: 'endocrine', secondaryTopics: ['anatomy-physiology'], subcategories: ['adrenal-pituitary'],
    tags: ['Adrenal Glands', 'Cortisol', 'Aldosterone', 'Addison’s Disease', 'Cushing’s Syndrome'],
    specialty: 'Endocrine', audience: ['Student', 'Practicing RN'], difficulty: 'Intermediate', accent: 'sun',
    summary: 'Two glands, two layers, many hormones, and what happens when there’s too much or too little.',
    keyPoints: [
      'The adrenal cortex makes aldosterone (mineralocorticoid), cortisol (glucocorticoid) and androgens.',
      'The adrenal medulla makes epinephrine and norepinephrine.',
      'Aldosterone holds on to sodium and water and gets rid of potassium.',
    ],
    considerations: [
      'Addison’s disease (too little cortisol and aldosterone) can cause hypotension, low sodium and high potassium. Adrenal crisis is an emergency.',
      'Cushing’s syndrome (too much cortisol) can cause high glucose, infection risk and fluid retention.',
    ],
    pearl: 'Cortex layers, outside in: “salt, sugar, sex” (mineralocorticoids, glucocorticoids, androgens).',
    thumb: ['Cortex', 'Medulla', 'Cortisol', 'Aldosterone'],
    artwork: { file: 'adrenal-glands.webp', alt: 'CleveRNurses Understanding the Adrenal Glands infographic' },
    etsy: etsy({
      artworkTitle: 'Understanding the Adrenal Glands',
      digital: { url: L('881436288', 'adrenal-glands-print-digital-download'), price: '$4.99' },
      print: { url: L('893524269', 'adrenal-glands-print-endocrinologist'), price: 'from $49.99' },
      collection: BUNDLES.endocrine,
    }),
  },
  {
    ...base,
    slug: 'signs-of-diverticulitis',
    title: 'Signs of Diverticulitis',
    topic: 'gastrointestinal', secondaryTopics: ['pathophysiology'], subcategories: ['lower-gi'],
    tags: ['Diverticulitis', 'Diverticulosis', 'LLQ Pain', 'Perforation'],
    specialty: 'GI / Med-Surg', audience: ['Student', 'Practicing RN'], difficulty: 'Foundational', accent: 'sun',
    summary: 'Pouches in the colon wall are diverticulosis; inflamed or infected pouches are diverticulitis.',
    keyPoints: [
      'Diverticulosis means pouches are present. Diverticulitis means they’re inflamed or infected.',
      'Common signs: left lower quadrant pain, fever, nausea and changes in bowel habits.',
      'Complications include abscess, perforation and bleeding.',
    ],
    considerations: [
      'Sudden severe pain, a rigid abdomen or signs of sepsis can mean perforation. Escalate immediately.',
      'During a flare, follow the ordered diet progression.',
    ],
    pearl: 'Older adult with left lower quadrant pain and fever: think diverticulitis.',
    thumb: ['LLQ pain', 'Fever', 'Bowel changes', 'Nausea'],
    artwork: { file: 'signs-of-diverticulitis.webp', alt: 'CleveRNurses infographic of the top 4 signs and symptoms of diverticulitis' },
    etsy: etsy({
      artworkTitle: 'Top 4 Signs and Symptoms of Diverticulitis',
      digital: { url: L('887470424', 'signs-of-diverticulitis-print-digital'), price: '$4.99' },
      print: { url: L('857633086', 'signs-of-diverticulitis-print'), price: 'from $49.99' },
      collection: BUNDLES.gi,
    }),
  },
  {
    ...base,
    slug: 'burn-classifications',
    title: 'Burn Classifications',
    topic: 'integumentary', secondaryTopics: ['emergency', 'critical-care'], subcategories: ['burns', 'wound-care', 'trauma'],
    tags: ['Burns', 'Burn Depth', 'Partial Thickness', 'Full Thickness', 'Wound Care'],
    specialty: 'Burn / Emergency', audience: ['Student', 'Practicing RN'], difficulty: 'Intermediate', accent: 'sun',
    summary: 'Burn depth determines pain, healing and grafting, and the deepest burns can hurt the least.',
    keyPoints: [
      'Superficial: epidermis only. Red and painful, no blisters.',
      'Partial thickness: into the dermis. Blisters, and very painful.',
      'Full thickness: through the dermis. May look white, brown or leathery, and may be painless because nerves are damaged.',
    ],
    considerations: [
      'With face or neck burns or an inhalation injury, the airway is the first priority.',
      'Fluid resuscitation is guided by burn size (percent of total body surface area) and urine output.',
    ],
    pearl: 'A painless burn can be the deepest one.',
    thumb: ['Superficial', 'Partial', 'Full', 'Deep'],
    artwork: { file: 'burn-classifications.webp', alt: 'CleveRNurses Burn Classifications infographic' },
    etsy: etsy({
      artworkTitle: 'Burn Classifications',
      digital: { url: L('887035090', 'burn-classifications-print-digital'), price: '$4.99' },
      print: { url: L('824477433', 'burn-classifications-print-dermatologist'), price: 'from $49.99' },
      collection: BUNDLES.all,
    }),
  },
];
