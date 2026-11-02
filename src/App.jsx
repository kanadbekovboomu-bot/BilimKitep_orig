import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import { CreativePageLoader } from './components/common/CreativePageLoader';
import { KyrgyzMandalaBackground } from './components/common/KyrgyzMandalaBackground';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { GlobalCartToast } from './components/common/GlobalCartToast';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App = () => {
  const [showInitialSplash, setShowInitialSplash] = useState(() => {
    try {
      return !sessionStorage.getItem('bilimkitep_splash_seen');
    } catch {
      return false;
    }
  });

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem('bilimkitep_splash_seen', 'true');
    } catch {}
    setShowInitialSplash(false);
  };

  return (
    <ErrorBoundary>
      {/* Auto scroll to top on page navigation */}
      <ScrollToTop />

      {/* Fixed Viewport Kyrgyz Reading Progress Bar Slider - Always at absolute top of window */}
      <ScrollProgressBar />

      {/* Global Confirmation Toast whenever item is added to cart */}
      <GlobalCartToast />

      {showInitialSplash && (
        <CreativePageLoader
          fullScreen
          duration={1200}
          onComplete={handleSplashComplete}
        />
      )}

      <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-clip flex flex-col bg-gray-50/70 text-gray-900 dark:bg-darkBg dark:text-gray-100 transition-colors duration-200">
        {/* Luxury Ethnic Mandala & Shyrdak Background Pattern */}
        <KyrgyzMandalaBackground />

        <Header />
        <main className="flex-1 w-full max-w-full overflow-x-clip">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
