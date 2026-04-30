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
          {course.course_title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg ff-font mt-auto max-w-4xl mx-auto"
        >
          {course.hero_subtitle}
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
          <ImageCard course={course} />
        </motion.div>

        {/* Right Details */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          <DetailsCard course={course} />
            {/* <CtaCard /> */}
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
    <div className="bg-white/70 rounded-3xl overflow-hidden shadow-lg border-2 border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={course.course_image || "https://www.snexplores.org/wp-content/uploads/2020/05/1030_SS_amoeba-1028x579.png"}
          alt={course.course_title}
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
    <div className="bg-white/70 rounded-3xl p-8 shadow-lg border-2 border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
      <h2 className="text-3xl font-bold ff-font-bold mb-4">{course.course_title}</h2>
      <p className="text-muted-foreground ff-font mb-6">{course.hero_subtitle}</p>

      <InstructorCard instructor={course.instructor} />

      {masterFeatures.length > 0 && (
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
      )}

      {courseIncludes.length > 0 && (
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
        {formattedDate}
    </div>
    {/* Time */}
    <div className="text-xs sm:text-sm ff-font mt-1">
        {formattedTime}
    </div>
</div>
  );
};

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


const InstructorCard = ({ instructor }: { instructor: any }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
    {/* Top Section */}
    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4">
      <img
        src="https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg"
        alt={instructor?.name}
        className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary"
      />
      <div className="text-center sm:text-left">
        <h3 className="text-lg ff-font-bold">{instructor?.name}</h3>
        <p className="text-sm ff-font">
          {instructor?.qualification}
        </p>
      </div>
    </div>
    {/* Stats Row */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm mb-3">
      {instructor?.experience && (
      <div className="flex items-center gap-2">
        <FaAward className="text-primary" />
        <span className="ff-font">{instructor.experience}</span>
      </div>
      )}
      {instructor?.students_taught && (
      <div className="flex items-center gap-2">
        <FaUserGraduate className="text-primary" />
        <span className="ff-font">{instructor.students_taught}</span>
      </div>
      )}
    </div>
    {/* Quote */}
    {instructor?.quote && (
    <div className="border-l-4 border-[#FFCA00] pl-4 ff-font text-sm italic">
        "{instructor.quote}"
    </div>
    )}
  </div>
);
