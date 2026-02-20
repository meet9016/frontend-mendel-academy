"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import QBankSidebar from "@/component/qbank/QBankSidebar";

// ─── Types ────────────────────────────────────────────────────────────────────
type Topic = {
  id: string;
  name: string;
  chapterId: string;
  questionCount: number;
};

type Chapter = {
  id: string;
  name: string;
  subjectId: string;
  questionCount: number;
  topics: Topic[];
};

type Subject = {
  id: string;
  name: string;
  questionCount: number;
  chapters: Chapter[];
};

type QBankTree = {
  totalQuestions: number;
  subjects: Subject[];
};

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  description?: string;
  optionExplanations?: string[];
};

type TestMode = "tutor" | "timed";

type ActiveTest = {
  id?: string;
  mode: TestMode;
  totalQuestions: number;
  questions: Question[];
  createdAt: string;
  attemptId?: string;
};

const QUESTION_PER_TEST_LIMIT = 40;

// ─── Component ────────────────────────────────────────────────────────────────
export default function TestCreatePage() {
  const router = useRouter();

  // ── Tree data (single API) ──
  const [tree, setTree] = useState<QBankTree | null>(null);
  const [loadingTree, setLoadingTree] = useState(false);

  // ── Selections ──
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  // ── Test config ──
  const [mode, setMode] = useState<TestMode>("tutor");
  const [tutorEnabled, setTutorEnabled] = useState(true);
  const [timedEnabled, setTimedEnabled] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);

  // ── Expanded chapters ──
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  // ── Questions for test generation ──
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // ── Accordion states ──
  const [accordionStates, setAccordionStates] = useState({
    testMode: true,
    questionMode: true,
    subjects: true,
    chapters: true,
    questionCount: true
  });

  // ─── Fetch the single QBank tree API ──────────────────────────────────────
  useEffect(() => {
    const fetchTree = async () => {
      try {
        setLoadingTree(true);
        const res = await api.get(endPointApi.getQBankTree as string);
        const data: QBankTree = res.data || res;

        // Normalize: attach chapterId to topics, subjectId to chapters
        const normalized: QBankTree = {
          totalQuestions: data.totalQuestions,
          subjects: data.subjects.map((s) => ({
            ...s,
            chapters: s.chapters.map((ch) => ({
              ...ch,
              subjectId: s.id,
              topics: ch.topics.map((t) => ({ ...t, chapterId: ch.id })),
            })),
          })),
        };

        setTree(normalized);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load QBank data");
      } finally {
        setLoadingTree(false);
      }
    };
    fetchTree();
  }, []);

  // ─── Flatten helpers (derived from tree) ──────────────────────────────────
  const allSubjects = useMemo(() => tree?.subjects ?? [], [tree]);

  const allChapters = useMemo(
    () => allSubjects.flatMap((s) => s.chapters),
    [allSubjects]
  );

  const allTopics = useMemo(
    () => allChapters.flatMap((ch) => ch.topics),
    [allChapters]
  );

  // ─── Get only topics with questions ───────────────────────────────────────
  const topicsWithQuestions = useMemo(
    () => allTopics.filter(t => t.questionCount > 0),
    [allTopics]
  );

  // ─── Get selected topics with questions only ───────────────────────────────
  const selectedTopicsWithQuestions = useMemo(
    () => topicsWithQuestions.filter(t => selectedTopicIds.includes(t.id)),
    [selectedTopicIds, topicsWithQuestions]
  );

  // ─── Load questions when topic selection changes ───────────────────────────
  useEffect(() => {
    const loadQuestions = async () => {
      // Only load questions for topics that actually have questions
      const topicsToLoad = selectedTopicsWithQuestions.map(t => t.id);
      
      if (!topicsToLoad.length) {
        setQuestions([]);
        return;
      }
      try {
        setLoadingQuestions(true);
        const all: Question[] = [];
        for (const topicId of topicsToLoad) {
          const data = await api.get(
            `${endPointApi.getQuestionBankByTopic}/${topicId}`
          );
          const list = data.data || data || [];
          for (const q of list) {
            all.push({
              id: q.id || q._id,
              question: q.question,
              options: q.options || [],
              correctAnswer: q.correctAnswer,
              description: q.description,
              optionExplanations: q.optionExplanations,
            });
          }
        }
        setQuestions(all);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load questions");
      } finally {
        setLoadingQuestions(false);
      }
    };
    loadQuestions();
  }, [selectedTopicsWithQuestions]);

  const availableQuestionCount = questions.length;

  useEffect(() => {
    if (availableQuestionCount && questionCount > availableQuestionCount) {
      setQuestionCount(availableQuestionCount);
    }
  }, [availableQuestionCount, questionCount]);

  // ─── Selection logic ──────────────────────────────────────────────────────
  const toggleItem = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const allSubjectsSelected =
    allSubjects.length > 0 && selectedSubjectIds.length === allSubjects.length;

  const selectableChapterIds = allChapters
    .filter((ch) => selectedSubjectIds.includes(ch.subjectId))
    .map((ch) => ch.id);

  const allChaptersSelected =
    selectableChapterIds.length > 0 &&
    selectableChapterIds.every((id) => selectedChapterIds.includes(id));

  const handleToggleAllSubjects = () => {
    if (allSubjectsSelected) {
      setSelectedSubjectIds([]);
      setSelectedChapterIds([]);
      setSelectedTopicIds([]);
    } else {
      setSelectedSubjectIds(allSubjects.map((s) => s.id));
    }
  };

  const handleToggleAllChapters = () => {
    if (allChaptersSelected) {
      setSelectedChapterIds((prev) =>
        prev.filter((id) => !selectableChapterIds.includes(id))
      );
      // Remove topics of deselected chapters
      setSelectedTopicIds((prev) =>
        prev.filter(topicId => {
          const topic = allTopics.find(t => t.id === topicId);
          return topic && !selectableChapterIds.includes(topic.chapterId);
        })
      );
    } else {
      setSelectedChapterIds((prev) => [
        ...prev,
        ...selectableChapterIds.filter((id) => !prev.includes(id)),
      ]);
      // Add only topics with questions from newly selected chapters
      const newChapters = selectableChapterIds.filter(id => !selectedChapterIds.includes(id));
      const newTopics = allTopics
        .filter(t => newChapters.includes(t.chapterId) && t.questionCount > 0)
        .map(t => t.id);
      setSelectedTopicIds((prev) => [...prev, ...newTopics]);
    }
  };

  const handleToggleSubject = (subject: Subject) => {
    setSelectedSubjectIds((prev) => {
      if (prev.includes(subject.id)) {
        // Deselect subject → also deselect its chapters & topics
        const chapterIds = subject.chapters.map((c) => c.id);
        const topicIds = subject.chapters.flatMap((c) => c.topics.map((t) => t.id));
        setSelectedChapterIds((p) => p.filter((id) => !chapterIds.includes(id)));
        setSelectedTopicIds((p) => p.filter((id) => !topicIds.includes(id)));
        return prev.filter((id) => id !== subject.id);
      } else {
        // Select subject
        return [...prev, subject.id];
      }
    });
  };

  const handleToggleChapter = (chapter: Chapter) => {
    if (!selectedSubjectIds.includes(chapter.subjectId)) return;

    setSelectedChapterIds((prev) => {
      const isSelected = prev.includes(chapter.id);

      if (isSelected) {
        // Deselect chapter → remove its topics
        const topicIds = chapter.topics.map(t => t.id);
        setSelectedTopicIds((p) => p.filter(id => !topicIds.includes(id)));
        return prev.filter((id) => id !== chapter.id);
      } else {
        // Select chapter → add only its topics that have questions
        const topicIds = chapter.topics
          .filter(t => t.questionCount > 0)
          .map(t => t.id);
        setSelectedTopicIds((p) => [...p, ...topicIds]);
        return [...prev, chapter.id];
      }
    });
  };

  const handleToggleTopic = (topic: Topic) => {
    // Only allow if topic has questions
    if (topic.questionCount === 0) {
      toast.error("This topic has no questions available");
      return;
    }
    
    // Only allow if chapter is selected
    if (!selectedChapterIds.includes(topic.chapterId)) {
      toast.error("Please select the chapter first");
      return;
    }
    setSelectedTopicIds((prev) => toggleItem(prev, topic.id));
  };

  const handleToggleChapterExpand = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  // ─── Mode toggles ─────────────────────────────────────────────────────────
  const handleToggleTutor = () => {
    setTutorEnabled((prev) => {
      const next = !prev;
      setMode(next ? "tutor" : timedEnabled ? "timed" : "tutor");
      return next;
    });
  };

  const handleToggleTimed = () => {
    setTimedEnabled((prev) => {
      const next = !prev;
      setMode(next ? "timed" : tutorEnabled ? "tutor" : "tutor");
      return next;
    });
  };

  // ─── Create test ──────────────────────────────────────────────────────────
  const handleCreateTest = async () => {
    if (!selectedSubjectIds.length) return toast.error("Please select at least one subject");
    if (!selectedChapterIds.length) return toast.error("Please select at least one chapter");
    if (!selectedTopicsWithQuestions.length) return toast.error("Please select at least one topic with questions");
    if (!availableQuestionCount) return toast.error("No questions available for selected topics");
    if (questionCount < 1) return toast.error("Please select at least one question");

    const limit = Math.min(
      QUESTION_PER_TEST_LIMIT,
      questionCount,
      availableQuestionCount
    );
    const selected = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    const subjectNames = allSubjects
      .filter((s) => selectedSubjectIds.includes(s.id))
      .map((s) => s.name);

    const chapterNames = allChapters
      .filter((c) => selectedChapterIds.includes(c.id))
      .map((c) => c.name);

    let attemptId: string | undefined;
    try {
      const res = await api.post(endPointApi.createTestAttempt as string, {
        mode,
        subjects: subjectNames,
        chapters: chapterNames,
        totalQuestions: selected.length,
        startedAt: new Date().toISOString(),
        questionIds: selected.map((q) => q.id),
      });
      attemptId = res.data?.id || res.data?._id;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create test record"
      );
      return;
    }

    const payload: ActiveTest = {
      id: attemptId,
      mode,
      totalQuestions: selected.length,
      questions: selected,
      createdAt: new Date().toISOString(),
      attemptId,
    };

    try {
      window.sessionStorage.setItem("activeTest", JSON.stringify(payload));
    } catch {
      toast.error("Failed to store test data");
      return;
    }

    router.push("/test-run");
  };

  // ─── Loading skeleton ──────────────────────────────────────────────────────
  const Skeleton = ({ rows = 6 }: { rows?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 bg-gray-200 rounded" />
      ))}
    </div>
  );

  // ─── Badge component ───────────────────────────────────────────────────────
  const CountBadge = ({
    count,
    color = "blue",
  }: {
    count: number;
    color?: "blue";
  }) => {
    const styles = {
      blue: "text-blue-700 border-blue-200",
    };
    return (
      <span
        className={`shrink-0 text-sm font-medium border ml-1 rounded-full px-2 py-0.5 ${styles[color]} ${count === 0 ? "opacity-40" : ""
          }`}
      >
        {count}
      </span>
    );
  };

  // ─── Accordion Component ─────────────────────────────────────────────────────
  const Accordion = ({ 
    title, 
    id, 
    children, 
    badgeCount,
    showSelectAll,
    selectAllChecked,
    onSelectAll,
    selectAllDisabled
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode; 
    badgeCount?: number;
    showSelectAll?: boolean;
    selectAllChecked?: boolean;
    onSelectAll?: () => void;
    selectAllDisabled?: boolean;
  }) => {
    const isOpen = accordionStates[id as keyof typeof accordionStates];
    
    const toggleAccordion = () => {
      setAccordionStates(prev => ({
        ...prev,
        [id]: !prev[id as keyof typeof prev]
      }));
    };

    return (
      <section className="border-b border-gray-100 bg-white shadow">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-base font-semibold text-gray-800 flex items-center gap-3">
            {showSelectAll && (
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectAllChecked}
                onChange={onSelectAll}
                disabled={selectAllDisabled}
              />
            )}
            {title}
            {badgeCount !== undefined && <CountBadge count={badgeCount} />}
          </div>
          <button
            onClick={toggleAccordion}
            className="text-gray-300 cursor-pointer hover:text-gray-600 focus:outline-none"
          >
            <svg
              className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="px-4 pb-4">
            {children}
          </div>
        )}
      </section>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-[calc(100vh-120px)] bg-gray-100 w-full">
      <div className="w-full flex">

        <QBankSidebar active="create" />

        {/* ── Main ── */}
        <section className="flex-1 bg-[#f3f3f4]">
          <header className="px-6 py-4 bg-white">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Create Test</h1>
          </header>

          <div className="px-4 md:px-8 py-4 space-y-5 md:space-y-0">

            {/* ── Test Mode ── */}
            <Accordion title="Test Mode" id="testMode">
              <div className="px-4 py-3 flex flex-wrap items-center gap-8">
                {/* Tutor */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleToggleTutor}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border cursor-pointer ${tutorEnabled ? "bg-blue-600 border-blue-600" : "bg-gray-200 border-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 bg-white rounded-full transition-transform ${tutorEnabled ? "translate-x-5.5" : "translate-x-1"
                        }`}
                    />
                  </div>
                  <span className="text-base text-gray-800">Tutor</span>
                </div>
                {/* Timed */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleToggleTimed}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border cursor-pointer ${timedEnabled ? "bg-blue-600 border-blue-600" : "bg-gray-200 border-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 bg-white rounded-full transition-transform ${timedEnabled ? "translate-x-5.5" : "translate-x-1"
                        }`}
                    />
                  </div>
                  <span className="text-base text-gray-800">Timed</span>
                </div>
              </div>
            </Accordion>

            {/* ── Question Mode ── */}
            <Accordion title="Question Mode" id="questionMode" badgeCount={tree?.totalQuestions ?? 0}>
              <div className="px-4 py-3 flex items-center gap-4">
                <div className="flex text-sm border rounded-full overflow-hidden">
                  <button className="px-4 py-1.5 bg-white text-blue-700 border-r border-gray-300">
                    Standard
                  </button>
                  <button className="px-4 py-1.5 text-gray-400 bg-gray-100">Custom</button>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 text-base text-gray-700">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Unused <CountBadge count={tree?.totalQuestions ?? 0} /></span>
                </label>
                {["Incorrect", "Marked", "Omitted", "Correct"].map((label) => (
                  <label key={label} className="inline-flex items-center gap-2 cursor-not-allowed text-gray-400">
                    <input type="checkbox" disabled className="w-4 h-4" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Accordion>

            {/* ── Subjects ── */}
            <Accordion 
              title="Subjects" 
              id="subjects"
              showSelectAll
              selectAllChecked={allSubjectsSelected}
              onSelectAll={handleToggleAllSubjects}
              selectAllDisabled={loadingTree || !allSubjects.length}
            >
              <div className="px-4 pb-4">
                {loadingTree ? (
                  <Skeleton rows={6} />
                ) : allSubjects.length === 0 ? (
                  <p className="text-sm text-gray-500">No subjects found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {allSubjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 text-base cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjectIds.includes(subject.id)}
                          onChange={() => handleToggleSubject(subject)}
                          className="w-4 h-4"
                        />
                        <span className="flex-1 min-w-0 truncate transition-colors">
                          {subject.name}<CountBadge count={subject.questionCount} color="blue" />
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </Accordion>

            {/* ── Chapters ── */}
            <Accordion 
              title="Chapters" 
              id="chapters"
              showSelectAll
              selectAllChecked={allChaptersSelected}
              onSelectAll={handleToggleAllChapters}
              selectAllDisabled={loadingTree || !allChapters.length}
            >
              <div className="px-4 pb-4">
                {loadingTree ? (
                  <Skeleton rows={9} />
                ) : allChapters.length === 0 ? (
                  <p className="text-sm text-gray-500">No chapters found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {allChapters.map((chapter) => {
                      const disabled = !selectedSubjectIds.includes(chapter.subjectId);
                      const isExpanded = expandedChapters.includes(chapter.id);
                      const isChapterSelected = selectedChapterIds.includes(chapter.id);

                      return (
                        <div
                          key={chapter.id}
                          className={`rounded px-2 py-2 text-base bg-white transition-all ${disabled ? "opacity-50" : "hover:border-blue-300"
                            }`}
                        >
                          {/* Chapter row */}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChapterSelected}
                              onChange={() => handleToggleChapter(chapter)}
                              disabled={disabled}
                              className="w-4 h-4"
                            />
                            <span
                              className={`flex-1 min-w-0 truncate ${disabled ? "text-gray-400" : "cursor-pointer hover:text-blue-600"
                                }`}
                              onClick={() => !disabled && handleToggleChapter(chapter)}
                            >
                              {chapter.name}<CountBadge count={disabled ? 0 : chapter.questionCount} />
                            </span>

                            {/* Expand / collapse */}
                            <button
                              type="button"
                              onClick={() => handleToggleChapterExpand(chapter.id)}
                              disabled={disabled}
                              className={`w-6 h-6 flex items-center justify-center rounded font-bold text-base shrink-0 ${disabled
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                }`}
                              title={isExpanded ? "Collapse topics" : "Expand topics"}
                            >
                              {isExpanded ? "−" : "+"}
                            </button>
                          </div>

                          {/* Topics list */}
                          {isExpanded && !disabled && (
                            <div className="mt-2 pl-4 pt-2 space-y-1.5">
                              {chapter.topics.length === 0 ? (
                                <p className="text-sm text-gray-400">No topics found.</p>
                              ) : (
                                chapter.topics.map((topic) => {
                                  const isTopicSelected = selectedTopicIds.includes(topic.id);
                                  const isTopicDisabled = !isChapterSelected || topic.questionCount === 0;

                                  return (
                                    <label
                                      key={topic.id}
                                      className={`flex items-center gap-2 text-sm ${isTopicDisabled ? "opacity-40" : "cursor-pointer group"
                                        }`}
                                    >
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        checked={isTopicSelected}
                                        onChange={() => handleToggleTopic(topic)}
                                        disabled={isTopicDisabled}
                                      />
                                      <span className={`flex-1 min-w-0 truncate ${!isTopicDisabled && ""
                                        }`}>
                                        {topic.name}<CountBadge
                                          count={topic.questionCount}
                                        />
                                      </span>
                                    </label>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Accordion>

            {/* ── No. of Questions ── */}
            <Accordion title="No. of Questions" id="questionCount">
              <div className="px-4 py-3 space-y-2 text-base text-gray-700">
                <p>
                  Selected Topics: <span className="font-semibold">{selectedTopicsWithQuestions.length}</span> |
                  Available Questions: <span className="font-semibold text-blue-600">{availableQuestionCount}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span>Number of questions to attempt:</span>
                  <input
                    type="number"
                    min={1}
                    max={Math.min(QUESTION_PER_TEST_LIMIT, availableQuestionCount)}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value) || 0)}
                    className="w-28 px-3 py-2 border rounded text-base focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-500">
                    Max {QUESTION_PER_TEST_LIMIT} allowed per block
                  </span>
                </div>
              </div>
            </Accordion>

            {/* ── Generate ── */}
            <div className="flex justify-end pt-2 pb-4">
              <button
                type="button"
                onClick={handleCreateTest}
                disabled={loadingQuestions || selectedTopicsWithQuestions.length === 0}
                className="px-7 py-2.5 bg-blue-600 text-white rounded text-base hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm hover:shadow"
              >
                {loadingQuestions ? "Loading questions…" : "Generate Test"}
              </button>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}