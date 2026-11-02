import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, ExternalLink, CheckCircle2, Clock, BarChart3, Package, ShoppingBag } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';
import { DealBadge } from '../modules/DealBadge';

export const AdminBooksTable = ({
  books = [],
  onDeleteBook,
  onToggleStatus,
  onViewSales,
}) => {
  const { t } = useTranslation(['admin', 'common']);

  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder overflow-hidden shadow-xs">
      <div className="p-5 border-b border-gray-100 dark:border-darkBorder flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
          {t('tables.booksTitle')} ({books.length})
        </h3>
        <span className="text-xs text-gray-400">
          Kyrgyzstan Curriculum Base • Учёт остатков и продаж
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 dark:bg-darkBorder/40 text-gray-500 font-semibold border-b border-gray-100 dark:border-darkBorder">
            <tr>
              <th className="py-3 px-4">{t('tables.colBook')}</th>
              <th className="py-3 px-4">{t('tables.colSubject')}</th>
              <th className="py-3 px-4">{t('tables.colType')}</th>
              <th className="py-3 px-4">{t('tables.colPrice')}</th>
              <th className="py-3 px-4">Остаток</th>
              <th className="py-3 px-4">Продано</th>
              <th className="py-3 px-4">{t('tables.colStatus')}</th>
              <th className="py-3 px-4 text-right">{t('tables.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-darkBorder">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-darkBorder/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.images?.[0] || '/covers/geometry-8.svg'}
                      alt=""
                      className="w-8 h-10 object-contain rounded-lg shrink-0 bg-gray-50 dark:bg-darkBorder/40 p-0.5 border border-gray-100 dark:border-darkBorder"
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
                  <div className="text-[11px] text-gray-400">
                    {t('units.grade', { count: b.grade, ns: 'common' })} ({b.language})
                  </div>
                </td>
                <td className="py-3 px-4">
                  <DealBadge dealType={b.dealType} />
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-brand-600 dark:text-brand-400">
                    {b.dealType === 'RENT' || b.dealType === 'BOTH'
                      ? `${formatKGS(b.rentPricePerMonth)} ${t('units.perMonth', { ns: 'common' })}`
                      : formatKGS(b.price)}
                  </div>
                  {b.deposit > 0 && (
                    <div className="text-[10px] text-gray-400">
                      {t('units.deposit', { ns: 'common' })} {formatKGS(b.deposit)}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                    <Package className="w-3 h-3" />
                    <span>{b.quantity ?? 1} шт.</span>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                    <ShoppingBag className="w-3 h-3" />
                    <span>{b.soldCount ?? 0} шт.</span>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      (b.quantity ?? 1) > 0 && b.status === 'AVAILABLE'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {(b.quantity ?? 1) > 0 && b.status === 'AVAILABLE' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {(b.quantity ?? 1) > 0 && b.status === 'AVAILABLE'
                      ? t('status.available', { ns: 'common' })
                      : 'Нет в наличии'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {onViewSales && (
                      <button
                        type="button"
                        onClick={() => onViewSales(b)}
                        className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer transition-colors"
                        title="Продажи и складской учёт книги"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <a
                      href={`/books/${b.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-darkBorder transition-colors"
                      title={t('actions.viewDetails', { ns: 'common' })}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onDeleteBook(b.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
                      title={t('actions.delete', { ns: 'common' })}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
