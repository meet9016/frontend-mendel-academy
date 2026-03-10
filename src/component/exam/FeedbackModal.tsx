// component/exam/FeedbackModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from './SidePanel';

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
    attemptId: string;
    initialFeedback?: string;
    onSave: (attemptId: string, feedback: string) => void;
    settings: any;
};

export const FeedbackModal = ({
    isOpen,
    onClose,
    attemptId,
    initialFeedback = '',
    onSave,
    settings
}: FeedbackModalProps) => {
    const [feedback, setFeedback] = useState(initialFeedback);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFeedback(initialFeedback);
    }, [initialFeedback, isOpen]);

    const handleSave = () => {
        setIsSaving(true);
        try {
            onSave(attemptId, feedback);
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
    const buttonSaveClass = isDark
        ? 'px-4 py-2 text-sm rounded bg-primary hover:bg-primary/80 text-dark disabled:opacity-50'
        : 'px-4 py-2 text-sm rounded bg-primary hover:bg-primary/80 text-dark disabled:opacity-50';

    return (
        <Modal title="Feedback" isOpen={isOpen} onClose={onClose} settings={settings}>
            <div className={`p-4 min-w-[400px] max-w-2xl ${modalBg}`}>
                <p className={`mb-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Please share your feedback about this exam. Your feedback helps us improve!
                </p>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full h-40 p-3 rounded-lg resize-none text-sm border outline-none 
            ${isDark
                            ? 'bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary/40 focus:border-primary'
                            : 'bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-primary/40 focus:border-primary'
                        }`}
                    placeholder="Write your feedback here... (Ctrl+Enter to save)"
                    autoFocus
                />
                <div className="flex justify-end items-center mt-4">
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className={`${buttonCloseClass} cursor-pointer`}
                        >
                            Close
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSaving || !feedback.trim()}
                            className={`${buttonSaveClass} text-dark cursor-pointer disabled:cursor-not-allowed`}
                        >
                            {isSaving ? 'Saving...' : 'Submit Feedback'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
