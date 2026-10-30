import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  BookOpen,
  ShoppingBag,
  PlusCircle,
  User,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';
import { BurgerMenu } from './BurgerMenu';
import { TyndykEmblem } from '../common/KyrgyzOrnament';
import { BrandLogo } from '../common/BrandLogo';
import { logout } from '../../features/auth/authSlice';

export const Header = () => {
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-darkBg/95 border-b border-gray-100 dark:border-darkBorder transition-colors shadow-xs">
      {/* Kyrgyz National Color Ribbon */}
      <div className="w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* New Premium Kyrgyz Brand Logo */}
          <BrandLogo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Catalog Button Pill */}
            <Link
              to="/catalog"
              className="group relative px-4 py-2 rounded-2xl text-xs xl:text-sm font-bold text-gray-800 dark:text-gray-100 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-400/80 shadow-xs hover:shadow-[0_4px_16px_rgba(16,185,129,0.18)] transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 backdrop-blur-md"
            >
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span>{t('nav.catalog')}</span>
            </Link>

            {/* Add Book CTA Pill (M-Bank FinTech Aesthetic) */}
            <Link
              to="/add-book"
              className="group relative px-4 py-2 rounded-2xl text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 hover:shadow-[0_6px_22px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.22)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity pointer-events-none" />
              <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-90 transition-transform duration-300">
                <PlusCircle className="w-4 h-4 text-white" />
              </span>
              <span>{t('nav.addBook')}</span>
            </Link>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle />

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkCard transition-colors"
              aria-label={t('nav.cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Account / Login */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-darkBorder hover:bg-gray-50 dark:hover:bg-darkCard transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover border border-brand-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 max-w-[100px] truncate">
                    {user.name || user.email}
                  </span>
                </Link>

                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className="p-2 rounded-xl text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 transition-colors"
                    title={t('nav.admin')}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                {t('nav.login')}
              </Link>
            )}

            {/* Mobile / Tablet menu hamburger button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkCard cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <BurgerMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={totalCartCount}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
