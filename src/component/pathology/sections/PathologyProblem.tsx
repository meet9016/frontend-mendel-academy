'use client';
 
const FONT =
  "-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue','Segoe UI',Roboto,sans-serif";
const MONO = "'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
 
const CHIPS = [
  'Oncology',
  'Hematology-Oncology',
  'Immuno-Oncology',
  'Microbiology',
  'Surgical & Molecular Pathology',
  'Pharma Consulting',
  'Advanced EdTech',
  'vMTB',
  'Mini-Medical MBAs',
];
const PathologyProblem = () => {
  return (
    <>
      {/* ================= CAREER ACCELERATOR (USP) ================= */}
      <section className="career-accelerator-section py-14 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="accelerator-card relative flex flex-col md:flex-row gap-[30px] items-start bg-white rounded-[20px] p-8 md:p-[42px_46px] overflow-hidden">
            {/* top gradient bar */}
            <div className="gradient-bar absolute top-0 left-0 right-0 h-1" />
            {/* decorative glow */}
            <div className="decorative-glow absolute pointer-events-none rounded-full" />
 
            <div className="icon-badge relative shrink-0 w-16 h-16 rounded-[18px] flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M14 7h7v7" />
              </svg>
            </div>
 
            <div className="relative">
              <span className="sub-label-pink inline-flex items-center gap-2.5 font-bold uppercase">
                <span className="pink-line inline-block w-6 h-[2px]" />
                A Career Accelerator
              </span>
 
              <h3 className="accelerator-title font-extrabold mt-3 mb-3.5">
                Don't just learn more —<br />
                <span className="text-pink-accent">level up your career.</span>
              </h3>
 
              <p className="accelerator-desc max-w-[780px]">
                Whether you're a practicing pathologist, lab director, or industry professional, Mendel is built to{' '}
                <strong className="strong-text">accelerate and upgrade your career</strong> — practical skills
                you can apply immediately, <strong className="strong-text">not just theoretical knowledge.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* ================= THE PROBLEM ================= */}
      <section className="problem-section py-24 px-6 relative">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[780px] mb-8">
            <span className="sub-label-light inline-flex items-center gap-3 font-normal uppercase mb-5">
              <span className="yellow-line inline-block w-[34px] h-0.5" />
              The Problem
            </span>
 
            <h2 className="problem-title font-extrabold text-white">
              The tests exist.<br />
              The <span className="text-pink-accent">interpretation</span> is what's missing.
            </h2>
 
            <p className="problem-highlight font-bold mt-[18px]">
              Mendel Academy was built to close that gap.
            </p>
          </div>
 
          <div className="max-w-[880px]">
            <p className="problem-desc-main font-bold mb-4">
              In an era of exploding biomarkers, NGS reports and targeted therapies, even experienced oncologists and
              pathologists can be overwhelmed and indecisive. Information overload, complex data and misinterpreted
              reporting can cost patients precious time — and sometimes their lives.
            </p>
 
            <p className="problem-desc-bold font-extrabold mt-6">
              We demystify complex diagnoses to improve patient outcomes.
            </p>
          </div>
 
          {/* discipline chips */}
          <div className="chips-container flex items-center flex-wrap gap-2.5 mt-12 pt-[30px]">
            <span className="sub-label-chips font-bold uppercase mr-2 whitespace-nowrap">
              We work across
            </span>
            {CHIPS.map((chip) => (
              <span key={chip} className="chip-item rounded-full">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .career-accelerator-section {
          background: #FAF7F2;
          font-family: -apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue','Segoe UI',Roboto,sans-serif;
        }
        .accelerator-card {
          border: 1px solid #E6E0D8;
          box-shadow: 0 18px 46px rgba(21,14,40,.07);
        }
        .gradient-bar {
          background: linear-gradient(90deg, #FFC900, #E0568F 55%, #4A3D7A);
        }
        .decorative-glow {
          right: -90px;
          top: -90px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(224,86,143,.10), transparent 68%);
        }
        .icon-badge {
          background: linear-gradient(140deg, #E0568F, #B03A6C);
          box-shadow: 0 14px 32px rgba(224,86,143,.34);
        }
        .sub-label-pink {
          font-family: 'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
          font-size: .72rem;
          letter-spacing: .2em;
          color: #B03A6C;
        }
        .pink-line {
          background: #E0568F;
        }
        .accelerator-title {
          font-size: clamp(2rem, 4.2vw, 3.1rem);
          letter-spacing: -.02em;
          line-height: 1.1;
          color: #241E3D;
        }
        .text-pink-accent {
          color: #E0568F;
        }
        .accelerator-desc {
          color: #5C5575;
          font-size: 1.06rem;
          line-height: 1.62;
        }
        .strong-text {
          color: #241E3D;
        }
        .problem-section {
          background: radial-gradient(900px 520px at 15% 0%, #1E1540, #150E28 70%);
          font-family: -apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue','Segoe UI',Roboto,sans-serif;
        }
        .sub-label-light {
          font-family: 'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
          font-size: .72rem;
          letter-spacing: .18em;
          color: rgba(255,255,255,.55);
        }
        .yellow-line {
          background: #FFC900;
        }
        .problem-title {
          font-size: clamp(2rem, 4.2vw, 3.1rem);
          line-height: 1.08;
          letter-spacing: -.025em;
        }
        .problem-highlight {
          color: #FFC900;
          font-size: 1.2rem;
        }
        .problem-desc-main {
          color: #fff;
          font-size: 1.18rem;
          line-height: 1.55;
        }
        .problem-desc-bold {
          color: #E0568F;
          font-size: 1.4rem;
          letter-spacing: -.01em;
        }
        .chips-container {
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .sub-label-chips {
          font-family: 'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
          font-size: .72rem;
          letter-spacing: .14em;
          color: rgba(255,255,255,.5);
        }
        .chip-item {
          font-family: 'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
          font-size: .78rem;
          letter-spacing: .04em;
          color: #fff;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.16);
          padding: 9px 18px;
        }
      `}</style>
    </>
  );
};

export default PathologyProblem;
