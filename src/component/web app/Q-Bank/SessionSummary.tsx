'use client';

import { useMemo, useState } from "react";
import {
    FiRefreshCw,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiSkipForward,
    FiChevronRight,
    FiZap,
    FiTrendingUp,
    FiBarChart2,
    FiAward,
} from "react-icons/fi";



type QStatus = "correct" | "incorrect" | "skipped";

interface QItem {
    id: number;
    exam: string;
    topic: string;
    title: string;
    preview: string;
    status: QStatus;
}

const QUESTIONS: QItem[] = Array.from({ length: 40 }).map((_, i) => {
    const titles = [
        "Antimicrobials To Avoid In Pregnancy",
        "Disinfection And Sterilization",
        "Mechanisms Of Antibiotic Resistance",
        "Pharmacokinetics Basics",
        "Cardiac Arrhythmias Overview",
        "Renal Tubular Function",
    ];
    const previews = [
        "A 52-year-old man presents to the clinic with increasing fatigue and intermittent fevers...",
        "A 12-year-old boy presents to the emergency department with a 2-day history of...",
        "A 34-year-old woman with a history of recurrent UTIs is started on...",
        "A 67-year-old patient on multiple medications develops new onset...",
    ];
    return {
        id: i + 1,
        exam: "Usmle-Step-1",
        topic: "General-Principles",
        title: titles[i % titles.length],
        preview: previews[i % previews.length],
        status: "skipped" as QStatus,
    };
});

function Ring({ percent }: { percent: number }) {
    const size = 220;
    const stroke = 14;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (percent / 100) * c;
    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} stroke="#F1E2C6" strokeWidth={stroke} fill="none" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke="#FFCA00"
                    strokeWidth={stroke}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 800ms ease" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="ff-font-bold text-5xl font-bold text-[#1A1A1A]">{percent}%</span>
                <span className="mt-1 text-xs font-semibold tracking-[0.2em] text-primary">
                    {percent < 40 ? "NEEDS PRACTICE" : percent < 75 ? "GOOD GOING" : "EXCELLENT"}
                </span>
            </div>
            <div
                className="absolute h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-white "
                style={{ top: -2, left: size / 2 - 8 }}
            />
        </div>
    );
}

