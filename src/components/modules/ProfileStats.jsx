import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, PiggyBank, PlusCircle, ShieldCheck } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';

export const ProfileStats = ({
  activeRentals = 2,
  savedMoney = 4850,
  myListingsCount = 3,
  depositHolding = 650,
}) => {
  const { t } = useTranslation(['profile', 'common']);
  const currency = t('currency', { ns: 'common', defaultValue: 'сом' });

  const cards = [
    {
      label: t('stats.activeRentals'),
      value: `${activeRentals}`,
      sub: t('statsSub.activeRentals', { defaultValue: 'Текущие договоры на руках' }),
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: t('stats.savedMoney'),
      value: formatKGS(savedMoney, currency),
      sub: t('statsSub.savedMoney', { defaultValue: 'По сравнению с покупкой новых книг' }),
      icon: PiggyBank,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: t('stats.myListings'),
      value: `${myListingsCount}`,
      sub: t('statsSub.myListings', { defaultValue: 'Активно в каталоге платформы' }),
      icon: PlusCircle,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      label: t('stats.depositHolding'),
      value: formatKGS(depositHolding, currency),
      sub: t('statsSub.depositHolding', { defaultValue: 'Возвратный депозит на хранении' }),
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
              {card.value}
            </div>

            <p className="text-[11px] text-gray-400">
              {card.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileStats;
