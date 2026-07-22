"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const items = [
  "Practicing Surgical Pathologists ready to add molecular authority",
  "Hematopathologists integrating NGS and flow into daily sign-out",
  "Pathologists preparing for subspecialty or leadership roles",
  "Lab Directors building precision oncology capability in-house",
  "Oncologists seeking deeper laboratory integration",
  "Industry professionals in biomarker / CDx strategy roles",
];

const TargetAudienceSection = () => {
  return (
    <section className={`${FONT} bg-[#F3EEE6] text-[#241E3D] py-[60px] md:py-[72px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="max-w-[780px] mb-[40px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            IS THIS YOU?
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.025em]`}>
            Designed for pathologists in practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E6E0D8] rounded-[12px] p-[22px_24px] font-semibold text-[0.97rem] flex items-start gap-3.5 transition-all duration-200 hover:border-[#E0568F] hover:-translate-y-0.5 group"
            >
              <span className="text-[#E0568F] font-extrabold flex-none">→</span>
              <span className="text-[#241E3D] leading-[1.45]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;