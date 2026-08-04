"use client";

import React, { useState } from 'react';
import { triggerPdfDownload } from '@/utils/downloadPdf';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const phases = [
  {
    num: "01",
    title: "Foundations",
    duration: "Months 1–3",
    contentTitle: "Foundations of Integrated Diagnosis",
    contentDesc:
      "Re-anchor your morphologic skills in a molecular context: how H&E, IHC, IF, and flow findings frame every downstream molecular question. Introduction to the Onion Skin Technique and the 7-step clinical reasoning framework.",
    pills: ["H&E", "IHC", "IF", "FLOW", "7-STEP REASONING"],
  },
  {
    num: "02",
    title: "Molecular Methods",
    duration: "Months 4–6",
    contentTitle: "Molecular Methods & Interpretation",
    contentDesc:
      "FISH, PCR, and NGS from the interpreter's chair: panel design logic, variant classification, report anatomy, quality pitfalls, and when to trust — or challenge — a molecular result.",
    pills: ["FISH", "PCR", "NGS", "VARIANT CLASSIFICATION", "QC PITFALLS"],
  },
  {
    num: "03",
    title: "Precision Oncology",
    duration: "Months 7–9",
    contentTitle: "Precision Oncology in Practice",
    contentDesc:
      "Liquid biopsy, PGx, resistance mechanisms, and CDx/ADC biomarkers — connecting every result to therapy selection and the questions oncologists actually ask at the tumor board.",
    pills: ["LIQUID BIOPSY", "PGx", "RESISTANCE", "CDx / ADC", "THERAPY SELECTION"],
  },
  {
    num: "04",
    title: "Leadership",
    duration: "Months 10–12",
    contentTitle: "Leadership & Implementation",
    contentDesc:
      "Reflex testing algorithms, institutional CDx strategy, leading molecular tumor boards, mentoring your team — and a capstone case portfolio that demonstrates your new capabilities.",
    pills: ["REFLEX ALGORITHMS", "MTB LEADERSHIP", "CDx STRATEGY", "CAPSTONE"],
  },
];

const PhasesSection = () => {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className={`${FONT} bg-[#FAF7F2] text-[#241E3D] py-[60px] md:py-[80px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Section Head */}
        <div className="max-w-[780px] mb-[40px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            THE JOURNEY
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.025em]`}>
            Twelve months. Four phases.<br />
            One <span className="text-[#E0568F]">transformed practice.</span>
          </h2>
        </div>

        {/* Interactive Curriculum Explorer Card */}
        <div className="bg-white border border-[#E6E0D8] rounded-[20px] overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {phases.map((phase, index) => {
              const isActive = activePhase === index;
              return (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`p-[22px_18px] text-left transition-colors duration-200 border-b border-[#E6E0D8] border-r last:border-r-0 appearance-none ${FONT} ${isActive
                    ? 'bg-white relative after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[3px] after:bg-[linear-gradient(90deg,#E0568F,#FFC900)] after:z-10'
                    : 'bg-[#FAF7F2] hover:bg-white'
                    }`}
                >
                  <b className={`${FONT} block text-[0.8rem] tracking-[0.08em] text-[#C79A00] mb-2`}>
                    {phase.num}
                  </b>
                  <span
                    className={`block font-extrabold text-[1.05rem] tracking-[-0.01em] ${isActive ? 'text-[#E0568F]' : 'text-[#241E3D]'
                      }`}
                  >
                    {phase.title}
                  </span>
                  <small className={`${FONT} block text-[0.66rem] tracking-[0.06em] text-[#5C5575] mt-1`}>
                    {phase.duration}
                  </small>
                </button>
              );
            })}
          </div>

          {/* Progress Fill Bar */}
          <div className="h-[4px] bg-[#E6E0D8]">
            <span
              className="block h-full bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-all duration-[350ms] ease-in-out"
              style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
            />
          </div>

          {/* Active Panel Content */}
          <div className="p-[34px_38px]">
            <div key={activePhase} className="transition-all duration-300">
              <h3 className={`${FONT} text-[1.4rem] md:text-[1.5rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.01em] mb-[12px]`}>
                {phases[activePhase].contentTitle}
              </h3>
              <p className={`${FONT} text-[#5C5575] text-[0.98rem] leading-[1.65] max-w-[760px] mb-5`}>
                {phases[activePhase].contentDesc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {phases[activePhase].pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className={`${FONT} text-[0.68rem] tracking-[0.06em] bg-white border border-[#E6E0D8] rounded-full px-3 py-[6px] text-[#5C5575]`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-[36px] text-center">
          <p className={`${FONT} text-[#5C5575] text-[0.98rem] mb-4`}>
            Want the full picture? Download the month-by-month roadmap — or the visual guide to every fellowship format.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.open('/Mendel_Fellowship_Roadmap.pdf', '_blank')}
              className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-[#FFC900] text-[#1A1502] border-2 border-transparent transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)] group cursor-pointer`}
            >
              Download the Roadmap <span className="transition-transform duration-[180ms] group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/images/Fellowship_Modules.jpg';
                a.download = 'Fellowship_Modules.jpg';
                a.click();
              }}
              className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-transparent text-[#241E3D] border-2 border-[#241E3D] transition-all duration-[180ms] hover:-translate-y-0.5 hover:bg-[#241E3D] hover:text-white group cursor-pointer`}
            >
              Fellowship Modules <span className="transition-transform duration-[180ms] group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;