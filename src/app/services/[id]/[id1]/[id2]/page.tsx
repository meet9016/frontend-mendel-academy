// "use client"
// import { api } from "@/utils/axiosInstance";
// import endPointApi from "@/utils/endPointApi";
// import { useParams, usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";

// interface Lesson {
//   _id: string;
//   name: string;
//   video_link: string;
//   image: string;
//   tags: string[];
//   full_title: string;
//   description: string;
// }

// interface Topic {
//   _id: string;
//   title: string;
//   lessons: Lesson[];
// }

// interface Chapter {
//   _id: string;
//   title: string;
//   image: string;
//   long_title: string;
//   topics: Topic[];
// }

// interface SubjectData {
//   _id: string;
//   exam_id: string;
//   name: string;
//   sku: string;
//   title: string;
//   description: string;
//   image: string;
//   slogan: string;
//   chapters: Chapter[];
// }

// function ChapterDetail() {
//   const params = useParams();
//   const pathname = usePathname();
//   // pathname is /services/[examCategoryId]/[subjectId]/[chapterId]
//   const pathSegments = pathname.split('/').filter(Boolean);
//   const examCategoryId = pathSegments[1];
//   const subjectId = pathSegments[2];
//   const chapterId = params.id2 as string;

//   const [chapterData, setChapterData] = useState<Chapter | null>(null);
//   const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchSubjectData = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`${endPointApi.getByIdSubjectInfo}/${subjectId}`);
//       if (res.data?.data) {
//         setSubjectData(res.data.data);
//         const chapter = res.data.data.chapters.find((ch: Chapter) => ch._id === chapterId);
//         setChapterData(chapter || null);
//       }
//     } catch (error) {
//       console.log("ERROR fetching subject data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (subjectId && chapterId) {
//       fetchSubjectData();
//     }
//   }, [subjectId, chapterId]);

//   if (loading) {
//     return (
//       <div className="bg-white min-h-screen">
//         {/* Chapter Hero Section Skeleton */}
//         <section className="w-full bg-primary">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//               {/* Left Content Skeleton */}
//               <div className="order-2 md:order-1 text-black">
//                 <div className="text-sm font-medium mb-4 opacity-80 flex items-center gap-2">
//                   <div className="animate-pulse bg-black/20 h-4 w-16 rounded"></div>
//                   <span>/</span>
//                   <div className="animate-pulse bg-black/20 h-4 w-20 rounded"></div>
//                   <span>/</span>
//                   <div className="animate-pulse bg-black/20 h-4 w-24 rounded"></div>
//                 </div>
//                 <div className="animate-pulse bg-black/20 h-12 w-full rounded mb-4"></div>
//                 <div className="animate-pulse bg-black/20 h-6 w-3/4 rounded"></div>
//               </div>

//               {/* Right Image Skeleton */}
//               <div className="order-1 md:order-2 flex justify-center md:justify-end">
//                 <div className="w-full max-w-[280px] md:max-w-sm lg:max-w-md">
//                   <div className="animate-pulse bg-black/20 w-full h-64 rounded-xl"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Topics Content Skeleton */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto">
//               {/* Topics and Lessons Skeleton */}
//               {[...Array(3)].map((_, topicIndex) => (
//                 <div key={topicIndex} className="mb-12">
//                   <div className="animate-pulse bg-gray-200 h-8 w-48 rounded mb-6"></div>

//                   <div className="mb-4">
//                     <div className="flex flex-col gap-3 ml-8">
//                       {[...Array(4)].map((_, lessonIndex) => (
//                         <div key={lessonIndex} className="flex items-center gap-3">
//                           <div className="animate-pulse bg-gray-200 h-4 w-4 rounded"></div>
//                           <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
//                           <div className="flex gap-2 ml-2">
//                             <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
//                             <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   if (!chapterData || !subjectData) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center text-gray-600">
//             Chapter not found.
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Chapter Hero Section */}
//       <section className="w-full bg-primary">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//             {/* Left Content */}
//             <div className="order-2 md:order-1 text-black">
//               <div className="text-sm font-medium mb-4 opacity-80 flex items-center gap-2">
//                 <a href={`/services/${examCategoryId}`} className="hover:underline">Home</a>
//                 <span>/</span>
//                 <a href={`/services/${examCategoryId}/${subjectId}`} className="hover:underline">{subjectData.name}</a>
//                 <span>/</span>
//                 <span>{chapterData.title}</span>
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#231f20] leading-tight mb-4">
//                 {chapterData.long_title || chapterData.title}
//               </h1>
//             </div>
            
