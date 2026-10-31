import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SidebarFilter } from '../components/layout/SidebarFilter';
import { SearchBar } from '../components/modules/SearchBar';
import { FilterChips } from '../components/modules/FilterChips';
import { BookGrid } from '../components/modules/BookGrid';
import { Pagination } from '../components/common/Pagination';
import { QuickViewModal } from '../components/modules/QuickViewModal';
import { EdTechSubjectBar } from '../components/modules/EdTechSubjectBar';
import { ToastNotification } from '../components/common/ToastNotification';
import { TyndykEmblem, KochkorMuyuzPattern } from '../components/common/KyrgyzOrnament';
import { fetchBooks } from '../features/books/booksSlice';
import {
  setSearchQuery,
  setFilterParam,
  resetFilters,
  setPage,
} from '../features/filter/filterSlice';
import { addToCart } from '../features/cart/cartSlice';

export const CatalogPage = () => {
  const { t } = useTranslation('catalog');
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterState = useSelector((state) => state.filter);
  const { items: books, loading, totalPages, totalItems } = useSelector((state) => state.books);

  const [selectedQuickBook, setSelectedQuickBook] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL search params on mount
  useEffect(() => {
    const q = searchParams.get('search');
    const grade = searchParams.get('grade');
    const dealType = searchParams.get('dealType');
    const sort = searchParams.get('sort');
    if (q) dispatch(setSearchQuery(q));
    if (grade) dispatch(setFilterParam({ key: 'grade', value: grade }));
    if (dealType) dispatch(setFilterParam({ key: 'dealType', value: dealType }));
    if (sort) dispatch(setFilterParam({ key: 'sort', value: sort }));
  }, [searchParams, dispatch]);

  // Fetch books whenever filter state changes
  useEffect(() => {
    dispatch(fetchBooks(filterState));
  }, [filterState, dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilterParam({ key, value }));
  };

  const handleSearchChange = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSearchParams({});
  };

  const handleRemoveChip = (key) => {
    if (key === 'search') dispatch(setSearchQuery(''));
    else if (key === 'maxPrice') dispatch(setFilterParam({ key: 'maxPrice', value: 2000 }));
    else dispatch(setFilterParam({ key, value: 'all' }));
  };

  const handleAddToCart = (book, type = 'RENT', months = 9) => {
    dispatch(addToCart({ book, type, months }));
    setToastMessage(t('toast.addedSimple', { ns: 'common', title: book.title }));
    setShowToast(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-x-hidden">
      <Breadcrumbs items={[{ label: t('title') }]} />

      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2">
            <TyndykEmblem size={14} className="text-amber-500" />
            <span>Кыргызстандын окуу китептери • Расмий каталог</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {t('subtitle')} • {t('results.foundCount', { count: totalItems })}
          </p>
        </div>

        <div className="w-full md:w-96">
          <SearchBar
            value={filterState.search}
            onChange={handleSearchChange}
            placeholder={t('searchPlaceholder')}
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      <FilterChips
        filters={filterState}
        onRemove={handleRemoveChip}
        onClearAll={handleResetFilters}
      />

      {/* OnlineMektep-styled Subject Filter Bar */}
      <div className="bg-white dark:bg-darkCard rounded-3xl p-4 border border-gray-100 dark:border-darkBorder shadow-xs space-y-3">
        <EdTechSubjectBar
          selectedSubject={filterState.search}
          onSelectSubject={(subj) => handleSearchChange(subj)}
        />

        {/* Quick Category Sub-Filter Pills: All / По продаже / По отзывам / По аренде */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar text-xs font-bold pt-2 border-t border-gray-100 dark:border-darkBorder">
          <span className="text-gray-400 dark:text-gray-500 shrink-0 font-medium text-[11px]">
            Категории:
          </span>
          <button
            type="button"
            onClick={() => {
              handleFilterChange('dealType', 'all');
              handleFilterChange('sort', 'newest');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              filterState.dealType === 'all' && filterState.sort === 'newest'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-darkBorder hover:border-emerald-400'
            }`}
          >
            📚 Все предложения
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('dealType', 'BUY')}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              filterState.dealType === 'BUY'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-darkBorder hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            <span>🛒 По продаже</span>
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('sort', 'reviews')}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              filterState.sort === 'reviews'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-darkBorder hover:border-amber-400 hover:text-amber-600'
            }`}
          >
            <span>⭐ По отзывам</span>
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('dealType', 'RENT')}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              filterState.dealType === 'RENT'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-darkBorder hover:border-emerald-400 hover:text-emerald-600'
            }`}
          >
            <span>🔄 По аренде</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filter + Book Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <SidebarFilter
            filters={filterState}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Toggle & Sort Header */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-darkCard p-3 rounded-2xl border border-gray-100 dark:border-darkBorder">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-darkBorder text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('results.filterButton')}</span>
            </button>

            <div className="flex items-center gap-2 ml-auto text-xs text-gray-500">
              <span className="hidden sm:inline">{t('results.sortLabel')}</span>
              <select
                value={filterState.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard py-1.5 px-3 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-brand-500"
              >
                <option value="newest">{t('filters.sortNewest')}</option>
                <option value="reviews">{t('filters.sortReviews', { defaultValue: 'По отзывам' })}</option>
                <option value="rating">{t('filters.sortRating')}</option>
                <option value="priceAsc">{t('filters.sortPriceAsc')}</option>
                <option value="priceDesc">{t('filters.sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          {/* Mobile Collapsible Filter */}
          {isMobileFilterOpen && (
            <div className="lg:hidden animate-in fade-in duration-200">
              <SidebarFilter
                filters={filterState}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          )}

          {/* Book Grid */}
          <BookGrid
            books={books}
            loading={loading}
            onQuickView={(b) => setSelectedQuickBook(b)}
            onAddToCart={handleAddToCart}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination */}
          <div className="pt-6">
            <Pagination
              currentPage={filterState.page}
              totalPages={totalPages}
              onPageChange={(p) => dispatch(setPage(p))}
            />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        book={selectedQuickBook}
        isOpen={!!selectedQuickBook}
        onClose={() => setSelectedQuickBook(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Notification Toast */}
      <ToastNotification
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default CatalogPage;
