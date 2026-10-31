import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ScrollProgressBar (Kyrgyz Ribbon Reading Progress)
 * Transforms the national Kyrgyz gradient decor (Red -> Amber -> Emerald)
 * into a smooth, interactive 60fps reading progress slider.
 *
 * Features:
 * - Real-time scroll progress tracking via requestAnimationFrame (no jank).
 * - Smooth width interpolation with vibrant Kyrgyz national gradient.
 * - Interactive seeking: click anywhere on the bar to jump/scroll to that point on the page.
 * - Glowing thumb and tooltip badge on hover.
 * - Full ARIA progressbar compliance.
 */
export const ScrollProgressBar = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null); // { percent, clientX }
  const barRef = useRef(null);
  const rafIdRef = useRef(null);

  // Smooth scroll listener using requestAnimationFrame
  const updateProgress = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 0) {
      const currentPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      setProgress(currentPercent);
    } else {
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateProgress);
    };

    const onResize = () => {
      updateProgress();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateProgress]);

  // Click on the progress bar to smoothly seek to that position on the page
  const handleSeek = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 0) {
      window.scrollTo({
        top: ratio * maxScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));
    setHoverPosition({ percent, clientX: e.clientX });
  };

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Прогресс чтения страницы"
      tabIndex={0}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverPosition(null);
      }}
      className={`group relative w-full h-1 hover:h-2 bg-slate-200/60 dark:bg-slate-800/80 transition-all duration-200 cursor-pointer select-none overflow-visible z-50 ${className}`}
      title={`Прогресс страницы: ${Math.round(progress)}% (кликните для перехода)`}
    >
      {/* Background ambient glow line */}
      <div
        className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 transition-[width] duration-100 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Leading edge laser head / glowing indicator */}
        {progress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#10b981,0_0_12px_#f59e0b] ring-2 ring-emerald-500/80" />
        )}
      </div>

      {/* Hover preview tooltip badge */}
      {isHovered && hoverPosition && (
        <div
          className="pointer-events-none absolute top-3 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-900 shadow-lg border border-slate-700/50 dark:border-slate-200/50 backdrop-blur-md transition-transform duration-75 z-50 whitespace-nowrap flex items-center gap-1 animate-in fade-in zoom-in-90"
          style={{
            left: `${Math.min(96, Math.max(4, hoverPosition.percent))}%`,
          }}
        >
          <span>{hoverPosition.percent}%</span>
          <span className="opacity-60">•</span>
          <span className="opacity-80">Перейти</span>
        </div>
      )}
    </div>
  );
};

export default ScrollProgressBar;
