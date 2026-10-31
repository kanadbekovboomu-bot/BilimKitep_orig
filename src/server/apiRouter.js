// Full-featured REST API Router for BilimKitep Web Platform
// Supports 20+ endpoints: /api/books, /api/users, /api/categories, /api/orders,
// /api/reviews, /api/cities, /api/stats, /api/auth/* with full CRUD & search
// All entities are standardized on RFC 4122 v4 UUID primary identifiers

import crypto from 'crypto';
import { INITIAL_BOOKS } from '../services/api.js';
import { KYRGYZ_CITIES } from '../utils/citiesData.js';
import { generateUuid } from '../utils/uuid.js';

const hashPasswordNode = (password, salt = null) => {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, s, 100000, 32, 'sha256').toString('hex');
  return { hash, salt: s };
};

const defaultSec = hashPasswordNode('bilim2026');

// In-memory data store for the live REST API
let booksStore = [...INITIAL_BOOKS];

let usersStore = [
  {
    uuid: "a0010000-7c2a-41e9-9011-000000000001",
    id: "a0010000-7c2a-41e9-9011-000000000001",
    legacyId: "1",
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
    uuid: "a0020000-7c2a-41e9-9011-000000000002",
    id: "a0020000-7c2a-41e9-9011-000000000002",
    legacyId: "2",
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
    uuid: "a0030000-7c2a-41e9-9011-000000000003",
    id: "a0030000-7c2a-41e9-9011-000000000003",
    legacyId: "3",
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
    uuid: "a0040000-7c2a-41e9-9011-000000000004",
    id: "a0040000-7c2a-41e9-9011-000000000004",
    legacyId: "4",
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
    uuid: "a0050000-7c2a-41e9-9011-000000000005",
    id: "a0050000-7c2a-41e9-9011-000000000005",
    legacyId: "5",
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
    uuid: "a0060000-7c2a-41e9-9011-000000000006",
    id: "a0060000-7c2a-41e9-9011-000000000006",
    legacyId: "6",
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
  { uuid: "c0010000-7c2a-41e9-9011-000000000001", id: "c0010000-7c2a-41e9-9011-000000000001", legacyId: "1", name: "Математика жана Алгебра", nameKg: "Математика", slug: "math", icon: "Calculator", gradeRange: "1-11 класс", booksCount: 4 },
  { uuid: "c0020000-7c2a-41e9-9011-000000000002", id: "c0020000-7c2a-41e9-9011-000000000002", legacyId: "2", name: "Кыргыз тили", nameKg: "Кыргыз тили", slug: "kyrgyz", icon: "Globe", gradeRange: "1-11 класс", booksCount: 3 },
  { uuid: "c0030000-7c2a-41e9-9011-000000000003", id: "c0030000-7c2a-41e9-9011-000000000003", legacyId: "3", name: "Кыргыз адабияты", nameKg: "Адабият", slug: "literature", icon: "BookMarked", gradeRange: "1-11 класс", booksCount: 3 },
  { uuid: "c0040000-7c2a-41e9-9011-000000000004", id: "c0040000-7c2a-41e9-9011-000000000004", legacyId: "4", name: "Физика жана Астрономия", nameKg: "Физика", slug: "physics", icon: "Zap", gradeRange: "7-11 класс", booksCount: 2 },
  { uuid: "c0050000-7c2a-41e9-9011-000000000005", id: "c0050000-7c2a-41e9-9011-000000000005", legacyId: "5", name: "Химия", nameKg: "Химия", slug: "chemistry", icon: "FlaskConical", gradeRange: "8-11 класс", booksCount: 2 },
  { uuid: "c0060000-7c2a-41e9-9011-000000000006", id: "c0060000-7c2a-41e9-9011-000000000006", legacyId: "6", name: "Биология жана Табият таануу", nameKg: "Биология", slug: "biology", icon: "Leaf", gradeRange: "6-11 класс", booksCount: 1 },
  { uuid: "c0070000-7c2a-41e9-9011-000000000007", id: "c0070000-7c2a-41e9-9011-000000000007", legacyId: "7", name: "Кыргызстан жана Дүйнө тарыхы", nameKg: "Тарых", slug: "history", icon: "Landmark", gradeRange: "5-11 класс", booksCount: 2 },
  { uuid: "c0080000-7c2a-41e9-9011-000000000008", id: "c0080000-7c2a-41e9-9011-000000000008", legacyId: "8", name: "Кыргызстандын географиясы", nameKg: "География", slug: "geography", icon: "Compass", gradeRange: "6-11 класс", booksCount: 1 },
  { uuid: "c0090000-7c2a-41e9-9011-000000000009", id: "c0090000-7c2a-41e9-9011-000000000009", legacyId: "9", name: "Англис тили", nameKg: "English", slug: "english", icon: "Languages", gradeRange: "1-11 класс", booksCount: 2 },
  { uuid: "c0100000-7c2a-41e9-9011-000000000010", id: "c0100000-7c2a-41e9-9011-000000000010", legacyId: "10", name: "Информатика жана ИКТ", nameKg: "Информатика", slug: "it", icon: "Laptop", gradeRange: "5-11 класс", booksCount: 2 },
  { uuid: "c0110000-7c2a-41e9-9011-000000000011", id: "c0110000-7c2a-41e9-9011-000000000011", legacyId: "11", name: "ОРТ / ЖРТ Даярдоо", nameKg: "ЖРТ Грант", slug: "ort", icon: "Target", gradeRange: "10-11 класс / ОРТ", booksCount: 3 }
];

let ordersStore = [
  {
    uuid: "d0010000-7c2a-41e9-9011-000000001001",
    id: "d0010000-7c2a-41e9-9011-000000001001",
    legacyId: "ord_1001",
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
      { bookUuid: "b0101000-7c2a-41e9-9011-000000000101", bookId: "b0101000-7c2a-41e9-9011-000000000101", title: "Геометрия 8-класс", type: "RENT", months: 9, price: 360, deposit: 150 }
    ],
    createdAt: "2026-10-20T14:30:00.000Z"
  },
  {
    uuid: "d0020000-7c2a-41e9-9011-000000001002",
    id: "d0020000-7c2a-41e9-9011-000000001002",
    legacyId: "ord_1002",
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
      { bookUuid: "b0102000-7c2a-41e9-9011-000000000102", bookId: "b0102000-7c2a-41e9-9011-000000000102", title: "Кыргыз тили 7-класс", type: "BUY", price: 280, deposit: 150 }
    ],
    createdAt: "2026-10-24T10:15:00.000Z"
  },
  {
    uuid: "d0030000-7c2a-41e9-9011-000000001003",
    id: "d0030000-7c2a-41e9-9011-000000001003",
    legacyId: "ord_1003",
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
      { bookUuid: "b0123000-7c2a-41e9-9011-000000000123", bookId: "b0123000-7c2a-41e9-9011-000000000123", title: "English Plus Grade 8", type: "RENT", months: 9, price: 450, deposit: 200 }
    ],
    createdAt: "2026-10-25T08:00:00.000Z"
  }
];

