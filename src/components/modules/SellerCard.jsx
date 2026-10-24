import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, ShieldCheck, MapPin, UserCheck } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { formatPhoneKG } from '../../utils/formatters';

export const SellerCard = ({ owner }) => {
  const { t } = useTranslation('common');
  if (!owner) return null;

  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-lg shrink-0">
          {owner.name?.charAt(0) || 'U'}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
              {owner.name}
            </h4>
            <ShieldCheck className="w-4 h-4 text-brand-500" title={t('seller.verified')} />
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <RatingStars rating={owner.rating || 4.9} size="sm" showNumber />
            <span className="text-[11px] text-gray-400">• {t('seller.verified')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-darkBorder text-xs text-gray-600 dark:text-gray-300">
        {owner.city && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{t('seller.location')} <strong className="text-gray-900 dark:text-gray-100">{owner.city}</strong></span>
          </div>
        )}
        {owner.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{t('seller.contact')} <strong className="text-gray-900 dark:text-gray-100">{formatPhoneKG(owner.phone)}</strong></span>
          </div>
        )}
      </div>

      <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-darkBorder/40 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-brand-500 shrink-0" />
        <span>{t('seller.hiddenUntilOrder')}</span>
      </div>
    </div>
  );
};

export default SellerCard;
