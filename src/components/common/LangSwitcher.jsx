import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LangSwitcher = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.slice(0, 2).toLowerCase() : 'ru';

  const languages = [
    { code: 'kg', label: 'KG', title: 'Кыргызча' },
    { code: 'ru', label: 'RU', title: 'Русский' },
    { code: 'en', label: 'EN', title: 'English' },
  ];

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className={`inline-flex items-center bg-gray-100 dark:bg-darkCard p-1 rounded-xl border border-gray-200 dark:border-darkBorder ${className}`}>
      <Globe className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-1 shrink-0" />
      {languages.map((l) => {
        const isActive = currentLang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => handleLangChange(l.code)}
            title={l.title}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-darkBorder text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
