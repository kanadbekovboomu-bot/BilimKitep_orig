import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle
 * Modern, crystal-clear theme switcher with active state illumination.
 * Supports compact interactive dual-pill for the header, and full segmented control for mobile drawers.
 *
 * @param {'compact'|'segmented'} [variant='compact']
 * @param {string} [className='']
 */
export const ThemeToggle = ({ variant = 'compact', className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark = theme === 'dark';

  const dayLabel = i18n.language === 'kg' ? 'Жарык' : (i18n.language === 'en' ? 'Day' : 'День');
  const nightLabel = i18n.language === 'kg' ? 'Караңгы' : (i18n.language === 'en' ? 'Night' : 'Ночь');

  const fullLabel = isDark
    ? (i18n.language === 'kg' ? 'Караңгы тема күйгүзүлгөн (Жарыкка которуу)' : 'Темная тема активна (Переключить на светлую)')
    : (i18n.language === 'kg' ? 'Жарык тема күйгүзүлгөн (Караңгыга которуу)' : 'Светлая тема активна (Переключить на темную)');

  if (variant === 'segmented') {
    return (
      <div
        role="group"
        aria-label="Переключатель темы оформления"
        className={`inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/70 dark:border-slate-800 transition-colors ${className}`}
      >
        <button
          type="button"
          onClick={() => isDark && toggleTheme()}
          aria-pressed={!isDark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
            !isDark
              ? 'bg-white text-amber-600 shadow-sm ring-1 ring-amber-400/50 scale-102 font-extrabold'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 animate-spin-slow' : ''}`} />
          <span>{dayLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => !isDark && toggleTheme()}
          aria-pressed={isDark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
            isDark
              ? 'bg-slate-800 text-indigo-300 shadow-sm ring-1 ring-indigo-500/50 scale-102 font-extrabold'
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-indigo-400' : ''}`} />
          <span>{nightLabel}</span>
        </button>
      </div>
    );
  }

  // Compact Dual Pill Switcher for Header & Mobile Navigation
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-1 p-1 rounded-full bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 hover:border-emerald-400/70 dark:hover:border-emerald-500/70 transition-all duration-200 cursor-pointer shadow-xs select-none ${className}`}
      aria-label={fullLabel}
      title={fullLabel}
    >
      {/* Sun Indicator (Actively glowing in Day mode) */}
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
          !isDark
            ? 'bg-amber-400 text-slate-900 shadow-sm shadow-amber-400/50 scale-110 ring-1 ring-amber-300'
            : 'text-slate-400 dark:text-slate-500 hover:text-amber-400'
        }`}
      >
        <Sun className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>

      {/* Moon Indicator (Actively glowing in Night mode) */}
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
          isDark
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50 scale-110 ring-1 ring-indigo-400'
            : 'text-slate-400 dark:text-slate-500 hover:text-indigo-400'
        }`}
      >
        <Moon className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
    </button>
  );
};

export default ThemeToggle;
