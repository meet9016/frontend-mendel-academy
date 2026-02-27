// "use client";

// import { useEffect, useMemo, useState, useRef, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { api } from "@/utils/axiosInstance";
// import endPointApi from "@/utils/endPointApi";
// import { toast } from "react-toastify";
// import dynamic from 'next/dynamic';
// import Calculator from "@/component/exam/Calculator";
// import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
// import { BsFillFlagFill, BsFillQuestionCircleFill } from "react-icons/bs";
// import { TbBracketsContain, TbBracketsContainEnd, TbCalculator, TbFeather, TbFlagBolt, TbLabelOff } from "react-icons/tb";
// import { FiSettings } from "react-icons/fi";
// import { Modal, SidePanel } from "@/component/exam/SidePanel";
// import { KEYBOARD_SHORTCUTS, LAB_VALUES, TUTORIAL_STEPS } from "@/utils/constant";
// import { SettingsPanel } from "@/component/exam/SettingsPanel";
// import { BiFontSize } from "react-icons/bi";

// // Dynamic import for Joyride to avoid SSR issues
// const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

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

// // Settings type
// type TestSettings = {
//   fontSize: number; // in pixels, base 14px
//   theme: 'light' | 'dark';
//   showTimer: boolean;
//   showExplanations: boolean;
//   confirmOmission: boolean;
// };

// export default function TestRunPage() {
//   const router = useRouter();
//   const [test, setTest] = useState<ActiveTest | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState<AnswerState>({});
//   const [marked, setMarked] = useState<Record<string, boolean>>({});
//   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [settings, setSettings] = useState<TestSettings>(() => {
//     // Load settings from localStorage if available
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('testRunSettings');
//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch (e) {
//           console.error('Error parsing settings', e);
//         }
//       }
//     }
//     // Default settings
//     return {
//       fontSize: 14,
//       theme: 'light',
//       showTimer: true,
//       showExplanations: true,
//       confirmOmission: false,
//     };
//   });

//   // UI States
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showTutorialMenu, setShowTutorialMenu] = useState(false);
//   const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
//   const [showLabValues, setShowLabValues] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [runTutorial, setRunTutorial] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   // Save settings to localStorage whenever they change
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('testRunSettings', JSON.stringify(settings));
//     }
//   }, [settings]);

//   // Apply theme to body
//   useEffect(() => {
//     if (settings.theme === 'dark') {
//       document.body.classList.add('dark');
//     } else {
//       document.body.classList.remove('dark');
//     }
//   }, [settings.theme]);

//   // Decode HTML entities function
//   const decodeHtmlEntities = (html: string) => {
//     const txt = document.createElement('textarea');
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   // Compute current question
//   const currentQuestion = useMemo(() => {
//     if (!test) return null;
//     return test.questions[currentIndex] || null;
//   }, [test, currentIndex]);

//   const searchParams = useSearchParams();
//   const testId = searchParams.get("id");

//   useEffect(() => {
//     const loadTest = async () => {
//       try {
//         if (typeof window === "undefined") return;

//         let activeTest: ActiveTest | null = null;

//         // 1. Try to get from sessionStorage if it matches URL id
//         const raw = window.sessionStorage.getItem("activeTest");
//         if (raw) {
//           try {
//             const parsed = JSON.parse(raw) as ActiveTest;
//             const currentSessionId = (parsed as any).attemptId || parsed.id;

//             // If no testId in URL, use whatever is in session
//             // If testId in URL matches session, use session
//             if (!testId || (currentSessionId === testId)) {
//               if (parsed.questions && parsed.questions.length) {
//                 activeTest = parsed;
//               }
//             }
//           } catch (e) {
//             console.error("Error parsing sessionStorage activeTest", e);
//           }
//         }

//         // 2. Fetch from API if not in sessionStorage or ID mismatch
//         if (!activeTest && testId) {
//           const res = await api.get(`${endPointApi.getTestAttemptDetail}/${testId}`);
//           const d = res.data || res;

//           if (d) {
//             // Map data to ActiveTest structure
//             activeTest = {
//               id: d.id || d._id,
//               attemptId: d.id || d._id,
//               mode: d.mode,
//               totalQuestions: d.totalQuestions,
//               questions: d.questions || [],
//               createdAt: d.startedAt || d.createdAt,
//             };

//             if (activeTest.questions && activeTest.questions.length) {
//               window.sessionStorage.setItem("activeTest", JSON.stringify(activeTest));
//             } else {
//               activeTest = null;
//             }
//           }
//         }

//         if (!activeTest) {
//           router.replace("/test-create");
//           return;
//         }

//         setTest(activeTest);
//         setQuestionStartTime(Date.now());
//       } catch (err) {
//         console.error("Error loading test:", err);
//         router.replace("/test-create");
//       }
//     };

//     loadTest();
//   }, [router, testId]);

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

//   // Full screen handling
//   const toggleFullScreen = useCallback(() => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullScreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     }
//   }, []);

//   // Handle functions
//   const handleSelectOption = (option: string) => {
//     if (!currentQuestion) return;

//     // Get current state for this question
//     const currentState = answers[currentQuestion.id];

//     // Prevent option selection if answer has already been submitted
//     if (currentState?.showExplanation) {
//       toast.info("You cannot change your answer after submission");
//       return;
//     }

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

//     // Check if already submitted
//     if (state?.showExplanation) {
//       toast.info("You have already submitted an answer for this question");
//       return;
//     }

//     if (!selected) {
//       // If confirm omission is enabled and no answer selected
//       if (settings.confirmOmission) {
//         if (confirm("Are you sure you want to omit this question?")) {
//           // Proceed with omission
//           const now = Date.now();
//           const timeSpentSeconds = questionStartTime
//             ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
//             : state?.timeSpentSeconds;

//           setAnswers((prev) => ({
//             ...prev,
//             [currentQuestion.id]: {
//               ...(prev[currentQuestion.id] || {}),
//               selectedOption: null,
//               isCorrect: false,
//               showExplanation: true,
//               timeSpentSeconds,
//             },
//           }));
//         }
//       } else {
//         toast.error("Please select an answer");
//       }
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

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       // Don't trigger if typing in an input
//       if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
//         return;
//       }

//       const key = e.key;
//       const ctrlPressed = e.ctrlKey || e.metaKey;

//       // Number keys 1-9 for options
//       if (/^[1-9]$/.test(key) && !ctrlPressed && currentQuestion) {
//         const index = parseInt(key) - 1;
//         if (currentQuestion.options[index]) {
//           handleSelectOption(currentQuestion.options[index]);
//         }
//       }

//       // Enter for submit
//       if (key === 'Enter' && !ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         handleSubmit();
//       }

//       // N for next
//       if (key.toLowerCase() === 'n' && !ctrlPressed) {
//         e.preventDefault();
//         handleNext();
//       }

//       // P for previous
//       if (key.toLowerCase() === 'p' && !ctrlPressed) {
//         e.preventDefault();
//         handlePrevious();
//       }

//       // M for mark
//       if (key.toLowerCase() === 'm' && !ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         toggleMarkCurrent();
//       }

//       // F for full screen
//       if (key.toLowerCase() === 'f' && !ctrlPressed) {
//         e.preventDefault();
//         toggleFullScreen();
//       }

//       // L for lab values
//       if (key.toLowerCase() === 'l' && !ctrlPressed) {
//         e.preventDefault();
//         setShowLabValues(prev => !prev);
//         // Close other panels
//         setShowCalculator(false);
//         setShowSettings(false);
//       }

//       // C for calculator
//       if (key.toLowerCase() === 'c' && !ctrlPressed) {
//         e.preventDefault();
//         setShowCalculator(prev => !prev);
//         // Close other panels
//         setShowLabValues(false);
//         setShowSettings(false);
//       }

//       // S for settings
//       if (key.toLowerCase() === 's' && !ctrlPressed) {
//         e.preventDefault();
//         setShowSettings(prev => !prev);
//         // Close other panels
//         setShowLabValues(false);
//         setShowCalculator(false);
//       }

//       // T for tutorial menu
//       if (key.toLowerCase() === 't' && !ctrlPressed) {
//         e.preventDefault();
//         setShowTutorialMenu(prev => !prev);
//       }

//       // Esc for closing modals and panels
//       if (key === 'Escape') {
//         if (showTutorialMenu) setShowTutorialMenu(false);
//         if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
//         if (showLabValues) setShowLabValues(false);
//         if (showCalculator) setShowCalculator(false);
//         if (showSettings) setShowSettings(false);
//         if (isFullScreen) {
//           document.exitFullscreen();
//           setIsFullScreen(false);
//         }
//       }

//       // Arrow keys for navigation
//       if (key === 'ArrowRight') {
//         e.preventDefault();
//         handleNext();
//       }
//       if (key === 'ArrowLeft') {
//         e.preventDefault();
//         handlePrevious();
//       }

//       // Ctrl+S for submit
//       if (key.toLowerCase() === 's' && ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         handleSubmit();
//       }

//       // Ctrl+M for mark
//       if (key.toLowerCase() === 'm' && ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         toggleMarkCurrent();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentQuestion, isFullScreen, showTutorialMenu, showKeyboardShortcuts, showLabValues, showCalculator, showSettings, settings.confirmOmission, handleNext, handlePrevious, handleSubmit, toggleMarkCurrent, toggleFullScreen]);

//   // Handle full screen change
//   useEffect(() => {
//     const handleFullScreenChange = () => {
//       setIsFullScreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullScreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
//   }, []);

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

//   // Loading state
//   if (!test || !currentQuestion) {
//     return (
//       <main className={`w-full min-h-screen bg-gray-100 ${settings.theme === 'dark' ? 'dark' : ''}`}>
//         {/* Top Navigation Bar */}
//         <header className="bg-primary text-white px-4 py-3 border-b">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
//               <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
//               <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
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

//   // Check if explanation should be shown (based on settings and submission)
//   const showExplanation = settings.showExplanations && currentState?.showExplanation || false;

//   // Dynamic styles based on theme
//   const mainBgClass = settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
//   const headerBgClass = settings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-primary text-dark';
//   const contentBgClass = settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white';
//   const textColorClass = settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
//   const mutedTextClass = settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
//   const borderColorClass = settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
//   const sidebarBgClass = settings.theme === 'dark' ? 'bg-gray-850' : 'bg-gray-50';
//   const optionBgClass = settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white';
//   const optionHoverClass = settings.theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

//   return (
//     <main ref={containerRef} className={`w-full min-h-screen ${mainBgClass} ${settings.theme}`}>
//       {/* Tutorial */}
//       {runTutorial && (
//         <Joyride
//           steps={TUTORIAL_STEPS}
//           run={runTutorial}
//           continuous={true}
//           showProgress={true}
//           showSkipButton={true}
//           styles={{
//             options: {
//               primaryColor: '#FFCA00',
//               textColor: '#1f2937',
//               backgroundColor: '#ffffff',
//               overlayColor: 'rgba(0, 0, 0, 0.5)',
//             },
//           }}
//           callback={(data) => {
//             const { status } = data;
//             if (status === 'finished' || status === 'skipped') {
//               setRunTutorial(false);
//               setShowTutorialMenu(false);
//             }
//           }}
//         />
//       )}

