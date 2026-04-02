"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import {
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
  {
    id: 6,
    name: "Dr. Vikram Sethi",
    rating: 5,
    timeAgo: "4 days ago",
    text: "The depth of knowledge shared in these masterclasses is unparalleled. Highly recommend for any serious pathology resident.",
  },
  {
    id: 7,
    name: "Dr. Sneha Kapoor",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Mendel Academy has been a game changer for my preparation. The focus on high-yield topics and WHO classification is spot on.",
  },
  {
    id: 8,
    name: "Dr. Arjun Reddy",
    rating: 5,
    timeAgo: "1 week ago",
    text: "Fantastic sessions! The way the complex concepts are simplified is amazing. Definitely worth every penny.",
  },
  {
    id: 9,
    name: "Dr. Meera Nair",
    rating: 5,
    timeAgo: "3 days ago",
    text: "The practical tips on reporting and the real-world case studies made everything so much clearer. A must-watch for pathologists.",
  },
  {
    id: 10,
    name: "Dr. Karan Johar",
    rating: 5,
    timeAgo: "5 weeks ago",
    text: "I've attended many workshops, but the clarity provided here is unmatched. The molecular pathology section was particularly helpful.",
  },
  {
    id: 11,
    name: "Dr. Pooja Hedge",
    rating: 5,
    timeAgo: "10 days ago",
    text: "Excellent teaching methodology. The use of high-quality digital slides really helps in understanding the morphology better.",
  },
  {
    id: 12,
    name: "Dr. Sameer Khan",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "The comprehensive coverage of tumor pathology and the interactive sessions are great. Thank you Mendel Academy!",
  },
];

const StudentTestimonials = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(testimonials.length / itemsPerPage);
  const currentItems = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-10 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-10">
          {currentItems.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} {...testimonial} index={i} />
          ))}
        </div>

        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </section>
  );
};

export default StudentTestimonials;

/* ----------  SUB-COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center gap-2 mb-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#f0b100]" />
      <span className="text-sm font-medium text-primary ff-font uppercase tracking-wider">
        Student Success Stories
      </span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#f0b100]" />
    </div>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-2xl md:text-5xl ff-font-bold font-bold mb-4"
    >
      What Mendel Students
      <br />
      Say About Us
    </motion.h2>
  </div>
);

const TestimonialCard = ({ name, rating, timeAgo, text, index }: Testimonial & { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="w-full relative bg-white rounded-2xl border-2 border-[#FACC00] p-8 shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-500 overflow-visible"
  >
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FACC00] rounded-full flex items-center justify-center shadow-lg z-10">
      <FaQuoteRight className="text-white" />
    </div>

    <div className="relative">
      <h3 className="text-xl font-bold ff-font-bold mb-2">{name}</h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-[#FACC00]">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-sm text-gray-500 ff-font">{timeAgo}</span>
      </div>

      <p className="ff-font text-sm leading-relaxed text-gray-700 line-clamp-6">{text}</p>
    </div>
  </motion.div>
);

const Pagination = ({ pageCount, onPageChange }: { pageCount: number; onPageChange: (event: { selected: number }) => void }) => (
  <div className="mt-12 flex justify-center">
    {/* <ReactPaginate
      previousLabel={null}
      nextLabel={null}
      breakLabel={"..."}
      onPageChange={onPageChange}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      containerClassName={"flex gap-2"}
      pageClassName={"border border-primary/20 cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white font-medium transition-all"}
      activeClassName={"bg-primary text-white border-primary"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
      breakClassName={"w-10 h-10 flex items-center justify-center"}
    /> */}
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      onPageChange={onPageChange}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      containerClassName={"flex gap-2"}
      pageClassName={"border border-gray-300 cursor-pointer rounded-lg mb-10 w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-yellow-500 hover:text-white font-medium"}
      activeClassName={"bg-[#ffca00] text-black"}
      previousClassName={"border cursor-pointer border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"}
      nextClassName={"border cursor-pointer border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  </div>
);

