"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is the weekly time commitment for the Fellowship?",
    answer: "The Fellowship is designed for practicing professionals. We recommend dedicating 3-5 hours per week to fully engage with the material, vMTBs, and community discussions."
  },
  {
    question: "Do I need access to a wet lab or NGS facility to benefit from the programs?",
    answer: "No. Our focus is on interpretation and clinical integration. We provide all the necessary digital slides, reports, and case data for you to practice and learn."
  },
  {
    question: "How is this different from other molecular pathology fellowships or online courses?",
    answer: "Most programs teach wet-lab techniques. Mendel focuses entirely on interpretation—turning complex lab data into actionable clinical decisions using our proprietary Onion Skin Technique."
  },
  {
    question: "Is this suitable for pathologists practicing outside India?",
    answer: "Absolutely. The core principles of molecular pathology and precision oncology are universal, and our global community spans multiple continents."
  },
  {
    question: "What kind of support do I receive after the program ends?",
    answer: "You become part of our lifetime alumni network, giving you ongoing access to our monthly vMTBs, dedicated WhatsApp groups, and a global community of peers."
  },
  {
    question: "Do you offer institutional, corporate, or white-label programs?",
    answer: "Yes, we partner with hospitals, labs, and pharma companies to create tailored training programs. Please contact us for more details."
  },
  {
    question: "What is your refund or deferral policy?",
    answer: "We offer flexible deferral options if your schedule changes. Please refer to our detailed terms and conditions for our refund policy."
  }
];

const PathologyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#fcfcfb] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-start text-left">
        <div className="max-w-4xl w-full">
          <div className="mb-12">
          <div className="flex items-center justify-start gap-3 mb-4">
            <div className="w-4 h-[1px] bg-yellow-500"></div>
            <span className="text-gray-400 text-[9px] font-bold tracking-widest uppercase ff-font-bold">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black ff-font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-black text-sm font-bold ff-font-bold pr-8">
                  {faq.question}
                </span>
                <span className="text-[#E94E8F] text-xl font-light leading-none">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div>
                  <div className="px-6 pb-6 text-gray-600 text-sm ff-font leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default PathologyFAQ;
