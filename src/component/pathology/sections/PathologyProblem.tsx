import React from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

const PathologyProblem = () => {
  return (
    <>
      {/* Light background section for the card */}
      <section className="bg-[#fcfcfb] py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div
            className="bg-white rounded-3xl shadow-xl shadow-pink-900/5 border border-gray-100 p-10 md:p-14 relative overflow-hidden"
          >
            {/* Top Pink Gradient */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-white via-pink-100 to-[#E94E8F]/20"></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E94E8F]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#E94E8F] flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-pink-500/20">
                <FaArrowTrendUp className="w-5 h-5" />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[1px] bg-gray-400"></div>
                  <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                    A CAREER ACCELERATOR
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-black leading-[1.1] mb-6 ff-font-bold tracking-tight">
                  Don't just learn more — <br />
                  <span className="text-[#E94E8F]">level up your career.</span>
                </h2>
                
                <p className="text-gray-600 text-base md:text-lg leading-relaxed ff-font max-w-2xl">
                  Whether you're a practicing pathologist, lab director, or industry professional, Mendel is built to accelerate and upgrade your career — practical skills you can apply immediately, not just theoretical knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark background section for the problem */}
      <section className="bg-[#100b16] py-24 px-6 relative">
        <div
          className="max-w-4xl mx-auto text-left"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-gray-600"></div>
            <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THE PROBLEM
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.15] mb-4 ff-font-bold tracking-tight">
            The tests exist.<br />
            The <span className="text-[#E94E8F]">interpretation</span> is what's missing.
          </h2>
          
          <p className="text-[#FFCA00] text-lg font-bold mb-10 ff-font-bold">
            Mendel Academy was built to close that gap.
          </p>
          
          <p className="text-white text-base md:text-lg leading-relaxed ff-font mb-6 max-w-3xl">
            In an era of exploding biomarkers, NGS reports and targeted therapies, even experienced oncologists and pathologists can be overwhelmed and indecisive. Information overload, complex data and misinterpreted reporting can cost patients precious time — and sometimes their lives.
          </p>
          
          <p className="text-[#E94E8F] text-lg font-bold mb-12 ff-font-bold">
            We demystify complex diagnoses to improve patient outcomes.
          </p>

          {/* Border separator */}
          <div className="w-full h-[1px] bg-gray-800 mb-10"></div>

          {/* Pills */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold whitespace-nowrap">
              WE WORK ACROSS
            </span>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Oncology</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Hematology-Oncology</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Immuno-Oncology</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Microbiology</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Surgical & Molecular Pathology</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Pharma Consulting</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Advanced EdTech</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">vMTB</span>
              <span className="px-5 py-2 rounded-full border border-gray-700 bg-[#161221] text-white text-[11px] font-medium ff-font hover:bg-gray-800 transition-colors cursor-default">Mini-Medical MBAs</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PathologyProblem;
