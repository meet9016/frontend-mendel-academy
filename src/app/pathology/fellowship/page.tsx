import React from 'react';
import HeroSection from '@/component/pathology/Fellowship/HeroSection';
import PhasesSection from '@/component/pathology/Fellowship/PhasesSection';
import MethodologySection from '@/component/pathology/Fellowship/MethodologySection';
import OutcomesSection from '@/component/pathology/Fellowship/OutcomesSection';
import TargetAudienceSection from '@/component/pathology/Fellowship/TargetAudienceSection';
import FAQSection from '@/component/pathology/Fellowship/FAQSection';

export const metadata = {
  title: 'Mendel Academy | Virtual Fellowship in Molecular Pathology',
  description: '12-Month Virtual Fellowship in Molecular Pathology Interpretation & Precision Oncology.',
};

const FellowshipPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      {/* Main Content Area */}
      <div className="flex-1">
        <HeroSection />
        <PhasesSection />
        <MethodologySection />
        <OutcomesSection />
        <TargetAudienceSection />
        <FAQSection />
      </div>
    </main>
  );
};

export default FellowshipPage;
