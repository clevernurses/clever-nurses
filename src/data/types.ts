// Content model for CleveRNurses. Every educational item on the site is driven by these types,
// so the same records can later come from a CMS without changing page components.

export type Accent = 'teal' | 'coral' | 'sun' | 'lav' | 'sky';

export type Audience = 'Student' | 'Practicing RN' | 'Advanced Practice';
export const AUDIENCES: Audience[] = ['Student', 'Practicing RN', 'Advanced Practice'];

export type Difficulty = 'Foundational' | 'Intermediate' | 'Advanced';
export const DIFFICULTIES: Difficulty[] = ['Foundational', 'Intermediate', 'Advanced'];

export type Format =
  | 'Infographic'
  | 'Decision Map'
  | 'Prioritization Map'
  | 'Differentiation Map'
  | 'Cause → Effect Map'
  | 'Why It’s Wrong Map'
  | 'Medication Safety'
  | 'Clinical Reasoning'
  | 'Reference Guide';
export const FORMATS: Format[] = [
  'Infographic',
  'Decision Map',
  'Prioritization Map',
  'Differentiation Map',
  'Cause → Effect Map',
  'Why It’s Wrong Map',
  'Medication Safety',
  'Clinical Reasoning',
  'Reference Guide',
];

/** published = clinically reviewed and live; nothing is published yet. */
export type PublicationStatus = 'published' | 'in-review' | 'draft' | 'planned';
export type Access = 'free' | 'premium';

export type TopicId =
  | 'cardiovascular' | 'respiratory' | 'neurological' | 'gastrointestinal' | 'renal' | 'endocrine'
  | 'hematology' | 'immunology' | 'musculoskeletal' | 'integumentary' | 'reproductive'
  | 'maternal-newborn' | 'pediatrics' | 'mental-health' | 'pharmacology' | 'fundamentals'
  | 'critical-care' | 'emergency' | 'patient-safety' | 'leadership' | 'clinical-judgment'
  | 'advanced-practice'
  // Added Nov 2026 (appended so the original order is preserved)
  | 'anatomy-physiology' | 'pathophysiology' | 'sensory' | 'nursing-education';

export interface Subcategory {
  /** Globally unique slug, e.g. 'heart-failure'. */
  id: string;
  name: string;
}

export interface Topic {
  id: TopicId;
  name: string;
  blurb: string;
  icon: IconName;
  accent: Accent;
  featured?: boolean;
  /** More specific subjects inside this category. Shown in the topic picker. */
  subcategories?: Subcategory[];
  /** True for categories added after the original 22. */
  added?: boolean;
}

/** A verified Etsy listing. Only fill from the live shop; never guess URLs. */
export interface EtsyListing {
  url: string;
  /** Price shown on Etsy when checked. Kept for reference; not displayed (prices change). */
  price?: string;
}

export interface EtsyProduct {
  digital?: EtsyListing;
  print?: EtsyListing;
  /** Matching bundle on Etsy ("Explore the collection"). */
  collection?: { name: string; url: string };
  /** Title of the infographic as named in the Etsy bundle contents. */
  artworkTitle?: string;
  /** What the listing itself says the infographic shows (summarized from Etsy). */
  listingSummary?: string;
  /** ISO date the listing was checked. */
  checkedOn: string;
}

export interface Artwork {
  /** Expected file name in src/art/ (e.g. 'how-blood-flows-through-the-heart.jpg'). */
  file: string;
  alt: string;
  /** Natural aspect ratio of the art, width / height. Etsy prints are 8.5×11 (portrait) or 11×8.5. */
  ratio?: number;
}

export interface Resource {
  slug: string;
  title: string;
  /** Primary category. Every resource has exactly one. */
  topic: TopicId;
  /** Optional secondary categories. The resource also appears under these. */
  secondaryTopics?: TopicId[];
  /** Subcategory ids (from TOPICS[].subcategories). */
  subcategories?: string[];
  /** Clinical concepts, diagnoses, specialties, roles. Used by search. */
  tags?: string[];
  specialty: string;
  audience: Audience[];
  difficulty: Difficulty;
  format: Format;
  accent: Accent;
  summary: string;
  keyPoints: string[];
  /** Short labels drawn inside the generated thumbnail. Differentiation maps: [left1, right1, left2, right2]. */
  thumb: string[];
  status: PublicationStatus;
  access: Access;
  /** Real citations only. Left empty until clinical review. */
  references: string[];
  /** ISO date of last clinical review, or null if not yet reviewed. */
  reviewedOn: string | null;
  collection?: 'psych-decision-maps';
  /** Where the content originated. */
  source?: 'web' | 'etsy';
  /** Original CleveRNurses artwork. If the file isn't in src/art/, a labeled placeholder shows. */
  artwork?: Artwork;
  etsy?: EtsyProduct;
  /** Bedside or practice considerations. */
  considerations?: string[];
  /** One memorable teaching point. */
  pearl?: string;
}

export type IconName =
  | 'heart' | 'lungs' | 'brain' | 'stomach' | 'kidney' | 'gland' | 'drop' | 'shield' | 'bone'
  | 'skin' | 'venus' | 'baby' | 'smile' | 'mind' | 'pill' | 'book' | 'pulse' | 'siren'
  | 'check' | 'flag' | 'compass' | 'steth' | 'search' | 'arrow' | 'close' | 'menu' | 'spark'
  | 'map' | 'lock' | 'download' | 'mail';
