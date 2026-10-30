import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import { CreativePageLoader } from './components/common/CreativePageLoader';
import { KyrgyzMandalaBackground } from './components/common/KyrgyzMandalaBackground';

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
      {showInitialSplash && (
        <CreativePageLoader
          fullScreen
          duration={1200}
          onComplete={handleSplashComplete}
        />
      )}

      <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-gray-50/70 text-gray-900 dark:bg-darkBg dark:text-gray-100 transition-colors duration-200">
        {/* Luxury Ethnic Mandala & Shyrdak Background Pattern */}
        <KyrgyzMandalaBackground />

        <Header />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
