import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification = ({
  message,
  type = 'success',
  isOpen,
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/90 dark:bg-emerald-950/90',
    error: 'border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/90',
    info: 'border-blue-200 dark:border-blue-900/50 bg-blue-50/90 dark:bg-blue-950/90',
  };

  return (
    <aside aria-label="Alerts" aria-live="assertive" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 p-1 rounded-xl ${borders[type] || borders.success}`}>
        {icons[type] || icons.success}
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 pr-2">
          {message}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default ToastNotification;
