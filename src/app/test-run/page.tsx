"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  description?: string;
  optionExplanations?: string[];
};

type ActiveTest = {
  mode: "tutor" | "timed";
  totalQuestions: number;
  questions: Question[];
  createdAt: string;
};

type AnswerState = {
  [questionId: string]: {
    selectedOption: string | null;
    isCorrect: boolean | null;
    showExplanation: boolean;
    timeSpentSeconds?: number;
  };
};

export default function TestRunPage() {
  const router = useRouter();

  const [test, setTest] = useState<ActiveTest | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
   const [marked, setMarked] = useState<Record<string, boolean>>({});
   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
   const [elapsedSeconds, setElapsedSeconds] = useState(0);
   const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = window.sessionStorage.getItem("activeTest");
      if (!raw) {
        router.replace("/test-create");
        return;
      }
      const parsed = JSON.parse(raw) as ActiveTest;
      if (!parsed.questions || !parsed.questions.length) {
        router.replace("/test-create");
        return;
      }
      setTest(parsed);
      setQuestionStartTime(Date.now());
    } catch {
      router.replace("/test-create");
    }
  }, [router]);

  useEffect(() => {
    if (!test) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [test]);

  useEffect(() => {
    if (!test) return;
    setQuestionStartTime(Date.now());
  }, [currentIndex, test]);

  const currentQuestion = useMemo(() => {
    if (!test) return null;
    return test.questions[currentIndex] || null;
  }, [test, currentIndex]);

  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;
    const isCorrect = option === currentQuestion.correctAnswer;
    const now = Date.now();
    const timeSpentSeconds = questionStartTime
      ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
      : undefined;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {}),
        selectedOption: option,
        isCorrect,
        showExplanation: true,
        timeSpentSeconds,
      },
    }));
  };

  const handleNext = () => {
    if (!test) return;
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  const toggleMarkCurrent = () => {
    if (!currentQuestion) return;
    setMarked((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleEndTest = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("activeTest");
    }
    router.replace("/");
  };

  const getQuestionStatus = (question: Question) => {
    const state = answers[question.id];
    if (!state || !state.selectedOption) return "unanswered";
    if (state.isCorrect) return "correct";
    return "incorrect";
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  if (!test || !currentQuestion) {
    return (
      <main className="w-full min-h-[calc(100vh-120px)] bg-gray-100">
        <div className="w-full h-full flex flex-col md:flex-row border-t md:border-t-0">
          <aside className="hidden md:block w-48 border-r bg-gray-50">
            <div className="px-3 py-2 border-b bg-white text-xs font-semibold">
              Items
            </div>
            <div className="p-2 space-y-2 animate-pulse">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="h-7 rounded bg-gray-200"
                />
              ))}
            </div>
          </aside>
          <section className="flex-1 flex flex-col bg-white">
            <header className="flex items-center justify-between px-4 py-2 border-b bg-blue-900 text-white text-xs md:text-sm">
              <div className="flex flex-col gap-1 animate-pulse">
                <div className="h-3 w-32 bg-blue-700 rounded" />
                <div className="h-2 w-24 bg-blue-700 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-blue-800 rounded" />
                <div className="h-6 w-16 bg-red-600 rounded" />
              </div>
            </header>
            <div className="flex-1 flex flex-col lg:flex-row">
              <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-6">
                <div className="space-y-2 mb-6 animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-11/12" />
                  <div className="h-3 bg-gray-200 rounded w-10/12" />
                </div>
                <div className="space-y-3 mb-4 animate-pulse">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-9 bg-gray-200 rounded"
                    />
                  ))}
                </div>
                <div className="mt-4 h-16 bg-gray-100 rounded animate-pulse" />
              </div>
              <aside className="w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l bg-gray-50 flex flex-col">
                <div className="px-4 py-3 border-b text-xs font-semibold text-gray-700">
                  Explanation
                </div>
                <div className="flex-1 px-4 py-3 space-y-2 animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-10/12" />
                  <div className="h-3 bg-gray-200 rounded w-11/12" />
                  <div className="h-3 bg-gray-200 rounded w-9/12" />
                  <div className="h-3 bg-gray-200 rounded w-8/12" />
                </div>
              </aside>
            </div>
            <footer className="flex items-center justify-between px-4 py-2 border-t bg-blue-900 text-white text-xs md:text-sm">
              <div className="h-3 w-40 bg-blue-800 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-blue-800 rounded animate-pulse" />
                <div className="h-6 w-16 bg-blue-800 rounded animate-pulse" />
              </div>
            </footer>
          </section>
        </div>
      </main>
    );
  }

  const currentState = answers[currentQuestion.id];
  const currentStatus = getQuestionStatus(currentQuestion);

  const currentExplanation =
    currentState &&
    currentState.selectedOption &&
    currentState.selectedOption !== currentQuestion.correctAnswer
      ? currentQuestion.optionExplanations?.[
          currentQuestion.options.indexOf(currentState.selectedOption)
        ]
      : currentQuestion.description;

  const correctIndex = currentQuestion.options.indexOf(
    currentQuestion.correctAnswer
  );

  const answeredCorrectPercent =
    currentState && currentState.isCorrect != null
      ? currentState.isCorrect
        ? 100
        : 0
      : null;

  const currentTimeSpent = currentState?.timeSpentSeconds;

  const isCurrentMarked = marked[currentQuestion.id];

  return (
    <main className="w-full min-h-[calc(100vh-120px)] bg-gray-100">
      <div className="w-full flex flex-col md:flex-row h-[calc(100vh-120px)] border-t md:border-t-0 bg-white">
        <aside className="w-full md:w-48 border-b md:border-b-0 md:border-r bg-gray-50">
          <div className="px-3 py-2 border-b bg-white text-xs font-semibold">
            Items
          </div>
          <div className="p-2 grid grid-cols-10 md:grid-cols-1 gap-1 text-xs">
            {test.questions.map((q, idx) => {
              const status = getQuestionStatus(q);
              const isActive = idx === currentIndex;
              const isMarked = marked[q.id];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center ${
                    isActive ? "border-blue-600" : "border-gray-300"
                  } ${
                    status === "correct"
                      ? "bg-green-100 text-green-700"
                      : status === "incorrect"
                      ? "bg-red-100 text-red-700"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="flex-1 text-left md:text-center">
                    {idx + 1}
                  </span>
                  {isMarked && (
                    <span className="hidden md:inline-block text-[10px] text-yellow-500 ml-1">
                      ⚑
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex-1 flex flex-col bg-white">
          <header className="flex items-center justify-between px-4 py-2 border-b bg-blue-900 text-white text-xs md:text-sm">
            <div className="flex flex-col">
              <div className="font-semibold">
                Item {currentIndex + 1} of {test.questions.length}
              </div>
              <div className="text-[11px] opacity-80">
                Question Id: {currentQuestion.id}
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={toggleMarkCurrent}
                className={`px-2 py-1 rounded border text-[11px] md:text-xs ${
                  isCurrentMarked
                    ? "bg-yellow-400 text-black border-yellow-300"
                    : "bg-blue-800 border-blue-700 text-white"
                }`}
              >
                {isCurrentMarked ? "Unmark" : "Mark"}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden md:inline-flex px-2 py-1 rounded border border-blue-700 bg-blue-800 text-[11px]"
              >
                {isFullscreen ? "Exit Full Screen" : "Full Screen"}
              </button>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-2 md:px-3 py-1 rounded border border-blue-700 bg-blue-800 disabled:opacity-50 text-[11px] md:text-xs"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === test.questions.length - 1}
                className="px-2 md:px-3 py-1 rounded border border-blue-700 bg-blue-800 disabled:opacity-50 text-[11px] md:text-xs"
              >
                Next
              </button>
              <button
                type="button"
                onClick={handleEndTest}
                className="px-2 md:px-3 py-1 bg-red-600 rounded text-[11px] md:text-xs"
              >
                End Test
              </button>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-6">
              <div className="prose prose-sm max-w-none mb-6">
                <div
                  className="text-gray-900 text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
              </div>

              <div className="space-y-3 mb-4">
                {currentQuestion.options.map((option, idx) => {
                  const selected =
                    currentState && currentState.selectedOption === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const showFeedback = !!currentState;

                  let optionClass =
                    "flex items-center gap-3 px-3 py-2 border rounded cursor-pointer text-sm";

                  if (showFeedback) {
                    if (isCorrect) {
                      optionClass +=
                        " border-green-500 bg-green-50 text-green-800";
                    } else if (selected && !isCorrect) {
                      optionClass += " border-red-500 bg-red-50 text-red-800";
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className={optionClass}
                    >
                      <span className="text-xs font-semibold w-5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1 text-left">{option}</span>
                    </button>
                  );
                })}
              </div>

              {currentState && (
                <div className="mt-4 border rounded bg-gray-50">
                  <div
                    className={`flex flex-wrap items-center gap-4 px-4 py-3 border-l-4 ${
                      currentStatus === "correct"
                        ? "border-green-600"
                        : "border-red-600"
                    }`}
                  >
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          currentStatus === "correct"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {currentStatus === "correct" ? "Correct" : "Incorrect"}
                      </div>
                      <div className="text-xs text-gray-700">
                        Correct answer{" "}
                        {correctIndex !== -1
                          ? String.fromCharCode(65 + correctIndex)
                          : ""}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-wrap gap-6 text-xs text-gray-700">
                      {answeredCorrectPercent != null && (
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold">
                            {answeredCorrectPercent}%
                          </span>
                          <span>Answered correctly</span>
                        </div>
                      )}
                      {currentTimeSpent != null && (
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold">
                            {currentTimeSpent} secs
                          </span>
                          <span>Time Spent</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <aside className="w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l bg-gray-50 flex flex-col">
              <div className="px-4 py-3 border-b text-xs font-semibold text-gray-700">
                Explanation
              </div>
              <div className="flex-1 overflow-auto px-4 py-3">
                {currentState && currentState.showExplanation ? (
                  <>
                    {currentStatus !== "correct" &&
                      currentState.selectedOption &&
                      currentState.selectedOption !==
                        currentQuestion.correctAnswer &&
                      currentExplanation && (
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-red-700 mb-1">
                            Why this answer is incorrect
                          </div>
                          <div
                            className="prose prose-sm max-w-none text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: currentExplanation,
                            }}
                          />
                        </div>
                      )}

                    {currentQuestion.description && (
                      <div>
                        <div className="text-xs font-semibold text-green-700 mb-1">
                          Why the correct answer is right (
                          {correctIndex !== -1
                            ? String.fromCharCode(65 + correctIndex)
                            : ""}
                          )
                        </div>
                        <div
                          className="prose prose-sm max-w-none text-gray-800"
                          dangerouslySetInnerHTML={{
                            __html: currentQuestion.description,
                          }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-gray-500">
                    Explanation will appear after you select an answer.
                  </p>
                )}
              </div>
            </aside>
          </div>

          <footer className="flex items-center justify-between px-4 py-2 border-t bg-blue-900 text-white text-xs md:text-sm">
            <div>
              Block Time Elapsed: {formatTime(elapsedSeconds)}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-2 md:px-3 py-1 rounded border border-blue-700 bg-blue-800 disabled:opacity-50 text-[11px] md:text-xs"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === test.questions.length - 1}
                className="px-2 md:px-3 py-1 rounded border border-blue-700 bg-blue-800 disabled:opacity-50 text-[11px] md:text-xs"
              >
                Next
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
