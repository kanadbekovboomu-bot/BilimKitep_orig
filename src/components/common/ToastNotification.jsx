import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, X, ShoppingBag } from 'lucide-react';

export const ToastNotification = ({
  message,
  title,
  type = 'success',
  isOpen,
  onClose,
  duration = 4000,
  actionLabel,
  onAction,
}) => {
  const [mounted, setMounted] = useState(
    () => typeof document !== 'undefined' && Boolean(document.body)
  );

  useEffect(() => {
    if (!mounted && typeof document !== 'undefined' && document.body) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    if (isOpen && duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white',
    error: 'border-red-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white',
    info: 'border-blue-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white',
  };

  const toastContent = (
    <aside
      aria-label="Alerts"
      aria-live="assertive"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100000,
      }}
      className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-[100000] animate-in slide-in-from-bottom-5 duration-200 select-none"
    >
      <div
        className={`flex items-start gap-3.5 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
          borders[type] || borders.success
        }`}
      >
        <div className="p-1 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
          {icons[type] || icons.success}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          {title && (
            <h5 className="text-xs font-black tracking-wide text-slate-900 dark:text-white uppercase flex items-center gap-1.5">
              <span>{title}</span>
            </h5>
          )}
          <p className="text-xs font-medium text-slate-600 dark:text-slate-200 leading-snug break-words">
            {message}
          </p>

          {actionLabel && onAction && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{actionLabel}</span>
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );

  if (mounted && typeof document !== 'undefined' && document.body) {
    return createPortal(toastContent, document.body);
  }

  return toastContent;
};

export default ToastNotification;
