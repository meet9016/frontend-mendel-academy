"use client";

import CommonButton from "@/comman/Button";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { limitChars } from "@/utils/helper";

/* ------------------ TYPES ------------------ */
export interface QBank {
  id: string;
  exam_id: string;
  title: string;
  exam_name: string;
  description: number;
  sub_titles: number;
  features: string[];
  sort_description: string;
}

interface CourseListProps {
  questionBank: QBank[];
  loading: boolean;
}

/* ----------------- FETCH HOOK ---------------- */
const useQBank = () => {
  const [questionBank, setQuestionBank] = useState<QBank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestionBank = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllMedical}`);

        if (res.data?.data) {
          const categories = res.data.data;

          const allExams = categories.flatMap((cat: any) =>
            cat.exams.map((exam: any) => ({
              ...exam,
              exam_id: cat.id,
            }))
          );

          setQuestionBank(allExams);
        }
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };
    getQuestionBank();
  }, []);

  return { questionBank, loading };
};

/* ------------------ MAIN PAGE ------------------ */
function EntranceExams() {
  const { questionBank, loading } = useQBank();

  return (
    <div>
      <Hero />
      <CourseList questionBank={questionBank} loading={loading} />
    </div>
  );
}

export default EntranceExams;

/* ---------------------- HERO ---------------------- */
const Hero = () => (
  <section className="relative w-full h-[40vh] overflow-hidden">
    <motion.img
      src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
      alt="Hero Banner"
      className="w-full h-full object-cover object-center"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />

    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
    />
  </section>
);


/* ------------------ QBANK LIST SECTION ------------------ */
const CourseList = ({ questionBank, loading }: CourseListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;

    if (direction === "left") {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#f9fafb] px-4 md:px-8 lg:px-16 relative group/section">
      <div className="max-w-[1025px] mx-auto py-14 space-y-7">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold ff-font-bold mb-2">
            Courses
          </h2>
          <p className="ff-font text-base md:text-lg max-w-2xl mx-auto">
            Crush high-stakes medical exams with data-driven practice & targeted
            remediation.
          </p>
        </div>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-primary hover:bg-gray-100 hover:scale-110 transition-all opacity-0 group-hover/section:opacity-100"
          >
            <FiChevronLeft className="w-6 h-6 text-primary" />
          </button>

          {/* CONTENT */}
          {loading ? (
            <div className="flex gap-6 overflow-x-auto pb-8 px-2 scrollbar-hide">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height={380}
                  width={300}
                  borderRadius={24}
                  className="rounded-3xl flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {questionBank?.map((exam: QBank) => (
                <CourseCard key={exam.id} {...exam} />
              ))}
            </div>
          )}

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-primary hover:scale-110 transition-all opacity-0 group-hover/section:opacity-100"
          >
            <FiChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ------------------ COURSE CARD ------------------ */
const CourseCard = (course: QBank) => {
  const router = useRouter();
  const { exam_name, title, description, sub_titles, exam_id } = course;

  return (
    <div
      onClick={() => router.push(`/medicalexam/${exam_id}`)}
      className="group flex-shrink-0 w-[300px] cursor-pointer bg-white border-2 border-gray-200 rounded-3xl p-6 transition-all duration-500 flex flex-col relative overflow-hidden"
    >
      {title && (
        <div className="absolute top-0 right-0 bg-[#FFCA00] ff-font text-xs font-semibold px-6 py-1 rounded-bl-2xl shadow-md">
          {title}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-15 h-15 bg-white border-primary text-primary rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <FiFileText className="w-7 h-7" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold ff-font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {exam_name}
            </h3>

            {/* <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-md">
                <FiStar className="text-primary" />
                <span className="text-sm ff-font font-bold">{rating}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                <FiUsers />
                <span className="text-sm ff-font font-medium">
                  {total_reviews}
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {sub_titles &&
            Array.isArray(sub_titles) &&
            sub_titles.slice(0, 3).map((f: string, idx: number) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 bg-[#f3f6fa] rounded-full whitespace-nowrap"
              >
                {f}
              </span>
            ))}
        </div>

        {/* Description */}
        <p className="text-sm ff-font mb-6 min-h-[3.2rem]">
          {limitChars(String(description), 60)}
        </p>

        {/* Button */}
        <CommonButton
          pyClass="py-3"
          pxClass="px-21.5"
          fontWeight={700}
          fontSize={14}
        >
          Enroll Now
        </CommonButton>

        <p className="text-xs ff-font text-center mt-3">
          Instant access • Secure checkout
        </p>
      </div>
    </div>
  );
};
