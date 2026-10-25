import { describe, it, expect, beforeEach } from 'vitest';
import { api, INITIAL_BOOKS } from '../services/api';
import { isUuid } from '../utils/uuid';

describe('Mock REST API and Data Layer tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves books list with pagination', async () => {
    const res = await api.getBooks({ page: 1, limit: 6 });
    expect(res.items.length).toBeLessThanOrEqual(6);
    expect(res.totalItems).toBeGreaterThan(0);
    expect(res.totalPages).toBeGreaterThanOrEqual(1);
  });

  it('filters books by search query', async () => {
    const res = await api.getBooks({ search: 'Бекбоев' });
    expect(res.items.length).toBeGreaterThan(0);
    expect(res.items[0].author).toContain('Бекбоев');
  });

  it('filters books by grade and language', async () => {
    const res = await api.getBooks({ grade: '8', language: 'KG' });
    expect(res.items.every(b => String(b.grade) === '8' && b.language === 'KG')).toBe(true);
  });

  it('filters books by deal type', async () => {
    const res = await api.getBooks({ dealType: 'RENT' });
    expect(res.items.every(b => b.dealType === 'RENT' || b.dealType === 'BOTH')).toBe(true);
  });

  it('creates, reads, updates, and deletes a textbook', async () => {
    // 1. Create
    const created = await api.createBook({
      title: 'Информатика 9-класс',
      author: 'А. Баялиев',
      subject: 'Информатика',
      grade: 9,
      language: 'KG',
      dealType: 'RENT',
      price: 350,
      rentPricePerMonth: 45,
      deposit: 150,
    });
    expect(created.id).toBeTruthy();
    expect(created.title).toBe('Информатика 9-класс');

    // 2. Read by ID
    const fetched = await api.getBookById(created.id);
    expect(fetched.id).toBe(created.id);

    // 3. Update
    const updated = await api.updateBook(created.id, { price: 380 });
    expect(updated.price).toBe(380);

    // 4. Delete
    await api.deleteBook(created.id);
    await expect(api.getBookById(created.id)).rejects.toThrow();
  });

  it('creates orders and recalculates admin metrics', async () => {
    const newOrder = await api.createOrder({
      customerName: 'Айбек Нурланов',
      customerPhone: '+996 700 123 456',
      totalAmount: 510,
      depositAmount: 150,
    });
    expect(newOrder.id).toBeTruthy();

    const orders = await api.getOrders();
    expect(orders.length).toBeGreaterThan(0);

    const metrics = await api.getAdminMetrics();
    expect(metrics.totalRevenue).toBeGreaterThan(0);
    expect(metrics.chartData.length).toBeGreaterThan(0);
  });

  it('generates standard RFC 4122 UUID v4 for new textbooks and orders', async () => {
    const created = await api.createBook({
      title: 'UUID Test Book',
      author: 'Test Author',
      subject: 'Тест',
      grade: 5,
    });
    expect(created.uuid).toBeTruthy();
    expect(isUuid(created.uuid)).toBe(true);

    const fetchedByUuid = await api.getBookById(created.uuid);
    expect(fetchedByUuid.uuid).toBe(created.uuid);

    const newOrder = await api.createOrder({
      customerName: 'UUID Customer',
      customerPhone: '+996 700 000 000',
      totalAmount: 300,
    });
    expect(newOrder.uuid).toBeTruthy();
    expect(isUuid(newOrder.uuid)).toBe(true);
  });
});
