"use client";
import React from 'react';
import DNAGraphic from './DNAGraphic';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface HeroSectionProps {
  onOpenApply?: () => void;
  onOpenCurriculum?: () => void;
}

const HeroSection = ({ onOpenApply, onOpenCurriculum }: HeroSectionProps) => {
  return (
    <section
      id="fellowship"
      className={`${FONT} relative bg-[radial-gradient(1100px_700px_at_80%_10%,#1E1540,#150E28_65%)] text-white overflow-hidden py-[64px] md:py-[84px] px-6`}
    >
      <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div className="max-w-[680px]">
          {/* Flagchip */}
          <span className={`${MONO} inline-block text-[0.7rem] tracking-[0.16em] uppercase bg-[#FFC900] text-[#1A1502] px-4 py-[7px] rounded-full mb-[22px] font-semibold`}>
            ★ Flagship Program · Next Cohort Enrolling
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl leading-[1.08] tracking-[-0.025em] font-extrabold text-white mb-[22px]">
            12-Month Virtual Fellowship in <span className="text-[#E0568F]">Molecular Pathology Interpretation</span> &amp;{' '}
            <span className="text-[#E0568F]">Precision Oncology</span>
          </h1>

          {/* Fact chips */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-[38px] sm:mb-[42px]">
            {[
              { n: '12', t: 'months' },
              { n: '100%', t: 'virtual' },
              { n: 'Monthly', t: 'live vMTB' },
              { n: '4–6', t: 'hrs/week' },
              { n: 'Lifetime', t: 'community access' },
            ].map((chip, idx) => (
              <span
                key={idx}
                className={`${MONO} text-[0.72rem] sm:text-[0.95rem] tracking-[0.06em] sm:tracking-[0.02em] border border-white/25 sm:border-white/30 rounded-full px-4 sm:px-5 py-2 sm:py-[10px] text-white/85 sm:text-white/90 leading-[1.45]`}
              >
                <b className="text-[#FFC900] font-semibold sm:font-bold">{chip.n}</b> {chip.t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href="#mp-pricing"
              onClick={(e) => {
                const el = document.getElementById('mp-pricing');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`${FONT} inline-flex items-center justify-center font-bold text-[0.95rem] px-[26px] py-[13px] rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,201,0,0.35)]`}
            >
              Fellowship
            </a>
            <a
              href="#vmtb"
              onClick={(e) => {
                const el = document.getElementById('vmtb');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`${FONT} inline-flex items-center justify-center font-bold text-[0.95rem] px-[26px] py-[13px] rounded-full bg-transparent text-white border border-white/30 transition-all duration-180 hover:-translate-y-0.5 hover:border-white hover:bg-white/10`}
            >
              Virtual Molecular Tumor Board
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenCurriculum) onOpenCurriculum();
              }}
              className={`${FONT} inline-flex items-center justify-center font-bold text-[0.95rem] px-[26px] py-[13px] rounded-full bg-transparent text-white border border-white/30 transition-all duration-180 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 cursor-pointer`}
            >
              Curriculum
            </button>
          </div>
        </div>

        {/* DNA Graphic */}
        <div className="w-full flex justify-center lg:justify-end">
          <DNAGraphic />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;