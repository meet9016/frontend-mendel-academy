"use client";
import {
    HiSearch,
    HiOutlineBell,
    HiChevronRight,
    HiOutlineBookOpen,
    HiOutlineLightningBolt,
    HiOutlineClock,
    HiOutlineTrendingUp,
} from "react-icons/hi";
import { SlUser } from "react-icons/sl";
import {
    FaFire,
    FaRegStar,
    FaBullseye,
    FaFlask
} from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Sliders from "@/comman/Sliders";

const subjects = [
    { title: "Microbiology", questions: "0 / 6.9K", concepts: "0 / 344", icon: FaFlask, accent: "from-amber-200 to-yellow-100" },
    { title: "Biochemistry", questions: "0 / 4.9K", concepts: "0 / 256", icon: FaFlask, accent: "from-amber-200 to-yellow-100" },
    { title: "Immunology", questions: "0 / 2.2K", concepts: "0 / 108", icon: FaFlask, accent: "from-amber-200 to-yellow-100" },
    { title: "General pathology", questions: "0 / 1.2K", concepts: "0 / 60", icon: HiOutlineLightningBolt, accent: "from-amber-200 to-yellow-100" },
    { title: "Pharmacology", questions: "0 / 1.0K", concepts: "0 / 52", icon: FaFlask, accent: "from-amber-200 to-yellow-100" },
];

const recentBlocks = [
    { title: "Block 45: Mixed Content", time: "Yesterday · 40 items · 52 min", epc: "72%" },
    { title: "Block 44: Renal Focus", time: "2 days ago · 20 items · 28 min", epc: "62%" },
    { title: "Block 43: Biochemistry", time: "3 days ago · 40 items · 58 min", epc: "74%" },
];


