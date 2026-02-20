// // "use client";

// // import { useEffect, useMemo, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { api } from "@/utils/axiosInstance";
// // import endPointApi from "@/utils/endPointApi";
// // import { toast } from "react-toastify";
// // import { 
// //   FiClock, 
// //   FiChevronLeft, 
// //   FiChevronRight, 
// //   FiFlag, 
// //   FiMaximize2, 
// //   FiMinimize2,
// //   FiBookOpen,
// //   FiCheckCircle,
// //   FiXCircle,
// //   FiAlertCircle
// // } from "react-icons/fi";

// // type Question = {
// //   id: string;
// //   question: string;
// //   options: string[];
// //   correctAnswer: string;
// //   description?: string;
// //   optionExplanations?: string[];
// // };

// // type ActiveTest = {
// //   id?: string;
// //   attemptId?: string;
// //   mode: "tutor" | "timed";
// //   totalQuestions: number;
// //   questions: Question[];
// //   createdAt: string;
// // };

// // type AnswerState = {
// //   [questionId: string]: {
// //     selectedOption: string | null;
// //     isCorrect: boolean | null;
// //     showExplanation: boolean;
// //     timeSpentSeconds?: number;
// //   };
// // };

// // export default function TestRunPage() {
// //   const router = useRouter();
// //   const [test, setTest] = useState<ActiveTest | null>(null);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState<AnswerState>({});
// //   const [marked, setMarked] = useState<Record<string, boolean>>({});
// //   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
// //   const [elapsedSeconds, setElapsedSeconds] = useState(0);
// //   const [isFullscreen, setIsFullscreen] = useState(false);
// //   const [showReviewPanel, setShowReviewPanel] = useState(false);

// //   useEffect(() => {
// //     try {
// //       if (typeof window === "undefined") return;
// //       const raw = window.sessionStorage.getItem("activeTest");
// //       if (!raw) {
// //         router.replace("/test-create");
// //         return;
// //       }
// //       const parsed = JSON.parse(raw) as ActiveTest;
// //       if (!parsed.questions || !parsed.questions.length) {
// //         router.replace("/test-create");
// //         return;
// //       }
// //       setTest(parsed);
// //       setQuestionStartTime(Date.now());
// //     } catch {
// //       router.replace("/test-create");
// //     }
// //   }, [router]);

// //   useEffect(() => {
// //     if (!test) return;
// //     const start = Date.now();
// //     const interval = setInterval(() => {
// //       setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
// //     }, 1000);
// //     return () => clearInterval(interval);
// //   }, [test]);

// //   useEffect(() => {
// //     if (!test) return;
// //     setQuestionStartTime(Date.now());
// //   }, [currentIndex, test]);

// //   const currentQuestion = useMemo(() => {
// //     if (!test) return null;
// //     return test.questions[currentIndex] || null;
// //   }, [test, currentIndex]);

// //   const handleSelectOption = (option: string) => {
// //     if (!currentQuestion) return;
// //     const isCorrect = option === currentQuestion.correctAnswer;
// //     const now = Date.now();
// //     const timeSpentSeconds = questionStartTime
// //       ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
// //       : undefined;
// //     setAnswers((prev) => ({
// //       ...prev,
// //       [currentQuestion.id]: {
// //         ...(prev[currentQuestion.id] || {}),
// //         selectedOption: option,
// //         isCorrect,
// //         showExplanation: true,
// //         timeSpentSeconds,
// //       },
// //     }));
// //   };

