"use client";
import React from 'react';
import { motion } from 'framer-motion';
import DNAGraphic from './DNAGraphic';

const HeroSection = () => {
  return (
    <section id="fellowship" className="bg-[#100b16] py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Column Content */}
        <div className="flex-1 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFCA00] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <span className="text-black text-[9px] font-black tracking-widest uppercase ff-font-bold">
              FLAGSHIP PROGRAM • NEXT COHORT ENROLLING
            </span>
          </div>
          
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight">
            12-Month Virtual<br />
            Fellowship in<br />
            <span className="text-[#E94E8F]">Molecular Pathology<br />
            Interpretation</span> &<br />
            Precision Oncology
          </h1>
          
          <p className="text-[#A3A8B8] text-sm md:text-base leading-relaxed ff-font mb-8">
            The most comprehensive interpretation-focused program for practicing pathologists who want to lead in precision oncology — built around real cases, live tumor boards, and frameworks you'll use every day at the scope.
          </p>
          
          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {['12 months', '100% virtual', 'Monthly live vMTB', '~4-6 hrs/week', 'Lifetime community access'].map((pill, idx) => (
              <div key={idx} className="px-4 py-1.5 rounded-full border border-gray-700 bg-white/5 text-[#FFCA00] text-[10px] font-bold tracking-widest ff-font-bold">
                {pill}
              </div>
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-black font-black text-xs md:text-sm tracking-wide hover:bg-yellow-400 transition-colors ff-font-bold flex items-center gap-2">
              Apply for the Next Cohort <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-bold text-xs md:text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              Download Full Brochure
            </button>
          </div>
        </div>

        {/* Right Column Graphic */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
          <DNAGraphic />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
