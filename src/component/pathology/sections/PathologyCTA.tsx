"use client";
import React from 'react';
const PathologyCTA = () => {
  return (
    <section className="bg-[#100b16] py-32 px-6 relative overflow-hidden border-t border-[#1E1A29]">
      {/* Background Graphic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full pointer-events-none flex items-center justify-center opacity-30">
        <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-600"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-700"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full border border-gray-800"></div>
      </div>

      <div className="max-w-7xl mx-auto text-left relative z-10 flex flex-col items-start">
        
        <p
          className="text-gray-300 text-sm md:text-base font-serif italic mb-8 max-w-2xl"
        >
          Behind every complex report is a human life — and the right interpretation, delivered by skilled professionals, can change everything.
        </p>
        
        <h2
          className="text-3xl md:text-5xl font-black text-white leading-[1.15] mb-6 ff-font-bold tracking-tight max-w-3xl"
        >
          Ready to Lead in Precision<br />Oncology & Advanced<br />Diagnostics?
        </h2>

        <p
          className="text-gray-400 text-xs ff-font mb-12"
        >
          Pick your path — fellowship, mastery, consulting, or community.
        </p>

        <div
          className="flex flex-wrap justify-start gap-4"
        >
          <button className="px-6 py-3 rounded-full bg-[#FFCA00] text-black font-bold text-[11px] hover:bg-yellow-400 transition-colors ff-font-bold tracking-wide">
            Enroll in the Fellowship →
          </button>
          
          <button className="px-6 py-3 rounded-full bg-[#E94E8F] text-white font-bold text-[11px] hover:opacity-90 transition-opacity ff-font-bold tracking-wide">
            Book a Consulting Discovery Call
          </button>
          
          <button className="px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-bold text-[11px] hover:bg-white/5 transition-colors ff-font-bold tracking-wide">
            Explore Mastery Courses
          </button>
          
          <button className="px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-bold text-[11px] hover:bg-white/5 transition-colors ff-font-bold tracking-wide">
            Join Our WhatsApp Community
          </button>
          
          <button className="px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-bold text-[11px] hover:bg-white/5 transition-colors ff-font-bold tracking-wide">
            Download Free Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default PathologyCTA;
