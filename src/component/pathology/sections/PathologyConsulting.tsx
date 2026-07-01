import React from 'react';
import { FaHeart, FaUserMd, FaHospital, FaFlask } from 'react-icons/fa';

const PathologyConsulting = () => {
  return (
    <section id="consulting" className="bg-[#fcfcfb] py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center md:text-left">
        
        {/* CONSULTING Section */}
        <div className="mb-24">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              CONSULTING
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-5xl font-black text-black leading-[1.15] mb-6 ff-font-bold tracking-tight"
          >
            When the stakes are high,<br />
            bring in <span className="text-[#E94E8F]">35 years of expertise.</span>
          </h2>
          
          <p
            className="text-gray-600 text-sm md:text-base leading-relaxed ff-font mb-12 max-w-2xl mx-auto md:mx-0"
          >
            Beyond training — access Dr. Managoli's experience for high-stakes diagnostic and strategic needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div
              className="bg-white rounded-2xl p-8 border border-yellow-200 shadow-sm text-left"
            >
              <span className="inline-block px-3 py-1 bg-[#161221] text-white text-[9px] font-bold tracking-widest uppercase ff-font-bold rounded-md mb-6">
                1. DIAGNOSTIC EXCELLENCE
              </span>
              <ul className="space-y-4">
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Surgical Pathology Second Opinions & Complex Case Consults
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Molecular Pathology Specialist Review & Integrated Reporting
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white rounded-2xl p-8 border border-yellow-200 shadow-sm text-left"
            >
              <span className="inline-block px-3 py-1 bg-[#161221] text-white text-[9px] font-bold tracking-widest uppercase ff-font-bold rounded-md mb-6">
                2. STRATEGY (INDUSTRY — PHARMA, LAB & EDTECH)
              </span>
              <ul className="space-y-4">
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Biomarker Strategy, CDx Development & Companion Diagnostic Planning
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  PGx & Precision Oncology Strategy Consulting
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Virtual Molecular Tumor Board (vMTB) Program Development
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white rounded-2xl p-8 border border-yellow-200 shadow-sm text-left"
            >
              <span className="inline-block px-3 py-1 bg-[#161221] text-white text-[9px] font-bold tracking-widest uppercase ff-font-bold rounded-md mb-6">
                3. TELEPATHOLOGY & LAB IMPLEMENTATION
              </span>
              <ul className="space-y-4">
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Full spectrum lab setup consulting (IHC / PCR / Flow / FISH / NGS workflows)
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Capex/Opex modeling, workflow design, regulatory guidance, and pricing strategy
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-xs ff-font">
                  <span className="text-[#E94E8F] mt-1">—</span>
                  Ideal for corporate labs, pharmaceutical companies, and oncology hospitals.
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border border-yellow-300 border-dashed rounded-xl p-4 bg-yellow-50 text-center mb-10 mx-auto max-w-3xl"
          >
            <p className="text-[#FFCA00] font-bold text-xs ff-font-bold">
              35+ years leading high-volume labs • 10,000+ accessions/year • 40+ Pharma/CRO collaborations • US/India dual regulatory and operational perspective
            </p>
          </div>

          <button
            className="px-8 py-3.5 rounded-full bg-[#E94E8F] text-white font-bold text-sm hover:opacity-90 transition-opacity ff-font-bold"
          >
            Schedule a 30-Minute Discovery Call →
          </button>
        </div>

        {/* THE IMPACT Section */}
        <div className="text-center md:text-left">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              THE IMPACT
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-4xl font-black text-black leading-[1.15] mb-6 ff-font-bold tracking-tight"
          >
            When interpretation is done right,<br />
            <span className="text-[#E94E8F]">everyone</span> wins.
          </h2>
          
          <p
            className="text-gray-600 text-sm md:text-base leading-relaxed ff-font mb-12 max-w-2xl mx-auto md:mx-0"
          >
            Better interpretation isn't an academic exercise — it changes outcomes across the entire system of care.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Impact 1 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
                <FaHeart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black mb-3 ff-font-bold">Patients</h3>
              <p className="text-gray-500 text-xs ff-font leading-relaxed">
                Faster, more accurate diagnoses and better matched therapies — improving outcomes and survival.
              </p>
            </div>

            {/* Impact 2 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
                <FaUserMd className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black mb-3 ff-font-bold">Pathologists & Clinicians</h3>
              <p className="text-gray-500 text-xs ff-font leading-relaxed">
                Renewed confidence at the scope and the bedside, with measurably fewer diagnostic errors.
              </p>
            </div>

            {/* Impact 3 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
                <FaHospital className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black mb-3 ff-font-bold">Hospitals & Labs</h3>
              <p className="text-gray-500 text-xs ff-font leading-relaxed">
                Higher patient footfall, stronger therapeutic success, and improved profitability via site using costs.
              </p>
            </div>

            {/* Impact 4 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#E94E8F] mb-6">
                <FaFlask className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-black mb-3 ff-font-bold">Pharma - CRO - Biotech</h3>
              <p className="text-gray-500 text-xs ff-font leading-relaxed">
                Biomarker, CDx & PGx expertise that sharpens trial design, patient stratification, and timelines.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PathologyConsulting;