// //   const handleNext = () => {
// //     if (!test) return;
// //     if (currentIndex < test.questions.length - 1) {
// //       setCurrentIndex((idx) => idx + 1);
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (currentIndex > 0) {
// //       setCurrentIndex((idx) => idx - 1);
// //     }
// //   };

// //   const toggleMarkCurrent = () => {
// //     if (!currentQuestion) return;
// //     setMarked((prev) => ({
// //       ...prev,
// //       [currentQuestion.id]: !prev[currentQuestion.id],
// //     }));
// //   };

// //   const toggleFullscreen = () => {
// //     if (typeof document === "undefined") return;
// //     if (!document.fullscreenElement) {
// //       document.documentElement.requestFullscreen?.().then(() => {
// //         setIsFullscreen(true);
// //       });
// //     } else {
// //       document.exitFullscreen?.().then(() => {
// //         setIsFullscreen(false);
// //       });
// //     }
// //   };

// //   const handleEndTest = async () => {
// //     if (!test) {
// //       if (typeof window !== "undefined") {
// //         window.sessionStorage.removeItem("activeTest");
// //       }
// //       router.replace("/");
// //       return;
// //     }

// //     const questionIds = test.questions.map((q) => q.id);
// //     let correctCount = 0;
// //     let incorrectCount = 0;
// //     let omittedCount = 0;

// //     const perQuestion = questionIds.map((id) => {
// //       const state = answers[id];
// //       const isAnswered = !!state && !!state.selectedOption;
// //       const isCorrect = !!state && state.isCorrect === true;
// //       if (!isAnswered) {
// //         omittedCount += 1;
// //       } else if (isCorrect) {
// //         correctCount += 1;
// //       } else {
// //         incorrectCount += 1;
// //       }
// //       return {
// //         questionId: id,
// //         isCorrect,
// //         isAnswered,
// //       };
// //     });

// //     const attemptId = (test as any).attemptId || (test as any).id;

// //     if (attemptId) {
// //       try {
// //         await api.patch(
// //           `${endPointApi.completeTestAttempt}/${attemptId}`,
// //           {
// //             correctCount,
// //             incorrectCount,
// //             omittedCount,
// //             perQuestion,
// //             completedAt: new Date().toISOString(),
// //           }
// //         );
// //       } catch (error: any) {
// //         toast.error(
// //           error?.response?.data?.message || "Failed to save test result"
// //         );
// //       }
// //     }

// //     if (typeof window !== "undefined") {
// //       window.sessionStorage.removeItem("activeTest");
// //     }
// //     router.replace("/");
// //   };

// //   const getQuestionStatus = (question: Question) => {
// //     const state = answers[question.id];
// //     if (!state || !state.selectedOption) return "unanswered";
// //     if (state.isCorrect) return "correct";
// //     return "incorrect";
// //   };

// //   const formatTime = (totalSeconds: number) => {
// //     const hours = Math.floor(totalSeconds / 3600);
// //     const minutes = Math.floor((totalSeconds % 3600) / 60);
// //     const seconds = totalSeconds % 60;
// //     const hh = hours.toString().padStart(2, "0");
// //     const mm = minutes.toString().padStart(2, "0");
// //     const ss = seconds.toString().padStart(2, "0");
// //     return `${hh}:${mm}:${ss}`;
// //   };

// //   if (!test || !currentQuestion) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="flex h-screen">
// //           <div className="w-20 bg-white border-r border-gray-200 flex-shrink-0">
// //             <div className="p-4 space-y-2">
// //               {Array.from({ length: 20 }).map((_, i) => (
// //                 <div key={i} className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
// //               ))}
// //             </div>
// //           </div>
// //           <div className="flex-1 flex flex-col">
// //             <div className="bg-white border-b border-gray-200 p-4 animate-pulse">
// //               <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
// //               <div className="h-4 bg-gray-200 rounded w-32" />
// //             </div>
// //             <div className="flex-1 p-6 space-y-4">
// //               <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
// //               <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse" />
// //               <div className="space-y-3 mt-6">
// //                 {Array.from({ length: 4 }).map((_, i) => (
// //                   <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentState = answers[currentQuestion.id];
// //   const currentStatus = getQuestionStatus(currentQuestion);
// //   const isCurrentMarked = marked[currentQuestion.id];
// //   const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="flex h-screen">
// //         {/* Question Navigation Sidebar */}
// //         <div className="w-20 bg-white border-r border-gray-200 flex-shrink-0">
// //           <div className="p-4 space-y-2 overflow-y-auto h-full">
// //             {test.questions.map((q, idx) => {
// //               const status = getQuestionStatus(q);
// //               const isActive = idx === currentIndex;
// //               const isMarked = marked[q.id];
              
// //               return (
// //                 <button
// //                   key={q.id}
// //                   onClick={() => setCurrentIndex(idx)}
// //                   className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all ${
// //                     isActive
// //                       ? "border-blue-600 bg-blue-50 text-blue-600"
// //                       : status === "correct"
// //                       ? "border-green-500 bg-green-50 text-green-700"
// //                       : status === "incorrect"
// //                       ? "border-red-500 bg-red-50 text-red-700"
// //                       : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
// //                   }`}
// //                 >
// //                   {idx + 1}
// //                   {isMarked && (
// //                     <FiFlag className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500" />
// //                   )}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* Main Content Area */}
// //         <div className="flex-1 flex flex-col">
// //           {/* Header */}
// //           <header className="bg-white border-b border-gray-200 px-6 py-4">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-6">
// //                 <div>
// //                   <h1 className="text-lg font-semibold text-gray-900">
// //                     Question {currentIndex + 1} of {test.questions.length}
// //                   </h1>
// //                   <p className="text-sm text-gray-500 mt-1">
// //                     {test.mode === "tutor" ? "Tutor Mode" : "Timed Test"}
// //                   </p>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-sm text-gray-600">
// //                   <FiClock className="w-4 h-4" />
// //                   <span className="font-medium">{formatTime(elapsedSeconds)}</span>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-center gap-3">
// //                 <button
// //                   onClick={toggleMarkCurrent}
// //                   className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
// //                     isCurrentMarked
// //                       ? "bg-yellow-50 border-yellow-300 text-yellow-700"
// //                       : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
// //                   }`}
// //                 >
// //                   <FiFlag className="w-4 h-4" />
// //                   <span className="text-sm font-medium">
// //                     {isCurrentMarked ? "Marked" : "Mark"}
// //                   </span>
// //                 </button>
                
// //                 <button
// //                   onClick={toggleFullscreen}
// //                   className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
// //                 >
// //                   {isFullscreen ? <FiMinimize2 className="w-4 h-4" /> : <FiMaximize2 className="w-4 h-4" />}
// //                 </button>
                
// //                 <button
// //                   onClick={handleEndTest}
// //                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-medium"
// //                 >
// //                   End Test
// //                 </button>
// //               </div>
// //             </div>
// //           </header>

// //           {/* Question and Options */}
// //           <div className="flex-1 overflow-auto">
// //             <div className="max-w-4xl mx-auto p-6">
// //               {/* Question */}
// //               <div className="bg-white rounded-xl p-6 mb-6">
// //                 <div className="flex items-start gap-3">
// //                   <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
// //                     {currentIndex + 1}
// //                   </span>
// //                   <div 
// //                     className="prose prose-sm max-w-none text-gray-900"
// //                     dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Options */}
// //               <div className="bg-white rounded-xl p-6 space-y-3">
// //                 {currentQuestion.options.map((option, idx) => {
// //                   const isSelected = currentState?.selectedOption === option;
// //                   const isCorrect = option === currentQuestion.correctAnswer;
// //                   const showFeedback = !!currentState;
                  
// //                   return (
// //                     <button
// //                       key={option}
// //                       onClick={() => handleSelectOption(option)}
// //                       className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
// //                         showFeedback
// //                           ? isCorrect
// //                             ? "border-green-500 bg-green-50"
// //                             : isSelected
// //                             ? "border-red-500 bg-red-50"
// //                             : "border-gray-200 bg-gray-50"
// //                           : isSelected
// //                           ? "border-blue-500 bg-blue-50"
// //                           : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium">
// //                           {String.fromCharCode(65 + idx)}
// //                         </span>
// //                         <span className="flex-1 text-gray-900">{option}</span>
// //                         {showFeedback && (
// //                           <span className="flex-shrink-0">
// //                             {isCorrect ? (
// //                               <FiCheckCircle className="w-5 h-5 text-green-600" />
// //                             ) : isSelected ? (
// //                               <FiXCircle className="w-5 h-5 text-red-600" />
// //                             ) : null}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </button>
// //                   );
// //                 })}
// //               </div>

// //               {/* Answer Feedback */}
// //               {currentState && (
// //                 <div className={`mt-6 p-4 rounded-lg border-2 ${
// //                   currentStatus === "correct"
// //                     ? "bg-green-50 border-green-200"
// //                     : "bg-red-50 border-red-200"
// //                 }`}>
// //                   <div className="flex items-center gap-3">
// //                     {currentStatus === "correct" ? (
// //                       <FiCheckCircle className="w-6 h-6 text-green-600" />
// //                     ) : (
// //                       <FiXCircle className="w-6 h-6 text-red-600" />
// //                     )}
// //                     <div>
// //                       <p className={`font-semibold ${
// //                         currentStatus === "correct" ? "text-green-800" : "text-red-800"
// //                       }`}>
// //                         {currentStatus === "correct" ? "Correct Answer!" : "Incorrect Answer"}
// //                       </p>
// //                       <p className="text-sm text-gray-600 mt-1">
// //                         The correct answer is <span className="font-medium">
// //                           {String.fromCharCode(65 + correctIndex)}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Navigation Footer */}
// //           <footer className="bg-white border-t border-gray-200 px-6 py-4">
// //             <div className="flex items-center justify-between">
// //               <button
// //                 onClick={handlePrevious}
// //                 disabled={currentIndex === 0}
// //                 className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
// //               >
// //                 <FiChevronLeft className="w-4 h-4" />
// //                 <span className="text-sm font-medium">Previous</span>
// //               </button>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-sm text-gray-500">
// //                   Progress: {currentIndex + 1}/{test.questions.length}
// //                 </span>
// //                 <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
// //                   <div 
// //                     className="h-full bg-blue-600 transition-all duration-300"
// //                     style={{ width: `${((currentIndex + 1) / test.questions.length) * 100}%` }}
// //                   />
// //                 </div>
// //               </div>
              
// //               <button
// //                 onClick={handleNext}
// //                 disabled={currentIndex === test.questions.length - 1}
// //                 className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
// //               >
// //                 <span className="text-sm font-medium">Next</span>
// //                 <FiChevronRight className="w-4 h-4" />
// //               </button>
// //             </div>
// //           </footer>
// //         </div>

// //         {/* Explanation Panel */}
// //         <div className={`w-96 bg-white border-l border-gray-200 transition-all duration-300 ${
// //           showReviewPanel ? "translate-x-0" : "translate-x-full"
// //         }`}>
// //           <div className="h-full flex flex-col">
// //             <div className="p-4 border-b border-gray-200">
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-lg font-semibold text-gray-900">Explanation</h3>
// //                 <button
// //                   onClick={() => setShowReviewPanel(!showReviewPanel)}
// //                   className="p-2 rounded-lg hover:bg-gray-100"
// //                 >
// //                   <FiBookOpen className="w-5 h-5 text-gray-600" />
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div className="flex-1 overflow-auto p-4">
// //               {currentState && currentState.showExplanation ? (
// //                 <div className="space-y-4">
// //                   {currentStatus !== "correct" && currentState.selectedOption && (
// //                     <div className="p-4 bg-red-50 rounded-lg">
// //                       <h4 className="text-sm font-semibold text-red-800 mb-2">
// //                         Why your answer is incorrect
// //                       </h4>
// //                       <div 
// //                         className="prose prose-sm max-w-none text-red-700"
// //                         dangerouslySetInnerHTML={{
// //                           __html: currentQuestion.optionExplanations?.[
// //                             currentQuestion.options.indexOf(currentState.selectedOption)
// //                           ] || "No explanation available for this option."
// //                         }}
// //                       />
// //                     </div>
// //                   )}
                  
// //                   {currentQuestion.description && (
// //                     <div className="p-4 bg-green-50 rounded-lg">
// //                       <h4 className="text-sm font-semibold text-green-800 mb-2">
// //                         Correct Answer Explanation
// //                       </h4>
// //                       <div 
// //                         className="prose prose-sm max-w-none text-green-700"
// //                         dangerouslySetInnerHTML={{
// //                           __html: currentQuestion.description
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center h-full text-gray-500">
// //                   <FiAlertCircle className="w-12 h-12 mb-3" />
// //                   <p className="text-sm">Select an answer to view explanation</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Toggle Review Panel Button */}
// //         <button
// //           onClick={() => setShowReviewPanel(!showReviewPanel)}
// //           className="fixed right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-blue-600 text-white rounded-l-lg shadow-lg hover:bg-blue-700 transition-all"
// //         >
// //           <FiBookOpen className="w-5 h-5" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { api } from "@/utils/axiosInstance";
// import endPointApi from "@/utils/endPointApi";
// import { toast } from "react-toastify";

// type Question = {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   description?: string;
//   optionExplanations?: string[];
// };

// type ActiveTest = {
//   id?: string;
//   attemptId?: string;
//   mode: "tutor" | "timed";
//   totalQuestions: number;
//   questions: Question[];
//   createdAt: string;
// };

// type AnswerState = {
//   [questionId: string]: {
//     selectedOption: string | null;
//     isCorrect: boolean | null;
//     showExplanation: boolean;
//     timeSpentSeconds?: number;
//   };
// };

// export default function TestRunPage() {
//   const router = useRouter();
//   const [test, setTest] = useState<ActiveTest | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState<AnswerState>({});
//   const [marked, setMarked] = useState<Record<string, boolean>>({});
//   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   useEffect(() => {
//     try {
//       if (typeof window === "undefined") return;
//       const raw = window.sessionStorage.getItem("activeTest");
//       if (!raw) {
//         router.replace("/test-create");
//         return;
//       }
//       const parsed = JSON.parse(raw) as ActiveTest;
//       if (!parsed.questions || !parsed.questions.length) {
//         router.replace("/test-create");
//         return;
//       }
//       setTest(parsed);
//       setQuestionStartTime(Date.now());
//     } catch {
//       router.replace("/test-create");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (!test) return;
//     const start = Date.now();
//     const interval = setInterval(() => {
//       setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [test]);

//   useEffect(() => {
//     if (!test) return;
//     setQuestionStartTime(Date.now());
//   }, [currentIndex, test]);

//   const currentQuestion = useMemo(() => {
//     if (!test) return null;
//     return test.questions[currentIndex] || null;
//   }, [test, currentIndex]);

//   const handleSelectOption = (option: string) => {
//     if (!currentQuestion) return;
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.id]: {
//         ...(prev[currentQuestion.id] || {}),
//         selectedOption: option,
//         isCorrect: null,
//         showExplanation: false,
//       },
//     }));
//   };

//   const handleSubmit = () => {
//     if (!currentQuestion) return;
//     const state = answers[currentQuestion.id];
//     const selected = state?.selectedOption;
//     if (!selected) {
//       toast.error("Please select an answer");
//       return;
//     }
//     const isCorrect = selected === currentQuestion.correctAnswer;
//     const now = Date.now();
//     const timeSpentSeconds = questionStartTime
//       ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
//       : state?.timeSpentSeconds;

//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.id]: {
//         ...(prev[currentQuestion.id] || {}),
//         selectedOption: selected,
//         isCorrect,
//         showExplanation: true,
//         timeSpentSeconds,
//       },
//     }));
//   };

//   const handleNext = () => {
//     if (!test) return;
//     if (currentIndex < test.questions.length - 1) {
//       setCurrentIndex((idx) => idx + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((idx) => idx - 1);
//     }
//   };

//   const toggleMarkCurrent = () => {
//     if (!currentQuestion) return;
//     setMarked((prev) => ({
//       ...prev,
//       [currentQuestion.id]: !prev[currentQuestion.id],
//     }));
//   };

//   const handleEndTest = async () => {
//     if (!test) {
//       if (typeof window !== "undefined") {
//         window.sessionStorage.removeItem("activeTest");
//       }
//       router.replace("/");
//       return;
//     }

//     const questionIds = test.questions.map((q) => q.id);
//     let correctCount = 0;
//     let incorrectCount = 0;
//     let omittedCount = 0;

//     const perQuestion = questionIds.map((id) => {
//       const state = answers[id];
//       const isAnswered = !!state && !!state.selectedOption;
//       const isCorrect = !!state && state.isCorrect === true;
//       if (!isAnswered) {
//         omittedCount += 1;
//       } else if (isCorrect) {
//         correctCount += 1;
//       } else {
//         incorrectCount += 1;
//       }
//       return {
//         questionId: id,
//         isCorrect,
//         isAnswered,
//       };
//     });

//     const attemptId = (test as any).attemptId || (test as any).id;

//     if (attemptId) {
//       try {
//         await api.patch(
//           `${endPointApi.completeTestAttempt}/${attemptId}`,
//           {
//             correctCount,
//             incorrectCount,
//             omittedCount,
//             perQuestion,
//             completedAt: new Date().toISOString(),
//           }
//         );
//       } catch (error: any) {
//         toast.error(
//           error?.response?.data?.message || "Failed to save test result"
//         );
//       }
//     }

//     if (typeof window !== "undefined") {
//       window.sessionStorage.removeItem("activeTest");
//     }
//     router.replace("/");
//   };

//   const getQuestionStatus = (question: Question) => {
//     const state = answers[question.id];
//     if (!state || !state.selectedOption) return "unanswered";
//     if (!state.showExplanation) return "unanswered";
//     if (state.isCorrect) return "correct";
//     return "incorrect";
//   };

//   const formatTime = (totalSeconds: number) => {
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     const hh = hours.toString().padStart(2, "0");
//     const mm = minutes.toString().padStart(2, "0");
//     const ss = seconds.toString().padStart(2, "0");
//     return `${hh}:${mm}:${ss}`;
//   };

//   if (!test || !currentQuestion) {
//     return (
//       <main className="w-full min-h-screen bg-gray-100">
//         {/* Top Navigation Bar */}
//         <header className="bg-blue-900 text-white px-4 py-3 border-b">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="h-6 w-32 bg-blue-700 rounded animate-pulse" />
//               <div className="h-5 w-24 bg-blue-700 rounded animate-pulse" />
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="h-8 w-20 bg-blue-800 rounded animate-pulse" />
//               <div className="h-8 w-20 bg-blue-800 rounded animate-pulse" />
//               <div className="h-8 w-24 bg-yellow-600 rounded animate-pulse" />
//               <div className="h-8 w-20 bg-red-600 rounded animate-pulse" />
//             </div>
//           </div>
//         </header>

//         <div className="flex h-[calc(100vh-60px)]">
//           <aside className="hidden md:block w-48 border-r bg-gray-50">
//             <div className="px-3 py-2 border-b bg-white text-xs font-semibold">
//               Items
//             </div>
//             <div className="p-2 space-y-2 animate-pulse">
//               {Array.from({ length: 10 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="h-7 rounded bg-gray-200"
//                 />
//               ))}
//             </div>
//           </aside>
//           <section className="flex-1 flex flex-col bg-white">
//             <div className="flex-1 flex flex-col lg:flex-row">
//               <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-6">
//                 <div className="space-y-2 mb-6 animate-pulse">
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="h-3 bg-gray-200 rounded w-11/12" />
//                   <div className="h-3 bg-gray-200 rounded w-10/12" />
//                 </div>
//                 <div className="space-y-3 mb-4 animate-pulse">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <div
//                       key={index}
//                       className="h-9 bg-gray-200 rounded"
//                     />
//                   ))}
//                 </div>
//                 <div className="mt-4 h-16 bg-gray-100 rounded animate-pulse" />
//               </div>
//               <aside className="w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l bg-gray-50 flex flex-col">
//                 <div className="px-4 py-3 border-b text-xs font-semibold text-gray-700">
//                   Explanation
//                 </div>
//                 <div className="flex-1 px-4 py-3 space-y-2 animate-pulse">
//                   <div className="h-3 bg-gray-200 rounded w-10/12" />
//                   <div className="h-3 bg-gray-200 rounded w-11/12" />
//                   <div className="h-3 bg-gray-200 rounded w-9/12" />
//                   <div className="h-3 bg-gray-200 rounded w-8/12" />
//                 </div>
//               </aside>
//             </div>
//           </section>
//         </div>
//       </main>
//     );
//   }

//   const currentState = answers[currentQuestion.id];
//   const currentStatus = getQuestionStatus(currentQuestion);
//   const isCurrentMarked = marked[currentQuestion.id];

//   const correctIndex = currentQuestion.options.indexOf(
//     currentQuestion.correctAnswer
//   );

//   return (
//     <main className="w-full min-h-screen bg-gray-100">
//       {/* Top Navigation Bar */}
//       <header className="bg-blue-900 text-white px-4 py-3 border-b">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="text-sm font-medium">
//               Question {currentIndex + 1} of {test.questions.length}
//             </div>
//             <div className="text-xs opacity-80">
//               ID: {currentQuestion.id}
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handlePrevious}
//               disabled={currentIndex === 0}
//               className="px-4 py-2 bg-blue-800 border border-blue-700 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
//             >
//               Previous
//             </button>
//             <button
//               type="button"
//               onClick={handleNext}
//               disabled={currentIndex === test.questions.length - 1}
//               className="px-4 py-2 bg-blue-800 border border-blue-700 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
//             >
//               Next
//             </button>
//             <button
//               type="button"
//               onClick={toggleMarkCurrent}
//               className={`px-4 py-2 rounded transition-colors text-sm font-medium ${
//                 isCurrentMarked
//                   ? "bg-yellow-500 text-black border border-yellow-400 hover:bg-yellow-400"
//                   : "bg-yellow-600 text-white border border-yellow-500 hover:bg-yellow-500"
//               }`}
//             >
//               {isCurrentMarked ? "⚑ Marked" : "⚑ Mark"}
//             </button>
//             <button
//               type="button"
//               onClick={handleEndTest}
//               className="px-4 py-2 bg-red-600 border border-red-500 rounded hover:bg-red-700 transition-colors text-sm font-medium"
//             >
//               End Test
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex h-[calc(100vh-60px)]">
//         {/* Left Sidebar */}
//         <aside className="w-full md:w-48 border-b md:border-b-0 md:border-r bg-gray-50">
//           <div className="px-3 py-2 border-b bg-white text-xs font-semibold">
//             Items
//           </div>
//           <div className="p-2 grid grid-cols-10 md:grid-cols-1 gap-1 text-xs">
//             {test.questions.map((q, idx) => {
//               const status = getQuestionStatus(q);
//               const isActive = idx === currentIndex;
//               const isMarked = marked[q.id];
//               return (
//                 <button
//                   key={q.id}
//                   type="button"
//                   onClick={() => setCurrentIndex(idx)}
//                   className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center ${
//                     isActive ? "border-blue-600" : "border-gray-300"
//                   } ${
//                     status === "correct"
//                       ? "bg-green-100 text-green-700"
//                       : status === "incorrect"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-white text-gray-700"
//                   }`}
//                 >
//                   <span className="flex-1 text-left md:text-center">
//                     {idx + 1}
//                   </span>
//                   {isMarked && (
//                     <span className="hidden md:inline-block text-[10px] text-yellow-500 ml-1">
//                       ⚑
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </aside>

