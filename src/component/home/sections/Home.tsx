"use client";
import { FiSearch } from "react-icons/fi";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useEffect, useState, useRef } from "react";
import CommonButton from "@/comman/Button";
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

/* ----------  HOOK  (keeps your exact fetch)  ---------- */
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
              ...exam, // existing exam data
              category_name: cat.category_name, // add category name
              category_id: cat.id || cat._id, // add outer category id
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

/* ----------  SKELETON COMPONENTS  ---------- */
const SearchBoxSkeleton = () => (
  <div className="w-full max-w-xl relative animate-pulse">
    <div className="absolute left-3 top-1/2 -translate-y-1/2">
      <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-full h-12 bg-gray-100 rounded-lg px-10"></div>
  </div>
);

const ExamItemSkeleton = ({ count = 5 }: { count?: number }) => (
  <ul className="space-y-3 ff-font text-center">
    {Array.from({ length: count }).map((_, idx) => (
      <li key={idx} className="relative pl-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </li>
    ))}
  </ul>
);

const ButtonSkeleton = () => (
  <div className="h-12 bg-gray-200 rounded-full w-32 animate-pulse mx-auto"></div>
);

const ExamBoxSkeleton = () => (
  <div className="bg-white border-gray-300 border rounded-2xl shadow-md p-6 text-left animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
    <ExamItemSkeleton count={4} />
    <div className="mt-auto text-center pt-6">
      <ButtonSkeleton />
    </div>
  </div>
);

/* ----------  MAIN PAGE  ---------- */
export default function Home() {
  const router = useRouter();
  const { examBank, loading } = useExam();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  console.log("examBank*****", examBank);

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

          {/* Search Box - with skeleton */}
          <div ref={searchRef} className="w-full max-w-xl relative">
            {loading ? (
              <SearchBoxSkeleton />
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Exam Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2 w-full max-w-3xl">
            {/* PG Entrance Exam Prep Box */}
            {loading ? (
              <ExamBoxSkeleton />
            ) : (
              <div className="bg-white border-gray-300 border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
                <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">
                  PG Entrance Exam Prep
                </h3>
                <ul className="space-y-2 ff-font text-center text-black">
                  {examBank?.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="relative pl-4 group cursor-pointer" onClick={() => router.push(`/medicalexam/${item?.exam_id}`)}>
                      {item?.exam_name}
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
                    onClick={() => router.push(`/medicalexam`)}
                  >
                    Learn more
                  </CommonButton>
                </div>
              </div>
            )}

            {/* Advanced Pathology Box */}
            <div className="bg-white border-[#d1d5dc] border rounded-2xl shadow-md p-6 text-left transition hover:shadow-lg relative flex flex-col w-85">
              {loading ? (
                <>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
                  <ExamItemSkeleton count={4} />
                  <div className="mt-auto text-center pt-6">
                    <ButtonSkeleton />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="ff-font-bold text-2xl mb-3 font-bold text-center">
                    Advanced Pathology
                  </h3>
                  <ul className="space-y-2 ff-font text-center text-black">
                    {[
                      "Pathology Residents",
                      "Consultant Pathologists",
                      "DNBs",
                      "Fellows",
                    ].map((item, idx) => (
                      <li key={idx} className="relative pl-4 group cursor-pointer">
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