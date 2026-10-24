import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';

export const FilterChips = ({ filters, onRemove, onClearAll }) => {
  const { t } = useTranslation(['catalog', 'common']);
  const chips = [];

  if (filters.search) {
    chips.push({ key: 'search', label: `${t('actions.search', { ns: 'common' })}: "${filters.search}"` });
  }
  if (filters.grade && filters.grade !== 'all') {
    chips.push({ key: 'grade', label: `${t('filters.grade')}: ${filters.grade}` });
  }
  if (filters.language && filters.language !== 'all') {
    chips.push({ key: 'language', label: `${t('filters.language')}: ${filters.language}` });
  }
  if (filters.dealType && filters.dealType !== 'all') {
    chips.push({
      key: 'dealType',
      label: filters.dealType === 'RENT' ? t('filters.rentOnly') : t('filters.buyOnly'),
    });
  }
  if (filters.maxPrice && filters.maxPrice < 2000) {
    chips.push({ key: 'maxPrice', label: `≤ ${formatKGS(filters.maxPrice)}` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs text-gray-500 font-medium">{t('filters.title')}:</span>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            className="hover:text-red-500 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-gray-400 hover:text-red-500 font-medium underline ml-1 cursor-pointer"
      >
        {t('results.resetBtn')}
      </button>
    </div>
  );
};

export default FilterChips;
