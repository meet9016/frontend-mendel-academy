"use client";

import React, { useState } from 'react';
const phases = [{
  num: "01",
  title: "Foundations",
  duration: "Months 1-3",
  contentTitle: "Foundations of Integrated Diagnosis",
  contentDesc: "Re-anchor your morphologic skills in a molecular context: how H&E, IHC, IF, and flow findings frame every downstream molecular question. Introduction to the Onion Skin Technique and the 7-step clinical reasoning framework.",
  pills: ["H&E", "IHC", "IF", "FLOW", "7-STEP REASONING"]
}, {
  num: "02",
  title: "Molecular Methods",
  duration: "Months 4-6",
  contentTitle: "Mastering Molecular Technologies",
  contentDesc: "Deep dive into NGS, PCR, FISH, and liquid biopsy. Understand the mechanics, limitations, and clinical applications of each method to confidently select the right test for the right patient.",
  pills: ["NGS", "PCR", "FISH", "LIQUID BIOPSY"]
}, {
  num: "03",
  title: "Precision Oncology",
  duration: "Months 7-9",
  contentTitle: "Clinical Integration and Actionability",
  contentDesc: "Translate molecular findings into therapeutic decisions. Learn to interpret complex variants, understand resistance mechanisms, and guide oncologists in matching patients with targeted therapies.",
  pills: ["VARIANT INTERPRETATION", "TARGETED THERAPIES", "RESISTANCE"]
}, {
  num: "04",
  title: "Leadership",
  duration: "Months 10-12",
  contentTitle: "Leading the Molecular Tumor Board",
  contentDesc: "Synthesize all skills to actively contribute or lead Molecular Tumor Boards. Develop comprehensive molecular reports and establish yourself as the indispensable diagnostic authority in your institution.",
  pills: ["MTB LEADERSHIP", "COMPREHENSIVE REPORTING", "CONSULTATION"]
}];
const PhasesSection = () => {
  const [activePhase, setActivePhase] = useState(0);
  return <section className="bg-[#FAF8F5] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THE JOURNEY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-4 ff-font-bold">
            Twelve months. Four phases. <br />
            One <span className="text-[#E94E8F]">transformed practice.</span>
          </h2>
          <p className="text-[#64748B] text-base md:text-lg max-w-3xl leading-relaxed ff-font">
            A deliberate arc from morphologic foundations to molecular leadership — every phase anchored
            in real cases and live discussion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100">
            {phases.map((phase, index) => <button key={index} onClick={() => setActivePhase(index)} className={`p-6 text-left transition-colors duration-200 relative ${activePhase === index ? 'bg-white' : 'bg-[#FAFAFA] hover:bg-gray-50'}`}>
                {activePhase === index && <div className="absolute top-0 left-0 w-full h-1 bg-[#E94E8F]"></div>}
                <div className="text-[#FFCA00] text-xs font-black mb-1 ff-font-bold">{phase.num}</div>
                <div className={`text-base font-black mb-1 ff-font-bold ${activePhase === index ? 'text-[#E94E8F]' : 'text-[#1E1A29]'}`}>
                  {phase.title}
                </div>
                <div className="text-gray-400 text-xs ff-font font-medium">{phase.duration}</div>
              </button>)}
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-black text-[#1E1A29] mb-4 ff-font-bold">
              {phases[activePhase].contentTitle}
            </h3>
            <p className="text-[#64748B] text-base leading-relaxed ff-font max-w-4xl mb-8">
              {phases[activePhase].contentDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {phases[activePhase].pills.map((pill, idx) => <div key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 text-[10px] font-bold tracking-wider uppercase ff-font-bold">
                  {pill}
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PhasesSection;