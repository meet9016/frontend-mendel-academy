export const SidePanel = ({ isOpen, onClose, title, children }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-700 hover:text-gray-700 p-1 px-2.5 rounded-full hover:bg-gray-200"
                >
                    ✕
                </button>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};


export const Modal = ({ isOpen, onClose, title, children }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-lg pointer-events-auto">
                    <div className="px-4 pt-5 pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                ✕
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};