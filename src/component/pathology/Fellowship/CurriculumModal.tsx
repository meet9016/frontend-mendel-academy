"use client";

import React, { useEffect } from 'react';
import { triggerPdfDownload } from '@/utils/downloadPdf';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quarters = [
  {
    qTag: "QUARTER 1 · FOUNDATIONS",
    title: "The Molecular & Cellular Toolkit",
    focus: "Building an unshakeable foundation in ancillary techniques, from antibody selection to signal counting, before applying them to complex cases.",
    accentColor: "border-[#E0568F]",
    months: [
      {
        num: "MONTH 01",
        title: "The Immunophenotypic Foundation (IHC & IF)",
        theory: "Antigen-antibody interactions, clone selection, detection systems (polymer vs. biotin), and automation platforms.",
        skills: [
          "Antibody panel design for undifferentiated neoplasms (carcinoma, lymphoma, melanoma, sarcoma).",
          "Troubleshooting: identifying and resolving high background, false positives/negatives, and fixation artifacts.",
          "Dual-stain protocols (e.g., Ki67/Mart1, TTF1/NapsinA) and their interpretation.",
          "Immunofluorescence (IF): principles and application in renal and skin biopsies.",
        ],
        context: "Solving the “unknown primary” and initial lineage assignment in hematolymphoid neoplasms.",
      },
      {
        num: "MONTH 02",
        title: "Liquid Diagnostics (Flow Cytometry & Hematopathology)",
        theory: "Principles of flow cytometry, fluorochromes, compensation, and instrument setup (8–10 colors).",
        skills: [
          "Sample processing: peripheral blood, bone marrow aspirate, body fluids, and lymph node cell suspensions.",
          "Gating strategies for identifying blasts, lymphocytes, monocytes, and granulocytes.",
          "Comprehensive immunophenotyping for acute leukemias (AML, ALL), chronic lymphoproliferative disorders (CLL, FL, MCL), and plasma cell dyscrasias.",
          "Minimal Residual Disease (MRD): principles and analysis in ALL and myeloma.",
        ],
        context: "Integrating flow data with morphology for a final WHO-classified diagnosis.",
      },
      {
        num: "MONTH 03",
        title: "The Chromosomal Landscape (Cytogenetics)",
        theory: "Cell culture, chromosome banding, and the principles of Fluorescence In Situ Hybridization (FISH).",
        skills: [
          "Karyotyping: recognizing normal and abnormal karyotypes, common chromosomal aberrations (translocations, deletions, inversions).",
          "FISH analysis: interpretation of break-apart probes (e.g., ALK, ROS1, EWSR1), fusion probes (e.g., BCR-ABL1), and enumeration probes (e.g., HER2, CMYC).",
          "Signal counting rules and reporting nomenclature (ISCN).",
        ],
        context: "Diagnosis of sarcomas (Ewing, synovial), stratification of hematologic malignancies, and determining gene amplification status in solid tumors.",
      },
    ],
  },
  {
    qTag: "QUARTER 2 · INTEGRATED DIAGNOSTICS",
    title: "The Systems",
    focus: "Applying the Q1 toolkit to organ-specific pathology — integrating grossing, morphology, and ancillary testing according to the latest WHO 5th Edition and CAP/ASCO guidelines.",
    accentColor: "border-[#FFC900]",
    months: [
      {
        num: "MONTH 04",
        title: "Thoracic, Head & Neck Systems",
        specimens: "Small biopsies (core, forceps), FNAC, and resections.",
        pathologies: [
          "Lung: NSCLC (adenocarcinoma vs. squamous) vs. SCLC. Mesothelioma.",
          "Head & Neck: squamous cell carcinoma (HPV-related vs. non-related), salivary gland tumors.",
        ],
        biomarkers: [
          "IHC: TTF1, p40, Calretinin, p16. PD-L1 scoring (TPS/CPS) and its nuances.",
          "Molecular: reflex testing strategy for EGFR, ALK, ROS1, BRAF, MET, RET, NTRK using single-gene or NGS panels.",
        ],
      },
      {
        num: "MONTH 05",
        title: "GI, Hepatobiliary & Pancreas",
        specimens: "Endoscopic biopsies, EUS-FNA, and major resections (Whipple, hepatectomy, colectomy).",
        pathologiesText: "Colorectal carcinoma, gastric adenocarcinoma, GIST, hepatocellular carcinoma, pancreatic ductal adenocarcinoma.",
        biomarkers: [
          "IHC: MMR proteins (MLH1, PMS2, MSH2, MSH6) for Lynch syndrome/MSI screening. HER2 scoring in gastric cancer. GIST panel (CD117, DOG1).",
          "Molecular: KRAS, NRAS, BRAF mutation testing in colorectal cancer. MSI-PCR confirmation. KIT/PDGFRA genotyping in GIST.",
        ],
      },
      {
        num: "MONTH 06",
        title: "Breast, Gyn & Genitourinary (GU)",
        specimens: "Core needle biopsies, lumpectomies, mastectomies, hysterectomies, TURBT, prostate cores.",
        pathologies: [
          "Breast: invasive carcinoma (no-special-type, lobular), DCIS.",
          "Gyn: endometrial carcinoma (molecular classification), ovarian tumors.",
          "GU: prostate adenocarcinoma, urothelial carcinoma, renal cell carcinoma. Medical renal diseases (biopsy interpretation with IF & special stains).",
        ],
        biomarkers: [
          "IHC: ER/PR/HER2 standardization (including HER2-low). Ki67 scoring. p53 & MMR in endometrial cancer. Prostate markers (NKX3.1, AMACR).",
          "Molecular: PIK3CA testing. BRCA1/2 and Homologous Recombination Deficiency (HRD) testing in ovarian and prostate cancer.",
        ],
      },
    ],
  },
  {
    qTag: "QUARTER 3 · PRECISION MEDICINE",
    title: "The Genomic Revolution",
    focus: "Moving beyond single biomarkers to comprehensive genomic profiling, bioinformatics, and the strategic application of data to patient care.",
    accentColor: "border-[#4A3D7A]",
    months: [
      {
        num: "MONTH 07",
        title: "Molecular Foundations (PCR & Sanger)",
        theory: "DNA/RNA extraction, PCR (endpoint, real-time/qPCR), reverse transcription, and Sanger sequencing chemistry.",
        skills: [
          "Detection of single-gene mutations (e.g., JAK2 V617F, BRAF V600E).",
          "Quantitative PCR for viral loads (e.g., CMV, EBV) and fusion transcripts (BCR-ABL1 monitoring).",
          "Sanger sequencing for mutation confirmation and fragment analysis (e.g., FLT3, NPM1).",
        ],
      },
      {
        num: "MONTH 08",
        title: "The NGS Deep Dive (Bioinformatics)",
        theory: "Next-Generation Sequencing (NGS) library preparation (amplicon vs. capture), sequencing platforms (Illumina, Ion Torrent), and data analysis pipelines.",
        skills: [
          "Panel Selection: strategy for choosing between small hotspot panels, comprehensive genomic profiling (CGP), and RNA fusion panels.",
          "Bioinformatics: understanding the VCF (Variant Call Format) file. Using annotation databases (ClinVar, COSMIC, gnomAD).",
          "Variant Interpretation: classifying variants according to AMP/ASCO/CAP guidelines (Tier I–IV).",
          "Reporting: constructing a clear, actionable molecular pathology report.",
        ],
      },
      {
        num: "MONTH 09",
        title: "Pharmacogenomics & Precision Therapeutics",
        theory: "How genetic variations influence drug metabolism, efficacy, and toxicity.",
        skills: [
          "Germline Testing: DPYD for fluoropyrimidine toxicity, UGT1A1 for irinotecan, TPMT/NUDT15 for thiopurines.",
          "Somatic Testing: linking specific mutations to targeted therapies (e.g., EGFR inhibitors, PARP inhibitors, immunotherapies).",
          "Biomarker Design: the process of identifying, validating, and implementing new predictive biomarkers in the clinical lab.",
        ],
      },
    ],
  },
  {
    qTag: "QUARTER 4 · FUTURE & LEADERSHIP",
    title: "The Hyperspecialist",
    focus: "Mastering the cutting-edge tools of digital pathology, developing rapid diagnostic skills, and acquiring the leadership acumen to run a modern, high-complexity laboratory.",
    accentColor: "border-[#E0568F]",
    months: [
      {
        num: "MONTH 10",
        title: "The Digital & AI Transformation",
        tech: "Whole Slide Imaging (WSI) scanners, image management systems (IMS), and telepathology platforms.",
        ai: [
          "Validating and using AI algorithms for quantitative tasks (e.g., Ki67, mitosis counting, HER2 scoring).",
          "AI-assisted screening for prostate cancer, lymph node metastases, and other high-volume tasks.",
        ],
        workflow: "Implementing digital pathology for primary diagnosis, second opinions, and remote consultations.",
      },
      {
        num: "MONTH 11",
        title: "Rapid Decisions (Frozen & Cytology)",
        frozen: "Principles, indications, artifacts, and diagnostic pitfalls in intraoperative consultations.",
        skills: [
          "Techniques: Conventional vs. Liquid-Based Cytology (LBC), Fine Needle Aspiration Cytology (FNAC).",
          "Rapid On-Site Evaluation (ROSE): techniques for immediate assessment of adequacy and provisional diagnosis.",
          "Cell Block Prep: optimizing cytology specimens for ancillary testing (IHC, molecular).",
        ],
      },
      {
        num: "MONTH 12",
        title: "The “Director’s Cap” (Quality & Business)",
        mgm: "Workflow optimization, staffing, and instrument selection for a molecular lab.",
        accreditation: "Understanding CAP, NABL, and ISO 15189 checklists. Implementing robust Quality Control (QC) and Quality Assurance (QA) programs for molecular tests.",
        validation: "The process of validating and verifying new LDTs (Laboratory Developed Tests) and FDA-approved assays.",
        legal: "Writing reports that are diagnostically accurate, clinically actionable, and medicolegally sound.",
        business: "Understanding reimbursement, cost-effectiveness, and the business case for advanced diagnostics.",
      },
    ],
  },
];

