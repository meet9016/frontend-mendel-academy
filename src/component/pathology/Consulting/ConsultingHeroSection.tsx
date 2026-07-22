"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface ConsultingHeroSectionProps {
  onOpenBookModal?: () => void;
}

const ConsultingHeroSection = ({ onOpenBookModal }: ConsultingHeroSectionProps) => {
  return (
    <section className={`${FONT} relative bg-[radial-gradient(1100px_700px_at_80%_10%,#1E1540,#150E28_65%)] text-white overflow-hidden py-[84px] md:py-[92px] px-6`}>
      {/* Decorative background circles */}
      <div className="absolute -right-[160px] -top-[160px] w-[520px] h-[520px] rounded-full border border-[#FFC900]/20 pointer-events-none" />
      <div className="absolute -right-[100px] -top-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(224,86,143,0.16),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1180px] mx-auto">
        {/* Flagchip */}
        <span className={`${MONO} inline-block text-[0.7rem] tracking-[0.16em] uppercase bg-[#FFC900] text-[#1A1502] px-4 py-[7px] rounded-full mb-[30px] font-medium`}>
          Consulting &amp; Advisory · Dr. Kishor Managoli, MD
        </span>

        {/* Heading */}
        <h1 className={`${FONT} text-[clamp(2.3rem,5vw,3.7rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white mb-[34px]`}>
          35 years of expertise, <span className="text-[#E0568F]">when the diagnosis matters most.</span>
        </h1>

        {/* Bullet List */}
        <ul className="list-none m-0 mb-[44px] max-w-[760px] grid grid-cols-1 sm:grid-cols-2 gap-x-[34px] gap-y-[16px]">
          {[
            'Molecular Diagnosis Consulting',
            'Surgical Pathology',
            'Second Opinions',
            'Telepathology & Digital Pathology',
            'Biomarker Strategy',
            'Companion Diagnostics (CDx)',
            'Pharmacogenomics Strategy (PGx)',
            'Molecular Lab Business Development',
          ].map((item, idx) => (
            <li
              key={idx}
              className={`${FONT} relative pl-[30px] text-[1.16rem] text-white/90 before:content-[''] before:absolute before:left-0 before:top-[0.62em] before:w-[16px] before:h-[3px] before:rounded-[2px] before:bg-[#FFC900]`}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Fact Chips */}
        <div className="flex flex-wrap gap-[12px] mb-[48px]">
          <span className={`${MONO} text-[0.86rem] tracking-[0.06em] border border-white/25 rounded-full px-[18px] py-[10px] text-white/85`}>
            <b className="text-[#FFC900] font-semibold">35+</b> yrs leading high-volume labs
          </span>
          <span className={`${MONO} text-[0.86rem] tracking-[0.06em] border border-white/25 rounded-full px-[18px] py-[10px] text-white/85`}>
            <b className="text-[#FFC900] font-semibold">50,000+</b> accessions/year
          </span>
          <span className={`${MONO} text-[0.86rem] tracking-[0.06em] border border-white/25 rounded-full px-[18px] py-[10px] text-white/85`}>
            <b className="text-[#FFC900] font-semibold">24 yrs</b> of Pharma/CRO experience
          </span>
          <span className={`${MONO} text-[0.86rem] tracking-[0.06em] border border-white/25 rounded-full px-[18px] py-[10px] text-white/85`}>
            <b className="text-[#FFC900] font-semibold">Global</b> perspective
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-[14px]">
          <button
            onClick={() => {
              if (onOpenBookModal) {
                onOpenBookModal();
              } else {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`${FONT} inline-flex items-center gap-[10px] font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)] group cursor-pointer border-2 border-transparent`}
          >
            Schedule a call <span className="transition-transform duration-[180ms] group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultingHeroSection;