import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, setCredentials, logout } from '../features/auth/authSlice';
import { LoginPage } from '../pages/LoginPage';
import '../i18n';

// Mock Google OAuth package for jsdom
vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
  GoogleLogin: ({ onSuccess, onError }) => (
    <div data-testid="google-login-button">
      <button
        type="button"
        data-testid="mock-google-login-trigger"
        onClick={() => onSuccess && onSuccess({ credential: 'fake_jwt_token' })}
      >
        Sign in with Google
      </button>
    </div>
  ),
  useGoogleLogin: () => vi.fn(),
}));

describe('Auth Redux Slice & Google Auth', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
    });
  });

  it('stores Google user profile and token upon setCredentials', () => {
    const googleUser = {
      id: 'google_1234567890',
      name: 'Нурсултан Касымов',
      email: 'nursultan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      role: 'USER',
      authProvider: 'GOOGLE',
      emailVerified: true,
    };

    store.dispatch(setCredentials({ user: googleUser, token: 'mock_google_jwt_123' }));

    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.name).toBe('Нурсултан Касымов');
    expect(state.user.authProvider).toBe('GOOGLE');
    expect(state.user.avatar).toBe('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde');
    expect(state.token).toBe('mock_google_jwt_123');
  });

  it('clears credentials on logout', () => {
    store.dispatch(
      setCredentials({
        user: { id: 'u_1', name: 'User', role: 'USER' },
        token: 'token_123',
      })
    );
    expect(store.getState().auth.isAuthenticated).toBe(true);

    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.role).toBe('GUEST');
  });

  it('renders LoginPage with Google Sign-In container and demo buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
    expect(screen.getByText(/Колдонуучу/i)).toBeInTheDocument();
    expect(screen.getByText(/Админ КР/i)).toBeInTheDocument();
  });
});
