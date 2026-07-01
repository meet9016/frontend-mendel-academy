"use client";

import React from 'react';
import { motion } from 'framer-motion';
const MasteryHeroSection = () => {
  return <section className="bg-[#100b16] py-20 px-6 overflow-hidden relative border-b-2 border-[#1E1A29] min-h-[500px] flex items-center">
      {/* Background gradients */}
      <motion.div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E94E8F]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      <motion.div className="absolute top-[-50px] right-[-50px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-left max-w-2xl">
          <motion.div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFCA00] mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <span className="text-[#100b16] text-[10px] font-black tracking-widest uppercase ff-font-bold">
              4-8 WEEK INTENSIVES • VIRTUAL COHORTS
            </span>
          </motion.div>
          
          <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Specialized Mastery Courses. <br />
            <span className="text-[#E94E8F]">Go deep, fast.</span>
          </motion.h1>
          
          <motion.p className="text-[#A3A8B8] text-base md:text-lg mb-10 leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            High-impact, focused programs for rapid skill elevation in high-complexity diagnostic areas — built on the same case-based methods and proprietary frameworks as our flagship fellowship.
          </motion.p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
              Browse Courses <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              Corporate & Institutional Cohorts
            </button>
          </div>
        </div>

      </div>
    </section>;
};
export default MasteryHeroSection;