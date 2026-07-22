"use client";

import React, { useState } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const faqs = [
  {
    q: "What is the weekly time commitment?",
    a: "Expect to spend approximately 4-6 hours per week. This includes reviewing pre-read materials, working through the weekly case vignettes, and participating in the live virtual Molecular Tumor Board sessions.",
  },
  {
    q: "Do I need access to a wet lab or NGS facility?",
    a: "No. This fellowship is entirely focused on interpretation, clinical reasoning, and reporting. All case data, including raw variant files when relevant, are provided virtually.",
  },
  {
    q: "Is this suitable for pathologists outside India?",
    a: "Yes. The principles of molecular pathology, variant interpretation, and targeted therapies are universal. While we cover region-specific nuances, the core frameworks apply globally.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, upon successful completion of all four phases and active participation in the vMTBs, you will receive a Certificate of Completion from Mendel Academy.",
  },
  {
    q: "What happens after the 12 months?",
    a: "You retain lifetime access to the Mendel Academy community. This means you can continue attending future vMTBs, bringing your own challenging cases for discussion with peers and faculty.",
  },
  {
    q: "What is the refund or deferral policy?",
    a: "We offer a 14-day refund window from the start of the cohort. Deferrals to a future cohort are evaluated on a case-by-case basis for significant extenuating circumstances.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={`${FONT} bg-[#FAF7F2] text-[#241E3D] py-[92px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="max-w-[780px] mb-[50px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            FAQ
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.025em]`}>
            Questions, answered
          </h2>
        </div>

        <div className="flex flex-col gap-3.5 max-w-[920px]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E6E0D8] rounded-[14px] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={`${FONT} w-full p-[20px_24px] flex items-center justify-between text-left font-bold text-[1.05rem] text-[#241E3D] hover:text-[#E0568F] transition-colors`}
                >
                  <span className="pr-6 leading-[1.3]">{faq.q}</span>
                  <span className={`text-[#E0568F] text-[1.6rem] font-light transition-transform duration-200 flex-none ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className={`${FONT} px-[24px] pb-[20px] text-[#5C5575] text-[0.97rem] leading-[1.65]`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;