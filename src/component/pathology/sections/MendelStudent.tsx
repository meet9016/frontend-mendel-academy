"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sangam Sodhi",
    role: "Mastery Series student",
    text: "Mendel's WHO-based tumor masterclasses made a huge difference in how I approach biopsy interpretation.",
    initials: "SS"
  },
  {
    id: 2,
    name: "Dr. Pallivela Umarani",
    role: "Mastery Series student",
    text: "The sessions on esophageal lesions were incredibly enlightening. Your detailed discussions added so much value.",
    initials: "PU"
  },
  {
    id: 3,
    name: "Dr. Praveen Kulkarni",
    role: "Mastery Series student",
    text: "I deeply appreciate the hard work and dedication you put into crafting such elaborate and useful lectures.",
    initials: "PK"
  },
  {
    id: 4,
    name: "Dr. Robert Chen",
    role: "Mastery Series student",
    text: "Your ability to break down complex histomorphology into clear, clinically relevant patterns is outstanding.",
    initials: "RC"
  },
  {
    id: 5,
    name: "Dr. Ananya Sharma",
    role: "Mastery Series student",
    text: "The immunohistochemistry panels and algorithmic approach to difficult cases are invaluable.",
    initials: "AS"
  },
  {
    id: 6,
    name: "Dr. Varalakshmi",
    role: "Mastery Series student",
    text: "Sir, your class is a masterclass — we are keenly listening. Everything is covered, from the basics right up to date. You'd normally think we need to read a lot of books to understand it all, but here you cover everything — and the case-scenario discussions are exceptional. Thank you, Sir.",
    initials: "VA"
  },
  {
    id: 7,
    name: "Dr. Divyaprafulla",
    role: "Mastery Series student",
    text: "Your way of teaching is excellent, Sir. You make us remember important points very easily, with simple explanations and practical approaches. The case scenarios are exceptional and highly informative, making the learning process interesting and easier to understand. Thank you for your dedication and effort in guiding us.",
    initials: "DP"
  },
  {
    id: 8,
    name: "Molecular Dx cohort",
    role: "Verified student",
    text: "Sir, your sessions and way of teaching are excellent. The way you start from fundamental principles and gradually move to detailed mechanisms, practical approach, and clinical correlation is commendable. You make us memorise the important details in a simple manner. The case scenarios — the way you break each case down in layers, discuss differentials, and explain the role of molecular tools in reaching the diagnosis — are truly appreciated. Thank you, Sir, for your constant dedication, guidance, and effort.",
    initials: "“"
  },
  {
    id: 9,
    name: "Dr. Rushit Shah",
    role: "Mastery Series student",
    text: "A wonderful, classic style of teaching — the detailed explanation of everything is unmatchable. Now it's even more fun to learn pathology. The cases are amazingly solved and explained.",
    initials: "RS"
  },
  {
    id: 10,
    name: "Dr. Jyotsna",
    role: "Mastery Series student",
    text: "I highly appreciate the excellent teaching and detailed explanations throughout the classes. The availability of recordings made learning much more convenient and effective. Thank you, Sir.",
    initials: "JY"
  },
  {
    id: 11,
    name: "Dr. Thiriveni Balaji",
    role: "Mastery Series student",
    text: "The sessions were extremely good. Your hard work really shows in the slides, Sir — beautifully planned. The way you highlight the important points is much appreciated; it helps us understand the concepts. Going from basic histology all the way to the molecular part gives us real confidence in the subject. Thank you for the sessions, Sir.",
    initials: "TB"
  },
  {
    id: 12,
    name: "Dr. Arijit Roy",
    role: "Mastery Series student",
    text: "The sessions are extremely detailed and up to date. The approach you teach with is really helpful — it starts with the very basics, like normal physiology and morphology, and dives deep into IHC and the molecular aspects. The Breast IHC sessions were an excellent treatment of topics like the basement membrane, ECM, papillary lesions, and stromal lesions, and the flow-cytometry class was just as thorough — the standout was the clear connection between antibodies and the treatment regimen. I really look forward to the classes and appreciate your rigorous research, wonderful teaching methodology, and the all-out effort that goes into making each session a masterclass. Thank you so much, Sir.",
    initials: "AR"
  },
  {
    id: 13,
    name: "Endometrial Biopsy cohort",
    role: "Verified student",
    text: "I like your way of teaching — explaining every topic in detail, in a simple way. The presentation is a class apart, and the cases make us think through each scenario analytically. Thank you, Sir, for all your effort to make us learn such a difficult part of pathology. I've done your endometrial pathology course as well, and I'm now far more confident in my day-to-day reporting of endometrial pathology. Thank you once again, Sir.",
    initials: "“"
  },
  {
    id: 14,
    name: "Dr. Priya Chandran",
    role: "Mastery Series student",
    text: "Sir, the classes are mind-blowing — your enthusiasm carries us forward. Personally, listening to you motivates me to be a better pathologist: to learn more, do more, and be the best I can be. You are touching more lives than you realise. A true mentor. Thank you, Sir.",
    initials: "PC"
  }
];

