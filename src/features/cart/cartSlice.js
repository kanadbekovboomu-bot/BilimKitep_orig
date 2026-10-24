import { createSlice } from '@reduxjs/toolkit';

export const calculateItemTotal = (item) => {
  if (item.type === 'RENT') {
    const rentPerMonth = Number(item.book.rentPricePerMonth) || 0;
    const months = Number(item.months) || 3;
    const deposit = Number(item.book.deposit) || 0;
    return (rentPerMonth * months) + deposit;
  }
  return Number(item.book.price) || 0;
};

export const calculateTotals = (items) => {
  let totalAmount = 0;
  let depositAmount = 0;

  items.forEach((item) => {
    totalAmount += calculateItemTotal(item);
    if (item.type === 'RENT') {
      depositAmount += Number(item.book.deposit) || 0;
    }
  });

  return { totalAmount, depositAmount };
};

const loadInitialCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialItems = loadInitialCart();
const initialTotals = calculateTotals(initialItems);

const initialState = {
  items: initialItems,
  totalAmount: initialTotals.totalAmount,
  depositAmount: initialTotals.depositAmount,
};

const syncWithStorage = (state) => {
  const totals = calculateTotals(state.items);
  state.totalAmount = totals.totalAmount;
  state.depositAmount = totals.depositAmount;
  if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
    try {
      window.localStorage.setItem('cart', JSON.stringify(state.items));
    } catch {
      // ignore storage quota errors
    }
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { book, type = 'RENT', months = 9 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.book.id === book.id && item.type === type
      );

      if (existingIndex > -1) {
        state.items[existingIndex].months = months;
      } else {
        state.items.push({
          id: `${book.id}_${type}`,
          book,
          type,
          months: type === 'RENT' ? months : null,
        });
      }
      syncWithStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id && item.book.id !== id);
      syncWithStorage(state);
    },
    changeRentDuration: (state, action) => {
      const { id, months } = action.payload;
      const item = state.items.find((item) => item.id === id || item.book.id === id);
      if (item && item.type === 'RENT') {
        item.months = Number(months);
      }
      syncWithStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.depositAmount = 0;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },
  },
});

export const { addToCart, removeFromCart, changeRentDuration, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
