import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookCard } from './BookCard';
import { SkeletonCard } from '../common/SkeletonCard';
import { BookX } from 'lucide-react';
import { Button } from '../common/Button';

export const BookGrid = ({
  books = [],
  loading = false,
  onQuickView,
  onAddToCart,
  onResetFilters,
}) => {
  const { t } = useTranslation('catalog');

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-12 text-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-darkBorder text-gray-400 mx-auto flex items-center justify-center mb-4">
          <BookX className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
          {t('results.emptyTitle')}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
          {t('results.emptyDesc')}
        </p>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            {t('results.resetBtn')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default BookGrid;
