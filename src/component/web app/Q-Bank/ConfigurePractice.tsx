'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import {

    FiChevronDown,
    FiPlus,
    FiX,
    FiClock,
    FiBookOpen,
    FiAward,
    FiPlay,
    FiShuffle,
    FiSliders,
    FiPlusCircle,
    FiCheckCircle,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

type Topic = { name: string; isNew?: boolean };
type Preset = "mini" | "half" | "full";
type StudyMode = "tutor" | "exam";
type Structure = "presets" | "custom";
type Selection = "ai" | "new" | "random";

const initialTopics: Topic[] = [
    { name: "Biochemistry", isNew: true },
    { name: "General pathology", isNew: true },
    { name: "Immunology", isNew: true },
    { name: "Microbiology", isNew: true },
    { name: "Pharmacology", isNew: true },
];

const presetData: Record<
    Preset,
    { label: string; questions: number; blocks: number; perBlock: number; minutes: number }
> = {
    mini: { label: "Mini", questions: 40, blocks: 2, perBlock: 20, minutes: 60 },
    half: { label: "Half", questions: 140, blocks: 7, perBlock: 20, minutes: 210 },
    full: { label: "Full", questions: 280, blocks: 14, perBlock: 20, minutes: 420 },
};

const ConfigurePractice = () => {
    const [topics, setTopics] = useState<Topic[]>(initialTopics);
    const [studyMode, setStudyMode] = useState<StudyMode>("exam");
    const [structure, setStructure] = useState<Structure>("presets");
    const [preset, setPreset] = useState<Preset>("full");
    const [selection, setSelection] = useState<Selection>("new");
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const [timer, setTimer] = useState<"untimed" | "timed">("timed");
    const [difficulty, setDifficulty] = useState<"foundation" | "standard" | "challenge">("standard");
    const route = useRouter();

    const removeTopic = (name: string) =>
        setTopics((t) => t.filter((x) => x.name !== name));

    const current = presetData[preset];
    const hours = Math.floor(current.minutes / 60);

    return (
        <div className="min-h-screen ff-font" style={{ backgroundColor: "#f7f7f7" }}>


            <main className="mx-auto max-w-[1380px] px-6 py-8 lg:px-10 lg:py-10">
                {/* Page heading */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs ff-font font-semibold uppercase  text-neutral-500">
                            Practice
                        </p>
                        <h1 className="ff-font-bold mt-1 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl">
                            Configure Practice
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500 ff-font">
                            Customize your study session — pick topics, structure and mode.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-neutral-700 exam-card-shadow">
                            <FiClock /> ~{current.minutes} min
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-neutral-700 exam-card-shadow">
                            <FiCheckCircle /> {current.questions} questions
                        </span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* LEFT (main config) */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Topics */}
                        <Card>
                            <div className="flex items-center justify-between">

                                <span className="text-xs text-neutral-500">
                                    {topics.length} selected
                                </span>
                            </div>

                            <p className="mt-4 text-xs font-medium uppercase ff-font text-neutral-500">
                                Other topics
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {topics.map((t) => (
                                    <span
                                        key={t.name}
                                        className="group inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-800 ff-font hover:bg-neutral-200"
                                    >
                                        {t.name}
                                        {t.isNew && (
                                            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-neutral-600 shadow-sm">
                                                New
                                            </span>
                                        )}
                                        <button
                                            onClick={() => removeTopic(t.name)}
                                            className="text-neutral-500 hover:text-neutral-900"
                                            aria-label={`Remove ${t.name}`}
                                        >
                                            <FiX />
                                        </button>
                                    </span>
                                ))}
                                <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-300 px-4 py-1.5 text-sm text-neutral-700 hover:border-neutral-400">
                                    <FiPlus /> Add Topic
                                </button>
                            </div>

                            <div
                                className="mt-5 flex ff-font items-center gap-3 rounded-xl px-4 py-3 text-sm"
                                style={{ backgroundColor: "#FFF6E0", color: "#7A5A12" }}
                            >
                                <FiBookOpen className="text-base" style={{ color: "#FFCA00" }} />
                                <span className="font-semibold text-neutral-900">16,160</span>
                                <span className="text-neutral-600">questions available across topics</span>
                            </div>
                        </Card>

                        {/* Study Mode */}
                        <Card className="rounded-[22px] border border-[#ECECEC] bg-[#FAFAFA] p-3 sm:p-4">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-[#A1A1AA] ff-font font-semibold">
                                STUDY MODE
                            </p>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <ModeBlock
                                    active={studyMode === "tutor"}
                                    onClick={() => setStudyMode("tutor")}
                                    icon={<FiBookOpen size={15} />}
                                    title="Tutor"
                                />

                                <ModeBlock
                                    active={studyMode === "exam"}
                                    onClick={() => setStudyMode("exam")}
                                    icon={<FiAward size={15} />}
                                    title="Exam"
                                />
                            </div>

                            <div className="mt-3 rounded-[12px] bg-[#F3F4F6] px-3 py-2">
                                <p className="text-[12px] text-[#9CA3AF] ff-font text-center">
                                    No feedback until session ends — simulates real exams
                                </p>
                            </div>
                        </Card>

                        {/* Exam Structure */}
                        <Card>
                            <div className="flex items-center justify-between">
                                <SectionTitle  title="Exam structure" />
                                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                                    <FiClock />
                                    ~{current.minutes} min total
                                </span>
                            </div>

                            <div className="mt-4 inline-flex rounded-xl bg-neutral-100 p-1">
                                {(["presets", "custom"] as Structure[]).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStructure(s)}
                                        className={`rounded-lg cursor-pointer px-5 py-2 text-sm font-medium capitalize ff-font ${structure === s
                                            ? "bg-white text-neutral-900 shadow-sm"
                                            : "text-neutral-500"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-5 text-xs font-medium uppercase ff-font text-neutral-500">
                                Quick presets
                            </p>
                            <p className="text-xs ff-font text-neutral-500">Pick a common exam length</p>

                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {(Object.keys(presetData) as Preset[]).map((key) => {
                                    const p = presetData[key];
                                    const active = preset === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setPreset(key)}
                                            className={`cursor-pointer rounded-xl border p-4 text-left transition ${active
                                                ? "border-primary-y bg-[#FFF6E0]"
                                                : "border-neutral-200 bg-white hover:border-neutral-300"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold ff-font text-neutral-900">
                                                    {p.label}
                                                </span>
                                                {active && (
                                                    <FiCheckCircle style={{ color: "#FFCA00" }} />
                                                )}
                                            </div>
                                            <div className="mt-1 text-sm ff-font text-neutral-500">
                                                {p.questions} questions
                                            </div>

                                        </button>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Question selection */}
                        <Card>
                            <SectionTitle  title="Question selection" />
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <SelectionCard
                                    disabled
                                    active={false}
                                    onClick={() => { }}
                                    icon={<HiOutlineSparkles />}
                                    title="AI Curated"
                                    subtitle="Coming soon"
                                />
                                <SelectionCard
                                    active={selection === "new"}
                                    onClick={() => setSelection("new")}
                                    icon={<FiPlusCircle />}
                                    title="New Only"
                                    subtitle="Unseen questions"
                                />
                                <SelectionCard
                                    active={selection === "random"}
                                    onClick={() => setSelection("random")}
                                    icon={<FiShuffle />}
                                    title="Random"
                                    subtitle="Exam simulation"
                                />
                            </div>
                            <p className="mt-4 rounded-lg bg-neutral-100 ff-font px-3 py-2 text-xs text-neutral-600">
                                Our AI analyzes your performance and selects questions from areas
                                where you need the most practice.
                            </p>
                        </Card>

                        {/* Advanced */}
                        <Card>
                            <button
                                onClick={() => setAdvancedOpen((s) => !s)}
                                className="flex w-full items-center justify-between text-left"
                            >
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 ff-font">
                                    <FiSliders /> Advanced Options
                                </span>
                                <FiChevronDown
                                    className={`transition ${advancedOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {advancedOpen && (
                                <div className="mt-5 space-y-5">
                                    {/* Timer */}
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase ff-font text-neutral-400">
                                            Timer
                                        </p>
                                        <div className="mt-2 grid grid-cols-2 gap-3">
                                            <OptionPill
                                                active={timer === "untimed"}
                                                onClick={() => setTimer("untimed")}
                                                title="Untimed"
                                                subtitle="Learn at your pace"
                                            />
                                            <OptionPill
                                                active={timer === "timed"}
                                                onClick={() => setTimer("timed")}
                                                title="Timed"
                                                subtitle="Exam simulation"
                                                icon={<FiClock />}
                                                dark
                                            />
                                        </div>
                                    </div>
                                    {/* Difficulty */}
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase ff-font text-neutral-400">
                                            Difficulty
                                        </p>
                                        <div className="mt-2 grid grid-cols-3 gap-3">
                                            <OptionPill
                                                active={difficulty === "foundation"}
                                                onClick={() => setDifficulty("foundation")}
                                                title="Foundation"
                                                subtitle="Build base"
                                            />
                                            <OptionPill
                                                active={difficulty === "standard"}
                                                onClick={() => setDifficulty("standard")}
                                                title="Standard"
                                                subtitle="Balanced"
                                                yellow
                                            />
                                            <OptionPill
                                                active={difficulty === "challenge"}
                                                onClick={() => setDifficulty("challenge")}
                                                title="Challenge"
                                                subtitle="Push limits"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Start Practice big CTA */}
                        <div className="rounded-2xl">
                            {/* <button className="bg-black flex w-full items-center justify-center gap-3 rounded-2xl py-5 ff-font-bold font-semibold text-white cursor-pointer ">
                                <FiPlay /> Start Practice
                            </button> */}
                            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-500 ff-font-bold">
                                <span>{current.questions} questions</span>
                                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                                <span>{current.blocks} blocks x {current.perBlock}/block</span>
                                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                                <span>~{current.minutes} min</span>
                                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                                <span>{studyMode === "exam" ? "Exam" : "Tutor"}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT (summary sidebar) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-5">
                            <Card>
                                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ff-font-bold">
                                    Session summary
                                </p>
                                <p className="ff-font-bold mt-2 text-3xl font-bold text-neutral-900">
                                    {current.questions}
                                    <span className="ml-1 text-base font-medium text-neutral-500">
                                        questions
                                    </span>
                                </p>
                                <p className="mt-1 text-xs text-neutral-500 ff-font-bold">
                                    {current.blocks} blocks × {current.perBlock} each · {hours}h total
                                </p>

                                <div className="my-5 h-px bg-neutral-200" />

                                <SummaryRow label="Mode" value={studyMode === "exam" ? "Exam" : "Tutor"} />
                                <SummaryRow label="Structure" value={structure === "presets" ? presetData[preset].label : "Custom"} />
                                <SummaryRow label="Selection" value={selection === "ai" ? "AI Curated" : selection === "new" ? "New Only" : "Random"} />
                                <SummaryRow label="Topics" value={`${topics.length} selected`} />
                                <SummaryRow label="Duration" value={`~${current.minutes} min`} last />

                                <button
                                    onClick={() => route.push("/question-bank/practice-setup")}
                                    className="bg-black cursor-pointer ff-font mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white ">
                                    <FiPlay /> Start Practice
                                </button>
                                <p className="mt-2 text-center text-[11px] text-neutral-500 ff-font-bold">
                                    You can pause anytime during the session.
                                </p>
                            </Card>

                           
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

const Card = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <section
        className={`exam-card-shadow rounded-2xl bg-white p-5 sm:p-6 ${className}`}
    >
        {children}
    </section>
);

const SectionTitle = ({
    eyebrow,
    title,
}: {
    eyebrow: string;
    title: string;
}) => (
    <div>
        <p className="text-[11px] font-semibold uppercase ff-font text-neutral-400">
            {eyebrow}
        </p>
        <h2 className="ff-font-bold mt-0.5 text-lg font-bold text-neutral-900">
            {title}
        </h2>
    </div>
);

const ModeBlock = ({
    active,
    onClick,
    icon,
    title,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
}) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 rounded-[14px] border h-[54px] sm:h-[58px] transition-all duration-200 cursor-pointer
        ${active
                ? "border-[#1F2937] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                : "border-transparent bg-[#F3F4F6] hover:bg-[#ECEFF3]"
            }`}
    >
        <div
            className={`${active ? "text-[#111827]" : "text-[#6B7280]"
                } text-[16px]`}
        >
            {icon}
        </div>

        <span
            className={`text-[14px] ff-font font-medium
            ${active ? "text-[#111827]" : "text-[#6B7280]"}`}
        >
            {title}
        </span>
    </button>
);

const SelectionCard = ({
    active,
    disabled,
    onClick,
    icon,
    title,
    subtitle,
}: {
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${disabled
            ? "cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-400 "
            : active
                ? "border-neutral-900 bg-white shadow-sm cursor-pointer"
                : "border-neutral-200 bg-white hover:border-neutral-300 cursor-pointer"
            }`}
    >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[11px] text-neutral-500">{subtitle}</span>
    </button>
);

const SummaryRow = ({
    label,
    value,
    last,
}: {
    label: string;
    value: string;
    last?: boolean;
}) => (
    <div
        className={`flex items-center justify-between py-2 text-sm ff-font-bold ${last ? "" : "border-b border-neutral-100"
            }`}
    >
        <span className="text-neutral-500">{label}</span>
        <span className="font-medium text-neutral-900">{value}</span>
    </div>
);

const ToggleRow = ({ label }: { label: string }) => {
    const [on, setOn] = useState(false);
    return (
        <button
            onClick={() => setOn((v) => !v)}
            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-left"
        >
            <span className="text-sm text-neutral-800">{label}</span>
            <span
                className={`relative h-5 w-9 rounded-full transition ${on ? "bg-primary-y" : "bg-neutral-300"
                    }`}
            >
                <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${on ? "left-[18px]" : "left-0.5"
                        }`}
                />
            </span>
        </button>
    );
};

const OptionPill = ({
    active,
    onClick,
    title,
    subtitle,
    icon,
    dark,
    yellow,
}: {
    active: boolean;
    onClick: () => void;
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
    dark?: boolean;
    yellow?: boolean;
}) => {
    const activeDark = active && dark;
    const activeYellow = active && yellow;
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={onClick}
                className={`flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ff-font-bold ${activeDark
                    ? "bg-black text-white"
                    : activeYellow
                        ? "bg-primary text-neutral-900"
                        : active
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    }`}
            >
                {icon}
                {title}
            </button>
            <span className="mt-1.5 text-[12px] text-neutral-500 ff-font">{subtitle}</span>
        </div>
    );
};

export default ConfigurePractice;