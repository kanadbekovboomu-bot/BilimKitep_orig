import { describe, it, expect } from 'vitest';
import {
  normalizeLang,
  getLocalizedBookTitle,
  getLocalizedBookDesc,
  getLocalizedBookAuthor,
  getLocalizedSubject,
  getLocalizedCity,
  getLocalizedMedium,
} from '../utils/bookLocalization';

describe('bookLocalization utility tests', () => {
  it('normalizes language codes accurately', () => {
    expect(normalizeLang('ky')).toBe('kg');
    expect(normalizeLang('kg-KG')).toBe('kg');
    expect(normalizeLang('ru-RU')).toBe('ru');
    expect(normalizeLang('en-US')).toBe('en');
    expect(normalizeLang('fr')).toBe('ru'); // fallback
    expect(normalizeLang(null)).toBe('ru');
  });

  it('translates book titles across KG, RU, and EN', () => {
    const book = {
      id: 'b_119',
      title: 'Информатика жана ИКТ 7-класс',
      subject: 'Информатика',
    };

    expect(getLocalizedBookTitle(book, 'kg')).toBe('Информатика жана ИКТ 7-класс');
    expect(getLocalizedBookTitle(book, 'ru')).toBe('Информатика и ИКТ 7 класс');
    expect(getLocalizedBookTitle(book, 'en')).toBe('Informatics & ICT Grade 7');
  });

  it('translates textbook subjects across languages', () => {
    expect(getLocalizedSubject('Информатика', 'kg')).toBe('Информатика');
    expect(getLocalizedSubject('Информатика', 'ru')).toBe('Информатика / ИКТ');
    expect(getLocalizedSubject('Информатика', 'en')).toBe('Informatics / IT');

    expect(getLocalizedSubject('Кыргыз тили', 'en')).toBe('Kyrgyz Language');
    expect(getLocalizedSubject('Математика', 'en')).toBe('Mathematics');
  });

  it('translates Kyrgyzstan cities', () => {
    expect(getLocalizedCity('Бишкек', 'en')).toBe('Bishkek');
    expect(getLocalizedCity('Ош', 'en')).toBe('Osh');
    expect(getLocalizedCity('Жалал-Абад', 'kg')).toBe('Жалал-Абад');
    expect(getLocalizedCity('Джалал-Абад', 'en')).toBe('Jalal-Abad');
  });

  it('translates medium of instruction', () => {
    expect(getLocalizedMedium('Кыргызский', 'en')).toBe('Kyrgyz');
    expect(getLocalizedMedium('Русский', 'en')).toBe('Russian');
    expect(getLocalizedMedium('Орусча', 'ru')).toBe('Русский');
    expect(getLocalizedMedium('KG', 'kg')).toBe('Кыргызча');
  });
});
