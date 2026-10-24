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

  console.log('[Neon Init] Tables created successfully.');

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
