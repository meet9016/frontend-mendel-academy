"use client";
import CommonButton from "@/comman/Button";
import React from "react";
import {
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaComments,
  FaFileAlt,
  FaMagic,
  FaStar,
  FaUser,
  FaUserGraduate,
  FaVideo,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type Feature = { icon: React.ElementType; text: string };
type Include = { icon: React.ElementType; text: string };
type Stat = { icon: React.ElementType; value: string; label: string };

/* ----------  DATA  ---------- */
const masterFeatures: Feature[] = [
  { icon: FaCheckCircle, text: "Diagnose complex endometrial pathologies" },
  { icon: FaCheckCircle, text: "Navigate challenging cases with confidence" },
  { icon: FaCheckCircle, text: "Apply latest diagnostic criteria" },
  { icon: FaCheckCircle, text: "Build systematic approach to evaluation" },
];

const courseIncludes: Include[] = [
  { icon: FaVideo, text: "16 Live Interactive Sessions" },
  { icon: FaBookOpen, text: "Recorded Lectures Access" },
  { icon: FaAward, text: "Digital Certificate" },
  { icon: FaFileAlt, text: "Case Study Library" },
  { icon: FaClock, text: "Lifetime Access" },
  { icon: FaComments, text: "Expert Q&A Support" },
];

const stats: Stat[] = [
  { icon: FaUser, value: "64", label: "Students Enrolled" },
  { icon: FaClock, value: "8 weeks", label: "Program Duration" },
  { icon: FaAward, value: "36", label: "Left This Week" },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function EndometrialPathology() {
  return (
    <>
      <HeroSection />
      {/* <DetailsSection /> */}
    </>
  );
}

/* ----------  SECTIONS  ---------- */
const HeroSection = () => (
  <section className="bg-[#f9fafb]  py-10 ">
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl ff-font-bold  font-bold"
        >
          Advanced Endometrial
          Pathology Program
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg ff-font mt-auto"
        >
          Comprehensive training designed to enhance diagnostic confidence in complex endometrial pathology.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 mt-10 lg:grid-cols-12 gap-10">
        {/* Left Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <ImageCard />
        </motion.div>

        {/* Right Details */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          <DetailsCard />
          {/* <CtaCard /> */}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ----------  SUB-COMPONENTS  ---------- */
const ImageCard = () => (
  <div className="bg-white/70 rounded-3xl overflow-hidden shadow-lg border border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
    {/* Image */}
    <div className="overflow-hidden">
      <img
        src="https://www.snexplores.org/wp-content/uploads/2020/05/1030_SS_amoeba-1028x579.png"
        alt="Endometrial pathology specimen"
        className="w-full h-56 sm:h-72 object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>
    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%] mx-auto -mt-6 relative z-10">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 text-center border border-[#f0b100]/30 shadow-md hover:shadow-lg transition-all"
        >
          <stat.icon className="w-6 h-6 mx-auto text-primary mb-2" />
          <div className="text-xl sm:text-2xl ff-font-bold font-bold">{stat.value}</div>
          <div className="text-xs ff-font text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
    {/* Content */}
    <div className="p-4 sm:p-6 space-y-6 mt-2 sm:mt-4">
      <NextSessionCard />
      <TestimonialCard />
    </div>
  </div>
);


const DetailsCard = () => (
  <div className="bg-white/70 rounded-3xl p-8 shadow-lg border border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
    <h2 className="text-3xl font-bold ff-font-bold mb-4">Interpretation of Endometrial Biopsies</h2>
    <p className="text-muted-foreground ff-font mb-6">Master the complexities of endometrial pathology with confidence and precision.</p>

    <InstructorCard />

    <div className="mt-6">
      <h3 className="text-xl font-semibold ff-font-bold flex items-center gap-2">
        <FaChartLine className="w-5 h-5 text-primary" />
        What You'll Master:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {masterFeatures.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#f9fafb] rounded-xl p-3 hover:bg-[#f9fafb] cursor-pointer transition-all">
            <item.icon className="w-5 h-5 text-primary" />
            <span className="text-sm ff-font">{item.text}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-6">
      <h3 className="text-xl font-semibold ff-font-bold flex items-center gap-2">
        <FaMagic className="w-5 h-5 text-primary" />
        Course Includes:
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {courseIncludes.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#f9fafb] rounded-xl p-3 hover:bg-[#f9fafb] cursor-pointer transition-all">
            <item.icon className="w-4 h-4 text-primary" />
            <span className="text-sm ff-font">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// const CtaCard = () => (
//   <div className="bg-[#FFCA00] rounded-3xl p-8 text-black shadow-md relative overflow-hidden group">
//     <div className="relative z-10 flex flex-col gap-6">
//       <div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start">
//         <CommonButton
//           onClick={() =>
//             window.open(
//               "https://docs.google.com/forms/d/1yyf1DbaORWmGhkv3wCKL9XMXUrinumuxSv8SyUOcc9Q/edit?usp=forms_home&ouid=107875348860911010529&ths=true",
//               "_blank"
//             )
//           }
//           pyClass="py-4"
//           pxClass="px-10"
//           fontWeight={700}
//           fontSize={14}
//           className="group bg-white hover:bg-white"
//         >
//           <div className="flex items-center gap-2 ff-font-bold">
//             <span>Register Now</span>
//             <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </div>
//         </CommonButton>
//         <CommonButton pyClass="py-4" pxClass="px-8" fontWeight={700} fontSize={14} className="group border border-black ff-font-bold">
//           More Details
//         </CommonButton>
//       </div>
//       <p className="text-sm ff-font opacity-90 text-center sm:text-left">Small cohort sizes ensure personalized attention • Expert-led instruction</p>
//     </div>
//   </div>
// );

/* ----------  ATOMIC COMPONENTS  ---------- */
const NextSessionCard = () => (
  <div className="bg-[#FFCA00] text-black p-4 sm:p-5 rounded-2xl shadow-md">
    {/* Header */}
    <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
      <span className="text-xs sm:text-sm ff-font opacity-80">
        Next Session
      </span>
      <div className="bg-white/20 text-black ff-font flex items-center gap-1 px-2 py-1 rounded-md text-xs sm:text-sm">
        <FaCalendarAlt className="w-3 h-3" /> Live
      </div>
    </div>
    {/* Date */}
    <div className="text-lg sm:text-xl ff-font-bold font-bold">
      Thursday, Sep 11
    </div>
    {/* Time */}
    <div className="text-xs sm:text-sm ff-font mt-1">
      9:00 PM GMT+5:30
    </div>
  </div>
);

const TestimonialCard = () => (
  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-primary" />
      ))}
    </div>
    <p className="text-black ff-font mb-2">"Dramatically improved my diagnostic confidence"</p>
    <p className="text-sm text-black ff-font">
      – <span className="font-semibold text-black ff-font-bold">Dr. Sarah Chen</span>, Pathologist
    </p>
  </div>
);


const InstructorCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
    {/* Top Section */}
    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4">
      <img
        src="https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg"
        alt="Dr. Nandkishore Managoli"
        className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary"
      />
      <div className="text-center sm:text-left">
        <h3 className="text-lg ff-font-bold">Dr. Nandkishore Managoli</h3>
        <p className="text-sm ff-font">
          MD, Senior Surgical & Digital Pathologist
        </p>
      </div>
    </div>
    {/* Stats Row */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm mb-3">
      <div className="flex items-center gap-2">
        <FaAward className="text-primary" />
        <span className="ff-font">30+ Years Experience</span>
      </div>
      <div className="flex items-center gap-2">
        <FaUserGraduate className="text-primary" />
        <span className="ff-font">1000+ Students Taught</span>
      </div>
    </div>
    {/* Quote */}
    <div className="border-l-4 border-[#FFCA00] pl-4 ff-font text-sm">
      "Focused on advancing diagnostic accuracy through systematic evaluation approaches and evidence-based practice."
    </div>
  </div>
);
