"use client";

import React from 'react';
import { motion } from 'framer-motion';
const ConfidenceSection = () => {
  return <section className="bg-[#FAF8F5] pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div className="bg-[#181424] rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          
          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <motion.h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Why our candidates walk in confident
            </motion.h2>
            <motion.p className="text-[#A3A8B8] text-sm md:text-base leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Every track shares the same engine — the methods that make Mendel preparation different from passive video courses and question grinding.
            </motion.p>
          </div>

          {/* 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Engine 1 */}
            <motion.div className="bg-[#1E1A29] border border-[#2A2438] rounded-2xl p-6 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">
                ENGINE . 01
              </div>
              <motion.h3 className="text-white text-sm font-bold leading-relaxed ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Onion Skin Technique for deep MCQ & case dissection
              </motion.h3>
            </motion.div>

            {/* Engine 2 */}
            <motion.div className="bg-[#1E1A29] border border-[#2A2438] rounded-2xl p-6 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">
                ENGINE . 02
              </div>
              <motion.h3 className="text-white text-sm font-bold leading-relaxed ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Mendel Chitras — visual mnemonics built for recall
              </motion.h3>
            </motion.div>

            {/* Engine 3 */}
            <motion.div className="bg-[#1E1A29] border border-[#2A2438] rounded-2xl p-6 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">
                ENGINE . 03
              </div>
              <motion.h3 className="text-white text-sm font-bold leading-relaxed ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Hybrid mentorship — never prepare alone
              </motion.h3>
            </motion.div>

            {/* Engine 4 */}
            <motion.div className="bg-[#1E1A29] border border-[#2A2438] rounded-2xl p-6 hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">
                ENGINE . 04
              </div>
              <motion.h3 className="text-white text-sm font-bold leading-relaxed ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Community of candidates & alumni who&apos;ve cleared it
              </motion.h3>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>;
};
export default ConfidenceSection;