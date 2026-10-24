import React from 'react';

/**
 * Minimalist Luxury Ethnic Mandala & Shyrdak Background Pattern
 * Inspired by Kyrgyz ornamental mandalas and modern MBANK fintech aesthetics.
 * Ultra-crisp vector watermark with delicate lines, radial gradient mask,
 * and ambient atmospheric depth.
 */
export const KyrgyzMandalaBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Ambient Lighting Aura (Emerald & Solar Gold) */}
      <div className="absolute -top-40 -right-40 w-[38rem] h-[38rem] rounded-full bg-gradient-to-br from-emerald-500/12 to-teal-500/5 blur-3xl" />
      <div className="absolute top-1/3 -left-48 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr from-amber-500/8 via-emerald-500/6 to-transparent blur-3xl" />
      <div className="absolute -bottom-48 right-1/4 w-[42rem] h-[42rem] rounded-full bg-gradient-to-t from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl" />

      {/* 2. Top-Right Luxury Ornamental Mandala Watermark */}
      <svg
        className="absolute -top-32 -right-32 w-[600px] h-[600px] text-emerald-800/6 dark:text-emerald-400/8 transition-opacity duration-700"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.2">
          {/* Concentric Mandala Rings */}
          <circle cx="200" cy="200" r="190" strokeDasharray="3,4" />
          <circle cx="200" cy="200" r="170" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="145" strokeDasharray="5,3" />
          <circle cx="200" cy="200" r="120" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="90" strokeDasharray="2,3" />
          <circle cx="200" cy="200" r="60" strokeWidth="1.8" />
          <circle cx="200" cy="200" r="30" strokeWidth="2" />

          {/* 16 Ornamental Petals / Horn Motifs */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                {/* Petal Arc */}
                <path d="M 200 80 Q 215 120 200 145 Q 185 120 200 80 Z" fill="currentColor" fillOpacity="0.15" />
                {/* Central Ray */}
                <line x1="200" y1="30" x2="200" y2="60" strokeWidth="1.5" />
                {/* Outer Horn Hook */}
                <path d="M 200 170 Q 210 180 215 170" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 200 170 Q 190 180 185 170" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            );
          })}

          {/* Central Tyndyk Crossbars */}
          <path d="M 180 190 Q 200 205 220 190" strokeWidth="1.5" />
          <path d="M 180 210 Q 200 225 220 210" strokeWidth="1.5" />
          <path d="M 190 180 Q 205 200 190 220" strokeWidth="1.5" />
          <path d="M 210 180 Q 225 200 210 220" strokeWidth="1.5" />
        </g>
      </svg>

      {/* 3. Bottom-Left Luxury Ornamental Mandala Watermark */}
      <svg
        className="absolute -bottom-36 -left-36 w-[650px] h-[650px] text-amber-700/5 dark:text-amber-400/6 transition-opacity duration-700"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.2">
          {/* Concentric Rings */}
          <circle cx="200" cy="200" r="185" strokeDasharray="4,4" />
          <circle cx="200" cy="200" r="160" strokeWidth="1.4" />
          <circle cx="200" cy="200" r="130" strokeDasharray="6,3" />
          <circle cx="200" cy="200" r="100" strokeWidth="1.6" />
          <circle cx="200" cy="200" r="70" />
          <circle cx="200" cy="200" r="40" strokeWidth="2" />

          {/* 12 Sun Petals */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                <path d="M 200 70 Q 220 100 200 130 Q 180 100 200 70 Z" fill="currentColor" fillOpacity="0.12" />
                <line x1="200" y1="40" x2="200" y2="70" strokeWidth="1.8" />
                <circle cx="200" cy="55" r="2.5" fill="currentColor" fillOpacity="0.4" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* 4. Delicate Micro Geometric Pattern Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

export default KyrgyzMandalaBackground;
