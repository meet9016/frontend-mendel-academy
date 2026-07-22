'use client';
 
import { useState } from 'react';
 
const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";
 
const EXPERIENCES = [
  { number: 'M·01', title: 'Problem-Based Learning', description: 'Learn core concepts through clinico-pathological problem solving.' },
  { number: 'M·02', title: 'Onion Skin Technique', description: 'Peel the case layer by layer until the diagnosis is undeniable.' },
  { number: 'M·03', title: 'Mendel Chitras', description: 'One sketch, a whole pathway — recalled at a glance.' },
  { number: 'M·04', title: 'Monthly vMTB', description: "You don't watch the tumor board — you run it." },
  { number: 'M·05', title: 'Digital Slide Libraries', description: 'Thousands of slides, zero glass — practice anytime, anywhere.' },
  { number: 'M·06', title: '7-Step Clinical Reasoning', description: 'Problem solving technique using stepwise, disciplined reasoning.' },
  { number: 'M·07', title: 'Global Community', description: 'Access to 2,500+ peers worldwide, one click away.' },
  { number: 'M·08', title: 'AI-Enhanced Learning', description: 'An AI study partner that sharpens your knowledge.' },
];
 
const CHITRAS = [
  {
    label: 'Sample Chitra · 01',
    paths: (
      <>
        <path d="M14 50V20l10-8 16 6 10-4v30" />
        <path d="M14 50h46M24 24v22M40 26v22" />
        <circle cx="32" cy="36" r="4" />
      </>
    ),
  },
  {
    label: 'Sample Chitra · 02',
    paths: (
      <>
        <circle cx="32" cy="14" r="6" />
        <circle cx="16" cy="42" r="6" />
        <circle cx="48" cy="42" r="6" />
        <path d="M32 20v8M28 30 18 38M36 30l10 8" />
      </>
    ),
  },
  {
    label: 'Sample Chitra · 03',
    paths: (
      <>
        <rect x="12" y="12" width="40" height="40" rx="3" />
        <path d="M12 26h40M12 40h40M26 12v40M40 12v40" />
      </>
    ),
  },
  {
    label: 'Sample Chitra · 04',
    paths: (
      <>
        <path d="M12 22l20-8 20 8-20 8z" />
        <path d="M12 32l20 8 20-8M12 42l20 8 20-8" />
      </>
    ),
  },
  {
    label: 'Sample Chitra · 05',
    paths: (
      <>
        <circle cx="20" cy="22" r="6" />
        <circle cx="44" cy="18" r="5" />
        <circle cx="46" cy="42" r="6" />
        <circle cx="22" cy="44" r="5" />
        <path d="M25 24l15-4M25 26l19 13M40 22l5 14M26 41l15 2" />
      </>
    ),
  },
];
 

const PathologyExperience = () => {
const [slide, setSlide] = useState(0);
 
  const prev = () => setSlide((s) => (s - 1 + CHITRAS.length) % CHITRAS.length);
  const next = () => setSlide((s) => (s + 1) % CHITRAS.length);
 
  return (
    <section id="learning-experience" className={`${FONT} bg-[#FAF7F2] py-24 px-6 relative`}>
      <div className="max-w-[1180px] mx-auto text-left">
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[34px] h-0.5 bg-[#FFC900]" />
          <span className={`${MONO} text-[.72rem] font-normal tracking-[.18em] uppercase text-[#5C5575]`}>
            Method
          </span>
        </div>
 
        <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em] mb-13">
          The Mendel Learning Experience
        </h2>
 
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-[30px]">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.number}
              className="flex flex-col bg-white border border-[#E6E0D8] rounded-[14px] px-6 py-[26px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(36,30,61,.1)]"
            >
              <span className={`${MONO} block text-[.68rem] tracking-[.12em] text-[#C79A00] mb-3`}>
                {exp.number}
              </span>
              <h3 className="text-[1.04rem] font-bold text-[#241E3D] mb-2 leading-tight">
                {exp.title}
              </h3>
              <p className="text-[.9rem] text-[#5C5575] leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
 
        {/* Chitra deck */}
        <div>
          <div className="overflow-hidden rounded-[18px]">
            <div
              className="flex transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)]"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {CHITRAS.map((c) => (
                <div key={c.label} className="min-w-full box-border shrink-0">
                  <div
                    className="border-2 border-dashed border-[#E6E0D8] rounded-[18px] flex flex-col items-center justify-center gap-3.5"
                    style={{ aspectRatio: '16/7', background: 'linear-gradient(140deg, #fff, #F7DCE8)' }}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[62px] h-[62px] opacity-85 text-[#E0568F]"
                    >
                      {c.paths}
                    </svg>
                    <span className={`${MONO} text-[.72rem] tracking-[.16em] uppercase text-[#5C5575]`}>
                      {c.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-[18px]">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous chitra"
              className="w-11 h-11 rounded-full border border-[#E6E0D8] bg-white text-[#241E3D] flex items-center justify-center transition-all hover:border-[#E0568F] hover:text-[#E0568F] hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
 
            <div className="flex items-center gap-2">
              {CHITRAS.map((c, i) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Go to chitra ${i + 1}`}
                  className={`h-[9px] rounded-full transition-all duration-200 ${
                    i === slide ? 'w-[26px] bg-[#E0568F]' : 'w-[9px] bg-[#E6E0D8]'
                  }`}
                />
              ))}
            </div>
 
            <button
              type="button"
              onClick={next}
              aria-label="Next chitra"
              className="w-11 h-11 rounded-full border border-[#E6E0D8] bg-white text-[#241E3D] flex items-center justify-center transition-all hover:border-[#E0568F] hover:text-[#E0568F] hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathologyExperience;
