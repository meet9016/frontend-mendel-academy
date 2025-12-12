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
export default function HyperspecialistSectionDetails() {
  return (
    <>
      <Hero />
    </>
  );
}

/* ----------  HERO  (identical motion)  ---------- */
const Hero = () => (
 <>
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 Hello
 </>
);