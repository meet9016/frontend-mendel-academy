'use client';
import { useEffect, useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiMeh, BiSmile, BiX } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import { CgLock } from "react-icons/cg";
import { FaFrown } from "react-icons/fa";
import { FiRotateCw } from "react-icons/fi";


type Card = {
    topic: string;
    question: string;
    answer: string;
    history: { label: string; note: string; first?: boolean };
};

const DECK: Card[] = [
    {
        topic: "cell-cycle",
        question: "S phase (Synthesis)",
        answer: "DNA replication occurs — each chromosome is duplicated to form sister chromatids.",
        history: { label: "First time", note: "You've never seen this card before", first: true },
    },
    {
        topic: "cell-cycle",
        question: "G1 phase (Gap 1)",
        answer: "Cell grows in size, synthesizes proteins & organelles, and prepares for DNA replication.",
        history: { label: "Last seen 2d ago", note: "You marked this Medium last time" },
    },
    {
        topic: "cell-cycle",
        question: "G2 phase (Gap 2)",
        answer: "Cell continues to grow and produces proteins required for mitosis. Checkpoint before division.",
        history: { label: "Last seen 5d ago", note: "You marked this Easy — keep the streak!" },
    },
    {
        topic: "mitosis",
        question: "Prophase",
        answer: "Chromatin condenses into chromosomes, nuclear envelope breaks down, spindle fibers form.",
        history: { label: "First time", note: "You've never seen this card before", first: true },
    },
    {
        topic: "mitosis",
        question: "Metaphase",
        answer: "Chromosomes align at the metaphase plate, attached to spindle fibers from opposite poles.",
        history: { label: "Last seen 1d ago", note: "You marked this Hard — let's nail it today" },
    },
];

const RATINGS = [
    { key: "hard", label: "Hard", days: "1 day", Icon: FaFrown, ring: "rgba(239,68,68,0.5)", tint: "#fee2e2" },
    { key: "medium", label: "Medium", days: "3 days", Icon: BiMeh, ring: "rgba(255,202,0,0.6)", tint: "#fff4cc" },
    { key: "easy", label: "Easy", days: "7 days", Icon: BiSmile, ring: "rgba(34,197,94,0.5)", tint: "#dcfce7" },
] as const;

function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
}

