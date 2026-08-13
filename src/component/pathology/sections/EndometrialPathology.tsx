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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

/* ----------  TYPES  ---------- */
type Feature = { icon: React.ElementType; text: string };
type Include = { icon: React.ElementType; text: string };
type Stat = { icon: React.ElementType; value: string; label: string };

/* ----------  MAIN COMPONENT  ---------- */
export default function EndometrialPathology() {
  const { list, loadings } = useSelector((state: RootState) => state.data);
  
  // Find the endometrial course or default to the first one
  const course = list.find((c: any) => 
    c.course_title?.toLowerCase().includes("endometrial")
  ) || list[0];

  if (loadings || !course) {
    return null; // Or show a skeleton
  }

  const masterFeatures: Feature[] = course.master_features?.map((text: string) => ({
    icon: FaCheckCircle,
    text: text
  })) || [];

  const courseIncludes: Include[] = course.course_includes?.map((text: string, i: number) => {
    const icons = [FaVideo, FaBookOpen, FaAward, FaFileAlt, FaClock, FaComments];
    return {
      icon: icons[i % icons.length],
      text: text
    };
  }) || [];

  const stats: Stat[] = [
    { icon: FaUser, value: course.students_enrolled || "0", label: "Students Enrolled" },
    { icon: FaClock, value: course.duration || "N/A", label: "Program Duration" },
    { icon: FaAward, value: course.left_this_week || "0", label: "Left This Week" },
  ];

  return (
    <>
      <HeroSection course={course} />
    </>
  );
}

/* ----------  SECTIONS  ---------- */
const HeroSection = ({ course }: { course: any }) => (
  <section className="bg-[#FAF8F5] py-16 font-sans">
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12 space-y-4">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#1D172A] text-3xl md:text-4xl font-extrabold"
        >
          {course.course_title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[#5C5575] text-lg max-w-4xl mx-auto leading-relaxed"
        >
          {course.hero_subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 mt-10 lg:grid-cols-12 gap-10">
        {/* Left Image Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <ImageCard course={course} />
        </motion.div>

        {/* Right Details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          <DetailsCard course={course} />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ----------  SUB-COMPONENTS  ---------- */
const ImageCard = ({ course }: { course: any }) => {
  const stats: Stat[] = [
    { icon: FaUser, value: course.students_enrolled || "0", label: "Students Enrolled" },
    { icon: FaClock, value: course.duration || "N/A", label: "Program Duration" },
    { icon: FaAward, value: course.left_this_week || "0", label: "Left This Week" },
  ];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#EBE8E2] hover:border-[#FFCA00] hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={course.course_image || "https://www.snexplores.org/wp-content/uploads/2020/05/1030_SS_amoeba-1028x579.png"}
          alt={course.course_title}
          className="w-full h-56 sm:h-72 object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%] mx-auto -mt-6 relative z-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 text-center border border-[#EBE8E2] shadow-sm hover:shadow-md hover:border-[#FFCA00]/30 transition-all"
          >
            <stat.icon className="w-6 h-6 mx-auto text-[#D54C80] mb-2" />
            <div className="text-[#1D172A] text-xl sm:text-2xl font-black">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#5C5575] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6 mt-2 sm:mt-4">
        <NextSessionCard date={course.date} />
        <TestimonialCard />
      </div>
    </div>
  );
};


const DetailsCard = ({ course }: { course: any }) => {
  const masterFeatures: Feature[] = course.master_features?.map((text: string) => ({
    icon: FaCheckCircle,
    text: text
  })) || [];

  const courseIncludes: Include[] = course.course_includes?.map((text: string, i: number) => {
    const icons = [FaVideo, FaBookOpen, FaAward, FaFileAlt, FaClock, FaComments];
    return {
      icon: icons[i % icons.length],
      text: text
    };
  }) || [];

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#EBE8E2] hover:border-[#FFCA00] hover:shadow-lg transition-all duration-300">
      <h2 className="text-[#1D172A] text-3xl font-extrabold mb-4">{course.course_title}</h2>
      <p className="text-[#5C5575] text-sm md:text-base mb-6 leading-relaxed">{course.hero_subtitle}</p>

      <InstructorCard instructor={course.instructor} />

      {masterFeatures.length > 0 && (
        <div className="mt-6">
          <h3 className="text-[#1D172A] text-base font-extrabold flex items-center gap-2 mb-4">
            <span className="text-[#D54C80]">★</span> What You'll Master:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {masterFeatures.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl p-3 hover:border-[#FFCA00]/30 transition-all">
                <span className="w-5 h-5 rounded-full bg-[#FAF1F5] flex items-center justify-center text-[#D54C80] text-xs font-bold border border-[#F5E2EC]">✓</span>
                <span className="text-xs font-semibold text-[#3E3A4A]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {courseIncludes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-[#1D172A] text-base font-extrabold flex items-center gap-2 mb-4">
            <span className="text-[#D54C80]">●</span> Course Includes:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {courseIncludes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl p-3 hover:border-[#FFCA00]/30 transition-all">
                <item.icon className="w-4 h-4 text-[#D54C80]" />
                <span className="text-xs font-semibold text-[#3E3A4A]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ----------  ATOMIC COMPONENTS  ---------- */
const NextSessionCard = ({ date }: { date: string }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const formattedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className="bg-[#FFC900] text-black p-5 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
        <span className="text-xs uppercase font-extrabold tracking-wider opacity-85">
          Next Session
        </span>
        <div className="bg-white/80 text-black font-bold flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs">
          <FaCalendarAlt className="w-3 h-3 text-[#D54C80]" /> Live
        </div>
      </div>
      {/* Date */}
      <div className="text-black text-lg font-black">
        {formattedDate}
      </div>
      {/* Time */}
      <div className="text-xs mt-1 font-semibold opacity-75">
        {formattedTime}
      </div>
    </div>
  );
};

const TestimonialCard = () => (
  <div className="bg-white rounded-2xl border border-[#EBE8E2] p-5 shadow-sm">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[#D54C80] text-sm">★</span>
      ))}
    </div>
    <p className="text-[#1D172A] text-xs font-semibold mb-2 leading-relaxed">"Dramatically improved my diagnostic confidence"</p>
    <p className="text-[11px] text-[#5C5575]">
      – <span className="font-bold text-[#1D172A]">Dr. Sarah Chen</span>, Pathologist
    </p>
  </div>
);

const InstructorCard = ({ instructor }: { instructor: any }) => (
  <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#EBE8E2] mb-6">
    {/* Top Section */}
    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4">
      <img
        src="https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg"
        alt={instructor?.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[#D54C80]/30 shadow-sm"
      />
      <div className="text-center sm:text-left">
        <h3 className="text-[#1D172A] text-base font-extrabold">{instructor?.name}</h3>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">
          {instructor?.qualification}
        </p>
      </div>
    </div>
    {/* Stats Row */}
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3 text-[#5C5575] font-semibold">
      {instructor?.experience && (
        <div className="flex items-center gap-1.5">
          <span className="text-[#D54C80]">★</span>
          <span>{instructor.experience}</span>
        </div>
      )}
      {instructor?.students_taught && (
        <div className="flex items-center gap-1.5">
          <span className="text-[#D54C80]">●</span>
          <span>{instructor.students_taught}</span>
        </div>
      )}
    </div>
    {/* Quote */}
    {instructor?.quote && (
      <div className="border-l-2 border-[#D54C80] pl-4 text-xs italic text-[#5C5575] leading-relaxed">
        "{instructor.quote}"
      </div>
    )}
  </div>
);
