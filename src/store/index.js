import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import booksReducer from '../features/books/booksSlice';
import cartReducer from '../features/cart/cartSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