//       {/* Top Navigation Bar */}
//       <header className={`${headerBgClass} px-4 py-3 border-b ${borderColorClass}`}>
//         <div className="flex items-center">

//           {/* Left Section */}
//           <div className="flex items-center gap-4 flex-1">
//             <div className="question-number text-sm font-medium">
//               Question {currentIndex + 1} of {test.questions.length}
//             </div>
//             <div className={`text-xs opacity-80 ${mutedTextClass}`}>
//               ID: {currentQuestion.id}
//             </div>
//           </div>

//           {/* Center Section - Navigation Buttons */}
//           <div className="nav-buttons flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handlePrevious}
//               disabled={currentIndex === 0}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <GoTriangleLeft className="w-4 h-4 mr-1" />
//               Previous
//             </button>

//             <button
//               type="button"
//               onClick={handleNext}
//               disabled={currentIndex === test.questions.length - 1}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <GoTriangleRight className="w-4 h-4 ml-1" />
//               Next
//             </button>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-3 flex-1 justify-end">
//             <button
//               type="button"
//               onClick={toggleMarkCurrent}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <BsFillFlagFill className="w-4 h-4 mr-1" />
//               {isCurrentMarked ? "Marked" : "Mark"}
//             </button>

//             <button
//               type="button"
//               onClick={toggleFullScreen}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               {isFullScreen ? <TbBracketsContain /> : <TbBracketsContainEnd />}
//               {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
//             </button>

//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowTutorialMenu(!showTutorialMenu)}
//                 className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//               >
//                 <BsFillQuestionCircleFill className="w-4 h-4 mr-1" />
//                 Tutorial
//               </button>

//               {/* Tutorial Menu */}
//               {showTutorialMenu && (
//                 <div className={`absolute right-0 mt-2 w-48 ${optionBgClass} rounded-md shadow-lg z-50 border ${borderColorClass}`}>
//                   <button
//                     onClick={() => {
//                       setRunTutorial(true);
//                       setShowTutorialMenu(false);
//                     }}
//                     className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                   >
//                     Interface Tutorial
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowKeyboardShortcuts(true);
//                       setShowTutorialMenu(false);
//                     }}
//                     className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                   >
//                     Keyboard Shortcuts
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowLabValues(true);
//                 setShowCalculator(false);
//                 setShowSettings(false);
//               }}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <TbFeather className="w-4 h-4 mr-1" />
//               Lab Values
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowCalculator(true);
//                 setShowLabValues(false);
//                 setShowSettings(false);
//               }}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <TbCalculator className="w-4 h-4 mr-1" />
//               Calculator
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowSettings(true);
//                 setShowLabValues(false);
//                 setShowCalculator(false);
//               }}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <BiFontSize className="w-4 h-4 mr-1" />
//               Text Zoom
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowSettings(true);
//                 setShowLabValues(false);
//                 setShowCalculator(false);
//               }}
//               className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//             >
//               <FiSettings className="w-5 h-5 mb-1 text-black" />
//               <span>Settings</span>
//             </button>
//           </div>

//         </div>
//       </header>

//       {/* Main Content Area - Fixed height calculation */}
//       <div className={`flex h-[calc(100vh-60px-40px)] ${settings.theme}`}>
//         {/* Left Sidebar - Full height */}
//         <aside className={`question-sidebar w-full md:w-48 border-b ${borderColorClass} md:border-b-0 md:border-r ${sidebarBgClass} overflow-y-auto`}>
//           <div className={`px-3 py-2 border-b ${borderColorClass} ${optionBgClass} text-xs font-semibold sticky top-0 z-10`}>
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
//                   className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center ${isActive ? "border-primary ring-2 ring-primary" : `border-${borderColorClass}`
//                     } ${status === "correct"
//                       ? "bg-green-100 text-green-700 hover:bg-green-200"
//                       : status === "incorrect"
//                         ? "bg-red-100 text-red-700 hover:bg-red-200"
//                         : `${optionBgClass} ${textColorClass} hover:bg-gray-100`
//                     }`}
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
//         <section className={`flex-1 flex flex-col ${contentBgClass} overflow-hidden`}>
//           <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//             {/* Question Area */}
//             <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${showLabValues || showCalculator || showSettings ? 'lg:w-1/2' : 'lg:w-full'}`}>
//               <div className="prose prose-sm max-w-none mb-6">
//                 <div
//                   className={`${textColorClass} text-sm md:text-base leading-relaxed`}
//                   style={{ fontSize: `${settings.fontSize}px` }}
//                   dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentQuestion.question) }}
//                 />
//               </div>

//               <div className="options-container space-y-3 mb-4">
//                 {currentQuestion.options.map((option, idx) => {
//                   const selected =
//                     currentState && currentState.selectedOption === option;
//                   const isCorrect = option === currentQuestion.correctAnswer;
//                   const showFeedback = !!currentState?.showExplanation;

//                   // Disable option clicks if answer has been submitted
//                   const isDisabled = showFeedback;

//                   let optionClass = `flex items-center gap-3 px-3 py-2 border rounded text-sm w-full text-left transition-all`;
//                   optionClass += isDisabled ? " cursor-not-allowed opacity-75" : " cursor-pointer";

//                   if (showFeedback) {
//                     if (isCorrect) {
//                       optionClass += " border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
//                     } else if (selected && !isCorrect) {
//                       optionClass += " border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
//                     } else if (!selected) {
//                       optionClass += ` border-${borderColorClass} ${optionBgClass}`;
//                     }
//                   } else if (selected) {
//                     optionClass += " border-primary bg-primary/50 ring-0 ring-primary";
//                   } else {
//                     optionClass += ` border-${borderColorClass} ${optionBgClass} hover:border-gray-400 ${optionHoverClass}`;
//                   }

//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => !isDisabled && handleSelectOption(option)}
//                       disabled={isDisabled}
//                       className={optionClass}
//                       style={{ fontSize: `${settings.fontSize}px` }}
//                     >
//                       <span className="text-xs font-semibold w-5">
//                         {String.fromCharCode(65 + idx)}.
//                       </span>
//                       <span className="flex-1 text-left" dangerouslySetInnerHTML={{ __html: option }} />
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={currentState?.showExplanation}
//                   className={`submit-button px-6 py-2 rounded shadow text-sm font-medium ${currentState?.showExplanation
//                     ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                     : "bg-primary text-dark hover:bg-blue-800"
//                     }`}
//                 >
//                   {currentState?.showExplanation ? "Already Submitted" : "Submit"}
//                 </button>
//               </div>

//               {showExplanation && currentState && (
//                 <div className={`mt-4 border ${borderColorClass} rounded-lg bg-gray-50 overflow-hidden`}>
//                   <div
//                     className={`flex flex-wrap items-center gap-4 px-4 py-3 border-l-4 ${currentStatus === "correct"
//                       ? "border-green-600 bg-green-50"
//                       : "border-red-600 bg-red-50"
//                       }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`text-sm font-semibold flex items-center gap-2 ${currentStatus === "correct"
//                           ? "text-green-700"
//                           : "text-red-700"
//                           }`}
//                       >
//                         {currentStatus === "correct" ? (
//                           <>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Correct
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Incorrect
//                           </>
//                         )}
//                       </div>
//                       <div className={`text-xs ${optionBgClass} px-2 py-1 rounded-full shadow-sm ${mutedTextClass}`}>
//                         Your answer: {String.fromCharCode(65 + currentQuestion.options.indexOf(currentState.selectedOption || ''))}
//                       </div>
//                     </div>

//                     <div className="flex-1 flex flex-wrap gap-6 text-xs ${mutedTextClass}">
//                       {currentState.timeSpentSeconds != null && (
//                         <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
//                           <span className="font-semibold text-base">
//                             {currentState.timeSpentSeconds}s
//                           </span>
//                           <span className={mutedTextClass}>Time Spent</span>
//                         </div>
//                       )}

//                       <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
//                         <span className="font-semibold text-base">
//                           {String.fromCharCode(65 + correctIndex)}
//                         </span>
//                         <span className={mutedTextClass}>Correct Answer</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right Explanation Panel - Only shown after submission and if enabled in settings */}
//             {showExplanation && (
//               <aside className={`explanation-panel w-full lg:w-[38%] border-t ${borderColorClass} lg:border-t-0 lg:border-l ${sidebarBgClass} flex flex-col overflow-hidden`}>
//                 <div className={`px-4 py-3 border-b ${borderColorClass} text-xs font-semibold ${mutedTextClass} sticky top-0 ${sidebarBgClass} z-10`}>
//                   Explanation
//                 </div>
//                 <div className="flex-1 overflow-y-auto px-4 py-3">
//                   {/* If answer is incorrect, show why the selected option is wrong */}
//                   {currentStatus === "incorrect" &&
//                     currentState?.selectedOption &&
//                     currentQuestion.optionExplanations &&
//                     currentQuestion.optionExplanations.length > 0 && (
//                       (() => {
//                         const selectedIndex = currentQuestion.options.indexOf(currentState.selectedOption);
//                         const selectedExplanation = currentQuestion.optionExplanations[selectedIndex];

//                         // Only show if there's an explanation for this option
//                         if (selectedExplanation && selectedExplanation.trim() !== "") {
//                           return (
//                             <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
//                               <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Why your answer is incorrect
//                               </div>
//                               <div
//                                 className="prose prose-sm max-w-none text-gray-800"
//                                 dangerouslySetInnerHTML={{
//                                   __html: decodeHtmlEntities(selectedExplanation),
//                                 }}
//                               />
//                             </div>
//                           );
//                         }
//                         return null;
//                       })()
//                     )}

//                   {/* Always show description (correct answer explanation) if it exists */}
//                   {currentQuestion.description && (
//                     <div className={`p-4 rounded-lg border ${currentStatus === "correct"
//                       ? "bg-green-50 border-green-200"
//                       : "bg-blue-50 border-blue-200"
//                       }`}>
//                       <div className={`text-xs font-semibold mb-2 flex items-center gap-1 ${currentStatus === "correct"
//                         ? "text-green-700"
//                         : "text-blue-700"
//                         }`}>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           {currentStatus === "correct" ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           )}
//                         </svg>
//                         {currentStatus === "correct"
//                           ? "Correct Answer Explanation"
//                           : "Correct Answer Explanation"}
//                       </div>
//                       <div
//                         className="prose prose-sm max-w-none text-gray-800"
//                         dangerouslySetInnerHTML={{
//                           __html: decodeHtmlEntities(currentQuestion.description),
//                         }}
//                       />

//                       {/* Show the correct answer letter */}
//                       <div className="mt-2 text-xs font-medium text-gray-600">
//                         Correct answer: {String.fromCharCode(65 + correctIndex)}
//                       </div>
//                     </div>
//                   )}

