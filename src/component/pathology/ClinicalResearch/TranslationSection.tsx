"use client";

import React from 'react';
import { motion } from 'framer-motion';
const TranslationSection = () => {
  return <section className="bg-[#FAF8F5] pt-24 pb-0 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FROM BENCH TO REPORT
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Research that reaches the <span className="text-[#E94E8F]">patient</span>
          </motion.h2>
          <motion.p className="text-[#64748B] text-base md:text-lg max-w-2xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            The point of the science isn&apos;t the paper — it&apos;s a better-matched therapy. Here&apos;s how the work flows into practice.
          </motion.p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          
          <motion.div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">01</div>
            <motion.h3 className="text-[#1E1A29] text-sm font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Discover</motion.h3>
            <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Identify and validate cancer stem cell markers and pathways.</motion.p>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative lg:mt-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">02</div>
            <motion.h3 className="text-[#1E1A29] text-sm font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Translate</motion.h3>
            <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Turn findings into assays and interpretation frameworks.</motion.p>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative lg:mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">03</div>
            <motion.h3 className="text-[#1E1A29] text-sm font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Integrate</motion.h3>
            <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Reduce them into diagnostic reporting and tumor board reasoning.</motion.p>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative lg:mt-18" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">04</div>
            <motion.h3 className="text-[#1E1A29] text-sm font-black mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Treat</motion.h3>
            <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>Inform therapy selection, resistance monitoring, and trial design.</motion.p>
          </motion.div>
          
        </div>

        {/* Collaborate Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden mb-24">
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCA00] to-[#E94E8F]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
                <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                  COLLABORATE
                </span>
              </div>
              <motion.h2 className="text-3xl font-black text-[#1E1A29] leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Partner with us on the next breakthrough
              </motion.h2>
              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Mendel works alongside academic groups, pharma, and clinical teams to move cancer stem cell research from concept to clinically useful tools.
              </motion.p>
              
              <ul className="flex flex-col gap-3">
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <motion.p className="text-[#1E1A29] text-xs font-semibold leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                  once: true,
                  margin: "-50px"
                }} transition={{
                  duration: 0.6
                }}>Academic & translational research groups</motion.p>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <motion.p className="text-[#1E1A29] text-xs font-semibold leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                  once: true,
                  margin: "-50px"
                }} transition={{
                  duration: 0.6
                }}>Pharma, CRO & biotech biomarker / CDx teams</motion.p>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <motion.p className="text-[#1E1A29] text-xs font-semibold leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                  once: true,
                  margin: "-50px"
                }} transition={{
                  duration: 0.6
                }}>Hospitals & oncology programs building capability</motion.p>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <motion.p className="text-[#1E1A29] text-xs font-semibold leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                  once: true,
                  margin: "-50px"
                }} transition={{
                  duration: 0.6
                }}>Pathologists and clinicians integrating new markers</motion.p>
                </motion.li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <button onClick={() => {
                  const el = document.getElementById('start-conversation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/pathology/consulting#start-conversation';
                }} className="w-full py-4 rounded-full bg-[#E94E8F] text-white font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex justify-center items-center gap-2">
                Start a Conversation <span className="font-normal">→</span>
              </button>
              <button className="w-full py-4 rounded-full border border-gray-300 bg-white text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors ff-font-bold">
                See the Fellowship
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="bg-[#100b16] py-20 px-6 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-8 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          Behind every resistant tumor is a <br />
          question worth answering.
        </motion.h2>
        <button className="px-8 py-3.5 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2 mx-auto">
          Explore Collaboration <span className="font-normal">→</span>
        </button>
      </div>

    </section>;
};
export default TranslationSection;