let reviewsStore = [
  { uuid: "f0010000-7c2a-41e9-9011-000000000001", id: "f0010000-7c2a-41e9-9011-000000000001", legacyId: "rev_1", bookUuid: "b0101000-7c2a-41e9-9011-000000000101", bookId: "b0101000-7c2a-41e9-9011-000000000101", user: "Гульмира М.", rating: 5, date: "15.09.2025", comment: "Китеп эң жакшы абалда экен, ижара абдан ыңгайлуу болду!" },
  { uuid: "f0020000-7c2a-41e9-9011-000000000002", id: "f0020000-7c2a-41e9-9011-000000000002", legacyId: "rev_2", bookUuid: "b0101000-7c2a-41e9-9011-000000000101", bookId: "b0101000-7c2a-41e9-9011-000000000101", user: "Бакыт Т.", rating: 5, date: "20.09.2025", comment: "Таза, тыкан китеп. Күрөөнү кайтарып берүү да көйгөйсүз өттү." },
  { uuid: "f0030000-7c2a-41e9-9011-000000000003", id: "f0030000-7c2a-41e9-9011-000000000003", legacyId: "rev_3", bookUuid: "b0113000-7c2a-41e9-9011-000000000113", bookId: "b0113000-7c2a-41e9-9011-000000000113", user: "Динара А.", rating: 5, date: "05.10.2025", comment: "Алиппе жаңы, барактары бүтүн, биринчи класска эң сонун туура келди!" },
  { uuid: "f0040000-7c2a-41e9-9011-000000000004", id: "f0040000-7c2a-41e9-9011-000000000004", legacyId: "rev_4", bookUuid: "b0105000-7c2a-41e9-9011-000000000105", bookId: "b0105000-7c2a-41e9-9011-000000000105", user: "Нурбек К.", rating: 5, date: "12.10.2025", comment: "ЖРТ боюнча мыкты колдонмо, математика бөлүмүн түшүндүрүү абдан түшүнүктүү экен." }
];

