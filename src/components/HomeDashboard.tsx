import React from 'react';
import { ScreenId, SymptomRecord } from '../types';
import { APP_IMAGES } from '../data/assets';
import {
  BookOpen,
  HelpCircle,
  ShieldAlert,
  FileText,
  MessageCircleHeart,
  ArrowRightCircle,
  Wind,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  Activity,
  HeartHandshake,
  Lock,
  ChevronRight,
  Heart,
  Quote,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeDashboardProps {
  symptomRecord: SymptomRecord;
  onNavigate: (screen: ScreenId) => void;
  onOpenGrounding: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  symptomRecord,
  onNavigate,
  onOpenGrounding,
}) => {
  const cards = [
    {
      id: 'my-story-1' as ScreenId,
      title: 'Share My Story',
      step: 'Step 1',
      description: 'Describe what your body is experiencing in your own words. Voice or text with guided prompts.',
      icon: BookOpen,
      accent: 'from-[#8C3A4E] to-[#B0536A]',
      bgAccent: 'bg-[#8C3A4E]/10 text-[#8C3A4E] border-[#8C3A4E]/20',
      badge: 'Start here • 3 mins',
      highlights: ['Freeform voice & text', 'Pain intensity scale', 'Daily functional impact'],
    },
    {
      id: 'adaptive-questions' as ScreenId,
      title: 'Adaptive Care Questions',
      step: 'Step 2',
      description: 'Gentle, trauma-informed triage questions that adapt to your body’s unique signals and hormonal cycle.',
      icon: HelpCircle,
      accent: 'from-[#7B5B82] to-[#9B7B9E]',
      bgAccent: 'bg-[#7B5B82]/10 text-[#7B5B82] border-[#7B5B82]/20',
      badge: 'Interactive Triage',
      highlights: ['Cycle correlation', 'Visceral sensations', 'Skip any question anytime'],
    },
    {
      id: 'safety-check' as ScreenId,
      title: 'Confidential Safety Check',
      step: 'Step 3',
      description: 'Screen for acute physical red flags, fever, blood loss, or domestic & emotional safety distress.',
      icon: ShieldAlert,
      accent: 'from-[#C45E5B] to-[#DF7F7C]',
      bgAccent: 'bg-[#C45E5B]/10 text-[#C45E5B] border-[#C45E5B]/20',
      badge: 'Critical Screen',
      highlights: ['Red-flag triage', 'Risk rating gauge', '1-tap 24/7 helplines'],
    },
    {
      id: 'doctor-note' as ScreenId,
      title: 'Clinical Doctor’s Note',
      step: 'Outcome A',
      description: 'A formal SBAR medical brief translating your story into clinical terminology, ready to print or share.',
      icon: FileText,
      accent: 'from-[#386657] to-[#547366]',
      bgAccent: 'bg-[#386657]/10 text-[#386657] border-[#386657]/20',
      badge: 'Clinical SBAR',
      highlights: ['Medical HPI translation', 'Physician questions', 'Print & download ready'],
    },
    {
      id: 'explain-to-someone' as ScreenId,
      title: 'Explain to Someone I Trust',
      step: 'Outcome B',
      description: 'Tailored conversation scripts and WhatsApp messages to share your symptoms with a partner or parent.',
      icon: MessageCircleHeart,
      accent: 'from-[#8C5D39] to-[#AD7A50]',
      bgAccent: 'bg-[#8C5D39]/10 text-[#8C5D39] border-[#8C5D39]/20',
      badge: 'Communication Guide',
      highlights: ['Partner & parent scripts', 'Specific asks for help', '1-click copy text'],
    },
    {
      id: 'next-steps' as ScreenId,
      title: 'Your Next Steps',
      step: 'Outcome C',
      description: 'Clear, prioritized guidance on self-comfort, preparation for your appointment, and reminder scheduling.',
      icon: ArrowRightCircle,
      accent: 'from-[#4B5E78] to-[#687E9C]',
      bgAccent: 'bg-[#4B5E78]/10 text-[#4B5E78] border-[#4B5E78]/20',
      badge: 'Action Roadmap',
      highlights: ['3-step clear roadmap', 'Appointment checklist', 'Follow-up reminder'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Compassionate Welcome Hero with Photos of Girls & Cartoon Mascot */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5EDE3] via-[#FAF6F0] to-[#EFE7DC] border border-[#E5DDD0] p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E0D7C9] text-xs font-semibold text-[#8C3A4E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to SakhiSignal Calm Care</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif-display font-medium text-[#2C2420] tracking-tight leading-tight">
              You are in a safe, compassionate space where your body’s signals are believed.
            </h1>

            <p className="text-sm sm:text-base text-[#645A53] leading-relaxed max-w-2xl">
              Whether you are navigating confusing pelvic discomfort, chronic fatigue, anxiety, or preparing for an upcoming doctor’s consultation, Sakhi is here to help you structure your story, check your safety, and communicate clearly.
            </p>

            {/* Cartoon Mascot Speech Bubble */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/90 border border-[#ECD9C6] shadow-xs max-w-xl">
              <img
                src={APP_IMAGES.sakhiCartoonMascot}
                alt="Sakhi cartoon mascot"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#8C3A4E]/30 shrink-0 shadow-xs"
              />
              <div className="text-xs text-[#52463E] leading-relaxed">
                <span className="font-semibold text-[#8C3A4E] block">Sakhi says:</span>
                "Take a deep breath, sister. Your pain is real, your experiences are valid, and you don't have to carry this alone."
              </div>
            </div>

            {/* Key Safeguard Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#52463E]">
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#E5DDD0]">
                <Lock className="w-3.5 h-3.5 text-[#547366]" />
                100% Client-side & Private
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#E5DDD0]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C3A4E]" />
                Trauma-Informed & Bias-Free
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#E5DDD0]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#7B5B82]" />
                Doctor-Approved Clinical Framework
              </span>
            </div>
          </div>

          {/* Hero Photo Card: Sisterhood Support */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-md border-2 border-white">
              <img
                src={APP_IMAGES.girlsSupportHero}
                alt="Supportive sisterhood of young women sharing care"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#FCD5DE] mb-1">
                  <Heart className="w-3 h-3 fill-current text-[#FCD5DE]" /> Compassionate Sisterhood
                </span>
                <p className="text-sm font-medium leading-snug drop-shadow-xs">
                  "Over 10,000+ women and girls breaking the silence around chronic pelvic pain."
                </p>
              </div>
            </div>

            {/* Mini Floating Reassurance Badge */}
            <div className="absolute -bottom-3 -left-3 bg-white px-3.5 py-2 rounded-2xl border border-[#E0D7C9] shadow-md flex items-center gap-2 text-xs font-semibold text-[#386657]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Safe & Confidential Circle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Story Summary & Quick Somatic Pause Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Symptom Progress Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4E] flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Current Active Record
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF6F0] text-[#7A6F68] border border-[#EDE6DB]">
                Severity: {symptomRecord.severity}/10
              </span>
            </div>

            <h3 className="text-lg font-serif-display font-medium text-[#2C2420] mb-2">
              {symptomRecord.chiefComplaint}
            </h3>

            <p className="text-sm text-[#645A53] line-clamp-2 leading-relaxed mb-4">
              "{symptomRecord.storyDetails}"
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {symptomRecord.painType.slice(0, 3).map((pt, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#F7F3EC] text-[#52463E] border border-[#E8DFC8]"
                >
                  {pt}
                </span>
              ))}
              <span className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF0F2] text-[#8C3A4E] border border-[#F0D5DC]">
                {symptomRecord.category}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F2ECE2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#7A6F68]">
              <Clock className="w-3.5 h-3.5" />
              <span>Recorded today • Ready for Doctor Note generation</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('my-story-1')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#645A53] hover:bg-[#FAF6F0] border border-[#E5DDD0] transition-colors"
              >
                Edit Story
              </button>
              <button
                onClick={() => onNavigate('doctor-note')}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#8C3A4E] hover:bg-[#742B3C] text-white transition-all shadow-xs flex items-center gap-1"
              >
                View Doctor Note <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Somatic Grounding Quick Card with Cute Cartoon Breathing Girl */}
        <div className="bg-gradient-to-br from-[#EAE6DF] to-[#DFD9CE] rounded-3xl border border-[#D5CDC0] p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#547366]">
                <Wind className="w-4 h-4" /> Nervous System Pause
              </div>
              <img
                src={APP_IMAGES.cartoonBreathingGirl}
                alt="Cute cartoon girl breathing"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
              />
            </div>
            <h3 className="text-lg font-serif-display font-medium text-[#2C2420] mb-2">
              Feeling overwhelmed or tense?
            </h3>
            <p className="text-sm text-[#52463E] leading-relaxed mb-4">
              Physical discomfort often activates acute nervous system distress. Take a 60-second guided 4-7-8 breathing pause to soften pelvic tension.
            </p>
          </div>

          <button
            onClick={onOpenGrounding}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#2C2420] text-xs font-semibold border border-[#CDC4B6] shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <Wind className="w-4 h-4 text-[#708D81]" />
            Begin 4-7-8 Breath Pacer
          </button>
        </div>
      </section>

      {/* The 6 Core Stitch Calm Care Experience Modules */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EDE6DB] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4E]">
              Stitch Calm Care Workflow
            </span>
            <h2 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              Select Your Care Module
            </h2>
          </div>
          <p className="text-xs text-[#7A6F68]">
            Navigate seamlessly through symptom journaling, safety screening, clinical briefs, and communication scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => onNavigate(card.id)}
                className="bg-white rounded-3xl border border-[#EDE6DB] hover:border-[#D5C7B7] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.accent} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.bgAccent}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9C8F87] mb-1">
                    {card.step}
                  </div>
                  <h3 className="text-xl font-serif-display font-medium text-[#2C2420] group-hover:text-[#8C3A4E] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#645A53] leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-[#7A6F68]">
                    {card.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B39B8F]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F2ECE2] flex items-center justify-between text-xs font-semibold text-[#8C3A4E]">
                  <span>Open Module</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Sisterhood Voices & Care Sanctuary (Photos of Girls & Cartoon Comfort) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EDE6DB] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4E]">
              Sisterhood & Community
            </span>
            <h2 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              Voices of Courage & Gentle Comfort
            </h2>
          </div>
          <p className="text-xs text-[#7A6F68]">
            Real stories from young women who reclaimed their healthcare journey with SakhiSignal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Maya's Story (Photo of girl) */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={APP_IMAGES.girlCalmPortrait}
                  alt="Maya smiling warmly with tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#8C3A4E] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#E5DDD0]">
                  Diagnosis Journey
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-serif-display font-semibold text-[#2C2420]">
                  "They stopped saying it was in my head."
                </h4>
                <p className="text-xs text-[#645A53] leading-relaxed">
                  "For four years, doctors told me my period cramps were normal. Handing them my SakhiSignal SBAR note finally resulted in a pelvic ultrasound and endometriosis diagnosis."
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 text-[11px] font-semibold text-[#8C3A4E]">
              — Maya, 24 • Mumbai
            </div>
          </div>

          {/* Card 2: Aisha & Tanya's Dialogue (Photo of girls talking) */}
          <div className="bg-white rounded-3xl border border-[#EDE6DB] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={APP_IMAGES.girlsTalkingPhoto}
                  alt="Two girls having a compassionate conversation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#8C5D39] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#E5DDD0]">
                  Compassionate Dialogue
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-serif-display font-semibold text-[#2C2420]">
                  "Finally finding the words to explain."
                </h4>
                <p className="text-xs text-[#645A53] leading-relaxed">
                  "The conversation script gave me the exact non-violent words to explain my flare-ups to my family. They realized I wasn't just tired—I was dealing with real nerve pain."
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 text-[11px] font-semibold text-[#8C5D39]">
              — Aisha & Tanya • Delhi
            </div>
          </div>

          {/* Card 3: Cute Cartoon Pelvic Relief (Cartoon girl with heat pack) */}
          <div className="bg-[#FFFDFB] rounded-3xl border border-[#EDE6DB] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-[#FAF5EE] flex items-center justify-center">
                <img
                  src={APP_IMAGES.cartoonCozyRelief}
                  alt="Cute cartoon girl cozy with hot water pack"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#547366] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#E5DDD0]">
                  Somatic Self-Care
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-serif-display font-semibold text-[#2C2420]">
                  The Warm Heat Pack Sanctuary
                </h4>
                <p className="text-xs text-[#645A53] leading-relaxed">
                  Warm herbal tea, sacral heat packs, and gentle rest. Resting is not laziness; it is physiological medicine your pelvic muscles desperately need.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 text-[11px] font-semibold text-[#547366]">
              🌿 30-Minute Rest Ritual
            </div>
          </div>

          {/* Card 4: Sakhi Mascot Encouragement (Cartoon mascot) */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#ECD9C6] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-[#FBF0F2] flex items-center justify-center p-3">
                <img
                  src={APP_IMAGES.sakhiCartoonMascot}
                  alt="Cute cartoon mascot Sakhi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#8C3A4E] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#ECD9C6]">
                  Sakhi Mascot
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-serif-display font-semibold text-[#2C2420]">
                  "You don't need to suffer in silence."
                </h4>
                <p className="text-xs text-[#645A53] leading-relaxed">
                  "Agonizing period pain is never 'just womanhood'. You deserve thorough clinical investigation, respect, and targeted relief."
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 text-[11px] font-semibold text-[#8C3A4E]">
              🌸 Sakhi's Reassurance Promise
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Crisis & Immediate Support Ribbon */}
      <section className="bg-[#FFF8F7] rounded-3xl border border-[#F5D8D6] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C45E5B]/15 text-[#C45E5B] flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#2C2420]">
              Need Immediate or Confidential Safety Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-[#645A53]">
              Toll-free 24/7 National Women’s Helpline (<strong className="text-[#8C3A4E]">181</strong> / <strong className="text-[#8C3A4E]">1091</strong>), Emergency Services (<strong className="text-[#8C3A4E]">112 / 911</strong>), and Mental Health Crisis (<strong className="text-[#8C3A4E]">988</strong>).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('safety-check')}
          className="w-full md:w-auto px-5 py-2.5 rounded-2xl bg-[#C45E5B] hover:bg-[#A84A47] text-white text-xs font-semibold tracking-wide transition-colors shrink-0 shadow-xs flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-4 h-4" />
          View All Emergency Resources
        </button>
      </section>
    </div>
  );
};