//         {/* Main Content */}
//         <section className="flex-1 flex flex-col bg-white">
//           <div className="flex-1 flex flex-col lg:flex-row">
//             <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-6">
//               <div className="prose prose-sm max-w-none mb-6">
//                 <div
//                   className="text-gray-900 text-sm md:text-base leading-relaxed"
//                   dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
//                 />
//               </div>

//               <div className="space-y-3 mb-4">
//                 {currentQuestion.options.map((option, idx) => {
//                   const selected =
//                     currentState && currentState.selectedOption === option;
//                   const isCorrect = option === currentQuestion.correctAnswer;
//                   const showFeedback = !!currentState?.showExplanation;

//                   let optionClass =
//                     "flex items-center gap-3 px-3 py-2 border rounded cursor-pointer text-sm";

//                   if (showFeedback) {
//                     if (isCorrect) {
//                       optionClass +=
//                         " border-green-500 bg-green-50 text-green-800";
//                     } else if (selected && !isCorrect) {
//                       optionClass += " border-red-500 bg-red-50 text-red-800";
//                     } else if (!selected) {
//                       optionClass += " border-gray-300 bg-white";
//                     }
//                   } else if (selected) {
//                     optionClass += " border-blue-500 bg-blue-50";
//                   } else {
//                     optionClass += " border-gray-300 bg-white hover:border-gray-400";
//                   }

