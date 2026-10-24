import { describe, it, expect } from 'vitest';
import { calculateItemTotal, calculateTotals } from '../features/cart/cartSlice';

describe('Rental Calculator Formula & Cart Totals (TDD)', () => {
  const sampleRentBook = {
    id: 'b_101',
    title: 'Геометрия 8-класс',
    rentPricePerMonth: 40,
    deposit: 150,
    price: 320,
  };

  const sampleBuyBook = {
    id: 'b_105',
    title: 'ЖРТ Математика',
    price: 490,
    rentPricePerMonth: 60,
    deposit: 250,
  };

  it('calculates 3-month quarter rental total correctly: (40 * 3) + 150 = 270', () => {
    const item = {
      type: 'RENT',
      book: sampleRentBook,
      months: 3,
    };
    const total = calculateItemTotal(item);
    expect(total).toBe(270);
  });

  it('calculates 5-month semester rental total correctly: (40 * 5) + 150 = 350', () => {
    const item = {
      type: 'RENT',
      book: sampleRentBook,
      months: 5,
    };
    const total = calculateItemTotal(item);
    expect(total).toBe(350);
  });

  it('calculates 9-month full school year rental total correctly: (40 * 9) + 150 = 510', () => {
    const item = {
      type: 'RENT',
      book: sampleRentBook,
      months: 9,
    };
    const total = calculateItemTotal(item);
    expect(total).toBe(510);
  });

  it('calculates purchase price correctly without duration multiplier or deposit', () => {
    const item = {
      type: 'BUY',
      book: sampleBuyBook,
      months: null,
    };
    const total = calculateItemTotal(item);
    expect(total).toBe(490);
  });

  it('calculates composite cart totals with both rent and buy items', () => {
    const items = [
      { type: 'RENT', book: sampleRentBook, months: 9 }, // 40*9 + 150 = 510, deposit = 150
      { type: 'BUY', book: sampleBuyBook, months: null },  // 490, deposit = 0
    ];
    const { totalAmount, depositAmount } = calculateTotals(items);
    expect(totalAmount).toBe(1000);
    expect(depositAmount).toBe(150);
  });
});
