import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Lock, Mail, ShieldCheck, UserCheck, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { BrandLogo, BrandLogoIcon } from '../components/common/BrandLogo';
import { setCredentials } from '../features/auth/authSlice';
import { generateUuid } from '../utils/uuid';

export const LoginPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEntering, setIsEntering] = useState(false);
  const [enteringUser, setEnteringUser] = useState(null);

  const triggerLoginEffect = (userObj, token, redirectPath) => {
    setEnteringUser(userObj);
    setIsEntering(true);
    setTimeout(() => {
      dispatch(setCredentials({ user: userObj, token }));
      navigate(redirectPath, { replace: true });
    }, 850);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('errorRequired'));
      return;
    }

    const uuid = generateUuid();
    const mockUser = {
      uuid,
      id: uuid,
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'ADMIN' : 'USER',
      phone: '+996 700 123 456',
    };

    triggerLoginEffect(mockUser, 'mock_jwt_token_123', mockUser.role === 'ADMIN' ? '/admin' : from);
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

      triggerLoginEffect(googleUser, credentialResponse.credential, from);
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
        uuid: 'a0010000-7c2a-41e9-9011-000000000001',
        id: 'a0010000-7c2a-41e9-9011-000000000001',
        name: 'Нурбек Садыков (Admin)',
        email: 'admin@bilimkitep.kg',
        role: 'ADMIN',
        phone: '+996 555 999 000',
      };
      triggerLoginEffect(adminUser, 'mock_jwt_admin_token', '/admin');
    } else if (role === 'GOOGLE') {
      const googleDemoUser = {
        uuid: 'a0030000-7c2a-41e9-9011-000000000003',
        id: 'a0030000-7c2a-41e9-9011-000000000003',
        name: 'Нурсултан Касымов',
        email: 'nursultan.kasymov@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: 'USER',
        phone: '+996 705 554 433',
        authProvider: 'GOOGLE',
        city: 'Бишкек',
      };
      triggerLoginEffect(googleDemoUser, 'mock_jwt_google_token', '/profile');
    } else {
      const standardUser = {
        uuid: 'a0020000-7c2a-41e9-9011-000000000002',
        id: 'a0020000-7c2a-41e9-9011-000000000002',
        name: 'Айбек Нурланов',
        email: 'aibek@gmail.com',
        role: 'USER',
        phone: '+996 700 123 456',
        city: 'Бишкек',
      };
      triggerLoginEffect(standardUser, 'mock_jwt_user_token', '/profile');
    }
  };

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Ambient Glowing Orbs for Entry Atmospheric Effect */}
      <div className="absolute top-1/4 -left-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

      {/* Celebratory Login Entrance Overlay Effect */}
      {isEntering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-entrance">
          <div className="relative w-full max-w-sm p-8 bg-white dark:bg-darkCard rounded-3xl border border-brand-300 dark:border-brand-700 text-center space-y-5 shadow-2xl animate-scale-in">
            {/* National Tricolor Top Ribbon */}
            <div className="h-1.5 w-full -mt-8 -mx-8 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 rounded-t-3xl" style={{ width: 'calc(100% + 4rem)' }} />

            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-xl animate-ping" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 p-0.5 shadow-xl">
                <div className="w-full h-full bg-white dark:bg-darkCard rounded-2xl flex items-center justify-center">
                  <BrandLogoIcon size={38} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t('loginSuccess', { defaultValue: 'Ийгиликтүү кирүү!' })}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                {t('welcomeUser', { name: enteringUser?.name, defaultValue: `Кош келиңиз, ${enteringUser?.name}!` })}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {enteringUser?.role === 'ADMIN'
                  ? t('redirectAdmin', { defaultValue: 'КР Администратор панелине өтүүдө...' })
                  : t('redirectHome', { defaultValue: 'БилимКитеп платформасына өтүүдө...' })}
              </p>
            </div>

            {/* Progress line */}
            <div className="w-full bg-gray-100 dark:bg-darkBorder h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 w-full animate-pulse rounded-full" />
            </div>

            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold italic">
              «Билим — түгөнгүс кенч» 🇰🇬
            </p>
          </div>
        </div>
      )}

      {/* Main Login Card with smooth entrance effect */}
      <div className="relative z-10 w-full max-w-md bg-white/95 dark:bg-darkCard/95 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-darkBorder shadow-2xl space-y-6 overflow-hidden animate-scale-in">
        {/* Kyrgyz National Tricolor Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

        <div className="p-8 pt-2 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <BrandLogo size="lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {t('loginTitle')}
              </h2>
              <p className="text-xs text-gray-500">
                {t('loginSubtitle')}
              </p>
            </div>
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
              <span>{t('demoUserShort', { defaultValue: 'Колдонуучу' })}</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-1.5 rounded-xl bg-white dark:bg-darkCard hover:bg-purple-100/50 text-[11px] font-semibold text-purple-700 dark:text-purple-300 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>{t('demoAdminShort', { defaultValue: 'Админ КР' })}</span>
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
    </div>
  );
};

export default LoginPage;

