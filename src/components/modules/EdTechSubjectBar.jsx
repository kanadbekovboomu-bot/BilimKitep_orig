import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  { id: 'kyrgyz', label: 'Кыргыз тили', Icon: Globe, search: 'Кыргыз тили', color: 'from-emerald-500 to-green-600', badge: 'Мамлекеттик' },
  { id: 'lit', label: 'Адабият', Icon: BookMarked, search: 'Адабият', color: 'from-amber-500 to-orange-600', badge: 'Окуу куралы' },
  { id: 'physics', label: 'Физика', Icon: Zap, search: 'Физика', color: 'from-violet-500 to-purple-600', badge: '7-11 класс' },
  { id: 'chem', label: 'Химия', Icon: FlaskConical, search: 'Химия', color: 'from-teal-500 to-cyan-600', badge: '8-11 класс' },
  { id: 'bio', label: 'Биология', Icon: Leaf, search: 'Биология', color: 'from-lime-500 to-emerald-600', badge: '6-11 класс' },
  { id: 'history', label: 'Тарых', Icon: Landmark, search: 'Тарых', color: 'from-orange-500 to-amber-600', badge: 'КР & Дүйнө' },
  { id: 'english', label: 'Англис тили', Icon: Languages, search: 'Англис', color: 'from-rose-500 to-red-600', badge: 'English' },
  { id: 'it', label: 'Информатика', Icon: Laptop, search: 'Информатика', color: 'from-fuchsia-500 to-pink-600', badge: 'IT / Санарип' },
  { id: 'ort', label: 'ОРТ даярдоо', Icon: Target, search: 'ОРТ', color: 'from-yellow-500 to-amber-600', badge: 'ЖРТ / Грант' },
];

export const EdTechSubjectBar = ({
  selectedSubject = '',
  onSelectSubject,
  className = '',
}) => {
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
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-gray-800 dark:text-gray-200">
            Сабактар боюнча окуу китептери
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 dark:text-gray-500">
          <TyndykEmblem size={12} className="text-amber-500" />
          <span className="hidden sm:inline">Жалпы республикалык стандарт</span>
          <span className="sm:hidden">КР Стандарты</span>
        </span>
      </div>

      {/* Horizontal Scrolling Pill Track with MBANK Bright Glow */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar touch-pan-x scroll-smooth">
        {EDTECH_SUBJECTS.map((item) => {
          const isSelected = selectedSubject.toLowerCase() === item.search.toLowerCase() ||
            (!selectedSubject && item.id === 'all');
          const Icon = item.Icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSubjectClick(item)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all duration-300 shadow-xs cursor-pointer group ${
                isSelected
                  ? 'bg-gradient-to-r text-white shadow-lg shadow-emerald-500/25 scale-102 font-black border-transparent brightness-110 ' + item.color
                  : 'bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm hover:bg-white text-gray-700 dark:text-gray-200 border-gray-200/80 dark:border-darkBorder hover:border-emerald-400 hover:text-emerald-600 hover:brightness-120 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-115 text-current" />
              <span className="text-xs font-bold whitespace-nowrap">
                {item.label}
              </span>
              <span
                className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-darkBorder text-gray-500 dark:text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EdTechSubjectBar;
