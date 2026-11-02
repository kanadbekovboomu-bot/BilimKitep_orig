import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Component
 * Renders page numbers with previous/next triggers.
 * Automatically scrolls smoothly to the top of the product section upon page switch.
 */
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  scrollToSelector = '#catalog-books-section',
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (p) => {
    if (p < 1 || p > totalPages) return;
    if (onPageChange) onPageChange(p);

    if (typeof window !== 'undefined') {
      if (scrollToSelector) {
        try {
          const targetElement = document.querySelector(scrollToSelector);
          if (targetElement) {
            const headerOffset = 90; // accounts for fixed header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth',
            });
            return;
          }
        } catch {
          // Fallback to top if invalid selector
        }
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination">
      <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-darkCard/90 backdrop-blur-md border border-gray-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-900/5 dark:shadow-black/40">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-slate-800/80 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer select-none active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePageClick(p)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all cursor-pointer select-none flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 font-bold scale-105 ring-2 ring-emerald-400/40'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800/70 border border-transparent hover:border-emerald-500/20 active:scale-95'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-slate-800/80 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer select-none active:scale-95"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
