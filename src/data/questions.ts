/**
 * Clinical judgment demo items. Original CleveRNurses content written for demonstration.
 * Status: pending clinical review. Not NCLEX questions; no affiliation with NCSBN.
 */
export interface JudgmentOption {
  id: string;
  label: string;
  detail: string;
}

export interface JudgmentQuestion {
  id: string;
  setting: string;
  stem: string;
  options: JudgmentOption[];
  correctId: string;
  verdict: string;
  rationale: string;
  whyNot: Record<string, string>;
  priority: string;
  cues: string;
  action: string;
  takeaway: string;
}

export const QUESTIONS: JudgmentQuestion[] = [
  {
    id: 'q-postop',
    setting: 'Medical-surgical unit · start of shift',
    stem: 'The nurse receives report on four clients. Which client should the nurse assess first?',
    options: [
      { id: 'a', label: 'Client with COPD', detail: 'Age 68. SpO₂ 89% on 2 L nasal cannula. Says breathing is “about the same as always.”' },
      { id: 'b', label: 'Client after hip replacement', detail: 'Age 54, post-op day 2. Suddenly anxious with sharp chest pain. RR 28.' },
      { id: 'c', label: 'Client with type 2 diabetes', detail: 'Age 45. Pre-lunch glucose 210 mg/dL. No symptoms.' },
      { id: 'd', label: 'Client with schizophrenia', detail: 'Age 30. Hears familiar voices that are not distressing. Calm, eating breakfast.' },
    ],
    correctId: 'b',
    verdict: 'Sudden chest pain and tachypnea after orthopedic surgery could be a pulmonary embolism.',
    rationale:
      'This client has new, unexpected symptoms that threaten breathing and circulation, and recent orthopedic surgery and immobility raise the risk of a clot. The finding is acute and could worsen quickly.',
    whyNot: {
      a: 'Many clients with COPD have individualized oxygen targets, and this client describes their usual baseline. It needs follow-up but is expected and stable.',
      c: 'Elevated but not an emergency right now. Recheck and treat per orders.',
      d: 'These are chronic, familiar symptoms with no distress or safety risk described.',
    },
    priority: 'Breathing & circulation · acute over chronic',
    cues: 'Sudden onset, chest pain, RR 28, anxiety, post-op immobility.',
    action: 'Stay with the client, assess, apply oxygen as ordered, and escalate per protocol (provider or rapid response).',
    takeaway: 'Acute and unexpected beats chronic and expected.',
  },
  {
    id: 'q-psych',
    setting: 'Inpatient psychiatric unit · midday',
    stem: 'Which client should the nurse check on first?',
    options: [
      { id: 'a', label: 'Client with bipolar disorder, manic episode', detail: 'Pacing the hallway, talking rapidly, skipped lunch.' },
      { id: 'b', label: 'Client with major depression', detail: 'Withdrawn all week; today suddenly calm and cheerful and giving belongings to peers.' },
      { id: 'c', label: 'Client with alcohol use disorder', detail: 'Admitted 10 days ago. Asking for a nicotine patch.' },
      { id: 'd', label: 'Client taking haloperidol', detail: 'Reports mild dry mouth.' },
    ],
    correctId: 'b',
    verdict: 'A sudden lift in mood plus giving possessions away can be a warning sign of suicide risk.',
    rationale:
      'A client who has decided on a plan may seem calmer or more energetic, and giving away belongings is a recognized warning sign. This needs direct, immediate assessment.',
    whyNot: {
      a: 'Nutrition and rest matter (finger foods, a quieter space), but nothing described is an immediate threat.',
      c: 'Ten days after admission is past the usual window for acute withdrawal. This is a routine request.',
      d: 'Dry mouth is a common, manageable side effect. Offer comfort measures and keep monitoring.',
    },
    priority: 'Safety',
    cues: 'Abrupt mood change after a period of withdrawal; giving away possessions.',
    action: 'Ask directly about suicidal thoughts, maintain safety per protocol, and notify the treatment team.',
    takeaway: 'Suddenly “better” plus giving things away is a red flag, not proof of recovery.',
  },
  {
    id: 'q-lithium',
    setting: 'Outpatient behavioral health clinic',
    stem: 'The nurse is returning phone messages. Which client needs a call back first?',
    options: [
      { id: 'a', label: 'Client taking lithium', detail: 'Fine hand tremor and more thirst than usual. Last level was in the target range.' },
      { id: 'b', label: 'Client taking lithium', detail: 'Two days of vomiting and diarrhea, now with a coarse tremor and new confusion.' },
      { id: 'c', label: 'Client started on sertraline 5 days ago', detail: 'Mild nausea after doses.' },
      { id: 'd', label: 'Client taking clozapine', detail: 'Due for a routine blood count today. No symptoms.' },
    ],
    correctId: 'b',
    verdict: 'GI losses followed by a coarse tremor and confusion suggest lithium toxicity.',
    rationale:
      'Vomiting and diarrhea cause fluid and sodium loss, which can raise lithium levels. A coarse tremor plus new confusion points toward toxicity, a medical emergency.',
    whyNot: {
      a: 'A fine tremor and thirst are common side effects at therapeutic levels. Keep monitoring.',
      c: 'Mild nausea is common early in SSRI treatment and often improves. Give routine teaching.',
      d: 'Monitoring is important, but with no symptoms (such as fever or sore throat) this is routine.',
    },
    priority: 'Medication safety · physiological threat',
    cues: 'GI fluid loss, coarse (not fine) tremor, new confusion.',
    action: 'Advise urgent evaluation per protocol, and notify the prescriber about holding the dose and checking a level.',
    takeaway: 'A fine tremor is a side effect; a coarse tremor plus confusion is a warning.',
  },
];

export const CJMM_STEPS = [
  'Recognize cues',
  'Analyze cues',
  'Prioritize hypotheses',
  'Generate solutions',
  'Take action',
  'Evaluate outcomes',
];
