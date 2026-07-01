import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PathologyCommunity = () => {
  return (
    <>
      {/* COMMUNITY Section */}
      <section id="community" className="bg-[#fcfcfb] pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-start text-left">
          <div
            className="bg-[#161221] rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl"
          >
            {/* Background Glows and Number */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E94E8F]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-white/5 leading-none ff-font-bold pointer-events-none select-none">
              2,500+
            </div>

            <div className="flex flex-col md:flex-row gap-12 relative z-10">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-[1px] bg-yellow-500"></div>
                  <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
                    COMMUNITY
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight">
                  Our Community &<br />Lifetime Value
                </h2>
                
                <p className="text-gray-300 text-sm leading-relaxed ff-font mb-10 max-w-sm">
                  Join a growing ecosystem that continues to support you long after any single program ends.
                </p>

                <p className="text-[#FFCA00] text-xl font-black ff-font-bold">
                  This is not just education.<br />
                  <span className="text-[#E94E8F]">It is a professional home for life.</span>
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-6">
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="w-5 h-5 text-[#FFCA00] flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm ff-font leading-snug">
                    Active global network of over 2,500 pathologists via dedicated WhatsApp groups.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="w-5 h-5 text-[#FFCA00] flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm ff-font leading-snug">
                    Ongoing access to monthly Virtual Molecular Tumor Boards (vMTB).
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="w-5 h-5 text-[#FFCA00] flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm ff-font leading-snug">
                    Alumni network for referrals, collaboration, and career opportunities.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="w-5 h-5 text-[#FFCA00] flex-shrink-0 mt-0.5" />
                  <p className="text-white text-sm ff-font leading-snug">
                    Emerging Mendel Telepathology Network — a hub-and-spoke second-opinion platform for complex surgical pathology, hematopathology, and molecular integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONION SKIN TECHNIQUE Section */}
      <section className="bg-[#100b16] py-32 px-6 relative border-t border-[#1E1A29]">
        <div className="max-w-7xl mx-auto text-left flex flex-col items-start">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              TRY THE METHOD
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-6 ff-font-bold tracking-tight text-center md:text-left"
          >
            Experience the <span className="text-[#FFCA00]">Onion Skin<br />Technique</span>
          </h2>
          
          <p
            className="text-gray-400 text-sm md:text-base leading-relaxed ff-font mb-12 max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            This is how we teach interpretation — peel a real case one layer at a time until the diagnosis, and the therapy, become unavoidable. Go ahead, work the case.
          </p>

          {/* Interactive Card Mockup */}
          <div
            className="bg-[#161221] rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl flex flex-col md:flex-row items-center gap-12 mb-8"
          >
            {/* Left Graphic (Concentric Circles) */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[16px] border-[#6D28D9] opacity-80"></div>
                <div className="absolute inset-4 rounded-full border-[16px] border-[#E94E8F] opacity-90"></div>
                <div className="absolute inset-8 rounded-full border-[16px] border-[#FFCA00] opacity-100"></div>
                <div className="absolute inset-12 rounded-full border-[16px] border-[#100b16]"></div>
                <div className="absolute inset-16 rounded-full bg-[#E94E8F] opacity-50 blur-md"></div>
                
                {/* Steps Pills */}
                <div className="absolute -bottom-8 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFCA00] text-black text-[9px] font-bold tracking-widest uppercase ff-font-bold">CLINICAL</span>
                  <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold">H&E</span>
                  <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold">IHC</span>
                  <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-500 text-[9px] font-bold tracking-widest uppercase ff-font-bold">MOLECULAR</span>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="w-full md:w-1/2 text-left">
              <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold mb-3 block">
                LAYER 01 — CLINICAL
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 ff-font-bold">
                The specimen arrives
              </h3>
              <p className="text-gray-300 text-sm ff-font leading-relaxed mb-8">
                A 62-year-old lifelong never-smoker presents with a 3 cm mass in the right upper lobe. A core biopsy lands on your bench. Where do you begin?
              </p>
              <button className="px-6 py-2.5 rounded-full bg-[#FFCA00] text-black font-bold text-sm hover:bg-yellow-400 transition-colors ff-font-bold">
                Peel back a layer →
              </button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs ff-font">
            This is one case. The fellowship is twelve months of them — live, with feedback. <a href="#" className="text-[#FFCA00] hover:underline font-bold">Apply to the cohort →</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PathologyCommunity;
