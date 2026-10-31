/**
 * Multilingual Textbook Data Localization Service
 * Provides complete translation for textbook titles, descriptions, subjects,
 * cities, medium of instruction, and author names across Kyrgyz (KG), Russian (RU), and English (EN).
 * All 32 textbooks (b_101 through b_132) strictly match their official grade, subject, and syllabus.
 */

export const BOOK_TRANSLATIONS = {
  b_101: {
    title: {
      kg: 'Геометрия 8-класс',
      ru: 'Геометрия 8 класс',
      en: 'Geometry Grade 8',
    },
    author: {
      kg: 'И. Б. Бекбоев, А. А. Бөрүбаев',
      ru: 'И. Б. Бекбоев, А. А. Бөрүбаев',
      en: 'I. B. Bekboev, A. A. Borubaev',
    },
    desc: {
      kg: 'Кыргыз тилиндеги 8-класстар үчүн геометрия окуу китеби. Планиметрия, көп бурчтуктар, Пифагордун теоремасы жана фигуралардын аянттары.',
      ru: 'Учебник геометрии для 8 классов. Планиметрия, многоугольники, теорема Пифагора и вычисление площадей плоских фигур.',
      en: 'Grade 8 Geometry textbook. Planimetry, polygons, Pythagorean theorem, and surface area calculations with visual problem sets.',
    },
  },
  b_102: {
    title: {
      kg: 'Кыргыз тили 7-класс',
      ru: 'Кыргызский язык 7 класс',
      en: 'Kyrgyz Language Grade 7',
    },
    author: {
      kg: 'А. Ибраимов, А. Сапарбаев',
      ru: 'А. Ибраимов, А. Сапарбаев',
      en: 'A. Ibraimov, A. Saparbaev',
    },
    desc: {
      kg: 'Жаңыдай сакталган окуу китеби. Кеп маданияты, морфология, этиштер жана бардык эрежелер так берилген.',
      ru: 'Учебник кыргызского языка для 7 класса в отличном состоянии. Культура речи, морфология, глаголы и систематизированные правила.',
      en: 'Comprehensive Grade 7 Kyrgyz language textbook. Speech culture, morphology, verbs, and grammar rules for secondary schools.',
    },
  },
  b_103: {
    title: {
      kg: 'Алгебра жана анализдин башталышы 10-класс',
      ru: 'Алгебра и начала анализа 10 класс',
      en: 'Algebra & Calculus Grade 10',
    },
    author: {
      kg: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      ru: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      en: 'A. A. Borubaev, I. B. Bekboev',
    },
    desc: {
      kg: 'Жогорку 10-класс үчүн алгебра жана анализ окуу китеби. Тригонометриялык функциялар, туунду жана экстремумдар.',
      ru: 'Учебник по алгебре и математическому анализу для 10 класса. Тригонометрические функции, производные, пределы и экстремумы функций.',
      en: 'Grade 10 Algebra & Calculus textbook covering trigonometric functions, derivatives, limits, and mathematical analysis fundamentals.',
    },
  },
  b_104: {
    title: {
      kg: 'Кыргызстан тарыхы 9-класс',
      ru: 'История Кыргызстана 9 класс',
      en: 'History of Kyrgyzstan Grade 9',
    },
    author: {
      kg: 'Т. Чоротегин, Ө. Осмонов',
      ru: 'Т. Чоротегин, О. Осмонов',
      en: 'T. Chorotegin, O. Osmonov',
    },
    desc: {
      kg: 'Кыргызстандын байыркы доордон бүгүнкү күнгө чейинки тарыхы. Бурана мунарасы, Улуу Жибек жолу, тарыхый карталар жана хронология.',
      ru: 'История Кыргызстана для 9 класса. Древние цивилизации, эпоха каганатов, Великий Шелковый путь, Бурана и исторические карты.',
      en: 'History of Kyrgyzstan for Grade 9. Ancient civilizations, epoch of Turkic Khaganates, Silk Road heritage, and historical maps.',
    },
  },
  b_105: {
    title: {
      kg: 'ЖРТ Математика 11-класс (Алтын Сертификат)',
      ru: 'ОРТ / ЖРТ Математика 11 класс (Золотой Сертификат)',
      en: 'ORT / JRT Mathematics Grade 11 (Gold Certificate Prep)',
    },
    author: {
      kg: 'С. Акматов, Б. Садыков',
      ru: 'С. Акматов, Б. Садыков',
      en: 'S. Akmatov, B. Sadykov',
    },
    desc: {
      kg: 'Жалпы республикалык тестирлөөгө (ЖРТ/ОРТ) даярдануу үчүн 1500дөн ашык тесттер жана алардын толук чыгарылыштары.',
      ru: 'Пособие по подготовке к математическому разделу ОРТ для 11 класса. Более 1500 тестовых задач с подробными объяснениями и решениями.',
      en: 'Comprehensive ORT Math preparation textbook for Grade 11. Over 1500 practice problems with step-by-step solutions.',
    },
  },
  b_106: {
    title: {
      kg: 'Физика 9-класс',
      ru: 'Физика 9 класс',
      en: 'Physics Grade 9',
    },
    author: {
      kg: 'Э. Мамбетакунов, В. Гутник',
      ru: 'Э. Мамбетакунов, В. Гутник',
      en: 'E. Mambetakunov, V. Gutnik',
    },
    desc: {
      kg: '9-класстар үчүн физика курсу. Механика мыйзамдары, кинематика, сакталуу закондору, электромагниттик толкундар жана оптика.',
      ru: 'Официальный курс физики для 9 класса. Законы механики, динамика Ньютона, электромагнитные волны, оптика и основы квантовой физики.',
      en: 'Official Physics textbook for Grade 9. Laws of mechanics, Newton dynamics, electromagnetic waves, and optics fundamentals.',
    },
  },
  b_107: {
    title: {
      kg: 'Химия 8-класс',
      ru: 'Химия 8 класс',
      en: 'Chemistry Grade 8',
    },
    author: {
      kg: 'С. Сатыбалдиев, О. Рудзитис',
      ru: 'С. Сатыбалдиев, Г. Е. Рудзитис',
      en: 'S. Satybaldiev, G. Rudzitis',
    },
    desc: {
      kg: '8-класстын окуучулары үчүн химиянын баштапкы түшүнүктөрү. Менделеевдин мезгилдик системасы жана кычкылтек, суутек.',
      ru: 'Базовый курс неорганической химии для 8 класса. Периодическая система Менделеева, химические реакции, кислород, водород и простые вещества.',
      en: 'Introductory chemistry textbook for Grade 8. Periodic table of elements, chemical equations, oxygen, and hydrogen reactions.',
    },
  },
  b_108: {
    title: {
      kg: 'English 6-класс (Student\'s Book)',
      ru: 'Английский язык 6 класс (Student\'s Book)',
      en: 'English Grade 6 (Student\'s Book)',
    },
    author: {
      kg: 'В. Эванс, А. Алымова',
      ru: 'В. Эванс, А. Алымова',
      en: 'V. Evans, A. Alyomova',
    },
    desc: {
      kg: 'Кыргызстан мектептеринин 6-класстары үчүн англис тили окуу китеби. Грамматика, лексикалык темалар, диалогдор жана көнүгүүлөр.',
      ru: 'Учебник английского языка для 6 классов школ Кыргызстана. Грамматика, темы общения, диалоги и лексические упражнения.',
      en: 'English textbook for Grade 6 students. Grammar essentials, dialogues, reading passages, and vocabulary drills.',
    },
  },
  b_109: {
    title: {
      kg: 'Манас таануу 5-класс',
      ru: 'Манасоведение 5 класс',
      en: 'Manas Studies Grade 5',
    },
    author: {
      kg: 'С. Байгазиев',
      ru: 'С. Байгазиев',
      en: 'S. Baigaziev',
    },
    desc: {
      kg: 'Улуу «Манас» эпосун үйрөнүүчү 5-класстын окуу куралы. Айкөл Манастын баатырдык эрдиктери жана көркөм сүрөттөр.',
      ru: 'Учебное пособие по эпосу «Манас» для 5 класса. Героические подвиги великодушного Манаса, история и духовная культура кыргызского народа.',
      en: 'Textbook on the Epic of Manas for Grade 5. Heroic tales, cultural heritage, and colorful historical illustrations.',
    },
  },
  b_110: {
    title: {
      kg: 'Биология 8-класс (Адам жана ден соолук)',
      ru: 'Биология 8 класс (Человек и здоровье)',
      en: 'Biology Grade 8 (Human & Health)',
    },
    author: {
      kg: 'Ж. Абдырахманов, Д. Тентимишев',
      ru: 'Ж. Абдырахманов, Д. Тентимишев',
      en: 'J. Abdyrakhmanov, D. Tentimishev',
    },
    desc: {
      kg: '8-класс үчүн адамдын анатомиясы, физиологиясы, ден соолук гигиенасы жана биологиялык процесстер.',
      ru: 'Курс биологии для 8 класса. Анатомия человека, физиология органов, здоровый образ жизни, гигиена и биологические процессы.',
      en: 'Grade 8 Biology textbook. Human anatomy, organ systems physiology, health, hygiene, and biological homeostasis.',
    },
  },
  b_111: {
    title: {
      kg: 'Русский язык 5-класс',
      ru: 'Русский язык 5 класс',
      en: 'Russian Language Grade 5',
    },
    author: {
      kg: 'М. М. Разумовская, П. Лекант',
      ru: 'М. М. Разумовская, П. А. Лекант',
      en: 'M. M. Razumovskaya, P. Lekant',
    },
    desc: {
      kg: '5-класстар үчүн орус тили окуу китеби. Фонетика, орфография, лексика жана сүйлөм мүчөлөрү.',
      ru: 'Учебник русского языка для 5 класса. Фонетика, орфография, словообразование, лексика и синтаксис простого предложения.',
      en: 'Russian language textbook for Grade 5. Phonetics, spelling rules, lexicology, and basic sentence syntax.',
    },
  },
  b_112: {
    title: {
      kg: 'ЖРТ Кыргыз тили 11-класс (Тесттер жыйнагы)',
      ru: 'ОРТ / ЖРТ Кыргызский язык 11 класс (Сборник тестов)',
      en: 'ORT / JRT Kyrgyz Language Grade 11 (Test Collection)',
    },
    author: {
      kg: 'Г. Орозова, Т. Бакасова',
      ru: 'Г. Орозова, Т. Бакасова',
      en: 'G. Orozova, T. Bakasova',
    },
    desc: {
      kg: '11-класс үчүн ЖРТнын негизги тестине кыргыз тили боюнча даярдануу куралы. Окуу жана түшүнүү, аналогиялар жана тесттер.',
      ru: 'Пособие для подготовки к разделу кыргызского языка ОРТ для 11 класса. Чтение и понимание текста, аналогии и практические тесты.',
      en: 'Grade 11 ORT Kyrgyz language preparation guide. Reading comprehension, verbal analogies, and practical tests.',
    },
  },
  b_113: {
    title: {
      kg: 'Алиппе 1-класс',
      ru: 'Алиппе (Букварь) 1 класс',
      en: 'Alippe (Alphabet Primer) Grade 1',
    },
    author: {
      kg: 'Т. К. Сапаралиев, Р. А. Абдувалиев',
      ru: 'Т. К. Сапаралиев, Р. А. Абдувалиев',
      en: 'T. K. Saparaliev, R. A. Abduvaliev',
    },
    desc: {
      kg: '1-класстын окуучулары үчүн эң биринчи окуу китеби. Тамгалар, үндүү жана үнсүз тыбыштар, муундар жана кооз сүрөттөр.',
      ru: 'Первый букварь для первоклассников Кыргызстана. Алфавит, гласные и согласные звуки, слоги и яркие иллюстрации.',
      en: 'First alphabet primer for 1st grade pupils in Kyrgyzstan. Alphabet letters, vowels, consonants, syllables, and colorful illustrations.',
    },
  },
  b_114: {
    title: {
      kg: 'Адабий окуу 3-класс',
      ru: 'Литературное чтение 3 класс',
      en: 'Literary Reading Grade 3',
    },
    author: {
      kg: 'К. А. Абдухамидова, М. К. Рысбаев',
      ru: 'К. А. Абдухамидова, М. К. Рысбаев',
      en: 'K. Abdukhamidova, M. Rysbaev',
    },
    desc: {
      kg: '3-класстар үчүн көркөм адабияттан үзүндүлөр, жомоктор, ырлар жана текст боюнча суроо-жооптор.',
      ru: 'Учебник литературного чтения для 3 класса. Сказки, стихи, поучительные рассказы о дружбе и родине с вопросами для обсуждения.',
      en: 'Literary reading textbook for Grade 3. Folk tales, poetry, inspiring stories, and comprehension exercises.',
    },
  },
  b_115: {
    title: {
      kg: 'Литературное чтение 4-класс',
      ru: 'Литературное чтение 4 класс',
      en: 'Literary Reading Grade 4',
    },
    author: {
      kg: 'В. Г. Горецкий, Л. Ф. Климанова',
      ru: 'В. Г. Горецкий, Л. Ф. Климанова',
      en: 'V. G. Goretsky, L. F. Klimanova',
    },
    desc: {
      kg: '4-класстар үчүн көркөм адабий окуу китеби. Орус жана дүйнөлүк классиктердин чыгармалары, жомоктор жана ырлар.',
      ru: 'Учебник литературного чтения для 4 класса. Произведения русской и мировой классики, басни, рассказы и стихи.',
      en: 'Literary reading for Grade 4. Classical fables, poetry, historical stories, and literary analysis for primary school.',
    },
  },
  b_116: {
    title: {
      kg: 'Кыргыз адабияты 9-класс',
      ru: 'Кыргызская литература 9 класс',
      en: 'Kyrgyz Literature Grade 9',
    },
    author: {
      kg: 'К. Асаналиев, С. Байгазиев',
      ru: 'К. Асаналиев, С. Байгазиев',
      en: 'K. Asanaliev, S. Baigaziev',
    },
    desc: {
      kg: '9-класстар үчүн кыргыз адабияты. Токтогул, Тоголок Молдо, Жеңижок, Барпы жана агартуучулардын чыгармалары.',
      ru: 'Учебник кыргызской литературы для 9 класса. Творчество Токтогула, Тоголока Молдо, акынов-заманистов и классиков.',
      en: 'Kyrgyz literature textbook for Grade 9. Works of Toktogul, Togolok Moldo, and outstanding Kyrgyz poets and thinkers.',
    },
  },
  b_117: {
    title: {
      kg: 'Кыргызстан тарыхы 8-класс',
      ru: 'История Кыргызстана 8 класс',
      en: 'History of Kyrgyzstan Grade 8',
    },
    author: {
      kg: 'Т. К. Чоротегин, Т. Өмүрбеков',
      ru: 'Т. К. Чоротегин, Т. Омурбеков',
      en: 'T. K. Chorotegin, T. Omurbekov',
    },
    desc: {
      kg: 'XVIII-XIX кылымдардагы Кыргызстандын тарыхы. Кокон хандыгы мезгили, кыргыз урууларынын биримдиги жана боштондук кыймылдары.',
      ru: 'История Кыргызстана в XVIII-XIX веках для 8 класса. Кокандское ханство, единство кыргызских родов и освободительные движения.',
      en: 'History of Kyrgyzstan in 18th-19th centuries for Grade 8. Kokand Khanate era, social life, and historic liberation movements.',
    },
  },
  b_118: {
    title: {
      kg: 'Кыргызстандын географиясы 8-класс',
      ru: 'География Кыргызстана 8 класс',
      en: 'Geography of Kyrgyzstan Grade 8',
    },
    author: {
      kg: 'К. М. Джумашев, М. Б. Бараталиев',
      ru: 'К. М. Джумашев, М. Б. Бараталиев',
      en: 'K. M. Dzhumashev, M. B. BaratAliyev',
    },
    desc: {
      kg: 'Кыргыз Республикасынын физикалык географиясы 8-класс. Тянь-Шань тоо кыркалары, климат, дарыялар жана Ысык-Көл.',
      ru: 'Физическая география Кыргызстана для 8 класса. Горные хребты Тянь-Шаня, климатические зоны, реки, озеро Иссык-Куль и природные богатства.',
      en: 'Physical Geography of Kyrgyzstan for Grade 8. Tian-Shan mountain ranges, climate systems, rivers, and Lake Issyk-Kul.',
    },
  },
  b_119: {
    title: {
      kg: 'Информатика жана ИКТ 7-класс',
      ru: 'Информатика и ИКТ 7 класс',
      en: 'Informatics & ICT Grade 7',
    },
    author: {
      kg: 'А. С. Сулайманов, Г. К. Кошоева',
      ru: 'А. С. Сулайманов, Г. К. Кошоева',
      en: 'A. S. Sulaymanov, G. K. Koshoeva',
    },
    desc: {
      kg: '7-класстар үчүн информатика жана санариптик сабаттуулук. Компьютердик түзүлүш, коопсуз интернет жана алгоритмдердин башталышы.',
      ru: 'Учебник информатики и ИКТ для 7 класса. Устройство компьютера, цифровая безопасность в сети, алгоритмы и офисные пакеты.',
      en: 'Informatics and ICT textbook for Grade 7. Computer architecture, digital safety, algorithmic thinking, and document processing.',
    },
  },
  b_120: {
    title: {
      kg: 'Информатика жана санариптик сабаттуулук 9-класс',
      ru: 'Информатика и цифровая грамотность 9 класс',
      en: 'Informatics & Digital Literacy Grade 9',
    },
    author: {
      kg: 'А. С. Сулайманов, Г. К. Кошоева',
      ru: 'А. С. Сулайманов, Г. К. Кошоева',
      en: 'A. S. Sulaymanov, G. K. Koshoeva',
    },
    desc: {
      kg: '9-класс үчүн программалоо негиздери (Python), маалыматтар базасы, желе технологиялары жана санариптик коопсуздук.',
      ru: 'Основы программирования на Python, реляционные базы данных, сетевые веб-технологии и цифровая гигиена для 9 класса.',
      en: 'Programming fundamentals in Python, relational databases, web networking, and digital cybersecurity for Grade 9.',
    },
  },
  b_121: {
    title: {
      kg: 'Адам жана коом 10-класс',
      ru: 'Человек и общество 10 класс',
      en: 'Man and Society Grade 10',
    },
    author: {
      kg: 'М. Т. Иманкулов, А. К. Чороев',
      ru: 'М. Т. Иманкулов, А. К. Чороев',
      en: 'M. T. Imankulov, A. K. Choroev',
    },
    desc: {
      kg: '10-класстар үчүн коом таануу курсу: адам укуктары, мамлекет жана мыйзам, экономикалык мамилелер, жарандык коом.',
      ru: 'Курс обществознания для 10 класса: права человека, конституция, основы экономики, государство и институты гражданского общества.',
      en: 'Social studies textbook for Grade 10: human rights, state and legal framework, market economics, and civil society.',
    },
  },
  b_122: {
    title: {
      kg: 'Алгебра 7-класс',
      ru: 'Алгебра 7 класс',
      en: 'Algebra Grade 7',
    },
    author: {
      kg: 'И. Б. Бекбоев, Н. Н. Закирова',
      ru: 'И. Б. Бекбоев, Н. Н. Закирова',
      en: 'I. B. Bekboev, N. N. Zakirova',
    },
    desc: {
      kg: '7-класс үчүн алгебранын баштапкы курсу. Бир белгисиздүү сызыктуу теңдемелер, бир мүчөлөр жана көп мүчөлөр, кыскача көбөйтүүнүн формулалары.',
      ru: 'Базовый курс алгебры для 7 класса. Линейные уравнения, одночлены, многочлены, формулы сокращенного умножения и графики функций.',
      en: 'Fundamental algebra course for Grade 7. Linear equations, polynomials, multiplication shortcuts, and function coordinates.',
    },
  },
  b_123: {
    title: {
      kg: 'English Plus 8-класс (Student\'s Book)',
      ru: 'Английский язык 8 класс (English Plus)',
      en: 'English Plus Grade 8 (Student\'s Book)',
    },
    author: {
      kg: 'Ben Wetz, Diana Pye',
      ru: 'Бен Ветц, Диана Пай',
      en: 'Ben Wetz, Diana Pye',
    },
    desc: {
      kg: '8-класстар үчүн англис тили окуу китеби. Интерактивдүү тапшырмалар, окуу жана түшүнүү, грамматика жана сөздүк.',
      ru: 'Современный коммуникативный учебник английского языка для 8 класса. Интерактивные задания, тексты, аудирование и грамматика.',
      en: 'Modern communicative English textbook for 8th grade students with interactive tasks, reading comprehension, and grammar reference.',
    },
  },
  b_124: {
    title: {
      kg: 'Физика 7-класс',
      ru: 'Физика 7 класс',
      en: 'Physics Grade 7',
    },
    author: {
      kg: 'Э. Мамбетакунов, В. Д. Бабаев',
      ru: 'Э. Мамбетакунов, В. Д. Бабаев',
      en: 'E. Mambetakunov, V. D. Babaev',
    },
    desc: {
      kg: '7-класстар үчүн физика курсу. Заттын түзүлүшү, кыймыл жана ылдамдык, масса, күч жана басым боюнча түшүнүктөр жана тажрыйбалар.',
      ru: 'Вводный курс физики для 7 класса. Строение вещества, механическое движение, скорость, масса, сила тяготения и давление жидкостей.',
      en: 'Introductory physics course for Grade 7. Matter structure, motion, speed, mass, gravity, and pressure with experiments.',
    },
  },
  b_125: {
    title: {
      kg: 'Химия 9-класс',
      ru: 'Химия 9 класс',
      en: 'Chemistry Grade 9',
    },
    author: {
      kg: 'К. С. Рысмендеев, А. Сатывалдиев',
      ru: 'К. С. Рысмендеев, А. Сатывалдиев',
      en: 'K. S. Rysmendeev, A. Satyvaldiev',
    },
    desc: {
      kg: '9-класстар үчүн органикалык эмес химия окуу китеби. Электролиттик диссоциация, галогендер, күкүрт, азот, металлдар жана химиялык эксперименттер.',
      ru: 'Учебник неорганической химии для 9 класса. Электролитическая диссоциация, галогены, сера, азот, металлы и лабораторные опыты.',
      en: 'Inorganic chemistry textbook for Grade 9. Electrolytic dissociation, halogens, sulfur, nitrogen, metals, and laboratory trials.',
    },
  },
  b_126: {
    title: {
      kg: 'ЖРТ Тарых 11-класс (Тесттер жыйнагы)',
      ru: 'ОРТ / ЖРТ История 11 класс (Сборник тестов)',
      en: 'ORT / JRT History Grade 11 (Practice Tests)',
    },
    author: {
      kg: 'ЦООМО • Билимди баалоо борбору',
      ru: 'ЦООМО • Центр оценки в образовании',
      en: 'CEATM • Center for Educational Assessment',
    },
    desc: {
      kg: '11-класс үчүн ЖРТнын тарых предмети боюнча кошумча тестине комплекстүү даярдык. Тесттер, жооптордун түшүндүрмөлөрү жана талдоо карталары.',
      ru: 'Комплексное пособие для подготовки к предметному тесту ОРТ по истории для 11 класса. Хронологические таблицы, карты и тренировочные тесты.',
      en: 'Comprehensive test prep guide for the history section of ORT for Grade 11. Timelines, historical maps, and practice tests.',
    },
  },
  b_127: {
    title: {
      kg: 'Эне тили 2-класс',
      ru: 'Родной язык (Кыргызский) 2 класс',
      en: 'Native Language Grade 2',
    },
    author: {
      kg: 'Т. Асаналиев, М. Рысбаев',
      ru: 'Т. Асаналиев, М. Рысбаев',
      en: 'T. Asanaliev, M. Rysbaev',
    },
    desc: {
      kg: '2-класстар үчүн эне тили окуу китеби. Муундар, сөздөр, сүйлөм түзүү, көнүгүүлөр жана көркөм тексти түшүнүү.',
      ru: 'Учебник родного языка для 2 класса. Слоги, составление предложений, правила правописания и развитие связной речи.',
      en: 'Native language textbook for Grade 2. Syllables, sentence formation, vocabulary drills, and reading development.',
    },
  },
  b_128: {
    title: {
      kg: 'Математика 2-класс',
      ru: 'Математика 2 класс',
      en: 'Mathematics Grade 2',
    },
    author: {
      kg: 'И. Б. Бекбоев, Н. И. Ибраева',
      ru: 'И. Б. Бекбоев, Н. И. Ибраева',
      en: 'I. B. Bekboev, N. I. Ibraeva',
    },
    desc: {
      kg: 'Башталгыч 2-класс үчүн математика. 100гө чейинки сандар, кошуу жана кемитүү амалдары, геометриялык фигуралар.',
      ru: 'Математика для 2 класса начальной школы. Счёт до 100, сложение и вычитание в столбик, простые задачи и геометрические фигуры.',
      en: 'Elementary Mathematics for Grade 2. Numbers up to 100, addition, subtraction, simple word problems, and shapes.',
    },
  },
  b_129: {
    title: {
      kg: 'Математика 6-класс',
      ru: 'Математика 6 класс',
      en: 'Mathematics Grade 6',
    },
    author: {
      kg: 'С. М. Мусабеков, А. А. Бөрүбаев',
      ru: 'С. М. Мусабеков, А. А. Бөрүбаев',
      en: 'S. M. Musabekov, A. A. Borubaev',
    },
    desc: {
      kg: '6-класстын математика курсу. Жөнөкөй жана ондук бөлчөктөр, пропорциялар, терс сандар жана координаталар тегиздиги.',
      ru: 'Курс математики для 6 класса. Обыкновенные и десятичные дроби, пропорции, отрицательные числа и координатная плоскость.',
      en: 'Grade 6 Mathematics course. Fractions, decimals, proportions, negative numbers, and coordinate planes.',
    },
  },
  b_130: {
    title: {
      kg: 'Геометрия 10-класс',
      ru: 'Геометрия 10 класс',
      en: 'Geometry Grade 10',
    },
    author: {
      kg: 'И. Б. Бекбоев, А. А. Бөрүбаев',
      ru: 'И. Б. Бекбоев, А. А. Бөрүбаев',
      en: 'I. B. Bekboev, A. A. Borubaev',
    },
    desc: {
      kg: '10-класс үчүн стереометрия негиздери: мейкиндиктеги түз сызыктар жана тегиздиктер, призмалар, пирамидалар жана айлануу нерселери.',
      ru: 'Основы стереометрии для 10 класса: взаимное расположение прямых и плоскостей в пространстве, призмы, пирамиды и тела вращения.',
      en: 'Solid Geometry textbook for Grade 10: lines and planes in 3D space, prisms, pyramids, and revolution solids.',
    },
  },
  b_131: {
    title: {
      kg: 'Алгебра жана анализдин башталышы 11-класс',
      ru: 'Алгебра и начала анализа 11 класс',
      en: 'Algebra & Calculus Grade 11',
    },
    author: {
      kg: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      ru: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      en: 'A. A. Borubaev, I. B. Bekboev',
    },
    desc: {
      kg: '11-класстын бүтүрүүчүлөрү үчүн алгебра: баштапкы функция жана интеграл, дифференциалдык теңдемелер жана комбинаторика.',
      ru: 'Алгебра для выпускников 11 класса: первообразная и определенный интеграл, элементы теории вероятностей и подготовка к экзаменам.',
      en: 'Advanced Algebra for Grade 11 graduates: anti-derivatives, integrals, probability theory, and graduation exam prep.',
    },
  },
  b_132: {
    title: {
      kg: 'Кыргыз адабияты 11-класс',
      ru: 'Кыргызская литература 11 класс',
      en: 'Kyrgyz Literature Grade 11',
    },
    author: {
      kg: 'К. Асаналиев, С. Байгазиев',
      ru: 'К. Асаналиев, С. Байгазиев',
      en: 'K. Asanaliev, S. Baigaziev',
    },
    desc: {
      kg: 'XX кылымдагы жана азыркы кыргыз адабияты. Чыңгыз Айтматовдун дүйнөлүк маанидеги шедевр романдары, повесттери жана талдоо.',
      ru: 'Кыргызская литература для 11 класса. Творчество Чингиза Айтматова, романы «И дольше века длится день», «Плаха» и шедевры XX века.',
      en: 'Grade 11 Kyrgyz literature textbook. Works of Chingiz Aitmatov, master novels, and 20th-century Kyrgyz literary masterpieces.',
    },
  },
};

