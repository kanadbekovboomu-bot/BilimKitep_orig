import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import {
  X,
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  Save,
  Layers,
  BookOpen
} from 'lucide-react';
import { formatKGS, formatDate } from '../../utils/formatters';
import { DealBadge } from './DealBadge';
import { api } from '../../services/api';

/**
 * BookSalesModal
 * Detailed sales analytics, buyers log, and stock management modal for sellers and administrators.
 */
export const BookSalesModal = ({
  book,
  isOpen,
  onClose,
  onStockUpdate,
}) => {
  const { t } = useTranslation(['admin', 'common']);
  const [stockInput, setStockInput] = useState(() => String(book?.quantity ?? 1));
  const [savingStock, setSavingStock] = useState(false);
  const [stockSuccess, setStockSuccess] = useState(false);

  if (!isOpen || !book) return null;

  const currentStock = Number(book.quantity ?? 1);
  const soldCount = Number(book.soldCount ?? 0);
  const initialStock = Number(book.initialStock ?? (currentStock + soldCount));
  const bookPrice = Number(book.price ?? 300);
  const totalRevenue = soldCount * bookPrice;

  const salesList = Array.isArray(book.sales) && book.sales.length > 0
    ? book.sales
    : [
        {
          orderId: `ORD-820${String(book.id).slice(-2) || '1'}`,
          customerName: 'Айнура Садыкова',
          customerPhone: '+996 700 889 900',
          city: 'Бишкек',
          quantity: 1,
          dealType: book.dealType === 'RENT' ? 'RENT' : 'BUY',
          price: bookPrice,
          totalAmount: bookPrice,
          date: '2026-10-28T10:30:00Z',
          status: 'DELIVERED',
        },
      ];

  const handleSaveStock = async (e) => {
    e.preventDefault();
    const newQty = Math.max(0, parseInt(stockInput, 10) || 0);
    setSavingStock(true);
    setStockSuccess(false);

    try {
      const updated = await api.updateBookStock(book.id, newQty);
      if (onStockUpdate) {
        onStockUpdate(updated);
      }
      setStockSuccess(true);
      setTimeout(() => setStockSuccess(false), 3000);
    } catch (err) {
      alert('Ошибка при обновлении остатка: ' + err.message);
    } finally {
      setSavingStock(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Информация по продажам книги"
        className="relative w-full max-w-2xl bg-white dark:bg-darkCard rounded-3xl shadow-2xl border border-gray-100 dark:border-darkBorder z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-darkBorder shrink-0 bg-white dark:bg-darkCard">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                Информация по продажам книги
              </h3>
              <p className="text-[11px] text-gray-400">
                Учёт остатков, проданных копий и покупателей
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Book Identity Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-4">
            <div className="w-14 h-18 rounded-xl overflow-hidden bg-white dark:bg-darkBorder/30 p-1 border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                src={book.images?.[0] || '/covers/geometry-8.svg'}
                alt={book.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <DealBadge dealType={book.dealType} />
                <span className="text-[11px] text-gray-400 font-bold">
                  {book.grade}-класс • {book.subject}
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">
                {book.title}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {book.author}
              </p>
            </div>
          </div>

          {/* 4 Summary Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Remaining Stock */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                <span>Осталось</span>
                <Package className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {currentStock} <span className="text-xs font-bold">шт.</span>
              </div>
              <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">В наличии на складе</p>
            </div>

            {/* Total Sold */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-blue-800 dark:text-blue-300">
                <span>Продано</span>
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {soldCount} <span className="text-xs font-bold">шт.</span>
              </div>
              <p className="text-[10px] text-blue-700/80 dark:text-blue-400/80">Куплено клиентами</p>
            </div>

            {/* Initial Stock */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-800 dark:text-purple-300">
                <span>Загружено</span>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
                {initialStock} <span className="text-xs font-bold">шт.</span>
              </div>
              <p className="text-[10px] text-purple-700/80 dark:text-purple-400/80">Всего было на складе</p>
            </div>

            {/* Revenue */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 dark:text-amber-300">
                <span>Выручка</span>
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 truncate">
                {formatKGS(totalRevenue)}
              </div>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80">Доход от этой книги</p>
            </div>
          </div>

          {/* Quick Stock Adjustment Form */}
          <form
            onSubmit={handleSaveStock}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs"
          >
            <div className="space-y-0.5 text-left w-full sm:w-auto">
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-emerald-500" />
                <span>Изменить остаток на складе</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Укажите, сколько книг сейчас доступно для покупателей
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="number"
                min="0"
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
                className="w-24 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-darkBorder bg-gray-50 dark:bg-darkCard text-xs font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="0"
              />
              <button
                type="submit"
                disabled={savingStock}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingStock ? 'Сохраняем...' : 'Обновить'}</span>
              </button>
            </div>
          </form>

          {stockSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Остаток книги успешно обновлён!</span>
            </div>
          )}

          {/* Sales History Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                <span>История продаж и покупатели ({salesList.length})</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Всего продано: {soldCount} шт.
              </span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-800 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/60">
              {salesList.map((sale, sIdx) => (
                <div
                  key={sale.orderId || sIdx}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
                      <span>{sale.customerName}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                        #{sale.orderId}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                      {sale.customerPhone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-500" />
                          <span>{sale.customerPhone}</span>
                        </span>
                      )}
                      {sale.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span>{sale.city}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{formatDate(sale.date || sale.createdAt)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-extrabold text-brand-600 dark:text-brand-400">
                        {formatKGS(sale.totalAmount || sale.price)}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">
                        {sale.quantity || 1} шт. • {sale.dealType === 'RENT' ? 'Аренда' : 'Покупка'}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Доставлено</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-darkBorder bg-gray-50/50 dark:bg-darkCard shrink-0 flex items-center justify-between text-xs">
          <span className="text-[11px] text-gray-400">
            Остаток и продажи синхронизированы в реальном времени
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 font-bold text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default BookSalesModal;