const QuestionBank = () => {
    const router = useRouter();
    return (
        <div className="ff-font min-h-screen bg-[#FAFAF7] text-[#1A1A1A]">
            {/* ============ HERO ============ */}
            <section className="relative overflow-hidden bg-[#091a32] rounded-b-[32px] sm:rounded-b-[48px]">
                {/* decorative blobs */}
                <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-8 sm:pb-12">
                    {/* topbar */}
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="relative shrink-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFCA00] flex items-center justify-center font-black text-lg sm:text-xl text-[#1A1A1A]">M</div>
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 border-2 border-[#071B44]" />
                            </div>
                            <div>
                                <h1 className="ff-font-bold text-white text-[20px] sm:text-[26px] md:text-[30px] font-bold leading-tight">Question Bank</h1>
                                <p className="text-white/50 text-[11px] sm:text-[13px] ff-font uppercase">USMLE Step 1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition">
                                <HiOutlineBell size={18} />
                                <span className="absolute -top-1 -right-1 bg-[#FFCA00] text-[#1A1A1A] text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">12</span>
                            </button>
                            <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition">
                                <SlUser size={18} />
                            </button>
                        </div>
                    </header>

                    {/* hero grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-5 sm:gap-6 mt-6 sm:mt-10">
                        {/* left big card */}
                        <div className="relative rounded-[24px] sm:rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,#13294B_0%,#0D2142_45%,#091A32_100%)] overflow-hidden">


                            <div className="relative z-10 p-5 sm:p-7 lg:p-8">
                                {/* top section */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                                    {/* progress ring */}
                                    <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] xl:w-[180px] xl:h-[180px] shrink-0 mx-auto sm:mx-0">
                                        <svg
                                            className="w-full h-full rotate-[-90deg]"
                                            viewBox="0 0 120 120"
                                        >
                                            {/* Background Circle */}
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="50"
                                                stroke="rgba(255,255,255,0.08)"
                                                strokeWidth="10"
                                                fill="none"
                                            />

                                            {/* Progress Circle */}
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="50"
                                                stroke="#FFCA00"
                                                strokeWidth="10"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray="314"
                                                strokeDashoffset="274" // 5/40 progress
                                            />
                                        </svg>

                                        <div className="absolute inset-[14px] sm:inset-[18px] rounded-full bg-[linear-gradient(135deg,#0B1F3D_0%,#091A32_100%)] flex flex-col items-center justify-center shadow-[inset_0_8px_24px_rgba(255,255,255,0.03)]">
                                            <h2 className="text-white text-[38px] sm:text-[44px] xl:text-[48px] font-bold leading-none ff-font-bold">
                                                5
                                            </h2>

                                            <p className="text-white/45 mt-1 sm:mt-2 text-xs sm:text-sm">
                                                / 40 done
                                            </p>
                                        </div>
                                    </div>

                                    {/* content */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                            <div className="h-[32px] sm:h-[36px] px-3 sm:px-4 rounded-full bg-[#10284D] border border-white/10 inline-flex items-center text-white text-[10px] sm:text-[11px] tracking-wide font-semibold">
                                                PREDICTED EPC
                                            </div>
                                            <div className="h-[32px] sm:h-[36px] px-3 sm:px-4 rounded-full bg-emerald-500/15 border border-emerald-400/20 inline-flex items-center gap-1.5 sm:gap-2 text-emerald-300 text-[10px] sm:text-[11px] tracking-wide font-semibold">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                UNCALIBRATED
                                            </div>
                                        </div>

                                        <h2 className="ff-font-bold text-white text-[26px] sm:text-[34px] md:text-[40px] xl:text-[48px] leading-[1.05] font-bold mt-4 sm:mt-6">
                                            Run your first{" "}
                                            <span className="text-[#FFCA00]">40Q</span>{" "}
                                            block
                                        </h2>

                                        <p className="text-white/60 ff-font text-[15px] sm:text-[17px] leading-[26px] sm:leading-[30px] mt-3 sm:mt-5">
                                            40 questions left to unlock EPC, confidence range, and speed insights.
                                        </p>


                                    </div>
                                </div>

                                {/* divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 sm:my-8" />

                                {/* stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
                                    {[
                                        { icon: FaBullseye, label: "Solved", value: "0", sub: "Goal 40Q" },
                                        { icon: HiOutlineTrendingUp, label: "Recent", value: "Start", sub: "40Q block" },
                                        { icon: HiOutlineClock, label: "Avg Time", value: "Unlocks", sub: "After 40Q" },
                                    ].map((s, i) => {
                                        const I = s.icon;

                                        return (
                                            <div
                                                key={i}
                                                className="group relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/5 bg-[linear-gradient(135deg,#0B1F3D_0%,#091A32_100%)] hover:border-[#FFCA00]/20 transition-all duration-300"
                                            >
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFCA00]/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

                                                <div className="relative z-10 p-4 sm:p-5">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-white/35 uppercase ff-font-bold text-[10px] sm:text-[12px] font-semibold">
                                                            {s.label}
                                                        </p>

                                                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FFCA00]/10 flex items-center justify-center text-[#FFCA00]">
                                                            <I size={15} />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 sm:mt-6">
                                                        <h3 className="ff-font-bold text-white text-[28px] sm:text-[34px] xl:text-[38px] leading-none font-bold">
                                                            {s.value}
                                                        </h3>

                                                        <p className="text-white/45 text-xs sm:text-sm mt-2 sm:mt-3">
                                                            {s.sub}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FFCA00] group-hover:w-full transition-all duration-500" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* right column */}
                        <div className="space-y-4 sm:space-y-5">
                            {/* search + goal */}
                            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 border border-[#ECECEC]">
                                <div className="flex items-center gap-3 border border-[#ECECEC] rounded-2xl px-4 h-[52px] sm:h-[58px] focus-within:border-[#FFCA00] transition">
                                    <HiSearch className="text-gray-400 shrink-0" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search topics or enter QID..."
                                        className="bg-transparent outline-none w-full text-[13px] sm:text-[14px] min-w-0"
                                    />
                                    <kbd className="hidden md:inline-flex text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 shrink-0">⌘K</kbd>
                                </div>

                                <div className="mt-4 sm:mt-5 relative overflow-hidden rounded-[20px] sm:rounded-[15px] p-4 sm:p-6 bg-white border-x border-primary border-t-[3px] border-b-[3px]">
                                    <div className="relative flex items-center gap-3 sm:gap-5">
                                        {/* round progress */}
                                        <div className="relative w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] shrink-0">
                                            <svg
                                                className="w-full h-full rotate-[-90deg]"
                                                viewBox="0 0 120 120"
                                            >
                                                {/* Background */}
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="50"
                                                    stroke="#E7DFC4"
                                                    strokeWidth="10"
                                                    fill="none"
                                                />

                                                {/* Progress */}
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="50"
                                                    stroke="#071B44"
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeDasharray="314"
                                                    strokeDashoffset="236" // 5/20 progress
                                                />
                                            </svg>

                                            <div className="absolute inset-[8px] sm:inset-[10px] rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                                                <h4 className="text-[#1A1A1A] text-[16px] sm:text-[20px] leading-none font-bold">
                                                    5
                                                </h4>

                                                <p className="text-[#7c6500] text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-semibold">
                                                    / 20
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] tracking-[3px] sm:tracking-[4px] uppercase text-[#7c6500] font-semibold">Today's Goal</p>
                                            <h3 className="ff-font-bold text-[18px] sm:text-[20px] xl:text-[24px] leading-[24px] sm:leading-[28px] sm:leading-[30px] font-bold text-[#1A1A1A] mt-1.5 sm:mt-2">
                                                20 more to keep your streak
                                            </h3>
                                            <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4">
                                                <p className="inline-flex ff-font items-center gap-1.5 text-[#7c6500] font-semibold text-xs sm:text-sm">
                                                    <FaFire size={14} className="text-orange-500" />
                                                    12-day streak
                                                </p>
                                                <button className="bg-[#091a32] ff-font text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition shrink-0">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* next block card */}
                            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 bg-gradient-to-br from-[#091A32] via-[#0B1F3D] to-[#10284D] border border-white/5">
                                <div className="relative flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-white/40 uppercase tracking-[3px] text-[10px] font-semibold">Next Block</p>
                                        <h3 className="ff-font-bold text-white text-[18px] sm:text-[20px] xl:text-[22px] leading-[24px] sm:leading-[28px] font-bold mt-1.5 sm:mt-2">
                                            Pick a topic to calibrate first
                                        </h3>
                                        <p className="text-white/50 ff-font text-xs sm:text-sm mt-1 sm:mt-1.5">Swipe to explore — 6 options</p>
                                    </div>
                                    <div className="inline-flex ff-font items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wide whitespace-nowrap shrink-0">
                                        Calibration
                                    </div>
                                </div>



                                <Sliders
                                    settings={{
                                        dots: false,
                                        infinite: true,
                                        speed: 500,
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        arrows: true,
                                    }}
                                >
                                    <div>
                                        <div className="mx-1 relative mt-4 sm:mt-5 rounded-[18px] sm:rounded-[22px] border border-[#9BE8B4]/10 bg-gradient-to-br from-[#091A32] via-[#0B1F3D] to-[#10284D] backdrop-blur-xl p-3.5 sm:p-4 overflow-hidden">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#9BE8B4]/10 text-[#9BE8B4] flex items-center justify-center border border-[#9BE8B4]/10 shrink-0">
                                                    <FaRegStar size={14} />
                                                </div>

                                                <div className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-2 sm:px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wide whitespace-nowrap">
                                                    MOST AMBITIOUS
                                                </div>
                                            </div>

                                            <h3 className="ff-font-bold text-white text-[18px] sm:text-[20px] xl:text-[22px] font-bold mt-3 sm:mt-4">
                                                Full USMLE mock exam
                                            </h3>

                                            <div className="mt-1.5 sm:mt-2 space-y-0.5">
                                                <p className="text-white/75 ff-font text-xs sm:text-sm">
                                                    14 blocks × 20 questions
                                                </p>

                                                <p className="text-white/45 ff-font text-xs sm:text-sm">
                                                    ~392m · All topics
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => router.push("/question-bank/configure-practice")}
                                                className="w-full mt-3 cursor-pointer sm:mt-4 inline-flex items-center justify-center gap-2 bg-[#FFCA00] text-[#091A32] font-bold h-[44px] sm:h-[48px] rounded-xl text-sm ff-font-bold"
                                            >
                                                Start full mock (280Q)
                                                <HiChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </Sliders>






                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ MAIN CONTENT ============ */}
            <main className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                {/* practice tools */}
                <section>
                    <div className="flex items-end justify-between mb-5 sm:mb-6">
                        <div>
                            <p className="text-gray-400 uppercase ff-font text-[12px] sm:text-[13px]">Practice Tools</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {[
                            { title: "Custom Block", desc: "Systems, incorrects, timed", tag: "3 SAVED PRESETS", icon: CiSettings },
                            { title: "Self-Assessments", desc: "NBME-style mock exams", tag: "FREE SCORE REPORT", icon: HiOutlineBookOpen },
                        ].map((t, i) => {
                            const I = t.icon;
                            return (
                                <button
                                    key={i}
                                    className="group text-left bg-white border border-[#ECECEC] rounded-[24px] sm:rounded-[28px] p-3 sm:p-5 hover:-translate-y-1 hover:border-[#FFCA00] transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-2xl bg-white text-primary border border-primary flex items-center justify-center ">
                                            <I size={30} />
                                        </div>
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#ECECEC] flex items-center justify-center text-gray-400 group-hover:bg-[#FFCA00] group-hover:text-[#1A1A1A] group-hover:border-[#FFCA00] transition">
                                            <HiChevronRight size={16} />
                                        </div>
                                    </div>
                                    <h3 className="ff-font-bold text-[21px] sm:text-[26px] font-bold mt-4 sm:mt-6">{t.title}</h3>
                                    <p className="text-gray-500 ff-font text-sm sm:text-base">{t.desc}</p>
                                    <div className="inline-flex mt-4 sm:mt-5 bg-[#F7F4ED] px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-gray-600 uppercase">
                                        {t.tag}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* performance */}
                <section className="mt-10 sm:mt-14">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-5">
                        <div className="w-full">
                            <p className="text-gray-400 uppercase ff-font text-[12px] sm:text-[13px]">Performance by content area</p>

                            {/* tabs — scrollable on mobile */}
                            <div className="mt-3 sm:mt-4 overflow-x-auto pb-1">
                                <div className="inline-flex items-center bg-[#F3EFE6] border border-[#E6DED0] rounded-2xl p-1 sm:p-1.5 gap-1 min-w-max">
                                    <button className="relative h-[44px] sm:h-[52px] px-4 sm:px-7 rounded-xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)] text-[#071B44] font-semibold text-xs sm:text-sm">
                                        <span className="relative z-10 ff-font">General Principles</span>
                                        <div className="absolute inset-0 rounded-xl border border-[#E8E1D5]" />
                                        <div className="absolute left-4 right-4 bottom-1 h-[3px] rounded-full bg-[#FFCA00]" />
                                    </button>
                                    <button className="h-[44px] sm:h-[52px] ff-font px-4 sm:px-7 rounded-xl text-[#8E877C] hover:text-[#071B44] hover:bg-white/70 font-medium text-xs sm:text-sm whitespace-nowrap">
                                        Organ systems
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-5 sm:mt-7">
                        {subjects.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <article
                                    onClick={() => router.push('/question-bank/subject-detail')}
                                    key={index}
                                    className="group cursor-pointer bg-white border border-[#ECECEC] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 hover:-translate-y-1 hover:border-[#FFCA00] transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-2xl bg-white ${item.accent} text-primary border border-primary flex items-center justify-center shadow-inner`}>
                                            <Icon size={22} />
                                        </div>

                                        <span className="bg-[#F7F4ED] text-gray-600 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider">
                                            NEW
                                        </span>
                                    </div>

                                    <h3 className="ff-font-bold text-[18px] sm:text-[22px] leading-tight font-bold mt-4 sm:mt-6">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-1 uppercase ff-font">
                                        Uncalibrated
                                    </p>

                                    <p className="text-gray-400 mt-2 sm:mt-3 text-[13px] sm:text-[15px] font-medium">
                                        Take a 40-question block to unlock EPC and confidence stats
                                    </p>

                                    <div className="mt-4 sm:mt-5">
                                        <div className="h-1.5 bg-[#F1F1F1] rounded-full overflow-hidden">
                                            <div className="w-[8%] h-full bg-gradient-to-r from-[#FFCA00] to-[#FFB800] rounded-full" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#F1F1F1]">
                                        <div>
                                            <p className="uppercase ff-font text-[11px] sm:text-[13px] text-gray-400">
                                                Questions
                                            </p>

                                            <h4 className="ff-font-bold font-bold text-base sm:text-lg mt-1">
                                                {item.questions}
                                            </h4>
                                        </div>

                                        <div>
                                            <p className="uppercase text-[11px] sm:text-[13px] ff-font text-gray-400">
                                                Concepts
                                            </p>

                                            <h4 className="ff-font-bold font-bold text-base sm:text-lg mt-1">
                                                {item.concepts}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:mt-2 flex items-center justify-end">
                                        <button className="cursor-pointer group/btn inline-flex items-center gap-2 text-[#B7B7B7] hover:text-[#111827] transition-all duration-300">
                                            <span className="text-[13px] sm:text-sm font-medium ff-font">
                                                Calibrate now
                                            </span>

                                            <div className="w-6 h-6 flex items-center justify-center group-hover/btn:border-[#FFCA00] group-hover/btn:bg-[#FFCA00] transition-all duration-300">
                                                <HiChevronRight
                                                    size={20}
                                                    className="group-hover/btn:translate-x-[1px] transition-transform duration-300"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}

                        {/* coming soon */}
                        <div className="border-2 border-dashed border-[#E5E5E5] rounded-[24px] sm:rounded-[28px] min-h-[280px] sm:min-h-[360px] flex items-center justify-center bg-[#FCFCFA] hover:border-[#FFCA00] transition group">
                            <div className="text-center px-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F7F4ED] mx-auto flex items-center justify-center text-gray-300 group-hover:text-[#FFCA00] transition">
                                    <HiChevronRight size={24} />
                                </div>
                                <h3 className="text-[17px] sm:text-[20px] text-gray-400 font-semibold mt-3 sm:mt-4">Public health sciences</h3>
                                <p className="uppercase tracking-[4px] text-[10px] sm:text-xs text-gray-300 mt-2 sm:mt-3">Coming soon</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* recent blocks */}
                <section className="mt-10 sm:mt-14">
                    <div className="flex items-end justify-between mb-5 sm:mb-6">
                        <div>
                            <p className="text-gray-400 ff-font uppercase text-[12px] sm:text-[13px]">Recent Blocks</p>
                            <h2 className="ff-font-bold text-[21px] sm:text-[25px] font-bold">Pick up where you left off</h2>
                        </div>
                        <button className="font-semibold ff-font text-black hover:text-[#FFCA00] inline-flex items-center gap-1 text-sm shrink-0 ml-4">
                            See All <HiChevronRight size={16} />
                        </button>
                    </div>

                    <div className="bg-white border border-[#ECECEC] rounded-[24px] sm:rounded-[28px] overflow-hidden">
                        {recentBlocks.map((item, index) => (
                            <div
                                key={index}
                                className={`group px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:bg-[#FFFBE9] transition ${index !== recentBlocks.length - 1 ? "border-b border-[#F1F1F1]" : ""}`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F7F4ED] text-[#071B44] flex items-center justify-center group-hover:bg-[#FFCA00] transition shrink-0">
                                        <HiOutlineBookOpen size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="ff-font-bold text-[16px] sm:text-[18px] font-bold leading-tight truncate">{item.title}</h3>
                                        <p className="text-gray-500 ff-font mt-0.5 sm:mt-1 text-xs sm:text-sm">{item.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 lg:gap-8 pl-[52px] sm:pl-0">
                                    <div className="text-left sm:text-right">
                                        <p className="uppercase ff-font text-[10px] text-gray-400">EPC</p>
                                        <h4 className="ff-font-bold text-[20px] sm:text-[24px] font-bold text-[#071B44]">{item.epc}</h4>
                                    </div>
                                    <button className="font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#FFCA00] hover:bg-[#FFCA00] hover:text-[#1A1A1A] transition whitespace-nowrap">
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


            </main>
        </div>
    );
};

export default QuestionBank;
