"use client";
import React from "react";
import { FaUserMd, FaCheckCircle, FaBookOpen, FaHeadset } from "react-icons/fa";

/* ----------  TYPES  ---------- */
type Stat = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

/* ----------  DATA  ---------- */
const stats: Stat[] = [
  {
    icon: <FaUserMd className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
    value: "10,000+",
    label: "MEDICAL STUDENTS",
  },
  {
    icon: <FaCheckCircle className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
    value: "95%",
    label: "SUCCESS RATE",
  },
  {
    icon: <FaBookOpen className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
    value: "50+",
    label: "EXPERT FACULTY",
  },
  {
    icon: <FaHeadset className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
    value: "24/7",
    label: "SUPPORT AVAILABLE",
  },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function TrustedMedical() {
  return (
    <section className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Header />
        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const Header = () => (
  <>
    <h2 className="text-3xl md:text-4xl ff-font-bold font-bold">
      Trusted by Medical
    </h2>
    <h2 className="text-3xl md:text-4xl ff-font-bold font-bold mb-3">
      Professionals Worldwide
    </h2>
    <p className="text-gray-300 ff-font text-base md:text-lg mb-7">
      Thousands of students and professionals advance their careers with our
      comprehensive pathology education.
    </p>
  </>
);

const StatsGrid = ({ stats }: { stats: Stat[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    {stats.map((s, i) => (
      <StatItem key={i} {...s} />
    ))}
  </div>
);

const StatItem = ({ icon, value, label }: Stat) => (
  <div className="group flex flex-col items-center text-center cursor-pointer">
    <div className="bg-[#FFCA00] rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-yellow-500/40">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold transition-colors duration-300 ff-font-bold group-hover:text-yellow-400">
      {value}
    </h3>
    <p className="text-gray-400 text-sm mt-1 tracking-wide ff-font transition-colors duration-300 group-hover:text-gray-200">
      {label}
    </p>
  </div>
);