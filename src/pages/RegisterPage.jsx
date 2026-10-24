import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, Phone, BookOpen } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { registerUser } from '../features/auth/authSlice';

export const RegisterPage = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [role, setRole] = useState('PARENT');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError(t('errorAllRequired'));
      return;
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: 'USER',
      userType: role,
    };

    dispatch(registerUser({ user: newUser, token: 'jwt_registered_token_456' }));
    navigate('/profile', { replace: true });
  };

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
        userType: role,
        emailVerified: !!decoded.email_verified,
      };

      dispatch(registerUser({ user: googleUser, token: credentialResponse.credential }));
      navigate('/profile', { replace: true });
    } catch (err) {
      console.error('Google decode error:', err);
      setError(t('googleAuthFailed'));
    }
  };

  const handleGoogleError = () => {
    setError(t('googleAuthFailed'));
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder shadow-xl space-y-6 overflow-hidden">
        {/* Kyrgyz National Tricolor Ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

        <div className="p-8 pt-2 space-y-6">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-1 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-darkCard rounded-full p-0.5 shadow-xs">
                  <TyndykEmblem size={14} className="text-amber-500" />
                </div>
              </div>
              <div className="text-left">
                <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100 tracking-tight block leading-tight">
                  Bilim<span className="text-brand-500">Kitep</span>
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                  Кыргызстан • Дүкөн
                </span>
              </div>
            </Link>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t('registerTitle')}
            </h2>
            <p className="text-xs text-gray-500">
              {t('registerSubtitle')}
            </p>
          </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label={t('name')}
            placeholder="Айгүл Касымова"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label={t('email')}
            type="email"
            placeholder="сиздин@почта.kg"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label={t('phone')}
            placeholder="+996 (700) 123-456"
            icon={Phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Select
            label={t('role')}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'PARENT', label: t('roleParent') },
              { value: 'STUDENT', label: t('roleStudent') },
              { value: 'TEACHER', label: t('roleTeacher') },
            ]}
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
            {t('registerBtn')}
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
              text="signup_with"
              width="360"
            />
          </div>
        </div>

          <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-darkBorder">
            <span>{t('hasAccount')} </span>
            <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
              {t('loginBtn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RegisterPage;
