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
    <nav className={`flex items-center justify-center gap-1.5 ${className}`} aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className="p-2 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkBorder disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer select-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => handlePageClick(p)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all cursor-pointer select-none ${
              isActive
                ? 'bg-brand-500 text-white shadow-sm font-bold scale-105'
                : 'border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkBorder hover:border-brand-500'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className="p-2 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-darkBorder disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer select-none"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