//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => handleSelectOption(option)}
//                       className={optionClass}
//                     >
//                       <span className="text-xs font-semibold w-5">
//                         {String.fromCharCode(65 + idx)}.
//                       </span>
//                       <span className="flex-1 text-left">{option}</span>
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="px-6 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 text-sm font-medium"
//                 >
//                   Submit
//                 </button>
//               </div>

//               {currentState && (
//                 <div className="mt-4 border rounded bg-gray-50">
//                   <div
//                     className={`flex flex-wrap items-center gap-4 px-4 py-3 border-l-4 ${
//                       currentStatus === "correct"
//                         ? "border-green-600"
//                         : "border-red-600"
//                     }`}
//                   >
//                     <div>
//                       <div
//                         className={`text-sm font-semibold ${
//                           currentStatus === "correct"
//                             ? "text-green-700"
//                             : "text-red-700"
//                         }`}
//                       >
//                         {currentStatus === "correct" ? "Correct" : "Incorrect"}
//                       </div>
//                       <div className="text-xs text-gray-700">
//                         Correct answer{" "}
//                         {correctIndex !== -1
//                           ? String.fromCharCode(65 + correctIndex)
//                           : ""}
//                       </div>
//                     </div>
//                     <div className="flex-1 flex flex-wrap gap-6 text-xs text-gray-700">
//                       {currentState.timeSpentSeconds != null && (
//                         <div className="flex items-center gap-2">
//                           <span className="text-base font-semibold">
//                             {currentState.timeSpentSeconds} secs
//                           </span>
//                           <span>Time Spent</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right Explanation Panel */}
//             <aside className="w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l bg-gray-50 flex flex-col">
//               <div className="px-4 py-3 border-b text-xs font-semibold text-gray-700">
//                 Explanation
//               </div>
//               <div className="flex-1 overflow-auto px-4 py-3">
//                 {currentState && currentState.showExplanation ? (
//                   <>
//                     {currentStatus !== "correct" &&
//                       currentState.selectedOption &&
//                       currentState.selectedOption !==
//                         currentQuestion.correctAnswer &&
//                       currentQuestion.optionExplanations?.[
//                         currentQuestion.options.indexOf(currentState.selectedOption)
//                       ] && (
//                         <div className="mb-4">
//                           <div className="text-xs font-semibold text-red-700 mb-1">
//                             Why this answer is incorrect
//                           </div>
//                           <div
//                             className="prose prose-sm max-w-none text-gray-800"
//                             dangerouslySetInnerHTML={{
//                               __html: currentQuestion.optionExplanations[
//                                 currentQuestion.options.indexOf(currentState.selectedOption)
//                               ],
//                             }}
//                           />
//                         </div>
//                       )}

