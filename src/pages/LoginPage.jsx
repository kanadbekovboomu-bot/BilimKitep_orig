import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Lock, Mail, BookOpen, ShieldCheck, UserCheck } from 'lucide-react';
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
      setError('Электрондук почтаны жана сыр сөздү толтуруңуз');
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
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('USER')}
              className="py-2 px-2 rounded-xl bg-white dark:bg-darkCard hover:bg-emerald-100/50 text-xs font-semibold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Колдонуучу</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-2 rounded-xl bg-white dark:bg-darkCard hover:bg-purple-100/50 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-gray-200 dark:border-darkBorder transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Админ КР</span>
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
