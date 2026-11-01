import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  X,
  BookOpen,
  ShoppingBag,
  PlusCircle,
  User,
  ShieldCheck,
  LogIn,
  LogOut,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LangSwitcher } from '../common/LangSwitcher';
import { BrandLogo } from '../common/BrandLogo';

const QUICK_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const QUICK_SUBJECTS = [
  { id: 'math', label: 'Математика & Алгебра', search: 'Математика' },
  { id: 'kyrgyz', label: 'Кыргыз тили & Адабият', search: 'Кыргыз' },
  { id: 'russian', label: 'Русский язык', search: 'Русский' },
  { id: 'english', label: 'English', search: 'English' },
  { id: 'physics', label: 'Физика', search: 'Физика' },
  { id: 'chemistry', label: 'Химия', search: 'Химия' },
  { id: 'history', label: 'Кыргызстан тарыхы', search: 'Тарых' },
  { id: 'geography', label: 'География', search: 'География' },
  { id: 'it', label: 'Информатика & ИКТ', search: 'Информатика' },
  { id: 'ort', label: '🎯 ЖРТ / ОРТ даярдоо', search: 'ЖРТ' },
];

export const BurgerMenu = ({ isOpen, onClose, cartCount = 0, user = null, onLogout }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [subjectCategory, setSubjectCategory] = useState('all'); // 'all' | 'sales' | 'reviews' | 'rent'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGradeSelect = (grade) => {
    navigate(`/catalog?grade=${grade}`);
    onClose();
  };

  const handleSubjectSelect = (searchTerm) => {
    let url = `/catalog?search=${encodeURIComponent(searchTerm)}`;
    if (subjectCategory === 'sales') {
      url += '&dealType=BUY';
    } else if (subjectCategory === 'reviews') {
      url += '&sort=reviews';
    } else if (subjectCategory === 'rent') {
      url += '&dealType=RENT';
    }
    navigate(url);
    onClose();
  };

  const handleDealTypeSelect = (dealType) => {
    navigate(dealType === 'all' ? '/catalog' : `/catalog?dealType=${dealType}`);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
      {/* Dimmed & blurred backdrop covering entire viewport */}
      <div
        data-testid="burger-menu-backdrop"
        className="fixed inset-0 bg-slate-900/35 dark:bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Centered Modal Window Dialog (Never Trapped, Never Cut Off) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Навигационное меню"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800/90 z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 fade-in duration-200 my-auto"
      >
        {/* Fixed Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 dark:border-darkBorder shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
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

        {/* Quick controls: Language + Theme Segmented Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-2.5 border-b border-gray-100 dark:border-darkBorder gap-2.5 shrink-0 bg-slate-50/90 dark:bg-slate-800/60">
          <LangSwitcher />
          <ThemeToggle variant="segmented" />
        </div>

        {/* Scrollable Modal Content (Overscroll Contain) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain">
          {/* User Preview Card if logged in */}
          {user && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
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

          {/* SECTION 1: QUICK GRADE SELECTOR (1-11 КЛАСС) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {t('menu.quickGrades', { defaultValue: 'Классы (1–11 класс)' })}
              </span>
              <button
                type="button"
                onClick={() => handleGradeSelect('all')}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                {t('menu.allGrades', { defaultValue: 'Все' })}
              </button>
            </div>

            {/* Grid of Grade Buttons for Instant Selection */}
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
              {QUICK_GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGradeSelect(g)}
                  className="h-9 rounded-xl font-black text-xs bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 transition-all cursor-pointer flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 active:scale-95"
                  title={`${g}-класс`}
                >
                  {g}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleSubjectSelect('ЖРТ')}
                className="col-span-1 h-9 rounded-xl font-bold text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-all cursor-pointer flex items-center justify-center border border-amber-200/60 active:scale-95"
                title="ЖРТ / ОРТ"
              >
                ЖРТ
              </button>
            </div>
          </div>

          {/* SECTION 2: POPULAR SUBJECTS WITH CATEGORIES */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {t('menu.quickSubjects', { defaultValue: 'Популярные предметы' })}
              </span>
              <span className="text-[10px] font-bold text-gray-400">
                Категории:
              </span>
            </div>

            {/* Sub-category selector tabs: Все / По продаже / По отзывам / По аренде */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSubjectCategory('all')}
                className={`py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'all'
                    ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Все
              </button>
              <button
                type="button"
                onClick={() => setSubjectCategory('sales')}
                className={`py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'sales'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                🛒 Продажа
              </button>
              <button
                type="button"
                onClick={() => setSubjectCategory('reviews')}
                className={`py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'reviews'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-gray-500 hover:text-amber-600'
                }`}
              >
                ⭐ Отзывы
              </button>
              <button
                type="button"
                onClick={() => setSubjectCategory('rent')}
                className={`py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'rent'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                🔄 Аренда
              </button>
            </div>

            {/* Subject Chips */}
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSubjectSelect(s.search)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    subjectCategory === 'sales'
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200/80 hover:bg-blue-100'
                      : subjectCategory === 'reviews'
                      ? 'bg-amber-50/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/80 hover:bg-amber-100'
                      : subjectCategory === 'rent'
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 hover:bg-emerald-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-slate-200/70 dark:border-slate-700/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 3: DEAL TYPE FILTER */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              {t('menu.dealType', { defaultValue: 'Формат книги' })}
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleDealTypeSelect('all')}
                className="py-2 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-center"
              >
                Все
              </button>
              <button
                type="button"
                onClick={() => handleDealTypeSelect('RENT')}
                className="py-2 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer text-center"
              >
                Аренда
              </button>
              <button
                type="button"
                onClick={() => handleDealTypeSelect('BUY')}
                className="py-2 px-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors cursor-pointer text-center"
              >
                Покупка
              </button>
            </div>
          </div>

          {/* SECTION 4: MAIN NAVIGATION LINKS */}
          <nav className="pt-2 border-t border-gray-100 dark:border-darkBorder space-y-2">
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
          </nav>
        </div>

        {/* Modal Footer */}
        {user ? (
          <div className="p-4 border-t border-gray-100 dark:border-darkBorder shrink-0 bg-white dark:bg-slate-900">
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
          <div className="py-3 border-t border-gray-100 dark:border-darkBorder text-center shrink-0 bg-white dark:bg-slate-900">
            <span className="text-[11px] text-gray-400 font-medium">
              BilimKitep KG • Шеринг окуу китептери
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Escaping <header>'s backdrop-filter containing block via portal
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default BurgerMenu;
