"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AdvancedPathologyHero = () => {
  return (
    <section className="bg-[#100b16] relative pt-32 pb-24 overflow-hidden border-t border-[#2A2438]">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E94E8F]/20 via-[#100b16] to-[#100b16] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="max-w-4xl w-full flex flex-col items-start">
          
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FLAGSHIP PROGRAM
            </span>
          </div>

          <div className="inline-block px-3 py-1.5 bg-[#FFCA00] text-[#1E1A29] text-[10px] font-black tracking-widest uppercase rounded-sm mb-6 shadow-[0_0_15px_rgba(255,202,0,0.3)] ff-font-bold">
            <span className="mr-2">★</span>
            FLAGSHIP PROGRAM • NEXT COHORT ENROLLING
          </div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 ff-font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            12-Month Virtual <br />
            Fellowship in <br />
            <span className="text-[#E94E8F]">Molecular Pathology</span><br />
            <span className="text-[#E94E8F]">Interpretation &</span><br />
            <span className="text-white">Precision Oncology</span>
          </motion.h1>

          <motion.p 
            className="text-[#A3A8B8] text-base md:text-lg max-w-3xl leading-relaxed ff-font mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The most comprehensive interpretation-focused program for practicing pathologists who want to lead in precision oncology — built around real cases, live tumor boards, and frameworks you'll use every day at the scope.
          </motion.p>

          {/* Grid of 4 dark cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
            <motion.div className="bg-[#1A1525] border border-[#2A2438] rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FORMAT</div>
              <p className="text-white text-sm leading-relaxed ff-font">100% virtual, PBL-driven live program with Virtual Molecular Tumor Boards (vMTB)</p>
            </motion.div>
            <motion.div className="bg-[#1A1525] border border-[#2A2438] rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FOCUS</div>
              <p className="text-white text-sm leading-relaxed ff-font">IHC, IF, Flow, FISH, PCR, NGS, PGx, resistance mechanisms, CDx/ADx biomarkers, therapy selection, microbiology</p>
            </motion.div>
            <motion.div className="bg-[#1A1525] border border-[#2A2438] rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">METHODOLOGY</div>
              <p className="text-white text-sm leading-relaxed ff-font">Problem-Based Learning (PBL) + Onion Skin Technique + Mendel Chitras + Clinicopathological reasoning</p>
            </motion.div>
            <motion.div className="bg-[#1A1525] border border-[#2A2438] rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">DESIGNED FOR</div>
              <p className="text-white text-sm leading-relaxed ff-font">Surgical pathologists, hematopathologists, oncologists, hemato-oncologists, residents, and fellows</p>
            </motion.div>
          </div>

          {/* Large White Box with Checkmarks */}
          <motion.div 
            className="bg-white rounded-xl p-8 md:p-10 w-full shadow-xl mb-12"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Confidently interpret and clinically integrate complex morphologic immunophenotypic and molecular information using NGS, liquid biopsy, and multi-omic results to guide therapy selection
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Lead or actively contribute to Molecular Tumor Boards with authority and structured reasoning
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Design and implement reflex testing algorithms and companion diagnostic (CDx) strategies in your institution
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Resolve diagnostic uncertainty in challenging cases using proven frameworks (Onion Skin Technique)
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Mentor colleagues and build precision oncology capabilities within your team or department
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full bg-[#E94E8F] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Position yourself for leadership roles such as Molecular Pathology Consultant, Lab Director, or Tumor Board Lead
                </p>
              </div>

            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 w-full"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:bg-[#F0BE00] transition-colors ff-font-bold flex items-center gap-2">
              Apply Now / Enroll in Next Cohort <span className="font-normal text-lg leading-none">→</span>
            </button>
            <button className="px-8 py-4 rounded-full border border-[#2A2438] text-white hover:bg-white/5 transition-colors font-bold text-sm tracking-wide ff-font-bold">
              Download Full Fellowship Brochure
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AdvancedPathologyHero;
