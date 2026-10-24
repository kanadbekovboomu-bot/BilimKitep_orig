import React from 'react';
import { Trash2, Calendar, ShieldCheck } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';
import { calculateItemTotal } from '../../features/cart/cartSlice';

export const CartItem = ({
  item,
  onChangeDuration,
  onRemove,
}) => {
  const isRent = item.type === 'RENT';
  const itemTotal = calculateItemTotal(item);
  const deposit = isRent ? (Number(item.book.deposit) || 0) : 0;
  const rentFee = isRent ? ((Number(item.book.rentPricePerMonth) || 0) * (item.months || 3)) : 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder gap-4">
      {/* Book Info */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <div className="w-16 h-20 bg-gray-100 dark:bg-darkBorder rounded-xl overflow-hidden shrink-0">
          <img
            src={item.book.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
            alt={item.book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isRent
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
            }`}>
              {isRent ? 'Ижара (Аренда)' : 'Сатып алуу'}
            </span>
            <span className="text-xs text-gray-400">• {item.book.grade}-класс</span>
          </div>

          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">
            {item.book.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.book.author}
          </p>
        </div>
      </div>

      {/* Rental Duration Selector */}
      {isRent && (
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-darkBorder/40 p-2 rounded-xl">
          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs text-gray-500">Мөөнөт:</span>
          <select
            value={item.months || 9}
            onChange={(e) => onChangeDuration(item.id, Number(e.target.value))}
            className="text-xs font-bold rounded-lg border-none bg-white dark:bg-darkCard py-1 px-2 text-brand-600 dark:text-brand-400 focus:ring-1 focus:ring-brand-500 cursor-pointer shadow-xs"
          >
            <option value={3}>3 ай (чейрек)</option>
            <option value={5}>5 ай (жарым жыл)</option>
            <option value={9}>9 ай (учебный год)</option>
          </select>
        </div>
      )}

      {/* Cost & Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-darkBorder">
        <div className="text-right">
          <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
            {formatKGS(itemTotal)}
          </div>
          {isRent && (
            <div className="text-[11px] text-gray-400 flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>а.и. залог {formatKGS(deposit)}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          title="Себеттен өчүрүү"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
