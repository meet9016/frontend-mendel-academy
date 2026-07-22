import React from 'react';
import FellowshipClient from './FellowshipClient';

export const metadata = {
  title: '12-Month Virtual Fellowship in Molecular Pathology Interpretation & Precision Oncology | Mendel Academy',
  description: 'The most comprehensive interpretation-focused fellowship for practicing pathologists: NGS, liquid biopsy, biomarkers, CDx strategy, monthly Virtual Molecular Tumor Boards, and proven reasoning frameworks. 100% virtual.',
};

const FellowshipPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans">
      <FellowshipClient />
    </main>
  );
};

export default FellowshipPage;
