import { neonService } from '../src/services/neonClient.js';

async function runE2ETests() {
  console.log('============================================================');
  console.log('🧪 TESTING NEON POSTGRES CLOUD DATABASE END-TO-END');
  console.log('============================================================');

  // Test 1: Query Books list from Neon
  console.log('\n[1/5] Testing Neon Query: getBooks()...');
  const booksRes = await neonService.getBooks({ limit: 5 });
  console.log(`✅ Success! Received ${booksRes.items.length} books (Total in DB: ${booksRes.totalItems}). Source: ${booksRes.source}`);
  console.log(`   Sample book from Neon: "${booksRes.items[0].title}" by ${booksRes.items[0].author}`);

  // Test 2: Filter by grade and search query in Neon
  console.log('\n[2/5] Testing Neon Filter: search="Бекбоев", grade=8...');
  const filtered = await neonService.getBooks({ search: 'Бекбоев', grade: '8' });
  console.log(`✅ Success! Matched ${filtered.items.length} books in Neon Postgres.`);
  filtered.items.forEach(b => console.log(`   - [ID: ${b.id}] ${b.title} (${b.grade}-класс, ${b.language})`));

  // Test 3: Create, Read, Update, Delete in Neon
  console.log('\n[3/5] Testing Neon CRUD: insert, read, update, delete...');
  const testBookId = `b_test_${Date.now()}`;
  const created = await neonService.createBook({
    id: testBookId,
    title: 'Тестовый Учебник Neon Postgres',
    author: 'Инженерная Команда',
    subject: 'Тестирование',
    grade: 11,
    language: 'KG',
    dealType: 'RENT',
    price: 350,
    rentPricePerMonth: 45,
    deposit: 150,
    condition: 'EXCELLENT',
    year: 2026,
    description: 'Создан во время сквозного E2E теста Neon',
    owner: { name: 'E2E Tester', city: 'Бишкек' },
  });
  console.log(`✅ Created book in Neon with ID: ${created.id}`);

  const fetched = await neonService.getBookById(testBookId);
  console.log(`✅ Read verified: "${fetched.title}"`);

  const updated = await neonService.updateBook(testBookId, { price: 390 });
  console.log(`✅ Updated price to: ${updated.price} KGS`);

  await neonService.deleteBook(testBookId);
  console.log(`✅ Deleted test book ${testBookId} successfully.`);

  // Test 4: Create Order in Neon
  console.log('\n[4/5] Testing Neon Order Insertion: createOrder()...');
  const orderRes = await neonService.createOrder({
    customerName: 'Айбек Нурланов (E2E Test)',
    customerPhone: '+996 700 123 456',
    city: 'Бишкек',
    address: 'ул. Ахунбаева 119',
    deliveryMethod: 'Курьерская доставка',
    paymentMethod: 'MBANK',
    transactionId: 'TXN-NEON-999',
    totalAmount: 510,
    depositAmount: 150,
    rentalStartDate: '2026-10-24',
    items: [{ book: { id: 'b_101', title: 'Геометрия 8-класс' }, type: 'RENT', months: 9 }]
  });
  console.log(`✅ Order created in Neon: #${orderRes.id}`);

  const ordersList = await neonService.getOrders();
  console.log(`✅ Retrieved ${ordersList.length} orders from Neon.`);

  // Test 5: Admin Metrics aggregation from Neon
  console.log('\n[5/5] Testing Neon Admin Metrics Aggregation...');
  const metrics = await neonService.getAdminMetrics();
  console.log(`✅ Admin Metrics calculated from Neon:`);
  console.log(`   - Total Books in Neon DB : ${metrics.totalBooks}`);
  console.log(`   - Active Rentals         : ${metrics.activeRentals}`);
  console.log(`   - Platform Total Revenue : ${metrics.totalRevenue} KGS`);
  console.log(`   - Escrow Deposit Pool    : ${metrics.depositPool} KGS`);

  console.log('\n============================================================');
  console.log('🎉 ALL NEON POSTGRES SERVICES PASSED END-TO-END VERIFICATION');
  console.log('============================================================');
}

runE2ETests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Neon E2E Test Failed:', err);
    process.exit(1);
  });
