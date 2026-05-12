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

  return (
    <>
      {/* Choose Your Plan */}
      {data?.is_plan_visible !== false && data?.choose_plan_list && data.choose_plan_list.length > 0 && (
        <section id="pricing" className="py-[72px] px-6 bg-[#f9fafb]">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
                {data?.plan_section_title || "Choose Your Plan"}
              </h2>
              <p className="text-sm usmle-text-gray ff-font">Precision-focused digital library for Step 1 & 2</p>
            </div>

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
                  <div key={index} className="flex items-center gap-2 text-[13px] text-[#e2e8f0] ff-font">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#F5C800] flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data.choose_plan_list.map((plan, index) => {
                const price = userCurrency === "INR" ? plan.plan_pricing_inr : plan.plan_pricing_dollar;
                const currencySymbol = userCurrency === "INR" ? "₹" : "$";
                const isSelected = cartItems.some(item =>
                  item.cart_type === "exam_plan" &&
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
                    className={`bg-white rounded-2xl p-5 md:p-6 flex flex-col text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg min-h-[250px] ${plan.most_popular
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
                    <p className="text-[10px] font-extrabold tracking-[0.12em] text-[#d4a900] uppercase mb-2.5">{plan.plan_type}</p>
                    <p className="text-xl font-black text-[#1A1A1A] mb-1.5 ff-font-bold">
                      {plan.plan_month} Month{plan.plan_month && plan.plan_month > 1 ? "s" : ""}
                    </p>
                    <p className="text-3xl font-black text-[#F5C800] leading-none mb-1 ff-font-bold">
                      {currencySymbol}{formatPrice(price ?? 0)}
                    </p>
                    {plan.plan_title && (
                      <p className="text-[11px] text-[#64748b] mb-4 mt-4 ff-font">{plan.plan_title}</p>
                    )}
                    <div className="flex-grow"></div>
                    <button
                      onClick={() => addToCart(plan)}
                      disabled={isLoading || isSelected}
                      className={`w-full py-2.5 rounded-lg text-xs font-extrabold transition-all duration-150 border-none cursor-pointer ${plan.most_popular
                        ? "bg-gray-900 usmle-text-yellow hover:opacity-85"
                        : "bg-[#F5C800] text-black hover:bg-[#d4a900]"
                        }`}
                    >
                      {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll Now"}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Learning Video Section */}
          <LearningVideoSection />

          {/* Rapid Learning Tools */}
          {data?.is_rapid_tools_visible !== false && data?.rapid_learning_tools && data.rapid_learning_tools.length > 0 && (
            <div className="border-t border-[#E5E3DA] pt-12 mt-10">
              <div className="max-w-[1380px] mx-auto">
                <div className="text-center mb-3">
                  <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
                    {data?.rapid_tools_section_title || "Rapid Learning Tools"}
                  </h2>
                </div>
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
                    {data.rapid_learning_tools.map((tool) => (
                      <RapidToolCard
                        key={tool._id}
                        tool={tool}
                        userCurrency={userCurrency}
                        examCategoryId={examCategoryId}
                        isSelected={cartItems.some(item =>
                          item.cart_type === "rapid_tool" &&
                          (item.tool_id?._id === tool._id || item.tool_id === tool._id)
                        )}
                        onUpdateCart={onUpdateCart}
                        onOpenPopup={(tool) => setSelectedRapidTool(tool)}
                      />
                    ))}
                  </Sliders>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Popup Modal */}
      {selectedRapidTool && (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          {/* Modal */}
          <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#111] ff-font-bold">
                {selectedRapidTool?.tool_type}
              </h3>

              <button
                onClick={() => setSelectedRapidTool(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white text-black flex items-center justify-center transition-all duration-300"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Slider Images */}
            <div className="p-5 bg-[#fafafa]">

              <Sliders
                settings={{
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: true,
                }}
              >


                {/* Image 2 */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center h-[500px]">
                    <img
                      src="/images/main logo.png"
                      alt="Rapid Tool"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>


                {/* Image 1 */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center h-[500px]">
                    <img
                      src="/images/11.jpg"
                      alt="Rapid Tool"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

              </Sliders>

            </div>
          </div>
        </div>
      )}

      {/* Elite Mentorship & Tsunami Program */}
      {(data?.elite_mentorship && data.elite_mentorship.length > 0) || data?.tsunami ? (
        <section className="py-[72px] px-6 usmle-bg-white">
          <div className="max-w-[960px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
                {data?.mentorship_tsunami_section_title || "Elite Mdsentorshsdsdip & Tsunami Program"}
              </h2>
              <p className="text-sm usmle-text-gray ff-font">Live, physician-led coaching. Includes 1-year Galaxy App access free.</p>
            </div>

            {data?.elite_mentorship && data.elite_mentorship.length > 0 && (
              <div className="bg-white border border-[#E5E3DA] rounded-2xl overflow-hidden mb-5">
                <div className="bg-black p-4 md:px-6">
                  <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#F5C800]">Individual Courses</p>
                  <p className="text-xs text-[#64748b] mt-1">Enroll in any course individually · Includes 1-year Galaxy App access free</p>
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
                        <p className="text-sm font-extrabold text-[#1A1A1A] mb-1 ff-font-bold">{mentorship.name}</p>
                        {mentorship.subtitle && (
                          <p className="text-xs text-[#64748b] ff-font">{mentorship.subtitle}</p>
                        )}
                      </div>
                      <p className="text-lg font-black text-[#1A1A1A] flex-shrink-0 min-w-[70px] text-right ff-font-bold">
                        {currencySymbol}{formatPrice(price ?? 0)}
                      </p>
                      <MentorshipButton
                        mentorship={mentorship}
                        examCategoryId={examCategoryId}
                        cartItems={cartItems}
                        onUpdateCart={onUpdateCart}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {data?.tsunami && data.tsunami.name && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TsunamiBundleCard
                  tsunami={data.tsunami}
                  userCurrency={userCurrency}
                  examCategoryId={examCategoryId}
                  cartItems={cartItems}
                  onUpdateCart={onUpdateCart}
                />
                <FullMatchBundleCard
                  mentorships={data?.elite_mentorship?.slice(0, 3) || []}
                  userCurrency={userCurrency}
                  examCategoryId={examCategoryId}
                  cartItems={cartItems}
                  onUpdateCart={onUpdateCart}
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Designer Customized 1:1 Mentoring CTA */}
      <section className="py-[72px] px-6 bg-[#f9fafb]">
        <div className="max-w-[960px] mx-auto ">
          <div className="usmle-bg-black bg-gray-900 rounded-2xl border-2 border-[#F5C800] p-12 flex flex-col items-center justify-center text-center">
            <div className="w-[52px] h-[52px] bg-[#F5C800] rounded-xl flex items-center justify-center mb-[18px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-[22px] font-black text-white mb-[10px] ff-font-bold">
              Designer Customized 1:1 Mentoring
            </h3>
            <p className="text-sm text-[#64748b] leading-[1.75] mb-[28px] max-w-[400px] ff-font">
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

export default USMLEPlan;

// Rapid Tool Card
const RapidToolCard = ({
  tool, userCurrency, examCategoryId, isSelected, onUpdateCart, onOpenPopup,
}: {
  tool: RapidTool; userCurrency: string; examCategoryId?: string; isSelected?: boolean; onUpdateCart: () => void; onOpenPopup: (tool: RapidTool) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tool.price_inr : tool.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const addToolToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
      if (!tool._id) { ErrorToast("Tool ID is missing"); return; }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        tool_id: tool._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddRapidToolToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        res.data.alreadyInCart ? InfoToast("This tool is already in your cart") : SuccessToast("Tool added to cart successfully!");
        await onUpdateCart();
      }
    } catch (error: any) {
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

      className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[180px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div
          onClick={() => onOpenPopup(tool)}
          className="space-y-2 text-center">
          <h3 className="text-xl font-bold ff-font-bold capitalize">{tool.tool_type}</h3>
          <p className="text-3xl ff-font-bold font-bold text-primary">{currencySymbol} {formatPrice(price ?? 0)}</p>
          <p
            onClick={() => onOpenPopup(tool)}
            className="text-sm  cursor-pointer ff-font duration-300 line-clamp-2"
          >
            Quick revision tools designed to improve retention and boost exam.
          </p>
        </div>
        <button
          onClick={addToolToCart}
          disabled={isLoading || isSelected}
          className="w-full py-2.5 rounded-lg bg-[#F5C800] text-black text-xs font-extrabold border-none cursor-pointer mt-4 hover:bg-[#d4a900] disabled:opacity-50"
        >
          {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};


const LearningVideoSection = () => {
  const videos = [
    "https://www.youtube.com/embed/VaSjiJMrq24?si=1a9h6aUSQo7uOwYT",
    "https://www.youtube.com/embed/VaSjiJMrq24?si=1a9h6aUSQo7uOwYT",
    "https://www.youtube.com/embed/VaSjiJMrq24?si=1a9h6aUSQo7uOwYT",
  ];
  return (
    <div className="max-w-[1380px] mx-auto mb-16 mt-16 px-4 overflow-hidden">
      <Sliders
        settings={{
          dots: false,
          infinite: true,
          speed: 600,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: true,
        }}
      >
        {videos.map((video, index) => (
          <div key={index}>
            {/* Video Wrapper */}
            <div className="rounded-[32px] overflow-hidden leading-none ">
              <iframe
                className="w-full h-[300px] md:h-[550px] block"
                src={video}
                title={`Learning Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </Sliders>
    </div>
  );
};

// Mentorship Button
const MentorshipButton = ({
  mentorship, examCategoryId, cartItems, onUpdateCart,
}: {
  mentorship: EliteMentorship; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const isSelected = cartItems.some(item =>
    item.cart_type === "elite_mentorship" &&
    (item.mentorship_id?._id === mentorship._id || item.mentorship_id === mentorship._id)
  );

  const addMentorshipToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
      if (!mentorship._id) { ErrorToast("Mentorship ID is missing"); return; }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        mentorship_id: mentorship._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddEliteMentorshipToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        res.data.alreadyInCart ? InfoToast("This mentorship is already in your cart") : SuccessToast("Mentorship added to cart successfully!");
        await onUpdateCart();
      }
    } catch (error: any) {
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
      {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll"}
    </button>
  );
};

// Tsunami Bundle Card
const TsunamiBundleCard = ({
  tsunami, userCurrency, examCategoryId, cartItems, onUpdateCart,
}: {
  tsunami: Tsunami; userCurrency: string; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tsunami.included_service_price_inr : tsunami.included_service_price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item =>
    item.cart_type === "tsunami" &&
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addTsunamiToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddTsunamiToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        res.data.alreadyInCart ? InfoToast("This program is already in your cart") : SuccessToast("Program added to cart successfully!");
        await onUpdateCart();
      }
    } catch (error: any) {
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
    <div className="usmle-bg-black border-2 border-[#F5C800] rounded-2xl p-8 flex flex-col bg-gray-900">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#475569] mb-2">Step 1 + Step 2 Bundle</p>
      <h3 className="text-xl font-black usmle-text-yellow mb-5 ff-font-bold">{tsunami.name || "Mendel Tsunami"}</h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black text-white leading-none ff-font-bold">{currencySymbol}{formatPrice(price ?? 0)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {tsunami.description?.split("\n").filter(Boolean).map((line, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-[#94a3b8] ff-font">
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
        {isLoading ? "Adding..." : isSelected ? "Selected" : "GET DUAL MASTERY"}
      </button>
    </div>
  );
};

// Full Match Bundle Card
const FullMatchBundleCard = ({
  mentorships, userCurrency, examCategoryId, cartItems, onUpdateCart,
}: {
  mentorships: EliteMentorship[]; userCurrency: string; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const totalPrice = mentorships.reduce((sum, m) => {
    const price = userCurrency === "INR" ? m.price_inr : m.price_usd;
    return sum + (price ?? 0);
  }, 0);
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item =>
    item.cart_type === "full_match" &&
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addFullMatchToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
    } catch (error: any) {
      ErrorToast(error.response?.data?.message || "Failed to add program to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="usmle-bg-white border-2 usmle-border-black rounded-2xl p-8 flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase usmle-text-muted mb-2">Basic Science to Residency</p>
      <h3 className="text-xl font-black usmle-text-black uppercase mb-5 ff-font-bold">The Full Match</h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black usmle-text-black leading-none ff-font-bold">{currencySymbol}{formatPrice(totalPrice)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {mentorships.map((m, index) => (
          <div key={index} className="flex items-center gap-2 text-xs usmle-text-gray ff-font">
            <span className="usmle-text-yellow">✓</span>
            {m.name}
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs usmle-text-gray ff-font"><span className="usmle-text-yellow">✓</span>CCS simulations</div>
        <div className="flex items-center gap-2 text-xs usmle-text-gray ff-font"><span className="usmle-text-yellow">✓</span>Alumnus networking</div>
      </div>
      <button
        onClick={addFullMatchToCart}
        disabled={isLoading || isSelected}
        className="w-full py-3.5 rounded-lg bg-transparent usmle-text-black text-xs font-black border-2 usmle-border-black cursor-pointer tracking-[0.05em] mt-auto transition-all duration-150 hover:usmle-bg-black hover:text-white disabled:opacity-50"
      >
        {isLoading ? "Adding..." : isSelected ? "Selected" : "ENROLL IN THE MATCH"}
      </button>
    </div>
  );
};
