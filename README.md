# 📚 BilimKitep — Платформа шеринга, аренды и покупки учебников в Кыргызстане

Веб-сервис шеринга, долгосрочной аренды и вторичного оборота школьной и университетской литературы для школьников (1–11 классы), абитуриентов (ОРТ/ЖРТ) и студентов Кыргызстана.

> **Дипломный проект 2026** • Технологический стек: React 18, Vite, Tailwind CSS, Redux Toolkit, i18next (KG/RU/EN), Recharts, Cloudinary API, Telegram Bot API.

---

## 🌟 Ключевые возможности платформы

1. **Модуль долгосрочной аренды (Эко-шеринг):**
   - Расчет аренды по формуле: $\text{Итого} = (\text{Цена/мес} \times \text{Срок}) + \text{Возвратный залог}$.
   - Сроки аренды: **3 месяца** (четверть), **5 месяцев** (полугодие), **9 месяцев** (учебный год).
   - Экономия семейного бюджета до **70%** по сравнению с покупкой новых комплектов.
2. **Каталог учебников Кыргызстана:**
   - 1–11 классы по официальной программе МОиН КР (Геометрия Бекбоева, Кыргыз тили Ибраимова, Физика Мамбетакунова и др.).
   - Пособия для подготовки к Общереспубликанскому тестированию (ОРТ / ЖРТ «Алтын Сертификат»).
   - Живой поиск с debounce, фильтрация по классам, языкам (KG, RU, EN), типам сделки (Аренда / Покупка / Оба) и диапазону цен.
3. **Трехъязычная локализация (i18n):**
   - Полная поддержка **кыргызского (KG)**, **русского (RU)** и **английского (EN)** языков с модульной загрузкой по 9 неймспейсам.
4. **Интеграции:**
   - **Telegram Bot API:** Мгновенные уведомления в чат администраторов при каждом чекауте.
   - **Cloudinary REST API:** Загрузка фотографий учебников с предпросмотром.
   - **Demo Payment Gateway:** Симуляция оплаты через MBank QR, Элкарт/Visa, O!Деньги и наличными.
   - **Аналитика Recharts:** Графики выручки и распределения категорий в панели администратора.
5. **Подготовка к защите (Speech Guide):**
   - В шапку сайта встроена интерактивная шпаргалка с 5-минутным таймером и готовым текстом доклада **строго на английском языке** (критерий 10/10).

---

## 🛠️ Архитектура и Структура проекта

```text
src/
├── assets/                     # Статические ресурсы
├── components/
│   ├── common/                 # UI Kit: Button, Input, Select, Badge, Modal, RatingStars,
│   │                           # SkeletonCard, Pagination, ThemeToggle, LangSwitcher, ToastNotification
│   ├── layout/                 # Header, BurgerMenu, Footer, SidebarFilter, AdminSidebar,
│   │                           # ErrorBoundary, Breadcrumbs
│   ├── modules/                # BookCard, BookGrid, SearchBar, DealBadge, FilterChips, PriceSlider,
│   │                           # QuickViewModal, BookGallery, RentCalculator, SellerCard,
│   │                           # ReviewCard, ReviewFormModal, CartItem, OrderSummary, PaymentDemoModal,
│   │                           # RentalDatePicker, ImageDropzone, UserOrderRow, ListingManageRow,
│   │                           # ProfileStats, DiplomaDefenseModal
│   └── admin/                  # RevenueChart, CategoriesPieChart, AdminBooksTable, AdminOrderModal
├── context/                    # ThemeContext (Light/Dark mode)
├── features/                   # Redux Toolkit Slices
│   ├── auth/authSlice.js       # Аутентификация и роли (USER / ADMIN)
│   ├── books/booksSlice.js     # CRUD учебников и асинхронные санки
│   ├── cart/cartSlice.js       # Корзина, формула аренды и залога
│   └── filter/filterSlice.js   # Поисковые фильтры и пагинация
├── locales/                    # Модули переводов (27 JSON: 9 неймспейсов × 3 языка)
├── pages/                      # 11 страниц (HomePage, CatalogPage, BookDetailPage, CartPage,
│                               # CheckoutPage, LoginPage, RegisterPage, ProfilePage, MyListingsPage,
│                               # AddBookPage, AdminDashboardPage)
├── routes/                     # AppRoutes, PrivateRoute, AdminRoute
├── services/                   # api.js (LocalStorage REST Mock), cloudinary.js, telegram.js
├── store/                      # Redux Store
└── utils/                      # formatters.js, validators.js
```

---

## 🚀 Запуск и Тестирование

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск локального сервера разработки
```bash
npm run dev
```

### 3. Запуск тестов Vitest (25 тестов, TDD Red-Green-Refactor)
```bash
npm test
```

### 4. Продакшен-сборка
```bash
npm run build
```

---

## 🎓 5-Minute Diploma Defense Speech (In English)

* **Problem (0:00 - 1:00):** Over 1 million students in Kyrgyzstan face textbook shortages, and parents overpay up to 70% every academic year for single-use books.
* **Solution (1:00 - 2:00):** BilimKitep introduces an affordable 3/5/9-month rental model with returnable safety deposits, circular reuse of textbooks, and access to ORT/JRT materials.
* **Stack & Architecture (2:00 - 3:30):** React 18 with Vite, Tailwind CSS, Redux Toolkit, i18next (KG/RU/EN), Recharts, Cloudinary API, and Telegram Bot API.
* **Live Demo & Conclusion (3:30 - 5:00):** Real-time rental calculation, MBank demo checkout, Telegram notifications, and analytics dashboard.
