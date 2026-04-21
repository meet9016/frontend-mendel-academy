"use client";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId, isIndia } from "@/utils/helper";
import MedicalExamDetail from "./sections/MedicalExamDetail";
import USMLEEnroll from "./sections1/USMLEEnroll";
import USMLEPlan from "./sections1/USMLEPlan";
import CourseDes from "./sections/CourseDes";
import Faq from "./sections/Faq";
import WhoEnroll from "./sections/WhoEnroll";
import NewsLetter from "./sections/NewsLetter";
import SketchySubjectSection from "./sections1/SketchySubjectSection";
import Hero from "./sections/Hero";

function PgMedicalEntranceExams() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [examData, setExamData] = useState<any>(null);
  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  // Determine which exam based on pathname
  const isUSMLEStep1 = pathname?.includes("usmle-step-1");
  const isUSMLEStep2 = pathname?.includes("usmle-step-2-ck");

  const userCurrency = examData?.user_currency || (isIndia() ? "INR" : "USD");

  const fetchCartItems = async () => {
    try {
      const identifier = userId || tempId;
      if (!identifier) return;
      const res = await api.get(`${endPointApi.getCart}`, {
        params: { temp_id: identifier },
      });
      if (res.data.success) setCartItems(res.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    if (isUSMLEStep1 || isUSMLEStep2) fetchCartItems();
  }, [userId, tempId]);

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
        const res = await api.get(
          `${endPointApi.getByExamIdSubjectInfo}/${examData._id}`
        );
        if (res.data?.data) {
          const data = Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data];
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

  // Hero section content based on exam type

  return (
    <div>
      {/* DYNAMIC HERO SECTION */}
      <Hero examName={examData?.name} />

      {/* SUBJECTS SECTION */}
      {(isUSMLEStep1 || isUSMLEStep2) ? (
        <SketchySubjectSection
          subjectData={subjectData}
          loading={loading}
          examId={id as string}
        />
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-pulse bg-gray-200 h-10 w-48 rounded-full"></div>
              </div>
            ) : subjectData && subjectData.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {subjectData.map((subject, index) => {
                  const colors = ["bg-primary text-white"];
                  return (
                    <div
                      key={subject._id}
                      onClick={() => router.push(`/services/${id}/${subject.id}`)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${colors[index % colors.length]}`}
                    >
                      <div className="w-8 h-8 flex text-primary items-center justify-center rounded-full bg-white shadow">
                        <span className="font-bold text-sm">{subject.name.charAt(0)}</span>
                      </div>
                      <span className="font-semibold text-sm">{subject.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-600">No subjects available for this exam.</div>
            )}
          </div>
        </section>
      )}
      
      <CourseDes
        data={examData?.exams[0]?.description}
        loading={loading}
      />  
      
      {/* CONDITIONAL RENDERING BASED ON ROUTE */}
      {isUSMLEStep1 ? (
        <>
          <MedicalExamDetail
            data={examData?.exams[0]}
            loading={loading}
            examCategoryId={id as string}
          />
          <USMLEEnroll
            data={examData}
            loading={loading}
            examCategoryId={id as string}
          />
          <USMLEPlan
            data={examData}
            userCurrency={userCurrency}
            cartItems={cartItems}
            examCategoryId={id as string}
            onUpdateCart={fetchCartItems}
          />
        </>
      ) : isUSMLEStep2 ? (
        <>
          <MedicalExamDetail
            data={examData?.exams[0]}
            loading={loading}
            examCategoryId={id as string}
          />
          <USMLEEnroll
            data={examData}
            loading={loading}
            examCategoryId={id as string}
          />
          <USMLEPlan
            data={examData}
            userCurrency={userCurrency}
            cartItems={cartItems}
            examCategoryId={id as string}
            onUpdateCart={fetchCartItems}
          />
        </>
      ) : (
        <MedicalExamDetail
          data={examData?.exams[0]}
          loading={loading}
          examCategoryId={id as string}
        />
      )}

      
      {/* Who Can Enroll - Only for non-USMLE routes */}
      {!isUSMLEStep1 && !isUSMLEStep2 && (
        <WhoEnroll
          data={examData}
          loading={loading}
          examCategoryId={id as string}
        />
      )}

      {/* FAQs */}
      <Faq />


      {/* REGISTER SECTION */}
      <NewsLetter />
    </div>
  );
}

export default PgMedicalEntranceExams;