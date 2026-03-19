"use client";
import CommonButton from "@/comman/Button";
import React from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaChartLine,
  FaClock,
  FaUsers,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa";

/* ----------  TYPES  ---------- */
type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
};

/* ----------  DATA  ---------- */
const features: Feature[] = [
  {
    icon: <FaUserMd />,
    title: "Expert-Led Instruction",
    desc: "Learn directly from board-certified pathologists and experienced educators with years of clinical experience.",
    tag: "Board-certified faculty",
  },
  {
    icon: <FaGraduationCap />,
    title: "Comprehensive Curriculum",
    desc: "Master essential pathology concepts with structured lessons, interactive case studies, and assessments.",
    tag: "600+ case studies",
  },
  {
    icon: <FaChartLine />,
    title: "Proven Track Record",
    desc: "95% of our students successfully advance their medical careers within six months of course completion.",
    tag: "95% success rate",
  },
  {
    icon: <FaClock />,
    title: "Flexible Learning",
    desc: "Access your courses anytime, anywhere — learn at your own pace with live and recorded sessions.",
    tag: "Learn anywhere, anytime",
  },
  {
    icon: <FaUsers />,
    title: "Peer Community",
    desc: "Join 10,000+ medical professionals in our exclusive online study groups and collaborative network.",
    tag: "10,000+ active members",
  },
  {
    icon: <FaCertificate />,
    title: "Certification Ready",
    desc: "Comprehensive preparation for board exams and professional certification requirements.",
    tag: "Board exam focused",
  },
];

/* ----------  MAIN PAGE  ---------- */
export default function MedicalChooseMendelAcademy() {
  return (
    <main className="flex flex-col items-center w-full max-w-[1380px] mx-auto justify-center bg-white px-4 md:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
      <Header />
      <FeatureGrid features={features} />
      <BottomSection />
    </main>
  );
}

/* ----------  SECTIONS  ---------- */
const Header = () => (
  <div className="flex flex-col items-center mb-10 md:mb-14 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl ff-font-bold font-bold mb-2 md:mb-3 text-[#111827]">
      Why Medical Professionals
    </h2>
    <h2 className="text-2xl sm:text-3xl md:text-4xl ff-font-bold font-bold mb-4 md:mb-6 text-[#111827]">
      Choose Mendel Academy
    </h2>
    <p className="text-gray-600 ff-font text-base md:text-lg lg:text-xl max-w-2xl text-center leading-relaxed mt-1">
      Our comprehensive pathology platform accelerates your professional growth and clinical expertise.
    </p>
  </div>
);

const FeatureGrid = ({ features }: { features: Feature[] }) => (
  <section className="w-full max-w-[1380px] mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 pt-2 cursor-pointer">
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc, tag }: Feature) => (
  <div className="relative bg-white rounded-3xl border border-gray-300 overflow-hidden group hover:border-yellow-300 transition-all duration-300">
    {/* Tag */}
    <div className="absolute top-3 right-3 ff-font border border-primary text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow-sm bg-white">
      {tag}
    </div>
    {/* Icon */}
    <div className="absolute top-3 left-3 bg-white text-primary 
      w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl 
      border border-primary flex items-center justify-center 
      rounded-xl group-hover:scale-110 transition duration-300">
      {icon}
    </div>
    {/* Content */}
    <div className="p-4 pt-20 sm:pt-24 space-y-3">
      <h3 className="text-base sm:text-lg font-bold ff-font-bold">{title}</h3>
      <p className="ff-font text-xs sm:text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);


const BottomSection = () => (
  <div className="w-full max-w-[1025px] mx-auto mt-10 space-y-7">
    {/* join count */}
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-4 bg-[#f9fafb] py-3 px-6 rounded-full shadow-sm border border-gray-100">
        <p className="ff-font-bold text-sm md:text-base font-medium">
          Join <span className="font-extrabold">10,000+</span> medical professionals learning with us
        </p>
      </div>
    </div>

    {/* bottom note */}
    <div className="w-full flex justify-center px-3">
      <div
        className="flex flex-wrap items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm text-xs sm:text-sm text-center max-w-full">
        {/* Green Icon */}
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <span className="font-medium ff-font-bold whitespace-nowrap">
          Unsubscribe anytime
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="text-gray-700 ff-font">
          Trusted by medical professionals worldwide
        </span>
      </div>
    </div>
  </div>
);