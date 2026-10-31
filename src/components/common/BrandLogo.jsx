import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Lively, Natural 3D-styled Educational Mascot & Brand Mark for BilimKitep
 * An organic, open book bursting with knowledge, rising Kyrgyz solar Tündük,
 * dynamic fluttering pages, cascading bookmark ribbon, and warm magical sparkles.
 */
export const BrandLogoIcon = ({ size = 42, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-md ${className}`}
      aria-label="BilimKitep Mascot Logo"
    >
      <defs>
        {/* Rich dimensional Emerald Gradient for Cover */}
        <linearGradient id="bk_liveCoverGrad" x1="6" y1="20" x2="74" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="0.5" stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>

        {/* Warm Golden Sun Gradient */}
        <linearGradient id="bk_liveSunGrad" x1="24" y1="6" x2="56" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.35" stopColor="#FBBF24" />
          <stop offset="0.8" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>

        {/* Shading for Curved Pages */}
        <linearGradient id="bk_leftPageGrad" x1="8" y1="34" x2="40" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.85" stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>

        <linearGradient id="bk_rightPageGrad" x1="72" y1="34" x2="40" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.85" stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Silk Bookmark Ribbon Gradient */}
        <linearGradient id="bk_ribbonGrad" x1="36" y1="50" x2="46" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="0.7" stopColor="#E11D48" />
          <stop offset="1" stopColor="#BE123C" />
        </linearGradient>
      </defs>

      {/* Floating Ambient Glow Disk */}
      <circle cx="40" cy="40" r="36" fill="#10B981" fillOpacity="0.16" />

      {/* --- 1. RISING RADIANT KYRGYZ TUNDUK SUN --- */}
      {/* Dynamic Sun Rays */}
      <g stroke="url(#bk_liveSunGrad)" strokeWidth="2.2" strokeLinecap="round" opacity="0.95">
        <line x1="40" y1="5" x2="40" y2="10" />
        <line x1="28" y1="8" x2="31" y2="13" />
        <line x1="52" y1="8" x2="49" y2="13" />
        <line x1="18" y1="16" x2="23" y2="20" />
        <line x1="62" y1="16" x2="57" y2="20" />
      </g>

      {/* Solar Disk */}
      <circle cx="40" cy="22" r="13" fill="url(#bk_liveSunGrad)" stroke="#FFFBEB" strokeWidth="1.5" />

      {/* Internal Tyndyk Rim */}
      <circle cx="40" cy="22" r="9.5" stroke="#92400E" strokeWidth="1.2" strokeDasharray="3,2" opacity="0.8" />

      {/* Crossed Tyndyk curved bars */}
      <path d="M 31 20 Q 40 24 49 20" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 31 25 Q 40 29 49 25" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 36 14 Q 40 22 36 30" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 44 14 Q 40 22 44 30" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

      {/* Central Sun Spark */}
      <circle cx="40" cy="22" r="2.2" fill="#FFFBEB" />

      {/* --- 2. BACK HARDCOVER BASE (3D Dynamic Angle) --- */}
      {/* Left Cover Leaf */}
      <path
        d="M 40 59 C 29 55 16 55 6 60 L 6 46 C 16 41 29 41 40 45 Z"
        fill="#064E3B"
      />
      {/* Right Cover Leaf */}
      <path
        d="M 40 59 C 51 55 64 55 74 60 L 74 46 C 64 41 51 41 40 45 Z"
        fill="#047857"
      />

      {/* Golden Foil Edge on Cover */}
      <path
        d="M 6 60 C 16 55 29 55 40 59 C 51 55 64 55 74 60"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* --- 3. CURVED FLUTTERING PAGES (LIVELY 3D VOLUME) --- */}
      {/* Left Lower Page Stack */}
      <path
        d="M 40 56 C 30 52 18 52 8 57 L 8 43 C 18 38 30 38 40 42 Z"
        fill="#E2E8F0"
      />
      {/* Right Lower Page Stack */}
      <path
        d="M 40 56 C 50 52 62 52 72 57 L 72 43 C 62 38 50 38 40 42 Z"
        fill="#CBD5E1"
      />

      {/* Left Main Plump Page */}
      <path
        d="M 40 53 C 28 47 17 48 8 52 L 9 37 C 18 33 29 33 40 38 Z"
        fill="url(#bk_leftPageGrad)"
      />
      {/* Right Main Plump Page */}
      <path
        d="M 40 53 C 52 47 63 48 72 52 L 71 37 C 62 33 51 33 40 38 Z"
        fill="url(#bk_rightPageGrad)"
      />

      {/* Top Floating Page Edge (Fluttering with life) */}
      <path
        d="M 40 40 C 31 35 21 35 12 39"
        stroke="#94A3B8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 40 40 C 49 35 59 35 68 39"
        stroke="#94A3B8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Text Lines on Left Page (Knowledge lines) */}
      <line x1="16" y1="41" x2="32" y2="40" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="15" y1="45" x2="29" y2="44" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="18" y1="49" x2="26" y2="48" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Text Lines on Right Page (Knowledge lines) */}
      <line x1="48" y1="40" x2="64" y2="41" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="51" y1="44" x2="65" y2="45" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="54" y1="48" x2="62" y2="49" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Center Spine Crease */}
      <path
        d="M 40 38 L 40 57"
        stroke="#047857"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* --- 4. FLOWING SILK BOOKMARK RIBBON --- */}
      <path
        d="M 38 54 Q 40 64 45 68 L 48 64 L 51 69 Q 44 65 42 54 Z"
        fill="url(#bk_ribbonGrad)"
      />
      {/* Golden Tassel Edge */}
      <path
        d="M 45 68 L 48 64 L 51 69"
        stroke="#F59E0B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* --- 5. LIVELY MAGICAL SPARKLES --- */}
      <circle cx="10" cy="24" r="2" fill="#FBBF24" />
      <circle cx="70" cy="24" r="2" fill="#FBBF24" />
      <path d="M 68 11 L 70 14 L 68 17 L 66 14 Z" fill="#F59E0B" />
      <path d="M 12 13 L 14 16 L 12 19 L 10 16 Z" fill="#10B981" />
    </svg>
  );
};

/**
 * Full Brand Logo with Wordmark and Tagline
 */
export const BrandLogo = ({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = true,
  className = '',
  linkTo = '/',
}) => {
  const { t } = useTranslation('common');
  const sizeMap = {
    sm: { icon: 36, text: 'text-lg', badge: 'text-[9px] px-1 py-0.2', sub: 'text-[9px]' },
    md: { icon: 46, text: 'text-xl sm:text-2xl', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl sm:text-3xl', badge: 'text-[11px] px-2 py-0.5', sub: 'text-xs' },
    xl: { icon: 68, text: 'text-3xl sm:text-4xl', badge: 'text-xs px-2.5 py-0.5', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-3 shrink-0 group ${className}`}>
      {/* Lively Mascot Icon Mark */}
      <div className="relative">
        <BrandLogoIcon size={currentSize.icon} />
        {/* Dynamic aura pulse on hover */}
        <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity pointer-events-none" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-gray-900 dark:text-gray-100 ${currentSize.text}`}>
            Bilim<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Kitep</span>
          </span>
          <span className={`font-black rounded-md bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs tracking-wider ${currentSize.badge}`}>
            KG
          </span>
        </div>

        {showTagline && (
          <span className={`font-semibold text-gray-500 dark:text-gray-400 tracking-wider mt-1 hidden sm:flex items-center gap-1 ${currentSize.sub}`}>
            <span>Кыргызстан</span>
            <span className="text-amber-500">•</span>
            <span>{t('brandSubtitle', { defaultValue: 'Окуу китептер дүкөнү' })}</span>
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
