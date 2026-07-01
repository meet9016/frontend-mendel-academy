"use client";

import React from 'react';
import { motion } from 'framer-motion';
const WhyItMattersSection = () => {
  return <section className="bg-[#FAF8F5] py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              WHY IT MATTERS
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            A small population with an <span className="text-[#E94E8F]">outsized</span> impact
          </motion.h2>
          <motion.p className="text-[#64748B] text-base md:text-lg max-w-2xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Cancer stem cells are a rare, resilient subset within a tumor — and they sit behind some of oncology&apos;s hardest problems. Understanding them changes how we test, interpret, and treat.
          </motion.p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300 group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F] group-hover:scale-110 transition-transform" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Therapy Resistance
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              They survive chemotherapy and radiation that clear the bulk of the tumor, seeding treatment failure.
            </motion.p>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300 group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F] group-hover:scale-110 transition-transform" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Recurrence & Relapse
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              A handful of surviving cells can regenerate an entire tumor — the biology behind late relapse.
            </motion.p>
          </motion.div>

          {/* Card 3 */}
          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300 group relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCA00] to-[#E94E8F]"></div>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F] group-hover:scale-110 transition-transform" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Metastasis
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Their plasticity and self-renewal underpin the spread of cancer to distant sites.
            </motion.p>
          </motion.div>

          {/* Card 4 */}
          <motion.div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(233,78,143,0.1)] transition-all duration-300 group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.div className="w-12 h-12 rounded-xl bg-[#E94E8F]/10 flex items-center justify-center mb-6 text-[#E94E8F] group-hover:scale-110 transition-transform" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
            </motion.div>
            <motion.h3 className="text-[#1E1A29] text-lg font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Biomarker Targets
            </motion.h3>
            <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Their markers and pathways are a frontier for next-generation diagnostics and targeted therapy.
            </motion.p>
          </motion.div>

        </div>

      </div>
    </section>;
};
export default WhyItMattersSection;