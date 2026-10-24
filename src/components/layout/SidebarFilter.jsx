import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { formatKGS } from '../../utils/formatters';

export const SidebarFilter = ({
  filters,
  onChange,
  onReset,
  className = '',
}) => {
  const { t } = useTranslation(['catalog', 'common']);

  const grades = [
    { value: 'all', label: t('filters.allGrades') },
    { value: '1', label: t('units.grade', { count: 1, ns: 'common' }) },
    { value: '2', label: t('units.grade', { count: 2, ns: 'common' }) },
    { value: '3', label: t('units.grade', { count: 3, ns: 'common' }) },
    { value: '4', label: t('units.grade', { count: 4, ns: 'common' }) },
    { value: '5', label: t('units.grade', { count: 5, ns: 'common' }) },
    { value: '6', label: t('units.grade', { count: 6, ns: 'common' }) },
    { value: '7', label: t('units.grade', { count: 7, ns: 'common' }) },
    { value: '8', label: t('units.grade', { count: 8, ns: 'common' }) },
    { value: '9', label: t('units.grade', { count: 9, ns: 'common' }) },
    { value: '10', label: t('units.grade', { count: 10, ns: 'common' }) },
    { value: '11', label: `${t('units.grade', { count: 11, ns: 'common' })} / ОРТ` },
  ];

  const languages = [
    { value: 'all', label: t('filters.allLanguages') },
    { value: 'KG', label: t('filters.langKG') },
    { value: 'RU', label: t('filters.langRU') },
    { value: 'EN', label: t('filters.langEN') },
  ];

  const dealTypes = [
    { value: 'all', label: t('filters.allTypes') },
    { value: 'RENT', label: t('filters.rentOnly') },
    { value: 'BUY', label: t('filters.buyOnly') },
  ];

  return (
    <aside className={`bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-5 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-darkBorder">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-500" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
            {t('filters.title')}
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          {t('results.resetBtn')}
        </button>
      </div>

      {/* Deal Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          {t('filters.dealType')}
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {dealTypes.map((type) => {
            const isSelected = filters.dealType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onChange('dealType', type.value)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/40'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-darkBorder/40 border border-transparent'
                }`}
              >
                <span>{type.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grade Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          {t('filters.grade')}
        </label>
        <select
          value={filters.grade}
          onChange={(e) => onChange('grade', e.target.value)}
          className="w-full text-xs font-medium rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-gray-100 p-2.5 focus:ring-2 focus:ring-brand-500 cursor-pointer"
        >
          {grades.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          {t('filters.language')}
        </label>
        <div className="space-y-1">
          {languages.map((lang) => {
            const isSelected = filters.language === lang.value;
            return (
              <button
                key={lang.value}
                type="button"
                onClick={() => onChange('language', lang.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-darkBorder/40'
                }`}
              >
                <span>{lang.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-darkBorder">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {t('filters.priceRange')}
          </label>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
            {formatKGS(filters.maxPrice || 2000)}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={filters.maxPrice || 2000}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
          className="w-full accent-brand-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>{formatKGS(50)}</span>
          <span>{formatKGS(1000)}</span>
          <span>{formatKGS(2000)}</span>
        </div>
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden pt-2">
        <Button variant="primary" size="sm" className="w-full" onClick={onReset}>
          {t('results.resetBtn')}
        </Button>
      </div>
    </aside>
  );
};

export default SidebarFilter;
