import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Eye, BarChart3, Package, ShoppingBag } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';
import { DealBadge } from './DealBadge';

export const ListingManageRow = ({ book, onDelete, onViewSales }) => {
  const { t } = useTranslation('common');

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-shadow hover:shadow-xs">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-14 h-18 bg-gray-50 dark:bg-darkBorder/40 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1 border border-gray-100 dark:border-darkBorder">
          <img
            src={book.images?.[0] || '/covers/geometry-8.svg'}
            alt={book.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <DealBadge dealType={book.dealType} />
            <span className="text-xs text-gray-400">
              {t('units.grade', { count: book.grade })}
            </span>
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">
            {book.title}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {book.author}
          </p>

          {/* Stock & Sold indicators */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
              <Package className="w-3 h-3 text-emerald-500" />
              <span>Остаток: <strong>{book.quantity ?? 1}</strong> шт.</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50">
              <ShoppingBag className="w-3 h-3 text-blue-500" />
              <span>Продано: <strong>{book.soldCount ?? 0}</strong> шт.</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-darkBorder shrink-0">
        <div className="text-left md:text-right">
          <div className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {book.dealType === 'RENT' || book.dealType === 'BOTH'
              ? `${formatKGS(book.rentPricePerMonth)} ${t('units.perMonth')}`
              : formatKGS(book.price)}
          </div>
          <span className="text-[11px] text-gray-400">
            {(book.quantity ?? 1) > 0 ? t('status.available') : 'Распродано'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onViewSales && (
            <button
              type="button"
              onClick={() => onViewSales(book)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              title="Просмотреть продажи и остаток"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Продажи</span>
            </button>
          )}

          <Link
            to={`/books/${book.id}`}
            className="p-2 rounded-xl text-gray-400 hover:text-brand-600 hover:bg-emerald-50 dark:hover:bg-darkBorder transition-colors"
            title={t('actions.viewDetails')}
          >
            <Eye className="w-4 h-4" />
          </Link>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(book.id)}
              className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
              title={t('actions.delete')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingManageRow;
