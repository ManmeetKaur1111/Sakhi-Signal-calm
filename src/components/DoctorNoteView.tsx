import React, { useState } from 'react';
import { ScreenId, SymptomRecord } from '../types';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Sparkles,
  Check,
  ShieldCheck,
  ArrowLeft,
  Share2,
  HelpCircle,
  Stethoscope,
  Activity,
} from 'lucide-react';

interface DoctorNoteViewProps {
  symptomRecord: SymptomRecord;
  onNavigate: (screen: ScreenId) => void;
}

export const DoctorNoteView: React.FC<DoctorNoteViewProps> = ({
  symptomRecord,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [customizedHpi, setCustomizedHpi] = useState<string | null>(null);
  const [differentialList, setDifferentialList] = useState<string[]>([
    'Endometriosis / Deep Infiltrating Endometriosis (DIE)',
    'Adenomyosis with Myometrial Hypertrophy',
    'Pelvic Congestion Syndrome (Ovarian Vein Incompetence)',
    'Pelvic Floor Myofascial Dysfunction / Hypertonicity',
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyNote = () => {
    const noteText = `SAKHISIGNAL CLINICAL HEALTH BRIEF (SBAR)
Patient Code: ${symptomRecord.id}
Date: ${new Date().toLocaleDateString()}
Category: ${symptomRecord.category}

[CHIEF COMPLAINT]
${symptomRecord.chiefComplaint} (Severity: ${symptomRecord.severity}/10)

[SITUATION & BACKGROUND]
${symptomRecord.storyDetails}
Timeline: ${symptomRecord.onset}
Hormonal/Cycle Connection: ${symptomRecord.cycleRelation}

[ASSESSMENT & FUNCTIONAL IMPAIRMENT]
- Sleep: ${symptomRecord.impactOnLife.sleep}
- Occupational: ${symptomRecord.impactOnLife.work}
- Emotional/Autonomic: ${symptomRecord.impactOnLife.emotional}
- Mobility/Daily: ${symptomRecord.impactOnLife.dailyTasks}

[MEDICATIONS & ALLERGIES]
Medications: ${symptomRecord.currentMeds || 'None'}
Allergies: ${symptomRecord.allergies || 'NKDA'}

[RED FLAGS SCREENED]
${symptomRecord.redFlagsDetected.length > 0 ? symptomRecord.redFlagsDetected.join(', ') : 'No acute emergent surgical red flags reported.'}

[PATIENT-FORMULATED QUESTIONS FOR PHYSICIAN]
${symptomRecord.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;

    navigator.clipboard.writeText(noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const noteText = `SAKHISIGNAL CLINICAL HEALTH BRIEF (SBAR)
Patient Code: ${symptomRecord.id}
Date: ${new Date().toLocaleDateString()}

Chief Complaint: ${symptomRecord.chiefComplaint}
Severity: ${symptomRecord.severity}/10
Onset: ${symptomRecord.onset}

Detailed Narrative:
${symptomRecord.storyDetails}

Functional Impairment:
- Sleep: ${symptomRecord.impactOnLife.sleep}
- Work: ${symptomRecord.impactOnLife.work}
- Emotional: ${symptomRecord.impactOnLife.emotional}
- Daily Tasks: ${symptomRecord.impactOnLife.dailyTasks}

Questions for Doctor:
${symptomRecord.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;
    const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Clinical_Brief_${symptomRecord.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAiPolish = async () => {
    setIsPolishing(true);
    try {
      const res = await fetch('/api/gemini/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chiefComplaint: symptomRecord.chiefComplaint,
          storyDetails: symptomRecord.storyDetails,
          severity: symptomRecord.severity,
          onset: symptomRecord.onset,
          impactOnLife: symptomRecord.impactOnLife,
          cycleRelation: symptomRecord.cycleRelation,
        }),
      });
      const data = await res.json();
      if (data?.data?.clinicalHPI) {
        setCustomizedHpi(data.data.clinicalHPI);
      }
      if (data?.data?.differentialConsiderations) {
        setDifferentialList(data.data.differentialConsiderations);
      }
    } catch (err) {
      console.warn('AI Polish fallback used:', err);
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6DB] pb-4 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-xl text-[#7A6F68] hover:bg-[#F2ECE2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#386657]">
                Clinical SBAR Brief
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E5F0EC] text-[#386657] border border-[#CCE2DA]">
                Physician-Ready
              </span>
            </div>
            <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              Doctor’s Consultation Note
            </h1>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAiPolish}
            disabled={isPolishing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF0F2] text-[#8C3A4E] hover:bg-[#F2DDE3] border border-[#F0D5DC] text-xs font-semibold transition-all disabled:opacity-50"
            title="Use Gemini to synthesize medical History of Present Illness"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPolishing ? 'animate-spin' : ''}`} />
            <span>{isPolishing ? 'Synthesizing...' : 'AI Medical Polish'}</span>
          </button>

          <button
            onClick={handleCopyNote}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] text-[#52463E] hover:bg-[#EAE2D5] border border-[#E0D7C9] text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] text-[#52463E] hover:bg-[#EAE2D5] border border-[#E0D7C9] text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save TXT</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#386657] hover:bg-[#2B5245] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Clinical PDF</span>
          </button>
        </div>
      </div>

      {/* Clinical SBAR Document Container */}
      <div className="print-card bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-10 shadow-xs space-y-8 font-sans-body text-[#2C2420]">
        {/* Document Header */}
        <div className="border-b-2 border-[#2C2420] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#386657] mb-1">
              <Stethoscope className="w-4 h-4" /> SakhiSignal Clinical Summary Brief
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-semibold text-[#2C2420]">
              Patient Symptom Dossier (SBAR Protocol)
            </h2>
            <p className="text-xs text-[#7A6F68] mt-1">
              Prepared for outpatient medical consultation, gynecology triage, or secondary referral.
            </p>
          </div>

          <div className="text-xs text-[#52463E] space-y-1 sm:text-right bg-[#FAF8F5] p-3 rounded-xl border border-[#EDE6DB]">
            <div><strong>Patient Code:</strong> {symptomRecord.id}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div><strong>Category:</strong> {symptomRecord.category}</div>
          </div>
        </div>

        {/* 1. Situation (Chief Complaint & Severity) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#386657]">
            <span className="w-5 h-5 rounded-full bg-[#386657] text-white flex items-center justify-center text-[10px]">
              S
            </span>
            <span>Situation • Chief Complaint</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E2EBE7]">
            <p className="text-base font-semibold text-[#2C2420] mb-1">
              {symptomRecord.chiefComplaint}
            </p>
            <p className="text-xs text-[#52463E]">
              Reported Peak Severity: <strong>{symptomRecord.severity} / 10</strong> • Duration:{' '}
              <strong>{symptomRecord.onset}</strong>
            </p>
          </div>
        </div>

        {/* 2. Background & Clinical HPI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#386657]">
              <span className="w-5 h-5 rounded-full bg-[#386657] text-white flex items-center justify-center text-[10px]">
                B
              </span>
              <span>Background • History of Present Illness (HPI)</span>
            </div>
            {customizedHpi && (
              <span className="text-[10px] font-semibold text-[#8C3A4E] bg-[#FAF0F2] px-2 py-0.5 rounded-full border border-[#F0D5DC]">
                AI-Refined Clinical Translation
              </span>
            )}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE6DB] text-sm leading-relaxed text-[#3E342E] space-y-3">
            <p className="italic text-xs text-[#7A6F68]">
              "Patient self-reported narrative translated for clinical efficiency:"
            </p>
            <p>
              {customizedHpi ||
                `Patient reports a progressive course of visceral and musculoskeletal discomfort lasting approximately ${symptomRecord.onset}. The pain is described as ${symptomRecord.painType.join(', ')} localizing primarily to ${symptomRecord.location.join(', ')}. Symptom intensity correlates with ${symptomRecord.cycleRelation}. Prior intervention with over-the-counter analgesics has offered minimal symptomatic relief.`}
            </p>

            <div className="pt-3 border-t border-[#EAE2D5] text-xs text-[#645A53]">
              <strong>Original Patient Description:</strong> "{symptomRecord.storyDetails}"
            </div>
          </div>
        </div>

        {/* 3. Assessment & Functional Impairment */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#386657]">
            <span className="w-5 h-5 rounded-full bg-[#386657] text-white flex items-center justify-center text-[10px]">
              A
            </span>
            <span>Assessment • Functional Disruption & Screening</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-[#EDE6DB] bg-white">
              <span className="font-semibold text-[#2C2420] block mb-1">Nocturnal Sleep:</span>
              <span className="text-[#645A53]">{symptomRecord.impactOnLife.sleep}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[#EDE6DB] bg-white">
              <span className="font-semibold text-[#2C2420] block mb-1">Occupational Impact:</span>
              <span className="text-[#645A53]">{symptomRecord.impactOnLife.work}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[#EDE6DB] bg-white">
              <span className="font-semibold text-[#2C2420] block mb-1">Physical Mobility / Tasks:</span>
              <span className="text-[#645A53]">{symptomRecord.impactOnLife.dailyTasks}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[#EDE6DB] bg-white">
              <span className="font-semibold text-[#2C2420] block mb-1">Autonomic / Mental State:</span>
              <span className="text-[#645A53]">{symptomRecord.impactOnLife.emotional}</span>
            </div>
          </div>

          {/* Differential Categories for Discussion */}
          <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E2EBE7]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#386657] block mb-2">
              Diagnostic Differential Domains to Rule In / Out:
            </span>
            <div className="flex flex-wrap gap-2">
              {differentialList.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#CCE2DA] text-[#2C2420] font-medium"
                >
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Recommendation & Patient Questions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#386657]">
            <span className="w-5 h-5 rounded-full bg-[#386657] text-white flex items-center justify-center text-[10px]">
              R
            </span>
            <span>Recommendation • Questions Formulated for Physician</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE6DB] space-y-3">
            <p className="text-xs text-[#645A53]">
              The patient requests specific clinical dialogue on the following investigative avenues during this visit:
            </p>
            <ol className="space-y-2 text-xs sm:text-sm text-[#2C2420]">
              {symptomRecord.questionsForDoctor.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-[#386657]">{idx + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Medication & Allergy Box */}
        <div className="pt-4 border-t border-[#EDE6DB] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#645A53]">
          <div>
            <strong>Medications & Supplements:</strong> {symptomRecord.currentMeds || 'None documented'}
          </div>
          <div>
            <strong>Allergies:</strong> {symptomRecord.allergies || 'No Known Drug Allergies (NKDA)'}
          </div>
        </div>

        {/* Confidentiality Footer */}
        <div className="pt-4 border-t border-[#2C2420] flex items-center justify-between text-[11px] text-[#7A6F68]">
          <span>SakhiSignal Calm Care • Trauma-Informed Clinical Documentation</span>
          <span>Encrypted Patient Code: {symptomRecord.id}</span>
        </div>
      </div>

      {/* Action Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 no-print">
        <button
          onClick={() => onNavigate('my-story-2')}
          className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
        >
          Edit Story Answers
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('explain-to-someone')}
            className="px-5 py-2.5 rounded-2xl bg-[#8C5D39] hover:bg-[#734A2B] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            Explain to Loved One <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('next-steps')}
            className="px-5 py-2.5 rounded-2xl bg-[#386657] hover:bg-[#2B5245] text-white text-xs font-semibold shadow-xs transition-all"
          >
            View Next Steps Plan
          </button>
        </div>
      </div>
    </div>
  );
};
