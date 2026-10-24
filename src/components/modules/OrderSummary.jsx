import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { TyndykEmblem } from '../common/KyrgyzOrnament';
import { formatKGS } from '../../utils/formatters';

export const OrderSummary = ({
  items = [],
  totalAmount = 0,
  depositAmount = 0,
  shippingCost = 0,
  onCheckout,
  buttonText,
  isCheckoutPage = false,
}) => {
  const { t } = useTranslation('cart');
  const finalTotal = totalAmount + shippingCost;
  const subtotalWithoutDeposit = Math.max(0, totalAmount - depositAmount);

  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder shadow-sm space-y-5 overflow-hidden">
      {/* Kyrgyz National Tricolor Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      <div className="px-6 pb-6 pt-1 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-darkBorder">
          <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
            {t('orderCost')}
          </h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400">
            КР Дүкөнү 🇰🇬
          </span>
        </div>

      <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
        <div className="flex justify-between">
          <span>{items.length} {t('itemsCount')}:</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {formatKGS(subtotalWithoutDeposit)}
          </span>
        </div>

        {depositAmount > 0 && (
          <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('totalDeposit')} {t('depositGuaranteed')}:</span>
            </div>
            <span className="font-bold">{formatKGS(depositAmount)}</span>
          </div>
        )}

        {isCheckoutPage && (
          <div className="flex justify-between">
            <span>{t('shippingFee')}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {shippingCost > 0 ? formatKGS(shippingCost) : t('freePickup')}
            </span>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 dark:border-darkBorder flex justify-between items-baseline">
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {t('total')}:
          </span>
          <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
            {formatKGS(finalTotal)}
          </span>
        </div>
      </div>

      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCheckout}
          icon={ArrowRight}
        >
          {buttonText || t('proceedToCheckout')}
        </Button>
      )}

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          {t('termsNote')}
        </p>

        {/* Kyrgyz Store Guarantee & Eco Trust Badge */}
        <div className="pt-2 border-t border-gray-100 dark:border-darkBorder space-y-2">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-300/30 dark:border-amber-700/20 text-amber-900 dark:text-amber-200 text-[11px]">
            <TyndykEmblem size={18} className="text-amber-500 shrink-0" />
            <span className="font-semibold">
              Кыргызстан • Коопсуз төлөм жана кепилденген кайтарым күрөө
            </span>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
            🌿 Китепти кайра колдонуу — жаратылышты жана каражатты сактайт
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
