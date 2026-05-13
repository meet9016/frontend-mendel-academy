
'use client';
import React from "react";

const EXAM_TAGS = ["USMLE Step 1", "USMLE Step 2", "USMLE Step 3", "UKMLE", "NEET-PG", "INICET", "FMGE", "AMC"];
const SPECIALIZED_TAGS = ["MD", "DNB", "NEET-SS", "ABPath", "FRCPath", "Residents", "Fellows", "Consultants"];
const CORPORATE_TAGS = ["Pharma", "Biotech", "CROs", "Corporate labs", "Clinical Oncology", "Consultant Pathologists & Residents"];

const LEADERSHIP = [
  { name: "Gargi Managoli, MBA", role: "Chief Operations · Global Business Development · Marketing & Sales", location: "California, USA", initials: "GM" },
  { name: "Savita Managoli", role: "Data analytics | Tech Support | Business Strategy", location: "California, USA", initials: "SM" },
];

function MainAbout() {
  return (
    <div className="ff-font min-h-screen bg-[#fcfcfc] text-[#1a1a1a] ">
      {/* HERO */}
      <section className="pt-12 md:pt-10 pb-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12 gap-6">
            <div className="max-w-2xl font-bold">
              <h1 className="ff-font-bold text-4xl sm:text-5xl md:text-[38px] font-bold tracking-tight mb-4 leading-tight">
                We simplify learning, <br />
                <span className="bg-primary px-3 sm:px-4 py-1 rounded-2xl inline-block mt-2">amplify</span> success.
              </h1>
              <p className=" font-medium  sm:text-[13px]">
                MedTech · Surgical Pathology · Molecular Pathology · Precision Oncology
              </p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-10 lg:mt-25 sm:gap-4 flex-wrap">
              <button className="px-5 cursor-pointer sm:px-6 py-3 rounded-xl border border-gray-200">View programs</button>
              <button className="px-5 sm:px-6 py-3 cursor-pointer rounded-xl bg-black text-primary">Contact us</button>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-full h-px bg-gray-200 mb-10 md:mb-12" />

          <div className="relative bg-white border border-primary rounded-[1rem] p-6 sm:p-8 md:p-12 overflow-hidden exam-card-shadow border-l-[6px] border-l-primary">
            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                <span className="bg-black text-primary text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-md inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> MENDEL ACADEMY
                </span>
                <span className="bg-white border border-gray-200 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-md">FOUNDED 2015</span>
                <span className="bg-white border border-gray-200  text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-md uppercase">Corporate Offices in USA &amp; India</span>
              </div>
              <p className="text-base sm:text-xl md:text-[16px] leading-relaxed text-zinc-700">
                A <span className="font-bold text-black">family-owned MedTech company</span> serving multiple audiences: PG Medical Aspirants, Consultant Pathologists &amp; Residents, Medical Oncologists, Surgical Oncologists, Hemato-Oncologists, Radiation Oncologists, Corporate Labs, Pharma, Biotech and CROs.
              </p>
            </div>
            <div className="absolute top-[-10%] right-[-5%] w-48 sm:w-64 h-48 sm:h-64 bg-yellow-100/60 rounded-full blur-3xl animate-spin-slowest" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-6 py-4">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Founded in" value="2015" sub="By Dr. Kishor Managoli, MD" />
          <StatCard title="Founder experience" value="35+ yrs" sub="Surgical & molecular pathology" />
          <StatCard title="Reach" value="10+" sub="Countries served" />
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-16 md:py-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <SectionHeading label="What we offer" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            <OfferCard index="01" category="EXAM PREP" title="PG Medical Entrance Exams" label="EXAMS COVERED" tags={EXAM_TAGS} />
            <OfferCard index="02" category="ADVANCED PATHOLOGY" title="Specialized Pathology Courses" label="DESIGNED FOR" tags={SPECIALIZED_TAGS} />
            <OfferCard index="03" category="CORPORATE" title="Molecular Pathology & Precision Oncology Training" label="CONSULTANTS FOR" tags={CORPORATE_TAGS} />
          </div>
        </div>
      </section>

      {/* CLINICIANS */}
      <section className="pb-16 md:pb-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <SectionHeading label="For Clinicians" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <ClinicianCard
              tag="For Pathologists"
              title="Surgical & Molecular Pathology"
              items={[
                "Medico-legal safe reporting to MTB leadership.",
                "IHC/IF, Flow Cytometry, FISH, PCR, Karyotyping, Sanger Sequencing, NGS, AI-Pathology, Bioinformatics, PGx, CDx, Biomarkers.",
                "Lab Director and Head of Molecular Pathology readiness.",
                "Confident Molecular Tumor Board (MTB) participation.",
                "Expert second opinions in Histopathology, Cytopathology, Hemato-Oncology & Molecular Pathology.",
              ]}
            />
            <ClinicianCard
              tag="For Oncologists"
              title="Hematology, Medical, Surgical & Radiation"
              items={[
                "Molecular to Clinical integration to Targeted therapeutics.",
                "Therapy selection, resistance, and PGx implications.",
                "Lead or contribute to Molecular Tumor Boards (MTB).",
                "Faster, sharper collaboration with Pathology.",
                "AI-Pathology, Biomarkers, CDx, Bioinformatics, Drug Discovery & Clinical Research/Trials.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="pb-16 md:pb-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <SectionHeading label="Founder" />
          <div className="bg-black text-white rounded-[1rem] p-6 sm:p-8 md:p-12 border-t-4 border-primary">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-black text-2xl sm:text-3xl ff-font-bold font-bold">KM</span>
              </div>
              <div className="flex-1">
                <p className="text-primary font-bold text-xs uppercase mb-1">Founder &amp; Chief Medical Mentor</p>
                <h3 className="ff-font-bold text-2xl sm:text-3xl font-bold mb-1">Dr. Kishor Managoli, MD</h3>
                <p className="text-zinc-400 mb-6 text-sm sm:text-base">MD Surgical &amp; Molecular Pathology · Precision Oncology Strategist · 12-US Patent Holder</p>
                <p className="text-base sm:text-xl italic mb-6 sm:mb-8 ">
                  "A <span className="text-white font-bold">Surgical Pathologist</span> by training, a <span className="text-primary font-bold">Molecular Strategist</span> by practice, and an <span className="text-primary font-bold">Educator</span> by passion."
                </p>
                <p className="text-zinc-400 leading-relaxed max-w-4xl mb-6 sm:mb-8 text-sm sm:text-base">
                  With 35+ years of clinical experience and 12 US patents, Dr. Managoli bridges traditional histopathology and the molecular future — NGS, FISH, Flow Cytometry, PCR, RT-PCR, and AI-Pathology. He founded Mendel Academy to mentor the next generation of pathologists and serves as a strategic advisor to academia, corporate labs, pharma, and CROs.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { t: "12 US Patents", primary: true },
                    { t: "35+ years practice", primary: false },
                    { t: "Pharma | Biotech | CROs | Corporate Labs", primary: false },
                    { t: "Surgical, Molecular & AI-Pathology", primary: false },
                    { t: "USA & India", primary: false },
                  ].map((tag) => (
                    <span
                      key={tag.t}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-semibold ${tag.primary
                        ? "bg-primary text-black border border-primary"
                        : "border border-zinc-700 text-zinc-300"
                        }`}
                    >
                      {tag.t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="pb-16 md:pb-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <SectionHeading label="Leadership Team" />
          <div className="space-y-0">
            {LEADERSHIP.map((person) => (
              <div key={person.name} className="bg-white border border-gray-200 p-5 sm:p-6 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:shadow-md transition-all">
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-primary flex items-center justify-center font-bold text-base sm:text-lg group-hover:scale-105 transition-transform border-2 border-primary">
                    {person.initials}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold">{person.name}</h4>
                    <div className="bg-black text-primary text-[10px] uppercase font-bold px-3 py-1 rounded inline-block mt-2">
                      {person.role}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right pl-[76px] sm:pl-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Based in</p>
                  <p className="font-bold text-sm">{person.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <div className="bg-white border-l-[6px] border-primary rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 exam-card-shadow">
            <div>
              <h3 className="ff-font-bold text-2xl sm:text-3xl font-bold mb-2">Ready to work with us?</h3>
              <p className="text-gray-500 text-sm sm:text-base">For students, pathologists, and oncology teams. Response within one business day.</p>
            </div>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-200 cursor-pointer">View programs</button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-black text-primary cursor-pointer inline-flex items-center gap-2">
                Get in touch <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Sub components ---------- */
function SectionHeading({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-8 md:mb-10">
      {centered && <div className="h-[1px] flex-1 bg-gray-200" />}
      <h2 className="uppercase tracking-[0.2em] font-semibold text-xs sm:text-[11px] font-bold text-[#6b6b66]">{label}</h2>
      <div className="h-[1px] flex-1 bg-gray-200" />
    </div>
  );
}

function StatCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="bg-[#0a0a0a] text-white p-6 sm:p-8 rounded-[1rem] hover:opacity-95 transition-colors">
      <p className="text-[#fffffb80] text-xs sm:text-[11.5px]  mb-1">{title}</p>
      <h4 className="ff-font-bold text-3xl sm:text-4xl font-bold text-primary mb-2">{value}</h4>
      <p className="text-[#fffffb80] text-[11px]">{sub}</p>
    </div>
  );
}

function OfferCard({ index, category, title, label, tags }: { index: string; category: string; title: string; label: string; tags: string[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 sm:p-8 exam-card-shadow hover:shadow-lg transition-all flex flex-col h-full">
      <p className="text-primary font-bold text-[11px] sm:text-xs mb-1">{index} · {category}</p>
      <h3 className="ff-font-bold text-xl sm:text-2xl font-bold mb-6 sm:mb-8 min-h-[56px] sm:min-h-[50px]">{title}</h3>
      {/* Horizontal Line */}
      <div className="w-full h-px bg-gray-200 mb-6 sm:mb-4" />
      <div className="mt-auto">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3 sm:mb-4">{label}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-[12px] font-bold text-gray-600 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinicianCard({ tag, title, items }: { tag: string; title: string; items: string[] }) {
  return (
    <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-[1.5rem] exam-card-shadow">
      <p className="text-primary font-bold text-[11px] sm:text-xs uppercase mb-2">{tag}</p>
      <h3 className="ff-font-bold text-xl sm:text-2xl font-bold mb-5 sm:mb-6">{title}</h3>
      <ul className="space-y-3 sm:space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 sm:gap-4 items-start border-b border-gray-200 pb-3 last:border-0 last:pb-0">
            <span className="w-4 sm:w-5 h-[2px] bg-primary mt-3 shrink-0" />
            <span className="text-zinc-600 font-medium leading-relaxed text-sm sm:text-base">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainAbout;