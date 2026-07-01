import React from 'react';
import ResearchHeroSection from '@/component/pathology/ClinicalResearch/ResearchHeroSection';
import WhyItMattersSection from '@/component/pathology/ClinicalResearch/WhyItMattersSection';
import ResearchFocusSection from '@/component/pathology/ClinicalResearch/ResearchFocusSection';
import TranslationSection from '@/component/pathology/ClinicalResearch/TranslationSection';

export const metadata = {
  title: 'Mendel Academy | Clinical Research',
  description: 'Cancer stem cells drive therapy resistance, recurrence, and metastasis. Mendel Academy connects biology to diagnostic decisions.',
};

const ClinicalResearchPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <div className="flex-1">
        <ResearchHeroSection />
        <WhyItMattersSection />
        <ResearchFocusSection />
        <TranslationSection />
      </div>
    </main>
  );
};

export default ClinicalResearchPage;