function DeckPractice() {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [seconds, setSeconds] = useState(63);
    const [bonus, setBonus] = useState(64);
    const total = DECK.length;
    const card = DECK[index];

    useEffect(() => {
        const t = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

    const next = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => (i + 1) % total), 250);
    };
    const prev = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => (i - 1 + total) % total), 250);
    };
    const rate = (key: string) => {
        setBonus((b) => b + (key === "easy" ? 12 : key === "medium" ? 6 : 2));
        next();
    };

    return (
        <div
            className="min-h-screen w-full ff-font"
            style={{
                background:
                    "",
            }}
        >
            {/* local styles for the unique flip + ambient motion */}
            <style>{`
        .deck-perspective { perspective: 1800px; }
        .deck-card-3d { transform-style: preserve-3d; transition: transform 850ms cubic-bezier(.2,.8,.2,1); }
        .deck-card-3d.is-flipped { transform: rotateY(180deg) rotateX(6deg); }
        .deck-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .deck-back { transform: rotateY(180deg); }
        .deck-glow::before {
          content:""; position:absolute; inset:-2px; border-radius: 28px;
        
        }
        .stack-shadow-1, .stack-shadow-2 {
          position:absolute; left:50%; transform:translateX(-50%); border-radius: 26px;
          background: linear-gradient(180deg,#2a3550,#1a2238); opacity:.55;
        }
        .stack-shadow-1 { width:92%; height:24px; bottom:-12px; filter: blur(2px); }
        .stack-shadow-2 { width:84%; height:22px; bottom:-26px; opacity:.3; filter: blur(3px); }
        .pulse-dot { box-shadow: 0 0 0 0 rgba(34,197,94,.6); animation: pulseDot 1.6s infinite; }
        @keyframes pulseDot { 70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
        .grain { background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px); background-size: 4px 4px; }
        .ribbon { background: linear-gradient(90deg, #FFCA00, #ffe273, #FFCA00); background-size: 200% 100%; animation: ribbon 2.4s linear infinite; }
        @keyframes ribbon { from { background-position: 0% 0; } to { background-position: 200% 0; } }
      `}</style>

            <div className="mx-auto w-full max-w-[1380px] px-4 py-6 sm:px-8 sm:py-10">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3 sm:gap-5">
                        <div className="text-sm font-semibold text-[#1A1A1A]/80">
                            <span className="text-base font-bold text-[#1A1A1A]">{index + 1}</span>
                            <span className="text-[#1A1A1A]/40"> / {total}</span>
                        </div>
                        <div className="hidden items-center gap-1.5 text-sm text-[#1A1A1A]/70 sm:flex">
                            <CgLock className="h-4 w-4" /> <span className="font-semibold">{formatTime(seconds)}</span>
                        </div>
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-[#1A1A1A] shadow-sm">+{bonus}s</span>

                        <div className="relative ml-2 h-2 flex-1 overflow-hidden rounded-full bg-[#1A1A1A]/10">
                            <div className="ribbon h-full rounded-full transition-[width] duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    <button
                        aria-label="Close"
                        className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1A1A1A] shadow-sm ring-1 ring-black/5 transition hover:scale-105"
                    >
                        <BiX className="h-5 w-5" />
                    </button>
                </div>

                {/* Layout */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                    {/* LEFT: card area */}
                    <div className="order-2 lg:order-1">
                        <div className="deck-perspective relative mx-auto w-full max-w-2xl">
                            {/* stacked shadows for depth */}
                            {/* <div className="stack-shadow-1" />
              <div className="stack-shadow-2" /> */}

                            <div className="relative deck-glow">
                                <div
                                    className={`deck-card-3d relative aspect-[4/5] sm:aspect-[5/4] w-full rounded-[26px] ${flipped ? "is-flipped" : ""}`}
                                >
                                    {/* FRONT — Question */}
                                    <button
                                        onClick={() => setFlipped(true)}
                                        className="deck-face absolute inset-0 overflow-hidden rounded-[26px] text-left"
                                        style={{
                                            background:
                                                "radial-gradient(120% 90% at 0% 0%, #1f2a4a 0%, #131a33 55%, #0e1428 100%)",
                                        }}
                                    >
                                        <div className="absolute inset-0 grain opacity-40" />
                                        {/* big watermark number */}
                                        <div className="pointer-events-none absolute -bottom-6 -right-2 text-[180px] font-black leading-none text-white/[0.04] sm:text-[240px]">
                                            {index + 1}
                                        </div>

                                        <div className="relative flex h-full flex-col p-6 sm:p-10">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80 ring-1 ring-white/15">
                                                    <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                    Question
                                                </span>
                                                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
                                                    {card.topic}
                                                </span>
                                            </div>

                                            <div className="my-auto">
                                                <h1
                                                    className="ff-font-bold text-3xl font-bold leading-tight text-white sm:text-5xl"
                                                    style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
                                                >
                                                    {card.question}
                                                </h1>
                                                <p className="mt-3 text-sm text-white/60 sm:text-base">{card.topic}</p>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-xs cursor-pointer text-white/50">Tap card to reveal answer</span>
                                                <span className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-[#1A1A1A]">
                                                    <FiRotateCw className=" h-3.5 w-3.5"/> Flip
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* BACK — Answer */}
                                    <button
                                        onClick={() => setFlipped(false)}
                                        className="deck-face deck-back absolute inset-0 overflow-hidden rounded-[26px] text-left"
                                        style={{
                                            background:
                                                "radial-gradient(120% 90% at 100% 0%, #FFCA00 0%, #ffd633 40%, #ffe89a 100%)",
                                        }}
                                    >
                                        <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
                                        <div className="relative flex h-full flex-col p-6 sm:p-10 text-[#1A1A1A]">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-black/10">
                                                    <HiSparkles className="h-3 w-3" /> Answer
                                                </span>
                                                <span className="rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[11px] font-semibold text-primary">
                                                    {card.topic}
                                                </span>
                                            </div>

                                            <div className="my-auto">
                                                <p
                                                    className="ff-font-bold text-2xl font-bold leading-snug sm:text-3xl"
                                                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                                                >
                                                    {card.answer}
                                                </p>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-xs cursor-pointer text-[#1A1A1A]/70">Rate your recall below</span>
                                                <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-3 py-1.5 text-xs font-bold text-primary">
                                                    <FiRotateCw className="h-3.5 w-3.5" /> Flip back
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Prev/Next */}
                            <div className="mt-8 flex items-center justify-center gap-3">
                                <button
                                    onClick={prev}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm ring-1 ring-black/5 "
                                >
                                    <BiChevronLeft className="h-4 w-4" /> Prev
                                </button>
                                <button
                                    onClick={() => setFlipped((f) => !f)}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2 text-sm font-semibold text-primary shadow-sm "
                                >
                                    <FiRotateCw className="h-4 w-4" /> {flipped ? "Show question" : "Show answer"}
                                </button>
                                <button
                                    onClick={next}
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm ring-1 ring-black/5"
                                >
                                    Next <BiChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: History + ratings panel */}
                    <aside className="order-1 flex flex-col gap-5 lg:order-2">
                        {/* History card */}
                        <div className="exam-card-shadow rounded-2xl bg-white p-5 ring-1 ring-black/5">
                            <div className="flex items-start justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A]/50">
                                    History on this card
                                </span>
                                <span className="text-xs font-semibold text-[#1A1A1A]/60">{card.history.label}</span>
                            </div>
                            <div className="mt-3 flex items-start gap-3">
                                <div
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                                    style={{ background: card.history.first ? "#fff4cc" : "#eef2ff" }}
                                >
                                    <HiSparkles className="h-4 w-4 text-[#1A1A1A]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#1A1A1A]">
                                        {card.history.first ? "You've never seen this card before" : "Welcome back to this card"}
                                    </p>
                                    <p className="mt-0.5 text-xs text-[#1A1A1A]/60">{card.history.note}</p>
                                </div>
                            </div>
                        </div>

                        {/* How well did you know this */}
                        <div className="exam-card-shadow rounded-2xl bg-white p-5 ring-1 ring-black/5">
                            <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A]/55">
                                How well did you know this?
                            </p>
                            <div className="mt-4 grid grid-cols-3 gap-2.5">
                                {RATINGS.map(({ key, label, days, Icon, tint }) => (
                                    <button
                                        key={key}
                                        onClick={() => rate(key)}
                                        disabled={!flipped}
                                        className={`group relative overflow-hidden rounded-xl bg-white p-3 text-left ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none`}
                                    >
                                        <div
                                            className="grid h-8 w-8 place-items-center rounded-full"
                                            style={{ background: tint }}
                                        >
                                            <Icon className="h-4 w-4 text-[#1A1A1A]" />
                                        </div>
                                        <p className="mt-2 text-sm font-bold text-[#1A1A1A]">{label}</p>
                                        <p className="text-[11px] text-[#1A1A1A]/55">{days}</p>
                                    </button>
                                ))}
                            </div>
                            {!flipped && (
                                <p className="mt-3 text-center text-[11px] text-[#1A1A1A]/50">
                                    Flip the card to unlock ratings
                                </p>
                            )}
                        </div>

                        {/* Session stats */}
                        <div className="exam-card-shadow rounded-2xl bg-[#1A1A1A] p-5 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                                This session
                            </p>
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                <div>
                                    <p className="text-2xl font-extrabold text-primary">{index + 1}</p>
                                    <p className="text-[11px] text-white/60">Reviewed</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold">{formatTime(seconds)}</p>
                                    <p className="text-[11px] text-white/60">Time</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-extrabold text-primary">+{bonus}s</p>
                                    <p className="text-[11px] text-white/60">Bonus</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default DeckPractice;