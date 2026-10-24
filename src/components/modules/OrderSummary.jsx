import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
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
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 shadow-sm space-y-5">
      <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 pb-3 border-b border-gray-100 dark:border-darkBorder">
        {t('orderCost')}
      </h3>

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
    </div>
  );
};

export default OrderSummary;
