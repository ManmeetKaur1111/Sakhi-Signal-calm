import { AdaptiveQuestion, Helpline, SafetyRedFlag, SymptomRecord } from '../types';

export const INITIAL_SYMPTOM_RECORD: SymptomRecord = {
  id: 'sakhi-rec-8492',
  createdAt: new Date().toISOString(),
  category: 'Pelvic & Reproductive Health',
  chiefComplaint: 'Sharp, recurring lower abdominal and pelvic cramps radiating to lower back',
  storyDetails:
    'For the past three weeks, I have been experiencing intense lower abdominal aching that sharpens into burning cramps, especially towards late afternoon. It has been waking me up at night and simple painkillers like paracetamol barely take the edge off. I feel constantly exhausted, foggy-headed, and worried that something serious is being overlooked.',
  onset: '3 to 4 weeks ago, progressively worsening',
  severity: 7,
  painType: ['Sharp cramping', 'Deep burning ache', 'Radiating to lower back and thighs'],
  location: ['Lower abdomen (bilateral)', 'Pelvic floor', 'Lumbar back'],
  impactOnLife: {
    sleep: 'Interrupted 3-4 times a night due to acute throbbing spikes',
    work: 'Unable to sit through 1-hour meetings without heat pack; missed 2 workdays',
    emotional: 'High anxiety, feeling invalidated by previous advice to "just take hot tea"',
    dailyTasks: 'Walking more than 15 minutes causes flare-ups; appetite depressed',
  },
  cycleRelation: 'Symptoms intensify 5 days prior to menstruation and persist post-bleed',
  allergies: 'Penicillin (mild hives), Sulfa drugs (NKDA confirmed)',
  currentMeds: 'Ibuprofen 400mg PRN (ineffective), Multivitamin, Iron supplement',
  redFlagsDetected: [],
  safetyRisk: 'moderate',
  questionsForDoctor: [
    'Could these symptoms indicate endometriosis, adenomyosis, or pelvic congestion syndrome?',
    'What imaging (e.g., pelvic ultrasound, transvaginal Doppler, or MRI) is most appropriate next?',
    'Are there non-opioid multimodal pain management options that target nerve or inflammatory pathways?',
    'What specific warning signs (e.g., acute unilateral pain, fever) should prompt me to go to emergency triage?',
  ],
};

export const ADAPTIVE_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: 'q-location-pattern',
    title: 'Where do you feel the discomfort most prominently?',
    subtitle: 'Select all specific areas where sensations localize or radiate.',
    category: 'Symptom Mapping',
    type: 'multiple',
    options: [
      { id: 'loc-pelvic-center', label: 'Central Lower Abdomen', description: 'Just below the navel, deep in the pelvis', clinicalTag: 'Suprapubic / uterine visceral' },
      { id: 'loc-unilateral', label: 'One-Sided Sharp Twisting', description: 'Predominantly left or right lower quadrant', isRedFlag: true, clinicalTag: 'Adnexal / ovarian concern' },
      { id: 'loc-radiating-back', label: 'Lower Back & Sacrum', description: 'Radiating downward across hips and posterior thighs', clinicalTag: 'Sacral nerve plexus radiation' },
      { id: 'loc-epigastric', label: 'Upper Stomach / Ribs', description: 'Stomach cramping, nausea, indigestion', clinicalTag: 'Epigastric GI crossover' },
    ],
  },
  {
    id: 'q-timing-cycle',
    title: 'How does this connect with your menstrual cycle or hormonal rhythm?',
    subtitle: 'Understanding hormonal timing helps differentiate cyclical vs persistent etiologies.',
    category: 'Hormonal Correlation',
    type: 'single',
    options: [
      { id: 'timing-luteal', label: 'Worsens 3–7 days before period (Luteal phase)', description: 'Peaks before bleeding and subsides slightly after' },
      { id: 'timing-ovulation', label: 'Mid-cycle spike (Around day 12–16)', description: 'Sudden sharp twinges lasting 1–3 days' },
      { id: 'timing-constant', label: 'Constant daily ache with random flares', description: 'No clear correlation with cycle bleeding' },
      { id: 'timing-postpartum', label: 'Postpartum / Perimenopausal shift', description: 'Irregular frequency with hot flashes or mood drops' },
    ],
  },
  {
    id: 'q-associated-symptoms',
    title: 'Are you experiencing any associated bodily sensations?',
    subtitle: 'These help your physician understand autonomic nervous system and systemic involvement.',
    category: 'Systemic Clues',
    type: 'multiple',
    options: [
      { id: 'assoc-fatigue', label: 'Profound, unrefreshing exhaustion', description: 'Waking up tired regardless of sleep hours' },
      { id: 'assoc-gi', label: 'Bloating, nausea, or alternating bowel shifts', description: '"Endo-belly", painful bowel movements' },
      { id: 'assoc-urinary', label: 'Urinary urgency or painful bladder filling', description: 'Feeling pressure without active UTI infection' },
      { id: 'assoc-dizziness', label: 'Lightheadedness upon standing / postural shifts', description: 'POTS-like sensations or brain fog' },
    ],
  },
  {
    id: 'q-prior-validation',
    title: 'How has your healthcare journey felt so far?',
    subtitle: 'Your psychological comfort and past clinical encounters shape how we construct your note.',
    category: 'Care Experience',
    type: 'single',
    options: [
      { id: 'exp-dismissed', label: 'I have felt dismissed or told "pain is normal"', description: 'We will emphasize objective functional impairment and SBAR clinical framing.' },
      { id: 'exp-first-time', label: 'This is my first time seeking medical attention for this', description: 'We will prepare a gentle, comprehensive starting history.' },
      { id: 'exp-second-opinion', label: 'Seeking a second opinion or specialist referral', description: 'We will formulate precise clinical questions for an expert review.' },
    ],
  },
];

