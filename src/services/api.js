// Hybrid REST API Service with Neon Postgres & LocalStorage fallback
import { neonService, isNeonAvailable } from './neonClient.js';
import { generateUuid } from '../utils/uuid.js';

const STORAGE_KEY_BOOKS = 'bilimkitep_books_db';
const STORAGE_KEY_ORDERS = 'bilimkitep_orders_db';

const RAW_INITIAL_BOOKS = [
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
    title: "Алгебра жана анализдин башталышы 10-класс",
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
    title: "ЖРТ Математика 11-класс (Алтын Сертификат)",
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
    title: "Физика 9-класс (на русском)",
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
    title: "Химия 8-класс (на русском)",
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
    title: "English 6-класс (Student's Book)",
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
    title: "Биология 8-класс (Адам жана ден соолук)",
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
    title: "ЖРТ Кыргыз тили 11-класс (Тесттер жыйнагы)",
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
  },
  {
    id: "b_113",
    title: "Алиппе 1-класс",
    author: "Т. К. Сапаралиев, Р. А. Абдувалиев",
    subject: "Кыргыз тили",
    grade: 1,
    language: "KG",
    dealType: "BOTH",
    price: 250,
    rentPricePerMonth: 30,
    deposit: 100,
    condition: "NEW",
    year: 2024,
    images: ["/covers/alippe-1.svg"],
    description: "Кыргыз Республикасынын Билим берүү жана илим министрлиги тарабынан бекитилген 1-класстын негизги окуу куралы. Тамгаларды таануу, окуу жана жазууга үйрөтүүчү бай иллюстрациялуу китеп.",
    status: "AVAILABLE",
    owner: {
      id: "u_501",
      name: "Айнура Бекова",
      phone: "+996 700 112 233",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 5.0,
    reviewsCount: 16,
    reviews: []
  },
  {
    id: "b_114",
    title: "Адабий окуу 3-класс",
    author: "К. А. Абдухамидова, М. К. Рысбаев",
    subject: "Адабият",
    grade: 3,
    language: "KG",
    dealType: "RENT",
    price: 270,
    rentPricePerMonth: 35,
    deposit: 120,
    condition: "EXCELLENT",
    year: 2023,
    images: ["/covers/adabiyat-3.svg"],
    description: "Башталгыч класстар үчүн адабий окуу жана кеп өстүрүү китеби. Элдик жомоктор, балдар ырлары, табышмактар жана кызыктуу аңгемелер.",
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
    reviews: []
  },
  {
    id: "b_115",
    title: "Литературное чтение 4-класс",
    author: "В. Г. Горецкий, Л. Ф. Климанова",
    subject: "Русский язык",
    grade: 4,
    language: "RU",
    dealType: "BOTH",
    price: 280,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "GOOD",
    year: 2022,
    images: ["/covers/reading-4.svg"],
    description: "Учебник литературного чтения для 4 класса общеобразовательных школ Кыргызстана с русским языком обучения. Классические произведения, сказки народов мира и выразительное чтение.",
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
    id: "b_116",
    title: "Кыргыз адабияты 9-класс",
    author: "К. Асаналиев, С. Байгазиев",
    subject: "Адабият",
    grade: 9,
    language: "KG",
    dealType: "RENT",
    price: 320,
    rentPricePerMonth: 40,
    deposit: 150,
    condition: "EXCELLENT",
    year: 2021,
    images: ["/covers/adabiyat-9.svg"],
    description: "9-класстар үчүн кыргыз адабиятынын тарыхы жана хрестоматиясы. Молдо Кылыч, Токтогул Сатылганов, Касым Тыныстанов жана Жусуп Турусбековдун чыгармалары.",
    status: "AVAILABLE",
    owner: {
      id: "u_504",
      name: "Эркин Садыков",
      phone: "+996 777 555 444",
      city: "Жалал-Абад",
      rating: 4.7
    },
    rating: 4.7,
    reviewsCount: 4,
    reviews: []
  },
  {
    id: "b_117",
    title: "Кыргызстан тарыхы 8-класс",
    author: "Т. К. Чоротегин, Т. Өмүрбеков",
    subject: "Тарых",
    grade: 8,
    language: "KG",
    dealType: "BOTH",
    price: 330,
    rentPricePerMonth: 40,
    deposit: 150,
    condition: "GOOD",
    year: 2023,
    images: ["/covers/history-8.svg"],
    description: "XVI кылымдан XIX кылымдын ортосуна чейинки кыргыз элинин тарыхы. Көчмөн мамлекеттүүлүк, Кокон хандыгы, кыргыздардын эркиндик күрөшү жана маданий мурастары.",
    status: "AVAILABLE",
    owner: {
      id: "u_509",
      name: "Бектур Токтогулов",
      phone: "+996 702 331 122",
      city: "Нарын",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 11,
    reviews: []
  },
  {
    id: "b_118",
    title: "Кыргызстандын географиясы 8-класс",
    author: "К. М. Джумашев, М. Б. Бараталиев",
    subject: "География",
    grade: 8,
    language: "KG",
    dealType: "RENT",
    price: 340,
    rentPricePerMonth: 40,
    deposit: 160,
    condition: "EXCELLENT",
    year: 2022,
    images: ["/covers/geography-8.svg"],
    description: "Кыргызстандын табигый, калктык жана экономикалык географиясы. 7 облус, тоо системалары (Тянь-Шань, Алай), суу байлыктары (Ысык-Көл, Токтогул) жана кен байлыктары.",
    status: "AVAILABLE",
    owner: {
      id: "u_508",
      name: "Каныкей Асанбекова",
      phone: "+996 770 889 900",
      city: "Каракол",
      rating: 4.8
    },
    rating: 4.8,
    reviewsCount: 6,
    reviews: []
  },
  {
    id: "b_119",
    title: "Информатика жана ИКТ 7-класс",
    author: "А. С. Сулайманов, Г. К. Кошоева",
    subject: "Информатика",
    grade: 7,
    language: "KG",
    dealType: "BOTH",
    price: 310,
    rentPricePerMonth: 35,
    deposit: 140,
    condition: "GOOD",
    year: 2023,
    images: ["/covers/informatics-7.svg"],
    description: "7-класс үчүн маалыматтык-коммуникациялык технологиялар. Компьютердин архитектурасы, операциялык системалар, алгоритмдер жана киберкоопсуздук негиздери.",
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
    reviews: []
  },
  {
    id: "b_120",
    title: "Информатика жана санариптик сабаттуулук 9-класс",
    author: "А. С. Сулайманов, Г. К. Кошоева",
    subject: "Информатика",
    grade: 9,
    language: "RU",
    dealType: "RENT",
    price: 350,
    rentPricePerMonth: 40,
    deposit: 160,
    condition: "EXCELLENT",
    year: 2022,
    images: ["/covers/informatics-9.svg"],
    description: "9-класс үчүн программалоо негиздери (Python), маалыматтар базасы, желе технологиялары жана санариптик коопсуздук.",
    status: "AVAILABLE",
    owner: {
      id: "u_507",
      name: "Елена Смирнова",
      phone: "+996 550 445 566",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 5.0,
    reviewsCount: 12,
    reviews: []
  },
  {
    id: "b_121",
    title: "Адам жана коом 10-класс",
    author: "М. Т. Иманкулов, А. К. Чороев",
    subject: "Адам жана коом",
    grade: 10,
    language: "KG",
    dealType: "BOTH",
    price: 300,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "GOOD",
    year: 2021,
    images: ["/covers/society-10.svg"],
    description: "Жарандык билим берүү, Кыргыз Республикасынын Конституциясы, укуктук мамлекеттин негиздери жана жаштардын коомдук турмуштагы орду.",
    status: "AVAILABLE",
    owner: {
      id: "u_501",
      name: "Айнура Бекова",
      phone: "+996 700 112 233",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.8,
    reviewsCount: 3,
    reviews: []
  },
  {
    id: "b_122",
    title: "Алгебра 7-класс",
    author: "И. Б. Бекбоев, Н. Н. Закирова",
    subject: "Алгебра",
    grade: 7,
    language: "KG",
    dealType: "RENT",
    price: 290,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "EXCELLENT",
    year: 2023,
    images: ["/covers/algebra-7.svg"],
    description: "7-класстар үчүн алгебранын баштапкы курсу. Бир мүчөлөр жана көп мүчөлөр, кыскача көбөйтүүнүн формулалары жана бир белгисиздүү сызыктуу теңдемелер.",
    status: "AVAILABLE",
    owner: {
      id: "u_505",
      name: "Алина Жумалиева",
      phone: "+996 500 223 344",
      city: "Талас",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 8,
    reviews: []
  },
  {
    id: "b_123",
    title: "English Plus 8-класс (Student's Book)",
    author: "Ben Wetz, Diana Pye",
    subject: "Англис тили",
    grade: 8,
    language: "EN",
    dealType: "BOTH",
    price: 450,
    rentPricePerMonth: 55,
    deposit: 200,
    condition: "NEW",
    year: 2024,
    images: ["/covers/english-8.svg"],
    description: "Special Edition for the Kyrgyz Republic approved by the Ministry of Education. Modern communicative English textbook for 8th grade students with interactive tasks and exam preparation.",
    status: "AVAILABLE",
    owner: {
      id: "u_508",
      name: "Каныкей Асанбекова",
      phone: "+996 770 889 900",
      city: "Каракол",
      rating: 4.8
    },
    rating: 5.0,
    reviewsCount: 15,
    reviews: []
  },
  {
    id: "b_124",
    title: "Физика 7-класс",
    author: "Э. Мамбетакунов, В. Д. Бабаев",
    subject: "Физика",
    grade: 7,
    language: "KG",
    dealType: "RENT",
    price: 300,
    rentPricePerMonth: 35,
    deposit: 130,
    condition: "GOOD",
    year: 2021,
    images: ["/covers/physics-7.svg"],
    description: "Жалпы билим берүүчү мектептердин 7-класстары үчүн физика курсу. Заттын түзүлүшү, кыймыл жана ылдамдык, масса, күч жана басым боюнча түшүнүктөр жана тажрыйбалар.",
    status: "AVAILABLE",
    owner: {
      id: "u_503",
      name: "Чынара Касымова",
      phone: "+996 555 987 654",
      city: "Ош",
      rating: 4.8
    },
    rating: 4.7,
    reviewsCount: 5,
    reviews: []
  },
  {
    id: "b_125",
    title: "Химия 9-класс",
    author: "К. С. Рысмендеев, А. Сатывалдиев",
    subject: "Химия",
    grade: 9,
    language: "KG",
    dealType: "BOTH",
    price: 320,
    rentPricePerMonth: 40,
    deposit: 140,
    condition: "EXCELLENT",
    year: 2022,
    images: ["/covers/chemistry-9.svg"],
    description: "9-класстар үчүн органикалык эмес химия окуу китеби. Электролиттик диссоциация, галогендер, күкүрт, азот, металлдар жана химиялык эксперименттер.",
    status: "AVAILABLE",
    owner: {
      id: "u_504",
      name: "Эркин Садыков",
      phone: "+996 777 555 444",
      city: "Жалал-Абад",
      rating: 4.7
    },
    rating: 4.9,
    reviewsCount: 6,
    reviews: []
  },
  {
    id: "b_126",
    title: "ЖРТ Тарых 11-класс (Тесттер жыйнагы)",
    author: "ЦООМО • Билимди баалоо борбору",
    subject: "ОРТ / ЖРТ",
    grade: 11,
    language: "KG",
    dealType: "BUY",
    price: 420,
    rentPricePerMonth: 50,
    deposit: 200,
    condition: "NEW",
    year: 2025,
    images: ["/covers/ort-history.svg"],
    description: "Жалпы республикалык тестирлөөнүн (ЖРТ/ОРТ) тарых предмети боюнча кошумча тестине комплекстүү даярдык. Тесттер, жооптордун түшүндүрмөлөрү жана талдоо карталары.",
    status: "AVAILABLE",
    owner: {
      id: "u_506",
      name: "Билим Борбору «Келечек»",
      phone: "+996 312 900 100",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 20,
    reviews: []
  },
  {
    id: "b_127",
    title: "Эне тили 2-класс",
    author: "Т. Асаналиев, М. Рысбаев",
    subject: "Кыргыз тили",
    grade: 2,
    language: "KG",
    dealType: "BOTH",
    price: 260,
    rentPricePerMonth: 30,
    deposit: 100,
    condition: "EXCELLENT",
    year: 2023,
    images: ["/covers/kyrgyz-7.svg"],
    description: "2-класстар үчүн эне тили окуу китеби. Муундар, сөздөр, сүйлөм түзүү, көнүгүүлөр жана көркөм тексти түшүнүү.",
    status: "AVAILABLE",
    owner: {
      id: "u_501",
      name: "Айнура Бекова",
      phone: "+996 700 112 233",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 5.0,
    reviewsCount: 10,
    reviews: []
  },
  {
    id: "b_128",
    title: "Математика 2-класс",
    author: "И. Б. Бекбоев, Н. И. Ибраева",
    subject: "Математика",
    grade: 2,
    language: "KG",
    dealType: "RENT",
    price: 270,
    rentPricePerMonth: 35,
    deposit: 110,
    condition: "GOOD",
    year: 2022,
    images: ["/covers/algebra-7.svg"],
    description: "Башталгыч 2-класс үчүн математика. 100гө чейинки сандар, кошуу жана кемитүү амалдары, геометриялык фигуралар.",
    status: "AVAILABLE",
    owner: {
      id: "u_502",
      name: "Айбек Нурланов",
      phone: "+996 700 123 456",
      city: "Бишкек",
      rating: 4.9
    },
    rating: 4.8,
    reviewsCount: 7,
    reviews: []
  },
  {
    id: "b_129",
    title: "Математика 6-класс",
    author: "С. М. Мусабеков, А. А. Бөрүбаев",
    subject: "Математика",
    grade: 6,
    language: "KG",
    dealType: "BOTH",
    price: 310,
    rentPricePerMonth: 40,
    deposit: 140,
    condition: "EXCELLENT",
    year: 2023,
    images: ["/covers/algebra-7.svg"],
    description: "6-класстын математика курсу. Жөнөкөй жана ондук бөлчөктөр, пропорциялар, терс сандар жана координаталар тегиздиги.",
    status: "AVAILABLE",
    owner: {
      id: "u_505",
      name: "Алина Жумалиева",
      phone: "+996 500 223 344",
      city: "Талас",
      rating: 4.9
    },
    rating: 4.9,
    reviewsCount: 9,
    reviews: []
  },
  {
    id: "b_130",
    title: "Геометрия 10-класс",
    author: "И. Б. Бекбоев, А. А. Бөрүбаев",
    subject: "Геометрия",
    grade: 10,
    language: "KG",
    dealType: "RENT",
    price: 360,
    rentPricePerMonth: 45,
    deposit: 160,
    condition: "GOOD",
    year: 2021,
    images: ["/covers/geometry-8.svg"],
    description: "Стереометрия негиздери: мейкиндиктеги түз сызыктар жана тегиздиктер, призмалар, пирамидалар жана айлануу нерселери.",
    status: "AVAILABLE",
    owner: {
      id: "u_504",
      name: "Марат Осмонов",
      phone: "+996 772 334 455",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 14,
    reviews: []
  },
  {
    id: "b_131",
    title: "Алгебра жана анализдин башталышы 11-класс",
    author: "А. А. Бөрүбаев, И. Б. Бекбоев",
    subject: "Алгебра",
    grade: 11,
    language: "KG",
    dealType: "BOTH",
    price: 460,
    rentPricePerMonth: 55,
    deposit: 200,
    condition: "NEW",
    year: 2024,
    images: ["/covers/algebra-10.svg"],
    description: "11-класстын бүтүрүүчүлөрү үчүн алгебра: баштапкы функция жана интеграл, дифференциалдык теңдемелер жана комбинаторика.",
    status: "AVAILABLE",
    owner: {
      id: "u_506",
      name: "Билим Борбору «Келечек»",
      phone: "+996 312 900 100",
      city: "Бишкек",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 18,
    reviews: []
  },
  {
    id: "b_132",
    title: "Кыргыз адабияты 11-класс",
    author: "К. Асаналиев, С. Байгазиев",
    subject: "Адабият",
    grade: 11,
    language: "KG",
    dealType: "RENT",
    price: 340,
    rentPricePerMonth: 40,
    deposit: 150,
    condition: "EXCELLENT",
    year: 2023,
    images: ["/covers/adabiyat-9.svg"],
    description: "XX кылымдагы жана азыркы кыргыз адабияты. Чыңгыз Айтматовдун дүйнөлүк маанидеги шедевр романдары жана повесттери.",
    status: "AVAILABLE",
    owner: {
      id: "u_509",
      name: "Бектур Токтогулов",
      phone: "+996 702 331 122",
      city: "Нарын",
      rating: 5.0
    },
    rating: 5.0,
    reviewsCount: 8,
    reviews: []
  }
];

export const INITIAL_BOOKS = RAW_INITIAL_BOOKS.map((b, idx) => {
  const num = String(101 + idx).padStart(4, '0');
  const uuid = `b${num}00-7c2a-41e9-9011-00000000${num}`;
  const initialStock = b.initialStock ?? ((idx % 5) + 6);
  const soldCount = b.soldCount ?? ((idx % 4) + 1);
  const quantity = b.quantity ?? Math.max(1, initialStock - soldCount);

  // Admin books (New, from platform warehouse): idx % 2 === 0
  // User books (Used / б/у, sold by students/parents): idx % 2 !== 0
  const isAdminBook = (idx % 2 === 0);
  const isUsed = !isAdminBook;

  const adminOwner = {
    id: 'a0010000-7c2a-41e9-9011-000000000001',
    uuid: 'a0010000-7c2a-41e9-9011-000000000001',
    name: 'BilimKitep (Администрация платформы)',
    phone: '+996 555 999 000',
    city: 'Бишкек',
    role: 'ADMIN',
    rating: 5.0,
  };

  const userOwner = b.owner ? {
    ...b.owner,
    role: 'USER',
    uuid: `a00${(idx % 5) + 1}0000-7c2a-41e9-9011-00000000000${(idx % 5) + 1}`,
    id: b.owner.id || `a00${(idx % 5) + 1}0000-7c2a-41e9-9011-00000000000${(idx % 5) + 1}`
  } : {
    id: 'u_user',
    name: 'Айбек Нурланов',
    role: 'USER',
    phone: '+996 700 123 456',
    city: 'Бишкек',
    rating: 4.8,
  };

  const sampleSales = [
    {
      orderId: `ORD-${8200 + idx}`,
      customerName: ['Каныбек Жумабеков', 'Айнура Садыкова', 'Тимур Бектурсунов', 'Азамат Орозов'][idx % 4],
      customerPhone: ['+996 700 889 900', '+996 550 334 455', '+996 772 112 233', '+996 505 443 322'][idx % 4],
      city: ['Бишкек', 'Ош', 'Жалал-Абад', 'Каракол'][idx % 4],
      quantity: 1,
      dealType: b.dealType === 'RENT' ? 'RENT' : 'BUY',
      price: b.dealType === 'RENT' ? (b.rentPricePerMonth * 9) : b.price,
      totalAmount: b.dealType === 'RENT' ? (b.rentPricePerMonth * 9 + (b.deposit || 0)) : b.price,
      date: `2026-10-${String((idx % 25) + 1).padStart(2, '0')}`,
      status: 'DELIVERED',
    }
  ];

  return {
    ...b,
    uuid,
    id: b.id || uuid,
    legacyId: b.id,
    quantity,
    initialStock,
    soldCount,
    sales: b.sales || sampleSales,
    isAdminBook,
    isUsed,
    condition: isAdminBook ? 'NEW' : (b.condition === 'NEW' ? 'EXCELLENT' : (b.condition || 'GOOD')),
    owner: isAdminBook ? adminOwner : userOwner,
    reviews: (b.reviews || []).map((r, rIdx) => ({
      ...r,
      uuid: `f00${idx + 1}0000-7c2a-41e9-9011-00000000000${rIdx + 1}`,
      id: r.id || `f00${idx + 1}0000-7c2a-41e9-9011-00000000000${rIdx + 1}`
    }))
  };
});

const getStoredBooks = () => {
  if (typeof window === 'undefined') return INITIAL_BOOKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    const parsed = JSON.parse(raw);
    const hasOldImages = Array.isArray(parsed) && parsed.some(b => b.images?.[0]?.includes('unsplash.com'));
    const lacksUuids = Array.isArray(parsed) && parsed.some(b => !b.uuid);
    const lacksStock = Array.isArray(parsed) && parsed.some(b => b.quantity === undefined);
    const lacksUsedFlag = Array.isArray(parsed) && parsed.some(b => b.isUsed === undefined);
    if (hasOldImages || lacksUuids || lacksStock || lacksUsedFlag) {
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
      if (params.grade === 'primary') {
        books = books.filter(b => Number(b.grade) >= 1 && Number(b.grade) <= 4);
      } else if (params.grade === 'middle') {
        books = books.filter(b => Number(b.grade) >= 5 && Number(b.grade) <= 9);
      } else if (params.grade === 'senior') {
        books = books.filter(b => Number(b.grade) >= 10 && Number(b.grade) <= 11);
      } else {
        books = books.filter(b => String(b.grade) === String(params.grade));
      }
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

    // Priority ranking: Admin books first, then User books
    const getAdminRank = (book) => {
      if (book.isAdminBook === true || book.owner?.role === 'ADMIN' || book.isOfficial === true) return 0;
      return 1;
    };

    // Sorting
    books.sort((a, b) => {
      const rankDiff = getAdminRank(a) - getAdminRank(b);
      if (rankDiff !== 0) return rankDiff;

      if (params.sort === 'priceAsc') {
        return a.price - b.price;
      } else if (params.sort === 'priceDesc') {
        return b.price - a.price;
      } else if (params.sort === 'rating') {
        return (b.rating || 0) - (a.rating || 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0);
      } else if (params.sort === 'reviews') {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0) || (b.rating || 0) - (a.rating || 0);
      } else if (params.sort === 'sales' || params.sort === 'popular') {
        return (b.soldCount || 0) - (a.soldCount || 0);
      } else {
        // Newest
        return (b.year || 2020) - (a.year || 2020);
      }
    });

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
    const book = books.find(b => b.uuid === id || b.id === id || b.legacyId === id);
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
    const uuid = bookData.uuid || generateUuid();
    const qty = Math.max(0, Number(bookData.quantity) || 1);
    const isAdmin = bookData.isAdminBook === true || bookData.owner?.role === 'ADMIN';
    const isUsed = bookData.isUsed !== undefined ? Boolean(bookData.isUsed) : !isAdmin;
    const newBook = {
      uuid,
      id: bookData.id || uuid,
      legacyId: bookData.id || null,
      status: qty > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK',
      rating: 5.0,
      reviewsCount: 0,
      reviews: [],
      quantity: qty,
      initialStock: Math.max(qty, Number(bookData.initialStock) || qty),
      soldCount: 0,
      sales: [],
      isAdminBook: isAdmin,
      isUsed: isUsed,
      condition: isAdmin ? (bookData.condition || 'NEW') : (bookData.condition || 'GOOD'),
      images: bookData.images && bookData.images.length > 0
        ? bookData.images
        : ["/covers/geometry-8.svg"],
      ...bookData,
      uuid,
      id: bookData.id || uuid,
      isAdminBook: isAdmin,
      isUsed: isUsed,
      quantity: qty,
      initialStock: Math.max(qty, Number(bookData.initialStock) || qty),
      grade: Number(bookData.grade) || 8,
      price: Number(bookData.price) || 300,
      rentPricePerMonth: Number(bookData.rentPricePerMonth) || 40,
      deposit: Number(bookData.deposit) || 150,
    };
    books.unshift(newBook);
    saveStoredBooks(books);
    return newBook;
  },

  async updateBookStock(id, newQuantity) {
    if (isNeonAvailable()) {
      try {
        const updated = await neonService.updateBook(id, { quantity: newQuantity });
        const books = getStoredBooks();
        const index = books.findIndex(b => b.uuid === id || b.id === id || b.legacyId === id);
        if (index > -1) {
          books[index] = { ...books[index], quantity: newQuantity };
          saveStoredBooks(books);
        }
        return books[index] || updated;
      } catch (err) {
        console.warn('[API] Neon updateBookStock fallback to local:', err.message);
      }
    }

    await delay();
    const books = getStoredBooks();
    const index = books.findIndex(b => b.uuid === id || b.id === id || b.legacyId === id);
    if (index === -1) throw new Error(`Учебник с ID ${id} не найден`);
    const qty = Math.max(0, Number(newQuantity) || 0);
    books[index].quantity = qty;
    if (!books[index].initialStock || books[index].initialStock < qty) {
      books[index].initialStock = qty + (books[index].soldCount || 0);
    }
    books[index].status = qty > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK';
    saveStoredBooks(books);
    return books[index];
  },

  async updateBook(id, updateData) {
    if (isNeonAvailable()) {
      try {
        const updated = await neonService.updateBook(id, updateData);
        const books = getStoredBooks();
        const index = books.findIndex(b => b.uuid === id || b.id === id || b.legacyId === id);
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
    const index = books.findIndex(b => b.uuid === id || b.id === id || b.legacyId === id);
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
    books = books.filter(b => b.uuid !== id && b.id !== id && b.legacyId !== id);
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
    const book = books.find(b => b.uuid === bookId || b.id === bookId || b.legacyId === bookId);
    if (!book) throw new Error('Книга не найдена');
    const revUuid = review.uuid || generateUuid();
    const newReview = {
      uuid: revUuid,
      id: review.id || revUuid,
      date: new Date().toLocaleDateString('ru-RU'),
      ...review,
      uuid: revUuid,
      id: review.id || revUuid,
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
    const ordUuid = orderData.uuid || generateUuid();
    const newOrder = {
      uuid: ordUuid,
      id: orderData.id || ordUuid,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      ...orderData,
      uuid: ordUuid,
      id: orderData.id || ordUuid,
    };
    orders.unshift(newOrder);
    saveStoredOrders(orders);

    // Auto-deduct stock and record sales on affected books
    try {
      const books = getStoredBooks();
      let modifiedBooks = false;
      const items = Array.isArray(orderData.items) ? orderData.items : [];
      items.forEach(item => {
        const bookId = item.id || item.uuid || item.bookId;
        const book = books.find(b => b.uuid === bookId || b.id === bookId || b.legacyId === bookId);
        if (book) {
          modifiedBooks = true;
          const buyQty = Math.max(1, Number(item.quantity) || 1);
          book.soldCount = (book.soldCount || 0) + buyQty;
          book.quantity = Math.max(0, (book.quantity ?? 1) - buyQty);
          if (book.quantity === 0) {
            book.status = 'OUT_OF_STOCK';
          }
          const saleRecord = {
            orderId: ordUuid,
            customerName: orderData.recipientName || orderData.customerName || 'Покупатель',
            customerPhone: orderData.phone || orderData.customerPhone || '',
            city: orderData.city || 'Бишкек',
            quantity: buyQty,
            dealType: item.dealType || 'BUY',
            price: Number(item.price) || (item.dealType === 'RENT' ? (item.rentPricePerMonth * 9) : book.price),
            totalAmount: (Number(item.price) || book.price) * buyQty,
            date: new Date().toISOString(),
            status: 'CONFIRMED',
          };
          book.sales = book.sales || [];
          book.sales.unshift(saleRecord);
        }
      });
      if (modifiedBooks) {
        saveStoredBooks(books);
      }
    } catch (stockErr) {
      console.warn('[API] Failed to update book stock on order:', stockErr);
    }

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
    const totalBooksSold = books.reduce((acc, b) => acc + (Number(b.soldCount) || 0), 0);
    const totalBooksInStock = books.reduce((acc, b) => acc + (Number(b.quantity) || 0), 0);

    return {
      totalRevenue: revenue,
      activeRentals: orders.length + 42,
      totalBooks: books.length,
      totalBooksSold,
      totalBooksInStock,
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
