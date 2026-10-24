import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { TyndykEmblem, KochkorMuyuzPattern } from '../common/KyrgyzOrnament';

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
            <Link to="/" className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <TyndykEmblem size={13} className="text-amber-500" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-gray-100">
                  Bilim<span className="text-brand-500">Kitep</span>
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-red-600 text-white">
                  KG
                </span>
              </div>
            </Link>
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
            </ul>
          </div>

          {/* Diploma Specs */}
          <div className="space-y-3 bg-gray-50 dark:bg-darkBorder/40 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t('footer.diploma')}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              «BilimKitep» Web Platform.
            </p>
            <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 pt-1">
              Stack: React 18, Vite, Tailwind CSS, Redux Toolkit, i18n, Neon Postgres, Cloudinary, Telegram.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Кыргызстанда сүйүү менен жасалган</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>• Билим — түгөнгүс кенч 🇰🇬</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
