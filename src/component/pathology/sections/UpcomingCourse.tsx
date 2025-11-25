"use client";
import CommonButton from "@/comman/Button";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBell,
  FaCalendarAlt,
  FaEnvelope,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";

const UpcomingCourse = () => {
  const [openCourseDetails, setOpenCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const closePopup = () => {
    setOpenCourseDetails(false);
    setSelectedCourse(null);
  };

  const getUpcomingCourse = async () => {
    const res = await api.get(`${endPointApi.getUpComingCourses}`);
    setCourseData(res.data.data);
  };

  useEffect(() => {
    getUpcomingCourse();
  }, []);
  return (
    <>
      <section className="relative py-15 overflow-hidden bg-[#f9fafb]">
        {/* Animated Background */}
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffca00]/10 rounded-full blur-3xl animate-float" /> */}
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffca00]/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in-up">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffca00]/10 border border-[#ffca00]/30 rounded-full backdrop-blur-sm">
                            <FaGraduationCap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                                2025 Course Calendar
                            </span>
                        </div> */}
            <div className="text-center w-full">
              <h2 className="text-5xl md:text-6xl ff-font-bold font-bold inline-block">
                <span>Upcoming</span>{" "}
                <span className="text-foreground">Courses</span>
              </h2>

              {/* <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-[#FFCA00] to-transparent rounded-full mx-auto w-[30%]" /> */}
            </div>

            <p className="text-lg text-muted-foreground  ff-font max-w-3xl mx-auto leading-relaxed">
              Expand your expertise with additional subspeciality training
              courses launching throughout 2025. Join the waitlist to get early
              access and exclusive updates.
            </p>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
            {courseData?.map((course, index) => (
              <div
                key={course.id}
                className="group relative animate-fade-in-up flex flex-col h-full"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                {/* Main Card */}
                <div
                  className="relative flex flex-col h-full bg-card border-2 border-[#ffca00]/30 
    overflow-hidden shadow-lg hover:shadow-none
    transition-all duration-500 rounded-2xl
    group-hover:border-[#fae7b2]"
                >
                  {/* --- IMAGE SECTION WITH BADGES + WAVE --- */}
                  <div className="relative h-56 overflow-hidden">
                    {/* Course Image */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffca00]/40 via-transparent to-[#f0b100]/40 mix-blend-overlay" />

                    {/* --- TOP BADGES --- */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-3">
                      <span className="bg-white/90 ff-font-bold  text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-md uppercase border border-[#f0b100]/30 backdrop-blur-sm">
                        Advanced Level
                      </span>
                      <span className="bg-[#FFCA00] ff-font-bold  text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-md uppercase border border-white/20">
                        Case-Based Learning
                      </span>
                    </div>

                    {/* --- CURVED WAVE FIXED (NO WHITE LINE) --- */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                      <svg
                        className="relative block w-full h-[60px]"
                        viewBox="0 0 500 60"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,30 C150,70 350,0 500,40 L500,60 L0,60 Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* --- CONTENT SECTION --- */}
                  <div className="p-8 space-y-5 relative flex flex-col justify-between flex-1">
                    <div className="flex flex-col flex-1">
                      {/* --- Title --- */}
                      <div className="relative pl-4">
                        <h3 className="text-xl ff-font-bold font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.0rem]">
                          {course.title}
                        </h3>
                        <div className="h-1 bg-gradient-to-r from-[#FFCA00] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-2" />
                      </div>

                      {/* --- Description --- */}
                      <p className="text-sm ff-font text-muted-foreground leading-relaxed pl-4 line-clamp-3 mt-2 min-h-[4.5rem]">
                        {course.description}
                      </p>

                      {/* --- Info Boxes --- */}
                      <div className="space-y-3 pl-1 mt-2">
                        <div className="relative group/date">
                          {/* <div className="absolute inset-0 bg-[#ffca00]/5 transform -skew-x-6 group-hover/date:skew-x-0 transition-transform duration-300" /> */}
                          <div className="relative flex items-center gap-3 p-3 border-2 border-primary transition-colors duration-300">
                            <div className="p-2 bg-[#FFCA00] ff-font-bold  rounded-full">
                              <FaCalendarAlt className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm ff-font-bold  font-semibold text-foreground">
                              {course.startDate}
                            </span>
                          </div>
                        </div>

                        <div className="relative group/spots">
                          <div className="absolute inset-0 duration-300" />
                          <div className="relative flex items-center gap-3 p-3 border-2 border-primary transition-colors duration-300">
                            <div className="p-2 bg-[#ffca00] rounded-full">
                              <FaUsers className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm ff-font text-muted-foreground">
                              <span className="font-bold ff-font-bold ">
                                {course.spotsLeft} spots
                              </span>{" "}
                              on waitlist
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- CTA Button --- */}
                    <div className="relative pt-0 pl-1">
                      {/* <button
                                                className="w-full py-3 px-6 bg-[#f0b100] hover:bg-[#ffca00] text-white font-semibold rounded-md shadow-md transition-all duration-300 flex items-center justify-center gap-3"
                                            >
                                                <FaBell className="w-4 h-4" />
                                                <span className="text-base">Get Notified</span>
                                                <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </button> */}
                      <CommonButton
                        pyClass="py-3"
                        pxClass="px-23"
                        fontWeight={700}
                        fontSize={14}
                        onClick={() => setOpenCourseDetails(!openCourseDetails)}
                      >
                        <div className="flex items-center gap-2 ff-font-bold">
                          {/* <FaBell className="w-4 h-4" /> */}
                          <span>Get Notified</span>
                          <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CommonButton>
                    </div>
                  </div>

                  {/* Bottom Gradient Bar */}
                  {/* <div className="h-2 bg-gradient-to-r from-[#FFCA00] via-[#f0b100] to-[#ffca00]" /> */}
                </div>

                <AnimatePresence>
                  {openCourseDetails && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-[999] px-4"
                    >
                      <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 30 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
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
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-8 border-[#ffca00]/20 rounded-full group-hover:scale-110 group-hover:border-[#ffca00]/40 transition-all duration-700" />
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#ffca00]/10 rounded-full group-hover:scale-125 transition-all duration-700" />
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div
            className="relative animate-fade-in-up max-w-5xl mx-auto"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative bg-white border-primary rounded-3xl p-1 shadow-2xl ">
              <div className="bg-card rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div className="space-y-6">
                    <div className="inline-flex p-4 border-primary rounded-2xl">
                      <div className="relative">
                        <FaBell className="w-8 h-8 text-primary animate-pulse" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FACC00] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FACC00]"></span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl ff-font-bold font-bold text-foreground">
                        Never Miss a <span className="">Course Launch</span>
                      </h3>
                      <p className="ff-font leading-relaxed">
                        Get the latest updates on our upcoming courses, early
                        bird pricing, and exclusive content from our expert
                        instructors.
                      </p>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center gap-3 pt-4">
                      {/* <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-10 h-10 rounded-full bg-[#FACC00] border-2 border-card flex items-center justify-center text-white font-bold text-sm"
                                                    >
                                                        {i}
                                                    </div>
                                                ))}
                                            </div> */}
                      <div className="text-sm ff-font-bold">
                        Join{" "}
                        <span className=" text-foreground">
                          10,000+ medical professionals
                        </span>{" "}
                        •{" "}
                        <span className="ff-font font-semibold">
                          Unsubscribe anytime
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right CTA */}
                  <div className="space-y-4 ml-45">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* <button className="bg-gradient-to-r from-[#ffca00] to-[#f0b100] hover:from-[#f0b100] hover:to-[#e0a100] text-white font-bold px-10 py-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                                                <FaEnvelope />
                                                Subscribe to Newsletter
                                            </button> */}
                      <CommonButton
                        pyClass="py-3"
                        pxClass="px-8"
                        fontWeight={700}
                        fontSize={16}
                      >
                        Subscribe to Newsletter
                      </CommonButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingCourse;
