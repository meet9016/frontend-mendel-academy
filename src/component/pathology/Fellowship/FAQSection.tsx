"use client";

import React, { useState } from 'react';
const faqs = [{
  q: "What is the weekly time commitment?",
  a: "Expect to spend approximately 4-6 hours per week. This includes reviewing pre-read materials, working through the weekly case vignettes, and participating in the live virtual Molecular Tumor Board sessions."
}, {
  q: "Do I need access to a wet lab or NGS facility?",
  a: "No. This fellowship is entirely focused on interpretation, clinical reasoning, and reporting. All case data, including raw variant files when relevant, are provided virtually."
}, {
  q: "Is this suitable for pathologists outside India?",
  a: "Yes. The principles of molecular pathology, variant interpretation, and targeted therapies are universal. While we cover region-specific nuances, the core frameworks apply globally."
}, {
  q: "Will I receive a certificate?",
  a: "Yes, upon successful completion of all four phases and active participation in the vMTBs, you will receive a Certificate of Completion from Mendel Academy."
}, {
  q: "What happens after the 12 months?",
  a: "You retain lifetime access to the Mendel Academy community. This means you can continue attending future vMTBs, bringing your own challenging cases for discussion with peers and faculty."
}, {
  q: "What is the refund or deferral policy?",
  a: "We offer a 14-day refund window from the start of the cohort. Deferrals to a future cohort are evaluated on a case-by-case basis for significant extenuating circumstances."
}];
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  return <section className="bg-[#FAF8F5] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#FFCA00]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1E1A29] leading-tight ff-font-bold">
            Questions, answered
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
              <button onClick={() => toggleFaq(idx)} className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left">
                <span className="text-[#1E1A29] text-sm font-bold ff-font-bold pr-8">
                  {faq.q}
                </span>
                <span className={`text-[#E94E8F] text-xl font-light transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              <div className={`px-6 text-sm text-[#64748B] ff-font leading-relaxed transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {faq.a}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FAQSection;