const SUBJECT_DICTIONARY = {
  'информатика': { kg: 'Информатика', ru: 'Информатика / ИКТ', en: 'Informatics / IT' },
  'математика': { kg: 'Математика', ru: 'Математика', en: 'Mathematics' },
  'алгебра': { kg: 'Алгебра', ru: 'Алгебра', en: 'Algebra' },
  'геометрия': { kg: 'Геометрия', ru: 'Геометрия', en: 'Geometry' },
  'кыргыз тили': { kg: 'Кыргыз тили', ru: 'Кыргызский язык', en: 'Kyrgyz Language' },
  'адабият': { kg: 'Адабият', ru: 'Литература', en: 'Literature' },
  'физика': { kg: 'Физика', ru: 'Физика', en: 'Physics' },
  'химия': { kg: 'Химия', ru: 'Химия', en: 'Chemistry' },
  'биология': { kg: 'Биология', ru: 'Биология', en: 'Biology' },
  'тарых': { kg: 'Тарых', ru: 'История', en: 'History' },
  'география': { kg: 'География', ru: 'География', en: 'Geography' },
  'англис тили': { kg: 'Англис тили', ru: 'Английский язык', en: 'English' },
  'орус тили': { kg: 'Орус тили', ru: 'Русский язык', en: 'Russian Language' },
  'орт': { kg: 'ОРТ даярдоо', ru: 'Подготовка к ОРТ', en: 'ORT Exam Prep' },
  'жрт': { kg: 'ЖРТ даярдоо', ru: 'Подготовка к ЖРТ / ОРТ', en: 'JRT / ORT Exam Prep' },
  'адам жана коом': { kg: 'Адам жана коом', ru: 'Человек и общество', en: 'Man and Society' },
  'манас': { kg: 'Манас таануу', ru: 'Манасоведение', en: 'Manas Studies' },
  'мекен таануу': { kg: 'Мекен таануу', ru: 'Родиноведение', en: 'Homeland Studies' },
};

