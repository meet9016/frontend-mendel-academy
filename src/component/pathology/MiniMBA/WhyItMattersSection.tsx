"use client";

import React from 'react';
import { motion } from 'framer-motion';
const WhyItMattersSection = () => {
  return <section className="bg-[#FAF8F5] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              WHY IT MATTERS
            </span>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Great clinicians are being asked to <span className="text-[#E94E8F]">lead</span>
          </motion.h2>
          <motion.p className="text-[#64748B] text-base md:text-lg max-w-3xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Running a lab, growing a practice, sitting on a leadership team, evaluating a vendor, pitching a service line — these decisions shape patient care as much as any diagnosis, yet they're never taught in medical training.
          </motion.p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Speak the language of business
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Read a P&L, understand margins and ROI, and hold your own with administrators and finance.
            </motion.p>
          </motion.div>

          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Lead people, not just cases
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Build, motivate, and retain teams; navigate conflict, and grow into formal leadership roles.
            </motion.p>
          </motion.div>

          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Turn ideas into ventures
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Evaluate opportunities, build a case, and bring new services, labs, or tools to life.
            </motion.p>
          </motion.div>

        </div>

      </div>
    </section>;
};
export default WhyItMattersSection;