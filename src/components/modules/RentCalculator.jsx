import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Calendar, ShoppingBag } from 'lucide-react';
import { Button } from '../common/Button';
import { formatKGS } from '../../utils/formatters';

export const RentCalculator = ({
  book,
  onRentSubmit,
  onBuySubmit,
}) => {
  const { t } = useTranslation(['book', 'common']);
  const [months, setMonths] = useState(9);
  const [tab, setTab] = useState(book.dealType === 'BUY' ? 'BUY' : 'RENT');

  const rentFee = (Number(book.rentPricePerMonth) || 0) * months;
  const deposit = Number(book.deposit) || 0;
  const totalDue = rentFee + deposit;

  const isRentable = book.dealType === 'RENT' || book.dealType === 'BOTH';
  const isBuyable = book.dealType === 'BUY' || book.dealType === 'BOTH';

  const durations = [
    { value: 3, label: t('rentCalculator.durationQuarter') },
    { value: 5, label: t('rentCalculator.durationSemester') },
    { value: 9, label: t('rentCalculator.durationYear') },
  ];

  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 shadow-sm space-y-5">
      {/* Tab Switcher if BOTH */}
      {book.dealType === 'BOTH' && (
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-darkBorder rounded-xl">
          <button
            type="button"
            onClick={() => setTab('RENT')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'RENT'
                ? 'bg-white dark:bg-darkCard text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {t('dealType.rent', { ns: 'common' })}
          </button>
          <button
            type="button"
            onClick={() => setTab('BUY')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'BUY'
                ? 'bg-white dark:bg-darkCard text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {t('dealType.buy', { ns: 'common' })}
          </button>
        </div>
      )}

      {tab === 'RENT' && isRentable ? (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
              {t('rentCalculator.title')}
            </h3>
          </div>

          {/* Duration Radio Cards */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {t('rentCalculator.chooseDuration')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {durations.map((d) => {
                const isSelected = months === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setMonths(d.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-emerald-950/40 text-brand-800 dark:text-brand-200 ring-2 ring-brand-500/20'
                        : 'border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{t('units.monthCount', { count: d.value, ns: 'common' })}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {formatKGS(book.rentPricePerMonth * d.value)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Breakdown calculation */}
          <div className="bg-gray-50 dark:bg-darkBorder/40 rounded-xl p-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{t('rentCalculator.rentPrice')} ({t('units.monthCount', { count: months, ns: 'common' })}):</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{formatKGS(rentFee)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{t('rentCalculator.deposit')}:</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{formatKGS(deposit)}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-darkBorder flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t('rentCalculator.total')}
              </span>
              <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
                {formatKGS(totalDue)}
              </span>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 text-brand-800 dark:text-brand-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-brand-500 mt-0.5" />
            <p className="leading-relaxed">
              {t('rentCalculator.depositNote')}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            icon={ShoppingBag}
            onClick={() => onRentSubmit && onRentSubmit(months)}
          >
            {t('rentCalculator.rentButton')} {t('units.monthCount', { count: months, ns: 'common' })} ({formatKGS(totalDue)})
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="p-4 bg-gray-50 dark:bg-darkBorder/40 rounded-xl space-y-2">
            <span className="text-xs text-gray-400">{t('buySection.title')}</span>
            <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
              {formatKGS(book.price)}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            icon={ShoppingBag}
            onClick={() => onBuySubmit && onBuySubmit()}
          >
            {t('buySection.buyBtn')} ({formatKGS(book.price)})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RentCalculator;
