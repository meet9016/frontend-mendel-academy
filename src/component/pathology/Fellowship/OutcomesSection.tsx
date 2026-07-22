"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const outcomes = [
  "Confidently interpret and clinically integrate complex NGS, liquid biopsy, and multi-omic results to guide therapy selection",
  "Lead or actively contribute to Molecular Tumor Boards with authority and structured reasoning",
  "Design and implement reflex testing algorithms and companion diagnostic (CDx) strategies in your institution",
  "Reduce diagnostic uncertainty in challenging cases using proven frameworks (Onion Skin Technique)",
  "Mentor colleagues and build precision oncology capabilities within your team or department",
  "Position yourself for leadership roles such as Molecular Pathology Consultant, Lab Director, or Tumor Board Lead",
];

const OutcomesSection = () => {
  return (
    <section className={`${FONT} bg-[#FAF7F2] text-[#241E3D] py-[60px] md:py-[72px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[820px] mb-[36px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            OUTCOMES
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.12] tracking-[-0.025em]`}>
            What You Will Be Able To Do After This Program
          </h2>
        </div>

        {/* Outcomes Checklist Card */}
        <div className="relative bg-white border border-[#E6E0D8] rounded-[20px] p-[32px_28px] md:p-[44px_44px] shadow-sm before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[6px] before:rounded-l-[20px] before:bg-[linear-gradient(180deg,#E0568F,#FFC900)]">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 list-none p-0 m-0">
            {outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 text-[#5C5575] text-[0.98rem] leading-[1.65]">
                <span className="flex-none w-[22px] h-[22px] rounded-full bg-[#E0568F] text-white text-[0.72rem] font-bold flex items-center justify-center mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;