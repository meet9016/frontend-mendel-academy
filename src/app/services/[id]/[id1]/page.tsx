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

// function SubjectDetail() {
//   const params = useParams();
//   const pathname = usePathname();
//   // pathname is /services/[examCategoryId]/[subjectId]
//   const pathSegments = pathname.split('/').filter(Boolean);
//   const examCategoryId = pathSegments[1]; // services/[examCategoryId]/[subjectId]
//   const subjectId = params.id1 as string;

//   const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchSubjectData = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`${endPointApi.getByIdSubjectInfo}/${subjectId}`);
//       if (res.data?.data) {
//         setSubjectData(res.data.data);
//       }
//     } catch (error) {
//       console.log("ERROR fetching subject data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (subjectId) {
//       fetchSubjectData();
//     }
//   }, [subjectId]);

//   if (loading) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto rounded mb-4"></div>
//             <div className="animate-pulse bg-gray-200 h-4 w-48 mx-auto rounded"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!subjectData) {
//     return (
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center text-gray-600">
//             Subject not found.
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">


//       {/* Subject Stats */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid md:grid-cols-3 gap-6 text-center">
//               <div className="bg-purple-50 rounded-lg p-6">
//                 <div className="text-3xl font-bold text-purple-700">{subjectData.chapters.length}</div>
//                 <div className="text-gray-600">Chapters</div>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-6">
//                 <div className="text-3xl font-bold text-purple-700">
//                   {subjectData.chapters.reduce((total, chapter) => total + chapter.topics.length, 0)}
//                 </div>
//                 <div className="text-gray-600">Topics</div>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-6">
//                 <div className="text-3xl font-bold text-purple-700">
//                   {subjectData.chapters.reduce((total, chapter) =>
//                     total + chapter.topics.reduce((topicTotal, topic) => topicTotal + topic.lessons.length, 0), 0
//                   )}
//                 </div>
//                 <div className="text-gray-600">Lessons</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Chapters Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore {subjectData.name} Units</h2>
//             <div className="grid md:grid-cols-2 gap-6 mb-12">
//               {subjectData.chapters.map((chapter) => (
//                 <a
//                   key={chapter._id}
//                   href={`/services/${examCategoryId}/${subjectId}/${chapter._id}`}
//                   className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-600"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
//                       {chapter.image ? (
//                         <img
//                           src={chapter.image}
//                           alt={chapter.title}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
//                           <span className="text-white text-lg font-bold">
//                             {chapter.title.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
//                       {chapter.long_title && (
//                         <p className="text-gray-600 mb-2">{chapter.long_title}</p>
//                       )}
//                       <div className="text-sm text-gray-500">
//                         {chapter.topics.length} Topics • {chapter.topics.reduce((total, topic) => total + topic.lessons.length, 0)} Lessons
//                       </div>
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>

//             <div className="text-center">
//               <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">
//                 Watch Full Lessons 7 Days Free
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">The tough stuff, made simple</h2>
//                 <p className="text-lg text-gray-700 mb-6">
//                   We break down complex topics into memorable visual stories that stick in your brain. 
//                   Our method uses the science of visual memory to help you recall information when it matters most.
//                 </p>

//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Lessons you'll remember</h3>
//                 <p className="text-lg text-gray-700 mb-6">
//                   Our creative storytelling and visual memory techniques help you retain information 
//                   longer and recall it more easily during exams.
//                 </p>

//                 <button className="bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-800 transition-colors">
//                   Get started, completely free for 7 days!
//                 </button>
//               </div>

//               <div className="relative">
//                 <img 
//                   src="https://z-cdn-media.chatglm.cn/files/fbfe76b2-56b3-4823-8d84-d8161b207197.png?auth_key=1875651382-7794da787ec0485fb22fbb49085eb05b-0-2afa500e1541603dcc2e16b5a382c42b" 
//                   alt="Learning illustration" 
//                   className="rounded-lg shadow-lg w-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>


//     </div>
//   );
// }

// export default SubjectDetail;
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

function SubjectDetail() {
  const params = useParams();
  const pathname = usePathname();
  // pathname is /services/[examCategoryId]/[subjectId]
  const pathSegments = pathname.split('/').filter(Boolean);
  const examCategoryId = pathSegments[1]; // services/[examCategoryId]/[subjectId]
  const subjectId = params.id1 as string;

  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      <section className="w-full bg-primary py-12 md:py-20 relative text-black">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="text-sm font-medium mb-4 opacity-80 flex items-center justify-center md:justify-start gap-2">
                <a href={`/services/${examCategoryId}`} className="hover:underline">Home</a>
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
                <a
                  key={chapter._id}
                  href={`/services/${examCategoryId}/${subjectId}/${chapter._id}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                </a>
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