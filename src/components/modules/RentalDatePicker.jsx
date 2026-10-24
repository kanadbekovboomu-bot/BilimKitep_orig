import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export const RentalDatePicker = ({
  months = 9,
  startDate = new Date().toISOString().split('T')[0],
  onStartDateChange,
  className = '',
}) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + Number(months));

  const formatLocalDate = (d) => {
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className={`p-4 rounded-xl bg-gray-50 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
        <CalendarIcon className="w-4 h-4 text-brand-500" />
        <span>Ижара мөөнөтү жана кайтаруу графиги</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <label className="text-[11px] text-gray-500 font-medium">Башталуу күнү:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange && onStartDateChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard px-3 py-2 text-xs text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-gray-500 font-medium">Кайтаруу мөөнөтү (Срок сдачи):</label>
          <div className="w-full rounded-xl border border-brand-200 dark:border-brand-800/40 bg-brand-50/50 dark:bg-emerald-950/40 px-3 py-2 text-xs font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatLocalDate(end)}</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-400">
        * Китепти {formatLocalDate(end)} күнүнө чейин тапшырып, залог суммасын 100% кайтарып аласыз.
      </p>
    </div>
  );
};

export default RentalDatePicker;
