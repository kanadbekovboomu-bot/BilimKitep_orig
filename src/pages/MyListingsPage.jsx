import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, BookOpen, Package, ShoppingBag, TrendingUp, Layers } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ListingManageRow } from '../components/modules/ListingManageRow';
import { BookSalesModal } from '../components/modules/BookSalesModal';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { formatKGS } from '../utils/formatters';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook } from '../features/books/booksSlice';

export const MyListingsPage = () => {
  const { t } = useTranslation(['profile', 'common']);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalesBook, setSelectedSalesBook] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const res = await api.getBooks({ limit: 100 });
        const filtered = res.items.filter(
          (b) => b.owner?.uuid === user?.uuid || b.owner?.id === user?.id || b.owner?.id === 'u_502' || b.owner?.uuid === 'a0020000-7c2a-41e9-9011-000000000002'
        );
        setMyBooks(filtered);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm(t('deleteListingConfirm'))) {
      await dispatch(deleteBook(id));
      setMyBooks((prev) => prev.filter((b) => b.id !== id));
      if (selectedSalesBook?.id === id) {
        setSelectedSalesBook(null);
      }
    }
  };

  const handleStockUpdate = (updatedBook) => {
    setMyBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    setSelectedSalesBook(updatedBook);
  };

  // Seller Aggregate Metrics
  const totalStock = myBooks.reduce((acc, b) => acc + (Number(b.quantity) || 0), 0);
  const totalSold = myBooks.reduce((acc, b) => acc + (Number(b.soldCount) || 0), 0);
  const totalRevenue = myBooks.reduce((acc, b) => {
    const directSales = Array.isArray(b.sales)
      ? b.sales.reduce((sum, s) => sum + (Number(s.totalAmount) || Number(s.price) || 0), 0)
      : (Number(b.soldCount) || 0) * (Number(b.price) || 0);
    return acc + directSales;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.profile', { ns: 'common' }), to: '/profile' },
          { label: t('myListingsTitle') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            {t('myListingsTitle')} ({myBooks.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Панель управления продажами, складскими остатками и покупателями
          </p>
        </div>
        <Link to="/add-book">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            {t('addBookBtn')}
          </Button>
        </Link>
      </div>

      {/* Seller Inventory & Sales Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Stock in Warehouse */}
        <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-emerald-100 dark:border-emerald-900/40 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 block truncate">Осталось на складе</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {totalStock} <span className="text-xs font-bold text-gray-400">шт.</span>
            </div>
          </div>
        </div>

        {/* Total Sold Books */}
        <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-blue-100 dark:border-blue-900/40 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 block truncate">Всего продано</span>
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
              {totalSold} <span className="text-xs font-bold text-gray-400">шт.</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-amber-100 dark:border-amber-900/40 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 block truncate">Выручка от продаж</span>
            <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 truncate">
              {formatKGS(totalRevenue)}
            </div>
          </div>
        </div>

        {/* Active Listings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-purple-100 dark:border-purple-900/40 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 block truncate">Активных позиций</span>
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
              {myBooks.length} <span className="text-xs font-bold text-gray-400">книг</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Listings List */}
      <div className="space-y-3">
        {myBooks.length > 0 ? (
          myBooks.map((b) => (
            <ListingManageRow
              key={b.id}
              book={b}
              onDelete={handleDelete}
              onViewSales={(book) => setSelectedSalesBook(book)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-12 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-500">{t('noListings')}</p>
          </div>
        )}
      </div>

      {/* Detailed Book Sales & Stock Modal */}
      <BookSalesModal
        book={selectedSalesBook}
        isOpen={!!selectedSalesBook}
        onClose={() => setSelectedSalesBook(null)}
        onStockUpdate={handleStockUpdate}
      />
    </div>
  );
};

export default MyListingsPage;
