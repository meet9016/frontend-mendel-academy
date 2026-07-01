"use client";

import React from 'react';
import { motion } from 'framer-motion';
const ResearchHeroSection = () => {
  return <section className="bg-[#100b16] py-20 px-6 overflow-hidden relative min-h-[600px] flex items-center">
      {/* Background gradients */}
      <motion.div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E94E8F]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 mb-8">
            <motion.div className="w-2.5 h-2.5 rounded-full bg-[#E94E8F] border-2 border-white/20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}></motion.div>
            <span className="text-[#FFCA00] text-[10px] font-black tracking-widest uppercase ff-font-bold">
              RESEARCH • CANCER STEM CELLS
            </span>
          </div>
          
          <motion.h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            The cells that survive <br />
            treatment — and <br />
            bring the cancer <span className="text-[#E94E8F]">back.</span>
          </motion.h1>
          
          <motion.p className="text-[#A3A8B8] text-base md:text-lg max-w-xl mb-10 leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Cancer stem cells drive therapy resistance, recurrence, and metastasis. 
            Mendel Academy&apos;s research connects their biology to the diagnostic 
            decisions made at the scope and the tumor board — turning a hard 
            problem into actionable interpretation.
          </motion.p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-3.5 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
              Explore Collaboration <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-3.5 rounded-full border border-gray-600 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              Our Research Focus
            </button>
          </div>
        </div>

        {/* Right Graphic - Cells */}
        <div className="flex justify-center items-center h-full relative">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
              {/* Top Right Cell */}
              <circle cx="280" cy="120" r="50" fill="url(#gradPurple)" opacity="0.9" />
              <circle cx="280" cy="120" r="15" fill="#100b16" opacity="0.6" />
              
              {/* Main Left Cell */}
              <circle cx="160" cy="180" r="80" fill="url(#gradPink)" />
              <circle cx="160" cy="180" r="24" fill="#100b16" opacity="0.8" />
              
              {/* Bottom Cell */}
              <circle cx="220" cy="270" r="60" fill="url(#gradPinkDark)" />
              <circle cx="220" cy="270" r="18" fill="#100b16" opacity="0.7" />
              
              {/* Highlighted Yellow Cell */}
              <circle cx="290" cy="240" r="40" fill="url(#gradYellow)" />
              <circle cx="290" cy="240" r="12" fill="#100b16" opacity="0.5" />
              
              {/* Rings around yellow cell */}
              <circle cx="290" cy="240" r="55" stroke="#FFCA00" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" className="animate-spin-slow" style={{
              transformOrigin: '290px 240px'
            }} />
              <circle cx="290" cy="240" r="70" stroke="#FFCA00" strokeWidth="1" opacity="0.4" />

              <defs>
                <radialGradient id="gradPurple" cx="0.3" cy="0.3" r="0.7">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </radialGradient>
                <radialGradient id="gradPink" cx="0.3" cy="0.3" r="0.7">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#BE185D" />
                </radialGradient>
                <radialGradient id="gradPinkDark" cx="0.3" cy="0.3" r="0.7">
                  <stop offset="0%" stopColor="#E94E8F" />
                  <stop offset="100%" stopColor="#831843" />
                </radialGradient>
                <radialGradient id="gradYellow" cx="0.3" cy="0.3" r="0.7">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#CA8A04" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </section>;
};
export default ResearchHeroSection;