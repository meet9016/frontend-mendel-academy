"use client"
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useParams, usePathname, useRouter } from "next/navigation";
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

function SubjectDetail() {
  const params = useParams();
  const pathname = usePathname();
  // pathname is /services/[examCategoryId]/[subjectId]
  const pathSegments = pathname.split('/').filter(Boolean);
  const examCategoryId = pathSegments[1]; // services/[examCategoryId]/[subjectId]
  const subjectId = params.id1 as string;
  const router = useRouter()

  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSubjectData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getByIdSubjectInfo}/${subjectId}`);
      if (res.data?.data) {
        setSubjectData(res.data.data);
      }
    } catch (error) {
      console.log("ERROR fetching subject data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      fetchSubjectData();
    }
  }, [subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section Skeleton */}
        <section className="w-full bg-primary relative text-black">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="text-sm font-medium mb-4 opacity-80 flex items-center justify-center md:justify-start gap-2">
                  <div className="animate-pulse bg-black/20 h-4 w-16 rounded"></div>
                  <span>/</span>
                  <div className="animate-pulse bg-black/20 h-4 w-20 rounded"></div>
                </div>
                <div className="animate-pulse bg-black/20 h-16 w-full rounded mb-6"></div>
                <div className="custom-bg-background rounded-lg mb-8 p-4">
                  <div className="animate-pulse bg-black/20 h-20 w-full rounded"></div>
                </div>
                <div className="animate-pulse bg-black/20 h-12 w-40 rounded-full"></div>
              </div>
              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <div className="w-full max-w-[280px] md:max-w-md relative">
                  <div className="animate-pulse bg-black/20 w-full h-64 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Chapters Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse bg-gray-200 h-10 w-64 mx-auto rounded mb-4"></div>
              <div className="animate-pulse bg-gray-200 h-6 w-96 mx-auto rounded mb-12"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="block bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48 overflow-hidden">
                      <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <div className="animate-pulse bg-white/20 h-6 w-32 rounded"></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="animate-pulse bg-gray-200 h-16 w-full rounded mb-4"></div>
                      <div className="flex justify-between text-sm">
                        <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                        <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!subjectData) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            Subject not found.
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-primary relative text-black">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="text-sm font-medium mb-4 opacity-80 flex items-center justify-center md:justify-start gap-2">
                <div onClick={() => router.push(`/services/${examCategoryId}`)} className="hover:underline">Home</div>
                <span>/</span>
                <span>{subjectData.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#231f20] mb-6 leading-tight">
                {subjectData.name}
              </h1>
              <div className="custom-bg-background rounded-lg mb-8 p-4 [&_*]:!bg-transparent">
                <div
                  className="text-lg md:text-xl text-[#231f20]/90"
                  dangerouslySetInnerHTML={{
                    __html:
                      subjectData.description ||
                      "Master this subject with our comprehensive learning materials designed to help you succeed.",
                  }}
                ></div>
              </div>
              <button className="bg-[#231f20] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-black transition-colors shadow-lg">
                Start Learning
              </button>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] md:max-w-md relative">
                {subjectData.image ? (
                  <img
                    src={subjectData.image}
                    alt={subjectData.name}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-64 border-4 border-dashed border-black/10 rounded-xl flex items-center justify-center">
                    <span className="text-black/50 font-medium">Subject Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Chapters Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Explore Chapters</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Dive deep into each chapter with comprehensive lessons, practice materials, and interactive content.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjectData.chapters.map((chapter) => (
                <div
                  key={chapter._id}
                  onClick={() => router.push(`/services/${examCategoryId}/${subjectId}/${chapter._id}`)}
                  className="group cursor-pointer block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    {chapter.image ? (
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {chapter.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{chapter.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    {chapter.long_title && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{chapter.long_title}</p>
                    )}
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{chapter.topics.length} Topics</span>
                      <span>{chapter.topics.reduce((total, topic) => total + topic.lessons.length, 0)} Lessons</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their understanding with our comprehensive learning materials.
          </p>
          <button className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section> */}
    </div>
  );
}

export default SubjectDetail;