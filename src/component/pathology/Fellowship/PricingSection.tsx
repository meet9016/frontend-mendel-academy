"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

const tiers = [
  {
    name: "Full Fellowship",
    sub: "The Necklace",
    best: true,
    price: "₹1,06,200",
    duration: "12 Months",
    scope: "Comprehensive — all tech + all clinical systems",
    liveStrategy: "Weekly (Weekend)",
    observership: "Included FREE",
    directorsCap: "Included",
    tumorBoards: "Exclusively for Fellows",
    consults: "Included",
    bonus: "Included 100% FREE",
    ideal: "Future Lab Directors seeking complete diagnostic mastery and career transformation.",
    highlight: true,
  },
  {
    name: "Mini-Fellowship",
    sub: "Tech Track",
    best: false,
    price: "₹70,800",
    duration: "6 Months",
    scope: "Technical only (Solid or Liquid)",
    liveStrategy: "—",
    observership: "—",
    directorsCap: "—",
    tumorBoards: "—",
    consults: "—",
    bonus: "—",
    ideal: "Pathologists needing only bench-side technical skills, not clinical integration.",
    highlight: false,
  },
  {
    name: "Solo Pearl",
    sub: "Single Module",
    best: false,
    price: "₹29,500",
    duration: "Self-Paced",
    scope: "Single tech vertical (e.g., IHC only)",
    liveStrategy: "—",
    observership: "—",
    directorsCap: "—",
    tumorBoards: "—",
    consults: "—",
    bonus: "—",
    ideal: "Mastering one specific tool required for your lab immediately.",
    highlight: false,
  },
  {
    name: "Observership",
    sub: "Live Mentorship",
    best: false,
    price: "₹14,750",
    duration: "4 Weeks (1 Month)",
    scope: "Single system focus (Live)",
    liveStrategy: "—",
    observership: "The core offering",
    directorsCap: "—",
    tumorBoards: "—",
    consults: "During sessions only",
    bonus: "—",
    ideal: "A quick, intensive burst of personal mentorship in one area.",
    highlight: false,
  },
  {
    name: "Case of the Week",
    sub: "WhatsApp",
    best: false,
    price: "₹6,000",
    duration: "12 Months (52 Cases)",
    scope: "Weekly snapshot",
    liveStrategy: "—",
    observership: "—",
    directorsCap: "—",
    tumorBoards: "—",
    consults: "—",
    bonus: "—",
    ideal: "Continuous, low-friction learning on the go.",
    highlight: false,
  },
];

const features = [
  { key: "duration", label: "Duration" },
  { key: "scope", label: "Scope" },
  { key: "liveStrategy", label: "Live Strategy Sessions" },
  { key: "observership", label: "Live \"Virtual Observership\"" },
  { key: "directorsCap", label: "The \"Director's Cap\" Module", sub: "QA/QC, Legal, NABL" },
  { key: "tumorBoards", label: "Virtual Grand Rounds & Tumor Boards" },
  { key: "consults", label: "Mendel Consults", sub: "Safety Net" },
  { key: "bonus", label: "BONUS: The Full Ecosystem", sub: "Reflex Library, LegalSafe Tools, Case Bank — value ₹77,500+" },
  { key: "ideal", label: "Ideal For" },
];

interface PricingSectionProps {
  onOpenApply?: () => void;
}

