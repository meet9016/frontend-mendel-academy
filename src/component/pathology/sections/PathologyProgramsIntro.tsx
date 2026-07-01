import React from 'react';
import { FaBookOpen, FaStethoscope } from 'react-icons/fa';

const PathologyProgramsIntro = () => {
  return (
    <section id="why-mendel" className="bg-[#fcfcfb] pb-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-left">
        <div
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
            WHY MENDEL
          </span>
        </div>
        
        <h2
          className="text-3xl md:text-5xl font-black text-black leading-[1.15] mb-8 ff-font-bold tracking-tight"
        >
          Most programs teach the lab techniques.<br />
          We teach the <span className="text-[#E94E8F]">interpretation</span>.
        </h2>
        
        <p
          className="text-gray-600 text-sm md:text-base leading-relaxed ff-font mb-4"
        >
          Most pathology training stops at exam prep or wet-lab technique. Mendel specializes in<br />
          <strong>Interpretation and clinical Integration</strong> — turning raw laboratory data into confident clinical<br />
          action across oncology, hematology-oncology, immuno-oncology, and microbiology.
        </p>

        <p
          className="text-gray-600 text-sm md:text-base leading-relaxed ff-font mb-12"
        >
          Our programs are built on two pillars that no other platform combines:
        </p>

        {/* Two Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1 */}
          <div
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
              <FaBookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">
              Mastery & Fellowship Programs
            </h3>
            <p className="text-gray-600 text-sm ff-font leading-relaxed">
              Structured Mastery Courses and a 12-month<br />
              Fellowship that takes you from molecular diagnostic<br />
              interpretation to precision therapies.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
              <FaStethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">
              Molecular Tumor Board
            </h3>
            <p className="text-gray-600 text-sm ff-font leading-relaxed">
              Monthly Virtual Molecular Tumor Boards (vMTB)<br />
              where you present real cases alongside a global<br />
              network of 2,500+ molecular pathologists and<br />
              oncologists.
            </p>
          </div>
        </div>

        {/* Instructor Card */}
        <div
          className="bg-[#fffafa] rounded-3xl p-8 md:p-10 border border-pink-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E94E8F]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 rounded-full bg-[#161221] flex flex-shrink-0 items-center justify-center border-4 border-white shadow-md">
              <span className="text-[#FFCA00] text-2xl font-bold ff-font-bold">KM</span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-black mb-1 ff-font-bold">
                Led by Dr. Kishor Managoli, MD
              </h3>
              <p className="text-[#E94E8F] text-[10px] font-bold tracking-[0.15em] uppercase ff-font-bold mb-4">
                PATHOLOGIST • EDUCATOR • INDUSTRY ADVISOR
              </p>
              
              <p className="text-gray-600 text-sm ff-font leading-relaxed mb-6">
                35+ years across surgical oncopathology, molecular pathology, corporate pharma, and stem<br />
                cell research — now distilled into programs, tumor boards, and consulting engagements<br />
                that change how pathologists and clinicians practice.
              </p>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold shadow-sm">
                  35+ YEARS IN MEDICINE
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold shadow-sm">
                  12 US PATENTS
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold shadow-sm">
                  10,000+ ACCESSIONS/YEAR
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold shadow-sm">
                  GLOBAL OPERATIONS AND EXPERTISE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathologyProgramsIntro;
