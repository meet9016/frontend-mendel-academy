"use client";

import React, { useState } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface EngagementWaysSectionProps {
  onOpenBookModal?: () => void;
  onRequestCaseReviewModal?: () => void;
}

const EngagementWaysSection = ({ onOpenBookModal, onRequestCaseReviewModal }: EngagementWaysSectionProps) => {
  const [activeTab, setActiveTab] = useState<'a' | 'b' | 'c' | 'd'>('a');

  const services = [
    {
      id: 'a',
      letter: 'A',
      title: 'Diagnostic Excellence',
      subtitle: 'Second opinions & specialist review',
      forText: 'For pathologists · oncologists · patients\' care teams',
      description: 'Expert review when a diagnosis carries real consequences.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5 5" />
          <path d="M8 10.5h5M10.5 8v5" />
        </svg>
      ),
      list: [
        'Surgical Pathology Second Opinions & Complex Case Consults',
        'Molecular Pathology Specialist Interpretation & Integrated Reporting',
        'Synoptic, medico-legally safe reporting of surgical and molecular pathology cases',
      ],
      buttonText: 'Request a Case Review',
      onButtonClick: onRequestCaseReviewModal || onOpenBookModal,
    },
    {
      id: 'b',
      letter: 'B',
      title: 'Strategic Advisory',
      subtitle: 'Pharma · CRO · biotech',
      forText: 'For pharma · CRO · biotech',
      description: "A practicing pathologist's perspective on biomarker programs — the perspective most strategy decks are missing.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M4 20V4M4 20h16" />
          <rect x="7" y="12" width="3" height="5" />
          <rect x="12" y="8" width="3" height="9" />
          <rect x="17" y="5" width="3" height="12" />
        </svg>
      ),
      list: [
        'Biomarker Strategy, CDx Development & Companion Diagnostic Planning',
        'PGx & Precision Oncology Strategy Consulting',
        'Virtual Molecular Tumor Board (vMTB) Program Development',
      ],
      buttonText: 'Request a call',
      onButtonClick: onOpenBookModal,
    },
    {
      id: 'c',
      letter: 'C',
      title: 'Turnkey Molecular Diagnostics Lab Implementation',
      subtitle: 'Turnkey molecular labs',
      forText: 'For corporate labs · pharmaceutical companies · oncology hospitals',
      description: 'From empty floor to first validated report — full-spectrum lab setup guidance grounded in decades of operational reality on two continents.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M9 3v6L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 9V3" />
          <path d="M8 3h8M7.5 13h9" />
        </svg>
      ),
      list: [
        'Full-spectrum lab setup consulting (IHC / PCR / Flow / FISH / NGS workflows)',
        'Capex/Opex modeling, workflow design, regulatory guidance, and pricing strategy',
      ],
      buttonText: 'Plan Your Lab',
      onButtonClick: onOpenBookModal,
    },
    {
      id: 'd',
      letter: 'D',
      title: 'Telepathology Consulting',
      subtitle: 'Remote expert opinion',
      forText: 'For surgical pathologists · oncologists · hemato-oncologists · microbiologists · corporate hospitals & labs · pharma · biotech · CROs',
      description: 'Remote access to subspecialty expertise — expert opinion and interpretation delivered digitally, structured around how you actually work.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <path d="M8 20h8M12 17v3" />
          <circle cx="9" cy="10.5" r="2.4" />
          <path d="M12.5 8.5h5M12.5 12h4" />
        </svg>
      ),
      list: [
        'Per-case expert opinion & interpretation on demand',
        'Monthly or annual retainership for ongoing case support',
        'Flexible engagement tiers scoped to hospitals, labs, and industry partners',
      ],
      buttonText: 'Request a Free Consult',
      onButtonClick: onOpenBookModal,
    },
  ];

  return (
    <section id="services" className={`${FONT} bg-[#FAF8F5] py-[80px] md:py-[96px] px-6 border-b border-[#E6E0D8]`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Section Head */}
        <div className="mb-[32px]">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-[30px] h-[3px] bg-[#FFC900] rounded-[2px]" />
            <span className={`${MONO} text-[0.78rem] font-bold tracking-[0.16em] uppercase text-[#8B859E]`}>
              SERVICES
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#241E3D] tracking-tight leading-tight">
            Ways to engage
          </h2>
        </div>

        {/* Stabs Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] mb-[32px]">
          {services.map((svc) => {
            const isActive = activeTab === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => setActiveTab(svc.id as 'a' | 'b' | 'c' | 'd')}
                className={`flex items-center gap-[13px] p-[16px_20px] rounded-[14px] border-2 text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#E0568F] shadow-[0_10px_26px_rgba(224,86,143,0.16)] -translate-y-0.5'
                    : 'bg-white border-[#E6E0D8] hover:border-[#E0568F] hover:-translate-y-0.5'
                }`}
              >
                <span
                  className={`w-[38px] h-[38px] rounded-full font-extrabold text-[1.1rem] flex items-center justify-center flex-none border-2 transition-colors ${
                    isActive
                      ? 'bg-[#E0568F] text-white border-[#E0568F]'
                      : 'bg-[#FAF7F2] text-[#E0568F] border-[#E6E0D8]'
                  }`}
                >
                  {svc.letter}
                </span>
                <span className="min-w-0">
                  <b className={`block text-[0.98rem] tracking-[-0.02em] font-bold ${isActive ? 'text-[#E0568F]' : 'text-[#241E3D]'}`}>
                    {svc.title.split(' ')[0]} {svc.title.split(' ')[1] || ''}
                  </b>
                  <small className={`${MONO} block text-[0.64rem] tracking-[0.07em] uppercase text-[#5C5575] mt-0.5 truncate`}>
                    {svc.subtitle}
                  </small>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Card */}
        {services.map((svc) => {
          if (activeTab !== svc.id) return null;
          return (
            <div
              key={svc.id}
              className="relative bg-white border border-[#E6E0D8] rounded-[20px] p-8 sm:p-11 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Left Bar Gradient */}
              <div className="absolute top-0 left-0 bottom-0 w-[6px] bg-gradient-to-b from-[#E0568F] to-[#FFC900]" />

              {/* Left Category Stamp */}
              <div className="hidden md:flex flex-col items-start justify-start pt-1">
                <span className={`${MONO} text-[0.74rem] tracking-[0.1em] text-[#C79A00] uppercase font-bold`}>
                  CATEGORY
                </span>
                <b className="text-[2.6rem] leading-none font-extrabold text-[#E0568F] tracking-[-0.03em]">
                  {svc.letter}
                </b>
              </div>

              {/* Right Content */}
              <div>
                {/* Icon */}
                <div className="w-[60px] h-[60px] rounded-[16px] bg-gradient-to-br from-[#E0568F]/15 to-white border border-[#E6E0D8] flex items-center justify-center text-[#E0568F] mb-4">
                  {svc.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-[1.55rem] font-extrabold text-[#241E3D] leading-tight mb-2">
                  {svc.title}
                </h3>

                {/* For Audience */}
                <p className={`${MONO} text-[0.7rem] tracking-[0.12em] uppercase text-[#5C5575] mb-4`}>
                  {svc.forText}
                </p>

                {/* Subtext */}
                <p className="text-[#5C5575] text-[1.02rem] leading-relaxed mb-4">
                  {svc.description}
                </p>

                {/* Bullet List */}
                <ul className="list-none m-0 p-0 space-y-3 mb-6">
                  {svc.list.map((item, idx) => (
                    <li
                      key={idx}
                      className="relative pl-[26px] text-[0.97rem] text-[#5C5575] before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-[13px] before:h-[3px] before:rounded-[2px] before:bg-gradient-to-r before:from-[#E0568F] before:to-[#FFC900]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={svc.onButtonClick}
                    className={`${FONT} inline-flex items-center gap-[10px] font-bold text-[0.95rem] px-[28px] py-[14px] rounded-full bg-[#E0568F] hover:bg-[#C84578] text-white transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(224,86,143,0.3)] cursor-pointer group`}
                  >
                    {svc.buttonText} <span className="transition-transform duration-[180ms] group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EngagementWaysSection;