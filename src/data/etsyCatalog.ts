import type { Accent, Audience, Difficulty, Format, Resource, TopicId } from './types';

/**
 * Remaining original CleveRNurses infographics (added 2026-11-15).
 * Titles come from the All-in-One bundle contents on Etsy. Digital and print listing URLs were verified
 * against all four shop pages. Items not in LISTINGS link to their bundle only.
 * Educational text is CleveRNurses web content, pending clinical review.
 */

const L = (id: string, slug: string) => `https://www.etsy.com/listing/${id}/${slug}`;
const B = {
  cardio: { name: 'Cardiology bundle', url: L('1415576970', 'cardiology-medical-bundle-prints-digital') },
  endocrine: { name: 'Endocrine bundle', url: L('1417973174', 'endocrine-medical-bundle-prints-digital') },
  gi: { name: 'Gastrointestinal bundle', url: L('1417992074', 'gastrointestinal-medical-bundle-prints') },
  msk: { name: 'Musculoskeletal bundle', url: L('1419179240', 'musculoskeletal-medical-bundle-prints') },
  neuro: { name: 'Neurology bundle', url: L('1433510681', 'neurology-medical-bundle-prints-digital') },
  renal: { name: 'Renal bundle', url: L('1419322710', 'renal-medical-bundle-prints-digital') },
  resp: { name: 'Respiratory bundle', url: L('1419387090', 'respiratory-medical-bundle-prints') },
  all: { name: 'All-in-One bundle (56 infographics)', url: L('1419499364', 'all-in-one-medical-bundle-prints-digital') },
};
type BundleKey = keyof typeof B;

/** Individual listings verified on the live shop (all 4 pages) on 2026-11-15: [digital, print]. */
const LISTINGS: Record<string, [string, string]> = {
  'angina-men-vs-women': ['887055628/signs-of-chest-pain-print-digital', '810580472/signs-of-chest-pain-print-cardiologist'],
  'arteries-vs-veins': ['900978789/arteries-and-veins-print-digital', '808684782/arteries-and-veins-print-cardiologist'],
  'rule-of-nines': ['887039256/rule-of-nines-print-digital-download', '810542952/rule-of-nines-print-dermatologist-gift'],
  'cardiac-tamponade-becks-triad': ['900972705/signs-of-cardiac-tamponade-print-o', '810573236/signs-of-cardiac-tamponade-print-o-becks'],
  'signs-of-a-heart-attack': ['887048940/signs-of-a-heart-attack-print-digital', '810974926/signs-of-a-heart-attack-print'],
  'nclex-study-plan': ['900969747/nclex-study-guide-plan-print-digital', '824944539/nclex-study-guide-plan-print-nurse'],
  'signs-of-pneumonia': ['887540644/signs-of-pneumonia-print-pulmonologist', '857634436/signs-of-pneumonia-print-pulmonologist'],
  'signs-of-asthma': ['901470007/signs-of-asthma-print-digital-download', '808684784/signs-of-asthma-print-pulmonologist-gift'],
  'signs-of-pulmonary-embolism': ['887547398/signs-of-pulmonary-embolism-print', '857634770/signs-of-pulmonary-embolism-print'],
  'left-sided-heart-failure': ['887057864/signs-of-left-sided-heart-failure-print', '810551372/signs-of-left-sided-heart-failure-print'],
  'right-sided-heart-failure': ['900988591/signs-of-right-sided-heart-failure-print', '810564212/signs-of-right-sided-heart-failure-print'],
  'signs-of-meningitis': ['901412769/signs-of-meningitis-print-digital', '824820223/signs-of-meningitis-print-neurology-gift'],
  'signs-of-pulmonary-edema': ['900987455/signs-of-pulmonary-edema-print-digital', '811047842/signs-of-pulmonary-edema-print'],
  'types-of-cardiomyopathy': ['882453860/types-of-cardiomyopathy-print-digital', '824342057/types-of-cardiomyopathy-print'],
  'signs-of-lupus': ['887027710/signs-of-lupus-digital-download', '810947970/signs-of-lupus-immunologist-gift-doctor'],
  'signs-of-copd': ['901478257/signs-of-copd-print-digital-download', '857634828/signs-of-copd-print-pulmonologist-gift'],
  'nclex-morning-routine': ['900959183/morning-routine-for-student-nurses-print', '824798441/morning-routine-for-student-nurses-print'],
  'signs-of-cataracts': ['893688569/signs-of-cataracts-print-digital', '810494178/signs-of-cataracts-print-optometrist'],
  'trigeminal-neuralgia': ['901437993/trigeminal-neuralgia-print-digital', '871549773/trigeminal-neuralgia-print-neurology'],
  'pituitary-oh-a-flat-pig': ['900995967/pituitary-gland-mnemonic-print-digital', '856965294/pituitary-gland-mnemonic-print'],
  'signs-of-multiple-sclerosis': ['887486778/signs-of-multiple-sclerosis-digital', '824812319/signs-of-multiple-sclerosis-neurology'],
  'thyroid-gland-hormones': ['900998263/thyroid-gland-function-print-digital', '871548991/thyroid-gland-function-print'],
  'signs-of-gout': ['887473100/signs-of-gout-print-digital-download', '824360329/signs-of-gout-print-orthopedic-gift'],
  'causes-of-aki': ['901446263/causes-of-acute-kidney-injury-print', '857634144/causes-of-acute-kidney-injury-print'],
  'signs-of-osteoporosis': ['887475108/signs-of-osteoporosis-print-digital', '859860896/signs-of-osteoporosis-print-orthopedic'],
  'osteoporosis-risk-factors': ['887476768/risk-factors-of-osteoporosis-print', '859860928/risk-factors-of-osteoporosis-print'],
  'three-ps-of-diabetes': ['887070502/signs-of-diabetes-print-digital-download', '824929843/signs-of-diabetes-print-endocrinologist'],
  'signs-of-glomerulonephritis': ['887532082/signs-of-glomerulonephritis-print', '822581335/signs-of-glomerulonephritis-print'],
  'signs-of-celiac-disease': ['887071432/signs-of-celiac-disease-print-digital', '824924235/signs-of-celiac-disease-print'],
  'stairs-with-an-injured-leg': ['887478352/up-and-down-steps-print-digital-download', '810520492/up-and-down-steps-print-orthopedic-gift'],
  'signs-of-appendicitis': ['887465050/signs-of-appendicitis-print-digital', '857633172/signs-of-appendicitis-print'],
  'hemodialysis-vs-peritoneal-dialysis': ['887536862/hemodialysis-dialysis-vs-peritoneal', '857634522/hemodialysis-dialysis-vs-peritoneal'],
  'signs-of-fractures': ['887479764/signs-of-fractures-print-digital', '861260896/signs-of-fractures-print-orthopedic-gift'],
  'signs-of-esophageal-varices': ['887466508/signs-of-varices-print-digital-download', '811008824/signs-of-varices-print'],
  'inspiration-vs-expiration': ['887551658/inhale-and-exhale-print-digital-download', '871550665/inspiration-vs-expiration-print'],
  'signs-of-gerd': ['887468950/signs-of-gerd-print-digital-download', '824902021/signs-of-gerd-print-gastroenterologist'],
  'early-signs-of-alzheimers': ['887482066/signs-of-alzheimers-disease-print-o', '824871149/signs-of-alzheimers-disease-print-o'],
  'signs-of-tuberculosis': ['901466785/signs-of-tuberculosis-digital-download', '822581333/signs-of-tuberculosis-print'],
  'open-vs-closed-angle-glaucoma': ['887037928/signs-of-glaucoma-print-digital-download', '824433067/signs-of-glaucoma-print-optometrist-gift'],
  'types-of-diabetic-neuropathy': ['887065828/types-of-diabetic-neuropathy-digital', '856768978/types-of-diabetic-neuropathy'],
  'respiratory-system-anatomy-b': ['901473741/respiratory-system-anatomy-print-b', '871550451/respiratory-system-anatomy-print-b'],
};
const url = (idSlug: string) => `https://www.etsy.com/listing/${idSlug}`;


