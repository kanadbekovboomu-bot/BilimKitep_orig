import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  BookMarked,
  ShoppingBag,
  Users,
  Settings,
  ArrowLeft,
  ShieldAlert
} from 'lucide-react';

export const AdminSidebar = () => {
  const { t } = useTranslation('admin');

  const links = [
    { to: '/admin', icon: BarChart3, label: 'Аналитика и Дашборд', end: true },
    { to: '/catalog', icon: BookMarked, label: 'Каталог на сайте' },
    { to: '/profile', icon: Users, label: 'Пользовательский вид' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-5 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-darkBorder">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Админ-панель
          </h2>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
            SuperAdmin КР
          </span>
        </div>
      </div>

      <nav className="space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-darkBorder/40'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-gray-100 dark:border-darkBorder">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Сайтка кайтуу (На сайт)</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
