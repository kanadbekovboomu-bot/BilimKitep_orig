import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Filter,
  RotateCcw,
  Check,
  BookOpen,
  GraduationCap,
  Languages,
  Tag,
  Coins,
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Button } from '../common/Button';
import { formatKGS } from '../../utils/formatters';
import { TyndykEmblem, KochkorMuyuzPattern } from '../common/KyrgyzOrnament';

export const SidebarFilter = ({
  filters,
  onChange,
  onReset,
  className = '',
}) => {
  const { t, i18n } = useTranslation(['catalog', 'common']);
  const lang = i18n.language || 'ru';

  const grades = [
    { value: 'all', label: t('filters.allGrades') },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11 / ОРТ' },
  ];

  const languages = [
    { value: 'all', label: t('filters.allLanguages'), Icon: Globe, sub: 'Бардык тилдер' },
    { value: 'KG', label: t('filters.langKG'), Icon: TyndykEmblem, sub: 'Кыргыз тилинде' },
    { value: 'RU', label: t('filters.langRU'), Icon: Languages, sub: 'На русском языке' },
    { value: 'EN', label: t('filters.langEN'), Icon: BookOpen, sub: 'English textbook' },
  ];

  const dealTypes = [
    { value: 'all', label: t('filters.allTypes'), icon: Tag, desc: 'Бардык китептер' },
    { value: 'RENT', label: t('filters.rentOnly'), icon: BookOpen, desc: 'Үнөмдүү ижара' },
    { value: 'BUY', label: t('filters.buyOnly'), icon: Coins, desc: 'Түбөлүк сатып алуу' },
  ];

  return (
    <aside className={`bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm space-y-5 ${className}`}>
      {/* Kyrgyz National Color Ribbon on Top */}
      <div className="w-full h-2 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      <div className="p-5 space-y-6 pt-1">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-darkBorder">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
                {t('filters.title')}
              </h3>
              <p className="text-[10px] text-gray-400 font-medium">
                {lang === 'kg' ? 'Окуу китептерди тандоо' : 'Подбор учебников'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform" />
            <span>{t('results.resetBtn')}</span>
          </button>
        </div>

        {/* Deal Type Filter */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('filters.dealType')}</span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {dealTypes.map((type) => {
              const isSelected = filters.dealType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => onChange('dealType', type.value)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-400 dark:border-emerald-700 shadow-xs'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkBorder/40 border-gray-100 dark:border-darkBorder'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs">{type.label}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{type.desc}</div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grade Filter with Quick Class Chips */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('filters.grade')}</span>
            </label>
            {filters.grade !== 'all' && (
              <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                {filters.grade}-класс
              </span>
            )}
          </div>

          {/* Quick Grade Click Chips */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => onChange('grade', 'all')}
              className={`col-span-4 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer border ${
                filters.grade === 'all'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-gray-50 dark:bg-darkBorder/40 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-darkBorder hover:bg-gray-100'
              }`}
            >
              {t('filters.allGrades')}
            </button>

            {grades.slice(1).map((g) => {
              const isSelected = String(filters.grade) === String(g.value);
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => onChange('grade', g.value)}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-gray-50 dark:bg-darkBorder/40 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-darkBorder hover:bg-gray-100 dark:hover:bg-darkBorder'
                  }`}
                  title={`${g.value}-класс`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Filter */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('filters.language')}</span>
          </label>

          <div className="space-y-1.5">
            {languages.map((langItem) => {
              const isSelected = filters.language === langItem.value;
              return (
                <button
                  key={langItem.value}
                  type="button"
                  onClick={() => onChange('language', langItem.value)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 border-blue-400 dark:border-blue-700 shadow-xs'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkBorder/40 border-gray-100 dark:border-darkBorder'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs">{langItem.label}</div>
                    <div className="text-[10px] text-gray-400">{langItem.sub}</div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-darkBorder">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('filters.priceRange')}</span>
            </label>
            <span className="text-xs font-black text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-brand-200 dark:border-brand-800/40">
              {t('filters.upTo', { price: formatKGS(filters.maxPrice || 2000), defaultValue: `${formatKGS(filters.maxPrice || 2000)} чейин` })}
            </span>
          </div>

          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={filters.maxPrice || 2000}
            onChange={(e) => onChange('maxPrice', Number(e.target.value))}
            className="w-full accent-brand-500 cursor-pointer h-2 bg-gray-200 dark:bg-darkBorder rounded-lg appearance-none"
          />

          <div className="flex justify-between text-[10px] font-semibold text-gray-400">
            <span>{formatKGS(50)}</span>
            <span>{formatKGS(1000)}</span>
            <span>{formatKGS(2000)}</span>
          </div>
        </div>

        {/* Kyrgyz Cultural Wisdom Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-300/40 dark:border-amber-700/30 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <TyndykEmblem size={20} className="text-amber-500 shrink-0" />
            <span className="text-xs font-black text-amber-900 dark:text-amber-200">
              {t('filters.wisdomTitle', { defaultValue: '«Билим — түгөнгүс кенч»' })}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('filters.wisdomDesc', { defaultValue: 'Кыргызстандын окуучулары үчүн сапаттуу билим берүү жана жеткиликтүү китептер дүкөнү.' })}
          </p>
        </div>

        {/* Mobile Reset */}
        <div className="lg:hidden pt-1">
          <Button variant="outline" size="sm" className="w-full" onClick={onReset}>
            {t('results.resetBtn')}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter;
