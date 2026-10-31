import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, BookOpen, ShoppingBag, PlusCircle, User, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';
import { BrandLogo } from '../common/BrandLogo';

export const BurgerMenu = ({ isOpen, onClose, cartCount, user, onLogout }) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer: full width on small screens (<640px) to prevent awkward background peeking, max-w-sm on tablets */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[380px] sm:max-w-sm bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl border-l border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 z-10">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-darkBorder">
            <div onClick={onClose} className="cursor-pointer">
              <BrandLogo size="sm" showTagline={false} linkTo="/" />
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-darkBorder gap-2">
            <LangSwitcher />
            <ThemeToggle />
          </div>

          <nav className="flex flex-col gap-2 py-4">
            <Link
              to="/catalog"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-gray-800 dark:text-gray-100 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700/80 transition-all"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </span>
              <span>{t('nav.catalog')}</span>
            </Link>

            <Link
              to="/add-book"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all"
            >
              <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <PlusCircle className="w-4 h-4 text-white" />
              </span>
              <span>{t('nav.addBook')}</span>
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
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-brand-300" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
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