//                     {currentQuestion.description && (
//                       <div>
//                         <div className="text-xs font-semibold text-green-700 mb-1">
//                           Why the correct answer is right (
//                           {correctIndex !== -1
//                             ? String.fromCharCode(65 + correctIndex)
//                             : ""}
//                           )
//                         </div>
//                         <div
//                           className="prose prose-sm max-w-none text-gray-800"
//                           dangerouslySetInnerHTML={{
//                             __html: currentQuestion.description,
//                           }}
//                         />
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-500">
//                     Explanation will appear after you submit your answer.
//                   </p>
//                 )}
//               </div>
//             </aside>
//           </div>
//         </section>
//       </div>
//       <footer className="h-10 bg-blue-900 text-white flex items-center justify-between px-4 text-xs">
//         <div>
//           Block Time Elapsed: {formatTime(elapsedSeconds)}
//         </div>
//         <div className="flex items-center gap-4">
//           <span>Medical Library</span>
//           <span>My Notebook</span>
//           <span>Flashcards</span>
//           <span>Feedback</span>
//           <span>Suspend</span>
//           <span className="flex items-center gap-1">
//             <span className="h-2 w-2 rounded-full bg-red-500" />
//             End Block
//           </span>
//         </div>
//       </footer>
//     </main>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  description?: string;
  optionExplanations?: string[];
};

