"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface VMTBSectionProps {
  onOpenCohort?: () => void;
}

const VMTBSection = ({ onOpenCohort }: VMTBSectionProps) => {
  return (
    <section id="vmtb" className={`${FONT} bg-[#FAF7F2] pt-4 pb-[64px] md:pb-[80px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="relative overflow-hidden bg-[radial-gradient(800px_480px_at_15%_0%,#1E1540,#150E28)] text-white rounded-[28px] p-[42px_28px] sm:p-[58px_54px] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center shadow-[0_24px_60px_rgba(21,14,40,0.25)]
          after:content-['vMTB'] after:absolute after:-right-[10px] after:-bottom-[40px] after:text-[160px] md:after:text-[190px] after:font-black after:text-white/[0.04] after:pointer-events-none after:select-none"
        >
          <div className="max-w-[720px] relative z-10">
            <span className={`${MONO} inline-block border border-[#FFC900]/40 text-[#FFC900] text-[0.72rem] font-bold tracking-[0.14em] uppercase rounded-full px-4 py-1.5 mb-6`}>
              LIVE · EVERY MONTH
            </span>
            <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-4`}>
              Virtual Molecular Tumor Boards
            </h2>
            <p className={`${FONT} text-white/80 text-[1.02rem] leading-[1.65]`}>
              Once a month, the whole cohort convenes live with Dr. Managoli to work real, current cases end-to-end — morphology to molecular to therapy recommendation. You don&apos;t watch tumor boards. You learn to run them. And your access continues for life, long after the fellowship ends.
            </p>
          </div>
          <div className="flex-shrink-0 relative z-10">
            <button
              onClick={onOpenCohort}
              className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[0.98rem] px-[30px] py-[16px] rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(255,201,0,0.35)] whitespace-nowrap group cursor-pointer`}
            >
              Join the Next Cohort <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VMTBSection;
