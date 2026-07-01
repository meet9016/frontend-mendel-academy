import React from 'react';
import { FaPlay } from 'react-icons/fa';

const PathologyHero = () => {
  return (
    <section id="hero" className="bg-[#100b16] pt-20 pb-0 overflow-hidden relative border-b-2 border-[#1E1A29]">
      {/* Background gradients/glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E94E8F]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mb-16">
        
        {/* Left Content */}
        <div
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#E94E8F]"></div>
            <span className="text-[#FFCA00] text-[10px] font-bold tracking-widest uppercase ff-font-bold">
              ADVANCED PATHOLOGY • PRECISION MEDICINE
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.05] mb-6 ff-font-bold tracking-tight">
            See what others<br />
            miss. <span className="text-[#E94E8F]">Diagnose<br />what others<br />can't.</span>
          </h1>
          
          <p className="text-[#FFCA00] text-xl md:text-2xl font-bold mb-10 ff-font-bold">
            Mendel Academy — The Career Accelerator
          </p>
        </div>

        <div
          className="flex justify-center items-center h-full relative"
        >
          <div className="relative w-full max-w-[450px] aspect-square rounded-full border border-gray-700/50 bg-[#161221]/30 p-8 flex items-center justify-center">
            {/* Inner circle border */}
            <div className="absolute inset-4 rounded-full border border-gray-700/50"></div>
            
            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-gray-700/50"></div>
              <div className="absolute w-[1px] h-full bg-gray-700/50"></div>
            </div>

            {/* Cells SVG */}
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
              {/* Top Left Cell (Pink) */}
              <circle cx="140" cy="140" r="50" fill="url(#paint0_radial)" opacity="0.8"/>
              <circle cx="140" cy="140" r="15" fill="#100b16"/>
              
              {/* Bottom Right Cell (Purple/Pink) */}
              <circle cx="250" cy="280" r="45" fill="url(#paint1_radial)" opacity="0.7"/>
              <circle cx="250" cy="280" r="12" fill="#100b16"/>
              
              {/* Small Yellow Cell */}
              <circle cx="310" cy="280" r="15" fill="url(#paint2_radial)" opacity="0.9"/>
              <circle cx="310" cy="280" r="4" fill="#100b16"/>
              
              {/* Right Middle Cell (Purple) */}
              <circle cx="280" cy="180" r="30" fill="url(#paint3_radial)" opacity="0.6"/>
              <circle cx="280" cy="180" r="8" fill="#100b16"/>

              <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 140) rotate(90) scale(50)">
                  <stop stopColor="#E94E8F" />
                  <stop offset="1" stopColor="#E94E8F" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 280) rotate(90) scale(45)">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#E94E8F" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(310 280) rotate(90) scale(15)">
                  <stop stopColor="#FFCA00" />
                  <stop offset="1" stopColor="#FFCA00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint3_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(280 180) rotate(90) scale(30)">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            
            {/* Measurement label */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-[10px] ff-font opacity-60">
              <div className="w-8 h-[1px] bg-white/60 mb-1 mx-auto"></div>
              100 μm
            </div>
          </div>
        </div>

      </div>

      {/* Yellow Ticker */}
      <div className="w-full bg-[#FFCA00] py-3 overflow-hidden relative border-y border-[#FFCA00]">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-12 items-center text-black font-bold text-xs tracking-widest uppercase ff-font-bold px-6">
            <span>PATHOLOGY MECHANISMS</span>
            <span>vMTB</span>
            <span>IHC</span>
            <span>IF</span>
            <span>FLOW</span>
            <span>FISH</span>
            <span>PCR</span>
            <span>NGS</span>
            <span>PGx</span>
            <span>LIQUID BIOPSY</span>
            <span>CDx</span>
            <span>ADC</span>
            <span>BIOMARKERS</span>
            <span>THERAPY SELECTION</span>
            <span>RESISTANCE MECHANISMS</span>
            <span>vMTB</span>
            
            {/* Duplicate for seamless scrolling */}
            <span>PATHOLOGY MECHANISMS</span>
            <span>vMTB</span>
            <span>IHC</span>
            <span>IF</span>
            <span>FLOW</span>
            <span>FISH</span>
            <span>PCR</span>
            <span>NGS</span>
            <span>PGx</span>
            <span>LIQUID BIOPSY</span>
            <span>CDx</span>
            <span>ADC</span>
            <span>BIOMARKERS</span>
            <span>THERAPY SELECTION</span>
            <span>RESISTANCE MECHANISMS</span>
            <span>vMTB</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full py-16 bg-[#161221]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="pt-6 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-[#E94E8F] mb-3 ff-font-bold">35+</h3>
            <p className="text-[#A3A8B8] text-[10px] font-bold tracking-widest uppercase ff-font-bold">YEARS IN ONCOPATHOLOGY & MEDICINE</p>
          </div>
          <div className="pt-6 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-[#FFCA00] mb-3 ff-font-bold">2,500+</h3>
            <p className="text-[#A3A8B8] text-[10px] font-bold tracking-widest uppercase ff-font-bold">CLINICIANS IN OUR NETWORK</p>
          </div>
          <div className="pt-6 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-[#E94E8F] mb-3 ff-font-bold">12</h3>
            <p className="text-[#A3A8B8] text-[10px] font-bold tracking-widest uppercase ff-font-bold">US PATENTS</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default PathologyHero;
