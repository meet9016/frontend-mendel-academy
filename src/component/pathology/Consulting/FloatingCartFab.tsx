"use client";

import React from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";

interface FloatingCartFabProps {
  count: number;
  onClick: () => void;
}

const FloatingCartFab = ({ count, onClick }: FloatingCartFabProps) => {
  if (count <= 0) return null;

  return (
    <button
      onClick={onClick}
      className={`${FONT} fixed bottom-6 right-6 z-[9000] inline-flex items-center gap-3 bg-[#241E3D] text-white px-6 py-3.5 rounded-full shadow-[0_14px_34px_rgba(21,14,40,0.34)] border border-white/10 hover:scale-105 hover:-translate-y-1 transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-4`}
      aria-label="View selected items"
    >
      {/* Shopping Cart Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-white"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      <span className="font-bold text-[0.95rem] tracking-wide">
        Your selection
      </span>

      {/* Yellow Count Badge */}
      <span className="bg-[#FFC900] text-[#1A1502] font-black text-[0.8rem] min-w-[24px] h-[24px] rounded-full inline-flex items-center justify-center px-1.5 shadow-sm">
        {count}
      </span>
    </button>
  );
};

export default FloatingCartFab;
