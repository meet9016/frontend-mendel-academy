"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

interface ConsultingCtaSectionProps {
  onOpenBookModal: () => void;
}

const ConsultingCtaSection = ({ onOpenBookModal }: ConsultingCtaSectionProps) => {
  return (
    <section className={`${FONT} bg-[#150E28] py-[80px] md:py-[100px] px-6 text-center text-white relative overflow-hidden`}>
      <div className="max-w-[880px] mx-auto relative z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Start with a conversation.
        </h2>
        <p className="text-[#B5B0C8] text-[1.05rem] sm:text-[1.15rem] max-w-[600px] mx-auto mb-8 font-normal leading-relaxed">
          30 minutes. No obligation. Bring your hardest problem.
        </p>
        <button
          onClick={onOpenBookModal}
          className="inline-flex items-center gap-2 bg-[#FFC900] text-[#1A1502] font-bold text-[0.95rem] py-3.5 px-8 rounded-full hover:bg-[#FFD633] transition-all hover:scale-105 shadow-lg cursor-pointer"
        >
          Schedule a call <span className="font-extrabold">→</span>
        </button>
      </div>
    </section>
  );
};

export default ConsultingCtaSection;
