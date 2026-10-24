import React from 'react';
import { Package, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { formatKGS, formatDate } from '../../utils/formatters';

export const UserOrderRow = ({ order }) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">
            #{order.id}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-brand-700 dark:bg-emerald-950/60 dark:text-brand-300">
            {order.status || 'Тастыкталды'}
          </span>
          <span className="text-xs text-gray-400">
            {formatDate(order.createdAt)}
          </span>
        </div>

        <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
          {order.items && order.items.length > 0
            ? order.items.map(i => i.book?.title).join(', ')
            : order.bookTitle || 'Окуу китептери'}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {order.city}, {order.address}
          </span>
          {order.customerPhone && (
            <span>• Тел: {order.customerPhone}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-darkBorder">
        <div className="text-left md:text-right">
          <div className="text-xs text-gray-400">Жалпы суммасы:</div>
          <div className="text-base font-black text-brand-600 dark:text-brand-400">
            {formatKGS(order.totalAmount)}
          </div>
          {order.depositAmount > 0 && (
            <div className="text-[11px] text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Залог: {formatKGS(order.depositAmount)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrderRow;
