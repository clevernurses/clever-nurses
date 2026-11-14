import type { Format } from './types';

export type CollectionStatus = 'outline' | 'planned';

export interface CollectionItem {
  n: number;
  title: string;
  format: Format;
  focus: string;
  status: CollectionStatus;
}

/** Psych NCLEX Decision Maps™ (working name). Nothing here is finished or for sale. */
export const PSYCH_COLLECTION: CollectionItem[] = [
  { n: 1, title: 'Suicide Risk Stratification', format: 'Decision Map', focus: 'Screening vs. assessment, warning signs, safety actions', status: 'outline' },
  { n: 2, title: 'Mania vs. Hypomania', format: 'Differentiation Map', focus: 'Duration, impairment and psychosis', status: 'planned' },
  { n: 3, title: 'Therapeutic Responses to Psychosis', format: 'Why It’s Wrong Map', focus: 'Responding to hallucinations and delusions', status: 'planned' },
  { n: 4, title: 'Schizophrenia vs. Schizoaffective Disorder', format: 'Differentiation Map', focus: 'Where mood episodes fit', status: 'planned' },
  { n: 5, title: 'Antipsychotic Adverse Effects & Emergencies', format: 'Medication Safety', focus: 'EPS, metabolic effects, NMS', status: 'planned' },
  { n: 6, title: 'Lithium Monitoring & Toxicity', format: 'Medication Safety', focus: 'Levels, interactions, early warning signs', status: 'planned' },
  { n: 7, title: 'SSRI Safety & Serotonin Syndrome', format: 'Medication Safety', focus: 'Onset, interactions, recognition', status: 'planned' },
  { n: 8, title: 'Anxiety Disorder Differentiation', format: 'Differentiation Map', focus: 'GAD, panic, phobias and more', status: 'planned' },
  { n: 9, title: 'Therapeutic Communication: Do vs. Don’t', format: 'Why It’s Wrong Map', focus: 'Techniques and common blocks', status: 'planned' },
  { n: 10, title: 'Restraints & Seclusion', format: 'Prioritization Map', focus: 'Least restrictive first, monitoring, rights', status: 'planned' },
  { n: 11, title: 'Substance Withdrawal Prioritization', format: 'Prioritization Map', focus: 'Which withdrawal is most dangerous, and when', status: 'planned' },
  { n: 12, title: 'NCLEX Psychiatric Answer Traps', format: 'Why It’s Wrong Map', focus: 'Answers that sound kind but aren’t therapeutic', status: 'planned' },
];
