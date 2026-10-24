import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  Package,
  BookOpen,
  PlusCircle,
  LogOut,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProfileStats } from '../components/modules/ProfileStats';
import { UserOrderRow } from '../components/modules/UserOrderRow';
import { ListingManageRow } from '../components/modules/ListingManageRow';
import { Button } from '../components/common/Button';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { api } from '../services/api';
import { logout } from '../features/auth/authSlice';
import { deleteBook } from '../features/books/booksSlice';

export const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'listings' | 'settings'
  const [orders, setOrders] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const orderList = await api.getOrders();
        setOrders(orderList);

        const allBooks = await api.getBooks({ limit: 100 });
        // Filter books owned by current user or mock owner
        const owned = allBooks.items.filter(
          (b) => b.owner?.id === user?.id || b.owner?.id === 'u_502'
        );
        setMyBooks(owned);
      } catch (err) {
        console.error('Failed to load profile data', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, [user]);

  const handleDeleteListing = async (bookId) => {
    if (window.confirm(t('deleteListingConfirm'))) {
      await dispatch(deleteBook(bookId));
      setMyBooks((prev) => prev.filter((b) => b.id !== bookId));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: t('title') }]} />

      {/* User Header */}
      <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder shadow-xs overflow-hidden">
        {/* Kyrgyz National Tricolor Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-16 h-16 rounded-2xl object-cover shadow-md shadow-brand-500/20 border-2 border-brand-400"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-brand-500/20">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                  {user?.name || t('defaultUser')}
                </h1>
                <ShieldCheck className="w-5 h-5 text-brand-500" title={t('seller.verified', { ns: 'common' })} />
                <span className="inline-flex items-center gap-1 text-[11px] bg-gradient-to-r from-amber-500/10 to-emerald-500/10 text-amber-900 dark:text-amber-200 px-2.5 py-0.5 rounded-full font-bold border border-amber-300/40">
                  <TyndykEmblem size={13} className="text-amber-500" />
                  <span>Кыргызстан 🇰🇬</span>
                </span>
                {user?.authProvider === 'GOOGLE' && (
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-200 dark:border-blue-800">
                    Google ID
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {user?.email} • {user?.phone || '+996 700 123 456'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/add-book" className="flex-1 sm:flex-none">
              <Button variant="primary" size="sm" icon={PlusCircle} className="w-full">
                {t('addBookBtn')}
              </Button>
            </Link>

            <Button variant="outline" size="sm" icon={LogOut} onClick={handleLogout}>
              {t('logoutBtn')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <ProfileStats
        activeRentals={orders.length || 2}
        savedMoney={4850}
        myListingsCount={myBooks.length}
        depositHolding={650}
      />

      {/* Navigation Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-100 dark:border-darkBorder gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'orders'
                ? 'text-brand-600 dark:text-brand-400 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {t('tabs.orders')} ({orders.length})
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-500 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'listings'
                ? 'text-brand-600 dark:text-brand-400 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {t('tabs.listings')} ({myBooks.length})
            {activeTab === 'listings' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <UserOrderRow key={order.id} order={order} />
              ))
            ) : (
              <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {t('noOrders')}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {t('emptyDesc', { ns: 'cart' })}
                </p>
                <Link to="/catalog">
                  <Button variant="primary" size="sm">{t('goToCatalog', { ns: 'cart' })}</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {myBooks.length > 0 ? (
              myBooks.map((book) => (
                <ListingManageRow
                  key={book.id}
                  book={book}
                  onDelete={handleDeleteListing}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-12 text-center space-y-3">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {t('noListings')}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {t('addBookSubtitle')}
                </p>
                <Link to="/add-book">
                  <Button variant="primary" size="sm" icon={PlusCircle}>
                    {t('addBookBtn')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
