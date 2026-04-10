"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Lesson {
  _id: string;
  name: string;
  video_link: string;
  image: string;
  tags: string[];
  full_title: string;
  description: string;
}

interface Topic {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface Chapter {
  _id: string;
  title: string;
  image: string;
  long_title: string;
  topics: Topic[];
}

interface SubjectData {
  _id: string;
  exam_id: string;
  name: string;
  sku: string;
  title: string;
  description: string;
  image: string;
  slogan: string;
  chapters: Chapter[];
}

interface SubjectListProps {
  subjectData: SubjectData[] | null;
  loading: boolean;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjectData, loading }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const router = useRouter()

  const colors = [
    "bg-green-200 text-green-900",
    "bg-purple-200 text-purple-900",
    "bg-pink-200 text-pink-900",
    "bg-red-200 text-red-900",
    "bg-yellow-200 text-yellow-900",
    "bg-orange-200 text-orange-900",
    "bg-teal-200 text-teal-900",
    "bg-emerald-200 text-emerald-900",
    "bg-cyan-200 text-cyan-900",
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  if (!subjectData || subjectData.length === 0) return null;

  // ================= SUBJECT DETAILS VIEW =================
  if (selectedSubject) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* BACK BUTTON */}
          <button
            onClick={() => {
              setSelectedSubject(null);
              setSelectedChapter(null);
            }}
            className="mb-6 text-blue-600 hover:text-blue-800"
          >
            ← Back to Subjects
          </button>

          {/* SUBJECT HEADER */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            <div className="relative h-64">
              {selectedSubject.image && (
                <img
                  src={selectedSubject.image}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center">
                <div>
                  <h1 className="text-4xl font-bold">{selectedSubject.name}</h1>
                  <p>{selectedSubject.slogan}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p dangerouslySetInnerHTML={{ __html: selectedSubject.description }} />
            </div>
          </div>

          {/* CHAPTERS */}
          <h2 className="text-2xl font-bold mb-6">Chapters</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedSubject.chapters.map((chapter) => (
              <div
                key={chapter._id}
                onClick={() => setSelectedChapter(chapter)}
                className="cursor-pointer bg-gray-50 p-5 rounded-lg hover:shadow-lg"
              >
                <h3 className="font-semibold text-lg">{chapter.title}</h3>
                <p className="text-sm text-gray-600">{chapter.long_title}</p>
                <p className="text-blue-600 text-sm mt-2">
                  {chapter.topics.length} Topics
                </p>
              </div>
            ))}
          </div>

          {/* CHAPTER DETAILS */}
          {selectedChapter && (
            <div className="mt-10">
              <button
                onClick={() => setSelectedChapter(null)}
                className="mb-4 text-blue-600"
              >
                ← Back to Chapters
              </button>

              <h3 className="text-2xl font-bold mb-4">{selectedChapter.title}</h3>

              {selectedChapter.topics.map((topic) => (
                <div key={topic._id} className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">
                    {topic.title}
                  </h4>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topic.lessons.map((lesson) => (
                      <div key={lesson._id} className="bg-gray-100 p-4 rounded">
                        <h5 className="font-medium">{lesson.name}</h5>

                        {lesson.video_link && (
                          <a
                            href={lesson.video_link}
                            target="_blank"
                            className="text-blue-600 text-sm"
                          >
                            ▶ Watch Video
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ================= SUBJECT LIST (PILLS UI) =================
  return (
    <section className="py-16 bg-gradient-to-b from-green-100 to-blue-50">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Explore the curriculum
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            One subscription, everything you need for the exam.
          </p>
        </div>

        {/* PILLS */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {subjectData.map((subject, index) => (
            <button
              key={subject._id}
              onClick={() => router.push(`/services/${subjectData?.sku}/${subjectId}/${chapter._id}`)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl ${colors[index % colors.length]}`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow">
                {subject.name.charAt(0)}
              </div>

              <span className="font-semibold text-sm">
                {subject.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectList;