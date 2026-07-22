'use client';
 
const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";
 
const COURSES = [
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    title: 'Breast Pathology Mastery',
    desc: 'Core biopsies to receptors — the highest-volume cancer specimen you sign out.',
    seats: 'Starts Sep 2 · 9 seats left',
    seatsPct: '72%',
  },
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    title: 'Lung Pathology Mastery',
    desc: 'Small biopsies, cytology, and the molecular reflexes that drive therapy.',
    seats: 'Starts Sep 30 · 13 seats left',
    seatsPct: '48%',
  },
];
 
const BOARD_CARDS = [
  {
    meta: 'For IMGs',
    title: 'FRCPath Part 2',
    desc: 'Practical-emphasis preparation built for international medical graduates: digital slide libraries, structured case dissection with the Onion Skin Technique, and hybrid mentorship.',
  },
  {
    meta: 'India Subspecialty',
    title: 'NEET-SS',
    desc: 'Onco-Pathology, Clinical Haematology, and Medical Genetics tracks with targeted Qbanks, visual mnemonics, and exam-pattern reasoning practice.',
  },
  {
    meta: 'US Boards',
    title: 'ABP Subspecialty Exams',
    desc: 'Hematopathology, Molecular Genetic Pathology, and more — Qbanks, digital slides, and mentorship aligned to ABP subspecialty blueprints.',
  },
];

