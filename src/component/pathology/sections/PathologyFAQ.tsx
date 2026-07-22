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

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";
const PathologyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`${FONT} bg-[#FAF7F2] text-[#241E3D] text-[17px] leading-[1.65] antialiased py-24`}
    >
      <div className="max-w-[1180px] mx-auto px-6">

        {/* section head */}
        <div className="max-w-[780px] mb-[52px]">
          <span className={`${MONO} inline-flex items-center gap-3 text-[0.72rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            FAQ
          </span>
          <h2 className={`${FONT} text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#241E3D]`}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* faq list */}
        <div className="max-w-[840px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-xl mb-3 overflow-hidden transition-colors duration-200 ${isOpen ? "border-[#E0568F]" : "border-[#E6E0D8]"
                  }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`${FONT} w-full text-left px-[26px] py-[22px] flex items-center justify-between gap-4 font-bold text-[17px] text-[#241E3D] focus:outline-none`}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-[#E0568F] text-[1.6rem] font-normal leading-none flex-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <p className={`${FONT} px-[26px] pb-6 text-[#5C5575] text-[0.97rem] leading-[1.65] m-0`}>
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PathologyFAQ;