const PricingSection = ({ onOpenApply }: PricingSectionProps) => {
  return (
    <section id="mp-pricing" className={`${FONT} bg-[#FAF7F2] text-[#241E3D] pt-4 pb-[60px] md:pb-[72px] px-6 relative`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="max-w-[780px] mb-[30px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            PRICING
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.025em]`}>
            Choose your plan.
          </h2>
        </div>

        <p className={`${MONO} block md:hidden text-[0.72rem] tracking-[0.06em] uppercase text-[#918AA6] mb-3`}>
          Swipe to compare →
        </p>

        {/* Scrollable Table Container */}
        <div className="border border-[#E6E0D8] rounded-[20px] bg-white overflow-x-auto shadow-sm">
          <table className="w-full min-w-[1040px] border-collapse text-[0.94rem]">
            <thead>
              <tr className="border-b-2 border-[#E6E0D8]">
                <th className="p-[20px_18px] text-left bg-[#F7F2EA] w-[210px] min-w-[190px] font-bold text-[#241E3D]">
                  Feature / Benefit
                </th>
                {tiers.map((tier, idx) => (
                  <th
                    key={idx}
                    className={`p-[20px_18px] text-center border-l border-[#EEE8DE] ${
                      tier.highlight ? 'bg-[#FBF1F6] border-t-4 border-t-[#E0568F]' : 'bg-white'
                    }`}
                  >
                    {tier.best && (
                      <span className={`${MONO} inline-block text-[0.6rem] font-bold tracking-[0.11em] uppercase text-[#3A2E00] bg-[#FFC900] rounded-md px-2 py-0.5 mb-2`}>
                        Best Value
                      </span>
                    )}
                    <span className="block font-extrabold text-[1.02rem] tracking-[-0.01em] text-[#241E3D]">
                      {tier.name}
                    </span>
                    <span className={`${MONO} block text-[0.66rem] tracking-[0.12em] uppercase text-[#5C5575] mt-1`}>
                      {tier.sub}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr className="border-b border-[#E6E0D8]">
                <td className="p-[15px_18px] text-left bg-[#F7F2EA] font-bold text-[#241E3D]">
                  Total Price <small className="block font-normal text-[0.76rem] text-[#5C5575]">GST included</small>
                </td>
                {tiers.map((tier, idx) => (
                  <td
                    key={idx}
                    className={`p-[15px_18px] text-center border-l border-[#EEE8DE] ${
                      tier.highlight ? 'bg-[#FBF1F6]' : ''
                    }`}
                  >
                    <span className={`font-semibold text-[1.32rem] whitespace-nowrap ${tier.highlight ? 'text-[#B03A6C]' : 'text-[#241E3D]'}`}>
                      {tier.price}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Feature Rows */}
              {features.map((feat, fIdx) => (
                <tr key={fIdx} className="border-b border-[#E6E0D8] last:border-b-0">
                  <td className="p-[15px_18px] text-left bg-[#F7F2EA] font-bold text-[#241E3D] leading-snug">
                    {feat.label}
                    {feat.sub && (
                      <small className="block font-normal text-[0.76rem] text-[#5C5575] mt-0.5">
                        {feat.sub}
                      </small>
                    )}
                  </td>
                  {tiers.map((tier, tIdx) => {
                    const val = (tier as any)[feat.key];
                    const isYes = typeof val === 'string' && (val.includes('Included') || val.includes('Exclusively') || val.includes('core offering'));
                    return (
                      <td
                        key={tIdx}
                        className={`p-[15px_18px] text-center border-l border-[#EEE8DE] ${
                          tier.highlight ? 'bg-[#FBF1F6]' : ''
                        }`}
                      >
                        {feat.key === 'ideal' ? (
                          <span className="text-[#5C5575] text-[0.85rem] leading-snug block">
                            {val}
                          </span>
                        ) : isYes ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#241E3D] justify-center">
                            <svg className="w-4 h-4 text-[#E0568F] flex-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            {val}
                          </span>
                        ) : val === '—' ? (
                          <span className="text-[#C9C1B4] text-[1.1rem]">—</span>
                        ) : (
                          <span className="text-[#241E3D] leading-snug">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA Row */}
              <tr>
                <td className="p-[20px_18px] bg-[#F7F2EA]" />
                {tiers.map((tier, idx) => (
                  <td
                    key={idx}
                    className={`p-[20px_18px] text-center border-l border-[#EEE8DE] ${
                      tier.highlight ? 'bg-[#FBF1F6]' : ''
                    }`}
                  >
                    <button
                      onClick={onOpenApply}
                      className={`inline-block font-bold text-xs px-[22px] py-[10px] rounded-full transition-all duration-180 ${
                        tier.highlight
                          ? 'bg-[#E0568F] text-white hover:bg-[#B03A6C]'
                          : 'bg-transparent text-[#241E3D] border border-[#241E3D] hover:bg-[#241E3D] hover:text-white'
                      }`}
                    >
                      Apply
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className={`${MONO} text-[0.8rem] text-[#918AA6] mt-4`}>
          All prices in INR, inclusive of GST · Ecosystem value ₹77,500+ included free with the Full Fellowship.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
