'use client';

const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

const PILLARS = [
  {
    title: 'Mastery & Fellowship Programs',
    description:
      'Structured Mastery Courses and a 12-month Fellowship that takes you from molecular diagnostic interpretation to precision therapies.',
    icon: (
      <>
        <path d="M12 6.5C9.5 5 6 5 3.5 6v12c2.5-1 6-1 8.5.6" />
        <path d="M12 6.5C14.5 5 18 5 20.5 6v12c-2.5-1-6-1-8.5.6" />
        <path d="M12 6.5v12.1" />
      </>
    ),
  },
  {
    title: 'Molecular Tumor Board',
    description:
      'Monthly Virtual Molecular Tumor Boards (vMTB) where you present real cases alongside a global network of 2,500+ molecular pathologists and oncologists.',
    icon: (
      <>
        <circle cx="12" cy="5" r="2.4" />
        <circle cx="5" cy="17" r="2.4" />
        <circle cx="19" cy="17" r="2.4" />
        <path d="M12 7.4v4M10.3 13.3 6.6 15.4M13.7 13.3l3.7 2.1M7.4 17h9.2" />
      </>
    ),
  },
];

const CHIPS = [
  { b: '35+', t: 'years in medicine' },
  { b: '12', t: 'US patents' },
  { b: '50,000+', t: 'accessions/year' },
  { b: 'Global', t: 'operations and expertise' },
];

const PathologyProgramsIntro = () => {
  return (
    <>
      {/* ================= WHY MENDEL ================= */}
      <section id="why-mendel" className={`${FONT} bg-[#FAF7F2] pb-8 pt-24 px-6 relative`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-[#5C5575]`}>
                Why Mendel
              </span>
            </div>

            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em] whitespace-nowrap max-[680px]:whitespace-normal">
              Most programs teach the lab techniques.
              <br />
              We teach the <span className="text-[#E0568F]">interpretation.</span>
            </h2>

            <p className="mt-[18px] text-[1.13rem] text-[#5C5575]">
              Most pathology training stops at exam prep or wet-lab technique. Mendel specializes in{' '}
              <strong className="text-[#241E3D]">interpretation and clinical integration</strong> — turning raw
              laboratory data into confident clinical action across oncology, hematology-oncology, immuno-oncology,
              and microbiology.
            </p>
            <p className="mt-[18px] text-[1.13rem] text-[#5C5575]">
              Our programs are built on two pillars that no other platform combines:
            </p>
          </div>

          {/* Two pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] max-w-[900px]">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group relative bg-white border border-[#E6E0D8] rounded-2xl px-[30px] py-[34px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(36,30,61,.13)]"
              >
                <span className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#E0568F,#FFC900)] transition-transform duration-300 group-hover:scale-x-100" />

                <div className="w-[60px] h-[60px] rounded-2xl bg-[linear-gradient(140deg,#F7DCE8,#fff)] border border-[#E6E0D8] flex items-center justify-center mb-[22px] text-[#E0568F] transition-colors duration-200 group-hover:bg-[linear-gradient(140deg,#E0568F,#B03A6C)] group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    {p.icon}
                  </svg>
                </div>

                <h3 className="text-[1.3rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.01em] mb-2.5">
                  {p.title}
                </h3>
                <p className="text-[.98rem] text-[#5C5575]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MENTOR ================= */}
      <section id="mentor" className={`${FONT} bg-[#FAF7F2] pt-6 pb-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="bg-[linear-gradient(120deg,#fff,#FDF3F7)] border border-[#E6E0D8] rounded-[20px] px-8 py-11 md:px-12 md:py-11 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[38px] items-center text-center md:text-left">
            <div className="mx-auto md:mx-0 shrink-0 w-32 h-32 rounded-full bg-[radial-gradient(circle_at_35%_30%,#4A3D7A,#150E28)] border-4 border-[#FFC900] flex items-center justify-center text-[#FFC900] font-extrabold text-[2rem]">
              KM
            </div>

            <div>
              <h3 className="text-[1.5rem] font-extrabold text-[#241E3D] leading-[1.08] tracking-[-.025em] mb-1.5">
                Led by Dr. Kishor Managoli, MD
              </h3>
              <p className={`${MONO} text-[.74rem] tracking-[.12em] uppercase text-[#E0568F] mb-3.5`}>
                Pathologist · Educator · Industry Advisor
              </p>
              <p className="text-[.98rem] text-[#5C5575] max-w-[640px] mx-auto md:mx-0">
                35+ years across surgical oncopathology, molecular pathology, corporate pharma, and stem cell
                research — now distilled into programs, tumor boards, and consulting engagements that change how
                pathologists and clinicians practice.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-[18px]">
                {CHIPS.map((c) => (
                  <span
                    key={c.t}
                    className={`${MONO} text-[.7rem] tracking-[.08em] bg-white border border-[#E6E0D8] rounded-full px-3.5 py-1.5 text-[#241E3D]`}
                  >
                    <b className="text-[#E0568F] font-semibold">{c.b}</b> {c.t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PathologyProgramsIntro;
