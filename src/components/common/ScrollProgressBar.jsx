import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * ScrollProgressBar (Kyrgyz Ribbon Reading Progress Slider)
 * Renders via React Portal directly into document.body with position: fixed and z-index: 99999.
 * This guarantees it NEVER scrolls out of view or gets trapped by any ancestor container.
 *
 * Clean, pure visual design without floating percentage badges.
 * Features:
 * - Always visible at the absolute top of the screen (z-index: 99999).
 * - High-contrast 10-12px bar with Kyrgyz national gradient (Red -> Amber -> Emerald).
 * - Prominent 22-24px glowing slider thumb ("ползунок / бегунок") that visibly glides as you scroll.
 * - Click anywhere on the bar to smoothly jump to that part of the page.
 * - Passive listeners + requestAnimationFrame for 60fps buttery-smooth scroll tracking.
 */
export const ScrollProgressBar = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(
    () => typeof document !== 'undefined' && Boolean(document.body)
  );

  const barRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (!mounted && typeof document !== 'undefined' && document.body) {
      setMounted(true);
    }
  }, [mounted]);

  // Universal scroll calculation supporting all browsers & scroll containers
  const updateProgress = useCallback(() => {
    const doc = document.documentElement;
    const body = document.body;

    const scrollTop =
      window.pageYOffset ||
      window.scrollY ||
      (doc && doc.scrollTop) ||
      (body && body.scrollTop) ||
      0;

    const scrollHeight = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0,
      doc ? doc.offsetHeight : 0,
      body ? body.offsetHeight : 0,
      doc ? doc.clientHeight : 0
    );

    const clientHeight = window.innerHeight || (doc ? doc.clientHeight : 0) || 1;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 10) {
      const currentPercent = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
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
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('popstate', updateProgress, { passive: true });

    // Initial check + delayed updates for dynamically loaded images / books
    updateProgress();
    const t1 = setTimeout(updateProgress, 100);
    const t2 = setTimeout(updateProgress, 400);
    const t3 = setTimeout(updateProgress, 1000);

    // MutationObserver to update on async DOM content changes
    let observer;
    if (typeof MutationObserver !== 'undefined' && document.body) {
      observer = new MutationObserver(() => {
        updateProgress();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('popstate', updateProgress);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (observer) observer.disconnect();
    };
  }, [updateProgress]);

  // Click / tap to seek to that position of the page
  const handleSeek = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));

    const doc = document.documentElement;
    const body = document.body;
    const scrollHeight = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0,
      doc ? doc.offsetHeight : 0,
      body ? body.offsetHeight : 0
    );
    const clientHeight = window.innerHeight || (doc ? doc.clientHeight : 0) || 1;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 0) {
      window.scrollTo({
        top: ratio * maxScroll,
        behavior: 'smooth',
      });
    }
  };

  const roundedPercent = Math.round(progress);

  const barContent = (
    <aside
      ref={barRef}
      role="progressbar"
      aria-valuenow={roundedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Прогресс чтения страницы"
      tabIndex={0}
      onClick={handleSeek}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 99999,
      }}
      className={`fixed top-0 left-0 right-0 w-full h-2 sm:h-2.5 bg-slate-900/90 dark:bg-black/90 backdrop-blur-md cursor-pointer select-none transition-all duration-150 border-b border-black/30 dark:border-white/15 shadow-md ${className}`}
    >
      {/* Background track subtle glow */}
      <div className="absolute inset-0 bg-slate-800/40 pointer-events-none" />

      {/* Active filled Kyrgyz Ribbon (Red -> Amber -> Emerald) */}
      <div
        className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-500 shadow-[0_0_14px_rgba(245,158,11,0.7)] transition-[width] duration-75 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Prominent Glowing Slider Thumb ("Ползунок / Бегунок") */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1),0_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center transform hover:scale-125 transition-transform"
          aria-hidden="true"
        >
          {/* Inner Golden Kyrgyz Dot */}
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
        </div>
      </div>
    </aside>
  );

  // Use createPortal to mount directly into document.body, escaping any parent container
  if (mounted && typeof document !== 'undefined' && document.body) {
    return createPortal(barContent, document.body);
  }

  return barContent;
};

export default ScrollProgressBar;
