'use client';

import React from 'react';
 
const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";
 
const WHO = [
  'Practicing Surgical Pathologists and Hematopathologists',
  'Pathologists preparing for subspecialty boards or leadership roles',
  'Hemato-oncologists and Medical Oncologists seeking deeper lab integration',
  'Corporate Lab Directors and Hospital Administrators',
  'Pharma, CRO, and Biotech biomarker/CDx strategy teams',
  'International Medical Graduates targeting FRCPath, ABP, or NEET-SS',
];
 
const MAGNETS = [
  {
    meta: 'Free PDF',
    title: 'Endometrial Biopsy Interpretation Checklist & Diagnostic Algorithm',
    desc: 'A practical, high-yield checklist to improve diagnostic accuracy and reduce missed diagnoses in endometrial biopsies.',
    cta: 'Download Free PDF',
  },
  {
    meta: 'Free Guide',
    title: 'Molecular Pathology Starter Kit: 10 High-Yield Interpretation Pearls',
    desc: 'Key interpretation principles and common pitfalls in NGS, liquid biopsy, and biomarker reporting.',
    cta: 'Download Free Guide',
  },
];
 
const TESTIMONIALS = [
  {
    initials: 'FP',
    quote: '[Placeholder — Fellowship participant quote on confidently leading molecular tumor boards after the program.]',
    name: 'Fellowship Participant',
    role: 'Designation, Institution',
  },
  {
    initials: 'CC',
    quote: '[Placeholder — consulting client quote on biomarker strategy or lab setup engagement.]',
    name: 'Consulting Client',
    role: 'Designation, Organization',
  },
  {
    initials: 'IM',
    quote: "[Placeholder — IMG quote on clearing FRCPath/ABP with Mendel's preparation methods.]",
    name: 'IMG Board Candidate',
    role: 'Designation, Country',
  },
];
 
const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-[34px] h-0.5 bg-[#FFC900]" />
    <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>{children}</span>
  </div>
);
const PathologyFooterSections = () => {
  return (
    <>
      {/* ================= AUDIENCE ================= */}
      <section id="clinical-research" className={`${FONT} bg-[#F3EEE6] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <Eyebrow>Audience</Eyebrow>
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              Who This Is For
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO.map((text) => (
              <div
                key={text}
                className="bg-white border border-[#E6E0D8] rounded-xl py-[22px] px-6 flex gap-[14px] items-start transition-all duration-200 hover:border-[#E0568F] hover:-translate-y-[3px]"
              >
                <span className="text-[#E0568F] font-extrabold shrink-0">→</span>
                <p className="text-[#241E3D] text-[.97rem] font-semibold leading-[1.65]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ================= FREE RESOURCES ================= */}
      <section id="mini-mba" className={`${FONT} bg-[#FAF7F2] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <Eyebrow>Free Resources</Eyebrow>
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              Start with something <span className="text-[#E0568F]">free.</span>
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MAGNETS.map((m) => (
              <div
                key={m.title}
                className="group relative flex flex-col bg-[linear-gradient(140deg,#fff,#FFFBEE)] border border-[#E6E0D8] rounded-2xl py-[34px] px-[30px] overflow-hidden transition-all duration-[350ms] hover:shadow-[0_22px_48px_rgba(36,30,61,.13)]"
              >
                <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-transform duration-[350ms] group-hover:scale-x-100" />
 
                <span className={`${MONO} block text-[.7rem] tracking-[.14em] uppercase text-[#C79A00] mb-4`}>
                  {m.meta}
                </span>
                <h3 className="text-[1.3rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.01em] mb-2.5">
                  {m.title}
                </h3>
                <p className="text-[.98rem] text-[#5C5575] leading-[1.65] flex-1">{m.desc}</p>
 
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-auto pt-6 flex gap-2.5 flex-wrap"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className={`${FONT} flex-1 min-w-[180px] bg-white border-[1.5px] border-[#E6E0D8] rounded-full px-[18px] py-[13px] text-[.95rem] outline-none focus-visible:border-[#FFC900] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[#FFC900]`}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-[#E0568F] hover:bg-[#B03A6C] text-white font-bold text-[.92rem] px-[22px] py-[10px] rounded-full whitespace-nowrap transition-all hover:-translate-y-0.5"
                  >
                    {m.cta}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ================= RESULTS ================= */}
      <section className={`${FONT} bg-[#F3EEE6] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <Eyebrow>Results</Eyebrow>
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              Real Results from Pathologists Worldwide
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.initials} className="relative flex flex-col bg-white border border-[#E6E0D8] rounded-2xl p-8">
                <span className="absolute top-[6px] left-5 text-[4.5rem] font-extrabold leading-none text-[#F7DCE8]">
                  &ldquo;
                </span>
                <p className="relative mt-[34px] mb-6 text-[1.04rem] leading-[1.6] text-[#241E3D] font-medium">
                  {t.quote}
                </p>
                <div className="flex items-center gap-[14px] mt-auto">
                  <div className="w-[50px] h-[50px] rounded-full bg-[linear-gradient(135deg,#E0568F,#4A3D7A)] text-white flex items-center justify-center font-extrabold">
                    {t.initials}
                  </div>
                  <div>
                    <b className="block text-[.95rem] text-[#241E3D]">{t.name}</b>
                    <span className="text-[.82rem] text-[#5C5575]">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PathologyFooterSections;
