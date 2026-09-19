import React, { useState, useEffect } from 'react';
import { ScreenId, SymptomRecord } from './types';
import { INITIAL_SYMPTOM_RECORD } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { MyStoryView } from './components/MyStoryView';
import { AdaptiveQuestionsView } from './components/AdaptiveQuestionsView';
import { SafetyCheckView } from './components/SafetyCheckView';
import { DoctorNoteView } from './components/DoctorNoteView';
import { ExplainToTrustedView } from './components/ExplainToTrustedView';
import { NextStepCardView } from './components/NextStepCardView';
import { CamouflageView } from './components/CamouflageView';
import { GroundingExerciseModal } from './components/GroundingExerciseModal';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [symptomRecord, setSymptomRecord] = useState<SymptomRecord>(() => {
    const saved = localStorage.getItem('sakhisignal_record');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved record', e);
      }
    }
    return INITIAL_SYMPTOM_RECORD;
  });

  const [isCamouflaged, setIsCamouflaged] = useState(false);
  const [isGroundingOpen, setIsGroundingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to local storage whenever record updates
  useEffect(() => {
    localStorage.setItem('sakhisignal_record', JSON.stringify(symptomRecord));
  }, [symptomRecord]);

  // Global escape key listener for instant emergency camouflage exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCamouflaged((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateRecord = (updated: Partial<SymptomRecord>) => {
    setSymptomRecord((prev) => ({ ...prev, ...updated }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If camouflage privacy mode is triggered
  if (isCamouflaged) {
    return <CamouflageView onReturn={() => setIsCamouflaged(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] text-[#2C2420] flex flex-col font-sans-body selection:bg-[#E8D4CE] selection:text-[#5E2B38]">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-[#3B121E] text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-[#8C3A4E]"
          >
            <ShieldCheck className="w-4 h-4 text-[#E58C8A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenGrounding={() => setIsGroundingOpen(true)}
        onTriggerCamouflage={() => setIsCamouflaged(true)}
      />

      {/* Screen Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {currentScreen === 'home' && (
              <HomeDashboard
                symptomRecord={symptomRecord}
                onNavigate={handleNavigate}
                onOpenGrounding={() => setIsGroundingOpen(true)}
              />
            )}

            {(currentScreen === 'my-story-1' || currentScreen === 'my-story-2') && (
              <MyStoryView
                currentScreen={currentScreen}
                symptomRecord={symptomRecord}
                onUpdateRecord={handleUpdateRecord}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'adaptive-questions' && (
              <AdaptiveQuestionsView
                symptomRecord={symptomRecord}
                onUpdateRecord={handleUpdateRecord}
                onNavigate={handleNavigate}
              />
            )}

            {(currentScreen === 'safety-check' || currentScreen === 'your-safety-check') && (
              <SafetyCheckView
                currentScreen={currentScreen}
                symptomRecord={symptomRecord}
                onUpdateRecord={handleUpdateRecord}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'doctor-note' && (
              <DoctorNoteView
                symptomRecord={symptomRecord}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'explain-to-someone' && (
              <ExplainToTrustedView
                symptomRecord={symptomRecord}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'next-steps' && (
              <NextStepCardView
                symptomRecord={symptomRecord}
                onNavigate={handleNavigate}
                onOpenGrounding={() => setIsGroundingOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Somatic Calming Breathing Modal */}
      <GroundingExerciseModal
        isOpen={isGroundingOpen}
        onClose={() => setIsGroundingOpen(false)}
      />

      {/* Trauma-Informed Footer */}
      <footer className="border-t border-[#EDE6DB] bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8 mt-16 no-print text-[#7A6F68] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8C3A4E]" />
            <span className="font-semibold text-[#2C2420]">SakhiSignal Calm Care</span>
            <span>• Trauma-informed digital health companion</span>
          </div>

          <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed">
            Medical Disclaimer: SakhiSignal is designed for patient symptom articulation, physician consultation preparation, and triage safety checking. It does not replace immediate emergency care or formal medical diagnosis. If you experience sudden agonizing pain, fever with discharge, or feel in danger, call emergency services (112 / 911 / 181) immediately.
          </p>
        </div>
      </footer>
    </div>
  );
}
