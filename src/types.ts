export type ScreenId =
  | 'home'
  | 'my-story-1'
  | 'my-story-2'
  | 'adaptive-questions'
  | 'safety-check'
  | 'your-safety-check'
  | 'doctor-note'
  | 'explain-to-someone'
  | 'next-steps';

export type DistressLevel = 'mild' | 'moderate' | 'significant' | 'severe';

export type RiskLevel = 'low' | 'moderate' | 'urgent';

export interface SymptomRecord {
  id: string;
  createdAt: string;
  category: string;
  chiefComplaint: string;
  storyDetails: string;
  onset: string;
  severity: number; // 1-10
  painType: string[];
  location: string[];
  impactOnLife: {
    sleep: string;
    work: string;
    emotional: string;
    dailyTasks: string;
  };
  cycleRelation: string;
  allergies: string;
  currentMeds: string;
  redFlagsDetected: string[];
  safetyRisk: RiskLevel;
  questionsForDoctor: string[];
}

export interface AdaptiveQuestion {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    label: string;
    description?: string;
    isRedFlag?: boolean;
    clinicalTag?: string;
  }[];
}

export interface SafetyRedFlag {
  id: string;
  label: string;
  category: 'physical' | 'emotional' | 'partner_safety';
  urgency: RiskLevel;
  explanation: string;
}

export interface DoctorNoteData {
  patientCode: string;
  date: string;
  chiefComplaint: string;
  sbar: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
  clinicalHPI: string;
  symptomProgression: string;
  functionalImpactSummary: string;
  redFlagsScreenedOut: string[];
  redFlagsPresent: string[];
  suggestedQuestions: string[];
  patientNotes: string;
}

export interface TrustedScript {
  recipient: 'partner' | 'parent' | 'friend' | 'colleague' | 'counselor';
  tone: 'gentle' | 'direct' | 'reassuring' | 'urgent';
  conversationStarter: string;
  scriptBody: string;
  actionRequests: string[];
  boundaries: string[];
  textMessageVersion: string;
}

export interface Helpline {
  name: string;
  number: string;
  sms?: string;
  available: string;
  type: 'national_women' | 'emergency' | 'crisis' | 'domestic_safety';
  description: string;
}