function SessionSummary() {
    const [filter, setFilter] = useState<"all" | QStatus>("all");

    const counts = useMemo(() => {
        const correct = QUESTIONS.filter((q) => q.status === "correct").length;
        const incorrect = QUESTIONS.filter((q) => q.status === "incorrect").length;
        const skipped = QUESTIONS.filter((q) => q.status === "skipped").length;
        return { correct, incorrect, skipped, all: QUESTIONS.length };
    }, []);

    const accuracy = counts.all
        ? Math.round((counts.correct / Math.max(counts.correct + counts.incorrect, 1)) * 100) || 0
        : 0;

    const filtered = filter === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.status === filter);

    const tabs: { key: typeof filter; label: string; count: number }[] = [
        { key: "all", label: "All", count: counts.all },
        { key: "correct", label: "Correct", count: counts.correct },
        { key: "incorrect", label: "Incorrect", count: counts.incorrect },
        { key: "skipped", label: "Skipped", count: counts.skipped },
    ];

    return (
        <div className="ff-font min-h-screen bg-[#f8fafc] text-[#1A1A1A]">
            <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black shadow-sm">
                            <FiAward className="text-xl" />
                        </div>
                        <div>
                            <h1 className="ff-font-bold text-lg font-bold sm:text-xl">Session Summary</h1>
                            <p className="text-xs text-black/50">Review your last practice attempt</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition hover:border-primary hover:text-[#1A1A1A]"
                    >
                        <FiRefreshCw className="text-base" />
                        <span className="hidden sm:inline">Repeat Topics</span>
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 pb-32 pt-8 sm:px-6 lg:px-10">
                <section className="grid gap-6 lg:grid-cols-3">
                    {/* Score */}
                    <div className="exam-card-shadow rounded-3xl bg-white p-6 sm:p-8 lg:col-span-1">
                        <div className="flex flex-col items-center">
                            <Ring percent={accuracy} />
                            <div className="mt-6 flex items-center gap-6">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-emerald-600">{counts.correct}</span>
                                    <span className="text-black/60">correct</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    <span className="text-red-600">{counts.incorrect}</span>
                                    <span className="text-black/60">incorrect</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F1] px-3 py-1.5 text-xs font-semibold text-black/70 ring-1 ring-black/5">
                                    <FiClock /> 0s
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F1] px-3 py-1.5 text-xs font-semibold text-black/70 ring-1 ring-black/5">
                                    <FiClock /> 0s/q
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-bold text-black ring-1 ring-primary/40">
                                    <FiZap /> Fast Pace
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="grid gap-6 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <StatCard icon={<FiCheckCircle />} label="Correct" value={counts.correct} tone="green" />
                            <StatCard icon={<FiXCircle />} label="Incorrect" value={counts.incorrect} tone="red" />
                            <StatCard icon={<FiSkipForward />} label="Skipped" value={counts.skipped} tone="yellow" />
                        </div>

                        <div className="exam-card-shadow rounded-3xl border border-dashed border-black/15 bg-white p-6">
                            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-black/50">
                                <FiTrendingUp /> SESSION FLOW
                            </div>
                            <p className="text-sm text-black/60">
                                Not enough solved questions to show timing flow yet. Answer a few questions to unlock your
                                pace chart.
                            </p>
                            <div className="mt-4 flex h-24 items-end gap-1.5">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-t bg-primary"
                                        style={{ height: `${20 + ((i * 13) % 70)}%` }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="exam-card-shadow rounded-3xl bg-white p-6">
                            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-black/50">
                                <FiBarChart2 /> SUBJECT BREAKDOWN
                            </div>
                            <p className="text-sm text-black/50">No subject data available for this session.</p>
                        </div>
                    </div>
                </section>

                {/* Questions */}
                <section className="mt-10">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="ff-font-bold text-sm font-bold tracking-[0.2em] text-black/60">QUESTIONS</h2>
                        <span className="text-xs text-black/40">{filtered.length} shown</span>
                    </div>

                    <div className="scrollbar-hide -mx-1 mb-5 flex gap-2 overflow-x-auto px-1">
                        {tabs.map((t) => {
                            const active = filter === t.key;
                            return (
                                <button
                                    key={t.key}
                                    onClick={() => setFilter(t.key)}
                                    className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${active
                                        ? "bg-black text-white shadow"
                                        : "bg-white text-black/70 border border-gray-400"
                                        }`}
                                >
                                    {t.label}
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-primary text-black" : "bg-black/5 text-black/60"
                                            }`}
                                    >
                                        {t.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="custom-scrollbar grid max-h-[640px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((q) => (
                            <QuestionCard key={q.id} q={q} />
                        ))}
                    </div>
                </section>
            </main>

            {/* Sticky action bar */}
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">

                    <div className="flex w-full items-center justify-end">
                        <button className="min-w-[180px] rounded-2xl bg-black px-10 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#1A1A1A] active:scale-[0.98]">
                            Done
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    tone,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    tone: "green" | "red" | "yellow";
}) {
    const tones = {
        green: "text-emerald-600 bg-emerald-50",
        red: "text-red-600 bg-red-50",
        yellow: "text-[#7a5e00] bg-primary/20",
    } as const;
    return (
        <div className="exam-card-shadow rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${tones[tone]}`}>
                    {icon}
                </span>
                <span className="ff-font-bold text-2xl font-bold">{value}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-black/50">{label}</p>
        </div>
    );
}

function QuestionCard({ q }: { q: QItem }) {
    const badge =
        q.status === "correct"
            ? { cls: "bg-emerald-50  text-emerald-700 ring-emerald-200", icon: <FiCheckCircle />, label: "Correct" }
            : q.status === "incorrect"
                ? { cls: "bg-red-50 text-red-700 ring-red-200", icon: <FiXCircle />, label: "Incorrect" }
                : { cls: "bg-black/5 text-black/60 ring-black/10", icon: <FiSkipForward />, label: "Skipped" };

    return (
        <button
            type="button"
            className="exam-card-shadow group flex w-full flex-col rounded-2xl bg-white p-4 text-left transition hover:-translate-y-0.5 hover:ring-1 hover:ring-primary"
        >
            <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-black/50">
                    <span className="rounded-md bg-black/5 px-2 py-0.5">{q.exam}</span>
                    <span>›</span>
                    <span>{q.topic}</span>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ring-1 ${badge.cls}`}>
                    {badge.icon} {badge.label}
                </span>
            </div>
            <h3 className="ff-font-bold text-sm font-bold text-[#1A1A1A]">{q.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-black/60">
                <span className="font-bold text-black/70">Q{q.id}</span> {q.preview}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-black/40">
                <span className="inline-flex items-center gap-1">
                    <FiClock /> 0s
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                    Open <FiChevronRight />
                </span>
            </div>
        </button>
    );
}
export default SessionSummary;