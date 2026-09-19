import React, { useState } from 'react';
import { ScreenId, SymptomRecord, TrustedScript } from '../types';
import { APP_IMAGES } from '../data/assets';
import {
  MessageCircleHeart,
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
  Users,
  HeartHandshake,
  Send,
  ShieldCheck,
  Smile,
  Info,
  Heart,
} from 'lucide-react';

interface ExplainToTrustedViewProps {
  symptomRecord: SymptomRecord;
  onNavigate: (screen: ScreenId) => void;
}

export const ExplainToTrustedView: React.FC<ExplainToTrustedViewProps> = ({
  symptomRecord,
  onNavigate,
}) => {
  const [recipient, setRecipient] = useState<TrustedScript['recipient']>('partner');
  const [tone, setTone] = useState<TrustedScript['tone']>('gentle');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic state for custom script
  const [conversationStarter, setConversationStarter] = useState(
    'Hey, when you have a quiet moment today, could we sit down together for 10 minutes? There is something about my health I really need to share with you.'
  );

  const [scriptBody, setScriptBody] = useState(
    `I want to talk to you because you mean a lot to me, and carrying this quietly by myself has been really hard. For the past few weeks, I’ve been dealing with persistent physical pain and deep fatigue. It’s not just normal tiredness—it’s been affecting my sleep, my work, and my peace of mind.

I am preparing to see a healthcare professional so we can get proper answers. I don’t expect you to have medical solutions or fix everything, but having your patience, understanding, and knowing you believe what I am feeling makes all the difference in the world.`
  );

  const [actionRequests, setActionRequests] = useState<string[]>([
    'Just listen and give me a hug without feeling like you have to immediately solve it.',
    'Help me remember to take breaks and rest when a flare-up starts.',
    'If you are free, accompany me to my clinic visit for moral support and an extra set of ears.',
  ]);

  const [boundaries, setBoundaries] = useState<string[]>([
    'Please avoid saying "maybe it’s just stress" or "everyone has cramps"—I am listening to my body.',
    'Please let me speak at my own pace without rushing to change the topic.',
  ]);

  const [textMessage, setTextMessage] = useState(
    `Hey, I wanted to send you a quick note. I’ve been struggling with severe pain and fatigue lately that’s been tough to handle on my own. I’m scheduling a doctor’s check-up, and I’d really appreciate having your emotional support right now. Let's chat when you have a quiet moment. ❤️`
  );

  const recipients = [
    { id: 'partner' as const, label: 'Partner / Spouse', icon: '❤️' },
    { id: 'parent' as const, label: 'Mother / Parent', icon: '🏡' },
    { id: 'friend' as const, label: 'Close Friend', icon: '☕' },
    { id: 'colleague' as const, label: 'Manager / Colleague', icon: '💼' },
    { id: 'counselor' as const, label: 'Counselor / Therapist', icon: '🌱' },
  ];

  const tones = [
    { id: 'gentle' as const, label: 'Gentle & Vulnerable', desc: 'Warm, heartfelt, asks for reassurance' },
    { id: 'direct' as const, label: 'Clear & Direct', desc: 'Factual, straightforward, no sugarcoating' },
    { id: 'reassuring' as const, label: 'Reassuring', desc: 'Calming, avoids overwhelming them' },
    { id: 'urgent' as const, label: 'High Urgency', desc: 'Needs immediate assistance or ride' },
  ];

  // Request new customized script from server / Gemini
  const handleGenerateScript = async (
    targetRecipient = recipient,
    targetTone = tone
  ) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: targetRecipient,
          tone: targetTone,
          storySummary: `${symptomRecord.chiefComplaint}. Severity: ${symptomRecord.severity}/10. ${symptomRecord.storyDetails}`,
          keyNeeds: actionRequests,
        }),
      });
      const data = await res.json();
      if (data?.data) {
        setConversationStarter(data.data.conversationStarter || conversationStarter);
        setScriptBody(data.data.scriptBody || scriptBody);
        if (data.data.actionRequests) setActionRequests(data.data.actionRequests);
        if (data.data.boundaries) setBoundaries(data.data.boundaries);
        if (data.data.textMessageVersion) setTextMessage(data.data.textMessageVersion);
      }
    } catch (e) {
      console.warn('Script generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScript = () => {
    const full = `CONVERSATION OPENER:\n"${conversationStarter}"\n\nTALKING POINTS:\n${scriptBody}\n\nWHAT I NEED:\n${actionRequests.map((a) => `• ${a}`).join('\n')}`;
    navigator.clipboard.writeText(full);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(textMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
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
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C5D39]">
                Communication Guide
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C5D39] border border-[#ECD9C6]">
                Non-Violent & Empathetic
              </span>
            </div>
            <h1 className="text-2xl font-serif-display font-medium text-[#2C2420]">
              Explain to Someone I Trust
            </h1>
          </div>
        </div>

        <button
          onClick={() => handleGenerateScript(recipient, tone)}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C5D39] hover:bg-[#734A2B] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Customizing...' : 'Regenerate with AI'}</span>
        </button>
      </div>

      {/* Visual Support Banner: Photo of girls talking & Cartoon Mascot Tip */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAF3EB] via-[#FDFBF7] to-[#F5ECE1] border border-[#ECD9C6] p-6 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-xs border-2 border-white relative h-48 sm:h-52">
            <img
              src={APP_IMAGES.girlsTalkingPhoto}
              alt="Two young women having an empathetic conversation"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-medium text-white drop-shadow-xs flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-300 fill-current" /> Safe, authentic dialogue
              </span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <img
                src={APP_IMAGES.sakhiCartoonMascot}
                alt="Sakhi cartoon mascot"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#8C5D39]/30 shadow-2xs shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-[#8C5D39]">Sakhi’s Sisterhood Advice</span>
                <p className="text-xs text-[#7A6F68]">You don’t have to prove your pain to earn support</p>
              </div>
            </div>

            <p className="text-sm text-[#4A3E38] leading-relaxed">
              Explaining chronic or intimate pain to loved ones can trigger feelings of guilt or fear of being dismissed. Use these gentle, pre-structured scripts to invite your partner, parent, or friend into what you are experiencing without defensiveness.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] font-medium text-[#734A2B]">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ECD9C6]">
                💬 1-Click WhatsApp text
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ECD9C6]">
                🛡️ Boundary setting
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ECD9C6]">
                🤝 Clear practical asks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Recipient & Tone Controls */}
      <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-3">
            1. Who are you speaking to?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {recipients.map((r) => {
              const active = recipient === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setRecipient(r.id);
                    handleGenerateScript(r.id, tone);
                  }}
                  className={`p-3 rounded-2xl border text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                    active
                      ? 'bg-[#8C5D39] text-white border-[#8C5D39] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#52463E] border-[#EDE6DB] hover:border-[#8C5D39]/40 hover:bg-white'
                  }`}
                >
                  <span className="text-base">{r.icon}</span>
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68] mb-3">
            2. Choose conversation tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {tones.map((t) => {
              const active = tone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTone(t.id);
                    handleGenerateScript(recipient, t.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-[#FAF0E6] border-[#8C5D39] text-[#8C5D39] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#52463E] border-[#EDE6DB] hover:border-[#8C5D39]/40 hover:bg-white'
                  }`}
                >
                  <span className="block text-xs font-semibold mb-0.5">{t.label}</span>
                  <span className="block text-[11px] text-[#7A6F68]">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generated Conversational Guide */}
      <div className="space-y-6">
        {/* Step-by-Step Spoken Script */}
        <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C5D39]">
              <Users className="w-4 h-4" /> Spoken Conversation Guide
            </div>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] text-[#52463E] hover:bg-[#EDE6DB] border border-[#E0D7C9] text-xs font-medium transition-colors"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Copied script' : 'Copy Script'}</span>
            </button>
          </div>

          {/* Opener */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider block">
              Step 1: The Opener (When finding a quiet moment)
            </span>
            <div className="p-4 rounded-2xl bg-[#FFFBF7] border border-[#F5E8DC] text-sm text-[#2C2420] italic font-serif-display font-medium">
              "{conversationStarter}"
            </div>
          </div>

          {/* Script Body */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider block">
              Step 2: What to say (Natural speaking script)
            </span>
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE6DB] text-sm leading-relaxed text-[#3E342E] whitespace-pre-line">
              {scriptBody}
            </div>
          </div>

          {/* Practical Requests */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider block">
              Step 3: Clear ways they can support you
            </span>
            <div className="space-y-2">
              {actionRequests.map((ask, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAF9] border border-[#E2EBE7] text-xs sm:text-sm text-[#2C2420]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#547366] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{ask}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Boundaries */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#7A6F68] uppercase tracking-wider block">
              Step 4: Gentle boundaries (What to gently ask them to avoid)
            </span>
            <div className="space-y-2">
              {boundaries.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF8F7] border border-[#F5D8D6] text-xs sm:text-sm text-[#5C2B29]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#C45E5B] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1-Click WhatsApp / SMS Ready Template */}
        <div className="bg-white rounded-3xl border border-[#EDE6DB] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#386657]">
              <Send className="w-4 h-4" /> Ready-to-Send Text Message (WhatsApp / SMS)
            </div>
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E5F0EC] text-[#386657] hover:bg-[#CCE2DA] border border-[#CCE2DA] text-xs font-semibold transition-colors shadow-xs"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied to Clipboard!' : '1-Click Copy Message'}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE6DB] text-sm sm:text-base leading-relaxed text-[#2C2420]">
            "{textMessage}"
          </div>

          <p className="text-xs text-[#7A6F68]">
            Tip: You can copy this message and send it directly to open the door to a gentle in-person conversation when you are both relaxed.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('doctor-note')}
          className="px-5 py-2.5 rounded-2xl border border-[#DDD4C5] text-xs font-medium text-[#645A53] hover:bg-[#EDE6DB] transition-colors"
        >
          Back to Doctor Note
        </button>
        <button
          onClick={() => onNavigate('next-steps')}
          className="px-6 py-2.5 rounded-2xl bg-[#8C5D39] hover:bg-[#734A2B] text-white text-xs font-semibold shadow-xs transition-all"
        >
          View Your Next Steps Action Plan
        </button>
      </div>
    </div>
  );
};
