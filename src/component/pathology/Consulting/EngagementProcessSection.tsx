"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

const EngagementProcessSection = () => {
  return (
    <section className={`${FONT} bg-[#FAF8F5] py-[40px] md:py-[60px] px-6 border-b border-[#E6E0D8]`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="bg-[#150E28] rounded-[24px] p-8 sm:p-12 text-white shadow-xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
              How an engagement works
            </h2>
            <p className="text-white/70 text-[1.02rem]">
              Simple, transparent, and scoped before any commitment.
            </p>
          </div>

          {/* 2 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 01 */}
            <div className="bg-white/5 border border-white/10 rounded-[18px] p-6 sm:p-7">
              <span className={`${MONO} block text-[0.78rem] font-bold tracking-[0.1em] text-[#FFC900] uppercase mb-3`}>
                01
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2.5">
                Introductory call
              </h3>
              <p className="text-white/80 text-[0.93rem] leading-relaxed">
                A complimentary 30-minute call to understand your case, program, or project — and to scope exactly what&apos;s needed. No charge, no obligation.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white/5 border border-white/10 rounded-[18px] p-6 sm:p-7">
              <span className={`${MONO} block text-[0.78rem] font-bold tracking-[0.1em] text-[#FFC900] uppercase mb-3`}>
                02
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2.5">
                Scoped deliverables
              </h3>
              <p className="text-white/80 text-[0.93rem] leading-relaxed">
                Direct work with Dr. Managoli against a clear, agreed fee — second-opinion reports, advisory sessions, lab plans, or program design, plus follow-up support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementProcessSection;