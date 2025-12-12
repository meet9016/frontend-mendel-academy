"use client";
import CommonButton from "@/comman/Button";
import { useRouter } from "next/navigation";

export default function HyperspecialistSection() {
    const router = useRouter();
  
  return (
    <div className="bg-[#F2F1E8] min-h-screen w-full py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* LEFT COLUMN */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            The Mendel Hyperspecialist
          </h1>

          {/* Box 1 */}
          <div className="bg-[#3A7BF7] text-white rounded-lg p-5 mb-5 shadow">
            <h2 className="font-bold text-lg mb-2">
              Diagnostic Engine (Lab Core)
            </h2>
            <ul className="space-y-1 text-sm">
              <li>
                • Surgical Path + Heme + Clinical-Path + Micro + Biochem
                integration
              </li>
              <li>• Synoptic, CAP-safe, medico-legal shielded reporting</li>
            </ul>
          </div>

          {/* Box 2 */}
          <div className="bg-[#3C9CA9] text-white rounded-lg p-5 mb-5 shadow">
            <h2 className="font-bold text-lg mb-2">Polymath Clinical Brain</h2>
            <ul className="space-y-1 text-sm">
              <li>
                • Working mastery across Medicine, Surgery, ObGyn, Peds, Neuro,
                ICU, ENT, etc
              </li>
              <li>• “Thinks like a clinician, sees like a pathologist”</li>
            </ul>
          </div>

          {/* Box 3 */}
          <div className="bg-[#42A4C4] text-white rounded-lg p-5 mb-5 shadow">
            <h2 className="font-bold text-lg mb-2">Futurist Domain Mastery</h2>
            <ul className="space-y-1 text-sm">
              <li>• HSPath–MGPM (Molecular Genetics & Precision Medicine)</li>
              <li>
                • Future tracks: Precision Oncology, AI-Pathology, Clinical
                Trials
              </li>
            </ul>
          </div>

          {/* Box 4 */}
          <div className="bg-[#D9A76A] text-white rounded-lg p-5 mb-5 shadow">
            <h2 className="font-bold text-lg mb-2">
              AI & Digital + Ethics Foundation
            </h2>
            <ul className="space-y-1 text-sm">
              <li>
                • WSI, AI tools, data literacy, documentation & medico-legal
                rigor
              </li>
              <li>• “Human in the loop” guardrails</li>
            </ul>
          </div>

          {/* Box 5 */}
          <div className="bg-[#D67A45] text-white rounded-lg p-5 mb-5 shadow">
            <h2 className="font-bold text-lg mb-2">
              Meta / Board Influence Layer
            </h2>
            <ul className="space-y-1 text-sm">
              <li>• Tumor Boards, ICU/ICU Boards, Mendel Boards</li>
              <li>• Hospital & pharma advisory roles</li>
            </ul>
          </div>

          {/* Box 6 */}
          <div className="bg-[#B88639] text-white rounded-lg p-5 shadow">
            <h2 className="font-bold text-lg mb-2">Business & Systems Layer</h2>
            <ul className="space-y-1 text-sm">
              <li>• Med-MBA / MetaPath – Diagnostic Business Architect</li>
              <li>• Profit matrices, process audits, hospital ROI upgrades</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold leading-snug text-gray-900">
            Become the Hyperspecialist
            <br />
            Human-in-the-Loop
          </h2>

          <p className="text-gray-700 text-lg">
            Pathologists who just sign reports will be replaced.
          </p>

          <p className="text-gray-700 text-lg">
            Mendel Hyperspecialists design diagnosis, steer Tumor Boards,
            rewrite hospital profitability — and become{" "}
            <strong>first among equals in medicine.</strong>
          </p>

          <p className="text-gray-700 text-lg">
            Polymath clinical + diagnostic training, far beyond DM/MCh.
          </p>

          <p className="text-gray-700 text-lg">
            Futurist domain: Molecular Genetics & Precision Medicine
            (HSPath–MGPM).
          </p>

          <p className="text-gray-700 text-lg">
            Business, AI, and medico-legal firepower to make you indispensable.
          </p>

          <CommonButton
            pyClass="py-3"
            pxClass="px-8"
            className="transition shadow-md w-fit !rounded-full"
            fontWeight={700}
            fontSize={15}
            onClick={() => router.push(`/pathology/hyperspecialist`)}
          >
            Enroll Now
          </CommonButton>
          <p className="text-xs text-gray-600">
            Limited seats · Board-style selection · For serious pathologists
            only
          </p>
        </div>
      </div>
    </div>
  );
}
