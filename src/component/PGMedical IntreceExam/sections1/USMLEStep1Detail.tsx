// MedicalExamDetail.tsx
"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useEffect } from "react";
import CommonButton from "@/comman/Button";
import endPointApi from "@/utils/endPointApi";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId } from "@/utils/helper";
import { api } from "@/utils/axiosInstance";

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
  examCategoryId?: string;
}

const MedicalExamDetail = ({ data, loading = false, examCategoryId }: Props) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const fetchCartItems = async () => {
    try {
      const identifier = userId || tempId;
      if (!identifier) return;

      const res = await api.get(`${endPointApi.getCart}`, {
        params: { temp_id: identifier },
      });

      if (res.data.success) {
        setCartItems(res.data.cart || []);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, tempId]);

  // Check if anything from this category is already selected
  const isSelected = cartItems.some(item => {
    const itemCategoryId = item.exam_category_id?._id || item.exam_category_id;
    return itemCategoryId === examCategoryId;
  });
  return (
    <div className="bg-gray-50">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#f9fafb]"
      >
        {loading ? <HeroSkeleton /> : <HeroContent data={data} isSelected={isSelected} />}
      </motion.section>
    </div>
  );
};

export default MedicalExamDetail;

// Separate Hero Content Component
const HeroContent = ({ data, isSelected }: { data: Exam | null, isSelected: boolean }) => {
  if (!data) return null;

  return (
    <div className="py-[72px] px-6 bg-[#F7F6F1]">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-[30px] font-black mb-8 text-center text-[#1A1A1A]">
          {data.exam_name || "USMLE Step 1 Preparation Program"}
        </h2>
        <div className="flex flex-col gap-[10px]">
          {data.sub_titles.map((feature, index) => (
            <div key={index} className="flex items-center gap-[14px] bg-white border border-[#E5E3DA] rounded-xl px-[18px] py-4 text-[15px] text-[#1A1A1A] font-medium">
              <div className="w-[26px] h-[26px] rounded-full bg-[#F5C800] flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Left Content
const LeftContent = ({ data, isSelected }: { data: Exam, isSelected: boolean }) => (
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

    <CTASection isSelected={isSelected} />
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
const CTASection = ({ isSelected }: { isSelected: boolean }) => (
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
        onClick={() => {
          const pricingSection = document.getElementById('pricing-section');
          if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
        }}
        disabled={isSelected}
      >
        {isSelected ? "Selected" : "Enroll Now"} <BsArrowRight className="w-5 h-5" />
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
      <div className="relative overflow-hidden rounded-3xl border-4 border-primary shadow-2xl p-2 w-[550px] h-[450px] mx-auto">
        <img
          src={imageUrl}
          alt={data.exams?.[0]?.exam_name || "Exam Image"}
          className="w-full h-full rounded-[1.5rem] object-cover shadow-2xl"
        />
      </div>

      {/* <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 md:p-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-primary text-base" />
          <div>
            <p className="text-lg font-bold ff-font-bold leading-tight">100%</p>
            <p className="text-xs ff-font">Success Rate</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// Skeleton Loader
const HeroSkeleton = () => (
  <div className="py-[72px] px-6 bg-[#F7F6F1]">
    <div className="max-w-[960px] mx-auto">
      <div className="h-[36px] bg-gray-200 rounded-lg animate-pulse mb-8 w-80 mx-auto"></div>
      <div className="flex flex-col gap-[10px]">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-[14px] bg-white border border-[#E5E3DA] rounded-xl px-[18px] py-4">
            <div className="w-[26px] h-[26px] rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse flex-grow"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
