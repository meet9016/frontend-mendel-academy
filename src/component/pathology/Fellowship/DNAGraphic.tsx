import React from 'react';
import { motion } from 'framer-motion';

const DNAGraphic = () => {
  return (
    <div className="relative w-full max-w-[400px] h-[500px]">
      {/* Abstract DNA SVG */}
      <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-2xl">
        
        {/* Left Strand (starts Top-Left, curves Right, then Left to Mid-Left, then bulges Left to Bottom-Left) */}
        {/* Gradient for left strand: Pink to Yellow */}
        <defs>
          <linearGradient id="leftStrand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E94E8F" />
            <stop offset="30%" stopColor="#FFCA00" />
            <stop offset="60%" stopColor="#E94E8F" />
            <stop offset="100%" stopColor="#FFCA00" />
          </linearGradient>
          <linearGradient id="rightStrand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E94E8F" />
            <stop offset="30%" stopColor="#E94E8F" />
            <stop offset="60%" stopColor="#FFCA00" />
            <stop offset="100%" stopColor="#FFCA00" />
          </linearGradient>
        </defs>

        {/* Top Section - Figure 8 */}
        {/* Left Strand */}
        <motion.path 
          d="M 160 100 C 260 120, 260 200, 160 240" 
          stroke="url(#leftStrand)" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Right Strand */}
        <motion.path 
          d="M 240 100 C 140 120, 140 200, 240 240" 
          stroke="url(#rightStrand)" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Bottom Section - Bulb */}
        {/* Left Bulb */}
        <motion.path 
          d="M 160 240 C 50 300, 50 400, 160 450" 
          stroke="url(#leftStrand)" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
        {/* Right Bulb */}
        <motion.path 
          d="M 240 240 C 350 300, 350 400, 240 450" 
          stroke="url(#rightStrand)" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />

        {/* Horizontal Rungs (Top Section) */}
        {/* Rung 1 */}
        <motion.line x1="170" y1="125" x2="230" y2="125" stroke="#E94E8F" strokeWidth="4" strokeLinecap="round" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} />
        {/* Rung 2 */}
        <motion.line x1="190" y1="160" x2="210" y2="160" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7 }} />
        {/* Rung 3 */}
        <motion.line x1="170" y1="215" x2="230" y2="215" stroke="#FFCA00" strokeWidth="4" strokeLinecap="round" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9 }} />

        {/* Horizontal Rungs (Bottom Bulb Section) */}
        {/* Rung 4 (Wide, Pink) */}
        <motion.line x1="120" y1="280" x2="280" y2="280" stroke="#E94E8F" strokeWidth="4" strokeLinecap="round" opacity="0.8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5 }} />
        {/* Rung 5 (Narrow, Purple) */}
        <motion.line x1="160" y1="320" x2="240" y2="320" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" opacity="0.8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.7 }} />
        {/* Rung 6 (Narrow, Purple) */}
        <motion.line x1="160" y1="380" x2="240" y2="380" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" opacity="0.8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9 }} />
        {/* Rung 7 (Wide, Yellow) */}
        <motion.line x1="120" y1="420" x2="280" y2="420" stroke="#FFCA00" strokeWidth="4" strokeLinecap="round" opacity="0.8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.1 }} />

        {/* Nodes (White dots) */}
        {[
          { cx: 160, cy: 100 }, { cx: 240, cy: 100 }, // Top
          { cx: 160, cy: 240 }, { cx: 240, cy: 240 }, // Mid
          { cx: 160, cy: 450 }, { cx: 240, cy: 450 }  // Bottom
        ].map((pos, idx) => (
          <motion.circle 
            key={idx} cx={pos.cx} cy={pos.cy} r="5" fill="white"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.3 + (idx * 0.1) }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
        ))}

      </svg>
    </div>
  );
};

export default DNAGraphic;
