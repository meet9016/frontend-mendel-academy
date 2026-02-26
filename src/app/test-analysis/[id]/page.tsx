"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import QBankSidebar from "@/component/qbank/QBankSidebar";
import {
  FiPrinter,
  FiFileText,
  FiList,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiMinusCircle,
  FiTrendingUp,
  FiClock,
  FiBookOpen,
  FiTarget,
  FiBarChart2,
  FiAward,
  FiCalendar
} from "react-icons/fi";

type TestAttemptDetail = {
  id: string;
  mode: "tutor" | "timed";
  subjects: string[];
  chapters: string[];
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  omittedCount: number;
  startedAt: string;
  completedAt?: string;
  questionPool?: string;
  perQuestion?: any[];
  questions?: any[];
};

export default function TestAnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<"result" | "analysis" | "notes">("analysis");
  const [detail, setDetail] = useState<TestAttemptDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialTab = (searchParams.get("tab") as
      | "result"
      | "analysis"
      | "notes"
      | null) || "analysis";
    setTab(initialTab);
  }, [searchParams]);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `${endPointApi.getTestAttemptDetail}/${id}`
        );
        const d = res.data || {};
        setDetail({
          id: d.id || d._id,
          mode: d.mode,
          subjects: d.subjects || [],
          chapters: d.chapters || [],
          totalQuestions: d.totalQuestions || 0,
          correctCount: d.correctCount || 0,
          incorrectCount: d.incorrectCount || 0,
          omittedCount: d.omittedCount || 0,
          startedAt: d.startedAt,
          completedAt: d.completedAt,
          questionPool: d.questionPool || "Full Syllabus",
          perQuestion: d.perQuestion || [],
          questions: d.questions || [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const scores = useMemo(() => {
    if (!detail) {
      return {
        total: 0,
        correct: 0,
        incorrect: 0,
        omitted: 0,
        percentCorrect: 0,
        accuracy: 0,
        timeSpent: "N/A",
      };
    }
    const total =
      detail.correctCount + detail.incorrectCount + detail.omittedCount || 0;
    const percentCorrect =
      total > 0 ? Math.round((detail.correctCount / total) * 100) : 0;
    const accuracy = total > 0 ? Math.round((detail.correctCount / total) * 100) : 0;

    return {
      total,
      correct: detail.correctCount,
      incorrect: detail.incorrectCount,
      omitted: detail.omittedCount,
      percentCorrect,
      accuracy,
      timeSpent: detail.completedAt ? "45 min" : "N/A",
    };
  }, [detail]);

  const handleTabChange = (next: "result" | "analysis" | "notes") => {
    setTab(next);
    const params = new URLSearchParams(searchParams);
    params.set("tab", next);
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!detail && loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
        <div className="w-full flex">
          <QBankSidebar active="analysis" />
          <section className="flex-1">
            <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
            <div className="p-8 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
        <div className="w-full flex">
          <QBankSidebar active="analysis" />
          <section className="flex-1">
            <div className="h-16 bg-white border-b border-gray-200" />
            <div className="p-8">
              <div className="text-center py-20">
                <FiFileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Test not found</h3>
                <p className="text-sm text-gray-500 mb-4">The test you're looking for doesn't exist or has been removed.</p>
                <button
                  onClick={() => router.push("/test-previous")}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Previous Tests
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      <div className="w-full flex">
        <QBankSidebar active="analysis" />
        <section className="flex-1">
          {/* Enhanced Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 py-4">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <button
                  onClick={() => router.push("/test-previous")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Previous Tests
                </button>
                <span className="mx-2">/</span>
                <span className="text-gray-900">Test Analysis</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Test Analysis</h1>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(detail.startedAt)}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{detail.mode} Mode</span>
                    <span className="mx-2">•</span>
                    <span>{detail.questionPool}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                    <FiPrinter className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleTabChange("notes")} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Notes">
                    <FiFileText className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Question List">
                    <FiList className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>
          </header>

          {/* Enhanced Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6">
              <nav className="flex space-x-8">
                {[
                  { id: "result", label: "Test Results", icon: FiBarChart2 },
                  { id: "analysis", label: "Test Analysis", icon: FiTrendingUp },
                  { id: "notes", label: "My Notes", icon: FiFileText },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id as any)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${tab === id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="p-6">
            {tab === "analysis" && (
              <div className="space-y-6">
                {/* Score Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Total Score</span>
                      <FiAward className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{scores.percentCorrect}%</div>
                    <div className="text-xs text-gray-500 mt-1">Overall Performance</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Correct</span>
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{scores.correct}</div>
                    <div className="text-xs text-gray-500 mt-1">out of {scores.total}</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Incorrect</span>
                      <FiXCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-red-600">{scores.incorrect}</div>
                    <div className="text-xs text-gray-500 mt-1">need improvement</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Omitted</span>
                      <FiMinusCircle className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-600">{scores.omitted}</div>
                    <div className="text-xs text-gray-500 mt-1">not attempted</div>
                  </div>
                </div>

                {/* Detailed Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Score Visualization */}
                  <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
                    <div className="relative h-48 flex items-center justify-center">
                      <div className="relative">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#10b981"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(scores.percentCorrect / 100) * 440}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold text-gray-900">{scores.percentCorrect}%</div>
                          <div className="text-sm text-gray-500">Accuracy</div>
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Correct</span>
                        </div>
                        <span className="text-sm font-medium">{scores.correct}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Incorrect</span>
                        </div>
                        <span className="text-sm font-medium">{scores.incorrect}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">Omitted</span>
                        </div>
                        <span className="text-sm font-medium">{scores.omitted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Test Information */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiTarget className="w-4 h-4" />
                            <span>Test Mode</span>
                          </div>
                          <div className="font-medium capitalize">{detail.mode}</div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiBookOpen className="w-4 h-4" />
                            <span>Subjects</span>
                          </div>
                          <div className="font-medium">
                            {detail.subjects.length > 0 ? detail.subjects.join(", ") : "All Subjects"}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiList className="w-4 h-4" />
                            <span>Total Questions</span>
                          </div>
                          <div className="font-medium">{detail.totalQuestions}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiClock className="w-4 h-4" />
                            <span>Time Spent</span>
                          </div>
                          <div className="font-medium">{scores.timeSpent}</div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiCalendar className="w-4 h-4" />
                            <span>Started At</span>
                          </div>
                          <div className="font-medium">{formatDate(detail.startedAt)}</div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <FiBarChart2 className="w-4 h-4" />
                            <span>Question Pool</span>
                          </div>
                          <div className="font-medium">{detail.questionPool}</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Performance Indicators</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Accuracy</span>
                            <span className="font-medium">{scores.accuracy}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${scores.accuracy}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Completion Rate</span>
                            <span className="font-medium">
                              {Math.round(((scores.correct + scores.incorrect) / scores.total) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.round(((scores.correct + scores.incorrect) / scores.total) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "result" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Test Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <FiCheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-900">{scores.correct}</div>
                        <div className="text-sm text-green-700">Correct Answers</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500 rounded-lg">
                        <FiXCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-900">{scores.incorrect}</div>
                        <div className="text-sm text-red-700">Incorrect Answers</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-500 rounded-lg">
                        <FiMinusCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{scores.omitted}</div>
                        <div className="text-sm text-gray-700">Omitted Questions</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-900">
                    <FiTrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Overall Performance</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-800">
                    You scored {scores.percentCorrect}% with {scores.correct} correct answers out of {scores.total} questions.
                    {scores.percentCorrect >= 80 ? " Excellent work!" : scores.percentCorrect >= 60 ? " Good job! Keep practicing." : " Keep practicing to improve your score."}
                  </p>
                </div>
              </div>
            )}

            {tab === "notes" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                  My Notes
                </h3>
                <div className="space-y-6">
                  {(detail as any).perQuestion?.filter((pq: any) => pq.note && pq.note.trim() !== "").length > 0 ? (
                    (detail as any).perQuestion
                      .filter((pq: any) => pq.note && pq.note.trim() !== "")
                      .map((pq: any, index: number) => {
                        const q = (detail as any).questions?.find((item: any) => item.id === pq.questionId || item._id === pq.questionId);
                        return (
                          <div key={pq.questionId} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="font-medium text-gray-900 mb-2">
                              Question:
                              {q?.question ? (
                                <div className="text-sm mt-1 mb-3 bg-white p-3 rounded border border-gray-100 text-gray-700" dangerouslySetInnerHTML={{ __html: q.question }} />
                              ) : (
                                <span className="ml-2 text-sm text-gray-500">#{pq.questionId.slice(-6)}</span>
                              )}
                            </div>
                            <div className="text-gray-800 bg-white p-4 rounded-lg shadow-sm whitespace-pre-wrap">
                              {pq.note}
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="py-12 text-center">
                      <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">You did not save any notes during this test.</p>
                    </div>
                  )}
                </div>
              </div>
            )}


          </div>
        </section>
      </div>
    </main>
  );
}