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
        className={`inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${className}`}
      >
        <button
          type="button"
          onClick={() => isDark && toggleTheme()}
          aria-pressed={!isDark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none ${
            !isDark
              ? 'bg-white text-amber-600 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>{dayLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => !isDark && toggleTheme()}
          aria-pressed={isDark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none ${
            isDark
              ? 'bg-slate-700 text-slate-100 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
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
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer select-none ${className}`}
      aria-label={fullLabel}
      title={fullLabel}
    >
      {/* Sun Indicator */}
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
          !isDark
            ? 'bg-white text-amber-500 shadow-xs'
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </span>

      {/* Moon Indicator */}
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
          isDark
            ? 'bg-slate-700 text-slate-100 shadow-xs'
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </span>
    </button>
  );
};

export default ThemeToggle;
