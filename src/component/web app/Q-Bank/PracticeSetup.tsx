'use client';

import { useEffect, useMemo, useState } from "react";
import {
    BiBookmark,
    BiCheck,
    BiMenu,
    BiSearch,
    BiX,
    BiXCircle,
} from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaLayerGroup } from "react-icons/fa";
import {
    TbBan,
    TbCalculator,
    TbCircleCheck,
    TbFlask,
    TbNotebook,
    TbPlayerPause,
} from "react-icons/tb";
import { FiFileText } from "react-icons/fi";
import Calculator from "@/component/exam/Calculator";
import { NoteModal } from "@/component/exam/NoteModal";
import { ThemeSidePanel } from "@/component/exam/SidePanel";
import { LAB_VALUES } from "@/utils/constant";
import { useRouter } from "next/navigation";

type Question = {
    id: number;
    topic: string;
    subject: string;
    system: string;
    difficulty: "Easy" | "Medium" | "Hard";
    text: string;
    image?: string;
    options: { key: string; label: string }[];
    correct: string;
    explanation: string;
    explanationImage?: string;
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        topic: "Pulmonology",
        subject: "Pathology",
        system: "Cardiovascular",
        difficulty: "Medium",
        text: "A 52-year-old man presents with fatigue, morning headaches, loud snoring, and unrefreshing sleep. BP 150/95 mmHg, BMI 32. Polysomnography confirms obstructive sleep apnea. What is the most likely cardiovascular complication of untreated OSA?",
        options: [
            { key: "A", label: "Hypovolemic shock" },
            { key: "B", label: "Pulmonary embolism" },
            { key: "C", label: "Mitral valve prolapse" },
            { key: "D", label: "Atrial fibrillation" },
            { key: "E", label: "Pulmonary hypertension" },
        ],
        correct: "E",
        explanation:
            "Untreated obstructive sleep apnea (OSA) causes recurrent nocturnal hypoxia, which triggers pulmonary vasoconstriction (hypoxic pulmonary vasoconstriction). Over time, this sustained vasoconstriction leads to vascular remodeling and pulmonary hypertension, eventually causing right-sided heart strain (cor pulmonale).\n\nWhile OSA is also associated with systemic hypertension, atrial fibrillation, and stroke, pulmonary hypertension is the classic cardiopulmonary complication directly resulting from chronic hypoxemia.\n\nEducational objective: Chronic nocturnal hypoxemia in OSA causes hypoxic pulmonary vasoconstriction, leading to pulmonary hypertension and eventually cor pulmonale.",
        explanationImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=60",
    },
    {
        id: 2,
        topic: "Dermatology",
        subject: "Pathology",
        system: "Skin & Subcutaneous Tissue",
        difficulty: "Hard",
        text: "A 34-year-old woman presents with a 3-week history of a slowly enlarging, scaly, erythematous plaque on her forearm with central clearing and a raised border, shown below. KOH preparation of skin scrapings reveals branching septate hyphae. Which of the following is the most appropriate first-line therapy?",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=70",
        options: [
            { key: "A", label: "Oral acyclovir" },
            { key: "B", label: "Topical terbinafine" },
            { key: "C", label: "Oral prednisone" },
            { key: "D", label: "Topical hydrocortisone" },
            { key: "E", label: "Oral doxycycline" },
        ],
        correct: "B",
        explanation:
            "The lesion described — an annular, scaly, erythematous plaque with central clearing — combined with KOH-positive septate hyphae is classic for tinea corporis (dermatophyte infection of the body). Limited, localized disease is treated with topical antifungals such as terbinafine, clotrimazole, or miconazole for 2–4 weeks.\n\nOral antifungals (terbinafine, griseofulvin, itraconazole) are reserved for extensive disease, tinea capitis, or onychomycosis. Topical corticosteroids alone can worsen dermatophyte infections (tinea incognito).\n\nEducational objective: Localized tinea corporis is treated with topical antifungals such as terbinafine; systemic therapy is reserved for extensive or refractory disease.",
        explanationImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=70",
    },
    {
        id: 3,
        topic: "Endocrinology",
        subject: "Pharmacology",
        system: "Endocrine",
        difficulty: "Medium",
        text: "A 58-year-old man with type 2 diabetes is started on a new oral medication. Three months later he reports a 4 kg weight loss and improved glycemic control. Labs show no hypoglycemic episodes. Which mechanism best explains his medication's action?",
        options: [
            { key: "A", label: "Stimulates pancreatic insulin release" },
            { key: "B", label: "Inhibits SGLT2 in the proximal tubule" },
            { key: "C", label: "Activates PPAR-γ receptors" },
            { key: "D", label: "Inhibits α-glucosidase" },
            { key: "E", label: "Increases hepatic gluconeogenesis" },
        ],
        correct: "B",
        explanation:
            "SGLT2 inhibitors (e.g., empagliflozin, dapagliflozin) block glucose reabsorption in the proximal convoluted tubule, causing glucosuria. This results in modest weight loss, BP reduction, and a low risk of hypoglycemia (since they don't increase insulin secretion). They also have proven cardiovascular and renal protective benefits.\n\nSulfonylureas stimulate insulin release and cause weight gain and hypoglycemia. Thiazolidinediones (PPAR-γ) cause weight gain and fluid retention.\n\nEducational objective: SGLT2 inhibitors lower glucose by promoting urinary glucose excretion; benefits include weight loss, BP reduction, and cardiorenal protection without hypoglycemia.",
    },
    {
        id: 4,
        topic: "Cardiology",
        subject: "Physiology",
        system: "Cardiovascular",
        difficulty: "Easy",
        text: "A 65-year-old woman presents with sudden-onset palpitations and shortness of breath. ECG shows an irregularly irregular rhythm with absent P waves. What is the most likely diagnosis?",
        options: [
            { key: "A", label: "Atrial fibrillation" },
            { key: "B", label: "Ventricular tachycardia" },
            { key: "C", label: "First-degree AV block" },
            { key: "D", label: "Atrial flutter" },
            { key: "E", label: "Sinus tachycardia" },
        ],
        correct: "A",
        explanation:
            "Atrial fibrillation is characterized by an irregularly irregular ventricular rhythm with absent discrete P waves and a chaotic baseline. It results from disorganized atrial electrical activity (often originating from the pulmonary vein ostia).\n\nManagement focuses on rate or rhythm control and stroke prevention via anticoagulation (CHA₂DS₂-VASc score guides therapy).\n\nEducational objective: AF = irregularly irregular rhythm + no P waves; manage with rate/rhythm control and anticoagulation per CHA₂DS₂-VASc.",
    },
    {
        id: 5,
        topic: "Nephrology",
        subject: "Pathology",
        system: "Renal/Urinary",
        difficulty: "Hard",
        text: "A 7-year-old boy develops periorbital edema and frothy urine 2 weeks after recovering from a sore throat. Urinalysis shows 4+ protein, oval fat bodies, and minimal hematuria. Serum albumin 2.1 g/dL. Which finding is most likely on light microscopy of a renal biopsy?",
        options: [
            { key: "A", label: "Crescent formation in Bowman space" },
            { key: "B", label: "Mesangial IgA deposits" },
            { key: "C", label: "Normal-appearing glomeruli" },
            { key: "D", label: "Subepithelial humps" },
            { key: "E", label: "Wire-loop lesions" },
        ],
        correct: "C",
        explanation:
            "This child has nephrotic syndrome (heavy proteinuria, hypoalbuminemia, edema, lipiduria). The most common cause in children is minimal change disease, which shows normal glomeruli on light microscopy and effacement of podocyte foot processes on electron microscopy. It is highly steroid-responsive.\n\nSubepithelial humps suggest post-streptococcal GN (nephritic). Mesangial IgA suggests IgA nephropathy. Crescents indicate RPGN.\n\nEducational objective: Minimal change disease — the leading cause of nephrotic syndrome in children — has normal LM, negative IF, and foot-process effacement on EM; treat with corticosteroids.",
    },
    {
        id: 6,
        topic: "Gastroenterology",
        subject: "Pathology",
        system: "GI & Nutrition",
        difficulty: "Medium",
        text: "A 45-year-old man has chronic epigastric pain relieved by meals and worsened at night. Endoscopy shows a duodenal ulcer; biopsy reveals curved gram-negative rods. Which best explains the organism's survival in the stomach?",
        options: [
            { key: "A", label: "Spore formation" },
            { key: "B", label: "Urease-mediated ammonia production" },
            { key: "C", label: "Acid-resistant capsule" },
            { key: "D", label: "Biofilm on parietal cells" },
            { key: "E", label: "IgA protease secretion" },
        ],
        correct: "B",
        explanation:
            "Helicobacter pylori produces urease, which hydrolyzes urea to ammonia and CO₂. The ammonia neutralizes gastric acid in the bacterium's immediate microenvironment, allowing it to survive and colonize the gastric mucosa. This is the basis for the urea breath test and rapid urease test.\n\nTreatment: triple therapy (PPI + clarithromycin + amoxicillin) or quadruple therapy if resistance is suspected.\n\nEducational objective: H. pylori survives gastric acid via urease-mediated ammonia production, neutralizing local pH.",
    },
    {
        id: 7,
        topic: "Hematology",
        subject: "Pathology",
        system: "Blood & Lymph",
        difficulty: "Easy",
        text: "A 25-year-old vegan presents with fatigue and pallor. CBC: Hb 9.2 g/dL, MCV 68 fL. Peripheral smear shows hypochromic, microcytic RBCs. Which lab finding is most consistent with the diagnosis?",
        options: [
            { key: "A", label: "Low ferritin, high TIBC" },
            { key: "B", label: "High ferritin, low TIBC" },
            { key: "C", label: "Low B12, high MMA" },
            { key: "D", label: "Elevated HbA2" },
            { key: "E", label: "Schistocytes on smear" },
        ],
        correct: "A",
        explanation:
            "Iron deficiency anemia presents as microcytic, hypochromic anemia. The classic iron studies show low ferritin (depleted stores), low serum iron, high TIBC (transferrin upregulated), and low transferrin saturation.\n\nAnemia of chronic disease shows high ferritin and low TIBC. β-thalassemia minor shows elevated HbA2. B12 deficiency causes macrocytic anemia.\n\nEducational objective: Iron deficiency anemia = ↓ ferritin, ↓ iron, ↑ TIBC, ↓ % saturation, microcytic hypochromic RBCs.",
    },
    {
        id: 8,
        topic: "Infectious Disease",
        subject: "Microbiology",
        system: "Infectious Disease",
        difficulty: "Medium",
        text: "A 22-year-old college student presents with fever, severe headache, photophobia, and neck stiffness. CSF: 1200 WBC/µL (90% neutrophils), glucose 25 mg/dL, protein 180 mg/dL. What is the most appropriate empiric therapy?",
        options: [
            { key: "A", label: "Acyclovir alone" },
            { key: "B", label: "Ampicillin + gentamicin" },
            { key: "C", label: "Vancomycin + ceftriaxone" },
            { key: "D", label: "Doxycycline" },
            { key: "E", label: "Fluconazole" },
        ],
        correct: "C",
        explanation:
            "CSF profile (neutrophilic pleocytosis, low glucose, high protein) indicates bacterial meningitis. In immunocompetent young adults, the most likely pathogens are Streptococcus pneumoniae and Neisseria meningitidis. Empiric therapy is vancomycin + ceftriaxone (add ampicillin if Listeria risk: age >50, pregnancy, immunocompromise). Dexamethasone reduces neurologic sequelae from S. pneumoniae.\n\nEducational objective: Empiric therapy for community-acquired bacterial meningitis in adults <50 = vancomycin + 3rd-gen cephalosporin; add ampicillin for Listeria coverage in at-risk groups.",
    },
    {
        id: 9,
        topic: "Neurology",
        subject: "Pathology",
        system: "Nervous System",
        difficulty: "Hard",
        text: "A 68-year-old woman is brought in for progressive memory loss over 2 years. She gets lost in familiar places and can't recall recent conversations. MRI shows diffuse cortical atrophy with hippocampal involvement. What is the underlying pathology?",
        options: [
            { key: "A", label: "Lewy body inclusions" },
            { key: "B", label: "Pick bodies in frontal lobe" },
            { key: "C", label: "β-amyloid plaques and neurofibrillary tangles" },
            { key: "D", label: "Spongiform changes with prions" },
            { key: "E", label: "Multiple lacunar infarcts" },
        ],
        correct: "C",
        explanation:
            "Alzheimer disease is characterized by extracellular β-amyloid (Aβ) plaques and intracellular neurofibrillary tangles of hyperphosphorylated tau. Hippocampal atrophy correlates with early memory loss.\n\nPick disease (FTD): Pick bodies, frontotemporal atrophy, behavioral changes. Lewy body dementia: visual hallucinations, parkinsonism, fluctuating cognition. CJD: rapid progression, myoclonus, periodic sharp waves on EEG.\n\nEducational objective: Alzheimer disease pathology = Aβ plaques + tau neurofibrillary tangles, with early hippocampal atrophy.",
    },
    {
        id: 10,
        topic: "Pediatrics",
        subject: "Pathology",
        system: "Cardiovascular",
        difficulty: "Medium",
        text: "A 6-year-old boy presents with fever for 6 days, bilateral conjunctival injection without exudate, strawberry tongue, polymorphous truncal rash, and erythema of the palms and soles with desquamation. What is the most important next step in management?",
        options: [
            { key: "A", label: "Oral amoxicillin" },
            { key: "B", label: "Supportive care only" },
            { key: "C", label: "Topical corticosteroids" },
            { key: "D", label: "IVIG and high-dose aspirin" },
            { key: "E", label: "Acyclovir" },
        ],
        correct: "D",
        explanation:
            "This is classic Kawasaki disease (mucocutaneous lymph node syndrome): fever ≥5 days plus ≥4 of bilateral conjunctivitis, mucositis (strawberry tongue, cracked lips), rash, extremity changes (erythema/desquamation), and cervical lymphadenopathy.\n\nThe most feared complication is coronary artery aneurysms. Treatment with IVIG plus high-dose aspirin within 10 days dramatically reduces this risk. Echocardiography is performed at diagnosis and follow-up.\n\nEducational objective: Kawasaki disease is treated with IVIG + aspirin to prevent coronary artery aneurysms.",
    },
];

