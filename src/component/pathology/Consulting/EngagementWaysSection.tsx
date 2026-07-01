"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
const EngagementWaysSection = () => {
  const [activeTab, setActiveTab] = useState("A");
  const scrollToCard = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`category-${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  return <section className="bg-[#FAF8F5] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              SERVICES
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Three ways to engage
          </motion.h2>
        </div>

        {/* Tab Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          
          <button onClick={() => scrollToCard('A')} className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 bg-white ${activeTab === 'A' ? 'border-[#E94E8F] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeTab === 'A' ? 'bg-[#E94E8F] text-white' : 'bg-gray-100 text-gray-400'}`}>A</div>
            <div className="text-left">
              <div className={`text-sm font-bold ff-font-bold ${activeTab === 'A' ? 'text-[#E94E8F]' : 'text-[#1E1A29]'}`}>
                Diagnostic Excellence
              </div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ff-font-bold">
                SECOND OPINIONS & SPECIALIST REVIEW
              </div>
            </div>
          </button>

          <button onClick={() => scrollToCard('B')} className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 bg-white ${activeTab === 'B' ? 'border-[#E94E8F] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeTab === 'B' ? 'bg-[#E94E8F] text-white' : 'bg-gray-100 text-gray-400'}`}>B</div>
            <div className="text-left">
              <div className={`text-sm font-bold ff-font-bold ${activeTab === 'B' ? 'text-[#E94E8F]' : 'text-[#1E1A29]'}`}>
                Strategic Advisory
              </div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ff-font-bold">
                PHARMA • CRO • BIOTECH
              </div>
            </div>
          </button>

          <button onClick={() => scrollToCard('C')} className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 bg-white ${activeTab === 'C' ? 'border-[#E94E8F] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeTab === 'C' ? 'bg-[#E94E8F] text-white' : 'bg-gray-100 text-gray-400'}`}>C</div>
            <div className="text-left">
              <div className={`text-sm font-bold ff-font-bold ${activeTab === 'C' ? 'text-[#E94E8F]' : 'text-[#1E1A29]'}`}>
                Lab Implementation
              </div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ff-font-bold">
                TURNKEY MOLECULAR LABS
              </div>
            </div>
          </button>

        </div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-8">
          
          {/* Card A */}
          <motion.div id="category-A" className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E94E8F] to-[#FFCA00]"></div>
            
            <div className="md:w-32 flex-shrink-0">
              <div className="text-[#E94E8F] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-1">CATEGORY</div>
              <div className="text-[#E94E8F] text-5xl font-black ff-font-bold">A</div>
            </div>

            <div className="flex-1">
              <motion.div className="w-12 h-12 rounded-full bg-[#E94E8F]/10 flex items-center justify-center text-[#E94E8F] mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </motion.div>
              
              <motion.h3 className="text-2xl font-black text-[#1E1A29] mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Diagnostic Excellence</motion.h3>
              <div className="text-[9px] text-gray-400 font-bold tracking-widest uppercase ff-font-bold mb-6">
                FOR PATHOLOGISTS • ONCOLOGISTS • PATIENTS' CARE TEAMS
              </div>

              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                Expert review when a diagnosis carries real consequence — delivered with integrated reporting that your clinical team can act on.
              </motion.p>

              <ul className="flex flex-col gap-3 mb-8">
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Surgical Pathology Second Opinions & Complex Case Consults</span>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Molecular Pathology Specialist Review & Integrated Reporting</span>
                </motion.li>
              </ul>

              <button className="px-8 py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold">
                Request a Case Review →
              </button>
            </div>
          </motion.div>

          {/* Card B */}
          <motion.div id="category-B" className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FFCA00] to-[#E94E8F]"></div>
            
            <div className="md:w-32 flex-shrink-0">
              <div className="text-[#E94E8F] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-1">CATEGORY</div>
              <div className="text-[#E94E8F] text-5xl font-black ff-font-bold">B</div>
            </div>

            <div className="flex-1">
              <motion.div className="w-12 h-12 rounded-full bg-[#E94E8F]/10 flex items-center justify-center text-[#E94E8F] mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </motion.div>
              
              <motion.h3 className="text-2xl font-black text-[#1E1A29] mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Strategic Advisory</motion.h3>
              <div className="text-[9px] text-gray-400 font-bold tracking-widest uppercase ff-font-bold mb-6">
                FOR PHARMA • CRO • BIOTECH
              </div>

              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                A practicing pathologist's perspective on biomarker programs — the perspective most strategy decks are missing.
              </motion.p>

              <ul className="flex flex-col gap-3 mb-8">
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Biomarker Strategy, CDx Development & Companion Diagnostic Planning</span>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">RDx & Precision Oncology Strategy Consulting</span>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Virtual Molecular Tumor Board (vMTB) Program Development</span>
                </motion.li>
              </ul>

              <button className="px-8 py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold">
                Discuss Your Program →
              </button>
            </div>
          </motion.div>

          {/* Card C */}
          <motion.div id="category-C" className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E94E8F] to-[#FFCA00]"></div>
            
            <div className="md:w-32 flex-shrink-0">
              <div className="text-[#E94E8F] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-1">CATEGORY</div>
              <div className="text-[#E94E8F] text-5xl font-black ff-font-bold">C</div>
            </div>

            <div className="flex-1">
              <motion.div className="w-12 h-12 rounded-full bg-[#E94E8F]/10 flex items-center justify-center text-[#E94E8F] mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </motion.div>
              
              <motion.h3 className="text-2xl font-black text-[#1E1A29] mb-2 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>Turnkey Molecular Diagnostics Lab Implementation</motion.h3>
              <div className="text-[9px] text-gray-400 font-bold tracking-widest uppercase ff-font-bold mb-6">
                FOR CORPORATE LABS • PHARMACEUTICAL COMPANIES • ONCOLOGY HOSPITALS
              </div>

              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                From empty floor to first validated report — full-spectrum lab setup guidance grounded in decades of operational reality on two continents.
              </motion.p>

              <ul className="flex flex-col gap-3 mb-8">
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Full-spectrum lab setup consulting (IHC / FISH / Flow / NGS / workflows)</span>
                </motion.li>
                <motion.li className="flex gap-3 items-start" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6
              }}>
                  <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                  <span className="text-[#64748B] text-sm ff-font">Capex/Opex modeling, workflow design, regulatory guidance, and pricing strategy</span>
                </motion.li>
              </ul>

              <button className="px-8 py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold">
                Plan Your Lab →
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>;
};
export default EngagementWaysSection;