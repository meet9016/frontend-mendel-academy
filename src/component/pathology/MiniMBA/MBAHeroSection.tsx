"use client";

import React from 'react';
import { motion } from 'framer-motion';
const MBAHeroSection = () => {
  return <section className="bg-[#100b16] py-24 px-6 overflow-hidden relative min-h-[550px] flex items-center border-b-2 border-[#1E1A29]">
      {/* Background gradients */}
      <motion.div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E94E8F]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
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
              BUSINESS & LEADERSHIP • FOR CLINICIANS
            </span>
          </div>
          
          <motion.h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            The business <br />
            education medicine <br />
            <span className="text-[#E94E8F]">never gave you.</span>
          </motion.h1>
          
          <motion.p className="text-[#A3A8B8] text-base md:text-lg max-w-lg mb-10 leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            You trained for years to master medicine — but not the budgets, teams, and strategy you're now expected to lead. The Mini-Medical MBA closes that gap with a focused, practical program built for clinicians, on a clinician's schedule.
          </motion.p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-3.5 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
              Join the Next Cohort <span className="font-normal">→</span>
            </button>
            <button className="px-8 py-3.5 rounded-full border border-gray-600 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-colors ff-font-bold">
              See the Curriculum
            </button>
          </div>
        </div>

        {/* Right Graphic - Graduation Cap */}
        <div className="flex justify-center items-center h-full relative">
          <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
              
              {/* Outer Dashed Circle */}
              <circle cx="200" cy="200" r="140" stroke="url(#gradRing)" strokeWidth="2" strokeDasharray="6 6" className="animate-spin-slow" style={{
              transformOrigin: '200px 200px'
            }} />
              
              <circle cx="200" cy="200" r="120" fill="#181424" />
              
              {/* Cap Graphic */}
              <g transform="translate(100, 150)">
                {/* Cap Top */}
                <path d="M100 0L200 40L100 80L0 40L100 0Z" fill="url(#gradCapTop)" />
                {/* Cap Base */}
                <path d="M40 56V90C40 106.569 66.8629 120 100 120C133.137 120 160 106.569 160 90V56" fill="#8B5CF6" />
                <path d="M40 56C40 72.5685 66.8629 86 100 86C133.137 86 160 72.5685 160 56" fill="#6D28D9" />
                {/* Tassel */}
                <path d="M100 40V70" stroke="#FFCA00" strokeWidth="4" />
                <circle cx="100" cy="74" r="6" fill="#FFCA00" />
                <path d="M100 80L90 110H110L100 80Z" fill="#FFCA00" />
              </g>

              {/* Decorative Dots */}
              <circle cx="200" cy="40" r="3" fill="#E94E8F" />
              <circle cx="200" cy="360" r="3" fill="#E94E8F" />
              <circle cx="40" cy="200" r="3" fill="#FFCA00" />
              <circle cx="360" cy="200" r="3" fill="#FFCA00" />
              
              <defs>
                <linearGradient id="gradRing" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E94E8F" />
                  <stop offset="1" stopColor="#FFCA00" />
                </linearGradient>
                <linearGradient id="gradCapTop" x1="0" y1="40" x2="200" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047" />
                  <stop offset="1" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </section>;
};
export default MBAHeroSection;