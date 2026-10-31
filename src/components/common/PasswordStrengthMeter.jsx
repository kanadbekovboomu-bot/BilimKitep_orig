import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, CircleAlert, Shield, ShieldCheck } from 'lucide-react';
import { evaluatePasswordStrength } from '../../utils/security';

export const PasswordStrengthMeter = ({ password = '' }) => {
  const { t } = useTranslation('auth');
  const evaluation = evaluatePasswordStrength(password);

  if (!password) return null;

  const widthMap = {
    empty: 'w-0',
    weak: 'w-1/4 bg-red-500',
    medium: 'w-2/4 bg-amber-500',
    strong: 'w-3/4 bg-blue-500',
    veryStrong: 'w-full bg-emerald-500',
  };

  const textColorMap = {
    empty: 'text-gray-400',
    weak: 'text-red-500',
    medium: 'text-amber-500',
    strong: 'text-blue-500',
    veryStrong: 'text-emerald-500',
  };

  const statusLabels = {
    weak: t('passwordStrength.weak', { defaultValue: 'Слабый пароль' }),
    medium: t('passwordStrength.medium', { defaultValue: 'Средняя надежность' }),
    strong: t('passwordStrength.strong', { defaultValue: 'Надежный пароль' }),
    veryStrong: t('passwordStrength.veryStrong', { defaultValue: 'Отличный защищенный пароль' }),
  };

  return (
    <div className="space-y-2.5 p-3 rounded-2xl bg-gray-50/80 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder animate-fade-in text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-300">
          <Shield className="w-3.5 h-3.5 text-brand-500" />
          <span>{t('passwordStrength.title', { defaultValue: 'Надежность пароля:' })}</span>
        </div>
        <span className={`font-bold ${textColorMap[evaluation.status] || 'text-gray-500'}`}>
          {statusLabels[evaluation.status] || ''}
        </span>
      </div>

      {/* Strength Bar */}
      <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${widthMap[evaluation.status] || 'w-0'}`}
        />
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <div
          className={`flex items-center gap-1.5 transition-colors ${
            evaluation.checks.minLength
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-gray-400'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px]">
            {evaluation.checks.minLength ? '✓' : '○'}
          </span>
          <span>{t('passwordStrength.minLength', { defaultValue: '8+ символов' })}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            evaluation.checks.hasUpper
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-gray-400'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px]">
            {evaluation.checks.hasUpper ? '✓' : '○'}
          </span>
          <span>{t('passwordStrength.hasUpper', { defaultValue: 'Заглавная (A-Z)' })}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            evaluation.checks.hasNumber
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-gray-400'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px]">
            {evaluation.checks.hasNumber ? '✓' : '○'}
          </span>
          <span>{t('passwordStrength.hasNumber', { defaultValue: 'Цифра (0-9)' })}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            evaluation.checks.hasSpecial
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-gray-400'
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px]">
            {evaluation.checks.hasSpecial ? '✓' : '○'}
          </span>
          <span>{t('passwordStrength.hasSpecial', { defaultValue: 'Спецсимвол (!@#$)' })}</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
