"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type Testimonial = {
  id: number;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
};

/* ----------  DATA  ---------- */
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sangam Sodhi",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Mendel's WHO-based tumor masterclasses made a huge difference in how I approach biopsy interpretation. The structured reporting templates and molecular marker explanations helped me understand not just what to diagnose, but why.",
  },
  {
    id: 2,
    name: "Dr. Pallivela Umarani",
    rating: 5,
    timeAgo: "1 week ago",
    text: "The sessions on esophageal lesions were incredibly enlightening. Your detailed discussions added so much value and I found them extremely useful. Thank you so much, Sir 🙏.",
  },
  {
    id: 3,
    name: "Dr. Praveen Kulkarni",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I deeply appreciate the hard work and dedication you put into crafting such elaborate and useful lectures. Thank you!",
  },
  {
    id: 4,
    name: "Dr. Robert Chen",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Your ability to break down complex histomorphology into clear, clinically relevant patterns is outstanding. The systematic approach has transformed my diagnostic confidence.",
  },
  {
    id: 5,
    name: "Dr. Ananya Sharma",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "The immunohistochemistry panels and algorithmic approach to difficult cases are invaluable. This is the most practical pathology teaching I've encountered.",
  },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function MendelStudent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section className="relative py-10  bg-white overflow-hidden">
      <div className="relative max-w-[1380px] mx-auto px-6">
        <Header />
        <Carousel
          testimonials={testimonials}
          currentIndex={currentIndex}
          maxIndex={maxIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDot={(i) => setCurrentIndex(i)}
        />
      </div>
    </section>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center justify-center gap-2 mb-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#f0b100]" />
      <span className="text-sm font-medium text-primary ff-font uppercase tracking-wider">Student Success Stories</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#f0b100]" />
    </div>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-2xl md:text-4xl ff-font-bold font-bold mb-2"
    >
      What Mendel Students<br />Say About Us
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="ff-font text-lg max-w-3xl mx-auto"
    >
      Join thousands of pathology professionals who have transformed their diagnostic skills
    </motion.p>
  </div>
);

const Carousel = ({
  testimonials,
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
  onDot,
}: {
  testimonials: Testimonial[];
  currentIndex: number;
  maxIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) => (
  <div className="relative">
    {/* Arrows */}
    <Arrow onClick={onPrevious} disabled={currentIndex === 0} icon={FaChevronLeft} left />
    <Arrow onClick={onNext} disabled={currentIndex >= maxIndex} icon={FaChevronRight} right />

    {/* Cards */}
    <div className="overflow-hidden px-2 cursor-pointer ">
      <motion.div
        className="flex gap-6 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)` }}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </motion.div>
    </div>

    {/* Dots */}
    <div className="flex justify-center gap-2 mt-3">
      {[...Array(maxIndex + 1)].map((_, i) => (
        <Dot key={i} active={i === currentIndex} onClick={() => onDot(i)} />
      ))}
    </div>
  </div>
);

const Arrow = ({
  onClick,
  disabled,
  icon: Icon,
  left,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ElementType;
  left?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white border-2 border-[#f0b100]/30 shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-[#fff7db] hover:text-white group ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    } ${left ? "-translate-x-4 left-0" : "translate-x-4 right-0"}`}
  >
    <Icon className="text-primary group-hover:text-white" />
  </button>
);

const TestimonialCard = ({ name, rating, timeAgo, text }: Testimonial) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="min-w-[calc(33.333%-1rem)] group relative bg-white rounded-2xl border-2 border-primary p-8 shadow-lg hover:shadow-2xl hover:border-[#f0b100]/40 transition-all duration-500 hover:-translate-y-2"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FACC00] rounded-full flex items-center justify-center shadow-lg">
      <FaQuoteRight className="text-white" />
    </div>

    <h3 className="text-xl font-bold ff-font-bold mb-2">{name}</h3>
    <div className="flex items-center gap-2 mb-3">
      {[...Array(rating)].map((_, i) => (
        <FaStar key={i} className="text-primary" />
      ))}
      <span className="text-sm ff-font">{timeAgo}</span>
    </div>

    <p className="ff-font text-sm leading-relaxed line-clamp-5">{text}</p>
  </motion.div>
);

const Dot = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`h-2 rounded-full transition-all ${active ? "w-8 bg-[#f0b100]" : "w-2 bg-[#f0b100]/40 hover:bg-[#f0b100]/60"}`}
  />
);