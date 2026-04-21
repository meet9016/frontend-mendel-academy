// USMLEEnroll.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId, formatPrice, isIndia } from "@/utils/helper";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import Sliders from "@/comman/Sliders";
import CommonButton from "@/comman/Button";
import { FaCheckCircle } from "react-icons/fa";
import { Plan, WhoEnrollData, RapidTool, EliteMentorship, Tsunami } from "../sections/WhoEnroll";

interface USMLEEnrollProps {
  data: WhoEnrollData | null;
  loading: boolean;
  examCategoryId?: string;
}

const USMLEEnroll = ({ data, loading, examCategoryId }: USMLEEnrollProps) => {
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

  const cleanHtml = DOMPurify.sanitize(data?.who_can_enroll_description || "", {
    USE_PROFILES: { html: true },
  });

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
    return <EnrollSkeleton />;
  }

  return (
    <>
      {/* Who This Course Is For - ABOVE Choose Your Plan */}
      {data?.who_can_enroll_title || data?.who_can_enroll_image ? (
        <section className="py-[72px] px-6 bg-white">
          <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="border-[3px] border-[#F5C800] rounded-2xl overflow-hidden aspect-[4/3] bg-[#111]">
                <img
                  src={data?.who_can_enroll_image || "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"}
                  alt="Medical student studying"
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <h2 className="text-[30px] font-black mb-6 usmle-text-black">
                {data?.who_can_enroll_title}
              </h2>
              {renderWhoEnrollContent(cleanHtml)}
            </div>
          </div>
        </section>
      ) : null}

      {/* Choose Your Plan - Pricing Section (USMLEPricing UI) */}
      {data?.choose_plan_list && data.choose_plan_list.length > 0 && (
        <section className="py-[72px] px-6 usmle-bg-light"> 
          <div className="max-w-[960px] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-[30px] font-black usmle-text-black mb-2">
                {data?.plan_section_title || "1. The Mendel Galaxy App"}
              </h2>
              <p className="text-sm usmle-text-gray">
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
                {data.choose_plan_list[0]?.plan_sub_title?.map((feature, index) => (
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
              {data.choose_plan_list.map((plan, index) => {
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

                    {/* {index === 0 && plan.plan_sub_title && plan.plan_sub_title.length > 0 && (
                      <ul className="space-y-3 mt-8">
                        {plan.plan_sub_title.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                            <span className="ff-font">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )} */}

                    <div className="flex-grow"></div>

                    <button
                      onClick={() => addToCart(plan)}
                      disabled={isLoading || isSelected}
                      className={`w-full py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 border-none cursor-pointer ${
                        plan.most_popular
                          ? "usmle-bg-black usmle-text-yellow hover:opacity-85"
                          : "bg-[#F5C800] text-black hover:bg-[#d4a900]"
                      }`}
                    >
                      {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Rapid Learning Tools - Full Width */}
          {data?.rapid_learning_tools && data.rapid_learning_tools.length > 0 && (
            <div className="border-t border-[#E5E3DA] pt-12 mt-12">
              <div className="max-w-[1380px] mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4 usmle-text-black">
                    {data?.rapid_tools_section_title || "Rapid Learning Tools"}
                  </h2>
                </div>
                <div>
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
                    {data.rapid_learning_tools.map((tool) => (
                      <RapidToolCard
                        key={tool._id}
                        tool={tool}
                        userCurrency={userCurrency}
                        examCategoryId={examCategoryId}
                        isSelected={cartItems.some(item => 
                          item.cart_type === 'rapid_tool' && 
                          (item.tool_id?._id === tool._id || item.tool_id === tool._id)
                        )}
                        onUpdateCart={fetchCartItems}
                      />
                    ))}
                  </Sliders>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Elite Mentorship & Bundles */}
      {(data?.elite_mentorship && data.elite_mentorship.length > 0) || data?.tsunami ? (
        <section className="py-[72px] px-6 usmle-bg-white">
          <div className="max-w-[960px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[30px] font-black usmle-text-black mb-2">
                {data?.mentorship_tsunami_section_title || "2. Elite Mentorship & Bundles"}
              </h2>
              <p className="text-sm usmle-text-gray">
                Live, physician-led coaching. Includes 1-year Galaxy App access free.
              </p>
            </div>

            {/* Individual Courses */}
            {data?.elite_mentorship && data.elite_mentorship.length > 0 && (
              <div className="bg-white border border-[#E5E3DA] rounded-2xl overflow-hidden mb-5">
                <div className="bg-[#1A1A1A] p-4 md:px-6">
                  <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#F5C800]">
                    Individual Courses
                  </p>
                  <p className="text-xs text-[#64748b] mt-1">
                    Enroll in any course individually · Includes 1-year Galaxy App access free
                  </p>
                </div>

                {data.elite_mentorship.map((mentorship, index) => {
                  const price = userCurrency === "INR" ? mentorship.price_inr : mentorship.price_usd;
                  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

                  return (
                    <div
                      key={mentorship._id || index}
                      className="flex items-center p-4 md:px-6 gap-4 transition-colors duration-150 hover:bg-[#fffbe6] border-b border-[#F7F6F1] last:border-b-0"
                    >
                      <div className="flex-grow">
                        <p className="text-sm font-extrabold text-[#1A1A1A] mb-1">
                          {mentorship.name}
                        </p>
                        {/* <p className="text-xs text-[#5F5E58]">
                          Weekly live sessions · Group mentorship
                        </p> */}
                      </div>
                      <p className="text-lg font-black text-[#1A1A1A] flex-shrink-0 min-w-[70px] text-right">
                        {currencySymbol}{formatPrice(price ?? 0)}
                      </p>
                      <MentorshipButton
                        mentorship={mentorship}
                        examCategoryId={examCategoryId}
                        cartItems={cartItems}
                        onUpdateCart={fetchCartItems}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bundles — Side by Side */}
            {data?.tsunami && data.tsunami.name && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tsunami Bundle */}
                <TsunamiBundleCard
                  tsunami={data.tsunami}
                  userCurrency={userCurrency}
                  examCategoryId={examCategoryId}
                  cartItems={cartItems}
                  onUpdateCart={fetchCartItems}
                />

                {/* Full Match Bundle */}
                {/* {data?.elite_mentorship && data.elite_mentorship.length >= 3 && ( */}
                  <FullMatchBundleCard
                    mentorships={data?.elite_mentorship?.slice(0, 3) || []}
                    userCurrency={userCurrency}
                    examCategoryId={examCategoryId}
                    cartItems={cartItems}
                    onUpdateCart={fetchCartItems}
                  />
                {/* )} */}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Designer Customized 1:1 Mentoring CTA */}
      <section className="py-[72px] px-6 usmle-bg-light">
        <div className="max-w-[960px] mx-auto">
          <div className="usmle-bg-black rounded-2xl border-2 border-[#F5C800] p-12 flex flex-col items-center justify-center text-center">
            <div className="w-[52px] h-[52px] bg-[#F5C800] rounded-xl flex items-center justify-center mb-[18px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className="text-[22px] font-black text-white mb-[10px]">
              Designer Customized 1:1 Mentoring
            </h3>
            <p className="text-sm text-[#64748b] leading-[1.75] mb-[28px] max-w-[400px]">
              For the student who requires a high-performance roadmap tailored to personal clinical strengths and weaknesses.
            </p>
            <button 
              className="bg-[#F5C800] text-black px-9 py-3.5 rounded-lg font-black text-sm border-none cursor-pointer tracking-[0.05em] transition-colors duration-150 hover:bg-[#d4a900]"
              onClick={() => window.location.href = '/contact'}
            >
              CONTACT US FOR DETAILS
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default USMLEEnroll;

// Helper: Render Who Enroll content with yellow dots
const renderWhoEnrollContent = (html: string) => {
  if (!html) return null;

  const hasListItems = html.includes('<li') || html.includes('<ul');

  if (hasListItems) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const listItems = doc.querySelectorAll('li');
    
    if (listItems.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {Array.from(listItems).map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-[15px] usmle-text-black">
              <div className="w-[8px] h-[8px] rounded-full bg-[#F5C800] flex-shrink-0"></div>
              <span>{item.textContent}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <div
      className="space-y-4 text-[15px] usmle-text-black leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Mentorship Button Component
const MentorshipButton = ({
  mentorship,
  examCategoryId,
  cartItems,
  onUpdateCart,
}: {
  mentorship: EliteMentorship;
  examCategoryId?: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const isSelected = cartItems.some(item => 
    item.cart_type === 'elite_mentorship' && 
    (item.mentorship_id?._id === mentorship._id || item.mentorship_id === mentorship._id)
  );

  const addMentorshipToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      if (!mentorship._id) {
        ErrorToast("Mentorship ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        mentorship_id: mentorship._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddEliteMentorshipToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This mentorship is already in your cart");
        } else {
          SuccessToast("Mentorship added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding mentorship to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This mentorship is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add mentorship to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addMentorshipToCart}
      disabled={isLoading || isSelected}
      className="flex-shrink-0 px-6 py-2 rounded-lg bg-[#1A1A1A] text-[#F5C800] text-xs font-extrabold border-none cursor-pointer transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
    >
      {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll")}
    </button>
  );
};

// Tsunami Bundle Card
const TsunamiBundleCard = ({
  tsunami,
  userCurrency,
  examCategoryId,
  cartItems,
  onUpdateCart,
}: {
  tsunami: Tsunami;
  userCurrency: string;
  examCategoryId?: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tsunami.included_service_price_inr : tsunami.included_service_price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item => 
    item.cart_type === 'tsunami' && 
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addTsunamiToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddTsunamiToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This program is already in your cart");
        } else {
          SuccessToast("Program added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding tsunami to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This program is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add program to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="usmle-bg-black border-2 border-[#F5C800] rounded-2xl p-8 flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#475569] mb-2">
        Step 1 + Step 2 Bundle
      </p>
      <h3 className="text-xl font-black usmle-text-yellow mb-5">
        {tsunami.name || "Mendel Tsunami"}
      </h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black text-white leading-none">
          {currencySymbol}{formatPrice(price ?? 0)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {tsunami.description?.split('\n').filter(Boolean).map((line, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <span className="usmle-text-yellow">✓</span>
            {line.trim()}
          </div>
        ))}
      </div>
      <button
        onClick={addTsunamiToCart}
        disabled={isLoading || isSelected}
        className="w-full py-3.5 rounded-lg bg-[#F5C800] text-black text-xs font-black border-none cursor-pointer tracking-[0.05em] mt-auto transition-colors duration-150 hover:bg-[#d4a900] disabled:opacity-50"
      >
        {isLoading ? "Adding..." : (isSelected ? "Selected" : "GET DUAL MASTERY")}
      </button>
    </div>
  );
};

// Full Match Bundle Card
const FullMatchBundleCard = ({
  mentorships,
  userCurrency,
  examCategoryId,
  cartItems,
  onUpdateCart,
}: {
  mentorships: EliteMentorship[];
  userCurrency: string;
  examCategoryId?: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  // Calculate total price of first 3 mentorships
  const totalPrice = mentorships.reduce((sum, mentorship) => {
    const price = userCurrency === "INR" ? mentorship.price_inr : mentorship.price_usd;
    return sum + (price ?? 0);
  }, 0);
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item => 
    item.cart_type === 'full_match' && 
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addFullMatchToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        bucket_type: true,
      };
      // Note: You'll need to create this endpoint in your backend
    //   const res = await api.post(`${endPointApi.postAddFullMatchToCart}`, body);
    //   if (res.data.success) {
    //     const identifier = userId || tempId;
    //     if (!identifier) {
    //       ErrorToast("Unable to identify user. Please log in or refresh the page.");
    //       return;
    //     }
    //     const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
    //     store.dispatch(setCartCount(countRes.data.count));
    //     if (res.data.alreadyInCart) {
    //       InfoToast("This program is already in your cart");
    //     } else {
    //       SuccessToast("Program added to cart successfully!");
    //     }
    //     await onUpdateCart();
    //   }
    } catch (error: any) {
      console.error("Error adding full match to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This program is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add program to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="usmle-bg-white border-2 usmle-border-black rounded-2xl p-8 flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase usmle-text-muted mb-2">
        Basic Science to Residency
      </p>
      <h3 className="text-xl font-black usmle-text-black uppercase mb-5">
        The Full Match
      </h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black usmle-text-black leading-none">
          {currencySymbol}{formatPrice(totalPrice)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {mentorships.map((mentorship, index) => (
          <div key={index} className="flex items-center gap-2 text-xs usmle-text-gray">
            <span className="usmle-text-yellow">✓</span>
            {mentorship.name}
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs usmle-text-gray">
          <span className="usmle-text-yellow">✓</span>
          CCS simulations
        </div>
        <div className="flex items-center gap-2 text-xs usmle-text-gray">
          <span className="usmle-text-yellow">✓</span>
          Alumnus networking
        </div>
      </div>
      <button
        onClick={addFullMatchToCart}
        disabled={isLoading || isSelected}
        className="w-full py-3.5 rounded-lg bg-transparent usmle-text-black text-xs font-black border-2 usmle-border-black cursor-pointer tracking-[0.05em] mt-auto transition-all duration-150 hover:usmle-bg-black hover:text-white disabled:opacity-50"
      >
        {isLoading ? "Adding..." : (isSelected ? "Selected" : "ENROLL IN THE MATCH")}
      </button>
    </div>
  );
};
const RapidToolCardSimple = ({
  tool,
  userCurrency,
  examCategoryId,
  cartItems,
  onUpdateCart,
}: {
  tool: RapidTool;
  userCurrency: string;
  examCategoryId?: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tool.price_inr : tool.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item => 
    item.cart_type === 'rapid_tool' && 
    (item.tool_id?._id === tool._id || item.tool_id === tool._id)
  );

  const addToolToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      if (!tool._id) {
        ErrorToast("Tool ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        tool_id: tool._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddRapidToolToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This tool is already in your cart");
        } else {
          SuccessToast("Tool added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding tool to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This tool is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add tool to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={addToolToCart}
      className="rounded-xl p-4 flex flex-col items-start gap-1 cursor-pointer transition-all duration-150 hover:bg-[#fffbe6] hover:border-[#F5C800] border border-[#E5E3DA] bg-white"
    >
      <span className="text-xs font-semibold text-[#1A1A1A]">
        {tool.tool_type}
      </span>
      <strong className="text-sm font-black">
        {currencySymbol}{formatPrice(price ?? 0)}
      </strong>
    </div>
  );
};

// Skeleton Loader
const EnrollSkeleton = () => (
  <div className="py-[72px] px-6">
    <div className="max-w-[960px] mx-auto space-y-16">
      {/* Who Enroll Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-200 rounded-2xl aspect-[4/3] animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Mentorship Skeleton */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>

      {/* Rapid Tools Skeleton */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
        <div className="grid grid-cols-5 gap-2.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Plan Card for USMLE
const PlanCardUSMLE = ({
  plan,
  userCurrency,
  isLoading,
  onEnroll,
  isSelected,
}: {
  plan: Plan;
  userCurrency: string;
  isLoading: boolean;
  onEnroll: () => void;
  isSelected?: boolean;
}) => {
  const price = userCurrency === "INR" ? plan.plan_pricing_inr : plan.plan_pricing_dollar;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  return (
    <div className={`relative bg-white border-2 rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[420px] transition-all duration-300 ${plan.most_popular ? "border-primary shadow-xl" : "border-[#e5e7eb] hover:shadow-xl hover:border-[#ffca00]"}`}>
      {plan.most_popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#ffca00] text-white ff-font-bold px-6 py-2 rounded-full text-xs font-bold shadow-lg">
            POPULAR
          </span>
        </div>
      )}

      <div className="flex flex-col flex-grow justify-between space-y-6 mt-2">
        <div className="space-y-2">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white border-primary rounded-full text-sm font-bold text-primary ff-font-bold uppercase">
              {plan.plan_type}
            </span>
          </div>

          <h3 className="text-2xl font-bold ff-font-bold text-center">
            {plan.plan_month} Month{(plan.plan_month) && (plan.plan_month) > 1 ? "s" : ""}
          </h3>

          <div className="space-y-2 text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>

          <ul className="space-y-3 mt-8">
            {plan.plan_sub_title?.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                <span className="ff-font">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <CommonButton onClick={onEnroll} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};

// Rapid Tool Card (Slider Style - same as WhoEnroll)
// Single Rapid Tool Card
const RapidToolCard = ({
  tool,
  userCurrency,
  examCategoryId,
  isSelected,
  onUpdateCart,
}: {
  tool: RapidTool;
  userCurrency: string;
  examCategoryId?: string;
  isSelected?: boolean;
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tool.price_inr : tool.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const addToolToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      if (!tool._id) {
        ErrorToast("Tool ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        tool_id: tool._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddRapidToolToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This tool is already in your cart");
        } else {
          SuccessToast("Tool added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding tool to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This tool is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add tool to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[180px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-xl font-bold ff-font-bold capitalize">{tool.tool_type}</h3>
          </div>
          <div className="text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>
        </div>
        <CommonButton onClick={addToolToCart} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};
