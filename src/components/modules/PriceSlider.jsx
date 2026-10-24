import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatKGS } from '../../utils/formatters';

export const PriceSlider = ({
  value = 2000,
  min = 50,
  max = 2000,
  onChange,
  className = '',
}) => {
  const { t } = useTranslation(['catalog', 'common']);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 font-medium">{t('filters.priceRange')}:</span>
        <span className="font-bold text-brand-600 dark:text-brand-400">
          {formatKGS(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step="50"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-500 cursor-pointer"
      />
    </div>
  );
};

export default PriceSlider;
