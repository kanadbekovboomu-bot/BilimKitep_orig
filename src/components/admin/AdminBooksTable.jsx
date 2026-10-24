import React from 'react';
import { Trash2, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';
import { DealBadge } from '../modules/DealBadge';

export const AdminBooksTable = ({
  books = [],
  onDeleteBook,
  onToggleStatus,
}) => {
  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder overflow-hidden shadow-xs">
      <div className="p-5 border-b border-gray-100 dark:border-darkBorder flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
          Учебники в системе ({books.length})
        </h3>
        <span className="text-xs text-gray-400">
          Кыргызстандын окуу программасы
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 dark:bg-darkBorder/40 text-gray-500 font-semibold border-b border-gray-100 dark:border-darkBorder">
            <tr>
              <th className="py-3 px-4">Китеп / Автор</th>
              <th className="py-3 px-4">Предмет & Класс</th>
              <th className="py-3 px-4">Түрү</th>
              <th className="py-3 px-4">Баасы / Ижара</th>
              <th className="py-3 px-4">Статус</th>
              <th className="py-3 px-4 text-right">Аракеттер</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-darkBorder">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-darkBorder/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'}
                      alt=""
                      className="w-8 h-10 object-cover rounded-lg shrink-0"
                    />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                        {b.title}
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">{b.author}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  <div>{b.subject}</div>
                  <div className="text-[11px] text-gray-400">{b.grade}-класс ({b.language})</div>
                </td>
                <td className="py-3 px-4">
                  <DealBadge dealType={b.dealType} />
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-brand-600 dark:text-brand-400">
                    {b.rentPricePerMonth ? `${formatKGS(b.rentPricePerMonth)}/ай` : formatKGS(b.price)}
                  </div>
                  {b.deposit && (
                    <div className="text-[10px] text-gray-400">залог: {formatKGS(b.deposit)}</div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    type="button"
                    onClick={() => onToggleStatus && onToggleStatus(b.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                      b.status === 'AVAILABLE'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {b.status === 'AVAILABLE' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Бар</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Ижарада</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <a
                      href={`/books/${b.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-gray-400 hover:text-brand-500 rounded-lg hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {onDeleteBook && (
                      <button
                        type="button"
                        onClick={() => onDeleteBook(b.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooksTable;