type ActiveTest = {
  id?: string;
  attemptId?: string;
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
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {}),
        selectedOption: option,
        isCorrect: null,
        showExplanation: false,
      },
    }));
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    const state = answers[currentQuestion.id];
    const selected = state?.selectedOption;
    if (!selected) {
      toast.error("Please select an answer");
      return;
    }
    const isCorrect = selected === currentQuestion.correctAnswer;
    const now = Date.now();
    const timeSpentSeconds = questionStartTime
      ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
      : state?.timeSpentSeconds;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || {}),
        selectedOption: selected,
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

  const handleEndTest = async () => {
    if (!test) {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("activeTest");
      }
      router.replace("/");
      return;
    }

    const questionIds = test.questions.map((q) => q.id);
    let correctCount = 0;
    let incorrectCount = 0;
    let omittedCount = 0;

    const perQuestion = questionIds.map((id) => {
      const state = answers[id];
      const isAnswered = !!state && !!state.selectedOption;
      const isCorrect = !!state && state.isCorrect === true;
      if (!isAnswered) {
        omittedCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
      return {
        questionId: id,
        isCorrect,
        isAnswered,
      };
    });

    const attemptId = (test as any).attemptId || (test as any).id;

    if (attemptId) {
      try {
        await api.patch(
          `${endPointApi.completeTestAttempt}/${attemptId}`,
          {
            correctCount,
            incorrectCount,
            omittedCount,
            perQuestion,
            completedAt: new Date().toISOString(),
          }
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to save test result"
        );
      }
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("activeTest");
    }
    router.replace("/");
  };

  const getQuestionStatus = (question: Question) => {
    const state = answers[question.id];
    if (!state || !state.selectedOption) return "unanswered";
    if (!state.showExplanation) return "unanswered";
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
      <main className="w-full min-h-screen bg-gray-100">
        {/* Top Navigation Bar */}
        <header className="bg-blue-900 text-white px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-32 bg-blue-700 rounded animate-pulse" />
              <div className="h-5 w-24 bg-blue-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-20 bg-blue-800 rounded animate-pulse" />
              <div className="h-8 w-20 bg-blue-800 rounded animate-pulse" />
              <div className="h-8 w-24 bg-yellow-600 rounded animate-pulse" />
              <div className="h-8 w-20 bg-red-600 rounded animate-pulse" />
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-60px)]">
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
          </section>
        </div>
      </main>
    );
  }

  const currentState = answers[currentQuestion.id];
  const currentStatus = getQuestionStatus(currentQuestion);
  const isCurrentMarked = marked[currentQuestion.id];

  const correctIndex = currentQuestion.options.indexOf(
    currentQuestion.correctAnswer
  );

  return (
    <main className="w-full min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-blue-900 text-white px-4 py-3 border-b">
  <div className="flex items-center">
    
    {/* Left Section */}
    <div className="flex items-center gap-4 flex-1">
      <div className="text-sm font-medium">
        Question {currentIndex + 1} of {test.questions.length}
      </div>
      <div className="text-xs opacity-80">
        ID: {currentQuestion.id}
      </div>
    </div>

    {/* Center Section */}
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-blue-800 border border-blue-700 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        Previous
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex === test.questions.length - 1}
        className="px-4 py-2 bg-blue-800 border border-blue-700 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        Next
      </button>
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-3 flex-1 justify-end">
      <button
        type="button"
        onClick={toggleMarkCurrent}
        className={`px-4 py-2 rounded transition-colors text-sm font-medium ${
          isCurrentMarked
            ? "bg-yellow-500 text-black border border-yellow-400 hover:bg-yellow-400"
            : "bg-yellow-600 text-white border border-yellow-500 hover:bg-yellow-500"
        }`}
      >
        {isCurrentMarked ? "⚑ Marked" : "⚑ Mark"}
      </button>

      <button
        type="button"
        onClick={handleEndTest}
        className="px-4 py-2 bg-red-600 border border-red-500 rounded hover:bg-red-700 transition-colors text-sm font-medium"
      >
        End Test
      </button>
    </div>

  </div>
