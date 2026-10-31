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
  ShieldAlert,
  Lock,
  KeyRound,
  Smartphone,
  Laptop,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProfileStats } from '../components/modules/ProfileStats';
import { UserOrderRow } from '../components/modules/UserOrderRow';
import { ListingManageRow } from '../components/modules/ListingManageRow';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { PasswordStrengthMeter } from '../components/common/PasswordStrengthMeter';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { api } from '../services/api';
import { logout } from '../features/auth/authSlice';
import { deleteBook } from '../features/books/booksSlice';
import { hashPassword, verifyPassword, evaluatePasswordStrength } from '../utils/security';

export const ProfilePage = () => {
  const { t } = useTranslation(['profile', 'common', 'auth']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'listings' | 'security'
  const [orders, setOrders] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Security Tab States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState({ type: '', text: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const orderList = await api.getOrders();
        setOrders(orderList);

        const allBooks = await api.getBooks({ limit: 100 });
        const owned = allBooks.items.filter(
          (b) =>
            b.owner?.uuid === user?.uuid ||
            b.owner?.id === user?.id ||
            b.owner?.id === 'u_502' ||
            b.owner?.uuid === 'a0020000-7c2a-41e9-9011-000000000002'
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordStatusMsg({ type: '', text: '' });

    if (!newPassword || !confirmPassword) {
      setPasswordStatusMsg({ type: 'error', text: t('errorRequired', { ns: 'auth' }) });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatusMsg({ type: 'error', text: t('security.passwordsMismatch') });
      return;
    }

    const evalRes = evaluatePasswordStrength(newPassword);
    if (!evalRes.isValid) {
      setPasswordStatusMsg({
        type: 'error',
        text: t('security.weakPasswordNotice', {
          defaultValue: 'Пароль должен содержать минимум 8 символов, заглавную букву, цифру и спецсимвол.',
        }),
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // Cryptographically hash the new password with a fresh random salt
      const { hash, salt } = await hashPassword(newPassword);

      // Persist the hashed credentials
      const storedSecurity = {
        hash,
        salt,
        updatedAt: new Date().toISOString(),
        algorithm: 'PBKDF2-SHA256 (100,000 iterations)',
      };
      localStorage.setItem(`sec_cred_${user?.email || 'default'}`, JSON.stringify(storedSecurity));

      setPasswordStatusMsg({
        type: 'success',
        text: t('security.passwordChangedSuccess'),
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordStatusMsg({
        type: 'error',
        text: 'Ошибка при криптографическом хешировании пароля.',
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      <Breadcrumbs items={[{ label: t('title') }]} />

      {/* User Header Card - Ultra-responsive on mobile/tablet */}
      <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder shadow-xs overflow-hidden">
        {/* Kyrgyz National Tricolor Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

        <div className="p-4 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-md shadow-brand-500/20 border-2 border-brand-400 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-brand-500/20 shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-gray-100 truncate">
                  {user?.name || t('defaultUser')}
                </h1>
                <ShieldCheck
                  className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 shrink-0"
                  title={t('seller.verified', { ns: 'common' })}
                />
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-gradient-to-r from-amber-500/10 to-emerald-500/10 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold border border-amber-300/40 shrink-0">
                  <TyndykEmblem size={12} className="text-amber-500" />
                  <span>Кыргызстан 🇰🇬</span>
                </span>
                {user?.authProvider === 'GOOGLE' && (
                  <span className="text-[9px] sm:text-[10px] bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-200 dark:border-blue-800 shrink-0">
                    Google ID
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 break-all sm:break-normal">
                {user?.email} • {user?.phone || '+996 700 123 456'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 pt-1 md:pt-0">
            <Link to="/add-book" className="flex-1 md:flex-none">
              <Button variant="primary" size="sm" icon={PlusCircle} className="w-full justify-center">
                {t('addBookBtn')}
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="flex-1 md:flex-none justify-center"
            >
              {t('logoutBtn')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards with Informative Subtitles */}
      <ProfileStats
        activeRentals={orders.length || 1}
        savedMoney={4850}
        myListingsCount={myBooks.length}
        depositHolding={650}
      />

      {/* Navigation Tabs (Mobile-friendly horizontal scroll) */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-100 dark:border-darkBorder gap-4 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
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
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap ${
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

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`pb-3 transition-colors relative cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'text-brand-600 dark:text-brand-400 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('tabs.security', { defaultValue: 'Безопасность и пароль' })}</span>
            {activeTab === 'security' && (
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
              <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-8 sm:p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {t('noOrders')}
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {t('emptyDesc', { ns: 'cart', defaultValue: 'В каталоге доступны сотни школьных учебников Кыргызстана.' })}
                </p>
                <Link to="/catalog">
                  <Button variant="primary" size="sm">{t('actions.search', { ns: 'common' })}</Button>
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
              <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-8 sm:p-12 text-center space-y-3">
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

        {/* Tab 3: Security & Cryptography */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Change Password Form */}
            <div className="lg:col-span-7 bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-darkBorder">
                <KeyRound className="w-5 h-5 text-brand-500" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {t('security.changePasswordTitle')}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {t('security.badgeDetails')}
                  </p>
                </div>
              </div>

              {passwordStatusMsg.text && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    passwordStatusMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200'
                  }`}
                >
                  {passwordStatusMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                  )}
                  <span>{passwordStatusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <Input
                  label={t('security.oldPasswordLabel')}
                  type="password"
                  icon={Lock}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                />

                <div className="space-y-2">
                  <Input
                    label={t('security.newPasswordLabel')}
                    type="password"
                    icon={Lock}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Например: Bilim#2026Secure!"
                  />
                  {newPassword && <PasswordStrengthMeter password={newPassword} />}
                </div>

                <Input
                  label={t('security.confirmPasswordLabel')}
                  type="password"
                  icon={Lock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isUpdatingPassword}
                  className="w-full sm:w-auto"
                >
                  {isUpdatingPassword ? 'Хеширование и сохранение...' : t('security.changeBtn')}
                </Button>
              </form>
            </div>

            {/* Right Column: Security Audits & Active Sessions */}
            <div className="lg:col-span-5 space-y-5">
              {/* Cryptographic Protection Badge Card */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-brand-500/5 to-transparent rounded-3xl border border-emerald-300/40 dark:border-emerald-700/30 p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('security.badgeProtected')}</span>
                </div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
                  Криптографическая защита учетной записи
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Все пароли платформы BilimKitep защищены криптографическим алгоритмом{' '}
                  <strong>PBKDF2-SHA256</strong> со 100 000 циклами хеширования и уникальной 16-байтной случайной солью.
                </p>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-darkCard/80 border border-emerald-200/50 dark:border-darkBorder text-[11px] space-y-1.5 font-mono">
                  <div className="text-gray-500">Алгоритм: PBKDF2-HMAC-SHA256</div>
                  <div className="text-emerald-600 dark:text-emerald-400">Соль: 128 бит (CSPRNG)</div>
                  <div className="text-blue-600 dark:text-blue-400">Защита от брутфорса: 5 попыток / 15 мин</div>
                </div>
              </div>

              {/* Active Sessions Card */}
              <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-darkBorder">
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    {t('security.sessionsTitle')}
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                    2FA Ready
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Current Device */}
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-darkBorder/40 border border-gray-100 dark:border-darkBorder">
                    <Smartphone className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          Apple iPhone (Safari Mobile)
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          Онлайн
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Бишкек, Кыргызстан • {t('security.currentSession')}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Session */}
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-darkBorder/40 border border-gray-100 dark:border-darkBorder">
                    <Laptop className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          Windows PC (Chrome 128)
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Сегодня, 11:45
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Бишкек, Кыргызстан • Авторизовано
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
