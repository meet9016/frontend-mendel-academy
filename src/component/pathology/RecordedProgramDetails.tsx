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
export default function RecordedProgramDetails() {
  return (
    <>
      <Hero />
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