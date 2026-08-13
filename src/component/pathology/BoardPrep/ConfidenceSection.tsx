"use client";

import React from 'react';
import { motion } from 'framer-motion';

const engines = [
  {
    num: "01",
    title: "Onion Skin Technique for deep MCQ & case dissection"
  },
  {
    num: "02",
    title: "Mendel Chitras — visual mnemonics built for recall"
  },
  {
    num: "03",
    title: "Hybrid mentorship — never prepare alone"
  },
  {
    num: "04",
    title: "Community of candidates & alumni who've cleared it"
  }
];

const ConfidenceSection = () => {
  return (
    <section className="bg-[#FAF7F2] pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-[#110922] rounded-[32px] p-8 sm:p-10 md:p-14 shadow-2xl overflow-hidden text-white relative border border-[#201534]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9A33FF]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="mb-10 max-w-none">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight md:whitespace-nowrap">
              Why our candidates walk in confident
            </h2>
            <p className="text-[#B4ADC3] text-sm md:text-base leading-relaxed max-w-2xl">
              Every track shares the same engine — the methods that make Mendel preparation
              different from passive video courses and question grinding.
            </p>
          </div>

          {/* 4 Engine Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {engines.map((eng, idx) => (
              <motion.div
                key={eng.num}
                className="bg-[#160E2B] border border-[#251B3D] hover:border-[#FCCA29]/40 rounded-2xl p-6 min-h-[160px] transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:bg-[#1C1236]"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="text-[#FCCA29] text-[10px] font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-1.5 transition-colors">
                    <span>ENGINE</span>
                    <span>·</span>
                    <span>{eng.num}</span>
                  </div>
                  <h3 className="text-white text-base md:text-[17px] font-semibold leading-snug tracking-wide">
                    {eng.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ConfidenceSection;