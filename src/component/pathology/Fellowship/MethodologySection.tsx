"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const methods = [
  {
    num: "METHOD · 01",
    title: "Problem-Based Learning",
    desc: "Every module opens with a real clinical vignette — you reason your way to the diagnosis before the teaching begins, exactly as you would in practice.",
  },
  {
    num: "METHOD · 02",
    title: "Onion Skin Technique",
    desc: "Our proprietary layer-by-layer dissection of complex cases and exam questions, building diagnostic confidence that survives contact with ambiguity.",
  },
  {
    num: "METHOD · 03",
    title: "Mendel Chitras",
    desc: "Visual mnemonics and sketchnotes that compress complex molecular pathways into images you'll recall at the scope. Samples available on request.",
  },
  {
    num: "METHOD · 04",
    title: "7-Step Clinical Reasoning",
    desc: "A repeatable framework that turns scattered findings — morphology, IHC, molecular — into one defensible, integrated report.",
  },
];

const MethodologySection = () => {
  return (
    <section className={`${FONT} bg-[#150E28] text-white py-[92px] px-6 border-b border-white/10 relative`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="max-w-[780px] mb-[50px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-white/55 mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            HOW YOU LEARN
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-white leading-[1.08] tracking-[-0.025em]`}>
            A methodology you won&apos;t find anywhere else
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, index) => (
            <div
              key={index}
              className="bg-white/[0.05] border border-white/[0.12] rounded-[16px] p-[30px] transition-colors duration-300 hover:border-[#FFC900]/40"
            >
              <span className={`${FONT} block text-[0.68rem] tracking-[0.14em] uppercase text-[#FFC900] mb-3`}>
                {method.num}
              </span>
              <h3 className={`${FONT} text-[1.3rem] font-extrabold text-white leading-[1.08] tracking-[-0.01em] mb-2.5`}>
                {method.title}
              </h3>
              <p className={`${FONT} text-white/75 text-[0.95rem] leading-[1.65]`}>
                {method.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
