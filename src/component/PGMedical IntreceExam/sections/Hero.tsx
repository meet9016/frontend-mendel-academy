"use client";

import React from "react";

interface HeroProps {
  examName?: string;
  isUSMLEStep1?: boolean;
  isUSMLEStep2?: boolean;
}

const Hero: React.FC<HeroProps> = ({ examName, isUSMLEStep1, isUSMLEStep2 }) => {
  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const offset = 100;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // USMLE Step 2 Hero
  if (isUSMLEStep2) {
    return (
      <section className="bg-gray-900 py-12 px-6 border-b-4 border-primary">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary mb-6">
              <span className="text-primary text-[10px] font-black tracking-[0.15em] uppercase">
                USMLE Step 2 CK Preparation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5 ff-font-bold">
              Your best score starts here.
              <br />
              <span className="text-primary">Starts with Mendel.</span>
            </h1>
            <p className="text-base text-[#64748b] max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed ff-font">
              Step 1 is pass/fail. Step 2 CK is what programs rank you on.
              <br />
              Mendel trains the clinical reasoning the exam rewards.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto md:mx-0">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-primary text-2xl font-black">248</div>
                <div className="text-gray-400 text-[10px]">Avg mentorship score</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-primary text-2xl font-black">+20-40</div>
                <div className="text-gray-400 text-[10px]">Point gain on retakes</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-primary text-2xl font-black">3,000+</div>
                <div className="text-gray-400 text-[10px]">Students matched</div>
              </div>
            </div>
            <div className="flex justify-center md:justify-start gap-3.5 flex-wrap mb-8">
              <button
                onClick={handleScrollToPricing}
                className="px-9 py-3.5 rounded-lg bg-primary text-black font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold cursor-pointer"
              >
                Start your free trial
              </button>
              <button
                className="px-9 py-3.5 rounded-lg border border-[#64748b] text-white font-black text-sm tracking-wide hover:bg-white/10 transition-colors ff-font-bold cursor-pointer"
              >
                Explore the curriculum
              </button>
            </div>
            {/* App Available On */}
            <div className="text-center md:text-left">
              <p className="text-[#64748b] text-[10px] font-bold tracking-[0.1em] uppercase mb-3 ff-font-bold">
                Study anywhere
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                  <span className="text-sm">📱</span> iPhone
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                  <span className="text-sm">📱</span> iPad
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                  <span className="text-sm">💻</span> Desktop
                </div>
              </div>
            </div>
          </div>
          {/* Right Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <svg width="320" height="380" viewBox="0 0 320 380" fill="none">
                <circle cx="160" cy="190" r="120" fill="#FFCA00" fillOpacity="0.1" />
                <circle cx="160" cy="190" r="100" fill="#FFCA00" fillOpacity="0.15" />
                <circle cx="160" cy="190" r="80" fill="#FFCA00" fillOpacity="0.2" />
                {/* Doctor Illustration */}
                <path d="M210 120 C210 95 190 80 160 80 C130 80 110 95 110 120 L110 200 C110 230 130 250 160 250 C190 250 210 230 210 200 Z" fill="#1E1E1E" stroke="#FFCA00" strokeWidth="3" />
                <circle cx="160" cy="90" r="30" fill="#1E1E1E" stroke="#FFCA00" strokeWidth="3" />
                <path d="M145 85 C145 82 148 80 152 80 C155 80 158 82 158 85" stroke="#FFCA00" strokeWidth="2" strokeLinecap="round" />
                <path d="M162 85 C162 82 165 80 169 80 C172 80 175 82 175 85" stroke="#FFCA00" strokeWidth="2" strokeLinecap="round" />
                <path d="M150 100 Q160 108 170 100" stroke="#FFCA00" strokeWidth="2" strokeLinecap="round" />
                <path d="M130 140 L190 140 L190 145 L130 145 Z" fill="#FFCA00" />
                <path d="M125 155 L195 155 L195 220 L125 220 Z" fill="#1E1E1E" stroke="#FFCA00" strokeWidth="3" />
                <circle cx="135" cy="175" r="8" fill="#FFCA00" />
                <circle cx="185" cy="175" r="8" fill="#FFCA00" />
                <path d="M130 140 L120 130 L120 180 L130 180 Z" fill="#1E1E1E" stroke="#FFCA00" strokeWidth="3" />
                <path d="M190 140 L200 130 L200 180 L190 180 Z" fill="#1E1E1E" stroke="#FFCA00" strokeWidth="3" />
                {/* Decorative Stars */}
                <path d="M90 120 L92 125 L97 125 L93 128 L95 133 L90 130 L85 133 L87 128 L83 125 L88 125 Z" fill="#FFCA00" />
                <path d="M230 180 L232 185 L237 185 L233 188 L235 193 L230 190 L225 193 L227 188 L223 185 L228 185 Z" fill="#FFCA00" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default / USMLE Step 1 Hero
  if (isUSMLEStep1) {
    return (
      <section className="bg-gray-900 py-12 px-6 border-b-4 border-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left md:col-span-3">
            <div className="mb-6">
              <span className="text-primary text-[10px] font-black tracking-[0.15em] uppercase">
                USMLE STEP 1 PREPARATION PROGRAM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 ff-font-bold">
              Your success is built on your best choices.
              <br />
              <span className="text-primary">Choose Mendel.</span>
            </h1>
            <div className="flex justify-center md:justify-start gap-3.5 flex-wrap mb-10">
              <button
                onClick={handleScrollToPricing}
                className="px-8 py-3 rounded-md bg-primary text-black font-black text-sm hover:opacity-90 transition-opacity ff-font-bold cursor-pointer"
              >
                Pricing
              </button>
              <button
                className="px-8 py-3 rounded-md border border-white text-white font-black text-sm hover:bg-white/10 transition-colors ff-font-bold cursor-pointer"
              >
                Explore the Curriculum
              </button>
            </div>
            {/* App Available On */}
            <div className="text-center md:text-left">
              <p className="text-primary text-[10px] font-bold tracking-[0.1em] uppercase mb-4 ff-font-bold">
                APP AVAILABLE ON
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2 border border-[#475569] rounded-[14px] text-white text-[11px] ff-font opacity-80">
                  <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> iPhone
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-[#475569] rounded-[14px] text-white text-[11px] ff-font opacity-80">
                  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> iPad
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-[#475569] rounded-[14px] text-white text-[11px] ff-font opacity-80">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> Desktop/Laptop
                </div>
              </div>
            </div>
          </div>
          {/* Right Phone Mockup */}
          <div className="flex justify-center md:col-span-2">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[280px] h-[540px] bg-[#222] border-[12px] border-[#333] rounded-[3rem] p-1.5 relative shadow-2xl">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#333] rounded-full z-10"></div>
                <div className="w-full h-full bg-[#111111] rounded-[2.2rem] overflow-hidden flex flex-col relative scrollbar-hide">
                  {/* Phone Screen Content */}
                  <div className="p-3.5 bg-[#111111] flex-1 overflow-hidden pb-6 flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 mt-1">
                      <div className="w-6 h-6 bg-[#FFCA00] rounded-[5px] flex items-center justify-center text-black font-black text-xs">M</div>
                      <div className="text-white text-sm font-bold tracking-wide">Mendel Galaxy</div>
                    </div>
                    
                    {/* Today's Study */}
                    <div className="bg-[#1C1C1C] rounded-xl p-2.5 mb-3 border border-white/5">
                      <div className="text-[#FFCA00] text-[8px] font-black uppercase tracking-wider mb-1.5">Today's Study</div>
                      <div className="text-gray-300 text-[10px] mb-2 font-medium">Cardiology · 12 Qbank Qs</div>
                      <div className="w-full h-1 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFCA00] w-[40%] rounded-full"></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                        <div className="text-[#FFCA00] text-xl font-black mb-0.5">248</div>
                        <div className="text-gray-500 text-[9px] font-medium">Avg Score</div>
                      </div>
                      <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                        <div className="text-[#FFCA00] text-xl font-black mb-0.5">87%</div>
                        <div className="text-gray-500 text-[9px] font-medium">Accuracy</div>
                      </div>
                    </div>

                    {/* Mendel Chitras */}
                    <div className="bg-[#1C1C1C] rounded-xl p-2.5 mb-3 border border-white/5">
                      <div className="text-[#FFCA00] text-[8px] font-black uppercase tracking-wider mb-2">Mendel Chitras</div>
                      <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#EAE1D0]">
                        <img src="/images/download.jpg" alt="Mendel Chitra" className="w-full h-[85px] object-cover" />
                      </div>
                    </div>

                    {/* Rapid Recall */}
                    <div className="bg-[#1C1C1C] rounded-xl p-2.5 border border-white/5 mb-2">
                      <div className="text-[#FFCA00] text-[8px] font-black uppercase tracking-wider mb-2">Rapid Recall · Cardiology</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFCA00] font-bold text-[10px] w-10">HFrEF</span>
                          <span className="text-gray-400 text-[10px]">EF &lt;40% · ACEi + BB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFCA00] font-bold text-[10px] w-10">HFpEF</span>
                          <span className="text-gray-400 text-[10px]">EF ≥50% · Diuretics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFCA00] font-bold text-[10px] w-10">BNP</span>
                          <span className="text-gray-400 text-[10px]">&gt;400 = HF likely</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              {/* "See the app in action" Label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-xl whitespace-nowrap z-20">
                <span className="text-black text-sm font-bold">
                  See the app in action &darr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 py-12 px-6 border-b-4 border-primary">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left md:col-span-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary mb-6">
            <span className="text-primary text-[10px] font-black tracking-[0.15em] uppercase">
              {examName || "Exam"} Preparation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5 ff-font-bold">
            Your success is built on your best choices.
            <br />
            <span className="text-primary">Choose Mendel.</span>
          </h1>
          <p className="text-base text-[#64748b] max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed ff-font">
            From self-paced visual app tools to elite 1:1 physician mentorship. All pricing, no secrets.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto md:mx-0">
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-primary text-2xl font-black">248</div>
              <div className="text-gray-400 text-[10px]">Avg mentorship score</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-primary text-2xl font-black">87%</div>
              <div className="text-gray-400 text-[10px]">QBank accuracy</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="text-primary text-2xl font-black">1,200+</div>
              <div className="text-gray-400 text-[10px]">Students matched</div>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-3.5 flex-wrap mb-8">
            <button
              onClick={handleScrollToPricing}
              className="px-9 py-3.5 rounded-lg bg-primary text-black font-black text-sm tracking-wide hover:opacity-90 transition-opacity ff-font-bold cursor-pointer"
            >
              Pricing
            </button>
            <button
              className="px-9 py-3.5 rounded-lg border border-[#64748b] text-white font-black text-sm tracking-wide hover:bg-white/10 transition-colors ff-font-bold cursor-pointer"
            >
              Explore the Curriculum
            </button>
          </div>
          {/* App Available On */}
          <div className="text-center md:text-left">
            <p className="text-[#64748b] text-[10px] font-bold tracking-[0.1em] uppercase mb-3 ff-font-bold">
              App available on
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                <span className="text-sm">📱</span> iPhone
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                <span className="text-sm">📱</span> iPad
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 border border-[#64748b] rounded-lg text-[#64748b] text-[10px] ff-font">
                <span className="text-sm">💻</span> Desktop/Laptop
              </div>
            </div>
          </div>
        </div>
        {/* Right Phone Mockup */}
        <div className="flex justify-center md:col-span-2">
          <div className="relative">
            {/* Phone Frame */}
              <div className="w-[280px] h-[540px] bg-[#222] border-[12px] border-[#333] rounded-[3rem] p-1.5 relative shadow-2xl">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#333] rounded-full z-10"></div>
                <div className="w-full h-full bg-[#111111] rounded-[2.2rem] overflow-hidden flex flex-col relative scrollbar-hide">
                  {/* Phone Screen Content */}
                  <div className="p-4 bg-[#111111] flex-1 overflow-y-auto pb-8">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6 mt-3">
                      <div className="w-7 h-7 bg-[#FFCA00] rounded-[6px] flex items-center justify-center text-black font-black text-sm">M</div>
                      <div className="text-white text-base font-bold tracking-wide">Mendel Galaxy</div>
                    </div>
                    
                    {/* Today's Study */}
                    <div className="bg-[#1C1C1C] rounded-xl p-3.5 mb-4 border border-white/5">
                      <div className="text-[#FFCA00] text-[9px] font-black uppercase tracking-wider mb-2.5">Today's Study</div>
                      <div className="text-gray-300 text-xs mb-3 font-medium">Cardiology · 12 Qbank Qs</div>
                      <div className="w-full h-1 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFCA00] w-[40%] rounded-full"></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#1C1C1C] p-3.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                        <div className="text-[#FFCA00] text-2xl font-black mb-1">248</div>
                        <div className="text-gray-500 text-[10px] font-medium">Avg Score</div>
                      </div>
                      <div className="bg-[#1C1C1C] p-3.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                        <div className="text-[#FFCA00] text-2xl font-black mb-1">87%</div>
                        <div className="text-gray-500 text-[10px] font-medium">Accuracy</div>
                      </div>
                    </div>

                    {/* Mendel Chitras */}
                    <div className="bg-[#1C1C1C] rounded-xl p-3.5 mb-4 border border-white/5">
                      <div className="text-[#FFCA00] text-[9px] font-black uppercase tracking-wider mb-3">Mendel Chitras</div>
                      <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-[#EAE1D0]">
                        <img src="/images/11.jpg" alt="Mendel Chitra" className="w-full h-auto object-cover" />
                      </div>
                    </div>

                    {/* Rapid Recall */}
                    <div className="bg-[#1C1C1C] rounded-xl p-3.5 border border-white/5">
                      <div className="text-[#FFCA00] text-[9px] font-black uppercase tracking-wider mb-3">Rapid Recall · Cardiology</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-[#FFCA00] font-bold text-xs w-12">HFrEF</span>
                          <span className="text-gray-400 text-xs">EF &lt;40% · ACEi + BB</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#FFCA00] font-bold text-xs w-12">HFpEF</span>
                          <span className="text-gray-400 text-xs">EF ≥50% · Diuretics</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#FFCA00] font-bold text-xs w-12">BNP</span>
                          <span className="text-gray-400 text-xs">&gt;400 = HF likely</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              {/* "See the app in action" Label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-xl whitespace-nowrap z-20">
                <span className="text-black text-sm font-bold">
                  See the app in action &darr;
                </span>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
