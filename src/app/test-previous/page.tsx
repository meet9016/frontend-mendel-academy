"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import QBankSidebar from "@/component/qbank/QBankSidebar";
import { BiCheckCircle, BiPlay, BiPlayCircle, BiXCircle } from "react-icons/bi";
import { BsClock, BsThreeDotsVertical } from "react-icons/bs";
import { HiDocumentReport, HiDocumentText, HiQuestionMarkCircle } from "react-icons/hi";
import { FaChartBar, FaChartPie } from "react-icons/fa";

type TestAttemptRow = {
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
  status: "in_progress" | "completed";
  questionPool?: string;
};

export default function PreviousTestsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<TestAttemptRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "in_progress">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(endPointApi.listTestAttempts as string);
        const list = res.data || [];
        const mapped: TestAttemptRow[] = (Array.isArray(list) ? list : []).map(
          (item: any) => ({
            id: item.id || item._id,
            mode: item.mode,
            subjects: item.subjects || [],
            chapters: item.chapters || [],
            totalQuestions: item.totalQuestions || 0,
            correctCount: item.correctCount || 0,
            incorrectCount: item.incorrectCount || 0,
            omittedCount: item.omittedCount || 0,
            startedAt: item.startedAt,
            completedAt: item.completedAt,
            status: item.status || "in_progress",
            questionPool: item.questionPool || "Full Syllabus",
          })
        );
        setRows(mapped);
      } catch (error) {
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatSubjects = (subjects: string[]) => {
    if (!subjects || subjects.length === 0) return "-";
    if (subjects.length === 1) return subjects[0];
    if (subjects.length === 2) return subjects.join(", ");
    return `${subjects[0]}, ${subjects[1]} +${subjects.length - 2}`;
  };

  const formatChapters = (chapters: string[]) => {
    if (!chapters || chapters.length === 0) return "-";
    if (chapters.length === 1) return chapters[0];
    if (chapters.length === 2) return chapters.join(", ");
    return `${chapters[0]}, ${chapters[1]} +${chapters.length - 2}`;
  };

  const handleResume = (row: TestAttemptRow) => {
    if (row.status === "in_progress") {
      router.push(`/test-run?id=${row.id}`);
    } else {
      router.push(`/test-analysis/${row.id}?tab=review`);
    }
  };

  const handleResult = (row: TestAttemptRow) => {
    router.push(`/test-analysis/${row.id}?tab=result`);
  };

  const handleAnalysis = (row: TestAttemptRow) => {
    router.push(`/test-analysis/${row.id}?tab=analysis`);
  };

  const filteredRows = rows.filter(row => {
    if (filter === "all") return true;
    return row.status === filter;
  });

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      <div className="w-full flex">
        <QBankSidebar active="previous" />

        <section className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Previous Tests</h1>
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
                {[
                  { value: "all", label: "All Tests" },
                  { value: "completed", label: "Completed" },
                  { value: "in_progress", label: "In Progress" }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilter(tab.value as any)}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${filter === tab.value
                        ? "bg-white text-gray-900 shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Enhanced Table with Headings */}
          <div className="px-6 pb-8 mt-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Test History</h2>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-sm text-gray-500">Loading tests...</p>
                  </div>
                ) : filteredRows.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <HiDocumentText className="h-16 w-16 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No tests found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {filter === "all"
                        ? "Get started by creating your first test."
                        : `No ${filter} tests found.`
                      }
                    </p>
                  </div>
                ) : (
                  <table className="w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Score</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Mode</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Question Pool</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Subjects</h3>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Chapters</h3>
                        </th>
                        <th className="px-6 py-3 text-center">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Qs</h3>
                        </th>
                        {/* <th className="px-6 py-3 text-center">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</h3>
                        </th> */}
                        <th className="px-6 py-3 text-center">
                          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</h3>
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-100">
                      {filteredRows.map((row, index) => {
                        const total = row.correctCount + row.incorrectCount + row.omittedCount;
                        const correctPercent = total > 0 ? Math.round((row.correctCount / total) * 100) : 0;

                        return (
                          <tr
                            key={row.id}
                            className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                              }`}
                          >
                            {/* Score Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm ${getScoreColor(correctPercent)}`}>
                                {correctPercent}%
                              </div>
                            </td>

                            {/* Name Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${row.status === 'completed'
                                    ? 'bg-green-100'
                                    : 'bg-yellow-100'
                                  }`}>
                                  {row.status === 'completed' ? (
                                    <BiCheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <BsClock className="w-4 h-4 text-yellow-600" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    Test - {formatDate(row.startedAt)}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Date Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600">{formatDate(row.startedAt)}</p>
                            </td>

                            {/* Mode Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${row.mode === 'tutor'
                                  ? 'bg-primary text-dark'
                                  : 'bg-primary text-dark'
                                }`}>
                                {row.mode === 'tutor' ? (
                                  <BiPlayCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <BsClock className="w-3 h-3 mr-1" />
                                )}
                                {row.mode}
                              </span>
                            </td>

                            {/* Question Pool Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600 truncate">{row.questionPool}</p>
                            </td>

                            {/* Subjects Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600 truncate">{formatSubjects(row.subjects)}</p>
                            </td>

                            {/* Chapters Cell */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="text-sm text-gray-600 truncate">{formatChapters(row.chapters)}</p>
                            </td>

                            {/* Questions Cell */}
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {/* <div className="flex items-center justify-center space-x-1">
                                <span className="flex items-center text-xs text-green-600">
                                  <BiCheckCircle className="w-3 h-3 mr-0.5" />
                                  {row.correctCount}
                                </span>
                                <span className="flex items-center text-xs text-red-600">
                                  <BiXCircle className="w-3 h-3 mr-0.5" />
                                  {row.incorrectCount}
                                </span>
                                <span className="flex items-center text-xs text-gray-500">
                                  <HiQuestionMarkCircle className="w-3 h-3 mr-0.5" />
                                  {row.omittedCount}
                                </span>
                              </div> */}
                              <p className="text-sm text-gray-500 mt-1"> {row.totalQuestions}</p>
                            </td>

                            {/* Status Cell */}
                            {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                row.status === 'completed' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {row.status === 'completed' ? (
                                  <>
                                    <BiCheckCircle className="w-3 h-3 mr-1" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <BsClock className="w-3 h-3 mr-1" />
                                    In Progress
                                  </>
                                )}
                              </span>
                            </td> */}

                            {/* Actions Cell */}
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <button
                                  onClick={() => handleResume(row)}
                                  className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                                  title="Resume Test"
                                >
                                  <BiPlay className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleResult(row)}
                                  className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md"
                                  title="View Results"
                                >
                                  <HiDocumentReport className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleAnalysis(row)}
                                  className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm hover:shadow-md"
                                  title="View Analysis"
                                >
                                  <FaChartBar className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
