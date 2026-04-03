"use client";
import { FiSearch } from "react-icons/fi";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useEffect, useState, useRef } from "react";
import CommonButton from "@/comman/Button";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/* ----------  TYPES  ---------- */
export interface Exam {
  _id: string;
  title: string;
  tag: string;
  rating: number;
  total_reviews: number;
  features: string[];
  exam_name: string;
  exam_id: string;
  category_name: string;
}

/* ----------  HOOK  ---------- */
const useExam = () => {
  const [examBank, setExamBank] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAppMedicalExam}`);
        if (res.data.data) {
          const allExams = res.data.data.flatMap((cat: any) =>
            cat.exams.map((exam: any) => ({
              ...exam,
              category_name: cat.category_name,
              category_id: cat.id || cat._id,
            }))
          );

          setExamBank(allExams);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return { examBank, loading };
};

/* ----------  MAIN PAGE  ---------- */
export default function Home() {
  const router = useRouter();
  const { examBank, loading } = useExam();
  const [searchTerm, setSearchTerm] = useState("");

  // Word cycle for hero section
  const words = ["amplify", "intensify", "fortify"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredExams([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
      return;
    }

    const filtered = examBank.filter((exam) =>
      exam.exam_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExams(filtered);
    setShowDropdown(true);
    setSelectedIndex(-1);
  }, [searchTerm, examBank]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExamClick = (examId: string) => {
    router.push(`/services/${examId}`);
    setShowDropdown(false);
    setSearchTerm("");
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredExams.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredExams.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleExamClick(filteredExams[selectedIndex].exam_id);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const element = document.getElementById(`exam-item-${selectedIndex}`);
      element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  // Static data for Pathology section
  const pathologyItems = [
    "Pathology Residents",
    "Consultant Pathologists",
    "DNBs",
    "Fellows",
  ];


  // import { motion, AnimatePresence } from "framer-motion";

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -20,            // 👈 left side se aayega
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };


  return (
    <>
      {/* ----------------  HERO  ---------------- */}
      <main className="flex justify-center min-h-[75vh] lg:min-h-[80vh] items-center bg-white px-2 md:px-4 lg:px-6 text-center pt-24 pb-20">
        <div className="flex flex-col items-center w-full max-w-[1380px] mx-auto">

          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium mb-10">
            Trusted by 10,000+ Medical Students
          </div>




          <h1 className="ff-font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.25] text-[#111827]">
            We simplify learning, <br />

            <span className="inline-flex items-center flex-wrap gap-2 mt-2">

              {/* Animated Word */}
              <span className="relative inline-block overflow-hidden rounded-xl align-middle">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 bg-[#FFCA00] origin-left"
                />

                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="relative px-3 py-1 inline-block text-[#131d2c] font-semibold"
                  >
                    {words[wordIndex].split("").map((char, i) => (
                      <motion.span key={i} variants={child} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* ✅ Success text properly aligned */}
              <span className="text-[#111827]">success</span>

            </span>
          </h1>

          <div className="ff-font text-base sm:text-lg md:text-xl text-[#6b7280] mt-8 mb-16 max-w-2xl mx-auto flex flex-col items-center gap-1.5">
            <span className="ff-font text-xl sm:text-2xl text-[#6b7280] leading-tight font-semibold">
              Personalized Medical Coaching
            </span>
            <span className="ff-font text-base sm:text-lg text-[#6b7280]">
              Driven by Data, Enhanced by AI
            </span>
          </div>

          <div ref={searchRef} className="w-full max-w-xl relative mb-10">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm && setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-700 placeholder-gray-400 transition"
            />

            {/* Dropdown Results */}
            {showDropdown && filteredExams.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50">
                {filteredExams.map((exam, index) => (
                  <div
                    id={`exam-item-${index}`}
                    key={exam._id}
                    onClick={() => handleExamClick(exam.slug)}
                    className={`px-5 py-3.5 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${selectedIndex === index
                      ? 'bg-yellow-50 border-l-4 border-l-[#FFCA00]'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <p className="ff-font text-sm text-gray-800 text-left">
                      {exam.exam_name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {showDropdown && searchTerm && filteredExams.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
                <p className="ff-font text-sm text-gray-500 text-left">
                  No exams found
                </p>
              </div>
            )}
          </div>

          <div ref={dropdownRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full z-10 relative mb-25">
            {/* PG Entrance Exams Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'pg' ? null : 'pg')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0f172a] text-white rounded-xl font-semibold flex items-center justify-between gap-2.5 shadow-md hover:bg-[#1e293b] transition-colors text-sm"
              >
                PG Entrance Exams
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'pg' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {activeDropdown === 'pg' && (
                <div className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-full sm:w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  {loading ? (
                    <div className="p-8 text-center text-sm text-gray-500 animate-pulse">Loading exams...</div>
                  ) : (
                    <div className="py-2 max-h-40 overflow-y-auto custom-scrollbar">
                      {examBank?.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            router.push(`/services/${item?.slug}`);
                            setActiveDropdown(null);
                          }}
                          className="px-4 py-3 mx-2 my-1 rounded-xl hover:bg-gray-50 hover:text-[#0f172a] cursor-pointer transition-all duration-200 text-sm text-gray-600 font-medium flex items-center justify-between group"
                        >
                          <span className="truncate pr-4">{item?.exam_name}</span>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FFCA00] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Advanced Pathology Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'pathology' ? null : 'pathology')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#0f172a] border border-gray-300 rounded-xl font-semibold flex items-center justify-between gap-2.5 shadow-sm hover:bg-gray-50 transition-colors text-sm"
              >
                Advanced Pathology
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'pathology' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {activeDropdown === 'pathology' && (
                <div className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-full sm:w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {pathologyItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          router.push("/pathology");
                          setActiveDropdown(null);
                        }}
                        className="px-4 py-3 mx-2 my-1 rounded-xl hover:bg-gray-50 hover:text-[#0f172a] cursor-pointer transition-all duration-200 text-sm text-gray-600 font-medium flex items-center justify-between group"
                      >
                        <span className="truncate pr-4">{item}</span>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FFCA00] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}