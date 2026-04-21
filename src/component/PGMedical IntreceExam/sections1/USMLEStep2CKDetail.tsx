// USMLEStep2CKDetail.tsx
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

const USMLEStep2CKDetail = ({ data, loading = false, examCategoryId }: Props) => {
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
    <>
      {/* Hero Section */}
      <div className="bg-gray-50">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900"
        >
          {loading ? <HeroSkeleton /> : <HeroContent data={data} isSelected={isSelected} />}
        </motion.section>
      </div>

      {/* Program Features Section - HTML Template UI */}
      <section className="py-[72px] px-6 bg-[#F7F6F1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[960px] mx-auto"
        >
          <h2 className="text-[30px] font-black mb-8 text-center text-[#1A1A1A]">
            {data?.exam_name || "USMLE Step 2 CK Preparation Program"}
          </h2>
          <div className="flex flex-col gap-[10px]">
            {data?.sub_titles && data.sub_titles.length > 0 ? (
              data.sub_titles.map((feature, index) => (
                <div key={index} className="flex items-center gap-[14px] bg-white border border-[#E5E3DA] rounded-xl px-[18px] py-4 text-[15px] text-[#1A1A1A] font-medium">
                  <div className="w-[26px] h-[26px] rounded-full bg-[#F5C800] flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {feature}
                </div>
              ))
            ) : loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-[14px] bg-white border border-[#E5E3DA] rounded-xl px-[18px] py-4">
                  <div className="w-[26px] h-[26px] rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse flex-grow"></div>
                </div>
              ))
            ) : null}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default USMLEStep2CKDetail;

// Separate Hero Content Component
const HeroContent = ({ data, isSelected }: { data: Exam | null, isSelected: boolean }) => {
  if (!data) return null;

  return (
    <div className="relative mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <LeftContent data={data} isSelected={isSelected} />
        {/* <RightImage data={data} /> */}
      </div>
    </div>
  );
};

// Left Content - USMLE Step 2 CK Styled
const LeftContent = ({ data, isSelected }: { data: Exam, isSelected: boolean }) => (
  <div className="space-y-6">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
      <FaStar className="text-yellow-400" />
      <span className="text-sm font-bold text-white uppercase tracking-wide">
        {data.exam_name}
      </span>
    </div>
    
    <h1 className="text-5xl md:text-6xl lg:text-6xl font-black text-white leading-tight">
      {data.title}
    </h1>

    <div className="space-y-4">
      {data.sub_titles.map((feature, idx) => (
        <FeatureCard key={idx} text={feature} />
      ))}
    </div>

    <CTASection isSelected={isSelected} />
  </div>
);

// Feature Card - USMLE Step 2 CK Styled
const FeatureCard = ({ text }: { text: string }) => (
  <div className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400 transition-all duration-300">
    <div className="flex-shrink-0 mt-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
        <FaCheckCircle className="text-white text-sm" />
      </div>
    </div>
    <span className="text-base md:text-lg text-white font-medium leading-relaxed">
      {text}
    </span>
  </div>
);

// CTA Section - USMLE Step 2 CK Styled
const CTASection = ({ isSelected }: { isSelected: boolean }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-[2px]">
    <div className="bg-white/10 backdrop-blur-md rounded-[14px] p-5 md:p-6 space-y-4 border border-white/20">
      <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-300">
        <div className="flex items-center gap-2">
          <IoMdCall className="text-blue-400 text-base" />
          <span className="text-sm font-medium text-white">
            For more information, call
          </span>
        </div>
        <a
          href="tel:+919925511631"
          className="text-base md:text-lg font-bold text-blue-400 hover:text-blue-300"
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
        className="bg-blue-500 text-white hover:bg-blue-600"
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

// Right Image - USMLE Step 2 CK Styled
const RightImage = ({ data }: { data: Exam }) => {
  const DEFAULT_IMAGE =
    "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";

  const imageUrl = (data as Exam & { image?: string })?.image || DEFAULT_IMAGE;

  return (
    <div className="relative order-first lg:order-last">
      <div className="relative overflow-hidden rounded-3xl border-4 border-blue-500 shadow-2xl p-2 w-[550px] h-[450px] mx-auto bg-white/5 backdrop-blur-sm">
        <img
          src={imageUrl}
          alt={data.exams?.[0]?.exam_name || "Exam Image"}
          className="w-full h-full rounded-[1.5rem] object-cover shadow-2xl"
        />
      </div>
    </div>
  );
};

// Skeleton Loader - USMLE Step 2 CK Styled
const HeroSkeleton = () => (
  <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      <div className="space-y-5">
        <div className="bg-white/10 rounded-full">
          <Skeleton height={40} width={200} borderRadius={20} />
        </div>
        <div className="bg-white/10 rounded-2xl">
          <Skeleton height={80} width="100%" borderRadius={20} />
        </div>
        <div className="space-y-3 mt-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-xl">
              <Skeleton height={60} width="100%" borderRadius={12} />
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-2xl">
          <Skeleton height={120} width="100%" borderRadius={16} />
        </div>
      </div>

      <div className="relative order-first lg:order-last">
        <div className="bg-white/10 rounded-3xl">
          <Skeleton height={450} width={550} borderRadius={24} />
        </div>
      </div>
    </div>
  </div>
);
