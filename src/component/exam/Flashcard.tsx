import { useState, useEffect, useRef } from "react";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import { BiPlus, BiTransfer } from "react-icons/bi";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import { BsTrash2, BsThreeDotsVertical, BsExclamationTriangle } from "react-icons/bs";
import { TbLayoutColumns, TbLayoutRows } from "react-icons/tb";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("primereact/editor").then((m) => m.Editor), { ssr: false });
import type { EditorTextChangeEvent } from "primereact/editor";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";

type Flashcard = {
  id: string;
  front: string;
  back: string;
  tags: string[];
  createdAt: string;
  testAttempt?: string;
  questionId?: string;
};

type FlashcardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: any;
  testAttemptId?: string;
  questionId?: string;
  initialFront?: string;
  initialBack?: string;
  initialTags?: string[];
};

type ViewMode = 'single' | 'double';
type TabType = 'front' | 'back';

// Delete Confirmation Dialog Component
const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isDark
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDark: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={`relative rounded-lg shadow-xl w-96 ${isDark ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}`}>
        <div className={`p-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-full ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <BsExclamationTriangle className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h3 className="text-lg font-semibold">Delete Flashcard</h3>
          </div>

          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Are you sure you want to delete this flashcard? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 text-sm rounded border transition-colors ${isDark
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  settings
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  settings: any;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 400,
    y: window.innerHeight / 2 - 250
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    setDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset, isOpen]);

  if (!isOpen) return null;

  const isDark = settings?.theme === "dark";

  const modalBg = isDark ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-gray-900 border border-gray-300";
  const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900";
  const closeBtn = isDark ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-gray-600";
  const bodyBg = isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900";

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="flex items-start justify-center min-h-screen px-4 text-center">
        <div
          ref={modalRef}
          className={`rounded-lg shadow-xl w-auto min-w-[800px] pointer-events-auto ${modalBg}`}
          style={{ position: "absolute", left: position.x, top: position.y }}
        >
          <div
            className={`px-4 pt-5 pb-4 flex justify-between items-center cursor-move rounded-t-lg ${headerBg}`}
            onMouseDown={handleMouseDown}
          >
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} className={`${closeBtn} cursor-pointer text-xl leading-none`}>✕</button>
          </div>

          <div className={bodyBg}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlashcardModal = ({
  isOpen,
  onClose,
  settings,
  testAttemptId,
  questionId,
  initialFront = "",
  initialBack = "",
  initialTags = [],
}: FlashcardModalProps) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | null>(null);
  const [viewingFlashcard, setViewingFlashcard] = useState<Flashcard | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('double');
  const [activeTab, setActiveTab] = useState<TabType>('front');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState<string | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [viewAll, setViewAll] = useState(false)

  const [front, setFront] = useState(initialFront);
  const [back, setBack] = useState(initialBack);
  const [tags, setTags] = useState(initialTags.join(", "));
  const [isSaving, setIsSaving] = useState(false);

  const isDark = settings?.theme === "dark";

  // Click outside to close options menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchFlashcards = async () => {
    if (!isOpen) return;
    setIsLoading(true);
    try {
      const response = await api.get(endPointApi.flashcards);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
      ErrorToast("Failed to load flashcards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [isOpen]);

  useEffect(() => {
    if (!editingFlashcard && !showCreateForm) {
      setFront(initialFront);
      setBack(initialBack);
      setTags(initialTags.join(", "));
    }
  }, [initialFront, initialBack, initialTags, editingFlashcard, showCreateForm]);

  // Fix: Don't decode HTML for editor - keep original HTML
  useEffect(() => {
    if (editingFlashcard) {
      // Set the raw HTML directly without decoding
      setFront(editingFlashcard.front);
      setBack(editingFlashcard.back);
      setTags(editingFlashcard.tags.join(", "));
      setShowCreateForm(true);
      setViewingFlashcard(null);
    }
  }, [editingFlashcard]);

  const handleFrontEditorChange = (e: EditorTextChangeEvent) => {
    setFront(e.htmlValue || "");
  };

  const handleBackEditorChange = (e: EditorTextChangeEvent) => {
    setBack(e.htmlValue || "");
  };

  const handleSave = async () => {
    if (!front.trim() || !back.trim()) {
      ErrorToast("Front and Back content are required");
      return;
    }

    setIsSaving(true);
    try {
      const flashcardData = {
        front: front.trim(),
        back: back.trim(),
        tags: tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
        testAttempt: testAttemptId,
        questionId: questionId,
      };

      if (editingFlashcard) {
        const response = await api.patch(`${endPointApi.flashcards}/${editingFlashcard.id}`, flashcardData);
        setFlashcards((prev: Flashcard[]) =>
          prev.map((fc: Flashcard) => (fc.id === editingFlashcard.id ? response.data : fc))
        );
        SuccessToast("Flashcard updated successfully");
      } else {
        const response = await api.post(endPointApi.flashcards, flashcardData);
        setFlashcards((prev: Flashcard[]) => [response.data, ...prev]);
        SuccessToast("Flashcard created successfully");
      }

      setShowCreateForm(false);
      setEditingFlashcard(null);
      setFront("");
      setBack("");
      setTags("");
    } catch (error) {
      console.error("Failed to save flashcard:", error);
      ErrorToast("Failed to save flashcard");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditFlashcard = (flashcard: Flashcard) => {
    setEditingFlashcard(flashcard);
    setViewingFlashcard(null);
    setShowOptions(false);
  };

  const handleDeleteClick = (id: string) => {
    setFlashcardToDelete(id);
    setShowDeleteDialog(true);
    setShowOptions(false);
  };

  const handleDeleteConfirm = async () => {
    if (!flashcardToDelete) return;

    try {
      await api.delete(`${endPointApi.flashcards}/${flashcardToDelete}`);
      setFlashcards((prev: Flashcard[]) => prev.filter((fc: Flashcard) => fc.id !== flashcardToDelete));
      if (viewingFlashcard?.id === flashcardToDelete) {
        setViewingFlashcard(null);
      }
      SuccessToast("Flashcard deleted successfully");
    } catch (error) {
      console.error("Failed to delete flashcard:", error);
      ErrorToast("Failed to delete flashcard");
    } finally {
      setFlashcardToDelete(null);
    }
  };

  const handleAddNew = () => {
    setEditingFlashcard(null);
    setViewingFlashcard(null);
    setFront(initialFront);
    setBack(initialBack);
    setTags(initialTags.join(", "));
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingFlashcard(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const handleFlashcardClick = (flashcard: Flashcard) => {
    setViewingFlashcard(flashcard);
    setShowCreateForm(false);
    setEditingFlashcard(null);
    setActiveTab('front');
  };

  const handleBackToList = () => {
    setViewingFlashcard(null);
  };

  // Only decode for display, not for editing
  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const containerClass = isDark
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";

  const cardClass = isDark
    ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
    : "bg-gray-50 border-gray-200 hover:shadow-md";

// import { BiTransfer, BiPlus } from "react-icons/bi"; // Add BiTransfer to your existing imports

// Replace your existing renderCreateForm function with this:

const renderCreateForm = () => (
  <div className="p-6 w-250">
    <div className="grid grid-cols-2 gap-6 relative">
      {/* Front Editor */}
      <div>
        <div className="mb-2 font-medium flex items-center justify-between">
          <span>Front</span>
          {front && (
            <span className="text-xs opacity-60">
              {front.replace(/<[^>]*>/g, '').length} chars
            </span>
          )}
        </div>
        <Editor
          value={front}
          onTextChange={handleFrontEditorChange}
          style={{ height: "250px" }}
          className={`
            ${isDark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
            }
          `}
        />
        <div className="text-xs mt-1 opacity-60">
          Rich text editor supported
        </div>
      </div>

      {/* Switch Button - Positioned in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative group">
          <button
            onClick={() => {
              const tempFront = front;
              const tempBack = back;
              setFront(tempBack);
              setBack(tempFront);
            }}
            disabled={!front && !back}
            className={`
              p-3 rounded-full shadow-lg transition-all duration-300
              ${!front && !back
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-110 hover:rotate-180 cursor-pointer'
              }
              ${isDark
                ? 'bg-gray-600 hover:bg-gray-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }
            `}
            title="Swap Front and Back content"
          >
            <BiTransfer className="w-5 h-5" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              whitespace-nowrap px-2 py-1 text-xs rounded
              bg-gray-800 text-white opacity-0 group-hover:opacity-100
              transition-opacity duration-200 pointer-events-none">
            Swap Front & Back
          </div>
        </div>
      </div>

      {/* Back Editor */}
      <div>
        <div className="text-right">
          <span className="border border-gray-300">Back</span>
         
        </div>
        <Editor
          value={back}
          onTextChange={handleBackEditorChange}
          style={{ height: "250px" }}
          className={`
            ${isDark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
            }
          `}
        />
        <div className="text-xs mt-1 opacity-60">
          Rich text editor supported
        </div>
      </div>
    </div>

    {/* Tags Input */}
    <div className="mt-6">
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tag name, comma separated"
        className={`w-full px-3 py-2 rounded border text-sm outline-none ${isDark
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-gray-900"
          }`}
      />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handleCancel}
        className={`px-4 py-2 text-sm border rounded ${isDark
          ? "border-gray-600 hover:bg-gray-700"
          : "border-gray-300 hover:bg-gray-100"
          }`}
      >
        Cancel
      </button>

      <div className="flex items-center gap-3">
        {/* Keyboard shortcut hint */}
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Ctrl+Enter to save
        </span>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 text-sm rounded bg-primary hover:bg-primary/80 text-dark disabled:opacity-50"
        >
          {isSaving ? "Saving..." : editingFlashcard ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </div>
);

  const renderViewCard = () => {
    if (!viewingFlashcard) return null;

    return (
      <div className="p-6 w-250">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleBackToList}
            className={`px-3 py-1 text-sm rounded border ${isDark
              ? "border-gray-600 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            ← Back to list
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">

              {/* Single View */}
              <div className="relative group">
                <button
                  onClick={() => {
                    setViewMode('single');
                    setActiveTab('front');
                  }}
                  className={`p-2 cursor-pointer rounded ${viewMode === 'single'
                      ? isDark
                        ? 'bg-gray-600'
                        : 'bg-gray-200'
                      : isDark
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                >
                  <TbLayoutRows className="w-5 h-5" />
                </button>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    whitespace-nowrap px-2 py-1 text-xs rounded
                    bg-gray-800 text-white opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none">
                  Single View
                </div>
              </div>

              {/* Double View */}
              <div className="relative group">
                <button
                  onClick={() => setViewMode('double')}
                  className={`p-2 cursor-pointer rounded ${viewMode === 'double'
                      ? isDark
                        ? 'bg-gray-600'
                        : 'bg-gray-200'
                      : isDark
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                >
                  <TbLayoutColumns className="w-5 h-5" />
                </button>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    whitespace-nowrap px-2 py-1 text-xs rounded
                    bg-gray-800 text-white opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none">
                  Double View
                </div>
              </div>

            </div>

            <div className="relative" ref={optionsRef}>
              <div className="relative group">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className={`p-2 cursor-pointer rounded ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                >
                  <BsThreeDotsVertical className="w-5 h-5" />
                </button>

                {/* Tooltip */}
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
               whitespace-nowrap px-2 py-1 text-xs rounded
               bg-gray-800 text-white opacity-0 group-hover:opacity-100
               transition-opacity duration-200 pointer-events-none z-50"
                >
                  More Options
                </div>
              </div>

              {showOptions && (
                <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 z-10 ${isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                  <button
                    onClick={() => handleEditFlashcard(viewingFlashcard)}
                    className={`w-full cursor-pointer text-left px-4 py-2 text-sm flex items-center gap-2 ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(viewingFlashcard.id)}
                    className={`w-full cursor-pointer text-left px-4 py-2 text-sm flex items-center gap-2 ${isDark ? 'hover:bg-gray-600 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                  >
                    <BsTrash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {viewMode === 'single' ? (
          <>
            {/* Tabs for single view */}
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab('front')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'front'
                  ? isDark
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-primary border-b-2 border-primary'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                Front
                {activeTab === 'front' && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isDark ? 'bg-primary' : 'bg-primary'}`} />
                )}
              </button>
              <button
                onClick={() => setActiveTab('back')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'back'
                  ? isDark
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-primary border-b-2 border-primary'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                Back
                {activeTab === 'back' && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isDark ? 'bg-primary' : 'bg-primary'}`} />
                )}
              </button>
            </div>

            {/* Content for single view with fixed height and scroll */}
            <div
              className={`p-4 rounded-lg border overflow-y-auto ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              style={{ height: '400px' }}
            >
              {/* Only decode for display */}
              <div dangerouslySetInnerHTML={{
                __html: activeTab === 'front'
                  ? decodeHtml(viewingFlashcard.front)
                  : decodeHtml(viewingFlashcard.back)
              }} />
            </div>
          </>
        ) : (
          // Double view layout with fixed height and scroll for each column
          <div className="grid grid-cols-2 gap-6">

            {/* FRONT COLUMN */}
            <div className="flex flex-col">

              {/* Small Top Box */}
              <div className="flex justify-end">
                <div className={`px-3 py-1 text-xs font-medium border 
                  ${isDark
                    ? "border-gray-600 bg-gray-700 text-gray-300"
                    : "border-gray-200 bg-gray-100 text-gray-600"
                  }`}>
                  Front
                </div>
              </div>

              {/* Content Box */}
              <div
                className={`p-4 border overflow-y-auto 
                  ${isDark
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-200 bg-gray-50"
                  }`}
                style={{ height: "450px" }}
              >
                {/* Only decode for display */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(viewingFlashcard.front),
                  }}
                />
              </div>

            </div>

            {/* BACK COLUMN */}
            <div className="flex flex-col gap-0">

              {/* Small Top Box */}
              <div className="flex justify-end">
                <div className={`px-3 py-1 text-xs font-medium border 
                  ${isDark
                    ? "border-gray-600 bg-gray-700 text-gray-300"
                    : "border-gray-200 bg-gray-100 text-gray-600"
                  }`}>
                  Back
                </div>
              </div>

              {/* Content Box */}
              <div
                className={`p-4 border overflow-y-auto 
                  ${isDark
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-200 bg-gray-50"
                  }`}
                style={{ height: "450px" }}
              >
                {/* Only decode for display */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(viewingFlashcard.back),
                  }}
                />
              </div>

            </div>

          </div>
        )}

        {viewingFlashcard.tags.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {viewingFlashcard.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setFlashcardToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          isDark={isDark}
        />
      </div>
    );
  };

  const renderListView = () => (
    <div className={`p-6 w-250 h-121 ${containerClass}`}>
      <div className="items-left">
        <div className="flex items-center mb-4">
          {!viewAll ? (
            <h2 className="text-lg font-semibold">
              This Question
            </h2>
          ) : (
            <button
              onClick={() => setViewAll(false)}
              className="flex cursor-pointer items-center gap-2 text-lg font-semibold hover:opacity-70 transition-opacity"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
        </div>

        <div className="relative w-full">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">

              <div
                className={`
    w-40 h-40 flex-shrink-0
    rounded-lg border p-4
    transition-all cursor-pointer
    flex flex-col items-center justify-center   /* 👈 IMPORTANT */
    text-center
    ${cardClass}
  `}
                onClick={handleAddNew}
              >
                <BiPlus className="w-12 h-12 mb-2 text-gray-800" />

                <span className="font-medium text-sm">
                  New Card
                </span>
              </div>
              {viewAll ? <>
                {flashcards.map((flashcard) => (
                  <div
                    key={flashcard.id}
                    className={`
                      w-40 h-40 flex-shrink-0
                      rounded-lg border p-4
                      transition-all group cursor-pointer
                      ${cardClass}
                    `}
                    onClick={() => handleFlashcardClick(flashcard)}
                  >
                    <div className="mb-3">
                      <p
                        className="text-sm break-words line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(flashcard.front),
                        }}
                      />
                    </div>
                  </div>
                ))}</> : null}
            </div>
          </div>
        </div>

      </div>
      {!viewAll ? <div className="items-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Saved Flashcards
          </h2>

          <span
            className="text-sm font-medium text-primary cursor-pointer hover:underline"
            onClick={() => setViewAll(true)}
          >
            See All
          </span>
        </div>

        {flashcards.length === 0 ? (
          <div className={`
            text-center py-12 rounded-lg w-full
            ${isDark ? "bg-gray-700/50" : "bg-gray-50"}
          `}>
            <p className="opacity-60">
              No flashcards yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="relative w-full">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {flashcards.map((flashcard) => (
                  <div
                    key={flashcard.id}
                    className={`
                      w-40 h-40 flex-shrink-0
                      rounded-lg border p-4
                      transition-all group cursor-pointer
                      ${cardClass}
                    `}
                    onClick={() => handleFlashcardClick(flashcard)}
                  >
                    <div className="mb-3">
                      <p
                        className="text-sm break-words line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(flashcard.front),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div> : null}

      {/* Delete Confirmation Dialog for list view */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setFlashcardToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDark={isDark}
      />
    </div>
  );

  return (
    <Modal
      title={viewingFlashcard ? "View Flashcard" : "Flashcards"}
      isOpen={isOpen}
      onClose={() => {
        if (viewingFlashcard) {
          setViewingFlashcard(null);
        } else if (showCreateForm) {
          handleCancel();
        } else {
          onClose();
        }
      }}
      settings={settings}
    >
      {viewingFlashcard ? renderViewCard() : showCreateForm ? renderCreateForm() : renderListView()}
    </Modal>
  );
};