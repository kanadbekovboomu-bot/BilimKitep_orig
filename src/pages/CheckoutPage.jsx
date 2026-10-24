import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  MapPin,
  CreditCard,
  Send,
  ArrowRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Input } from '../components/common/Input';
import { CitySelector } from '../components/common/CitySelector';
import { Button } from '../components/common/Button';
import { OrderSummary } from '../components/modules/OrderSummary';
import { RentalDatePicker } from '../components/modules/RentalDatePicker';
import { PaymentDemoModal } from '../components/modules/PaymentDemoModal';
import { CourierDeliveryMap } from '../components/modules/CourierDeliveryMap';
import { api } from '../services/api';
import { notifyTelegramOrder } from '../services/telegram';
import { clearCart } from '../features/cart/cartSlice';
import { isValidPhoneKG } from '../utils/validators';

export const CheckoutPage = () => {
  const { t } = useTranslation('checkout');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalAmount, depositAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+996 ');
  const [city, setCity] = useState('Бишкек');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'courier'
  const [paymentMethod, setPaymentMethod] = useState('MBANK');
  const [rentalStartDate, setRentalStartDate] = useState(new Date().toISOString().split('T')[0]);

  // UI State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [createdOrder, setCreatedOrder] = useState(null);
  const [showDeliveryMap, setShowDeliveryMap] = useState(true);

  const shippingCost = deliveryMethod === 'courier' ? 150 : 0;
  const finalTotal = totalAmount + shippingCost;

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = t('errors.fullName');
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      errs.phone = t('errors.phone');
    }
    if (deliveryMethod === 'courier' && !address.trim()) {
      errs.address = t('errors.address');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStartCheckout = () => {
    if (!validate()) return;
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setIsPaymentModalOpen(false);
    setSubmitting(true);

    try {
      const orderPayload = {
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        city,
        address: address.trim() || t('pickup'),
        deliveryMethod: deliveryMethod === 'courier' ? t('courier') : t('pickup'),
        paymentMethod: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId,
        items,
        totalAmount: finalTotal,
        depositAmount,
        rentalStartDate,
        status: 'CONFIRMED',
      };

      // 1. Save to database / localStorage API
      const newOrder = await api.createOrder(orderPayload);

      // 2. Dispatch alert to Telegram Bot API
      await notifyTelegramOrder({
        ...newOrder,
        bookTitle: items.map(i => `${i.book?.title} (${i.type === 'RENT' ? `${i.months} ай` : 'Сатуу'})`).join(', ')
      });

      // 3. Clear cart
      dispatch(clearCart());
      setCreatedOrder(newOrder);
    } catch (err) {
      alert('Ошибка при оформлении заказа: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (createdOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">
          {t('successTitle')}
        </h1>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('successDesc', { id: createdOrder.id })}
        </p>

        {/* Live Courier Tracking Map right on the order success screen */}
        <div className="text-left pt-2">
          <CourierDeliveryMap
            city={createdOrder.city || city}
            currentAddress={createdOrder.address || address}
            orderId={createdOrder.id}
            isLiveTracking={true}
          />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkCard border border-gray-100 dark:border-darkBorder text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">{t('orderNumber')}</span>
            <span className="font-mono font-bold text-gray-900 dark:text-gray-100">#{createdOrder.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t('totalAmount')}</span>
            <span className="font-bold text-brand-600">{formatKGS(createdOrder.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t('telegramSent')}</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <Send className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Button variant="primary" size="md" onClick={() => navigate('/profile')}>
            {t('viewOrder')}
          </Button>
          <Button variant="outline" size="md" onClick={() => navigate('/')}>
            {t('backHome')}
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: t('title', { ns: 'cart' }), to: '/cart' }, { label: t('title') }]} />

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form fields */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recipient Details */}
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-darkBorder">
              {t('contactInfo')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('fullName')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Мис. Айбек Нурланов"
                error={errors.fullName}
              />

              <Input
                label={t('phone')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+996 (700) 123-456"
                error={errors.phone}
              />
            </div>

            <div className="space-y-4">
              <CitySelector
                label={t('city')}
                value={city}
                onChange={(newCity) => setCity(newCity)}
                onCitySelected={(cityObj) => {
                  setCity(cityObj.value);
                }}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-200">
                    {t('address')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDeliveryMap(!showDeliveryMap)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{showDeliveryMap ? 'Картаны жашыруу' : 'Картаны ачуу'}</span>
                  </button>
                </div>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Көчө, үй/батир номери (же төмөндөгү картадан белгилеңиз)"
                  error={errors.address}
                />
              </div>

              {/* Interactive Courier Map for Address & Live Delivery Tracking */}
              {showDeliveryMap && (
                <div className="pt-2">
                  <CourierDeliveryMap
                    city={city}
                    currentAddress={address}
                    onAddressSelect={(geo) => {
                      if (geo.estimatedText) {
                        setAddress(geo.estimatedText);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-6 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-darkBorder">
              {t('deliveryMethod')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  deliveryMethod === 'pickup'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-emerald-950/40 ring-2 ring-brand-500/20'
                    : 'border-gray-200 dark:border-darkBorder hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-gray-900 dark:text-gray-100">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>{t('pickup')}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  {t('pickupPoint')}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('courier')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  deliveryMethod === 'courier'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-emerald-950/40 ring-2 ring-brand-500/20'
                    : 'border-gray-200 dark:border-darkBorder hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-gray-900 dark:text-gray-100">
                  <Truck className="w-4 h-4 text-brand-500" />
                  <span>{t('courier')}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  {t('courierDesc')}
                </p>
              </button>
            </div>
          </div>

          {/* Rental Duration Schedule */}
          <RentalDatePicker
            months={items.find(i => i.type === 'RENT')?.months || 9}
            startDate={rentalStartDate}
            onStartDateChange={(d) => setRentalStartDate(d)}
          />
        </div>

        {/* Order Summary & Checkout Trigger */}
        <div className="lg:col-span-4 sticky top-24">
          <OrderSummary
            items={items}
            totalAmount={totalAmount}
            depositAmount={depositAmount}
            shippingCost={shippingCost}
            isCheckoutPage
            onCheckout={handleStartCheckout}
            buttonText={t('confirmOrder')}
          />
        </div>
      </div>

      {/* Payment Demo Modal */}
      <PaymentDemoModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={finalTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
