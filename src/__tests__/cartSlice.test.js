import { describe, it, expect } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  changeRentDuration,
  clearCart
} from '../features/cart/cartSlice';

describe('cartSlice reducers and state management', () => {
  const initialState = {
    items: [],
    totalAmount: 0,
    depositAmount: 0,
  };

  const sampleBook = {
    id: 'b_101',
    title: 'Геометрия 8-класс',
    rentPricePerMonth: 40,
    deposit: 150,
    price: 320,
  };

  it('handles addToCart for rental item and recalculates totals', () => {
    const nextState = cartReducer(initialState, addToCart({ book: sampleBook, type: 'RENT', months: 9 }));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].months).toBe(9);
    expect(nextState.totalAmount).toBe(510);
    expect(nextState.depositAmount).toBe(150);
  });

  it('handles changeRentDuration and updates total accordingly', () => {
    let state = cartReducer(initialState, addToCart({ book: sampleBook, type: 'RENT', months: 9 }));
    state = cartReducer(state, changeRentDuration({ id: state.items[0].id, months: 3 }));
    expect(state.items[0].months).toBe(3);
    expect(state.totalAmount).toBe(270);
    expect(state.depositAmount).toBe(150);
  });

  it('handles removeFromCart', () => {
    let state = cartReducer(initialState, addToCart({ book: sampleBook, type: 'RENT', months: 9 }));
    state = cartReducer(state, removeFromCart(state.items[0].id));
    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
    expect(state.depositAmount).toBe(0);
  });

  it('handles clearCart', () => {
    let state = cartReducer(initialState, addToCart({ book: sampleBook, type: 'RENT', months: 9 }));
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
    expect(state.depositAmount).toBe(0);
  });
});
