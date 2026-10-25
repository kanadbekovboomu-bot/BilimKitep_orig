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
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { DealBadge } from './DealBadge';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { formatKGS } from '../../utils/formatters';
import { TyndykEmblem } from '../common/KyrgyzOrnament';

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
      className="group relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-slate-800/80 p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-[0_24px_48px_-12px_rgba(16,185,129,0.26)] hover:-translate-y-2 hover:rotate-[0.3deg] hover:border-emerald-400/90 dark:hover:border-emerald-500/90 transition-all duration-300 ease-out cursor-pointer text-left overflow-hidden before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1.5 before:rounded-r-full before:bg-gradient-to-b before:from-amber-400 before:via-emerald-500 before:to-teal-600 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      {/* Subtle Ethnic Vector Watermark Accent (matching background ornament) */}
      <div className="absolute -top-7 -right-7 w-28 h-28 text-emerald-600/7 dark:text-emerald-400/7 pointer-events-none group-hover:text-emerald-600/16 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M 50,15 C 40,25 40,35 50,45 C 60,35 60,25 50,15 Z" fill="currentColor" opacity="0.6"/>
          <path d="M 50,85 C 40,75 40,65 50,55 C 60,65 60,75 50,85 Z" fill="currentColor" opacity="0.6"/>
          <path d="M 15,50 C 25,40 35,40 45,50 C 35,60 25,60 15,50 Z" fill="currentColor" opacity="0.6"/>
          <path d="M 85,50 C 75,40 65,40 55,50 C 65,60 75,60 85,50 Z" fill="currentColor" opacity="0.6"/>
        </svg>
      </div>

      <div>
        {/* 3D Textbook Cover Frame with Physical Book Spine & Page Edges */}
        <div className="relative w-full h-52 sm:h-56 bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100/60 dark:from-slate-800/60 dark:via-darkBorder/40 dark:to-slate-800/30 rounded-2xl overflow-hidden mb-3.5 flex items-center justify-center p-3 border border-slate-200/70 dark:border-slate-700/60 shadow-[2px_3px_0px_rgba(0,0,0,0.04),4px_5px_0px_rgba(0,0,0,0.02)] dark:shadow-[2px_3px_0px_rgba(255,255,255,0.03)] group-hover:shadow-[4px_6px_0px_rgba(16,185,129,0.12)] transition-shadow">
          {/* Left Embossed Book Spine Edge */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/15 via-white/10 to-transparent pointer-events-none border-r border-black/5" />

          {/* Official Kyrgyz School Standard Seal Badge */}
          <div className="absolute top-2.5 left-2.5 bg-slate-900/85 dark:bg-black/85 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-md border border-amber-400/30">
            <TyndykEmblem size={11} className="text-amber-400" />
            <span className="text-amber-300 font-bold">{t('card.krStandard', { defaultValue: 'КР Мектеп' })}</span>
          </div>

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
            className="absolute bottom-2.5 right-2.5 bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-gray-800 dark:text-gray-100 p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:brightness-110 hover:shadow-md transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold border border-slate-200/70 dark:border-slate-700/70"
            title={t('actions.quickView')}
          >
            <Eye className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">{t('actions.quickView')}</span>
          </button>
        </div>

        {/* Clean Meta Badges below the image */}
        <div className="flex items-center gap-1.5 flex-wrap pb-2">
          <DealBadge dealType={book.dealType} />
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
            <GraduationCap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>{t('units.grade', { count: book.grade })}</span>
          </span>
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

      {/* MBANK Fintech Pricing & Actions Pod */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 bg-gradient-to-r from-slate-50/90 to-emerald-50/30 dark:from-slate-800/60 dark:to-emerald-950/20 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 group-hover:border-emerald-300/80 dark:group-hover:border-emerald-600/60 transition-all duration-300">
        <div>
          {isRentable ? (
            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">
                {t('units.rentPrice')}
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 leading-tight flex items-baseline">
                {formatKGS(book.rentPricePerMonth)}
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
          className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white hover:brightness-120 hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/30 shrink-0"
          title={t('actions.addToCart')}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
