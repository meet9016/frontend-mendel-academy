import { useEffect, useRef, useState } from "react";

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
    x: window.innerWidth / 2 - 250,
    y: window.innerHeight / 2 - 150
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

  // Modal theme classes
  const modalBg = isDark ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-gray-900 border border-gray-300";
  const headerBg = isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900";
  const closeBtn = isDark ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-gray-600";
  const bodyBg = isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900";

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="flex items-start justify-center min-h-screen px-4 text-center">
        <div
          ref={modalRef}
          className={`rounded-lg shadow-xl w-full max-w-lg pointer-events-auto ${modalBg}`}
          style={{ position: "absolute", left: position.x, top: position.y }}
        >
          {/* Header */}
          <div
            className={`px-4 pt-5 pb-4 flex justify-between items-center cursor-move rounded-t-lg ${headerBg}`}
            onMouseDown={handleMouseDown}
          >
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} className={`${closeBtn} text-xl leading-none`}>✕</button>
          </div>

          {/* Body */}
          <div className={`p-4 ${bodyBg}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};


export const TransParentModal = ({
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
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
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
    }, [dragging, isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
            // pointer-events-none ensures modal content handles clicks, but backdrop does not close
        >
            <div
                ref={modalRef}
                className="inline-block w-auto max-w-lg pointer-events-auto"
                style={{ top: position.y, left: position.x, position: 'absolute' }}
            >
                <div className={`${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700`}>

                    {/* Header */}
                    <div
                        onMouseDown={handleMouseDown}
                        className={`flex justify-between items-center px-4 py-2 cursor-move ${settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} rounded-t-lg`}
                    >
                        <h3 className="text-md font-medium">{title}</h3>
                        <button onClick={onClose}>✕</button>
                    </div>

                    {/* Content */}
                    <div className="">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};