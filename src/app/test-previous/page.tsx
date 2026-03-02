"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import QBankSidebar from "@/component/qbank/QBankSidebar";
import { BiCheckCircle, BiChevronLeft, BiChevronRight, BiPlay, BiPlayCircle } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { HiDocumentReport, HiDocumentText } from "react-icons/hi";
import { FaChartBar } from "react-icons/fa";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

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
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageOptions] = useState([5, 10, 25, 50, 100]);

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
        setCurrentPage(1); // Reset to first page when data loads
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
    router.push(`/test-run?id=${row.id}`);
  };

  const handleResult = (row: TestAttemptRow) => router.push(`/test-analysis/${row.id}?tab=result`);
  const handleAnalysis = (row: TestAttemptRow) => router.push(`/test-analysis/${row.id}?tab=analysis`);

  // Filter rows based on status
  const filteredRows = rows.filter(row => {
    if (filter === "all") return true;
    return row.status === filter;
  });

  // Pagination logic
  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRows = filteredRows.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const tableHeaders = [
    { label: "Score", align: "left" },
    { label: "Name", align: "left" },
    { label: "Date", align: "left" },
    { label: "Mode", align: "left" },
    { label: "Question Pool", align: "left" },
    { label: "Subjects", align: "left" },
    { label: "Chapters", align: "left" },
    { label: "Qs", align: "center" },
    { label: "Actions", align: "center" },
  ];

  return (
    <main className="min-h-screen bg-[#f3f3f4] w-full">
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
                    onClick={() => {
                      setFilter(tab.value as any);
                      setCurrentPage(1); // Reset to first page when filter changes
                    }}
                    className={`cursor-pointer px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${filter === tab.value
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
            <div className="bg-white rounded shadow-xl border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Test History</h2>
                
                {/* Items per page selector */}
                {!loading && filteredRows.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="border border-gray-300 cursor-pointer rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-600">entries</span>
                  </div>
                )}
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
                  <>
                    <table className="w-full">
                      {/* Table Head */}
                      <thead className="border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                          {tableHeaders.map((header, index) => (
                            <th
                              key={index}
                              className={`px-6 py-3 ${header.align === "center" ? "text-center" : "text-left"}`}
                            >
                              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                {header.label}
                              </h3>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody className="divide-y divide-gray-100">
                        {currentRows.map((row, index) => {
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
                                    <p className="text-md font-semibold text-gray-900 truncate">
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
                                <p className="text-sm text-gray-500 mt-1"> {row.totalQuestions}</p>
                              </td>

                              {/* Actions Cell */}
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="flex items-center justify-center space-x-1">
                                  <button
                                    onClick={() => handleResume(row)}
                                    className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md cursor-pointer"
                                    title="Resume Test"
                                  >
                                    <BiPlay className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleResult(row)}
                                    className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md cursor-pointer"
                                    title="View Results"
                                  >
                                    <HiDocumentReport className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleAnalysis(row)}
                                    className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm hover:shadow-md cursor-pointer"
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

                    {/* Pagination */}
                    {totalPages > 0 && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{endIndex}</span> of{' '}
                            <span className="font-medium">{totalItems}</span> results
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={goToPreviousPage}
                              disabled={currentPage === 1}
                              className={`relative inline-flex items-center px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-200 ${
                                currentPage === 1
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                              }`}
                            >
                              <BiChevronLeft className="h-4 w-4 mr-1" />
                              Previous
                            </button>
                            
                            <div className="flex items-center space-x-1">
                              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                  pageNum = idx + 1;
                                } else if (currentPage <= 3) {
                                  pageNum = idx + 1;
                                } else if (currentPage >= totalPages - 2) {
                                  pageNum = totalPages - 4 + idx;
                                } else {
                                  pageNum = currentPage - 2 + idx;
                                }
                                
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => goToPage(pageNum)}
                                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                                      currentPage === pageNum
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>
                            
                            <button
                              onClick={goToNextPage}
                              disabled={currentPage === totalPages}
                              className={`relative inline-flex items-center px-3 py-2 rounded-md border text-sm font-medium transition-colors duration-200 ${
                                currentPage === totalPages
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                              }`}
                            >
                              Next
                              <BiChevronRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}