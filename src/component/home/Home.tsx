"use client";
import {
  FiSearch,
  FiFileText,
  FiActivity,
  FiHeart,
  FiBookOpen,
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import AdvancedPathologyPrograms from "./AdvancedPathologyPrograms";
import TrustedMedical from "./TrustedMedical";
import MedicalChooseMendelAcademy from "./MedicalChooseMendelAcademy";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { use, useEffect, useState } from "react";
// import CourseCard from "../cousercard/CourseCard";

interface CourseCardProps {
  icon: React.ReactNode;
  subtitle?: string;
  title: string;
  badge: string;
  badgeVariant: "primary" | "secondary";
  total_reviews: number;
  rating: number;
  tags: string[];
  moreFeatures: number;
  description: string;
}

const badgeColors: Record<
  "primary" | "secondary" | "outline" | "default",
  string
> = {
  default: "gray",
  primary: "green", // added
  secondary: "blue",
  outline: "transparent",
};

const Home = () => {
  const courses = [
    {
      icon: <FiFileText className="w-7 h-7" />,
      title: "USMLE Step 1",
      tag: "POPULAR",
      rating: 4.9,
      students: 1300,
      features: ["Adaptive AI", "Analytics"],
      moreFeatures: 1,
      sort_description:
        "Master the exam prep with our adaptive AI powered techniques",
      badgeVariant: "default",
    },
    {
      icon: <FiActivity className="w-7 h-7" />,
      title: "USMLE Step 2",
      tag: "UPDATED",
      rating: 4.8,
      students: 940,
      features: ["Patient Cases", "Dx Trainer"],
      moreFeatures: 1,
      sort_description:
        "Excel in clinical knowledge and patient care scenarios",
      badgeVariant: "secondary",
      total_reviews: 2400,
    },
    {
      icon: <FiHeart className="w-7 h-7" />,
      title: "USMLE Step 3",
      tag: "NEW",
      rating: 4.7,
      students: 610,
      features: ["EMR Training", "Residency Cases"],
      moreFeatures: 1,
      sort_description:
        "Complete your USMLE journey with confidence and success",
      badgeVariant: "outline",
      total_reviews: 2400,
    },
    {
      icon: <FiBookOpen className="w-7 h-7" />,
      title: "INI CET",
      tag: "POPULAR",
      rating: 4.8,
      students: 820,
      features: ["AIIMS Faculty", "Topper Strategy"],
      moreFeatures: 1,
      sort_description: "Secure your AIIMS seat with our comprehensive program",
      badgeVariant: "default",
      total_reviews: 2400,
    },
    {
      icon: <FiCpu className="w-7 h-7" />,
      title: "NEET PG",
      tag: "TRENDING",
      rating: 4.9,
      students: 1520,
      features: ["Weak Areas AI", "Smart Notes"],
      moreFeatures: 1,
      sort_description: "Achieve your dream with proven strategies",
      badgeVariant: "secondary",
      total_reviews: 2400,
    },
  ];

  const [questionBank, setQuestionBank] = useState([]);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("course-scroll-container");
    if (container) {
      const scrollAmount = 360;
      const newScrollPosition =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const getQuestionBank = () => {
    api
      .get(`${endPointApi.getAllQuestion}`)
      .then((response) => {
        setQuestionBank(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching question bank data:", error);
      });
  };

  useEffect(() => {
    getQuestionBank();
  }, []);
  return (
    <>
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[45vh] bg-white px-2 md:px-4 lg:px-6 text-center space-y-8 py-24">
        <p className="text-sm md:text-base text-gray-500 bg-gray-50 px-4 py-2 rounded-full shadow-md inline-block">
          Trusted by 10,000+ Medical Students
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug">
          We <span className="font-extrabold">simplify</span> learning, <br />
          <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg">
            amplify
          </span>{" "}
          success
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl">
          Personalized Medical Coaching Driven by Data, Enhanced by AI
        </p>

        <div className="w-full max-w-xl relative">
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="What do you want to learn today?"
            className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-700 placeholder-gray-400 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-md">
            PG Entrance Exams
          </button>
          <button className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-md">
            Advanced Pathology
          </button>
        </div>
      </main>

      {/* Courses Section */}
      <section className="bg-[#f9fafb] py-16 px-4 md:px-8 lg:px-16 relative group/section">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-[#434de3] bg-[#e0e7ff] px-3 py-1 rounded-full mb-4 shadow-sm">
              AI-PERSONALIZED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Adaptive Qbanks
              <br />
              for Exam Prep
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
              Crush high-stakes medical exams with data-driven practice &
              targeted remediation.
            </p>
          </div>

          {/* Scroll container wrapper (relative for overlay buttons) */}
          <div className="relative">
            {/* Gradient Overlays (side fade) */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Scrollable Courses */}
            <div
              id="course-scroll-container"
              className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
            >
              {courses?.map((course: any, index) => (
                <CourseCard
                  key={index}
                  icon={<FiFileText className="w-7 h-7" />}
                  title={course.title}
                  badge={course.tag}
                  badgeVariant="secondary"
                  rating={course.rating}
                  total_reviews={course.total_reviews}
                  tags={course.features}
                  moreFeatures={3}
                  description={course.sort_description}
                />
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
            >
              <FiChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <AdvancedPathologyPrograms />
      <TrustedMedical />
      <MedicalChooseMendelAcademy />
      <Footer />
    </>
  );
};

export default Home;

const CourseCard = ({
  icon,
  title,
  subtitle = "",
  badge,
  rating,
  total_reviews,
  tags,
  moreFeatures = 0,
  description,
  badgeVariant = "secondary",
}: CourseCardProps) => {
  // const badgeClasses = {
  // default: "bg-black text-white",
  // secondary: "bg-gray-100 text-gray-800",
  // outline: "border border-gray-300 text-gray-800",
  // };
  const badgeClasses: Record<
    "primary" | "secondary" | "outline" | "default",
    string
  > = {
    default: "gray",
    primary: "green", // added
    secondary: "blue",
    outline: "transparent",
  };

  return (
    <div className="group flex-shrink-0 w-[340px] cursor-pointer bg-gradient-to-br from-white via-gray-50 to-yellow-50 border-2 border-gray-200 rounded-3xl p-6 hover:shadow-2xl hover:shadow-yellow-300/20 transition-all duration-500 hover:-translate-y-0 flex flex-col relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-transparent to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      {/* Badge - top edge */}
      {badge && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-[#f0b100] to-yellow-600 text-white text-xs font-semibold px-6 py-1 rounded-bl-2xl shadow-md">
          {badge}
        </div>
      )}

      <div className="relative z-10">
        {/* Icon + Title Row */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-15 h-15 bg-[#353c4c] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          {/* Title beside icon (expand for up to 2 lines) */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-500 transition-colors duration-300 leading-snug min-h-[1rem] line-clamp-1">
              {title}
            </h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

            {/* Rating & Students just below title */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-md">
                <FiStar className="text-yellow-400" />
                <span className="text-sm font-bold">{rating}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                <FiUsers />
                <span className="text-sm font-medium">{total_reviews}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="relative mb-3 group/tags">
          {/* Left Arrow */}
          {tags?.length > 3 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const container = document.getElementById(
                  `tag-scroll-${title}`
                );
                if (container)
                  container.scrollBy({ left: -100, behavior: "smooth" });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-1 z-10 hidden group-hover/tags:flex hover:bg-gray-100 transition"
            >
              <FiChevronLeft className="text-gray-700 w-4 h-4 cursor-pointer" />
            </button>
          )}

          {/* Scrollable Tag Container */}
          <div className="relative mb-3 group/tags ">
            <div
              id={`tag-scroll-${title}`}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-1"
              style={{
                scrollSnapType: "x mandatory",
                maxWidth: "100%",
              }}
            >
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex-shrink-0 text-xs px-3 py-1.5 bg-[#f3f6fa] text-black rounded-full font-medium shadow-sm hover:shadow-md transition-shadow scroll-snap-align-start"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {tags.length > 3 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const container = document.getElementById(
                  `tag-scroll-${title}`
                );
                if (container)
                  container.scrollBy({ left: 100, behavior: "smooth" });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-1 z-10 hidden group-hover/tags:flex hover:bg-gray-100 transition"
            >
              <FiChevronRight className="text-gray-700 w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>

        {/* More Features */}
        {moreFeatures > 0 && (
          <button className="text-xs text-yellow-600 hover:text-yellow-500 text-left mb-4 flex items-center gap-1 font-medium group/btn">
            <span>+{moreFeatures} more features</span>
            <span className="text-lg leading-none group-hover/btn:translate-x-1 transition-transform">
              ›
            </span>
          </button>
        )}

        {/* Description (2-line limit + fixed height) */}
        <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed line-clamp-2 min-h-[3.2rem]">
          {description && description.trim() !== "" ? description : ""}
        </p>

        {/* Enroll Button */}
        <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:shadow-lg hover:shadow-yellow-300/30 text-gray-900 font-bold py-4 rounded-xl transition-all duration-300 group-hover:scale-[1.02]">
          Enroll Now
        </button>

        <p className="text-xs text-gray-400 text-center mt-3 font-medium">
          Instant access • Secure checkout
        </p>
      </div>
    </div>
  );
};
