"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteRight,
  FaStar,
} from "react-icons/fa";

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

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handlePrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section className="relative py-12 bg-white">
      <div className="relative max-w-[1380px] mx-auto px-6 overflow-visible">
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

/* ---------- HEADER ---------- */
const Header = () => (
  <div className="text-center mb-10">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-2xl md:text-4xl font-bold"
    >
      What Mendel Students <br /> Say About Us
    </motion.h2>
  </div>
);

/* ---------- CAROUSEL ---------- */
const Carousel = ({
  testimonials,
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
  onDot,
}: any) => (
  <div className="relative">
    <Arrow
      onClick={onPrevious}
      disabled={currentIndex === 0}
      icon={FaChevronLeft}
      left
    />
    <Arrow
      onClick={onNext}
      disabled={currentIndex >= maxIndex}
      icon={FaChevronRight}
    />

    <div className="overflow-x-hidden overflow-y-visible px-6 pt-12">
      <motion.div
        className="flex gap-6"
        animate={{
          x: `-${currentIndex * 33.333}%`,
        }}
        transition={{ duration: 0.5 }}
      >
        {testimonials.map((t: Testimonial) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </motion.div>
    </div>

    <div className="flex justify-center gap-2 mt-6">
      {[...Array(maxIndex + 1)].map((_, i) => (
        <Dot key={i} active={i === currentIndex} onClick={() => onDot(i)} />
      ))}
    </div>
  </div>
);

/* ---------- ARROW ---------- */
const Arrow = ({
  onClick,
  disabled,
  icon: Icon,
  left,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-md border transition ${
      left ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
    } ${disabled && "opacity-40"}`}
  >
    <Icon />
  </button>
);

/* ---------- CARD ---------- */
const TestimonialCard = ({ name, rating, timeAgo, text }: Testimonial) => (
  <div className="min-w-[calc(33.333%-1rem)] relative bg-white border border-[#f0b100] rounded-2xl p-6 pt-12 shadow-md hover:shadow-xl transition duration-300">
    
    {/* Quote FIXED */}
    <div className="absolute -top-5 left-6 w-10 h-10 bg-[#f0b100] rounded-full flex items-center justify-center shadow-md">
      <FaQuoteRight className="text-white text-sm" />
    </div>

    <h3 className="text-lg font-semibold mb-2">{name}</h3>

    <div className="flex items-center gap-2 mb-3">
      {[...Array(rating)].map((_, i) => (
        <FaStar key={i} className="text-[#f0b100]" />
      ))}
      <span className="text-sm text-gray-500">{timeAgo}</span>
    </div>

    <p className="text-sm text-gray-600 leading-relaxed line-clamp-5">
      {text}
    </p>
  </div>
);

/* ---------- DOT ---------- */
const Dot = ({ active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`h-2 rounded-full transition-all ${
      active ? "w-6 bg-[#f0b100]" : "w-2 bg-gray-300"
    }`}
  />
);