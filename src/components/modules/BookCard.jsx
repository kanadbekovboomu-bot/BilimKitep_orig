import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, MapPin } from 'lucide-react';
import { DealBadge } from './DealBadge';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { formatKGS } from '../../utils/formatters';

export const BookCard = ({
  book,
  onQuickView,
  onAddToCart,
}) => {
  const isRentable = book.dealType === 'RENT' || book.dealType === 'BOTH';
  const coverImage = book.images && book.images.length > 0
    ? book.images[0]
    : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-4 flex flex-col justify-between hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300">
      <div>
        {/* Image & Badges */}
        <div className="relative w-full h-52 bg-gray-100 dark:bg-darkBorder rounded-xl overflow-hidden mb-3">
          <img
            src={coverImage}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <DealBadge dealType={book.dealType} />
            <Badge variant="default" size="sm">
              {book.grade}-класс
            </Badge>
          </div>

          <div className="absolute top-2 right-2">
            <Badge variant="primary" size="sm">
              {book.language}
            </Badge>
          </div>

          {/* Quick View Button overlay on hover */}
          <button
            type="button"
            onClick={() => onQuickView && onQuickView(book)}
            className="absolute bottom-2 right-2 bg-white/90 dark:bg-darkCard/90 hover:bg-white text-gray-800 dark:text-gray-100 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer flex items-center gap-1 text-xs font-semibold"
            title="Быстрый просмотр"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Көрүү</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="truncate">{book.subject}</span>
            <RatingStars rating={book.rating || 5} showNumber />
          </div>

          <Link
            to={`/books/${book.id}`}
            className="block font-bold text-sm text-gray-900 dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 line-clamp-1 transition-colors"
          >
            {book.title}
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            {book.author}
          </p>

          {book.owner?.city && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
              <MapPin className="w-3 h-3" />
              <span>{book.owner.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-4 mt-3 border-t border-gray-100 dark:border-darkBorder flex items-center justify-between gap-2">
        <div>
          {isRentable ? (
            <div>
              <div className="text-[11px] text-gray-400 font-medium">Ижара (айына):</div>
              <div className="text-sm font-extrabold text-brand-600 dark:text-brand-400">
                {formatKGS(book.rentPricePerMonth)}
                <span className="text-[10px] font-normal text-gray-400"> /ай</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px] text-gray-400 font-medium">Сатуу баасы:</div>
              <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                {formatKGS(book.price)}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onAddToCart && onAddToCart(book, isRentable ? 'RENT' : 'BUY', 9)}
          className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-brand-500 hover:text-white text-brand-700 dark:text-brand-300 transition-all cursor-pointer shadow-xs"
          title="В корзину"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
