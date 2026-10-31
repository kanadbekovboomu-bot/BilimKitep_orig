import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from '../common/Modal';
import { DealBadge } from './DealBadge';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatKGS } from '../../utils/formatters';
import { ShoppingBag, ArrowRight, BookOpen } from 'lucide-react';
import { BookPreviewModal } from './BookPreviewModal';
import {
  getLocalizedBookTitle,
  getLocalizedBookDesc,
  getLocalizedBookAuthor,
  getLocalizedMedium,
} from '../../utils/bookLocalization';

export const QuickViewModal = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const { t, i18n } = useTranslation(['book', 'common']);
  const [selectedMonths, setSelectedMonths] = useState(9);
  const [dealType, setDealType] = useState('RENT');
  const [imgError, setImgError] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!book) return null;

  const currentLang = i18n.language || 'ru';
  const title = getLocalizedBookTitle(book, currentLang);
  const desc = getLocalizedBookDesc(book, currentLang);
  const author = getLocalizedBookAuthor(book, currentLang);
  const medium = getLocalizedMedium(book.language, currentLang);
  const currency = currentLang.toLowerCase().startsWith('en') ? 'KGS' : 'сом';

  const isRentable = book.dealType === 'RENT' || book.dealType === 'BOTH';
  const isBuyable = book.dealType === 'BUY' || book.dealType === 'BOTH';

  const rentTotal = (Number(book.rentPricePerMonth) * selectedMonths) + Number(book.deposit || 0);

  const handleAdd = () => {
    onAddToCart(book, dealType, selectedMonths);
    onClose();
  };

  const conditionMap = {
    NEW: t('condition.new', { ns: 'common' }),
    EXCELLENT: t('condition.excellent', { ns: 'common' }),
    GOOD: t('condition.good', { ns: 'common' }),
    FAIR: t('condition.fair', { ns: 'common' }),
  };
  const localizedCondition = conditionMap[book.condition] || book.condition;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image & Specs */}
        <div>
          <Link
            to={`/books/${book.id}`}
            onClick={onClose}
            className="block w-full h-64 bg-gray-50 dark:bg-darkBorder/40 rounded-xl overflow-hidden mb-3 p-2 group"
          >
            {imgError ? (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-violet-700 to-indigo-900 p-4 text-white flex flex-col justify-center items-center text-center">
                <div className="text-sm font-black mb-1">{title}</div>
                <div className="text-xs text-violet-200">{t('units.grade', { count: book.grade, ns: 'common' })}</div>
              </div>
            ) : (
              <img
                src={book.images?.[0] || '/covers/geometry-8.svg'}
                alt={title}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <DealBadge dealType={book.dealType} />
            <Badge variant="default" size="sm">
              {t('units.grade', { count: book.grade, ns: 'common' })}
            </Badge>
            <Badge variant="primary" size="sm">{medium}</Badge>
            <Badge variant="default" size="sm">{localizedCondition}</Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
            {desc}
          </p>
        </div>

        {/* Right: Pricing & Rent Calculation */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-darkBorder mb-3">
              <span className="text-xs text-gray-400">{t('details.author')}:</span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{author}</span>
            </div>

            {/* Deal Type Switcher if BOTH */}
            {book.dealType === 'BOTH' && (
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-darkBorder rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setDealType('RENT')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    dealType === 'RENT'
                      ? 'bg-white dark:bg-darkCard text-brand-600 shadow-xs'
                      : 'text-gray-500'
                  }`}
                >
                  {t('dealType.rent', { ns: 'common' })}
                </button>
                <button
                  type="button"
                  onClick={() => setDealType('BUY')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    dealType === 'BUY'
                      ? 'bg-white dark:bg-darkCard text-brand-600 shadow-xs'
                      : 'text-gray-500'
                  }`}
                >
                  {t('dealType.buy', { ns: 'common' })}
                </button>
              </div>
            )}

            {/* Rental Duration Options */}
            {dealType === 'RENT' && isRentable ? (
              <div className="space-y-3 bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-brand-200/50 dark:border-brand-800/30">
                <span className="text-xs font-bold text-brand-800 dark:text-brand-300">
                  {t('rentCalculator.chooseDuration')}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { m: 3, label: t('units.monthCount', { count: 3, ns: 'common' }) },
                    { m: 5, label: t('units.monthCount', { count: 5, ns: 'common' }) },
                    { m: 9, label: t('units.monthCount', { count: 9, ns: 'common' }) },
                  ].map((opt) => (
                    <button
                      key={opt.m}
                      type="button"
                      onClick={() => setSelectedMonths(opt.m)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                        selectedMonths === opt.m
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-white dark:bg-darkCard text-gray-700 dark:text-gray-300 border-gray-200 dark:border-darkBorder'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-xs space-y-1 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>{t('rentCalculator.rentPrice')} ({t('units.monthCount', { count: selectedMonths, ns: 'common' })}):</span>
                    <span className="font-semibold">{formatKGS(book.rentPricePerMonth * selectedMonths, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('rentCalculator.deposit')}:</span>
                    <span className="font-semibold">{formatKGS(book.deposit, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-brand-700 dark:text-brand-300 pt-1 border-t border-brand-200 dark:border-brand-800/40">
                    <span>{t('units.total', { ns: 'common' })}</span>
                    <span>{formatKGS(rentTotal, currency)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-darkBorder/40 rounded-xl space-y-2">
                <span className="text-xs text-gray-400">{t('buySection.title')}</span>
                <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                  {formatKGS(book.price, currency)}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <Button
              variant="outline"
              size="md"
              className="w-full text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
              icon={BookOpen}
              onClick={() => setIsPreviewOpen(true)}
            >
              {t('preview.btn', { defaultValue: '📖 Читать 5 страниц обзора' })}
            </Button>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={ShoppingBag}
              onClick={handleAdd}
            >
              {t('actions.addToCart', { ns: 'common' })} ({formatKGS(dealType === 'RENT' && isRentable ? rentTotal : book.price, currency)})
            </Button>

            <Link
              to={`/books/${book.id}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 py-1"
            >
              <span>{t('actions.viewDetails', { ns: 'common' })}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <BookPreviewModal
        book={book}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onAddToCart={onAddToCart}
      />
    </Modal>
  );
};

export default QuickViewModal;
