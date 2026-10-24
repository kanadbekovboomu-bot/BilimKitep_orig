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
  GraduationCap
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';
import { BurgerMenu } from './BurgerMenu';
import { TyndykEmblem } from '../common/KyrgyzOrnament';
import { logout } from '../../features/auth/authSlice';

export const Header = ({ onOpenDefenseModal }) => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo with Kyrgyz cultural Tyndyk accent */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="absolute -top-1.5 -right-1.5">
                <TyndykEmblem size={15} className="text-amber-500 drop-shadow-sm" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-gray-100">
                  Bilim<span className="text-brand-500">Kitep</span>
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-red-600 text-white shadow-xs">
                  KG
                </span>
              </div>
              <span className="text-[10px] text-gray-400 dark:text-gray-400 font-medium tracking-wider hidden sm:block">
                Кыргызстан • Окуу китептер дүкөнү
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/catalog"
              className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-darkCard transition-colors"
            >
              {t('nav.catalog')}
            </Link>

            <Link
              to="/add-book"
              className="px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-darkCard transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-brand-500" />
              {t('nav.addBook')}
            </Link>

            {/* Quick Diploma Defense Presentation Guide Button */}
            {onOpenDefenseModal && (
              <button
                type="button"
                onClick={onOpenDefenseModal}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                title="5-minute Defense Speech in English (Diploma Section 9)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
                <span className="hidden xl:inline">Speech Guide</span> (10/10)
              </button>
            )}
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

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-darkCard"
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
