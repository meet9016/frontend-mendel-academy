"use client";
import {
  FiSearch,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useEffect, useState } from "react";
import CommonButton from "@/comman/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

/* ----------  TYPES  ---------- */
export interface QBank {
  _id: string;
  title: string;
  tag: string;
  rating: number;
  total_reviews: number;
  features: string[];
  sort_description: string;
}

/* ----------  HOOK  (keeps your exact fetch)  ---------- */
const useQBank = () => {
  const [questionBank, setQuestionBank] = useState<QBank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestionBank = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllQuestion}`);
        if (res.data) setQuestionBank(res.data.data);
        else console.log("DATA FAILED");
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setTimeout(() => setLoading(false), 100);
      }
    };
    getQuestionBank();
  }, []);

  return { questionBank, loading };
};

/* ----------  SCROLL  (your original logic)  ---------- */
const scroll = (direction: "left" | "right") => {
  const container = document.getElementById("course-scroll-container");
  if (!container) return;
  const scrollAmount = 360;
  container.scrollTo({
    left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
    behavior: "smooth",
  });
};

/* ----------  MAIN PAGE  ---------- */
export default function Home() {
  const { questionBank, loading } = useQBank();

  return (
    <>
      {/* ----------------  HERO  ---------------- */}
      <main className="flex justify-center min-h-[45vh] bg-white px-2 md:px-4 lg:px-6 text-center py-10">
        <div className="flex flex-col items-center space-y-7 max-w-[1380px] max-auto">

          {/* <p className="text-sm md:text-base ff-font-bold border-primary px-4 py-2 rounded-full shadow-md inline-block">
            Trusted by 10,000+ Medical Students
          </p> */}

          <h1 className="ff-font-bold -mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
            We simplify learning, <br />
            <span className="bg-[#FFCA00] px-2 py-1 rounded-lg">amplify</span> success
          </h1>

          <p className="ff-font text-sm sm:text-base md:text-lg max-w-2xl">
            Personalized Medical Coaching
          </p>

          <div className="w-full max-w-xl relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-700 placeholder-gray-400 transition"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2 w-full max-w-3xl">
            {/* PG Entrance Exam Prep Box */}
            <div className="bg-white border-[#d1d5dc] border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
              <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">PG Entrance Exam Prep</h3>
              <ul className="space-y-2 ff-font text-center text-black">
                {[
                  "USMLE - 1, 2 & 3",
                  "NEET-PG",
                  "INI-CET",
                  "FMGE",
                  "AMC",
                  "UKMLE (PLAB)",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="relative pl-4 group cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* fixed bottom button */}
              <div className="mt-auto text-center pt-4">
                <CommonButton
                  pyClass="py-3"
                  pxClass="px-8"
                  className="transition shadow-md w-fit !rounded-full"
                  fontWeight={700}
                  fontSize={15}
                >
                  Learn more
                </CommonButton>
              </div>
            </div>

            {/* Advanced Pathology Box */}
            <div className="bg-white border-[#d1d5dc] border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
              <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">Advanced Pathology</h3>
              <ul className="space-y-2 ff-font text-center text-black">
                {[
                  "Pathology Residents",
                  "Consultant Pathologists",
                  "DNBs",
                  "Fellows",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="relative pl-4 group cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* fixed bottom button */}
              <div className="mt-auto text-center pt-4">
                <CommonButton
                  pyClass="py-3"
                  pxClass="px-8"
                  className="transition shadow-md w-fit !rounded-full"
                  fontWeight={700}
                  fontSize={15}
                >
                  Learn more
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* ----------------  QBANK SECTION  ---------------- */}
      {/* <section className="bg-[#f9fafb] px-4 md:px-8 lg:px-16 relative group/section">
          <div className="max-w-[1025px] mx-auto relative py-10 space-y-7">
            <div className="text-center ">
              <h2 className="text-2xl md:text-3xl font-bold ff-font-bold mb-2">
                Adaptive Qbanks

                for Exam Prep
              </h2>
              <p className="ff-font text-base md:text-lg max-w-2xl mx-auto">
                Crush high-stakes medical exams with data-driven practice & targeted remediation.
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => scroll("left")}
                className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-primary hover:bg-gray-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
              >
                <FiChevronLeft className="w-6 h-6 text-primary" />
              </button>

            
              {loading ? (
                <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={380} width={340} borderRadius={24} className="rounded-3xl flex-shrink-0" />
                  ))}
                </div>
              ) : (
                <div
                  id="course-scroll-container"
                  className="flex gap-6 overflow-x-auto  scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
                >
                  {questionBank.map((course, index) => (
                    <CourseCard key={index} {...course} />
                  ))}
                </div>
              )}

              <button
                onClick={() => scroll("right")}
                className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-primary hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
              >
                <FiChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
        </section> */}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

/* ----------  COURSE CARD  (your original JSX)  ---------- */
const CourseCard = (course: QBank) => {
  const router = useRouter();
  const { title, tag, rating, total_reviews, features, sort_description } = course;

  return (
    <div className="group flex-shrink-0 w-[300px] cursor-pointer bg-white border-2 border-gray-200 rounded-3xl p-6 transition-all duration-500 flex flex-col relative overflow-hidden">
      {tag && (
        <div className="absolute top-0 right-0 bg-[#FFCA00] ff-font text-xs font-semibold px-6 py-1 rounded-bl-2xl shadow-md">
          {tag}
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start gap-3 ">
          <div className="w-15 h-15 bg-white border-primary text-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FiFileText className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold ff-font-bold group-hover:text-primary transition-colors duration-300 leading-snug min-h-[1rem] line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-md">
                <FiStar className="text-primary" />
                <span className="text-sm ff-font font-bold">{rating}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                <FiUsers />
                <span className="text-sm ff-font font-medium">{total_reviews}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {features.slice(0, 3).map((f, idx) => (
            <span key={idx} className="text-xs px-3 py-1.5 bg-[#f3f6fa] rounded-full whitespace-nowrap">
              {f}
            </span>
          ))}
        </div>

        <p className="text-sm ff-font line-clamp-2 mb-6 flex-grow leading-relaxed min-h-[3.2rem]">
          {sort_description}
        </p>

        <CommonButton pyClass="py-3" pxClass="px-21.5" fontWeight={700} fontSize={14}>
          Enroll Now
        </CommonButton>
        <p className="text-xs ff-font text-center mt-3 font-sm">Instant access • Secure checkout</p>
      </div>
    </div>
  );
};