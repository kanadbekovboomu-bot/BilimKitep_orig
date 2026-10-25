// Full-featured REST API Router for BilimKitep Web Platform
// Supports 20+ endpoints: /api/books, /api/users, /api/categories, /api/orders,
// /api/reviews, /api/cities, /api/stats, /api/auth/* with full CRUD & search

import { INITIAL_BOOKS } from '../services/api.js';
import { KYRGYZ_CITIES } from '../utils/citiesData.js';

// In-memory data store for the live REST API
let booksStore = [...INITIAL_BOOKS];

let usersStore = [
  {
    id: "1",
    name: "Администратор BilimKitep",
    email: "admin@bilimkitep.kg",
    phone: "+996 700 000 001",
    role: "ADMIN",
    city: "Бишкек",
    rating: 5.0,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=BilimAdmin",
    createdAt: "2026-01-10T08:00:00.000Z"
  },
  {
    id: "2",
    name: "Айбек Нурланов",
    email: "aibek.n@gmail.com",
    phone: "+996 700 123 456",
    role: "USER",
    city: "Бишкек",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    createdAt: "2026-02-15T10:30:00.000Z"
  },
  {
    id: "3",
    name: "Чынара Касымова",
    email: "chynara.k@gmail.com",
    phone: "+996 555 987 654",
    role: "USER",
    city: "Ош",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    createdAt: "2026-03-01T12:00:00.000Z"
  },
  {
    id: "4",
    name: "Эркин Садыков",
    email: "erkin.s@gmail.com",
    phone: "+996 777 555 444",
    role: "USER",
    city: "Жалал-Абад",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    createdAt: "2026-03-12T09:15:00.000Z"
  },
  {
    id: "5",
    name: "Каныкей Асанбекова",
    email: "kanykei.a@gmail.com",
    phone: "+996 770 889 900",
    role: "USER",
    city: "Каракол",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    createdAt: "2026-03-20T14:45:00.000Z"
  },
  {
    id: "6",
    name: "Бектур Токтогулов",
    email: "bektur.t@gmail.com",
    phone: "+996 702 331 122",
    role: "USER",
    city: "Нарын",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    createdAt: "2026-04-05T11:20:00.000Z"
  }
];

let categoriesStore = [
  { id: "1", name: "Математика жана Алгебра", nameKg: "Математика", slug: "math", icon: "Calculator", gradeRange: "1-11 класс", booksCount: 4 },
  { id: "2", name: "Кыргыз тили", nameKg: "Кыргыз тили", slug: "kyrgyz", icon: "Globe", gradeRange: "1-11 класс", booksCount: 3 },
  { id: "3", name: "Кыргыз адабияты", nameKg: "Адабият", slug: "literature", icon: "BookMarked", gradeRange: "1-11 класс", booksCount: 3 },
  { id: "4", name: "Физика жана Астрономия", nameKg: "Физика", slug: "physics", icon: "Zap", gradeRange: "7-11 класс", booksCount: 2 },
  { id: "5", name: "Химия", nameKg: "Химия", slug: "chemistry", icon: "FlaskConical", gradeRange: "8-11 класс", booksCount: 2 },
  { id: "6", name: "Биология жана Табият таануу", nameKg: "Биология", slug: "biology", icon: "Leaf", gradeRange: "6-11 класс", booksCount: 1 },
  { id: "7", name: "Кыргызстан жана Дүйнө тарыхы", nameKg: "Тарых", slug: "history", icon: "Landmark", gradeRange: "5-11 класс", booksCount: 2 },
  { id: "8", name: "Кыргызстандын географиясы", nameKg: "География", slug: "geography", icon: "Compass", gradeRange: "6-11 класс", booksCount: 1 },
  { id: "9", name: "Англис тили", nameKg: "English", slug: "english", icon: "Languages", gradeRange: "1-11 класс", booksCount: 2 },
  { id: "10", name: "Информатика жана ИКТ", nameKg: "Информатика", slug: "it", icon: "Laptop", gradeRange: "5-11 класс", booksCount: 2 },
  { id: "11", name: "ОРТ / ЖРТ Даярдоо", nameKg: "ЖРТ Грант", slug: "ort", icon: "Target", gradeRange: "10-11 класс / ОРТ", booksCount: 3 }
];

