import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const isRentable = book.dealType === 'RENT' || book.dealType === 'BOTH';
  const coverImage = book.images && book.images.length > 0
    ? book.images[0]
    : '/covers/geometry-8.svg';

  const handleCardClick = (e) => {
    // Prevent navigation if clicking interactive buttons
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/books/${book.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/books/${book.id}`);
        }
      }}
      className="group bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-4 flex flex-col justify-between hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 cursor-pointer text-left"
    >
      <div>
        {/* Clean Book Cover Picture - No text or badges overlapping the image */}
        <div className="relative w-full h-56 bg-gray-50/80 dark:bg-darkBorder/40 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-2.5 border border-gray-100 dark:border-darkBorder">
          <img
            src={coverImage}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />

          {/* Quick View Button overlay on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(book);
            }}
            className="absolute bottom-2 right-2 bg-white/95 dark:bg-darkCard/95 hover:bg-white text-gray-800 dark:text-gray-100 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer flex items-center gap-1 text-xs font-semibold"
            title={t('actions.quickView')}
          >
            <Eye className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">{t('actions.quickView')}</span>
          </button>
        </div>

        {/* Clean Meta Badges below the image */}
        <div className="flex items-center gap-1.5 flex-wrap pb-2">
          <DealBadge dealType={book.dealType} />
          <Badge variant="default" size="sm">
            {t('units.grade', { count: book.grade })}
          </Badge>
          <Badge variant="primary" size="sm">
            {book.language}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="truncate font-medium">{book.subject}</span>
            <RatingStars rating={book.rating || 5} showNumber />
          </div>

          <Link
            to={`/books/${book.id}`}
            onClick={(e) => e.stopPropagation()}
            className="block font-bold text-sm text-gray-900 dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 line-clamp-1 transition-colors"
          >
            {book.title}
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 font-medium">
            {book.author}
          </p>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 pt-1 leading-relaxed">
            {book.description}
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
              <div className="text-[11px] text-gray-400 font-medium">
                {t('units.rentPrice')}
              </div>
              <div className="text-sm font-extrabold text-brand-600 dark:text-brand-400">
                {formatKGS(book.rentPricePerMonth)}
                <span className="text-[10px] font-normal text-gray-400">
                  {t('units.perMonth')}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[11px] text-gray-400 font-medium">
                {t('units.buyPrice')}
              </div>
              <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                {formatKGS(book.price)}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(book, isRentable ? 'RENT' : 'BUY', 9);
          }}
          className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-brand-500 hover:text-white text-brand-700 dark:text-brand-300 transition-all cursor-pointer shadow-xs"
          title={t('actions.addToCart')}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
