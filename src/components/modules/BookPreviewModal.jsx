import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { getBookPreviewPages } from '../../data/bookPreviews';
import { formatKGS } from '../../utils/formatters';

export const BookPreviewModal = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const { t } = useTranslation(['common', 'book']);
  const currency = t('currency', { defaultValue: 'сом' });
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const pages = book ? getBookPreviewPages(book) : [];
  const totalPages = pages.length || 5;

  // Reset to first page when opening new book
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, book]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch swipes for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // Swiped left -> next
    if (diff < -50) handlePrev(); // Swiped right -> prev
    setTouchStartX(null);
  };

  if (!isOpen || !book) return null;

  const page = pages[currentPage] || pages[0];
  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        data-testid="preview-backdrop"
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Reader Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Электрондук китептин көчүрмөсү"
        className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50/90 via-white to-amber-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-3xl shadow-2xl border border-amber-200/80 dark:border-slate-800 z-10 my-auto flex flex-col overflow-hidden max-h-[94vh] transition-all transform animate-in fade-in zoom-in-95 duration-200"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Reading Progress Bar */}
        <div className="w-full bg-amber-100 dark:bg-slate-800 h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">
                {book.title}
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {book.author} • {book.grade}-класс
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <Bookmark className="w-3 h-3" />
              {currentPage + 1} / {totalPages} бет
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Page View Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-4 font-serif text-gray-800 dark:text-gray-200 select-text">
          {/* PAGE 1: TITLE PAGE */}
          {page.type === 'title' && (
            <div className="text-center py-6 sm:py-10 space-y-6 max-w-lg mx-auto">
              <div className="space-y-2 border-b border-gray-300 dark:border-slate-700 pb-4">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-sans block">
                  {page.ministryHeader}
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-sans">
                  <Award className="w-3.5 h-3.5" />
                  {page.approvedBadge}
                </div>
              </div>

              <div className="py-6 space-y-3">
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-sans">
                  {page.subject}
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
                  {page.title}
                </h1>
                <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300">
                  {page.gradeBadge}
                </p>
                <p className="text-xs sm:text-sm italic text-gray-500 pt-2">
                  {page.author}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-200 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400 font-sans space-y-1">
                <p className="font-semibold">{page.publisher}</p>
                <p>{page.cityYear}</p>
                <p className="text-[10px] text-gray-400 font-mono pt-1">{page.isbn}</p>
              </div>
            </div>
          )}

          {/* PAGE 2: TABLE OF CONTENTS */}
          {page.type === 'contents' && (
            <div className="max-w-lg mx-auto py-4 space-y-5">
              <div className="text-center pb-3 border-b border-gray-200 dark:border-slate-800">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-100">
                  {page.title}
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  {page.subtitle}
                </p>
              </div>

              <div className="space-y-3 font-sans text-sm">
                {page.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between gap-2 border-b border-dashed border-gray-200 dark:border-slate-800 pb-1.5"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {item.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {item.page}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 3: INTRODUCTION & SYMBOLS */}
          {page.type === 'intro' && (
            <div className="max-w-lg mx-auto py-4 space-y-6">
              <div className="border-b border-gray-200 dark:border-slate-800 pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
                  {page.title}
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400 italic">
                  {page.greeting}
                </p>
                <p>{page.body}</p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-800 font-sans space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {page.symbolsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {page.symbols.map((sym, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/80 flex items-start gap-2.5"
                    >
                      <span className="text-xl shrink-0">{sym.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {sym.label}
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                          {sym.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 4: CORE CHAPTER THEORY */}
          {page.type === 'theory' && (
            <div className="max-w-lg mx-auto py-4 space-y-5">
              <div className="text-center pb-3 border-b border-gray-200 dark:border-slate-800 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  {page.chapter}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 font-serif">
                  {page.paragraph}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {page.leadText}
              </p>

              {/* Highlighted Rule Box */}
              <div className="p-4 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 border-l-4 border-emerald-500 font-sans space-y-1.5 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {page.ruleBox.tag}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                  {page.ruleBox.text}
                </p>
              </div>

              {/* Example Steps */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 font-sans space-y-2">
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {page.exampleTitle}
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {page.exampleSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* PAGE 5: PRACTICE, TESTS & FINAL CTA */}
          {page.type === 'practice' && (
            <div className="max-w-lg mx-auto py-3 space-y-5 font-sans">
              <div className="text-center pb-2 border-b border-gray-200 dark:border-slate-800">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {page.title}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {page.subtitle}
                </p>
              </div>

              {/* Sample Questions */}
              <div className="space-y-3">
                {page.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-2"
                  >
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {q.q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className="px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs italic text-gray-500 dark:text-gray-400">
                💡 {page.taskPrompt}
              </p>

              {/* End of Preview Call to Action Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <div className="text-sm font-extrabold">
                    Ознакомительный фрагмент завершён (5 из 5 страниц)
                  </div>
                </div>

                <p className="text-xs text-emerald-100 leading-snug">
                  Понравился учебник? Оформите аренду всего за{' '}
                  <strong className="text-white underline">
                    {formatKGS(book.rentPricePerMonth, currency)}/мес
                  </strong>{' '}
                  или купите оригинал за{' '}
                  <strong className="text-white underline">
                    {formatKGS(book.price, currency)}
                  </strong>!
                </p>

                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onAddToCart) onAddToCart(book, 'RENT', 9);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Взять в аренду ({formatKGS(book.rentPricePerMonth, currency)}/ай)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onAddToCart) onAddToCart(book, 'BUY', 0);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-900 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    Купить ({formatKGS(book.price, currency)})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-amber-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Артка</span>
          </button>

          {/* Quick Page Selector Dots */}
          <div className="flex items-center gap-1.5">
            {pages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                aria-label={`Перейти на страницу ${idx + 1}`}
                className={`w-7 h-7 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === idx
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Алга</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
