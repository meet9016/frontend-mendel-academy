// USMLEPricing.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CommonButton from "@/comman/Button";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId, formatPrice, isIndia } from "@/utils/helper";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";
import { Plan, WhoEnrollData } from "../sections/WhoEnroll";

interface USMLEPricingProps {
  data: WhoEnrollData | null;
  loading: boolean;
  examCategoryId?: string;
}

const USMLEPricing = ({ data, loading, examCategoryId }: USMLEPricingProps) => {
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const backendCurrency = data?.user_currency;
  const fallbackCurrency = isIndia() ? "INR" : "USD";
  const userCurrency = backendCurrency || fallbackCurrency;

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

  const addToCart = async (plan: Plan) => {
    try {
      setLoadingPlanId(plan._id);
      const categoryId = examCategoryId || data?._id;

      if (!categoryId) {
        ErrorToast("Category ID is missing");
        return;
      }

      if (!plan._id) {
        ErrorToast("Plan ID is missing");
        return;
      }

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: categoryId,
        plan_id: plan._id,
        bucket_type: true,
      };

      const res = await api.post(`${endPointApi.postAddExamPlanToCart}`, body);

      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        
        await fetchCartItems();

        if (res.data.alreadyInCart) {
          InfoToast("This plan is already in your cart");
        } else {
          SuccessToast("Plan added to cart successfully!");
        }
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This plan is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add plan to cart");
      }
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (loading) {
    return <PricingSkeleton />;
  }

  const plans = data?.choose_plan_list || [];
  if (plans.length === 0) return null;

  return (
    <section id="pricing-section" className="py-[72px] px-6 bg-[#F7F6F1]">
      <div className="max-w-[960px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-[30px] font-black text-[#1A1A1A] mb-2">
            {data?.plan_section_title || "1. The Mendel Galaxy App"}
          </h2>
          <p className="text-sm text-[#5F5E58]">
            Precision-focused digital library for Step 1 & 2
          </p>
        </div>

        {/* Included Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A1A1A] rounded-2xl p-6 md:p-7 mb-8"
        >
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#F5C800] mb-4 text-center">
            Everything included in every plan
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              "5,500+ High-Yield Questions",
              "6 Full-Length Grand Tests",
              "Mendel Chitras (Visual Memory)",
              "Mendel Anki Flashcards",
              "Mendel Rapid Recall",
              "The Mendel Library",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-[13px] text-[#e2e8f0]">
                <div className="w-[18px] h-[18px] rounded-full bg-[#F5C800] flex items-center justify-center flex-shrink-0">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {feature}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {plans.map((plan, index) => {
            const price = userCurrency === "INR" ? plan.plan_pricing_inr : plan.plan_pricing_dollar;
            const currencySymbol = userCurrency === "INR" ? "₹" : "$";
            const isSelected = cartItems.some(item => 
              item.cart_type === 'exam_plan' && 
              (item.plan_id?._id === plan._id || item.plan_id === plan._id)
            );
            const isLoading = loadingPlanId === plan._id;

            return (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-5 md:p-6 flex flex-col text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  plan.most_popular 
                    ? "border-2 border-[#F5C800] shadow-[0_8px_32px_rgba(245,200,0,0.18)] relative" 
                    : "border border-[#E5E3DA] hover:border-[#d4a900]"
                }`}
              >
                {plan.most_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#F5C800] text-black text-[9px] font-black px-3.5 py-1 rounded-full tracking-[0.08em] whitespace-nowrap">
                      POPULAR
                    </span>
                  </div>
                )}

                <p className="text-[10px] font-extrabold tracking-[0.12em] text-[#d4a900] uppercase mb-2.5">
                  {plan.plan_type}
                </p>

                <p className="text-xl font-black text-[#1A1A1A] mb-1.5">
                  {plan.plan_month} Month{plan.plan_month && plan.plan_month > 1 ? "s" : ""}
                </p>

                <p className="text-3xl font-black text-[#F5C800] leading-none mb-1">
                  {currencySymbol}{formatPrice(price ?? 0)}
                </p>

                <div className="flex-grow flex items-center justify-center mb-4 mt-3">
                  <p className="text-xs text-[#5F5E58] leading-relaxed">
                    {plan.plan_sub_title?.[0] || "Complete exam preparation"}
                  </p>
                </div>

                <CommonButton
                  onClick={() => addToCart(plan)}
                  disabled={isLoading || isSelected}
                  className={`w-full py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                    plan.most_popular
                      ? "bg-[#1A1A1A] text-[#F5C800] hover:opacity-85"
                      : "bg-[#F5C800] text-black hover:bg-[#d4a900]"
                  }`}
                >
                  {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
                </CommonButton>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default USMLEPricing;

// Skeleton Loader
const PricingSkeleton = () => (
  <section className="py-[72px] px-6 bg-[#F7F6F1]">
    <div className="max-w-[960px] mx-auto">
      <div className="text-center mb-10">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl p-6 md:p-7 mb-8">
        <div className="h-3 bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] rounded-full bg-gray-700 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded flex-grow animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 md:p-6 h-64 animate-pulse"></div>
        ))}
      </div>
    </div>
  </section>
);
