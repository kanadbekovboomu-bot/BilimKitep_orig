import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastNotification } from './ToastNotification';
import { clearLastAdded } from '../../features/cart/cartSlice';

/**
 * GlobalCartToast
 * Listens for cart additions across the entire application
 * and displays an immediate, beautiful confirmation toast message.
 */
export const GlobalCartToast = () => {
  const lastAdded = useSelector((state) => state.cart.lastAdded);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'cart']);

  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    if (lastAdded && lastAdded.book) {
      setToastData(lastAdded);
    }
  }, [lastAdded]);

  if (!toastData || !toastData.book) return null;

  const isBuy = toastData.type === 'BUY';
  const bookTitle = toastData.book.title;
  const dealText = isBuy
    ? t('dealType.buy', { ns: 'common', defaultValue: 'Покупка' })
    : `${t('dealType.rent', { ns: 'common', defaultValue: 'Аренда' })} (${toastData.months || 9} мес.)`;

  const handleClose = () => {
    setToastData(null);
    dispatch(clearLastAdded());
  };

  const handleGoToCart = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <ToastNotification
      isOpen={Boolean(toastData)}
      onClose={handleClose}
      type="success"
      title={t('toast.itemAddedTitle', { ns: 'common', defaultValue: 'Товар добавлен в корзину!' })}
      message={`«${bookTitle}» • ${dealText}`}
      actionLabel={t('actions.goToCart', { ns: 'common', defaultValue: 'В корзину 🛒' })}
      onAction={handleGoToCart}
      duration={4500}
    />
  );
};

export default GlobalCartToast;
