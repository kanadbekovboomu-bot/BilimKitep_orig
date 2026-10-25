import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Server,
  Play,
  Copy,
  Check,
  Globe,
  Database,
  BookOpen,
  FolderTree,
  Users,
  ShoppingBag,
  Star,
  MapPin,
  BarChart3,
  Key,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Code2,
  Terminal,
  Zap,
  CheckCircle2,
  AlertCircle,
  CalendarCheck
} from 'lucide-react';
import { TyndykEmblem, KochkorMuyuzPattern } from '../components/common/KyrgyzOrnament';

// MockAPI.io Cloud API Endpoints across 2 registered accounts
export const MOCKAPI_ACCOUNT_1 = 'https://6add823cfa5e73d4ab2dff52.mockapi.io/api/v1'; // Books (26) & Users (6)
export const MOCKAPI_ACCOUNT_2 = 'https://69dbb1d2560857310a07ed0a.mockapi.io/api/v1'; // Orders (5) & Bookings (5)
const MOCKAPI_BASE = MOCKAPI_ACCOUNT_1;

export const ApiDocsPage = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [targetServer, setTargetServer] = useState('local'); // 'local' or 'mockapi'
  const [requestUrl, setRequestUrl] = useState('');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Complete registry of 22+ REST API endpoints
  const ENDPOINTS = [
    // BOOKS
    {
      id: 'books_get_all',
      category: 'books',
      title: 'Список всех учебников с фильтрацией и пагинацией',
      titleKg: 'Окуу китептеринин толук тизмеси (чыпкалоо жана барактоо)',
      method: 'GET',
      path: '/api/books',
      mockApiPath: '/books',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Возвращает массив учебников Кыргызстана с поддержкой поиска, фильтрации по классам, языку и типу сделки.',
      queryParams: [
        { name: 'search', default: '', desc: 'Поиск по названию, автору или предмету (напр. Математика, ОРТ)' },
        { name: 'grade', default: 'all', desc: 'Класс (1-11 или primary, middle, senior)' },
        { name: 'language', default: 'all', desc: 'Язык обучения (KY, RU, EN)' },
        { name: 'dealType', default: 'all', desc: 'Тип сделки (SALE, RENT, BOTH)' },
        { name: 'sort', default: 'newest', desc: 'Сортировка: newest, priceAsc, priceDesc, popular, rating' },
        { name: 'page', default: '1', desc: 'Номер страницы' },
        { name: 'limit', default: '12', desc: 'Количество элементов на странице' }
      ],
      sampleBody: null
    },
    {
      id: 'books_get_one',
      category: 'books',
      title: 'Получить детальную информацию об учебнике по UUID',
      titleKg: 'Бир китеп жөнүндө толук маалымат алуу (UUID боюнча)',
      method: 'GET',
      path: '/api/books/b0101000-7c2a-41e9-9011-000000000101',
      mockApiPath: '/books/b_101',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Возвращает полную карточку учебника со всеми метаданными, состоянием и продавцом по стандартному RFC 4122 UUID.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'books_post',
      category: 'books',
      title: 'Создать новое объявление об учебнике (генерация UUID)',
      titleKg: 'Жаңы китеп жарыясын кошуу (UUID генерациясы менен)',
      method: 'POST',
      path: '/api/books',
      mockApiPath: '/books',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Публикует новый учебник в каталог с генерацией уникального RFC 4122 v4 UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        title: "Кыргыз тили жана окуу 4-класс",
        author: "А. Муратов, К. Райымбекова",
        grade: 4,
        subject: "Кыргыз тили",
        language: "KY",
        price: 280,
        dealType: "SALE",
        condition: "LIKE_NEW",
        city: "Бишкек",
        description: "Жаңы стандарт боюнча оригинал китеп, таза сакталган.",
        seller: {
          uuid: "a0020000-7c2a-41e9-9011-000000000002",
          name: "Айгүл Бакирова",
          phone: "+996 701 445 566"
        }
      }, null, 2)
    },
    {
      id: 'books_put',
      category: 'books',
      title: 'Обновить данные учебника по UUID',
      titleKg: 'Китептин маалыматын UUID боюнча өзгөртүү',
      method: 'PUT',
      path: '/api/books/b0101000-7c2a-41e9-9011-000000000101',
      mockApiPath: '/books/b_101',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Обновляет существующее объявление по уникальному UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        price: 320,
        condition: "EXCELLENT",
        description: "Баасы арзандатылды! Шашылыш сатылат."
      }, null, 2)
    },
    {
      id: 'books_delete',
      category: 'books',
      title: 'Удалить учебник из каталога по UUID',
      titleKg: 'Китепти каталогдон өчүрүү (UUID)',
      method: 'DELETE',
      path: '/api/books/b0102000-7c2a-41e9-9011-000000000102',
      mockApiPath: '/books/b_102',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Удаляет учебник из базы по уникальному UUID.',
      queryParams: [],
      sampleBody: null
    },

    // CATEGORIES
    {
      id: 'categories_get_all',
      category: 'categories',
      title: 'Список всех школьных предметов Кыргызстана',
      titleKg: 'Кыргызстандын бардык мектеп предметтери',
      method: 'GET',
      path: '/api/categories',
      mockApiPath: null,
      description: 'Возвращает 11 официальных школьных предметов Кыргызстана (Математика, Кыргыз тили, Физика, ОРТ и др.).',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'categories_get_one',
      category: 'categories',
      title: 'Получить категорию по UUID или slug',
      titleKg: 'Категорияны UUID же slug боюнча алуу',
      method: 'GET',
      path: '/api/categories/c0010000-7c2a-41e9-9011-000000000001',
      mockApiPath: null,
      description: 'Возвращает название на кыргызском, русском, иконку и диапазон классов предмета по UUID.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'categories_post',
      category: 'categories',
      title: 'Создать новую категорию предметов (генерация UUID)',
      titleKg: 'Жаңы категория кошуу (UUID генерациясы)',
      method: 'POST',
      path: '/api/categories',
      mockApiPath: null,
      description: 'Добавляет новый школьный предмет с уникальным RFC 4122 UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        name: "Адам жана коом (Человек и общество)",
        nameKg: "Адам жана коом",
        slug: "society",
        icon: "Users",
        gradeRange: "9-11 класс",
        booksCount: 1
      }, null, 2)
    },

    // USERS (MockAPI Account 1)
    {
      id: 'users_get_all',
      category: 'users',
      title: 'Список пользователей платформы (со стандартом UUID)',
      titleKg: 'Колдонуучулардын тизмеси (UUID стандарты менен)',
      method: 'GET',
      path: '/api/users',
      mockApiPath: '/users',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Возвращает профили пользователей (администратор, покупатели, продавцы книг) с UUID и рейтингами.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'users_get_one',
      category: 'users',
      title: 'Получить профиль пользователя по UUID',
      titleKg: 'Колдонуучунун профилин UUID боюнча алуу',
      method: 'GET',
      path: '/api/users/a0010000-7c2a-41e9-9011-000000000001',
      mockApiPath: '/users/1',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Возвращает контактную информацию, город, рейтинг и статус продавца по уникальному UUID пользователя.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'users_post',
      category: 'users',
      title: 'Создать нового пользователя (генерация UUID)',
      titleKg: 'Жаңы колдонуучу каттоого алуу (UUID)',
      method: 'POST',
      path: '/api/users',
      mockApiPath: '/users',
      mockApiBase: MOCKAPI_ACCOUNT_1,
      description: 'Регистрирует нового пользователя с генерацией персонального UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        name: "Нурбек Жумабеков",
        email: "nurbek.zh@gmail.com",
        phone: "+996 705 112 233",
        role: "USER",
        city: "Ош",
        rating: 5.0
      }, null, 2)
    },

    // ORDERS (MockAPI Account 2: Astromy)
    {
      id: 'orders_get_all',
      category: 'orders',
      title: 'Список всех заказов и доставок (со стандартом UUID)',
      titleKg: 'Бардык буйрутмалардын жана жеткирүүлөрдүн тизмеси (UUID)',
      method: 'GET',
      path: '/api/orders',
      mockApiPath: '/orders',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Возвращает список оформленных заказов с UUID, адресом доставки и выбранным способом оплаты (MBANK, ЭЛСОМ, Наличные).',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'orders_get_one',
      category: 'orders',
      title: 'Получить заказ по UUID трекинга',
      titleKg: 'Буйрутманы UUID трек номери боюнча көрүү',
      method: 'GET',
      path: '/api/orders/ord00001-7c2a-41e9-9011-000000000001',
      mockApiPath: '/orders/1',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Возвращает статус доставки, трек-UUID и детализацию товаров.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'orders_post',
      category: 'orders',
      title: 'Оформить новый заказ (генерация UUID)',
      titleKg: 'Жаңы буйрутма түзүү (UUID)',
      method: 'POST',
      path: '/api/orders',
      mockApiPath: '/orders',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Создает новый заказ в системе с расчетом суммы, времени курьерской доставки и выдачей UUID заказа.',
      queryParams: [],
      sampleBody: JSON.stringify({
        customerName: "Канат Асанов",
        customerPhone: "+996 708 990 011",
        customerEmail: "kanat.a@gmail.com",
        city: "Бишкек",
        deliveryAddress: "7-кичи район, 15-үй",
        paymentMethod: "MBANK",
        bookTitle: "Кыргыз тили. 10-11 класс",
        bookId: "b0101000-7c2a-41e9-9011-000000000101",
        quantity: 1,
        totalAmount: 350
      }, null, 2)
    },

    // BOOKINGS / RENTALS (MockAPI Account 2: Astromy)
    {
      id: 'bookings_get_all',
      category: 'bookings',
      title: 'Список всех активных броней и аренды учебников (UUID)',
      titleKg: 'Бардык активдүү ижара жана ээлөөлөрдүн тизмеси (UUID)',
      method: 'GET',
      path: '/api/bookings',
      mockApiPath: '/bookings',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Возвращает список школьных учебников, оформленных в долгосрочную или семестровую аренду по школам Кыргызстана.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'bookings_get_one',
      category: 'bookings',
      title: 'Получить данные бронирования по UUID',
      titleKg: 'Ижара ээлөөсүн UUID боюнча көрүү',
      method: 'GET',
      path: '/api/bookings/b00k0001-7c2a-41e9-9011-000000000001',
      mockApiPath: '/bookings/1',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Возвращает карточку аренды, данные школы, сумму залога и срок возврата учебника.',
      queryParams: [],
      sampleBody: null
    },
    {
      id: 'bookings_post',
      category: 'bookings',
      title: 'Оформить бронирование аренды учебника на учебный год (генерация UUID)',
      titleKg: 'Окуу жылына китепти ижарага ээлөө (UUID генерациясы)',
      method: 'POST',
      path: '/api/bookings',
      mockApiPath: '/bookings',
      mockApiBase: MOCKAPI_ACCOUNT_2,
      description: 'Бронирует учебник с расчетом аренды и депозита и выдачей уникального RFC 4122 v4 UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        bookId: "b0101000-7c2a-41e9-9011-000000000101",
        bookTitle: "Кыргыз тили. 10-11 класс",
        userName: "Каныкей Асанбекова",
        userPhone: "+996 770 889 900",
        userEmail: "kanykey.a@gmail.com",
        school: "Школа-гимназия №70 (Бишкек)",
        city: "Бишкек",
        grade: "10 класс",
        startDate: "2026-11-01",
        endDate: "2027-05-25",
        duration: "7 месяцев",
        rentalFee: 115,
        deposit: 200,
        paymentMethod: "MBANK",
        status: "ACTIVE"
      }, null, 2)
    },

    // REVIEWS
    {
      id: 'reviews_get_all',
      category: 'reviews',
      title: 'Отзывы и рейтинги к учебникам по UUID книги',
      titleKg: 'Китептерге сын-пикирлер жана баалоолор (китептин UUID боюнча)',
      method: 'GET',
      path: '/api/reviews?bookUuid=b0101000-7c2a-41e9-9011-000000000101',
      mockApiPath: null,
      description: 'Возвращает отзывы проверенных родителей и учеников Кыргызстана по UUID книги.',
      queryParams: [
        { name: 'bookUuid', default: 'b0101000-7c2a-41e9-9011-000000000101', desc: 'UUID книги для выборки отзывов' }
      ],
      sampleBody: null
    },
    {
      id: 'reviews_post',
      category: 'reviews',
      title: 'Оставить отзыв о книге (генерация UUID отзыва)',
      titleKg: 'Китепке пикир калтыруу (UUID)',
      method: 'POST',
      path: '/api/reviews',
      mockApiPath: null,
      description: 'Добавляет отзыв с оценкой от 1 до 5 звезд и уникальным UUID.',
      queryParams: [],
      sampleBody: JSON.stringify({
        bookUuid: "b0101000-7c2a-41e9-9011-000000000101",
        userName: "Мээрим Т.",
        rating: 5,
        comment: "Китеп абдан жакшы абалда экен, сатуучуга чоң рахмат!",
        verified: true
      }, null, 2)
    },

    // CITIES
    {
      id: 'cities_get_all',
      category: 'cities',
      title: 'Города и регионы доставки Кыргызстана',
      titleKg: 'Кыргызстандын шаарлары жана жеткирүү түйүндөрү',
      method: 'GET',
      path: '/api/cities',
      mockApiPath: null,
      description: 'Возвращает 8 региональных центров Кыргызстана с GPS координатами, сроками и тарифами курьерской доставки.',
      queryParams: [],
      sampleBody: null
    },

    // STATS
    {
      id: 'stats_get',
      category: 'stats',
      title: 'Метрики и статистика экосистемы BilimKitep',
      titleKg: 'BilimKitep платформасынын көрсөткүчтөрү жана статистикасы',
      method: 'GET',
      path: '/api/stats',
      mockApiPath: null,
      description: 'Возвращает агрегированные показатели: сэкономленные деньги родителей (в сомах), охват учащихся, количество активных книг и регионов.',
      queryParams: [],
      sampleBody: null
    },

    // AUTH
    {
      id: 'auth_login',
      category: 'auth',
      title: 'Вход пользователя в систему (JWT)',
      titleKg: 'Системага кирүү (JWT аутентификация)',
      method: 'POST',
      path: '/api/auth/login',
      mockApiPath: null,
      description: 'Авторизует пользователя по email/паролю и выдает Bearer токен.',
      queryParams: [],
      sampleBody: JSON.stringify({
        email: "aibek.n@gmail.com",
        password: "password123"
      }, null, 2)
    },
    {
      id: 'auth_register',
      category: 'auth',
      title: 'Регистрация нового пользователя',
      titleKg: 'Жаңы колдонуучуну каттоо',
      method: 'POST',
      path: '/api/auth/register',
      mockApiPath: null,
      description: 'Создает учетную запись ученика, родителя или учителя.',
      queryParams: [],
      sampleBody: JSON.stringify({
        name: "Султан Касымов",
        email: "sultan.k@gmail.com",
        phone: "+996 772 334 455",
        city: "Каракол",
        password: "securePassword2026"
      }, null, 2)
    }
  ];

  // Set default endpoint on mount
  useEffect(() => {
    if (ENDPOINTS.length > 0) {
      handleSelectEndpoint(ENDPOINTS[0]);
    }
  }, []);

  const handleSelectEndpoint = (ep) => {
    setSelectedEndpoint(ep);
    setRequestMethod(ep.method);
    setRequestUrl(ep.path);
    setRequestBody(ep.sampleBody || '');
    setResponseStatus(null);
    setResponseTime(null);
    setResponseData(null);
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseTime(null);
    setResponseData(null);

    const startTime = performance.now();
    try {
      let finalUrl = requestUrl;

      // If user selected mockapi and endpoint supports it
      if (targetServer === 'mockapi' && selectedEndpoint?.mockApiPath) {
        finalUrl = `${selectedEndpoint.mockApiBase || MOCKAPI_ACCOUNT_1}${selectedEndpoint.mockApiPath}`;
      }

      const options = {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if ((requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH') && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(finalUrl, options);
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);

      setResponseTime(elapsed);
      setResponseStatus(res.status);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await res.json();
        setResponseData(json);
      } else {
        const text = await res.text();
        setResponseData(text);
      }
    } catch (err) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(500);
      setResponseData({
        error: "Сетевая ошибка при выполнении запроса",
        details: err.message,
        tip: "Убедитесь, что сервер Vite запущен на http://localhost:5173"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateCurlCommand = () => {
    let url = targetServer === 'mockapi' && selectedEndpoint?.mockApiPath
      ? `${selectedEndpoint.mockApiBase || MOCKAPI_ACCOUNT_1}${selectedEndpoint.mockApiPath}`
      : `${window.location.origin}${requestUrl}`;

    let cmd = `curl -X ${requestMethod} "${url}" \\\n  -H "Accept: application/json"`;
    if ((requestMethod === 'POST' || requestMethod === 'PUT') && requestBody) {
      cmd += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${requestBody.replace(/\n/g, ' ')}'`;
    }
    return cmd;
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(generateCurlCommand());
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleCopyJson = () => {
    if (responseData) {
      navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const categories = [
    { id: 'all', label: `Все API (${ENDPOINTS.length})`, icon: Code2, count: ENDPOINTS.length },
    { id: 'books', label: 'Учебники (/books)', icon: BookOpen, count: 5 },
    { id: 'categories', label: 'Категории (/categories)', icon: FolderTree, count: 3 },
    { id: 'users', label: 'Пользователи (/users)', icon: Users, count: 3 },
    { id: 'orders', label: 'Заказы (/orders)', icon: ShoppingBag, count: 3 },
    { id: 'bookings', label: 'Бронь и Аренда (/bookings)', icon: CalendarCheck, count: 3 },
    { id: 'reviews', label: 'Отзывы (/reviews)', icon: Star, count: 2 },
    { id: 'cities', label: 'Города (/cities)', icon: MapPin, count: 1 },
    { id: 'stats', label: 'Статистика (/stats)', icon: BarChart3, count: 1 },
    { id: 'auth', label: 'Аутентификация (/auth)', icon: Key, count: 2 },
  ];

  const filteredEndpoints = selectedCategory === 'all'
    ? ENDPOINTS
    : ENDPOINTS.filter(ep => ep.category === selectedCategory);

  const getMethodBadgeColor = (m) => {
    switch (m) {
      case 'GET': return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case 'POST': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'DELETE': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-darkBg text-gray-900 dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-10 text-white shadow-xl border border-slate-700/60">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <TyndykEmblem className="w-64 h-64 text-emerald-400" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>BilimKitep REST API Engine v2.0 • 22+ Эндпоинта • RFC 4122 v4 UUID</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
              Интерактивная REST API Документация & Тестировщик
            </h1>
            <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Полноценная серверная архитектура платформы BilimKitep со стандартом первичных ключей <strong>RFC 4122 v4 UUID</strong>, поддержкой полного цикла CRUD, фильтрации школьных учебников Кыргызстана, геолокаций доставки, заказов, отзывов и JWT-аутентификации.
            </p>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Сервер Vite REST</div>
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE (22+ API)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                <Key className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Идентификаторы</div>
                  <div className="font-bold text-sky-300">RFC 4122 v4 UUID</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                <Database className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Формат ответа</div>
                  <div className="font-bold text-amber-300">JSON / UTF-8</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Стандарты</div>
                  <div className="font-bold text-rose-300">CORS / HTTP 200/201/404</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CLOUD MOCKAPI INFO BANNER (2 MULTI-ACCOUNT CLUSTERS) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-darkCard border border-gray-200/80 dark:border-darkBorder shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm shrink-0">
                API
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  Облачный MockAPI.io REST Кластер (2 Аккаунта)
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
                    4 Облачных Ресурса Онлайн
                  </span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Все сущности синхронизированы со стандартом RFC 4122 v4 UUID и реальными учебными данными школ Кыргызстана.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Account 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Аккаунт 1: Каталог и Профили
                </span>
                <span className="text-[10px] text-gray-400 font-mono">kanadbekovboomu</span>
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate select-all">
                {MOCKAPI_ACCOUNT_1}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`${MOCKAPI_ACCOUNT_1}/books`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkBorder flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>/books (26 книг)</span>
                  <ExternalLink className="w-3 h-3 text-sky-500" />
                </a>
                <a
                  href={`${MOCKAPI_ACCOUNT_1}/users`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkBorder flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>/users (6 польз.)</span>
                  <ExternalLink className="w-3 h-3 text-sky-500" />
                </a>
              </div>
            </div>

            {/* Account 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-darkBorder space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Аккаунт 2: Заказы и Аренда
                </span>
                <span className="text-[10px] text-gray-400 font-mono">astromy33</span>
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-mono truncate select-all">
                {MOCKAPI_ACCOUNT_2}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`${MOCKAPI_ACCOUNT_2}/orders`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkBorder flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>/orders (5 заказов)</span>
                  <ExternalLink className="w-3 h-3 text-sky-500" />
                </a>
                <a
                  href={`${MOCKAPI_ACCOUNT_2}/bookings`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkBorder flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>/bookings (5 броней)</span>
                  <ExternalLink className="w-3 h-3 text-sky-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-sky-50/60 dark:bg-sky-950/20 p-3 rounded-xl border border-sky-200/60 dark:border-sky-900/40 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-sky-900 dark:text-sky-200 font-semibold">Архитектура распределенного облака:</strong> Сервис MockAPI.io ограничивает бесплатный тариф максимум 2 ресурсами на аккаунт. Объединив 2 аккаунта в единую экосистему, мы обеспечили 100% покрытие всех бизнес-ресурсов (<code className="font-mono text-[11px]">/books</code>, <code className="font-mono text-[11px]">/users</code>, <code className="font-mono text-[11px]">/orders</code>, <code className="font-mono text-[11px]">/bookings</code>) в реальном облаке, а встроенный локальный Vite REST API дополнительно предоставляет категории, отзывы, города, статистику и аутентификацию (всего <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{ENDPOINTS.length}+ эндпоинтов</strong>)!
            </p>
          </div>
        </div>

        {/* MAIN API WORKSPACE: SIDEBAR & INTERACTIVE CONSOLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT SIDEBAR: CATEGORIES & ENDPOINTS LIST */}
          <div className="lg:col-span-5 space-y-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-white dark:bg-darkCard rounded-2xl border border-gray-200/80 dark:border-darkBorder shadow-xs">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Endpoints List */}
            <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-200/80 dark:border-darkBorder shadow-xs divide-y divide-gray-100 dark:divide-darkBorder overflow-hidden max-h-[720px] overflow-y-auto">
              {filteredEndpoints.map(ep => {
                const isSelected = selectedEndpoint?.id === ep.id;
                return (
                  <div
                    key={ep.id}
                    onClick={() => handleSelectEndpoint(ep)}
                    className={`p-3.5 cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-l-4 border-brand-500'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border uppercase tracking-wider ${getMethodBadgeColor(ep.method)}`}>
                          {ep.method}
                        </span>
                        <code className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 truncate">
                          {ep.path}
                        </code>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {ep.title}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-brand-500 translate-x-0.5' : 'text-gray-400'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: INTERACTIVE TESTER & CONSOLE */}
          <div className="lg:col-span-7 space-y-4">
            {selectedEndpoint ? (
              <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-200/80 dark:border-darkBorder shadow-xs p-5 sm:p-6 space-y-6">

                {/* Endpoint Header */}
                <div className="space-y-2 pb-4 border-b border-gray-100 dark:border-darkBorder">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border uppercase tracking-wider ${getMethodBadgeColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedEndpoint.mockApiPath && (
                        <div className="flex items-center gap-1 text-[11px] bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800">
                          <Globe className="w-3 h-3 text-sky-500" />
                          <span>MockAPI готов</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500 font-mono">
                        {selectedEndpoint.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {selectedEndpoint.title}
                  </h2>
                  <p className="text-xs text-brand-700 dark:text-brand-400 font-medium">
                    🇰🇬 {selectedEndpoint.titleKg}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {selectedEndpoint.description}
                  </p>
                </div>

                {/* Server Target Selector (if mockapi is available) */}
                {selectedEndpoint.mockApiPath && (
                  <div className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-200/60 dark:border-darkBorder flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Сервер для запроса:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTargetServer('local')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          targetServer === 'local'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-darkBorder'
                        }`}
                      >
                        Локальный Vite API
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetServer('mockapi')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          targetServer === 'mockapi'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-darkBorder'
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>Облако MockAPI ({selectedEndpoint.mockApiBase === MOCKAPI_ACCOUNT_2 ? 'Аккаунт 2' : 'Аккаунт 1'})</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Request Bar */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>URL запроса</span>
                    <button
                      type="button"
                      onClick={handleCopyCurl}
                      className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
                    >
                      {copiedCurl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Скопировать cURL</span>
                        </>
                      )}
                    </button>
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={requestUrl}
                      onChange={(e) => setRequestUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-darkBorder bg-gray-50/80 dark:bg-slate-900 font-mono text-xs text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="button"
                      onClick={handleSendRequest}
                      disabled={isLoading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-700 hover:to-brand-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                      <span>Выполнить</span>
                    </button>
                  </div>
                </div>

                {/* Query Parameters list (if any) */}
                {selectedEndpoint.queryParams && selectedEndpoint.queryParams.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Параметры запроса (Query Params)
                    </label>
                    <div className="rounded-xl border border-gray-200/80 dark:border-darkBorder divide-y divide-gray-100 dark:divide-darkBorder overflow-hidden text-xs">
                      {selectedEndpoint.queryParams.map(param => (
                        <div key={param.name} className="p-2.5 bg-gray-50/50 dark:bg-slate-900/40 flex items-start justify-between gap-3">
                          <code className="font-mono font-bold text-brand-600 dark:text-brand-400">
                            ?{param.name}
                          </code>
                          <span className="text-gray-500 dark:text-gray-400 text-right">
                            {param.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Request Body Editor (for POST / PUT) */}
                {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Тело запроса (JSON Payload)
                    </label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={7}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-darkBorder bg-gray-900 text-emerald-300 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500 leading-relaxed"
                    />
                  </div>
                )}

                {/* Response Console */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-brand-500" />
                      <span>Ответ сервера (Response Console)</span>
                    </label>

                    {responseData && (
                      <div className="flex items-center gap-3">
                        {responseStatus && (
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            responseStatus >= 200 && responseStatus < 300
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}>
                            HTTP {responseStatus}
                          </span>
                        )}
                        {responseTime !== null && (
                          <span className="text-[11px] font-mono text-gray-500">
                            {responseTime} ms
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={handleCopyJson}
                          className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
                        >
                          {copiedJson ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span>Скопировано</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Копировать JSON</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl bg-gray-950 p-4 border border-gray-800 shadow-inner overflow-hidden">
                    {isLoading ? (
                      <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-400">
                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-mono">Выполняем REST запрос...</span>
                      </div>
                    ) : responseData ? (
                      <pre className="text-xs font-mono text-emerald-400 overflow-x-auto max-h-[380px] leading-relaxed">
                        {typeof responseData === 'string'
                          ? responseData
                          : JSON.stringify(responseData, null, 2)}
                      </pre>
                    ) : (
                      <div className="py-12 text-center text-xs text-gray-500 font-mono space-y-1">
                        <p>Нажмите синюю кнопку «Выполнить», чтобы получить ответ от сервера в реальном времени.</p>
                        <p className="text-[11px] text-gray-600">Все 22+ маршрута активны и возвращают реальные данные.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApiDocsPage;
