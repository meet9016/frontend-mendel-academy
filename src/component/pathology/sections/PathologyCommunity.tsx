import React from 'react';

const FONT =
  "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

const COMMUNITY_ITEMS = [
  'Active global network of over 2,500 pathologists via dedicated WhatsApp groups',
  'Ongoing access to monthly Virtual Molecular Tumor Boards (vMTB)',
  'Alumni network for referrals, collaboration, and career opportunities',
  'Emerging Mendel Telepathology Network — a hub-and-spoke second-opinion platform for complex surgical pathology, hematopathology, and molecular integration',
];

const STEPS = ['Clinical', 'H&E', 'IHC', 'Molecular'];

const PathologyCommunity = () => {
  return (
    <>
      {/* ================= COMMUNITY ================= */}
      <section id="community" className={`${FONT} bg-[#F3EEE6] py-24 px-6`}>
        <div className="max-w-[1180px] mx-auto">
          <div className="relative overflow-hidden rounded-[24px] p-[46px] md:py-[64px] md:px-[58px] grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-[52px] items-center bg-[radial-gradient(900px_500px_at_20%_0%,#1E1540,#150E28)] text-white">
            {/* watermark */}
            <div className="absolute -right-[30px] -bottom-[46px] text-[6rem] md:text-[11rem] font-extrabold text-white/[0.045] leading-none tracking-[-.05em] pointer-events-none select-none">
              2,500+
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[34px] h-0.5 bg-[#FFC900]" />
                <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-white/[0.55]`}>
                  SPEC <b className="text-[#FFC900]">06</b> — Community
                </span>
              </div>

              <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-white leading-[1.08] tracking-[-.025em]">
                Our Community &amp;<br />Lifetime Value
              </h2>

              <p className="mt-4 text-[1.08rem] text-white/[0.78] leading-[1.65]">
                Join a growing ecosystem that continues to support you long after any single program ends.
              </p>

              <p className="mt-7 text-[1.45rem] font-extrabold tracking-[-.02em] bg-[linear-gradient(95deg,#FFC900,#E0568F)] bg-clip-text text-transparent">
                This is not just education.<br />
                It is a professional home for life.
              </p>
            </div>

            <ul className="relative z-10 grid gap-[18px]">
              {COMMUNITY_ITEMS.map((item) => (
                <li key={item} className="relative pl-8 text-white/[0.88] text-[.98rem] leading-[1.65]">
                  <span className="absolute left-0 top-0.5 w-[21px] h-[21px] rounded-full bg-[#FFC900] text-[#1A1502] text-[.7rem] font-bold flex items-center justify-center">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TRY THE METHOD (ONION SKIN) ================= */}
      <section
        className={`${FONT} py-24 px-6 relative overflow-hidden bg-[radial-gradient(900px_520px_at_80%_0%,#1E1540,#150E28_70%)]`}
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-[52px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-0.5 bg-[#FFC900]" />
              <span className={`${MONO} text-[.72rem] tracking-[.18em] uppercase text-white/[0.55]`}>
                Try The Method
              </span>
            </div>

            <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold text-white leading-[1.08] tracking-[-.025em]">
              Experience the <span className="text-[#FFC900]">Onion Skin Technique</span>
            </h2>

            <p className="mt-[18px] text-[1.13rem] text-white/[0.74] leading-[1.65] max-w-2xl">
              This is how we teach interpretation — peel a real case one layer at a time until the diagnosis, and the
              therapy, become unavoidable. Go ahead, work the case.
            </p>
          </div>

          {/* Interactive Card Mockup */}
          <div className="bg-white/[0.06] border border-white/[0.14] rounded-[24px] p-[34px] md:p-[46px] flex flex-col md:flex-row items-center gap-[34px] md:gap-[46px]">
            {/* Left Graphic (Concentric Circles) */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-[300px] max-w-full flex flex-col items-center gap-6">
                {/* Circles Container */}
                <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                  {/* r5 - outer violet band */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-50 bg-[radial-gradient(circle,transparent_56%,rgba(140,116,228,.95)_58%,rgba(140,116,228,.95)_70%,transparent_72%)]" />
                  {/* r4 - eosin band */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full opacity-50 bg-[radial-gradient(circle,transparent_54%,rgba(224,86,143,1)_56%,rgba(224,86,143,1)_70%,transparent_72%)]" />
                  {/* r3 - gold band */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[184px] h-[184px] rounded-full opacity-50 bg-[radial-gradient(circle,transparent_51%,rgba(255,201,0,1)_53%,rgba(255,201,0,1)_70%,transparent_72%)]" />
                  {/* r2 - eosin band */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full opacity-50 bg-[radial-gradient(circle,transparent_46%,rgba(224,86,143,1)_48%,rgba(224,86,143,1)_72%,transparent_74%)]" />
                  {/* r1 - inner violet band */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full opacity-50 bg-[radial-gradient(circle,transparent_38%,rgba(140,116,228,1)_40%,rgba(140,116,228,1)_100%)]" />
                  {/* core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full opacity-70 bg-[radial-gradient(circle_at_40%_38%,#FFC900,#E0568F)] shadow-[0_0_22px_rgba(255,201,0,.5)]" />
                </div>
 
                {/* Steps Pills */}
                <div className="flex gap-2">
                  {STEPS.map((s, i) => (
                    <span
                      key={s}
                      className={`${MONO} px-3 py-[6px] rounded-full text-[.66rem] tracking-[.08em] uppercase transition-all ${i === 0
                          ? 'bg-[#FFC900] text-[#1A1502] font-semibold'
                          : 'border border-white/[0.16] text-white/40'
                        }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="w-full md:w-1/2 text-left">
              <span className={`${MONO} text-[#FFC900] text-[.7rem] tracking-[.14em] uppercase inline-block mb-[14px]`}>
                Layer 0 · Clinical
              </span>
              <h3 className="text-[1.6rem] font-extrabold text-white mb-3">The specimen arrives</h3>
              <p className="text-white/[0.82] text-[1.04rem] leading-[1.6]">
                A 62-year-old lifelong never-smoker presents with a 3&nbsp;cm mass in the right upper lobe. A core
                biopsy lands on your bench. Where do you begin?
              </p>
              <div className="mt-[26px]">
                <button className="inline-flex items-center gap-2.5 bg-[#FFC900] text-[#1A1502] font-bold text-base px-[30px] py-[15px] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,.35)]">
                  Peel back a layer <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-[34px] text-[17px] text-white/[0.7]">
            This is one case. The fellowship is twelve months of them — live, with feedback.{' '}
            <a href="#" className="text-[#FFC900] font-bold whitespace-nowrap no-underline">
              Apply to the cohort →
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PathologyCommunity;
