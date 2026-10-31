import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ScrollProgressBar (Kyrgyz Ribbon Reading Progress Slider)
 * Always fixed at the very top of the browser viewport (z-[100]),
 * ensuring it NEVER scrolls off-screen or disappears.
 *
 * Features:
 * - Always visible at fixed top-0 with 8px-10px bold height and high-contrast track.
 * - Prominent 18px glowing Kyrgyz thumb ("ползунок") that visibly glides as you scroll.
 * - Dynamic scroll percentage badge showing current position (e.g. "45%").
 * - Interactive seeking: click anywhere along the top bar to jump directly to that point.
 * - 60 FPS performance via requestAnimationFrame and passive listeners.
 * - Universal compatibility (works regardless of parent overflow or router).
 */
export const ScrollProgressBar = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null); // { percent, clientX }
  const barRef = useRef(null);
  const rafIdRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Smooth scroll listener
  const updateProgress = useCallback(() => {
    const scrollY =
      window.pageYOffset ||
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight || 0
    );

    const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 15) {
      const currentPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      setProgress(currentPercent);
    } else {
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateProgress);
    };

    const onResize = () => {
      updateProgress();
    };

    // Attach listeners to window, document and body to handle all scroll containers
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('popstate', updateProgress, { passive: true });

    // Initial check + delayed checks for dynamically loaded content
    updateProgress();
    const timer1 = setTimeout(updateProgress, 100);
    const timer2 = setTimeout(updateProgress, 500);

    // Mutation observer to detect dynamic page height changes
    let observer;
    if (typeof MutationObserver !== 'undefined' && document.body) {
      observer = new MutationObserver(updateProgress);
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('popstate', updateProgress);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (observer) observer.disconnect();
    };
  }, [updateProgress]);

  // Click / tap to seek to that percentage of the page
  const handleSeek = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));

    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight
    );
    const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
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

  const roundedPercent = Math.round(progress);
  const showBadge = isHovered || isScrolling;

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-valuenow={roundedPercent}
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
      className={`fixed top-0 left-0 right-0 w-full h-2 sm:h-2.5 bg-slate-200/90 dark:bg-slate-800/90 backdrop-blur-md cursor-pointer select-none z-[100] transition-all duration-150 border-b border-black/10 dark:border-white/10 shadow-sm ${className}`}
      title={`Прогресс страницы: ${roundedPercent}% (кликните для перехода)`}
    >
      {/* Active filled Kyrgyz Ribbon (Red -> Amber -> Emerald) */}
      <div
        className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-[width] duration-75 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Prominent Glowing Slider Thumb ("Ползунок / Бегунок") */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 dark:border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.95),0_2px_6px_rgba(0,0,0,0.4)] flex items-center justify-center transform hover:scale-125 transition-transform"
          aria-hidden="true"
        >
          {/* Inner Golden Dot */}
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shadow-[0_0_4px_#f59e0b]" />
        </div>
      </div>

      {/* Floating Percentage Indicator Pill */}
      {showBadge && (
        <div
          className="pointer-events-none absolute top-3.5 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black bg-slate-950/95 text-white dark:bg-white/95 dark:text-slate-950 shadow-xl border border-slate-700/60 dark:border-slate-300/60 backdrop-blur-md transition-all duration-100 z-[101] whitespace-nowrap flex items-center gap-1.5 animate-in fade-in zoom-in-95"
          style={{
            left: `${
              hoverPosition
                ? Math.min(95, Math.max(5, hoverPosition.percent))
                : Math.min(95, Math.max(5, progress))
            }%`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{hoverPosition ? hoverPosition.percent : roundedPercent}%</span>
          {isHovered && <span className="opacity-60 text-[9px] font-medium hidden sm:inline">• Перейти</span>}
        </div>
      )}
    </div>
  );
};

export default ScrollProgressBar;
