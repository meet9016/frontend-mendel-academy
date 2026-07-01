"use client";

import React from 'react';
import { motion } from 'framer-motion';
const ConsultingHeroSection = () => {
  return <section className="bg-[#100b16] py-24 px-6 overflow-hidden relative min-h-[600px] flex items-center border-b-2 border-[#1E1A29]">
      {/* Background gradients */}
      <motion.div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E94E8F]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      <motion.div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.6
    }}></motion.div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        <div className="text-left">
          <motion.div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFCA00] mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <span className="text-[#100b16] text-[10px] font-black tracking-widest uppercase ff-font-bold">
              CONSULTING & ADVISORY • DR. KISHOR MANGOLI, MD
            </span>
          </motion.div>
          
          <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight max-w-3xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            When the stakes are high, <br />
            bring in <span className="text-[#E94E8F]">35 years of expertise.</span>
          </motion.h1>
          
          <motion.p className="text-[#A3A8B8] text-base md:text-lg max-w-2xl mb-10 leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Second opinions on the cases that keep you up at night. Biomarker strategy that survives regulatory scrutiny. Molecular labs built right the first time. Beyond training — direct access to decades of high-volume diagnostic and industry experience.
          </motion.p>
          
          {/* Metrics Pills */}
          <div className="flex flex-wrap gap-4 mb-12">
            <motion.div className="px-4 py-2 rounded-full border border-gray-700 bg-white/5 text-[10px] text-white font-bold tracking-widest uppercase ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00]">22+ yrs</span> leading high-volume labs
            </motion.div>
            <motion.div className="px-4 py-2 rounded-full border border-gray-700 bg-white/5 text-[10px] text-white font-bold tracking-widest uppercase ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00]">50,000+</span> accessions/year
            </motion.div>
            <motion.div className="px-4 py-2 rounded-full border border-gray-700 bg-white/5 text-[10px] text-white font-bold tracking-widest uppercase ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00]">40+</span> Pharma/CRO collaborations
            </motion.div>
            <motion.div className="px-4 py-2 rounded-full border border-gray-700 bg-white/5 text-[10px] text-white font-bold tracking-widest uppercase ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00]">US-India</span> dual perspective
            </motion.div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
              Schedule a 30-Minute Discovery Call <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-4 rounded-full border border-gray-600 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              Explore Services
            </button>
          </div>
        </div>

      </div>
    </section>;
};
export default ConsultingHeroSection;