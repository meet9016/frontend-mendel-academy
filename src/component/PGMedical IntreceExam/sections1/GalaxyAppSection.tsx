"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

interface GalaxyAppSectionProps {
  examData?: any;
  loading?: boolean;
}

const toolMetaMap: Record<string, { color: string; bg: string; svg: React.ReactNode }> = {
  "qbank": {
    color: "#FFCA00",
    bg: "#fffbeb",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCA00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
  },
  "chitra": {
    color: "#10B981",
    bg: "#ecfdf5",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
  },
  "flashcard": {
    color: "#8B5CF6",
    bg: "#f5f3ff",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 2l-4 3-4-3" /></svg>
  },
  "note": {
    color: "#EC4899",
    bg: "#fdf2f8",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
  },
  "recall": {
    color: "#3B82F6",
    bg: "#fdf2f8",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  },
  "fact": {
    color: "#F59E0B",
    bg: "#fdf2f8",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
  }
};

const getToolMeta = (name: string, index: number) => {
  const matched = Object.entries(toolMetaMap).find(([key]) => name.toLowerCase().includes(key));
  if (matched) return matched[1];
  const colors = ["#FFCA00", "#10B981", "#8B5CF6", "#EC4899", "#3B82F6", "#F59E0B"];
  const bgs = ["#fffbeb", "#ecfdf5", "#f5f3ff", "#fdf2f8", "#fdf2f8", "#fdf2f8"];
  return {
    color: colors[index % colors.length],
    bg: bgs[index % bgs.length],
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors[index % colors.length]} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
  };
};

