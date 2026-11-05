import React, { useState } from 'react';
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
  BookOpen,
  GraduationCap,
  Package,
  Sparkles
} from 'lucide-react';
import { DealBadge } from './DealBadge';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { formatKGS } from '../../utils/formatters';
import { TyndykEmblem } from '../common/KyrgyzOrnament';
import {
  getLocalizedBookTitle,
  getLocalizedBookDesc,
  getLocalizedBookAuthor,
  getLocalizedSubject,
  getLocalizedCity,
  getLocalizedMedium,
} from '../../utils/bookLocalization';

export const BookCard = ({
  book,
  onQuickView,
  onAddToCart,
}) => {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const [hasImgError, setHasImgError] = useState(false);

  const currentLang = i18n.language || 'ru';
  const title = getLocalizedBookTitle(book, currentLang);
  const desc = getLocalizedBookDesc(book, currentLang);
  const author = getLocalizedBookAuthor(book, currentLang);
  const subject = getLocalizedSubject(book.subject, currentLang);
  const city = getLocalizedCity(book.owner?.city, currentLang);
  const medium = getLocalizedMedium(book.language, currentLang);
  const currency = currentLang.toLowerCase().startsWith('en') ? 'KGS' : 'сом';

  const isRentable = book.dealType === 'RENT' || book.dealType === 'BOTH';
  const isAdminBook = book.isAdminBook === true || book.owner?.role === 'ADMIN' || book.isOfficial === true;
  const isUsed = book.isUsed !== undefined ? book.isUsed : !isAdminBook;
  const coverImage = book.images && book.images.length > 0
    ? book.images[0]
    : '/covers/geometry-8.svg';

  const getSubjectStyle = (subj = '') => {
    const s = subj.toLowerCase();
    if (s.includes('математик') || s.includes('алгебр') || s.includes('геометр') || s.includes('math')) {
      return { bg: 'bg-blue-50 dark:bg-blue-950/60', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200/80 dark:border-blue-800/40', Icon: Calculator };
    }
    if (s.includes('кыргыз') || s.includes('адабият') || s.includes('тили') || s.includes('lit')) {
      return { bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200/80 dark:border-emerald-800/40', Icon: BookOpen };
    }
    if (s.includes('физик') || s.includes('астроном') || s.includes('phys')) {
      return { bg: 'bg-indigo-50 dark:bg-indigo-950/60', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200/80 dark:border-indigo-800/40', Icon: Zap };
    }
    if (s.includes('хим') || s.includes('биолог') || s.includes('chem') || s.includes('bio')) {
      return { bg: 'bg-teal-50 dark:bg-teal-950/60', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200/80 dark:border-teal-800/40', Icon: FlaskConical };
    }
    if (s.includes('тарых') || s.includes('географ') || s.includes('hist') || s.includes('geog')) {
      return { bg: 'bg-amber-50 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300', border: 'border-amber-200/80 dark:border-amber-800/40', Icon: Landmark };
    }
    if (s.includes('англ') || s.includes('english')) {
      return { bg: 'bg-rose-50 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200/80 dark:border-rose-800/40', Icon: Globe };
    }
    if (s.includes('информ') || s.includes('ит') || s.includes('ict') || s.includes('it')) {
      return { bg: 'bg-violet-50 dark:bg-violet-950/60', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200/80 dark:border-violet-800/40', Icon: Laptop };
    }
    return { bg: 'bg-slate-50 dark:bg-slate-900/60', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200/80 dark:border-slate-800/40', Icon: BookOpen };
  };

  const subjectStyle = getSubjectStyle(book.subject || subject);
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
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-200 cursor-pointer text-left overflow-hidden"
    >
      <div>
        {/* Textbook Cover Frame */}
        <div className="relative w-full h-52 sm:h-56 bg-slate-50/90 dark:bg-slate-800/40 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-800/80">
          {/* Official Kyrgyz School Standard Seal Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 bg-slate-900/80 dark:bg-black/70 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-xs border border-amber-400/20">
            <TyndykEmblem size={11} className="text-amber-400" />
            <span className="text-amber-300 font-semibold">{t('card.krStandard', { defaultValue: 'КР Стандарты' })}</span>
          </div>

          {hasImgError ? (
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 text-white flex flex-col justify-between items-center text-center relative overflow-hidden">
              <div className="w-full text-[9px] font-semibold uppercase tracking-widest text-slate-300 pt-3 truncate">
                {subject}
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center my-auto">
                <SubjectIcon className="w-6 h-6 text-amber-300" />
              </div>
              <div className="w-full space-y-1">
                <div className="text-xs font-bold line-clamp-2 leading-tight text-white">
                  {title}
                </div>
                <div className="text-[10px] text-slate-300 font-medium">
                  {t('units.grade', { count: book.grade })}
                </div>
              </div>
            </div>
          ) : (
            <img
              src={coverImage}
              alt={title}
              loading="lazy"
              onError={() => setHasImgError(true)}
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
            />
          )}

          {/* Quick View Button overlay on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(book);
            }}
            className="absolute bottom-2.5 right-2.5 z-10 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 p-2 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1 text-xs font-medium"
            title={t('actions.quickView')}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">{t('actions.quickView')}</span>
          </button>
        </div>

        {/* Clean Meta Badges below the image */}
        <div className="flex items-center gap-1.5 flex-wrap pb-2">
          {/* Admin New vs User б/у Badge */}
          {isUsed ? (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold lowercase bg-amber-100/90 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs"
              title="Книга б/у от пользователя"
            >
              б/у
            </span>
          ) : (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/90 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs"
              title="Новая книга со склада администрации"
            >
              Новая
            </span>
          )}

          <DealBadge dealType={book.dealType} />
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
            {t('units.grade', { count: book.grade })}
          </span>
          <Badge variant="primary" size="sm">
            {medium}
          </Badge>

          {/* Remaining Stock in Catalog */}
          {(book.quantity ?? 1) <= 0 ? (
            <span className="inline-flex items-center text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200/60">
              Распродано
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
              Осталось: <strong className="font-bold text-emerald-700 dark:text-emerald-300 ml-1">{book.quantity ?? 1}</strong> шт.
            </span>
          )}
        </div>

        {/* Content with Subject Badge */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${subjectStyle.bg} ${subjectStyle.text} ${subjectStyle.border}`}>
              <span className="whitespace-nowrap">{subject}</span>
            </span>
            <RatingStars rating={book.rating || 5} showNumber />
          </div>

          <Link
            to={`/books/${book.id}`}
            onClick={(e) => e.stopPropagation()}
            className="block font-bold text-sm text-gray-900 dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 line-clamp-1 transition-colors"
          >
            {title}
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 font-medium">
            {author}
          </p>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 pt-1 leading-relaxed">
            {desc}
          </p>

          {city && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
              <MapPin className="w-3 h-3" />
              <span>{city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Actions Pod */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/80 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
        <div>
          {isRentable ? (
            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">
                {t('units.rentPrice')}
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 leading-tight flex items-baseline">
                {formatKGS(book.rentPricePerMonth, currency)}
                <span className="text-[10px] font-normal text-gray-400 ml-1">
                  {t('units.perMonth')}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">
                {t('units.buyPrice')}
              </div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100 leading-tight">
                {formatKGS(book.price, currency)}
              </div>
            </div>
          )}
          {/* Stock remaining indicator under price */}
          <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
            <span>
              {(book.quantity ?? 1) > 0 ? `В наличии: ${book.quantity ?? 1} шт.` : 'Нет в наличии'}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={(book.quantity ?? 1) <= 0}
          onClick={(e) => {
            e.stopPropagation();
            if ((book.quantity ?? 1) <= 0) return;
            onAddToCart && onAddToCart(book, isRentable ? 'RENT' : 'BUY', 9);
          }}
          className={`p-2.5 rounded-xl transition-colors duration-150 cursor-pointer shadow-xs shrink-0 ${
            (book.quantity ?? 1) <= 0
              ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-sm'
          }`}
          title={(book.quantity ?? 1) <= 0 ? 'Нет в наличии' : t('actions.addToCart')}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
