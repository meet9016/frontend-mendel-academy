"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
const exams = [{
  id: "frcpath",
  title: "FRCPath Part 2",
  subtitle: "UK • FOR IMGs",
  cardSubtitle: "UK / INTERNATIONAL • FOR IMGs",
  cardTitle: "FRCPath Part 2 Preparation",
  desc: "Practical-emphasis preparation built specifically for international medical graduates. Train on the specimen types, reporting style, and time pressure of the actual exam — with structured feedback on every practice case.",
  btnText: "Start FRCPath Prep",
  includes: ["Exam-pattern digital slide libraries (surgicals, frozen, cytology)", "Onion Skin Technique applied to long & short cases", "Timed mock examinations with structured feedback", "Hybrid mentorship from FRCPath-experienced faculty", "Reporting-language coaching to UK standards"]
}, {
  id: "neetss",
  title: "NEET-SS",
  subtitle: "INDIA • SUBSPECIALTY",
  cardSubtitle: "INDIA • SUBSPECIALTY ENTRANCE",
  cardTitle: "NEET-SS Preparation",
  desc: "Dedicated tracks for Onco-Pathology, Clinical Haematology, and Medical Genetics. High-yield content mapped to the exam pattern, with visual mnemonics that hold up under time pressure.",
  btnText: "Start NEET-SS Prep",
  includes: ["Targeted Qbanks mapped to the NEET-SS pattern", "Mendel Chitras visual mnemonics for rapid recall", "Onion Skin dissection of high-yield MCQ themes", "Track-specific mentorship (Onco-Path / Clin Haem / Genetics)", "Revision frameworks for the final weeks"]
}, {
  id: "abp",
  title: "ABP Subspecialty",
  subtitle: "US • BOARDS",
  cardSubtitle: "US • SUBSPECIALTY BOARDS",
  cardTitle: "ABP Subspecialty Exams",
  desc: "Preparation for Hematopathology, Molecular Genetic Pathology, and other ABP subspecialty examinations — aligned to the official content blueprints and taught from real US sign-out experience.",
  btnText: "Start ABP Prep",
  includes: ["Qbanks aligned to ABP subspecialty blueprints", "Digital slide & flow/molecular case libraries", "Onion Skin Technique for complex case stems", "Hybrid mentorship from US-experienced faculty", "Exam-strategy and pacing coaching"]
}];
const ExamSelectionSection = () => {
  const [activeTab, setActiveTab] = useState("frcpath");
  return <section className="bg-[#FAF8F5] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THREE TRACKS
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Pick your exam
          </motion.h2>
        </div>

        {/* Top Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {exams.map(exam => <button key={exam.id} onClick={() => setActiveTab(exam.id)} className={`p-6 rounded-2xl border text-left transition-all duration-300 relative bg-white
                ${activeTab === exam.id ? 'border-[#E94E8F] shadow-md' : 'border-gray-200 hover:border-gray-300'}
              `}>
              {activeTab === exam.id && <motion.div className="absolute top-0 left-6 w-8 h-1 bg-[#E94E8F] rounded-b" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}></motion.div>}
              <motion.h3 className={`text-lg font-black mb-1 ff-font-bold ${activeTab === exam.id ? 'text-[#E94E8F]' : 'text-[#1E1A29]'}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
                {exam.title}
              </motion.h3>
              <motion.p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
                {exam.subtitle}
              </motion.p>
            </button>)}
        </div>

        {/* Content Cards (Stacked as in screenshot, or just show the active one. The design shows multiple, let's stack them but highlight the active one, or just render all vertically) */}
        <div className="flex flex-col gap-10">
          {exams.map(exam => <div key={exam.id} className={`bg-white rounded-3xl p-8 md:p-12 border transition-all duration-500 overflow-hidden relative
                ${activeTab === exam.id ? 'border-[#FFCA00] shadow-[0_8px_30px_rgb(255,202,0,0.1)] opacity-100' : 'border-gray-100 shadow-sm opacity-60 hover:opacity-100'}
              `}>
              {/* Left Accent line */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${activeTab === exam.id ? 'bg-gradient-to-b from-[#E94E8F] to-[#FFCA00]' : 'bg-gray-200'}`}></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Description */}
                <div>
                  <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase ff-font-bold mb-4">
                    {exam.cardSubtitle}
                  </div>
                  <motion.h3 className="text-3xl font-black text-[#1E1A29] mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                    {exam.cardTitle}
                  </motion.h3>
                  <motion.p className="text-[#64748B] text-base leading-relaxed ff-font mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                    {exam.desc}
                  </motion.p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-6 py-3 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
                      {exam.btnText} <span className="font-normal">→</span>
                    </button>
                    <button className="px-6 py-3 rounded-full border border-gray-300 bg-white text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors ff-font-bold">
                      Program Details
                    </button>
                  </div>
                </div>

                {/* Right Side: Includes Box */}
                <motion.div className="bg-[#FAF8F5] rounded-2xl p-8 border border-[#FFCA00]/20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                  <div className="text-[10px] text-[#E94E8F] font-bold tracking-widest uppercase ff-font-bold mb-6">
                    INCLUDED
                  </div>
                  <ul className="flex flex-col gap-4">
                    {exam.includes.map((item, idx) => <motion.li key={idx} className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                  once: true,
                  margin: "-50px"
                }} transition={{
                  duration: 0.6
                }}>
                        <div className="mt-1 flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <span className="text-[#64748B] text-sm leading-relaxed ff-font">
                          {item}
                        </span>
                      </motion.li>)}
                  </ul>
                </motion.div>
              </div>

            </div>)}
        </div>

      </div>
    </section>;
};
export default ExamSelectionSection;