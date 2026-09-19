import React from 'react';
import { ChefHat, Search, Clock, Heart, ArrowLeft } from 'lucide-react';

interface CamouflageViewProps {
  onReturn: () => void;
}

export const CamouflageView: React.FC<CamouflageViewProps> = ({ onReturn }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans-body">
      {/* Camouflaged Clean Recipe Header */}
      <header className="border-b border-[#E8E2D9] bg-white px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#6B8E23]/15 text-[#556B2F] flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-[#2D3748]">
              The Daily Hearth Recipes
            </h1>
            <p className="text-xs text-[#718096]">Wholesome herbal teas, soups & seasonal kitchen guides</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#F7F5F0] border border-[#E2DDD5] rounded-full px-3 py-1.5 text-xs text-[#718096] w-64">
            <Search className="w-3.5 h-3.5 mr-2" />
            <span>Search soups, grains, teas...</span>
          </div>
          {/* Discreet return button */}
          <button
            onClick={onReturn}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4A5568] bg-[#EFECE6] hover:bg-[#E4E0D7] rounded-lg transition-colors"
            title="Return to your confidential session"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Notes</span>
          </button>
        </div>
      </header>

      {/* Main Camouflage Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B8E23] mb-2">
            <span>Featured Recipe</span> • <span>20 min prep</span>
          </div>
          <h2 className="text-2xl font-serif-display font-medium text-[#2D3748] mb-3">
            Calming Ginger, Chamomile & Honey Infusion
          </h2>
          <p className="text-sm text-[#4A5568] leading-relaxed mb-6">
            A soothing, anti-inflammatory morning tea crafted with fresh bruised ginger root, dried chamomile blossoms, a touch of lemon zest, and raw wildflower honey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F0EBE1]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#718096] mb-3">
                Ingredients
              </h3>
              <ul className="text-sm text-[#4A5568] space-y-2">
                <li className="flex items-center gap-2">• 1 fresh ginger knob, thinly sliced</li>
                <li className="flex items-center gap-2">• 2 tablespoons dried chamomile petals</li>
                <li className="flex items-center gap-2">• 3 cups spring water</li>
                <li className="flex items-center gap-2">• 1 lemon round & 1 tbsp raw honey</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#718096] mb-3">
                Preparation
              </h3>
              <ol className="text-sm text-[#4A5568] space-y-2">
                <li>1. Simmer sliced ginger in gently boiling water for 8 minutes.</li>
                <li>2. Remove from heat and steep chamomile petals for 5 minutes.</li>
                <li>3. Strain into your favorite ceramic mug and stir in honey.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="text-center py-6">
          <button
            onClick={onReturn}
            className="text-xs text-[#718096] hover:text-[#2D3748] underline transition-colors"
          >
            Quietly resume private health companion session
          </button>
        </div>
      </main>
    </div>
  );
};
