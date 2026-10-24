import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { CreativePageLoader } from '../components/common/CreativePageLoader';

// Lazy loaded page components (Section 2 modular loading)
const HomePage = lazy(() => import('../pages/HomePage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage'));
const BookDetailPage = lazy(() => import('../pages/BookDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const MyListingsPage = lazy(() => import('../pages/MyListingsPage'));
const AddBookPage = lazy(() => import('../pages/AddBookPage'));
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'));

const PageLoader = () => (
  <CreativePageLoader duration={500} />
);

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <div key={location.pathname} className="animate-entrance">
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected User Routes */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <PrivateRoute>
                <MyListingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBookPage />
              </PrivateRoute>
            }
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default AppRoutes;
