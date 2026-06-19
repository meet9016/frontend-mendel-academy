"use client";

import React from "react";

interface TestimonialsSectionProps {}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const testimonials = [
    {
      name: "Riaa S.",
      role: "Internal Medicine, USMLE Step 1: 241",
      text: "The Mendel Chitras changed how I think about disease mechanisms. I stopped memorizing and started understanding.",
    },
    {
      name: "Arjun M.",
      role: "Neurology, IMG, Step 1: 248, Step 2: 265",
      text: "As an IMG, I needed a structured, efficient approach. Mendel gave me exactly that. The Qbank explanations are unlike anything else — they teach you to think, not just recall.",
    },
    {
      name: "Priya K.",
      role: "Psychiatry, Repeat test-taker — 241",
      text: "I had failed Step 2 once before. Dr. Matangoff's mentorship completely rebuilt my approach. The Rapid Recall sheets saved me the week before the exam.",
    },
  ];

  const stats = [
    { number: "95%", label: "Match rate among mentorship students" },
    { number: "248", label: "Average Step 2 CK score" },
    { number: "1,200+", label: "Students trained worldwide" },
    { number: "40+", label: "Specialties matched" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Mentoring Section */}
        <div className="mb-16">
          <div className="bg-gray-900 rounded-2xl p-10 border-4 border-primary">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-gray-900 text-3xl flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-3 ff-font-bold">
                  Designer Customized 1:1 Mentoring
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xl mx-auto leading-relaxed ff-font">
                  For the student who requires a high-performance roadmap tailored to personal clinical strengths and weaknesses.
                </p>
                <button className="px-10 py-3.5 bg-primary text-black font-black text-sm uppercase tracking-wide rounded-lg cursor-pointer hover:opacity-90 transition-opacity ff-font-bold" style={{ backgroundColor: "#FFCA00" }}>
                  Contact us for details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2 ff-font-bold">
              Students who matched their dream residency
            </h2>
            <p className="text-sm text-gray-600 ff-font">
              Real outcomes from real Mendel students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 ff-font-bold">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 ff-font">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic ff-font">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-primary mb-1 ff-font-bold">
                  {stat.number}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide ff-font">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