const CITY_DICTIONARY = {
  'бишкек': { kg: 'Бишкек', ru: 'Бишкек', en: 'Bishkek' },
  'ош': { kg: 'Ош', ru: 'Ош', en: 'Osh' },
  'жалал-абад': { kg: 'Жалал-Абад', ru: 'Джалал-Абад', en: 'Jalal-Abad' },
  'джалал-абад': { kg: 'Жалал-Абад', ru: 'Джалал-Абад', en: 'Jalal-Abad' },
  'каракол': { kg: 'Каракол', ru: 'Каракол', en: 'Karakol' },
  'нарын': { kg: 'Нарын', ru: 'Нарын', en: 'Naryn' },
  'талас': { kg: 'Талас', ru: 'Талас', en: 'Talas' },
  'баткен': { kg: 'Баткен', ru: 'Баткен', en: 'Batken' },
};

export const normalizeLang = (lang = 'ru') => {
  const code = (lang || 'ru').toLowerCase().slice(0, 2);
  if (code === 'ky') return 'kg';
  if (code === 'kg' || code === 'ru' || code === 'en') return code;
  return 'ru';
};

/**
 * Returns localized title for textbook
 */
export const getLocalizedBookTitle = (book, lang = 'ru') => {
  if (!book) return '';
  const l = normalizeLang(lang);
  const entry = BOOK_TRANSLATIONS[book.id];
  if (entry?.title?.[l]) return entry.title[l];
  return book.title || '';
};

