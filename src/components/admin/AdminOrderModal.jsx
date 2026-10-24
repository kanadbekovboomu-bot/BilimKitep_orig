import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatKGS, formatDate } from '../../utils/formatters';
import { ShieldCheck, User, Phone, MapPin } from 'lucide-react';

export const AdminOrderModal = ({
  order,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(['admin', 'profile', 'common']);
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('orderModal.title', { id: order.id })} maxWidth="max-w-lg">
      <div className="space-y-4 text-xs">
        <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-darkBorder/40">
          <div>
            <span className="text-gray-400">{t('orderModal.status')}</span>
            <div className="font-bold text-brand-600 dark:text-brand-400">
              {order.status === 'CONFIRMED' || !order.status ? t('confirmed', { ns: 'profile' }) : order.status}
            </div>
          </div>
          <div className="text-right">
            <span className="text-gray-400">{t('orderModal.time')}</span>
            <div className="font-semibold text-gray-700 dark:text-gray-300">{formatDate(order.createdAt)}</div>
          </div>
        </div>

        <div className="space-y-2 p-3 rounded-xl border border-gray-100 dark:border-darkBorder">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 text-brand-500" />
            <span>{t('orderModal.customer')} <strong>{order.customerName}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Phone className="w-4 h-4 text-brand-500" />
            <span>{t('orderModal.phone')} <strong>{order.customerPhone}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>{t('orderModal.address')} <strong>{order.city}, {order.address}</strong></span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{t('orderModal.items')}</h4>
          <div className="divide-y divide-gray-100 dark:divide-darkBorder border border-gray-100 dark:border-darkBorder rounded-xl overflow-hidden">
            {order.items && order.items.length > 0 ? (
              order.items.map((it, idx) => (
                <div key={idx} className="p-2.5 flex justify-between items-center bg-white dark:bg-darkCard">
                  <div>
                    <div className="font-bold text-gray-800 dark:text-gray-200">{it.book?.title}</div>
                    <div className="text-[11px] text-gray-400">
                      {it.type === 'RENT'
                        ? t('orderModal.rentMonths', { months: it.months })
                        : t('orderModal.buy')}
                    </div>
                  </div>
                  <div className="font-bold text-brand-600">
                    {formatKGS(it.book?.price || 300)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-400">{order.bookTitle}</div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-darkBorder space-y-1 text-right">
          {order.depositAmount > 0 && (
            <div className="text-[11px] text-gray-400">
              {t('orderModal.deposit')} <span className="font-bold text-emerald-600">{formatKGS(order.depositAmount)}</span>
            </div>
          )}
          <div className="text-sm font-black text-gray-900 dark:text-gray-100">
            {t('orderModal.total')} <span className="text-brand-600 dark:text-brand-400">{formatKGS(order.totalAmount)}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
            {t('actions.close', { ns: 'common' })}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminOrderModal;
