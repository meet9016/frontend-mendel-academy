"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  initials: string;
  bg: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sangam Sodhi",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Mendel's WHO-based tumor masterclasses made a huge difference in how I approach biopsy interpretation. The structured reporting templates and molecular marker explanations helped me understand not just what to diagnose, but why.",
    initials: "SS",
    bg: "bg-[#D97706]"
  },
  {
    id: 2,
    name: "Dr. Pallivela Umarani",
    rating: 5,
    timeAgo: "1 week ago",
    text: "The sessions on esophageal lesions were incredibly enlightening. Your detailed discussions added so much value and I found them extremely useful. Thank you so much, Sir 🙏.",
    initials: "PU",
    bg: "bg-[#EA580C]"
  },
  {
    id: 3,
    name: "Dr. Praveen Kulkarni",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I deeply appreciate the hard work and dedication you put into crafting such elaborate and useful lectures. Thank you!",
    initials: "PK",
    bg: "bg-[#0284C7]"
  }
];

export default function MendelStudent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-white py-20 border-t border-b border-gray-100 font-sans">
      <div className="max-w-[1380px] mx-auto px-6">
        
        {/* Subtitle & Title */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FFC900] font-black">Student Testimonials</span>
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-[#1D172A]">
            What Mendel students <span className="text-[#D54C80]">say.</span>
          </h2>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#FAF8F5] border border-[#EBE8E2] rounded-2xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300">
              <div className="absolute top-6 right-8 text-6xl text-[#D54C80]/15 font-serif pointer-events-none select-none">“</div>
              
              <p className="text-[#1D172A] text-sm md:text-base leading-relaxed mb-8 relative z-10">
                {t.text}
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1D172A]">{t.name}</h4>
                  <p className="text-gray-400 text-xs">Mastery Series student</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-500 transition duration-150">
            <FaChevronLeft className="w-3 h-3" />
          </button>
          <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gray-400 rounded-full" />
          </div>
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-500 transition duration-150">
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}