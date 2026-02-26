// component/exam/NoteModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from './SidePanel';

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  initialNote?: string;
  onSave: (questionId: string, note: string) => void;
};

export const NoteModal = ({ isOpen, onClose, questionId, initialNote = '', onSave }: NoteModalProps) => {
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
    // Ctrl+Enter to save
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    // Escape to close (handled by modal)
  };

  return (
    <Modal title={`Note - Question ${questionId.slice(-6)}`} isOpen={isOpen} onClose={onClose}>
      <div className="p-4 min-w-[400px] max-w-2xl">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-64 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
          placeholder="Write your notes here... (Ctrl+Enter to save)"
          autoFocus
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-primary text-dark rounded hover:bg-primary/80 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Note (Ctrl+Enter)'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Notes are saved per question and will persist during your test session.
        </p>
      </div>
    </Modal>
  );
};