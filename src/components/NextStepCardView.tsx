import React, { useState } from 'react';
import { ScreenId, SymptomRecord } from '../types';
import { APP_IMAGES } from '../data/assets';
import {
  ArrowRightCircle,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  PhoneCall,
  Clock,
  Sparkles,
  ArrowLeft,
  Bell,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface NextStepCardViewProps {
  symptomRecord: SymptomRecord;
  onNavigate: (screen: ScreenId) => void;
  onOpenGrounding: () => void;
}

export const NextStepCardView: React.FC<NextStepCardViewProps> = ({
  symptomRecord,
  onNavigate,
  onOpenGrounding,
}) => {
  const [appointmentDate, setAppointmentDate] = useState('2026-09-24');
  const [appointmentTime, setAppointmentTime] = useState('10:30');
  const [doctorName, setDoctorName] = useState('Dr. Ananya Sharma (OB/GYN)');
  const [reminderSaved, setReminderSaved] = useState(false);

  const [completedSteps, setCompletedSteps] = useState<{ [step: number]: boolean }>({
    1: true,
    2: false,
    3: false,
  });

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-sans-body">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5E78]">
                Action Roadmap
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBF1F7] text-[#4B5E78] border border-[#D5E1ED]">
                Care Continuum
              </span>
            </div>
            <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              Your Next Step Plan & Clinic Preparation
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('doctor-note')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#386657] hover:bg-[#2B5245] text-white text-xs font-semibold shadow-xs transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Doctor Note</span>
        </button>
      </div>

      {/* Hero Affirmation Card (matching Stitch Calm Care) with Photo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF5EE] via-[#FDFBF7] to-[#EFE7DC] border border-[#E5DDD0] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C3A4E]">
              <Heart className="w-4 h-4 text-[#8C3A4E]" />
              <span>Care Affirmation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-medium text-[#2C2420]">
              "You did the right thing by checking in with your body today."
            </h2>
            <p className="text-sm text-[#645A53] leading-relaxed max-w-2xl">
              Pain, fatigue, and sensitive symptoms are real physiological signals. Documenting them clearly without shame is the first decisive step toward receiving accurate diagnosis and validating clinical support.
            </p>
          </div>
          <div className="md:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xs border-2 border-white h-44">
              <img
                src={APP_IMAGES.girlCalmPortrait}
                alt="Young woman feeling peaceful and supported"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-white drop-shadow-xs">
                  🌸 Honoring your health journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Clear Action Roadmap */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif-display font-medium text-[#2C2420]">
          Your 3-Step Care Path
        </h3>

        {/* Step 1: Immediate Comfort with Cozy Cartoon Relief */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            completedSteps[1] ? 'bg-white border-[#EDE6DB]' : 'bg-[#FAF8F5] border-[#E0D7C9]'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => toggleStep(1)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  completedSteps[1]
                    ? 'bg-[#547366] border-[#547366] text-white'
                    : 'border-[#CDC4B6] bg-white hover:border-[#547366]'
                }`}
              >
                {completedSteps[1] && <Check className="w-3.5 h-3.5" />}
              </button>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#547366]">
                  Step 1 • Immediate Self-Care
                </span>
                <h4 className="text-base font-semibold text-[#2C2420] mt-0.5">
                  Somatic Comfort & Autonomic Calming
                </h4>
                <p className="text-xs sm:text-sm text-[#645A53] mt-1.5 leading-relaxed">
                  Apply a warm heat pack to lower abdomen or sacrum; gently unclamp jaw and perform deep diaphragmatic breathing; stay well hydrated with warm electrolyte fluids.
                </p>

                {/* Cozy Cartoon Mini Guide */}
                <div className="mt-3.5 flex items-center gap-3 p-2.5 rounded-2xl bg-[#F6F2EB] border border-[#E5DDD0] max-w-md">
                  <img
                    src={APP_IMAGES.cartoonCozyRelief}
                    alt="Cute cozy cartoon girl resting with heat pack"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-[#547366]/30 shrink-0"
                  />
                  <div className="text-[11px] text-[#52463E] leading-tight">
                    <span className="font-semibold text-[#547366] block">Cozy Tip:</span>
                    "A 20-minute heating pad session increases local pelvic microcirculation and reduces visceral smooth muscle spasms."
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenGrounding}
              className="px-3.5 py-1.5 rounded-xl bg-[#EAE2D5] hover:bg-[#DDD4C5] text-xs font-medium text-[#423730] shrink-0 self-start sm:self-auto flex items-center gap-1.5 transition-colors"
            >
              Start Breathing Pacer
            </button>
          </div>
        </div>

        {/* Step 2: Clinic Preparation */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            completedSteps[2] ? 'bg-white border-[#EDE6DB]' : 'bg-[#FAF8F5] border-[#E0D7C9]'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => toggleStep(2)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  completedSteps[2]
                    ? 'bg-[#547366] border-[#547366] text-white'
                    : 'border-[#CDC4B6] bg-white hover:border-[#547366]'
                }`}
              >
                {completedSteps[2] && <Check className="w-3.5 h-3.5" />}
              </button>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#386657]">
                  Step 2 • Consultation Booking
                </span>
                <h4 className="text-base font-semibold text-[#2C2420] mt-0.5">
                  Schedule In-Person or Telehealth Evaluation
                </h4>
                <p className="text-xs sm:text-sm text-[#645A53] mt-1.5 leading-relaxed">
                  Book with an obstetrician-gynecologist or sympathetic primary care doctor. Print or download your SakhiSignal SBAR Clinical Note to hand directly to the physician upon arrival.
                </p>

                {/* Sakhi Advocacy Mascot Callout */}
                <div className="mt-3.5 flex items-center gap-3 p-2.5 rounded-2xl bg-[#FBF0F2] border border-[#ECD9C6] max-w-md">
                  <img
                    src={APP_IMAGES.sakhiCartoonMascot}
                    alt="Cute cartoon mascot Sakhi"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-[#8C3A4E]/30 shrink-0"
                  />
                  <div className="text-[11px] text-[#52463E] leading-tight">
                    <span className="font-semibold text-[#8C3A4E] block">Doctor Visit Tip:</span>
                    "Handing your SBAR brief right at the start prevents the doctor from interrupting during the first 30 seconds."
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('doctor-note')}
              className="px-3.5 py-1.5 rounded-xl bg-[#386657] hover:bg-[#2B5245] text-white text-xs font-semibold shrink-0 self-start sm:self-auto flex items-center gap-1.5 transition-colors"
            >
              Get Printed Note
            </button>
          </div>
        </div>

        {/* Step 3: What to Monitor */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            completedSteps[3] ? 'bg-white border-[#EDE6DB]' : 'bg-[#FAF8F5] border-[#E0D7C9]'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <button
              onClick={() => toggleStep(3)}
              className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                completedSteps[3]
                  ? 'bg-[#547366] border-[#547366] text-white'
                  : 'border-[#CDC4B6] bg-white hover:border-[#547366]'
              }`}
            >
              {completedSteps[3] && <Check className="w-3.5 h-3.5" />}
            </button>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C3A4E]">
                Step 3 • Daily Monitoring & Red Flags
              </span>
              <h4 className="text-base font-semibold text-[#2C2420] mt-0.5">
                Observe Progression & Urgent Safeguards
              </h4>
              <p className="text-xs sm:text-sm text-[#645A53] mt-1.5 leading-relaxed">
                Log any acute shifts in pain severity or cycle timing. If sudden severe unilateral sharp pain, fever above 101°F, or syncope occurs, proceed immediately to the emergency department.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Reminder Scheduler */}
      <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#4B5E78]/10 text-[#4B5E78]">
              <Bell className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#2C2420]">
                Doctor Appointment Scheduler & Reminder
              </h3>
              <p className="text-xs text-[#7A6F68]">
                Set your visit details so you remember to bring your clinical dossier.
              </p>
            </div>
          </div>

          {reminderSaved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Reminder Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveReminder} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
              Doctor / Clinic Name
            </label>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#4B5E78] focus:outline-none"
              placeholder="e.g. Dr. Patel (Women's Clinic)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
              Appointment Date
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#4B5E78] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
              Appointment Time
            </label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D7C9] bg-[#FAF8F5] text-sm text-[#2C2420] focus:bg-white focus:border-[#4B5E78] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#4B5E78] hover:bg-[#3B4B60] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" /> Save Appointment Details
            </button>
          </div>
        </form>
      </div>

      {/* Return to Dashboard */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 rounded-2xl bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold shadow-xs transition-all"
        >
          Return to Dashboard
        </button>

        <button
          onClick={() => onNavigate('explain-to-someone')}
          className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
        >
          View Talking Points for Loved Ones
        </button>
      </div>
    </div>
  );
};
