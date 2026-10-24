import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CreditCard, QrCode, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import { formatKGS } from '../../utils/formatters';

export const PaymentDemoModal = ({
  isOpen,
  onClose,
  totalAmount = 0,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState('mbank');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'

  const handlePay = () => {
    setLoading(true);
    setStep('processing');

    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onPaymentSuccess({
          paymentMethod: method.toUpperCase(),
          transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
          paidAmount: totalAmount,
        });
        setStep('select');
      }, 1500);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Төлөм шлюзу (Demo Payment Gateway)" maxWidth="max-w-md">
      {step === 'processing' ? (
        <div className="py-12 text-center space-y-4">
          <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto" />
          <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
            Төлөм иштетилүүдө...
          </h4>
          <p className="text-xs text-gray-500">
            Банктык транзакция коопсуз өткөрүлүп жатат. Сураныч, күтө туруңуз.
          </p>
        </div>
      ) : step === 'success' ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Төлөм ийгиликтүү өттү!
          </h4>
          <p className="text-xs text-gray-500">
            Чек жана келишим маалыматы сакталды. Заказ таризделүүдө...
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-darkBorder/40 flex justify-between items-center">
            <span className="text-xs text-gray-500">Төлөнүүчү сумма:</span>
            <span className="text-xl font-black text-brand-600 dark:text-brand-400">
              {formatKGS(totalAmount)}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Төлөм системасын тандаңыз (Кыргызстан):
            </label>

            {/* MBank */}
            <button
              type="button"
              onClick={() => setMethod('mbank')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                method === 'mbank'
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-emerald-950/30 ring-2 ring-brand-500/20'
                  : 'border-gray-200 dark:border-darkBorder hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center text-xs">
                  M
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100">MBank QR / Номер аркылуу</div>
                  <div className="text-[11px] text-gray-400">Комиссия 0% • Ыкчам төлөм</div>
                </div>
              </div>
              <QrCode className="w-5 h-5 text-gray-400" />
            </button>

            {/* Elkart / Visa */}
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                method === 'card'
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-emerald-950/30 ring-2 ring-brand-500/20'
                  : 'border-gray-200 dark:border-darkBorder hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Элкарт / Visa / Mastercard</div>
                  <div className="text-[11px] text-gray-400">Бардык банктык карталар</div>
                </div>
              </div>
            </button>

            {/* O!Dengi / MegaPay */}
            <button
              type="button"
              onClick={() => setMethod('odengi')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                method === 'odengi'
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-emerald-950/30 ring-2 ring-brand-500/20'
                  : 'border-gray-200 dark:border-darkBorder hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100">О!Деньги / MegaPay</div>
                  <div className="text-[11px] text-gray-400">Электрондук капчыктар</div>
                </div>
              </div>
            </button>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              onClick={handlePay}
            >
              {formatKGS(totalAmount)} төлөө (Демо)
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PaymentDemoModal;
