import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, Phone, BookOpen } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
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
      setError('Бардык талааларды толтуруңуз');
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

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-darkBorder">
          <span>{t('hasAccount')} </span>
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
            {t('loginBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