type Status = "marked-answered" | "marked" | "answered" | "visited" | "unseen";
type FilterKey = "all" | "answered" | "unanswered" | "marked";

const PRIMARY = "#FACC15";

function PracticeSetup() {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
    const [timeSpent, setTimeSpent] = useState<Record<number, number>>({});
    const [marked, setMarked] = useState<Record<number, boolean>>({});
    const [visited, setVisited] = useState<Record<number, boolean>>({ 1: true });
    const [showSidebar, setShowSidebar] = useState(false);
    const [seconds, setSeconds] = useState(3600);
    const [questionStart, setQuestionStart] = useState(Date.now());
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterKey>("all");
    const [openCalculator, setOpenCalculator] = useState(false);
    const [openNotes, setOpenNotes] = useState(false);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [showLabValues, setShowLabValues] = useState(false);
    const [selectedLabCategory, setSelectedLabCategory] = useState("hematology");
    const [openStopModal, setOpenStopModal] = useState(false);
    const [openPauseModal, setOpenPauseModal] = useState(false);
    const settings = { theme: "light", primaryColor: PRIMARY };

    const q = QUESTIONS[current];
    const total = QUESTIONS.length;
    const isSubmitted = !!submitted[q.id];
    const userAnswer = answers[q.id];
    const isCorrect = isSubmitted && userAnswer === q.correct;

    const answeredCount = useMemo(() => Object.keys(submitted).length, [submitted]);
    const correctCount = useMemo(
        () =>
            Object.entries(submitted).filter(
                ([id]) => answers[+id] === QUESTIONS[+id - 1].correct,
            ).length,
        [submitted, answers],
    );
    const correctPct = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
    const markedCount = useMemo(() => Object.values(marked).filter(Boolean).length, [marked]);

    useEffect(() => {
        const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        setVisited((v) => ({ ...v, [q.id]: true }));
        setQuestionStart(Date.now());
    }, [q.id]);

    const select = (key: string) => {
        if (isSubmitted) return;
        setAnswers((a) => ({ ...a, [q.id]: key }));
    };

    const handleSubmit = () => {
        if (!userAnswer || isSubmitted) return;
        const elapsed = Math.round((Date.now() - questionStart) / 1000);
        setTimeSpent((t) => ({ ...t, [q.id]: elapsed }));
        setSubmitted((s) => ({ ...s, [q.id]: true }));
    };

    const goto = (idx: number) => {
        setCurrent(idx);
        setShowSidebar(false);
    };

    const statusOf = (i: number): Status => {
        const id = QUESTIONS[i].id;
        if (marked[id] && submitted[id]) return "marked-answered";
        if (marked[id]) return "marked";
        if (submitted[id]) return "answered";
        if (visited[id]) return "visited";
        return "unseen";
    };

    const fmtTime = (s: number) => {
        const h = Math.floor(s / 3600).toString().padStart(2, "0");
        const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${h}:${m}:${sec}`;
    };

    const filteredIndices = useMemo(() => {
        const term = search.trim();
        return QUESTIONS.map((_, i) => i).filter((i) => {
            const id = QUESTIONS[i].id;
            if (term && !String(id).startsWith(term)) return false;
            if (filter === "answered" && !submitted[id]) return false;
            if (filter === "unanswered" && submitted[id]) return false;
            if (filter === "marked" && !marked[id]) return false;
            return true;
        });
    }, [search, filter, submitted, marked]);

    return (
        <div className="h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
            {/* HEADER */}
            <header className="flex-none bg-slate-900 text-white border-b border-slate-800">
                <div className="px-3 sm:px-4 lg:px-6 h-14 flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="lg:hidden w-9 h-9 flex-none rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        aria-label="Open question navigator"
                    >
                        <BiMenu size={18} />
                    </button>
                    <div className="flex items-center gap-2 min-w-0">
                        <div
                            className="w-8 h-8 flex-none rounded-md grid place-items-center font-bold text-sm text-slate-900"
                            style={{ background: PRIMARY }}
                        >
                            Q
                        </div>
                        <div className="leading-tight min-w-0">
                            <div className="text-[10px] sm:text-[11px] tracking-wider text-slate-400 font-semibold">PRACTICE BLOCK</div>
                            <div className="text-xs sm:text-sm font-semibold truncate">
                                <span className="hidden sm:inline">Session #4821 · </span>
                                {total} Questions
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
                            <div className="text-[11px] text-slate-400">Progress</div>
                            <div className="text-sm font-semibold">
                                {answeredCount}/{total}
                            </div>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full"
                                    style={{ width: `${(answeredCount / total) * 100}%`, background: PRIMARY }}
                                />
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-black font-semibold text-xs sm:text-sm"
                            style={{ background: PRIMARY }}
                        >
                            <CgLock size={14} />
                            <span className="tabular-nums">{fmtTime(seconds)}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN BODY */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                <aside className="hidden lg:block w-[260px] xl:w-[280px] flex-none border-r border-slate-200 bg-white overflow-y-auto">
                    <PaletteSidebar
                        total={total}
                        answeredCount={answeredCount}
                        markedCount={markedCount}
                        current={current}
                        goto={goto}
                        statusOf={statusOf}
                        marked={marked}
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        filteredIndices={filteredIndices}
                    />
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                    {/* Result banner */}
                    {isSubmitted && (
                        <div className="flex-none px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
                            <div className="rounded-lg bg-white border border-slate-200 flex items-stretch overflow-hidden shadow-sm">
                                <div className={`w-1.5 flex-none ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`} />
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-y sm:divide-y-0 divide-slate-200">
                                    <div className="px-4 sm:px-5 py-3">
                                        <div className={`text-base font-bold ${isCorrect ? "text-emerald-600" : "text-red-600"}`}>
                                            {isCorrect ? "Correct" : "Incorrect"}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-0.5">Correct answer</div>
                                        <div className="text-sm font-semibold text-slate-700">{q.correct}</div>
                                    </div>
                                    <div className="px-4 sm:px-5 py-3 flex items-center gap-3">
                                        <FiFileText size={20} className="text-slate-400 flex-none" />
                                        <div className="min-w-0">
                                            <div className="text-base font-semibold text-slate-800">{correctPct}%</div>
                                            <div className="text-xs text-slate-500">Answered correctly</div>
                                        </div>
                                    </div>
                                    <div className="px-4 sm:px-5 py-3 flex items-center gap-3">
                                        <CgLock size={20} className="text-slate-400 flex-none" />
                                        <div className="min-w-0">
                                            <div className="text-base font-semibold text-slate-800">
                                                {String(timeSpent[q.id] ?? 0).padStart(2, "0")} secs
                                            </div>
                                            <div className="text-xs text-slate-500">Time Spent</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SPLIT LAYOUT */}
                    <div className="flex-1 overflow-hidden min-h-0">
                        <div
                            className={`h-full grid gap-4 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 overflow-y-auto xl:overflow-hidden ${isSubmitted ? "xl:grid-cols-2" : "grid-cols-1"
                                }`}
                        >
                            {/* LEFT */}
                            <section className="flex flex-col min-h-0 xl:overflow-y-auto pr-0 xl:pr-2">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                                    <div className="w-9 h-9 flex-none rounded-md bg-slate-900 text-white grid place-items-center text-xs font-bold">
                                        {String(q.id).padStart(2, "0")}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs sm:text-sm font-semibold truncate">
                                            Question {q.id} of {total}
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 truncate">
                                            {q.topic} · {q.difficulty}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setMarked((m) => ({ ...m, [q.id]: !m[q.id] }))}
                                        style={
                                            marked[q.id]
                                                ? { background: PRIMARY, borderColor: PRIMARY, color: "#0f172a" }
                                                : { borderColor: PRIMARY }
                                        }
                                        className="ml-auto cursor-pointer flex-none inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md border bg-white text-xs font-semibold transition-colors text-slate-600"
                                    >
                                        {marked[q.id] ? <BiCheck size={14} /> : <BiBookmark size={14} />}
                                        <span className="hidden xs:inline sm:inline">{marked[q.id] ? "Marked" : "Mark"}</span>
                                    </button>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 sm:p-4 mb-4 shadow-sm">
                                    <p className="text-sm sm:text-[15px] leading-relaxed text-slate-800">{q.text}</p>
                                    {q.image && (
                                        <img src={q.image} alt="" className="mt-3 rounded-md w-full max-h-56 object-cover" />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {q.options.map((opt) => {
                                        const selected = userAnswer === opt.key;
                                        const isRightOpt = opt.key === q.correct;
                                        let cls = "border-slate-200 bg-white hover:border-slate-400";
                                        if (isSubmitted) {
                                            if (isRightOpt) cls = "border-emerald-500 bg-emerald-50";
                                            else if (selected) cls = "border-red-500 bg-red-50";
                                            else cls = "border-slate-200 bg-white opacity-70";
                                        } else if (selected) {
                                            cls = "border-amber-400 bg-amber-50";
                                        }
                                        return (
                                            <button
                                                key={opt.key}
                                                onClick={() => select(opt.key)}
                                                disabled={isSubmitted}
                                                className={`w-full cursor-pointer text-left flex items-center rounded-lg border-2 overflow-hidden transition-all ${cls}`}
                                            >
                                                <div
                                                    className={`w-10 sm:w-11 self-stretch flex-none grid place-items-center font-bold text-sm ${isSubmitted && isRightOpt
                                                        ? "bg-emerald-500 text-white"
                                                        : isSubmitted && selected
                                                            ? "bg-red-500 text-white"
                                                            : selected
                                                                ? "text-black"
                                                                : "bg-slate-100 text-slate-700"
                                                        }`}
                                                    style={!isSubmitted && selected ? { background: PRIMARY } : undefined}
                                                >
                                                    {opt.key}
                                                </div>
                                                <div className="flex-1 px-3 py-2.5 text-xs sm:text-sm break-words">{opt.label}</div>
                                                {isSubmitted && isRightOpt && (
                                                    <TbCircleCheck size={18} className="text-emerald-600 mr-2 sm:mr-3 flex-none" />
                                                )}
                                                {isSubmitted && selected && !isRightOpt && (
                                                    <BiXCircle size={18} className="text-red-600 mr-2 sm:mr-3 flex-none" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* RIGHT - Explanation */}
                            {isSubmitted && (
                                <aside className="flex flex-col min-h-0 xl:overflow-y-auto xl:border-l xl:border-slate-200 xl:pl-4">
                                    <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                                        <div
                                            className="px-4 sm:px-5 py-3 flex items-center gap-2 border-b border-slate-200 flex-wrap"
                                            style={{ background: "linear-gradient(90deg, #fffbeb 0%, #fff 100%)" }}
                                        >
                                            <div className="w-7 h-7 flex-none rounded-md grid place-items-center" style={{ background: PRIMARY }}>
                                                <FiFileText size={14} className="text-slate-900" />
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">Explanation</div>
                                            <div
                                                className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full ${isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {isCorrect ? "Correct" : "Incorrect"} · Ans {q.correct}
                                            </div>
                                        </div>

                                        <div className="p-4 sm:p-5">
                                            {q.explanationImage && (
                                                <img
                                                    src={q.explanationImage}
                                                    alt=""
                                                    className="rounded-md mb-3 w-full max-h-56 object-cover"
                                                />
                                            )}
                                            <div className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-line break-words">
                                                {q.explanation}
                                            </div>

                                            <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-800">{q.subject}</div>
                                                    <div className="text-xs text-slate-500">Subject</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-800">{q.system}</div>
                                                    <div className="text-xs text-slate-500">System</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-800">{q.topic}</div>
                                                    <div className="text-xs text-slate-500">Topic</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>

                    {/* FOOTER (no Prev/Next) */}
                    <footer className="flex-none border-t border-slate-200 bg-white/95 backdrop-blur-xl px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 z-[100] shadow-[0_-4px_20px_rgba(15,23,42,0.04)]">
                        <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!userAnswer}
                                        style={{ background: PRIMARY }}
                                        className="inline-flex cursor-pointer items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 text-sm font-bold transition-all shadow-lg"
                                    >
                                        <FaLayerGroup size={14} />
                                        Submit Answer
                                    </button>
                                ) : (
                                    <div className="h-10 sm:h-11 px-4 rounded-xl bg-[#fffbeb] border border-amber-300 flex items-center text-sm font-semibold text-black">
                                        Submitted
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap border border-amber-200 bg-[#fffbeb] p-2 sm:p-3 rounded-xl">
                                {[
                                    { Icon: TbCalculator, label: "Calc", onClick: () => setOpenCalculator(true) },
                                    { Icon: TbNotebook, label: "Notes", onClick: () => setOpenNotes(true) },
                                    { Icon: TbFlask, label: "Labs", onClick: () => setShowLabValues(true) },
                                    { Icon: TbBan, label: "Stop", onClick: () => setOpenStopModal(true) },
                                    { Icon: TbPlayerPause, label: "Pause", onClick: () => setOpenPauseModal(true) },
                                ].map(({ Icon, label, onClick }) => (
                                    <button
                                        key={label}
                                        onClick={onClick}
                                        className="group cursor-pointer flex flex-col items-center justify-center w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] rounded-xl bg-white border border-amber-100 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg">
                                            <Icon
                                                size={18}
                                                className="text-black font-bold sm:w-5 sm:h-5"
                                            />
                                        </div>

                                        <span className="text-[10px] sm:text-[11px] font-medium text-black">
                                            {label}
                                        </span>
                                    </button>
                                ))}
                            </div>


                        </div>
                    </footer>
                </main>
            </div>

            {/* MOBILE SIDEBAR */}
            {showSidebar && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowSidebar(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-[320px] bg-white overflow-y-auto">
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 grid place-items-center z-10"
                        >
                            <BiX size={16} />
                        </button>
                        <PaletteSidebar
                            total={total}
                            answeredCount={answeredCount}
                            markedCount={markedCount}
                            current={current}
                            goto={goto}
                            statusOf={statusOf}
                            marked={marked}
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            filteredIndices={filteredIndices}
                        />
                    </div>
                </div>
            )}

            {openCalculator && (
                <div className="fixed bottom-24 right-3 sm:right-6 z-50 max-w-[calc(100vw-1.5rem)]">
                    <div className="relative">
                        <button
                            onClick={() => setOpenCalculator(false)}
                            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                            ✕
                        </button>
                        <Calculator settings={{ theme: "light", primaryColor: PRIMARY }} />
                    </div>
                </div>
            )}

            <NoteModal
                isOpen={openNotes}
                onClose={() => setOpenNotes(false)}
                questionId={String(q.id)}
                initialNote={notes[String(q.id)] || ""}
                onSave={(questionId, note) => {
                    setNotes((prev) => ({ ...prev, [questionId]: note }));
                }}
                onDelete={(questionId) => {
                    setNotes((prev) => {
                        const updated = { ...prev };
                        delete updated[questionId];
                        return updated;
                    });
                }}
                settings={{ theme: "light", primaryColor: PRIMARY }}
            />

            <ThemeSidePanel
                isOpen={showLabValues}
                onClose={() => setShowLabValues(false)}
                title="Laboratory Values Reference"
                settings={settings}
            >
                <div className="flex flex-col h-full">
                    <div className="flex border-b border-gray-100 mb-4 overflow-x-auto">
                        {Object.keys(LAB_VALUES).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedLabCategory(category)}
                                style={
                                    selectedLabCategory === category
                                        ? { borderBottom: `2px solid ${settings.primaryColor}`, color: settings.primaryColor }
                                        : {}
                                }
                                className={`flex-1 min-w-[90px] cursor-pointer py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium capitalize transition-colors duration-200 whitespace-nowrap ${selectedLabCategory === category ? "" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-900 uppercase">Test</th>
                                        <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-900 uppercase">Normal Range</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {LAB_VALUES[selectedLabCategory as keyof typeof LAB_VALUES].map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-3 sm:px-4 py-2 text-sm text-gray-900">{item.test}</td>
                                            <td className="px-3 sm:px-4 py-2 text-sm text-gray-600">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </ThemeSidePanel>

            {openStopModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/35 backdrop-blur-[2px] px-4">
                    <div className="relative w-full max-w-[440px] rounded-[30px] bg-white px-6 sm:px-8 py-7 sm:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                        <div className="flex justify-center">
                            <div className="flex items-center justify-center w-[78px] h-[78px] rounded-full bg-[#fffbeb]">
                                <TbBan size={38} style={{ color: PRIMARY }} />
                            </div>
                        </div>
                        <h2 className="mt-6 text-center text-[22px] sm:text-[24px] leading-[32px] sm:leading-[34px] font-bold text-[#111827]">
                            Stop this test?
                        </h2>
                        <p className="mt-2 text-center text-sm leading-6 text-[#6B7280]">
                            Your current progress will be submitted automatically.
                        </p>
                        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <button
                                onClick={() => setOpenStopModal(false)}
                                style={{ borderColor: PRIMARY }}
                                className="flex-1 h-[48px] sm:h-[50px] rounded-2xl border-2 bg-white text-black text-sm font-semibold hover:bg-[#fffbeb] cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => router.push('/question-bank/session-summary')}
                                style={{ background: PRIMARY }}
                                className="flex-1 h-[48px] sm:h-[50px] rounded-2xl text-black text-sm font-semibold hover:opacity-90 cursor-pointer shadow-md"
                            >
                                Yes, Stop
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {openPauseModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/35 backdrop-blur-[2px] px-4">
                    <div className="relative w-full max-w-[440px] rounded-[30px] bg-white px-6 sm:px-8 py-7 sm:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                        <div className="flex justify-center">
                            <div className="flex items-center justify-center w-[78px] h-[78px] rounded-full bg-[#fffbeb]">
                                <TbPlayerPause size={38} style={{ color: PRIMARY }} />
                            </div>
                        </div>
                        <h2 className="mt-6 text-center text-[22px] sm:text-[24px] leading-[32px] sm:leading-[34px] font-bold text-[#111827]">
                            Pause this test?
                        </h2>
                        <p className="mt-2 text-center text-sm leading-6 text-[#6B7280]">
                            Your current progress will be submitted automatically.
                        </p>
                        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <button
                                onClick={() => setOpenPauseModal(false)}
                                style={{ borderColor: PRIMARY }}
                                className="flex-1 h-[48px] sm:h-[50px] rounded-2xl border-2 bg-white text-black text-sm font-semibold hover:bg-[#fffbeb] cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setOpenPauseModal(false)}
                                style={{ background: PRIMARY }}
                                className="flex-1 h-[48px] sm:h-[50px] rounded-2xl text-black text-sm font-semibold hover:opacity-90 cursor-pointer shadow-md"
                            >
                                Yes, Pause
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function PaletteSidebar({
    total,
    answeredCount,
    markedCount,
    current,
    goto,
    statusOf,
    marked,
    search,
    setSearch,
    filter,
    setFilter,
    filteredIndices,
}: {
    total: number;
    answeredCount: number;
    markedCount: number;
    current: number;
    goto: (i: number) => void;
    statusOf: (i: number) => Status;
    marked: Record<number, boolean>;
    search: string;
    setSearch: (s: string) => void;
    filter: FilterKey;
    setFilter: (f: FilterKey) => void;
    filteredIndices: number[];
}) {
    const filters: { key: FilterKey; label: string; count: number }[] = [
        { key: "all", label: "All", count: total },
        { key: "answered", label: "Done", count: answeredCount },
        { key: "unanswered", label: "Left", count: total - answeredCount },
        { key: "marked", label: "Marked", count: markedCount },
    ];

    const dotFor = (s: Status) => {
        if (s === "marked-answered") return "bg-amber-400 ring-2 ring-slate-900";
        if (s === "marked") return "bg-white border-2 border-amber-400";
        if (s === "answered") return "bg-amber-400";
        if (s === "visited") return "bg-white border-2 border-dashed border-slate-400";
        return "bg-slate-200";
    };

    return (
        <div className="p-4 pt-12 lg:pt-4">
            <div className="text-[11px] tracking-wider text-slate-500 font-semibold">QUESTION NAVIGATOR</div>
            <div className="text-sm text-slate-700 mb-3">{total} questions · jump to any</div>

            {/* <div className="grid grid-cols-3 gap-2 mb-3">
                <Stat label="Done" value={answeredCount} tone="primary" />
                <Stat label="Left" value={total - answeredCount} tone="muted" />
                <Stat label="Marked" value={markedCount} tone="outline" />
            </div> */}

            <div className="relative mb-2">
                <BiSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Jump to Q number..."
                    inputMode="numeric"
                    className="w-full pl-8 pr-3 py-2 rounded-md bg-slate-100 border border-slate-200 focus:outline-none focus:border-amber-400 text-sm"
                />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
                {filters.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        style={
                            filter === f.key
                                ? { background: PRIMARY, borderColor: PRIMARY, color: "#0f172a" }
                                : undefined
                        }
                        className={`px-2 py-0.5 cursor-pointer rounded-full text-[11px] font-semibold border ${filter === f.key ? "" : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                            }`}
                    >
                        {f.label} {f.count}
                    </button>
                ))}
            </div>

            <div className="space-y-1.5">
                {filteredIndices.length === 0 ? (
                    <div className="text-xs text-slate-500 py-6 text-center">No questions match.</div>
                ) : (
                    filteredIndices.map((i) => {
                        const s = statusOf(i);
                        const isCurrent = i === current;
                        const q = QUESTIONS[i];
                        return (
                            <button
                                key={i}
                                onClick={() => goto(i)}
                                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md border text-left transition-all cursor-pointer ${isCurrent
                                    ? "border-amber-400 bg-amber-50"
                                    : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-200"
                                    }`}
                            >
                                <div className={`w-2.5 h-2.5 rounded-full flex-none ${dotFor(s)}`} />
                                <div className="text-xs font-bold w-6 flex-none">{i + 1}</div>
                                <div className="text-xs text-slate-600 truncate flex-1">{q.topic}</div>
                                {marked[q.id] && <BiBookmark size={12} className="text-amber-500 flex-none" />}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "primary" | "muted" | "outline" }) {
    const style =
        tone === "primary"
            ? { background: PRIMARY, color: "#0f172a" }
            : { borderColor: PRIMARY };
    const cls =
        tone === "primary"
            ? ""
            : tone === "muted"
                ? "bg-slate-100 text-black border"
                : "bg-white text-black border";
    return (
        <div className={`rounded-md px-2 py-1.5 ${cls}`} style={style}>
            <div className="text-base font-bold leading-none">{value}</div>
            <div className="text-[10px] uppercase tracking-wider mt-0.5">{label}</div>
        </div>
    );
}
export default PracticeSetup;