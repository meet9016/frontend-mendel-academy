import React from 'react';

const PathologyFooterSections = () => {
  return (
    <section className="bg-[#fcfcfb] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* AUDIENCE Section */}
        <div className="mb-32 text-center md:text-left">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              AUDIENCE
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-4xl font-black text-black leading-[1.15] mb-12 ff-font-bold tracking-tight"
          >
            Who This Is For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cards */}
            {[
              "Practicing Surgical Pathologists and Hematopathologists",
              "Pathologists preparing for subspecialty boards or leadership roles",
              "Hemato-oncologists and Medical Oncologists seeking deeper lab integration",
              "Corporate Lab Directors and Hospital Administrators",
              "Pharma, CRO, and Biotech biomarker/CDx strategy teams",
              "International Medical Graduates targeting FRCPath, ABP, or NEET-SS"
            ].map((text, i) => (
              <div 
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-start gap-3"
              >
                <span className="text-[#E94E8F] text-lg leading-none">—</span>
                <p className="text-gray-700 text-xs ff-font font-medium leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FREE RESOURCES Section */}
        <div className="mb-32 text-center md:text-left">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FREE RESOURCES
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-4xl font-black text-black leading-[1.15] mb-12 ff-font-bold tracking-tight"
          >
            Start with something <span className="text-[#E94E8F]">free.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resource 1 */}
            <div
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col"
            >
              <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FREE PDF</span>
              <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">
                Endometrial Biopsy Interpretation Checklist & Diagnostic Algorithm
              </h3>
              <p className="text-gray-600 text-xs ff-font leading-relaxed mb-8 flex-1">
                A practical, high-yield checklist to improve diagnostic accuracy and reduce missed diagnoses in endometrial biopsies.
              </p>
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs outline-none focus:border-[#E94E8F] ff-font"
                />
                <button className="px-5 py-2.5 rounded-full bg-[#E94E8F] text-white font-bold text-[10px] hover:opacity-90 transition-opacity ff-font-bold whitespace-nowrap">
                  Download Free PDF
                </button>
              </div>
            </div>

            {/* Resource 2 */}
            <div
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col"
            >
              <span className="text-[#FFCA00] text-[9px] font-bold tracking-widest uppercase ff-font-bold mb-3">FREE GUIDE</span>
              <h3 className="text-lg font-bold text-black mb-3 ff-font-bold">
                Molecular Pathology Starter Kit: 10 High-Yield Interpretation Pearls
              </h3>
              <p className="text-gray-600 text-xs ff-font leading-relaxed mb-8 flex-1">
                Key interpretation principles and common pitfalls in NGS, liquid biopsy, and biomarker reporting.
              </p>
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs outline-none focus:border-[#E94E8F] ff-font"
                />
                <button className="px-5 py-2.5 rounded-full bg-[#E94E8F] text-white font-bold text-[10px] hover:opacity-90 transition-opacity ff-font-bold whitespace-nowrap">
                  Download Free Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS Section */}
        <div className="text-center md:text-left">
          <div
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="w-6 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              RESULTS
            </span>
          </div>
          
          <h2
            className="text-3xl md:text-4xl font-black text-black leading-[1.15] mb-12 ff-font-bold tracking-tight"
          >
            Real Results from Pathologists<br />
            Worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="text-[#E94E8F] text-4xl font-serif leading-none mb-4">"</div>
              <p className="text-gray-700 text-sm ff-font leading-relaxed mb-8 flex-1 italic">
                [Placeholder — Fellowship participant quote on confidently leading molecular tumor boards after the program.]
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E94E8F] flex items-center justify-center font-bold text-sm ff-font-bold">
                  FP
                </div>
                <div>
                  <p className="text-black text-xs font-bold ff-font-bold">Fellowship Participant</p>
                  <p className="text-gray-400 text-[10px] ff-font">Designation, Institution</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="text-[#E94E8F] text-4xl font-serif leading-none mb-4">"</div>
              <p className="text-gray-700 text-sm ff-font leading-relaxed mb-8 flex-1 italic">
                [Placeholder — consulting client quote on biomarker strategy or lab setup engagement.]
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#161221] text-white flex items-center justify-center font-bold text-sm ff-font-bold">
                  CC
                </div>
                <div>
                  <p className="text-black text-xs font-bold ff-font-bold">Consulting Client</p>
                  <p className="text-gray-400 text-[10px] ff-font">Designation, Organization</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="text-[#E94E8F] text-4xl font-serif leading-none mb-4">"</div>
              <p className="text-gray-700 text-sm ff-font leading-relaxed mb-8 flex-1 italic">
                [Placeholder — IMG quote on clearing FRCPath/ABP with Mendel's preparation methods.]
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm ff-font-bold">
                  IM
                </div>
                <div>
                  <p className="text-black text-xs font-bold ff-font-bold">IMG Board Candidate</p>
                  <p className="text-gray-400 text-[10px] ff-font">Designation, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PathologyFooterSections;
