import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  BookOpen,
  Users,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { RevenueChart } from '../components/admin/RevenueChart';
import { CategoriesPieChart } from '../components/admin/CategoriesPieChart';
import { AdminBooksTable } from '../components/admin/AdminBooksTable';
import { AdminOrderModal } from '../components/admin/AdminOrderModal';
import { api } from '../services/api';
import { formatKGS, formatDate } from '../utils/formatters';

export const AdminDashboardPage = () => {
  const { t } = useTranslation('admin');

  const [metrics, setMetrics] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>{t('metrics.totalRevenue')}</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
                {formatKGS(metrics?.totalRevenue || 45200)}
              </div>
              <p className="text-[11px] text-gray-400">{t('metricsSub.revenueGrowth')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>{t('metrics.activeRentals')}</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                {metrics?.activeRentals || 42} {t('metricsSub.contracts')}
              </div>
              <p className="text-[11px] text-gray-400">{t('metricsSub.rentalsPeriods')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>{t('metrics.totalBooks')}</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                {books.length} {t('metricsSub.booksCount')}
              </div>
              <p className="text-[11px] text-gray-400">{t('metricsSub.booksCoverage')}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>{t('metrics.depositPool')}</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {formatKGS(metrics?.depositPool || 8400)}
              </div>
              <p className="text-[11px] text-gray-400">{t('metricsSub.depositGuarantee')}</p>
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
          />
        </div>
      </div>

      {/* Admin Order Inspection Modal */}
      <AdminOrderModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default AdminDashboardPage;