const PathologyMasteryCourses = () => {
  return (
   <>
      {/* ================= MASTERY COURSES ================= */}
      <section id="mastery-courses" className={`${FONT} bg-[#FAF7F2] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>
                Mastery Courses
              </span>
            </div>
 
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              Go deep, <span className="text-[#E0568F]">fast.</span>
            </h2>
 
            <p className="mt-[18px] text-[1.13rem] text-[#5C5575]">
              High-impact, focused programs for rapid skill elevation in high-complexity diagnostic areas. Enroll in
              an upcoming cohort, reserve the series running now, or buy past courses on demand.
            </p>
          </div>
 
          {/* status tabs */}
          <div className="flex flex-wrap gap-3 mb-2">
            <button className="inline-flex items-center gap-2.5 font-bold text-[.98rem] text-[#241E3D] bg-[#FFF8E3] border-[1.5px] border-[#C79A00] rounded-full px-5 py-[11px] shadow-[0_10px_26px_rgba(36,30,61,.12)] transition-all hover:-translate-y-0.5">
              <span className="w-[9px] h-[9px] rounded-full bg-[#C79A00]" />
              Upcoming
              <b className={`${MONO} text-[.78rem] bg-white rounded-full px-2.5 py-0.5 text-[#241E3D] min-w-[22px] text-center`}>
                2
              </b>
            </button>
            <button className="inline-flex items-center gap-2.5 font-bold text-[.98rem] text-[#241E3D] bg-white border-[1.5px] border-[#E6E0D8] rounded-full px-5 py-[11px] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(36,30,61,.1)]">
              <span className="relative w-[9px] h-[9px] rounded-full bg-[#E0568F]">
                <span className="absolute inset-0 rounded-full bg-[#E0568F] animate-ping opacity-50" />
              </span>
              In Session
              <b className={`${MONO} text-[.78rem] bg-[#FAF7F2] rounded-full px-2.5 py-0.5 text-[#5C5575] min-w-[22px] text-center`}>
                2
              </b>
            </button>
            <button className="inline-flex items-center gap-2.5 font-bold text-[.98rem] text-[#241E3D] bg-white border-[1.5px] border-[#E6E0D8] rounded-full px-5 py-[11px] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(36,30,61,.1)]">
              <span className="w-[9px] h-[9px] rounded-full bg-[#4A3D7A]" />
              On-Demand
              <b className={`${MONO} text-[.78rem] bg-[#FAF7F2] rounded-full px-2.5 py-0.5 text-[#5C5575] min-w-[22px] text-center`}>
                2
              </b>
            </button>
          </div>
 
          {/* course cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[30px]">
            {COURSES.map((c) => (
              <article
                key={c.title}
                className="flex flex-col bg-white border border-[#E6E0D8] border-t-4 border-t-[#FFC900] rounded-[18px] overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(36,30,61,.14)]"
              >
                <div className="relative pt-[26px] px-[26px]">
                  <span
                    className={`${MONO} absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 text-[.64rem] tracking-[.1em] uppercase font-semibold bg-[#FFC900] text-[#1A1502] px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(36,30,61,.1)]`}
                  >
                    ★ Enrolling
                  </span>
 
                  <div className="w-[54px] h-[54px] rounded-[14px] bg-[linear-gradient(140deg,#F7DCE8,#fff)] border border-[#E6E0D8] flex items-center justify-center text-[#E0568F] mt-1.5 mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      {c.icon}
                    </svg>
                  </div>
 
                  <h4 className="text-[1.18rem] font-extrabold text-[#241E3D] tracking-[-.01em] mb-2 leading-tight">
                    {c.title}
                  </h4>
                  <p className="text-[.92rem] text-[#5C5575]">{c.desc}</p>
                </div>
 
                <div className="px-[26px] py-[18px] flex-1">
                  <div className="mb-4">
                    <div className="h-[7px] rounded-full bg-[#E6E0D8] overflow-hidden mb-1.5">
                      <span className="block h-full bg-[linear-gradient(90deg,#E0568F,#FFC900)]" style={{ width: c.seatsPct }} />
                    </div>
                    <span className={`${MONO} text-[.7rem] tracking-[.04em] font-semibold text-[#B03A6C]`}>{c.seats}</span>
                  </div>
 
                  <div className="flex items-baseline gap-2.5 flex-wrap mt-1">
                    <b className="text-[1.7rem] font-extrabold tracking-[-.02em] text-[#241E3D]">$690</b>
                    <s className="text-[#5C5575] text-base">$890</s>
                    <em className={`${MONO} not-italic text-[.66rem] tracking-[.08em] uppercase text-[#C79A00] bg-[#FFF3CC] rounded-full px-2.5 py-[3px]`}>
                      Early-bird
                    </em>
                  </div>
                </div>
 
                <div className="px-[26px] pb-[26px]">
                  <button className="w-full justify-center inline-flex items-center gap-2.5 bg-[#E0568F] hover:bg-[#B03A6C] text-white font-bold text-base rounded-full py-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(224,86,143,.38)]">
                    Enroll Now <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
 
          {/* bottom banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[.95rem] text-[#5C5575]">
              Breast, Lung, Prostate &amp; more launching regularly.{' '}
              <strong className="text-[#241E3D]">White-label &amp; corporate programs available.</strong>
            </p>
            <button className="inline-flex items-center gap-2.5 px-[22px] py-[10px] rounded-full border-2 border-[#241E3D] text-[#241E3D] font-bold text-[.92rem] whitespace-nowrap transition-all hover:bg-[#241E3D] hover:text-white">
              View All Mastery Courses <span>→</span>
            </button>
          </div>
        </div>
      </section>
 
      {/* ================= BOARD PREP ================= */}
      <section id="board-prep" className={`${FONT} bg-[#F3EEE6] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>
                Exam Preparation
              </span>
            </div>
            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em]">
              Board Certification &amp; Subspecialty Exam Preparation
            </h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
            {BOARD_CARDS.map((b) => (
              <div
                key={b.title}
                className="group relative flex flex-col bg-white border border-[#E6E0D8] rounded-2xl px-[30px] py-[34px] overflow-hidden transition-all duration-[350ms] hover:shadow-[0_22px_48px_rgba(36,30,61,.13)]"
              >
                <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-transform duration-[350ms] group-hover:scale-x-100" />
 
                <span className={`${MONO} block text-[.7rem] tracking-[.14em] uppercase text-[#C79A00] mb-4`}>
                  {b.meta}
                </span>
                <h3 className="text-[1.3rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.01em] mb-2.5">
                  {b.title}
                </h3>
                <p className="text-[.98rem] text-[#5C5575] flex-1 mb-[22px]">{b.desc}</p>
 
                <button className="w-fit inline-flex items-center gap-2.5 px-[22px] py-[10px] rounded-full border-2 border-[#241E3D] text-[#241E3D] font-bold text-[.92rem] transition-all hover:bg-[#241E3D]  hover:-translate-y-1 hover:text-white">
                  Explore Program
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PathologyMasteryCourses;
