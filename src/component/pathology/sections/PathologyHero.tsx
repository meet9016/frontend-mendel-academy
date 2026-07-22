
'use client';
 
// Exact font stacks from the original CSS tokens
const FONT =
  "-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue','Segoe UI',Roboto,sans-serif";
const MONO = "'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";
 
const TICKER_ITEMS = [
  'H&E', 'IHC', 'IF', 'FLOW', 'FISH', 'PCR', 'NGS', 'PGx',
  'LIQUID BIOPSY', 'CDx', 'ADC', 'BIOMARKERS', 'THERAPY SELECTION',
  'RESISTANCE MECHANISMS', 'vMTB',
];
 
const STATS = [
  { n: '35+', l: 'Years in OncoPathology & Medicine' },
  { n: '2,500+', l: 'Clinicians in Our Network' },
  { n: '12', l: 'US Patents' },
];


const PathologyHero = () => {
  return (
    <section className="pathology-hero-section relative overflow-hidden pt-[90px] pb-0 text-white">
      {/* ================= HERO GRID ================= */}
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center pb-[90px]">
        {/* Left content */}
        <div>
          <p className="font-mono-custom flex items-center gap-3 mb-[22px]">
            <span className="dot-indicator inline-block w-[9px] h-[9px] rounded-full shrink-0" />
            <span className="text-[.74rem] tracking-[.22em] uppercase text-[#FFC900]">
              Advanced Pathology · Precision Medicine
            </span>
          </p>

          <h1 className="hero-title font-extrabold mb-6">
            See what others miss.{' '}
            <span className="relative whitespace-nowrap text-[#E0568F]">
              Diagnose
              <span
                aria-hidden="true"
                className="highlight-underline absolute left-0 right-0 -z-10 rounded-[3px]"
              />
            </span>{' '}
            what others can't.
          </h1>

          <p className="hero-subtitle font-extrabold mt-5">
            Mendel Academy — The Career Accelerator
          </p>
        </div>

        {/* Right — the microscope viewport */}
        <div className="relative mx-auto w-[min(440px,92%)] aspect-square" aria-hidden="true">
          <div className="microscope-lens absolute inset-0 rounded-full overflow-hidden">
            {/* cells */}
            <div className="cell drift1 cell-1 absolute rounded-full blur-[1px]">
              <span className="cell-nucleus-dark absolute inset-[30%] rounded-full" />
            </div>
            <div className="cell drift2 cell-2 absolute rounded-full blur-[1px]">
              <span className="cell-nucleus-dark absolute inset-[30%] rounded-full" />
            </div>
            <div className="cell drift3 cell-3 absolute rounded-full blur-[1px]">
              <span className="cell-nucleus-dark absolute inset-[30%] rounded-full" />
            </div>
            <div className="cell drift2-rev cell-4 absolute rounded-full blur-[1px]">
              <span className="cell-nucleus-yellow absolute inset-[30%] rounded-full" />
            </div>

            {/* reticle crosshair */}
            <div className="absolute inset-[10px] pointer-events-none">
              <div className="crosshair-line absolute left-1/2 top-[6%] bottom-[6%] w-px" />
              <div className="crosshair-line absolute top-1/2 left-[6%] right-[6%] h-px" />
            </div>

            {/* scale bar label */}
            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-center">
              <div className="scale-bar w-16 h-[2px] mx-auto mb-1" />
              <span className="scale-text font-mono-custom text-[.62rem] tracking-[.1em]">
                100 µm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TECHNIQUE TICKER ================= */}
      <div className="ticker-container py-[13px] overflow-hidden" aria-hidden="true">
        <div className="flex w-max ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span
              key={i}
              className="ticker-item font-mono-custom whitespace-nowrap px-[18px] font-medium text-[.78rem] tracking-[.2em]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ================= STATS STRIP ================= */}
      <div className="stats-strip py-10">
        <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-[30px] text-center">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="stats-number font-extrabold">
                {s.n}
              </div>
              <div className="stats-label font-mono-custom text-[.72rem] tracking-[.14em] uppercase mt-1.5">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pathology-hero-section {
          background: radial-gradient(1200px 800px at 75% 20%, #1E1540, #150E28 65%);
          font-family: -apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue','Segoe UI',Roboto,sans-serif;
        }
        .font-mono-custom {
          font-family: 'SF Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
        }
        .dot-indicator {
          background: #E0568F;
          box-shadow: 0 0 0 5px rgba(224,86,143,.22);
        }
        .hero-title {
          font-size: clamp(2.6rem, 5.6vw, 4.4rem);
          line-height: 1.08;
          letter-spacing: -.025em;
        }
        .highlight-underline {
          bottom: .06em;
          height: .32em;
          background: linear-gradient(90deg, rgba(224,86,143,.32), rgba(255,201,0,.32));
        }
        .hero-subtitle {
          color: #FFC900;
          font-size: clamp(1.2rem, 2.4vw, 1.6rem);
          letter-spacing: -.01em;
        }
        .microscope-lens {
          border: 10px solid #141029;
          background: radial-gradient(circle at 38% 32%, #3A2F66, #241D49 70%);
          box-shadow: 0 0 0 2px rgba(255,201,0,.5), 0 0 90px rgba(224,86,143,.28), inset 0 0 60px rgba(0,0,0,.5);
        }
        .cell-1 {
          width: 130px;
          height: 130px;
          left: 12%;
          top: 18%;
          background: radial-gradient(circle at 40% 40%, rgba(224,86,143,.85), rgba(224,86,143,.12) 70%);
        }
        .cell-2 {
          width: 90px;
          height: 90px;
          right: 14%;
          top: 30%;
          background: radial-gradient(circle at 45% 45%, rgba(122,99,196,.9), rgba(122,99,196,.12) 70%);
        }
        .cell-3 {
          width: 150px;
          height: 150px;
          left: 30%;
          bottom: 8%;
          background: radial-gradient(circle at 42% 38%, rgba(224,86,143,.6), rgba(176,58,108,.1) 70%);
        }
        .cell-4 {
          width: 60px;
          height: 60px;
          right: 26%;
          bottom: 24%;
          background: radial-gradient(circle at 45% 45%, rgba(255,201,0,.55), rgba(255,201,0,.05) 70%);
        }
        .cell-nucleus-dark {
          background: rgba(30,22,60,.65);
        }
        .cell-nucleus-yellow {
          background: rgba(60,48,10,.5);
        }
        .crosshair-line {
          background: rgba(255,255,255,.14);
        }
        .scale-bar {
          background: rgba(255,255,255,.6);
        }
        .scale-text {
          color: rgba(255,255,255,.6);
        }
        .ticker-container {
          background: #FFC900;
          border-top: 1px solid rgba(0,0,0,.12);
        }
        .ticker-item {
          color: #1A1502;
        }
        .stats-strip {
          background: #150E28;
        }
        .stats-number {
          font-size: clamp(2.4rem, 4.6vw, 3.6rem);
          letter-spacing: -.03em;
          background-image: linear-gradient(100deg, #FFC900, #E0568F);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #FFC900;
        }
        .stats-label {
          color: rgba(255,255,255,.55);
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(26px, 18px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 24px); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -20px) scale(1.06); }
        }
        @keyframes tickerScroll {
          to { transform: translateX(-50%); }
        }
        .drift1 { animation: drift1 9s ease-in-out infinite; }
        .drift2 { animation: drift2 11s ease-in-out infinite; }
        .drift3 { animation: drift3 13s ease-in-out infinite; }
        .drift2-rev { animation: drift2 8s ease-in-out infinite reverse; }
        .ticker-track { animation: tickerScroll 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift1, .drift2, .drift3, .drift2-rev, .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default PathologyHero;
