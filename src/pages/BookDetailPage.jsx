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
  AlertCircle
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
import { fetchBookById, addReviewToBook } from '../features/books/booksSlice';
import { addToCart } from '../features/cart/cartSlice';

export const BookDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation('book');
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

  const handleRentSubmit = (months) => {
    if (!book) return;
    dispatch(addToCart({ book, type: 'RENT', months }));
    setToastMessage(t('toast.addedRent', { ns: 'common', title: book.title, months }));
    setShowToast(true);
  };

  const handleBuySubmit = () => {
    if (!book) return;
    dispatch(addToCart({ book, type: 'BUY', months: null }));
    setToastMessage(t('toast.addedBuy', { ns: 'common', title: book.title }));
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
          { label: book.title },
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
                <Badge variant="primary">{book.language}</Badge>
                <Badge variant="default">{book.condition}</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {book.title}
              </h1>

              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {t('details.author')}: <span className="text-brand-600 dark:text-brand-400">{book.author}</span>
              </p>
            </div>

            {/* Specs Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-darkBorder/40 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">{t('details.subject')}:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{book.subject}</span>
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
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{book.condition}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                {t('details.description')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {book.description}
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
