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
    <section className="relative py-10 overflow-hidden bg-[#f9fafb]">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#f0b100]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#f0b100]/5 rounded-full blur-3xl" />

      <div className="max-w-[1380px] mx-auto px-6">
        <Header />
        <Content achievements={achievements} />
      </div>
    </section>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-10">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-2xl ff-font-bold md:text-4xl font-bold mb-2"
    >
      Meet Your Mentor
    </motion.h2>
  </div>
);

const Content = ({ achievements }: { achievements: Achievement[] }) => (
  <div className="relative">
    <HexBg />
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <ProfileCard />
      <AchievementsList achievements={achievements} />
    </div>
  </div>
);

const ProfileCard = () => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="relative bg-white backdrop-blur-lg rounded-[1rem] p-8 shadow-2xl border-2 border-[#f0b100]/20">
      {/* Profile Image with Geometric Frame */}
      <div className="relative mb-6">
        <div className="relative w-48 h-48 max-w-[1380px] mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0b100] to-yellow-600 rounded-full animate-spin-slow opacity-20" />
          <div className="absolute inset-2 bg-white rounded-full" />
          <img
            src="/images/11.jpg"
            alt="Dr. Kishor Managoli"
            className="absolute inset-3 w-[168px] h-[168px] rounded-full object-cover border-4 border-[#f0b100]/30"
          />
        </div>
        {/* Floating Badge */}
        <div className="absolute -bottom-2 -right-2 bg-[#FACC00] text-black ff-font px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-bold">MD</span>
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-2 ff-font-bold text-primary">Dr. Kishor Managoli, MD</h3>
        <p className="text-lg ff-font-bold font-bold mb-1">Senior Surgical & Digital Pathologist</p>
        <p className="text-md ff-font">Founder & Chief Educator, Mendel Academy</p>
      </div>

      {/* Description */}
      <div className="bg-white ff-font p-6 border border-primary">
        <p className="text-center">
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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
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
  <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary transition-all duration-500 hover:-translate-y-2">
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 bg-[#FACC00] rounded-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-[#FACC00] rounded-2xl p-4 transform group-hover:rotate-6 transition-transform duration-500">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <p className="text-lg font-medium text-foreground flex-1 group-hover:text-black transition-colors">{text}</p>
    </div>
  </div>
);

const HexBg = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-5">
    <svg width="800" height="800" viewBox="0 0 100 100" className="animate-spin-slow">
      <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="#f0b100" strokeWidth="0.5" />
    </svg>
  </div>
);