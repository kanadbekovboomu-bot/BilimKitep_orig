import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'covers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const covers = [
  {
    filename: 'chemistry-8.svg',
    bgStart: '#064e3b',
    bgEnd: '#022c22',
    accent1: '#10b981',
    accent2: '#34d399',
    gold: '#fbbf24',
    ministry: 'МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ КЫРГЫЗСКОЙ РЕСПУБЛИКИ',
    subject: 'ХИМИЯ',
    subtitle: 'Неорганическая химия',
    grade: '8',
    gradeLabel: 'КЛАСС',
    authors: 'С. Сатыбалдиев, О. Рудзитис',
    typeText: 'УЧЕБНИК ДЛЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ШКОЛ',
    pubText: 'БИЛИМ-КОМПЬЮТЕР • БИШКЕК',
    centerSvg: `
      <!-- Erlenmeyer Flask -->
      <path d="M 270 330 L 330 330 L 330 380 L 410 500 C 420 515 410 530 390 530 L 210 530 C 190 530 180 515 190 500 L 270 380 Z" fill="none" stroke="#34d399" stroke-width="6" stroke-linejoin="round"/>
      <path d="M 215 490 L 385 490 L 360 450 L 240 450 Z" fill="#10b981" opacity="0.6"/>
      <circle cx="270" cy="470" r="8" fill="#a7f3d0" opacity="0.8"/>
      <circle cx="330" cy="480" r="12" fill="#a7f3d0" opacity="0.7"/>
      <circle cx="300" cy="460" r="6" fill="#a7f3d0" opacity="0.9"/>
      <!-- Molecule Benzene Ring -->
      <polygon points="300,240 350,270 350,330 300,360 250,330 250,270" fill="none" stroke="#fbbf24" stroke-width="4"/>
      <circle cx="300" cy="300" r="30" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4"/>
      <!-- Atoms -->
      <circle cx="300" cy="240" r="9" fill="#f87171"/>
      <circle cx="350" cy="270" r="9" fill="#60a5fa"/>
      <circle cx="350" cy="330" r="9" fill="#34d399"/>
      <circle cx="300" cy="360" r="9" fill="#f87171"/>
      <circle cx="250" cy="330" r="9" fill="#60a5fa"/>
      <circle cx="250" cy="270" r="9" fill="#34d399"/>
      <!-- Formulas -->
      <text x="140" y="380" fill="#a7f3d0" font-family="Arial, sans-serif" font-weight="bold" font-size="20">H₂O</text>
      <text x="430" y="380" fill="#a7f3d0" font-family="Arial, sans-serif" font-weight="bold" font-size="20">NaCl</text>
      <text x="140" y="470" fill="#fef08a" font-family="Arial, sans-serif" font-weight="bold" font-size="18">H₂SO₄</text>
      <text x="430" y="470" fill="#fef08a" font-family="Arial, sans-serif" font-weight="bold" font-size="18">O₂ + 2H₂</text>
    `
  },
  {
    filename: 'geometry-8.svg',
    bgStart: '#1e3a8a',
    bgEnd: '#0f172a',
    accent1: '#38bdf8',
    accent2: '#60a5fa',
    gold: '#facc15',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'ГЕОМЕТРИЯ',
    subtitle: 'Планиметрия жана фигуралар',
    grade: '8',
    gradeLabel: 'КЛАСС',
    authors: 'И. Б. Бекбоев, А. А. Бөрүбаев',
    typeText: '8-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'БИЛИМ-КОМПЬЮТЕР • БИШКЕК',
    centerSvg: `
      <!-- Right Triangle & Altitude -->
      <polygon points="180,510 440,510 180,310" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="5"/>
      <line x1="180" y1="510" x2="260" y2="372" stroke="#facc15" stroke-width="4" stroke-dasharray="6,4"/>
      <!-- Inscribed Circle -->
      <circle cx="300" cy="400" r="90" fill="none" stroke="#60a5fa" stroke-width="4"/>
      <!-- Compass Tool Stylized -->
      <path d="M 300 240 L 260 360" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
      <path d="M 300 240 L 340 360" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
      <circle cx="300" cy="240" r="10" fill="#e2e8f0"/>
      <!-- Angle Arc -->
      <path d="M 230 510 A 50 50 0 0 1 200 480" fill="none" stroke="#f87171" stroke-width="4"/>
      <text x="210" y="495" fill="#f87171" font-family="Arial, sans-serif" font-weight="bold" font-size="16">α</text>
      <!-- Pythagorean Formula -->
      <rect x="210" y="535" width="180" height="34" rx="8" fill="#0f172a" fill-opacity="0.8" stroke="#38bdf8" stroke-width="2"/>
      <text x="300" y="558" fill="#facc15" font-family="Arial, sans-serif" font-weight="bold" font-size="18" text-anchor="middle">a² + b² = c²</text>
    `
  },
  {
    filename: 'kyrgyz-7.svg',
    bgStart: '#881337',
    bgEnd: '#4c0519',
    accent1: '#fb7185',
    accent2: '#f43f5e',
    gold: '#fbbf24',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'КЫРГЫЗ ТИЛИ',
    subtitle: 'Кеп маданияты жана грамматика',
    grade: '7',
    gradeLabel: 'КЛАСС',
    authors: 'А. Ибраимов, А. Сапарбаев',
    typeText: '7-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'ОКУУ КИТЕБИ • БИШКЕК',
    centerSvg: `
      <!-- Ala-Too Mountain Silhouette -->
      <polygon points="120,490 230,350 310,430 400,320 480,490" fill="#4c0519" stroke="#fb7185" stroke-width="4"/>
      <polygon points="230,350 200,390 260,390" fill="#ffffff" opacity="0.9"/>
      <polygon points="400,320 370,365 430,365" fill="#ffffff" opacity="0.9"/>
      <!-- Sun Rays -->
      <circle cx="300" cy="270" r="36" fill="#fbbf24"/>
      <circle cx="300" cy="270" r="48" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="8,6"/>
      <!-- Komuz Silhouette -->
      <ellipse cx="300" cy="460" rx="45" ry="60" fill="#b45309" stroke="#fef08a" stroke-width="3"/>
      <rect x="295" y="360" width="10" height="100" fill="#d97706" stroke="#fef08a" stroke-width="2"/>
      <circle cx="300" cy="460" r="14" fill="#78350f"/>
      <!-- Kyrgyz Ornament Waves Top & Bottom -->
      <path d="M 160 540 Q 230 520 300 540 T 440 540" fill="none" stroke="#fbbf24" stroke-width="5"/>
      <text x="300" y="575" fill="#fde047" font-family="Georgia, serif" font-weight="bold" font-size="18" text-anchor="middle">Эне тилим — байлыгым</text>
    `
  },
  {
    filename: 'algebra-10.svg',
    bgStart: '#4c1d95',
    bgEnd: '#1e1b4b',
    accent1: '#a78bfa',
    accent2: '#c084fc',
    gold: '#facc15',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'АЛГЕБРА',
    subtitle: 'жана анализдин башталышы',
    grade: '10-11',
    gradeLabel: 'КЛАСС',
    authors: 'А. А. Бөрүбаев, И. Б. Бекбоев',
    typeText: '10-11-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'БИЛИМ-КОМПЬЮТЕР • БИШКЕК',
    centerSvg: `
      <!-- Grid -->
      <line x1="160" y1="440" x2="440" y2="440" stroke="#7c3aed" stroke-width="3"/>
      <line x1="300" y1="300" x2="300" y2="520" stroke="#7c3aed" stroke-width="3"/>
      <!-- Parabola Curve -->
      <path d="M 180 320 Q 300 560 420 320" fill="none" stroke="#38bdf8" stroke-width="5"/>
      <!-- Sinusoid -->
      <path d="M 160 440 Q 230 380 300 440 T 440 440" fill="none" stroke="#facc15" stroke-width="4" stroke-dasharray="8,4"/>
      <!-- Calculus Symbols -->
      <text x="170" y="350" fill="#c084fc" font-family="Georgia, serif" font-weight="bold" font-size="44">∫</text>
      <text x="195" y="350" fill="#e9d5ff" font-family="Georgia, serif" font-size="20">f(x)dx</text>
      <text x="390" y="490" fill="#a78bfa" font-family="Arial, sans-serif" font-weight="bold" font-size="28">∑</text>
      <text x="220" y="555" fill="#fef08a" font-family="Georgia, serif" font-style="italic" font-size="20">lim f(x) = L</text>
      <text x="340" y="555" fill="#38bdf8" font-family="Georgia, serif" font-style="italic" font-size="20">f '(x) = 2x</text>
    `
  },
  {
    filename: 'history-9.svg',
    bgStart: '#78350f',
    bgEnd: '#451a03',
    accent1: '#f59e0b',
    accent2: '#fbbf24',
    gold: '#fde047',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'КЫРГЫЗСТАН ТАРЫХЫ',
    subtitle: 'Байыркы доордон бүгүнкү күнгө чейин',
    grade: '9',
    gradeLabel: 'КЛАСС',
    authors: 'Т. Чоротегин, Ө. Осмонов',
    typeText: '9-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'ИНСАНАТ • БИШКЕК',
    centerSvg: `
      <!-- Burana Tower Silhouette -->
      <rect x="260" y="320" width="80" height="170" rx="8" fill="#b45309" stroke="#fbbf24" stroke-width="4"/>
      <polygon points="250,490 350,490 340,320 260,320" fill="#92400e"/>
      <rect x="285" y="350" width="30" height="40" rx="15" fill="#451a03" stroke="#fbbf24" stroke-width="2"/>
      <rect x="290" y="420" width="20" height="35" rx="10" fill="#451a03"/>
      <!-- Petroglyph Horse & Rider -->
      <path d="M 180 430 Q 200 400 220 410 Q 210 420 200 440 L 190 460 M 215 415 L 230 405 M 190 440 L 170 450" fill="none" stroke="#fde047" stroke-width="4" stroke-linecap="round"/>
      <circle cx="210" cy="395" r="7" fill="#fde047"/>
      <!-- Mountain Horizon -->
      <path d="M 140 490 L 260 490 M 340 490 L 460 490" stroke="#d97706" stroke-width="3"/>
      <text x="300" y="550" fill="#fde047" font-family="Georgia, serif" font-weight="bold" font-size="20" text-anchor="middle">Улуу Жибек Жолу</text>
    `
  },
  {
    filename: 'ort-math.svg',
    bgStart: '#0f172a',
    bgEnd: '#020617',
    accent1: '#eab308',
    accent2: '#fde047',
    gold: '#fbbf24',
    ministry: 'ЖАЛПЫ РЕСПУБЛИКАЛЫК ТЕСТИРЛӨӨГӨ ДАЯРДЫК',
    subject: 'ЖРТ МАТЕМАТИКА',
    subtitle: 'Алтын Сертификатка жол',
    grade: 'ОРТ',
    gradeLabel: '220+',
    authors: 'С. Акматов, Б. Садыков',
    typeText: 'НЕГИЗГИ ЖАНА КОШУМЧА ТЕСТТЕР',
    pubText: 'БИЛИМ БОРБОРУ • БИШКЕК',
    centerSvg: `
      <!-- Golden Certificate Seal Medal -->
      <circle cx="300" cy="380" r="85" fill="#ca8a04" stroke="#fde047" stroke-width="6"/>
      <circle cx="300" cy="380" r="72" fill="#854d0e" stroke="#fef08a" stroke-width="3" stroke-dasharray="8,5"/>
      <!-- Laurel Leaves Garland -->
      <path d="M 230 380 Q 220 440 260 460 M 370 380 Q 380 440 340 460" fill="none" stroke="#fde047" stroke-width="4"/>
      <!-- Graduation Mortarboard Cap -->
      <polygon points="300,335 345,355 300,375 255,355" fill="#0f172a" stroke="#fef08a" stroke-width="3"/>
      <line x1="345" y1="355" x2="345" y2="385" stroke="#fef08a" stroke-width="3"/>
      <circle cx="345" cy="388" r="4" fill="#fde047"/>
      <!-- Seal Text -->
      <text x="300" y="415" fill="#fef08a" font-family="Arial, sans-serif" font-weight="900" font-size="24" text-anchor="middle">АЛТЫН</text>
      <text x="300" y="438" fill="#ffffff" font-family="Arial, sans-serif" font-weight="bold" font-size="14" text-anchor="middle">СЕРТИФИКАТ</text>
      <!-- Score Target Badge -->
      <rect x="200" y="520" width="200" height="40" rx="20" fill="#eab308" stroke="#ffffff" stroke-width="2"/>
      <text x="300" y="547" fill="#0f172a" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle">100% ДАЯРДЫК</text>
    `
  },
  {
    filename: 'physics-9.svg',
    bgStart: '#082f49',
    bgEnd: '#0284c7',
    accent1: '#38bdf8',
    accent2: '#67e8f9',
    gold: '#facc15',
    ministry: 'МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ КЫРГЫЗСКОЙ РЕСПУБЛИКИ',
    subject: 'ФИЗИКА',
    subtitle: 'Механика, оптика, кванттар',
    grade: '9',
    gradeLabel: 'КЛАСС',
    authors: 'Э. Мамбетакунов, В. Гутник',
    typeText: 'УЧЕБНИК ДЛЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ШКОЛ',
    pubText: 'БИЛИМ-КОМПЬЮТЕР • БИШКЕК',
    centerSvg: `
      <!-- Atom Center Nucleus -->
      <circle cx="300" cy="400" r="18" fill="#f43f5e"/>
      <circle cx="295" cy="395" r="7" fill="#fbbf24"/>
      <!-- Orbits Ellipses -->
      <ellipse cx="300" cy="400" rx="110" ry="40" fill="none" stroke="#38bdf8" stroke-width="4" transform="rotate(-30 300 400)"/>
      <ellipse cx="300" cy="400" rx="110" ry="40" fill="none" stroke="#67e8f9" stroke-width="4" transform="rotate(30 300 400)"/>
      <ellipse cx="300" cy="400" rx="110" ry="40" fill="none" stroke="#facc15" stroke-width="3" transform="rotate(90 300 400)"/>
      <!-- Orbiting Electrons -->
      <circle cx="210" cy="350" r="8" fill="#38bdf8"/>
      <circle cx="390" cy="450" r="8" fill="#38bdf8"/>
      <circle cx="300" cy="290" r="8" fill="#facc15"/>
      <!-- Formula -->
      <rect x="220" y="525" width="160" height="36" rx="8" fill="#082f49" fill-opacity="0.8" stroke="#38bdf8" stroke-width="2"/>
      <text x="300" y="550" fill="#facc15" font-family="Georgia, serif" font-weight="bold" font-size="22" text-anchor="middle">E = mc²</text>
    `
  },
  {
    filename: 'english-6.svg',
    bgStart: '#172554',
    bgEnd: '#1e3a8a',
    accent1: '#ef4444',
    accent2: '#60a5fa',
    gold: '#facc15',
    ministry: 'KYRGYZ REPUBLIC MINISTRY OF EDUCATION',
    subject: 'ENGLISH 6',
    subtitle: "Student's Book • Grade 6",
    grade: '6',
    gradeLabel: 'GRADE',
    authors: 'В. Эванс, А. Алымова',
    typeText: 'TEXTBOOK FOR SECONDARY SCHOOLS',
    pubText: 'OXFORD / BILIM • BISHKEK',
    centerSvg: `
      <!-- Stylized Big Ben Clock Tower -->
      <rect x="265" y="270" width="70" height="230" fill="#1e293b" stroke="#facc15" stroke-width="4"/>
      <polygon points="255,270 345,270 300,210" fill="#ef4444" stroke="#facc15" stroke-width="3"/>
      <!-- Clock Face -->
      <circle cx="300" cy="320" r="24" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
      <line x1="300" y1="320" x2="300" y2="306" stroke="#1e293b" stroke-width="3"/>
      <line x1="300" y1="320" x2="312" y2="320" stroke="#1e293b" stroke-width="3"/>
      <!-- Speech Bubbles -->
      <rect x="150" y="370" width="100" height="50" rx="14" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
      <text x="200" y="402" fill="#1e3a8a" font-family="Arial, sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Hello!</text>
      <rect x="350" y="420" width="110" height="50" rx="14" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
      <text x="405" y="452" fill="#0f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Welcome!</text>
      <!-- UK Shield -->
      <rect x="270" y="525" width="60" height="40" rx="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
      <line x1="300" y1="525" x2="300" y2="565" stroke="#ffffff" stroke-width="8"/>
      <line x1="270" y1="545" x2="330" y2="545" stroke="#ffffff" stroke-width="8"/>
    `
  },
  {
    filename: 'manas-5.svg',
    bgStart: '#134e4a',
    bgEnd: '#042f2e',
    accent1: '#2dd4bf',
    accent2: '#14b8a6',
    gold: '#fbbf24',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'МАНАС ТААНУУ',
    subtitle: 'Улуу «Манас» эпосун үйрөнүү',
    grade: '5',
    gradeLabel: 'КЛАСС',
    authors: 'С. Байгазиев',
    typeText: '5-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'ОКУУ КИТЕБИ • БИШКЕК',
    centerSvg: `
      <!-- Mountain Peaks -->
      <polygon points="120,490 240,340 320,420 410,310 480,490" fill="#042f2e" stroke="#2dd4bf" stroke-width="4"/>
      <!-- Yurt Silhouette with Tyndyk -->
      <ellipse cx="300" cy="460" rx="80" ry="40" fill="#0f766e" stroke="#fbbf24" stroke-width="3"/>
      <path d="M 220 460 C 220 400 380 400 380 460 Z" fill="#115e59" stroke="#fbbf24" stroke-width="3"/>
      <circle cx="300" cy="405" r="14" fill="#fbbf24"/>
      <!-- Warrior Spear & Shield Banner -->
      <line x1="300" y1="230" x2="300" y2="390" stroke="#fef08a" stroke-width="5"/>
      <polygon points="294,230 306,230 300,195" fill="#fef08a"/>
      <circle cx="300" cy="300" r="32" fill="#ca8a04" stroke="#ffffff" stroke-width="3"/>
      <text x="300" y="308" fill="#ffffff" font-family="Georgia, serif" font-weight="bold" font-size="22" text-anchor="middle">М</text>
      <text x="300" y="555" fill="#fde047" font-family="Georgia, serif" font-weight="bold" font-size="20" text-anchor="middle">Айкөл Манас баяны</text>
    `
  },
  {
    filename: 'biology-8.svg',
    bgStart: '#064e3b',
    bgEnd: '#022c22',
    accent1: '#10b981',
    accent2: '#86efac',
    gold: '#fb7185',
    ministry: 'КЫРГЫЗ РЕСПУБЛИКАСЫНЫН БИЛИМ БЕРҮҮ ЖАНА ИЛИМ МИНИСТРЛИГИ',
    subject: 'БИОЛОГИЯ',
    subtitle: 'Адам жана анын ден соолугу',
    grade: '8',
    gradeLabel: 'КЛАСС',
    authors: 'Ж. Абдырахманов, Д. Тентимишев',
    typeText: '8-КЛАСС ҮЧҮН ОКУУ КИТЕБИ',
    pubText: 'БИЛИМ-КОМПЬЮТЕР • БИШКЕК',
    centerSvg: `
      <!-- DNA Helix Double Strand -->
      <path d="M 260 260 Q 300 310 340 360 T 260 460 T 340 540" fill="none" stroke="#10b981" stroke-width="6"/>
      <path d="M 340 260 Q 300 310 260 360 T 340 460 T 260 540" fill="none" stroke="#34d399" stroke-width="6"/>
      <!-- Base Pairs Rungs -->
      <line x1="280" y1="285" x2="320" y2="285" stroke="#fb7185" stroke-width="4"/>
      <line x1="280" y1="335" x2="320" y2="335" stroke="#facc15" stroke-width="4"/>
      <line x1="280" y1="385" x2="320" y2="385" stroke="#60a5fa" stroke-width="4"/>
      <line x1="280" y1="435" x2="320" y2="435" stroke="#fb7185" stroke-width="4"/>
      <line x1="280" y1="485" x2="320" y2="485" stroke="#facc15" stroke-width="4"/>
      <line x1="280" y1="515" x2="320" y2="515" stroke="#60a5fa" stroke-width="4"/>
      <!-- Heart & Anatomy Badge -->
      <path d="M 410 350 C 410 330 380 330 380 360 C 380 390 410 410 410 420 C 410 410 440 390 440 360 C 440 330 410 330 410 350 Z" fill="#f43f5e" opacity="0.9"/>
      <!-- Leaf Icon -->
      <path d="M 180 350 C 180 400 230 400 230 350 C 230 300 180 300 180 350 Z" fill="#22c55e" opacity="0.8"/>
      <line x1="180" y1="400" x2="230" y2="300" stroke="#bbf7d0" stroke-width="2"/>
    `
  },
  {
    filename: 'russian-5.svg',
    bgStart: '#1e3a8a',
    bgEnd: '#172554',
    accent1: '#f59e0b',
    accent2: '#fbbf24',
    gold: '#fde047',
    ministry: 'МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ КЫРГЫЗСКОЙ РЕСПУБЛИКИ',
    subject: 'РУССКИЙ ЯЗЫК',
    subtitle: 'Теория и практика речи',
    grade: '5',
    gradeLabel: 'КЛАСС',
    authors: 'М. М. Разумовская, П. Лекант',
    typeText: 'УЧЕБНИК ДЛЯ ОБЩЕОБРАЗОВАТЕЛЬНЫХ ШКОЛ',
    pubText: 'ПРОСВЕЩЕНИЕ • БИЛИМ',
    centerSvg: `
      <!-- Open Book -->
      <path d="M 170 470 C 230 460 280 470 300 480 C 320 470 370 460 430 470 L 430 370 C 370 360 320 370 300 380 C 280 370 230 360 170 370 Z" fill="#f8fafc" stroke="#fbbf24" stroke-width="4"/>
      <line x1="300" y1="380" x2="300" y2="480" stroke="#cbd5e1" stroke-width="3"/>
      <!-- Text Lines in Book -->
      <line x1="190" y1="400" x2="280" y2="400" stroke="#94a3b8" stroke-width="3"/>
      <line x1="190" y1="420" x2="280" y2="420" stroke="#94a3b8" stroke-width="3"/>
      <line x1="190" y1="440" x2="260" y2="440" stroke="#94a3b8" stroke-width="3"/>
      <line x1="320" y1="400" x2="410" y2="400" stroke="#94a3b8" stroke-width="3"/>
      <line x1="320" y1="420" x2="410" y2="420" stroke="#94a3b8" stroke-width="3"/>
      <!-- Golden Quill Pen -->
      <path d="M 330 320 Q 370 260 400 230 C 390 270 370 300 340 330 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <line x1="340" y1="330" x2="330" y2="350" stroke="#d97706" stroke-width="3"/>
      <!-- Letters -->
      <text x="180" y="320" fill="#fde047" font-family="Georgia, serif" font-weight="bold" font-size="36">А</text>
      <text x="240" y="310" fill="#60a5fa" font-family="Georgia, serif" font-weight="bold" font-size="30">Б</text>
      <text x="380" y="310" fill="#f43f5e" font-family="Georgia, serif" font-weight="bold" font-size="30">В</text>
      <text x="430" y="330" fill="#fde047" font-family="Georgia, serif" font-weight="bold" font-size="36">Я</text>
    `
  },
  {
    filename: 'ort-kyrgyz.svg',
    bgStart: '#831843',
    bgEnd: '#500724',
    accent1: '#f43f5e',
    accent2: '#fbbf24',
    gold: '#fde047',
    ministry: 'ЖАЛПЫ РЕСПУБЛИКАЛЫК ТЕСТИРЛӨӨ',
    subject: 'ЖРТ КЫРГЫЗ ТИЛИ',
    subtitle: 'Окуу, түшүнүү жана сөздүк',
    grade: 'ОРТ',
    gradeLabel: '100%',
    authors: 'Г. Орозова, Т. Бакасова',
    typeText: 'НЕГИЗГИ ТЕСТКЕ ДАЯРДЫК КОЛДОНМОСУ',
    pubText: 'БИЛИМ БОРБОРУ • БИШКЕК',
    centerSvg: `
      <!-- Certificate Badge -->
      <circle cx="300" cy="380" r="80" fill="#be185d" stroke="#fde047" stroke-width="5"/>
      <circle cx="300" cy="380" r="66" fill="#831843" stroke="#fef08a" stroke-width="2" stroke-dasharray="6,4"/>
      <!-- Open Dictionary Book -->
      <path d="M 230 400 Q 270 380 300 390 Q 330 380 370 400 L 370 340 Q 330 320 300 330 Q 270 320 230 340 Z" fill="#ffffff" stroke="#fde047" stroke-width="3"/>
      <!-- Checklist / Accuracy Target -->
      <circle cx="300" cy="445" r="16" fill="#10b981"/>
      <path d="M 292 445 L 298 451 L 309 439" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <text x="300" y="525" fill="#fde047" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">АНАЛОГИЯЛАР</text>
      <text x="300" y="555" fill="#fce7f3" font-family="Arial, sans-serif" font-weight="bold" font-size="16" text-anchor="middle">ТЕКСТТИ ТҮШҮНҮҮ</text>
    `
  }
];

