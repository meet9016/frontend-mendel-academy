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
import { Plan, RapidTool, EliteMentorship, Tsunami, WhoEnrollData } from "../sections/WhoEnroll";
import { IoClose } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

interface USMLEPlanProps {
  data: WhoEnrollData | null;
  userCurrency: string;
  cartItems: any[];
  examCategoryId?: string;
  onUpdateCart: () => void;
}

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
    { plan_type: "SILVER", plan_month: 6, price: 499, plan_title: "Support through clinical clerkships.", most_popular: false },
    { plan_type: "GOLD", plan_month: 12, price: 699, plan_title: "Full 360-day foundation for board success.", most_popular: true },
    { plan_type: "PLATINUM", plan_month: 24, price: 999, plan_title: "Support from Day 1 of Med School.", most_popular: false },
  ];

  const rapidTools = [
    { tool_type: "Rapid Recall", price: 16.99 },
    { tool_type: "Fast Facts", price: 16.99 },
    { tool_type: "Mendel Study Notes", price: 25.00 },
    { tool_type: "Mendel Chitras", price: 16.99 },
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

          {/* Everything Included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-6 md:p-7 mb-8"
          >
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-4 text-center">
              Everything included in every plan
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                "5,500+ High-Yield Questions",
                "Mendel Chitras (Visual Memory)",
                "Mendel Flashcards",
                "6 Full-Length Grand Tests",
                "Mendel Study Notes",
                "Rapid Recall",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-[13px] text-gray-300 ff-font">
                  <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
                  <p className="text-xl font-black text-gray-900 mb-1.5 ff-font-bold">
                    {plan.plan_month} Month{plan.plan_month > 1 ? "s" : ""}
                  </p>
                  <p className="text-3xl font-black text-primary leading-none mb-1 ff-font-bold">
                    {currencySymbol}{plan.price}
                  </p>
                  <p className="text-[11px] text-gray-500 mb-4 mt-4 ff-font">{plan.plan_title}</p>
                  <div className="flex-grow"></div>
                  <button
                    onClick={() => {}}
                    disabled={isLoading || isSelected}
                    className={`w-full py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 border-none cursor-pointer ${
                      plan.most_popular ? "bg-gray-900 text-primary hover:opacity-85" : "bg-primary text-black hover:bg-opacity-90"
                    }`}
                  >
                    {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll Now"}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Rapid Learning Tools */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-[30px] font-black text-gray-900 mb-2 ff-font-bold">
                Rapid Learning Tools
              </h2>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-4 text-center">
                Available as individual add-ons
              </p>
              <p className="text-sm text-gray-300 text-center mb-8 ff-font">
                Already have a plan? Add specialty tools by subject · $16.99/month each.
              </p>

              <div className="relative px-10">
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
                  }}
                >
                  {rapidTools.map((tool, index) => (
                    <div key={index} className="p-4">
                      <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 ff-font-bold">{tool.tool_type}</h3>
                        <p className="text-3xl font-black text-gray-900 mb-4 ff-font-bold">
                          ${tool.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mb-6 ff-font">
                          per subject / month
                        </p>
                        <button
                          className="w-full py-2.5 rounded-lg bg-primary text-black text-xs font-bold cursor-pointer"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </Sliders>
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
            <div className="bg-primary/10 border-2 border-primary rounded-2xl p-4 text-center">
              <p className="text-sm font-bold text-gray-900 ff-font-bold">
                See our teaching style
              </p>
              <p className="text-xs text-gray-600 mt-1 ff-font">
                These sample lectures give you how Dr. teaches. Virtual group and 1:1 classes follow the same concept-first, visual approach.
              </p>
            </div>
          </div>

          {/* Sample Recorded Lectures */}
          <div className="mb-12">
            <Sliders
              settings={{
                dots: false,
                infinite: true,
                speed: 600,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <img src="/images/main logo.png" alt="Lecture" className="h-20 object-contain opacity-50" />
                    </div>
                    <button className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black">
                      <FaPlay size={24} className="ml-1" />
                    </button>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase">CARDIOLOGY</p>
                  </div>
                </div>
              ))}
            </Sliders>
          </div>

          {/* Individual Courses */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8">
            <div className="bg-gray-900 p-4 md:px-6">
              <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-primary">Course</p>
              <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-primary text-right -mt-5">Price</p>
            </div>
            {[
              { name: "USMLE Step 1", price: 1199 },
              { name: "USMLE Step 2 CK", price: 1499, popular: true },
              { name: "USMLE Step 3", price: 899 },
              { name: "COMLEX 1", price: 1199 },
              { name: "Shelf Exams", price: 299, perExam: true },
            ].map((course, index) => (
              <div
                key={index}
                className={`flex items-center p-4 md:px-6 gap-4 transition-colors duration-150 hover:bg-yellow-50 border-b border-gray-100 last:border-b-0 ${
                  course.popular ? "bg-yellow-50" : ""
                }`}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold text-gray-900 ff-font-bold">{course.name}</p>
                    {course.popular && (
                      <span className="px-2 py-0.5 bg-primary text-black text-[10px] font-bold rounded-full">POPULAR</span>
                    )}
                  </div>
                  {course.perExam && <p className="text-xs text-gray-500 ff-font">per exam</p>}
                </div>
                <p className="text-lg font-black text-gray-900 flex-shrink-0 min-w-[100px] text-right ff-font-bold">
                  ${course.price}
                </p>
                <button
                  className="px-6 py-2 rounded-lg bg-primary text-black text-xs font-extrabold cursor-pointer"
                >
                  Enroll
                </button>
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
              <button className="w-full py-3 rounded-lg bg-primary text-black text-xs font-bold cursor-pointer">
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
