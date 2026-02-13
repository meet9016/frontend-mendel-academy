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
import DOMPurify from "dompurify";

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();

    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [questionBank, loading]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 350;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFCA00] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFCA00]"></div>
            <span className="text-sm font-semibold ff-font-bold text-[#FFCA00] uppercase tracking-wider">
              Our Programs
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FFCA00]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold ff-font-bold mb-3 text-gray-900">
            Medical Exam Preparation Courses
          </h2>
          <p className="ff-font text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive preparation programs designed by experts to help you excel in your medical career
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
            <motion.button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 
  flex items-center justify-center rounded-full 
  transition-all duration-300 shadow-xl
  ${canScrollLeft
                  ? "bg-white border border-[#FFCA00] hover:bg-[#FFCA00] group"
                  : "bg-gray-200 cursor-not-allowed"
                }`}
            >
              <FiChevronLeft
                className={`w-6 h-6 ${canScrollLeft ? "text-[#FFCA00] group-hover:text-white" : "text-gray-400"
                  }`}
              />
            </motion.button>

          {/* Cards Container */}
          {loading ? (
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height={450}
                  width={320}
                  borderRadius={24}
                  className="flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-12"
            >
              {questionBank?.map((exam: QBank) => (
                <CourseCard key={exam.id} {...exam} />
              ))}
            </div>
          )}

          {/* Right Arrow */}
            <motion.button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 
  flex items-center justify-center rounded-full 
  transition-all duration-300 shadow-xl
  ${canScrollRight
                  ? "bg-white border border-[#FFCA00] hover:bg-[#FFCA00] group"
                  : "bg-gray-200 cursor-not-allowed"
                }`}
            >
              <FiChevronRight
                className={`w-6 h-6 ${canScrollRight ? "text-[#FFCA00] group-hover:text-white" : "text-gray-400"
                  }`}
              />
            </motion.button>
        </div>

        {/* Bottom indicator */}
        {!loading && questionBank.length > 0 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm ff-font text-gray-500">
              Showing {questionBank.length} course{questionBank.length !== 1 ? 's' : ''} • Scroll to explore more
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/* ------------------ COURSE CARD ------------------ */
const CourseCard = (course: QBank) => {
  const router = useRouter();
  const { exam_name, title, description, sub_titles, exam_id } = course;

  return (
    <motion.div
      onClick={() => router.push(`/medicalexam/${exam_id}`)}
      className="group flex-shrink-0 w-[320px] h-[520px] cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-[#FFCA00] via-[#FFD700] to-[#FFA500] p-6 pb-8 flex-shrink-0">
        {/* Country Badge */}
        {title && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ff-font-bold text-gray-800 shadow-md">
              {title}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
          <FiFileText className="w-8 h-8 text-[#FFCA00]" />
        </div>

        {/* Exam Name */}
        <h3 className="text-xl font-bold ff-font-bold text-white drop-shadow-md line-clamp-2 min-h-[3.5rem]">
          {exam_name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow -mt-4">
        {/* Features with icons */}
        {sub_titles && Array.isArray(sub_titles) && sub_titles.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2 flex-shrink-0">
            {sub_titles.slice(0, 3).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFCA00] flex-shrink-0"></div>
                <span className="text-xs ff-font text-gray-700 line-clamp-1">
                  {feature}
                </span>
              </div>
            ))}
            {sub_titles.length > 3 && (
              <p className="text-xs ff-font text-gray-500  pt-1">
                +{sub_titles.length - 3} more features
              </p>
            )}
          </div>
        )}

        {/* Description */}
        <div
          className="text-sm ff-font text-gray-600 mb-4 line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />

        {/* CTA Button */}
        <div className="mt-auto space-y-3 flex-shrink-0">
          <CommonButton
            pyClass="py-3"
            pxClass="px-6"
            fontWeight={700}
            fontSize={14}
          >
            View Details
          </CommonButton>

          <div className="flex items-center justify-center gap-2 text-xs ff-font text-gray-500">
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>Instant Access</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>Expert Support</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
