import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhoneKG, isValidPrice } from '../utils/validators';

describe('Validators utility tests', () => {
  it('validates emails correctly', () => {
    expect(isValidEmail('aibek@gmail.com')).toBe(true);
    expect(isValidEmail('student@bilimkitep.kg')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('validates Kyrgyz phone numbers length', () => {
    expect(isValidPhoneKG('+996 700 123 456')).toBe(true);
    expect(isValidPhoneKG('0700123456')).toBe(true);
    expect(isValidPhoneKG('123')).toBe(false);
  });

  it('validates prices within reasonable range', () => {
    expect(isValidPrice(300)).toBe(true);
    expect(isValidPrice('450')).toBe(true);
    expect(isValidPrice(-10)).toBe(false);
    expect(isValidPrice(0)).toBe(false);
    expect(isValidPrice(1000000)).toBe(false);
  });
});
