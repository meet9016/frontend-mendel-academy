"use client";

import React from 'react';
import { motion } from 'framer-motion';
const CurriculumSection = () => {
  return <section className="bg-[#100b16] py-24 px-6 border-b-2 border-[#1E1A29]">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              CURRICULUM
            </span>
          </div>
          <motion.h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Six modules, zero filler
          </motion.h2>
          <motion.p className="text-[#A3A8B8] text-sm md:text-base max-w-2xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Each module is taught for direct application — real healthcare cases, frameworks you'll use the next week, no abstract theory.
          </motion.p>
        </div>

        {/* 6 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              01 - Healthcare Finance & Economics
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Budgets, reimbursement, unit economics, and reading the numbers that run a practice or lab.
            </motion.p>
          </motion.div>

          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              02 - Leadership & People
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Management, motivation, hiring, feedback, and leading teams through change.
            </motion.p>
          </motion.div>

          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              03 - Operations & Lab Management
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Workflow, quality, throughput, and the operational backbone of high-volume services.
            </motion.p>
          </motion.div>

          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              04 - Strategy & Decision-Making
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Competitive positioning, service-line growth, and structured decisions under uncertainty.
            </motion.p>
          </motion.div>

          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              05 - Innovation & Entrepreneurship
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              From idea to business case — ventures, partnerships, and digital health.
            </motion.p>
          </motion.div>

          <motion.div className="bg-[#181424] rounded-2xl p-8 border border-[#2A2438] hover:border-[#FFCA00]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <motion.h3 className="text-white text-sm font-black mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              06 - Negotiation & Communication
            </motion.h3>
            <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Influence, stakeholder management, and communicating value to non-clinical audiences.
            </motion.p>
          </motion.div>

        </div>
        </div>
      </div>
    </section>;
};
export default CurriculumSection;