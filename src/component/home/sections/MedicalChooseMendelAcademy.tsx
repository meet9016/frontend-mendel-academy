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
<main className="flex flex-col items-center max-w-[1380px] mx-auto justify-center bg-white px-4 md:px-6 lg:px-8 py-10">
      <Header />
      <FeatureGrid features={features} />
      <BottomSection />
    </main>
  );
}

/* ----------  SECTIONS  ---------- */
const Header = () => (
  <>
    <div className="text-center space-y-0">
      <h1 className="text-2xl md:text-3xl ff-font-bold font-bold">
        Why Medical Professionals
      </h1>
      <h2 className="text-2xl md:text-3xl ff-font-bold font-bold">
        Choose Mendel Academy
      </h2>
    </div>
    <div className="text-center mt-3 ff-font md:text-lg max-w-4xl">
      <p>Our comprehensive pathology platform accelerates your professional growth and clinical expertise.</p>
    </div>
  </>
);

const FeatureGrid = ({ features }: { features: Feature[] }) => (
  <section className="w-full max-w-[1380px] mx-auto mt-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc, tag }: Feature) => (
  <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:border-yellow-300 transition-all duration-300">
    {/* tag + icon on same row */}
    <div className="absolute top-3 right-3 ff-font text-primary border-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
      {tag}
    </div>
    <div className="absolute top-3 left-3 bg-white text-primary w-14 h-14 text-3xl border-primary flex items-center justify-center rounded-xl shadow-md group-hover:scale-110 transition duration-300">
      {icon}
    </div>

    <div className="p-4 pt-24 space-y-3">
      <h3 className="text-lg font-bold ff-font-bold">{title}</h3>
      <p className="ff-font text-sm leading-relaxed">{desc}</p>
      <div className="text-primary ff-font-bold font-semibold flex items-center gap-1 mt-3">
        <span>Learn More</span>
        <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
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

    {/* CTA box */}
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl bg-gray-900 text-center text-white py-15 px-6 rounded-2xl relative shadow-lg">
        <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 ff-font-bold px-4 py-1 text-sm rounded-full">
          Stay Updated
        </span>
        <h2 className="text-2xl ff-font-bold md:text-3xl font-bold">Stay Ahead in Medical Education</h2>
        <p className="mt-3 ff-font text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
          Get expert insights, course updates, and exclusive content—be first to know about new programs & breakthroughs.
        </p>
        <CommonButton
          pyClass="py-3"
          pxClass="px-20"
          fontWeight={700}
          fontSize={14}
          className="mt-8 group"
        >
          <div className="flex items-center gap-2">
            <span>Enroll Now</span>
            <FaArrowRight className="w-4 h-4 duration-300 transition-transform group-hover:translate-x-1" />
          </div>
        </CommonButton>
      </div>
    </div>

    {/* bottom note */}
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm text-sm">
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <span className="font-medium ff-font-bold">Unsubscribe anytime</span>
        <span>•</span>
        <span>Trusted by medical professionals worldwide</span>
      </div>
    </div>
  </div>
);