import React from 'react';

/**
 * Calm, Minimalist & Eye-Comfortable Kyrgyz National Background
 * Engineered for maximum reading comfort and zero visual noise:
 * - NO distracting repeating grids or flickering patterns
 * - Solid, calm background canvas
 * - Two delicate, whisper-soft vector watermarks in distant corners (only 5-7% opacity)
 * - Soft, natural ambient aura without glaring brightness
 */
export const KyrgyzMandalaBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 0. Solid, calm base canvas */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-200" />

      {/* 1. Very gentle, calm ambient lighting (soft and soothing to the eyes) */}
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-emerald-500/4 dark:bg-emerald-500/5 blur-3xl" />
      <div className="absolute top-1/2 -left-48 w-[32rem] h-[32rem] rounded-full bg-amber-500/3 dark:bg-amber-500/4 blur-3xl" />
      <div className="absolute -bottom-48 right-1/4 w-[38rem] h-[38rem] rounded-full bg-emerald-500/4 dark:bg-emerald-500/5 blur-3xl" />

      {/* 2. Distant Top-Right Sacred Tyndyk Mandala Watermark (whisper-soft 6% opacity) */}
      <svg
        className="absolute -top-32 -right-32 w-[560px] h-[560px] text-emerald-800/[0.06] dark:text-emerald-300/[0.07] transition-opacity duration-500"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1">
          {/* Concentric rings */}
          <circle cx="200" cy="200" r="190" strokeDasharray="4,4" />
          <circle cx="200" cy="200" r="170" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="145" strokeDasharray="5,3" />
          <circle cx="200" cy="200" r="120" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="90" strokeDasharray="3,3" />
          <circle cx="200" cy="200" r="60" strokeWidth="1.4" />
          <circle cx="200" cy="200" r="30" strokeWidth="1.6" />

          {/* 16 delicate petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                <path d="M 200 80 Q 212 115 200 140 Q 188 115 200 80 Z" fill="currentColor" fillOpacity="0.08" />
                <line x1="200" y1="30" x2="200" y2="60" strokeWidth="1.2" />
              </g>
            );
          })}

          {/* Tyndyk crossbars */}
          <path d="M 180 190 Q 200 205 220 190" strokeWidth="1.4" />
          <path d="M 180 210 Q 200 225 220 210" strokeWidth="1.4" />
          <path d="M 190 180 Q 205 200 190 220" strokeWidth="1.4" />
          <path d="M 210 180 Q 225 200 210 220" strokeWidth="1.4" />
        </g>
      </svg>

      {/* 3. Distant Bottom-Left Sun & Horn Mandala Watermark (whisper-soft 5% opacity) */}
      <svg
        className="absolute -bottom-36 -left-36 w-[580px] h-[580px] text-amber-700/[0.05] dark:text-amber-300/[0.06] transition-opacity duration-500"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="185" strokeDasharray="4,4" />
          <circle cx="200" cy="200" r="160" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="130" strokeDasharray="5,3" />
          <circle cx="200" cy="200" r="100" strokeWidth="1.4" />
          <circle cx="200" cy="200" r="70" />
          <circle cx="200" cy="200" r="40" strokeWidth="1.6" />

          {/* 12 sun rays */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                <path d="M 200 70 Q 215 95 200 125 Q 185 95 200 70 Z" fill="currentColor" fillOpacity="0.06" />
                <line x1="200" y1="40" x2="200" y2="70" strokeWidth="1.4" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default KyrgyzMandalaBackground;