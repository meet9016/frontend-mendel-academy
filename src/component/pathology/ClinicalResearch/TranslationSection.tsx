"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TranslationSection = () => {
  return (
    <section className="bg-[#FAF8F5] pt-24 pb-0 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-start text-left">
        <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FROM BENCH TO REPORT
            </span>
          </div>
          <motion.h2 className="text-3xl md:text-4xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            Research that reaches the <span className="text-[#E94E8F]">patient</span>
          </motion.h2>
          <motion.p className="text-[#64748B] text-sm md:text-lg max-w-2xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            The point of the science isn't the paper — it's a better-matched therapy. Here's how the work flows into practice.
          </motion.p>
        </div>

        {/* 4 Steps */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-24 relative w-full">
          
          <motion.div className="flex-1 bg-white rounded-xl p-8 border border-gray-100 shadow-sm relative group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-4">01</div>
            <h3 className="text-[#1E1A29] text-base md:text-lg font-black mb-3 ff-font-bold">Discover</h3>
            <p className="text-[#64748B] text-xs md:text-sm leading-relaxed ff-font">Identify and validate cancer stem cell markers and pathways.</p>
            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center text-[#E94E8F] opacity-50 z-10">
              →
            </div>
          </motion.div>

          <motion.div className="flex-1 bg-white rounded-xl p-8 border border-gray-100 shadow-sm relative group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-4">02</div>
            <h3 className="text-[#1E1A29] text-base md:text-lg font-black mb-3 ff-font-bold">Translate</h3>
            <p className="text-[#64748B] text-xs md:text-sm leading-relaxed ff-font">Turn findings into assays and interpretation frameworks.</p>
            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center text-[#E94E8F] opacity-50 z-10">
              →
            </div>
          </motion.div>

          <motion.div className="flex-1 bg-white rounded-xl p-8 border border-gray-100 shadow-sm relative group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-4">03</div>
            <h3 className="text-[#1E1A29] text-base md:text-lg font-black mb-3 ff-font-bold">Integrate</h3>
            <p className="text-[#64748B] text-xs md:text-sm leading-relaxed ff-font">Embed them into diagnostic reporting and tumor board reasoning.</p>
            {/* Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center text-[#E94E8F] opacity-50 z-10">
              →
            </div>
          </motion.div>

          <motion.div className="flex-1 bg-white rounded-xl p-8 border border-gray-100 shadow-sm relative group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-4">04</div>
            <h3 className="text-[#1E1A29] text-base md:text-lg font-black mb-3 ff-font-bold">Treat</h3>
            <p className="text-[#64748B] text-xs md:text-sm leading-relaxed ff-font">Inform therapy selection, resistance monitoring, and trial design.</p>
          </motion.div>

        </div>

        {/* CTA Banner */}
        <motion.div className="bg-[#1E1A29] mb-4 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
          {/* Abstract DNA/Wave Graphic in background */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,50 Q25,10 50,50 T100,50" fill="none" stroke="#E94E8F" strokeWidth="2"/>
              <path d="M0,60 Q25,20 50,60 T100,60" fill="none" stroke="#FFCA00" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-xl">
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">
              RESEARCH COLLABORATION
            </div>
            <motion.h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 ff-font-bold">
              Partner with us on the next breakthrough
            </motion.h2>
            <motion.p className="text-gray-400 text-sm leading-relaxed ff-font">
              We collaborate with academic centers, pharmaceutical companies, and CROs to push the boundaries of spatial biology, stem cell markers, and precision oncology diagnostics.
            </motion.p>
          </div>
          
          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('start-conversation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/pathology#start-conversation';
              }}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center justify-center gap-2">
              Start a Conversation <span className="font-normal">→</span>
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TranslationSection;