"use client";
import { useRouter } from "next/navigation";
import {
    FaChevronLeft,
    FaRegUser,
} from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";


const SubjectDetail = () => {
    const router = useRouter();
    return (
        <>
            <div className="ff-font min-h-screen bg-[#EFEFEA] text-[#0F1B33]">
                {/* ===== TOP DARK SECTION ===== */}
                <header className="bg-[#0F1B33] text-white">
                    <div className="mx-auto max-w-3xl px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div
                                    aria-label="Back"

                                    onClick={() => router.back()}
                                    className="flex h-10 w-10 cursor-pointer shrink-0 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10"
                                >
                                    <FaChevronLeft className="text-sm" />
                                </div>
                                <div>
                                    <h1 className="ff-font-bold text-2xl font-bold leading-tight sm:text-3xl">
                                        Microbiology
                                    </h1>
                                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                                        General Principles
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#C9A24A]">
                                    <span className="inline-block h-3 w-3 rotate-45 bg-[#C9A24A]" />
                                    12
                                </div>
                                <button
                                    aria-label="Account"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                                >
                                    <FaRegUser className="text-sm" />
                                </button>
                            </div>
                        </div>

                        {/* EPC heading */}
                        <div className="mt-10 text-center sm:mt-14">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-xs">
                                Equated Percent Correct
                            </div>
                            <h2 className="ff-font-bold mt-3 text-3xl font-bold sm:text-4xl">
                                Calibration required
                            </h2>
                        </div>

                        {/* Confidence band card */}
                        <div className="mt-8 rounded-2xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/5">
                            <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-white/75">Confidence band</span>
                                <span className="font-semibold text-white">
                                    Unlock after first block
                                </span>
                            </div>
                            <div className="mt-3 h-px w-full bg-white/15" />
                            <p className="mt-3 text-center text-xs text-white/60 sm:text-sm">
                                Take a 40-question block to calibrate EPC
                            </p>
                        </div>

                        {/* Concept confidence card */}
                        <div className="mt-4 rounded-2xl bg-white/[0.04] px-5 py-5 ring-1 ring-white/5">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
                                    Concept Confidence
                                </div>
                                <button
                                    aria-label="More info"
                                    className="text-white/60 transition hover:text-white"
                                >
                                    <IoInformationCircleOutline className="text-lg" />
                                </button>
                            </div>
                            <div className="mt-3 h-px w-full bg-white/15" />
                            <p className="mt-3 text-center text-xs text-white/60 sm:text-sm">
                                Concept confidence appears after your first calibrated block.
                            </p>
                        </div>
                    </div>
                </header>

                {/* ===== LIGHT SECTION — CTA CARD ===== */}
                <main className="mx-auto max-w-3xl px-5 pb-32 pt-10 sm:px-8 sm:pb-40 sm:pt-14">
                    <article className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,27,51,0.06)] sm:p-8">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0F1B33]/55 sm:text-xs">
                            Calibration Needed
                        </div>
                        <h3 className="ff-font-bold mt-3 text-2xl font-bold leading-snug text-[#0F1B33] sm:text-3xl">
                            Start a 40-question calibration block
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#0F1B33]/65 sm:text-base">
                            Microbiology is currently uncalibrated. Complete one focused block
                            to unlock EPC, confidence band, and actionable
                            weak/fading/new recommendations.
                        </p>
                        <div className="mt-4 text-sm font-semibold text-[#0F1B33]/80">
                            6900 questions available
                        </div>

                        <button className="mt-6 w-full cursor-pointer rounded-xl bg-primary py-4 text-sm font-semibold text-black transition hover:bg-[#1a2747] sm:text-base">
                            Take Calibration Block
                        </button>
                    </article>
                </main>
            </div>
        </>
    );
}
export default SubjectDetail;