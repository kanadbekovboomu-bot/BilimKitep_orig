import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  const { t } = useTranslation('common');

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 py-3">
      <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>{t('nav.home')}</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {isLast || !item.to ? (
              <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[200px] sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-brand-600 dark:hover:text-brand-400 truncate max-w-[150px]">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
