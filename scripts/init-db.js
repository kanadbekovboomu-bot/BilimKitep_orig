import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;

if (!connectionString) {
  console.error('[Neon Init] No DATABASE_URL found in environment.');
  process.exit(1);
}

const sql = neon(connectionString);

async function initDb() {
  console.log('[Neon Init] Connecting to Neon Postgres...');

  // 1. Create tables
  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      subject VARCHAR(128),
      grade INT,
      language VARCHAR(16),
      deal_type VARCHAR(32),
      price NUMERIC,
      rent_price_per_month NUMERIC,
      deposit NUMERIC,
      condition VARCHAR(32),
      year INT,
      images JSONB,
      description TEXT,
      status VARCHAR(32) DEFAULT 'AVAILABLE',
      owner JSONB,
      rating NUMERIC DEFAULT 5.0,
      reviews_count INT DEFAULT 0,
      reviews JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(64),
      city VARCHAR(128),
      address TEXT,
      delivery_method VARCHAR(128),
      payment_method VARCHAR(64),
      transaction_id VARCHAR(128),
      items JSONB,
      total_amount NUMERIC,
      deposit_amount NUMERIC,
      rental_start_date VARCHAR(64),
      status VARCHAR(64) DEFAULT 'CONFIRMED',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255),
      password_salt VARCHAR(64),
      phone VARCHAR(64),
      city VARCHAR(128) DEFAULT 'Бишкек',
      role VARCHAR(32) DEFAULT 'USER',
      rating NUMERIC DEFAULT 5.0,
      avatar TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('[Neon Init] Tables created successfully.');

  // 2. Check if users exist and seed initial users
  const existingUsers = await sql`SELECT count(*) FROM users`;
  const userCount = Number(existingUsers[0].count);
  console.log(`[Neon Init] Current users count: ${userCount}`);

  if (userCount === 0) {
    console.log('[Neon Init] Seeding initial users into Neon Postgres...');
    const seedUsers = [
      {
        id: 'a0010000-7c2a-41e9-9011-000000000001',
        name: 'Администратор BilimKitep',
        email: 'admin@bilimkitep.kg',
        phone: '+996 700 000 001',
        role: 'ADMIN',
        city: 'Бишкек',
        rating: 5.0,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=BilimAdmin'
      },
      {
        id: 'a0020000-7c2a-41e9-9011-000000000002',
        name: 'Айбек Нурланов',
        email: 'aibek.n@gmail.com',
        phone: '+996 700 123 456',
        role: 'USER',
        city: 'Бишкек',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'a0030000-7c2a-41e9-9011-000000000003',
        name: 'Чынара Касымова',
        email: 'chynara.k@gmail.com',
        phone: '+996 555 987 654',
        role: 'USER',
        city: 'Ош',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'a0070000-7c2a-41e9-9011-000000000007',
        name: 'kanadbekovboomu',
        email: 'kanadbekovboomu@gmail.com',
        phone: '+996 700 123 456',
        role: 'USER',
        city: 'Бишкек',
        rating: 5.0,
        avatar: ''
      }
    ];

    for (const u of seedUsers) {
      await sql`
        INSERT INTO users (id, name, email, phone, role, city, rating, avatar)
        VALUES (${u.id}, ${u.name}, ${u.email}, ${u.phone}, ${u.role}, ${u.city}, ${u.rating}, ${u.avatar})
        ON CONFLICT (email) DO NOTHING;
      `;
    }
    console.log(`[Neon Init] Seeded ${seedUsers.length} users into Neon Postgres.`);
  }

  // 2. Check if books exist
  const existing = await sql`SELECT count(*) FROM books`;
  const count = Number(existing[0].count);
  console.log(`[Neon Init] Current books count: ${count}`);

  if (count === 0) {
    console.log('[Neon Init] Seeding initial Kyrgyz textbooks...');
    const { INITIAL_BOOKS } = await import('../src/services/api.js');

    for (const b of INITIAL_BOOKS) {
      await sql`
        INSERT INTO books (
          id, title, author, subject, grade, language, deal_type, price,
          rent_price_per_month, deposit, condition, year, images, description,
          status, owner, rating, reviews_count, reviews
        ) VALUES (
          ${b.id}, ${b.title}, ${b.author}, ${b.subject}, ${b.grade}, ${b.language},
          ${b.dealType}, ${b.price}, ${b.rentPricePerMonth}, ${b.deposit}, ${b.condition},
          ${b.year || 2022}, ${JSON.stringify(b.images || [])}, ${b.description},
          ${b.status || 'AVAILABLE'}, ${JSON.stringify(b.owner || {})},
          ${b.rating || 5.0}, ${b.reviewsCount || 0}, ${JSON.stringify(b.reviews || [])}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log(`[Neon Init] Seeded ${INITIAL_BOOKS.length} textbooks into Neon Postgres.`);
  }

  const ver = await sql`SELECT version(), current_database(), now()`;
  console.log('[Neon Init] Verification query SUCCESS:', ver[0]);
}

initDb()
  .then(() => {
    console.log('[Neon Init] Database initialization complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[Neon Init] Failed to initialize database:', err);
    process.exit(1);
  });
