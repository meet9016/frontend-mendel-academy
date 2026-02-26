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
import { BiFontSize, BiNotepad } from "react-icons/bi";

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

            const initialAnswers: AnswerState = {};
            const initialMarks: Record<string, boolean> = {};

            if (d.perQuestion && Array.isArray(d.perQuestion)) {
              d.perQuestion.forEach((item: any) => {
                initialAnswers[item.questionId] = {
                  selectedOption: item.selectedOption || null,
                  isCorrect: item.isCorrect === null ? null : item.isCorrect,
                  showExplanation: item.isAnswered === true, // Assuming isAnswered implies submitted
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
      />

      {/* Top Navigation Bar */}

      {/* Main Content Area - Fixed height calculation */}
      <div className={`flex h-[calc(108vh-40px-40px)] ${settings.theme}`}>
        {/* Left Sidebar - Full height */}
        <aside className={`question-sidebar w-full md:w-48 border-b ${borderColorClass} md:border-b-0 md:border-r ${sidebarBgClass} overflow-y-auto`}>
          <div className={`px-3 py-2 border-b ${borderColorClass} ${optionBgClass} text-xs font-semibold sticky top-0 z-10`}>
            Items
          </div>
          <div className="p-2 grid grid-cols-10 md:grid-cols-1 gap-1 text-xs">
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
                  className={`flex items-center justify-between h-7 w-7 md:w-full md:h-8 rounded border px-2 text-center relative ${isActive ? "border-primary ring-2 ring-primary" : `border-${borderColorClass}`
                    } ${status === "correct"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : status === "incorrect"
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : `${optionBgClass} ${textColorClass} hover:bg-gray-100`
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
                  {hasNote && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full md:static md:ml-1" title="Has note" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <section className={`flex-1 flex flex-col ${contentBgClass} overflow-hidden`}>
          <header className={`${headerBgClass} px-4 py-3 border-b ${borderColorClass}`}>
            <div className="flex items-center">

              {/* Left Section */}
              <div className="flex items-center gap-4 flex-1">
                <div className="question-number text-sm font-medium">
                  Question {currentIndex + 1} of {test.questions.length}
                </div>
                <div className={`text-xs opacity-80 ${mutedTextClass}`}>
                  ID: {currentQuestion.id}
                </div>
                {currentState?.note && (
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <BiNotepad className="w-3 h-3" />
                    <span>Note saved</span>
                  </div>
                )}
              </div>

              {/* Center Section - Navigation Buttons */}
              <div className="nav-buttons flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <GoTriangleLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === test.questions.length - 1}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <GoTriangleRight className="w-4 h-4 ml-1" />
                  Next
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <button
                  type="button"
                  onClick={toggleMarkCurrent}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  <BsFillFlagFill className="w-4 h-4 mr-1" />
                  {isCurrentMarked ? "Marked" : "Mark"}
                </button>

                <button
                  type="button"
                  onClick={toggleFullScreen}
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                >
                  {isFullScreen ? <TbBracketsContain /> : <TbBracketsContainEnd />}
                  {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTutorialMenu(!showTutorialMenu)}
                    className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer"
                  >
                    <BsFillQuestionCircleFill className="w-4 h-4 mr-1" />
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
                  <TbFeather className="w-4 h-4 mr-1" />
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
                  <TbCalculator className="w-4 h-4 mr-1" />
                  Calculator
                </button>

                <button
                  type="button"
                  onClick={handleOpenNote} // Add click handler
                  className="flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer relative"
                >
                  <BiNotepad className="w-4 h-4 mr-1" />
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
                  <BiFontSize className="w-4 h-4 mr-1" />
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
                  <FiSettings className="w-5 h-5 mb-1 text-black" />
                  <span>Settings</span>
                </button>
              </div>

            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Question Area */}
            <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${showLabValues || showCalculator || showSettings ? 'lg:w-1/2' : 'lg:w-full'}`}>
              <div className="prose prose-sm max-w-none mb-6">
                <div
                  className={`${textColorClass} text-sm md:text-base leading-relaxed`}
                  style={{ fontSize: `${settings.fontSize}px` }}
                  dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentQuestion.question) }}
                />
              </div>

              <div className="options-container space-y-3 mb-4">
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
                    <button
                      key={option}
                      type="button"
                      onClick={() => !isDisabled && handleSelectOption(option)}
                      disabled={isDisabled}
                      className={optionClass}
                      style={{ fontSize: `${settings.fontSize}px` }}
                    >
                      <span className="text-xs font-semibold w-5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="flex-1 text-left" dangerouslySetInnerHTML={{ __html: option }} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-4">
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
              )}
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
                <span className="h-5 w-5 rounded-full bg-red-500" />
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