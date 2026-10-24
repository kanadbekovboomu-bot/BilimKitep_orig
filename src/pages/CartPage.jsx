import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CartItem } from '../components/modules/CartItem';
import { OrderSummary } from '../components/modules/OrderSummary';
import { Button } from '../components/common/Button';
import {
  removeFromCart,
  changeRentDuration,
  clearCart,
} from '../features/cart/cartSlice';

export const CartPage = () => {
  const { t } = useTranslation('cart');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, depositAmount } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleChangeDuration = (id, months) => {
    dispatch(changeRentDuration({ id, months }));
  };

  const handleClear = () => {
    if (window.confirm('Себетти толугу менен тазалоону каалайсызбы?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-5 bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder p-10 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('emptyTitle')}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t('emptyDesc')}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/catalog')}
            className="w-full"
          >
            {t('goToCatalog')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: t('title') }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
          {t('title')} ({items.length})
        </h1>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t('clearCart')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onChangeDuration={handleChangeDuration}
              onRemove={handleRemove}
            />
          ))}

          <div className="pt-2">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Каталогго кайтып, дагы китеп тандоо</span>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <OrderSummary
            items={items}
            totalAmount={totalAmount}
            depositAmount={depositAmount}
            onCheckout={() => navigate('/checkout')}
            buttonText={t('proceedToCheckout')}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
