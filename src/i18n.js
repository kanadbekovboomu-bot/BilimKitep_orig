import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// RU
import commonRU from './locales/ru/common.json';
import homeRU from './locales/ru/home.json';
import catalogRU from './locales/ru/catalog.json';
import bookRU from './locales/ru/book.json';
import cartRU from './locales/ru/cart.json';
import checkoutRU from './locales/ru/checkout.json';
import authRU from './locales/ru/auth.json';
import profileRU from './locales/ru/profile.json';
import adminRU from './locales/ru/admin.json';

// KG
import commonKG from './locales/kg/common.json';
import homeKG from './locales/kg/home.json';
import catalogKG from './locales/kg/catalog.json';
import bookKG from './locales/kg/book.json';
import cartKG from './locales/kg/cart.json';
import checkoutKG from './locales/kg/checkout.json';
import authKG from './locales/kg/auth.json';
import profileKG from './locales/kg/profile.json';
import adminKG from './locales/kg/admin.json';

// EN
import commonEN from './locales/en/common.json';
import homeEN from './locales/en/home.json';
import catalogEN from './locales/en/catalog.json';
import bookEN from './locales/en/book.json';
import cartEN from './locales/en/cart.json';
import checkoutEN from './locales/en/checkout.json';
import authEN from './locales/en/auth.json';
import profileEN from './locales/en/profile.json';
import adminEN from './locales/en/admin.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    defaultNS: 'common',
    ns: ['common', 'home', 'catalog', 'book', 'cart', 'checkout', 'auth', 'profile', 'admin'],
    resources: {
      ru: { common: commonRU, home: homeRU, catalog: catalogRU, book: bookRU, cart: cartRU, checkout: checkoutRU, auth: authRU, profile: profileRU, admin: adminRU },
      kg: { common: commonKG, home: homeKG, catalog: catalogKG, book: bookKG, cart: cartKG, checkout: checkoutKG, auth: authKG, profile: profileKG, admin: adminKG },
      en: { common: commonEN, home: homeEN, catalog: catalogEN, book: bookEN, cart: cartEN, checkout: checkoutEN, auth: authEN, profile: profileEN, admin: adminEN },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