interface Entry {
  slug: string;
  title: string;
  artworkTitle: string;
  bundle: BundleKey;
  topic: TopicId;
  secondary?: TopicId[];
  subs?: string[];
  tags: string[];
  specialty: string;
  audience?: Audience[];
  difficulty?: Difficulty;
  format?: Format;
  accent: Accent;
  summary: string;
  keyPoints: string[];
  considerations?: string[];
  pearl?: string;
}

const S: Audience[] = ['Student'];
const SR: Audience[] = ['Student', 'Practicing RN'];

const ENTRIES: Entry[] = [
  // ---------------- Cardiology ----------------
  {
    slug: 'signs-of-pulmonary-edema', title: 'Signs of Pulmonary Edema', artworkTitle: 'Signs and Symptoms of Pulmonary Edema', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['respiratory', 'critical-care', 'emergency'], subs: ['heart-failure', 'oxygenation'],
    tags: ['Pulmonary Edema', 'Heart Failure', 'Crackles', 'Pink Frothy Sputum', 'Orthopnea'],
    specialty: 'Cardiac / Critical Care', difficulty: 'Intermediate', accent: 'sky',
    summary: 'Fluid floods the alveoli and gas exchange fails. Most often it’s left-sided heart failure backing up into the lungs.',
    keyPoints: [
      'Severe dyspnea, orthopnea, tachypnea and a sense of suffocation or drowning.',
      'Crackles on auscultation and a cough that may bring up pink, frothy sputum.',
      'Anxiety, restlessness, tachycardia and cool, clammy or cyanotic skin.',
    ],
    considerations: [
      'Acute pulmonary edema is an emergency: sit the client upright, give oxygen as ordered and escalate immediately.',
      'Expect orders such as IV diuretics. Monitor urine output, potassium and breath sounds closely.',
    ],
    pearl: 'Pink, frothy sputum plus crackles in a breathless client: think pulmonary edema and act now.',
  },
  {
    slug: 'arteries-vs-veins', title: 'Arteries vs. Veins', artworkTitle: 'Arteries vs. Veins', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['anatomy-physiology'], subs: ['vascular'],
    tags: ['Arteries', 'Veins', 'Circulation', 'Vascular Anatomy', 'Pulmonary Artery'],
    specialty: 'Cardiac / Fundamentals', audience: S, difficulty: 'Foundational', format: 'Differentiation Map', accent: 'coral',
    summary: 'Arteries carry blood away from the heart under high pressure; veins return it at low pressure, helped by valves.',
    keyPoints: [
      'Arteries carry blood away from the heart; veins carry it back.',
      'Most arteries carry oxygenated blood. The pulmonary arteries are the exception, and the pulmonary veins carry oxygenated blood.',
      'Arteries have thick, muscular, elastic walls and a pulse. Veins have thinner walls and valves that prevent backflow.',
    ],
    considerations: [
      'Arterial insufficiency tends to cause pale, cool, painful extremities; venous insufficiency tends to cause edema and brownish skin changes.',
    ],
    pearl: 'Arteries = Away. Veins = drain back IN.',
  },
  {
    slug: 'angina-men-vs-women', title: 'Angina: Men vs. Women', artworkTitle: 'Signs and Symptoms of Angina Men vs. Women', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['emergency'], subs: ['acs'],
    tags: ['Angina', 'Chest Pain', 'Atypical Presentation', 'Women’s Health', 'ACS'],
    specialty: 'Cardiac / Emergency', difficulty: 'Intermediate', format: 'Differentiation Map', accent: 'coral',
    summary: 'Classic crushing chest pressure is more typical in men. Women more often report jaw, back or stomach pain, nausea and breathlessness.',
    keyPoints: [
      'Angina is chest pain or discomfort from reduced blood flow through the coronary arteries.',
      'Women more often have symptoms other than chest pressure: neck, jaw, arm, back or abdominal pain, nausea and shortness of breath.',
      'Sweating, dizziness and fatigue occur in both.',
    ],
    considerations: [
      'Don’t rule out a cardiac cause because chest pain is absent or vague.',
      'New, worsening or rest angina can be acute coronary syndrome. Escalate per protocol.',
    ],
    pearl: 'Women can have a heart attack without chest pressure.',
  },
  {
    slug: 'left-sided-heart-failure', title: 'Left-Sided Heart Failure', artworkTitle: 'The Signs and Symptoms of Left-Sided Heart Failure', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['pathophysiology'], subs: ['heart-failure'],
    tags: ['Heart Failure', 'Left-Sided', 'Pulmonary Congestion', 'Crackles', 'Orthopnea', 'PND'],
    specialty: 'Cardiac / Med-Surg', difficulty: 'Intermediate', accent: 'coral',
    summary: 'When the left ventricle can’t pump forward, blood backs up into the lungs. Left = Lungs.',
    keyPoints: [
      'Pulmonary congestion: crackles, dyspnea, orthopnea and paroxysmal nocturnal dyspnea.',
      'Cough, which may become pink and frothy as pulmonary edema advances.',
      'Low cardiac output causes tachycardia, fatigue, weakness, restlessness and confusion.',
    ],
    considerations: [
      'Position upright, monitor oxygen saturation and lung sounds, and trend daily weights.',
      'Report worsening breathlessness or rapid weight gain per the care plan.',
    ],
    pearl: 'Left = Lungs.',
  },
  {
    slug: 'right-sided-heart-failure', title: 'Right-Sided Heart Failure', artworkTitle: 'The Signs and Symptoms of Right-Sided Heart Failure', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['pathophysiology'], subs: ['heart-failure'],
    tags: ['Heart Failure', 'Right-Sided', 'JVD', 'Edema', 'Ascites', 'Hepatomegaly'],
    specialty: 'Cardiac / Med-Surg', difficulty: 'Intermediate', accent: 'coral',
    summary: 'When the right ventricle fails, blood backs up into the systemic veins and fluid collects in the body.',
    keyPoints: [
      'Most often caused by left-sided failure.',
      'Systemic venous congestion causes jugular venous distension, dependent edema in the legs and ankles, and ascites.',
      'Liver and spleen enlargement can cause anorexia, nausea and abdominal fullness.',
    ],
    considerations: [
      'Trend daily weights, check edema and measure abdominal girth when ascites is present.',
      'Elevate swollen legs and protect fragile, edematous skin.',
    ],
    pearl: 'Right = Rest of the body.',
  },
  {
    slug: 'cardiac-tamponade-becks-triad', title: 'Cardiac Tamponade: Beck’s Triad', artworkTitle: '3 Signs and Symptoms of Cardiac Tamponade Becks Triad', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['critical-care', 'emergency'], subs: ['hemodynamics', 'trauma'],
    tags: ['Cardiac Tamponade', 'Beck’s Triad', 'Muffled Heart Sounds', 'JVD', 'Hypotension', 'Obstructive Shock'],
    specialty: 'Critical Care / Emergency', difficulty: 'Advanced', accent: 'teal',
    summary: 'Fluid in the pericardial sac squeezes the heart so it can’t fill. Beck’s triad is the classic sign.',
    keyPoints: [
      'Beck’s triad: muffled heart sounds, jugular venous distension and hypotension.',
      'Fluid in the pericardium stops the ventricles from filling, so cardiac output drops.',
      'Pulsus paradoxus (an exaggerated drop in systolic pressure on inspiration) is another classic finding.',
    ],
    considerations: [
      'Tamponade is a life-threatening emergency. Escalate immediately and prepare for pericardiocentesis per protocol.',
      'Watch for it after cardiac surgery, chest trauma and some procedures.',
    ],
    pearl: 'Muffled, distended, dropping: heart sounds, neck veins, blood pressure.',
  },
  {
    slug: 'types-of-cardiomyopathy', title: 'Three Major Types of Cardiomyopathy', artworkTitle: '3 Major Types of Cardiomyopathy', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['pathophysiology'], subs: ['heart-failure'],
    tags: ['Cardiomyopathy', 'Dilated', 'Hypertrophic', 'Restrictive', 'Heart Failure'],
    specialty: 'Cardiac', difficulty: 'Intermediate', format: 'Differentiation Map', accent: 'coral',
    summary: 'Dilated, hypertrophic, restrictive: three ways the heart muscle fails, each with a different problem.',
    keyPoints: [
      'Dilated (most common): enlarged ventricles that contract poorly. A systolic problem.',
      'Hypertrophic: thickened ventricular walls that fill poorly and can obstruct outflow.',
      'Restrictive: stiff ventricles that resist filling, with near-normal squeezing.',
    ],
    considerations: [
      'All three can lead to heart failure and dysrhythmias. Monitor for both.',
      'Hypertrophic cardiomyopathy is a known cause of sudden cardiac death in young athletes.',
    ],
    pearl: 'Dilated can’t squeeze; restrictive can’t fill.',
  },
  {
    slug: 'signs-of-a-heart-attack', title: 'Signs of a Heart Attack', artworkTitle: '9 Signs and Symptoms of a Heart Attack', bundle: 'cardio',
    topic: 'cardiovascular', secondary: ['emergency', 'critical-care'], subs: ['acs'],
    tags: ['Myocardial Infarction', 'Heart Attack', 'ACS', 'Chest Pain', 'Diaphoresis'],
    specialty: 'Cardiac / Emergency', difficulty: 'Foundational', accent: 'coral',
    summary: 'A myocardial infarction is death of heart muscle from prolonged lack of oxygen. Chest pain is common, but not always present.',
    keyPoints: [
      'Common signs: chest pain or pressure, diaphoresis, dyspnea, nausea and vomiting, and anxiety or a sense of doom.',
      'Dysrhythmias, dizziness and fatigue can also occur, and a low-grade fever may follow in the next day or two.',
      'Heart rate and blood pressure can go up or down depending on the size and location of the infarct.',
    ],
    considerations: [
      'Suspected MI: obtain a 12-lead ECG quickly, keep the client at rest and notify per protocol.',
      'Atypical symptoms are more common in women, older adults and people with diabetes.',
    ],
    pearl: 'Time is muscle.',
  },

  // ---------------- Endocrine ----------------
  {
    slug: 'three-ps-of-diabetes', title: 'The 3 P’s of Diabetes', artworkTitle: 'What are the 3 Ps in Diabetes', bundle: 'endocrine',
    topic: 'endocrine', secondary: ['fundamentals'], subs: ['diabetes'],
    tags: ['Diabetes', 'Hyperglycemia', 'Polyuria', 'Polydipsia', 'Polyphagia'],
    specialty: 'Endocrine', audience: S, difficulty: 'Foundational', accent: 'sun',
    summary: 'Polyuria, polydipsia and polyphagia: three classic signs of high blood glucose.',
    keyPoints: [
      'Polyuria: high glucose pulls water into the urine, causing frequent urination.',
      'Polydipsia: the resulting fluid loss drives intense thirst.',
      'Polyphagia: cells can’t use glucose for fuel, so hunger increases.',
    ],
    considerations: [
      'Confirm with a blood glucose check. Symptoms alone don’t diagnose diabetes.',
      'In type 1 diabetes, watch for signs of DKA such as nausea, abdominal pain and rapid, deep breathing.',
    ],
    pearl: 'Pee, drink, eat: the 3 P’s point to hyperglycemia.',
  },
  {
    slug: 'thyroid-gland-hormones', title: 'The Thyroid Gland and Its Hormones', artworkTitle: 'The Thyroid Gland and a Look at the 3 Hormones it Produces', bundle: 'endocrine',
    topic: 'endocrine', secondary: ['anatomy-physiology'], subs: ['thyroid'],
    tags: ['Thyroid', 'T3', 'T4', 'Calcitonin', 'Metabolism'],
    specialty: 'Endocrine', audience: SR, difficulty: 'Foundational', accent: 'sun',
    summary: 'A butterfly-shaped gland that sets the body’s metabolic pace with T3 and T4, and makes calcitonin.',
    keyPoints: [
      'T4 (thyroxine) is the main hormone the gland releases and is converted to T3 in the tissues.',
      'T3 (triiodothyronine) is the more potent, active form.',
      'Calcitonin, from the C-cells, lowers serum calcium.',
    ],
    considerations: [
      'Hyperthyroidism speeds everything up: tachycardia, heat intolerance, weight loss. Hypothyroidism slows it down.',
      'After thyroidectomy, watch for hypocalcemia (tingling, Chvostek’s or Trousseau’s sign) from parathyroid injury.',
    ],
    pearl: 'Calcitonin “tones down” calcium.',
  },
  {
    slug: 'types-of-diabetic-neuropathy', title: 'Four Types of Diabetic Neuropathy', artworkTitle: '4 Types of Diabetic Neuropathy', bundle: 'endocrine',
    topic: 'endocrine', secondary: ['neurological'], subs: ['diabetes'],
    tags: ['Diabetic Neuropathy', 'Peripheral Neuropathy', 'Autonomic Neuropathy', 'Foot Care', 'Hypoglycemia Unawareness'],
    specialty: 'Endocrine / Primary Care', difficulty: 'Intermediate', accent: 'lav',
    summary: 'Long-term high glucose damages nerves. Where the damage lands decides the symptoms.',
    keyPoints: [
      'Peripheral (most common): burning, tingling or numbness, usually starting in the feet and legs.',
      'Autonomic: affects heart rate, blood pressure, digestion, bladder, sexual function and sweating, and can blunt the warning signs of hypoglycemia.',
      'Proximal neuropathy affects the hip, buttock or thigh; focal neuropathy affects a single nerve, for example carpal tunnel syndrome.',
    ],
    considerations: [
      'Teach daily foot inspection and proper footwear. Loss of sensation hides injuries.',
      'Watch for orthostatic hypotension with autonomic neuropathy.',
    ],
    pearl: 'A numb foot can’t warn you. Look at it every day.',
  },
  {
    slug: 'pituitary-oh-a-flat-pig', title: 'Pituitary Hormones: “Oh! A FLAT PiG”', artworkTitle: 'OH A FLAT PIG Mnemonic For the Pituitary Gland', bundle: 'endocrine',
    topic: 'endocrine', secondary: ['anatomy-physiology'], subs: ['adrenal-pituitary'],
    tags: ['Pituitary', 'Mnemonic', 'ADH', 'TSH', 'ACTH', 'FSH', 'LH', 'Prolactin', 'Growth Hormone'],
    specialty: 'Endocrine', audience: S, difficulty: 'Foundational', format: 'Reference Guide', accent: 'sun',
    summary: 'One mnemonic for the pituitary’s major hormones: Oxytocin, ADH, FSH, LH, ACTH, TSH, Prolactin, Growth hormone.',
    keyPoints: [
      'Posterior pituitary releases oxytocin and ADH; the anterior pituitary makes the rest.',
      'ADH makes the kidneys hold on to water. TSH stimulates the thyroid; ACTH stimulates the adrenal cortex.',
      'FSH supports egg follicle development and sperm production; LH triggers ovulation and testosterone production.',
    ],
    considerations: [
      'Too little ADH (diabetes insipidus) causes large volumes of dilute urine; too much (SIADH) causes water retention and low sodium.',
    ],
    pearl: 'Oh! A FLAT PiG: Oxytocin, ADH, FSH, LH, ACTH, TSH, Prolactin, GH.',
  },

  // ---------------- Gastrointestinal ----------------
  {
    slug: 'signs-of-celiac-disease', title: 'Signs of Celiac Disease', artworkTitle: '6 Comprehensive Signs and Symptoms of Celiac Disease', bundle: 'gi',
    topic: 'gastrointestinal', secondary: ['immunology'], subs: ['lower-gi', 'autoimmune'],
    tags: ['Celiac Disease', 'Gluten', 'Malabsorption', 'Dermatitis Herpetiformis', 'Autoimmune'],
    specialty: 'GI', difficulty: 'Intermediate', accent: 'sun',
    summary: 'An immune reaction to gluten damages the small intestine, and malabsorption shows up across the whole body.',
    keyPoints: [
      'GI: diarrhea or constipation, steatorrhea, bloating, abdominal pain and weight loss.',
      'Malabsorption can cause iron-deficiency anemia, bone loss (calcium and vitamin D), bruising (vitamin K) and edema (low protein).',
      'An itchy, blistering rash called dermatitis herpetiformis is a skin sign of celiac disease.',
    ],
    considerations: [
      'Treatment is a strict lifelong gluten-free diet (wheat, barley, rye). Teach label reading and cross-contamination.',
      'Testing works best while the person is still eating gluten.',
    ],
    pearl: 'Think celiac when GI symptoms come with unexplained anemia or bone loss.',
  },
  {
    slug: 'signs-of-gerd', title: 'Signs of GERD', artworkTitle: '7 Signs and Symptoms of Gastroesophageal Reflux Disease GERD', bundle: 'gi',
    topic: 'gastrointestinal', subs: ['upper-gi'],
    tags: ['GERD', 'Acid Reflux', 'Heartburn', 'Dysphagia', 'Dental Erosion'],
    specialty: 'GI / Primary Care', audience: SR, difficulty: 'Foundational', accent: 'teal',
    summary: 'Stomach contents flow back into the esophagus, causing heartburn and effects that reach the throat, teeth and lungs.',
    keyPoints: [
      'Heartburn (burning epigastric or chest pain) and regurgitation are the hallmark symptoms.',
      'Hoarseness, sore throat, a lump-in-the-throat feeling and trouble swallowing can occur.',
      'Reflux can erode tooth enamel and worsen asthma or cause aspiration.',
    ],
    considerations: [
      'Teach: smaller meals, no eating 2–3 hours before lying down, elevate the head of the bed, and limit trigger foods.',
      'Painful or difficult swallowing, weight loss, or vomiting blood needs prompt evaluation.',
    ],
    pearl: 'Chest pain blamed on heartburn still deserves a cardiac rule-out.',
  },
  {
    slug: 'signs-of-appendicitis', title: 'Signs of Appendicitis', artworkTitle: '6 Signs and Symptoms of Appendicitis', bundle: 'gi',
    topic: 'gastrointestinal', secondary: ['emergency'], subs: ['lower-gi'],
    tags: ['Appendicitis', 'RLQ Pain', 'McBurney’s Point', 'Peritonitis', 'Acute Abdomen'],
    specialty: 'GI / Surgical', audience: SR, difficulty: 'Foundational', accent: 'teal',
    summary: 'Inflammation of the appendix: right lower quadrant pain, fever and nausea, with rupture as the main danger.',
    keyPoints: [
      'Pain often starts around the umbilicus and moves to the right lower quadrant (McBurney’s point).',
      'Fever, nausea and vomiting, loss of appetite and bloating are common.',
      'Rupture can cause peritonitis, a surgical emergency.',
    ],
    considerations: [
      'Sudden relief of pain followed by a rigid abdomen and fever can mean rupture. Escalate immediately.',
      'Avoid heat to the abdomen and laxatives or enemas when appendicitis is suspected.',
    ],
    pearl: 'Pain that suddenly stops is not always good news.',
  },
  {
    slug: 'signs-of-esophageal-varices', title: 'Signs of Esophageal Varices', artworkTitle: '6 Signs and Symptoms of Esophageal Varices', bundle: 'gi',
    topic: 'gastrointestinal', secondary: ['emergency', 'critical-care'], subs: ['liver', 'upper-gi'],
    tags: ['Esophageal Varices', 'Portal Hypertension', 'Cirrhosis', 'Hematemesis', 'GI Bleed'],
    specialty: 'GI / Critical Care', difficulty: 'Advanced', accent: 'coral',
    summary: 'Portal hypertension swells veins in the lower esophagus. When they bleed, it’s an emergency.',
    keyPoints: [
      'Varices are dilated, fragile veins caused by portal hypertension, most often from cirrhosis.',
      'Bleeding causes hematemesis, melena (black, tarry stools) or bright red blood.',
      'Signs of liver disease such as jaundice, ascites and an enlarged spleen are often present.',
    ],
    considerations: [
      'Variceal bleeding can cause hemorrhagic shock: rising heart rate, falling blood pressure, cool clammy skin. Protect the airway and escalate.',
    ],
    pearl: 'A client with cirrhosis vomiting blood: think varices and prepare for shock.',
  },

  // ---------------- Musculoskeletal ----------------
  {
    slug: 'stairs-with-an-injured-leg', title: 'Stairs with an Injured Leg', artworkTitle: 'Going Up & Down Steps with an Injured Leg', bundle: 'msk',
    topic: 'musculoskeletal', secondary: ['patient-safety', 'fundamentals'], subs: ['mobility', 'falls'],
    tags: ['Stairs', 'Crutches', 'Cane', 'Fall Prevention', 'Patient Education'],
    specialty: 'Ortho / Rehab', audience: SR, difficulty: 'Foundational', format: 'Reference Guide', accent: 'sky',
    summary: '“Up with the good, down with the bad”: the stair rule that keeps clients from falling.',
    keyPoints: [
      'Going up: step up with the stronger leg first, then bring up the injured leg.',
      'Going down: step down with the injured leg first, then follow with the stronger leg.',
      'A cane or crutches move with the injured leg.',
    ],
    considerations: [
      'Use the handrail when available, and practice with supervision before discharge.',
    ],
    pearl: 'Up with the good, down with the bad.',
  },
  {
    slug: 'signs-of-gout', title: 'Signs of Gout', artworkTitle: '3 Signs & Symptoms of Gout', bundle: 'msk',
    topic: 'musculoskeletal', secondary: ['pathophysiology'], subs: ['orthopedics'],
    tags: ['Gout', 'Uric Acid', 'Big Toe', 'Arthritis', 'Purines'],
    specialty: 'Ortho / Primary Care', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Uric acid crystals in a joint cause sudden, intense pain, most often at the base of the big toe.',
    keyPoints: [
      'Sudden, severe joint pain, often at night, usually worst in the first 12–24 hours.',
      'The joint becomes red, hot, swollen and very tender.',
      'Repeated attacks can limit range of motion over time.',
    ],
    considerations: [
      'Teach about common triggers such as alcohol (especially beer), high-purine foods, sugary drinks and dehydration.',
      'A hot, swollen joint with fever can be septic arthritis. Report it promptly.',
    ],
    pearl: 'A red, hot, exquisitely tender big toe overnight: think gout.',
  },
  {
    slug: 'signs-of-osteoporosis', title: 'Signs of Osteoporosis', artworkTitle: '3 Signs and Symptoms of Osteoporosis', bundle: 'msk',
    topic: 'musculoskeletal', secondary: ['pathophysiology'], subs: ['bone-health'],
    tags: ['Osteoporosis', 'Fragility Fracture', 'Kyphosis', 'Bone Density', 'Falls'],
    specialty: 'Ortho / Geriatrics', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'The “silent disease”: bones weaken without symptoms until a minor strain or fall causes a fracture.',
    keyPoints: [
      'Often no symptoms until a fracture, most commonly of the hip, wrist or spine.',
      'Vertebral compression fractures cause back pain and loss of height over time.',
      'Stooped posture (kyphosis) can develop.',
    ],
    considerations: [
      'Fall prevention is central: lighting, footwear, clutter, assistive devices.',
      'Weight-bearing exercise and adequate calcium and vitamin D support bone health.',
    ],
    pearl: 'Lost height can be a clue to silent spinal fractures.',
  },
  {
    slug: 'osteoporosis-risk-factors', title: 'Osteoporosis Risk Factors', artworkTitle: '6 Most Common Risk Factors of Osteoporosis', bundle: 'msk',
    topic: 'musculoskeletal', secondary: ['pharmacology'], subs: ['bone-health'],
    tags: ['Osteoporosis', 'Risk Factors', 'Corticosteroids', 'Menopause', 'Health Promotion'],
    specialty: 'Ortho / Primary Care', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Some risk factors can be changed and some can’t. Knowing both guides screening and teaching.',
    keyPoints: [
      'Non-modifiable: female sex, older age, family history, small body frame, menopause.',
      'Medical and medications: long-term corticosteroids, excess thyroid hormone, some anticonvulsants and conditions such as celiac disease and rheumatoid arthritis.',
      'Lifestyle: smoking, heavy alcohol use, inactivity, low calcium or vitamin D, being underweight.',
    ],
    considerations: [
      'Clients on long-term corticosteroids need bone health monitoring.',
    ],
    pearl: 'Steroids, smoking and sitting still all thin the bones.',
  },
  {
    slug: 'signs-of-fractures', title: 'Signs of Fractures', artworkTitle: 'The 6 Signs and Symptoms of Fractures', bundle: 'msk',
    topic: 'musculoskeletal', secondary: ['emergency'], subs: ['orthopedics', 'trauma'],
    tags: ['Fractures', 'Deformity', 'Neurovascular Checks', 'Compartment Syndrome', 'Trauma'],
    specialty: 'Ortho / Emergency', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Pain, swelling, deformity, and loss of function. Then check what’s below the break.',
    keyPoints: [
      'A pop or snap at the time of injury, then pain that worsens with movement or pressure.',
      'Swelling, bruising, warmth and limited use of the injured area.',
      'Deformity or abnormal movement where there’s no joint. Bone through the skin means an open fracture.',
    ],
    considerations: [
      'Check circulation, sensation and movement below the injury, and immobilize before moving the client.',
      'Pain out of proportion that worsens with passive stretch can mean compartment syndrome. Escalate immediately.',
    ],
    pearl: 'Always check below the break: pulse, color, warmth, feeling, movement.',
  },

  // ---------------- Neurology ----------------
  {
    slug: 'early-signs-of-alzheimers', title: 'Early Signs of Alzheimer’s Disease', artworkTitle: '10 Early Signs and Symptoms of Alzheimer’s Disease', bundle: 'neuro',
    topic: 'neurological', secondary: ['mental-health'], subs: ['neurodegenerative'],
    tags: ['Alzheimer’s Disease', 'Dementia', 'Memory Loss', 'Geriatrics', 'Cognition'],
    specialty: 'Neuro / Geriatrics', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'The most common cause of dementia. Early signs go beyond forgetfulness.',
    keyPoints: [
      'Memory loss that disrupts daily life, such as forgetting recent events or repeating questions.',
      'Trouble with planning, familiar tasks, words, judgment, and keeping track of time and place.',
      'Misplacing things, withdrawing from activities, and changes in mood or personality.',
    ],
    considerations: [
      'A sudden change in cognition is more likely delirium than dementia. Look for a cause such as infection or medications.',
      'Safety planning matters: wandering, driving, medications and finances.',
    ],
    pearl: 'Dementia is gradual; delirium is sudden and fluctuating.',
  },
  {
    slug: 'trigeminal-neuralgia', title: 'Trigeminal Neuralgia', artworkTitle: 'Trigeminal Neuralgia', bundle: 'neuro',
    topic: 'neurological', subs: ['neuroanatomy'],
    tags: ['Trigeminal Neuralgia', 'Cranial Nerve V', 'Facial Pain', 'Tic Douloureux'],
    specialty: 'Neuro', difficulty: 'Intermediate', accent: 'sky',
    summary: 'Sudden, severe facial pain along branches of the fifth cranial nerve.',
    keyPoints: [
      'Affects one or more branches of CN V: ophthalmic, maxillary and mandibular.',
      'Type 1 (classic): sudden, shock-like, intermittent attacks.',
      'Type 2 (atypical): constant aching or burning pain. Both forms can occur in the same person.',
    ],
    considerations: [
      'Attacks can be triggered by touch, chewing, talking or a breeze. Clients may avoid eating or hygiene, so check nutrition and oral care.',
    ],
    pearl: 'Light touch can trigger the pain, so let the client guide care of the face.',
  },
  {
    slug: 'signs-of-meningitis', title: 'Signs of Meningitis', artworkTitle: '10 Signs and Symptoms of Meningitis', bundle: 'neuro',
    topic: 'neurological', secondary: ['immunology', 'emergency'], subs: ['infection', 'neuro-assessment'],
    tags: ['Meningitis', 'Kernig’s Sign', 'Brudzinski’s Sign', 'Nuchal Rigidity', 'Petechiae', 'Droplet Precautions'],
    specialty: 'Neuro / Infectious Disease', difficulty: 'Intermediate', accent: 'sky',
    summary: 'Inflammation of the meninges. Bacterial meningitis is a medical emergency.',
    keyPoints: [
      'Severe headache, fever, neck stiffness, photophobia, nausea and vomiting.',
      'Altered level of consciousness and seizures can occur.',
      'Positive Kernig’s and Brudzinski’s signs indicate meningeal irritation.',
    ],
    considerations: [
      'A petechial or purpuric rash can signal meningococcal infection. Escalate immediately.',
      'Use droplet precautions for suspected bacterial meningitis until cleared per policy.',
    ],
    pearl: 'Fever, headache and a stiff neck: think meninges.',
  },
  {
    slug: 'signs-of-multiple-sclerosis', title: 'Signs of Multiple Sclerosis', artworkTitle: '10 Signs and Symptoms of Multiple Sclerosis', bundle: 'neuro',
    topic: 'neurological', secondary: ['immunology'], subs: ['neurodegenerative', 'autoimmune'],
    tags: ['Multiple Sclerosis', 'Demyelination', 'Optic Neuritis', 'Lhermitte’s Sign', 'Autoimmune'],
    specialty: 'Neuro', difficulty: 'Intermediate', accent: 'lav',
    summary: 'The immune system strips myelin in the brain, optic nerves and spinal cord, so symptoms depend on where.',
    keyPoints: [
      'Vision changes (blurred or double vision), fatigue, weakness, numbness and tingling.',
      'Spasticity, ataxia, tremor, dysphagia and slurred speech.',
      'Bladder and bowel dysfunction, and mood or cognitive changes.',
    ],
    considerations: [
      'Heat can temporarily worsen symptoms. Teach clients to avoid overheating.',
      'Fall prevention and aspiration precautions as weakness and swallowing change.',
    ],
    pearl: 'MS affects the central nervous system, where myelin comes from oligodendrocytes, not Schwann cells.',
  },

  // ---------------- Renal ----------------
  {
    slug: 'signs-of-glomerulonephritis', title: 'Signs of Glomerulonephritis', artworkTitle: '9 Signs and Symptoms of Glomerulonephritis', bundle: 'renal',
    topic: 'renal', secondary: ['immunology', 'pediatrics'], subs: ['aki-ckd'],
    tags: ['Glomerulonephritis', 'Hematuria', 'Proteinuria', 'ASO Titer', 'Strep', 'Periorbital Edema'],
    specialty: 'Renal / Pediatrics', difficulty: 'Intermediate', accent: 'teal',
    summary: 'Inflamed glomeruli leak blood and protein and hold on to fluid, classically after a strep infection.',
    keyPoints: [
      'Cola- or tea-colored urine (hematuria) and foamy urine (proteinuria).',
      'Decreased urine output, facial or periorbital edema (often worse in the morning) and hypertension.',
      'Rising BUN and creatinine. An elevated ASO titer suggests a recent strep infection.',
    ],
    considerations: [
      'Monitor blood pressure, daily weights and intake and output. Fluid and sodium may be restricted.',
    ],
    pearl: 'Recent strep throat, then puffy eyes and dark urine: think post-streptococcal glomerulonephritis.',
  },
  {
    slug: 'causes-of-aki', title: 'Causes of Acute Kidney Injury', artworkTitle: '3 Most Common Causes of Acute Kidney Injury AKI', bundle: 'renal',
    topic: 'renal', secondary: ['critical-care', 'pathophysiology'], subs: ['aki-ckd'],
    tags: ['AKI', 'Prerenal', 'Intrarenal', 'Postrenal', 'ATN', 'Nephrotoxins'],
    specialty: 'Renal / Critical Care', difficulty: 'Intermediate', format: 'Differentiation Map', accent: 'teal',
    summary: 'Before, inside or after the kidney: sorting AKI by cause points straight to the fix.',
    keyPoints: [
      'Prerenal: reduced blood flow to the kidneys, from hypovolemia, low cardiac output or hypotension.',
      'Intrarenal: direct damage, such as acute tubular necrosis, nephrotoxic drugs, or prolonged ischemia.',
      'Postrenal: obstruction to urine flow, such as an enlarged prostate, stones or tumors.',
    ],
    considerations: [
      'Watch nephrotoxins (for example, NSAIDs, aminoglycosides and IV contrast) and trend creatinine and urine output.',
      'A distended bladder or retention points to a postrenal cause. A bladder scan helps.',
    ],
    pearl: 'Pre = pipes in (blood flow), intra = the kidney itself, post = pipes out (obstruction).',
  },
  {
    slug: 'hemodialysis-vs-peritoneal-dialysis', title: 'Hemodialysis vs. Peritoneal Dialysis', artworkTitle: 'The Difference Between Hemodialysis HD vs Peritoneal Dialysis PD', bundle: 'renal',
    topic: 'renal', subs: ['dialysis', 'aki-ckd'],
    tags: ['Dialysis', 'Hemodialysis', 'Peritoneal Dialysis', 'AV Fistula', 'Peritonitis'],
    specialty: 'Renal / Dialysis', difficulty: 'Intermediate', format: 'Differentiation Map', accent: 'teal',
    summary: 'Two ways to do the kidneys’ job: a machine filtering the blood, or the peritoneum doing it inside the body.',
    keyPoints: [
      'Hemodialysis filters blood through a machine, usually 3–5 hours, about three times a week.',
      'HD access: AV fistula, AV graft or a central dialysis catheter.',
      'Peritoneal dialysis uses the peritoneum as the filter, through an abdominal catheter. It can be manual (CAPD) or automated overnight (APD).',
    ],
    considerations: [
      'AV fistula arm: no blood pressures or blood draws; check for a thrill and bruit.',
      'PD: cloudy effluent and abdominal pain suggest peritonitis. Report promptly.',
    ],
    pearl: 'Feel the thrill, hear the bruit.',
  },

  // ---------------- Respiratory ----------------
  {
    slug: 'signs-of-tuberculosis', title: 'Signs of Tuberculosis', artworkTitle: '6 Signs and Symptoms of Tuberculosis TB', bundle: 'resp',
    topic: 'respiratory', secondary: ['immunology'], subs: ['respiratory-infections', 'infection'],
    tags: ['Tuberculosis', 'TB', 'Airborne Precautions', 'Night Sweats', 'Hemoptysis'],
    specialty: 'Respiratory / Infectious Disease', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'An airborne bacterial infection that usually targets the lungs, with a slow, wasting picture.',
    keyPoints: [
      'A cough lasting more than 3 weeks, sometimes with blood (hemoptysis).',
      'Night sweats, fever and chills.',
      'Fatigue, loss of appetite and weight loss.',
    ],
    considerations: [
      'Suspected active TB: airborne precautions, a negative-pressure room and an N95 respirator.',
      'Treatment lasts months. Adherence is essential to prevent drug resistance.',
    ],
    pearl: 'Cough, night sweats, weight loss: think TB and mask up.',
  },
  {
    slug: 'signs-of-copd', title: 'Signs of COPD', artworkTitle: '3 Common Signs and Symptoms of COPD', bundle: 'resp',
    topic: 'respiratory', subs: ['copd-asthma'],
    tags: ['COPD', 'Emphysema', 'Chronic Bronchitis', 'Dyspnea', 'Smoking'],
    specialty: 'Respiratory / Med-Surg', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Chronic bronchitis and emphysema block airflow and make breathing hard work.',
    keyPoints: [
      'Shortness of breath, especially with activity.',
      'Chronic cough and/or wheezing.',
      'Sputum production, especially with chronic bronchitis.',
    ],
    considerations: [
      'Many clients have an individualized oxygen saturation target. Follow the order rather than a single number.',
      'Teach pursed-lip breathing and smoking cessation.',
    ],
    pearl: 'Pursed-lip breathing keeps airways open longer on exhale.',
  },
  {
    slug: 'signs-of-asthma', title: 'Signs of Asthma', artworkTitle: '8 Signs and Symptoms of Asthma', bundle: 'resp',
    topic: 'respiratory', secondary: ['pediatrics', 'emergency'], subs: ['copd-asthma'],
    tags: ['Asthma', 'Wheezing', 'Bronchospasm', 'Pulsus Paradoxus', 'Silent Chest'],
    specialty: 'Respiratory / Pediatrics', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Inflamed, narrowed airways cause wheezing, cough and breathlessness that can escalate quickly.',
    keyPoints: [
      'Wheezing (often on expiration), chest tightness, dyspnea and cough, often worse at night or early morning.',
      'Tachypnea, tachycardia, accessory muscle use, restlessness and anxiety during attacks.',
      'Pulsus paradoxus (a systolic drop of more than 10 mm Hg on inspiration) can occur in severe attacks.',
    ],
    considerations: [
      'A quiet chest in a struggling client is ominous: airflow may be too low to wheeze. Escalate immediately.',
      'Quick-relief inhaler first in an attack. Teach the difference between rescue and controller medications.',
    ],
    pearl: 'The silent chest is not a sign of improvement.',
  },
  {
    slug: 'signs-of-pneumonia', title: 'Signs of Pneumonia', artworkTitle: '7 Signs and Symptoms of Pneumonia', bundle: 'resp',
    topic: 'respiratory', secondary: ['immunology'], subs: ['respiratory-infections'],
    tags: ['Pneumonia', 'Infection', 'Productive Cough', 'Confusion', 'Older Adults'],
    specialty: 'Respiratory / Med-Surg', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Infection fills the alveoli with fluid or pus. In older adults, confusion may be the first sign.',
    keyPoints: [
      'Cough with sputum, fever, sweating and chills.',
      'Dyspnea and pleuritic chest pain.',
      'Fatigue, nausea and vomiting, and confusion, especially in older adults.',
    ],
    considerations: [
      'Monitor oxygen saturation and respiratory rate, and encourage deep breathing, coughing and mobility.',
      'New confusion or a rising respiratory rate can signal sepsis. Escalate early.',
    ],
    pearl: 'In an older adult, new confusion may be the first sign of pneumonia.',
  },
  {
    slug: 'signs-of-pulmonary-embolism', title: 'Signs of Pulmonary Embolism', artworkTitle: '3 Classic Signs and Symptoms of Pulmonary Embolism', bundle: 'resp',
    topic: 'respiratory', secondary: ['emergency', 'critical-care', 'hematology'], subs: ['oxygenation', 'clotting'],
    tags: ['Pulmonary Embolism', 'PE', 'DVT', 'Dyspnea', 'Hemoptysis', 'Anticoagulation'],
    specialty: 'Respiratory / Emergency', difficulty: 'Intermediate', accent: 'coral',
    summary: 'A clot, usually from a leg DVT, blocks a pulmonary artery. Sudden dyspnea is the most common sign.',
    keyPoints: [
      'Classic signs: sudden dyspnea, pleuritic chest pain and hemoptysis.',
      'Tachycardia, tachypnea, anxiety, sweating, low oxygen saturation and cyanosis.',
      'Risk factors include immobility, recent surgery (especially orthopedic), cancer, pregnancy and estrogen therapy.',
    ],
    considerations: [
      'Suspected PE: stay with the client, raise the head of the bed, give oxygen as ordered and activate rapid response per protocol.',
      'Prevention: early mobility, compression devices and anticoagulant prophylaxis as ordered.',
    ],
    pearl: 'Sudden breathlessness after surgery or immobility: PE until proven otherwise.',
  },
  {
    slug: 'respiratory-system-anatomy-b', title: 'Respiratory System Anatomy (Print B)', artworkTitle: 'Anatomy of the Respiratory System Print B', bundle: 'resp',
    topic: 'respiratory', secondary: ['anatomy-physiology', 'cardiovascular'], subs: ['respiratory-anatomy'],
    tags: ['Respiratory Anatomy', 'Alveoli', 'Pulmonary Circulation', 'Gas Exchange', 'Aspiration'],
    specialty: 'Respiratory / Fundamentals', audience: S, difficulty: 'Foundational', accent: 'teal',
    summary: 'The airways and the pulmonary blood vessels together, meeting at the alveoli for gas exchange.',
    keyPoints: [
      'Air flows trachea → bronchi → bronchioles → alveoli.',
      'Oxygen and carbon dioxide cross between the alveoli and the surrounding capillaries.',
      'Pulmonary arteries bring deoxygenated blood to the lungs; pulmonary veins return oxygenated blood to the heart.',
    ],
    considerations: [
      'The right main bronchus is wider, shorter and more vertical, so aspirated material more often goes right.',
    ],
    pearl: 'Inhale a bite, it goes down the right.',
  },
  {
    slug: 'inspiration-vs-expiration', title: 'Inspiration vs. Expiration', artworkTitle: 'Inspiration vs. Expiration of the Lungs', bundle: 'resp',
    topic: 'respiratory', secondary: ['anatomy-physiology'], subs: ['respiratory-anatomy'],
    tags: ['Ventilation', 'Diaphragm', 'Inspiration', 'Expiration', 'Breathing Mechanics'],
    specialty: 'Respiratory / Fundamentals', audience: S, difficulty: 'Foundational', format: 'Differentiation Map', accent: 'teal',
    summary: 'Breathing is pressure and volume: the diaphragm moves, chest size changes, and air follows.',
    keyPoints: [
      'Inspiration: the diaphragm contracts and moves down, the chest cavity enlarges, pressure falls and air flows in.',
      'Expiration: the diaphragm relaxes and moves up, the chest cavity shrinks, pressure rises and air flows out.',
      'Quiet expiration is passive; forced expiration uses abdominal and internal intercostal muscles.',
    ],
    considerations: [
      'Accessory muscle use during breathing signals increased work of breathing.',
    ],
    pearl: 'Air always moves from higher pressure to lower pressure.',
  },

  // ---------------- Additional topics ----------------
  {
    slug: 'rule-of-nines', title: 'The Rule of 9s', artworkTitle: 'Rules of 9s', bundle: 'all',
    topic: 'integumentary', secondary: ['emergency', 'critical-care'], subs: ['burns', 'trauma'],
    tags: ['Rule of Nines', 'Burns', 'TBSA', 'Fluid Resuscitation'],
    specialty: 'Burn / Emergency', audience: SR, difficulty: 'Foundational', format: 'Reference Guide', accent: 'coral',
    summary: 'A quick way to estimate how much body surface area an adult’s burn covers.',
    keyPoints: [
      'Adult: head 9%, each arm 9%, front of trunk 18%, back of trunk 18%, each leg 18%, perineum 1%.',
      'Front and back each count half of a region: for example, the front of one arm is 4.5%.',
      'The estimate guides fluid resuscitation and decisions about burn center transfer.',
    ],
    considerations: [
      'Children have proportionally larger heads, so the adult rule doesn’t apply. Use a pediatric chart.',
      'Count only partial- and full-thickness burns, not superficial ones.',
    ],
    pearl: 'Small, scattered burns? The client’s palm is roughly 1% of body surface area.',
  },
  {
    slug: 'open-vs-closed-angle-glaucoma', title: 'Open-Angle vs. Closed-Angle Glaucoma', artworkTitle: 'Open-Angle Glaucoma vs. Closed-Angle Glaucoma', bundle: 'all',
    topic: 'sensory', secondary: ['emergency'], subs: ['eye'],
    tags: ['Glaucoma', 'Intraocular Pressure', 'Open-Angle', 'Angle-Closure', 'Vision Loss'],
    specialty: 'Eye / Emergency', audience: SR, difficulty: 'Intermediate', format: 'Differentiation Map', accent: 'teal',
    summary: 'Same disease, two speeds: open-angle steals vision quietly; closed-angle is a painful emergency.',
    keyPoints: [
      'Open-angle (most common): gradual, painless loss of peripheral vision. Tunnel vision in late stages.',
      'Closed-angle: sudden severe eye pain, headache, blurred vision with halos, nausea and vomiting.',
      'In acute closed-angle glaucoma, the eye may be red with a cloudy cornea and a fixed, mid-dilated pupil.',
    ],
    considerations: [
      'Acute angle closure is a medical emergency. Prompt treatment protects vision.',
      'Many anticholinergic medications can trigger angle closure in at-risk eyes.',
    ],
    pearl: 'Painful red eye with halos and vomiting: think acute angle closure.',
  },
  {
    slug: 'signs-of-cataracts', title: 'Signs of Cataracts', artworkTitle: '6 Signs and Symptoms of Cataracts', bundle: 'all',
    topic: 'sensory', secondary: ['fundamentals'], subs: ['eye'],
    tags: ['Cataracts', 'Vision', 'Glare', 'Older Adults', 'Fall Risk'],
    specialty: 'Eye / Geriatrics', audience: SR, difficulty: 'Foundational', accent: 'sky',
    summary: 'Clouding of the lens causes blurry, faded, glary vision that develops slowly and painlessly.',
    keyPoints: [
      'Cloudy or blurry vision, faded or yellowed colors.',
      'Glare and halos around lights, and trouble seeing at night.',
      'Frequent prescription changes and double vision in one eye.',
    ],
    considerations: [
      'Poor vision raises fall risk. Check lighting and remove hazards.',
      'After cataract surgery, teach clients to avoid rubbing the eye and to report pain or sudden vision loss.',
    ],
    pearl: 'Cataracts are painless. Eye pain points elsewhere.',
  },
  {
    slug: 'signs-of-lupus', title: 'Signs of Lupus (SLE)', artworkTitle: '10 Signs and Symptoms of Lupus', bundle: 'all',
    topic: 'immunology', secondary: ['integumentary', 'musculoskeletal'], subs: ['autoimmune'],
    tags: ['Lupus', 'SLE', 'Butterfly Rash', 'Photosensitivity', 'Raynaud’s', 'Autoimmune'],
    specialty: 'Rheumatology / Immunology', difficulty: 'Intermediate', accent: 'lav',
    summary: 'A systemic autoimmune disease that can affect skin, joints, blood, kidneys, lungs and heart.',
    keyPoints: [
      'Butterfly (malar) rash across the cheeks and nose, and photosensitivity.',
      'Joint pain and stiffness, fatigue, fever, mouth ulcers and hair loss.',
      'Anemia, pleurisy (painful breathing) and Raynaud’s phenomenon.',
    ],
    considerations: [
      'Teach sun protection, and watch for kidney involvement (proteinuria, edema, rising blood pressure).',
      'Immunosuppressive treatment raises infection risk.',
    ],
    pearl: 'Butterfly rash plus joint pain and fatigue in a young woman: think lupus.',
  },
  {
    slug: 'nclex-study-plan', title: 'The NCLEX Study Plan', artworkTitle: 'The NCLEX Study Plan', bundle: 'all',
    topic: 'nursing-education', secondary: ['clinical-judgment'], subs: ['study-skills'],
    tags: ['NCLEX', 'Study Plan', 'Study Skills', 'Test Prep'],
    specialty: 'NCLEX Prep', audience: S, difficulty: 'Foundational', format: 'Reference Guide', accent: 'sun',
    summary: 'One step at a time: a body-system roadmap for studying, ending with review and rest.',
    keyPoints: [
      'Work through one body system at a time: cardiovascular, neurological, respiratory, GI, musculoskeletal, endocrine, renal, then other topics.',
      'Finish with a review phase and rest before test day.',
      'Pair content review with practice questions and their rationales.',
    ],
    considerations: [
      'The NCLEX is organized by client needs and clinical judgment, not only by body system. Mix in prioritization and safety practice.',
    ],
    pearl: 'Read the rationale for every practice question, including the ones you got right.',
  },
  {
    slug: 'nclex-morning-routine', title: 'Morning Routine for NCLEX Study', artworkTitle: '10 Steps to Creating the Best Morning Routine for the NCLEX', bundle: 'all',
    topic: 'nursing-education', subs: ['study-skills'],
    tags: ['NCLEX', 'Study Habits', 'Sleep', 'Routine', 'Wellness'],
    specialty: 'NCLEX Prep', audience: S, difficulty: 'Foundational', format: 'Reference Guide', accent: 'sun',
    summary: 'Ten habits that set up a focused study day, starting the night before.',
    keyPoints: [
      'Plan tomorrow tonight with a short, specific to-do list.',
      'Protect sleep and keep a consistent wake time, even on days off.',
      'Move, eat breakfast, tackle the hardest task first, and reflect at the end of the day.',
    ],
    considerations: [
      'Consistency beats intensity: short daily sessions add up.',
    ],
    pearl: 'Start with the hardest task while your focus is freshest.',
  },
];

