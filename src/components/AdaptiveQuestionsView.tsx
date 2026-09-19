import React, { useState } from 'react';
import { ScreenId, SymptomRecord } from '../types';
import { ADAPTIVE_QUESTIONS } from '../data/mockData';
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdaptiveQuestionsViewProps {
  symptomRecord: SymptomRecord;
  onUpdateRecord: (updated: Partial<SymptomRecord>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AdaptiveQuestionsView: React.FC<AdaptiveQuestionsViewProps> = ({
  symptomRecord,
  onUpdateRecord,
  onNavigate,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string[] }>({
    'q-location-pattern': ['loc-pelvic-center', 'loc-radiating-back'],
    'q-timing-cycle': ['timing-luteal'],
    'q-associated-symptoms': ['assoc-fatigue', 'assoc-gi'],
    'q-prior-validation': ['exp-dismissed'],
  });

  const question = ADAPTIVE_QUESTIONS[currentQuestionIdx];
  const progressPercent = Math.round(
    ((currentQuestionIdx + 1) / ADAPTIVE_QUESTIONS.length) * 100
  );

  const toggleOption = (optionId: string) => {
    const current = selectedAnswers[question.id] || [];
    if (question.type === 'single') {
      setSelectedAnswers({
        ...selectedAnswers,
        [question.id]: [optionId],
      });
    } else {
      if (current.includes(optionId)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [question.id]: current.filter((id) => id !== optionId),
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [question.id]: [...current, optionId],
        });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < ADAPTIVE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      onNavigate('safety-check');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else {
      onNavigate('my-story-2');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#7B5B82]/10 text-[#7B5B82]">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7B5B82]">
                Adaptive Care Triage
              </span>
              <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
                {question.category}
              </h1>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#7A6F68] bg-[#F2ECE2] px-3 py-1.5 rounded-full border border-[#E5DDD0]">
            Question {currentQuestionIdx + 1} of {ADAPTIVE_QUESTIONS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#EAE2D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8C3A4E] to-[#7B5B82] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-display font-medium text-[#2C2420] mb-2 leading-snug">
            {question.title}
          </h2>
          <p className="text-sm text-[#645A53]">{question.subtitle}</p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = (selectedAnswers[question.id] || []).includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                  isSelected
                    ? 'border-[#7B5B82] bg-[#FAF4FC] shadow-xs'
                    : 'border-[#EAE2D5] bg-[#FAF8F5] hover:border-[#7B5B82]/40 hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-[#7B5B82] border-[#7B5B82] text-white'
                      : 'border-[#CDC4B6] bg-white group-hover:border-[#7B5B82]'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#2C2420]">
                      {opt.label}
                    </span>
                    {opt.isRedFlag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                        Important Indicator
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="text-xs text-[#645A53] mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  )}
                  {opt.clinicalTag && (
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-md bg-[#EDE6DB] text-[#52463E]">
                      Clinical tag: {opt.clinicalTag}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Comfort Note */}
        <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EDE6DB] flex items-center gap-2.5 text-xs text-[#52463E]">
          <ShieldCheck className="w-4 h-4 text-[#547366] shrink-0" />
          <span>
            Every answer is confidential and purely used to organize your clinical brief. You can skip any question at will.
          </span>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleNext}
            className="px-4 py-2 text-xs font-medium text-[#7A6F68] hover:text-[#2C2420] transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-2xl bg-[#7B5B82] hover:bg-[#68496E] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            {currentQuestionIdx < ADAPTIVE_QUESTIONS.length - 1 ? (
              <>
                Next Question <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Proceed to Safety Check <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
