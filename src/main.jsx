import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import './index.css';
import App from './App';

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '616700297922-rlurljeqi2qai5uo3eaqoki0u49m7eq0.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={googleClientId}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

