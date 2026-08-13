"use client";
import CommonButton from "@/comman/Button";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMoneyBillWave,
  FaRegStar,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/redux/store";
import { PathologyCardSkeleton, FeaturedLiveSkeleton } from "../../Skeletons";
import { CgLock } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { getData } from "@/redux/dataSlice";
import { useAppDispatch } from "@/redux/hooks";
import EndometrialPathology from "./EndometrialPathology";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import UpcomingCourse from "./UpcomingCourse";
import { getTempId } from "@/utils/helper";
import { getAuthId } from "@/utils/tokenManager";
import { setCartCount } from "@/redux/cartSlice";
import StatusSection from "./StatusSection";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";

/* ----------  TYPES  ---------- */
type Program = {
  _id: string; // ✅ Changed from 'id' to '_id' to match backend response
  id?: string; // ✅ Keep optional for backward compatibility
  title: string;
  subtitle: string;
  rating: number;
  total_reviews: number;
  price: number;
  duration: string;
  category: string;
  currency?: string;
};

type Stat = { icon: React.ElementType; value: string; label: string };

export interface ProgramData {
  id: string;
  course_title: string;
  duration: string;
  date: string;
  status: string;
  isSoldOut: boolean;
  tags: string[];
  zoom_link: string;
  instructor: {
    name: string;
    qualification: string;
    image: string;
  };
  choose_plan_list: any[];
  createdAt: string;
}

