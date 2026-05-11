'use client';

import { useMemo, useState } from 'react';
import {
    FiSearch,
    FiClock,
    FiPlay,
    FiPlus,
    FiUser,
    FiMoreHorizontal,
    FiCheckCircle,
    FiLock
} from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { HiOutlineTrendingUp } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

type Deck = {
    name: string;
    due: number;
    total: number;
    progress: number;
    ringColor: string;
    dots: [number, number, number];
};

const initialDecks: Deck[] = [
    { name: 'Renal Physiology', due: 26, total: 420, progress: 72, ringColor: '#f59e0b', dots: [12, 4, 10] },
    { name: 'Cardiology Path', due: 32, total: 310, progress: 88, ringColor: '#10b981', dots: [18, 6, 8] },
    { name: 'Clinical Neurology', due: 25, total: 580, progress: 61, ringColor: '#f59e0b', dots: [8, 5, 12] },
    { name: 'Gastroenterology', due: 17, total: 640, progress: 34, ringColor: '#ef4444', dots: [4, 3, 10] },
    { name: 'Respiratory System', due: 14, total: 290, progress: 54, ringColor: '#facc15', dots: [6, 4, 4] },
    { name: 'Endocrine System', due: 9, total: 220, progress: 47, ringColor: '#facc15', dots: [3, 2, 4] },
];

const Ring = ({ value, color }: { value: number; color: string }) => {
    const r = 24;
    const c = 2 * Math.PI * r;
    const offset = c - (value / 100) * c;
    return (
        <div className="relative h-14 w-14 shrink-0">
            <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90">
                <circle cx="30" cy="30" r={r} fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle
                    cx="30" cy="30" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-in-out"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-700">
                {value}%
            </span>
        </div>
    );
};

const SegmentBar = () => (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[40%] bg-emerald-500" />
        <div className="h-full w-[25%] bg-amber-400" />
        <div className="h-full w-[35%] bg-blue-500" />
    </div>
);

const DeckCard = ({ deck, onClick }: { deck: Deck; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex flex-col cursor-pointer gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-amber-300 hover:shadow-md active:scale-[0.98]"
    >
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-[15px] font-bold text-slate-800">{deck.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{deck.due}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">due today</span>
                </div>
            </div>
            <Ring value={deck.progress} color={deck.ringColor} />
        </div>
        <SegmentBar />
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{deck.dots[0]}</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />{deck.dots[1]}</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />{deck.dots[2]}</span>
            </div>
            <span className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-tighter">
                <FiLock className="size-2.5" /> {deck.total}
            </span>
        </div>
    </button>
);

const FlashcardOverview = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const filtered = useMemo(
        () => initialDecks.filter((d) => d.name.toLowerCase().includes(query.toLowerCase())),
        [query],
    );

    const totalDue = initialDecks.reduce((a, d) => a + d.due, 0);



    return (
        <div className="min-h-screen bg-[#fafaf9] text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 md:px-10">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-black text-white">M</div>
                        <span className="text-md font-bold  tracking-tight text-slate-800">FlashCard</span>
                    </div>

                    <div className="relative order-3 w-full md:order-none md:ml-6 md:w-[420px]">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search decks or cards..."
                            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                        />
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <span className="hidden items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold text-orange-700 sm:flex">
                            <FaFire className="text-orange-500" /> 12 DAY STREAK
                        </span>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
                            <FiUser size={18} />
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                            <FiMoreHorizontal size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
                {/* Stats row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                            <FaFire size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Streak</p>
                            <p className="text-lg font-black text-slate-800">12 Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <HiOutlineTrendingUp size={22} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Retention</p>
                            <p className="text-lg font-black text-slate-800">88.4%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                            <FiCheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Mastered</p>
                            <p className="text-lg font-black text-slate-800">14.2k <span className="text-xs font-medium text-slate-400">cards</span></p>
                        </div>
                    </div>
                </div>

                {/* Hero section */}
                <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#ffca001f]" />
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Today's Review</p>
                        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                                    {totalDue} <span className="text-slate-300 font-medium">due today</span>
                                </h2>
                                <p className="mt-3 flex items-center gap-2 text-md font-semibold text-slate-500">
                                    <FiClock className="text-amber-500" /> Approx. 28 min to complete
                                </p>
                            </div>
                            <button

                                className="flex items-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95 shadow-lg shadow-slate-200"
                            >
                                <FiPlay className="fill-current" /> START SESSION
                            </button>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-slate-100 pt-8 sm:grid-cols-3">
                            {[
                                { label: 'Mature cards', value: 42, color: 'bg-emerald-500', text: 'text-emerald-600' },
                                { label: 'Learning', value: 18, color: 'bg-amber-400', text: 'text-amber-500' },
                                { label: 'New cards', value: 40, color: 'bg-blue-500', text: 'text-blue-600' },
                            ].map((c) => (
                                <div key={c.label}>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs font-bold uppercase tracking-tighter text-slate-400">{c.label}</p>
                                        <p className={`text-xl font-black ${c.text}`}>{c.value}%</p>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Active Decks */}
                <section className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="flex items-center gap-2 text-[30px] font-black ">
                                Active Decks
                            </h2>
                            <p className="text-sm font-medium text-slate-400">{filtered.length} clinical modules loaded</p>
                        </div>
                        <button

                            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-black"
                        >
                            <FiPlus size={16} /> NEW DECK
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((d) => (
                            <DeckCard
                                key={d.name}
                                deck={d}
                                onClick={() => router.push("/flash-card/Deckdetail")}
                            />
                        ))}
                    </div>
                </section>


            </main>


        </div>
    );
};

export default FlashcardOverview;