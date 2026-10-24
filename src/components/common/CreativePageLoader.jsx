import React, { useState, useEffect } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { BrandLogoIcon } from './BrandLogo';

/**
 * Creative Educational Page Loader for BilimKitep
 * Features a 3D animated flipping book, rising Kyrgyz Tündük solar radiance,
 * an inspiring Kyrgyz wisdom ticker, and a swift dynamic progress counter.
 */
export const CreativePageLoader = ({
  fullScreen = false,
  onComplete,
  duration = 1100,
}) => {
  const [progress, setProgress] = useState(15);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    { text: '«Окуу — билим азыгы, билим — ырыс казыгы»', author: 'Кыргыз эл макалы' },
    { text: '«Билим — түгөнгүс кенч, өнөр — өчпөс чырак»', author: 'Элдик акылмандык' },
    { text: '«Китеп — билим булагы, билим — өмүр чырагы»', author: 'Кыргыз педагогикасы' },
    { text: '«Кыргызстандын окуу китептери • 7 облус»', author: 'BilimKitep Store' },
  ];

  useEffect(() => {
    // Progress counter animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 200);
        }
      }
    }, 30);

    // Quotes cycler
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(quoteInterval);
    };
  }, [duration, onComplete]);

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-darkBg/95 backdrop-blur-xl transition-opacity duration-300'
    : 'min-h-[55vh] flex items-center justify-center p-6';

  return (
    <div className={containerClasses}>
      {/* Ambient background glows */}
      <div className="absolute w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-sm w-full text-center space-y-6">
        {/* Animated 3D Book & Rising Tündük */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {/* Pulsing golden halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/30 to-emerald-400/30 blur-xl animate-ping" style={{ animationDuration: '2.5s' }} />

          {/* Lively Central Logo Mark */}
          <div className="relative animate-bounce" style={{ animationDuration: '2s' }}>
            <BrandLogoIcon size={84} />
          </div>

          {/* Floating magical sparkles with Lucide Icons */}
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-400 animate-pulse" />
          <Star className="absolute -bottom-1 -left-2 w-3.5 h-3.5 text-emerald-500 fill-emerald-500/30 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <Sparkles className="absolute top-1/2 -left-4 w-3 h-3 text-amber-500 animate-ping" style={{ animationDelay: '1.2s' }} />
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-gray-700 dark:text-gray-300 px-1">
            <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping inline-block" />
              <span>Жүктөлүүдө...</span>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-black">
              {progress}%
            </span>
          </div>

          {/* Track and Animated Bar */}
          <div className="w-full h-2.5 bg-gray-100 dark:bg-darkBorder/60 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600 transition-all duration-100 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Inspiring Kyrgyz Proverbs Ticker */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/5 via-amber-500/5 to-emerald-500/5 border border-amber-300/30 dark:border-amber-700/20 shadow-xs min-h-[72px] flex flex-col justify-center transition-all duration-300">
          <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug animate-entrance key={quoteIndex}">
            {quotes[quoteIndex].text}
          </p>
          <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1">
            — {quotes[quoteIndex].author}
          </span>
        </div>

        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
          BilimKitep • Кыргызстан
        </p>
      </div>
    </div>
  );
};

export default CreativePageLoader;
