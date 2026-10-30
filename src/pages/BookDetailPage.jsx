import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  ShieldCheck,
  Star,
  MessageSquarePlus,
  Share2,
  Calendar,
  AlertCircle,
  Truck
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { BookGallery } from '../components/modules/BookGallery';
import { RentCalculator } from '../components/modules/RentCalculator';
import { SellerCard } from '../components/modules/SellerCard';
import { ReviewCard } from '../components/modules/ReviewCard';
import { ReviewFormModal } from '../components/modules/ReviewFormModal';
import { DealBadge } from '../components/modules/DealBadge';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ToastNotification } from '../components/common/ToastNotification';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { fetchBookById, addReviewToBook } from '../features/books/booksSlice';
import { addToCart } from '../features/cart/cartSlice';
import {
  getLocalizedBookTitle,
  getLocalizedBookDesc,
  getLocalizedBookAuthor,
  getLocalizedSubject,
  getLocalizedMedium,
} from '../utils/bookLocalization';

export const BookDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation(['book', 'common']);
  const dispatch = useDispatch();

  const { selectedBook: book, loading, error } = useSelector((state) => state.books);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
  }, [id, dispatch]);

  const currentLang = i18n.language || 'ru';
  const localizedTitle = book ? getLocalizedBookTitle(book, currentLang) : '';
  const localizedDesc = book ? getLocalizedBookDesc(book, currentLang) : '';
  const localizedAuthor = book ? getLocalizedBookAuthor(book, currentLang) : '';
  const localizedSubject = book ? getLocalizedSubject(book.subject, currentLang) : '';
  const localizedMedium = book ? getLocalizedMedium(book.language, currentLang) : '';

  const conditionMap = {
    NEW: t('condition.new', { ns: 'common' }),
    EXCELLENT: t('condition.excellent', { ns: 'common' }),
    GOOD: t('condition.good', { ns: 'common' }),
    FAIR: t('condition.fair', { ns: 'common' }),
  };
  const localizedCondition = book ? (conditionMap[book.condition] || book.condition) : '';

  const handleRentSubmit = (months) => {
    if (!book) return;
    dispatch(addToCart({ book, type: 'RENT', months }));
    setToastMessage(t('toast.addedRent', { ns: 'common', title: localizedTitle || book.title, months }));
    setShowToast(true);
  };

  const handleBuySubmit = () => {
    if (!book) return;
    dispatch(addToCart({ book, type: 'BUY', months: null }));
    setToastMessage(t('toast.addedBuy', { ns: 'common', title: localizedTitle || book.title }));
    setShowToast(true);
  };

  const handleAddReview = (reviewData) => {
    if (!book) return;
    dispatch(addReviewToBook({ bookId: book.id, review: reviewData }));
    setToastMessage(t('toast.reviewAdded', { ns: 'common' }));
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-gray-500">{t('notFound.loading')}</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {t('notFound.title')}
        </h2>
        <p className="text-xs text-gray-500">
          {t('notFound.desc')}
        </p>
        <Link to="/catalog">
          <Button variant="primary" size="md">{t('notFound.backBtn')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: t('nav.catalog', { ns: 'common' }), to: '/catalog' },
          { label: localizedTitle || book.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Description */}
        <div className="lg:col-span-7 space-y-8">
          <BookGallery images={book.images} />

          {/* Book Info Card */}
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <DealBadge dealType={book.dealType} />
                <Badge variant="default">{t('units.grade', { count: book.grade, ns: 'common' })}</Badge>
                <Badge variant="primary">{localizedMedium || book.language}</Badge>
                <Badge variant="default">{localizedCondition || book.condition}</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {localizedTitle || book.title}
              </h1>

              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {t('details.author')}: <span className="text-brand-600 dark:text-brand-400">{localizedAuthor || book.author}</span>
              </p>
            </div>

            {/* Specs Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-darkBorder/40 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">{t('details.subject')}:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{localizedSubject || book.subject}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">{t('details.grade')}:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{t('units.grade', { count: book.grade, ns: 'common' })}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">{t('details.year')}:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{book.year || '2022'}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">{t('details.condition')}:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{localizedCondition || book.condition}</span>
              </div>
            </div>

            {/* Kyrgyz State Educational Compliance Banner */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent rounded-xl border border-amber-300/40 dark:border-amber-700/30">
              <TyndykEmblem size={32} className="text-amber-500 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-900 dark:text-gray-100">
                    {t('guarantee.ministryApprovalTitle', { defaultValue: 'КР Билим берүү жана илим министрлиги' })}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    {t('guarantee.approvedBadge', { defaultValue: 'Бекитилген' })}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {t('guarantee.complianceDesc', { defaultValue: 'Кыргыз Республикасынын мектеп программасына толук ылайыкталган окуу китеби' })}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                {t('details.description')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {localizedDesc || book.description}
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-darkBorder">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                  {t('details.reviews')} ({book.reviewsCount || 0})
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold pt-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{book.rating || 5.0} / 5.0</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={MessageSquarePlus}
                onClick={() => setIsReviewModalOpen(true)}
              >
                {t('details.addReview')}
              </Button>
            </div>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-3">
                {book.reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                {t('details.noReviews')}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Rent Calculator & Seller Info */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <RentCalculator
            book={book}
            onRentSubmit={handleRentSubmit}
            onBuySubmit={handleBuySubmit}
          />

          <SellerCard owner={book.owner} />

          {/* Kyrgyz Store Guarantees & Trust Card */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 dark:from-darkCard dark:to-darkCard/90 rounded-2xl border border-emerald-200/50 dark:border-darkBorder p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2.5 border-b border-emerald-100 dark:border-darkBorder">
              <TyndykEmblem size={20} className="text-amber-500 shrink-0" />
              <span className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                {t('guarantee.title', { defaultValue: 'БилимКитеп Кепилдиги • 100% Ишеним' })}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{t('guarantee.depositRefundTitle', { defaultValue: '100% Кайтарым Күрөө' })}</p>
                  <p className="text-[11px] text-gray-500">{t('guarantee.depositRefundDesc', { defaultValue: 'Китепти кайтаргандан кийин депозиттик сумма картаңызга толук кайтарылат.' })}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{t('guarantee.fastDeliveryTitle', { defaultValue: '7 Облуска Ыкчам Жеткирүү' })}</p>
                  <p className="text-[11px] text-gray-500">{t('guarantee.fastDeliveryDesc', { defaultValue: 'Бишкек, Ош жана бардык аймактарга курьер же почта аркылуу 24 саатта.' })}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{t('guarantee.verifiedConditionTitle', { defaultValue: 'Текшерилген Абал' })}</p>
                  <p className="text-[11px] text-gray-500">{t('guarantee.verifiedConditionDesc', { defaultValue: 'Ар бир окуу китеби бүтүндүгү жана сапаты текшерилип тапшырылат.' })}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 dark:border-darkBorder text-center">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 italic">
                {t('guarantee.proverb', { defaultValue: '«Билим — түгөнгүс кенч, өнөр — өчпөс чырак» 🇰🇬' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleAddReview}
      />

      {/* Toast */}
      <ToastNotification
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default BookDetailPage;