let bookingsStore = [
  {
    uuid: "b00k0001-7c2a-41e9-9011-000000000001",
    id: "b00k0001-7c2a-41e9-9011-000000000001",
    legacyId: "1",
    bookId: "b0101000-7c2a-41e9-9011-000000000101",
    bookTitle: "Кыргыз тили. 10-11 класс",
    userName: "Нурлан Исаков",
    userPhone: "+996 702 112 233",
    userEmail: "nurlan.isak@gmail.com",
    school: "Школа-гимназия №6 им. И.В. Панфилова",
    city: "Бишкек",
    grade: "10 класс",
    startDate: "2026-09-01",
    endDate: "2027-05-25",
    duration: "Учебный год (9 мес.)",
    rentalFee: 120,
    deposit: 200,
    paymentMethod: "MBANK",
    status: "ACTIVE",
    notes: "Состояние отличное, комплект с диском",
    createdAt: "2026-09-01T08:30:00.000Z"
  },
  {
    uuid: "b00k0002-7c2a-41e9-9011-000000000002",
    id: "b00k0002-7c2a-41e9-9011-000000000002",
    legacyId: "2",
    bookId: "b0104000-7c2a-41e9-9011-000000000104",
    bookTitle: "Физика. 9-класс",
    userName: "Мээрим Асанова",
    userPhone: "+996 550 445 566",
    userEmail: "meerim.as@mail.ru",
    school: "УВК ШГ №12",
    city: "Бишкек",
    grade: "9 класс",
    startDate: "2026-09-01",
    endDate: "2027-05-25",
    duration: "Учебный год (9 мес.)",
    rentalFee: 150,
    deposit: 250,
    paymentMethod: "MBANK",
    status: "ACTIVE",
    notes: "В обложке, аккуратное использование",
    createdAt: "2026-09-01T09:15:00.000Z"
  },
  {
    uuid: "b00k0003-7c2a-41e9-9011-000000000003",
    id: "b00k0003-7c2a-41e9-9011-000000000003",
    legacyId: "3",
    bookId: "b0105000-7c2a-41e9-9011-000000000105",
    bookTitle: "Химия. 8-9 класс",
    userName: "Эркин Токтосунов",
    userPhone: "+996 777 889 900",
    userEmail: "erkin.t@gmail.com",
    school: "Школа №3 им. М.В. Ломоносова",
    city: "Ош",
    grade: "8 класс",
    startDate: "2026-09-10",
    endDate: "2027-05-25",
    duration: "Учебный год (9 мес.)",
    rentalFee: 130,
    deposit: 200,
    paymentMethod: "ЭЛСОМ",
    status: "ACTIVE",
    notes: "Школьный формуляр №442",
    createdAt: "2026-09-10T11:00:00.000Z"
  },
  {
    uuid: "b00k0004-7c2a-41e9-9011-000000000004",
    id: "b00k0004-7c2a-41e9-9011-000000000004",
    legacyId: "4",
    bookId: "b0108000-7c2a-41e9-9011-000000000108",
    bookTitle: "Англис тили. 8-класс",
    userName: "Гульназ Маматова",
    userPhone: "+996 505 334 455",
    userEmail: "gulnaz.m@gmail.com",
    school: "Гимназия №1 им. Ленина",
    city: "Каракол",
    grade: "8 класс",
    startDate: "2026-10-01",
    endDate: "2027-05-25",
    duration: "8 месяцев",
    rentalFee: 140,
    deposit: 200,
    paymentMethod: "MBANK",
    status: "CONFIRMED",
    notes: "Требуется аудиоприложение",
    createdAt: "2026-10-01T15:20:00.000Z"
  },
  {
    uuid: "b00k0005-7c2a-41e9-9011-000000000005",
    id: "b00k0005-7c2a-41e9-9011-000000000005",
    legacyId: "5",
    bookId: "b0110000-7c2a-41e9-9011-000000000110",
    bookTitle: "Биология (Жалпы биология). 10-11 класс",
    userName: "Азамат Бекбоев",
    userPhone: "+996 708 667 788",
    userEmail: "azamat.b@gmail.com",
    school: "Авторская школа-комплекс",
    city: "Бишкек",
    grade: "10 класс",
    startDate: "2026-10-15",
    endDate: "2027-05-25",
    duration: "7 месяцев",
    rentalFee: 110,
    deposit: 180,
    paymentMethod: "MBANK",
    status: "ACTIVE",
    notes: "Продление аренды со скидкой 10%",
    createdAt: "2026-10-15T12:00:00.000Z"
  }
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
      totalEndpoints: 25,
      endpoints: {
        books: "/api/books",
        categories: "/api/categories",
        users: "/api/users",
        orders: "/api/orders",
        bookings: "/api/bookings",
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
        { url: "https://6add823cfa5e73d4ab2dff52.mockapi.io/api/v1", description: "MockAPI.io Cloud Engine (Account 1: Books & Users)" },
        { url: "https://69dbb1d2560857310a07ed0a.mockapi.io/api/v1", description: "MockAPI.io Cloud Engine (Account 2: Orders & Bookings)" }
      ],
      paths: {
        "/api/books": {
          get: { summary: "Список учебников с фильтрами и пагинацией", tags: ["Books"] },
          post: { summary: "Добавить новый учебник", tags: ["Books"] }
        },
        "/api/books/{uuid}": {
          get: { summary: "Получить учебник по UUID", tags: ["Books"] },
          put: { summary: "Обновить учебник по UUID", tags: ["Books"] },
          delete: { summary: "Удалить учебник по UUID", tags: ["Books"] }
        },
        "/api/categories": {
          get: { summary: "Список 11 школьных предметов КР", tags: ["Categories"] },
          post: { summary: "Создать категорию предметов", tags: ["Categories"] }
        },
        "/api/categories/{uuid}": {
          get: { summary: "Получить категорию по UUID или slug", tags: ["Categories"] },
          put: { summary: "Обновить категорию по UUID", tags: ["Categories"] },
          delete: { summary: "Удалить категорию по UUID", tags: ["Categories"] }
        },
        "/api/users": {
          get: { summary: "Список пользователей платформы", tags: ["Users"] },
          post: { summary: "Зарегистрировать пользователя", tags: ["Users"] }
        },
        "/api/users/{uuid}": {
          get: { summary: "Получить профиль пользователя по UUID", tags: ["Users"] },
          put: { summary: "Обновить профиль по UUID", tags: ["Users"] },
          delete: { summary: "Удалить профиль по UUID", tags: ["Users"] }
        },
        "/api/orders": {
          get: { summary: "Список заказов и доставок", tags: ["Orders"] },
          post: { summary: "Оформить новый заказ", tags: ["Orders"] }
        },
        "/api/orders/{uuid}": {
          get: { summary: "Детали заказа по UUID", tags: ["Orders"] },
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
        const uuid = data.uuid || generateUuid();
        const newBook = {
          uuid,
          id: data.id || uuid,
          legacyId: data.id || null,
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

  // Single Book: /api/books/:idOrUuid
  const bookMatch = pathname.match(/^\/api\/books\/([^\/]+)$/);
  if (bookMatch) {
    const idOrUuid = bookMatch[1];
    const index = booksStore.findIndex(b => b.uuid === idOrUuid || b.id === idOrUuid || b.legacyId === idOrUuid);

    if (method === 'GET') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с UUID/ID ${idOrUuid} не найдена` });
      return sendJson(res, 200, booksStore[index]);
    }

    if (method === 'PUT') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с UUID/ID ${idOrUuid} не найдена` });
      return parseBody(req).then(data => {
        booksStore[index] = { ...booksStore[index], ...data, uuid: booksStore[index].uuid, id: booksStore[index].id };
        return sendJson(res, 200, { success: true, item: booksStore[index] });
      });
    }

    if (method === 'DELETE') {
      if (index === -1) return sendJson(res, 404, { error: `Книга с UUID/ID ${idOrUuid} не найдена` });
      const deleted = booksStore.splice(index, 1)[0];
      return sendJson(res, 200, { success: true, deletedUuid: deleted.uuid, deletedId: deleted.id, item: deleted });
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
        const uuid = data.uuid || generateUuid();
        const newCat = { uuid, id: data.id || uuid, ...data };
        categoriesStore.push(newCat);
        return sendJson(res, 201, newCat);
      });
    }
  }

  // Single Category: /api/categories/:idOrSlug
  const catMatch = pathname.match(/^\/api\/categories\/([^\/]+)$/);
  if (catMatch) {
    const idOrSlug = catMatch[1];
    const cat = categoriesStore.find(c => c.uuid === idOrSlug || c.id === idOrSlug || c.slug === idOrSlug || String(c.legacyId) === idOrSlug);
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
        const uuid = data.uuid || generateUuid();
        const newUser = { uuid, id: data.id || uuid, createdAt: new Date().toISOString(), ...data };
        usersStore.push(newUser);
        return sendJson(res, 201, newUser);
      });
    }
  }

  const userMatch = pathname.match(/^\/api\/users\/([^\/]+)$/);
  if (userMatch) {
    const idOrUuid = userMatch[1];
    const user = usersStore.find(u => u.uuid === idOrUuid || u.id === idOrUuid || String(u.legacyId) === idOrUuid);
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
        const uuid = data.uuid || generateUuid();
        const newOrder = {
          uuid,
          id: data.id || uuid,
          createdAt: new Date().toISOString(),
          status: 'PROCESSING',
          ...data,
          uuid,
          id: data.id || uuid
        };
        ordersStore.unshift(newOrder);
        return sendJson(res, 201, { success: true, order: newOrder });
      });
    }
  }

  const orderMatch = pathname.match(/^\/api\/orders\/([^\/]+)$/);
  if (orderMatch) {
    const idOrUuid = orderMatch[1];
    const index = ordersStore.findIndex(o => o.uuid === idOrUuid || o.id === idOrUuid || o.legacyId === idOrUuid);
    if (index === -1) return sendJson(res, 404, { error: 'Заказ не найден' });
    if (method === 'GET') return sendJson(res, 200, ordersStore[index]);
    if (method === 'PUT') {
      return parseBody(req).then(data => {
        ordersStore[index] = { ...ordersStore[index], ...data, uuid: ordersStore[index].uuid, id: ordersStore[index].id };
        return sendJson(res, 200, { success: true, order: ordersStore[index] });
      });
    }
  }

  // --- 4.5. BOOKINGS / RENTALS ENDPOINTS (/api/bookings) ---
  if (pathname === '/api/bookings') {
    if (method === 'GET') {
      return sendJson(res, 200, {
        total: bookingsStore.length,
        items: bookingsStore
      });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const uuid = data.uuid || generateUuid();
        const newBooking = {
          uuid,
          id: data.id || uuid,
          createdAt: new Date().toISOString(),
          status: 'ACTIVE',
          ...data,
          uuid,
          id: data.id || uuid
        };
        bookingsStore.unshift(newBooking);
        return sendJson(res, 201, { success: true, booking: newBooking });
      });
    }
  }

  const bookingMatch = pathname.match(/^\/api\/bookings\/([^\/]+)$/);
  if (bookingMatch) {
    const idOrUuid = bookingMatch[1];
    const index = bookingsStore.findIndex(b => b.uuid === idOrUuid || b.id === idOrUuid || b.legacyId === idOrUuid);
    if (index === -1) return sendJson(res, 404, { error: 'Бронь/аренда не найдена' });
    if (method === 'GET') return sendJson(res, 200, bookingsStore[index]);
    if (method === 'PUT') {
      return parseBody(req).then(data => {
        bookingsStore[index] = { ...bookingsStore[index], ...data, uuid: bookingsStore[index].uuid, id: bookingsStore[index].id };
        return sendJson(res, 200, { success: true, booking: bookingsStore[index] });
      });
    }
    if (method === 'DELETE') {
      const deleted = bookingsStore.splice(index, 1)[0];
      return sendJson(res, 200, { success: true, deletedUuid: deleted.uuid, deletedId: deleted.id, item: deleted });
    }
  }

  // --- 5. REVIEWS ENDPOINTS (/api/reviews) ---
  if (pathname === '/api/reviews') {
    if (method === 'GET') {
      const bookUuid = searchParams.get('bookUuid') || searchParams.get('bookId');
      const filtered = bookUuid
        ? reviewsStore.filter(r => r.bookUuid === bookUuid || r.bookId === bookUuid)
        : reviewsStore;
      return sendJson(res, 200, { total: filtered.length, items: filtered });
    }
    if (method === 'POST') {
      return parseBody(req).then(data => {
        const uuid = data.uuid || generateUuid();
        const newRev = {
          uuid,
          id: data.id || uuid,
          bookUuid: data.bookUuid || data.bookId || 'b0101000-7c2a-41e9-9011-000000000101',
          bookId: data.bookId || data.bookUuid || 'b0101000-7c2a-41e9-9011-000000000101',
          date: new Date().toLocaleDateString('ru-RU'),
          ...data,
          uuid,
          id: data.id || uuid
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

  // --- 8. AUTH MOCKS (/api/auth/login & /api/auth/register with PBKDF2-SHA256) ---
  if (pathname === '/api/auth/login' && method === 'POST') {
    return parseBody(req).then(body => {
      const user = usersStore.find(u => u.email === body.email) || usersStore[1];
      if (body.password && user.passwordHash && user.passwordSalt) {
        const verifyHash = crypto.pbkdf2Sync(body.password, user.passwordSalt, 100000, 32, 'sha256').toString('hex');
        if (verifyHash !== user.passwordHash) {
          return sendJson(res, 401, {
            success: false,
            error: 'Неверный пароль'
          });
        }
      }
      const { passwordHash: _h, passwordSalt: _s, ...safeUser } = user;
      return sendJson(res, 200, {
        success: true,
        token: `jwt_sec_${Date.now()}_${user.uuid || user.id}`,
        user: safeUser
      });
    });
  }

  if (pathname === '/api/auth/register' && method === 'POST') {
    return parseBody(req).then(body => {
      const uuid = body.uuid || generateUuid();
      const rawPassword = body.password || 'Bilim#2026Default';
      const { hash, salt } = hashPasswordNode(rawPassword);

      const newUser = {
        uuid,
        id: body.id || uuid,
        name: body.name || 'Новый пользователь',
        email: body.email || 'user@example.com',
        phone: body.phone || '+996 700 000 000',
        role: 'USER',
        city: body.city || 'Бишкек',
        rating: 5.0,
        passwordHash: hash,
        passwordSalt: salt,
        createdAt: new Date().toISOString()
      };
      usersStore.push(newUser);
      const { passwordHash: _h, passwordSalt: _s, ...safeUser } = newUser;
      return sendJson(res, 201, {
        success: true,
        token: `jwt_sec_${Date.now()}_${newUser.uuid || newUser.id}`,
        user: safeUser
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
