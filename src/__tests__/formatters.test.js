import { describe, it, expect } from 'vitest';
import { formatKGS, formatPhoneKG, formatDate } from '../utils/formatters';

describe('Formatters utility tests', () => {
  it('formats KGS currency correctly', () => {
    expect(formatKGS(300)).toContain('300 сом');
    expect(formatKGS(1500).replace(/\u00A0/g, ' ')).toBe('1 500 сом');
    expect(formatKGS(0)).toContain('0 сом');
    expect(formatKGS(null)).toContain('0 сом');
  });

  it('formats Kyrgyz phone numbers with standard mask', () => {
    expect(formatPhoneKG('996700123456')).toBe('+996 (700) 12-34-56');
    expect(formatPhoneKG('+996700123456')).toBe('+996 (700) 12-34-56');
    expect(formatPhoneKG('12345')).toBe('12345');
  });

  it('formats dates properly', () => {
    const formatted = formatDate('2026-05-15T10:00:00.000Z');
    expect(formatted).toBeTruthy();
    expect(formatDate(null)).toBe('');
  });
});
