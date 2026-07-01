"use client";

import React from 'react';
import { motion } from 'framer-motion';
const EngagementProcessSection = () => {
  return <section className="bg-[#FAF8F5] pt-0 pb-0">
      
      {/* Dark Banner Process */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div className="bg-[#181424] rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          
          {/* Header */}
          <div className="mb-12">
            <motion.h2 className="text-3xl font-black text-white leading-tight mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              How an engagement works
            </motion.h2>
            <motion.p className="text-[#A3A8B8] text-sm ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Simple, transparent, and scoped before any commitment.
            </motion.p>
          </div>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <motion.div className="bg-[#1E1A29] rounded-2xl p-6 border border-[#2A2438]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">01</div>
              <motion.h4 className="text-white text-sm font-bold mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Discovery call</motion.h4>
              <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                30 minutes to understand your case, program, or project — no charge, no obligation.
              </motion.p>
            </motion.div>

            <motion.div className="bg-[#1E1A29] rounded-2xl p-6 border border-[#2A2438]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">02</div>
              <motion.h4 className="text-white text-sm font-bold mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Scoped proposal</motion.h4>
              <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Clear deliverables, timeline, and fee — whether it's one case or a year-long build.
              </motion.p>
            </motion.div>

            <motion.div className="bg-[#1E1A29] rounded-2xl p-6 border border-[#2A2438]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">03</div>
              <motion.h4 className="text-white text-sm font-bold mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Engagement</motion.h4>
              <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Direct work with Dr. Mangoli — reviews, advisory sessions, site planning, or program design.
              </motion.p>
            </motion.div>

            <motion.div className="bg-[#1E1A29] rounded-2xl p-6 border border-[#2A2438]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">04</div>
              <motion.h4 className="text-white text-sm font-bold mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Deliverables & follow-up</motion.h4>
              <motion.p className="text-[#A3A8B8] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Written reports, strategy documents, or operational plans — plus follow-up support.
              </motion.p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Banner */}
      <div id="start-conversation" className="bg-[#100b16] py-24 px-6 text-center border-t border-[#1E1A29]">
        <motion.h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          Start with a conversation.
        </motion.h2>
        <motion.p className="text-[#A3A8B8] text-sm md:text-base max-w-xl mx-auto mb-10 ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          30 minutes. No obligation. Bring your hardest problem.
        </motion.p>
        <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2 mx-auto">
          Schedule a 30-Minute Discovery Call
        </button>
      </div>

    </section>;
};
export default EngagementProcessSection;