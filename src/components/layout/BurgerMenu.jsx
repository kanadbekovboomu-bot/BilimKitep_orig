import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, BookOpen, ShoppingBag, PlusCircle, User, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';
import { BrandLogo } from '../common/BrandLogo';

export const BurgerMenu = ({ isOpen, onClose, cartCount = 0, user = null, onLogout }) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed & blurred backdrop */}
      <div
        data-testid="burger-menu-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Modal Window Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Навигационное меню"
        className="relative w-full max-w-sm sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 z-10 my-auto overflow-hidden flex flex-col max-h-[90vh] transition-all transform scale-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-darkBorder shrink-0">
          <div onClick={onClose} className="cursor-pointer">
            <BrandLogo size="sm" showTagline={false} linkTo="/" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick settings: Language + Theme */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-darkBorder gap-2 shrink-0">
          <LangSwitcher />
          <ThemeToggle />
        </div>

        {/* Scrollable Navigation Body */}
        <div className="overflow-y-auto py-3 space-y-2.5 flex-1 pr-0.5">
          {/* User profile card if logged in */}
          {user && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3 mb-1">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                  {user.name || user.email}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <Link
            to="/catalog"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-gray-800 dark:text-gray-100 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700/80 transition-all"
          >
            <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="flex-1">{t('nav.catalog')}</span>
          </Link>

          <Link
            to="/add-book"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all"
          >
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <PlusCircle className="w-4 h-4 text-white" />
            </span>
            <span className="flex-1">{t('nav.addBook')}</span>
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <span>{t('nav.cart')}</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </span>
                <span className="flex-1">{t('nav.profile')}</span>
              </Link>

              {user.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 transition-colors"
                >
                  <span className="w-8 h-8 rounded-xl bg-purple-200 dark:bg-purple-900 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="flex-1">{t('nav.admin')}</span>
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20"
            >
              <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <LogIn className="w-4 h-4 text-white" />
              </span>
              <span className="flex-1">{t('nav.login')}</span>
            </Link>
          )}
        </div>

        {/* Modal Footer */}
        {user ? (
          <div className="pt-3 border-t border-gray-100 dark:border-darkBorder shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </button>
          </div>
        ) : (
          <div className="pt-3 border-t border-gray-100 dark:border-darkBorder text-center shrink-0">
            <span className="text-[11px] text-gray-400 font-medium">
              BilimKitep KG • Шеринг учебников
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
