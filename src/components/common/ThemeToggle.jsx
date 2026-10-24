import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkCard border border-transparent hover:border-gray-200 dark:hover:border-darkBorder transition-all cursor-pointer ${className}`}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
      title={isDark ? 'Светлая тема' : 'Темная тема'}
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
