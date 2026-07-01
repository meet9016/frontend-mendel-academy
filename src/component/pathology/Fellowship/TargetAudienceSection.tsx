"use client";

import React from 'react';
const audience = ["Practicing Surgical Pathologists ready to add molecular authority", "Hematopathologists integrating NGS and flow into daily sign-out", "Pathologists preparing for subspecialty or leadership roles", "Lab Directors building precision oncology capability in-house", "Oncologists seeking deeper laboratory integration", "Industry professionals in biomarker / CDx strategy roles"];
const TargetAudienceSection = () => {
  return <section className="bg-[#FAF8F5] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Part: Designed for pathologists in practice */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              IS THIS YOU?
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight mb-12 ff-font-bold max-w-xl">
            Designed for pathologists in practice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audience.map((text, idx) => <div key={idx} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6 flex gap-3 items-start">
                <span className="text-[#E94E8F] text-lg leading-none mt-0.5">-</span>
                <p className="text-[#1E1A29] text-xs font-semibold leading-relaxed ff-font">
                  {text}
                </p>
              </div>)}
          </div>
        </div>

        {/* Bottom Part: Enrollment Box */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#FFCA00]/40 p-8 md:p-12 shadow-[0_8px_30px_rgb(255,202,0,0.05)] relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Col */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
                <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                  ENROLL
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1E1A29] leading-[1.1] mb-4 ff-font-bold">
                Application is simple.<br />
                <span className="text-[#E94E8F]">Seats are limited.</span>
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed ff-font mb-6 max-w-sm">
                Cohorts are kept deliberately small so every fellow presents cases and 
                gets direct feedback at the vMTB.
              </p>
              <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-8 ff-font-bold">
                NEXT COHORT: [DATE] • TUITION: [AMOUNT] • PAYMENT PLANS AVAILABLE
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-8 py-3.5 rounded-full bg-[#E94E8F] text-white font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold flex items-center gap-2">
                  Start Your Application <span className="font-normal">→</span>
                </button>
                <button className="px-8 py-3.5 rounded-full border border-gray-300 bg-white text-[#1E1A29] font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors ff-font-bold">
                  Talk to Us First
                </button>
              </div>
            </div>

            {/* Right Col */}
            <div className="flex flex-col gap-6 pt-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1E1A29] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1">1</div>
                <div>
                  <h4 className="text-[#1E1A29] text-sm font-bold mb-1 ff-font-bold">Apply online</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed ff-font">A short form — your background, practice setting, and goals. 10 minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1E1A29] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1">2</div>
                <div>
                  <h4 className="text-[#1E1A29] text-sm font-bold mb-1 ff-font-bold">Brief conversation</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed ff-font">A 20-minute call to confirm fit and answer your questions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1E1A29] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1">3</div>
                <div>
                  <h4 className="text-[#1E1A29] text-sm font-bold mb-1 ff-font-bold">Reserve your seat</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed ff-font">Secure your place in the cohort and receive onboarding materials.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1E1A29] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1">4</div>
                <div>
                  <h4 className="text-[#1E1A29] text-sm font-bold mb-1 ff-font-bold">Begin the journey</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed ff-font">Orientation, your first cases, and your first live vMTB.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>;
};
export default TargetAudienceSection;