import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Eye,
  ShoppingBag,
  MapPin,
  Calculator,
  Languages,
  Zap,
  FlaskConical,
  Landmark,
  Globe,
  Laptop,
  BookOpen
} from 'lucide-react';
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

  const getSubjectStyle = (subject = '') => {
    const s = subject.toLowerCase();
    if (s.includes('математик') || s.includes('алгебр') || s.includes('геометр')) {
      return { bg: 'bg-blue-50 dark:bg-blue-950/60', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/80 dark:border-blue-800/40', Icon: Calculator };
    }
    if (s.includes('кыргыз') || s.includes('адабият') || s.includes('тили')) {
      return { bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/80 dark:border-emerald-800/40', Icon: BookOpen };
    }
    if (s.includes('физик') || s.includes('астроном')) {
      return { bg: 'bg-indigo-50 dark:bg-indigo-950/60', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200/80 dark:border-indigo-800/40', Icon: Zap };
    }
    if (s.includes('хим') || s.includes('биолог')) {
      return { bg: 'bg-teal-50 dark:bg-teal-950/60', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200/80 dark:border-teal-800/40', Icon: FlaskConical };
    }
    if (s.includes('тарых') || s.includes('географ')) {
      return { bg: 'bg-amber-50 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-200/80 dark:border-amber-800/40', Icon: Landmark };
    }
    if (s.includes('англ') || s.includes('english')) {
      return { bg: 'bg-rose-50 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200/80 dark:border-rose-800/40', Icon: Globe };
    }
    if (s.includes('информ') || s.includes('ит')) {
      return { bg: 'bg-violet-50 dark:bg-violet-950/60', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200/80 dark:border-violet-800/40', Icon: Laptop };
    }
    return { bg: 'bg-slate-50 dark:bg-slate-900/60', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200/80 dark:border-slate-800/40', Icon: BookOpen };
  };

  const subjectStyle = getSubjectStyle(book.subject);
  const SubjectIcon = subjectStyle.Icon || BookOpen;

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
      className="group bg-white/90 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-4 flex flex-col justify-between hover:shadow-[0_16px_36px_rgba(16,185,129,0.16)] hover:-translate-y-1.5 hover:border-emerald-400/80 dark:hover:border-emerald-500/80 transition-all duration-300 cursor-pointer text-left"
    >
      <div>
        {/* Clean Book Cover Picture - No text or badges overlapping the image */}
        <div className="relative w-full h-56 bg-gray-50/80 dark:bg-darkBorder/40 rounded-2xl overflow-hidden mb-3 flex items-center justify-center p-2.5 border border-gray-100 dark:border-darkBorder">
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
            className="absolute bottom-2 right-2 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-gray-800 dark:text-gray-100 p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:brightness-110 hover:shadow-md transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold border border-slate-200/70 dark:border-slate-700/70"
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

        {/* Content with OnlineMektep-styled Subject Badge */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border max-w-[70%] truncate ${subjectStyle.bg} ${subjectStyle.text} ${subjectStyle.border}`}>
              <SubjectIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{book.subject}</span>
            </span>
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
          className="p-2.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white hover:brightness-125 hover:shadow-[0_0_16px_rgba(16,185,129,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs"
          title={t('actions.addToCart')}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
