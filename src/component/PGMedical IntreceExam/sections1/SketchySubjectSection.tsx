"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Subject {
  _id: string;
  id?: string;
  name: string;
  description?: string;
}

interface Props {
  subjectData: Subject[];
  loading: boolean;
  examId: string;
}

const SketchySubjectSection: React.FC<Props> = ({
  subjectData,
  loading,
  examId,
}) => {
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (subjectData?.length > 0 && !selectedSubject) {
      setSelectedSubject(subjectData[0]);
    }
  }, [subjectData, selectedSubject]);

  if (loading) {
    return (
      <section className="usmle-bg-light py-16 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-10">
            <div className="animate-pulse bg-gray-300 h-6 w-40 rounded mx-auto mb-3" />
            <div className="animate-pulse bg-gray-300 h-9 w-72 rounded mx-auto mb-2" />
            <div className="animate-pulse bg-gray-300 h-4 w-56 rounded mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-300 h-10 w-28 rounded-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!subjectData || subjectData.length === 0) return null;

  return (
    <section className="bg-[#f9fafb] py-16 px-6">
      <div className="max-w-[960px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
            Explore the curriculum
          </h2>
          <p className="text-sm ff-font usmle-text-gray max-w-md mx-auto">
            Click a subject to explore the visual syllabus and free previews.
          </p>
        </div>

        {/* CATEGORY TOGGLE (Static Mockup) */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg border border-gray-300 p-1">
            <button className="px-6 py-2 bg-[#1A1A1A] text-primary text-xs font-bold rounded-md cursor-pointer">
              General Principles
            </button>
            <button className="px-6 py-2 bg-transparent text-gray-500 text-xs font-medium rounded-md hover:bg-gray-50 cursor-pointer">
              Organ Systems
            </button>
          </div>
        </div>

        {/* SUBJECT BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-[800px] mx-auto">
          {subjectData.map((subject) => {
            const subjectId = subject._id || subject.id;
            const selectedId = selectedSubject?._id || selectedSubject?.id;
            const isSelected = selectedId === subjectId;

            // Basic fallback icons based on subject name
            const getIconColor = (name: string) => {
              if (isSelected) return "#F5C800";
              if (name.includes("Pathology")) return "#f97316";
              if (name.includes("Immunology")) return "#8b5cf6";
              if (name.includes("Microbiology")) return "#ef4444";
              if (name.includes("Pharmacology")) return "#3b82f6";
              if (name.includes("Public Health")) return "#ec4899";
              return "#64748b";
            };

            const Icon = () => (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={getIconColor(subject.name)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            );

            return (
              <button
                key={subjectId}
                onClick={() => setSelectedSubject(subject)}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 w-[120px] rounded-xl border transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "bg-[#1A1A1A] text-primary border-primary shadow-md"
                      : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                  }
                `}
              >
                <div className="flex-shrink-0">
                  <Icon />
                </div>
                <span className={`text-[11px] font-bold ff-font leading-tight text-center ${isSelected ? "text-primary" : "text-gray-700"}`}>
                  {subject.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* SELECTED SUBJECT CARD */}
        {selectedSubject && (
          <div className="max-w-[700px] mx-auto bg-white rounded-xl border border-gray-300 shadow-sm relative pt-1">
            {/* TOP YELLOW BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-xl" />

            <div className="p-8 text-left">
              <p className="text-[10px] ff-font font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">
                SELECTED SUBJECT
              </p>

              <h3 className="text-[22px] ff-font-bold font-black text-gray-900 mb-2">
                {selectedSubject.name}
              </h3>

              <div
                className="text-gray-600 ff-font text-sm mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedSubject.description ||
                    `Enzymes, metabolism, molecular biology, and nutrition — built around clinical relevance.`,
                }}
              />

              <button
                onClick={() =>
                  router.push(
                    `/services/${examId}/${selectedSubject.id || selectedSubject._id}`
                  )
                }
                className="bg-[#1A1A1A] text-primary px-5 py-2.5 rounded-lg ff-font font-bold text-xs hover:opacity-90 transition cursor-pointer"
              >
                Preview free lessons →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SketchySubjectSection;
