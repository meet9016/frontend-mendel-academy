"use client";
import React from "react";
import { FaBriefcase, FaCertificate, FaFlask, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type Achievement = { icon: React.ElementType; text: string };

/* ----------  DATA  ---------- */
const achievements: Achievement[] = [
  { icon: FaBriefcase, text: "30+ years of Surgical & Pathology experience" },
  { icon: FaFlask, text: "Actively involved in stem cell research" },
  { icon: FaSearch, text: "15 years of clinical research in the U.S." },
  { icon: FaCertificate, text: "8 U.S. patents" },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function MeetYourMentor() {
  return (
    <section className="relative py-[56px] overflow-hidden bg-[#FAF7F2]">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#E0568F]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#E0568F]/5 rounded-full blur-3xl" />

      <div className="max-w-[1180px] mx-auto px-6">
        <Header />
        <Content achievements={achievements} />
      </div>
    </section>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-[50px]">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-3xl md:text-[2.6rem] font-extrabold tracking-[-.025em] text-[#241E3D] leading-[1.08] font-sans"
    >
      Meet Your Mentor
    </motion.h2>
  </div>
);

const Content = ({ achievements }: { achievements: Achievement[] }) => (
  <div className="relative">
    <HexBg />
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-[44px] items-center">
      <ProfileCard />
      <AchievementsList achievements={achievements} />
    </div>
  </div>
);

const ProfileCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="relative bg-white rounded-[20px] p-8 border border-[#E6E0D8] hover:border-[#FFC900] hover:shadow-lg transition-all duration-300">
      {/* Profile Image with Geometric Frame */}
      <div className="relative mb-6">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E0568F] to-[#C79A00] rounded-full animate-spin-slow opacity-10" />
          <div className="absolute inset-2 bg-white rounded-full" />
          <img
            src="/images/11.jpg"
            alt="Dr. Kishor Managoli"
            className="absolute inset-3 w-[168px] h-[168px] rounded-full object-cover border-4 border-[#E0568F]/30 shadow-sm"
          />
        </div>
        {/* Floating Badge */}
        <div className="absolute -bottom-2 right-1/4 translate-x-12 bg-[#E0568F] text-white px-4 py-1.5 rounded-full shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider">MD</span>
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-[#241E3D] mb-1">Dr. Kishor Managoli, MD</h3>
        <p className="text-base font-bold text-[#E0568F] mb-1">Senior Surgical & Digital Pathologist</p>
        <p className="text-xs text-[#5C5575] font-semibold">Founder & Chief Educator, Mendel Academy</p>
      </div>

      {/* Description */}
      <div className="bg-[#FAF7F2] p-6 border border-[#E6E0D8] rounded-[16px]">
        <p className="text-center text-xs md:text-sm text-[#5C5575] leading-[1.65]">
          Dr. Managoli is popular for providing his students a transformational experience. His mentorship is deeply interactive and case-based,
          designed to help you think critically, diagnose confidently, and connect pathology to real clinical decisions. Every session challenges
          you to engage, question, and evolve, not just as a learner, but as a future leader in diagnostics. Under his mentorship, you will build
          a strong foundation in surgical pathology, master digital techniques, and develop critical thinking skills essential for diagnostic excellence.
        </p>
      </div>
    </div>
  </motion.div>
);

const AchievementsList = ({ achievements }: { achievements: Achievement[] }) => (
  <div className="space-y-6 cursor-pointer">
    {achievements.map((achievement, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0.98, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <AchievementCard {...achievement} />
      </motion.div>
    ))}
  </div>
);

const AchievementCard = ({ icon: Icon, text }: Achievement) => (
  <div className="relative bg-white rounded-[20px] p-5 border border-[#E6E0D8] hover:border-[#FFC900] hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="w-14 h-14 rounded-[16px] bg-[#F7DCE8] flex items-center justify-center text-[#E0568F] border border-[#E6E0D8] transform group-hover:rotate-6 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-base font-bold text-[#241E3D] flex-1 transition-colors">{text}</p>
    </div>
  </div>
);

const HexBg = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-5">
    <svg width="800" height="800" viewBox="0 0 100 100" className="animate-spin-slow">
      <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="#E0568F" strokeWidth="0.5" />
    </svg>
  </div>
);