"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const exams = [
  {
    id: "frcpath1",
    title: "FRCPath Part 1",
    subtitle: "UK · WRITTEN",
    cardSubtitle: "UK / INTERNATIONAL · WRITTEN PAPER",
    cardTitle: "FRCPath Part 1 Preparation",
    desc: "The written gateway to Part 2. We teach it as a blueprint rather than a booklist — what carries the marks, and where international candidates lose ground.",
    btnText: "Get a Quote",
    includes: [
      "Qbank of SBAs and EMQs mapped to the curriculum",
      "Onion Skin Technique for distractor-heavy stems",
      "Mendel Chitras visual mnemonics for high-yield syndromes",
      "Timed full-length mock papers with performance analytics",
      "Dedicated module on UK governance, HTA and ISO 15189"
    ]
  },
  {
    id: "frcpath2",
    title: "FRCPath Part 2",
    subtitle: "UK · PRACTICAL",
    cardSubtitle: "UK / INTERNATIONAL · FOR IMGs",
    cardTitle: "FRCPath Part 2 Preparation",
    desc: "Built for international medical graduates. Train on the specimen types, reporting style and time pressure of the real exam — with feedback on every case.",
    btnText: "Get a Quote",
    includes: [
      "Exam-pattern digital slide libraries (surgicals, frozen, cytology)",
      "Onion Skin Technique applied to long & short cases",
      "Timed mock examinations with structured feedback",
      "Hybrid mentorship from FRCPath experienced faculty",
      "Reporting language coaching to UK standards"
    ]
  },
  {
    id: "neetss",
    title: "NEET-SS",
    subtitle: "INDIA · SUBSPECIALTY",
    cardSubtitle: "INDIA · SUBSPECIALTY ENTRANCE",
    cardTitle: "NEET-SS Preparation",
    desc: "Dedicated tracks for Onco-Pathology, Clinical Haematology, and Medical Genetics. High-yield content mapped to the exam pattern, with visual mnemonics that hold up under time pressure.",
    btnText: "Get a Quote",
    includes: [
      "Targeted Qbanks mapped to the NEET-SS pattern",
      "Mendel Chitras visual mnemonics for rapid recall",
      "Onion Skin dissection of high-yield MCQ themes",
      "Track-specific mentorship (Onco-Path / Clin Haem / Genetics)",
      "Revision frameworks for the final weeks"
    ]
  },
  {
    id: "abpath",
    title: "ABPath Subspecialty",
    subtitle: "US · BOARDS",
    cardSubtitle: "US · SUBSPECIALTY BOARDS",
    cardTitle: "ABPath Subspecialty Exams",
    desc: "Preparation for Hematopathology, Molecular Genetic Pathology, and other ABP subspecialty examinations — aligned to the official content blueprints and taught from real US sign-out experience.",
    btnText: "Get a Quote",
    includes: [
      "Qbanks aligned to ABP subspecialty blueprints",
      "Digital slide & flow/molecular case libraries",
      "Onion Skin Technique for complex case stems",
      "Hybrid mentorship from US-experienced faculty",
      "Exam-strategy and pacing coaching"
    ]
  }
];

const ExamSelectionSection = () => {
  const [activeTab, setActiveTab] = useState("frcpath1");
  const selectedExam = exams.find(e => e.id === activeTab) || exams[0];

  const scrollToQuote = () => {
    const el = document.getElementById('request-quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="exam-selection" className="bg-[#FAF7F2] py-20 md:py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[2px] bg-[#A16207]"></div>
            <span className="text-[#A16207] text-xs font-black tracking-widest uppercase">
              FOUR TRACKS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#160B29] tracking-tight">
            Pick your exam
          </h2>
        </div>

        {/* 4 Tab Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {exams.map(exam => {
            const isActive = activeTab === exam.id;
            return (
              <button
                key={exam.id}
                onClick={() => setActiveTab(exam.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative bg-white cursor-pointer ${
                  isActive
                    ? 'border-[#E84583] shadow-lg shadow-pink-500/10 ring-1 ring-[#E84583]'
                    : 'border-gray-200/80 hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Active Indicator Pink Dot */}
                {isActive && (
                  <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#E84583]" />
                )}
                
                <h3 className={`text-lg font-black mb-1.5 transition-colors ${isActive ? 'text-[#E84583] pl-3' : 'text-[#160B29]'}`}>
                  {exam.title}
                </h3>
                <p className={`text-[11px] font-bold tracking-widest uppercase ${isActive ? 'text-gray-500 pl-3' : 'text-gray-400'}`}>
                  {exam.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Exam Container Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExam.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-md relative overflow-hidden"
          >
            {/* Left Accent Gradient Vertical Line */}
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-[#E84583] via-[#E84583] to-[#F9C814]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="text-xs font-extrabold tracking-widest text-[#A16207] uppercase mb-3">
                    {selectedExam.cardSubtitle}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#160B29] mb-4 tracking-tight">
                    {selectedExam.cardTitle}
                  </h3>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                    {selectedExam.desc}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 items-center mt-auto">
                  <button
                    onClick={scrollToQuote}
                    className="px-7 py-3.5 rounded-full bg-[#E84583] hover:bg-[#d43773] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    {selectedExam.btnText} <span className="font-normal">→</span>
                  </button>
                  
                  <a
                    href="#request-quote"
                    className="px-7 py-3.5 rounded-full border border-gray-800 text-gray-900 font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Curriculum PDF
                  </a>
                </div>
              </div>

              {/* Right Column: Included Box */}
              <div className="lg:col-span-5 bg-[#F8F5EF] rounded-2xl p-6 md:p-8 border border-[#EBE3D8]">
                <div className="text-xs text-[#E84583] font-black tracking-widest uppercase mb-5">
                  INCLUDED
                </div>
                
                <ul className="flex flex-col gap-4">
                  {selectedExam.includes.map((item, idx) => (
                    <li key={idx} className="flex gap-3.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#E84583] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm md:text-base font-medium leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Inner Banner */}
            <div className="bg-[#F8F5EF] rounded-xl px-6 py-4 mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#EBE3D8]">
              <span className="text-[#160B29] font-extrabold text-sm sm:text-base">
                See all 8 specialties
              </span>
              <span className="text-[#A16207] font-black text-xs tracking-wider uppercase flex items-center gap-1">
                HISTOPATHOLOGY TO GENETICS <span className="text-sm">→</span>
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ExamSelectionSection;