export const ETSY_CATALOG: Resource[] = ENTRIES.map((e) => ({
  slug: e.slug,
  title: e.title,
  topic: e.topic,
  secondaryTopics: e.secondary ?? [],
  subcategories: e.subs ?? [],
  tags: e.tags,
  specialty: e.specialty,
  audience: e.audience ?? SR,
  difficulty: e.difficulty ?? 'Foundational',
  format: e.format ?? 'Infographic',
  accent: e.accent,
  summary: e.summary,
  keyPoints: e.keyPoints,
  considerations: e.considerations,
  pearl: e.pearl,
  thumb: [],
  status: 'draft',
  access: 'free',
  references: [],
  reviewedOn: null,
  source: 'etsy',
  artwork: { file: `${e.slug}.webp`, alt: `CleveRNurses ${e.artworkTitle} infographic` },
  etsy: {
    artworkTitle: e.artworkTitle,
    collection: B[e.bundle],
    ...(LISTINGS[e.slug] && {
      digital: { url: url(LISTINGS[e.slug][0]), price: '$4.99' },
      print: { url: url(LISTINGS[e.slug][1]), price: e.slug === 'nclex-study-plan' ? 'from $45.99' : 'from $49.99' },
    }),
    checkedOn: '2026-11-15',
  },
}));
