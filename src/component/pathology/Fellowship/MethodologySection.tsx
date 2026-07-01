"use client";

import React from 'react';
const MethodologySection = () => {
  return <section className="bg-[#100b16] py-24 px-6 border-b-2 border-[#1E1A29]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              HOW YOU LEARN
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight ff-font-bold max-w-xl">
            A methodology you won&apos;t find anywhere else
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300">
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-3">
              METHOD . 01
            </div>
            <h3 className="text-white text-xl font-black mb-3 ff-font-bold">
              Problem-Based Learning
            </h3>
            <p className="text-[#A3A8B8] text-sm leading-relaxed ff-font">
              Every module opens with a real clinical vignette — you reason your way to the diagnosis before the teaching begins, exactly as you would in practice.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300">
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-3">
              METHOD . 02
            </div>
            <h3 className="text-white text-xl font-black mb-3 ff-font-bold">
              Onion Skin Technique
            </h3>
            <p className="text-[#A3A8B8] text-sm leading-relaxed ff-font">
              Our proprietary layer-by-layer dissection of complex cases and exam questions, building diagnostic confidence that survives contact with ambiguity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300">
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-3">
              METHOD . 03
            </div>
            <h3 className="text-white text-xl font-black mb-3 ff-font-bold">
              Mendel Chitras
            </h3>
            <p className="text-[#A3A8B8] text-sm leading-relaxed ff-font">
              Visual mnemonics and sketchnotes that compress complex molecular pathways into images you&apos;ll recall at the scope. Samples available on request.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300">
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-3">
              METHOD . 04
            </div>
            <h3 className="text-white text-xl font-black mb-3 ff-font-bold">
              7-Step Clinical Reasoning
            </h3>
            <p className="text-[#A3A8B8] text-sm leading-relaxed ff-font">
              A repeatable framework that turns scattered findings — morphology, IHC, molecular — into one defensible, integrated report.
            </p>
          </div>

        </div>

      </div>
    </section>;
};
export default MethodologySection;