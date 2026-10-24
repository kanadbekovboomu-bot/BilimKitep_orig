import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, BookOpen, ShoppingBag, PlusCircle, User, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';

export const BurgerMenu = ({ isOpen, onClose, cartCount, user, onLogout }) => {
  const { t } = useTranslation('common');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-darkCard p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-darkBorder">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">BilimKitep</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-darkBorder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-darkBorder gap-2">
            <LangSwitcher />
            <ThemeToggle />
          </div>

          <nav className="flex flex-col gap-1.5 py-4">
            <Link
              to="/catalog"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-darkBorder hover:text-brand-600"
            >
              <BookOpen className="w-4 h-4" />
              {t('nav.catalog')}
            </Link>

            <Link
              to="/add-book"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-darkBorder hover:text-brand-600"
            >
              <PlusCircle className="w-4 h-4" />
              {t('nav.addBook')}
            </Link>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-darkBorder hover:text-brand-600"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                {t('nav.cart')}
              </div>
              {cartCount > 0 && (
                <span className="bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-darkBorder hover:text-brand-600"
                >
                  <User className="w-4 h-4" />
                  {t('nav.profile')}
                </Link>

                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {t('nav.admin')}
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-emerald-50 dark:hover:bg-darkBorder"
              >
                <LogIn className="w-4 h-4" />
                {t('nav.login')}
              </Link>
            )}
          </nav>
        </div>

        {user && (
          <div className="pt-4 border-t border-gray-100 dark:border-darkBorder">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
