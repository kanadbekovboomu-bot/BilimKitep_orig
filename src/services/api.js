// Hybrid REST API Service with Neon Postgres & LocalStorage fallback
import { neonService, isNeonAvailable } from './neonClient';

const STORAGE_KEY_BOOKS = 'bilimkitep_books_db';
const STORAGE_KEY_ORDERS = 'bilimkitep_orders_db';

export const INITIAL_BOOKS = [
  {
    id: "b_101",
    title: "Геометрия 8-класс",
    author: "И. Б. Бекбоев, А. А. Бөрүбаев",
    subject: "Геометрия",
    grade: 8,
    language: "KG",
    dealType: "RENT",
    price: 320,
    rentPricePerMonth: 40,
    deposit: 150,
    condition: "GOOD",
    year: 2021,
    images: [
      "/covers/geometry-8.svg"
    ],
    description: "Кыргыз тилиндеги 8-класстар үчүн геометрия окуу китеби. Планиметрия, көп бурчтуктар, Пифагордун теоремасы жана фигуралардын аянттары.",
    status: "AVAILABLE",
    owner: {
      id: "u_502",
      name: "Айбек Нурланов",
      phone: "+996 700 123 456",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 7,
    reviews: [
      { id: "r_1", user: "Гульмира М.", rating: 5, date: "15.09.2025", comment: "Китеп эң жакшы абалда экен, ижара абдан ыңгайлуу болду!" },
      { id: "r_2", user: "Бакыт Т.", rating: 5, date: "20.09.2025", comment: "Таза, тыкан китеп. Күрөөнү кайтарып берүү да көйгөйсүз өттү." }
    ]
  },
  {
    id: "b_102",
    title: "Кыргыз тили 7-класс",
    author: "А. Ибраимов, А. Сапарбаев",
    subject: "Кыргыз тили",
    grade: 7,
    language: "KG",
    dealType: "BOTH",
    price: 280,
    rentPricePerMonth: 35,
    deposit: 120,
    condition: "EXCELLENT",
    year: 2022,
    images: [
      "/covers/kyrgyz-7.svg"
    ],
    description: "Жаңыдай сакталган окуу китеби. Кеп маданияты, морфология, этиштер жана бардык эрежелер так берилген.",
    status: "AVAILABLE",
    owner: {
      id: "u_503",
      name: "Чынара Касымова",
      phone: "+996 555 987 654",
      city: "Ош",
      rating: 4.8
    },
    rating: 4.8,
    reviewsCount: 5,
    reviews: [
      { id: "r_3", user: "Нурлан С.", rating: 5, date: "02.10.2025", comment: "Абдан жакшы сакталган китеп, чоң рахмат!" }
    ]
  },
  {
    id: "b_103",
    title: "Алгебра жана анализдин башталышы 10-11-класс",
    author: "А. А. Бөрүбаев, И. Б. Бекбоев",
    subject: "Алгебра",
    grade: 10,
    language: "KG",
    dealType: "RENT",
    price: 450,
    rentPricePerMonth: 50,
    deposit: 200,
    condition: "GOOD",
    year: 2020,
    images: [
      "/covers/algebra-10.svg"
    ],
    description: "Жогорку класстар үчүн алгебра жана анализ окуу китеби. Тригонометриялык функциялар, туунду, интеграл жана экстремумдар.",
    status: "AVAILABLE",
    owner: {
      id: "u_504",
      name: "Марат Осмонов",
      phone: "+996 772 334 455",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 11,
    reviews: []
  },
  {
    id: "b_104",
    title: "Кыргызстан тарыхы 9-класс",
    author: "Т. Чоротегин, Ө. Осмонов",
    subject: "Тарых",
    grade: 9,
    language: "KG",
    dealType: "BOTH",
    price: 320,
    rentPricePerMonth: 40,
    deposit: 150,
    condition: "EXCELLENT",
    year: 2023,
    images: [
      "/covers/history-9.svg"
    ],
    description: "Кыргызстандын байыркы доордон бүгүнкү күнгө чейинки тарыхы. Бурана мунарасы, Улуу Жибек жолу, тарыхый карталар.",
    status: "AVAILABLE",
    owner: {
      id: "u_505",
      name: "Асел Жумабекова",
      phone: "+996 708 221 144",
      city: "Жалал-Абад",
      rating: 4.7
    },
    rating: 4.7,
    reviewsCount: 4,
    reviews: []
  },
  {
    id: "b_105",
    title: "ЖРТ Математика: Алтын Сертификатка жол",
    author: "С. Акматов, Б. Садыков",
    subject: "ОРТ / ЖРТ",
    grade: 11,
    language: "KG",
    dealType: "BUY",
    price: 490,
    rentPricePerMonth: 60,
    deposit: 250,
    condition: "NEW",
    year: 2024,
    images: [
      "/covers/ort-math.svg"
    ],
    description: "Жалпы республикалык тестирлөөгө (ЖРТ/ОРТ) даярдануу үчүн 1500дөн ашык тесттер жана алардын толук чыгарылыштары.",
    status: "AVAILABLE",
    owner: {
      id: "u_506",
      name: "Билим Борбору «Келечек»",
      phone: "+996 312 900 100",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 19,
    reviews: []
  },
  {
    id: "b_106",
    title: "Физика 9-класс (на русском языке)",
    author: "Э. Мамбетакунов, В. Гутник",
    subject: "Физика",
    grade: 9,
    language: "RU",
    dealType: "RENT",
    price: 350,
    rentPricePerMonth: 45,
    deposit: 160,
    condition: "GOOD",
    year: 2021,
    images: [
      "/covers/physics-9.svg"
    ],
    description: "Официальный учебник физики для 9 классов общеобразовательных школ. Законы механики, электромагнитные волны, оптика, квантовая физика.",
    status: "AVAILABLE",
    owner: {
      id: "u_507",
      name: "Елена Смирнова",
      phone: "+996 550 445 566",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 8,
    reviews: []
  },
  {
    id: "b_107",
    title: "Химия 8-класс (на русском языке)",
    author: "С. Сатыбалдиев, О. Рудзитис",
    subject: "Химия",
    grade: 8,
    language: "RU",
    dealType: "BOTH",
    price: 300,
    rentPricePerMonth: 40,
    deposit: 140,
    condition: "EXCELLENT",
    year: 2022,
    images: [
      "/covers/chemistry-8.svg"
    ],
    description: "Базовый учебник неорганической химии для 8 класса. Периодический закон Д. И. Менделеева, химические формулы, реакции и лабораторные опыты.",
    status: "AVAILABLE",
    owner: {
      id: "u_502",
      name: "Айбек Нурланов",
      phone: "+996 700 123 456",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 3,
    reviews: []
  },
  {
    id: "b_108",
    title: "English 6 (Student's Book)",
    author: "В. Эванс, А. Алымова",
    subject: "Англис тили",
    grade: 6,
    language: "EN",
    dealType: "RENT",
    price: 400,
    rentPricePerMonth: 50,
    deposit: 180,
    condition: "GOOD",
    year: 2023,
    images: [
      "/covers/english-6.svg"
    ],
    description: "Кыргызстан мектептеринин 6-класстары үчүн англис тили окуу китеби. Грамматика, лексикалык темалар, диалогдор жана көнүгүүлөр.",
    status: "AVAILABLE",
    owner: {
      id: "u_508",
      name: "Каныкей Асанбекова",
      phone: "+996 770 889 900",
      city: "Каракол",
      rating: 4.6
    },
    rating: 4.6,
    reviewsCount: 2,
    reviews: []
  },
  {
    id: "b_109",
    title: "Манас таануу 5-класс",
    author: "С. Байгазиев",
    subject: "Манас таануу",
    grade: 5,
    language: "KG",
    dealType: "BOTH",
    price: 250,
    rentPricePerMonth: 30,
    deposit: 100,
    condition: "EXCELLENT",
    year: 2021,
    images: [
      "/covers/manas-5.svg"
    ],
    description: "Улуу «Манас» эпосун үйрөнүүчү 5-класстын окуу куралы. Айкөл Манастын баатырдык эрдиктери жана көркөм сүрөттөр.",
    status: "AVAILABLE",
    owner: {
      id: "u_509",
      name: "Бектур Токтогулов",
      phone: "+996 702 331 122",
      city: "Нарын",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 6,
    reviews: []
  },
  {
    id: "b_110",
    title: "Биология: Адам жана ден соолук 8-класс",
    author: "Ж. Абдырахманов, Д. Тентимишев",
    subject: "Биология",
    grade: 8,
    language: "KG",
    dealType: "RENT",
    price: 310,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "GOOD",
    year: 2020,
    images: [
      "/covers/biology-8.svg"
    ],
    description: "8-класс үчүн адам анатомиясы жана физиологиясы. Органдар системасы, ДНК, кан айлануу жана ден соолукту сактоо эрежелери.",
    status: "AVAILABLE",
    owner: {
      id: "u_503",
      name: "Чынара Касымова",
      phone: "+996 555 987 654",
      city: "Ош",
      rating: 4.8
    },
    rating: 4.8,
    reviewsCount: 4,
    reviews: []
  },
  {
    id: "b_111",
    title: "Русский язык 5-класс",
    author: "М. М. Разумовская, П. Лекант",
    subject: "Русский язык",
    grade: 5,
    language: "RU",
    dealType: "BOTH",
    price: 290,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "EXCELLENT",
    year: 2022,
    images: [
      "/covers/russian-5.svg"
    ],
    description: "Учебник русского языка для школ с русским языком обучения. Все правила орфографии, синтаксис, теория и практические упражнения.",
    status: "AVAILABLE",
    owner: {
      id: "u_507",
      name: "Елена Смирнова",
      phone: "+996 550 445 566",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 9,
    reviews: []
  },
  {
    id: "b_112",
    title: "ЖРТ Кыргыз тили жана окуу боюнча колдонмо",
    author: "Г. Орозова, Т. Бакасова",
    subject: "ОРТ / ЖРТ",
    grade: 11,
    language: "KG",
    dealType: "BUY",
    price: 390,
    rentPricePerMonth: 45,
    deposit: 180,
    condition: "NEW",
    year: 2024,
    images: [
      "/covers/ort-kyrgyz.svg"
    ],
    description: "ЖРТ негизги тесттин кыргыз тили бөлүмү: аналогиялар, сүйлөм толуктоо жана текстти түшүнүү боюнча тесттердин толук чыгарылышы.",
    status: "AVAILABLE",
    owner: {
      id: "u_506",
      name: "Билим Борбору «Келечек»",
      phone: "+996 312 900 100",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 14,
    reviews: []
  }
];

const getStoredBooks = () => {
  if (typeof window === 'undefined') return INITIAL_BOOKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    const parsed = JSON.parse(raw);
    // If stored books have old unsplash links, refresh to new vector textbook covers
    const hasOldImages = Array.isArray(parsed) && parsed.some(b => b.images?.[0]?.includes('unsplash.com'));
    if (hasOldImages) {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return parsed;
  } catch {
    return INITIAL_BOOKS;
  }
};

const saveStoredBooks = (books) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
  }
};

const getStoredOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredOrders = (orders) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }
};

// Simulated delay helper
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Books CRUD
  async getBooks(params = {}) {
    if (isNeonAvailable()) {
      try {
        const res = await neonService.getBooks(params);
        return res;
      } catch (err) {
        console.warn('[API] Neon getBooks fallback to local:', err.message);
      }
    }

    await delay();
    let books = getStoredBooks();

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      books = books.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q)
      );
    }

    if (params.grade && params.grade !== 'all') {
      books = books.filter(b => String(b.grade) === String(params.grade));
    }

    if (params.language && params.language !== 'all') {
      books = books.filter(b => b.language.toUpperCase() === params.language.toUpperCase());
    }

    if (params.dealType && params.dealType !== 'all') {
      books = books.filter(b => b.dealType === params.dealType || b.dealType === 'BOTH');
    }

    if (params.minPrice) {
      books = books.filter(b => b.price >= Number(params.minPrice));
    }

    if (params.maxPrice) {
      books = books.filter(b => b.price <= Number(params.maxPrice));
    }

    // Sorting
    if (params.sort === 'priceAsc') {
      books.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'priceDesc') {
      books.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      books.sort((a, b) => b.rating - a.rating);
    } else {
      // Newest
      books.sort((a, b) => (b.year || 2020) - (a.year || 2020));
    }

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 12;
    const totalItems = books.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedItems = books.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems,
      totalItems,
      totalPages,
      page,
      limit,
    };
  },

  async getBookById(id) {
    if (isNeonAvailable()) {
      try {
        const book = await neonService.getBookById(id);
        return book;
      } catch (err) {
        console.warn('[API] Neon getBookById fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const book = books.find(b => b.id === id);
    if (!book) throw new Error(`Учебник с ID ${id} не найден`);
    return book;
  },

  async createBook(bookData) {
    if (isNeonAvailable()) {
      try {
        const created = await neonService.createBook(bookData);
        // Also sync local
        const books = getStoredBooks();
        books.unshift(created);
        saveStoredBooks(books);
        return created;
      } catch (err) {
        console.warn('[API] Neon createBook fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const newBook = {
      id: `b_${Date.now()}`,
      status: 'AVAILABLE',
      rating: 5.0,
      reviewsCount: 0,
      reviews: [],
      images: bookData.images && bookData.images.length > 0
        ? bookData.images
        : ["/covers/geometry-8.svg"],
      ...bookData,
      grade: Number(bookData.grade) || 8,
      price: Number(bookData.price) || 300,
      rentPricePerMonth: Number(bookData.rentPricePerMonth) || 40,
      deposit: Number(bookData.deposit) || 150,
    };
    books.unshift(newBook);
    saveStoredBooks(books);
    return newBook;
  },

  async updateBook(id, updateData) {
    if (isNeonAvailable()) {
      try {
        const updated = await neonService.updateBook(id, updateData);
        const books = getStoredBooks();
        const index = books.findIndex(b => b.id === id);
        if (index > -1) {
          books[index] = updated;
          saveStoredBooks(books);
        }
        return updated;
      } catch (err) {
        console.warn('[API] Neon updateBook fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) throw new Error(`Учебник с ID ${id} не найден`);
    books[index] = { ...books[index], ...updateData };
    saveStoredBooks(books);
    return books[index];
  },

  async deleteBook(id) {
    if (isNeonAvailable()) {
      try {
        await neonService.deleteBook(id);
      } catch (err) {
        console.warn('[API] Neon deleteBook fallback to local:', err.message);
      }
    }

    await delay();
    let books = getStoredBooks();
    books = books.filter(b => b.id !== id);
    saveStoredBooks(books);
    return { success: true, id };
  },

  async addReview(bookId, review) {
    if (isNeonAvailable()) {
      try {
        const updated = await neonService.addReview(bookId, review);
        return updated;
      } catch (err) {
        console.warn('[API] Neon addReview fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error('Книга не найдена');
    const newReview = {
      id: `r_${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU'),
      ...review,
    };
    book.reviews = book.reviews || [];
    book.reviews.unshift(newReview);
    book.reviewsCount = book.reviews.length;
    const sum = book.reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0);
    book.rating = Number((sum / book.reviewsCount).toFixed(1));
    saveStoredBooks(books);
    return book;
  },

  // Orders CRUD
  async createOrder(orderData) {
    if (isNeonAvailable()) {
      try {
        const newOrder = await neonService.createOrder(orderData);
        const orders = getStoredOrders();
        orders.unshift(newOrder);
        saveStoredOrders(orders);
        return newOrder;
      } catch (err) {
        console.warn('[API] Neon createOrder fallback to local:', err.message);
      }
    }

    await delay();
    const orders = getStoredOrders();
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      ...orderData,
    };
    orders.unshift(newOrder);
    saveStoredOrders(orders);
    return newOrder;
  },

  async getOrders() {
    if (isNeonAvailable()) {
      try {
        const orders = await neonService.getOrders();
        return orders;
      } catch (err) {
        console.warn('[API] Neon getOrders fallback to local:', err.message);
      }
    }

    await delay();
    return getStoredOrders();
  },

  // Admin Metrics
  async getAdminMetrics() {
    if (isNeonAvailable()) {
      try {
        const metrics = await neonService.getAdminMetrics();
        return metrics;
      } catch (err) {
        console.warn('[API] Neon getAdminMetrics fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const orders = getStoredOrders();

    const revenue = orders.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0) + 18450;
    const depositPool = orders.reduce((acc, o) => acc + (Number(o.depositAmount) || 0), 0) + 6200;

    return {
      totalRevenue: revenue,
      activeRentals: orders.length + 42,
      totalBooks: books.length,
      depositPool: depositPool,
      chartData: [
        { month: 'Сентябрь', revenue: 14200, rentals: 35 },
        { month: 'Октябрь', revenue: 18400, rentals: 48 },
        { month: 'Ноябрь', revenue: 12100, rentals: 29 },
        { month: 'Декабрь', revenue: 9500, rentals: 22 },
        { month: 'Январь', revenue: 16800, rentals: 41 },
        { month: 'Февраль', revenue: 21300, rentals: 54 },
      ],
      categoriesData: [
        { name: 'Математика / Алгебра', value: 35 },
        { name: 'Кыргыз тили / Адабият', value: 25 },
        { name: 'ОРТ / ЖРТ пособия', value: 20 },
        { name: 'Табигый илимдер (Физика/Химия)', value: 15 },
        { name: 'Чет тилдери', value: 5 },
      ]
    };
  }
};
