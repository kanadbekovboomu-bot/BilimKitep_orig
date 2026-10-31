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
import { BrandLogo } from '../components/common/BrandLogo';
import { registerUser } from '../features/auth/authSlice';
import { generateUuid } from '../utils/uuid';
import { hashPassword, evaluatePasswordStrength, sanitizeText } from '../utils/security';
import { PasswordStrengthMeter } from '../components/common/PasswordStrengthMeter';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError(t('errorAllRequired'));
      return;
    }

    const strength = evaluatePasswordStrength(password);
    if (!strength.isValid) {
      setError(
        t('errorPasswordWeak', {
          defaultValue: 'Пароль слишком простой. Требуется минимум 8 символов, заглавная буква, цифра и спецсимвол.',
        })
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // PBKDF2-SHA256 Salted Hash
      const { hash, salt } = await hashPassword(password);
      const uuid = generateUuid();
      const sanitizedName = sanitizeText(name.trim());
      const sanitizedEmail = sanitizeText(email.trim().toLowerCase());

      const newUser = {
        uuid,
        id: uuid,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: phone.trim(),
        role: 'USER',
        userType: role,
        passwordHash: hash,
        passwordSalt: salt,
      };

      // Store credentials locally for login verification
      localStorage.setItem(`sec_cred_${sanitizedEmail}`, JSON.stringify({ hash, salt }));

      dispatch(registerUser({ user: newUser, token: `jwt_sec_${Date.now()}_${uuid}` }));
      navigate('/profile', { replace: true });
    } catch {
      setError('Ошибка при криптографической обработке пароля.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

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
                {t('registerTitle')}
              </h2>
              <p className="text-xs text-gray-500">
                {t('registerSubtitle')}
              </p>
            </div>
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

          <div className="space-y-2">
            <Input
              label={t('password')}
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && <PasswordStrengthMeter password={password} />}
          </div>

          {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

          <Button
            variant="primary"
            size="md"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Регистрация...' : t('registerBtn')}
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
