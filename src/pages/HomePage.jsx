import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookOpen,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle,
  Users,
  GraduationCap,
  Coins,
  Truck
} from 'lucide-react';
import { BookGrid } from '../components/modules/BookGrid';
import { QuickViewModal } from '../components/modules/QuickViewModal';
import { EdTechSubjectBar } from '../components/modules/EdTechSubjectBar';
import { Button } from '../components/common/Button';
import { ToastNotification } from '../components/common/ToastNotification';
import { TyndykEmblem, KochkorMuyuzPattern, KyrgyzCultureBadge } from '../components/common/KyrgyzOrnament';
import { fetchBooks } from '../features/books/booksSlice';
import { addToCart } from '../features/cart/cartSlice';

export const HomePage = () => {
  const { t } = useTranslation('home');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: books, loading } = useSelector((state) => state.books);
  const [selectedQuickBook, setSelectedQuickBook] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks({ limit: 12, sort: 'newest' }));
  }, [dispatch]);

  const handleAddToCart = (book, type = 'RENT', months = 9) => {
    dispatch(addToCart({ book, type, months }));
    setToastMessage(t('toast.addedSimple', { ns: 'common', title: book.title }));
    setShowToast(true);
  };

  const gradeCards = [
    {
      title: t('gradeCards.primaryTitle'),
      gradeText: t('gradeCards.primaryGrade'),
      desc: t('gradeCards.primaryDesc'),
      to: '/catalog?grade=1',
      badge: t('gradeCards.primaryBadge'),
    },
    {
      title: t('gradeCards.middleTitle'),
      gradeText: t('gradeCards.middleGrade'),
      desc: t('gradeCards.middleDesc'),
      to: '/catalog?grade=8',
      badge: t('gradeCards.middleBadge'),
    },
    {
      title: t('gradeCards.seniorTitle'),
      gradeText: t('gradeCards.seniorGrade'),
      desc: t('gradeCards.seniorDesc'),
      to: '/catalog?grade=10',
      badge: t('gradeCards.seniorBadge'),
    },
    {
      title: t('gradeCards.ortTitle'),
      gradeText: t('gradeCards.ortGrade'),
      desc: t('gradeCards.ortDesc'),
      to: '/catalog?search=ОРТ',
      badge: t('gradeCards.ortBadge'),
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-16 pb-16">
      {/* Hero Section with Kyrgyz Cultural & Store Highlights */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/60 via-amber-50/30 to-transparent dark:from-emerald-950/20 dark:via-darkBg dark:to-transparent border-b border-gray-100 dark:border-darkBorder">
        {/* Ambient Entrance Glow Orbs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[34rem] h-96 bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-entrance">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <KyrgyzCultureBadge text={t('cultureBadge', { ns: 'common', defaultValue: 'Кыргызстандын окуу китептер дүкөнү • 7 облус' })} />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-brand-800 dark:text-brand-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>{t('hero.badge')}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Search}
                onClick={() => navigate('/catalog')}
                className="w-full sm:w-auto shadow-lg shadow-brand-500/25"
              >
                {t('hero.ctaCatalog')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={BookOpen}
                onClick={() => navigate('/add-book')}
                className="w-full sm:w-auto"
              >
                {t('hero.ctaAdd')}
              </Button>
            </div>

            {/* Quick stats pills */}
            <div className="pt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto text-center border-t border-gray-100 dark:border-darkBorder">
              <div>
                <div className="text-base sm:text-xl font-extrabold text-brand-600 dark:text-brand-400">1,500+</div>
                <div className="text-[11px] sm:text-xs text-gray-500">{t('hero.statsBooks')}</div>
              </div>
              <div>
                <div className="text-base sm:text-xl font-extrabold text-brand-600 dark:text-brand-400">70%</div>
                <div className="text-[11px] sm:text-xs text-gray-500">{t('hero.statsSaved')}</div>
              </div>
              <div>
                <div className="text-base sm:text-xl font-extrabold text-brand-600 dark:text-brand-400">7</div>
                <div className="text-[11px] sm:text-xs text-gray-500">{t('hero.statsRegions')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Kyrgyz National Ornament Runner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 opacity-25">
          <KochkorMuyuzPattern className="h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      </section>

      {/* OnlineMektep-inspired Interactive Subjects Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-darkCard rounded-3xl p-5 border border-gray-100 dark:border-darkBorder shadow-xs">
          <EdTechSubjectBar />
        </div>
      </section>

      {/* OnlineMektep-inspired Gamified Impact & Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-200/50 dark:border-blue-900/30 flex items-center gap-3.5 hover:scale-102 hover:shadow-lg hover:shadow-blue-500/15 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{t('impactStats.studentsCount', { defaultValue: '85 000+' })}</div>
              <div className="text-xs text-gray-500 font-semibold">{t('impactStats.studentsLabel', { defaultValue: 'Окуучулар колдонууда' })}</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center gap-3.5 hover:scale-102 hover:shadow-lg hover:shadow-emerald-500/15 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-md shadow-emerald-500/25">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{t('impactStats.booksCount', { defaultValue: '12 400+' })}</div>
              <div className="text-xs text-gray-500 font-semibold">{t('impactStats.booksLabel', { defaultValue: 'Текшерилген окуу китептер' })}</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-200/50 dark:border-amber-900/30 flex items-center gap-3.5 hover:scale-102 hover:shadow-lg hover:shadow-amber-500/15 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md shadow-amber-500/25">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{t('impactStats.savedAmount', { defaultValue: '4.8 млн сом' })}</div>
              <div className="text-xs text-gray-500 font-semibold">{t('impactStats.savedLabel', { defaultValue: 'Бюджет үнөмдөлдү' })}</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-500/10 to-red-500/5 border border-rose-200/50 dark:border-rose-900/30 flex items-center gap-3.5 hover:scale-102 hover:shadow-lg hover:shadow-rose-500/15 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shadow-md shadow-rose-500/25">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{t('impactStats.regionsCount', { defaultValue: '7 Облус' })}</div>
              <div className="text-xs text-gray-500 font-semibold">{t('impactStats.regionsLabel', { defaultValue: 'Бүт Кыргызстан' })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder shadow-xs space-y-3 relative group hover:border-brand-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {t('howItWorks.step1Title')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('howItWorks.step1Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder shadow-xs space-y-3 relative group hover:border-brand-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {t('howItWorks.step2Title')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('howItWorks.step2Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder shadow-xs space-y-3 relative group hover:border-brand-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {t('howItWorks.step3Title')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('howItWorks.step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Grade Categories Quick Jump */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('grades.title')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gradeCards.map((g, idx) => (
            <Link
              key={idx}
              to={g.to}
              className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all group space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  {g.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {g.title}
              </h3>
              <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {g.gradeText}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {g.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Textbooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t('featured.title')}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {t('featured.subtitle')}
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700"
          >
            <span>{t('featured.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <BookGrid
          books={books.slice(0, 12)}
          loading={loading}
          onQuickView={(b) => setSelectedQuickBook(b)}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Benefits Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('benefits.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
              <div className="space-y-1.5">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  <span>{t('benefits.b1Title')}</span>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  {t('benefits.b1Desc')}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>{t('benefits.b2Title')}</span>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  {t('benefits.b2Desc')}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('benefits.b3Title')}</span>
                </div>
                <p className="text-emerald-100 leading-relaxed">
                  {t('benefits.b3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        book={selectedQuickBook}
        isOpen={!!selectedQuickBook}
        onClose={() => setSelectedQuickBook(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Notification Toast */}
      <ToastNotification
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default HomePage;