//                   {/* If no explanation available at all */}
//                   {!currentQuestion.description &&
//                     (!currentQuestion.optionExplanations ||
//                       currentQuestion.optionExplanations.every(exp => !exp || exp.trim() === "")) && (
//                       <div className={`p-4 ${sidebarBgClass} rounded-lg border ${borderColorClass} text-center`}>
//                         <p className={`text-sm ${mutedTextClass} italic`}>
//                           No explanation available for this question.
//                         </p>
//                       </div>
//                     )}
//                 </div>
//               </aside>
//             )}
//           </div>
//         </section>
//       </div>

//       {/* Footer - Fixed height */}
//       <footer className={`footer h-10 ${headerBgClass} flex items-center justify-between px-4 text-xs`}>
//         {settings.showTimer && (
//           <div>
//             Block Time Elapsed: {formatTime(elapsedSeconds)}
//           </div>
//         )}
//         <div className={`flex items-center gap-4 ${settings.showTimer ? '' : 'ml-auto'}`}>
//           <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Medical Library</span>
//           <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>My Notebook</span>
//           <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Flashcards</span>
//           <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Feedback</span>
//           <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Suspend</span>
//           <button
//             type="button"
//             onClick={handleEndTest}
//             className="end-test-button inline-flex items-center gap-2 px-4 py-2 bg-red-400 border border-red-500 rounded hover:bg-red-400 transition-colors text-sm font-medium cursor-pointer"
//           >
//             <span className="h-5 w-5 rounded-full bg-red-500" />
//             End Block
//           </button>
//         </div>
//       </footer>

//       <Modal
//         title="Keyboard Shortcuts"
//         isOpen={showKeyboardShortcuts}
//         onClose={() => setShowKeyboardShortcuts(false)}
//       >
//         <div className="p-4 space-y-3 text-sm">

//           {[
//             ["a,b,c,d", "Answer choice selector"],
//             ["Alt + m", "Mark question"],
//             ["Alt + p", "Previous question"],
//             ["Alt + n", "Next question"],
//             ["Alt + f", "Feedback"],
//             ["Alt + c", "Close window"],
//             ["Alt + o", "Notes"],
//             ["Alt + u", "Calculator"],
//             ["F11", "Full Screen"],
//             ["Alt + l", "Lab Values"],
//           ].map(([key, label], index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-6 py-2 ${index !== 9 ? "border-b border-gray-200" : ""
//                 }`}
//             >
//               <div className="bg-[#2f2f2f] text-white px-3 py-1 rounded shadow-inner font-mono text-xs min-w-[80px] text-center">
//                 {key}
//               </div>

//               <span className="text-gray-800 text-sm">
//                 {label}
//               </span>
//             </div>
//           ))}

//         </div>
//       </Modal>

//       {/* Lab Values Side Panel */}
//       <SidePanel
//         isOpen={showLabValues}
//         onClose={() => setShowLabValues(false)}
//         title="Laboratory Values Reference"
//       >
//         <div className="space-y-6">
//           {Object.entries(LAB_VALUES).map(([category, values]) => (
//             <div key={category}>
//               <h3 className="text-lg font-semibold capitalize mb-2">{category}</h3>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {values.map((item, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2 text-sm text-gray-900">{item.test}</td>
//                       <td className="px-4 py-2 text-sm text-gray-600">{item.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       </SidePanel>

//       {/* Calculator Side Panel */}
//       <SidePanel
//         isOpen={showCalculator}
//         onClose={() => setShowCalculator(false)}
//         title="Calculator"
//       >
//         <Calculator />
//       </SidePanel>

//       {/* Settings Side Panel */}
//       <SidePanel
//         isOpen={showSettings}
//         onClose={() => setShowSettings(false)}
//         title="Settings"
//       >
//         <SettingsPanel settings={settings} onSettingsChange={setSettings} />
//       </SidePanel>
//     </main>
//   );
// }
// "use client";

// import { useEffect, useMemo, useState, useRef, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { api } from "@/utils/axiosInstance";
// import endPointApi from "@/utils/endPointApi";
// import { toast } from "react-toastify";
// import dynamic from 'next/dynamic';
// import Calculator from "@/component/exam/Calculator";
// import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
// import { BsFillFlagFill, BsFillQuestionCircleFill } from "react-icons/bs";
// import { TbBracketsContain, TbBracketsContainEnd, TbCalculator, TbFeather, TbFlagBolt, TbLabelOff } from "react-icons/tb";
// import { FiSettings } from "react-icons/fi";
// import { Modal, SidePanel } from "@/component/exam/SidePanel";
// import { KEYBOARD_SHORTCUTS, LAB_VALUES, TUTORIAL_STEPS } from "@/utils/constant";
// import { SettingsPanel } from "@/component/exam/SettingsPanel";
// import { BiFontSize, BiNotepad } from "react-icons/bi";

// // Dynamic import for Joyride to avoid SSR issues
// const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

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

// // Settings type
// type TestSettings = {
//   fontSize: number; // in pixels, base 14px
//   theme: 'light' | 'dark';
//   showTimer: boolean;
//   showExplanations: boolean;
//   confirmOmission: boolean;
// };

// export default function TestRunPage() {
//   const router = useRouter();
//   const [test, setTest] = useState<ActiveTest | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState<AnswerState>({});
//   const [marked, setMarked] = useState<Record<string, boolean>>({});
//   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [settings, setSettings] = useState<TestSettings>(() => {
//     // Load settings from localStorage if available
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('testRunSettings');
//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch (e) {
//           console.error('Error parsing settings', e);
//         }
//       }
//     }
//     // Default settings
//     return {
//       fontSize: 14,
//       theme: 'light',
//       showTimer: true,
//       showExplanations: true,
//       confirmOmission: false,
//     };
//   });

//   // UI States
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showTutorialMenu, setShowTutorialMenu] = useState(false);
//   const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
//   const [showLabValues, setShowLabValues] = useState(false);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [runTutorial, setRunTutorial] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   // Save settings to localStorage whenever they change
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('testRunSettings', JSON.stringify(settings));
//     }
//   }, [settings]);

//   // Apply theme to body
//   useEffect(() => {
//     if (settings.theme === 'dark') {
//       document.body.classList.add('dark');
//     } else {
//       document.body.classList.remove('dark');
//     }
//   }, [settings.theme]);

//   // Decode HTML entities function
//   const decodeHtmlEntities = (html: string) => {
//     const txt = document.createElement('textarea');
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   // Compute current question
//   const currentQuestion = useMemo(() => {
//     if (!test) return null;
//     return test.questions[currentIndex] || null;
//   }, [test, currentIndex]);

//   const searchParams = useSearchParams();
//   const testId = searchParams.get("id");

//   useEffect(() => {
//     const loadTest = async () => {
//       try {
//         if (typeof window === "undefined") return;

//         let activeTest: ActiveTest | null = null;

//         // 1. Try to get from sessionStorage if it matches URL id
//         const raw = window.sessionStorage.getItem("activeTest");
//         if (raw) {
//           try {
//             const parsed = JSON.parse(raw) as ActiveTest;
//             const currentSessionId = (parsed as any).attemptId || parsed.id;

//             // If no testId in URL, use whatever is in session
//             // If testId in URL matches session, use session
//             if (!testId || (currentSessionId === testId)) {
//               if (parsed.questions && parsed.questions.length) {
//                 activeTest = parsed;
//               }
//             }
//           } catch (e) {
//             console.error("Error parsing sessionStorage activeTest", e);
//           }
//         }

//         // 2. Fetch from API if not in sessionStorage or ID mismatch
//         if (!activeTest && testId) {
//           const res = await api.get(`${endPointApi.getTestAttemptDetail}/${testId}`);
//           const d = res.data || res;

//           if (d) {
//             // Map data to ActiveTest structure
//             activeTest = {
//               id: d.id || d._id,
//               attemptId: d.id || d._id,
//               mode: d.mode,
//               totalQuestions: d.totalQuestions,
//               questions: d.questions || [],
//               createdAt: d.startedAt || d.createdAt,
//             };

//             if (activeTest.questions && activeTest.questions.length) {
//               window.sessionStorage.setItem("activeTest", JSON.stringify(activeTest));
//             } else {
//               activeTest = null;
//             }
//           }
//         }

//         if (!activeTest) {
//           router.replace("/test-create");
//           return;
//         }

//         setTest(activeTest);
//         setQuestionStartTime(Date.now());
//       } catch (err) {
//         console.error("Error loading test:", err);
//         router.replace("/test-create");
//       }
//     };

//     loadTest();
//   }, [router, testId]);

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

//   // Full screen handling
//   const toggleFullScreen = useCallback(() => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullScreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     }
//   }, []);

//   // Handle functions
//   const handleSelectOption = (option: string) => {
//     if (!currentQuestion) return;

//     // Get current state for this question
//     const currentState = answers[currentQuestion.id];

//     // Prevent option selection if answer has already been submitted
//     if (currentState?.showExplanation) {
//       toast.info("You cannot change your answer after submission");
//       return;
//     }

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

//     // Check if already submitted
//     if (state?.showExplanation) {
//       toast.info("You have already submitted an answer for this question");
//       return;
//     }

//     if (!selected) {
//       // If confirm omission is enabled and no answer selected
//       if (settings.confirmOmission) {
//         if (confirm("Are you sure you want to omit this question?")) {
//           // Proceed with omission
//           const now = Date.now();
//           const timeSpentSeconds = questionStartTime
//             ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
//             : state?.timeSpentSeconds;

//           setAnswers((prev) => ({
//             ...prev,
//             [currentQuestion.id]: {
//               ...(prev[currentQuestion.id] || {}),
//               selectedOption: null,
//               isCorrect: false,
//               showExplanation: true,
//               timeSpentSeconds,
//             },
//           }));
//         }
//       } else {
//         toast.error("Please select an answer");
//       }
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

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       // Don't trigger if typing in an input
//       if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
//         return;
//       }

//       const key = e.key;
//       const ctrlPressed = e.ctrlKey || e.metaKey;

//       // Number keys 1-9 for options
//       if (/^[1-9]$/.test(key) && !ctrlPressed && currentQuestion) {
//         const index = parseInt(key) - 1;
//         if (currentQuestion.options[index]) {
//           handleSelectOption(currentQuestion.options[index]);
//         }
//       }

//       // Enter for submit
//       if (key === 'Enter' && !ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         handleSubmit();
//       }

//       // N for next
//       if (key.toLowerCase() === 'n' && !ctrlPressed) {
//         e.preventDefault();
//         handleNext();
//       }

//       // P for previous
//       if (key.toLowerCase() === 'p' && !ctrlPressed) {
//         e.preventDefault();
//         handlePrevious();
//       }

//       // M for mark
//       if (key.toLowerCase() === 'm' && !ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         toggleMarkCurrent();
//       }

//       // F for full screen
//       if (key.toLowerCase() === 'f' && !ctrlPressed) {
//         e.preventDefault();
//         toggleFullScreen();
//       }

//       // L for lab values
//       if (key.toLowerCase() === 'l' && !ctrlPressed) {
//         e.preventDefault();
//         setShowLabValues(prev => !prev);
//         // Close other panels
//         setShowCalculator(false);
//         setShowSettings(false);
//       }

