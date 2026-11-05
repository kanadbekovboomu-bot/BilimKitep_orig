import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Calculator,
  Globe,
  BookMarked,
  Zap,
  FlaskConical,
  Leaf,
  Landmark,
  Languages,
  Laptop,
  Target
} from 'lucide-react';
import { TyndykEmblem } from '../common/KyrgyzOrnament';

export const EDTECH_SUBJECTS = [
  { id: 'all', label: 'Баары', Icon: BookOpen, search: '', color: 'from-emerald-500 to-teal-600', badge: '100+' },
  { id: 'math', label: 'Математика', Icon: Calculator, search: 'Математика', color: 'from-blue-500 to-indigo-600', badge: '1-11 класс' },
  { id: 'kyrgyz', label: 'Кыргыз тили', Icon: Globe, search: 'Кыргыз тили', color: 'from-emerald-500 to-green-600', badge: 'Мамлекеттик', badgeKey: 'stateLang' },
  { id: 'lit', label: 'Адабият', Icon: BookMarked, search: 'Адабият', color: 'from-amber-500 to-orange-600', badge: 'Окуу куралы', badgeKey: 'studyGuide' },
  { id: 'physics', label: 'Физика', Icon: Zap, search: 'Физика', color: 'from-violet-500 to-purple-600', badge: '7-11 класс' },
  { id: 'chem', label: 'Химия', Icon: FlaskConical, search: 'Химия', color: 'from-teal-500 to-cyan-600', badge: '8-11 класс' },
  { id: 'bio', label: 'Биология', Icon: Leaf, search: 'Биология', color: 'from-lime-500 to-emerald-600', badge: '6-11 класс' },
  { id: 'history', label: 'Тарых', Icon: Landmark, search: 'Тарых', color: 'from-orange-500 to-amber-600', badge: 'КР & Дүйнө', badgeKey: 'krAndWorld' },
  { id: 'english', label: 'Англис тили', Icon: Languages, search: 'Англис', color: 'from-rose-500 to-red-600', badge: 'English' },
  { id: 'it', label: 'Информатика', Icon: Laptop, search: 'Информатика', color: 'from-fuchsia-500 to-pink-600', badge: 'IT / Санарип', badgeKey: 'itDigital' },
  { id: 'ort', label: 'ОРТ даярдоо', Icon: Target, search: 'ОРТ', color: 'from-yellow-500 to-amber-600', badge: 'ЖРТ / Грант', badgeKey: 'ortGrant' },
];

export const EdTechSubjectBar = ({
  selectedSubject = '',
  onSelectSubject,
  className = '',
}) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const handleSubjectClick = (item) => {
    if (onSelectSubject) {
      onSelectSubject(item.search);
    } else {
      navigate(item.search ? `/catalog?search=${encodeURIComponent(item.search)}` : '/catalog');
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
            {t('subjects.title', { defaultValue: 'Сабактар боюнча окуу китептери' })}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
          <TyndykEmblem size={12} className="text-amber-500" />
          <span className="hidden sm:inline">{t('subjects.standard', { defaultValue: 'Жалпы республикалык стандарт' })}</span>
          <span className="sm:hidden">{t('subjects.standardShort', { defaultValue: 'КР Стандарты' })}</span>
        </span>
      </div>

      {/* Horizontal Scrolling Pill Track */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar touch-pan-x">
        {EDTECH_SUBJECTS.map((item) => {
          const isSelected = selectedSubject.toLowerCase() === item.search.toLowerCase() ||
            (!selectedSubject && item.id === 'all');
          const Icon = item.Icon;
          const itemLabel = t(`subjects.${item.id}`, { defaultValue: item.label });
          const itemBadge = item.badgeKey ? t(`subjects.badges.${item.badgeKey}`, { defaultValue: item.badge }) : item.badge;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSubjectClick(item)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-colors duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="whitespace-nowrap">
                {itemLabel}
              </span>
              <span
                className={`text-[9px] font-medium px-1.5 py-0.2 rounded-md ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {itemBadge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EdTechSubjectBar;
