"use client"
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MedicalExamDetail from "./sections/MedicalExamDetail";
import CourseDes from "./sections/CourseDes";
import Faq from "./sections/Faq";
import WhoEnroll from "./sections/WhoEnroll";
import NewsLetter from "./sections/NewsLetter";


function PgMedicalEntranceExams() {
  const { id } = useParams();
  const [examData, setExamData] = useState<any>(null);
  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcgExamData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getMedicalById}/${id}`);
      if (res.data) {
        setExamData(res?.data);
      } else {
        console.log("DATA FAILED");
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  const fetchSubjectData = async () => {
    try {
      if (examData?._id) {
        const res = await api.get(`${endPointApi.getByExamIdSubjectInfo}/${examData._id}`);
        if (res.data?.data) {
          // Ensure subjectData is always an array
          const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
          setSubjectData(data);
        }
      }
    } catch (error) {
      console.log("ERROR fetching subject data", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetcgExamData();
  }, [id]);

  useEffect(() => {
    if (examData) {
      fetchSubjectData();
    }
  }, [examData]);

  return (
    <div>
      <MedicalExamDetail data={examData?.exams[0]} loading={loading} examCategoryId={id as string} />
      <CourseDes data={examData?.exams[0]?.description} loading={loading} />

      {/* Subjects Section */}
     <section className="py-16">
  <div className="container mx-auto px-4">

    {/* HEADER */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Explore the curriculum
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        One subscription, everything you need for the exam.
      </p>
    </div>

    {/* LOADING */}
    {loading ? (
      <div className="flex justify-center">
        <div className="animate-pulse bg-gray-200 h-10 w-48 rounded-full"></div>
      </div>
    ) : subjectData && subjectData.length > 0 ? (

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {subjectData.map((subject, index) => {
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

          return (
            <a
              key={subject._id}
              href={`/services/${id}/${subject.id}`}
              className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl ${colors[index % colors.length]}`}
            >
              {/* ICON */}
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow">
                <span className="font-bold text-sm">
                  {subject.name.charAt(0)}
                </span>
              </div>

              {/* TEXT */}
              <span className="font-semibold text-sm">
                {subject.name}
              </span>
            </a>
          );
        })}
      </div>

    ) : (
      <div className="text-center text-gray-600">
        No subjects available for this exam.
      </div>
    )}
  </div>
</section>

      {/* FAQs */}
      <Faq />

      {/* Who Can Enroll */}
      <WhoEnroll data={examData} loading={loading} examCategoryId={id as string} />

      {/* REGISTER SECTION */}
      <NewsLetter />
    </div>
  );
}

export default PgMedicalEntranceExams;