export const SAFETY_RED_FLAGS: SafetyRedFlag[] = [
  {
    id: 'rf-sudden-severe',
    label: 'Sudden, thunderclap or agonizing unilateral pain that doubled you over',
    category: 'physical',
    urgency: 'urgent',
    explanation: 'Could indicate acute ovarian torsion, ectopic pregnancy, or ruptured cyst requiring immediate imaging.',
  },
  {
    id: 'rf-heavy-bleeding',
    label: 'Soaking through 2+ sanitary pads per hour for 2 consecutive hours, or passing golf-ball clots',
    category: 'physical',
    urgency: 'urgent',
    explanation: 'Risk of acute hemodynamic blood loss and anemia.',
  },
  {
    id: 'rf-fever-chills',
    label: 'Fever above 101°F (38.3°C) accompanied by foul-smelling discharge or pelvic tenderness',
    category: 'physical',
    urgency: 'urgent',
    explanation: 'Red flag for acute Pelvic Inflammatory Disease (PID) or systemic infection.',
  },
  {
    id: 'rf-fainting',
    label: 'Episodes of syncope (fainting), profound dizziness, or cold clammy skin',
    category: 'physical',
    urgency: 'urgent',
    explanation: 'Sign of internal bleeding, shock, or severe dehydration.',
  },
  {
    id: 'rf-emotional-crisis',
    label: 'Feeling completely overwhelmed, hopeless, or thoughts of not wanting to wake up',
    category: 'emotional',
    urgency: 'urgent',
    explanation: 'Immediate crisis support and compassionate psychological containment is available 24/7.',
  },
  {
    id: 'rf-partner-safety',
    label: 'Someone at home is controlling your access to healthcare, medicines, phone, or causing physical fear',
    category: 'partner_safety',
    urgency: 'urgent',
    explanation: 'Trauma-informed domestic safety protocols; confidential exit and shelter support.',
  },
  {
    id: 'rf-persistent-moderate',
    label: 'Pain worsening steadily over 2+ weeks, unresponsive to standard over-the-counter NSAIDs',
    category: 'physical',
    urgency: 'moderate',
    explanation: 'Warrants scheduling a physician evaluation within 24 to 72 hours for diagnostic workup.',
  },
];

export const HELPLINES: Helpline[] = [
  {
    name: "National Women's Helpline (24/7)",
    number: '181',
    sms: '181',
    available: '24 hours / 7 days, Free & Confidential',
    type: 'national_women',
    description: 'Toll-free emergency & counseling support for women facing distress, violence, or medical crisis.',
  },
  {
    name: 'National Emergency Services',
    number: '112',
    available: 'Immediate Dispatch',
    type: 'emergency',
    description: 'Universal emergency response for medical ambulance, police, or rescue services.',
  },
  {
    name: 'Crisis Suicide & Mental Health Lifeline',
    number: '988',
    sms: 'Text HOME to 741741',
    available: '24/7 Confidential Mental Health',
    type: 'crisis',
    description: 'Compassionate crisis counselors trained in emotional de-escalation and trauma care.',
  },
  {
    name: 'National Domestic Violence Hotline',
    number: '1-800-799-SAFE (7233)',
    sms: 'Text "START" to 88788',
    available: '24/7 Confidential & Camouflaged',
    type: 'domestic_safety',
    description: 'Safety planning, confidential shelter, legal resources, and supportive guidance.',
  },
];

export const SUGGESTED_SYMPTOM_CHIPS = [
  'Deep Pelvic Aching',
  'Pain with Menstruation (Dysmenorrhea)',
  'Painful Intercourse (Dyspareunia)',
  'Severe Unexplained Fatigue',
  'Postpartum Emotional Overwhelm',
  'Irregular or Heavy Cycles',
  'Persistent Lower Back Stiffness',
  'Digestive Cramping ("Endo-belly")',
  'Bladder Pressure & Urgency',
  'Brain Fog & Concentration Drop',
  'Heart Palpitations & Restlessness',
  'Feeling Dismissed by Doctors',
];
