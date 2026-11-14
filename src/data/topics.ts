import type { Subcategory, Topic } from './types';

const sub = (...pairs: [string, string][]): Subcategory[] => pairs.map(([id, name]) => ({ id, name }));

/**
 * Primary categories. The original 22 keep their names, ids and order.
 * New categories are appended at the end and marked `added`.
 */
export const TOPICS: Topic[] = [
  { id: 'mental-health', name: 'Mental Health & Psychiatry', blurb: 'Conditions, safety, communication', icon: 'mind', accent: 'lav', featured: true,
    subcategories: sub(['mood-disorders', 'Mood Disorders'], ['anxiety-trauma', 'Anxiety & Trauma'], ['psychotic-disorders', 'Psychotic Disorders'], ['substance-use', 'Substance Use Disorders'], ['behavioral-health', 'Behavioral Health'], ['therapeutic-communication', 'Therapeutic Communication'], ['suicide-safety', 'Suicide Risk & Safety']) },
  { id: 'cardiovascular', name: 'Cardiovascular', blurb: 'Heart failure, ACS, rhythms', icon: 'heart', accent: 'coral', featured: true,
    subcategories: sub(['heart-failure', 'Heart Failure'], ['hypertension', 'Hypertension'], ['acs', 'Coronary Disease & ACS'], ['rhythms-ecg', 'Rhythms & ECG'], ['vascular', 'Vascular']) },
  { id: 'pharmacology', name: 'Pharmacology', blurb: 'Med safety and high-alert drugs', icon: 'pill', accent: 'teal', featured: true,
    subcategories: sub(['medication-safety', 'Medication Safety'], ['psychopharmacology', 'Psychopharmacology'], ['high-alert-meds', 'High-Alert Medications']) },
  { id: 'clinical-judgment', name: 'NCLEX Clinical Judgment', blurb: 'Cues, priorities, actions', icon: 'compass', accent: 'sun', featured: true,
    subcategories: sub(['prioritization', 'Prioritization & Delegation'], ['ngn-case-studies', 'NGN Case Studies'], ['test-strategies', 'Test-Taking Strategies']) },
  { id: 'critical-care', name: 'Critical Care', blurb: 'ABGs, shock, sepsis', icon: 'pulse', accent: 'coral', featured: true,
    subcategories: sub(['shock-sepsis', 'Shock & Sepsis'], ['acid-base', 'ABGs & Acid-Base'], ['hemodynamics', 'Hemodynamics'], ['mechanical-ventilation', 'Mechanical Ventilation']) },
  { id: 'neurological', name: 'Neurological', blurb: 'Stroke, GCS, seizures', icon: 'brain', accent: 'sky', featured: true,
    subcategories: sub(['neuro-assessment', 'Neuro Assessment'], ['stroke', 'Stroke'], ['seizures', 'Seizures'], ['neurodegenerative', 'Neurodegenerative Disorders'], ['neuroanatomy', 'Neuroanatomy']) },
  { id: 'endocrine', name: 'Endocrine', blurb: 'DKA, HHS, thyroid', icon: 'gland', accent: 'sun', featured: true,
    subcategories: sub(['diabetes', 'Diabetes'], ['thyroid', 'Thyroid'], ['adrenal-pituitary', 'Adrenal & Pituitary']) },
  { id: 'maternal-newborn', name: 'Maternal-Newborn', blurb: 'L&D, postpartum, newborn', icon: 'baby', accent: 'coral', featured: true,
    subcategories: sub(['prenatal', 'Prenatal'], ['labor-delivery', 'Labor & Delivery'], ['postpartum', 'Postpartum'], ['neonatal', 'Neonatal Nursing']) },
  { id: 'respiratory', name: 'Respiratory', blurb: 'COPD, asthma, oxygenation', icon: 'lungs', accent: 'sky',
    subcategories: sub(['respiratory-anatomy', 'Respiratory Anatomy'], ['copd-asthma', 'COPD & Asthma'], ['respiratory-infections', 'Respiratory Infections'], ['oxygenation', 'Oxygenation']) },
  { id: 'gastrointestinal', name: 'Gastrointestinal', blurb: 'GI bleeds, liver, bowel', icon: 'stomach', accent: 'sun',
    subcategories: sub(['upper-gi', 'Upper GI'], ['lower-gi', 'Lower GI'], ['liver', 'Liver & Biliary']) },
  { id: 'renal', name: 'Renal', blurb: 'AKI, CKD, electrolytes', icon: 'kidney', accent: 'teal',
    subcategories: sub(['renal-anatomy', 'Renal Anatomy'], ['urinary', 'Kidney Stones & Urinary'], ['aki-ckd', 'AKI & CKD'], ['dialysis', 'Dialysis']) },
  { id: 'hematology', name: 'Hematology', blurb: 'Anemias, clotting, transfusion', icon: 'drop', accent: 'coral',
    subcategories: sub(['anemias', 'Anemias'], ['clotting', 'Clotting & Anticoagulation'], ['transfusion', 'Transfusion']) },
  { id: 'immunology', name: 'Immunology', blurb: 'Infection, immunity, allergy', icon: 'shield', accent: 'teal',
    subcategories: sub(['infection', 'Infection & Infection Control'], ['autoimmune', 'Autoimmune'], ['allergy', 'Allergy & Anaphylaxis']) },
  { id: 'musculoskeletal', name: 'Musculoskeletal', blurb: 'Fractures, joints, mobility', icon: 'bone', accent: 'sky',
    subcategories: sub(['orthopedics', 'Orthopedics'], ['bone-health', 'Bone Health'], ['mobility', 'Mobility & Assistive Devices']) },
  { id: 'integumentary', name: 'Integumentary', blurb: 'Burns, wounds, pressure injury', icon: 'skin', accent: 'sun',
    subcategories: sub(['burns', 'Burns'], ['wound-care', 'Wound Care'], ['pressure-injury', 'Pressure Injury']) },
  { id: 'reproductive', name: 'Reproductive Health', blurb: 'Across the lifespan', icon: 'venus', accent: 'lav',
    subcategories: sub(['womens-health', 'Women’s Health'], ['mens-health', 'Men’s Health']) },
  { id: 'pediatrics', name: 'Pediatrics', blurb: 'Growth, development, safety', icon: 'smile', accent: 'teal',
    subcategories: sub(['growth-development', 'Growth & Development'], ['pediatric-safety', 'Pediatric Safety']) },
  { id: 'fundamentals', name: 'Fundamentals', blurb: 'Assessment and core skills', icon: 'book', accent: 'sky',
    subcategories: sub(['health-assessment', 'Health Assessment'], ['vital-signs', 'Vital Signs'], ['basic-care', 'Basic Care & Comfort']) },
  { id: 'emergency', name: 'Emergency Nursing', blurb: 'Triage and time-critical care', icon: 'siren', accent: 'coral',
    subcategories: sub(['trauma', 'Trauma Nursing'], ['triage', 'Triage']) },
  { id: 'patient-safety', name: 'Patient Safety', blurb: 'Falls, restraints, errors', icon: 'check', accent: 'teal',
    subcategories: sub(['falls', 'Falls'], ['restraints', 'Restraints & Seclusion'], ['error-prevention', 'Error Prevention']) },
  { id: 'leadership', name: 'Leadership & Management', blurb: 'Delegation and teams', icon: 'flag', accent: 'lav',
    subcategories: sub(['delegation', 'Delegation & Teams'], ['quality-improvement', 'Quality Improvement']) },
  { id: 'advanced-practice', name: 'Advanced Practice', blurb: 'Assessment and diagnosis', icon: 'steth', accent: 'lav',
    subcategories: sub(['np-resources', 'Nurse Practitioner Resources'], ['diagnostic-reasoning', 'Diagnostic Reasoning'], ['psych-advanced', 'Psychiatric Advanced Practice'], ['doctoral', 'Doctoral Nursing Practice']) },

  // ---- Added Nov 2026 ----
  { id: 'anatomy-physiology', name: 'Anatomy & Physiology', blurb: 'How the body works', icon: 'heart', accent: 'teal', added: true },
  { id: 'pathophysiology', name: 'Pathophysiology', blurb: 'Why disease looks the way it does', icon: 'pulse', accent: 'coral', added: true },
  { id: 'sensory', name: 'Eye, Ear & Sensory', blurb: 'Vision, hearing, special senses', icon: 'search', accent: 'sky', added: true,
    subcategories: sub(['eye', 'Eye'], ['ear', 'Ear']) },
  { id: 'nursing-education', name: 'Nursing Education', blurb: 'Study skills and teaching', icon: 'book', accent: 'sun', added: true,
    subcategories: sub(['study-skills', 'Study Skills & NCLEX Planning'], ['educator-resources', 'Nurse Educator Resources']) },
];

export const topicById = (id: string) => TOPICS.find((t) => t.id === id);

/** Find a subcategory and its parent topic by subcategory id. */
export function findSubcategory(id: string) {
  for (const t of TOPICS) {
    const s = t.subcategories?.find((x) => x.id === id);
    if (s) return { topic: t, sub: s };
  }
  return undefined;
}
