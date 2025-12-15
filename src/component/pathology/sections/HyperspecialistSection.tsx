// "use client";
// import CommonButton from "@/comman/Button";
// import { useRouter } from "next/navigation";

// export default function HyperspecialistSection() {
//     const router = useRouter();

//   return (
//     <div className="bg-[#F2F1E8] min-h-screen w-full py-12 px-6 md:px-16">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
//         {/* LEFT COLUMN */}
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
//             The Mendel Hyperspecialist
//           </h1>

//           {/* Box 1 */}
//           <div className="bg-[#3A7BF7] text-white rounded-lg p-5 mb-5 shadow">
//             <h2 className="font-bold text-lg mb-2">
//               Diagnostic Engine (Lab Core)
//             </h2>
//             <ul className="space-y-1 text-sm">
//               <li>
//                 • Surgical Path + Heme + Clinical-Path + Micro + Biochem
//                 integration
//               </li>
//               <li>• Synoptic, CAP-safe, medico-legal shielded reporting</li>
//             </ul>
//           </div>

//           {/* Box 2 */}
//           <div className="bg-[#3C9CA9] text-white rounded-lg p-5 mb-5 shadow">
//             <h2 className="font-bold text-lg mb-2">Polymath Clinical Brain</h2>
//             <ul className="space-y-1 text-sm">
//               <li>
//                 • Working mastery across Medicine, Surgery, ObGyn, Peds, Neuro,
//                 ICU, ENT, etc
//               </li>
//               <li>• “Thinks like a clinician, sees like a pathologist”</li>
//             </ul>
//           </div>

//           {/* Box 3 */}
//           <div className="bg-[#42A4C4] text-white rounded-lg p-5 mb-5 shadow">
//             <h2 className="font-bold text-lg mb-2">Futurist Domain Mastery</h2>
//             <ul className="space-y-1 text-sm">
//               <li>• HSPath–MGPM (Molecular Genetics & Precision Medicine)</li>
//               <li>
//                 • Future tracks: Precision Oncology, AI-Pathology, Clinical
//                 Trials
//               </li>
//             </ul>
//           </div>

//           {/* Box 4 */}
//           <div className="bg-[#D9A76A] text-white rounded-lg p-5 mb-5 shadow">
//             <h2 className="font-bold text-lg mb-2">
//               AI & Digital + Ethics Foundation
//             </h2>
//             <ul className="space-y-1 text-sm">
//               <li>
//                 • WSI, AI tools, data literacy, documentation & medico-legal
//                 rigor
//               </li>
//               <li>• “Human in the loop” guardrails</li>
//             </ul>
//           </div>

//           {/* Box 5 */}
//           <div className="bg-[#D67A45] text-white rounded-lg p-5 mb-5 shadow">
//             <h2 className="font-bold text-lg mb-2">
//               Meta / Board Influence Layer
//             </h2>
//             <ul className="space-y-1 text-sm">
//               <li>• Tumor Boards, ICU/ICU Boards, Mendel Boards</li>
//               <li>• Hospital & pharma advisory roles</li>
//             </ul>
//           </div>

//           {/* Box 6 */}
//           <div className="bg-[#B88639] text-white rounded-lg p-5 shadow">
//             <h2 className="font-bold text-lg mb-2">Business & Systems Layer</h2>
//             <ul className="space-y-1 text-sm">
//               <li>• Med-MBA / MetaPath – Diagnostic Business Architect</li>
//               <li>• Profit matrices, process audits, hospital ROI upgrades</li>
//             </ul>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="space-y-6">
//           <h2 className="text-4xl font-extrabold leading-snug text-gray-900">
//             Become the Hyperspecialist
//             <br />
//             Human-in-the-Loop
//           </h2>

//           <p className="text-gray-700 text-lg">
//             Pathologists who just sign reports will be replaced.
//           </p>

//           <p className="text-gray-700 text-lg">
//             Mendel Hyperspecialists design diagnosis, steer Tumor Boards,
//             rewrite hospital profitability — and become{" "}
//             <strong>first among equals in medicine.</strong>
//           </p>

//           <p className="text-gray-700 text-lg">
//             Polymath clinical + diagnostic training, far beyond DM/MCh.
//           </p>

//           <p className="text-gray-700 text-lg">
//             Futurist domain: Molecular Genetics & Precision Medicine
//             (HSPath–MGPM).
//           </p>

//           <p className="text-gray-700 text-lg">
//             Business, AI, and medico-legal firepower to make you indispensable.
//           </p>

//           <CommonButton
//             pyClass="py-3"
//             pxClass="px-8"
//             className="transition shadow-md w-fit !rounded-full"
//             fontWeight={700}
//             fontSize={15}
//             onClick={() => router.push(`/pathology/hyperspecialist`)}
//           >
//             Enroll Now
//           </CommonButton>
//           <p className="text-xs text-gray-600">
//             Limited seats · Board-style selection · For serious pathologists
//             only
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }























"use client";

