'use client';

import { motion } from 'framer-motion';

const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

const DETAILS = [
  {
    label: 'Format',
    text: '100% virtual, PBL-driven live program with Virtual Molecular Tumor Boards (vMTB)',
  },
  {
    label: 'Focus',
    text: 'H&E, IHC, IF, Flow, FISH, PCR, NGS, PGx, resistance mechanisms, CDx/ADC biomarkers, therapy selection, microbiology',
  },
  {
    label: 'Methodology',
    text: 'Problem-Based Learning (PBL) + Onion Skin Technique + Mendel Chitras + 7-step clinical reasoning',
  },
  {
    label: 'Designed for',
    text: 'Surgical pathologists, hematopathologists, oncologists, hemato-oncologists, residents, and fellows',
  },
];

const OUTCOMES = [
  'Confidently interpret and clinically integrate complex morphologic, immunophenotypic, and molecular information using NGS, liquid biopsy, and multi-omic results to guide therapy selection',
  'Lead or actively contribute to Molecular Tumor Boards with authority and structured reasoning',
  'Design and implement reflex testing algorithms and companion diagnostic (CDx) strategies in your institution',
  'Reduce diagnostic uncertainty in challenging cases using proven frameworks (Onion Skin Technique)',
  'Mentor colleagues and build precision oncology capabilities within your team or department',
  'Position yourself for leadership roles such as Molecular Pathology Consultant, Lab Director, or Tumor Board Lead',
];

const AdvancedPathologyHero = () => {
  return (
    <section id="fellowship" className={`${FONT} bg-[#150E28] relative overflow-hidden py-24 px-6`}>
      {/* decorative glow */}
      <div className="absolute -top-[180px] -right-[140px] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(224,86,143,.18),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1180px] mx-auto relative">
        {/* section head */}
        <div className="max-w-[780px] mb-[52px]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[34px] h-0.5 bg-[#FFC900]" />
            <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-white/55`}>
              Flagship Program
            </span>
          </div>

          <span
            className={`${MONO} inline-block text-[.7rem] tracking-[.16em] uppercase bg-[#FFC900] text-[#1A1502] px-4 py-[7px] rounded-full mb-[18px] font-medium`}
          >
            ★ Flagship · Next Cohort Enrolling
          </span>

          <motion.h2
            className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-white leading-[1.08] tracking-[-.025em] mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            12-Month Virtual Fellowship in Molecular Pathology Interpretation & Precision Oncology
          </motion.h2>

          <motion.p
            className="mt-[18px] text-[1.13rem] text-white/72"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The most comprehensive interpretation-focused program for practicing pathologists who want to lead in
            precision oncology.
          </motion.p>
        </div>

        {/* detail grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-[42px]">
          {DETAILS.map((d, i) => (
            <motion.div
              key={d.label}
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-[22px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <b className={`${MONO} block text-[.7rem] tracking-[.14em] uppercase text-[#FFC900] font-medium mb-2`}>
                {d.label}
              </b>
              <span className="text-[.97rem] text-white/85">{d.text}</span>
            </motion.div>
          ))}
        </div>

        {/* outcomes card */}
        <motion.div
          className="relative bg-white rounded-2xl px-8 py-10 md:px-[42px] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-[linear-gradient(180deg,#E0568F,#FFC900)]" />

          <h3 className="text-[1.45rem] font-extrabold text-[#241E3D] mb-[22px]">
            What You Will Be Able To Do After This Program
          </h3>

          <ul className="grid grid-cols-1 md: grid-cols-2 gap-x-[30px] gap-y-4 list-none">
            {OUTCOMES.map((o) => (
              <li key={o} className="relative pl-8 text-[.97rem] text-[#5C5575]">
                <span className="absolute left-0 top-px w-[21px] h-[21px] rounded-full bg-[#E0568F] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {o}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-3.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button className="group inline-flex items-center gap-2.5 px-[30px] py-[15px] rounded-full bg-[#FFC900] text-[#1A1502] font-bold text-base transition-all duration-[180ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,.35)]">
            Apply Now / Enroll in Next Cohort{' '}
            <span className="inline-block transition-transform duration-[180ms] group-hover:translate-x-1">→</span>
          </button>
          <button className="inline-flex items-center gap-2.5 px-[30px] py-[15px] rounded-full border-2 border-white/40 text-white font-bold text-base transition-all hover:border-[#FFC900] hover:text-[#FFC900] hover:-translate-y-0.5">
            Download Full Fellowship Brochure
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedPathologyHero;
