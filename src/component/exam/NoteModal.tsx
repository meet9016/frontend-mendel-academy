// component/exam/NoteModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from './SidePanel';

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  initialNote?: string;
  onSave: (questionId: string, note: string) => void;
  onDelete: (questionId: string) => void;
  settings: any;
};

export const NoteModal = ({
  isOpen,
  onClose,
  questionId,
  initialNote = '',
  onSave,
  onDelete,
  settings
}: NoteModalProps) => {
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote, isOpen]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      onSave(questionId, note);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const isDark = settings?.theme === 'dark';

  // Theme classes
  const modalBg = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const textareaBg = isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300';
  const buttonCloseClass = isDark
    ? 'px-4 py-2 text-sm border rounded hover:bg-gray-700 text-white border-gray-600'
    : 'px-4 py-2 text-sm border rounded hover:bg-gray-100 text-gray-900 border-gray-300';
  const buttonDeleteClass = isDark
    ? 'px-4 py-2 text-sm border rounded hover:bg-red-700/20 text-red-400 border-red-600'
    : 'px-4 py-2 text-sm border rounded hover:bg-red-50 text-red-600 border-red-500';
  const buttonSaveClass = isDark
    ? 'px-4 py-2 text-sm rounded bg-primary hover:bg-primary/80 text-dark disabled:opacity-50'
    : 'px-4 py-2 text-sm rounded bg-primary hover:bg-primary/80 text-dark disabled:opacity-50';

  return (
    <Modal title={`Edit Items Notes`} isOpen={isOpen} onClose={onClose} settings={settings}>
      <div className={`p-4 min-w-[400px] max-w-2xl ${modalBg}`}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full h-64 p-3 rounded-lg resize-none text-sm border outline-none 
  ${isDark
              ? 'bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary/40 focus:border-primary'
              : 'bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-primary/40 focus:border-primary'
            }`}
          placeholder="Write your notes here... (Ctrl+Enter to save)"
          autoFocus
        />
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onDelete(questionId)}
            className={buttonDeleteClass}
          >
            Delete Note
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={buttonCloseClass}
            >
              Close
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`${buttonSaveClass} text-dark`}
            >
              {isSaving ? 'Saving...' : 'Save Note (Ctrl+Enter)'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};