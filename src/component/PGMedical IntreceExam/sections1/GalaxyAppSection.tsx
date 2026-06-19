"use client";

import React, { useState, useRef } from "react";

interface GalaxyAppSectionProps {}

const appTools = [
  {
    name: "Mendel Qbanks",
    color: "#FFCA00",
    bg: "#fffbeb",
    price: "$16.99/mo",
    desc: "5,500+ exam-style questions with detailed explanations",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCA00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    name: "Mendel Chitras",
    color: "#10B981",
    bg: "#ecfdf5",
    price: "$16.99/mo",
    desc: "Visual memory maps that replace 10 pages of notes",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    name: "Mendel Flashcards",
    color: "#8B5CF6",
    bg: "#f5f3ff",
    price: "$16.99/mo",
    desc: "Spaced repetition system built for USMLE mastery",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M16 2l-4 3-4-3" />
      </svg>
    ),
  },
  {
    name: "Mendel Study Notes",
    color: "#EC4899",
    bg: "#fdf2f8",
    price: "$25/mo",
    desc: "Deep-dive write-ups with flowcharts and clinical visuals",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    name: "Rapid Recall",
    color: "#3B82F6",
    bg: "#fdf2f8",
    price: "$16.99/mo",
    desc: "Condensed last-minute review sheets per subject",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "Fast Facts",
    color: "#F59E0B",
    bg: "#fdf2f8",
    price: "$16.99/mo",
    desc: "High-yield mnemonics and key facts for rapid review",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const toolSections = [
  {
    title: "Mendel Qbanks",
    subtitle: "5,500+ questions that think like the exam",
    cards: [
      { title: "A 67-year-old with hypertension presents with progressive dyspnea and orthopnea. Exam shows S3 gallop, bilateral crackles. BNP 680. Best mechanism?", badge: "Q1 - Cardiology - Medium" },
      { title: "First-line therapy for HFrEF with EF 35%?", badge: "Q2 - Cardiology - Easy" },
      { title: "45-year-old non-smoker, FEV1/FVC 0.58, no bronchodilator response, ground-glass opacities. Diagnosis?", badge: "Q3 - Pulmonology - Hard" },
      { title: "45-year-old non-smoker, FEV1/FVC 0.58, no bronchodilator response, ground-glass opacities. Diagnosis?", badge: "Q3 - Pulmonology - Hard" },
      { title: "45-year-old non-smoker, FEV1/FVC 0.58, no bronchodilator response, ground-glass opacities. Diagnosis?", badge: "Q3 - Pulmonology - Hard" },
       { title: "45-year-old non-smoker, FEV1/FVC 0.58, no bronchodilator response, ground-glass opacities. Diagnosis?", badge: "Q3 - Pulmonology - Hard" },
    ],
    bottomText: "Scroll to explore sample questions →",
  },
  {
    title: "Mendel Chitras",
    subtitle: "Visual maps that replace 10 pages of notes",
    cards: [
      { title: "Renal Physiology - Laboratory techniques, CRISPR-Cas9 - Gene Editing System", badge: "LABORATORY TECHNIQUES" },
      { title: "Renal Physiology - Laboratory techniques, CRISPR-Cas9 - Gene Editing System", badge: "LABORATORY TECHNIQUES" },
      { title: "Renal Physiology - Laboratory techniques, CRISPR-Cas9 - Gene Editing System", badge: "LABORATORY TECHNIQUES" },
      { title: "Renal Physiology - Laboratory techniques, CRISPR-Cas9 - Gene Editing System", badge: "LABORATORY TECHNIQUES" },
      { title: "Immunology - MHC II - Cellular Component", badge: "IMMUNOLOGY" },
    ],
    bottomText: "Scroll to explore more Chitras →",
  },
  {
    title: "Mendel Flashcards",
    subtitle: "Spaced repetition, built in",
    cards: [
      { title: "What phase of the cell cycle involves DNA replication?", badge: "QUESTION" },
      { title: "What phase of the cell cycle involves DNA replication?", badge: "QUESTION" },
      { title: "What phase of the cell cycle involves DNA replication?", badge: "QUESTION" },
      { title: "What phase of the cell cycle involves DNA replication?", badge: "QUESTION" },
      { title: "What phase of the cell cycle involves DNA replication?", badge: "QUESTION" },
      { title: "S phase (Synthesis)", badge: "ANSWERED" },
      { title: "S phase (Synthesis)", badge: "ANSWERED" },
    ],
  },
  {
    title: "Mendel Study Notes",
    subtitle: "Deep dives, not just notes",
    content: "1-2 page write-ups for every core topic, woven with flowcharts, illustrations, and clinical visuals. Built to be your textbook replacement, not a summary.",
    selectedNote: {
      title: "Heart Failure with Reduced Ejection Fraction (HFrEF) — Pathophysiology",
      text: "HFrEF develops when myocardial injury reduces left ventricular contractility, lowering ejection fraction below 40%. Reduced cardiac output triggers a cascade of neurohormonal responses: RAAS activation, sympathetic surge, and ADH release. Initially compensatory, these become maladaptive—driving volume overload, ventricular remodeling, and progressive pump failure...",
    },
    subjects: [
      { name: "Cardiology", details: "HF - Arrhythmias - Valvular - IHD" },
      { name: "Pulmonology", details: "Asthma - COPD - PE - ILD" },
      { name: "Neurology", details: "Stroke - Seizures - Dementia" },
      { name: "Hematology", details: "Anemias - Coagulopathies - Lymphomas" },
      { name: "Endocrinology", details: "Diabetes - Thyroid" },
    ],
  },
  {
    title: "Rapid Recall",
    subtitle: "Last-minute review, done right",
    items: [
      { label: "HFrEF", value: "EF &lt;40% - ACEi + BB + MRA + SGLT2i" },
      { label: "HFpEF", value: "EF ≥50% - Diuretics + SGLT2i" },
      { label: "BNP", value: "&gt;400 = HF likely - &lt;100 = unlikely" },
    ],
  },
  {
    title: "Fast Facts",
    subtitle: "Mnemonics that actually make sense",
    items: [
      { label: "HF DRUGS TO AVOID", value: "Very Cool Drugs Never Go Well\nVerapamil • Class IC • Dronedarone • NSAIDs • Glitazones" },
      { label: "NYHA CLASS I - IV", value: "No limit • Slight limit • Marked limit • Symptoms at rest" },
    ],
  },
];

const GalaxyAppSection: React.FC<GalaxyAppSectionProps> = () => {
  const [activeDevice, setActiveDevice] = useState("iphone");
  const [selectedCardIndices, setSelectedCardIndices] = useState([0, 1, 1]);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  
  // Refs for card containers
  const cardContainerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  // Ref for subjects container
  const subjectContainerRef = useRef<HTMLDivElement>(null);

  // Scroll card into view
  const scrollCardIntoView = (sectionIndex: number, newIndex: number) => {
    const container = cardContainerRefs[sectionIndex]?.current;
    if (container) {
      const card = container.children[newIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };
  
  // Scroll subject into view
  const scrollSubjectIntoView = (newIndex: number) => {
    const container = subjectContainerRef.current;
    if (container) {
      const subject = container.children[newIndex] as HTMLElement;
      if (subject) {
        subject.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  // For card sections
  const handleCardPrev = (sectionIndex: number) => {
    const totalCards = toolSections[sectionIndex].cards?.length || 0;
    if (totalCards === 0) return;
    setSelectedCardIndices(prev => {
      const newIndices = [...prev];
      newIndices[sectionIndex] = (newIndices[sectionIndex] - 1 + totalCards) % totalCards;
      // Scroll after state updates
      setTimeout(() => scrollCardIntoView(sectionIndex, newIndices[sectionIndex]), 0);
      return newIndices;
    });
  };

  const handleCardNext = (sectionIndex: number) => {
    const totalCards = toolSections[sectionIndex].cards?.length || 0;
    if (totalCards === 0) return;
    setSelectedCardIndices(prev => {
      const newIndices = [...prev];
      newIndices[sectionIndex] = (newIndices[sectionIndex] + 1) % totalCards;
      // Scroll after state updates
      setTimeout(() => scrollCardIntoView(sectionIndex, newIndices[sectionIndex]), 0);
      return newIndices;
    });
  };

  // For study notes subjects
  const handleSubjectPrev = () => {
    const totalSubjects = toolSections[3].subjects?.length || 0;
    if (totalSubjects === 0) return;
    setSelectedSubjectIndex(prev => {
      const newIndex = (prev - 1 + totalSubjects) % totalSubjects;
      setTimeout(() => scrollSubjectIntoView(newIndex), 0);
      return newIndex;
    });
  };

  const handleSubjectNext = () => {
    const totalSubjects = toolSections[3].subjects?.length || 0;
    if (totalSubjects === 0) return;
    setSelectedSubjectIndex(prev => {
      const newIndex = (prev + 1) % totalSubjects;
      setTimeout(() => scrollSubjectIntoView(newIndex), 0);
      return newIndex;
    });
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-[960px] mx-auto">
        {/* Header: Here's what you get */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-black tracking-[0.15em] uppercase text-primary mb-2 ff-font-bold">
            THE MENDEL GALAXY APP
          </p>
          <h2 className="text-[32px] font-black text-gray-900 mb-3 ff-font-bold">
            Here's what you get
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto ff-font">
           Six high-yield study tools built for USMLE Step 1 — Mendel Qbanks, Chitras, Mendel Flashcards, Mendel Study Notes, Rapid Recall, and Fast Facts. Click any tool below to explore details & pricing.
          </p>
        </div>

        {/* Device Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: "iphone", label: "iPhone" },
            { key: "ipad", label: "iPad" },
            { key: "desktop", label: "Desktop / Laptop" },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDevice(d.key)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-200 border ff-font-bold ${
                activeDevice === d.key
                  ? "bg-[#1A1A1A] text-primary border-[#1A1A1A]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Device Frames Row */}
        <div className="flex justify-center gap-5 mb-16 overflow-x-auto pb-2">
          {appTools.map((tool, index) => (
            <div key={index} className="flex flex-col items-center gap-3 flex-shrink-0">

              {/* === iPhone === */}
              {activeDevice === "iphone" && (
                <div className="relative w-[88px] h-[188px]">
                  {/* Outer frame */}
                  <div className="absolute inset-0 bg-[#1c1c1e] rounded-[22px] shadow-xl" />
                  {/* Side buttons */}
                  <div className="absolute left-[-3px] top-10 w-[3px] h-6 bg-[#3a3a3c] rounded-l" />
                  <div className="absolute left-[-3px] top-[68px] w-[3px] h-5 bg-[#3a3a3c] rounded-l" />
                  <div className="absolute right-[-3px] top-12 w-[3px] h-8 bg-[#3a3a3c] rounded-r" />
                  {/* Screen */}
                  <div className="absolute inset-[4px] bg-[#0a0a0a] rounded-[19px] overflow-hidden flex flex-col">
                    {/* Notch */}
                    <div className="flex justify-center pt-1 pb-0.5">
                      <div className="w-10 h-[5px] bg-[#1c1c1e] rounded-full" />
                    </div>
                    {/* Status bar */}
                    <div className="flex justify-between px-2 pb-1">
                      <span className="text-[5px] text-gray-400 font-bold">9:41</span>
                      <div className="flex gap-0.5 items-center">
                        <div className="w-2 h-1 bg-gray-400 rounded-sm" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      </div>
                    </div>
                    {/* App content */}
                    <div className="flex-1 flex flex-col px-2 pb-2">
                      {/* Header accent */}
                      <div className="h-1 w-full rounded-full mb-2" style={{ backgroundColor: tool.color }} />
                      <div className="w-5 h-5 rounded-md flex items-center justify-center mb-1" style={{ backgroundColor: tool.bg }}>
                        <div style={{ transform: "scale(0.6)" }}>{tool.svg}</div>
                      </div>
                      <p className="text-[6px] font-black text-white leading-tight mb-1">{tool.name}</p>
                      {/* Mini content lines */}
                      <div className="space-y-1">
                        <div className="h-[3px] bg-gray-700 rounded-full w-full" />
                        <div className="h-[3px] bg-gray-700 rounded-full w-3/4" />
                        <div className="h-[3px] bg-gray-700 rounded-full w-5/6" />
                      </div>
                      {/* Mini price badge */}
                      <div className="mt-auto">
                        <div className="px-1.5 py-0.5 rounded-full text-[5px] font-bold text-black inline-block" style={{ backgroundColor: tool.color }}>
                          {tool.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Home bar */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-gray-600 rounded-full" />
                </div>
              )}

              {/* === iPad === */}
              {activeDevice === "ipad" && (
                <div className="relative w-[130px] h-[170px]">
                  {/* Outer frame */}
                  <div className="absolute inset-0 bg-[#1c1c1e] rounded-[16px] shadow-xl" />
                  {/* Camera dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#3a3a3c] rounded-full" />
                  {/* Screen */}
                  <div className="absolute inset-[5px] bg-[#0a0a0a] rounded-[12px] overflow-hidden flex flex-col">
                    {/* Top bar */}
                    <div className="flex justify-between items-center px-2 py-1.5 border-b border-gray-800">
                      <p className="text-[6px] font-black text-white">{tool.name}</p>
                      <div className="w-4 h-[3px] bg-gray-600 rounded-full" />
                    </div>
                    {/* Sidebar + main */}
                    <div className="flex flex-1 overflow-hidden">
                      {/* Sidebar */}
                      <div className="w-[30px] border-r border-gray-800 flex flex-col gap-1 p-1 pt-1.5">
                        {[0,1,2,3].map((i) => (
                          <div key={i} className="h-3 rounded flex items-center justify-center" style={{ backgroundColor: i === 0 ? tool.bg : "transparent" }}>
                            <div className="w-2 h-[2px] rounded" style={{ backgroundColor: i === 0 ? tool.color : "#4b5563" }} />
                          </div>
                        ))}
                      </div>
                      {/* Main content */}
                      <div className="flex-1 p-1.5 space-y-1">
                        <div className="h-1 w-full rounded" style={{ backgroundColor: tool.color, opacity: 0.3 }} />
                        <div className="h-[3px] bg-gray-700 rounded w-full" />
                        <div className="h-[3px] bg-gray-700 rounded w-4/5" />
                        <div className="h-[3px] bg-gray-700 rounded w-3/4" />
                        <div className="h-[3px] bg-gray-700 rounded w-full" />
                        <div className="h-[3px] bg-gray-700 rounded w-2/3" />
                      </div>
                    </div>
                    {/* Bottom bar */}
                    <div className="px-2 py-1 flex justify-end">
                      <div className="px-2 py-0.5 rounded text-[5px] font-bold text-black" style={{ backgroundColor: tool.color }}>Explore</div>
                    </div>
                  </div>
                </div>
              )}

              {/* === Desktop / Laptop === */}
              {activeDevice === "desktop" && (
                <div className="flex flex-col items-center">
                  {/* Monitor */}
                  <div className="relative w-[152px] h-[100px]">
                    <div className="absolute inset-0 bg-[#1c1c1e] rounded-[8px] shadow-xl" />
                    {/* Screen bezel */}
                    <div className="absolute inset-[4px] bg-[#0a0a0a] rounded-[5px] overflow-hidden flex flex-col">
                      {/* Browser bar */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-[#1c1c1e] border-b border-gray-800">
                        <div className="flex gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 h-2 rounded bg-gray-800 mx-1" />
                      </div>
                      {/* Page content */}
                      <div className="flex flex-1 overflow-hidden">
                        {/* Left sidebar */}
                        <div className="w-[28px] border-r border-gray-800 p-1 flex flex-col gap-1">
                          <div className="h-2 rounded" style={{ backgroundColor: tool.bg }}>
                            <div className="h-full w-full rounded flex items-center justify-center">
                              <div style={{ transform: "scale(0.3)" }}>{tool.svg}</div>
                            </div>
                          </div>
                          {[0,1,2].map(i => <div key={i} className="h-1.5 bg-gray-800 rounded" />)}
                        </div>
                        {/* Main area */}
                        <div className="flex-1 p-1.5">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="w-3 h-1.5 rounded" style={{ backgroundColor: tool.color }} />
                            <p className="text-[5px] font-bold text-white truncate">{tool.name}</p>
                          </div>
                          <div className="space-y-0.5">
                            <div className="h-[2.5px] bg-gray-700 rounded w-full" />
                            <div className="h-[2.5px] bg-gray-700 rounded w-4/5" />
                            <div className="h-[2.5px] bg-gray-700 rounded w-3/4" />
                            <div className="h-[2.5px] bg-gray-700 rounded w-full" />
                          </div>
                          <div className="mt-1.5">
                            <div className="px-1.5 py-[2px] rounded text-[4px] font-bold text-black inline-block" style={{ backgroundColor: "#FFCA00" }}>Explore →</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Stand */}
                  <div className="w-8 h-2 bg-[#2c2c2e] rounded-b" />
                  <div className="w-16 h-1 bg-[#1c1c1e] rounded" />
                </div>
              )}

              {/* Label + Button below */}
              <p className="text-[11px] font-bold text-gray-900 text-center mb-2 ff-font-bold">{tool.name}</p>
              <button
                className="px-4 py-1.5 rounded-full text-[10px] font-black text-black flex items-center gap-1 ff-font-bold"
                style={{ backgroundColor: tool.color }}
              >
                Details & pricing
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* All Tool Sections (One After Another) */}
        {toolSections.slice(0, 4).map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ff-font-bold">
              {section.title.toUpperCase()}
            </p>
            <h3 className="text-xl font-black text-gray-900 mb-1 ff-font-bold">
              {section.subtitle}
            </h3>

            {/* Qbanks / Chitras View */}
            {sectionIndex <= 1 && (
              <div className="mt-6">
                <div className="relative flex items-center">
                  {/* Previous Button - Outside */}
                  <button
                    onClick={() => handleCardPrev(sectionIndex)}
                    className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  {/* Cards Container */}
                  <div ref={cardContainerRefs[sectionIndex]} className="flex gap-4 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {section.cards?.map((card, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-64 p-4 rounded-xl border ${selectedCardIndices[sectionIndex] === index ? "border-primary shadow-lg" : "border-gray-200"} ${sectionIndex === 0 ? "bg-gray-900" : "bg-[#fefce8]"} transition-all`}
                      >
                        <span className={`text-[10px] font-bold ${sectionIndex === 0 ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider block mb-2`}>
                          {card.badge}
                        </span>
                        <p className={`text-[13px] font-semibold ${sectionIndex === 0 ? "text-white" : "text-black"} leading-relaxed`}>
                          {card.title}
                        </p>
                        {sectionIndex === 0 && (
                          <div className="mt-3 space-y-1.5">
                            <div className="px-2 py-1.5 rounded border border-gray-700 text-gray-400 text-[11px]">
                              Decreased systemic vascular resistance
                            </div>
                            <div className="px-2 py-1.5 rounded border border-primary text-primary text-[11px]">
                              ✓ Increased ventricular end-diastolic pressure
                            </div>
                            <div className="px-2 py-1.5 rounded border border-gray-700 text-gray-400 text-[11px]">
                              Reduced cardiac output from arrhythmia
                            </div>
                            <div className="px-2 py-1.5 rounded border border-gray-700 text-gray-400 text-[11px]">
                              Pericardial tamponade physiology
                            </div>
                          </div>
                        )}
                        {sectionIndex === 1 && (
                          <div className="mt-3 h-28 border border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-[11px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-cover opacity-80">
                            [Chitra Visual Map]
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Next Button - Outside */}
                  <button
                    onClick={() => handleCardNext(sectionIndex)}
                    className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <div className="max-w-md mt-4">
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gray-400 rounded-full transition-all duration-300"
                      style={{ width: `${((selectedCardIndices[sectionIndex] + 1) / (section.cards?.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {section.bottomText && (
                  <p className="text-left text-[11px] text-gray-500 mt-4">
                    {section.bottomText}
                  </p>
                )}
              </div>
            )}

            {/* Flashcards View */}
            {sectionIndex === 2 && (
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                {/* Question Card */}
                <div className="w-full md:w-64 bg-[#1e293b] rounded-xl p-4 border border-gray-700 flex flex-col items-start justify-center min-h-[150px] relative">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider">QUESTION</span>
                  </div>
                  <h4 className="text-white font-serif italic text-base max-w-full leading-snug mt-6">What phase of the cell cycle involves DNA replication?</h4>
                  <p className="absolute bottom-3 text-[9px] text-gray-500">Tap to reveal answer</p>
                </div>
                {/* Answer Card */}
                <div className="w-full md:w-64 bg-[#1e293b] rounded-xl p-4 border border-gray-700 flex flex-col items-start justify-center min-h-[150px] relative shadow-[0_0_15px_rgba(30,41,59,0.5)]">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider">ANSWER</span>
                  </div>
                  <h4 className="text-white font-serif italic text-xl mb-1 mt-6">S phase (Synthesis)</h4>
                  <p className="text-[9px] text-gray-400 mb-4">cell cycle</p>
                  <div className="flex gap-2 mt-auto mb-1">
                    <div className="flex flex-col items-center">
                      <button className="px-3 py-1 rounded-lg bg-[#0f172a] text-red-400 text-[10px] font-bold mb-1 shadow-inner border border-gray-700">Hard</button>
                      <span className="text-[8px] text-gray-500">1 day</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="px-3 py-1 rounded-lg bg-[#0f172a] text-orange-400 text-[10px] font-bold mb-1 shadow-inner border border-gray-700">Medium</button>
                      <span className="text-[8px] text-gray-500">3 days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="px-3 py-1 rounded-lg bg-[#0f172a] text-green-400 text-[10px] font-bold mb-1 shadow-inner border border-gray-700">Easy</button>
                      <span className="text-[8px] text-gray-500">7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Study Notes View */}
            {sectionIndex === 3 && (
              <div className="mt-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-[10px] font-bold">
                      CARDIOLOGY
                    </span>
                    <span className="text-[10px] text-gray-400">
                      • Mendel Study Notes • 2 page read
                    </span>
                  </div>
                  <h4 className="text-base font-black text-gray-900 mb-2">
                    {section.selectedNote?.title}
                  </h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                    {section.selectedNote?.text}
                  </p>
                  <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                      FIGURE 1 - NEUROHORMONAL CASCADE
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-900 text-[10px] font-bold border border-yellow-300">
                        Myocardial injury
                      </span>
                      <span className="text-gray-400 text-sm">→</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 text-[10px] font-bold border border-red-300">
                        ↓ Cardiac output
                      </span>
                      <span className="text-gray-400 text-sm">→</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold border border-blue-300">
                        RAAS + SNS activation
                      </span>
                      <span className="text-gray-400 text-sm">→</span>
                      <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-900 text-[10px] font-bold border border-pink-300">
                        Remodeling & fibrosis
                      </span>
                      <span className="text-gray-400 text-sm">→</span>
                      <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold">
                        Pump failure
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">
                    ...continues with clinical features, diagnostic workup, ECG findings, echo criteria, and full GDMT treatment algorithm with illustrations.
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                    COVERING EVERY CORE SUBJECT
                  </p>
                  <div className="relative flex items-center">
                    {/* Previous Button - Outside */}
                    <button
                      onClick={handleSubjectPrev}
                      className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div ref={subjectContainerRef} className="flex gap-3 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {section.subjects?.map((subject, index) => (
                        <div
                          key={index}
                          className={`flex-shrink-0 w-48 p-3 rounded-xl border ${selectedSubjectIndex === index ? "border-primary" : "border-gray-200"} bg-white transition-all`}
                        >
                          <p className="text-[12px] font-bold text-gray-800">
                            {subject.name}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            {subject.details}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Next Button - Outside */}
                    <button
                      onClick={handleSubjectNext}
                      className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-start mt-6">
              <button
                className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow ff-font-bold"
                style={{ backgroundColor: "#FFCA00" }}
              >
                <div className="text-[13px] font-bold text-black leading-tight">{section.title}</div>
                <div className="text-[10px] text-black">details & pricing →</div>
              </button>
            </div>

            {/* Divider between sections */}
            {sectionIndex < toolSections.length - 1 && (
              <hr className="border-gray-200 mt-16" />
            )}
          </div>
        ))}

        {/* Rapid Recall + Fast Facts in Flex */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolSections.slice(4, 6).map((section, idx) => {
            const sectionIndex = 4 + idx;
            return (
              <div key={sectionIndex} className="flex flex-col">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ff-font-bold">
                  {section.title.toUpperCase()}
                </p>
                <h3 className="text-xl font-black text-gray-900 mb-1 ff-font-bold">
                  {section.subtitle}
                </h3>

                {/* Rapid Recall View */}
                {sectionIndex === 4 && (
                  <div className="mt-6 flex-1">
                    <div className="bg-gray-900 p-5 rounded-xl h-full">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                        CARDIOLOGY - RAPID RECALL
                      </p>
                      <div className="space-y-2.5">
                        {section.items?.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-[13px]">
                            <span className="font-bold text-white">{item.label}</span>
                            <span className="text-gray-400">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Fast Facts View */}
                {sectionIndex === 5 && (
                  <div className="mt-6 flex-1 space-y-2.5">
                    {section.items?.map((item, index) => (
                      <div key={index} className="p-3.5 rounded-lg border-l-4 border-primary bg-white border border-gray-200">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-[13px] text-gray-800 whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-start mt-6">
                  <button
                    className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow ff-font-bold"
                    style={{ backgroundColor: "#FFCA00" }}
                  >
                    <div className="text-[13px] font-bold text-black leading-tight">{section.title}</div>
                    <div className="text-[10px] text-black">details & pricing →</div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalaxyAppSection;
