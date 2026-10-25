import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Phone, Mail, MapPin, CreditCard, Clock, Truck } from 'lucide-react';
import { KochkorMuyuzPattern } from '../common/KyrgyzOrnament';
import { BrandLogo } from '../common/BrandLogo';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="w-full bg-white dark:bg-darkCard border-t border-gray-100 dark:border-darkBorder transition-colors mt-auto">
      {/* Kyrgyz National Color Ribbon */}
      <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

      {/* Subtle Kyrgyz Kochkor-Muyuz pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 opacity-30">
        <KochkorMuyuzPattern className="h-4 text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-100 dark:border-darkBorder">
          {/* Brand Info */}
          <div className="space-y-4">
            <BrandLogo size="md" showTagline={false} />
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <Shield className="w-4 h-4" />
              <span>{t('footer.guarantee')}</span>
            </div>
          </div>

          {/* Catalog Sections */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t('footer.links')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/catalog?grade=primary" className="hover:text-brand-500 transition-colors">
                  {t('footer.primary')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?grade=middle" className="hover:text-brand-500 transition-colors">
                  {t('footer.middle')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?grade=senior" className="hover:text-brand-500 transition-colors">
                  {t('footer.senior')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?dealType=RENT" className="hover:text-brand-500 transition-colors">
                  {t('footer.rentLiterature')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=ОРТ" className="hover:text-brand-500 transition-colors">
                  {t('footer.ortPrep')}
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/api-docs" className="inline-flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
                  <span>REST API Explorer (22+)</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px]">
                    v2.0
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t('footer.contacts')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>+996 (700) 123-456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>support@bilimkitep.kg</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2 text-[11px] text-gray-500">
                <Clock className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>{t('footer.workingHours', { defaultValue: '09:00 - 20:00 (Дем алышсыз)' })}</span>
              </li>
            </ul>
          </div>

          {/* Safe Shopping & Payment Methods */}
          <div className="space-y-3.5 bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-darkBorder/40 dark:to-emerald-950/20 p-4 rounded-2xl border border-gray-100 dark:border-darkBorder">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                {t('footer.safePaymentTitle', { defaultValue: 'Коопсуз төлөм жана жеткирүү' })}
              </h4>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('footer.safePaymentDesc', { defaultValue: 'Кыргызстандын бардык банктары жана капчыктары аркылуу коопсуз төлөм кабыл алынат.' })}
            </p>

            {/* Payment method chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-darkCard text-[10px] font-black text-blue-600 border border-gray-200 dark:border-darkBorder shadow-xs">
                MBANK
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-darkCard text-[10px] font-black text-emerald-600 border border-gray-200 dark:border-darkBorder shadow-xs">
                ЭЛСОМ
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-darkCard text-[10px] font-black text-rose-600 border border-gray-200 dark:border-darkBorder shadow-xs">
                О!Деньги
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-darkCard text-[10px] font-black text-amber-600 border border-gray-200 dark:border-darkBorder shadow-xs">
                ЭЛКАРТ
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-darkCard text-[10px] font-black text-indigo-600 border border-gray-200 dark:border-darkBorder shadow-xs">
                VISA
              </span>
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <Truck className="w-3.5 h-3.5" />
              <span>{t('footer.delivery24h', { defaultValue: '7 облус боюнча 24 саатта жеткирүү' })}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>{t('footer.madeWithLove', { defaultValue: 'Кыргызстанда сүйүү менен жасалган' })}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>• {t('footer.quote', { defaultValue: 'Билим — түгөнгүс кенч 🇰🇬' })}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