import CommonButton from "@/comman/Button";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
const specializations = [
  {
    title: "Diagnostic Engine (Lab Core)",
    items: [
      "Surgical Path + Heme + Clinical-Path + Micro + Biochem integration",
      "Synoptic, CAP-safe, medico-legal shielded reporting",
    ],
    color: "#3B82F6",
  },
  {
    title: "Polymath Clinical Brain",
    items: [
      "Working mastery across Medicine, Surgery, ObGyn, Peds, Neuro, ICU, ENT, etc",
      '"Thinks like a clinician, sees like a pathologist"',
    ],
    color: "#14B8A6",
  },
  {
    title: "Futurist Domain Mastery",
    items: [
      "HSPath–MGPM (Molecular Genetics & Precision Medicine)",
      "Future tracks: Precision Oncology, AI-Pathology, Clinical Trials",
    ],
    color: "#06B6D4",
  },
  {
    title: "AI & Digital + Ethics Foundation",
    items: [
      "WSI, AI tools, data literacy, documentation & medico-legal rigor",
      '"Human in the loop" guardrails',
    ],
    color: "#F59E0B",
  },
  {
    title: "Meta / Board Influence Layer",
    items: [
      "Tumor Boards, ICU/ICU Boards, Mendel Boards",
      "Hospital & pharma advisory roles",
    ],
    color: "#F97316",
  },
  {
    title: "Business & Systems Layer",
    items: [
      "Med-MBA / MetaPath – Diagnostic Business Architect",
      "Profit matrices, process audits, hospital ROI upgrades",
    ],
    color: "#B45309",
  },
];

export default function Page() {
  const router = useRouter();
  return (
    <div className=" bg-[#f9fafb] text-black overflow-x-hidden">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 lg:py-10 max-w-[1380px]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <div>
            <h1 className="font-display text-2xl ff-font-bold md:text-4xl font-bold lg:mb-5 ">
              The Mendel Hyperspecialist
            </h1>

            <div className="space-y-5">
              {specializations.map((spec) => (
                <div key={spec.title} className="group relative">

                  {/* Connector Line */}
                  <div
                    className="absolute left-0 top-4 h-[70%] w-1 rounded-full transition-all duration-500 group-hover:w-1"
                    style={{
                      background: "linear-gradient(180deg,#FFCA00,#FFCA00,#FFCA00)",
                      boxShadow: "0 0 12px rgba(255,202,0,0.6), 0 0 28px rgba(255,202,0,0.35)",
                    }}
                  />


                  {/* Node */}
                  <div
                    className="absolute -left-2 top-4 w-5 h-5 rounded-full border-2 transition-all duration-500 group-hover:scale-125"
                    style={{
                      borderColor: "#FFCA00",
                      background: `radial-gradient(circle, #FFCA00, transparent)`,
                    }}
                  >
                    <div
                      className="absolute inset-1.5 rounded-full bg-[#FFCA00]"
                    />
                  </div>

                  {/* Content */}
                  <div className="pl-8 py-1 transition-all duration-300 group-hover:pl-10">
                    <h3 className="font-display text-lg lg:text-xl font-bold mb-1 ff-font-bold">
                      {spec.title}
                    </h3>

                    <ul className="space-y-1.5">
                      {spec.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-black text-sm lg:text-base leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 ff-font rounded-full bg-[#FFCA00] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:sticky lg:top-28">
            <div
              className="relative p-6 sm:p-8 lg:p-10 border border-primary bg-white rounded-2xl"
            >

              <div className="relative">
                <h2 className="font-display text-2xl  md:text-4xl ff-font-bold  font-bold leading-tight mb-6 lg:mb-8">
                  <span className="text-black">Become the Hyperspecialist  Human-in-the-Loop</span>

                </h2>

                <div className="space-y-4 text-black ff-font">
                  <p className="text-base lg:text-lg xl:text-xl">
                    Pathologists who just sign reports will be replaced.
                  </p>

                  <p className="text-sm lg:text-base xl:text-lg">
                    Mendel Hyperspecialists design diagnosis, steer Tumor Boards,
                    rewrite hospital profitability — and become{" "}
                    <strong className="text-black">
                      first among equals in medicine.
                    </strong>
                  </p>

                  <p className="text-sm lg:text-base xl:text-lg">
                    Polymath clinical + diagnostic training, far beyond DM/MCh.
                  </p>

                  <p className="text-sm lg:text-base xl:text-lg">
                    Futurist domain: Molecular Genetics & Precision Medicine
                    (HSPath–MGPM).
                  </p>

                  <p className="text-sm lg:text-base xl:text-lg">
                    Business, AI, and medico-legal firepower to make you indispensable.
                  </p>
                </div>

                <div className="mt-8 lg:mt-10">
                  <CommonButton
                    size="xxl"
                    pyClass="py-4"
                    pxClass="px-45"
                    fontWeight={700}
                    onClick={() => router.push(`/pathology/hyperspecialist`)}
                  >
                    Enroll Now
                    <BsArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </CommonButton>

                  <p className="mt-4 text-xs sm:text-sm ff-fontflex flex-wrap gap-2 justify-center text-center">

                    <span>Limited seats</span>
                    <span>•</span>
                    <span>Board-style selection</span>
                    <span>•</span>
                    <span>For serious pathologists only</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}





















