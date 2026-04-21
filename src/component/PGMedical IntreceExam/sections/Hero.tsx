"use client";

import React from "react";

interface HeroProps {
  examName?: string;
}

const Hero: React.FC<HeroProps> = ({ examName }) => {
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const offset = 100;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-900 py-20 px-6 text-center border-b-4 border-primary">
      <p className="text-primary text-xs font-bold tracking-[0.1em] uppercase mb-2 ff-font-bold">
        {examName || "Exam"} Preparation
      </p>
      <h1 className="text-5xl font-black text-white leading-tight mb-5 ff-font-bold">
        Master the exam.
        <br />
        <span className="text-primary">Choose your path.</span>
      </h1>
      <p className="text-base text-[#64748b] max-w-lg mx-auto mb-10 leading-relaxed ff-font">
        From self-paced visual app tools to elite 1:1 physician mentorship. All pricing, no secrets.
      </p>
      <div className="flex justify-center gap-3.5 flex-wrap">
        <button
          onClick={handleScrollToPricing}
          className="px-9 py-3.5 rounded-lg bg-primary text-black font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold"
        >
          VIEW ALL PLANS
        </button>
      </div>
    </section>
  );
};

export default Hero;
