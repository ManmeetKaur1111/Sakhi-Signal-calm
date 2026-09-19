import React, { useState } from 'react';
import { ScreenId, SymptomRecord, RiskLevel } from '../types';
import { SAFETY_RED_FLAGS, HELPLINES } from '../data/mockData';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface SafetyCheckViewProps {
  currentScreen: 'safety-check' | 'your-safety-check';
  symptomRecord: SymptomRecord;
  onUpdateRecord: (updated: Partial<SymptomRecord>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SafetyCheckView: React.FC<SafetyCheckViewProps> = ({
  currentScreen,
  symptomRecord,
  onUpdateRecord,
  onNavigate,
}) => {
  const [selectedFlagIds, setSelectedFlagIds] = useState<string[]>(
    symptomRecord.redFlagsDetected || []
  );

  const toggleFlag = (id: string) => {
    let updated: string[];
    if (selectedFlagIds.includes(id)) {
      updated = selectedFlagIds.filter((fId) => fId !== id);
    } else {
      updated = [...selectedFlagIds, id];
    }
    setSelectedFlagIds(updated);

    // Calculate urgency
    const hasUrgent = updated.some((fId) => {
      const flag = SAFETY_RED_FLAGS.find((rf) => rf.id === fId);
      return flag?.urgency === 'urgent';
    });

    const calculatedRisk: RiskLevel = hasUrgent
      ? 'urgent'
      : updated.length > 0 || symptomRecord.severity >= 7
      ? 'moderate'
      : 'low';

    onUpdateRecord({
      redFlagsDetected: updated,
      safetyRisk: calculatedRisk,
    });
  };

  const currentRisk: RiskLevel =
    selectedFlagIds.some(
      (fId) => SAFETY_RED_FLAGS.find((rf) => rf.id === fId)?.urgency === 'urgent'
    )
      ? 'urgent'
      : selectedFlagIds.length > 0 || symptomRecord.severity >= 7
      ? 'moderate'
      : 'low';

  const riskStyles = {
    low: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badge: 'Routine Care / Non-Emergency',
      description:
        'No immediate acute red flags detected. You are safe to plan a routine physician or gynecologist consultation at your convenience.',
    },
    moderate: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      pill: 'bg-amber-100 text-amber-800 border-amber-300',
      badge: 'Moderate Concern • Book Within 24–72h',
      description:
        'Your symptoms represent persistent discomfort and functional impairment. Schedule an in-person or telehealth physician evaluation within the next 1 to 3 days.',
    },
    urgent: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      pill: 'bg-rose-100 text-rose-800 border-rose-300',
      badge: 'Immediate Medical Attention Recommended',
      description:
        'One or more red flags are present that require urgent medical evaluation or emergency hospital triage without delay.',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EDE6DB] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-xl text-[#7A6F68] hover:bg-[#F2ECE2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C45E5B]">
                {currentScreen === 'safety-check' ? 'Confidential Screening' : 'Your Safety Results'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FCE8E7] text-[#C45E5B] border border-[#F5D0CE]">
                Step 3 of 3
              </span>
            </div>
            <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              {currentScreen === 'safety-check'
                ? 'Check for Urgent Red Flags & Personal Safety'
                : 'Your Safety Check & Triage Assessment'}
            </h1>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('safety-check')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentScreen === 'safety-check'
                ? 'bg-[#C45E5B] text-white shadow-xs'
                : 'bg-[#F2ECE2] text-[#645A53] hover:bg-[#E5DDD0]'
            }`}
          >
            Checklist
          </button>
          <button
            onClick={() => onNavigate('your-safety-check')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              currentScreen === 'your-safety-check'
                ? 'bg-[#C45E5B] text-white shadow-xs'
                : 'bg-[#F2ECE2] text-[#645A53] hover:bg-[#E5DDD0]'
            }`}
          >
            Results Card
          </button>
        </div>
      </div>

      {/* Screen 1: The Red Flag Checklist */}
      {currentScreen === 'safety-check' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#F5D8D6] text-xs sm:text-sm text-[#645A53] leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C45E5B] shrink-0 mt-0.5" />
            <div>
              <strong>Trauma-Informed Confidentiality:</strong> Please review these indicators honestly. Checking any of these items will help Sakhi prioritize your safety recommendations and prepare proper emergency alerts.
            </div>
          </div>

          <div className="space-y-3">
            {SAFETY_RED_FLAGS.map((flag) => {
              const isChecked = selectedFlagIds.includes(flag.id);
              return (
                <div
                  key={flag.id}
                  onClick={() => toggleFlag(flag.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                    isChecked
                      ? 'border-[#C45E5B] bg-[#FFF5F5] shadow-xs'
                      : 'border-[#EDE6DB] bg-white hover:border-[#C45E5B]/40 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-[#C45E5B] border-[#C45E5B] text-white'
                        : 'border-[#CDC4B6] bg-white group-hover:border-[#C45E5B]'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#2C2420]">
                        {flag.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          flag.urgency === 'urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {flag.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-[#645A53] mt-1.5 leading-relaxed">
                      {flag.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation to Results */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => onNavigate('adaptive-questions')}
              className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
            >
              Back to Adaptive Triage
            </button>
            <button
              onClick={() => onNavigate('your-safety-check')}
              className="px-6 py-2.5 rounded-2xl bg-[#C45E5B] hover:bg-[#A84A47] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              View Your Safety Results & Resources <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Your Safety Check Result Card (matching `your_safety_check`) */}
      {currentScreen === 'your-safety-check' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Risk Result Card */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 shadow-xs space-y-4 ${riskStyles[currentRisk].bg}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${riskStyles[currentRisk].pill}`}
              >
                {riskStyles[currentRisk].badge}
              </span>
              <span className="text-xs text-[#645A53]">
                Evaluated based on {selectedFlagIds.length} flagged indicators
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif-display font-semibold">
              {currentRisk === 'urgent'
                ? 'High Urgency Alert: Immediate Care Advised'
                : currentRisk === 'moderate'
                ? 'Moderate Alert: Timely Medical Consultation Recommended'
                : 'Low Acute Risk: Proceed with Scheduled Care'}
            </h2>

            <p className="text-sm leading-relaxed">
              {riskStyles[currentRisk].description}
            </p>

            {selectedFlagIds.length > 0 && (
              <div className="pt-3 border-t border-black/10">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                  Flags Reported in Your Assessment:
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {selectedFlagIds.map((fId) => {
                    const rf = SAFETY_RED_FLAGS.find((item) => item.id === fId);
                    return (
                      <li key={fId} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{rf?.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* 24/7 Verified Helplines & Emergency Direct Actions */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C45E5B] mb-1">
                <PhoneCall className="w-4 h-4" /> 24/7 Emergency & Women’s Helplines
              </div>
              <h3 className="text-xl font-serif-display font-medium text-[#2C2420]">
                Immediate, Free & Confidential Support
              </h3>
              <p className="text-xs text-[#7A6F68]">
                All lines are toll-free, operating 24 hours a day, 7 days a week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HELPLINES.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-[#EDE6DB] bg-[#FAF8F5] hover:border-[#D5C7B7] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-[#2C2420]">{hl.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EDE6DB] text-[#52463E]">
                        {hl.available}
                      </span>
                    </div>
                    <p className="text-xs text-[#645A53] leading-relaxed mb-4">
                      {hl.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#EDE6DB]">
                    <a
                      href={`tel:${hl.number.replace(/[^0-9]/g, '')}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {hl.number}</span>
                    </a>
                    {hl.sms && (
                      <a
                        href={`sms:${hl.sms}`}
                        className="py-2 px-3 rounded-xl bg-[#EAE2D5] hover:bg-[#DDD4C5] text-[#52463E] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>SMS</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => onNavigate('safety-check')}
              className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
            >
              Modify Checklist
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('doctor-note')}
                className="px-6 py-2.5 rounded-2xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <FileText className="w-4 h-4" /> Open Clinical Doctor Note
              </button>
              <button
                onClick={() => onNavigate('next-steps')}
                className="px-5 py-2.5 rounded-2xl bg-[#547366] hover:bg-[#445E53] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                View Next Steps Roadmap <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