//       // C for calculator
//       if (key.toLowerCase() === 'c' && !ctrlPressed) {
//         e.preventDefault();
//         setShowCalculator(prev => !prev);
//         // Close other panels
//         setShowLabValues(false);
//         setShowSettings(false);
//       }

//       // S for settings
//       if (key.toLowerCase() === 's' && !ctrlPressed) {
//         e.preventDefault();
//         setShowSettings(prev => !prev);
//         // Close other panels
//         setShowLabValues(false);
//         setShowCalculator(false);
//       }

//       // T for tutorial menu
//       if (key.toLowerCase() === 't' && !ctrlPressed) {
//         e.preventDefault();
//         setShowTutorialMenu(prev => !prev);
//       }

//       // Esc for closing modals and panels
//       if (key === 'Escape') {
//         if (showTutorialMenu) setShowTutorialMenu(false);
//         if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
//         if (showLabValues) setShowLabValues(false);
//         if (showCalculator) setShowCalculator(false);
//         if (showSettings) setShowSettings(false);
//         if (isFullScreen) {
//           document.exitFullscreen();
//           setIsFullScreen(false);
//         }
//       }

//       // Arrow keys for navigation
//       if (key === 'ArrowRight') {
//         e.preventDefault();
//         handleNext();
//       }
//       if (key === 'ArrowLeft') {
//         e.preventDefault();
//         handlePrevious();
//       }

//       // Ctrl+S for submit
//       if (key.toLowerCase() === 's' && ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         handleSubmit();
//       }

//       // Ctrl+M for mark
//       if (key.toLowerCase() === 'm' && ctrlPressed && currentQuestion) {
//         e.preventDefault();
//         toggleMarkCurrent();
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentQuestion, isFullScreen, showTutorialMenu, showKeyboardShortcuts, showLabValues, showCalculator, showSettings, settings.confirmOmission, handleNext, handlePrevious, handleSubmit, toggleMarkCurrent, toggleFullScreen]);

//   // Handle full screen change
//   useEffect(() => {
//     const handleFullScreenChange = () => {
//       setIsFullScreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullScreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
//   }, []);

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

//   // Loading state
//   if (!test || !currentQuestion) {
//     return (
//       <main className={`w-full min-h-screen bg-gray-100 ${settings.theme === 'dark' ? 'dark' : ''}`}>
//         {/* Top Navigation Bar */}
//         <header className="bg-primary text-white px-4 py-3 border-b">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
//               <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
//               <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
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

//   // Check if explanation should be shown (based on settings and submission)
//   const showExplanation = settings.showExplanations && currentState?.showExplanation || false;

//   // Dynamic styles based on theme
//   const mainBgClass = settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
//   const headerBgClass = settings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-primary text-dark';
//   const contentBgClass = settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white';
//   const textColorClass = settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
//   const mutedTextClass = settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
//   const borderColorClass = settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
//   const sidebarBgClass = settings.theme === 'dark' ? 'bg-gray-850' : 'bg-gray-50';
//   const optionBgClass = settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white';
//   const optionHoverClass = settings.theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

//   return (
//     <main ref={containerRef} className={`w-full min-h-screen ${mainBgClass} ${settings.theme}`}>
//       {/* Tutorial */}
//       {runTutorial && (
//         <Joyride
//           steps={TUTORIAL_STEPS}
//           run={runTutorial}
//           continuous={true}
//           showProgress={true}
//           showSkipButton={true}
//           styles={{
//             options: {
//               primaryColor: '#FFCA00',
//               textColor: '#1f2937',
//               backgroundColor: '#ffffff',
//               overlayColor: 'rgba(0, 0, 0, 0.5)',
//             },
//           }}
//           callback={(data) => {
//             const { status } = data;
//             if (status === 'finished' || status === 'skipped') {
//               setRunTutorial(false);
//               setShowTutorialMenu(false);
//             }
//           }}
//         />
//       )}

//       {/* Top Navigation Bar */}

//       {/* Main Content Area - Fixed height calculation */}
//       <div className={`flex h-[calc(108vh-40px-40px)] ${settings.theme}`}>
//         {/* Left Sidebar - Full height */}
//         <aside className={`question-sidebar w-full md:w-48 border-b ${borderColorClass} md:border-b-0 md:border-r ${sidebarBgClass} overflow-y-auto`}>
//           <div className={`px-3 py-2 border-b ${borderColorClass} ${optionBgClass} text-xs font-semibold sticky top-0 z-10`}>
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
//                   className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center ${isActive ? "border-primary ring-2 ring-primary" : `border-${borderColorClass}`
//                     } ${status === "correct"
//                       ? "bg-green-100 text-green-700 hover:bg-green-200"
//                       : status === "incorrect"
//                         ? "bg-red-100 text-red-700 hover:bg-red-200"
//                         : `${optionBgClass} ${textColorClass} hover:bg-gray-100`
//                     }`}
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
//         <section className={`flex-1 flex flex-col ${contentBgClass} overflow-hidden`}>
//           <header className={`${headerBgClass} px-4 py-3 border-b ${borderColorClass}`}>
//             <div className="flex items-center">

//               {/* Left Section */}
//               <div className="flex items-center gap-4 flex-1">
//                 <div className="question-number text-sm font-medium">
//                   Question {currentIndex + 1} of {test.questions.length}
//                 </div>
//                 <div className={`text-xs opacity-80 ${mutedTextClass}`}>
//                   ID: {currentQuestion.id}
//                 </div>
//               </div>

//               {/* Center Section - Navigation Buttons */}
//               <div className="nav-buttons flex items-center gap-3">
//                 <button
//                   type="button"
//                   onClick={handlePrevious}
//                   disabled={currentIndex === 0}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <GoTriangleLeft className="w-4 h-4 mr-1" />
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   disabled={currentIndex === test.questions.length - 1}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <GoTriangleRight className="w-4 h-4 ml-1" />
//                   Next
//                 </button>
//               </div>

//               {/* Right Section */}
//               <div className="flex items-center gap-3 flex-1 justify-end">
//                 <button
//                   type="button"
//                   onClick={toggleMarkCurrent}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <BsFillFlagFill className="w-4 h-4 mr-1" />
//                   {isCurrentMarked ? "Marked" : "Mark"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={toggleFullScreen}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   {isFullScreen ? <TbBracketsContain /> : <TbBracketsContainEnd />}
//                   {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
//                 </button>

//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowTutorialMenu(!showTutorialMenu)}
//                     className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                   >
//                     <BsFillQuestionCircleFill className="w-4 h-4 mr-1" />
//                     Tutorial
//                   </button>

//                   {/* Tutorial Menu */}
//                   {showTutorialMenu && (
//                     <div className={`absolute right-0 mt-2 w-48 ${optionBgClass} rounded-md shadow-lg z-50 border ${borderColorClass}`}>
//                       <button
//                         onClick={() => {
//                           setRunTutorial(true);
//                           setShowTutorialMenu(false);
//                         }}
//                         className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                       >
//                         Interface Tutorial
//                       </button>
//                       <button
//                         onClick={() => {
//                           setShowKeyboardShortcuts(true);
//                           setShowTutorialMenu(false);
//                         }}
//                         className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                       >
//                         Keyboard Shortcuts
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowLabValues(true);
//                     setShowCalculator(false);
//                     setShowSettings(false);
//                   }}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <TbFeather className="w-4 h-4 mr-1" />
//                   Lab Values
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowCalculator(true);
//                     setShowLabValues(false);
//                     setShowSettings(false);
//                   }}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <TbCalculator className="w-4 h-4 mr-1" />
//                   Calculator
//                 </button>

//                 <button
//                   type="button"

//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <BiNotepad className="w-4 h-4 mr-1" />
//                   Note
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowSettings(true);
//                     setShowLabValues(false);
//                     setShowCalculator(false);
//                   }}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <BiFontSize className="w-4 h-4 mr-1" />
//                   Text Zoom
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowSettings(true);
//                     setShowLabValues(false);
//                     setShowCalculator(false);
//                   }}
//                   className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
//                 >
//                   <FiSettings className="w-5 h-5 mb-1 text-black" />
//                   <span>Settings</span>
//                 </button>
//               </div>

//             </div>
//           </header>

//           <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//             {/* Question Area */}
//             <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${showLabValues || showCalculator || showSettings ? 'lg:w-1/2' : 'lg:w-full'}`}>
//               <div className="prose prose-sm max-w-none mb-6">
//                 <div
//                   className={`${textColorClass} text-sm md:text-base leading-relaxed`}
//                   style={{ fontSize: `${settings.fontSize}px` }}
//                   dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentQuestion.question) }}
//                 />
//               </div>

//               <div className="options-container space-y-3 mb-4">
//                 {currentQuestion.options.map((option, idx) => {
//                   const selected =
//                     currentState && currentState.selectedOption === option;
//                   const isCorrect = option === currentQuestion.correctAnswer;
//                   const showFeedback = !!currentState?.showExplanation;

//                   // Disable option clicks if answer has been submitted
//                   const isDisabled = showFeedback;

//                   let optionClass = `flex items-center gap-3 px-3 py-2 border rounded text-sm w-full text-left transition-all`;
//                   optionClass += isDisabled ? " cursor-not-allowed opacity-75" : " cursor-pointer";

//                   if (showFeedback) {
//                     if (isCorrect) {
//                       optionClass += " border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
//                     } else if (selected && !isCorrect) {
//                       optionClass += " border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
//                     } else if (!selected) {
//                       optionClass += ` border-${borderColorClass} ${optionBgClass}`;
//                     }
//                   } else if (selected) {
//                     optionClass += " border-primary bg-primary/50 ring-0 ring-primary";
//                   } else {
//                     optionClass += ` border-${borderColorClass} ${optionBgClass} hover:border-gray-400 ${optionHoverClass}`;
//                   }

//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => !isDisabled && handleSelectOption(option)}
//                       disabled={isDisabled}
//                       className={optionClass}
//                       style={{ fontSize: `${settings.fontSize}px` }}
//                     >
//                       <span className="text-xs font-semibold w-5">
//                         {String.fromCharCode(65 + idx)}.
//                       </span>
//                       <span className="flex-1 text-left" dangerouslySetInnerHTML={{ __html: option }} />
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={currentState?.showExplanation}
//                   className={`submit-button px-6 py-2 rounded shadow text-sm font-medium ${currentState?.showExplanation
//                     ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                     : "bg-primary text-dark hover:bg-blue-800"
//                     }`}
//                 >
//                   {currentState?.showExplanation ? "Already Submitted" : "Submit"}
//                 </button>
//               </div>

//               {showExplanation && currentState && (
//                 <div className={`mt-4 border ${borderColorClass} rounded-lg bg-gray-50 overflow-hidden`}>
//                   <div
//                     className={`flex flex-wrap items-center gap-4 px-4 py-3 border-l-4 ${currentStatus === "correct"
//                       ? "border-green-600 bg-green-50"
//                       : "border-red-600 bg-red-50"
//                       }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`text-sm font-semibold flex items-center gap-2 ${currentStatus === "correct"
//                           ? "text-green-700"
//                           : "text-red-700"
//                           }`}
//                       >
//                         {currentStatus === "correct" ? (
//                           <>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Correct
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Incorrect
//                           </>
//                         )}
//                       </div>
//                       <div className={`text-xs ${optionBgClass} px-2 py-1 rounded-full shadow-sm ${mutedTextClass}`}>
//                         Your answer: {String.fromCharCode(65 + currentQuestion.options.indexOf(currentState.selectedOption || ''))}
//                       </div>
//                     </div>

