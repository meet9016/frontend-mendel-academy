"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';
import Calculator from "@/component/exam/Calculator";
import { NoteModal } from "@/component/exam/NoteModal"; // Add this import
import { FeedbackModal } from "@/component/exam/FeedbackModal";
import { Modal, SidePanel, ThemeSidePanel, TransParentModal } from "@/component/exam/SidePanel";
import { LAB_VALUES, TUTORIAL_STEPS } from "@/utils/constant";
import { SettingsPanel } from "@/component/exam/SettingsPanel";
import TestHeader from "@/component/exam/TestHeader";
import TestFooter from "@/component/exam/TestFooter";
import { FlashcardModal } from "@/component/exam/Flashcard";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";
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
    highlights?: {
      question?: string;
      options?: string[];
      explanation?: string;
    };
  };
};

// Settings type
type TestSettings = {
  fontSize: number; // in pixels, base 14px
  theme: 'light' | 'dark';
  showTimer: boolean;
  showExplanations: boolean;
  confirmOmission: boolean;
  highlighterColor: string;
  highlighterEnabled: boolean;
  primaryColor?: string; // Add primary color for dynamic theming
  secondaryColor?: string; // Add secondary color for dynamic theming
  accentColor?: string; // Add accent color for dynamic theming
};

export default function TestRunPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [runTutorial, setRunTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [showLabValues, setShowLabValues] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false); // Add this state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState<string>('');
  const [test, setTest] = useState<ActiveTest | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [showTutorialMenu, setShowTutorialMenu] = useState(false);
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [selectedLabCategory, setSelectedLabCategory] = useState<string>('hematology'); // Default to first category
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
      highlighterColor: '#FFFF00', // Default yellow
      highlighterEnabled: false,
      primaryColor: '#FFCA00', // Default primary color
      secondaryColor: '#3B82F6', // Default secondary color
      accentColor: '#10B981', // Default accent color
    };
  });
  const [fontColor, setFontColor] = useState("#ffffffff");
  function getTextColor(bgColor: string) {
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 150 ? '#000000' : '#FFFFFF';
  }

  function getTextColorClass(bgColor: string) {
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 150 ? 'text-gray-900' : 'text-white';
  }
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

  // Apply dynamic CSS variables for colors
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor || '#FFCA00');
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor || '#3B82F6');
    document.documentElement.style.setProperty('--accent-color', settings.accentColor || '#10B981');

    // Also set text colors based on theme
    if (settings.theme === 'dark') {
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#e5e7eb');
    } else {
      document.documentElement.style.setProperty('--text-primary', '#111827');
      document.documentElement.style.setProperty('--text-secondary', '#4b5563');
    }
  }, [settings.primaryColor, settings.secondaryColor, settings.accentColor, settings.theme]);

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


  const handleCreateFlashcard = () => {
    if (!currentQuestion) return;
    setShowFlashcardModal(true);
  };

  // Handle functions
  const handleSelectOption = (option: string) => {
    if (!currentQuestion) return;

    // Get current state for this question
    const currentState = answers[currentQuestion.id];

    // Prevent option selection if answer has already been submitted
    if (currentState?.showExplanation) {
      InfoToast("You cannot change your answer after submission");
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
      InfoToast("You have already submitted an answer for this question");
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
              SuccessToast("Question omitted successfully");
            } catch (error) {
              console.error("Failed to save omission to server:", error);
              ErrorToast("Failed to save answer. Will retry on next save.");
              // You might want to add to a retry queue here
            }
          }
        }
      } else {
        ErrorToast("Please select an answer");
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
          SuccessToast("Correct answer! Well done!");
        } else {
          InfoToast(`Answer submitted. The correct answer is ${String.fromCharCode(65 + currentQuestion.options.indexOf(currentQuestion.correctAnswer))}`);
        }
      } catch (error) {
        console.error("Failed to save answer to server:", error);
        ErrorToast("Answer saved locally but failed to sync to server. Will retry.");
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
        SuccessToast('Note saved successfully');
      } catch (error) {
        console.error('Failed to save note to server:', error);
        ErrorToast('Failed to save note. Will retry on next save.');
        // You might want to implement a retry queue here
      }
    } else {
      SuccessToast('Note saved locally');
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
        SuccessToast('Note deleted successfully');
      } catch (error) {
        console.error('Failed to delete note from server:', error);
        ErrorToast('Failed to delete note. Will retry on next save.');
        // You might want to implement a retry queue here
      }
    } else {
      SuccessToast('Note deleted locally');
    }
  };

  // Feedback handling functions
  const handleFeedback = async () => {
    if (!test?.attemptId) return;

    // Try to fetch existing feedback
    try {
      const res = await api.get(`${endPointApi.getFeedback}/${test.attemptId}`);
      if (res.data && res.data.feedback) {
        setExistingFeedback(res.data.feedback);
      } else {
        setExistingFeedback('');
      }
    } catch (error) {
      // If no feedback exists, that's fine - just set empty
      setExistingFeedback('');
    }

    setShowFeedbackModal(true);
  };

  const handleSaveFeedback = async (attemptId: string, feedback: string) => {
    try {
      await api.post(
        `${endPointApi.addFeedback}`,
        { attemptId, feedback: feedback.trim() }
      );
      SuccessToast('Feedback submitted successfully');
      setExistingFeedback(feedback.trim());
    } catch (error) {
      console.error('Failed to save feedback to server:', error);
      ErrorToast('Failed to submit feedback. Please try again.');
    }
  };

  const handleApplyHighlight = (type: 'question' | 'options' | 'explanation', optionIndex?: number, event?: React.MouseEvent) => {
    if (!currentQuestion) return;

    // Handle removal if clicking an existing highlight
    if (event && (event.target as HTMLElement).classList.contains('highlight-mark')) {
      const target = event.target as HTMLElement;
      const parent = target.parentNode;
      if (parent) {
        while (target.firstChild) {
          parent.insertBefore(target.firstChild, target);
        }
        parent.removeChild(target);

        // Sync state after DOM manipulation
        updateHighlightState(type);
      }
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === "") return;

    const range = selection.getRangeAt(0);

    const mark = document.createElement('mark');
    mark.className = 'highlight-mark primary-mark-highlight';
    mark.style.backgroundColor = settings.highlighterColor;
    mark.style.color = settings.theme === 'dark' ? '#ffffff' : '#000000';

    try {
      range.surroundContents(mark);
      updateHighlightState(type);
      selection.removeAllRanges();
    } catch (e) {
      console.warn("Could not highlight across multiple tags.");
    }
  };

  const updateHighlightState = (type: 'question' | 'options' | 'explanation') => {
    if (!currentQuestion) return;

    const questionArea = document.querySelector('.question-area-content');
    const optionsArea = document.querySelector('.options-area-content');
    const explanationArea = document.querySelector('.explanation-panel');

    setAnswers(prev => {
      const currentAnswer = prev[currentQuestion.id] || {
        selectedOption: null,
        isCorrect: null,
        showExplanation: false
      };

      const newHighlights = { ...(currentAnswer.highlights || {}) };

      if (type === 'question' && questionArea) {
        newHighlights.question = questionArea.innerHTML;
      } else if (type === 'options' && optionsArea) {
        newHighlights.options = Array.from(optionsArea.querySelectorAll('.option-text-wrapper')).map(el => el.innerHTML);
      } else if (type === 'explanation' && explanationArea) {
        newHighlights.explanation = explanationArea.innerHTML;
      }

      return {
        ...prev,
        [currentQuestion.id]: {
          ...currentAnswer,
          highlights: newHighlights
        }
      };
    });
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
        if (showFeedbackModal) setShowFeedbackModal(false);
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
  }, [currentQuestion, isFullScreen, showTutorialMenu, showKeyboardShortcuts, showLabValues, showCalculator, showSettings, showNoteModal, showFeedbackModal, settings.confirmOmission, handleNext, handlePrevious, handleSubmit, toggleMarkCurrent, toggleFullScreen]);

  // Handle full screen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const getQuestionStatus = (question: Question) => {
    const state = answers[question?.id];
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
        ErrorToast(
          error?.response?.data?.message || "Failed to save test result"
        );
      }
    }

    router.replace("/");
  };

  const ExamSkeletonLoader = ({ settings }: { settings: any }) => {
    const isDark = settings?.theme === "dark";

    const bgBase = isDark ? "bg-gray-700" : "bg-gray-200";
    const bgSub = isDark ? "bg-gray-600" : "bg-gray-100";

    return (
      <main className={`w-full min-h-screen ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="flex h-[calc(112vh-116px)] flex-col">
          <div className="flex flex-1">
            {/* Left Sidebar */}
            <aside className="hidden md:block w-48 border-r border-white/10 flex-shrink-0">
              <div className={`px-3 py-2 border-b border-white/10 text-xs font-semibold ${isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"}`}>
                Items
              </div>
              <div className="p-2 space-y-2 animate-pulse">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-7 rounded ${bgSub}`}
                  />
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 flex flex-col">
              <header style={{ backgroundColor: isDark ? "#1d2838" : settings.primaryColor }} className={` px-4 py-2 border-b`}>
                <div className="flex items-center justify-between">

                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded animate-pulse bg-white/40" />
                    <div className="h-6 w-32 rounded animate-pulse bg-white/40" />
                    <div className="h-10 w-18 rounded animate-pulse bg-white/40" />
                  </div>

                  {/* Center Section */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-18 rounded-md animate-pulse bg-white/40" />
                    <div className="h-10 w-18 rounded-md animate-pulse bg-white/40" />
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-18 rounded-md animate-pulse bg-white/40"
                      />
                    ))}
                  </div>

                </div>
              </header>
              <div className="flex-1 flex flex-col lg:flex-row">
                {/* Question Section */}
                <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-6">
                  <div className="space-y-2 mb-6 animate-pulse">
                    <div className={`h-3 rounded w-full ${bgBase}`} />
                    <div className={`h-3 rounded w-11/12 ${bgBase}`} />
                    <div className={`h-3 rounded w-10/12 ${bgBase}`} />
                  </div>

                  <div className="space-y-3 mb-4 animate-pulse">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className={`h-9 rounded ${bgSub}`} />
                    ))}
                  </div>

                  <div className={`mt-4 h-16 rounded ${bgSub} animate-pulse`} />
                </div>

                {/* Right Panel: Explanation */}
                <aside className={`w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l flex flex-col ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <div className={`px-4 py-3 border-b border-white/10 text-xs font-semibold ${isDark ? "text-gray-300 bg-gray-800" : "text-gray-700 bg-gray-50"}`}>
                    Explanation
                  </div>
                  <div className="flex-1 px-4 py-3 space-y-2 animate-pulse">
                    <div className={`h-3 rounded w-10/12 ${bgSub}`} />
                    <div className={`h-3 rounded w-11/12 ${bgSub}`} />
                    <div className={`h-3 rounded w-9/12 ${bgSub}`} />
                    <div className={`h-3 rounded w-8/12 ${bgSub}`} />
                  </div>
                </aside>
              </div>
              <footer className={`h-14 ${isDark ? "bg-gray-900 border-t border-gray-700" : "bg-primary border-t border-gray-200"} flex items-center justify-between px-4 text-xs`}>
                {/* Timer Skeleton */}
                <div className="flex items-center gap-1">
                  <div className="h-6 w-60 rounded animate-pulse bg-white/40" />
                </div>

                {/* Footer Links Skeleton */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div className="h-5 w-5 rounded animate-pulse bg-white/40" />
                      <div className="h-5 w-16 rounded animate-pulse bg-white/40" />
                    </div>
                  ))}

                  {/* End Block Button Skeleton */}
                  <div className="flex flex-col items-center gap-1 ml-2">
                    <div className="h-5 w-5 rounded animate-pulse bg-white/40" />
                    <div className="h-5 w-12 rounded animate-pulse bg-white/40" />
                  </div>
                </div>
              </footer>
            </section>
          </div>

          {/* Footer */}

        </div>
      </main>
    );
  };

  // Loading state
  if (!test || !currentQuestion) {
    return (
      <ExamSkeletonLoader settings={settings} />
    )
  }

  const currentState = answers[currentQuestion?.id];
  const currentStatus = getQuestionStatus(currentQuestion);
  const isCurrentMarked = marked[currentQuestion?.id];

  const correctIndex = currentQuestion?.options.indexOf(
    currentQuestion?.correctAnswer
  );

  // Check if explanation should be shown (based on settings and submission)
  const showExplanation = settings.showExplanations && currentState?.showExplanation || false;

  // Dynamic styles based on theme and primary color
  const mainBgClass = settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const headerBgClass = settings.theme === 'dark'
    ? 'bg-gray-800 text-white'
    : 'text-dark';
  const headerBgStyle = settings.theme === 'dark'
    ? undefined
    : { backgroundColor: settings.primaryColor || '#FFCA00' };
  const contentBgClass = settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = settings.theme === 'dark' ? 'text-gray-200' : getTextColorClass(settings.primaryColor || '#FFCA00');
  const textColorClass2 = settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const mutedTextClass = settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColorClass = settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const sidebarBgClass = settings.theme === 'dark' ? 'bg-gray-850' : 'bg-gray-50';
  const optionBgClass = settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-white';
  const optionHoverClass = settings.theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

  // Add custom styles for primary color
  const primaryColorStyle = {
    backgroundColor: settings.theme === 'dark' ? settings.primaryColor : settings.primaryColor,
    color: settings.theme === 'dark' ? '#ffffff' : '#000000',
  };

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
              primaryColor: settings.primaryColor || '#FFCA00',
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
        questionId={currentQuestion?.id}
        initialNote={currentState?.note}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        settings={settings}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        attemptId={test?.attemptId || ''}
        initialFeedback={existingFeedback}
        onSave={handleSaveFeedback}
        settings={settings}
      />

      {/* Main Content Area - Fixed height calculation */}
      <div className={`flex h-[calc(108vh-36px-40px)] ${settings.theme}`}>
        {/* Left Sidebar - Full height */}
        <aside
          className={`question-sidebar w-full md:w-30 border-b ${borderColorClass} md:border-b-0 md:border-r ${sidebarBgClass} overflow-y-auto transition-all duration-300 ${isSidebarVisible ? '' : 'hidden md:hidden'
            }`}
        >

          <div className="p-0 grid grid-cols-10 md:grid-cols-1 gap-0 text-xs">
            {test?.questions?.map((q, idx) => {
              const status = getQuestionStatus(q);
              const isActive = idx === currentIndex;
              const isMarked = marked[q.id];
              const hasNote = answers[q.id]?.note; // Check if question has a note
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  style={isActive ? { backgroundColor: settings.primaryColor || '#FFCA00' } : undefined}
                  className={`cursor-pointer
    flex items-center justify-between 
    h-7 w-7 md:w-full md:h-8 
    px-0 text-center relative
    transition-colors duration-200
    ${isActive
                      ? `text-white`
                      : settings.theme === "dark"
                        ? idx % 2 === 0
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-700 text-gray-200"
                        : idx % 2 === 0
                          ? "bg-gray-100 text-gray-800"
                          : "bg-white text-gray-800"
                    }`}
                >
                  <span className="flex-1 text-left md:text-center">
                    {idx + 1} {isMarked && (
                      <span className="hidden md:inline-block text-[13px] text-red-500 ml-1">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 22 30"
                        >
                          <g stroke={
                            isActive
                              ? getTextColor(settings.primaryColor)
                              : settings.theme === "dark"
                                ? getTextColor("#000000")
                                : getTextColor("#FFFFFF")
                          } strokeWidth="2.2" fill="#B70808">
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
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <section className={`flex-1 flex flex-col ${contentBgClass} overflow-hidden`}>

          <TestHeader
            headerBgClass={headerBgClass}
            headerBgStyle={headerBgStyle}
            borderColorClass={borderColorClass}
            textColorClass={textColorClass}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            test={test}
            currentIndex={currentIndex}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            isCurrentMarked={isCurrentMarked}
            toggleMarkCurrent={toggleMarkCurrent}
            handleOpenNote={handleOpenNote}
            toggleFullScreen={toggleFullScreen}
            isFullScreen={isFullScreen}
            setRunTutorial={setRunTutorial}
            setShowTutorialMenu={setShowTutorialMenu}
            showTutorialMenu={showTutorialMenu}
            setShowKeyboardShortcuts={setShowKeyboardShortcuts}
            setShowLabValues={setShowLabValues}
            setShowCalculator={setShowCalculator}
            setShowSettings={setShowSettings}
            optionBgClass={optionBgClass}
            currentState={currentState}
            settings={settings}
            onSettingsChange={setSettings}
            setSettings={setSettings}
            getTextColor={getTextColor}
          />

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden ">
            <div
              style={{
                zIndex: 10,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-30deg)",
                fontSize: "130px",
                fontWeight: "bold",   // bold font
                opacity: 0.1,
                color: settings.theme === "dark" ? "#ffffff" : "#ffd00c",
                whiteSpace: "nowrap"
              }}
            >
              <div>Mendel</div>
              <div>Academy</div>
            </div>
            {/* Question Area */}
            <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${showLabValues || showCalculator || showSettings ? 'lg:w-1/2' : 'lg:w-full'}`}>
              <div className="prose prose-sm max-w-none mb-6">
                <div
                  className={`${textColorClass2} text-sm md:text-base leading-relaxed question-area-content`}
                  style={{ fontSize: `${settings.fontSize}px` }}
                  dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentState?.highlights?.question || currentQuestion?.question) }}
                  onMouseUp={(e) => handleApplyHighlight('question', undefined, e)}
                />
              </div>

              <div className="w-full flex justify-left">
                <div className={`w-full max-w-2xl border ${textColorClass2}  ${borderColorClass} p-2 ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="space-y-3 options-area-content">
                    {currentQuestion?.options?.map((option, idx) => {
                      const selected =
                        currentState && currentState.selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;
                      const showFeedback = !!currentState?.showExplanation;

                      // Disable option clicks if answer has been submitted
                      const isDisabled = showFeedback;

                      let optionClass = `flex items-start gap-3 px-3 py-3 rounded transition-all w-full text-left`;

                      if (showFeedback) {
                        if (isCorrect) {
                          optionClass += ` ${borderColorClass} ${optionBgClass}`;
                        } else if (selected && !isCorrect) {
                          optionClass += ` ${borderColorClass} ${optionBgClass}`;
                        } else {
                          optionClass += ` ${borderColorClass} ${optionBgClass}`;
                        }
                      } else if (selected) {
                        optionClass += ` border-[${settings.primaryColor}] bg-[${settings.primaryColor}]/50 ring-0 ring-[${settings.primaryColor}]`;
                      } else {
                        optionClass += ` ${borderColorClass} ${optionBgClass} hover:border-gray-400 ${optionHoverClass}`;
                      }

                      return (
                        <label
                          key={option}
                          className={`${optionClass} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                          style={{ fontSize: `${settings.fontSize}px` }}
                        >
                          {/* ✅ Icon (Left Side) - Now part of the flex container */}
                          {showFeedback && (
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
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

                          <div className="flex items-center gap-3 w-full">
                            {/* Radio Button Container - ensures alignment */}
                            <div className="flex items-center justify-center mt-0.5 flex-shrink-0">
                              <input
                                type="radio"
                                name="question-option"
                                value={option}
                                checked={selected}
                                disabled={isDisabled}
                                onChange={() => !isDisabled && handleSelectOption(option)}
                                className="cursor-pointer"
                                style={{
                                  accentColor: settings.primaryColor || "#FFCA00",
                                  width: `${Math.max(16, settings.fontSize - 2)}px`,
                                  height: `${Math.max(16, settings.fontSize - 2)}px`
                                }}
                              />
                            </div>

                            {/* Option Letter */}
                            <span className="font-semibold min-w-[24px] flex-shrink-0">
                              {String.fromCharCode(65 + idx)}.
                            </span>

                            {/* Option Text Wrapper */}
                            <span
                              className="flex-1 option-text-wrapper prose prose-sm max-w-none"
                              onMouseUp={(e) => handleApplyHighlight('options', idx, e)}
                              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(currentState?.highlights?.options?.[idx] || option) }}
                            />
                          </div>
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
                  className={`submit-button cursor-pointer px-6 py-2 rounded shadow text-sm font-medium ${textColorClass} ${currentState?.showExplanation
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : `bg-[${settings.primaryColor}] text-dark hover:bg-[${settings.primaryColor}]/80`
                    }`}
                  style={!currentState?.showExplanation ? { backgroundColor: settings.primaryColor } : {}}
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
                    <div className={`p-4 rounded-lg border explanation-area-content ${currentStatus === "correct"
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                      }`}
                      onMouseUp={(e) => handleApplyHighlight('explanation', undefined, e)}
                    >
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
                          __html: decodeHtmlEntities(currentState?.highlights?.explanation || currentQuestion.description),
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
          <TestFooter
            textColorClass={textColorClass}
            headerBgStyle={headerBgStyle}
            settings={settings}
            elapsedSeconds={elapsedSeconds}
            mutedTextClass={textColorClass}
            handleEndTest={handleEndTest}
            formatTime={formatTime}
            handleCreateFlashcard={handleCreateFlashcard}
            handleFeedback={handleFeedback}
          />
        </section>
      </div>

      <Modal
        title="Keyboard Shortcuts"
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
        settings={settings}
      >
        <div className="p-2 space-y-3 text-sm">
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
              className={`flex items-center gap-6 py-1 ${index !== 9 ? " border-gray-200" : ""
                }`}
            >
              <div className={`px-3 py-2 rounded shadow-inner font-mono text-xs min-w-[80px] text-center ${settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-100'}`}>
                {key}
              </div>

              <span className={`text-gray-800 text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Lab Values Side Panel */}
      <ThemeSidePanel
        isOpen={showLabValues}
        onClose={() => setShowLabValues(false)}
        title="Laboratory Values Reference"
        settings={settings}
      >
        <div className="flex flex-col h-full">

          {/* Category Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-200 mb-4">
            {Object.keys(LAB_VALUES).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedLabCategory(category)}
                style={
                  selectedLabCategory === category
                    ? {
                      borderBottom: `2px solid ${settings.primaryColor}`,
                      color: settings.primaryColor,
                    }
                    : {}
                }
                className={`flex-1 cursor-pointer py-2 px-4 text-sm font-medium capitalize transition-colors duration-200
    ${selectedLabCategory === category
                    ? ""
                    : "text-gray-500 dark:text-gray-700 hover:text-gray-700 dark:hover:text-gray-800"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Selected Category Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedLabCategory && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="">
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-medium text-gray-900 ${settings.theme === 'dark' ? 'dark:text-gray-400' : ''} uppercase`}>
                          Test
                        </th>
                        <th className={`px-4 py-2 text-left text-xs font-medium text-gray-900 ${settings.theme === 'dark' ? 'dark:text-gray-400' : ''} uppercase`}>
                          Normal Range
                        </th>
                      </tr>
                    </thead>

                    <tbody className={`bg-white ${settings.theme === 'dark' ? 'dark:bg-gray-900' : ''} divide-y divide-gray-200 ${settings.theme === 'dark' ? 'dark:divide-gray-700' : ''}`}>
                      {LAB_VALUES[selectedLabCategory as keyof typeof LAB_VALUES].map(
                        (item, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 ${settings.theme === 'dark' ? 'dark:hover:bg-gray-800' : ''} transition-colors`}
                          >
                            <td className={`px-4 py-2 text-sm text-gray-900 ${settings.theme === 'dark' ? 'dark:text-gray-100' : 'text-gray-900'}`}>
                              {item.test}
                            </td>
                            <td className={`px-4 py-2 text-sm text-gray-600 ${settings.theme === 'dark' ? 'dark:text-gray-300' : 'text-gray-600'}`}>
                              {item.value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </ThemeSidePanel>

      {/* Calculator Side Panel */}
      <TransParentModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        title="Calculator"
        settings={settings}
      >
        <Calculator settings={settings} />
      </TransParentModal>

      <FlashcardModal
        isOpen={showFlashcardModal}
        onClose={() => setShowFlashcardModal(false)}
        testAttemptId={test?.attemptId}
        questionId={currentQuestion?.id}
        initialFront={""}
        initialBack={""}
        initialTags={[]}
        settings={settings}
      />

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