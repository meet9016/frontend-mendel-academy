"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
const courses = [{
  id: "breast",
  icon: "🌸",
  title: "Breast Pathology Mastery",
  desc: "Core biopsies to resections — a structured path through the highest volume cancer specimen you sign out.",
  date: "Sep 2, 2026",
  format: "4-8 weeks • Live virtual",
  price: "$690",
  oldPrice: "$990",
  status: "enroll",
  btnText: "Enroll Now →"
}, {
  id: "lung",
  icon: "🫁",
  title: "Lung Pathology Mastery",
  desc: "Small biopsies, cytology, and the molecular reflexes that drive lung cancer therapy decisions.",
  date: "Sep 30, 2026",
  format: "4-8 weeks • Live virtual",
  price: "$690",
  oldPrice: "$990",
  status: "enroll",
  btnText: "Enroll Now →"
}, {
  id: "prostate",
  icon: "🔬",
  title: "Prostate Pathology Mastery",
  desc: "Grading, reporting, and the pitfalls that drive downstream treatment — launching next quarter.",
  date: "Q4 2026",
  format: "4-8 weeks • Live virtual",
  price: "",
  oldPrice: "",
  status: "notify",
  btnText: "Notify Me & Save My Seat"
}];
const CoursesListSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  return <section className="bg-[#FAF8F5] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THE SERIES
            </span>
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
          </div>
          <motion.h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Three ways to learn, <br />
            on <span className="text-[#E94E8F]">your</span> timeline.
          </motion.h2>
          <motion.p className="text-[#64748B] text-sm md:text-base max-w-2xl leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Join the next live cohort, reserve the series that&apos;s running now, or get instant on-demand access to everything that&apos;s come before.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button onClick={() => setActiveTab("upcoming")} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeTab === "upcoming" ? 'bg-white border-2 border-[#FFCA00] text-[#1E1A29]' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            <span className="text-[#FFCA00] mr-2">●</span> Upcoming 3
          </button>
          <button onClick={() => setActiveTab("insession")} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeTab === "insession" ? 'bg-white border-2 border-[#FFCA00] text-[#1E1A29]' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            <span className="text-[#E94E8F] mr-2">●</span> In Session 2
          </button>
          <button onClick={() => setActiveTab("ondemand")} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeTab === "ondemand" ? 'bg-white border-2 border-[#FFCA00] text-[#1E1A29]' : 'border border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            <span className="text-blue-500 mr-2">●</span> On-Demand 8
          </button>
        </div>

        {/* Upcoming Courses Section */}
        <div className="mb-8">
          <motion.div className="inline-block px-3 py-1 bg-[#FFCA00]/20 text-[#CA8A04] text-[10px] font-bold tracking-widest uppercase ff-font-bold rounded-sm mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            ENROLLING NOW
          </motion.div>
          <motion.h3 className="text-2xl font-black text-[#1E1A29] mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            Upcoming Courses
          </motion.h3>
          <motion.p className="text-[#64748B] text-sm mb-10 ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
            New live cohorts — small groups, direct feedback, and the best price you&apos;ll ever pay for these. Seats are limited and fill fast.
          </motion.p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {courses.map(course => <motion.div key={course.id} className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#FFCA00]/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden group" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.6
        }}>
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFCA00] to-[#E94E8F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <motion.div className="w-12 h-12 rounded-full bg-[#E94E8F]/10 flex items-center justify-center text-[#E94E8F] text-xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }}>
                  {course.icon}
                </motion.div>
                {course.status === 'enroll' && <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[9px] font-bold tracking-widest uppercase rounded">
                    STARTING SOON
                  </span>}
              </div>
              
              <motion.h4 className="text-lg font-black text-[#1E1A29] mb-3 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>{course.title}</motion.h4>
              <motion.p className="text-[#64748B] text-xs leading-relaxed ff-font mb-6 min-h-[60px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
                {course.desc}
              </motion.p>
              
              <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">STARTS</span>
                  <span className="text-sm font-bold text-[#1E1A29]">{course.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">FORMAT</span>
                  <span className="text-sm font-bold text-[#1E1A29]">{course.format}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100">
                {course.price ? <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-[#1E1A29]">{course.price}</span>
                    <span className="text-sm text-gray-400 line-through">{course.oldPrice}</span>
                    <span className="text-[9px] bg-[#FFCA00]/20 text-[#CA8A04] px-2 py-0.5 rounded font-bold">EARLY BIRD</span>
                  </div> : <div className="mb-4">
                    <span className="text-xs text-[#E94E8F] font-bold">Be first to know — and lock in early bird pricing.</span>
                  </div>}
                
                <button className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all ff-font-bold ${course.status === 'enroll' ? 'bg-[#E94E8F] text-white hover:opacity-90' : 'border border-[#1E1A29] text-[#1E1A29] hover:bg-gray-50'}`}>
                  {course.btnText}
                </button>
                {course.status === 'enroll' && <div className="text-center mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Next price jump Aug 15
                  </div>}
              </div>
            </motion.div>)}
        </div>

        {/* B2B Banner */}
        <motion.div className="bg-[#181424] rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6
      }}>
          <div className="absolute -bottom-6 -right-10 text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none ff-font-bold z-0">
            B2B
          </div>
          
          <div className="relative z-10 max-w-xl">
            <div className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-4">
              CORPORATE • INSTITUTIONAL • WHITE-LABEL
            </div>
            <motion.h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 ff-font-bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Train your whole team
            </motion.h2>
            <motion.p className="text-[#A3A8B8] text-sm leading-relaxed ff-font" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              Every mastery course is available as a dedicated cohort for corporate labs, hospital departments, and institutions — including fully white-labeled programs under your own brand. Curriculum can be tuned to your case mix and reporting standards.
            </motion.p>
          </div>
          
          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button 
              onClick={() => {
              const el = document.getElementById('consulting');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/pathology#consulting';
            }}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center justify-center gap-2">
              Discuss a Team Cohort <span className="font-normal">→</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>;
};
export default CoursesListSection;