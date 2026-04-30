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
    <section className="usmle-bg-light py-16 px-6">
      <div className="max-w-[960px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
            Explore the Core 7 curriculum
          </h2>
          <p className="text-sm ff-font usmle-text-gray max-w-md mx-auto">
            Click a subject to explore the visual syllabus and free previews.
          </p>
        </div>

        {/* SUBJECT BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {subjectData.map((subject) => {
            const subjectId = subject._id || subject.id;
            const selectedId = selectedSubject?._id || selectedSubject?.id;
            const isSelected = selectedId === subjectId;

            return (
              <button
                key={subjectId}
                onClick={() => setSelectedSubject(subject)}
                className={`px-5 py-2 rounded-full border text-sm ff-font font-medium transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "bg-primary text-black border-primary shadow-md"
                      : "bg-white usmle-text-black usmle-border-gray hover:bg-primary hover:border-primary"
                  }
                `}
              >
                {subject.name}
              </button>
            );
          })}
        </div>

        {/* SELECTED SUBJECT CARD */}
        {selectedSubject && (
          <div className="max-w-[700px] mx-auto bg-white rounded-2xl border usmle-border-gray shadow-sm overflow-hidden">

            {/* TOP YELLOW BAR */}
            <div className="h-1 bg-primary" />

            <div className="p-8">
              <p className="text-xs ff-font font-semibold tracking-[0.15em] usmle-text-muted uppercase mb-3">
                Selected Subject
              </p>

              <h3 className="text-3xl ff-font-bold font-bold usmle-text-black mb-3">
                {selectedSubject.name}
              </h3>

              <div
                className="usmle-text-gray ff-font text-sm mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedSubject.description ||
                    `Explore ${selectedSubject.name} topics built around visual logic frameworks.`,
                }}
              />

              <button
                onClick={() =>
                  router.push(
                    `/services/${examId}/${selectedSubject.id || selectedSubject._id}`
                  )
                }
                className="bg-gray-900 text-primary px-5 py-3 rounded-xl ff-font font-bold text-sm hover:opacity-90 transition cursor-pointer"
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
