import React, { useState } from 'react';
import { ScreenId, SymptomRecord } from '../types';
import { SUGGESTED_SYMPTOM_CHIPS } from '../data/mockData';
import { APP_IMAGES } from '../data/assets';
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Heart,
  Calendar,
  AlertCircle,
  FileCheck2,
  Check,
  Plus,
  Trash2,
  HelpCircle,
} from 'lucide-react';

interface MyStoryViewProps {
  currentScreen: 'my-story-1' | 'my-story-2';
  symptomRecord: SymptomRecord;
  onUpdateRecord: (updated: Partial<SymptomRecord>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const MyStoryView: React.FC<MyStoryViewProps> = ({
  currentScreen,
  symptomRecord,
  onUpdateRecord,
  onNavigate,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(
    typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  );

  const [newQuestion, setNewQuestion] = useState('');

  // Voice speech-to-text handler
  const handleVoiceToggle = () => {
    if (!speechSupported) {
      alert('Speech-to-text is not supported by your browser. You can type freely in the text box below.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onUpdateRecord({
            storyDetails: symptomRecord.storyDetails
              ? `${symptomRecord.storyDetails} ${transcript}`
              : transcript,
          });
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsRecording(false);
    }
  };

  const handleChipClick = (chip: string) => {
    if (symptomRecord.painType.includes(chip)) {
      onUpdateRecord({
        painType: symptomRecord.painType.filter((p) => p !== chip),
      });
    } else {
      onUpdateRecord({
        painType: [...symptomRecord.painType, chip],
      });
    }
  };

  const severityLabels: { [key: number]: string } = {
    1: 'Mild awareness • Does not interfere with routine',
    2: 'Mild ache • Easily ignored with mild rest',
    3: 'Noticeable discomfort • Minor distraction',
    4: 'Moderate distress • Requires conscious coping or heating pad',
    5: 'Distracting ache • Slows down work and daily tasks',
    6: 'Significant distress • Concentrating is difficult',
    7: 'Debilitating pain • Missed work, waking at night',
    8: 'Severe cramping • Hard to walk or speak easily',
    9: 'Agonizing • Bedbound, crying out, nausea from pain',
    10: 'Unbearable emergency • Immediate triage required',
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    onUpdateRecord({
      questionsForDoctor: [...symptomRecord.questionsForDoctor, newQuestion.trim()],
    });
    setNewQuestion('');
  };

  const handleRemoveQuestion = (idx: number) => {
    onUpdateRecord({
      questionsForDoctor: symptomRecord.questionsForDoctor.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Progress & Stepper */}
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
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4E]">
                {currentScreen === 'my-story-1' ? 'Part 1: In Your Own Words' : 'Part 2: Impact & Context'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAE2D5] text-[#52463E]">
                {currentScreen === 'my-story-1' ? 'Step 1 of 2' : 'Step 2 of 2'}
              </span>
            </div>
            <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              {currentScreen === 'my-story-1'
                ? 'Tell Us What Your Body Is Feeling'
                : 'How This Affects Your Life & Next Questions'}
            </h1>
          </div>
        </div>

        {/* Step pill buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('my-story-1')}
            className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'my-story-1'
                ? 'bg-[#8C3A4E] text-white'
                : 'bg-[#EDE6DB] text-[#645A53] hover:bg-[#DDD4C5]'
            }`}
          >
            1
          </button>
          <div className="w-4 h-0.5 bg-[#DDD4C5]" />
          <button
            onClick={() => onNavigate('my-story-2')}
            className={`w-8 h-8 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'my-story-2'
                ? 'bg-[#8C3A4E] text-white'
                : 'bg-[#EDE6DB] text-[#645A53] hover:bg-[#DDD4C5]'
            }`}
          >
            2
          </button>
        </div>
      </div>

      {/* Screen 1: Storytelling, Voice dictation, Severity scale, Quick chips */}
      {currentScreen === 'my-story-1' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Supportive Sisterhood & Mascot Companion Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#FBF5ED] via-[#FDFBF7] to-[#F5ECE1] border border-[#ECD9C6] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={APP_IMAGES.sakhiCartoonMascot}
                alt="Sakhi cartoon companion"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8C3A4E]/30 shrink-0 shadow-xs"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8C3A4E] uppercase tracking-wider block">
                  Sakhi is listening with you
                </span>
                <p className="text-xs sm:text-sm text-[#4E423A] leading-relaxed">
                  "Don't worry about clinical jargon or sounding 'dramatic'. Describe your sensations exactly as you feel them in your own voice."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 px-3.5 py-1.5 rounded-2xl bg-white/80 border border-[#E5DDD0]">
              <img
                src={APP_IMAGES.girlCalmPortrait}
                alt="Young woman feeling heard"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-[#8C3A4E]/30"
              />
              <span className="text-xs text-[#52463E] font-medium">Safe & Confidential</span>
            </div>
          </div>

          {/* Main Story Narrative Box */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-[#2C2420]">
                Your Story & Primary Symptoms
              </label>
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isRecording
                    ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                    : 'bg-[#FAF6F0] text-[#645A53] hover:bg-[#EAE2D5] border border-[#EDE6DB]'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#8C3A4E]" />}
                <span>{isRecording ? 'Listening... Click to stop' : 'Voice Dictate'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={symptomRecord.storyDetails}
              onChange={(e) => onUpdateRecord({ storyDetails: e.target.value })}
              placeholder="Describe when it happens, what sensations you feel (sharp, deep, burning, dull, radiating), what makes it better or worse, and how you feel emotionally..."
              className="w-full p-4 rounded-2xl border border-[#E0D7C9] bg-[#FAF8F5] text-[#2C2420] placeholder-[#A3968C] focus:bg-white focus:border-[#8C3A4E] focus:outline-none text-sm sm:text-base leading-relaxed transition-all resize-y"
            />

            {/* Quick Trigger Chips */}
            <div>
              <p className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider mb-2.5">
                Quick-add common descriptors to your record:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SYMPTOM_CHIPS.map((chip, idx) => {
                  const isSelected = symptomRecord.painType.includes(chip);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#8C3A4E] text-white border-[#8C3A4E] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#52463E] border-[#E8DFC8] hover:border-[#8C3A4E]/40 hover:bg-[#F5EDE1]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{chip}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Severity Slider */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#2C2420]">
                  Overall Discomfort & Pain Scale (1 to 10)
                </h3>
                <p className="text-xs text-[#7A6F68]">
                  How distressing or limiting has this felt at its peak over recent days?
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#8C3A4E]/10 border border-[#8C3A4E]/20 text-[#8C3A4E] font-serif-display text-2xl font-bold flex items-center justify-center">
                {symptomRecord.severity}
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={symptomRecord.severity}
              onChange={(e) => onUpdateRecord({ severity: parseInt(e.target.value, 10) })}
              className="w-full h-2.5 bg-[#EAE2D5] rounded-lg appearance-none cursor-pointer accent-[#8C3A4E]"
            />

            <div className="flex justify-between text-[11px] text-[#9E9087] font-medium">
              <span>1 (Mild)</span>
              <span>3 (Noticeable)</span>
              <span>5 (Moderate)</span>
              <span>7 (Debilitating)</span>
              <span>10 (Emergency)</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EDE6DB] flex items-center gap-2.5 text-xs text-[#52463E]">
              <AlertCircle className="w-4 h-4 text-[#8C3A4E] shrink-0" />
              <span>
                <strong>Level {symptomRecord.severity}:</strong> {severityLabels[symptomRecord.severity]}
              </span>
            </div>
          </div>

          {/* Timeline & Onset */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-[#2C2420] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C3A4E]" />
              Timeline & Symptom Duration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  When did this start?
                </label>
                <input
                  type="text"
                  value={symptomRecord.onset}
                  onChange={(e) => onUpdateRecord({ onset: e.target.value })}
                  placeholder="e.g. 3 weeks ago, after last period"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Menstrual cycle connection
                </label>
                <input
                  type="text"
                  value={symptomRecord.cycleRelation}
                  onChange={(e) => onUpdateRecord({ cycleRelation: e.target.value })}
                  placeholder="e.g. Worsens 4 days before bleeding, persists during"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => onNavigate('my-story-2')}
              className="px-6 py-2.5 rounded-2xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              Continue to Impact & Context <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Impact on daily life, questions for doctor, medications */}
      {currentScreen === 'my-story-2' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Supportive Sisterhood Photo & Cozy Relief Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#FAF3EB] via-[#FDFBF7] to-[#F5ECE1] border border-[#ECD9C6] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src={APP_IMAGES.girlsSupportHero}
                alt="Young women supporting one another"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8C3A4E] uppercase tracking-wider block">
                  Why Functional Impact Matters
                </span>
                <p className="text-xs sm:text-sm text-[#4E423A] leading-relaxed">
                  "Doctors take symptoms significantly more seriously when tied to objective disruptions like missed work, disturbed sleep, or curtailed movement."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 px-3.5 py-1.5 rounded-2xl bg-white/80 border border-[#E5DDD0]">
              <img
                src={APP_IMAGES.cartoonCozyRelief}
                alt="Cozy cartoon girl resting"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-[#547366]/30"
              />
              <span className="text-xs text-[#52463E] font-medium">Honor Your Resting Time</span>
            </div>
          </div>

          {/* Functional Impact Cards */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-semibold text-[#2C2420]">
                Daily Life & Functional Impairment
              </h3>
              <p className="text-xs text-[#7A6F68]">
                Physicians value objective functional markers. Documenting how symptoms disrupt sleep, mobility, and work helps prevent medical dismissal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Sleep Disruption
                </label>
                <input
                  type="text"
                  value={symptomRecord.impactOnLife.sleep}
                  onChange={(e) =>
                    onUpdateRecord({
                      impactOnLife: { ...symptomRecord.impactOnLife, sleep: e.target.value },
                    })
                  }
                  placeholder="e.g. Wakes me 2-3 times at night from cramping"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Work / School / Commute
                </label>
                <input
                  type="text"
                  value={symptomRecord.impactOnLife.work}
                  onChange={(e) =>
                    onUpdateRecord({
                      impactOnLife: { ...symptomRecord.impactOnLife, work: e.target.value },
                    })
                  }
                  placeholder="e.g. Cannot sit in chairs > 45 mins; taken 2 sick days"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Emotional & Mental Well-being
                </label>
                <input
                  type="text"
                  value={symptomRecord.impactOnLife.emotional}
                  onChange={(e) =>
                    onUpdateRecord({
                      impactOnLife: { ...symptomRecord.impactOnLife, emotional: e.target.value },
                    })
                  }
                  placeholder="e.g. Heightened anxiety, fear of being dismissed"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Physical Movement & Chores
                </label>
                <input
                  type="text"
                  value={symptomRecord.impactOnLife.dailyTasks}
                  onChange={(e) =>
                    onUpdateRecord({
                      impactOnLife: { ...symptomRecord.impactOnLife, dailyTasks: e.target.value },
                    })
                  }
                  placeholder="e.g. Standing to cook or carrying groceries causes flare"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Current Meds & Allergies */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-semibold text-[#2C2420]">
              Current Medications & Known Allergies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Current Medications / Supplements
                </label>
                <input
                  type="text"
                  value={symptomRecord.currentMeds}
                  onChange={(e) => onUpdateRecord({ currentMeds: e.target.value })}
                  placeholder="e.g. Ibuprofen 400mg, birth control, iron pills"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                  Known Drug Allergies
                </label>
                <input
                  type="text"
                  value={symptomRecord.allergies}
                  onChange={(e) => onUpdateRecord({ allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Sulfa, None known (NKDA)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Questions for Doctor */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#2C2420] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#8C3A4E]" />
                  Empowered Questions for Your Physician
                </h3>
                <p className="text-xs text-[#7A6F68]">
                  Add questions you want addressed during your clinical consultation.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {symptomRecord.questionsForDoctor.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs sm:text-sm text-[#3E342E]"
                >
                  <span className="flex-1 pr-2">• {q}</span>
                  <button
                    onClick={() => handleRemoveQuestion(idx)}
                    className="p-1 text-[#9E9087] hover:text-red-600 transition-colors"
                    title="Remove question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
                placeholder="Type your own question for the doctor (e.g. 'Can we check hormone levels?')..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-xs sm:text-sm text-[#2C2420] focus:bg-white focus:border-[#8C3A4E] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 rounded-xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Final Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button
              onClick={() => onNavigate('my-story-1')}
              className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
            >
              Back to Part 1
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('adaptive-questions')}
                className="px-5 py-2.5 rounded-2xl bg-[#7B5B82] hover:bg-[#66486C] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                Go to Adaptive Care Triage <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('doctor-note')}
                className="px-6 py-2.5 rounded-2xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                Generate Doctor Note <FileCheck2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
