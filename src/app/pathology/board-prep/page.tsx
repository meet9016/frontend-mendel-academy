import React from 'react';
import BoardHeroSection from '@/component/pathology/BoardPrep/BoardHeroSection';
import ExamSelectionSection from '@/component/pathology/BoardPrep/ExamSelectionSection';
import ConfidenceSection from '@/component/pathology/BoardPrep/ConfidenceSection';

export const metadata = {
  title: 'Mendel Academy | Board Prep',
  description: 'Preparation built by examiners standards and a teacher who knows exactly how these exams think.',
};

const BoardPrepPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <div className="flex-1">
        <BoardHeroSection />
        <ExamSelectionSection />
        <ConfidenceSection />
      </div>
    </main>
  );
};

export default BoardPrepPage;
