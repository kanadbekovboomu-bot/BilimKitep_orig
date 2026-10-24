import React from 'react';

// Classic Kyrgyz Kochkor-Muyuz (Кочкор мүйүз) Horn Pattern Divider
export const KochkorMuyuzPattern = ({ className = 'h-6 text-brand-600/30 dark:text-brand-400/20' }) => {
  return (
    <svg
      className={`w-full overflow-hidden ${className}`}
      viewBox="0 0 1200 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="kochkorPattern" width="100" height="24" patternUnits="userSpaceOnUse">
          {/* Central Horn motif */}
          <path
            d="M 10,12 C 10,5 20,4 25,10 C 27,12 30,12 32,10 C 37,4 47,5 47,12 C 47,20 38,20 33,15 C 31,13 26,13 24,15 C 19,20 10,20 10,12 Z
               M 60,12 C 60,5 70,4 75,10 C 77,12 80,12 82,10 C 87,4 97,5 97,12 C 97,20 88,20 83,15 C 81,13 76,13 74,15 C 69,20 60,20 60,12 Z"
            fill="currentColor"
          />
          <circle cx="28.5" cy="8" r="2.5" fill="currentColor" opacity="0.7"/>
          <circle cx="78.5" cy="8" r="2.5" fill="currentColor" opacity="0.7"/>
          {/* Connecting Wave */}
          <path d="M 0,12 Q 25,22 50,12 T 100,12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="1200" height="24" fill="url(#kochkorPattern)" />
    </svg>
  );
};

// Sacred Tyndyk (Түндүк) & 40 Sun Rays Emblem
export const TyndykEmblem = ({ size = 28, className = 'text-amber-500' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Golden Sun Circle */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" />
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5,3" opacity="0.8"/>

      {/* Crossed Tyndyk curved bars */}
      <path d="M 24 38 Q 50 48 76 38" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 24 50 Q 50 60 76 50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 24 62 Q 50 72 76 62" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>

      <path d="M 38 24 Q 48 50 38 76" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 50 24 Q 60 50 50 76" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 62 24 Q 72 50 62 76" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>

      {/* Center Star */}
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  );
};

// Corner Ornament for Cards and Sections (Кочкор мүйүз бурчтук)
export const KyrgyzCornerOrnament = ({ className = 'text-brand-500/20' }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 4,4 L 32,4 C 42,4 48,10 44,20 C 40,28 30,26 28,18 C 26,10 14,14 18,26 C 22,38 34,36 38,48 C 42,60 30,60 20,52 L 4,36 Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Cultural Badge
export const KyrgyzCultureBadge = ({ text = 'Кыргызстандын окуу китептер дүкөнү' }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-emerald-500/10 border border-amber-300/40 dark:border-amber-700/40 text-amber-900 dark:text-amber-200 text-xs font-bold shadow-xs">
      <TyndykEmblem size={16} className="text-amber-500 shrink-0" />
      <span>{text}</span>
    </div>
  );
};

export default KochkorMuyuzPattern;
