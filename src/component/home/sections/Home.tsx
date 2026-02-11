"use client";
import { FiSearch } from "react-icons/fi";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useEffect, useState, useRef } from "react";
import CommonButton from "@/comman/Button";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExamClick = (examId: string) => {
    router.push(`/medicalexam/${examId}`);
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

  return (
    <>
      {/* ----------------  HERO  ---------------- */}
      <main className="flex justify-center min-h-[45vh] bg-white px-2 md:px-4 lg:px-6 text-center py-10">
        <div className="flex flex-col items-center space-y-7 max-w-[1380px] max-auto">
          <h1 className="ff-font-bold -mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
            We simplify learning, <br />
            <span className="bg-[#FFCA00] px-2 py-1 rounded-lg">
              amplify
            </span>{" "}
            success
          </h1>

          <p className="ff-font text-sm sm:text-base md:text-lg max-w-2xl">
            Personalized Medical Coaching
          </p>

          <div ref={searchRef} className="w-full max-w-xl relative">
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
                    onClick={() => handleExamClick(exam.exam_id)}
                    className={`px-5 py-3.5 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${
                      selectedIndex === index
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2 w-full max-w-3xl">
            {/* PG Entrance Exam Prep Box */}
            <div className="bg-white border-gray-300 border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
              <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">
                PG Entrance Exam Prep
              </h3>
              
              {/* Content or Skeleton Loader */}
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="text-center">
                      <Skeleton 
                        height={24} 
                        width="80%" 
                        className="mx-auto rounded-md"
                        baseColor="#f3f4f6"
                        highlightColor="#e5e7eb"
                      />
                    </div>
                  ))}
                  
                  {/* Button skeleton */}
                  <div className="mt-auto text-center pt-4">
                    <Skeleton 
                      height={48} 
                      width={120} 
                      className="mx-auto rounded-full"
                      baseColor="#f3f4f6"
                      highlightColor="#e5e7eb"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <ul className="space-y-2 ff-font text-center text-black">
                    {examBank?.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="relative pl-4 group cursor-pointer hover:text-[#FFCA00] transition-colors duration-200"
                        onClick={() => router.push(`/medicalexam/${item?.exam_id}`)}
                      >
                        {item?.exam_name}
                      </li>
                    ))}
                  </ul>

                  {/* fixed bottom button */}
                  <div className="mt-auto text-center pt-4">
                    <CommonButton
                      pyClass="py-3"
                      pxClass="px-8"
                      className="transition shadow-md w-fit !rounded-full hover:shadow-lg"
                      fontWeight={700}
                      fontSize={15}
                      onClick={() => router.push(`/medicalexam`)}
                    >
                      Learn more
                    </CommonButton>
                  </div>
                </>
              )}
            </div>

            {/* Advanced Pathology Box */}
            <div className="bg-white border-[#d1d5dc] border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
              <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">
                Advanced Pathology
              </h3>
              
              {/* Content or Skeleton Loader */}
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="text-center">
                      <Skeleton 
                        height={24} 
                        width="80%" 
                        className="mx-auto rounded-md"
                        baseColor="#f3f4f6"
                        highlightColor="#e5e7eb"
                      />
                    </div>
                  ))}
                  
                  {/* Button skeleton */}
                  <div className="mt-auto text-center pt-4">
                    <Skeleton 
                      height={48} 
                      width={120} 
                      className="mx-auto rounded-full"
                      baseColor="#f3f4f6"
                      highlightColor="#e5e7eb"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <ul className="space-y-2 ff-font text-center text-black">
                    {pathologyItems.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="relative pl-4 group cursor-pointer hover:text-[#FFCA00] transition-colors duration-200"
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
                      className="transition shadow-md w-fit !rounded-full hover:shadow-lg"
                      fontWeight={700}
                      fontSize={15}
                      onClick={() => router.push("/pathology")}
                    >
                      Learn more
                    </CommonButton>
                  </div>
                </>
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