//                     <div className="flex-1 flex flex-wrap gap-6 text-xs ${mutedTextClass}">
//                       {currentState.timeSpentSeconds != null && (
//                         <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
//                           <span className="font-semibold text-base">
//                             {currentState.timeSpentSeconds}s
//                           </span>
//                           <span className={mutedTextClass}>Time Spent</span>
//                         </div>
//                       )}

//                       <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
//                         <span className="font-semibold text-base">
//                           {String.fromCharCode(65 + correctIndex)}
//                         </span>
//                         <span className={mutedTextClass}>Correct Answer</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right Explanation Panel - Only shown after submission and if enabled in settings */}
//             {showExplanation && (
//               <aside className={`explanation-panel w-full lg:w-[38%] border-t ${borderColorClass} lg:border-t-0 lg:border-l ${sidebarBgClass} flex flex-col overflow-hidden`}>
//                 <div className={`px-4 py-3 border-b ${borderColorClass} text-xs font-semibold ${mutedTextClass} sticky top-0 ${sidebarBgClass} z-10`}>
//                   Explanation
//                 </div>
//                 <div className="flex-1 overflow-y-auto px-4 py-3">
//                   {/* If answer is incorrect, show why the selected option is wrong */}
//                   {currentStatus === "incorrect" &&
//                     currentState?.selectedOption &&
//                     currentQuestion.optionExplanations &&
//                     currentQuestion.optionExplanations.length > 0 && (
//                       (() => {
//                         const selectedIndex = currentQuestion.options.indexOf(currentState.selectedOption);
//                         const selectedExplanation = currentQuestion.optionExplanations[selectedIndex];

//                         // Only show if there's an explanation for this option
//                         if (selectedExplanation && selectedExplanation.trim() !== "") {
//                           return (
//                             <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
//                               <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                                 Why your answer is incorrect
//                               </div>
//                               <div
//                                 className="prose prose-sm max-w-none text-gray-800"
//                                 dangerouslySetInnerHTML={{
//                                   __html: decodeHtmlEntities(selectedExplanation),
//                                 }}
//                               />
//                             </div>
//                           );
//                         }
//                         return null;
//                       })()
//                     )}

//                   {/* Always show description (correct answer explanation) if it exists */}
//                   {currentQuestion.description && (
//                     <div className={`p-4 rounded-lg border ${currentStatus === "correct"
//                       ? "bg-green-50 border-green-200"
//                       : "bg-blue-50 border-blue-200"
//                       }`}>
//                       <div className={`text-xs font-semibold mb-2 flex items-center gap-1 ${currentStatus === "correct"
//                         ? "text-green-700"
//                         : "text-blue-700"
//                         }`}>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           {currentStatus === "correct" ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           )}
//                         </svg>
//                         {currentStatus === "correct"
//                           ? "Correct Answer Explanation"
//                           : "Correct Answer Explanation"}
//                       </div>
//                       <div
//                         className="prose prose-sm max-w-none text-gray-800"
//                         dangerouslySetInnerHTML={{
//                           __html: decodeHtmlEntities(currentQuestion.description),
//                         }}
//                       />

//                       {/* Show the correct answer letter */}
//                       <div className="mt-2 text-xs font-medium text-gray-600">
//                         Correct answer: {String.fromCharCode(65 + correctIndex)}
//                       </div>
//                     </div>
//                   )}

//                   {/* If no explanation available at all */}
//                   {!currentQuestion.description &&
//                     (!currentQuestion.optionExplanations ||
//                       currentQuestion.optionExplanations.every(exp => !exp || exp.trim() === "")) && (
//                       <div className={`p-4 ${sidebarBgClass} rounded-lg border ${borderColorClass} text-center`}>
//                         <p className={`text-sm ${mutedTextClass} italic`}>
//                           No explanation available for this question.
//                         </p>
//                       </div>
//                     )}
//                 </div>
//               </aside>
//             )}
//           </div>
//           <footer className={`footer h-10 ${headerBgClass} flex items-center justify-between px-4 text-xs`}>
//             {settings.showTimer && (
//               <div>
//                 Block Time Elapsed: {formatTime(elapsedSeconds)}
//               </div>
//             )}
//             <div className={`flex items-center gap-4 ${settings.showTimer ? '' : 'ml-auto'}`}>
//               <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Medical Library</span>
//               <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>My Notebook</span>
//               <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Flashcards</span>
//               <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Feedback</span>
//               <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Suspend</span>
//               <button
//                 type="button"
//                 onClick={handleEndTest}
//                 className="end-test-button inline-flex items-center gap-2 px-4 py-2 bg-red-400 border border-red-500 rounded hover:bg-red-400 transition-colors text-sm font-medium cursor-pointer"
//               >
//                 <span className="h-5 w-5 rounded-full bg-red-500" />
//                 End Block
//               </button>
//             </div>
//           </footer>
//         </section>
//       </div>

//       {/* Footer - Fixed height */}


//       <Modal
//         title="Keyboard Shortcuts"
//         isOpen={showKeyboardShortcuts}
//         onClose={() => setShowKeyboardShortcuts(false)}
//       >
//         <div className="p-4 space-y-3 text-sm">

//           {[
//             ["a,b,c,d", "Answer choice selector"],
//             ["Alt + m", "Mark question"],
//             ["Alt + p", "Previous question"],
//             ["Alt + n", "Next question"],
//             ["Alt + f", "Feedback"],
//             ["Alt + c", "Close window"],
//             ["Alt + o", "Notes"],
//             ["Alt + u", "Calculator"],
//             ["F11", "Full Screen"],
//             ["Alt + l", "Lab Values"],
//           ].map(([key, label], index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-6 py-2 ${index !== 9 ? "border-b border-gray-200" : ""
//                 }`}
//             >
//               <div className="bg-[#2f2f2f] text-white px-3 py-1 rounded shadow-inner font-mono text-xs min-w-[80px] text-center">
//                 {key}
//               </div>

//               <span className="text-gray-800 text-sm">
//                 {label}
//               </span>
//             </div>
//           ))}

//         </div>
//       </Modal>

//       {/* Lab Values Side Panel */}
//       <SidePanel
//         isOpen={showLabValues}
//         onClose={() => setShowLabValues(false)}
//         title="Laboratory Values Reference"
//       >
//         <div className="space-y-6">
//           {Object.entries(LAB_VALUES).map(([category, values]) => (
//             <div key={category}>
//               <h3 className="text-lg font-semibold capitalize mb-2">{category}</h3>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {values.map((item, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2 text-sm text-gray-900">{item.test}</td>
//                       <td className="px-4 py-2 text-sm text-gray-600">{item.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       </SidePanel>

//       {/* Calculator Side Panel */}
//       <SidePanel
//         isOpen={showCalculator}
//         onClose={() => setShowCalculator(false)}
//         title="Calculator"
//       >
//         <Calculator />
//       </SidePanel>

//       {/* Settings Side Panel */}
//       <SidePanel
//         isOpen={showSettings}
//         onClose={() => setShowSettings(false)}
//         title="Settings"
//       >
//         <SettingsPanel settings={settings} onSettingsChange={setSettings} />
//       </SidePanel>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';
import Calculator from "@/component/exam/Calculator";
import { NoteModal } from "@/component/exam/NoteModal"; // Add this import
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { BsFillFlagFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { TbBracketsContain, TbBracketsContainEnd, TbCalculator, TbFeather, TbFlagBolt, TbLabelOff } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { Modal, SidePanel } from "@/component/exam/SidePanel";
import { KEYBOARD_SHORTCUTS, LAB_VALUES, TUTORIAL_STEPS } from "@/utils/constant";
import { SettingsPanel } from "@/component/exam/SettingsPanel";
import { BiFontSize, BiMenu, BiNotepad } from "react-icons/bi";
// Dynamic import for Joyride to avoid SSR issues
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

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
    note?: string; // Add note field
  };
};

// Settings type
type TestSettings = {
  fontSize: number; // in pixels, base 14px
  theme: 'light' | 'dark';
  showTimer: boolean;
  showExplanations: boolean;
  confirmOmission: boolean;
};

