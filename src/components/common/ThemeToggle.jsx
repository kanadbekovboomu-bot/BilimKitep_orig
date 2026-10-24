import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark = theme === 'dark';

  const label = isDark
    ? (i18n.language === 'en' ? 'Switch to light mode' : (i18n.language === 'kg' ? 'Жарык тема' : 'Светлая тема'))
    : (i18n.language === 'en' ? 'Switch to dark mode' : (i18n.language === 'kg' ? 'Караңгы тема' : 'Темная тема'));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkCard border border-transparent hover:border-gray-200 dark:hover:border-darkBorder transition-all cursor-pointer ${className}`}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 animate-in fade-in duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700 animate-in fade-in duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
