import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, options = {}) => {
    const { type = "success", duration = 4000, description } = options;
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, description, type }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  const toast = {
    success: (message, description) => showToast(message, { type: "success", description }),
    error:   (message, description) => showToast(message, { type: "error", description }),
    warning: (message, description) => showToast(message, { type: "warning", description }),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;

  return (
    <>
      {/* Animación CSS pura, sin dependencias — se inyecta una sola vez */}
      <style>{`
        @keyframes toast-slide-in {
          from { transform: translateX(20px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        .toast-item {
          animation: toast-slide-in 0.25s ease-out;
        }
      `}</style>
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80"
        role="region"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => onClose(t.id)} />
        ))}
      </div>
    </>
  );
}

const STYLES = {
  success: {
    border: "border-l-emerald-500",
    icon: "text-emerald-500",
    iconPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  error: {
    border: "border-l-red-500",
    icon: "text-red-500",
    iconPath: "M12 9v3.75m0 3.75h.008M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  warning: {
    border: "border-l-amber-500",
    icon: "text-amber-500",
    iconPath: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
};

function ToastItem({ toast, onClose }) {
  const style = STYLES[toast.type] || STYLES.success;

  return (
    <div
      className={`toast-item bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${style.border} border-l-4 rounded-xl shadow-lg px-4 py-3 flex items-start gap-3`}
    >
      <svg className={`w-5 h-5 mt-0.5 shrink-0 ${style.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d={style.iconPath} />
      </svg>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{toast.message}</p>
        {toast.description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 transition-colors shrink-0"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);