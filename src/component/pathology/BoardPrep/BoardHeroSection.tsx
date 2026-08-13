"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BoardHeroSection = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#160B29] py-16 md:py-24 px-6 relative overflow-hidden min-h-[620px] flex items-center">
      {/* Background ambient radial gradients matching mockup */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#3B1962]/40 via-[#231040]/20 to-transparent rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#E84583]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative background thin circle lines */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="lg:col-span-7 text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6 tracking-tight max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#E84583] block sm:inline">
              FRCPath Part 1 & 2,
            </span>{' '}
            <span className="text-[#E84583] block sm:inline">
              NEET-SS, ABPath —
            </span>{' '}
            <span className="text-white block sm:inline mt-1">
              each taught to its own blueprint.
            </span>
          </motion.h1>

          <motion.p
            className="text-[#A39BB5] text-base md:text-lg max-w-xl mb-10 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built for pathologists. The slides, the weighting, the reporting language — everything that gets you across the finish line.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => scrollToSection('exam-selection')}
              className="px-8 py-4 rounded-full bg-[#F9C814] text-[#160B29] font-black text-sm tracking-wide hover:bg-[#e2b40d] transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/10 cursor-pointer hover:scale-105 active:scale-95"
            >
              Choose Your Exam <span className="text-base font-normal">→</span>
            </button>
            <button
              onClick={() => scrollToSection('request-quote')}
              className="px-8 py-4 rounded-full border border-[#3C2F58] bg-[#1D1238]/60 text-white font-bold text-sm tracking-wide hover:bg-[#281B49] hover:border-[#524177] transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Request a Quote
            </button>
          </motion.div>
        </div>

        {/* Right Graphic - Animated Target Ring Arrow */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
          >
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              
              {/* Outer Circles */}
              <circle cx="200" cy="200" r="170" stroke="#2B1F45" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="130" stroke="#3C2D5E" strokeWidth="1.5" />
              
              {/* Rotating Radar Sweep Line */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <line x1="200" y1="200" x2="200" y2="30" stroke="url(#radar-sweep)" strokeWidth="1.5" opacity="0.4" />
              </motion.g>

              {/* Gradient for Radar Sweep */}
              <defs>
                <linearGradient id="radar-sweep" x1="200" y1="200" x2="200" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E84583" stopOpacity="0" />
                  <stop offset="1" stopColor="#E84583" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Pink Target Ring (Pulsing stroke) */}
              <motion.circle
                cx="200"
                cy="200"
                r="90"
                stroke="#E84583"
                strokeWidth="2.5"
                animate={{ strokeWidth: [2.5, 3.5, 2.5], opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              
              {/* Yellow Target Ring (Pulsing stroke) */}
              <motion.circle
                cx="200"
                cy="200"
                r="50"
                stroke="#F9C814"
                strokeWidth="2.5"
                animate={{ strokeWidth: [2.5, 3.5, 2.5], opacity: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />

              {/* Expanding Beacon Ping Rings from Center */}
              <motion.circle
                cx="200"
                cy="200"
                r="10"
                stroke="#F9C814"
                strokeWidth="2"
                fill="none"
                animate={{ r: [10, 45, 55], opacity: [0.8, 0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut" }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="10"
                stroke="#E84583"
                strokeWidth="2"
                fill="none"
                animate={{ r: [10, 80, 95], opacity: [0.6, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeOut", delay: 0.8 }}
              />
              
              {/* Center Dot with Pulsing Glow */}
              <motion.circle
                cx="200"
                cy="200"
                r="10"
                fill="#F9C814"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: '200px 200px' }}
              />

              {/* Target Line & Arrow (Slight breathing rotate & scale) */}
              <motion.g
                animate={{ rotate: [-2, 3, -2], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <line x1="200" y1="200" x2="310" y2="90" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="305,80 325,80 325,100" fill="#E84583" />
                
                {/* Glowing tip at arrow head */}
                <circle cx="318" cy="87" r="4" fill="#F9C814" />
              </motion.g>

              {/* Orbiting Outer Dots Group (Clockwise 360 Rotation) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="200" cy="30" r="4" fill="#A78BFA" />
                <circle cx="200" cy="370" r="4" fill="#A78BFA" />
                <circle cx="30" cy="200" r="4" fill="#A78BFA" />
                <circle cx="370" cy="200" r="4" fill="#A78BFA" />
              </motion.g>

              {/* Orbiting Inner Dots Group (Counter-Clockwise Rotation) */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                style={{ transformOrigin: '200px 200px' }}
              >
                <circle cx="108" cy="108" r="3.5" fill="#E84583" />
                <circle cx="292" cy="292" r="3.5" fill="#F9C814" />
                <circle cx="80" cy="80" r="3" fill="#6B5B95" />
                <circle cx="320" cy="320" r="3" fill="#6B5B95" />
              </motion.g>

            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BoardHeroSection;