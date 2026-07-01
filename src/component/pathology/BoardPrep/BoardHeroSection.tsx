"use client";

import React from 'react';
import { motion } from 'framer-motion';
const BoardHeroSection = () => {
  return <section className="bg-[#100b16] py-20 px-6 overflow-hidden relative border-b-2 border-[#1E1A29] min-h-[600px] flex items-center">
      {/* Background gradients */}
      <motion.div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#E94E8F]/5 rounded-full blur-[120px] pointer-events-none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      <motion.div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none translate-x-1/4 -translate-y-1/4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <div className="text-left">
          <motion.div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFCA00] mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <span className="text-[#100b16] text-[10px] font-black tracking-widest uppercase ff-font-bold">
              FRCPATH • NEET-SS • ABP
            </span>
          </motion.div>
          
          <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight max-w-xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Board prep that trains the <span className="text-[#E94E8F]">pathologist,</span> not just the candidate.
          </motion.h1>
          
          <motion.p className="text-[#A3A8B8] text-base md:text-lg max-w-xl mb-10 leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Qbanks, digital slide libraries, the Onion Skin Technique, and hybrid mentorship — preparation built by examiners&apos; standards and a teacher who knows exactly how these exams think.
          </motion.p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
              Choose Your Exam <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              Not Sure? Talk to Us
            </button>
          </div>
        </div>

        {/* Right Graphic - Target */}
        <div className="flex justify-center items-center h-full relative">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Outer Circles */}
              <circle cx="200" cy="200" r="160" stroke="#2A2438" strokeWidth="2" />
              <circle cx="200" cy="200" r="120" stroke="#3F3752" strokeWidth="2" />
              <circle cx="200" cy="200" r="80" stroke="#E94E8F" strokeWidth="3" />
              <circle cx="200" cy="200" r="40" stroke="#FFCA00" strokeWidth="3" />
              
              <circle cx="200" cy="200" r="12" fill="#FFCA00" />
              
              {/* Target Arrow */}
              <g transform="rotate(-35 200 200)">
                <line x1="200" y1="200" x2="330" y2="200" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M330 190 L345 200 L330 210 Z" fill="#E94E8F" />
              </g>

              {/* Decorative Dots */}
              <circle cx="200" cy="40" r="4" fill="#64748B" />
              <circle cx="200" cy="360" r="4" fill="#64748B" />
              <circle cx="40" cy="200" r="4" fill="#64748B" />
              <circle cx="360" cy="200" r="4" fill="#64748B" />
              <circle cx="280" cy="60" r="4" fill="#8B5CF6" />
              <circle cx="120" cy="340" r="4" fill="#8B5CF6" />
            </svg>
          </div>
        </div>

      </div>
    </section>;
};
export default BoardHeroSection;