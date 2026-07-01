import React from 'react';

const PathologyMasteryCourses = () => {
  return (
    <section id="mastery-courses" className="bg-[#fcfcfb] py-24 px-6 relative border-t border-gray-100">
      {/* MASTERY COURSES Section */}
      <div className="max-w-7xl mx-auto text-left mb-32 flex flex-col items-start">
        <div
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
            MASTERY COURSES
          </span>
        </div>
        
        <h2
          className="text-4xl md:text-5xl font-black text-black leading-[1.15] mb-6 ff-font-bold tracking-tight"
        >
          Go deep, <span className="text-[#E94E8F]">fast.</span>
        </h2>
        
        <p
          className="text-gray-600 text-sm md:text-base leading-relaxed ff-font mb-10 max-w-2xl"
        >
          High-impact, focused programs for rapid skill elevation in high-complexity diagnostic areas.<br />
          Enroll in an upcoming cohort, reserve the series running now, or buy past courses on demand.
        </p>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-3 mb-10"
        >
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-yellow-400 bg-[#fffdf5] text-black text-[11px] font-bold ff-font-bold shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFCA00]"></div>
            Upcoming
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 text-[11px] font-bold ff-font-bold hover:bg-gray-50 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E94E8F]"></div>
            In Session
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 text-[11px] font-bold ff-font-bold hover:bg-gray-50 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            On-Demand
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card 1 */}
          <div
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative"
          >
            <div className="absolute top-6 right-6 px-3 py-1 bg-[#FFCA00] rounded-md text-black text-[9px] font-black tracking-widest uppercase ff-font-bold">
              ★ 4-WEEK COURSE
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
              {/* Mock icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            
            <h3 className="text-xl font-bold text-black mb-2 ff-font-bold">Breast Pathology Mastery</h3>
            <p className="text-gray-600 text-sm ff-font leading-relaxed mb-6">
              Core biopsies to receptors — the highest volume cancer specimen you sign out.
            </p>
            
            <p className="text-[#E94E8F] text-xs font-bold ff-font-bold mb-6">
              Starts Sep 3 · 9 seats left
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black text-black ff-font-bold">$690</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded ff-font-bold">USD</span>
              <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200 ff-font-bold ml-1">PAY IN 3</span>
            </div>
            
            <button className="w-full py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm hover:opacity-90 transition-opacity ff-font-bold">
              Enroll Now →
            </button>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative"
          >
            <div className="absolute top-6 right-6 px-3 py-1 bg-[#FFCA00] rounded-md text-black text-[9px] font-black tracking-widest uppercase ff-font-bold">
              ★ 4-WEEK COURSE
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
              {/* Mock icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            
            <h3 className="text-xl font-bold text-black mb-2 ff-font-bold">Lung Pathology Mastery</h3>
            <p className="text-gray-600 text-sm ff-font leading-relaxed mb-6">
              Small biopsies, cytology, and the molecular pathways that drive therapy.
            </p>
            
            <p className="text-[#FFCA00] text-xs font-bold ff-font-bold mb-6">
              Starts Oct 20 · 12 seats left
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black text-black ff-font-bold">$690</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded ff-font-bold">USD</span>
              <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200 ff-font-bold ml-1">PAY IN 3</span>
            </div>
            
            <button className="w-full py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm hover:opacity-90 transition-opacity ff-font-bold">
              Enroll Now →
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-500 text-xs ff-font">
            Breast, Lung, Prostate & more launching regularly. <strong>White-label & corporate programs available.</strong>
          </p>
          <button className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold text-[11px] hover:bg-gray-50 transition-colors ff-font-bold whitespace-nowrap">
            View All Mastery Courses →
          </button>
        </div>
      </div>

      {/* BOARD PREPARATION Section */}
      <div id="board-prep" className="max-w-7xl mx-auto text-left pt-12 flex flex-col items-start">
        <div
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
            BOARD PREPARATION
          </span>
        </div>
        
        <h2
          className="text-3xl md:text-4xl font-black text-black leading-[1.15] mb-12 ff-font-bold tracking-tight"
        >
          Board Certification &<br />
          Subspecialty Exam Preparation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col"
          >
            <span className="text-gray-400 text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FOR UK</span>
            <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">FRCPath Part 2</h3>
            <p className="text-gray-600 text-xs ff-font leading-relaxed mb-8 flex-1">
              Practical, emphasis preparation built for international medical graduates: digital slide libraries, structured case dissection with the Onion Skin Technique, and hybrid mentorship.
            </p>
            <button className="w-fit px-5 py-2 rounded-full border border-gray-300 text-black font-bold text-[10px] hover:bg-gray-50 transition-colors ff-font-bold uppercase tracking-wide">
              Explore Program
            </button>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col"
          >
            <span className="text-gray-400 text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FOR INDIA (SUPERSPECIALTY)</span>
            <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">NEET-SS</h3>
            <p className="text-gray-600 text-xs ff-font leading-relaxed mb-8 flex-1">
              Onco-Pathology, Clinical Hematology, and Medical Genetics tracks with targeted QBanks, visual mnemonics, and exam pattern reasoning practice.
            </p>
            <button className="w-fit px-5 py-2 rounded-full border border-gray-300 text-black font-bold text-[10px] hover:bg-gray-50 transition-colors ff-font-bold uppercase tracking-wide">
              Explore Program
            </button>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col"
          >
            <span className="text-gray-400 text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">US BOARDS</span>
            <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">ABP Subspecialty Exams</h3>
            <p className="text-gray-600 text-xs ff-font leading-relaxed mb-8 flex-1">
              Hematopathology, Molecular Genetic Pathology, and more — QBanks, digital slides, and mentorship aligned to ABP subspecialty blueprints.
            </p>
            <button className="w-fit px-5 py-2 rounded-full border border-gray-300 text-black font-bold text-[10px] hover:bg-gray-50 transition-colors ff-font-bold uppercase tracking-wide">
              Explore Program
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathologyMasteryCourses;