const GalaxyAppSection: React.FC<GalaxyAppSectionProps> = ({ examData, loading }) => {
  const galaxySection = examData?.galaxy_app_section;
  const dynamicTools = galaxySection?.tools || [];

  const sectionHeader = useMemo(() => ({
    label: galaxySection?.section_label || "",
    title: galaxySection?.section_title || "",
    description: galaxySection?.section_description || "",
  }), [galaxySection]);

  const appTools = useMemo(() => {
    const dynamicAppTools = dynamicTools.map((tool: any, i: number) => {
      const meta = getToolMeta(tool.tool_name || "", i);
      return {
        name: tool.tool_name || "",
        price: tool.individual_price || tool.galaxy_price || "",
        color: meta.color,
        bg: meta.bg,
        svg: meta.svg,
      };
    });

    // Static app tools for last 3 sections
    const staticAppTools = [
      {
        name: "Mendel Study Notes",
        color: "#EC4899",
        bg: "#fdf2f8",
        price: "$25/mo",
        svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
      },
      {
        name: "Rapid Recall",
        color: "#3B82F6",
        bg: "#fdf2f8",
        price: "$16.99/mo",
        svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
      },
      {
        name: "Fast Facts",
        color: "#F59E0B",
        bg: "#fdf2f8",
        price: "$16.99/mo",
        svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      },
    ];

    return [
      ...dynamicAppTools.slice(0, 3),
      ...staticAppTools
    ];
  }, [dynamicTools]);

  const toolSections = useMemo(() => {
    // First, get dynamic data for first 3 sections
    const dynamicSections = dynamicTools.map((dt: any, i: number) => {
      const sampleQuestions = (dt.sample_questions || []).map((q: any) => ({
        title: q.question || "",
        badge: q.badge || "",
        image: "",
        card_type: "question",
        options: (q.options || []).map((o: any) => ({
          text: o.text || "",
          is_correct: !!o.is_correct || !!o.isCorrect,
        })),
      }));

      let cards = [];
      if (i === 2) {
        // Flashcard: use dedicated flashcard_qa field (question+answer pairs)
        const flashcardQA = dt.flashcard_qa || [];
        if (flashcardQA.length > 0) {
          // Use the first Q&A pair as the preview card pair
          cards = [
            {
              title: flashcardQA[0].question || "",
              badge: "",
              card_type: "question",
              options: [],
            },
            {
              title: flashcardQA[0].answer || "",
              badge: "",
              card_type: "answer",
              options: [],
            },
          ];
        } else if (sampleQuestions.length > 0) {
          // fallback: derive from sample_questions first item
          cards = [
            {
              title: sampleQuestions[0].title,
              badge: sampleQuestions[0].badge,
              card_type: "question",
              options: sampleQuestions[0].options,
            },
            {
              title: sampleQuestions[0].options?.find((o: any) => o.is_correct)?.text || sampleQuestions[0].options?.[0]?.text || "",
              badge: sampleQuestions[0].badge,
              card_type: "answer",
              options: [],
            },
          ];
        }
      } else if (i === 1) {
        // For Mendel Chitras, cards come from dt.cards (with image, Category/badge, Title)
        cards = (dt.cards || []).map((c: any) => ({
          title: c.title || "",
          badge: c.badge || "",
          image: c.image || "",
          card_type: c.card_type || "question",
          options: [],
        }));
      } else {
        cards = sampleQuestions;
      }

      // Fallback to old sample_question fields if sample_questions array is empty
      if (cards.length === 0) {
        if (dt.sample_question_text) {
          const fallbackCard = {
            title: dt.sample_question_text || "",
            badge: dt.sample_question_badge || "",
            image: "",
            card_type: "question",
            options: (dt.sample_question_options || []).map((o: any) => ({
              text: o.text || "",
              is_correct: !!o.is_correct || !!o.isCorrect,
            })),
          };
          if (i === 2) {
            cards = [
              fallbackCard,
              {
                title: fallbackCard.options?.find((o: any) => o.is_correct)?.text || fallbackCard.options?.[0]?.text || "",
                badge: fallbackCard.badge,
                card_type: "answer",
                options: [],
              }
            ];
          } else {
            cards = [fallbackCard];
          }
        }
      }

      return {
        title: dt.tool_name || "",
        subtitle: dt.section_subtitle || "",
        bottomText: dt.bottom_text || "",
        cards: cards,
        selectedNote: {
          title: dt.sample_question_badge || "",
          text: dt.sample_question_text || "",
        },
        subjects: cards.map((c: any) => ({
          name: c.title || "",
          details: c.badge || "",
        })),
        items: cards.map((c: any) => ({
          label: c.title || "",
          value: c.badge || "",
        })),
      };
    });

    // Override last 3 sections with static data
    const staticSections = [
      // Mendel Study Notes (index 3)
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
      // Rapid Recall (index 4)
      {
        title: "Rapid Recall",
        subtitle: "Last-minute review, done right",
        items: [
          { label: "HFrEF", value: "EF <40% - ACEi + BB + MRA + SGLT2i" },
          { label: "HFpEF", value: "EF ≥50% - Diuretics + SGLT2i" },
          { label: "BNP", value: ">400 = HF likely, <100 = unlikely" },
        ],
      },
      // Fast Facts (index 5)
      {
        title: "Fast Facts",
        subtitle: "Mnemonics that actually make sense",
        items: [
          { label: "HF DRUGS TO AVOID", value: "Very Cool Drugs Never Go Well\nVerapamil • Class IC • Dronedarone • NSAIDs • Glitazones" },
          { label: "NYHA CLASS I - IV", value: "No limit • Slight limit • Marked limit • Symptoms at rest" },
        ],
      },
    ];

    // Combine: take first 3 dynamic sections, then add static sections
    return [
      ...dynamicSections.slice(0, 3),
      ...staticSections
    ];
  }, [dynamicTools]);

  const getToolDetail = (index: number) => {
    // Static tool details for last 3 tools
    const staticToolDetails = [
      // Mendel Study Notes (index 3)
      {
        name: "Mendel Study Notes",
        tagline: "STUDY TOOL",
        description: "1-2 page write-ups for every core topic, woven with flowcharts, illustrations, and clinical visuals. Built to be your textbook replacement, not a summary.",
        included: [
          "Deep-dive notes for every core topic",
          "Flowcharts and clinical visuals embedded",
          "Organized by subject and system",
          "Updated for USMLE Step 1 blueprint",
          "Printable PDF format available",
        ],
        sampleQuestion: {
          badge: "CARDIOLOGY - HFrEF",
          question: "HFrEF develops when myocardial injury reduces left ventricular contractility, lowering ejection fraction below 40%. RAAS activation, sympathetic surge, and ADH release become maladaptive — driving volume overload, ventricular remodeling, and progressive pump failure.",
          options: [],
        },
        individualPrice: "$25.00",
        individualPer: "per subject / month",
        galaxyPrice: "From $309",
        galaxyPer: "Everything included • 1 month +",
      },
      // Rapid Recall (index 4)
      {
        name: "Rapid Recall",
        tagline: "STUDY TOOL",
        description: "Condensed last-minute review sheets per subject. One-page summaries distilled from high-yield sources — perfect for exam-week cramming.",
        included: [
          "One-page review sheets per subject",
          "High-yield mnemonics included",
          "Updated for latest exam blueprint",
          "Printable format available",
          "Integrated with Galaxy App",
        ],
        sampleQuestion: {
          badge: "CARDIOLOGY - RAPID RECALL",
          question: "HFrEF: EF <40% — ACEi + BB + MRA + SGLT2i\nHFpEF: EF ≥50% — Diuretics + SGLT2i\nBNP: >400 = HF likely, <100 = unlikely",
          options: [],
        },
        individualPrice: "$16.99",
        individualPer: "per subject / month",
        galaxyPrice: "From $309",
        galaxyPer: "Everything included • 1 month +",
      },
      // Fast Facts (index 5)
      {
        name: "Fast Facts",
        tagline: "STUDY TOOL",
        description: "High-yield mnemonics and key facts for rapid review. Bite-sized, memorable, and clinically relevant — designed so facts stick the first time.",
        included: [
          "Mnemonics for every core topic",
          "Key facts organized by subject",
          "Clinically relevant examples",
          "Regularly updated content",
          "Integrated with Galaxy App",
        ],
        sampleQuestion: {
          badge: "CARDIOLOGY - FAST FACTS",
          question: "HF DRUGS TO AVOID:\nVery Cool Drugs Never Go Well\nVerapamil • Class IC • Dronedarone • NSAIDs • Glitazones",
          options: [],
        },
        individualPrice: "$16.99",
        individualPer: "per subject / month",
        galaxyPrice: "From $309",
        galaxyPer: "Everything included • 1 month +",
      },
    ];

    // If index is 3,4,5 use static data
    if (index >= 3) {
      return staticToolDetails[index - 3];
    }

    // Otherwise use dynamic data for first 3 tools
    const t = dynamicTools[index] || {};
    const flashcardQA = (t.flashcard_qa || []).map((f: any) => ({
      question: f.question || "",
      answer: f.answer || "",
    }));
    return {
      name: t.tool_name || "",
      tagline: t.tagline || "",
      description: t.description || "",
      included: t.included_points || [],
      sampleQuestion: {
        badge: t.sample_question_badge || "",
        question: t.sample_question_text || "",
        options: (t.sample_question_options || []).map((o: any) => ({ text: o.text || "", correct: !!o.is_correct || !!o.isCorrect })),
      },
      sampleQuestions: t.sample_questions?.length 
        ? t.sample_questions.map((q: any) => ({
            badge: q.badge || "",
            question: q.question || "",
            options: (q.options || []).map((o: any) => ({ text: o.text || "", correct: !!o.is_correct || !!o.isCorrect }))
          }))
        : (t.sample_question_text 
            ? [{
                badge: t.sample_question_badge || "",
                question: t.sample_question_text || "",
                options: (t.sample_question_options || []).map((o: any) => ({ text: o.text || "", correct: !!o.is_correct || !!o.isCorrect }))
              }]
            : []),
      flashcardQA,
      individualPrice: t.individual_price || "",
      individualPer: t.individual_per || "",
      galaxyPrice: t.galaxy_price || "",
      galaxyPer: t.galaxy_per || "",
      sample_image: t.sample_image || "",
    };
  };

  const [activeDevice, setActiveDevice] = useState("iphone");
  const [selectedCardIndices, setSelectedCardIndices] = useState([0, 0, 0]);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [previewModal, setPreviewModal] = useState<{ open: boolean; toolIndex: number }>({ open: false, toolIndex: 0 });
  const [detailModal, setDetailModal] = useState<{ open: boolean; toolIndex: number }>({ open: false, toolIndex: 0 });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPreviewModal(prev => ({ ...prev, open: false }));
        setDetailModal(prev => ({ ...prev, open: false }));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (previewModal.open || detailModal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [previewModal.open, detailModal.open]);

  const cardContainerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const subjectContainerRef = useRef<HTMLDivElement>(null);

  const scrollCardIntoView = (sectionIndex: number, newIndex: number) => {
    const container = cardContainerRefs[sectionIndex]?.current;
    if (container) {
      const card = container.children[newIndex] as HTMLElement;
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const scrollSubjectIntoView = (newIndex: number) => {
    const container = subjectContainerRef.current;
    if (container) {
      const subject = container.children[newIndex] as HTMLElement;
      if (subject) subject.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleCardPrev = (sectionIndex: number) => {
    const totalCards = toolSections[sectionIndex].cards?.length || 0;
    if (totalCards === 0) return;
    setSelectedCardIndices(prev => {
      const newIndices = [...prev];
      newIndices[sectionIndex] = (newIndices[sectionIndex] - 1 + totalCards) % totalCards;
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
      setTimeout(() => scrollCardIntoView(sectionIndex, newIndices[sectionIndex]), 0);
      return newIndices;
    });
  };

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

  const flashcardQuestion = toolSections[2]?.cards?.find((c: any) => c.card_type === "question") || toolSections[2]?.cards?.[0];
  const flashcardAnswer = toolSections[2]?.cards?.find((c: any) => c.card_type === "answer") || toolSections[2]?.cards?.[1];

  if (loading || !galaxySection?.tools?.length) {
    return null;
  }

  return (
    <section className=" px-6 bg-white">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-12">
          {sectionHeader.label && (
          <p className="text-[10px] font-black tracking-[0.15em] uppercase text-primary mb-2 ff-font-bold">
            {sectionHeader.label}
          </p>
          )}
          {sectionHeader.title && (
          <h2 className="text-[32px] font-black text-gray-900 mb-3 ff-font-bold">
            {sectionHeader.title}
          </h2>
          )}
          {sectionHeader.description && (
          <p className="text-sm text-gray-600 max-w-2xl mx-auto ff-font">
            {sectionHeader.description}
          </p>
          )}
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: "iphone", label: "iPhone", icon: <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> },
            { key: "ipad", label: "iPad", icon: <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> },
            { key: "desktop", label: "Desktop/Laptop", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDevice(d.key)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-200 border ff-font-bold flex items-center gap-2 ${
                activeDevice === d.key
                  ? "bg-[#1A1A1A] text-primary border-[#1A1A1A]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              <span>{d.icon}</span>
              {d.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-5 mb-16 overflow-x-auto pb-2">
          {appTools.map((tool, index) => {
            const deviceVideo = (() => {
              const t = dynamicTools[index] || {};
              const link = t.video_link || t.iphone_video?.link || t.ipad_video?.link || t.desktop_video?.link || "";
              return {
                title: t.tool_name || "",
                link: link
              };
            })();
            const hasVideo = !!deviceVideo.link;

            return (
            <div key={index} className="flex flex-col items-center gap-3 flex-shrink-0">
              {activeDevice === "iphone" && (
                <div
                  className="relative w-[88px] h-[188px] cursor-pointer group"
                  onClick={() => setPreviewModal({ open: true, toolIndex: index })}
                  title={`Preview ${tool.name}`}
                >
                  <div className="absolute inset-0 bg-[#1c1c1e] rounded-[22px] shadow-xl" />
                  <div className="absolute left-[-3px] top-10 w-[3px] h-6 bg-[#3a3a3c] rounded-l" />
                  <div className="absolute left-[-3px] top-[68px] w-[3px] h-5 bg-[#3a3a3c] rounded-l" />
                  <div className="absolute right-[-3px] top-12 w-[3px] h-8 bg-[#3a3a3c] rounded-r" />
                  <div className="absolute inset-[4px] bg-[#0a0a0a] rounded-[19px] overflow-hidden flex flex-col">
                    <div className="flex justify-center pt-1 pb-0.5">
                      <div className="w-10 h-[5px] bg-[#1c1c1e] rounded-full" />
                    </div>
                    <div className="flex justify-between px-2 pb-1">
                      <span className="text-[5px] text-gray-400 font-bold">9:41</span>
                      <div className="flex gap-0.5 items-center">
                        <div className="w-2 h-1 bg-gray-400 rounded-sm" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      </div>
                    </div>
                    {/* Original app content */}
                    <div className="flex-1 flex flex-col px-2 pb-2">
                      <div className="h-1 w-full rounded-full mb-2" style={{ backgroundColor: tool.color }} />
                      <div className="w-5 h-5 rounded-md flex items-center justify-center mb-1" style={{ backgroundColor: tool.bg }}>
                        <div style={{ transform: "scale(0.6)" }}>{tool.svg}</div>
                      </div>
                      <p className="text-[6px] font-black text-white leading-tight mb-1">{tool.name}</p>
                      <div className="space-y-1">
                        <div className="h-[3px] bg-gray-700 rounded-full w-full" />
                        <div className="h-[3px] bg-gray-700 rounded-full w-3/4" />
                        <div className="h-[3px] bg-gray-700 rounded-full w-5/6" />
                      </div>
                      <div className="mt-auto">
                        {tool.price && (
                        <div className="px-1.5 py-0.5 rounded-full text-[5px] font-bold text-black inline-block" style={{ backgroundColor: tool.color }}>
                          {tool.price}
                        </div>
                        )}
                      </div>
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: tool.color }}
                        onClick={(e) => { e.stopPropagation(); if (hasVideo) window.open(deviceVideo.link, "_blank"); }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-gray-600 rounded-full" />
                </div>
              )}

              {activeDevice === "ipad" && (
                <div
                  className="relative w-[130px] h-[170px] cursor-pointer group"
                  onClick={() => setPreviewModal({ open: true, toolIndex: index })}
                >
                  <div className="absolute inset-0 bg-[#1c1c1e] rounded-[16px] shadow-xl" />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#3a3a3c] rounded-full" />
                  <div className="absolute inset-[5px] bg-[#0a0a0a] rounded-[12px] overflow-hidden flex flex-col items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2 cursor-pointer"
                      style={{ backgroundColor: tool.color }}
                      onClick={(e) => { e.stopPropagation(); if (hasVideo) window.open(deviceVideo.link, "_blank"); }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                    </div>
                    <p className="text-[6px] font-black mb-1" style={{ color: tool.color }}>{deviceVideo.title || tool.name}</p>
                    <p className="text-[4px] text-gray-400">{hasVideo ? "Tap to play" : "Demo coming soon"}</p>
                  </div>
                </div>
              )}

              {activeDevice === "desktop" && (
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setPreviewModal({ open: true, toolIndex: index })}
                >
                  <div className="relative w-[152px] h-[100px]">
                    <div className="absolute inset-0 bg-[#1c1c1e] rounded-[8px] shadow-xl" />
                    <div className="absolute inset-[4px] bg-[#0a0a0a] rounded-[5px] overflow-hidden flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 px-2 py-1 bg-[#1c1c1e] border-b border-gray-800 absolute top-0 left-0 right-0">
                        <div className="flex gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 h-2 rounded bg-gray-800 mx-1" />
                      </div>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: tool.color }}
                        onClick={(e) => { e.stopPropagation(); if (hasVideo) window.open(deviceVideo.link, "_blank"); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-2 bg-[#2c2c2e] rounded-b" />
                  <div className="w-16 h-1 bg-[#1c1c1e] rounded" />
                </div>
              )}

              <p className="text-[11px] font-bold text-gray-900 text-center mb-2 ff-font-bold">{tool.name}</p>
              <button
                className="px-4 py-1.5 rounded-full text-[10px] font-black text-black flex items-center gap-1 ff-font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: tool.color }}
                onClick={() => setPreviewModal({ open: true, toolIndex: index })}
              >
                Details & pricing
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          );})}
        </div>

        {toolSections.slice(0, 4).map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ff-font-bold">
              {section.title.toUpperCase()}
            </p>
            <h3 className="text-xl font-black text-gray-900 mb-1 ff-font-bold">
              {section.subtitle}
            </h3>

            {sectionIndex <= 1 && (
              <div className="mt-6">
                <div className="relative flex items-center">
                  <button
                    onClick={() => handleCardPrev(sectionIndex)}
                    className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <div ref={cardContainerRefs[sectionIndex]} className="flex gap-4 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {section.cards?.map((card: any, index: number) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-72 p-4 rounded-xl border transition-all cursor-pointer ${
                          sectionIndex === 0
                            ? `bg-gray-900 ${selectedCardIndices[sectionIndex] === index ? "border-primary shadow-xl scale-105" : "border-gray-700 shadow-sm"}`
                            : `${selectedCardIndices[sectionIndex] === index ? "border-primary shadow-xl scale-105" : "border-gray-200 shadow-sm"} bg-white p-0`
                        }`}
                        onClick={() => setDetailModal({ open: true, toolIndex: sectionIndex })}
                      >
                        {sectionIndex === 0 ? (
                          <>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">{card.badge}</span>
                            <p className="text-[13px] font-semibold text-white leading-relaxed">{card.title}</p>
                            {card.options?.length > 0 && (
                            <div className="mt-3 space-y-1.5">
                              {card.options.map((opt: any, oi: number) => (
                                <div
                                  key={oi}
                                  className={`px-2 py-1.5 rounded border text-[11px] ${
                                    opt.is_correct ? "border-primary text-primary" : "border-gray-700 text-gray-400"
                                  }`}
                                >
                                  {opt.is_correct ? "✓ " : ""}{opt.text}
                                </div>
                              ))}
                            </div>
                            )}
                          </>
                        ) : (
                          <div className="rounded-xl overflow-hidden bg-white">
                            {card.image && (
                              <div className="h-40 overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="p-4">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">{card.badge}</span>
                              <p className="text-[13px] font-semibold text-black leading-relaxed">{card.title}</p>
                              {card.options?.length > 0 && (
                              <div className="mt-3 space-y-1.5">
                                {card.options.map((opt: any, oi: number) => (
                                  <div
                                    key={oi}
                                    className={`px-2 py-1.5 rounded border text-[11px] ${
                                      opt.is_correct ? "border-primary text-primary" : "border-gray-200 text-gray-500"
                                    }`}
                                  >
                                    {opt.is_correct ? "✓ " : ""}{opt.text}
                                  </div>
                                ))}
                              </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleCardNext(sectionIndex)}
                    className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0 z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
                <div className="max-w-md mt-4">
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-400 rounded-full transition-all duration-300" style={{ width: `${((selectedCardIndices[sectionIndex] + 1) / (section.cards?.length || 1)) * 100}%` }}></div>
                  </div>
                </div>
                {section.bottomText && (
                  <p className="text-left text-[11px] text-gray-500 mt-4">{section.bottomText}</p>
                )}
              </div>
            )}

            {sectionIndex === 2 && (flashcardQuestion || flashcardAnswer) && (
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                {flashcardQuestion && (
                <div className="w-full md:w-64 bg-[#1e293b] rounded-xl p-4 border border-gray-700 flex flex-col items-start justify-center min-h-[150px] relative">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider">QUESTION</span>
                  </div>
                  <h4 className="text-white font-serif italic text-base max-w-full leading-snug mt-6">{flashcardQuestion.title}</h4>
                  {flashcardQuestion.badge && (
                    <p className="text-[9px] text-gray-500 mt-2">{flashcardQuestion.badge}</p>
                  )}
                </div>
                )}
                {flashcardAnswer && (
                <div className="w-full md:w-64 bg-[#1e293b] rounded-xl p-4 border border-gray-700 flex flex-col items-start justify-center min-h-[150px] relative shadow-[0_0_15px_rgba(30,41,59,0.5)]">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-[9px] font-bold text-gray-400 tracking-wider">ANSWER</span>
                  </div>
                  <h4 className="text-white font-serif italic text-xl mb-1 mt-6">{flashcardAnswer.title}</h4>
                  {flashcardAnswer.badge && (
                    <p className="text-[9px] text-gray-400 mb-4">{flashcardAnswer.badge}</p>
                  )}
                </div>
                )}
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
            {/* {sectionIndex === 3 && (section.selectedNote?.title || section.selectedNote?.text || section.subjects?.length > 0) && (
              <div className="mt-6">
                {(section.selectedNote?.title || section.selectedNote?.text) && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
                  {section.selectedNote?.title && (
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">{section.selectedNote.title}</p>
                  )}
                  {section.selectedNote?.text && (
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{section.selectedNote.text}</p>
                  )}
                </div>
                )}
                {section.subjects?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">COVERING EVERY CORE SUBJECT</p>
                  <div className="relative flex items-center">
                    <button onClick={handleSubjectPrev} className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 z-10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div ref={subjectContainerRef} className="flex gap-3 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                      {section.subjects?.map((subject: any, index: number) => (
                        <div key={index} className={`flex-shrink-0 w-48 p-3 rounded-xl border ${selectedSubjectIndex === index ? "border-primary" : "border-gray-200"} bg-white transition-all`}>
                          <p className="text-[12px] font-bold text-gray-800">{subject.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{subject.details}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleSubjectNext} className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 z-10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
                )}
              </div>
            )} */}

            <div className="flex justify-start mt-6">
              <button
                className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow ff-font-bold"
                style={{ backgroundColor: "#FFCA00" }}
                onClick={() => setDetailModal({ open: true, toolIndex: sectionIndex })}
              >
                <div className="text-[13px] font-bold text-black leading-tight">{section.title}</div>
                <div className="text-[10px] text-black">details & pricing →</div>
              </button>
            </div>

            {sectionIndex < toolSections.length - 1 && <hr className="border-gray-200 mt-16" />}
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
        {/* <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolSections.slice(4, 6).map((section, idx) => {
            const sectionIndex = 4 + idx;
            return (
              <div key={sectionIndex} className="flex flex-col">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ff-font-bold">{section.title.toUpperCase()}</p>
                <h3 className="text-xl font-black text-gray-900 mb-1 ff-font-bold">{section.subtitle}</h3>
                {sectionIndex === 4 && section.items?.length > 0 && (
                  <div className="mt-6 flex-1">
                    <div className="bg-gray-900 p-5 rounded-xl h-full">
                      {section.subtitle && (
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">{section.subtitle}</p>
                      )}
                      <div className="space-y-2.5">
                        {section.items?.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-[13px]">
                            <span className="font-bold text-white">{item.label}</span>
                            <span className="text-gray-400">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {sectionIndex === 5 && section.items?.length > 0 && (
                  <div className="mt-6 flex-1 space-y-2.5">
                    {section.items?.map((item: any, index: number) => (
                      <div key={index} className="p-3.5 rounded-lg border-l-4 border-primary bg-white border border-gray-200">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-[13px] text-gray-800 whitespace-pre-line">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-start mt-6">
                  <button
                    className="px-5 py-2.5 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow ff-font-bold"
                    style={{ backgroundColor: "#FFCA00" }}
                    onClick={() => setDetailModal({ open: true, toolIndex: sectionIndex })}
                  >
                    <div className="text-[13px] font-bold text-black leading-tight">{section.title}</div>
                    <div className="text-[10px] text-black">details & pricing →</div>
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}
        
      </div>

      {previewModal.open && (() => {
        const tool = appTools[previewModal.toolIndex];
        const detail = getToolDetail(previewModal.toolIndex);
        const deviceVideo = (() => {
          const t = dynamicTools[previewModal.toolIndex] || {};
          const link = t.video_link || t.iphone_video?.link || t.ipad_video?.link || t.desktop_video?.link || "";
          return {
            title: t.tool_name || "",
            link: link
          };
        })();
        const hasVideo = !!deviceVideo.link;

        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(18, 18, 18, 0.95)", backdropFilter: "blur(8px)" }} onClick={() => setPreviewModal(prev => ({ ...prev, open: false }))}>
            <div className="relative flex flex-col md:flex-row bg-transparent rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl" style={{ maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
              <div className="flex-1 bg-transparent flex items-center justify-center p-8 min-h-[280px] md:min-h-0 relative overflow-hidden">
                {activeDevice === "iphone" && (
                  <div className="relative w-[280px] h-[560px] bg-[#1c1c1e] rounded-[40px] shadow-2xl p-4 border-2 border-gray-700 flex flex-col">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
                      <div className="w-2 h-2 rounded-full bg-gray-800" />
                      <div className="w-10 h-1.5 bg-gray-800 rounded-full" />
                    </div>
                    <div className="absolute inset-[8px] bg-[#0a0a0a] rounded-[34px] overflow-hidden flex flex-col">
                      {/* Status bar */}
                      <div className="flex justify-between items-center px-6 pt-8 pb-2">
                        <span className="text-[11px] text-white font-bold">9:41</span>
                        <div className="flex items-center gap-1">
                          <svg width="16" height="10" viewBox="0 0 24 24" fill="white"><path d="M2 20h20V2L2 20z"/></svg>
                          <svg width="20" height="10" viewBox="0 0 24 24" fill="white"><rect x="2" y="6" width="18" height="12" rx="2"/><path d="M22 10v4"/></svg>
                        </div>
                      </div>
                      
                      {/* Video overlay label */}
                      <div className="absolute top-16 right-4 bg-[#1a1a1a]/80 backdrop-blur text-gray-300 text-[10px] px-2 py-1 rounded-md border border-gray-700 z-20">
                        Replace with your video
                      </div>
                      
                      {/* Play button overlay */}
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform mb-3"
                          style={{ backgroundColor: tool.color }}
                          onClick={() => hasVideo && window.open(deviceVideo.link, "_blank")}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                        </div>
                        <p className="text-gray-400 text-sm font-semibold">{hasVideo ? (deviceVideo.title || "Play Video") : "Demo coming soon"}</p>
                      </div>
                      
                      {/* Playback bar */}
                      <div className="absolute bottom-16 left-6 right-6 z-20">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-400 mb-2">
                          <span>0:42</span><span>2:18</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-[30%] rounded-full" style={{ backgroundColor: tool.color }} />
                        </div>
                      </div>
                      
                      {/* Home bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full z-20" />
                    </div>
                  </div>
                )}

                {activeDevice === "ipad" && (
                  <div className="relative w-[260px] h-[340px] bg-[#1c1c1e] rounded-[24px] shadow-2xl p-4 border border-gray-800 flex flex-col">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full z-20" />
                    <div className="absolute inset-[8px] bg-[#0a0a0a] rounded-[18px] overflow-hidden flex flex-col items-center justify-center p-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: tool.bg }}>
                        {tool.svg}
                      </div>
                      <p className="text-sm font-black text-white mb-1">{tool.name}</p>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 p-4 text-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform mb-2"
                          style={{ backgroundColor: tool.color }}
                          onClick={() => hasVideo && window.open(deviceVideo.link, "_blank")}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                        </div>
                        <p className="text-white text-xs font-bold">{hasVideo ? (deviceVideo.title || "Play Video") : "Demo coming soon"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDevice === "desktop" && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-[340px] h-[220px] bg-[#1c1c1e] rounded-[12px] shadow-2xl p-1 border border-gray-800 flex flex-col">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#1c1c1e] border-b border-gray-800 rounded-t-[10px]">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 h-3 rounded bg-gray-800 mx-2 text-[8px] text-gray-500 flex items-center px-2 overflow-hidden">
                          https://mendel.academy/{tool.name.toLowerCase().replace(/\s+/g, '-')}
                        </div>
                      </div>
                      <div className="flex-1 bg-[#0a0a0a] rounded-b-[8px] relative overflow-hidden flex flex-col items-center justify-center p-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: tool.bg }}>
                          {tool.svg}
                        </div>
                        <p className="text-sm font-black text-white mb-1">{tool.name}</p>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 p-4 text-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform mb-2"
                            style={{ backgroundColor: tool.color }}
                            onClick={() => hasVideo && window.open(deviceVideo.link, "_blank")}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><polygon points="5,3 19,12 5,21" /></svg>
                          </div>
                          <p className="text-white text-xs font-bold">{hasVideo ? (deviceVideo.title || "Play Video") : "Demo coming soon"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-3 bg-[#2c2c2e] rounded-b" />
                    <div className="w-28 h-1.5 bg-[#1c1c1e] rounded" />
                  </div>
                )}
              </div>
              <div className="w-full md:w-[320px] flex flex-col justify-center p-8 ">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">NOW PLAYING</p>
                <h2 className="text-2xl font-black text-white mb-3">{detail.name}</h2>
                <p className="text-[13px] text-gray-300 leading-relaxed mb-6">Tap play to preview this study tool. Walk through a real example of how it works inside the Mendel Galaxy App.</p>
                <button className="w-full py-3.5 rounded-xl font-black text-black text-sm mb-3 hover:opacity-90 transition-opacity" style={{ backgroundColor: tool.color }} onClick={() => { setPreviewModal(prev => ({ ...prev, open: false })); setDetailModal({ open: true, toolIndex: previewModal.toolIndex }); }}>Enroll now →</button>
                <button className="w-full py-3.5 rounded-xl border border-gray-600 text-white text-sm font-bold hover:bg-gray-800 transition-colors" onClick={() => setPreviewModal(prev => ({ ...prev, open: false }))}>Close</button>
              </div>
            </div>
          </div>
        );
      })()}

      {detailModal.open && (() => {
        const detail = getToolDetail(detailModal.toolIndex);
        const tool = appTools[detailModal.toolIndex];
        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }} onClick={() => setDetailModal(prev => ({ ...prev, open: false }))}>
            <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col" style={{ maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
              <div className="bg-[#1a1a1a] p-5 flex items-center justify-between sticky top-0 z-20">
                <div>
                  <p className="text-[10px] font-black text-[#FFCA00] uppercase tracking-widest mb-1">{detail.tagline}</p>
                  <h2 className="text-2xl font-black text-white">{detail.name}</h2>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 transition-colors" onClick={() => setDetailModal(prev => ({ ...prev, open: false }))}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-7">
                {detail.description && (
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{detail.description}</p>
                )}
                {detail.sample_image && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                    <img
                      src={detail.sample_image}
                      alt="Sample Preview"
                      className="w-full h-auto object-cover max-h-[320px]"
                    />
                  </div>
                )}
                {detail.included.filter(Boolean).length > 0 && (
                <>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">WHAT&apos;S INCLUDED</p>
                <ul className="space-y-2 mb-6">
                  {detail.included.filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: tool.color }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      <span className="text-[13px] text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                </>
                )}
                {/* Mendel Flashcards (index 2): Side-by-side FRONT & BACK cards */}
                {detailModal.toolIndex === 2 && detail.flashcardQA && detail.flashcardQA.length > 0 && (() => {
                  const card = detail.flashcardQA[0];
                  return (
                    <>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">FRONT &amp; BACK</p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {/* Question card */}
                        <div className="bg-[#1e293b] rounded-xl p-4 flex flex-col min-h-[160px] relative">
                          <div className="flex items-center gap-1.5 mb-3">
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span className="text-[9px] font-bold text-gray-400 tracking-widest">QUESTION</span>
                          </div>
                          <p className="text-[13px] text-white leading-relaxed font-serif italic flex-1">{card.question}</p>
                          <p className="text-[9px] text-gray-500 mt-3 italic">Tap to reveal answer</p>
                        </div>
                        {/* Answer card */}
                        <div className="bg-[#1e293b] rounded-xl p-4 flex flex-col min-h-[160px] border border-[#2a3a4a] relative">
                          <div className="flex items-center gap-1.5 mb-3">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span className="text-[9px] font-bold text-gray-400 tracking-widest">ANSWER</span>
                          </div>
                          <p className="text-[14px] font-bold text-white leading-relaxed font-serif italic flex-1">{card.answer}</p>
                          {card.question && (
                            <p className="text-[9px] text-gray-500 mb-2">{detail.sampleQuestions?.[0]?.badge || ""}</p>
                          )}
                          <div className="flex gap-1.5 mt-2">
                            <button className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-red-900/60 text-red-300 border border-red-700">Hard</button>
                            <button className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-yellow-900/60 text-yellow-300 border border-yellow-700">Medium</button>
                            <button className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-green-900/60 text-green-300 border border-green-700">Easy</button>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-200 mb-6" />
                    </>
                  );
                })()}

                {/* Mendel Chitras (index 1): No sample questions */}

                {/* Mendel Qbanks (index 0): Only first question */}
                {detailModal.toolIndex === 0 && detail.sampleQuestions && detail.sampleQuestions.length > 0 && (() => {
                  const q = detail.sampleQuestions[0];
                  return (
                    <>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">SAMPLE QUESTION</p>
                      <div className="bg-gray-900 rounded-xl p-4 mb-6">
                        {q.badge && (
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">{q.badge}</p>
                        )}
                        {q.question && (
                          <p className="text-[13px] text-gray-100 leading-relaxed mb-4 whitespace-pre-line">{q.question}</p>
                        )}
                        {q.options && q.options.length > 0 && (
                          <div className="space-y-2">
                            {q.options.map((opt: any, i: number) => (
                              <div key={i} className={`px-3 py-2 rounded-lg text-[12px] border ${opt.correct ? "border-yellow-400 text-yellow-300 bg-yellow-400/10" : "border-gray-700 text-gray-400"}`}>{opt.text}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}

                {/* Other tools (3, 4, 5): all sample questions */}
                {detailModal.toolIndex >= 3 && detail.sampleQuestions && detail.sampleQuestions.length > 0 && (
                  <>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">SAMPLE QUESTIONS</p>
                    {detail.sampleQuestions.map((q: any, qi: number) => (
                      <div key={qi} className="bg-gray-900 rounded-xl p-4 mb-4">
                        {q.badge && (
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">{q.badge}</p>
                        )}
                        {q.question && (
                          <p className="text-[13px] text-gray-100 leading-relaxed mb-4 whitespace-pre-line">{q.question}</p>
                        )}
                        {q.options && q.options.length > 0 && (
                          <div className="space-y-2">
                            {q.options.map((opt: any, i: number) => (
                              <div key={i} className={`px-3 py-2 rounded-lg text-[12px] border ${opt.correct ? "border-yellow-400 text-yellow-300 bg-yellow-400/10" : "border-gray-700 text-gray-400"}`}>{opt.text}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {(detail.individualPrice || detail.galaxyPrice) && (
                <div className="grid grid-cols-2 gap-3">
                  {detail.individualPrice && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">INDIVIDUAL TOOL</p>
                    <p className="text-3xl font-black text-gray-900">{detail.individualPrice}</p>
                    {detail.individualPer && (
                      <p className="text-[11px] text-gray-500 mb-4">{detail.individualPer}</p>
                    )}
                    <button className="w-full py-2.5 rounded-lg text-[11px] font-black text-white bg-gray-900 hover:bg-gray-800 transition-colors tracking-wide">GET THIS TOOL</button>
                  </div>
                  )}
                  {detail.galaxyPrice && (
                  <div className="rounded-xl p-4 border-2" style={{ backgroundColor: "#1a1a1a", borderColor: tool.color }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: tool.color }}>GALAXY APP — ALL TOOLS</p>
                    <p className="text-3xl font-black text-white">{detail.galaxyPrice}</p>
                    {detail.galaxyPer && (
                      <p className="text-[11px] text-gray-400 mb-4">{detail.galaxyPer}</p>
                    )}
                    <button className="w-full py-2.5 rounded-lg text-[11px] font-black text-black tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: tool.color }}>VIEW APP PLANS</button>
                  </div>
                  )}
                </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default GalaxyAppSection;
