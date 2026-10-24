import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Premium Vector Brand Mark for BilimKitep
 * Combines an open book of wisdom, Kyrgyz Tündük solar wheel, and Ala-Too mountain rays.
 */
export const BrandLogoIcon = ({ size = 40, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="BilimKitep Logo"
    >
      <defs>
        {/* Emerald knowledge gradient */}
        <linearGradient id="emeraldGrad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="0.5" stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>

        {/* Golden Tündük Sun gradient */}
        <linearGradient id="goldSunGrad" x1="16" y1="8" x2="48" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>

        {/* Soft shadow for depth */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#059669" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded squircle emblem container */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#emeraldGrad)"
        filter="url(#logoGlow)"
      />

      {/* Outer subtle decorative border */}
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="15"
        stroke="#FFFFFF"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />

      {/* Rising Sun Rays behind Tündük */}
      <g stroke="url(#goldSunGrad)" strokeWidth="1.75" strokeLinecap="round" opacity="0.9">
        <line x1="32" y1="9" x2="32" y2="13" />
        <line x1="22" y1="13" x2="25" y2="16" />
        <line x1="42" y1="13" x2="39" y2="16" />
        <line x1="15" y1="21" x2="19" y2="23" />
        <line x1="49" y1="21" x2="45" y2="23" />
      </g>

      {/* Sacred Kyrgyz Tündük (Түндүк) Sun Disk */}
      <circle cx="32" cy="22" r="10.5" fill="#FEF3C7" fillOpacity="0.15" />
      <circle cx="32" cy="22" r="10" stroke="url(#goldSunGrad)" strokeWidth="2" />
      <circle cx="32" cy="22" r="8" stroke="url(#goldSunGrad)" strokeWidth="1" strokeDasharray="2.5,2" opacity="0.8" />
      
      {/* Curved crossed bars of Tündük */}
      <path d="M 25 20 Q 32 23 39 20" stroke="url(#goldSunGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 25 24 Q 32 27 39 24" stroke="url(#goldSunGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 29 16 Q 32 23 29 30" stroke="url(#goldSunGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 35 16 Q 32 23 35 30" stroke="url(#goldSunGrad)" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Central Star Spark */}
      <circle cx="32" cy="22" r="1.5" fill="#F59E0B" />

      {/* Open Book Pages (Wings of Knowledge) */}
      {/* Left Page (Back layer) */}
      <path
        d="M 32 46 C 26 43 18 43 12 45 L 12 36 C 18 34 26 34 32 37 Z"
        fill="#FFFFFF"
        fillOpacity="0.3"
      />
      {/* Right Page (Back layer) */}
      <path
        d="M 32 46 C 38 43 46 43 52 45 L 52 36 C 46 34 38 34 32 37 Z"
        fill="#FFFFFF"
        fillOpacity="0.3"
      />

      {/* Left Main Page */}
      <path
        d="M 32 49 C 25 45 17 45 10 48 L 10 38 C 17 35 25 35 32 39 Z"
        fill="#FFFFFF"
      />
      {/* Right Main Page */}
      <path
        d="M 32 49 C 39 45 47 45 54 48 L 54 38 C 47 35 39 35 32 39 Z"
        fill="#F8FAFC"
      />

      {/* Book Spine / Binding Center */}
      <path
        d="M 32 37 L 32 50"
        stroke="#047857"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Lines on Left Page representing Wisdom text */}
      <line x1="16" y1="41" x2="26" y2="40" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="16" y1="44" x2="24" y2="43" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

      {/* Lines on Right Page representing Wisdom text */}
      <line x1="38" y1="40" x2="48" y2="41" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="40" y1="43" x2="48" y2="44" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

      {/* Bottom Golden Bookmark Ribbon */}
      <path
        d="M 30 50 L 32 54 L 34 50 Z"
        fill="#F59E0B"
      />
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
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', badge: 'text-[9px] px-1 py-0.2', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-xl', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[10px]' },
    lg: { icon: 50, text: 'text-2xl', badge: 'text-[11px] px-2 py-0.5', sub: 'text-xs' },
    xl: { icon: 60, text: 'text-3xl', badge: 'text-xs px-2.5 py-0.5', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-3 shrink-0 group ${className}`}>
      {/* Vector Icon Mark */}
      <div className="relative">
        <BrandLogoIcon size={currentSize.icon} />
        {/* Subtle ambient pulse ring on hover */}
        <div className="absolute inset-0 rounded-2xl bg-brand-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity pointer-events-none" />
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
          <span className={`font-semibold text-gray-500 dark:text-gray-400 tracking-wider mt-1 flex items-center gap-1 ${currentSize.sub}`}>
            <span>Кыргызстан</span>
            <span className="text-amber-500">•</span>
            <span>Окуу китептер дүкөнү</span>
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
