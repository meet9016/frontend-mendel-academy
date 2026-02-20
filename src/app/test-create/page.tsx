"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";

type Subject = {
  id: string;
  name: string;
};

type Chapter = {
  id: string;
  name: string;
  subjectId: string;
};

type Topic = {
  id: string;
  name: string;
  chapterId: string;
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

const QUESTION_PER_TEST_LIMIT = 40;

export default function TestCreatePage() {
  const router = useRouter();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  const [mode, setMode] = useState<TestMode>("tutor");
  const [tutorEnabled, setTutorEnabled] = useState(true);
  const [timedEnabled, setTimedEnabled] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [topicsByChapter, setTopicsByChapter] = useState<Record<string, Topic[]>>({});
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [topicQuestionCounts, setTopicQuestionCounts] = useState<Record<string, number>>({});
  const [chapterQuestionCounts, setChapterQuestionCounts] = useState<Record<string, number>>({});
  const [subjectQuestionCounts, setSubjectQuestionCounts] = useState<Record<string, number>>({});
  const [totalQuestionCount, setTotalQuestionCount] = useState(0);
  const [loadedStatsSubjects, setLoadedStatsSubjects] = useState<string[]>([]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const data = await api.get(endPointApi.getAllSubject as string);
        console.log(data, 'dfatad')
        setSubjects(data.data || data || []);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load subjects");
      } finally {
        setLoadingSubjects(false);
      }
    };
    loadSubjects();
  }, []);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        setLoadingChapters(true);
        const data = await api.get(endPointApi.getAllChapters as string);
        const list = data.data || data || [];
        const all: Chapter[] = list.map((ch: any) => ({
          id: ch.id || ch._id,
          name: ch.name,
          subjectId:
            ch.subject?.id ||
            ch.subject?._id ||
            ch.subject?.toString() ||
            "",
        }));
        setChapters(all);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load chapters");
      } finally {
        setLoadingChapters(false);
      }
    };
    loadChapters();
  }, []);

  useEffect(() => {
    const loadSubjectStats = async () => {
      if (!subjects.length) {
        return;
      }
      try {
        const res = await api.get(
          endPointApi.getQuestionStatsBySubject as string
        );
        const data = res.data || res || {};
        const subjectCounts: Record<string, number> = {};
        let total = 0;
        if (Array.isArray(data.subjects)) {
          for (const item of data.subjects) {
            const id = item.subjectId || item._id;
            const count = item.count || 0;
            if (!id) continue;
            subjectCounts[id] = count;
            total += count;
          }
        }
        setSubjectQuestionCounts(subjectCounts);
        if (typeof data.totalQuestions === "number") {
          setTotalQuestionCount(data.totalQuestions);
        } else {
          setTotalQuestionCount(total);
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to load subjects stats"
        );
      }
    };
    loadSubjectStats();
  }, [subjects]);

  useEffect(() => {
    const loadChapterStats = async () => {
      const toLoad = selectedSubjectIds.filter(
        (id) => !loadedStatsSubjects.includes(id)
      );
      if (!toLoad.length) {
        return;
      }
      try {
        for (const subjectId of toLoad) {
          const res = await api.get(
            `${endPointApi.getChapterStatsBySubject}/${subjectId}`
          );
          const data = res.data || res || {};
          const chaptersStats = Array.isArray(data.chapters)
            ? data.chapters
            : [];

          setChapterQuestionCounts((prev) => {
            const next = { ...prev };
            for (const ch of chaptersStats) {
              const chId = ch.chapterId || ch._id;
              if (!chId) continue;
              next[chId] = ch.count || 0;
            }
            return next;
          });

          setTopicsByChapter((prev) => {
            const next = { ...prev };
            for (const ch of chaptersStats) {
              const chId = ch.chapterId || ch._id;
              if (!chId || !Array.isArray(ch.topics)) continue;
              next[chId] = ch.topics.map((t: any) => ({
                id: t.topicId || t._id,
                name: t.name,
                chapterId: chId,
              }));
            }
            return next;
          });

          setTopicQuestionCounts((prev) => {
            const next = { ...prev };
            for (const ch of chaptersStats) {
              const chId = ch.chapterId || ch._id;
              if (!chId || !Array.isArray(ch.topics)) continue;
              for (const t of ch.topics) {
                const tId = t.topicId || t._id;
                if (!tId) continue;
                if (next[tId] !== undefined) continue;
                next[tId] = t.count || 0;
              }
            }
            return next;
          });
        }
        setLoadedStatsSubjects((prev) => [...prev, ...toLoad]);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to load chapter stats"
        );
      }
    };
    loadChapterStats();
  }, [selectedSubjectIds, loadedStatsSubjects]);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!selectedTopicIds.length) {
        setQuestions([]);
        return;
      }
      try {
        setLoadingQuestions(true);
        const all: Question[] = [];
        for (const topicId of selectedTopicIds) {
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
  }, [selectedTopicIds]);

  const availableQuestionCount = useMemo(
    () => questions.length,
    [questions.length]
  );

  useEffect(() => {
    if (availableQuestionCount && questionCount > availableQuestionCount) {
      setQuestionCount(availableQuestionCount);
    }
  }, [availableQuestionCount, questionCount]);

  const toggleSelection = (current: string[], id: string) => {
    if (current.includes(id)) {
      return current.filter((item) => item !== id);
    }
    return [...current, id];
  };

  const handleToggleTutor = () => {
    setTutorEnabled((prev) => {
      const next = !prev;
      if (next) {
        setMode("tutor");
      } else if (timedEnabled) {
        setMode("timed");
      } else {
        setMode("tutor");
      }
      return next;
    });
  };

  const handleToggleTimed = () => {
    setTimedEnabled((prev) => {
      const next = !prev;
      if (next) {
        setMode("timed");
      } else if (tutorEnabled) {
        setMode("tutor");
      } else {
        setMode("tutor");
      }
      return next;
    });
  };

  const allSubjectsSelected =
    subjects.length > 0 && selectedSubjectIds.length === subjects.length;

  const selectableChapterIds = chapters
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
      setSelectedSubjectIds(subjects.map((s) => s.id));
    }
  };

  const handleToggleAllChapters = () => {
    if (allChaptersSelected) {
      setSelectedChapterIds((prev) =>
        prev.filter((id) => !selectableChapterIds.includes(id))
      );
    } else {
      setSelectedChapterIds((prev) => [
        ...prev,
        ...selectableChapterIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleToggleSubject = (subjectId: string) => {
    setSelectedSubjectIds((prev) => {
      if (prev.includes(subjectId)) {
        const nextSubjects = prev.filter((id) => id !== subjectId);
        setSelectedChapterIds((prevChapters) =>
          prevChapters.filter((chapterId) => {
            const chapter = chapters.find((ch) => ch.id === chapterId);
            if (!chapter) return false;
            return nextSubjects.includes(chapter.subjectId);
          })
        );
        setSelectedTopicIds((prevTopics) =>
          prevTopics.filter((topicId) => {
            let foundChapterId: string | null = null;
            for (const [chapterId, topicList] of Object.entries(
              topicsByChapter
            )) {
              if (topicList.some((t) => t.id === topicId)) {
                foundChapterId = chapterId;
                break;
              }
            }
            if (!foundChapterId) {
              return false;
            }
            const chapter = chapters.find((ch) => ch.id === foundChapterId);
            if (!chapter) {
              return false;
            }
            return nextSubjects.includes(chapter.subjectId);
          })
        );
        return nextSubjects;
      }
      return [...prev, subjectId];
    });
  };

  const handleToggleChapterExpand = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleCreateTest = () => {
    if (!selectedSubjectIds.length) {
      toast.error("Please select at least one subject");
      return;
    }
    if (!selectedChapterIds.length) {
      toast.error("Please select at least one chapter");
      return;
    }
    if (!selectedTopicIds.length) {
      toast.error("Please select at least one topic");
      return;
    }
    if (!availableQuestionCount) {
      toast.error("No questions available for selected topics");
      return;
    }
    if (questionCount < 1) {
      toast.error("Please select at least one question");
      return;
    }

    const limit = Math.min(
      QUESTION_PER_TEST_LIMIT,
      questionCount,
      availableQuestionCount
    );

    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, limit);

    const payload = {
      mode,
      totalQuestions: selected.length,
      questions: selected,
      createdAt: new Date().toISOString(),
    };

    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("activeTest", JSON.stringify(payload));
      }
    } catch {
      toast.error("Failed to store test data");
      return;
    }

    router.push("/test-run");
  };

  const displayTotalCount = totalQuestionCount;

  return (
    <main className="min-h-[calc(100vh-120px)] bg-gray-100 w-full">
      <div className="w-full flex">
        <aside className="hidden md:flex w-60 bg-black text-gray-100 flex-col border-r border-slate-800">
          <div className="px-4 py-4 border-b border-slate-800 text-sm font-semibold tracking-wide">
            QBank
          </div>
          <nav className="flex-1 text-xs">
            <div className="mt-2">
              <button className="w-full text-left px-6 py-2 bg-yellow-400 text-black text-xs font-semibold">
                Create Test
              </button>
              <div className="px-6 py-2 text-slate-300">Previous Tests</div>
              <div className="px-6 py-2 text-slate-300">Performance</div>
              <div className="px-6 py-2 text-slate-300">Search</div>
              <div className="px-6 py-2 text-slate-300">Notes</div>
            </div>

          </nav>
        </aside>

        <section className="flex-1 bg-[#f3f3f4]">
          <header className="px-6 py-4 bg-[#ffffff]">
            <h1 className="text-lg md:text-xl font-semibold">Create Test</h1>
          </header>

          <div className="px-4 md:px-8 py-4 space-y-4 md:space-y-6">
            <section className="rounded-md bg-[#ffffff]">
              <div className="px-4 py-3 text-sm font-semibold text-gray-700">
                Test Mode
              </div>
              <div className="px-4 py-3 flex flex-wrap items-center gap-6 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className={`relative inline-flex h-5 w-10 items-center rounded-full border ${tutorEnabled
                      ? "bg-blue-600 border-blue-600"
                      : "bg-gray-200 border-gray-300"
                      } cursor-pointer`}
                    onClick={handleToggleTutor}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${tutorEnabled ? "translate-x-5" : "translate-x-1"
                        }`}
                    />
                  </div>
                  <span className="text-xs md:text-sm text-gray-800">
                    Tutor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`relative inline-flex h-5 w-10 items-center rounded-full border ${timedEnabled
                      ? "bg-blue-600 border-blue-600"
                      : "bg-gray-200 border-gray-300"
                      } cursor-pointer`}
                    onClick={handleToggleTimed}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform ${timedEnabled ? "translate-x-5" : "translate-x-1"
                        }`}
                    />
                  </div>
                  <span className="text-xs md:text-sm text-gray-800">
                    Timed
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-md bg-[#ffffff]">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-gray-700">
                    Question Mode
                  </div>

                  <div className="flex text-[11px] border rounded-full overflow-hidden">
                    <button className="px-3 py-1 bg-white text-blue-700 border-r border-gray-300">
                      Standard
                    </button>
                    <button className="px-3 py-1 text-gray-400 bg-gray-100">
                      Custom
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Total:{" "}
                  <span className="font-semibold">{displayTotalCount}</span>
                </div>
              </div>

              <div className="px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-gray-700">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="scale-90" />
                  <span>Unused</span>
                </label>

                <label className="inline-flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <input type="checkbox" disabled className="scale-90" />
                  <span>Incorrect</span>
                </label>

                <label className="inline-flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <input type="checkbox" disabled className="scale-90" />
                  <span>Marked</span>
                </label>

                <label className="inline-flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <input type="checkbox" disabled className="scale-90" />
                  <span>Omitted</span>
                </label>

                <label className="inline-flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <input type="checkbox" disabled className="scale-90" />
                  <span>Correct</span>
                </label>
              </div>
            </section>

            <section className="rounded-md bg-[#ffffff]">
              <div className="px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>Subjects</span>
                <label className="flex items-center gap-1 text-[11px] font-normal text-gray-600">
                  <input
                    type="checkbox"
                    className="scale-90"
                    checked={allSubjectsSelected}
                    onChange={handleToggleAllSubjects}
                    disabled={loadingSubjects || !subjects.length}
                  />
                  <span>Select all</span>
                </label>
              </div>
              <div className="px-4 py-3">
                {loadingSubjects ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 animate-pulse">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-6 bg-gray-200 rounded"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {subjects.map((subject) => {
                      const subjectCount =
                        subjectQuestionCounts[subject.id] ?? undefined;
                      return (
                        <label
                          key={subject.id}
                          className="flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubjectIds.includes(subject.id)}
                            onChange={() => handleToggleSubject(subject.id)}
                            className="scale-90"
                          />
                          <span>{subject.name}</span>
                          {subjectCount !== undefined && (
                            <span className="text-[11px] text-gray-500">
                              ({subjectCount})
                            </span>
                          )}
                        </label>
                      );
                    })}
                    {!subjects.length && (
                      <p className="text-xs text-gray-500">
                        No subjects found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            <section className="bg-[#ffffff] rounded-md">
              <div className="px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>Chapters</span>
                <label className="flex items-center gap-1 text-[11px] font-normal text-gray-600">
                  <input
                    type="checkbox"
                    className="scale-90"
                    checked={allChaptersSelected}
                    onChange={handleToggleAllChapters}
                    disabled={loadingChapters || !chapters.length}
                  />
                  <span>Select all</span>
                </label>
              </div>
              <div className="px-4 py-3">
                {loadingChapters ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 animate-pulse">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-6 bg-gray-200 rounded"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {chapters.map((chapter) => {
                      const disabled = !selectedSubjectIds.includes(
                        chapter.subjectId
                      );
                      const chapterCount =
                        chapterQuestionCounts[chapter.id] ?? undefined;
                      const isExpanded = expandedChapters.includes(chapter.id);
                      return (
                        <div
                          key={chapter.id}
                          className="border rounded px-2 py-1 text-xs md:text-sm bg-white"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <label
                              className={`flex items-center gap-2 ${
                                disabled
                                  ? "cursor-not-allowed text-gray-400"
                                  : "cursor-pointer"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedChapterIds.includes(
                                  chapter.id
                                )}
                                onChange={() =>
                                  !disabled &&
                                  setSelectedChapterIds((prev) =>
                                    toggleSelection(prev, chapter.id)
                                  )
                                }
                                disabled={disabled}
                                className="scale-90"
                              />
                              <span>{chapter.name}</span>
                              {chapterCount !== undefined && (
                                <span className="text-[11px] text-gray-500">
                                  ({chapterCount})
                                </span>
                              )}
                            </label>
                            <button
                              type="button"
                              onClick={() => handleToggleChapterExpand(chapter.id)}
                              className="text-gray-500 hover:text-gray-700 text-xs"
                            >
                              {isExpanded ? "−" : "+"}
                            </button>
                          </div>
                          {isExpanded && (
                            <div className="mt-2 pl-6 space-y-1">
                              {loadingTopicsByChapter[chapter.id] ? (
                                <p className="text-[11px] text-gray-500">
                                  Loading topics...
                                </p>
                              ) : (
                                <>
                                  {(topicsByChapter[chapter.id] || []).map(
                                    (topic) => {
                                      const topicCount =
                                        topicQuestionCounts[topic.id] ??
                                        undefined;
                                      return (
                                        <label
                                          key={topic.id}
                                          className="flex items-center justify-between gap-2 text-[11px] md:text-xs cursor-pointer"
                                        >
                                          <span className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              className="scale-90"
                                              checked={selectedTopicIds.includes(
                                                topic.id
                                              )}
                                              onChange={() =>
                                                setSelectedTopicIds((prev) =>
                                                  toggleSelection(prev, topic.id)
                                                )
                                              }
                                            />
                                            <span>{topic.name}</span>
                                          </span>
                                          {topicCount !== undefined && (
                                            <span className="text-[11px] text-gray-500">
                                              ({topicCount})
                                            </span>
                                          )}
                                        </label>
                                      );
                                    }
                                  )}
                                  {!(
                                    topicsByChapter[chapter.id] &&
                                    topicsByChapter[chapter.id].length
                                  ) && (
                                    <p className="text-[11px] text-gray-400">
                                      No topics found.
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {!chapters.length && (
                      <p className="text-xs text-gray-500">No chapters found.</p>
                    )}
                  </div>
                )}
              </div>
            </section>

            <section className="bg-[#ffffff] rounded-md bg-gray-50">
              <div className="px-4 py-3 text-sm font-semibold text-gray-700">
                No. of Questions
              </div>
              <div className="px-4 py-3 space-y-2 text-xs md:text-sm text-gray-700">
                <p>
                  QBank:{" "}
                  <span className="font-semibold">
                    {availableQuestionCount}
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span>Number of questions:</span>
                  <input
                    type="number"
                    min={1}
                    max={Math.min(
                      QUESTION_PER_TEST_LIMIT,
                      Math.max(availableQuestionCount, 1)
                    )}
                    value={questionCount}
                    onChange={(e) =>
                      setQuestionCount(Number(e.target.value) || 0)
                    }
                    className="w-24 px-3 py-1 border rounded text-sm"
                  />
                  <span className="text-[11px] text-gray-500">
                    Max {QUESTION_PER_TEST_LIMIT} allowed per block
                  </span>
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-2 pb-4">
              <button
                type="button"
                onClick={handleCreateTest}
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                disabled={loadingQuestions}
              >
                Generate Test
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

