"use client";
import React from 'react';

// --font = -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', Roboto, sans-serif
const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

const PathologyCTA = () => {
  return (
    <section
      className={`${FONT} relative overflow-hidden text-center py-[120px] px-6`}
      style={{
        background:
          "radial-gradient(1000px 600px at 50% 110%, #1E1540, #150E28)",
      }}
    >
      {/* Background rings — matches .final::before / .final::after */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(255,201,0,0.18)" }}
      ></div>
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[220px] w-[760px] h-[760px] rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(224,86,143,0.14)" }}
      ></div>

      <div className="max-w-[1180px] mx-auto relative z-10 flex flex-col items-center">

        {/* .belief */}
        <p className={`${FONT} max-w-[760px] mb-[30px] text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.5] font-semibold italic text-[#F7DCE8]`}>
          Behind every complex report is a human life — and the right interpretation, delivered by skilled professionals, can change everything.
        </p>

        {/* h2 */}
        <h2 className={`${FONT} text-white text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.025em] max-w-[820px] mb-[18px]`}>
          Ready to Lead in Precision Oncology &amp; Advanced Diagnostics?
        </h2>

        {/* .sub2 */}
        <p className={`${FONT} text-white/70 text-[1.1rem] mb-11`}>
          Pick your path — fellowship, mastery, consulting, or community.
        </p>

        {/* .ctas */}
        <div className="flex flex-wrap justify-center gap-3 relative">
          <button
            className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full border-2 border-transparent bg-[#FFC900] text-[#1A1502] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)]`}
          >
            Enroll in the Fellowship <span className="transition-transform duration-150">→</span>
          </button>

          <button
            className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full border-2 border-transparent bg-[#E0568F] text-white transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#B03A6C] hover:shadow-[0_12px_30px_rgba(224,86,143,0.38)]`}
          >
            Book a Consulting Discovery Call
          </button>

          <button
            className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-transparent text-white border-2 border-white/40 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#FFC900] hover:text-[#FFC900]`}
          >
            Explore Mastery Courses
          </button>

          <button
            className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-transparent text-white border-2 border-white/40 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#FFC900] hover:text-[#FFC900]`}
          >
            Join Our WhatsApp Community
          </button>

          <button
            className={`${FONT} inline-flex items-center gap-2.5 font-bold text-[1rem] px-[30px] py-[15px] rounded-full bg-transparent text-white border-2 border-white/40 transition-transform duration-150 hover:-translate-y-0.5 hover:border-[#FFC900] hover:text-[#FFC900]`}
          >
            Download Free Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default PathologyCTA;