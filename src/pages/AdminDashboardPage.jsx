import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  BookOpen,
  Users,
  ShieldCheck,
  RefreshCw,
  Eye,
  Package,
  ShoppingBag
} from 'lucide-react';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { RevenueChart } from '../components/admin/RevenueChart';
import { CategoriesPieChart } from '../components/admin/CategoriesPieChart';
import { AdminBooksTable } from '../components/admin/AdminBooksTable';
import { AdminOrderModal } from '../components/admin/AdminOrderModal';
import { BookSalesModal } from '../components/modules/BookSalesModal';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { api } from '../services/api';
import { formatKGS, formatDate } from '../utils/formatters';

export const AdminDashboardPage = () => {
  const { t } = useTranslation('admin');

  const [metrics, setMetrics] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedSalesBook, setSelectedSalesBook] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [met, bks, ords] = await Promise.all([
        api.getAdminMetrics(),
        api.getBooks({ limit: 100 }),
        api.getOrders(),
      ]);
      setMetrics(met);
      setBooks(bks.items);
      setOrders(ords);
    } catch (err) {
      console.error('Admin data fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteBook = async (id) => {
    if (window.confirm(t('actions.confirmDelete', { ns: 'common' }))) {
      await api.deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleToggleStatus = async (id) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    const newStatus = book.status === 'AVAILABLE' ? 'RENTED' : 'AVAILABLE';
    await api.updateBook(id, { status: newStatus });
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleStockUpdate = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    setSelectedSalesBook(updatedBook);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Admin Sidebar Navigation */}
        <AdminSidebar />

        {/* Main Dashboard Content */}
        <div className="flex-1 w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-900 dark:text-amber-200 text-[11px] font-bold border border-amber-300/40 mb-1.5">
                <TyndykEmblem size={13} className="text-amber-500" />
                <span>Кыргызстан • Билим берүү жана окуу китептер платформасы</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {t('title')}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {t('subtitle')}
              </p>
            </div>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{t('actions.refresh', { ns: 'common' })}</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">{t('metrics.totalRevenue')}</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-brand-600 dark:text-brand-400 truncate">
                {formatKGS(metrics?.totalRevenue || 45200)}
              </div>
              <p className="text-[10px] text-gray-400 truncate">{t('metricsSub.revenueGrowth')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">Продано книг</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400">
                {metrics?.totalBooksSold || books.reduce((acc, b) => acc + (b.soldCount || 0), 0)} <span className="text-xs font-bold text-gray-400">шт.</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">Куплено клиентами</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">Остаток на складе</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                  <Package className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                {metrics?.totalBooksInStock || books.reduce((acc, b) => acc + (b.quantity || 0), 0)} <span className="text-xs font-bold text-gray-400">шт.</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">В наличии в каталоге</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">{t('metrics.activeRentals')}</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100 truncate">
                {metrics?.activeRentals || 42} <span className="text-xs font-bold text-gray-400">{t('metricsSub.contracts')}</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">{t('metricsSub.rentalsPeriods')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">{t('metrics.totalBooks')}</span>
                <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100">
                {books.length} <span className="text-xs font-bold text-gray-400">{t('metricsSub.booksCount')}</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">{t('metricsSub.booksCoverage')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="truncate">{t('metrics.depositPool')}</span>
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 truncate">
                {formatKGS(metrics?.depositPool || 8400)}
              </div>
              <p className="text-[10px] text-gray-400 truncate">{t('metricsSub.depositGuarantee')}</p>
            </div>
          </div>

          {/* Recharts Analytics Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueChart data={metrics?.chartData} />
            <CategoriesPieChart data={metrics?.categoriesData} />
          </div>

          {/* Recent Orders List */}
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-5 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
              {t('tables.ordersTitle')} ({orders.length})
            </h3>

            {orders.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-darkBorder">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        #{ord.id} • {ord.customerName}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {ord.city} • {formatDate(ord.createdAt)} • {ord.paymentMethod}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-brand-600 dark:text-brand-400">
                        {formatKGS(ord.totalAmount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-darkBorder hover:bg-gray-50 text-gray-600 dark:text-gray-300"
                        title={t('actions.viewDetails', { ns: 'common' })}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-3">{t('tables.ordersTitle')} (0)</p>
            )}
          </div>

          {/* Catalog Management CRUD Table */}
          <AdminBooksTable
            books={books}
            onDeleteBook={handleDeleteBook}
            onToggleStatus={handleToggleStatus}
            onViewSales={(b) => setSelectedSalesBook(b)}
          />
        </div>
      </div>

      {/* Admin Order Inspection Modal */}
      <AdminOrderModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Admin Book Sales & Inventory Modal */}
      <BookSalesModal
        book={selectedSalesBook}
        isOpen={!!selectedSalesBook}
        onClose={() => setSelectedSalesBook(null)}
        onStockUpdate={handleStockUpdate}
      />
    </div>
  );
};

export default AdminDashboardPage;
