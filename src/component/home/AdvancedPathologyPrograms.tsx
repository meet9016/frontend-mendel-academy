"use client";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { FaStar, FaUsers, FaClock } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

function AdvancedPathologyPrograms() {
  // Sample Data (used for 3 repeated cards)
  const [programs, setPrograms] = React.useState<any[]>([]);
  const router = useRouter();

  const recordedProgram = {
    title: "MENDEL MASTERY SERIES™: LYMPHOMAS",
    description: "Curriculum aligned with WHO 5th Ed. Blue Book",
    category:
      "https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg",
    rating: 4.9,
    price: 59.99,
    originalPrice: 79.99,
  };

  const upcomingProgram = {
    title: "MENDEL MASTERY SERIES™: BRAIN TUMORS",
    description: "Advanced CNS pathology and molecular markers",
    waitlist: 1200,
    progress: 79,
    duration: "6-week program",
    startDays: "Early access",
  };

  const getBlogData = async () => {
    try {
      const res = await api.get(`${endPointApi.getAllPreRecorded}`);

      if (res?.data?.data.length) {
        setPrograms(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4 md:px-6 lg:px-8 py-10">
      {/* Title Section */}
      <div className="text-center space-y-1">
        <h1 className="text-4xl md:text-3xl font-extrabold text-gray-900">
          Advanced Pathology
        </h1>
        <h1 className="text-4xl md:text-3xl font-extrabold text-gray-900">
          Programs
        </h1>
      </div>

      {/* Subtitle */}
      <div className="text-center mt-4 text-gray-600 text-base md:text-lg">
        <p>
          Specialized training designed by pathology experts to advance your
          diagnostic
        </p>
        <p>expertise and clinical knowledge.</p>
      </div>

      {/* Featured Live Program */}
      <div className="w-full max-w-[1025px] mx-auto bg-gray-900 text-white rounded-2xl p-6 md:p-10 mt-10 shadow-lg hover:shadow-xl transition-shadow">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between text-sm mb-6">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-3 py-1 rounded-full">Sold Out</span>
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1">
              <CgLock className="w-4 h-4" />8 weeks
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Molecular Pathology Training
        </h3>

        {/* Instructor Info */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">D</span>
          </div>
          <div>
            <h4 className="font-semibold text-white text-base md:text-lg">
              Dr. John Doe
            </h4>
            <p className="text-gray-400 text-sm">MD, Senior Pathologist</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Hands-on Practice", "Case Discussions", "Certification"].map(
            (feature, index) => (
              <div
                key={index}
                className="bg-gray-700 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-600 transition"
              >
                {feature}
              </div>
            )
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/subscription")}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer">
          Learn More
          <BsArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* RECORDED PROGRAMS */}
      <section className="w-full max-w-[1025px] mx-auto  mt-10">
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-900">
            Recorded Programs
          </h2>
          <p className="text-gray-500 text-sm">
            Self-paced learning with lifetime access
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {programs?.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              {/*  IMAGE REPLACING CATEGORY */}
              <div className="relative h-32">
                <img
                  src="https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg"
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center bg-white/90 px-2 py-0.5 rounded-full">
                  <FaStar className="text-yellow-400 w-3 h-3 mr-1" />
                  <span className="text-xs font-semibold">{item?.rating}</span>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center bg-white/90 px-2 py-0.5 rounded-full">
                  {/* <FaStar className="text-yellow-400 w-3 h-3 mr-1" /> */}
                  <span className="text-xs font-semibold">
                    {item?.total_reviews}+ learners
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="font-bold text-sm mb-1 line-clamp-2 overflow-hidden text-ellipsis"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.4rem",
                    height: "2.8rem",
                  }}
                >
                  {item?.title}
                </h3>
                <p
                  className="text-xs text-gray-500 mb-3 overflow-hidden text-ellipsis line-clamp-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.2rem",
                    height: "2.4rem",
                  }}
                >
                  {item?.subtitle}
                </p>


                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      {item?.duration} month access
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ${item?.price}
                    </p>
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-semibold px-5 py-2.5 rounded-md">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING PROGRAMS */}
      <section className="w-full max-w-[1025px] mx-auto mt-10">
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-900">
            Upcoming Programs
          </h2>
          <p className="text-gray-500 text-sm">
            Join the waitlist and get early access
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-100 to-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md hover:-translate-y-1 transition relative"
            >
              <div className="absolute inset-0 bg-yellow-100/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl" />

              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md uppercase">
                  LAUNCHING SOON
                </div>
                <GiSparkles className="w-4 h-4 text-yellow-500" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                {upcomingProgram.title}
              </h3>

              {/* Waitlist */}
              <div className="bg-gray-100 rounded-md p-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <FaUsers className="text-yellow-500" />
                    {upcomingProgram.waitlist.toLocaleString()}
                  </div>
                  <span className="text-yellow-500 font-bold">
                    {upcomingProgram.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
                  <div
                    className="bg-yellow-400 h-1.5 rounded-full"
                    style={{ width: `${upcomingProgram.progress}%` }}
                  />
                </div>
              </div>

              {/* Starts In */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-md p-2 mb-3">
                <FaClock className="text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Starts in {upcomingProgram.startDays} days
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {upcomingProgram.duration}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-4">
                {upcomingProgram.description}
              </p>

              {/* CTA */}
              <button className="w-full bg-gray-900 text-white text-xs font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                Join Waitlist
                <BsArrowRight className="w-4 h-4" />
              </button>

              {/* Footer note */}
              <p className="text-[11px] text-gray-500 text-center mt-2">
                No payment now · Email reminder before launch
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdvancedPathologyPrograms;
