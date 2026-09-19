import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Heart, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_IMAGES } from '../data/assets';

interface GroundingExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundingExerciseModal: React.FC<GroundingExerciseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition phases: 4s inhale -> 7s hold -> 8s exhale
        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else {
          setPhase('inhale');
          setCyclesCompleted((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive, phase]);

  if (!isOpen) return null;

  const phaseInstruction = {
    inhale: 'Gently breathe in through your nose...',
    hold: 'Hold with stillness and softness...',
    exhale: 'Slowly release through your mouth...',
  };

  const phaseColor = {
    inhale: 'from-[#E58C8A] to-[#C9687D]',
    hold: 'from-[#9B7B9E] to-[#7B5B82]',
    exhale: 'from-[#708D81] to-[#547366]',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2420]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFC8] relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#8C3A4E]/10 text-[#8C3A4E]">
                <Heart className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-serif-display font-medium text-[#2C2420]">
                  Somatic 4-7-8 Breathing
                </h3>
                <p className="text-xs text-[#7A6F68]">Calming your autonomic nervous system</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EBE2D5] text-[#7A6F68] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Calming reassurance badge */}
          <div className="bg-[#EFE8DC] rounded-xl px-3.5 py-2 mb-6 flex items-center gap-2 text-xs text-[#52463E]">
            <Shield className="w-4 h-4 text-[#8C3A4E] shrink-0" />
            <span>You are safe right here. Drop your shoulders, unclamp your jaw.</span>
          </div>

          {/* Animated breathing circle & cartoon companion */}
          <div className="py-4 flex flex-col items-center justify-center">
            {/* Cute Cartoon Meditation Companion */}
            <motion.div
              animate={{
                y: phase === 'inhale' ? -4 : phase === 'hold' ? -4 : 2,
                scale: phase === 'inhale' ? 1.05 : 0.98,
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : 8,
                ease: 'easeInOut',
              }}
              className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-white/80 border border-[#E0D7C9] shadow-2xs"
            >
              <img
                src={APP_IMAGES.cartoonBreathingGirl}
                alt="Cute cartoon girl meditating peacefully"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-[#8C3A4E]/30"
              />
              <span className="text-xs font-medium text-[#52463E]">
                Breathe gently along with Sakhi
              </span>
            </motion.div>

            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{
                  scale: phase === 'inhale' ? 1.25 : phase === 'hold' ? 1.25 : 0.85,
                  opacity: phase === 'hold' ? 0.7 : 0.4,
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.5 : 8,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${phaseColor[phase]} blur-md`}
              />

              {/* Central Circle */}
              <motion.div
                animate={{
                  scale: phase === 'inhale' ? 1.15 : phase === 'hold' ? 1.15 : 0.9,
                }}
                transition={{
                  duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.2 : 8,
                  ease: 'easeInOut',
                }}
                className={`relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr ${phaseColor[phase]} text-white flex flex-col items-center justify-center shadow-lg`}
              >
                <span className="text-xs font-semibold uppercase tracking-widest opacity-90">
                  {phase}
                </span>
                <span className="text-4xl font-serif-display font-medium my-0.5">
                  {countdown}s
                </span>
                <span className="text-[10px] opacity-80">
                  Cycle #{cyclesCompleted + 1}
                </span>
              </motion.div>
            </div>

            <p className="text-sm font-medium text-[#2C2420] text-center mt-6 h-6">
              {phaseInstruction[phase]}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#E8DFC8]">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C3A4E] hover:bg-[#742B3C] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Resume
                </>
              )}
            </button>
            <button
              onClick={() => {
                setPhase('inhale');
                setCountdown(4);
                setCyclesCompleted(0);
                setIsActive(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#EFE8DC] hover:bg-[#E5DDCF] text-[#52463E] text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
