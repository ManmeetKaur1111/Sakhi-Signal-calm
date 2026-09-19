import React, { useState } from 'react';
import { ScreenId } from '../types';
import { SakhiEmblem } from './SakhiEmblem';
import { APP_IMAGES } from '../data/assets';
import {
  Home,
  BookOpen,
  HelpCircle,
  ShieldAlert,
  FileText,
  MessageCircleHeart,
  ArrowRightCircle,
  Wind,
  ShieldCheck,
  Menu,
  X,
  EyeOff,
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenGrounding: () => void;
  onTriggerCamouflage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenGrounding,
  onTriggerCamouflage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ScreenId, label: 'Dashboard', icon: Home },
    { id: 'my-story-1' as ScreenId, label: 'My Story', icon: BookOpen },
    { id: 'adaptive-questions' as ScreenId, label: 'Adaptive Care', icon: HelpCircle },
    { id: 'safety-check' as ScreenId, label: 'Safety Check', icon: ShieldAlert },
    { id: 'doctor-note' as ScreenId, label: 'Doctor Note', icon: FileText },
    { id: 'explain-to-someone' as ScreenId, label: 'Explain to Loved One', icon: MessageCircleHeart },
    { id: 'next-steps' as ScreenId, label: 'Next Steps', icon: ArrowRightCircle },
  ];

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE6DB] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Emblem */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <SakhiEmblem size="md" withPulse={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-serif-display font-semibold tracking-tight text-[#3B121E] group-hover:text-[#8C3A4E] transition-colors">
                  SakhiSignal
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8C3A4E]/10 text-[#8C3A4E] border border-[#8C3A4E]/15">
                  Calm Care
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#7A6F68]">
                <ShieldCheck className="w-3 h-3 text-[#547366]" />
                <span>Trauma-informed & private</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#F2ECE2] p-1 rounded-2xl border border-[#E5DDD0]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentScreen === item.id ||
                (item.id === 'my-story-1' && currentScreen === 'my-story-2') ||
                (item.id === 'safety-check' && currentScreen === 'your-safety-check');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-[#3B121E] shadow-xs font-semibold'
                      : 'text-[#645A53] hover:text-[#2C2420] hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8C3A4E]' : 'text-[#857B74]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mascot Companion Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-[#E5DDD0] text-xs text-[#52463E]">
              <img
                src={APP_IMAGES.sakhiCartoonMascot}
                alt="Sakhi cartoon mascot"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-[#8C3A4E]/30"
              />
              <span className="text-[11px] font-medium text-[#8C3A4E]">Sakhi Companion</span>
            </div>

            {/* Somatic Breathe Button */}
            <button
              onClick={onOpenGrounding}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAE2D5] hover:bg-[#DDD4C5] text-[#423730] text-xs font-medium transition-colors border border-[#DDD4C5]"
              title="Open 4-7-8 calming breathing exercise"
            >
              <Wind className="w-3.5 h-3.5 text-[#708D81]" />
              <span>Breathe</span>
            </button>

            {/* Quick Privacy Exit / Camouflage */}
            <button
              onClick={onTriggerCamouflage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8C3A4E] hover:bg-[#73293B] text-white text-xs font-medium transition-all shadow-xs"
              title="Instant Camouflage: Switch to harmless recipe page immediately"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Exit (Esc)</span>
              <span className="sm:hidden">Exit</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#52463E] hover:bg-[#EDE6DB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#EDE6DB] bg-[#FAF7F2] px-4 py-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentScreen === item.id ||
              (item.id === 'my-story-1' && currentScreen === 'my-story-2') ||
              (item.id === 'safety-check' && currentScreen === 'your-safety-check');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#8C3A4E]/10 text-[#8C3A4E] font-semibold'
                    : 'text-[#52463E] hover:bg-[#F2ECE2]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C3A4E]' : 'text-[#7A6F68]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#EDE6DB] flex items-center justify-between">
            <button
              onClick={() => {
                onOpenGrounding();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EAE2D5] text-xs font-medium text-[#423730]"
            >
              <Wind className="w-4 h-4 text-[#708D81]" />
              <span>4-7-8 Breathing Pacer</span>
            </button>

            <button
              onClick={onTriggerCamouflage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#8C3A4E] text-white text-xs font-medium"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Emergency Exit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
