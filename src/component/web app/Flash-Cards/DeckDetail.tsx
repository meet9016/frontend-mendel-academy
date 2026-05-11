'use client';
import { useState } from "react";
import {
    HiOutlineArrowLeft,
    HiOutlineDotsVertical,
    HiOutlineLockClosed,
    HiOutlinePlay,
    HiOutlineChevronDown,
} from "react-icons/hi";



type SubItem = {
    title: string;
    active: number;
    locked: number;
    unsuspend: number;
};

type Topic = {
    name: string;
    active: number;
    locked: number;
    percent: number;
    mature: number;
    learning: number;
    fresh: number;
    items: SubItem[];
};

const TOPICS: Topic[] = [
    {
        name: "Physiology",
        active: 11,
        locked: 130,
        percent: 62,
        mature: 6,
        learning: 2,
        fresh: 3,
        items: [
            { title: "Glomerular Filtration", active: 4, locked: 38, unsuspend: 12 },
            { title: "Tubular Reabsorption", active: 5, locked: 47, unsuspend: 15 },
            { title: "Acid-Base Regulation", active: 2, locked: 45, unsuspend: 15 },
        ],
    },
    {
        name: "Pathology",
        active: 9,
        locked: 165,
        percent: 64,
        mature: 5,
        learning: 2,
        fresh: 2,
        items: [
            { title: "Glomerulonephritis", active: 3, locked: 55, unsuspend: 14 },
            { title: "Acute Kidney Injury", active: 4, locked: 60, unsuspend: 18 },
            { title: "Chronic Kidney Disease", active: 2, locked: 50, unsuspend: 12 },
        ],
    },
    {
        name: "Pharmacology",
        active: 6,
        locked: 125,
        percent: 65,
        mature: 4,
        learning: 1,
        fresh: 1,
        items: [
            { title: "Diuretics", active: 2, locked: 40, unsuspend: 10 },
            { title: "ACE Inhibitors & ARBs", active: 2, locked: 45, unsuspend: 11 },
            { title: "Antibiotics in Renal Failure", active: 2, locked: 40, unsuspend: 9 },
        ],
    },
];

function DeckDetail() {
    const [open, setOpen] = useState<string | null>("Physiology");

    return (
        <main className="min-h-screen bg-background py-6 px-4 sm:py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">
                {/* Header card */}
                <section className="rounded-2xl border border-gray-300 bg-card shadow-sm p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                        <button
                            aria-label="Back"
                            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground hover:bg-accent transition"
                        >
                            <HiOutlineArrowLeft className="text-xl" />
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Renal</h1>
                        <button
                            aria-label="Options"
                            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground hover:bg-accent transition"
                        >
                            <HiOutlineDotsVertical className="text-xl" />
                        </button>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {/* Mastery */}
                        <div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-semibold text-emerald-600">61% Mastered</span>
                            </div>
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                                <div
                                    className="h-full rounded-full bg-emerald-300"
                                    style={{ width: "61%" }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">284 of 466</p>
                        </div>

                        {/* Active distribution */}
                        <div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                                <LegendDot color="bg-emerald-600" label="12 Mature" />
                                <LegendDot color="bg-amber-400" label="4 Learning" />
                                <LegendDot color="bg-indigo-400" label="10 New" />
                            </div>
                            <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full">
                                <div className="bg-emerald-600" style={{ width: "46%" }} />
                                <div className="bg-amber-400" style={{ width: "16%" }} />
                                <div className="bg-indigo-400" style={{ width: "38%" }} />
                            </div>
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <span>26 Active</span>
                                <span className="inline-flex items-center gap-1">
                                    <HiOutlineLockClosed /> 420
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f1b3d] px-5 py-3.5 text-sm sm:text-base font-semibold text-white shadow hover:bg-[#152555] transition">
                        <HiOutlinePlay className="text-lg" />
                        Start Custom Session
                    </button>
                </section>

                {/* Sub-topics */}
                <section className="mt-6">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                            SUB-TOPICS
                        </h2>
                        <span className="text-xs text-muted-foreground">Bar = % Mastered</span>
                    </div>

                    <div className="mt-3 space-y-3">
                        {TOPICS.map((t) => {
                            const isOpen = open === t.name;
                            return (
                                <div
                                    key={t.name}
                                    className="overflow-hidden rounded-2xl border border-gray-300 bg-card shadow-sm"
                                >
                                    <button
                                        onClick={() => setOpen(isOpen ? null : t.name)}
                                        className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-accent/40 transition"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-foreground">{t.name}</p>
                                            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{t.active} active</span>
                                                <span>·</span>
                                                <span className="inline-flex items-center gap-1">
                                                    <HiOutlineLockClosed /> {t.locked}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <span className="font-semibold text-emerald-600">
                                                {t.percent}%
                                            </span>
                                            <div className="hidden sm:block h-2 w-32 overflow-hidden rounded-full bg-emerald-100">
                                                <div
                                                    className="h-full rounded-full bg-emerald-500"
                                                    style={{ width: `${t.percent}%` }}
                                                />
                                            </div>
                                            <div className="block sm:hidden h-2 w-20 overflow-hidden rounded-full bg-emerald-100">
                                                <div
                                                    className="h-full rounded-full bg-emerald-500"
                                                    style={{ width: `${t.percent}%` }}
                                                />
                                            </div>
                                            <HiOutlineChevronDown
                                                className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-border px-5 py-4">
                                            <div className="flex h-2 w-full overflow-hidden rounded-full">
                                                <div
                                                    className="bg-emerald-600"
                                                    style={{ width: `${(t.mature / (t.mature + t.learning + t.fresh)) * 100}%` }}
                                                />
                                                <div
                                                    className="bg-amber-400"
                                                    style={{ width: `${(t.learning / (t.mature + t.learning + t.fresh)) * 100}%` }}
                                                />
                                                <div
                                                    className="bg-indigo-400"
                                                    style={{ width: `${(t.fresh / (t.mature + t.learning + t.fresh)) * 100}%` }}
                                                />
                                            </div>
                                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                <LegendDot color="bg-emerald-600" label={`${t.mature} Mature`} />
                                                <LegendDot color="bg-amber-400" label={`${t.learning} Learning`} />
                                                <LegendDot color="bg-indigo-400" label={`${t.fresh} New`} />
                                            </div>

                                            <ul className="mt-4 divide-y divide-border">
                                                {t.items.map((it) => (
                                                    <li
                                                        key={it.title}
                                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-foreground">{it.title}</p>
                                                            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                                <span>{it.active} Active</span>
                                                                <span>·</span>
                                                                <span className="inline-flex items-center gap-1">
                                                                    <HiOutlineLockClosed /> {it.locked} Locked
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-300 bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition">
                                                            <HiOutlineLockClosed />
                                                            Unsuspend {it.unsuspend}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}

function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
            <span className="text-foreground/80">{label}</span>
        </span>
    );
}

export default DeckDetail;