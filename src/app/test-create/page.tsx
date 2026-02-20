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
};

type Topic = {
  id: string;
  name: string;
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
  const [topics, setTopics] = useState<Topic[]>([]);
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
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

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
      if (!selectedSubjectIds.length) {
        setChapters([]);
        return;
      }
      try {
        setLoadingChapters(true);
        const all: Chapter[] = [];
        for (const subjectId of selectedSubjectIds) {
          const data = await api.get(
            `${endPointApi.getChapterBySubject}/${subjectId}`
          );
          const list = data.data || data || [];
          for (const ch of list) {
            all.push({
              id: ch.id || ch._id,
              name: ch.name,
            });
          }
        }
        setChapters(all);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load chapters");
      } finally {
        setLoadingChapters(false);
      }
    };
    loadChapters();
  }, [selectedSubjectIds]);

  useEffect(() => {
    const loadTopics = async () => {
      if (!selectedChapterIds.length) {
        setTopics([]);
        return;
      }
      try {
        setLoadingTopics(true);
        const all: Topic[] = [];
        for (const chapterId of selectedChapterIds) {
          const data = await api.get(
            `${endPointApi.getTopicByChapter}/${chapterId}`
          );
          const list = data.data || data || [];
          for (const t of list) {
            all.push({
              id: t.id || t._id,
              name: t.name,
            });
          }
        }
        setTopics(all);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load topics");
      } finally {
        setLoadingTopics(false);
      }
    };
    loadTopics();
  }, [selectedChapterIds]);

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

  const allChaptersSelected =
    chapters.length > 0 && selectedChapterIds.length === chapters.length;

  const allTopicsSelected =
    topics.length > 0 && selectedTopicIds.length === topics.length;

  const handleToggleAllSubjects = () => {
    if (allSubjectsSelected) {
      setSelectedSubjectIds([]);
    } else {
      setSelectedSubjectIds(subjects.map((s) => s.id));
    }
  };

  const handleToggleAllChapters = () => {
    if (allChaptersSelected) {
      setSelectedChapterIds([]);
    } else {
      setSelectedChapterIds(chapters.map((c) => c.id));
    }
  };

  const handleToggleAllTopics = () => {
    if (allTopicsSelected) {
      setSelectedTopicIds([]);
    } else {
      setSelectedTopicIds(topics.map((t) => t.id));
    }
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
              <div className="px-4 py-3 flex items-center gap-4">
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
                    {subjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjectIds.includes(subject.id)}
                          onChange={() =>
                            setSelectedSubjectIds((prev) =>
                              toggleSelection(prev, subject.id)
                            )
                          }
                          className="scale-90"
                        />
                        <span>{subject.name}</span>
                      </label>
                    ))}
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
                    {chapters.map((chapter) => (
                      <label
                        key={chapter.id}
                        className="flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedChapterIds.includes(chapter.id)}
                          onChange={() =>
                            setSelectedChapterIds((prev) =>
                              toggleSelection(prev, chapter.id)
                            )
                          }
                          className="scale-90"
                        />
                        <span>{chapter.name}</span>
                      </label>
                    ))}
                    {!chapters.length && (
                      <p className="text-xs text-gray-500">
                        Select subjects to load chapters.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            <section className="bg-[#ffffff] rounded-md">
              <div className="px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>Topics</span>
                <label className="flex items-center gap-1 text-[11px] font-normal text-gray-600">
                  <input
                    type="checkbox"
                    className="scale-90"
                    checked={allTopicsSelected}
                    onChange={handleToggleAllTopics}
                    disabled={loadingTopics || !topics.length}
                  />
                  <span>Select all</span>
                </label>
              </div>
              <div className="px-4 py-3">
                {loadingTopics ? (
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
                    {topics.map((topic) => (
                      <label
                        key={topic.id}
                        className="flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopicIds.includes(topic.id)}
                          onChange={() =>
                            setSelectedTopicIds((prev) =>
                              toggleSelection(prev, topic.id)
                            )
                          }
                          className="scale-90"
                        />
                        <span>{topic.name}</span>
                      </label>
                    ))}
                    {!topics.length && (
                      <p className="text-xs text-gray-500">
                        Select chapters to load topics.
                      </p>
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

