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
  }, 20000);

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
  }, 20000);

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

  it('tracks stock quantity, decreases stock, and records sales history on order', async () => {
    // 1. Create book with initial quantity = 5
    const book = await api.createBook({
      title: 'Учёт продаж тест',
      author: 'Тест Автор',
      subject: 'Алгебра',
      grade: 7,
      price: 400,
      quantity: 5,
    });
    expect(book.quantity).toBe(5);
    expect(book.initialStock).toBe(5);
    expect(book.soldCount).toBe(0);

    // 2. Place an order for 2 copies
    await api.createOrder({
      customerName: 'Бекзат Оморов',
      customerPhone: '+996 701 223 344',
      city: 'Бишкек',
      totalAmount: 800,
      items: [
        {
          id: book.id,
          quantity: 2,
          price: 400,
          dealType: 'BUY',
        }
      ]
    });

    // 3. Verify book stock was decremented and soldCount incremented
    const updatedBook = await api.getBookById(book.id);
    expect(updatedBook.quantity).toBe(3);
    expect(updatedBook.soldCount).toBe(2);
    expect(updatedBook.sales.length).toBeGreaterThan(0);
    expect(updatedBook.sales[0].customerName).toBe('Бекзат Оморов');

    // 4. Update stock via updateBookStock
    const replenished = await api.updateBookStock(book.id, 10);
    expect(replenished.quantity).toBe(10);
  });

  it('prioritizes Admin books before User books and assigns used flag correctly', async () => {
    const res = await api.getBooks({ page: 1, limit: 30 });
    const items = res.items;

    // Check that admin books appear before user books
    let seenUserBook = false;
    for (const book of items) {
      const isAdmin = book.isAdminBook === true || book.owner?.role === 'ADMIN';
      if (!isAdmin) {
        seenUserBook = true;
      }
      if (seenUserBook) {
        // Once we have seen a user book, subsequent books should be user books or have lower/equal priority
        expect(book.isUsed).toBe(true);
      } else {
        expect(book.isUsed).toBe(false);
        expect(book.isAdminBook).toBe(true);
      }
    }

    // Creating user book sets isUsed = true
    const userBook = await api.createBook({
      title: 'Пользовательская книга б/у',
      author: 'Ученик',
      subject: 'Физика',
      grade: 9,
      owner: { role: 'USER', name: 'Ученик' },
    });
    expect(userBook.isUsed).toBe(true);
    expect(userBook.isAdminBook).toBe(false);

    // Creating admin book sets isUsed = false
    const adminBook = await api.createBook({
      title: 'Новая книга администрации',
      author: 'Издательство',
      subject: 'Химия',
      grade: 10,
      owner: { role: 'ADMIN', name: 'BilimKitep Store' },
      isAdminBook: true,
    });
    expect(adminBook.isUsed).toBe(false);
    expect(adminBook.isAdminBook).toBe(true);
  });
});
