// MedicalExamDetail.tsx
"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CommonButton from "@/comman/Button";

// types.ts
export type SubTitle = string;

export interface Exam {
  exam_name: string;
  title: string;
  sub_titles: SubTitle[];
  exams?: {
    image?: string;
    exam_name?: string;
  }[];
}

interface Props {
  data: Exam | null;
  loading?: boolean;
}

const MedicalExamDetail = ({ data, loading = false }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative min-h-screen overflow-hidden bg-[#f9fafb]"
      >
        {loading ? <HeroSkeleton /> : <HeroContent data={data} />}
      </motion.section>
    </div>
  );
};

export default MedicalExamDetail;

// Separate Hero Content Component
const HeroContent = ({ data }: { data: Exam | null }) => {
  if (!data) return null;

  return (
    <div className="relative mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 py-10 ">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <LeftContent data={data} />
        <RightImage data={data} />
      </div>
    </div>
  );
};

// Left Content
const LeftContent = ({ data }: { data: Exam }) => (
  <div className="space-y-5">
    <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold ff-font-bold leading-tight">
      {data.exam_name}
    </h1>
    <p className="text-xl md:text-2xl font-medium ff-font">{data.title}</p>

    <div className="space-y-3">
      {data.sub_titles.map((feature, idx) => (
        <FeatureCard key={idx} text={feature} />
      ))}
    </div>

    <CTASection />
  </div>
);

// Feature Card
const FeatureCard = ({ text }: { text: string }) => (
  <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-yellow-400 transition-all duration-300">
    <div className="flex-shrink-0 mt-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border-primary">
        <FaCheckCircle className="text-primary text-sm" />
      </div>
    </div>
    <span className="text-base md:text-lg ff-font font-medium leading-relaxed">
      {text}
    </span>
  </div>
);

// CTA Section
const CTASection = () => (
  <div className="relative overflow-hidden rounded-3xl border-primary p-[3px]">
    <div className="bg-white rounded-[22px] p-5 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-700">
        <div className="flex items-center gap-2">
          <IoMdCall className="text-primary text-base" />
          <span className="text-sm ff-font-bold font-medium">
            For more information, call
          </span>
        </div>
        <a
          href="tel:+919925511631"
          className="text-base md:text-lg font-bold text-primary ff-font hover:text-yellow-500"
        >
          +91-99255-11631
        </a>
      </div>

      <CommonButton
        size="xxl"
        fontWeight={700}
        fontSize={16}
        pyClass="py-3"
        pxClass="px-10"
      >
        Enroll Now <BsArrowRight className="w-5 h-5" />
      </CommonButton>
    </div>
  </div>
);

// Right Image
const RightImage = ({ data }: { data: Exam }) => {
  // const imageUrl =
  //   data?.image ||
  //   "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";
  const DEFAULT_IMAGE =
    "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";

  const imageUrl = (data as Exam & { image?: string })?.image || DEFAULT_IMAGE;

  return (
    <div className="relative order-first lg:order-last">
      <div className="relative overflow-hidden rounded-3xl border-4 border-primary shadow-2xl p-2 w-[550px] h-[440px] mx-auto">
        <img
          src={imageUrl}
          alt={data.exams?.[0]?.exam_name || "Exam Image"}
          className="w-full h-full rounded-[1.5rem] object-cover shadow-2xl"
        />
      </div>

      <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 md:p-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-primary text-base" />
          <div>
            <p className="text-lg font-bold ff-font-bold leading-tight">100%</p>
            <p className="text-xs ff-font">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader
const HeroSkeleton = () => (
  <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      <div className="space-y-5">
        <Skeleton height={150} width="100%" borderRadius={20} />
        <div className="space-y-1 mt-5">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} height={50} width="100%" borderRadius={10} />
          ))}
        </div>
        <Skeleton height={150} width="100%" borderRadius={20} />
      </div>

      <div className="relative order-first lg:order-last">
        <Skeleton height={440} width={550} borderRadius={24} />
        <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 w-[150px]">
          <Skeleton height={50} width={100} />
        </div>
      </div>
    </div>
  </div>
);
