"use client";
import CommonButton from "@/comman/Button";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaChevronDown,
  FaMoneyBillWave,
  FaRegStar,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/redux/store";
import Skeleton from "react-loading-skeleton";
import { CgLock } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { getData } from "@/redux/dataSlice";
import { useAppDispatch } from "@/redux/hooks";
import EndometrialPathology from "./EndometrialPathology";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import UpcomingCourse from "./UpcomingCourse";
import "react-loading-skeleton/dist/skeleton.css";
import { getTempId } from "@/utils/helper";
import { getAuthId } from "@/utils/tokenManager";
import { setCartCount } from "@/redux/cartSlice";

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
    toast.error("Product ID is missing");
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
    toast.success(res.data.message);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to add to cart");
  }
};

const PathologyMasterySeries = () => {
  const { loadings, list } = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { programs, loading } = usePrograms();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
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

      {/* ----  EndometrialPathology  ---- */}
      <EndometrialPathology />

      {/* ----  RECORDED PROGRAM---- */}
      <Section
        title="Recorded Programs"
        subtitle="Self-paced learning with lifetime access"
      >
        {loading ? (
          <ProgramSkeleton />
        ) : (
          <RecordedGrid programs={programs} onCart={addToCart} router={router} />
        )}
      </Section>

      {/* ----  UPCOMING PROGRAM ----- */}
      <Section
        title="Upcoming Programs"
        subtitle="Join the waitlist and get early access"
      >
        {loading ? <UpcomeingProgramSkeleton /> : <UpcomingCourse />}
      </Section>
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
  data: ProgramData | undefined;
}) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto bg-gray-900 text-white rounded-2xl p-6 md:p-10 mt-10 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-wrap items-center justify-between text-sm mb-6">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{data?.status}</span>
        </div>
        <div className="flex items-center gap-3">
          {data?.isSoldOut ? (
            <span className="bg-white/10 ff-font-bold px-3 py-1 rounded-full">
              Sold Out
            </span>
          ) : null}
          <span className="bg-white/10 px-3 py-1 ff-font-bold rounded-full flex items-center gap-1">
            <CgLock className="w-4 h-4" />
            {data?.duration}
          </span>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl ff-font-bold font-bold mb-4">
        {data?.course_title}
      </h3>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-gray-700 ff-font-bold flex items-center justify-center">
          <span className="text-white text-lg font-semibold">D</span>
        </div>
        <div>
          <h4 className="font-semibold ff-font-bold text-white text-base md:text-lg">
            {data?.instructor?.name}
          </h4>
          <p className="text-gray-400 ff-font text-sm">
            {data?.instructor?.qualification}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {data?.tags?.map((f) => (
          <div
            key={f}
            className="bg-gray-700 text-white ff-font px-4 py-1.5 rounded-full text-sm hover:bg-gray-600 transition"
          >
            {f}
          </div>
        ))}
      </div>

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
  // ✅ Helper function to get product ID
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
        >
          <FaChevronDown className="rotate-90 w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          id="courseScroll"
          className="flex gap-8 overflow-x-auto scroll-smooth"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {programs.map((p, i) => {
            // ✅ Get currency for each program
            const programCurrency = p.currency || 'USD';
            const productId = getProductId(p);

            // ✅ Debug log to check IDs
            if (!productId) {
              console.warn("Program missing ID:", p);
            }

            return (
              <div
                key={productId || i}
                className="w-[320px] flex-shrink-0 scroll-snap-align-start group relative bg-white rounded-2xl overflow-hidden border border-primary transition-all duration-500 cursor-pointer"
              >
                {/* Glow Border on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f0b100]/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-42 w-full overflow-hidden">
                    <img
                      src="https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg"
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/80 text-black ff-font-bold  text-xs font-semibold px-3 py-1 border border-[#f0b100]/30 rounded-full backdrop-blur-sm">
                      {p.category || "Pathology"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <h3 className="text-lg leading-tight ff-font-bold min-h-[48px] mb-2 line-clamp-2">
                        {p.title}
                      </h3>

                      <div className="mb-3">
                        <p className="text-sm text-black ff-font mb-2 line-clamp-2 min-h-[40px]">
                          {p.subtitle}
                        </p>

                        <div className="border-b border-[#f0b100]/20"></div>
                      </div>

                      {/* Rating & Learners */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-black whitespace-nowrap">
                          <div className="flex items-center gap-2 text-primary">
                            <FaRegStar className="w-4 h-4" />
                            <span className="font-medium ff-font text-black">
                              {p.rating || 4.5}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaUsers className="w-4 h-4 text-primary" />
                            <span className="text-black ff-font">
                              {p.total_reviews || 100}+ learners
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 border-b border-[#f0b100]/20"></div>
                      </div>

                      {/* Duration & Price */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-black ff-font">
                          {p.duration} month access
                        </p>
                        <p className="text-2xl font-bold ff-font-bold  text-black">
                          {formatCurrency(p.price, programCurrency)}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex items-center justify-between text-xs text-black mt-3 gap-3 border-t border-[#f0b100]/20 pt-3">
                        <div className="flex-1 text-center">
                          <span className="ff-font">E-certificate included</span>
                        </div>
                        <div className="flex-1 text-center">
                          <span className="ff-font">CV + CME friendly</span>
                        </div>
                        <div className="flex-1 text-center">
                          <span className="ff-font">One-time payment</span>
                        </div>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mt-3">
                      <CommonButton
                        pyClass="py-0"
                        pxClass="px-2"
                        fontWeight={700}
                        fontSize={14}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          // onCart(p);
                          router.push(`/pathology/${productId}`);
                        }}
                      >
                        Enroll Now
                      </CommonButton>
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
        >
          <FaChevronDown className="-rotate-90 w-5 h-5" />
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={450} borderRadius={16} className="rounded-xl" />
    ))}
  </div>
);

const UpcomeingProgramSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={450} borderRadius={16} className="rounded-xl" />
    ))}
  </div>
);

const FeaturedLiveSkeleton = () => {
  return (
    <div className="w-full max-w-[1025px] mx-auto bg-gray-900 text-white rounded-2xl p-6 md:p-10 mt-10">
      {/* TOP BADGES */}
      <div className="flex flex-wrap items-center justify-between text-sm mb-6">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-gray-700 rounded-full" />
          <Skeleton
            width={70}
            height={14}
            baseColor="#4b5563"
            highlightColor="#6b7280"
          />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton
            width={80}
            height={20}
            baseColor="#4b5563"
            highlightColor="#6b7280"
            borderRadius={12}
          />
          <Skeleton
            width={60}
            height={20}
            baseColor="#4b5563"
            highlightColor="#6b7280"
            borderRadius={12}
          />
        </div>
      </div>

      {/* TITLE */}
      <Skeleton
        width="60%"
        height={30}
        baseColor="#4b5563"
        highlightColor="#6b7280"
      />

      {/* INSTRUCTOR */}
      <div className="flex items-center gap-3 mt-5 mb-5">
        <Skeleton
          circle
          width={48}
          height={48}
          baseColor="#4b5563"
          highlightColor="#6b7280"
        />

        <div>
          <Skeleton
            width={120}
            height={18}
            baseColor="#4b5563"
            highlightColor="#6b7280"
          />
          <Skeleton
            width={90}
            height={14}
            baseColor="#4b5563"
            highlightColor="#6b7280"
            className="mt-1"
          />
        </div>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton
          width={90}
          height={28}
          baseColor="#4b5563"
          highlightColor="#6b7280"
          borderRadius={20}
        />
        <Skeleton
          width={110}
          height={28}
          baseColor="#4b5563"
          highlightColor="#6b7280"
          borderRadius={20}
        />
        <Skeleton
          width={80}
          height={28}
          baseColor="#4b5563"
          highlightColor="#6b7280"
          borderRadius={20}
        />
      </div>

      {/* BUTTON */}
      <Skeleton
        width={200}
        height={40}
        baseColor="#4b5563"
        highlightColor="#6b7280"
        borderRadius={10}
      />
    </div>
  );
};