"use client";

import React from 'react';
import { motion } from 'framer-motion';
const ResearchFocusSection = () => {
  return <section className="bg-[#100b16] py-24 px-6 relative border-t-2 border-[#1E1A29]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-14 text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              RESEARCH FOCUS
            </span>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-white leading-tight ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Where our work concentrates
          </motion.h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Box 1 */}
          <motion.div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-lg font-bold mb-3 ff-font-bold flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00] text-sm font-black">01</span> Marker identification & characterization
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Defining and validating the immunophenotypic and molecular signatures of cancer stem cell populations.
            </motion.p>
          </motion.div>

          {/* Box 2 */}
          <motion.div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-lg font-bold mb-3 ff-font-bold flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00] text-sm font-black">02</span> Resistance mechanisms
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Mapping the pathways that let these cells evade therapy — and how to detect them in routine specimens.
            </motion.p>
          </motion.div>

          {/* Box 3 */}
          <motion.div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-lg font-bold mb-3 ff-font-bold flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00] text-sm font-black">03</span> Diagnostic integration
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Translating research markers into interpretable, reportable findings for practicing pathologists.
            </motion.p>
          </motion.div>

          {/* Box 4 */}
          <motion.div className="bg-[#181424] border border-[#2A2438] rounded-2xl p-8 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-lg font-bold mb-3 ff-font-bold flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <span className="text-[#FFCA00] text-sm font-black">04</span> Therapeutic targeting
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Advising biomarker, CDx, and trial design strategy aimed at the stem-cell compartment.
            </motion.p>
          </motion.div>

        </div>

      </div>
    </section>;
};
export default ResearchFocusSection;