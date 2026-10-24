import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import { DiplomaDefenseModal } from './components/modules/DiplomaDefenseModal';

export const App = () => {
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-darkBg dark:text-gray-100 transition-colors duration-200">
        <Header onOpenDefenseModal={() => setIsDefenseModalOpen(true)} />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />

        <DiplomaDefenseModal
          isOpen={isDefenseModalOpen}
          onClose={() => setIsDefenseModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
