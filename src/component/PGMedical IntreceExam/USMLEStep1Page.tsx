"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId } from "@/utils/helper";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";
import {
  FaPlay,
  FaTimes,
  FaArrowRight
} from "react-icons/fa";
import {
  FiClock,
  FiTarget,
  FiLayers,
  FiBookOpen,
  FiZap
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const DEFAULT_TOOLS = [
  {
    title: "Mendel QBank",
    desc: "Tutor and exam modes, custom blocks, and Understand the why after every question.",
    tag: "CORE QUESTION BANK"
  },
  {
    title: "Mendel Chitras",
    desc: "853 illustrated one-page visual summaries covering pathophysiology to memory hacks.",
    tag: "VISUAL MEMORY"
  },
  {
    title: "Mendel Flashcards",
    desc: "Spaced repetition that schedules reviews for you based on mastery curve.",
    tag: "SPACED REPETITION"
  },
  {
    title: "Mendel Study Notes",
    desc: "2,300+ concise notes organized systematically by organ system and discipline.",
    tag: "HIGH YIELD NOTES"
  },
  {
    title: "Rapid Recall",
    desc: "High-yield diagnostic and pharmacology tables engineered for last-minute review.",
    tag: "LAST MINUTE DRILLS"
  },
  {
    title: "Fast Facts",
    desc: "Clinical mnemonics that explain the core mechanism, not just abbreviate words.",
    tag: "SMART MNEMONICS"
  },
];

const DEFAULT_PLANS = [
  {
    duration: "1 month",
    price: "$309",
    pm: "$309 / mo",
    popular: false,
    badge: null,
    desc: "Last-mile intensive practice.",
  },
  {
    duration: "3 months",
    price: "$429",
    pm: "≈ $143 / mo",
    popular: false,
    badge: null,
    desc: "Organ system mastery cycle.",
  },
  {
    duration: "6 months",
    price: "$449",
    pm: "≈ $75 / mo",
    popular: false,
    badge: null,
    desc: "Extended pre-dedicated prep.",
  },
  {
    duration: "12 months",
    price: "$499",
    pm: "≈ $42 / mo",
    popular: true,
    badge: "BEST VALUE",
    desc: "Complete 365-day board foundation.",
  },
  {
    duration: "24 months",
    price: "$699",
    pm: "≈ $29 / mo",
    popular: false,
    badge: null,
    desc: "Day 1 preclinical to board exam.",
  },
];

const DEFAULT_FAQS = [
  {
    q: "Is USMLE Step 1 pass/fail?",
    a: "Yes. USMLE Step 1 has reported pass/fail outcomes only since January 26, 2022. Step 2 CK and Step 3 still report a three-digit score. Mendel Academy’s Self-Assessments estimate how ready you are to pass with statistical confidence intervals."
  },
  {
    q: "What is the Mendel Academy USMLE Step 1 program?",
    a: "It is a concept-first USMLE Step 1 prep program delivered in the Mendel Galaxy app. It includes a QBank, Mendel Chitras, flashcards, study notes, Rapid Recall and Fast Facts, plus analytics and NBME-style Self-Assessments."
  },
  {
    q: "How much does Mendel Academy Step 1 prep cost?",
    a: "App plans range from $309 for 1 month to $699 for 24 months; the 12-month plan is $499. Every plan includes all six study tools and three Self-Assessments in total. Live Step 1 mentorship is $1,199 and includes one year of app access."
  },
  {
    q: "How many Self-Assessments are included?",
    a: "Self-Assessment 1 is free for everyone, with no purchase needed. Every Mendel Galaxy app plan adds Self-Assessments 2 and 3, so plan members get three in total. Self-Assessment 4 is available separately. Each is an NBME-style, exam-paced test of 280 questions with a predicted score and percentile."
  },
  {
    q: "What is Understand the why in the Mendel QBank?",
    a: "Understand the why is the explanation after every Mendel QBank question. Triage paraphrases the question down to what it is really asking, Core Mechanism explains the science, Peel the Reasoning reveals the logic one clue at a time down to the core principle, and The Trap breaks down the dangerous distractors and how to duck them. It closes with the educational objective, the question writer’s intent and a Mendel Hack to remember it."
  },
  {
    q: "What is a Mendel Chitra?",
    a: "A Mendel Chitra is a hand-illustrated, one-page visual summary of a medical topic, covering definition, pathophysiology, presentation, workup, management and memory hacks."
  },
  {
    q: "Is Mendel Academy good for IMGs and DO students?",
    a: "Yes. The program is specifically built for preclinical MD students, international medical graduates (IMGs) and DO students taking USMLE Step 1."
  },
  {
    q: "Which devices does the Mendel Galaxy app work on?",
    a: "The Mendel Galaxy app works on iPhone, iPad and on the web from any desktop or laptop."
  }
];

export default function USMLEStep1Page() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [dynamicPlans, setDynamicPlans] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string>("6985b8b5d437d2fd889564e1");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchStep1Content = async () => {
      try {
        const res = await api.get(`${endPointApi.getMedicalById}/usmle-step-1`);
        if (res.data) {
          if (res.data._id) {
            setCategoryId(res.data._id);
          }
          if (res.data.usmle_step1_detail && typeof res.data.usmle_step1_detail === "object") {
            setDynamicData(res.data.usmle_step1_detail);
          }
          if (Array.isArray(res.data.choose_plan_list) && res.data.choose_plan_list.length > 0) {
            setDynamicPlans(res.data.choose_plan_list);
          }
        }
      } catch (err) {
        console.error("Could not fetch dynamic USMLE Step 1 content:", err);
      }
    };
    fetchStep1Content();
  }, []);

  const handleChoosePlan = async (p: any, idx: number) => {
    const key = `plan-${idx}`;
    try {
      setLoadingKey(key);
      const userId = getAuthId();
      const tempId = getTempId();
      const planId = p._id || p.duration;

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: categoryId,
        plan_id: planId,
        bucket_type: true,
      };

      const res = await api.post(`${endPointApi.postAddExamPlanToCart}`, body);
      if (res.data?.success) {
        if (res.data.alreadyInCart) {
          InfoToast(res.data.message || "Plan already in cart");
        } else {
          SuccessToast(res.data.message || "Plan added to cart successfully!");
        }

        const identifier = userId || tempId;
        if (identifier) {
          try {
            const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
            if (countRes.data?.count !== undefined) {
              store.dispatch(setCartCount(countRes.data.count));
            }
          } catch (e) {
            console.error("Error refreshing cart count:", e);
          }
        }

        window.dispatchEvent(new Event("openCart"));
      } else {
        ErrorToast(res.data?.message || "Failed to add plan to cart");
      }
    } catch (error: any) {
      console.error("Error adding plan to cart:", error);
      ErrorToast(error?.response?.data?.message || "Failed to add plan to cart");
    } finally {
      setLoadingKey(null);
    }
  };

  const handleEnrollMentorship = async (item: { id: string; name: string; price?: string; subtitle?: string }, key: string) => {
    try {
      setLoadingKey(key);
      const userId = getAuthId();
      const tempId = getTempId();
      const priceNum = parseFloat(String(item.price || '').replace(/[^0-9.]/g, '')) || 0;

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: categoryId,
        mentorship_id: item.id || item.name,
        name: item.name,
        subtitle: item.subtitle,
        price_usd: priceNum,
        bucket_type: true,
      };

      const res = await api.post(`${endPointApi.postAddEliteMentorshipToCart}`, body);
      if (res.data?.success) {
        if (res.data.alreadyInCart) {
          InfoToast(res.data.message || "Item already in cart");
        } else {
          SuccessToast(res.data.message || "Item added to cart successfully!");
        }

        const identifier = userId || tempId;
        if (identifier) {
          try {
            const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
            if (countRes.data?.count !== undefined) {
              store.dispatch(setCartCount(countRes.data.count));
            }
          } catch (e) {
            console.error("Error refreshing cart count:", e);
          }
        }

        window.dispatchEvent(new Event("openCart"));
      } else {
        ErrorToast(res.data?.message || "Failed to add to cart");
      }
    } catch (error: any) {
      console.error("Error adding mentorship to cart:", error);
      ErrorToast(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingKey(null);
    }
  };

  // Section data helpers with defaults
  const hero = dynamicData?.hero || {};
  const tour = dynamicData?.tour || {};
  const ready = dynamicData?.ready || {};
  const pricing = dynamicData?.pricing || {};
  const mentorship = dynamicData?.mentorship || {};
  const testimonials = dynamicData?.testimonials?.list || [
    {
      quote: "“The Chitras changed how I think about disease mechanisms. I stopped memorizing and started understanding.”",
      author: "Riaa S.",
      credential: "Matched Internal Medicine"
    },
    {
      quote: "“As an IMG, I needed a structured approach. The explanations teach you to think, not just recall.”",
      author: "Arjun M.",
      credential: "IMG · Matched Neurology"
    },
    {
      quote: "“Dr. Managoli’s mentorship rebuilt my approach. Rapid Recall saved me the week before the exam.”",
      author: "Priya K.",
      credential: "Matched Psychiatry"
    }
  ];
  const faqs = dynamicData?.faqs?.list || DEFAULT_FAQS;
  const cta = dynamicData?.cta || {};
  const rawTools = dynamicData?.tools?.list || DEFAULT_TOOLS;

  const toolIcons = [
    <FiTarget key="1" className="w-5 h-5 text-black" />,
    <FiLayers key="2" className="w-5 h-5 text-black" />,
    <FiZap key="3" className="w-5 h-5 text-black" />,
    <FiBookOpen key="4" className="w-5 h-5 text-black" />,
    <FiClock key="5" className="w-5 h-5 text-black" />,
    <HiOutlineSparkles key="6" className="w-5 h-5 text-black" />
  ];

  const tools = rawTools.map((t: any, idx: number) => ({
    ...t,
    icon: toolIcons[idx % toolIcons.length]
  }));

  // Plans computation
  const plans = (dynamicData?.pricing?.plans && dynamicData.pricing.plans.length > 0)
    ? dynamicData.pricing.plans.map((p: any) => {
        const monthNum = parseInt(String(p.duration).replace(/\D/g, ''), 10);
        const matchedDbPlan = dynamicPlans.find((dp: any) => dp.plan_month === monthNum);
        return {
          ...p,
          _id: matchedDbPlan?._id || p._id
        };
      })
    : (dynamicPlans && dynamicPlans.length > 0)
      ? dynamicPlans.map((p: any) => ({
          _id: p._id,
          duration: `${p.plan_month} month${p.plan_month > 1 ? 's' : ''}`,
          price: p.plan_pricing_dollar ? `$${p.plan_pricing_dollar}` : `$${p.plan_pricing_inr || 0}`,
          pm: p.plan_pricing_dollar ? `≈ $${Math.round(p.plan_pricing_dollar / (p.plan_month || 1))} / mo` : '',
          popular: Boolean(p.most_popular),
          badge: p.most_popular ? "BEST VALUE" : null,
          desc: p.plan_title || (p.plan_month === 12 ? "Complete 365-day board foundation." : p.plan_month === 1 ? "Last-mile intensive practice." : `${p.plan_month}-month board preparation.`),
        }))
      : DEFAULT_PLANS;

  const otherCourses = mentorship.other_courses || [
    { name: "USMLE Step 2 CK", badge: "Popular", price: "$1,499", link: "/auth/register?mentorship=step-2-ck" },
    { name: "USMLE Step 3", badge: "", price: "$899", link: "/auth/register?mentorship=step-3" },
    { name: "COMLEX 1", badge: "", price: "$1,199", link: "/auth/register?mentorship=comlex-1" },
    { name: "Shelf exams", badge: "/ per exam", price: "$299", link: "/auth/register?mentorship=shelf" }
  ];

  const bundles = mentorship.bundles || [
    {
      tag: "Bundle",
      name: "Tsunami Bundle",
      subtitle: "Step 1 + Step 2 CK live mentorship",
      price: "$2,235",
      link: "/auth/register?bundle=tsunami"
    },
    {
      tag: "Bundle · Boards to Match",
      name: "Full Match Bundle",
      subtitle: "Step 1 + Step 2 CK + Step 3 complete pathway",
      price: "$2,995",
      link: "/auth/register?bundle=full-match"
    }
  ];

  const featuredMentorship = mentorship.featured || {
    badge: "THIS PAGE’S EXAM",
    name: "USMLE Step 1 Mentorship",
    subtitle: "High-yield group mentorship with Dr. Managoli",
    price: "$1,199",
    features: [
      "Live virtual group classes",
      "Concept-first, visual teaching",
      "1-year Mendel Galaxy app access included"
    ],
    btn_text: "Enroll in Step 1 Mentorship",
    btn_link: "/auth/register?mentorship=usmle-step-1"
  };

  // Split headline to highlight word if present
  const heroTitle = hero.title || "Step 1, simplified.";
  const heroHighlight = hero.highlight || "simplified.";
  const heroParts = heroTitle.includes(heroHighlight)
    ? heroTitle.split(heroHighlight)
    : [heroTitle, ""];

  // Split tour headline to highlight word if present
  const tourTitle = tour.title || "Practice it. Understand the why. Track it.";
  const tourHighlight = tour.title_highlight || "the why";
  const tourParts = tourTitle.includes(tourHighlight)
    ? tourTitle.split(tourHighlight)
    : [tourTitle, ""];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1915] ff-font">

      {/* ================= BREADCRUMB ================= */}
      <nav aria-label="Breadcrumb" className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-5 pb-3">
        <ol className="flex items-center flex-wrap gap-2 text-xs text-gray-500 font-medium ff-font">
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/services" className="hover:text-black transition-colors">PG Medical Entrance Exams</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-black font-semibold ff-font-bold" aria-current="page">USMLE Step 1</li>
        </ol>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-[#FFF2C2] px-3 py-1 rounded-full mb-4 ff-font-bold">
              {hero.eyebrow || "USMLE STEP 1 PREP"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight text-gray-950 leading-[1.08] mb-5 ff-font-bold">
              {heroParts[0]}
              {heroHighlight && <span className="text-primary">{heroHighlight}</span>}
              {heroParts[1]}
            </h1>

            <p className="text-base sm:text-lg lg:text-[19px] text-gray-600 leading-relaxed mb-8 max-w-xl ff-font">
              {hero.subtitle || "QBank, illustrated Chitras, flashcards and notes in one app, with analytics that tell you when you’re ready."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href={hero.trial_btn_link || "/auth/register?offer=self-assessment"}
                className="bg-primary hover:bg-[#F0BF00] text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5 ff-font-bold"
              >
                <span>{hero.trial_btn_text || "Try a free Self-Assessment"}</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="#tour"
                className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-black text-gray-800 hover:text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-2.5 shadow-2xs ff-font-bold"
              >
                <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-black">
                  <FaPlay className="w-2 h-2 ml-0.5 text-black" />
                </div>
                <span>{hero.tour_btn_text || "Watch the app tour"}</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-medium ff-font">
              {hero.meta_text || "For MD students, DO students and IMGs · iPhone, iPad and web"}
            </p>
          </div>

          {/* Right Column: Hero Art (Phone Mockup in Light Theme) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-10 rounded-full bg-primary/20 blur-3xl -z-10 opacity-70 pointer-events-none"
            />

            {/* Phone Shell */}
            <div className="relative w-[300px] sm:w-[320px] bg-white rounded-[44px] p-3 shadow-2xl border-4 border-gray-900 ring-8 ring-black/5">

              {/* Dynamic Island / Speaker */}
              <div className="w-24 h-4 bg-gray-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-950/70 border border-gray-800" />
              </div>

              {/* Screen Content */}
              <div className="bg-[#FAF9F5] rounded-[32px] p-4 sm:p-5 flex flex-col gap-3.5 text-left border border-gray-200/60">

                {/* Header Greeting */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 ff-font-bold tracking-tight">
                    {hero.mockup_greeting || "Good morning"}
                  </h3>
                  <div className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1.5 ff-font">
                    <span>{hero.mockup_exam_badge || "USMLE Step 1"}</span>
                    <span>·</span>
                    <span className="text-[#9A7300] font-bold ff-font-bold">{hero.mockup_days_left || "109 days left"}</span>
                  </div>
                </div>

                {/* Tile 1: Stuck at learning */}
                <div className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-2xs flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded w-max ff-font-bold">
                    {hero.mockup_tile1_tag || "Stuck at learning"}
                  </span>
                  <p className="text-sm font-bold text-gray-900 ff-font-bold">
                    {hero.mockup_tile1_title || "Musculoskeletal & Skin"}
                  </p>
                  <div className="flex gap-1 h-1.5 w-full my-0.5">
                    <span className="flex-[3] bg-emerald-500 rounded-full" />
                    <span className="flex-[3] bg-amber-500 rounded-full" />
                    <span className="flex-[4] bg-primary rounded-full" />
                  </div>
                  <Link
                    href="/auth/register"
                    className="bg-primary hover:bg-[#F0BF00] text-black font-bold text-xs py-2 rounded-xl text-center transition-colors block mt-0.5 ff-font-bold"
                  >
                    {hero.mockup_tile1_btn || "Start 7 questions"}
                  </Link>
                </div>

                {/* Tile 2: Self-Assessment */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-3.5 shadow-2xs flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-white/70 px-2 py-0.5 rounded w-max ff-font-bold">
                    Self-Assessment
                  </span>
                  <p className="text-sm font-bold text-gray-900 ff-font-bold">
                    Are you ready to pass?
                  </p>
                  <p className="text-[11px] text-gray-600 leading-snug ff-font">
                    280 questions · exam-paced · first one free
                  </p>
                </div>

                {/* Tile 3: Weekly Tracker */}
                <div className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-2xs">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 ff-font-bold">
                    <span>This week</span>
                    <span className="text-emerald-700 font-bold">2 of 7 days</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    <span className="h-5 rounded-md bg-gray-200/80" />
                    <span className="h-5 rounded-md bg-emerald-500" />
                    <span className="h-5 rounded-md bg-emerald-700" />
                    <span className="h-5 rounded-md bg-white border-2 border-primary ring-1 ring-primary/40" />
                    <span className="h-5 rounded-md bg-gray-100" />
                    <span className="h-5 rounded-md bg-gray-100" />
                    <span className="h-5 rounded-md bg-gray-100" />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TOUR SECTION ================= */}
      <section id="tour" className="bg-[#F4F3ED] border-y border-gray-200 py-16 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-white border border-[#EADB96] px-3.5 py-1 rounded-full mb-3 shadow-2xs ff-font-bold">
              {tour.eyebrow || "A LOOK INSIDE · 3-MINUTE TOUR"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight ff-font-bold">
              {tourParts[0]}
              {tourHighlight && <span className="text-primary">{tourHighlight}</span>}
              {tourParts[1]}
            </h2>
          </div>

          {/* Interactive Player Showcase Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">

            {/* 3 Phone Screens in a Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">

              {/* Phone 1: QBank Tutor */}
              <div className="bg-[#FAF9F5] border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col h-full">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 ff-font-bold">
                  <span className="bg-gray-200/70 px-2 py-0.5 rounded text-gray-700">{tour.phone1_tag || "Pharmacology · Tutor"}</span>
                  <span className="text-gray-400">{tour.phone1_badge || "Step 1"}</span>
                </div>

                <p className="text-xs sm:text-[13px] text-gray-800 font-medium leading-relaxed mb-3 ff-font">
                  {tour.phone1_question || "A patient with type 1 diabetes has poor post-meal control on regular insulin and is switched to a rapid-acting analog. What explains its faster peak?"}
                </p>

                <div className="space-y-1.5 mb-4 ff-font">
                  <div className="border border-gray-200 bg-white rounded-lg p-2 text-xs text-gray-600">
                    {tour.phone1_option_a || "A. Shifted isoelectric point"}
                  </div>
                  <div className="border border-gray-200 bg-white rounded-lg p-2 text-xs text-gray-600">
                    {tour.phone1_option_b || "B. Added fatty acid chain"}
                  </div>
                  <div className="border border-gray-200 bg-white rounded-lg p-2 text-xs text-gray-600">
                    {tour.phone1_option_c || "C. Protamine added for crystals"}
                  </div>
                  <div className="border-2 border-emerald-500 bg-emerald-50 rounded-lg p-2 text-xs font-bold text-emerald-950 flex items-center justify-between ff-font-bold">
                    <span>{tour.phone1_option_d || "D. Altered B-chain C-terminus"}</span>
                    <span className="text-emerald-700">✓</span>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] ff-font">
                  <span className="text-gray-400 font-medium">Question 1 of 5</span>
                  <span className="text-[#9A7300] font-bold ff-font-bold cursor-pointer hover:underline">See explanation ↓</span>
                </div>
              </div>

              {/* Phone 2: Understand the Why */}
              <div className="bg-[#FAF9F5] border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col h-full">
                <div className="text-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 bg-gray-200/70 px-2.5 py-0.5 rounded ff-font-bold">
                    TRIAGE
                  </span>
                </div>

                <p className="text-[11px] text-center text-gray-700 leading-snug mb-3 ff-font">
                  {tour.phone2_triage || "Post-meal spikes on regular insulin → rapid analog → why the fast peak?"}
                </p>

                <div className="bg-[#FFF8DF] border border-[#F5DE88] rounded-xl p-2.5 mb-3 text-xs font-bold text-gray-900 leading-snug ff-font-bold">
                  <span className="text-[#9A7300] mr-1">✓</span> {tour.phone2_mechanism || "Altered B-chain C-terminus prevents hexamers"}
                </div>

                <div className="text-center mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 ff-font-bold">
                    PEEL THE REASONING
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-gray-700 mb-3 ff-font">
                  <div className="flex items-start gap-1.5">
                    <b className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] shrink-0 font-bold text-black ff-font-bold">1</b>
                    <span>{tour.phone2_step1 || "Clinical: needs a fast post-meal peak"}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <b className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] shrink-0 font-bold text-black ff-font-bold">2</b>
                    <span>{tour.phone2_step2 || "Drug: lispro, aspart, glulisine"}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <b className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] shrink-0 font-bold text-black ff-font-bold">3</b>
                    <span>{tour.phone2_step3 || "Kinetics: regular insulin forms hexamers"}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <b className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] shrink-0 font-bold text-black ff-font-bold">4</b>
                    <span>{tour.phone2_step4 || "Mechanism: B-chain swap blocks hexamers"}</span>
                  </div>
                </div>

                <div className="mt-auto bg-white border border-gray-200 rounded-xl p-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7300] block mb-0.5 ff-font-bold">
                    MENDEL HACK
                  </span>
                  <p className="text-[11px] text-gray-800 ff-font">
                    {tour.phone2_hack || "“Lispro swaps LYSine and PROline.”"}
                  </p>
                </div>
              </div>

              {/* Phone 3: Accuracy & Analytics */}
              <div className="bg-[#FAF9F5] border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col h-full">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 ff-font-bold">
                  ACCURACY TREND
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900 ff-font-bold">{tour.phone3_accuracy || "58%"}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full ff-font-bold">
                    ↗ {tour.phone3_trend || "+11 pts"}
                  </span>
                </div>

                {/* SVG Accuracy Trend Graph */}
                <div className="w-full h-24 mb-4 relative">
                  <svg viewBox="0 0 240 90" className="w-full h-full">
                    <line x1="0" y1="30" x2="240" y2="30" stroke="#E5E4DE" strokeDasharray="3 4" />
                    <path
                      d="M0 72 L30 66 L60 68 L90 58 L120 60 L150 46 L180 44 L210 36 L240 30"
                      fill="none"
                      stroke="#FFC72C"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="240" cy="30" r="5" fill="#FFC72C" stroke="#fff" strokeWidth="2" />
                  </svg>
                </div>

                {/* Discipline Bars */}
                <div className="space-y-2.5 text-xs ff-font">
                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1 text-[11px]">
                      <span>Pharmacology</span>
                      <span className="font-bold text-gray-900 ff-font-bold">71%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "71%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1 text-[11px]">
                      <span>Pathology</span>
                      <span className="font-bold text-gray-900 ff-font-bold">54%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "54%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-gray-700 mb-1 text-[11px]">
                      <span>Biochemistry</span>
                      <span className="font-bold text-gray-900 ff-font-bold">38%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "38%" }} />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-3 text-[10px] text-gray-400 text-right ff-font">
                  Sample data
                </div>
              </div>

            </div>

            {/* Central Video CTA Overlay/Bar */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="w-12 h-12 rounded-full bg-primary hover:bg-[#F0BF00] flex items-center justify-center text-black shadow-md hover:scale-105 transition-all shrink-0 cursor-pointer"
                  aria-label="Play tour video"
                >
                  <FaPlay className="w-4 h-4 ml-0.5 text-black" />
                </button>
                <div>
                  <h4 className="text-base font-bold text-gray-900 ff-font-bold">
                    {tour.card_title || "Watch the 3-minute app tour"}
                  </h4>
                  <p className="text-xs text-gray-500 ff-font">
                    {tour.card_subtitle || "See QBank, Chitras, Flashcards and Self-Assessments in action."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="bg-black hover:bg-gray-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ff-font-bold"
              >
                {tour.card_btn_text || "Play video tour"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TOOLS SECTION ================= */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-[#FFF2C2] px-3 py-1 rounded-full mb-3 ff-font-bold">
              {dynamicData?.tools?.eyebrow || "WHAT’S INCLUDED"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight ff-font-bold">
              {dynamicData?.tools?.title || "Six study tools. One subscription."}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-sm ff-font">
            {dynamicData?.tools?.subtitle || "Everything you need for comprehensive preclinical mastery and high-confidence board preparation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-primary transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF6D4] group-hover:bg-primary transition-colors flex items-center justify-center">
                    {t.icon}
                  </div>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded ff-font-bold">
                    {t.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 ff-font-bold">
                  {t.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed ff-font">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-gray-900 group-hover:text-primary transition-colors ff-font-bold">
                <span>Included in all plans</span>
                <span className="ml-1 text-primary">✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= READY SECTION ================= */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="bg-gradient-to-r from-[#FFF9E6] via-[#FFFDF5] to-[#FFF4CC] border-2 border-primary/50 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A7300] bg-white/80 border border-[#E9DA97] px-3 py-1 rounded-full mb-3 inline-block ff-font-bold">
              {ready.badge || "PREDICTED READINESS"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-3 ff-font-bold">
              {ready.title || "Know if you’re ready to pass."}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed ff-font">
              {ready.description || "Step 1 is pass/fail. Our NBME-style Self-Assessments give you a predicted score and percentile, so you know how far above the line you are. Your first one is free, and every plan adds two more."}
            </p>
          </div>

          <Link
            href={ready.btn_link || "/auth/register?offer=trial"}
            className="bg-primary hover:bg-[#F0BF00] text-black font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-sm transition-all hover:scale-105 whitespace-nowrap text-center shrink-0 ff-font-bold"
          >
            {ready.btn_text || "Start 5-day free trial"}
          </Link>
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing" className="bg-white border-t border-gray-200 py-16 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">

          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-[#FFF2C2] px-3 py-1 rounded-full mb-3 ff-font-bold">
              {pricing.eyebrow || "PRICING"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight mb-3 ff-font-bold">
              {pricing.title || "Every tool, every plan."}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 ff-font">
              {pricing.subtitle || "All six study tools and 3 Self-Assessments with every plan. Longer plans cost less per month."}
            </p>
          </div>

          {/* 5 Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {plans.map((p: any, idx: number) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 flex flex-col text-center transition-all duration-200 shadow-2xs relative ${p.popular
                  ? "border-2 border-primary shadow-lg ring-4 ring-primary/20 hover:-translate-y-1"
                  : "border border-gray-200 hover:border-gray-400 hover:shadow-md"
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black font-bold text-[9px] tracking-widest px-3 py-1 rounded-full uppercase shadow-xs whitespace-nowrap ff-font-bold">
                    {p.badge}
                  </div>
                )}

                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ff-font-bold">
                  {p.duration}
                </h3>

                <div className="text-3xl sm:text-4xl font-black text-gray-950 ff-font-bold tracking-tight mb-1">
                  {p.price}
                </div>

                <div className="text-xs text-gray-400 font-medium mb-3 ff-font">
                  {p.pm}
                </div>

                <p className="text-xs text-gray-600 mb-6 flex-1 ff-font">
                  {p.desc}
                </p>

                <button
                  type="button"
                  onClick={() => handleChoosePlan(p, idx)}
                  disabled={loadingKey === `plan-${idx}`}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ff-font-bold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${p.popular
                    ? "bg-primary hover:bg-[#F0BF00] text-black shadow-xs"
                    : "bg-gray-100 hover:bg-black hover:text-white text-gray-900"
                    }`}
                >
                  {loadingKey === `plan-${idx}` ? "Adding..." : "Choose"}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8 ff-font">
            {pricing.disclaimer || "All prices in USD. Immediate access upon enrollment. Cancel anytime."}
          </p>

        </div>
      </section>

      {/* ================= MENTORSHIP SECTION ================= */}
      <section id="mentorship" className="bg-[#F5F4EE] border-y border-gray-200 py-16 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">

          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-white border border-[#EADB96] px-3.5 py-1 rounded-full mb-3 shadow-2xs ff-font-bold">
              {mentorship.eyebrow || "LIVE MENTORSHIP"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight mb-3 ff-font-bold">
              {mentorship.title || "Prefer to learn live?"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 ff-font">
              {mentorship.subtitle || "Physician-led coaching with Dr. Kishore Managoli, MD. Every course includes one year of the Mendel Galaxy app free."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">

            {/* Featured Left Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#FFFDF0] to-white border-2 border-primary rounded-3xl p-8 sm:p-9 flex flex-col justify-between shadow-md relative">
              <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-primary px-3 py-1 rounded-full w-max mb-4 ff-font-bold">
                {featuredMentorship.badge || "THIS PAGE’S EXAM"}
              </span>

              <div>
                <h3 className="text-2xl font-black text-gray-950 ff-font-bold mb-1">
                  {featuredMentorship.name || "USMLE Step 1 Mentorship"}
                </h3>
                <p className="text-xs text-gray-500 mb-4 ff-font">
                  {featuredMentorship.subtitle || "High-yield group mentorship with Dr. Managoli"}
                </p>

                <div className="text-4xl sm:text-5xl font-black text-gray-950 ff-font-bold mb-6">
                  {featuredMentorship.price || "$1,199"}
                </div>

                <ul className="space-y-3 text-sm text-gray-700 mb-8 ff-font">
                  {(featuredMentorship.features || [
                    "Live virtual group classes",
                    "Concept-first, visual teaching",
                    "1-year Mendel Galaxy app access included"
                  ]).map((feat: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-black text-xs font-bold shrink-0 ff-font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleEnrollMentorship(
                    {
                      id: "usmle-step-1",
                      name: featuredMentorship.name || "USMLE Step 1 Mentorship",
                      price: featuredMentorship.price || "$1,199",
                      subtitle: featuredMentorship.subtitle || "High-yield group mentorship with Dr. Managoli"
                    },
                    "featured"
                  )
                }
                disabled={loadingKey === "featured"}
                className="w-full bg-primary hover:bg-[#F0BF00] text-black font-bold py-3.5 rounded-xl shadow-xs text-center transition-all text-sm ff-font-bold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingKey === "featured"
                  ? "Adding..."
                  : featuredMentorship.btn_text || "Enroll in Step 1 Mentorship"}
              </button>
            </div>

            {/* Right Side: Courses & Bundles */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Other Mentorship Courses Table */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-2xs">
                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4 ff-font-bold">
                  Other mentorship courses
                </h4>

                <div className="divide-y divide-gray-100">
                  {otherCourses.map((oc: any, ocIdx: number) => (
                    <div key={ocIdx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900 ff-font-bold">{oc.name}</span>
                        {oc.badge && (
                          <span className="text-[10px] font-bold bg-[#FFF2C2] text-[#9A7300] px-2 py-0.5 rounded-full ff-font-bold">
                            {oc.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm text-gray-900 ff-font-bold">{oc.price}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const courseSlug = oc.link?.includes("mentorship=")
                              ? oc.link.split("mentorship=")[1]
                              : oc.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            handleEnrollMentorship(
                              {
                                id: courseSlug || oc.name,
                                name: oc.name,
                                price: oc.price,
                                subtitle: oc.badge || "Live Mentorship Course"
                              },
                              `other-${ocIdx}`
                            );
                          }}
                          disabled={loadingKey === `other-${ocIdx}`}
                          className="text-xs font-bold bg-gray-100 hover:bg-black hover:text-white px-3 py-1.5 rounded-lg transition-colors ff-font-bold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loadingKey === `other-${ocIdx}` ? "Adding..." : "Enroll"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {bundles.map((bd: any, bdIdx: number) => (
                  <div
                    key={bdIdx}
                    className={`bg-white rounded-3xl p-5 shadow-2xs flex flex-col justify-between ${
                      bdIdx === 1 ? "border-2 border-primary" : "border border-gray-200"
                    }`}
                  >
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ff-font-bold ${bdIdx === 1 ? "text-[#9A7300]" : "text-gray-400"}`}>
                        {bd.tag || "Bundle"}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 mt-1 ff-font-bold">{bd.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 ff-font">{bd.subtitle}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xl font-black text-gray-900 ff-font-bold">{bd.price}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const bundleSlug = bd.link?.includes("bundle=")
                            ? bd.link.split("bundle=")[1]
                            : bd.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          handleEnrollMentorship(
                            {
                              id: bundleSlug || bd.name,
                              name: bd.name,
                              price: bd.price,
                              subtitle: bd.subtitle || bd.tag || "Live Mentorship Bundle"
                            },
                            `bundle-${bdIdx}`
                          );
                        }}
                        disabled={loadingKey === `bundle-${bdIdx}`}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ff-font-bold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                          bdIdx === 1
                            ? "bg-primary hover:bg-[#F0BF00] text-black"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                      >
                        {loadingKey === `bundle-${bdIdx}` ? "Adding..." : "Enroll"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* 1:1 Mentoring Strip */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
            <div>
              <h4 className="text-lg font-bold text-gray-900 ff-font-bold mb-1">
                {mentorship.one_on_one_title || "Designer 1:1 mentoring"}
              </h4>
              <p className="text-sm text-gray-600 ff-font">
                {mentorship.one_on_one_desc || "A personal roadmap built around your clinical strengths, diagnostic speed, and subject weaknesses."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowContactModal(true)}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-black text-gray-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ff-font-bold"
            >
              {mentorship.one_on_one_btn || "Contact us for details"}
            </button>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#9A7300] bg-[#FFF2C2] px-3 py-1 rounded-full mb-3 ff-font-bold">
            {dynamicData?.testimonials?.eyebrow || "STUDENT STORIES"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight ff-font-bold">
            {dynamicData?.testimonials?.title || "Real scores. Real matches."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-7 shadow-2xs flex flex-col justify-between">
              <blockquote className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6 ff-font">
                {item.quote}
              </blockquote>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-900 ff-font-bold">{item.author}</p>
                <p className="text-xs text-gray-500 ff-font">{item.credential}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="bg-[#FAF9F5] border-t border-gray-200 py-16 sm:py-24">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-tight mb-3 ff-font-bold">
              {dynamicData?.faqs?.title || "Questions, answered."}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 ff-font">
              {dynamicData?.faqs?.subtitle || "Still deciding? "}
              <a href="#tour" className="text-[#9A7300] font-bold hover:underline ff-font-bold">
                Watch the app tour first →
              </a>
            </p>
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {faqs.map((faq: any, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 ff-font-bold">
                      {faq.q}
                    </h3>
                    <span className={`text-xl font-bold transition-transform ${isOpen ? "text-primary rotate-45" : "text-gray-400"}`}>
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 ff-font">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-400 mt-10 ff-font">
            {dynamicData?.faqs?.footer_text || "Last updated October 30, 2026 · Mendel Academy, founded by Dr. Kishore Managoli, MD"}
          </p>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-primary text-black rounded-3xl p-8 sm:p-14 text-center shadow-lg flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ff-font-bold max-w-2xl">
            {cta.title || "Simplify your Step 1 prep today."}
          </h2>

          <Link
            href={cta.btn_link || "/auth/register?offer=self-assessment"}
            className="bg-black hover:bg-gray-900 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-md transition-all hover:scale-105 ff-font-bold"
          >
            {cta.btn_text || "Try a free Self-Assessment"}
          </Link>
        </div>
      </section>

      {/* ================= VIDEO TOUR MODAL ================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-gray-950 mb-2 ff-font-bold">
              Mendel Galaxy App Tour
            </h3>
            <p className="text-xs text-gray-500 mb-4 ff-font">
              Watch a quick 3-minute walkthrough of the QBank, Chitras, and Self-Assessments.
            </p>

            <div className="aspect-video w-full rounded-2xl bg-gray-900 overflow-hidden flex items-center justify-center relative">
              <iframe
                className="w-full h-full"
                src={tour.video_url || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"}
                title="Mendel Galaxy App Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowVideoModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer ff-font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT 1:1 MODAL ================= */}
      {showContactModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-black text-gray-950 mb-1 ff-font-bold">
              Designer 1:1 Mentoring
            </h3>
            <p className="text-xs text-gray-500 mb-6 ff-font">
              Connect with our admissions and academic advisors to schedule your 1:1 diagnostic consultation.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our advisory team will reach out within 1 business day.");
                setShowContactModal(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase tracking-wider ff-font-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary ff-font"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase tracking-wider ff-font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary ff-font"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1 uppercase tracking-wider ff-font-bold">
                  Target Exam Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. June 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary ff-font"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#F0BF00] text-black font-bold text-sm py-3 rounded-xl shadow-xs transition-colors cursor-pointer mt-4 ff-font-bold"
              >
                Request 1:1 Consultation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
