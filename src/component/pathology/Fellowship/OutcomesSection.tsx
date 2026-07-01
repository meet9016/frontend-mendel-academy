"use client";

import React from 'react';
const OutcomesSection = () => {
  return <section className="bg-[#FAF8F5] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* vMTB Banner */}
        <div className="bg-[#181424] rounded-3xl p-10 md:p-14 relative overflow-hidden mb-24 shadow-2xl">
          {/* Watermark */}
          <div className="absolute right-[-20px] bottom-[-40px] text-[180px] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none ff-font-bold">
            vMTB
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFCA00]/10 border border-[#FFCA00]/30 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFCA00] animate-pulse"></div>
                <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold">
                  LIVE • EVERY MONTH
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 ff-font-bold">
                Virtual Molecular Tumor Boards
              </h2>
              <p className="text-[#A3A8B8] text-sm md:text-base leading-relaxed ff-font">
                Once a month, the whole cohort convenes live with Dr. Managoli to work real, 
                current cases end-to-end — morphology to molecular to therapy recommendation. 
                You don&apos;t watch tumor boards. You learn to run them. And your access continues 
                for life, long after the fellowship ends.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="px-8 py-4 rounded-full bg-[#FFCA00] text-black font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2 whitespace-nowrap">
                Join the Next Cohort <span className="font-normal">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Outcomes List */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              OUTCOMES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1E1A29] leading-tight mb-10 ff-font-bold max-w-xl">
            What You Will Be Able To Do After This Program
          </h2>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            {/* Left Accent border */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FFCA00] to-[#E94E8F]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Confidently interpret and clinically integrate complex NGS, liquid biopsy, and multi-omic results to guide therapy selection
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Lead or actively contribute to Molecular Tumor Boards with authority and structured reasoning
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Design and implement reflex testing algorithms and companion diagnostic (CDx) strategies in your institution
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Reduce diagnostic uncertainty in challenging cases using proven frameworks (Onion Skin Technique)
                </p>
              </div>

              {/* Item 5 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Mentor colleagues and build precision oncology capabilities within your team or department
                </p>
              </div>

              {/* Item 6 */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E94E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed ff-font">
                  Position yourself for leadership roles such as Molecular Pathology Consultant, Lab Director, or Tumor Board Lead
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>;
};
export default OutcomesSection;