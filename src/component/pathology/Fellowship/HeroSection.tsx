"use client";
import React from 'react';

import { FaCheckCircle } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="fellowship" className="bg-[#100b16] py-24 px-6 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-left relative z-10">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
            FLAGSHIP PROGRAM
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#FFCA00] mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          <span className="text-black text-[9px] font-black tracking-widest uppercase ff-font-bold">
            FLAGSHIP • NEXT COHORT ENROLLING
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.15] mb-6 ff-font-bold tracking-tight">
          12-Month Virtual Fellowship in<br />
          Molecular Pathology<br />
          Interpretation & Precision<br />
          Oncology
        </h2>
        
        <p className="text-gray-300 text-sm leading-relaxed ff-font mb-12 max-w-2xl">
          The most comprehensive interpretation-focused program for practicing pathologists who want to<br />
          lead in precision oncology.
        </p>
        
        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* FORMAT */}
          <div className="bg-[#161221] rounded-2xl p-6 border border-gray-800">
            <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3 block">FORMAT</span>
            <p className="text-white text-xs ff-font leading-relaxed">
              100% virtual, PBL-driven live program with Virtual Molecular Tumor Boards (vMTB)
            </p>
          </div>
          
          {/* FOCUS */}
          <div className="bg-[#161221] rounded-2xl p-6 border border-gray-800">
            <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3 block">FOCUS</span>
            <p className="text-white text-xs ff-font leading-relaxed">
              H&E, IHC, IF, Flow, FISH, PCR, NGS, PGx, resistance mechanisms, CDx/ADC biomarkers, therapy selection, microbiology
            </p>
          </div>
          
          {/* METHODOLOGY */}
          <div className="bg-[#161221] rounded-2xl p-6 border border-gray-800">
            <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3 block">METHODOLOGY</span>
            <p className="text-white text-xs ff-font leading-relaxed">
              Problem-Based Learning (PBL) + Onion Skin Technique + Mendel Chitras + 7-step clinical reasoning
            </p>
          </div>
          
          {/* DESIGNED FOR */}
          <div className="bg-[#161221] rounded-2xl p-6 border border-gray-800">
            <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3 block">DESIGNED FOR</span>
            <p className="text-white text-xs ff-font leading-relaxed">
              Surgical pathologists, hematopathologists, oncologists, hemato-oncologists, residents, and fellows
            </p>
          </div>
        </div>

        {/* Big White Card */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Confidently interpret and clinically integrate complex morphologic, immunophenotypic, and molecular information using NGS, liquid biopsy, and multi-omic results to guide therapy selection
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Lead or actively contribute to Molecular Tumor Boards with authority and structured reasoning
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Design and implement reflex testing algorithms and companion diagnostic (CDx) strategies in your institution
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Reduce diagnostic uncertainty in challenging cases using proven frameworks (Onion Skin Technique)
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Mentor colleagues and build precision oncology capabilities within your team or department
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaCheckCircle className="w-4 h-4 text-[#E94E8F] flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs ff-font leading-relaxed">
                Position yourself for leadership roles such as Molecular Pathology Consultant, Lab Director, or Tumor Board Lead
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-6 py-3 rounded-full bg-[#FFCA00] text-black font-bold text-[11px] tracking-wide hover:bg-yellow-400 transition-colors ff-font-bold">
            Apply Now / Enroll in Next Cohort →
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-600 text-white font-bold text-[11px] tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
            Download Full Fellowship Brochure
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
