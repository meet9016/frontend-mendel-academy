import React from 'react';

const experiences = [
  {
    number: "01",
    title: "Problem Based Learning",
    description: "Learn core concepts through clinico-pathological problem solving."
  },
  {
    number: "02",
    title: "Onion Skin Technique",
    description: "Peel the case layer by layer until the diagnosis is undeniable."
  },
  {
    number: "03",
    title: "Mendel Chitras",
    description: "One sketch, a whole pathway — recalled at a glance."
  },
  {
    number: "04",
    title: "Monthly vMTB",
    description: "You don't watch the tumor board — you run it."
  },
  {
    number: "05",
    title: "Digital Slide Libraries",
    description: "Thousands of slides, zero glass — practice anytime, anywhere."
  },
  {
    number: "06",
    title: "7 Step Clinical Reasoning",
    description: "Problem solving technique using stepwise, disciplined reasoning."
  },
  {
    number: "07",
    title: "Global Community",
    description: "Access to 2,500+ peers worldwide, one click away."
  },
  {
    number: "08",
    title: "AI Enhanced Learning",
    description: "An AI study partner that sharpens your knowledge."
  }
];

const PathologyExperience = () => {
  return (
    <section id="learning-experience" className="bg-[#fcfcfb] py-24 px-6 relative">
      <div className="max-w-6xl mx-auto text-left">
        <div
          className="flex items-center justify-center md:justify-start gap-3 mb-6"
        >
          <div className="w-6 h-[1px] bg-yellow-500"></div>
          <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase ff-font-bold">
            METHOD
          </span>
        </div>
        
        <h2
          className="text-3xl md:text-5xl font-black text-black leading-[1.15] mb-16 ff-font-bold tracking-tight text-center md:text-left"
        >
          The Mendel Learning Experience
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <span className="text-[#FFCA00] text-xs font-bold mb-3 ff-font-bold block">
                {exp.number}
              </span>
              <h3 className="text-sm font-bold text-black mb-2 ff-font-bold leading-tight">
                {exp.title}
              </h3>
              <p className="text-gray-600 text-xs ff-font leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sample Chitra Carousel Placeholder */}
        <div
        >
          <div className="w-full bg-[#f8eef3] rounded-3xl p-10 flex flex-col items-center justify-center min-h-[400px] border border-pink-100/50">
            <div className="text-[#E94E8F] mb-4 opacity-70 flex flex-col items-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <span className="text-[#E94E8F] text-[10px] font-bold tracking-[0.2em] uppercase ff-font-bold">
              SAMPLE CHITRA - 01
            </span>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="w-4 h-1.5 rounded-full bg-[#E94E8F]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PathologyExperience;