/**
 * Returns localized description for textbook
 */
export const getLocalizedBookDesc = (book, lang = 'ru') => {
  if (!book) return '';
  const l = normalizeLang(lang);
  const entry = BOOK_TRANSLATIONS[book.id];
  if (entry?.desc?.[l]) return entry.desc[l];
  return book.description || '';
};

/**
 * Returns localized author for textbook
 */
export const getLocalizedBookAuthor = (book, lang = 'ru') => {
  if (!book) return '';
  const l = normalizeLang(lang);
  const entry = BOOK_TRANSLATIONS[book.id];
  if (entry?.author?.[l]) return entry.author[l];
  return book.author || '';
};

/**
 * Returns localized subject name
 */
export const getLocalizedSubject = (subject = '', lang = 'ru') => {
  if (!subject) return '';
  const l = normalizeLang(lang);
  const s = subject.toLowerCase().trim();
  for (const [key, mapping] of Object.entries(SUBJECT_DICTIONARY)) {
    if (s.includes(key)) {
      return mapping[l] || mapping.ru;
    }
  }
  return subject;
};

/**
 * Returns localized city name
 */
export const getLocalizedCity = (city = '', lang = 'ru') => {
  if (!city) return '';
  const l = normalizeLang(lang);
  const c = city.toLowerCase().trim();
  for (const [key, mapping] of Object.entries(CITY_DICTIONARY)) {
    if (c.includes(key)) {
      return mapping[l] || mapping.ru;
    }
  }
  return city;
};

/**
 * Returns localized medium of instruction
 */
export const getLocalizedMedium = (langValue = 'KG', lang = 'ru') => {
  const l = normalizeLang(lang);
  const raw = String(langValue || 'KG').trim().toLowerCase();

  let target = 'KG';
  if (raw.includes('рус') || raw.includes('орус') || raw === 'ru' || raw === 'russian') {
    target = 'RU';
  } else if (raw.includes('англ') || raw === 'en' || raw === 'english') {
    target = 'EN';
  } else {
    target = 'KG';
  }

  if (target === 'KG') {
    return l === 'en' ? 'Kyrgyz' : (l === 'kg' ? 'Кыргызча' : 'Кыргызский');
  }
  if (target === 'RU') {
    return l === 'en' ? 'Russian' : (l === 'kg' ? 'Орусча' : 'Русский');
  }
  if (target === 'EN') {
    return l === 'en' ? 'English' : (l === 'kg' ? 'Англисче' : 'Английский');
  }
  return langValue;
};
