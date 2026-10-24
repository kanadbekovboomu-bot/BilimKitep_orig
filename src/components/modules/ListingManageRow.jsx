import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit3, Eye, CheckCircle2 } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';
import { DealBadge } from './DealBadge';

export const ListingManageRow = ({ book, onDelete, onStatusToggle }) => {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-18 bg-gray-100 dark:bg-darkBorder rounded-xl overflow-hidden shrink-0">
          <img
            src={book.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DealBadge dealType={book.dealType} />
            <span className="text-xs text-gray-400">{book.grade}-класс</span>
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">
            {book.title}
          </h4>
          <p className="text-xs text-gray-500">
            {book.author}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-darkBorder">
        <div className="text-right">
          <div className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {book.dealType === 'RENT' || book.dealType === 'BOTH'
              ? `${formatKGS(book.rentPricePerMonth)} /ай`
              : formatKGS(book.price)}
          </div>
          <span className="text-[11px] text-gray-400">
            Статус: {book.status === 'AVAILABLE' ? 'Ачык (Бар)' : 'Ижарада'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to={`/books/${book.id}`}
            className="p-2 rounded-xl text-gray-400 hover:text-brand-600 hover:bg-emerald-50 dark:hover:bg-darkBorder"
            title="Көрүү"
          >
            <Eye className="w-4 h-4" />
          </Link>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(book.id)}
              className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
              title="Өчүрүү"
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