export default function MendelStudent() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get active items to display (circular list)
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < cardsPerPage; i++) {
      items.push(testimonials[(startIndex + i) % testimonials.length]);
    }
    return items;
  };

  const visibleTestimonials = getVisibleTestimonials();
  const progressPercent = ((startIndex + cardsPerPage) / testimonials.length) * 100;

  return (
    <section id="testimonials" className="bg-[#FAF8F5] py-20 border-b border-gray-200/50 font-sans select-none overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-6">
        
        {/* Subtitle & Title */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-[34px] h-[1.5px] bg-[#FCCA29]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D54C80] font-bold">STUDENT TESTIMONIALS</span>
            <div className="w-[34px] h-[1.5px] bg-[#FCCA29]" />
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-[#1D172A]">
            What Mendel students <span className="text-[#D54C80]">say.</span>
          </h2>
        </div>

        {/* Carousel Grid Area */}
        <div className="relative flex items-center justify-center gap-4 mb-12">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex p-3.5 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-gray-600 hover:text-black transition duration-150 cursor-pointer shadow-sm z-10"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 transition-all duration-500 ease-in-out">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t) => {
                const isLong = t.text.length > 150;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedTestimonial(t)}
                    className="bg-white border border-[#EBE3D8] rounded-[22px] p-8 relative flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-lg transition duration-300 cursor-pointer group min-h-[250px]"
                  >
                    {/* Floating Quote Mark */}
                    <div className="absolute top-6 right-8 text-6xl text-[#D54C80]/15 font-serif pointer-events-none select-none">
                      “
                    </div>

                    <p className="text-[#1D172A] text-sm md:text-[15px] leading-relaxed mb-6 font-normal line-clamp-4 pr-4">
                      {t.text}
                    </p>

                    <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#FCCA29] flex items-center justify-center text-white font-extrabold text-sm shadow-sm flex-shrink-0">
                        {t.initials === "“" ? (
                          <span className="text-xl font-serif leading-none pb-0.5">“</span>
                        ) : (
                          t.initials
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-[#1D172A] truncate">{t.name}</h4>
                        <p className="text-gray-400 text-xs truncate">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="hidden sm:flex p-3.5 border border-gray-200 rounded-full bg-white hover:bg-gray-50 text-gray-600 hover:text-black transition duration-150 cursor-pointer shadow-sm z-10"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Navigation Indicator & Touch Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* Mobile Buttons */}
          <div className="flex sm:hidden gap-4">
            <button
              onClick={handlePrev}
              className="p-3 border border-gray-200 rounded-full bg-white text-gray-600 hover:text-black cursor-pointer"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-gray-200 rounded-full bg-white text-gray-600 hover:text-black cursor-pointer"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-32 bg-gray-200/60 rounded-full overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#D54C80] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl border border-gray-100 z-10 flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-5 text-gray-400 hover:text-black text-2xl font-semibold transition"
                aria-label="Close"
              >
                ×
              </button>

              <div className="text-5xl text-[#D54C80]/15 font-serif select-none -mb-4">
                “
              </div>

              <blockquote className="text-[#1D172A] text-sm md:text-base leading-relaxed font-normal max-h-[350px] overflow-y-auto pr-2">
                {selectedTestimonial.text}
              </blockquote>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mt-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#FCCA29] flex items-center justify-center text-white font-extrabold text-base shadow-sm flex-shrink-0">
                  {selectedTestimonial.initials === "“" ? (
                    <span className="text-2xl font-serif leading-none pb-1">“</span>
                  ) : (
                    selectedTestimonial.initials
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-[#1D172A]">{selectedTestimonial.name}</h4>
                  <p className="text-gray-400 text-xs md:text-sm">{selectedTestimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}