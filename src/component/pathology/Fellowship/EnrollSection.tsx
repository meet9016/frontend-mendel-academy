"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

interface EnrollSectionProps {
  onOpenApply?: () => void;
}

const EnrollSection = ({ onOpenApply }: EnrollSectionProps) => {
  return (
    <section id="enroll" className={`${FONT} bg-[#FAF7F2] py-[60px] md:py-[72px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="relative overflow-hidden bg-[radial-gradient(1100px_600px_at_50%_50%,#1F1338,#0F081C_85%)] border border-white/10 rounded-[32px] p-[54px_24px] sm:p-[72px_54px] text-center flex flex-col items-center justify-center gap-7 shadow-[0_30px_70px_rgba(15,8,28,0.28)]
          after:content-[''] after:absolute after:-right-[120px] after:-bottom-[160px] after:w-[480px] after:h-[480px] after:rounded-full after:border after:border-white/10 after:pointer-events-none"
        >
          <h2 className={`${FONT} text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-[-0.02em]`}>
            Application is simple.<br />
            <span className="text-[#E0568F] font-extrabold">Seats are limited.</span>
          </h2>

          <div className="mt-2">
            <button
              onClick={onOpenApply}
              className={`${FONT} inline-flex items-center gap-2 font-bold text-[0.98rem] px-[32px] py-[16px] rounded-full bg-[#E0568F] text-white transition-all duration-200 hover:bg-[#B03A6C] hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(224,86,143,0.42)] group`}
            >
              Start Your Application <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;
