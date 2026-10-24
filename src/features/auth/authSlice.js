import { createSlice } from '@reduxjs/toolkit';

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,
  role: initialUser ? initialUser.role : 'GUEST',
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.role = user.role || 'USER';
      state.status = 'succeeded';
      state.error = null;
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        try {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('user', JSON.stringify(user));
        } catch {
          // ignore storage quota
        }
      }
    },
    loginUser: (state, action) => {
      authSlice.caseReducers.setCredentials(state, action);
    },
    registerUser: (state, action) => {
      authSlice.caseReducers.setCredentials(state, action);
    },
    oauthLoginSuccess: (state, action) => {
      authSlice.caseReducers.setCredentials(state, action);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = 'GUEST';
      state.status = 'idle';
      state.error = null;
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.removeItem === 'function') {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      }
    },
  },
});

export const { loginUser, registerUser, logout, setCredentials, oauthLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