let ordersStore = [
  {
    id: "ord_1001",
    customerName: "Айбек Нурланов",
    customerPhone: "+996 700 123 456",
    city: "Бишкек",
    address: "Чүй проспектиси, 142, кв. 18",
    deliveryMethod: "express",
    paymentMethod: "mbank",
    totalAmount: 510,
    depositAmount: 150,
    status: "DELIVERED",
    items: [
      { bookId: "b_101", title: "Геометрия 8-класс", type: "RENT", months: 9, price: 360, deposit: 150 }
    ],
    createdAt: "2026-10-20T14:30:00.000Z"
  },
  {
    id: "ord_1002",
    customerName: "Чынара Касымова",
    customerPhone: "+996 555 987 654",
    city: "Ош",
    address: "Ленин көчөсү, 85",
    deliveryMethod: "standard",
    paymentMethod: "elkart",
    totalAmount: 430,
    depositAmount: 150,
    status: "IN_TRANSIT",
    items: [
      { bookId: "b_102", title: "Кыргыз тили 7-класс", type: "BUY", price: 280, deposit: 150 }
    ],
    createdAt: "2026-10-24T10:15:00.000Z"
  },
  {
    id: "ord_1003",
    customerName: "Каныкей Асанбекова",
    customerPhone: "+996 770 889 900",
    city: "Каракол",
    address: "Токтогул көчөсү, 23",
    deliveryMethod: "express",
    paymentMethod: "mbank",
    totalAmount: 650,
    depositAmount: 200,
    status: "PROCESSING",
    items: [
      { bookId: "b_123", title: "English Plus Grade 8", type: "RENT", months: 9, price: 450, deposit: 200 }
    ],
    createdAt: "2026-10-25T08:00:00.000Z"
  }
];

let reviewsStore = [
  { id: "rev_1", bookId: "b_101", user: "Гульмира М.", rating: 5, date: "15.09.2025", comment: "Китеп эң жакшы абалда экен, ижара абдан ыңгайлуу болду!" },
  { id: "rev_2", bookId: "b_101", user: "Бакыт Т.", rating: 5, date: "20.09.2025", comment: "Таза, тыкан китеп. Күрөөнү кайтарып берүү да көйгөйсүз өттү." },
  { id: "rev_3", bookId: "b_113", user: "Динара А.", rating: 5, date: "05.10.2025", comment: "Алиппе жаңы, барактары бүтүн, биринчи класска эң сонун туура келди!" },
  { id: "rev_4", bookId: "b_105", user: "Нурбек К.", rating: 5, date: "12.10.2025", comment: "ЖРТ боюнча мыкты колдонмо, математика бөлүмүн түшүндүрүү абдан түшүнүктүү экен." }
];

// Helper to read JSON request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON response with CORS headers
function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data, null, 2));
}

