"use client";
import { FaEarthAmericas, FaTrophy } from "react-icons/fa6";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type Stat = { icon: React.ReactNode; value: string; label: string };

/* ----------  DATA  ---------- */
const stats: Stat[] = [
  { icon: <FaTrophy />, value: "10,000+", label: "USMLE-style MCQs" },
  { icon: <FaEarthAmericas />, value: "15–20%", label: "Performance Boost" },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function MainAbout() {
  return (
    <>
      <Hero />
      <CompanyInfo />
      <Mission />
    </>
  );
}

/* ----------  SECTIONS  ---------- */
const Hero = () => (
  <section className="relative overflow-hidden h-[400px] md:h-[500px]">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(https://www.shutterstock.com/image-photo/artificial-intelligence-content-generator-man-600nw-2471042165.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold ff-font-bold text-white drop-shadow-2xl"
      >
        About Mendel Academy
      </motion.h1>
    </div>
  </section>
);

const CompanyInfo = () => (
  <section className="py-15 bg-gradient-to-b from-background to-secondary/30">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-4 flex justify-center"
          >
            <div className="relative group flex items-center gap-5">
              <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:border-[#ffcc09] transition-all duration-500 hover:shadow-[0_0_35px_#ffcc09]">
                <img
                  src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
                  alt="Mendel Academy Logo"
                  className="w-24 h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold ff-font-bold tracking-tight">
                  Mendel <span className="text-primary ff-font-bold">Academy</span>
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-8 space-y-6"
          >
            <Paragraph>
              <span className="font-bold ff-font text-primary">Mendel EdTech Pvt Ltd (Mendel Academy)</span> is a family-owned startup offering a digital education platform for medical school graduates. Founded in 2015, Mendel Academy offers an adaptive <span className="font-semibold ff-font text-primary">live-online course</span> for students to prepare for highly specialized licensure exams.
            </Paragraph>
            <Paragraph>
              Here at <span className="font-bold ff-font text-primary">Mendel Academy</span>, we have been providing personalized coaching to over <span className="font-bold ff-font text-primary">1000 medical students</span> for licensure exams with special focus on the USMLEs; resulting in over <span className="font-bold ff-font text-primary">90% students matching into top residency programs</span>. In the wake of the pandemic, Mendel Academy has adapted to the changing times and incorporated modern EdTech tools to provide an online coaching paradigm which is now easily accessible for medical students all around the world.
            </Paragraph>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Mission = () => (
  <section className="relative py-12 sm:py-16 bg-[#f9fafb] overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold ff-font-bold mb-4"
        >
          Our Achievements & Vision
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="ff-font max-w-2xl mx-auto text-base sm:text-lg"
        >
          Building excellence in medical education through innovation, accessibility, and precision learning.
        </motion.p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">

        {/* Achievements Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-primary p-6 sm:p-10 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white border border-primary text-primary text-2xl sm:text-3xl">
              <FaTrophy />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold ff-font-bold">Our Achievements</h3>
          </div>

          <p className="ff-font text-base sm:text-lg leading-relaxed">
            At <span className="font-semibold ff-font text-primary">Mendel Academy</span>, we’ve developed a proprietary
            <span className="font-bold ff-font text-primary"> question bank </span>
            of over <span className="font-bold ff-font text-primary">10,000 USMLE-style MCQs</span>, helping students enhance their performance by{" "}
            <span className="font-bold ff-font text-primary">15–20%</span>.
          </p>

          <p className="ff-font text-base sm:text-lg leading-relaxed mt-4">
            We take pride in our unique <span className="font-bold ff-font text-primary">"Mendel SketchNotes"</span>, designed to simplify complex concepts with elegant visuals. Mendel Academy has established its presence in{" "}
            <span className="font-semibold ff-font text-primary">India, USA, Russia, China</span> and beyond.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-primary p-6 sm:p-10 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4 mb-6">
            <img
              src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
              alt="Mendel Academy"
              className="w-16 sm:w-20 h-auto"
            />
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold ff-font-bold leading-tight">Mendel</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight">Academy</h3>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold ff-font-bold mb-4">Our Vision</h3>

          <p className="ff-font text-base sm:text-lg leading-relaxed">
            Our vision at <span className="font-semibold ff-font text-primary">Mendel Academy</span> is to create an{" "}
            <span className="font-bold ff-font text-primary">accessible digital coaching platform</span> that empowers medical students globally — regardless of cost or location.
          </p>

          <div className="mt-6 flex justify-start">
            <div className="flex items-center gap-3 ff-font text-primary font-semibold text-base sm:text-lg">
              <FaEarthAmericas className="text-xl sm:text-2xl" />
              <span>Global Learning, Limitless Access</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);


/* ----------  HELPER  ---------- */
const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl p-8 border border-primary transition-all duration-500">
    <p className="text-lg leading-relaxed ff-font-bold">{children}</p>
  </div>
);