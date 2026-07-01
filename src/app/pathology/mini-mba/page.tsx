import React from 'react';
import MBAHeroSection from '@/component/pathology/MiniMBA/MBAHeroSection';
import WhyItMattersSection from '@/component/pathology/MiniMBA/WhyItMattersSection';
import CurriculumSection from '@/component/pathology/MiniMBA/CurriculumSection';
import ProgramDetailsSection from '@/component/pathology/MiniMBA/ProgramDetailsSection';

export const metadata = {
  title: 'Mendel Academy | Mini-Medical MBAs',
  description: 'The business education medicine never gave you.',
};

const MiniMBAPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <div className="flex-1">
        <MBAHeroSection />
        <WhyItMattersSection />
        <CurriculumSection />
        <ProgramDetailsSection />
      </div>
    </main>
  );
};

export default MiniMBAPage;
