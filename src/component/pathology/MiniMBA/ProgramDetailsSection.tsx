"use client";

import React from 'react';
import { motion } from 'framer-motion';
const ProgramDetailsSection = () => {
  return <section className="bg-[#FAF8F5] pt-12 pb-0 px-6">
      <div className="max-w-4xl mx-auto mb-24">
        
        {/* Format */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FORMAT
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl font-black text-[#1E1A29] leading-tight mb-8 ff-font-bold text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Built for a clinician's schedule
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div className="bg-white rounded-xl p-6 border border-gray-100 text-center shadow-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <motion.h3 className="text-[#E94E8F] text-2xl font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>8 wks</motion.h3>
              <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Leave with an actionable plan or portfolio — no busywork.</motion.p>
            </motion.div>
            <motion.div className="bg-white rounded-xl p-6 border border-gray-100 text-center shadow-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <motion.h3 className="text-[#E94E8F] text-2xl font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>2 hrs</motion.h3>
              <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Weekly live sessions and asynchronous case analysis.</motion.p>
            </motion.div>
            <motion.div className="bg-white rounded-xl p-6 border border-gray-100 text-center shadow-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <motion.h3 className="text-[#E94E8F] text-2xl font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Cert.</motion.h3>
              <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Get a certificate of completion from Mendel Academy.</motion.p>
            </motion.div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              OUTCOMES
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl font-black text-[#1E1A29] leading-tight mb-10 ff-font-bold text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            What you walk away able to <span className="text-[#E94E8F]">do</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Read and run a budget for a lab, department, or practice.</motion.p>
            </div>
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Lead and grow a team with confidence and structure.</motion.p>
            </div>
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Build a business case for a new service or instrument.</motion.p>
            </div>
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Negotiate with vendors, partners, and administration.</motion.p>
            </div>
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Evaluate opportunities and pitch ideas to sponsors.</motion.p>
            </div>
            <div className="flex gap-3 items-start">
              <motion.div className="w-5 h-5 rounded-full bg-[#E94E8F]/10 flex items-center justify-center flex-shrink-0 mt-0.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </motion.div>
              <motion.p className="text-[#1E1A29] text-sm font-bold ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Step into leadership roles you were previously passed over for.</motion.p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <motion.div className="bg-[#FFF0F5] rounded-3xl border border-[#E94E8F]/20 p-8 md:p-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
                <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                  ENROLL
                </span>
              </div>
              <motion.h3 className="text-2xl font-black text-[#1E1A29] leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Lead with confidence — <br />
                clinical <span className="text-[#E94E8F]">and</span> commercial
              </motion.h3>
              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Join a cohort of physicians and healthcare professionals building the business skills medicine never taught them.
              </motion.p>
            </div>
            <div className="flex flex-col gap-4">
              <button className="w-full py-4 rounded-full bg-[#E94E8F] text-white font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex justify-center items-center gap-2">
                Join the Next Cohort <span className="font-normal">→</span>
              </button>
              <button className="w-full py-4 rounded-full border border-[#1E1A29] bg-transparent text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-black/5 transition-colors ff-font-bold">
                Notify Me About Dates
              </button>
              <div className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                Cohorts are kept deliberately small to ensure interactive discussions.
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Footer Banner */}
      <div className="bg-[#100b16] py-24 px-6 text-center">
        <motion.h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          Your clinical judgment is world-class. <br />
          Your business skills should be too.
        </motion.h2>
        <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2 mx-auto">
          Join the Next Cohort <span className="font-normal">→</span>
        </button>
      </div>

    </section>;
};
export default ProgramDetailsSection;