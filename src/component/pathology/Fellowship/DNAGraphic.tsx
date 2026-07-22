import React from 'react';

const DNAGraphic = () => {
  return (
    <div className="relative w-[min(360px,90%)] mx-auto" aria-hidden="true">
      <svg viewBox="0 0 200 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0568F" />
            <stop offset="100%" stopColor="#FFC900" />
          </linearGradient>
        </defs>

        {/* Strands */}
        <g className="animate-[pulse_6s_ease-in-out_infinite]" fill="none" stroke="url(#hg)" strokeWidth="5" strokeLinecap="round">
          <path d="M55 10 C 145 70, 145 110, 55 170 C -35 230, -35 270, 55 330" />
          <path d="M145 10 C 55 70, 55 110, 145 170 C 235 230, 235 270, 145 330" />
        </g>

        {/* Rungs with pulsing opacity */}
        <g strokeLinecap="round" strokeWidth="4">
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="62" y1="34" x2="138" y2="34" stroke="#E0568F" style={{ animationDelay: '0s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="84" y1="62" x2="116" y2="62" stroke="#7A63C4" style={{ animationDelay: '.2s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="84" y1="118" x2="116" y2="118" stroke="#7A63C4" style={{ animationDelay: '.4s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="62" y1="146" x2="138" y2="146" stroke="#FFC900" style={{ animationDelay: '.6s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="62" y1="194" x2="138" y2="194" stroke="#E0568F" style={{ animationDelay: '.8s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="84" y1="222" x2="116" y2="222" stroke="#7A63C4" style={{ animationDelay: '1s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="84" y1="278" x2="116" y2="278" stroke="#7A63C4" style={{ animationDelay: '1.2s' }} />
          <line className="origin-center animate-[pulse_3s_ease-in-out_infinite]" x1="62" y1="306" x2="138" y2="306" stroke="#FFC900" style={{ animationDelay: '1.4s' }} />
        </g>

        {/* Nodes */}
        <g fill="#fff">
          <circle cx="55" cy="10" r="6" />
          <circle cx="145" cy="10" r="6" />
          <circle cx="55" cy="170" r="6" />
          <circle cx="145" cy="170" r="6" />
          <circle cx="55" cy="330" r="6" />
          <circle cx="145" cy="330" r="6" />
        </g>
      </svg>
    </div>
  );
};

export default DNAGraphic;