//             {/* Right Image */}
//             <div className="order-1 md:order-2 flex justify-center md:justify-end">
//               <div className="w-full max-w-[280px] md:max-w-sm lg:max-w-md">
//                 {chapterData.image ? (
//                   <img
//                     src={chapterData.image}
//                     alt={chapterData.title}
//                     className="w-full h-auto object-contain drop-shadow-2xl"
//                   />
//                 ) : (
//                   <div className="w-full h-64 border-4 border-dashed border-black/10 rounded-xl flex items-center justify-center">
//                     <span className="text-black/50 font-medium">Chapter Image</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Topics Content */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             {/* Topics and Lessons */}
//             <div>
//               {chapterData.topics.map((topic) => (
//                 <div key={topic._id} className="mb-12">
//                   <h3 className="text-2xl font-semibold text-[#231f20] mb-6 pb-2">{topic.title}</h3>

//                   <div className="mb-4">
//                     <div className="flex flex-col gap-3 ml-8">
//                       {topic.lessons.map((lesson) => (
//                         <div key={lesson._id} className="flex items-center gap-3">
//                           <span className="text-green-500 font-light">→</span>
//                           {lesson.video_link ? (
//                             <a href={lesson.video_link} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
//                               {lesson.name}
//                             </a>
//                           ) : (
//                             <span className="text-gray-700">{lesson.name}</span>
//                           )}
//                           {lesson.tags && lesson.tags.length > 0 && (
//                             <div className="flex gap-2 ml-2">
//                               {lesson.tags.map((tag, idx) => (
//                                 <span key={idx} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
//                                   {tag}
//                                 </span>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default ChapterDetail;
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
  const [loading, setLoading] = useState<boolean>(true);

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
      <div className="bg-white min-h-screen">
        {/* Chapter Hero Section Skeleton */}
        <section className="w-full bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content Skeleton */}
              <div className="order-2 md:order-1 text-black">
                <div className="text-sm font-medium mb-4 opacity-80 flex items-center gap-2">
                  <div className="animate-pulse bg-black/20 h-4 w-16 rounded"></div>
                  <span>/</span>
                  <div className="animate-pulse bg-black/20 h-4 w-20 rounded"></div>
                  <span>/</span>
                  <div className="animate-pulse bg-black/20 h-4 w-24 rounded"></div>
                </div>
                <div className="animate-pulse bg-black/20 h-12 w-full rounded mb-4"></div>
                <div className="animate-pulse bg-black/20 h-6 w-3/4 rounded"></div>
              </div>

              {/* Right Image Skeleton */}
              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <div className="w-full max-w-[280px] md:max-w-sm lg:max-w-md">
                  <div className="animate-pulse bg-black/20 w-full h-64 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Topics Content Skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Topics and Lessons Skeleton */}
              {[...Array(3)].map((_, topicIndex) => (
                <div key={topicIndex} className="mb-12">
                  <div className="animate-pulse bg-gray-200 h-8 w-48 rounded mb-6"></div>

                  <div className="mb-4">
                    <div className="flex flex-col gap-3">
                      {[...Array(4)].map((_, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center gap-3">
                          <div className="animate-pulse bg-gray-200 h-4 w-4 rounded"></div>
                          <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                          <div className="flex gap-2 ml-2">
                            <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
                            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
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
    <div className="bg-white min-h-screen">
      {/* Chapter Hero Section */}
      <section className="w-full bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 md:order-1 text-black">
              <div className="text-sm font-medium mb-4 opacity-80 flex items-center gap-2">
                <a href={`/services/${examCategoryId}`} className="hover:underline">Home</a>
                <span>/</span>
                <a href={`/services/${examCategoryId}/${subjectId}`} className="hover:underline">{subjectData.name}</a>
                <span>/</span>
                <span>{chapterData.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#231f20] leading-tight mb-4">
                {chapterData.long_title || chapterData.title}
              </h1>
            </div>
            
            {/* Right Image */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-full max-w-[280px] md:max-w-sm lg:max-w-md">
                {chapterData.image ? (
                  <img
                    src={chapterData.image}
                    alt={chapterData.title}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-64 border-4 border-dashed border-black/10 rounded-xl flex items-center justify-center">
                    <span className="text-black/50 font-medium">Chapter Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Topics Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Topics and Lessons */}
            <div>
              {chapterData.topics.map((topic) => (
                <div key={topic._id} className="mb-12">
                  <h3 className="text-2xl font-semibold text-[#231f20] mb-6 pb-2">{topic.title}</h3>

                  <div className="mb-4">
                    <div className="flex flex-col gap-3">
                      {topic.lessons.map((lesson) => (
                        <div key={lesson._id} className="flex items-center gap-3">
                          <span className="text-green-500 font-light">→</span>
                          {lesson.video_link ? (
                            <a href={lesson.video_link} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                              {lesson.name}
                            </a>
                          ) : (
                            <span className="text-gray-700">{lesson.name}</span>
                          )}
                          {lesson.tags && lesson.tags.length > 0 && (
                            <div className="flex gap-2 ml-2">
                              {lesson.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
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

export default ChapterDetail;