import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="w-full bg-white dark:bg-darkCard border-t border-gray-100 dark:border-darkBorder pt-14 pb-8 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-100 dark:border-darkBorder">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-gray-100">
                Bilim<span className="text-brand-500">Kitep</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <Shield className="w-4 h-4" />
              <span>100% кепилденген залог системасы</span>
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
                  Башталгыч класстар (1-4 класс)
                </Link>
              </li>
              <li>
                <Link to="/catalog?grade=middle" className="hover:text-brand-500 transition-colors">
                  Орто мектеп (5-9 класс)
                </Link>
              </li>
              <li>
                <Link to="/catalog?grade=senior" className="hover:text-brand-500 transition-colors">
                  Жогорку класстар (10-11 класс)
                </Link>
              </li>
              <li>
                <Link to="/catalog?dealType=RENT" className="hover:text-brand-500 transition-colors">
                  Учебники в аренду (3, 5, 9 месяцев)
                </Link>
              </li>
              <li>
                <Link to="/catalog?search=ОРТ" className="hover:text-brand-500 transition-colors">
                  ЖРТ / ОРТ колдонмолору
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
                <span>Бишкек шаары, Чүй проспектиси 205 (Билим Hub)</span>
              </li>
            </ul>
          </div>

          {/* Diploma Specs */}
          <div className="space-y-3 bg-gray-50 dark:bg-darkBorder/40 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Дипломдук долбоор 2026
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Тема: «Разработка веб-платформы шеринга, аренды и покупки учебников BilimKitep».
            </p>
            <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 pt-1">
              Стек: React 18, Vite, Tailwind CSS, Redux Toolkit, i18n, Recharts, Cloudinary & Telegram Bot.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for education in Kyrgyzstan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