export default function TestRunPage() {
  const router = useRouter();
  const [test, setTest] = useState<ActiveTest | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  // Add this state at the top with other states
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [settings, setSettings] = useState<TestSettings>(() => {
    // Load settings from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('testRunSettings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing settings', e);
        }
      }
    }
    // Default settings
    return {
      fontSize: 14,
      theme: 'light',
      showTimer: true,
      showExplanations: true,
      confirmOmission: false,
    };
  });

  // UI States
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showTutorialMenu, setShowTutorialMenu] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showLabValues, setShowLabValues] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false); // Add this state
  const [runTutorial, setRunTutorial] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('testRunSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Apply theme to body
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [settings.theme]);

  // Decode HTML entities function
  const decodeHtmlEntities = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Compute current question
  const currentQuestion = useMemo(() => {
    if (!test) return null;
    return test.questions[currentIndex] || null;
  }, [test, currentIndex]);

  const searchParams = useSearchParams();
  const testId = searchParams.get("id");

  useEffect(() => {
    const loadTest = async () => {
      try {
        if (!testId) {
          router.replace("/test-create");
          return;
        }

        const res = await api.get(`${endPointApi.getTestAttemptDetail}/${testId}`);
        const d = res.data || res;

        if (d) {
          const activeTest: ActiveTest = {
            id: d.id || d._id,
            attemptId: d.id || d._id,
            mode: d.mode,
            totalQuestions: d.totalQuestions,
            questions: d.questions || [],
            createdAt: d.startedAt || d.createdAt,
          };

          if (activeTest.questions && activeTest.questions.length) {
            setTest(activeTest);

            const indexParam = searchParams.get("index");
            if (indexParam) {
              const idx = parseInt(indexParam);
              if (!isNaN(idx) && idx >= 0 && idx < activeTest.questions.length) {
                setCurrentIndex(idx);
              }
            }

            const modeParam = searchParams.get("mode");
            const isReviewMode = modeParam === "review";
            const initialAnswers: AnswerState = {};
            const initialMarks: Record<string, boolean> = {};

            if (d.perQuestion && Array.isArray(d.perQuestion)) {
              d.perQuestion.forEach((item: any) => {
                initialAnswers[item.questionId] = {
                  selectedOption: item.selectedOption || null,
                  isCorrect: item.isCorrect === null ? null : item.isCorrect,
                  showExplanation: isReviewMode || item.isAnswered === true, // Assuming isAnswered implies submitted or review mode
                  timeSpentSeconds: item.timeSpentSeconds || 0,
                  note: item.note || undefined,
                };
                if (item.isMarked) {
                  initialMarks[item.questionId] = true;
                }
              });
            }

            setAnswers(initialAnswers);
            setMarked(initialMarks);
            setQuestionStartTime(Date.now());
          } else {
            router.replace("/test-create");
          }
        } else {
          router.replace("/test-create");
        }
      } catch (err) {
        console.error("Error loading test:", err);
        router.replace("/test-create");
      }
    };

    loadTest();
  }, [router, testId]);

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

  // Full screen handling
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }, []);

  // Handle functions
  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;

    // Get current state for this question
    const currentState = answers[currentQuestion.id];

    // Prevent option selection if answer has already been submitted
    if (currentState?.showExplanation) {
      toast.info("You cannot change your answer after submission");
      return;
    }

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

  const handleSubmit = async () => {
    if (!currentQuestion) return;

    const state = answers[currentQuestion.id];
    const selected = state?.selectedOption;

    // Check if already submitted
    if (state?.showExplanation) {
      toast.info("You have already submitted an answer for this question");
      return;
    }

    if (!selected) {
      // If confirm omission is enabled and no answer selected
      if (settings.confirmOmission) {
        if (confirm("Are you sure you want to omit this question?")) {
          // Proceed with omission
          const now = Date.now();
          const timeSpentSeconds = questionStartTime
            ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
            : state?.timeSpentSeconds;

          // Update local state
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
              ...(prev[currentQuestion.id] || {}),
              selectedOption: null,
              isCorrect: false,
              showExplanation: true,
              timeSpentSeconds,
            },
          }));

          // Save to backend
          if (test?.attemptId) {
            try {
              await api.patch(
                `${endPointApi.saveQuestionAnswer}/${test.attemptId}`,
                {
                  questionId: currentQuestion.id,
                  selectedOption: null,
                  isCorrect: false,
                  timeSpentSeconds,
                  isMarked: marked[currentQuestion.id] || false,
                }
              );
              toast.success("Question omitted successfully");
            } catch (error) {
              console.error("Failed to save omission to server:", error);
              toast.error("Failed to save answer. Will retry on next save.");
              // You might want to add to a retry queue here
            }
          }
        }
      } else {
        toast.error("Please select an answer");
      }
      return;
    }

    const isCorrect = selected === currentQuestion.correctAnswer;
    const now = Date.now();
    const timeSpentSeconds = questionStartTime
      ? Math.max(1, Math.floor((now - questionStartTime) / 1000))
      : state?.timeSpentSeconds;

    // Update local state first for immediate UI feedback
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

    // Save to backend
    if (test?.attemptId) {
      try {
        await api.patch(
          `${endPointApi.saveQuestionAnswer}/${test.attemptId}`,
          {
            questionId: currentQuestion.id,
            selectedOption: selected,
            isCorrect,
            timeSpentSeconds,
            isMarked: marked[currentQuestion.id] || false,
          }
        );

        // Show success message based on correctness
        if (isCorrect) {
          toast.success("Correct answer! Well done!");
        } else {
          toast.info(`Answer submitted. The correct answer is ${String.fromCharCode(65 + currentQuestion.options.indexOf(currentQuestion.correctAnswer))}`);
        }
      } catch (error) {
        console.error("Failed to save answer to server:", error);
        toast.error("Answer saved locally but failed to sync to server. Will retry.");

        // You could add to a retry queue here
        // addToRetryQueue({
        //   attemptId: test.attemptId,
        //   questionId: currentQuestion.id,
        //   data: { selectedOption: selected, isCorrect, timeSpentSeconds }
        // });
      }
    }
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

  const toggleMarkCurrent = async () => {
    if (!currentQuestion) return;

    const newMarkedState = !marked[currentQuestion.id];
    setMarked((prev) => ({
      ...prev,
      [currentQuestion.id]: newMarkedState,
    }));

    if (test?.attemptId) {
      try {
        await api.patch(
          `${endPointApi.toggleQuestionMark}/${test.attemptId}/${currentQuestion.id}`,
          { isMarked: newMarkedState }
        );
      } catch (error) {
        console.error("Failed to update mark status:", error);
      }
    }
  };

  // Note handling functions
  const handleOpenNote = () => {
    if (!currentQuestion) return;
    setShowNoteModal(true);
  };

  // In TestRunPage component
  const handleSaveNote = async (questionId: string, note: string) => {
    // Update local state
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        note: note.trim() || undefined,
      },
    }));

    // Save to backend if we have an attemptId
    if (test?.attemptId) {
      try {
        await api.patch(
          `${endPointApi.saveQuestionNote}/${test.attemptId}/${questionId}`,
          { note: note.trim() }
        );
        toast.success('Note saved successfully');
      } catch (error) {
        console.error('Failed to save note to server:', error);
        toast.error('Failed to save note. Will retry on next save.');
        // You might want to implement a retry queue here
      }
    } else {
      toast.success('Note saved locally');
    }
  };

  const handleDeleteNote = async (questionId: string) => {
    // Update local state
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        note: undefined,
      },
    }));

    // Delete from backend if we have an attemptId
    if (test?.attemptId) {
      try {
        await api.delete(
          `${endPointApi.deleteQuestionNote}/${test.attemptId}/${questionId}`
        );
        toast.success('Note deleted successfully');
      } catch (error) {
        console.error('Failed to delete note from server:', error);
        toast.error('Failed to delete note. Will retry on next save.');
        // You might want to implement a retry queue here
      }
    } else {
      toast.success('Note deleted locally');
    }
  };
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;
      const ctrlPressed = e.ctrlKey || e.metaKey;

      // Number keys 1-9 for options
      if (/^[1-9]$/.test(key) && !ctrlPressed && currentQuestion) {
        const index = parseInt(key) - 1;
        if (currentQuestion.options[index]) {
          handleSelectOption(currentQuestion.options[index]);
        }
      }

      // Enter for submit
      if (key === 'Enter' && !ctrlPressed && currentQuestion) {
        e.preventDefault();
        handleSubmit();
      }

      // N for next
      if (key.toLowerCase() === 'n' && !ctrlPressed) {
        e.preventDefault();
        handleNext();
      }

      // P for previous
      if (key.toLowerCase() === 'p' && !ctrlPressed) {
        e.preventDefault();
        handlePrevious();
      }

      // M for mark
      if (key.toLowerCase() === 'm' && !ctrlPressed && currentQuestion) {
        e.preventDefault();
        toggleMarkCurrent();
      }

      // F for full screen
      if (key.toLowerCase() === 'f' && !ctrlPressed) {
        e.preventDefault();
        toggleFullScreen();
      }

      // L for lab values
      if (key.toLowerCase() === 'l' && !ctrlPressed) {
        e.preventDefault();
        setShowLabValues(prev => !prev);
        // Close other panels
        setShowCalculator(false);
        setShowSettings(false);
      }

      // C for calculator
      if (key.toLowerCase() === 'c' && !ctrlPressed) {
        e.preventDefault();
        setShowCalculator(prev => !prev);
        // Close other panels
        setShowLabValues(false);
        setShowSettings(false);
      }

      // S for settings
      if (key.toLowerCase() === 's' && !ctrlPressed) {
        e.preventDefault();
        setShowSettings(prev => !prev);
        // Close other panels
        setShowLabValues(false);
        setShowCalculator(false);
      }

      // T for tutorial menu
      if (key.toLowerCase() === 't' && !ctrlPressed) {
        e.preventDefault();
        setShowTutorialMenu(prev => !prev);
      }

      // O for notes (new shortcut)
      if (key.toLowerCase() === 'o' && !ctrlPressed) {
        e.preventDefault();
        handleOpenNote();
      }

      // Esc for closing modals and panels
      if (key === 'Escape') {
        if (showTutorialMenu) setShowTutorialMenu(false);
        if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
        if (showLabValues) setShowLabValues(false);
        if (showCalculator) setShowCalculator(false);
        if (showSettings) setShowSettings(false);
        if (showNoteModal) setShowNoteModal(false); // Add this
        if (isFullScreen) {
          document.exitFullscreen();
          setIsFullScreen(false);
        }
      }

      // Arrow keys for navigation
      if (key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
      if (key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }

      // Ctrl+S for submit
      if (key.toLowerCase() === 's' && ctrlPressed && currentQuestion) {
        e.preventDefault();
        handleSubmit();
      }

      // Ctrl+M for mark
      if (key.toLowerCase() === 'm' && ctrlPressed && currentQuestion) {
        e.preventDefault();
        toggleMarkCurrent();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, isFullScreen, showTutorialMenu, showKeyboardShortcuts, showLabValues, showCalculator, showSettings, showNoteModal, settings.confirmOmission, handleNext, handlePrevious, handleSubmit, toggleMarkCurrent, toggleFullScreen]);

  // Handle full screen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

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

  const handleEndTest = async () => {
    if (!test) {
      router.replace("/");
      return;
    }

    const questionIds = test.questions.map((q) => q.id);
    let correctCount = 0;
    let incorrectCount = 0;
    let omittedCount = 0;

    const perQuestion = questionIds.map((id) => {
      const state = answers[id];
      const isAnswered = !!state && !!state.selectedOption && !!state.showExplanation;
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
        selectedOption: state?.selectedOption || null,
        isCorrect: state?.isCorrect === undefined ? null : state.isCorrect,
        isAnswered,
        timeSpentSeconds: state?.timeSpentSeconds || 0,
        note: state?.note || '',
        isMarked: marked[id] || false,
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

    router.replace("/");
  };

  // Loading state
  if (!test || !currentQuestion) {
    return (
      <main className={`w-full min-h-screen bg-gray-100 ${settings.theme === 'dark' ? 'dark' : ''}`}>
        {/* Top Navigation Bar */}
        <header className="bg-primary text-white px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
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

  // Check if explanation should be shown (based on settings and submission)
  const showExplanation = settings.showExplanations && currentState?.showExplanation || false;

  // Dynamic styles based on theme
  const mainBgClass = settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const headerBgClass = settings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-primary text-dark';
  const contentBgClass = settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const mutedTextClass = settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColorClass = settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const sidebarBgClass = settings.theme === 'dark' ? 'bg-gray-850' : 'bg-gray-50';
  const optionBgClass = settings.theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  const optionHoverClass = settings.theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

  return (
    <main ref={containerRef} className={`w-full min-h-screen ${mainBgClass} ${settings.theme}`}>
      {/* Tutorial */}
      {runTutorial && (
        <Joyride
          steps={TUTORIAL_STEPS}
          run={runTutorial}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          styles={{
            options: {
              primaryColor: '#FFCA00',
              textColor: '#1f2937',
              backgroundColor: '#ffffff',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          callback={(data) => {
            const { status } = data;
            if (status === 'finished' || status === 'skipped') {
              setRunTutorial(false);
              setShowTutorialMenu(false);
            }
          }}
        />
      )}

      {/* Note Modal */}
      <NoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        questionId={currentQuestion.id}
        initialNote={currentState?.note}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />

      {/* Top Navigation Bar */}

      {/* Main Content Area - Fixed height calculation */}
      <div className={`flex h-[calc(108vh-36px-40px)] ${settings.theme}`}>
        {/* Left Sidebar - Full height */}
        <aside
          className={`question-sidebar w-full md:w-30 border-b ${borderColorClass} md:border-b-0 md:border-r ${sidebarBgClass} overflow-y-auto transition-all duration-300 ${isSidebarVisible ? '' : 'hidden md:hidden'
            }`}
        >

          <div className="p-0 grid grid-cols-10 md:grid-cols-1 gap-0 text-xs">
            {test.questions.map((q, idx) => {
              const status = getQuestionStatus(q);
              const isActive = idx === currentIndex;
              const isMarked = marked[q.id];
              const hasNote = answers[q.id]?.note; // Check if question has a note
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  // className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center relative ${isActive ? "border-primary ring-2 ring-primary" : `border-${borderColorClass}`
                  //   } ${status === "correct"
                  //     ? "bg-green-100 text-green-700 hover:bg-green-200"
                  //     : status === "incorrect"
                  //       ? "bg-red-100 text-red-700 hover:bg-red-200"
                  //       : `${optionBgClass} ${textColorClass} hover:bg-gray-100`
                  //   }`}
                  className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 px-0 text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-200"} relative ${isActive ? "bg-primary text-dark" : `border-${borderColorClass}`
                    } 
                    `}
                >
                  <span className="flex-1 text-left md:text-center">
                    {idx + 1} {isMarked && (
                      <span className="hidden md:inline-block text-[13px] text-red-500 ml-1">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 22 30"
                        >
                          <g stroke="#FCFCFC" strokeWidth="2.2" fill="#B70808">
                            <g>
                              <line x1="10" y1="35" x2="1.5" y2="4" />
                              <path
                                d="M20,8c-2,3-4,7-7,8c-2,1-5,2-7,3C5,14,4,9,1,5C8,1,13,10,20,8z"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                    )}
                  </span>

                  {/* {hasNote && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full md:static md:ml-1" title="Has note" />
                  )} */}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <section className={`flex-1 flex flex-col ${contentBgClass} overflow-hidden`}>
          <header className={`${headerBgClass} px-4 py-0 border-b ${borderColorClass}`}>
            <div className="flex items-center">

              {/* Left Section - with menu button */}
              <div className="flex items-center gap-4 flex-1">
                {/* Menu Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer mr-2"
                  title={isSidebarVisible ? "Hide Questions Index" : "Show Questions Index"}
                >
                  <BiMenu />
                </button>

                {/* Left Section */}
                <div className="question-number text-sm font-medium">
                  Question {currentIndex + 1} of {test.questions.length}
                </div>

                <button
                  type="button"
                  onClick={toggleMarkCurrent}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 22 30"
                  >
                    <g stroke="#FCFCFC" strokeWidth="2.2" fill="#B70808">
                      <g>
                        <line x1="10" y1="35" x2="1.5" y2="4" />
                        <path
                          d="M20,8c-2,3-4,7-7,8c-2,1-5,2-7,3C5,14,4,9,1,5C8,1,13,10,20,8z"
                        />
                      </g>
                    </g>
                  </svg>

                  {isCurrentMarked ? "Marked" : "Mark"}
                </button>
                {/* <div className={`text-xs opacity-80 ${mutedTextClass}`}>
                  ID: {currentQuestion.id}
                </div> */}
              </div>

              {/* Center Section - Navigation Buttons */}
              <div className="nav-buttons flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8" />
                  </svg>
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === test.questions.length - 1}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" />
                  </svg>
                  Next
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                {/* <button
                  type="button"
                  onClick={toggleMarkCurrent}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#fc0000" fill="none" stroke="#fc0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 7L4 21" />
                    <path d="M11.7576 3.90865C8.45236 2.22497 5.85125 3.21144 4.55426 4.2192C4.32048 4.40085 4.20358 4.49167 4.10179 4.69967C4 4.90767 4 5.10138 4 5.4888V14.7319C4.9697 13.6342 7.87879 11.9328 11.7576 13.9086C15.224 15.6744 18.1741 14.9424 19.5697 14.1795C19.7633 14.0737 19.8601 14.0207 19.9301 13.9028C20 13.7849 20 13.6569 20 13.4009V5.87389C20 5.04538 20 4.63113 19.8027 4.48106C19.6053 4.33099 19.1436 4.459 18.2202 4.71504C16.64 5.15319 14.3423 5.22532 11.7576 3.90865Z" />
                  </svg>
                  {isCurrentMarked ? "Marked" : "Mark"}
                </button> */}

                <button
                  type="button"
                  onClick={toggleFullScreen}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  {isFullScreen ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6.50232 13.2635C7.34673 13.2515 10.1432 12.6706 10.7361 13.2635C11.329 13.8564 10.7481 16.6529 10.7361 17.4973M13.2685 6.49733C13.2565 7.34173 12.6756 10.1382 13.2685 10.7311C13.8614 11.324 16.6579 10.7431 17.5023 10.7311M20.9991 2.99902L13.6103 10.3812M10.3691 13.6237L3 21.001" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8.00001 3.09779C8.00001 3.09779 4.03375 2.74194 3.38784 3.38785C2.74192 4.03375 3.09784 8 3.09784 8" />
                    <path d="M8.00001 20.9022C8.00001 20.9022 4.03375 21.2581 3.38784 20.6122C2.74192 19.9662 3.09784 16 3.09784 16" />
                    <path d="M16 3.09779C16 3.09779 19.9663 2.74194 20.6122 3.38785C21.2581 4.03375 20.9022 8 20.9022 8" />
                    <path d="M16 20.9022C16 20.9022 19.9663 21.2581 20.6122 20.6122C21.2581 19.9662 20.9022 16 20.9022 16" />
                    <path d="M14.0107 9.99847L20.0625 3.94678" />
                    <path d="M9.99696 14.0024L3.63966 20.3807" />
                    <path d="M9.99732 10.0024L3.84571 3.85889" />
                    <path d="M13.9795 14.0024L20.5279 20.4983" />
                  </svg>}
                  {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTutorialMenu(!showTutorialMenu)}
                    className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5" />
                      <path d="M12.0001 17H12.009" />
                    </svg>
                    Tutorial
                  </button>

                  {/* Tutorial Menu */}
                  {showTutorialMenu && (
                    <div className={`absolute right-0 mt-2 w-48 ${optionBgClass} rounded-md shadow-lg z-50 border ${borderColorClass}`}>
                      <button
                        onClick={() => {
                          setRunTutorial(true);
                          setShowTutorialMenu(false);
                        }}
                        className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                      >
                        Interface Tutorial
                      </button>
                      <button
                        onClick={() => {
                          setShowKeyboardShortcuts(true);
                          setShowTutorialMenu(false);
                        }}
                        className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                      >
                        Keyboard Shortcuts
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowLabValues(true);
                    setShowCalculator(false);
                    setShowSettings(false);
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5V9" />
                    <path d="M8 2H10C11.1046 2 12 2.89543 12 4V5H10C8.89543 5 8 4.10457 8 3V2Z" />
                    <path d="M16.8148 22H7.18524C6.53065 22 6 21.4693 6 20.8148C6 20.6085 6.05383 20.4058 6.15616 20.2267L10 13.5V9H14V13.5L17.8438 20.2267C17.9462 20.4058 18 20.6085 18 20.8148C18 21.4693 17.4693 22 16.8148 22Z" />
                    <path d="M9 9H15" />
                    <path d="M16 3H14C12.8954 3 12 3.89543 12 5V6H14C15.1046 6 16 5.10457 16 4V3Z" />
                  </svg>
                  Lab Values
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowCalculator(true);
                    setShowLabValues(false);
                    setShowSettings(false);
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21.5 12.95V11.05C21.5 7.01949 21.5 5.00424 20.1088 3.75212C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.75212C2.5 5.00424 2.5 7.01949 2.5 11.05V12.95C2.5 16.9805 2.5 18.9958 3.89124 20.2479C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.2479C21.5 18.9958 21.5 16.9805 21.5 12.95Z" />
                    <path d="M18 8H14M16 6L16 10" />
                    <path d="M18 17.5H14" />
                    <path d="M18 14.5H14" />
                    <path d="M10 17.5L8.25 15.75M8.25 15.75L6.5 14M8.25 15.75L10 14M8.25 15.75L6.5 17.5" />
                    <path d="M10 8H6" />
                  </svg>

                  Calculator
                </button>

                <button
                  type="button"
                  onClick={handleOpenNote} // Add click handler
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer relative"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 160 160"
                  >
                    <rect x="0" y="20" width="130" height="80" fill="#FCFCFC" />

                    <text
                      x="20"
                      y="70"
                      style={{
                        fontFamily: '"Chalkboard SE", "Segoe Print", cursive',
                        fontSize: 40
                      }}
                    >
                      ABC
                    </text>

                    <g transform="rotate(25) translate(100,-20)">
                      <g>
                        <rect
                          transform="rotate(-60,90,48)"
                          width="90"
                          height="30"
                          fill="#F7971D"
                        />
                        <polyline points="3,102 5,127 30,117" fill="#FFF" />
                        <polyline points="4.5,117 5,127 14.5,123" />
                        <rect
                          transform="rotate(-60,45,-30)"
                          width="25"
                          height="30"
                          fill="#F06567"
                        />
                      </g>
                    </g>
                  </svg>
                  Note
                  {currentState?.note && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(true);
                    setShowLabValues(false);
                    setShowCalculator(false);
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 19L11.1069 10.7479C9.76348 6.91597 9.09177 5 8 5C6.90823 5 6.23652 6.91597 4.89309 10.7479L2 19M4.5 12H11.5" />
                    <path d="M21.9692 13.9392V18.4392M21.9692 13.9392C22.0164 13.1161 22.0182 12.4891 21.9194 11.9773C21.6864 10.7709 20.4258 10.0439 19.206 9.89599C18.0385 9.75447 17.1015 10.055 16.1535 11.4363M21.9692 13.9392L19.1256 13.9392C18.6887 13.9392 18.2481 13.9603 17.8272 14.0773C15.2545 14.7925 15.4431 18.4003 18.0233 18.845C18.3099 18.8944 18.6025 18.9156 18.8927 18.9026C19.5703 18.8724 20.1955 18.545 20.7321 18.1301C21.3605 17.644 21.9692 16.9655 21.9692 15.9392V13.9392Z" />
                  </svg>
                  Text Zoom
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(true);
                    setShowLabValues(false);
                    setShowCalculator(false);
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" />
                    <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" />
                  </svg>
                  <span>Settings</span>
                </button>
              </div>

            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden ">
            {/* Question Area */}
            <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${showLabValues || showCalculator || showSettings ? 'lg:w-1/2' : 'lg:w-full'}`}>
              <div className="prose prose-sm max-w-none mb-6">
                <div
                  className={`${textColorClass} text-sm md:text-base leading-relaxed`}
                  style={{ fontSize: `${settings.fontSize}px` }}
                  dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentQuestion.question) }}
                />
              </div>

              <div className="w-full flex justify-left">
                <div className="w-full max-w-2xl border border-primary p-2 bg-white">
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                      const selected =
                        currentState && currentState.selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;
                      const showFeedback = !!currentState?.showExplanation;

                      // Disable option clicks if answer has been submitted
                      const isDisabled = showFeedback;

                      let optionClass = `flex items-center gap-3 px-3 py-2 border rounded text-sm w-full text-left transition-all`;
                      optionClass += isDisabled ? " cursor-not-allowed opacity-75" : " cursor-pointer";

                      if (showFeedback) {
                        if (isCorrect) {
                          optionClass += " border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                        } else if (selected && !isCorrect) {
                          optionClass += " border-red-500 bg-red-50 text-red-800 ring-1 ring-red-500";
                        } else if (!selected) {
                          optionClass += ` border-${borderColorClass} ${optionBgClass}`;
                        }
                      } else if (selected) {
                        optionClass += " border-primary bg-primary/50 ring-0 ring-primary";
                      } else {
                        optionClass += ` border-${borderColorClass} ${optionBgClass} hover:border-gray-400 ${optionHoverClass}`;
                      }

                      return (
                        <label
                          key={option}
                          className={`
      flex items-start gap-3 rounded-lg cursor-pointer transition-all
      ${isDisabled ? "opacity-70 cursor-not-allowed" : ""}
      
    `}
                          style={{ fontSize: `${settings.fontSize}px` }}
                        >
                          {/* ✅ Icon (Left Side) */}
                          {showFeedback && (
                            <div className="w-5 h-5 flex items-center justify-center mt-1">
                              {isCorrect && (
                                <svg
                                  className="w-5 h-5 text-green-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}

                              {selected && !isCorrect && (
                                <svg
                                  className="w-5 h-5 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </div>
                          )}

                          {/* Radio Button */}
                          <input
                            type="radio"
                            name="question-option"
                            value={option}
                            checked={selected}
                            disabled={isDisabled}
                            onChange={() => !isDisabled && handleSelectOption(option)}
                            className="mt-1 w-4 h-4 accent-primary"
                          />

                          {/* Option Letter */}
                          <span className="font-semibold min-w-[24px]">
                            {String.fromCharCode(65 + idx)}.
                          </span>

                          {/* Option Text */}
                          <span
                            className="flex-1"
                            dangerouslySetInnerHTML={{ __html: option }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={currentState?.showExplanation}
                  className={`submit-button px-6 py-2 rounded shadow text-sm font-medium ${currentState?.showExplanation
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-primary text-dark hover:bg-blue-800"
                    }`}
                >
                  {currentState?.showExplanation ? "Already Submitted" : "Submit"}
                </button>
              </div>
              {showExplanation && currentState && (
                <div className="grid grid-cols-3 items-center exam-card-shadow">

                  {/* LEFT SECTION */}
                  <div
                    className={`flex items-start gap-3 px-4 py-4 border-l-4 ${currentStatus === "correct"
                      ? "border-green-600"
                      : "border-red-600"
                      }`}
                  >
                    <div>
                      <div
                        className={`text-base font-semibold ${currentStatus === "correct"
                          ? "text-green-700"
                          : "text-red-700"
                          }`}
                      >
                        {currentStatus === "correct" ? "Correct" : "Incorrect"}
                      </div>

                      <div className="text-sm text-gray-600">
                        Correct answer{" "}
                        <span className="font-semibold">
                          {String.fromCharCode(65 + correctIndex)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CENTER SECTION */}
                  <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6d7484" fill="none" stroke="#6d7484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 4V14C3 16.8284 3 18.2426 3.87868 19.1213C4.75736 20 6.17157 20 9 20H21" />
                      <path d="M7 16L16 16" />
                      <path d="M7 12L20 12" />
                      <path d="M7 8L13 8" />
                    </svg>
                    <div>
                      <div className="font-semibold">
                        {(currentQuestion as any).correctPercentage || 66}%
                      </div>
                      <div className="text-xs text-gray-500">
                        Answered correctly
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  {currentState.timeSpentSeconds != null && (
                    <div className="flex items-center justify-end gap-2 px-4 py-4 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold">
                          {Math.floor(currentState.timeSpentSeconds / 60)} mins{" "}
                          {currentState.timeSpentSeconds % 60} secs
                        </div>
                        <div className="text-xs text-gray-500">
                          Time Spent
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* {showExplanation && currentState && (
                <div className={`mt-4 border ${borderColorClass} rounded-lg bg-gray-50 overflow-hidden`}>
                  <div
                    className={`flex flex-wrap items-center gap-4 px-4 py-3 border-l-4 ${currentStatus === "correct"
                      ? "border-green-600 bg-green-50"
                      : "border-red-600 bg-red-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`text-sm font-semibold flex items-center gap-2 ${currentStatus === "correct"
                          ? "text-green-700"
                          : "text-red-700"
                          }`}
                      >
                        {currentStatus === "correct" ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Correct
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Incorrect
                          </>
                        )}
                      </div>
                      <div className={`text-xs ${optionBgClass} px-2 py-1 rounded-full shadow-sm ${mutedTextClass}`}>
                        Your answer: {String.fromCharCode(65 + currentQuestion.options.indexOf(currentState.selectedOption || ''))}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-6 text-xs ${mutedTextClass}">
                      {currentState.timeSpentSeconds != null && (
                        <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
                          <span className="font-semibold text-base">
                            {currentState.timeSpentSeconds}s
                          </span>
                          <span className={mutedTextClass}>Time Spent</span>
                        </div>
                      )}

                      <div className={`flex items-center gap-2 ${optionBgClass} px-3 py-1 rounded-full shadow-sm`}>
                        <span className="font-semibold text-base">
                          {String.fromCharCode(65 + correctIndex)}
                        </span>
                        <span className={mutedTextClass}>Correct Answer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>

            {/* Right Explanation Panel - Only shown after submission and if enabled in settings */}
            {showExplanation && (
              <aside className={`explanation-panel w-full lg:w-[38%] border-t ${borderColorClass} lg:border-t-0 lg:border-l ${sidebarBgClass} flex flex-col overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${borderColorClass} text-xs font-semibold ${mutedTextClass} sticky top-0 ${sidebarBgClass} z-10`}>
                  Explanation
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  {/* If answer is incorrect, show why the selected option is wrong */}
                  {currentStatus === "incorrect" &&
                    currentState?.selectedOption &&
                    currentQuestion.optionExplanations &&
                    currentQuestion.optionExplanations.length > 0 && (
                      (() => {
                        const selectedIndex = currentQuestion.options.indexOf(currentState.selectedOption);
                        const selectedExplanation = currentQuestion.optionExplanations[selectedIndex];

                        // Only show if there's an explanation for this option
                        if (selectedExplanation && selectedExplanation.trim() !== "") {
                          return (
                            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                              <div className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Why your answer is incorrect
                              </div>
                              <div
                                className="prose prose-sm max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                  __html: decodeHtmlEntities(selectedExplanation),
                                }}
                              />
                            </div>
                          );
                        }
                        return null;
                      })()
                    )}

                  {/* Always show description (correct answer explanation) if it exists */}
                  {currentQuestion.description && (
                    <div className={`p-4 rounded-lg border ${currentStatus === "correct"
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                      }`}>
                      <div className={`text-xs font-semibold mb-2 flex items-center gap-1 ${currentStatus === "correct"
                        ? "text-green-700"
                        : "text-blue-700"
                        }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {currentStatus === "correct" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                        </svg>
                        {currentStatus === "correct"
                          ? "Correct Answer Explanation"
                          : "Correct Answer Explanation"}
                      </div>
                      <div
                        className="prose prose-sm max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtmlEntities(currentQuestion.description),
                        }}
                      />

                      {/* Show the correct answer letter */}
                      <div className="mt-2 text-xs font-medium text-gray-600">
                        Correct answer: {String.fromCharCode(65 + correctIndex)}
                      </div>
                    </div>
                  )}

                  {/* If no explanation available at all */}
                  {!currentQuestion.description &&
                    (!currentQuestion.optionExplanations ||
                      currentQuestion.optionExplanations.every(exp => !exp || exp.trim() === "")) && (
                      <div className={`p-4 ${sidebarBgClass} rounded-lg border ${borderColorClass} text-center`}>
                        <p className={`text-sm ${mutedTextClass} italic`}>
                          No explanation available for this question.
                        </p>
                      </div>
                    )}
                </div>
              </aside>
            )}
          </div>
          <footer className={`footer h-10 ${headerBgClass} flex items-center justify-between px-4 text-xs`}>
            {settings.showTimer && (
              <div>
                Block Time Elapsed: {formatTime(elapsedSeconds)}
              </div>
            )}
            <div className={`flex items-center gap-4 ${settings.showTimer ? '' : 'ml-auto'}`}>
              <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Medical Library</span>
              <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>My Notebook</span>
              <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Flashcards</span>
              <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Feedback</span>
              <span className={`hover:underline cursor-pointer ${mutedTextClass}`}>Suspend</span>
              <button
                type="button"
                onClick={handleEndTest}
                className="end-test-button inline-flex items-center gap-2 px-4 py-2 bg-red-400 border border-red-500 rounded hover:bg-red-400 transition-colors text-sm font-medium cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none" stroke="#ff0000" stroke-width="1.5">
                  <path d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z" />
                </svg>
                End Block
              </button>
            </div>
          </footer>
        </section>
      </div>

      {/* Footer - Fixed height */}


      <Modal
        title="Keyboard Shortcuts"
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      >
        <div className="p-4 space-y-3 text-sm">

          {[
            ["a,b,c,d", "Answer choice selector"],
            ["Alt + m", "Mark question"],
            ["Alt + p", "Previous question"],
            ["Alt + n", "Next question"],
            ["Alt + f", "Feedback"],
            ["Alt + c", "Close window"],
            ["Alt + o", "Notes"], // Update this line
            ["Alt + u", "Calculator"],
            ["F11", "Full Screen"],
            ["Alt + l", "Lab Values"],
          ].map(([key, label], index) => (
            <div
              key={index}
              className={`flex items-center gap-6 py-2 ${index !== 9 ? "border-b border-gray-200" : ""
                }`}
            >
              <div className="bg-[#2f2f2f] text-white px-3 py-1 rounded shadow-inner font-mono text-xs min-w-[80px] text-center">
                {key}
              </div>

              <span className="text-gray-800 text-sm">
                {label}
              </span>
            </div>
          ))}

        </div>
      </Modal>

      {/* Lab Values Side Panel */}
      <SidePanel
        isOpen={showLabValues}
        onClose={() => setShowLabValues(false)}
        title="Laboratory Values Reference"
      >
        <div className="space-y-6">
          {Object.entries(LAB_VALUES).map(([category, values]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold capitalize mb-2">{category}</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {values.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.test}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </SidePanel>

      {/* Calculator Side Panel */}
      <SidePanel
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        title="Calculator"
      >
        <Calculator />
      </SidePanel>

      {/* Settings Side Panel */}
      <SidePanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
      >
        <SettingsPanel settings={settings} onSettingsChange={setSettings} />
      </SidePanel>
    </main>
  );
}