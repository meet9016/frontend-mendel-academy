"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const getIcon = (type: string) => {
  switch (type) {
    case 'breast':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><circle cx="16" cy="12" r="3"></circle></svg>;
    case 'lung':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4c-3 0-5 3-5 7s2 10 5 10 5-6 5-10-2-7-5-7z"></path><path d="M12 4v17"></path></svg>;
    case 'prostate':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
    case 'gi':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v3c0 3 2 4 4 4s4-1 4-4V4"></path><path d="M14 16h-4v5"></path><path d="M18 10h-2"></path><path d="M20 20l-4-4"></path></svg>;
    case 'lymphoma':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3"></circle><circle cx="16" cy="8" r="3"></circle><circle cx="12" cy="16" r="3"></circle></svg>;
    case 'endo':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"></path><path d="M12 15v7"></path><path d="M5 3l7 12 7-12"></path></svg>;
    case 'thyroid':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"></circle><path d="M12 9v6"></path><path d="M9 12h6"></path></svg>;
    case 'ngs':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h8"></path></svg>;
    default:
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;
  }
};

const upcomingCourses = [{
  id: "breast",
  iconType: "breast",
  title: "Breast Pathology Mastery",
  desc: "Core biopsies to resections — a structured path through the highest-volume cancer specimen you sign out.",
  date: "Sep 2, 2026",
  format: "6-8 wks • Live virtual",
  price: "$690",
  oldPrice: "$990",
  status: "enroll",
  btnText: "Enroll Now →",
  note: "Early bird ends Aug 15",
  seats: "9 of 25 seats left"
}, {
  id: "lung",
  iconType: "lung",
  title: "Lung Pathology Mastery",
  desc: "Small biopsies, cytology, and the molecular reflexes that drive lung-cancer therapy decisions.",
  date: "Sep 30, 2026",
  format: "6-8 wks • Live virtual",
  price: "$690",
  oldPrice: "$990",
  status: "enroll",
  btnText: "Enroll Now →",
  note: "Early bird ends Sep 12",
  seats: "13 of 25 seats left"
}, {
  id: "prostate",
  iconType: "prostate",
  title: "Prostate Pathology Mastery",
  desc: "Grading, reporting, and the pitfalls that drive downstream treatment — launching next quarter.",
  date: "Q4 2026",
  format: "6-8 wks • Live virtual",
  price: "",
  oldPrice: "",
  status: "notify",
  btnText: "Notify Me & Save My Seat",
  note: "Be first to know — and lock in early-bird pricing.",
  seats: ""
}];

const inSessionCourses = [{
  id: "gi",
  iconType: "gi",
  title: "GI Pathology Mastery",
  desc: "IBD versus mimics, dysplasia grading, polyp pitfalls, and small-biopsy interpretation — the dilemmas that actually land on your desk.",
  progress: "Module 3 of 8 in progress",
  progressPercent: 37,
  bullets: [
    "Every module recorded, delivered as it drops",
    "Complete e-book when the cohort wraps",
    "Lifetime access — yours to keep"
  ],
  price: "$420",
  priceNote: "Pre-release price • rises after the cohort ends",
  btnText: "Reserve the Recordings →",
  waitlistText: "Or join the waitlist for the next live cohort"
}, {
  id: "lymphoma",
  iconType: "lymphoma",
  title: "Lymphoma Mastery",
  desc: "A pattern-first system that turns the most intimidating area of pathology into a structured, defensible workup.",
  progress: "Module 5 of 8 in progress",
  progressPercent: 62,
  bullets: [
    "Every module recorded, delivered as it drops",
    "Complete e-book when the cohort wraps",
    "Lifetime access — yours to keep"
  ],
  price: "$420",
  priceNote: "Pre-release price • rises after the cohort ends",
  btnText: "Reserve the Recordings →",
  waitlistText: "Or join the waitlist for the next live cohort"
}];

const onDemandCourses = [{
  id: "endo",
  iconType: "endo",
  title: "Endometrial Biopsy Interpretation Mastery",
  desc: "Reduce missed diagnoses in one of the highest-volume, highest-liability specimens in practice.",
  stars: 5,
  enrolled: "1,240+",
  options: [
    { type: "Recordings", price: "$190" },
    { type: "E-Book", price: "$60" },
    { type: "Bundle", isBestValue: true, price: "$220" }
  ]
}, {
  id: "thyroid",
  iconType: "thyroid",
  title: "Thyroid & Head-Neck Cytology Mastery",
  desc: "Bethesda categories, indeterminate nodules, and the molecular adjuncts that change management.",
  stars: 5,
  enrolled: "870+",
  options: [
    { type: "Recordings", price: "$190" },
    { type: "E-Book", price: "$60" },
    { type: "Bundle", isBestValue: true, price: "$220" }
  ]
}, {
  id: "ngs",
  iconType: "ngs",
  title: "NGS Report Interpretation Mastery",
  desc: "From raw variants to a clinically actionable report — the most-requested on-demand course we run.",
  stars: 5,
  enrolled: "1,518+",
  options: [
    { type: "Recordings", price: "$240" },
    { type: "E-Book", price: "$70" },
    { type: "Bundle", isBestValue: true, price: "$280" }
  ]
}];

const CoursesListSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    endo: "Bundle",
    thyroid: "Bundle",
    ngs: "Bundle"
  });

  const handleOptionSelect = (courseId: string, optionType: string) => {
    setSelectedOptions(prev => ({ ...prev, [courseId]: optionType }));
  };

  return (
    <section className="bg-[#FAF8F5] py-24 px-6 relative" id="mastery-courses">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THE SERIES
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-black text-[#1E1A29] leading-tight mb-6 ff-font-bold">
            Three ways to learn,<br />
            on <span className="text-[#E94E8F]">your</span> timeline.
          </h2>
          <p className="text-[#64748B] text-base leading-relaxed ff-font">
            Join the next live cohort, reserve the series that's running now, or get instant on-demand access to everything that's come before.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 bg-white shadow-sm ff-font-bold text-sm
              ${activeTab === 'upcoming' ? 'border-[#FFCA00] shadow-[0_4px_15px_rgb(255,202,0,0.15)]' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === 'upcoming' ? 'bg-[#FFCA00]' : 'bg-[#FFCA00]'}`}></span>
            <span className="font-bold text-[#1E1A29]">Upcoming</span>
            <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('insession')}
            className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 bg-white shadow-sm ff-font-bold text-sm
              ${activeTab === 'insession' ? 'border-[#E94E8F] shadow-[0_4px_15px_rgb(233,78,143,0.15)]' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === 'insession' ? 'bg-[#E94E8F]' : 'bg-[#E94E8F]'}`}></span>
            <span className="font-bold text-[#1E1A29]">In Session</span>
            <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ondemand')}
            className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 bg-white shadow-sm ff-font-bold text-sm
              ${activeTab === 'ondemand' ? 'border-[#5B21B6] shadow-[0_4px_15px_rgb(91,33,182,0.15)]' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className={`w-2 h-2 rounded-full ${activeTab === 'ondemand' ? 'bg-[#5B21B6]' : 'bg-[#5B21B6]'}`}></span>
            <span className="font-bold text-[#1E1A29]">On-Demand</span>
            <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
          </button>
        </div>

        {/* Section Intro Content */}
        <div className="max-w-3xl mb-12">
          {activeTab === 'upcoming' && (
            <>
              <motion.div className="inline-block px-3 py-1 bg-[#FFCA00]/20 text-[#D97706] text-[10px] font-black tracking-widest uppercase rounded-sm mb-4 ff-font-bold">
                ENROLLING NOW
              </motion.div>
              <motion.h3 className="text-3xl font-black text-[#1E1A29] mb-4 ff-font-bold">
                Upcoming Courses
              </motion.h3>
              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font">
                New live cohorts — small groups, direct feedback, and the best price you'll ever pay for these. Seats are limited and fill fast.
              </motion.p>
            </>
          )}
          {activeTab === 'insession' && (
            <>
              <motion.div className="inline-block px-3 py-1 bg-[#E94E8F]/10 text-[#E94E8F] text-[10px] font-black tracking-widest uppercase rounded-sm mb-4 ff-font-bold flex items-center gap-2 w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E94E8F]"></span> HAPPENING NOW
              </motion.div>
              <motion.h3 className="text-3xl font-black text-[#1E1A29] mb-4 ff-font-bold">
                Current Courses — In Session
              </motion.h3>
              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font">
                These cohorts are already underway, so live seats are closed. But you don't have to miss out: <span className="font-bold text-[#1E1A29]">reserve the full recorded series</span> and we'll deliver each module the moment it's released — plus the complete e-book when the cohort wraps.
              </motion.p>
            </>
          )}
          {activeTab === 'ondemand' && (
            <>
              <motion.div className="inline-block px-3 py-1 bg-[#5B21B6]/10 text-[#5B21B6] text-[10px] font-black tracking-widest uppercase rounded-sm mb-4 ff-font-bold">
                ON-DEMAND
              </motion.div>
              <motion.h3 className="text-3xl font-black text-[#1E1A29] mb-4 ff-font-bold">
                Past Courses — Learn Anytime
              </motion.h3>
              <motion.p className="text-[#64748B] text-sm leading-relaxed ff-font">
                Completed cohorts, now available forever. Get the full recorded series, the e-book, or save with the complete bundle — <span className="font-bold text-[#1E1A29]">instant access, learn at your own pace.</span>
              </motion.p>
            </>
          )}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20">
          
          {activeTab === 'upcoming' && upcomingCourses.map(course => (
            <motion.div key={course.id} className={`bg-white rounded-[24px] border-2 border-t-[6px] overflow-hidden shadow-sm flex flex-col h-full relative ${course.status === 'enroll' ? 'border-[#FFCA00] border-x-gray-100 border-b-gray-100' : 'border-gray-200 border-x-gray-100 border-b-gray-100'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="p-8 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-xl shadow-sm border border-pink-100">
                    {getIcon(course.iconType)}
                  </div>
                  {course.status === 'enroll' ? (
                    <div className="px-3 py-1 bg-[#FFCA00] text-[#1E1A29] text-[9px] font-black tracking-widest uppercase rounded-sm flex items-center gap-1 ff-font-bold shadow-sm">
                      ★ ENROLLING
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-gray-100 text-[#5B21B6] text-[9px] font-black tracking-widest uppercase rounded-full ff-font-bold">
                      COMING SOON
                    </div>
                  )}
                </div>

                <h4 className="text-xl font-black text-[#1E1A29] mb-3 ff-font-bold leading-tight">{course.title}</h4>
                <p className="text-[#64748B] text-[13px] leading-relaxed ff-font mb-8 flex-grow">{course.desc}</p>

                {/* Meta details */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-3">
                    <span className="text-gray-400 font-bold tracking-widest uppercase ff-font-bold text-[9px]">STARTS</span>
                    <span className="font-bold text-[#1E1A29] ff-font-bold">{course.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-gray-100 pb-3">
                    <span className="text-gray-400 font-bold tracking-widest uppercase ff-font-bold text-[9px]">FORMAT</span>
                    <span className="font-bold text-[#1E1A29] ff-font-bold">{course.format}</span>
                  </div>
                </div>

                {course.status === 'enroll' ? (
                  <>
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2 overflow-hidden">
                        <div className="bg-[#FFCA00] h-full rounded-full" style={{ width: course.id === 'lung' ? '50%' : '35%' }}></div>
                      </div>
                      <div className="text-[9px] text-[#E94E8F] font-bold tracking-widest uppercase ff-font-bold">
                        {course.seats}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-3xl font-black text-[#1E1A29] ff-font-bold">{course.price}</span>
                      <span className="text-gray-400 line-through text-sm font-bold mb-1">{course.oldPrice}</span>
                      <span className="bg-[#FFCA00]/20 text-[#D97706] text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm mb-1.5 ff-font-bold">EARLY-BIRD</span>
                    </div>

                    <button className="w-full py-4 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:bg-[#d63d7d] transition-colors ff-font-bold text-center">
                      {course.btnText}
                    </button>
                    <p className="text-center text-gray-400 text-[10px] mt-3 ff-font">
                      {course.note}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-[#1E1A29] text-[13px] leading-relaxed ff-font-bold">{course.note}</p>
                    </div>
                    <button className="w-full py-4 rounded-full border border-gray-300 text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors ff-font-bold text-center mt-auto">
                      {course.btnText}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}

          {activeTab === 'insession' && inSessionCourses.map(course => (
            <motion.div key={course.id} className="bg-white rounded-[24px] border-2 border-t-[6px] border-[#E94E8F] border-x-gray-100 border-b-gray-100 overflow-hidden shadow-sm flex flex-col h-full relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="p-8 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-xl shadow-sm border border-pink-100">
                    {getIcon(course.iconType)}
                  </div>
                  <div className="px-3 py-1 bg-[#E94E8F] text-white text-[9px] font-black tracking-widest uppercase rounded-full flex items-center gap-1 ff-font-bold shadow-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span> IN SESSION
                  </div>
                </div>

                <h4 className="text-xl font-black text-[#1E1A29] mb-3 ff-font-bold leading-tight">{course.title}</h4>
                <p className="text-[#64748B] text-[13px] leading-relaxed ff-font mb-6 flex-grow">{course.desc}</p>

                {/* Progress Indicator */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                  <div className="text-[10px] text-[#E94E8F] font-bold tracking-widest uppercase ff-font-bold mb-3">
                    {course.progress}
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E94E8F] h-full rounded-full" style={{ width: `${course.progressPercent}%` }}></div>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {course.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-[#64748B] ff-font items-start">
                      <span className="text-gray-400 mt-0.5">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & Action */}
                <div className="mb-6">
                  <div className="text-3xl font-black text-[#1E1A29] ff-font-bold mb-1">{course.price}</div>
                  <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                    {course.priceNote}
                  </div>
                </div>

                <button className="w-full py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-[#F0BE00] transition-colors ff-font-bold text-center shadow-sm">
                  {course.btnText}
                </button>
                <p className="text-center text-gray-400 text-[10px] mt-3 ff-font">
                  {course.waitlistText}
                </p>
                
              </div>
            </motion.div>
          ))}

          {activeTab === 'ondemand' && onDemandCourses.map(course => (
            <motion.div key={course.id} className="bg-white rounded-[24px] border-2 border-t-[6px] border-[#5B21B6] border-x-gray-100 border-b-gray-100 overflow-hidden shadow-sm flex flex-col h-full relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="p-8 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-xl shadow-sm border border-pink-100">
                    {getIcon(course.iconType)}
                  </div>
                  <div className="px-3 py-1 bg-[#5B21B6] text-white text-[9px] font-black tracking-widest uppercase rounded-full shadow-sm ff-font-bold">
                    ON-DEMAND
                  </div>
                </div>

                <h4 className="text-xl font-black text-[#1E1A29] mb-3 ff-font-bold leading-tight">{course.title}</h4>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#FFCA00] text-sm">
                    {"★★★★★"}
                  </div>
                  <span className="text-gray-400 text-[9px] font-bold tracking-widest uppercase ff-font-bold">{course.enrolled}</span>
                </div>

                <p className="text-[#64748B] text-[13px] leading-relaxed ff-font mb-6 flex-grow">{course.desc}</p>

                {/* Options Radio List */}
                <div className="space-y-3 mb-8">
                  {course.options.map((opt, idx) => {
                    const isSelected = selectedOptions[course.id] === opt.type;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors
                          ${isSelected ? 'border-[#E94E8F] bg-pink-50/20' : 'border-gray-200 hover:border-pink-200'}
                        `}
                        onClick={() => handleOptionSelect(course.id, opt.type)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                            ${isSelected ? 'border-[#E94E8F]' : 'border-gray-300'}
                          `}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-[#E94E8F]"></div>}
                          </div>
                          <span className={`text-sm ff-font-bold ${isSelected ? 'text-[#1E1A29]' : 'text-gray-600'}`}>
                            {opt.type}
                          </span>
                          {opt.isBestValue && (
                            <span className="px-2 py-0.5 bg-[#E94E8F] text-white text-[8px] font-black tracking-widest uppercase rounded-sm ml-2">
                              BEST VALUE
                            </span>
                          )}
                        </div>
                        <span className={`font-black ff-font-bold ${isSelected ? 'text-[#1E1A29]' : 'text-gray-500'}`}>
                          {opt.price}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full py-4 rounded-full bg-[#E94E8F] text-white font-bold text-sm tracking-wide hover:bg-[#d63d7d] transition-colors ff-font-bold text-center shadow-sm">
                  Get Instant Access →
                </button>
                <p className="text-center text-gray-400 text-[10px] mt-3 font-bold tracking-widest uppercase ff-font-bold">
                  Lifetime access • download the e-book
                </p>
                
              </div>
            </motion.div>
          ))}

        </div>

        {/* B2B Banner (Image 4) */}
        <motion.div 
          className="bg-[#100b16] rounded-3xl p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          {/* Background Watermark */}
          <div className="absolute right-0 bottom-0 text-[180px] font-black text-white/5 leading-none select-none pointer-events-none translate-y-10 translate-x-10 ff-font-bold">
            B2B
          </div>
          
          <div className="relative z-10 flex-1 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 ff-font-bold">
              Train your whole team
            </h3>
            <p className="text-[#A3A8B8] text-sm leading-relaxed ff-font">
              Every mastery course is available as a dedicated cohort for corporate labs, hospital departments, and institutions — including fully white-labeled programs under your own brand. Curriculum can be tuned to your case mix and reporting standards.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col items-end gap-6 shrink-0">
            <div className="px-3 py-1.5 border border-[#FFCA00]/30 text-[#FFCA00] text-[9px] font-black tracking-widest uppercase rounded-full ff-font-bold">
              CORPORATE • INSTITUTIONAL • WHITE-LABEL
            </div>
            <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-[#1E1A29] font-black text-sm tracking-wide hover:bg-[#F0BE00] transition-colors ff-font-bold shadow-sm whitespace-nowrap">
              Discuss a Team Cohort →
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CoursesListSection;