"use client"
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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

function ChapterDetail() {
  const params = useParams();
  const pathname = usePathname();
  // pathname is /services/[examCategoryId]/[subjectId]/[chapterId]
  const pathSegments = pathname.split('/').filter(Boolean);
  const examCategoryId = pathSegments[1];
  const subjectId = pathSegments[2];
  const chapterId = params.id2 as string;

  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSubjectData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getByIdSubjectInfo}/${subjectId}`);
      if (res.data?.data) {
        setSubjectData(res.data.data);
        const chapter = res.data.data.chapters.find((ch: Chapter) => ch._id === chapterId);
        setChapterData(chapter || null);
      }
    } catch (error) {
      console.log("ERROR fetching subject data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId && chapterId) {
      fetchSubjectData();
    }
  }, [subjectId, chapterId]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-48 mx-auto rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!chapterData || !subjectData) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            Chapter not found.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <a
              href={`/services/${examCategoryId}/${subjectId}`}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← Back to {subjectData.name}
            </a>
          </div>

          {/* Chapter Header */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{chapterData.title}</h1>
              {chapterData.long_title && (
                <p className="text-xl text-gray-600 mb-4">{chapterData.long_title}</p>
              )}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{chapterData.topics.length}</div>
                  <div className="text-gray-600">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {chapterData.topics.reduce((total, topic) => total + topic.lessons.length, 0)}
                  </div>
                  <div className="text-gray-600">Lessons</div>
                </div>
              </div>
            </div>
          </div>

          {/* Topics and Lessons */}
          <div>
            {chapterData.topics.map((topic) => (
              <div key={topic._id} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600 border-b pb-2">{topic.title}</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topic.lessons.map((lesson) => (
                    <div key={lesson._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="relative h-24 mb-3 rounded-lg overflow-hidden">
                        {lesson.image ? (
                          <img
                            src={lesson.image}
                            alt={lesson.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {lesson.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <h4 className="font-medium mb-2">{lesson.name}</h4>

                      {lesson.full_title && (
                        <p className="text-sm text-gray-600 mb-2">{lesson.full_title}</p>
                      )}

                      {lesson.video_link && (
                        <a
                          href={lesson.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Video
                        </a>
                      )}

                      {lesson.tags && lesson.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {lesson.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {lesson.description && (
                        <div className="mt-3 text-sm text-gray-600">
                          <div dangerouslySetInnerHTML={{ __html: lesson.description }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChapterDetail;