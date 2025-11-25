"use client";
import CommonButton from "@/comman/Button";
import { getData } from "@/redux/dataSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { FaStar, FaUsers, FaClock, FaArrowRight } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

/* ----------  TYPES  ---------- */
type Program = {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  total_reviews: number;
  price: number;
  duration: string;
  category: string;
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

/* ----------  HOOK  (same fetch)  ---------- */
const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllPreRecorded}`);

        if (res?.data?.data?.length) setPrograms(res.data.data);
      } catch {
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { programs, loading };
};

/* ----------  UTILS  (same tempId + cart)  ---------- */
const getTempId = () => {
  let tempId = sessionStorage.getItem("temp_id");
  if (!tempId) {
    tempId =
      "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("temp_id", tempId);
  }
  return tempId;
};

const addToCart = async (item: Program) => {
  const body = {
    temp_id: getTempId(),
    product_id: item.id,
    category_name: item.category,
    price: item.price,
    quantity: 1,
    duration: item.duration,
  };
  const res = await api.post(`${endPointApi.postCreateAddToCart}`, body);
  if (res.data.success) toast.success(res.data.message);
};

/* ----------  MAIN PAGE  ---------- */
export default function AdvancedPathologyPrograms() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { programs, loading } = usePrograms();

  const upcomingProgram = {
    title: "MENDEL MASTERY SERIES™: BRAIN TUMORS",
    description: "Advanced CNS pathology and molecular markers",
    waitlist: 1200,
    progress: 79,
    duration: "6-week program",
    startDays: "Early access",
  };

  const { loadings, list } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4 md:px-6 lg:px-8 py-15">
      {/* ----  TITLE  ---- */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl md:text-3xl font-extrabold ff-font-bold">
          Advanced Pathology
        </h1>
        <h1 className="text-4xl md:text-3xl font-extrabold ff-font-bold">
          Programs
        </h1>
      </div>
      <div className="text-center mt-4 ff-font text-base md:text-lg">
        <p>
          Specialized training designed by pathology experts to advance your
          diagnostic
        </p>
        <p>expertise and clinical knowledge.</p>
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

      {/* ----  RECORDED  ---- */}
      <Section
        title="Recorded Programs"
        subtitle="Self-paced learning with lifetime access"
      >
        {loading ? (
          <ProgramSkeleton />
        ) : (
          <RecordedGrid programs={programs} onCart={addToCart} />
        )}
      </Section>

      {/* ----  UPCOMING  ---- */}
      <Section
        title="Upcoming Programs"
        subtitle="Join the waitlist and get early access"
      >
        <UpcomingGrid program={upcomingProgram} />
      </Section>
    </main>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const FeaturedLive = ({
  onMore,
  data,
}: {
  onMore: () => void;
  data: ProgramData | undefined;
}) => {
  return (
    <div className="w-full max-w-[1025px] mx-auto bg-gray-900 text-white rounded-2xl p-6 md:p-10 mt-10 shadow-lg hover:shadow-xl transition-shadow">
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

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section className="w-full max-w-[1025px] mx-auto mt-10">
    <div className="mb-6 text-left">
      <h2 className="text-2xl font-bold ff-font-bold">{title}</h2>
      <p className="ff-font text-sm">{subtitle}</p>
    </div>
    {children}
  </section>
);

const RecordedGrid = ({
  programs,
  onCart,
}: {
  programs: Program[];
  onCart: (p: Program) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {programs.map((p) => (
      <div
        key={p.id}
        className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition"
      >
        <div className="relative h-32">
          <img
            src="https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg"
            alt={p.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 flex items-center bg-white/90 px-2 py-0.5 rounded-full">
            <FaStar className="text-primary w-3 h-3 mr-1" />
            <span className="text-xs font-semibold">{p.rating}</span>
          </div>
          <div className="absolute bottom-2 right-2 ff-font-bold flex items-center bg-white/90 px-2 py-0.5 rounded-full">
            <span className="text-xs font-semibold">
              {p.total_reviews}+ learners
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="font-bold ff-font-bold text-sm mb-1 line-clamp-2 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.4rem",
              height: "2.8rem",
            }}
          >
            {p.title}
          </h3>
          <p
            className="text-xs ff-font mb-3 overflow-hidden text-ellipsis line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.2rem",
              height: "2.4rem",
            }}
          >
            {p.subtitle}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs ff-font">{p.duration} month access</p>
              <p className="text-sm font-bold ff-font-bold">${p.price}</p>
            </div>
            <CommonButton
              pyClass="py-0"
              pxClass="px-2"
              fontWeight={700}
              fontSize={14}
              onClick={() => onCart(p)}
            >
              Add to cart
            </CommonButton>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const UpcomingGrid = ({ program }: { program: Record<string, any> }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="group from-gray-100 to-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md hover:-translate-y-1 transition relative"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl" />
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-bold px-2 py-1 bg-white text-primary ff-font rounded-md uppercase">
            LAUNCHING SOON
          </div>
          <GiSparkles className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold ff-font-bold mb-2">{program.title}</h3>
        <div className="bg-gray-100 rounded-md p-2 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm ff-font">
              <FaUsers className="text-primary" />
              {program.waitlist.toLocaleString()}
            </div>
            <span className="text-primary font-bold">{program.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
            <div
              className="bg-[#FFCA00] h-1.5 rounded-full"
              style={{ width: `${program.progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2 mb-3">
          <FaClock className="text-primary" />
          <div>
            <p className="text-xs font-semibold ff-font">
              Starts in {program.startDays} days
            </p>
            <p className="text-[10px] ff-font">{program.duration}</p>
          </div>
        </div>
        <p className="text-xs ff-font-bold mb-4">{program.description}</p>
        <CommonButton
          pyClass="py-0"
          pxClass="px-16"
          fontWeight={600}
          fontSize={13}
          className="ff-font-bold"
        >
          Join Waitlist
        </CommonButton>
        <p className="text-[11px] ff-font text-center mt-2">
          No payment now · Email reminder before launch
        </p>
      </div>
    ))}
  </div>
);

/* ----------  SKELETON  ---------- */
const ProgramSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
    {[...Array(8)].map((_, i) => (
      <Skeleton key={i} height={300} borderRadius={16} className="rounded-xl" />
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
          <Skeleton width={70} height={14} baseColor="#4b5563" highlightColor="#6b7280" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton width={80} height={20} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={12} />
          <Skeleton width={60} height={20} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={12} />
        </div>
      </div>

      {/* TITLE */}
      <Skeleton width="60%" height={30} baseColor="#4b5563" highlightColor="#6b7280" />

      {/* INSTRUCTOR */}
      <div className="flex items-center gap-3 mt-5 mb-5">
        <Skeleton circle width={48} height={48} baseColor="#4b5563" highlightColor="#6b7280" />

        <div>
          <Skeleton width={120} height={18} baseColor="#4b5563" highlightColor="#6b7280" />
          <Skeleton width={90} height={14} baseColor="#4b5563" highlightColor="#6b7280" className="mt-1" />
        </div>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton width={90} height={28} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={20} />
        <Skeleton width={110} height={28} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={20} />
        <Skeleton width={80} height={28} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={20} />
      </div>

      {/* BUTTON */}
      <Skeleton width={200} height={40} baseColor="#4b5563" highlightColor="#6b7280" borderRadius={10} />
    </div>
  );
};

