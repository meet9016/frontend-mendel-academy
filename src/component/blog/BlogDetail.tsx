"use client";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";

/* ----------  TYPES  ---------- */
type Social = { Icon: React.ElementType; href: string };

/* ----------  DATA  ---------- */
const socials: Social[] = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
  { Icon: FaWhatsapp, href: "#" },
  { Icon: FaTiktok, href: "#" },
];

/* ----------  MAIN PAGE  ---------- */
export default function BlogDetail() {
  return (
    <>
      <Hero />
      <Article />
    </>
  );
}

/* ----------  HERO  (identical motion)  ---------- */
const Hero = () => (
  <section className="relative w-full h-[80vh] overflow-hidden">
    <motion.img
      src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
      alt="Blog Hero"
      className="w-full h-full object-cover object-center"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    />
  </section>
);

/* ----------  ARTICLE  (identical motion)  ---------- */
const Article = () => (
  <section className="max-w-4xl mx-auto px-6 md:px-10 -mt-32 relative z-10">
    <Card />
    <MainContent />
  </section>
);

/* ----------  CARD  (tag, title, author, date)  ---------- */
const Card = () => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Tag />
    <Title />
    <Author />
  </motion.div>
);

const Tag = () => (
  <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary rounded-full mb-6"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <FiTag className="w-4 h-4 text-primary" />
    <span className="text-sm font-semibold ff-font-bold text-primary">NEET PG • USMLE • PLAB</span>
  </motion.div>
);

const Title = () => (
  <motion.h1
    className="text-4xl font-bold ff-font-bold mb-6 leading-tight"
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    viewport={{ once: true }}
  >
    Global Medical Entrance Exam Coaching with Mendel Academy
  </motion.h1>
);

const Author = () => (
  <motion.div
    className="flex flex-wrap items-center gap-6 text-sm ff-font border-t border-gray-200 pt-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-[#ffca00] flex items-center justify-center text-black font-bold">PS</div>
      <span className="font-medium text-gray-800">Dr. Priya Sharma</span>
    </div>
    <div className="flex items-center gap-2">
      <FiCalendar className="w-4 h-4" />
      <span>March 5, 2025</span>
    </div>
    <div className="flex items-center gap-2">
      <FiClock className="w-4 h-4" />
      <span>8 min read</span>
    </div>
  </motion.div>
);

/* ----------  MAIN CONTENT  (prose + share)  ---------- */
const MainContent = () => (
  <motion.article
    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
    initial={{ y: 80, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Prose />
    <Share />
  </motion.article>
);

const Prose = () => (
  <div className="prose max-w-none prose-p:ff-font prose-headings:ff-font">
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
      Why Choose Mendel Academy?
    </motion.h2>
    <p>
      Mendel Academy combines AI-powered personalization with expert mentoring to create the most effective medical entrance exam preparation experience.
    </p>
    <h2>Comprehensive Coverage</h2>
    <p>Prepare for NEET PG, USMLE, PLAB, and more with a single adaptive platform tailored to your learning style.</p>
    <h2>AI-Powered Personalization</h2>
    <p>The platform identifies your strengths and weaknesses to focus study time efficiently, improving your retention and confidence.</p>
    <h2>Expert Faculty & Support</h2>
    <p>Our experienced medical educators and toppers guide you with strategies, live sessions, and peer discussions.</p>
  </div>
);

const Share = () => (
  <motion.div
    className="mt-12 pt-8 border-t border-gray-200"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h3 className="text-lg font-semibold ff-font-bold mb-4">Share this article</h3>
    <div className="flex items-center gap-3 text-xl ff-font">
      {socials.map(({ Icon, href }, i) => (
        <motion.a
          key={i}
          href={href}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#ffca00] hover:text-white transition-all"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon />
        </motion.a>
      ))}
    </div>
  </motion.div>
);