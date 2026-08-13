"use client";
import CommonButton from "@/comman/Button";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBell,
  FaCalendarAlt,
  FaChevronDown,
  FaEnvelope,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import DOMPurify from "dompurify";

interface Course {
  id: string;
  title: string;
  description: string;
  date: string;
  waitlistCount: number;
  image: string;
  // add other fields if needed
}

const UpcomingCourse = () => {
  const [openCourseDetails, setOpenCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const closePopup = () => {
    setOpenCourseDetails(false);
    setSelectedCourse(null);
  };

  const getUpcomingCourse = async () => {
    const res = await api.get(`${endPointApi.getUpComingProgram}`);
    setCourseData(res.data.data);
  };

  useEffect(() => {
    getUpcomingCourse();
  }, []);
  return (
    <>
      {/* Animated Background */}
      {/* <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffca00]/10 rounded-full blur-3xl animate-float" /> */}
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffca00]/5 rounded-full blur-3xl animate-float overflow-hidden"
        style={{ animationDelay: "2s" }}
      />
      <div className="relative z-10 max-w-[1380px] mx-auto overflow-hidden ">
        {/* Course Cards with Navigation Arrows */}
        <div className="relative px-12 mb-10">
          {/* Left Arrow */}
          <button
            onClick={() =>
              document
                .getElementById("upcomingScroll")
                ?.scrollBy({ left: -350, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
          >
            <FaChevronDown className="rotate-90 w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            id="upcomingScroll"
            className="flex gap-8 overflow-x-auto overflow-y-hidden"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {courseData?.map((course: Course, index: number) => (
              <div
                key={index}
                className="w-[320px] flex-shrink-0 scroll-snap-align-start group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                {/* Main Card */}
                <div
                  className="relative h-full bg-white border border-[#EBE8E2] overflow-hidden hover:border-[#FFCA00] hover:shadow-lg transition-all duration-300 rounded-3xl"
                >
                  {/* --- IMAGE SECTION WITH BADGES + WAVE --- */}
                  <div className="relative h-44 overflow-hidden">
                    {/* Course Image */}
                    <img
                      src={
                        course.image ||
                        "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
                      }
                      alt={course.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />

                    {/* --- TOP BADGES --- */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FFF8E6] border border-[#FFC900]/40 text-[#B28200] font-extrabold text-[9px] tracking-wide px-3 py-1 rounded-full uppercase shadow-sm backdrop-blur-sm">
                        Advanced Level
                      </span>
                    </div>
                  </div>

                  {/* --- CONTENT SECTION --- */}
                  <div className="p-6 space-y-5 relative">
                    <div>
                      {/* --- Title --- */}
                      <div>
                        <h3 className="text-[17px] font-extrabold text-[#1D172A] leading-tight line-clamp-1 min-h-[1.2rem]">
                          {course.title}
                        </h3>
                      </div>

                      {/* --- Description --- */}
                      <div
                        className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-2 min-h-[3rem]"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(course.description),
                        }}
                      />

                      {/* --- Info Boxes --- */}
                      <div className="space-y-3 mt-4">
                        <div className="relative group/date">
                          <div className="relative flex items-center gap-3 p-3 border border-[#EBE8E2] rounded-xl transition-colors duration-300 bg-[#FAF8F5]">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF1F5] flex items-center justify-center text-[#D54C80] border border-[#F5E2EC]">
                              <FaCalendarAlt className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-extrabold text-[#1D172A]">
                              {course.date}
                            </span>
                          </div>
                        </div>

                        <div className="relative group/spots">
                          <div className="relative flex items-center gap-3 p-3 border border-[#EBE8E2] rounded-xl transition-colors duration-300 bg-[#FAF8F5]">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF1F5] flex items-center justify-center text-[#D54C80] border border-[#F5E2EC]">
                              <FaUsers className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs text-gray-500 font-semibold">
                              <span className="font-extrabold text-[#1D172A]">{course.waitlistCount} spots</span> on waitlist
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- CTA Button --- */}
                    <div className="relative pt-2">
                      <button
                        onClick={() => setOpenCourseDetails(!openCourseDetails)}
                        className="w-full py-3 bg-[#D54C80] hover:bg-[#b83b6b] text-white font-extrabold text-sm rounded-xl transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#D54C80]/15"
                      >
                        Get Notified <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {openCourseDetails && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-[999] px-4 "
                    >
                      <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.92, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative border-2 border-[#f0b100]/40"
                      >
                        {/* CLOSE BUTTON */}
                        <button
                          onClick={closePopup}
                          className="absolute top-3 right-3 w-9 h-9   
                          flex items-center justify-center shadow-sm transition"
                        >
                          <FaTimes className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* TITLE + SUBTITLE */}
                        <div className="pt-6 text-center">
                          <h2 className="text-xl font-bold ff-font-bold">
                            Get notified when this course launches
                          </h2>
                          <p className="ff-font mt-1 text-sm">
                            Join the waitlist to get early access and exclusive
                            updates.
                          </p>
                        </div>

                        {/* COURSE INFO */}
                        <div className="p-4 mt-4 bg-gray-100 border border-gray-300 rounded-xl">
                          <h3 className="font-bold text-sm ff-font-bold">
                            Interpretation of Bone Marrow Biopsies
                          </h3>
                          <p className="text-xs text-gray-600 ff-font">
                            Starts September 2025
                          </p>
                        </div>

                        {/* FORM */}
                        <div className="space-y-4 mt-5">
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold ff-font-bold">
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="your.email@example.com"
                              className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-yellow-400 ff-font"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold ff-font-bold">
                              Name{" "}
                              <span className="text-gray-400">(optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Your full name"
                              className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-yellow-400 ff-font"
                            />
                          </div>
                        </div>

                        {/* WHAT YOU GET */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                          <div className="flex items-start gap-2">
                            <FaEnvelope className="text-primary w-4 h-4 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-xs text-black ff-font-bold mb-1">
                                What you'll get:
                              </h4>
                              <ul className="text-xs text-black ff-font space-y-1">
                                <li>• Early access when registration opens</li>
                                <li>• Course details and pricing info</li>
                                <li>• Priority for limited seats</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* FOOTER BUTTONS */}
                        <div className="mt-7 flex items-center justify-between gap-3">
                          <button
                            onClick={closePopup}
                            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition"
                          >
                            Cancel
                          </button>

                          <button className="flex-1 bg-yellow-400 text-black py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                            <FaBell className="w-4 h-4" />
                            Notify Me
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Decorations */}
                {/* <div className="absolute -bottom-5 -right-6 w-18 h-18 border-8 border-[#ffca00]/20 rounded-full group-hover:scale-110 group-hover:border-[#ffca00]/40 transition-all duration-700 " />
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#ffca00]/10 rounded-full group-hover:scale-125 transition-all duration-700" /> */}
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              document
                .getElementById("upcomingScroll")
                ?.scrollBy({ left: 350, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
          >
            <FaChevronDown className="-rotate-90 w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default UpcomingCourse;