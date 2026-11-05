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
      <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer select-none"
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
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none flex items-center justify-center ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80'
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
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer select-none"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