covers.forEach(c => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bgStart}" />
      <stop offset="100%" stop-color="${c.bgEnd}" />
    </linearGradient>

    <!-- Spine 3D Shadow -->
    <linearGradient id="spineShadow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="3%" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="6%" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="10%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>

    <!-- Top Highlight -->
    <linearGradient id="topGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Base Cover -->
  <rect x="0" y="0" width="600" height="850" rx="16" fill="url(#bgGrad)" />

  <!-- Background Decorative Lines -->
  <circle cx="300" cy="425" r="260" fill="none" stroke="${c.accent1}" stroke-opacity="0.12" stroke-width="48" />
  <circle cx="300" cy="425" r="180" fill="none" stroke="${c.accent2}" stroke-opacity="0.15" stroke-width="2" stroke-dasharray="10,6" />

  <!-- Outer Border Frame -->
  <rect x="25" y="25" width="550" height="800" rx="10" fill="none" stroke="${c.gold}" stroke-opacity="0.4" stroke-width="2" />
  <rect x="33" y="33" width="534" height="784" rx="8" fill="none" stroke="${c.gold}" stroke-opacity="0.2" stroke-width="1" />

  <!-- Top Header Ministry -->
  <text x="300" y="70" fill="#ffffff" fill-opacity="0.8" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle" letter-spacing="1.5">
    ${c.ministry}
  </text>

  <!-- Authors -->
  <text x="300" y="115" fill="${c.gold}" font-family="Arial, sans-serif" font-weight="600" font-size="18" text-anchor="middle">
    ${c.authors}
  </text>

  <!-- Grade Badge (Top Right) -->
  <g transform="translate(480, 80)">
    <circle cx="30" cy="30" r="34" fill="${c.gold}" stroke="#ffffff" stroke-width="3" />
    <text x="30" y="32" fill="#0f172a" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">${c.grade}</text>
    <text x="30" y="47" fill="#0f172a" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">${c.gradeLabel}</text>
  </g>

  <!-- Subject Title Header Banner -->
  <g transform="translate(0, 140)">
    <rect x="60" y="10" width="480" height="75" rx="14" fill="#000000" fill-opacity="0.3" stroke="${c.accent1}" stroke-width="2" />
    <text x="300" y="58" fill="#ffffff" font-family="'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="38" text-anchor="middle" letter-spacing="3">
      ${c.subject}
    </text>
  </g>

  <!-- Subtitle -->
  <text x="300" y="248" fill="${c.accent2}" font-family="Arial, sans-serif" font-weight="500" font-size="16" text-anchor="middle">
    ${c.subtitle}
  </text>

  <!-- Center Thematic Illustration -->
  <g>
    ${c.centerSvg}
  </g>

  <!-- Bottom Type Text & Publisher -->
  <rect x="70" y="690" width="460" height="1" fill="${c.gold}" fill-opacity="0.4"/>
  <text x="300" y="730" fill="#ffffff" fill-opacity="0.9" font-family="Arial, sans-serif" font-weight="bold" font-size="13" text-anchor="middle" letter-spacing="1">
    ${c.typeText}
  </text>
  <text x="300" y="775" fill="${c.gold}" fill-opacity="0.8" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle" letter-spacing="2">
    ${c.pubText}
  </text>

  <!-- Top Gloss Highlight -->
  <rect x="0" y="0" width="600" height="400" rx="16" fill="url(#topGlow)" pointer-events="none" />

  <!-- 3D Realistic Spine Shadow on Left Edge -->
  <rect x="0" y="0" width="50" height="850" fill="url(#spineShadow)" pointer-events="none" />
</svg>`;

  const filePath = path.join(outDir, c.filename);
  fs.writeFileSync(filePath, svg.trim(), 'utf-8');
  console.log(`Generated: ${c.filename}`);
});

console.log('All 12 textbook covers successfully generated in public/covers!');
