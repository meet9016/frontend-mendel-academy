"use client";

import React, { useState, useRef } from "react";

interface GalaxyAppSectionProps {}

const appTools = [
  { name: "Mendel Qbanks", color: "#FFCA00", price: "$99", icon: "📝" },
  { name: "Mendel Chitras", color: "#10B981", price: "$79", icon: "🎨" },
  { name: "Mendel Flashcards", color: "#8B5CF6", price: "$49", icon: "🃏" },
  { name: "Mendel Study Notes", color: "#EC4899", price: "$59", icon: "📓" },
  { name: "Rapid Recall", color: "#3B82F6", price: "$39", icon: "⚡" },
  { name: "Fast Facts", color: "#F59E0B", price: "$29", icon: "📌" },
];

const toolSections = [
  {
    title: "Mendel Qbanks",
    subtitle: "5,500+ questions that think like the exam",
    cards: [
      { title: "A 67-year-old with hypertension presents with progressive dyspnea and orthopnea. Exam shows S3 gallop, bilateral crackles. BNP 680. Best mechanism?", badge: "Q1 - Cardiology - Medium" },
      { title: "First-line therapy for HFrEF with EF 35%?", badge: "Q2 - Cardiology - Easy" },
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
      <div className="max-w-6xl mx-auto">
        {/* Header: Here's what you get */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-black tracking-[0.15em] uppercase text-primary mb-2">
            THE MENDEL GALAXY APP
          </p>
          <h2 className="text-[32px] font-black text-gray-900 mb-3">
            Here's what you get
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Six high-yield study tools built for USMLE Step 1 — Mendel Qbanks, Chitras, Mendel Flashcards,
            Mendel Study Notes, Rapid Recall, and Fast Facts. Click any tool below to explore details & pricing.
          </p>
        </div>

        {/* Device Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {["iphone", "ipad", "desktop"].map((device) => (
            <button
              key={device}
              onClick={() => setActiveDevice(device)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-200 border flex items-center gap-1.5 ${
                activeDevice === device
                  ? "bg-[#1A1A1A] text-primary border-[#1A1A1A]"
                  : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
              }`}
            >
              {device === "iphone" && <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
              {device === "ipad" && <svg width="14" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>}
              {device === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>}
              {device === "iphone" ? "iPhone" : device === "ipad" ? "iPad" : "Desktop/Laptop"}
            </button>
          ))}
        </div>

        {/* 6 Device Frames Row */}
        <div className="flex justify-center gap-6 mb-12 overflow-x-auto">
          {appTools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              {/* Device Frame based on activeDevice - Reduced size! */}
              {activeDevice === "iphone" && (
                <div className="relative">
                  <div className="w-28 h-[300px] bg-gray-900 border-6 border-gray-700 rounded-[2.5rem] p-1 shadow-xl">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full"></div>
                    <div className="w-full h-full bg-gray-800 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center gap-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                        style={{ backgroundColor: tool.color }}
                      >
                        ▶
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: tool.color }}>
                        {tool.name}
                      </span>
                      <button
                        className="mt-2 px-3 py-1 rounded-full text-[8px] font-bold text-black border-2"
                        style={{ backgroundColor: tool.color, borderColor: tool.color }}
                      >
                        TAP TO EXPLORE
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              )}
              {activeDevice === "ipad" && (
                <div className="relative">
                  <div className="w-36 h-[260px] bg-gray-900 border-6 border-gray-700 rounded-[1.5rem] p-1 shadow-xl">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gray-700 rounded-full"></div>
                    <div className="w-full h-full bg-gray-800 rounded-[1.2rem] overflow-hidden flex flex-col items-center justify-center gap-2">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl"
                        style={{ backgroundColor: tool.color }}
                      >
                        ▶
                      </div>
                      <span className="text-[11px] font-bold" style={{ color: tool.color }}>
                        {tool.name}
                      </span>
                      <button
                        className="mt-2 px-3 py-1 rounded-full text-[8px] font-bold text-black border-2"
                        style={{ backgroundColor: tool.color, borderColor: tool.color }}
                      >
                        TAP TO EXPLORE
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeDevice === "desktop" && (
                <div className="relative">
                  <div className="w-40 h-[160px] bg-gray-900 border-6 border-gray-700 rounded-lg p-1 shadow-xl">
                    <div className="w-full h-full bg-gray-800 rounded-md overflow-hidden flex flex-col items-center justify-center gap-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                        style={{ backgroundColor: tool.color }}
                      >
                        ▶
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: tool.color }}>
                        {tool.name}
                      </span>
                      <button
                        className="mt-2 px-3 py-1 rounded-full text-[8px] font-bold text-black border-2"
                        style={{ backgroundColor: tool.color, borderColor: tool.color }}
                      >
                        TAP TO EXPLORE
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <span className="text-[11px] font-bold text-gray-900">{tool.name}</span>
              <button
                className="px-4 py-1.5 rounded-xl text-[9px] font-bold text-black shadow-md"
                style={{ backgroundColor: tool.color }}
              >
                Details & pricing →
              </button>
            </div>
          ))}
        </div>

        {/* All Tool Sections (One After Another) */}
        {toolSections.slice(0, 4).map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {section.title.toUpperCase()}
            </p>
            <h3 className="text-xl font-black text-gray-900 mb-1">
              {section.subtitle}
            </h3>

            {/* Qbanks / Chitras View */}
            {sectionIndex <= 1 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => handleCardPrev(sectionIndex)}
                    className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <div ref={cardContainerRefs[sectionIndex]} className="flex gap-4 flex-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  <button
                    onClick={() => handleCardNext(sectionIndex)}
                    className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gray-400 rounded-full transition-all duration-300"
                      style={{ width: `${((selectedCardIndices[sectionIndex] + 1) / (section.cards?.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {section.bottomText && (
                  <p className="text-center text-[11px] text-gray-500 mt-4">
                    {section.bottomText}
                  </p>
                )}
              </div>
            )}

            {/* Flashcards View */}
            {sectionIndex === 2 && (
              <div className="mt-6 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                {/* Question Card */}
                <div className="flex-1 bg-[#1e293b] rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center min-h-[200px] relative">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">QUESTION</span>
                  </div>
                  <h4 className="text-white font-serif italic text-lg text-center max-w-[80%] leading-snug">What phase of the cell cycle involves DNA replication?</h4>
                  <p className="absolute bottom-4 text-[10px] text-gray-500">Tap to reveal answer</p>
                </div>
                {/* Answer Card */}
                <div className="flex-1 bg-[#1e293b] rounded-xl p-6 border border-gray-700 flex flex-col items-center justify-center min-h-[200px] relative shadow-[0_0_15px_rgba(30,41,59,0.5)]">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">ANSWER</span>
                  </div>
                  <h4 className="text-white font-serif italic text-2xl mb-1">S phase (Synthesis)</h4>
                  <p className="text-[10px] text-gray-400 mb-6">cell cycle</p>
                  <div className="flex gap-3 mt-auto mb-2">
                    <div className="flex flex-col items-center">
                      <button className="px-4 py-1.5 rounded-lg bg-[#0f172a] text-red-400 text-[11px] font-bold mb-1 shadow-inner border border-gray-700">Hard</button>
                      <span className="text-[9px] text-gray-500">1 day</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="px-4 py-1.5 rounded-lg bg-[#0f172a] text-orange-400 text-[11px] font-bold mb-1 shadow-inner border border-gray-700">Medium</button>
                      <span className="text-[9px] text-gray-500">3 days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="px-4 py-1.5 rounded-lg bg-[#0f172a] text-green-400 text-[11px] font-bold mb-1 shadow-inner border border-gray-700">Easy</button>
                      <span className="text-[9px] text-gray-500">7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Study Notes View */}
            {sectionIndex === 3 && (
              <div className="mt-6">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
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
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSubjectPrev}
                      className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div ref={subjectContainerRef} className="flex gap-3 flex-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                    <button
                      onClick={handleSubjectNext}
                      className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-start mt-6">
              <button
                className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: appTools[sectionIndex].color }}
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
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title.toUpperCase()}
                </p>
                <h3 className="text-xl font-black text-gray-900 mb-1">
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
                    className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: appTools[sectionIndex].color }}
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
