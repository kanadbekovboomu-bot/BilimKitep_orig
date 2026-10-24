import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Lock, Mail, BookOpen, ShieldCheck, UserCheck, Globe } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { setCredentials } from '../features/auth/authSlice';

export const LoginPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('errorRequired'));
      return;
    }

    const mockUser = {
      id: 'u_user1',
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'ADMIN' : 'USER',
      phone: '+996 700 123 456',
    };

    dispatch(setCredentials({ user: mockUser, token: 'mock_jwt_token_123' }));
    navigate(mockUser.role === 'ADMIN' ? '/admin' : from, { replace: true });
  };

  // Google OAuth Success Handler
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error('No credential received');
      }
      const decoded = jwtDecode(credentialResponse.credential);
      const googleUser = {
        id: `google_${decoded.sub || Date.now()}`,
        name: decoded.name || decoded.email?.split('@')[0] || 'Google User',
        email: decoded.email,
        avatar: decoded.picture || '',
        role: 'USER',
        phone: '+996 700 888 999',
        authProvider: 'GOOGLE',
        emailVerified: !!decoded.email_verified,
      };

      dispatch(setCredentials({ user: googleUser, token: credentialResponse.credential }));
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Google decode error:', err);
      setError(t('googleAuthFailed'));
    }
  };

  const handleGoogleError = () => {
    setError(t('googleAuthFailed'));
  };

  // Quick Demo Logins for Diploma Defense
  const handleQuickDemo = (role) => {
    if (role === 'ADMIN') {
      const adminUser = {
        id: 'u_admin_demo',
        name: 'Нурбек Садыков (Admin)',
        email: 'admin@bilimkitep.kg',
        role: 'ADMIN',
        phone: '+996 555 999 000',
      };
      dispatch(setCredentials({ user: adminUser, token: 'mock_jwt_admin_token' }));
      navigate('/admin', { replace: true });
    } else if (role === 'GOOGLE') {
      const googleDemoUser = {
        id: 'u_google_demo_101',
        name: 'Нурсултан Касымов',
        email: 'nursultan.kasymov@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: 'USER',
        phone: '+996 705 554 433',
        authProvider: 'GOOGLE',
        city: 'Бишкек',
      };
      dispatch(setCredentials({ user: googleDemoUser, token: 'mock_jwt_google_token' }));
      navigate('/profile', { replace: true });
    } else {
      const standardUser = {
        id: 'u_502',
        name: 'Айбек Нурланов',
        email: 'aibek@gmail.com',
        role: 'USER',
        phone: '+996 700 123 456',
        city: 'Бишкек',
      };
      dispatch(setCredentials({ user: standardUser, token: 'mock_jwt_user_token' }));
      navigate('/profile', { replace: true });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100">
              Bilim<span className="text-brand-500">Kitep</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {t('loginTitle')}
          </h2>
          <p className="text-xs text-gray-500">
            {t('loginSubtitle')}
          </p>
        </div>

        {/* Quick Demo Login Box */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-brand-200/60 dark:border-brand-800/40 space-y-2.5">
          <div className="text-[11px] font-bold text-brand-800 dark:text-brand-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{t('quickDemoLogin')}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('USER')}
              className="py-2 px-1.5 rounded-xl bg-white dark:bg-darkCard hover:bg-emerald-100/50 text-[11px] font-semibold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Колдонуучу</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-1.5 rounded-xl bg-white dark:bg-darkCard hover:bg-purple-100/50 text-[11px] font-semibold text-purple-700 dark:text-purple-300 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Админ КР</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('GOOGLE')}
              className="py-2 px-1.5 rounded-xl bg-white dark:bg-darkCard hover:bg-blue-100/50 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('demoGoogleUser')}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label={t('email')}
            type="email"
            placeholder="сиздин@почта.kg"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label={t('password')}
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button variant="primary" size="md" className="w-full" type="submit">
            {t('loginBtn')}
          </Button>
        </form>

        {/* Google OAuth Section */}
        <div className="space-y-3 pt-1">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-darkBorder" />
            </div>
            <span className="relative bg-white dark:bg-darkCard px-3 text-[11px] uppercase tracking-wider text-gray-400">
              {t('orWithGoogle')}
            </span>
          </div>

          <div className="flex justify-center w-full min-h-[44px]">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              shape="pill"
              text="continue_with"
              width="360"
            />
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-darkBorder">
          <span>{t('noAccount')} </span>
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
            {t('registerBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

