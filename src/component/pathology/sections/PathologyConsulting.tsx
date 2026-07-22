import React from 'react';
import { FaHeart, FaUserMd, FaHospital, FaFlask } from 'react-icons/fa';
 
const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";
 
const CONSULT_CARDS = [
  {
    tag: 'A · Diagnostic Excellence',
    items: [
      'Surgical Pathology Second Opinions & Complex Case Consults',
      'Molecular Pathology Specialist Review & Integrated Reporting',
    ],
  },
  {
    tag: 'B · Strategic Advisory — Pharma, CRO & Biotech',
    items: [
      'Biomarker Strategy, CDx Development & Companion Diagnostic Planning',
      'PGx & Precision Oncology Strategy Consulting',
      'Virtual Molecular Tumor Board (vMTB) Program Development',
    ],
  },
  {
    tag: 'C · Turnkey Molecular Lab Implementation',
    items: [
      'Full-spectrum lab setup consulting (IHC / PCR / Flow / FISH / NGS workflows)',
      'Capex/Opex modeling, workflow design, regulatory guidance, and pricing strategy',
      'Ideal for corporate labs, pharmaceutical companies, and oncology hospitals',
    ],
  },
];
 
const IMPACT_CARDS = [
  {
    Icon: FaHeart,
    title: 'Patients',
    desc: 'Faster, more accurate diagnoses and better-matched therapies — improving outcomes and survival.',
  },
  {
    Icon: FaUserMd,
    title: 'Pathologists & Clinicians',
    desc: 'Renewed confidence at the scope and the bedside, with measurably fewer diagnostic errors.',
  },
  {
    Icon: FaHospital,
    title: 'Hospitals & Labs',
    desc: 'Higher patient footfall, stronger therapeutic success, and improved profitability despite rising costs.',
  },
  {
    Icon: FaFlask,
    title: 'Pharma · CRO · Biotech',
    desc: 'Biomarker, CDx & PGx expertise that sharpens trial design, patient stratification, and timelines.',
  },
];
 

const PathologyConsulting = () => {
  return (
    <>
      {/* ================= CONSULTING ================= */}
      <section id="consulting" className={`${FONT} bg-[#FAF7F2] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>
                Consulting
              </span>
            </div>
 
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              When the stakes are high,<br />
              bring in <span className="text-[#E0568F]">35 years of expertise.</span>
            </h2>
 
            <p className="mt-[18px] text-[1.13rem] text-[#5C5575] leading-[1.65]">
              Beyond training — access Dr. Managoli's experience for high-stakes diagnostic and strategic needs.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            {CONSULT_CARDS.map((c) => (
              <div
                key={c.tag}
                className="group relative bg-white border border-[#E6E0D8] rounded-2xl py-[34px] px-[30px] overflow-hidden transition-all duration-[350ms] hover:shadow-[0_22px_48px_rgba(36,30,61,.13)]"
              >
                <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-transform duration-[350ms] group-hover:scale-x-100" />
 
                <span
                  className={`${MONO} inline-block text-[.7rem] tracking-[.14em] uppercase text-white bg-[#150E28] px-[14px] py-[6px] rounded-[6px] mb-4`}
                >
                  {c.tag}
                </span>
 
                <ul className="mt-1 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="relative pl-6 text-[#5C5575] text-[.96rem] leading-[1.65]">
                      <span className="absolute left-0 top-[.5em] w-3 h-[3px] rounded-[2px] bg-[linear-gradient(90deg,#E0568F,#FFC900)]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
 
          <p
            className={`${MONO} mt-[40px] text-[.8rem] tracking-[.02em] text-[#241E3D] bg-white border-2 border-dashed border-[#FFC900] rounded-xl px-[26px] py-[20px] text-center leading-[1.65]`}
          >
            22+ years leading high-volume labs (50,000+ accessions/year) • 40+ Pharma/CRO collaborations • US-India
            dual regulatory and operational perspective
          </p>
 
          <div className="text-center mt-9">
            <button className="inline-flex items-center gap-2.5 bg-[#E0568F] hover:bg-[#B03A6C] text-white font-bold text-base px-[30px] py-[15px] rounded-full border-2 border-transparent transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(224,86,143,.38)]">
              Schedule a 30-Minute Discovery Call <span>→</span>
            </button>
          </div>
        </div>
      </section>
 
      {/* ================= THE IMPACT ================= */}
      <section id="impact" className={`${FONT} bg-[#FAF7F2] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>
                The Impact
              </span>
            </div>
 
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              When interpretation is done right,<br />
              <span className="text-[#E0568F]">everyone</span> wins.
            </h2>
 
            <p className="mt-[18px] text-[1.13rem] text-[#5C5575] leading-[1.65]">
              Better interpretation isn't an academic exercise — it changes outcomes across the entire system of
              care.
            </p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {IMPACT_CARDS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group relative bg-white border border-[#E6E0D8] rounded-2xl py-[30px] px-[26px] overflow-hidden transition-all duration-[350ms] hover:shadow-[0_22px_48px_rgba(36,30,61,.13)]"
              >
                <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-transform duration-[350ms] group-hover:scale-x-100" />
 
                <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F7DCE8] text-[#E0568F] flex items-center justify-center mb-[18px]">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-[1.12rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em] mb-[10px]">
                  {title}
                </h3>
                <p className="text-[#5C5575] text-[.93rem] leading-[1.65]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PathologyConsulting;
