import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Automatically scrolls window and document to the top whenever
 * the user navigates to a different page/route.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to a specific in-page anchor hash, scroll to that element
    if (hash) {
      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } catch {
        // Fallback to top if invalid selector
      }
    }

    // Universal instantaneous scroll to top across all browsers
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;

      const appRoot = document.getElementById('root');
      if (appRoot) appRoot.scrollTop = 0;
    }

    // Double check on next animation frame to handle dynamic lazy loaded chunks
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