</header>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Sidebar */}
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

        {/* Main Content */}
        <section className="flex-1 flex flex-col bg-white">
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
                  const showFeedback = !!currentState?.showExplanation;

                  let optionClass =
                    "flex items-center gap-3 px-3 py-2 border rounded cursor-pointer text-sm";

                  if (showFeedback) {
                    if (isCorrect) {
                      optionClass +=
                        " border-green-500 bg-green-50 text-green-800";
                    } else if (selected && !isCorrect) {
                      optionClass += " border-red-500 bg-red-50 text-red-800";
                    } else if (!selected) {
                      optionClass += " border-gray-300 bg-white";
                    }
                  } else if (selected) {
                    optionClass += " border-blue-500 bg-blue-50";
                  } else {
                    optionClass += " border-gray-300 bg-white hover:border-gray-400";
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

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 text-sm font-medium"
                >
                  Submit
                </button>
              </div>

              {currentState && currentState.showExplanation && (
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
                      {currentState.timeSpentSeconds != null && (
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold">
                            {currentState.timeSpentSeconds} secs
                          </span>
                          <span>Time Spent</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Explanation Panel - Hidden by default */}
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
                      currentQuestion.optionExplanations?.[
                        currentQuestion.options.indexOf(currentState.selectedOption)
                      ] && (
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-red-700 mb-1">
                            Why this answer is incorrect
                          </div>
                          <div
                            className="prose prose-sm max-w-none text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: currentQuestion.optionExplanations[
                                currentQuestion.options.indexOf(currentState.selectedOption)
                              ],
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
                    Explanation will appear after you submit your answer.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
      <footer className="h-10 bg-blue-900 text-white flex items-center justify-between px-4 text-xs">
        <div>
          Block Time Elapsed: {formatTime(elapsedSeconds)}
        </div>
        <div className="flex items-center gap-4">
          <span>Medical Library</span>
          <span>My Notebook</span>
          <span>Flashcards</span>
          <span>Feedback</span>
          <span>Suspend</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            End Block
          </span>
        </div>
      </footer>
    </main>
  );
}