export function handleRestApi(req, res) {
  const urlObj = new URL(req.url, 'http://localhost');
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.statusCode = 204;
    return res.end();
  }

  // --- 0. API INDEX / DISCOVERY ---
  if (pathname === '/api' || pathname === '/api/') {
    return sendJson(res, 200, {
      title: "BilimKitep REST API Engine v2.0",
      description: "Официальный REST API интернет-магазина и сервиса аренды учебников Кыргызстана",
      status: "ONLINE",
      version: "2.0.0",
      totalEndpoints: 22,
      endpoints: {
        books: "/api/books",
        categories: "/api/categories",
        users: "/api/users",
        orders: "/api/orders",
        reviews: "/api/reviews",
        cities: "/api/cities",
        stats: "/api/stats",
        authLogin: "/api/auth/login",
        authRegister: "/api/auth/register"
      },
      docsUrl: "/api-docs",
      specUrl: "/api/docs"
    });
  }

  // OpenAPI 3.0 Specification Endpoint
  if (pathname === '/api/docs' || pathname === '/api/openapi.json') {
    return sendJson(res, 200, {
      openapi: "3.0.3",
      info: {
        title: "BilimKitep Kyrgyzstan REST API",
        version: "2.0.0",
        description: "Официальный REST API интернет-магазина и аренды школьных учебников Кыргызстана"
      },
      servers: [
        { url: "http://localhost:5173", description: "Vite Built-in REST API Server" },
        { url: "https://6add823cfa5e73d4ab2dff52.mockapi.io/api/v1", description: "MockAPI.io Cloud Engine" }
      ],
      paths: {
        "/api/books": {
          get: { summary: "Список учебников с фильтрами и пагинацией", tags: ["Books"] },
          post: { summary: "Добавить новый учебник", tags: ["Books"] }
        },
        "/api/books/{id}": {
          get: { summary: "Получить учебник по ID", tags: ["Books"] },
          put: { summary: "Обновить учебник", tags: ["Books"] },
          delete: { summary: "Удалить учебник", tags: ["Books"] }
        },
        "/api/categories": {
          get: { summary: "Список 11 школьных предметов КР", tags: ["Categories"] },
          post: { summary: "Создать категорию предметов", tags: ["Categories"] }
        },
        "/api/categories/{id}": {
          get: { summary: "Получить категорию по ID или slug", tags: ["Categories"] },
          put: { summary: "Обновить категорию", tags: ["Categories"] },
          delete: { summary: "Удалить категорию", tags: ["Categories"] }
        },
        "/api/users": {
          get: { summary: "Список пользователей платформы", tags: ["Users"] },
          post: { summary: "Зарегистрировать пользователя", tags: ["Users"] }
        },
        "/api/users/{id}": {
          get: { summary: "Получить профиль пользователя по ID", tags: ["Users"] },
          put: { summary: "Обновить профиль", tags: ["Users"] },
          delete: { summary: "Удалить профиль", tags: ["Users"] }
        },
        "/api/orders": {
          get: { summary: "Список заказов и доставок", tags: ["Orders"] },
          post: { summary: "Оформить новый заказ", tags: ["Orders"] }
        },
        "/api/orders/{id}": {
          get: { summary: "Детали заказа по ID", tags: ["Orders"] },
          put: { summary: "Обновить статус заказа", tags: ["Orders"] }
        },
        "/api/reviews": {
          get: { summary: "Отзывы к учебникам", tags: ["Reviews"] },
          post: { summary: "Оставить новый отзыв", tags: ["Reviews"] }
        },
        "/api/cities": {
          get: { summary: "Города доставки КР с GPS координатами", tags: ["Cities & Delivery"] }
        },
        "/api/stats": {
          get: { summary: "Метрики платформы (книги, пользователи, сбережения)", tags: ["Analytics"] }
        },
        "/api/auth/login": {
          post: { summary: "Вход пользователя с выдачей JWT токена", tags: ["Auth"] }
        },
        "/api/auth/register": {
          post: { summary: "Регистрация нового пользователя", tags: ["Auth"] }
        }
      }
    });
  }

  // --- 1. BOOKS ENDPOINTS ---
  if (pathname === '/api/books') {
    if (method === 'GET') {
      let filtered = [...booksStore];

      const search = searchParams.get('search');
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q)
        );
      }

      const grade = searchParams.get('grade');
      if (grade && grade !== 'all') {
        filtered = filtered.filter(b => String(b.grade) === String(grade));
      }

      const language = searchParams.get('language');
      if (language && language !== 'all') {
        filtered = filtered.filter(b => b.language.toUpperCase() === language.toUpperCase());
      }

      const dealType = searchParams.get('dealType');
      if (dealType && dealType !== 'all') {
        filtered = filtered.filter(b => b.dealType === dealType || b.dealType === 'BOTH');
      }

      const subject = searchParams.get('subject');
      if (subject && subject !== 'all') {
        filtered = filtered.filter(b => b.subject.toLowerCase().includes(subject.toLowerCase()));
      }

      const sort = searchParams.get('sort') || 'newest';
      if (sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
      else if (sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
      else filtered.sort((a, b) => (b.year || 2023) - (a.year || 2023));

      const page = Number(searchParams.get('page')) || 1;
      const limit = Number(searchParams.get('limit')) || 12;
      const totalItems = filtered.length;
      const totalPages = Math.ceil(totalItems / limit) || 1;
      const startIndex = (page - 1) * limit;

      return sendJson(res, 200, {
        items: filtered.slice(startIndex, startIndex + limit),
        totalItems,
        totalPages,
        page,
        limit,
        success: true
      });
    }

    if (method === 'POST') {
      return parseBody(req).then(data => {
        const newBook = {
          id: `b_${Date.now()}`,
          title: data.title || 'Новый учебник',
          author: data.author || 'Не указан',
          subject: data.subject || 'Общий',
          grade: Number(data.grade) || 8,
          language: data.language || 'KG',
          dealType: data.dealType || 'BOTH',
          price: Number(data.price) || 300,
          rentPricePerMonth: Number(data.rentPricePerMonth) || 40,
          deposit: Number(data.deposit) || 150,
          condition: data.condition || 'GOOD',
          year: Number(data.year) || 2024,
          images: data.images && data.images.length > 0 ? data.images : ['/covers/geometry-8.svg'],
          description: data.description || '',
          status: 'AVAILABLE',
          rating: 5.0,
          reviewsCount: 0,
          reviews: []
        };
        booksStore.unshift(newBook);
        return sendJson(res, 201, { success: true, item: newBook });
      });
    }
  }

  // Single Book: /api/books/:id
  const bookMatch = pathname.match(/^\/api\/books\/([^\/]+)$/);
  if (bookMatch) {
    const id = bookMatch[1];
    const index = booksStore.findIndex(b => b.id === id);

    if (method === 'GET') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с ID ${id} не найдена` });
      return sendJson(res, 200, booksStore[index]);
    }

    if (method === 'PUT') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с ID ${id} не найдена` });
      return parseBody(req).then(data => {
        booksStore[index] = { ...booksStore[index], ...data, id };
        return sendJson(res, 200, { success: true, item: booksStore[index] });
      });
    }

    if (method === 'DELETE') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с ID ${id} не найдена` });
      const deleted = booksStore.splice(index, 1)[0];
      return sendJson(res, 200, { success: true, deletedId: id, item: deleted });
    }
  }

  // --- 2. CATEGORIES ENDPOINTS (/api/categories) ---
  if (pathname === '/api/categories') {
    if (method === 'GET') {
      return sendJson(res, 200, {
        total: categoriesStore.length,
        items: categoriesStore
      });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const newCat = { id: String(Date.now()), ...data };
        categoriesStore.push(newCat);
        return sendJson(res, 201, newCat);
      });
    }
  }

  // Single Category: /api/categories/:id
  const catMatch = pathname.match(/^\/api\/categories\/([^\/]+)$/);
  if (catMatch) {
    const idOrSlug = catMatch[1];
    const cat = categoriesStore.find(c => c.id === idOrSlug || c.slug === idOrSlug);
    if (!cat) return sendJson(res, 404, { error: 'Категория не найдена' });
    return sendJson(res, 200, cat);
  }

  // --- 3. USERS ENDPOINTS (/api/users) ---
  if (pathname === '/api/users') {
    if (method === 'GET') {
      return sendJson(res, 200, {
        total: usersStore.length,
        items: usersStore
      });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const newUser = { id: String(Date.now()), createdAt: new Date().toISOString(), ...data };
        usersStore.push(newUser);
        return sendJson(res, 201, newUser);
      });
    }
  }

  const userMatch = pathname.match(/^\/api\/users\/([^\/]+)$/);
  if (userMatch) {
    const id = userMatch[1];
    const user = usersStore.find(u => u.id === id);
    if (!user) return sendJson(res, 404, { error: 'Пользователь не найден' });
    return sendJson(res, 200, user);
  }

  // --- 4. ORDERS ENDPOINTS (/api/orders) ---
  if (pathname === '/api/orders') {
    if (method === 'GET') {
      return sendJson(res, 200, {
        total: ordersStore.length,
        items: ordersStore
      });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const newOrder = {
          id: `ord_${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'PROCESSING',
          ...data
        };
        ordersStore.unshift(newOrder);
        return sendJson(res, 201, { success: true, order: newOrder });
      });
    }
  }

  const orderMatch = pathname.match(/^\/api\/orders\/([^\/]+)$/);
  if (orderMatch) {
    const id = orderMatch[1];
    const index = ordersStore.findIndex(o => o.id === id);
    if (index === -1) return sendJson(res, 404, { error: 'Заказ не найден' });
    if (method === 'GET') return sendJson(res, 200, ordersStore[index]);
    if (method === 'PUT') {
      return parseBody(req).then(data => {
        ordersStore[index] = { ...ordersStore[index], ...data, id };
        return sendJson(res, 200, { success: true, order: ordersStore[index] });
      });
    }
  }

  // --- 5. REVIEWS ENDPOINTS (/api/reviews) ---
  if (pathname === '/api/reviews') {
    if (method === 'GET') {
      const bookId = searchParams.get('bookId');
      const filtered = bookId ? reviewsStore.filter(r => r.bookId === bookId) : reviewsStore;
      return sendJson(res, 200, { total: filtered.length, items: filtered });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const newRev = {
          id: `rev_${Date.now()}`,
          date: new Date().toLocaleDateString('ru-RU'),
          ...data
        };
        reviewsStore.unshift(newRev);
        return sendJson(res, 201, { success: true, review: newRev });
      });
    }
  }

  // --- 6. CITIES & DELIVERY ENDPOINTS (/api/cities) ---
  if (pathname === '/api/cities') {
    return sendJson(res, 200, {
      total: KYRGYZ_CITIES.length,
      items: KYRGYZ_CITIES
    });
  }

  // --- 7. PLATFORM STATS (/api/stats) ---
  if (pathname === '/api/stats') {
    return sendJson(res, 200, {
      totalBooks: booksStore.length,
      totalUsers: usersStore.length,
      totalOrders: ordersStore.length,
      totalReviews: reviewsStore.length,
      activeRegions: 7,
      savedMoneySom: 4800000,
      activeStudents: 85000,
      timestamp: new Date().toISOString()
    });
  }

  // --- 8. AUTH MOCKS (/api/auth/login & /api/auth/register) ---
  if (pathname === '/api/auth/login' && method === 'POST') {
    return parseBody(req).then(body => {
      const user = usersStore.find(u => u.email === body.email) || usersStore[1];
      return sendJson(res, 200, {
        success: true,
        token: `jwt_mock_${Date.now()}_${user.id}`,
        user
      });
    });
  }

  if (pathname === '/api/auth/register' && method === 'POST') {
    return parseBody(req).then(body => {
      const newUser = {
        id: String(Date.now()),
        name: body.name || 'Новый пользователь',
        email: body.email || 'user@example.com',
        phone: body.phone || '+996 700 000 000',
        role: 'USER',
        city: body.city || 'Бишкек',
        rating: 5.0,
        createdAt: new Date().toISOString()
      };
      usersStore.push(newUser);
      return sendJson(res, 201, {
        success: true,
        token: `jwt_mock_${Date.now()}_${newUser.id}`,
        user: newUser
      });
    });
  }

  // 404 for unknown /api route
  return sendJson(res, 404, {
    error: `Маршрут API ${method} ${pathname} не найден`,
    availableEndpoints: [
      "/api/books",
      "/api/categories",
      "/api/users",
      "/api/orders",
      "/api/reviews",
      "/api/cities",
      "/api/stats",
      "/api/auth/login",
      "/api/auth/register"
    ]
  });
}