// ✅ Helper to format currency with null checks
const formatCurrency = (amount: number | undefined | null, currency: string) => {
  const safeAmount = Number(amount) || 0;

  if (currency === 'INR') {
    return `₹${safeAmount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `$${safeAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/* ----------  HOOK  (same fetch)  ---------- */
const usePrograms = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllPreRecorded}`);

        if (res?.data?.data?.length) {
          // ✅ Map the response to ensure we have both _id and id fields
          const mappedPrograms = res.data.data.map((program: any) => ({
            ...program,
            id: program._id || program.id, // Ensure 'id' exists
          }));
          setPrograms(mappedPrograms);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { programs, loading };
};

/* ----------  UTILS  (same tempId + cart)  ---------- */
const addToCart = async (item: Program) => {
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  // ✅ Use _id or id, whichever is available
  const productId = item._id || item.id;

  if (!productId) {
    ErrorToast("Product ID is missing");
    return;
  }

  const body = {
    ...(userId ? { user_id: userId } : { temp_id: tempId }),
    product_id: productId,
    category_name: item.category,
    price: item.price,
    quantity: 1,
    duration: item.duration,
    bucket_type: true,
  };

  try {
    const res = await api.post(`${endPointApi.postCreateAddToCart}`, body);

    if (res.data.success) store.dispatch(setCartCount(res.data.count));
    SuccessToast(res.data.message);
  } catch (error: any) {
    ErrorToast(error?.response?.data?.message || "Failed to add to cart");
  }
};

const PathologyMasterySeries = ({ showCounters = false }: { showCounters?: boolean }) => {
  const { loadings, list } = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { programs, loading } = usePrograms();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recorded'>('upcoming');

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const upcomingCourses = [
    {
      title: "Surgical Grossing Mastery™",
      desc: "From specimen to diagnosis — a structured grossing pathway.",
      duration: "8 weeks • Live",
      sessions: "2 hrs/week + Q&A",
      features: [
        "Surgical Grossing Atlas™",
        "Grossing Companion App™",
        "AI Grossing Assistant (soon)"
      ],
      price: 7999,
      originalPrice: 9999,
      regularPrice: "Regular ₹9,999 • Late ₹11,999",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      )
    },
    {
      title: "Diagnostic Reporting Mastery™",
      desc: "Write reports clinicians trust — and courts respect.",
      duration: "8 weeks • Live",
      sessions: "2 hrs/week + workshops",
      features: [
        "Diagnostic Reporting Handbook™",
        "Mendel Reporting Toolkit™",
        "Mendel Diagnostic Intelligence™"
      ],
      price: 7999,
      originalPrice: 9999,
      regularPrice: "Regular ₹9,999 • Late ₹11,999",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    },
    {
      title: "Integrated Clinico-Diagnostic Reasoning Mastery™",
      desc: "Clinical, radiological, pathological & molecular correlation.",
      duration: "8 weeks • Live",
      sessions: "2 hrs/week + case confs",
      features: [
        "Clinico-Diagnostic Reasoning Atlas™",
        "Case Library™",
        "Mendel ReasonAssist™"
      ],
      price: 7999,
      originalPrice: 9999,
      regularPrice: "Regular ₹9,999 • Late ₹11,999",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )
    }
  ];

  return (
    <>
      {!showCounters ? (
        <main className="max-w-[1380px] mx-auto flex flex-col items-center justify-center bg-white px-4 md:px-6 lg:px-8 py-10">
          <div className="text-center space-y-1">
            <h1 className="text-2xl md:text-4xl font-bold ff-font-bold">
              Advanced Pathology Programs
            </h1>
          </div>

          <div className="text-center mt-2 ff-font md:text-lg max-w-4xl">
            <p>
              Specialized training designed by pathology experts to advance your
              diagnostic expertise and clinical knowledge.
            </p>
          </div>

          {/* ----  FEATURED LIVE  ---- */}
          {loadings ? (
            <FeaturedLiveSkeleton />
          ) : (
            <FeaturedLive
              data={list[0]}
              onMore={() => router.push("/subscription")}
            />
          )}
        </main>
      ) : null}

      {showCounters ? <StatusSection /> : null}

      {/* ----  EndometrialPathology  ---- */}
      <EndometrialPathology />

      {/* Unified Course Section with Tabs */}
      <section className="max-w-[1380px] mx-auto px-6 md:px-8 py-12">
        {/* Tab Switchers */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`inline-flex items-center gap-2.5 font-bold text-sm rounded-full px-5 py-[11px] transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? "text-[#160B29] bg-[#FFF8E6] border-[1.5px] border-[#C79A00] shadow-[0_10px_20px_rgba(199,154,0,0.12)]"
                : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C79A00]" />
            Upcoming
            <b className="text-xs bg-white rounded-full px-2.5 py-0.5 text-[#160B29] min-w-[22px] border border-gray-100">
              3
            </b>
          </button>

          <button
            onClick={() => setActiveTab('recorded')}
            className={`inline-flex items-center gap-2.5 font-bold text-sm rounded-full px-5 py-[11px] transition-all cursor-pointer ${
              activeTab === 'recorded'
                ? "text-[#160B29] bg-[#FAF5FF] border-[1.5px] border-[#8B5CF6] shadow-[0_10px_20px_rgba(139,92,246,0.12)]"
                : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            Buy Recordings
            <b className="text-xs bg-white rounded-full px-2.5 py-0.5 text-[#160B29] min-w-[22px] border border-gray-100">
              {programs.length || 5}
            </b>
          </button>
        </div>

        {activeTab === 'upcoming' ? (
          <div>
            {/* Header info */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-[9px] tracking-wider uppercase font-bold bg-[#FFF8E6] text-[#B28200] border border-[#FFC900]/40 px-3 py-1 rounded-full mb-3.5">
                ENROLLING NOW
              </span>
              <h2 className="text-3xl font-extrabold text-[#160B29] mb-2">Upcoming Courses</h2>
              <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                New live cohorts. Small groups, direct feedback from faculty, and early-bird pricing. Seats are limited.
              </p>
            </div>

            {/* Upcoming Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingCourses.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#EBE8E2] border-t-4 border-t-[#FCCA29] rounded-[24px] p-6 relative flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[580px] overflow-hidden"
                >
                  {/* Top Badge */}
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[9px] tracking-wide uppercase font-extrabold bg-[#FCCA29] text-[#1A1502] px-3 py-1 rounded-full shadow-sm">
                    ★ Enrolling
                  </span>

                  <div>
                    {/* Icon Container */}
                    <div className="w-[50px] h-[50px] rounded-2xl bg-[#FAF1F5] text-[#D54C80] flex items-center justify-center border border-[#F5E2EC] mb-5 mt-1">
                      {c.icon}
                    </div>

                    {/* Course Title & Description */}
                    <h3 className="text-[19px] font-extrabold text-[#1D172A] leading-tight mb-2.5 pr-16">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {c.desc}
                    </p>

                    {/* Specifications */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 text-xs">
                        <span className="text-gray-400 font-bold uppercase tracking-wider">DURATION</span>
                        <span className="text-[#1D172A] font-extrabold">{c.duration}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 text-xs">
                        <span className="text-gray-400 font-bold uppercase tracking-wider">SESSIONS</span>
                        <span className="text-[#1D172A] font-extrabold">{c.sessions}</span>
                      </div>
                    </div>

                    {/* Syllabus Features */}
                    <ul className="space-y-3 mb-8">
                      {c.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1 text-xs text-gray-500 font-medium">
                          <span>✓ {feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-[26px] font-black text-[#1D172A]">₹{c.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-gray-400 line-through">₹{c.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] tracking-wide uppercase font-extrabold text-[#B28200] bg-[#FFF8E6] px-2 py-0.5 rounded border border-[#FFC900]/30 ml-1.5">
                        EARLY-BIRD
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => router.push(`/subscription`)}
                      className="w-full py-3.5 bg-[#D54C80] hover:bg-[#b83b6b] text-white font-extrabold text-sm rounded-full transition duration-200 flex items-center justify-center gap-1 cursor-pointer shadow-md shadow-[#D54C80]/15"
                    >
                      Enroll Now →
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2.5 font-medium">
                      {c.regularPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 text-[9px] tracking-wider uppercase font-bold bg-[#FAF5FF] text-[#8B5CF6] border border-[#8B5CF6]/30 px-3 py-1 rounded-full mb-3.5">
                SELF-PACED LEARNING
              </span>
              <h2 className="text-3xl font-extrabold text-[#160B29] mb-2">Recorded Programs</h2>
              <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                Self-paced learning. Learn at your own speed with lifetime access to materials, case discussions, and certificates.
              </p>
            </div>

            {/* Recorded Grid */}
            {loading ? (
              <ProgramSkeleton />
            ) : (
              <RecordedGrid programs={programs} onCart={addToCart} router={router} />
            )}
          </div>
        )}
      </section>
    </>
  );
};
export default PathologyMasterySeries;

/* ----------  SUB-COMPONENTS  ---------- */
const FeaturedLive = ({
  onMore,
  data,
}: {
  onMore: () => void;
  data: ProgramData | undefined | any;
}) => {
  const stats: Stat[] = [
    { icon: FaUser, value: "64", label: "Students Enrolled" },
    { icon: FaClock, value: data?.duration, label: "Program Duration" },
    { icon: FaAward, value: "36", label: "Left This Week" },
  ];
  return (
    <div className="w-full max-w-[1000px] mx-auto bg-gray-900 text-white rounded-2xl p-8 md:p-10 mt-10 shadow-lg">

      <div className="flex flex-col md:flex-row gap-8">

        {/* LEFT SIDE */}
        <div className="md:w-[70%]">

          {/* Status Row */}
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{data?.status}</span>
            </div>

            {data?.isSoldOut && (
              <span className="bg-white/10 ff-font-bold px-3 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl ff-font-bold font-bold mb-6">
            {data?.course_title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">D</span>
            </div>
            <div>
              <h4 className="font-semibold text-white text-base md:text-lg">
                {data?.instructor?.name}
              </h4>
              <p className="text-gray-400 text-sm">
                {data?.instructor?.qualification}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {data?.tags?.map((f: string) => (
              <div
                key={f}
                className="bg-gray-700 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-600 transition"
              >
                {f}
              </div>
            ))}
          </div>

          {/* Button */}
          <CommonButton
            size="xxl"
            pyClass="py-4"
            pxClass="px-10"
            fontWeight={700}
            fontSize={14}
            onClick={onMore}
            className="group"
          >
            <div className="flex items-center gap-2">
              <span>Learn More</span>
              <FaArrowRight className="w-4 h-4 duration-300 transition-transform group-hover:translate-x-1" />
            </div>
          </CommonButton>
        </div>

        {/* RIGHT SIDE - STATS */}
        <div className="md:w-[30%]">
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 
                       rounded-xl p-4 flex items-center gap-4
                       hover:border-[#e5b43c] transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#e5b43c]/10">
                  <stat.icon className="w-5 h-5 text-[#e5b43c]" />
                </div>

                <div>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecordedGrid = ({
  programs,
  onCart,
  router,
}: {
  programs: Program[];
  onCart: (p: Program) => void;
  router: any;
}) => {
  // Helper function to get product ID
  const getProductId = (program: Program) => {
    return program._id || program.id;
  };

  return (
    <>
      {/* Course Cards */}
      <div className="relative px-12 mb-10">
        {/* Left Arrow */}
        <button
          onClick={() =>
            document
              .getElementById("courseScroll")
              ?.scrollBy({ left: -350, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-[#FFC900]/40 text-black p-3 rounded-full shadow-md hover:bg-[#fff7db] transition cursor-pointer"
        >
          <FaChevronLeft className="w-5 h-5 text-black" />
        </button>

        {/* Scrollable Container */}
        <div
          id="courseScroll"
          className="flex gap-8 overflow-x-auto scroll-smooth"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {programs.map((p, i) => {
            const programCurrency = p.currency || 'INR';
            const productId = getProductId(p);
            
            const isGI = p.title.toLowerCase().includes("endoscopic") || p.title.toLowerCase().includes("gi");
            const badgeText = isGI 
              ? "MOST POPULAR COURSE - 100+ ENROLLED" 
              : "CURRICULUM ALIGNED WITH WHO 5TH ED. BLUE BOOK";
            
            const ratingValue = isGI ? "4.9" : "4";
            const learnersValue = isGI ? "80+ learners" : "50+ learners";

            return (
              <div
                key={productId || i}
                onClick={() => router.push(`/pathology/${productId}`)}
                className="w-[320px] flex-shrink-0 scroll-snap-align-start group relative bg-white rounded-[24px] overflow-hidden border border-[#EBE8E2] hover:border-[#FFCA00] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={p?.image || "https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg"}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFF8E6] border border-[#FFC900]/30 text-[#B28200] font-extrabold text-[8px] tracking-wider px-3 py-1.5 rounded-full uppercase shadow-sm backdrop-blur-sm">
                      {p.category || "Pathology"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {/* Title */}
                      <h3 className="text-base leading-tight font-extrabold text-[#1D172A] min-h-[44px] mb-3 line-clamp-2">
                        {p.title}
                      </h3>

                      {/* Info Badge */}
                      <div className="mb-3.5">
                        <div className="flex items-center gap-1 text-[8px] text-[#B28200] bg-[#FFF8E6] border border-[#FFC900]/20 px-2.5 py-1.5 rounded-md uppercase font-bold tracking-wide">
                          <span>★</span>
                          <span className="leading-none">{badgeText}</span>
                        </div>
                      </div>

                      {/* Rating & Learners */}
                      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="text-[#D54C80] text-sm">★</span>
                          <span className="text-[#1D172A] font-extrabold">{p.rating || ratingValue}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaUsers className="w-3.5 h-3.5 text-[#D54C80]/80" />
                          <span className="text-[#1D172A] font-bold">{p.total_reviews ? `${p.total_reviews}+ learners` : learnersValue}</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-100 mb-4"></div>

                      {/* Duration & Price */}
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-xs text-gray-400 font-semibold">
                          {p.duration || "6"} month access
                        </p>
                        <p className="text-[22px] font-black text-[#1D172A]">
                          {formatCurrency(p.price, programCurrency)}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex items-center justify-between text-[8px] text-gray-400 font-bold border-t border-gray-100 pt-4 gap-1 text-center uppercase tracking-wider">
                        <div className="flex-1">
                          <span>E-certificate included</span>
                        </div>
                        <div className="w-[1px] h-3.5 bg-gray-100" />
                        <div className="flex-1">
                          <span>CV + CME friendly</span>
                        </div>
                        <div className="w-[1px] h-3.5 bg-gray-100" />
                        <div className="flex-1">
                          <span>One-time payment</span>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6">
                      <button
                        onClick={(e: any) => {
                          e.stopPropagation();
                          router.push(`/pathology/${productId}`);
                        }}
                        className="w-full py-3 bg-[#D54C80] hover:bg-[#b83b6b] text-white font-extrabold text-sm rounded-full transition duration-200 flex items-center justify-center gap-1 cursor-pointer shadow-md shadow-[#D54C80]/15"
                      >
                        Enroll Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            document
              .getElementById("courseScroll")
              ?.scrollBy({ left: 350, behavior: "smooth" })
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-[#FFC900]/40 text-black p-3 rounded-full shadow-md hover:bg-[#fff7db] transition cursor-pointer"
        >
          <FaChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </>
  );
};

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section className="max-w-[1380px] mx-auto mt-10 px-4 md:px-6 lg:px-8 mb-10">
    <div className="mb-6 text-center">
      <h2 className="text-3xl font-bold ff-font-bold">{title}</h2>
      <p className="ff-font text-lg">{subtitle}</p>
    </div>
    {children}
  </section>
);

/* ----------  SKELETON  ---------- */

const ProgramSkeleton = () => (
  <div className="flex gap-8 overflow-x-auto scrollbar-hide px-12">
    {[...Array(4)].map((_, i) => (
      <PathologyCardSkeleton key={i} />
    ))}
  </div>
);

const UpcomeingProgramSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {[...Array(4)].map((_, i) => (
      <PathologyCardSkeleton key={i} />
    ))}
  </div>
);