const CurriculumModal = ({ isOpen, onClose }: CurriculumModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#150E28]/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className={`${FONT} relative w-full max-w-[960px] max-h-[84vh] flex flex-col bg-[#FAF7F2] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20`}>
        {/* Header */}
        <header className="flex items-center justify-between gap-4 p-5 md:p-[24px_32px] bg-[#150E28] text-white border-b border-white/10 flex-none">
          <div>
            <span className={`${MONO} block text-[0.66rem] tracking-[0.16em] uppercase text-[#FFC900] mb-1.5`}>
              FELLOWSHIP IN MOLECULAR-GENOMICS &amp; PRECISION MEDICINE
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
              The Full Curriculum · 12 Months
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerPdfDownload("Mendel_Fellowship_Curriculum.pdf")}
              className={`${FONT} hidden sm:inline-flex items-center gap-1.5 font-bold text-[0.85rem] px-4 py-2 rounded-full bg-[#FFC900] text-[#1A1502] hover:bg-[#e6b500] transition-colors cursor-pointer`}
            >
              ↓ Download PDF
            </button>
            <button
              onClick={onClose}
              className="w-[38px] h-[38px] rounded-full border border-white/25 flex items-center justify-center text-white text-[1.5rem] hover:bg-white/10 hover:border-[#FFC900] transition-colors flex-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </header>

        {/* Scrollable Curriculum Body */}
        <div className="overflow-y-auto p-5 sm:p-[32px] flex-1 space-y-10">
          {quarters.map((q, qIdx) => (
            <section key={qIdx} className="space-y-6">
              {/* Quarter Header */}
              <div className="space-y-2 border-b border-[#E6E0D8] pb-4">
                <span className={`${MONO} inline-block text-[0.68rem] font-bold tracking-[0.14em] uppercase bg-[#FFC900] text-[#1A1502] rounded-md px-3 py-1`}>
                  {q.qTag}
                </span>
                <h3 className="text-2xl font-extrabold text-[#241E3D]">
                  {q.title}
                </h3>
                <p className="text-[#5C5575] text-[0.95rem] italic leading-relaxed">
                  {q.focus}
                </p>
              </div>

              {/* Month Cards */}
              <div className="space-y-4">
                {q.months.map((m, mIdx) => (
                  <article
                    key={mIdx}
                    className={`bg-white border border-[#E6E0D8] border-l-4 ${q.accentColor} rounded-xl p-5 md:p-6 shadow-sm space-y-4`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className={`${MONO} text-[0.75rem] font-bold tracking-[0.1em] text-[#E0568F]`}>
                        {m.num}
                      </span>
                      <h4 className="text-[1.15rem] font-extrabold text-[#241E3D]">
                        {m.title}
                      </h4>
                    </div>

                    {/* Content Blocks */}
                    <div className="space-y-3 pt-1">
                      {m.theory && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            THEORY &amp; PRINCIPLE
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem] leading-relaxed">
                            {m.theory}
                          </p>
                        </div>
                      )}

                      {m.skills && m.skills.length > 0 && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1.5`}>
                            PRACTICAL SKILLS
                          </span>
                          <ul className="space-y-1.5 text-[#241E3D] text-[0.92rem] leading-relaxed">
                            {m.skills.map((s, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <span className="text-[#FFC900] font-bold text-xs mt-1">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {m.context && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            CLINICAL CONTEXT
                          </span>
                          <p className="text-[#5C5575] text-[0.93rem] leading-relaxed">
                            {m.context}
                          </p>
                        </div>
                      )}

                      {m.specimens && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            SPECIMEN TYPES
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">
                            {m.specimens}
                          </p>
                        </div>
                      )}

                      {m.pathologies && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1.5`}>
                            KEY PATHOLOGIES
                          </span>
                          <ul className="space-y-1 text-[#241E3D] text-[0.92rem]">
                            {m.pathologies.map((p, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#FFC900] font-bold text-xs mt-1">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {m.pathologiesText && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            KEY PATHOLOGIES
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">
                            {m.pathologiesText}
                          </p>
                        </div>
                      )}

                      {m.biomarkers && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1.5`}>
                            INTEGRATED BIOMARKERS
                          </span>
                          <ul className="space-y-1 text-[#241E3D] text-[0.92rem]">
                            {m.biomarkers.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <span className="text-[#FFC900] font-bold text-xs mt-1">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {m.tech && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            TECHNOLOGY
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.tech}</p>
                        </div>
                      )}

                      {m.ai && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1.5`}>
                            AI APPLICATIONS
                          </span>
                          <ul className="space-y-1 text-[#241E3D] text-[0.92rem]">
                            {m.ai.map((item, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <span className="text-[#FFC900] font-bold text-xs mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {m.workflow && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            WORKFLOW
                          </span>
                          <p className="text-[#5C5575] text-[0.93rem]">{m.workflow}</p>
                        </div>
                      )}

                      {m.frozen && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            FROZEN SECTION
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.frozen}</p>
                        </div>
                      )}

                      {m.mgm && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            LABORATORY MANAGEMENT
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.mgm}</p>
                        </div>
                      )}

                      {m.accreditation && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            QUALITY &amp; ACCREDITATION
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.accreditation}</p>
                        </div>
                      )}

                      {m.validation && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            TEST VALIDATION
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.validation}</p>
                        </div>
                      )}

                      {m.legal && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            LEGALSAFE REPORTING
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.legal}</p>
                        </div>
                      )}

                      {m.business && (
                        <div>
                          <span className={`${MONO} text-[0.66rem] tracking-[0.12em] uppercase font-bold text-[#E0568F] block mb-1`}>
                            BUSINESS STRATEGY
                          </span>
                          <p className="text-[#241E3D] text-[0.93rem]">{m.business}</p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <p className={`${MONO} text-center text-[#5C5575] text-[0.8rem] pt-6 border-t border-[#E6E0D8]`}>
            Dr. Kishor Managoli, MD · Founder-Mentor, Mendel Academy
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurriculumModal;
