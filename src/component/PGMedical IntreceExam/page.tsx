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

  useEffect(() => {
    if (!id) return;
    fetcgExamData();
  }, []);

  return (
    <div>
      <MedicalExamDetail data={examData?.exams[0]} loading={loading} />
      <CourseDes data={examData?.exams[0]?.description} loading={loading} />

      {/* FAQs */}
      <Faq />

      {/* Who Can Enroll */}
      <WhoEnroll data={examData} loading={loading} />

      {/* REGISTER SECTION */}
      <NewsLetter />
    </div>
  );
}

export default PgMedicalEntranceExams;
