"use client";

import React, { useState } from "react";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId, formatPrice } from "@/utils/helper";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";
import { motion } from "framer-motion";
import Sliders from "@/comman/Sliders";
import { Plan, RapidTool, EliteMentorship, Tsunami, WhoEnrollData, SampleRecordedLecture } from "../sections/WhoEnroll";
import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

interface USMLEPlanProps {
  data: WhoEnrollData | null;
  userCurrency: string;
  cartItems: any[];
  examCategoryId?: string;
  onUpdateCart: () => void;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-md hover:opacity-90 transition-opacity border-none"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-[-14px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-md hover:opacity-90 transition-opacity border-none"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
};

const USMLEPlan = ({ data, userCurrency, cartItems, examCategoryId, onUpdateCart }: USMLEPlanProps) => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [selectedRapidTool, setSelectedRapidTool] = useState<RapidTool | null>(null);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const addToCart = async (plan: Plan) => {
    try {
      setLoadingPlanId(plan._id);
      const categoryId = examCategoryId || data?._id;
      if (!categoryId) { ErrorToast("Category ID is missing"); return; }
      if (!plan._id) { ErrorToast("Plan ID is missing"); return; }

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: categoryId,
        plan_id: plan._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddExamPlanToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        await onUpdateCart();
        res.data.alreadyInCart ? InfoToast("This plan is already in your cart") : SuccessToast("Plan added to cart successfully!");
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        InfoToast("This plan is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add plan to cart");
      }
    } finally {
      setLoadingPlanId(null);
    }
  };

  // Static data for the design
  const plans = [
    { plan_type: "ESSENTIAL", plan_month: 1, price: 309, plan_title: "Intensive polish for the last 30 days of prep.", most_popular: false },
    { plan_type: "STANDARD", plan_month: 3, price: 429, plan_title: "Mastery of core organ systems.", most_popular: false },
    { plan_type: "SILVER", plan_month: 6, price: 449, plan_title: "Support through clinical clerkships.", most_popular: false },
    { plan_type: "GOLD", plan_month: 12, price: 499, plan_title: "Full 365-day foundation for board success.", most_popular: true },
    { plan_type: "PLATINUM", plan_month: 24, price: 699, plan_title: "Support from Day 1 of Med School.", most_popular: false },
  ];

  const rapidTools = [
    { tool_type: "Mendel Chitras", price: 16.99 },
    { tool_type: "Mendel Flashcards", price: 16.99 },
    { tool_type: "Recorded Lectures", price: 16.99 },
    { tool_type: "Mendel Qbanks", price: 16.99 },
    { tool_type: "Mendel Qbanks", price: 16.99 },
    { tool_type: "Mendel Qbanks", price: 16.99 },
  ];

  return (
    <>
      {/* 1. The Mendel Galaxy App */}
      <section className="py-[72px] px-6 bg-white">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[30px] font-black text-gray-900 mb-2 ff-font-bold">
              1. The Mendel Galaxy App
            </h2>
            <p className="text-sm text-gray-600 ff-font">Your complete USMLE Step 1 prep, in one app.</p>
          </div>

          <div className="bg-[#FAF9F6] border border-gray-200 rounded-[32px] p-6 sm:p-10 shadow-sm">
            {/* Everything Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#1c1c1c] rounded-2xl p-6 md:p-8 mb-10"
            >
              <p className="text-[14px] font-black tracking-[0.05em] uppercase text-primary mb-2 text-center ff-font-bold">
                EVERYTHING INCLUDED IN EVERY PLAN
              </p>
              <p className="text-[13px] text-white text-center mb-8 ff-font">
                Every Mendel plan includes all six core study tools.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 max-w-[700px] mx-auto pl-4">
                {[
                  "5,500+ High-Yield Questions",
                  "6 Full-Length Grand Tests",
                  "Mendel Chitras (Visual Memory)",
                  "Mendel Flashcards",
                  "Rapid Recall",
                  "The Mendel Study Notes",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-[13px] text-gray-100 ff-font font-medium">
                    <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6.5l2 2 4-4" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {plans.map((plan, index) => {
                const currencySymbol = userCurrency === "INR" ? "₹" : "$";
                const isSelected = cartItems.some(item =>
                  item.cart_type === "exam_plan" &&
                  item.plan_id?.plan_type === plan.plan_type
                );
                const isLoading = false;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-2xl p-5 md:p-6 flex flex-col text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg min-h-[250px] border border-gray-200 ${
                      plan.most_popular ? "border-primary shadow-[0_8px_32px_rgba(245,200,0,0.18)] relative" : ""
                    }`}
                  >
                    {plan.most_popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-black text-[9px] font-black px-3.5 py-1 rounded-full tracking-[0.08em] whitespace-nowrap">
                          POPULAR
                        </span>
                      </div>
                    )}
                    <p className="text-[10px] font-extrabold tracking-[0.12em] text-primary uppercase mb-2.5">{plan.plan_type}</p>
                    <p className="text-[17px] font-black text-gray-900 mb-1.5 ff-font-bold">
                      {plan.plan_month} Month{plan.plan_month > 1 ? "s" : ""}
                    </p>
                    <p className="text-[28px] font-black text-primary leading-none mb-1 ff-font-bold">
                      {currencySymbol}{plan.price}
                    </p>
                    <p className="text-[10px] text-gray-500 mb-4 mt-3 ff-font px-2">{plan.plan_title}</p>
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => {}}
                      disabled={isLoading || isSelected}
                      className={`w-full py-2 rounded-md text-[11px] font-extrabold transition-all duration-150 border-none cursor-pointer ff-font-bold ${
                        plan.most_popular ? "bg-[#1c1c1c] text-primary hover:opacity-85" : "bg-[#FFCA00] text-gray-900 hover:bg-opacity-90"
                      }`}
                      style={plan.most_popular ? undefined : { backgroundColor: "#FFCA00" }}
                    >
                      {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll Now"}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Rapid Learning Tools */}
            <div className="mt-16">
              <div className="text-center mb-6">
                <h2 className="text-[24px] font-black text-gray-900 mb-2 ff-font-bold">
                  Rapid Learning Tools
                </h2>
              </div>

              <div className="bg-[#1c1c1c] rounded-2xl p-8">
                <p className="text-[12px] font-black tracking-[0.05em] uppercase text-primary mb-3 text-center ff-font-bold">
                  AVAILABLE AS INDIVIDUAL ADD-ONS
                </p>
                <p className="text-[13px] text-white text-center mb-8 ff-font">
                  Already have a plan? Add specialty tools by subject — $16.99/month each.
                </p>

                <div className="relative px-3">
                  <Sliders
                    settings={{
                      accessibility: true,
                      infinite: true,
                      speed: 500,
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      autoplay: true,
                      autoplaySpeed: 3000,
                      arrows: true,
                      nextArrow: <NextArrow />,
                      prevArrow: <PrevArrow />,
                    }}
                  >
                    {rapidTools.map((tool, index) => (
                      <div key={index} className="px-2">
                        <div className="bg-white rounded-xl p-5 flex flex-col text-left h-[170px] justify-between">
                          <h3 className="text-[13px] font-bold text-gray-900 mb-2 ff-font-bold leading-tight pr-4">{tool.tool_type}</h3>
                          <div>
                            <p className="text-[22px] font-black text-gray-900 mb-0.5 ff-font-bold">
                              $ {tool.price.toFixed(2)}
                            </p>
                            <p className="text-[9px] text-gray-500 mb-4 ff-font">
                              per subject / month
                            </p>
                            <button
                              className="w-full py-2 rounded text-gray-900 bg-primary text-[11px] font-bold cursor-pointer ff-font-bold"
                              style={{ backgroundColor: "#FFCA00" }}
                            >
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Sliders>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Elite Mentorship & Bundles */}
      <section className="py-[72px] px-6 bg-gray-50">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[30px] font-black text-gray-900 mb-2 ff-font-bold">
              2. Elite Mentorship & Bundles
            </h2>
            <p className="text-sm text-gray-600 ff-font">
              Live, physician-led coaching. Includes 1-year Galaxy App access free.
            </p>
          </div>

          {/* See Our Teaching Style */}
          <div className="mb-10">
            <div className="bg-[#FFF7D6] border-2 border-primary rounded-2xl p-6 text-center">
              <p className="text-base font-black text-gray-900 mb-2 ff-font-bold">
                See our teaching style
              </p>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto ff-font">
                These sample lectures give you a feel for how Dr. Managoli teaches. Virtual group and 1:1 classes follow the same concept-first, visual approach.
              </p>
            </div>
          </div>

          {/* Sample Recorded Lectures */}
          {data?.sample_recorded_lectures && data.sample_recorded_lectures.length > 0 && (
            <div className="mb-12">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-6 ff-font-bold">
                Sample recorded lectures
              </p>
              {(() => {
                const lectures = data.sample_recorded_lectures;

                if (lectures.length <= 3) {
                  return (
                    <div className="grid grid-cols-3 gap-6">
                      {lectures.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="bg-[#d4d4d4] rounded-t-xl overflow-hidden aspect-[16/9] flex flex-col relative border border-gray-400 border-b-0">
                            <div className="flex-[1.2] flex items-center justify-center pt-2 relative z-0">
                              <img src="/images/main logo.png" alt="Lecture" className="h-10 object-contain opacity-80" />
                            </div>
                            <div className="w-full h-7 bg-[#1A1A1A] flex items-center justify-between px-6 relative z-10">
                              <p className="text-white text-[10px] ff-font truncate max-w-[40%]">{item.strip_left}</p>
                              <button 
                                onClick={() => item.video_link && window.open(item.video_link, "_blank")}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5C800] flex items-center justify-center shadow-lg z-20 hover:scale-105 transition-transform border border-yellow-400 cursor-pointer"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="black" className="ml-1">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </button>
                              <p className="text-white text-[10px] ff-font truncate text-right max-w-[40%]">{item.strip_right}</p>
                            </div>
                            <div className="flex-[1.5] flex items-center justify-center gap-3 bg-[#b5b5b5] relative z-0">
                              <div className="w-10 h-10 bg-gray-600 rounded flex flex-shrink-0 items-center justify-center overflow-hidden shadow-sm">
                                <img src="/images/main logo.png" alt="Profile" className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left">
                                <p className="text-gray-900 text-[11px] font-black ff-font-bold">Dr. Kishore Managoli, MD</p>
                                <p className="text-gray-800 text-[9px] font-bold ff-font">Founder & CEO</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#1c1c1e] rounded-b-xl p-4 flex-1">
                            <p className="text-[9px] font-bold text-gray-500 uppercase mb-1.5 ff-font-bold">{item.subject || "CARDIOLOGY"}</p>
                            <p className="text-[13px] font-bold text-white ff-font-bold leading-snug">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <Sliders
                    settings={{
                      dots: false,
                      infinite: lectures.length > 3,
                      speed: 600,
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      arrows: true,
                    }}
                  >
                    {lectures.map((item, i) => (
                      <div key={i} className="p-3">
                        <div className="bg-[#d4d4d4] rounded-t-xl overflow-hidden aspect-[16/9] flex flex-col relative border border-gray-400 border-b-0">
                          <div className="flex-[1.2] flex items-center justify-center pt-2 relative z-0">
                            <img src="/images/main logo.png" alt="Lecture" className="h-10 object-contain opacity-80" />
                          </div>
                          <div className="w-full h-7 bg-[#1A1A1A] flex items-center justify-between px-6 relative z-10">
                            <p className="text-white text-[10px] ff-font truncate max-w-[40%]">{item.strip_left}</p>
                            <button 
                              onClick={() => item.video_link && window.open(item.video_link, "_blank")}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5C800] flex items-center justify-center shadow-lg z-20 hover:scale-105 transition-transform border border-yellow-400 cursor-pointer"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="black" className="ml-1">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                            <p className="text-white text-[10px] ff-font truncate text-right max-w-[40%]">{item.strip_right}</p>
                          </div>
                          <div className="flex-[1.5] flex items-center justify-center gap-3 bg-[#b5b5b5] relative z-0">
                            <div className="w-10 h-10 bg-gray-600 rounded flex flex-shrink-0 items-center justify-center overflow-hidden shadow-sm">
                              <img src="/images/main logo.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                              <p className="text-gray-900 text-[11px] font-black ff-font-bold">Dr. Kishore Managoli, MD</p>
                              <p className="text-gray-800 text-[9px] font-bold ff-font">Founder & CEO</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#1c1c1e] rounded-b-xl p-4">
                          <p className="text-[9px] font-bold text-gray-500 uppercase mb-1.5 ff-font-bold">{item.subject || "CARDIOLOGY"}</p>
                          <p className="text-[13px] font-bold text-white ff-font-bold leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Sliders>
                );
              })()}
            </div>
          )}

          {/* Individual Courses */}
          <div className="mb-12">
            <div className="bg-[#1A1A1A] px-4 md:px-8 py-4 grid grid-cols-[1fr_auto_1fr] items-center rounded-t-md gap-4">
              <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-primary">COURSE</p>
              <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-primary text-center w-28 mx-auto">PRICE</p>
              <div></div>
            </div>
            {[
              { name: "USMLE Step 1", price: "1,199" },
              { name: "USMLE Step 2 CK", price: "1,499", popular: true },
              { name: "USMLE Step 3", price: "899" },
              { name: "COMLEX 1", price: "1,199" },
              { name: "Shelf Exams", price: "299", perExam: true },
            ].map((course, index, arr) => (
              <div
                key={index}
                className={`px-4 md:px-8 py-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-gray-200 ${
                  index === arr.length - 1 ? 'border-b-2' : ''
                } ${
                  course.popular ? "bg-[#FFF9E6]" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <p className="text-base font-black text-gray-900 ff-font-bold">{course.name}</p>
                  {course.popular && (
                    <span className="px-2.5 py-0.5 bg-primary text-black text-[10px] font-bold rounded-full ff-font-bold">POPULAR</span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 justify-start whitespace-nowrap w-28 mx-auto">
                  <p className="text-xl font-black text-gray-900 ff-font-bold">
                    ${course.price}
                  </p>
                  {course.perExam && <p className="text-[11px] text-gray-500 ff-font">/exam</p>}
                </div>
                <div className="flex justify-end">
                  <button
                    className={`px-6 py-2 rounded text-[11px] font-bold cursor-pointer w-[88px] text-center shadow-sm ff-font-bold ${
                      course.popular ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-[#FFCA00] text-gray-900 hover:opacity-90"
                    }`}
                    style={course.popular ? undefined : { backgroundColor: "#FFCA00" }}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Bundle</p>
              <h3 className="text-xl font-black text-gray-900 mb-2 ff-font-bold">Tsunami Bundle</h3>
              <p className="text-sm text-gray-600 mb-4 ff-font">Step 1 + Step 2 CK — the complete board sequence.</p>
              <p className="text-4xl font-black text-gray-900 mb-6 ff-font-bold">$2,235</p>
              <button className="w-full py-3 rounded-lg bg-primary text-black text-xs font-bold cursor-pointer ff-font-bold" style={{ backgroundColor: "#FFCA00" }}>
                Enroll Now
              </button>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-primary">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-2">Bundle</p>
              <h3 className="text-xl font-black text-gray-900 mb-2 ff-font-bold">Full Match Bundle</h3>
              <p className="text-sm text-gray-600 mb-4 ff-font">Step 1 + Step 2 CK + Step 3 — from boards to match.</p>
              <p className="text-4xl font-black text-gray-900 mb-6 ff-font-bold">$2,995</p>
              <button className="w-full py-3 rounded-lg bg-gray-900 text-primary text-xs font-bold cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default USMLEPlan;
