/**
 * Multilingual Textbook Data Localization Service
 * Provides complete translation for textbook titles, descriptions, subjects,
 * cities, medium of instruction, and author names across Kyrgyz (KG), Russian (RU), and English (EN).
 */

const BOOK_TRANSLATIONS = {
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
      ru: 'Учебник государственного языка в отличном состоянии. Культура речи, морфология, глаголы и систематизированные правила.',
      en: 'Comprehensive Grade 7 Kyrgyz language textbook. Speech culture, morphology, verbs, and grammar rules for secondary schools.',
    },
  },
  b_103: {
    title: {
      kg: 'Алгебра жана анализдин башталышы 10-11-класс',
      ru: 'Алгебра и начала анализа 10-11 класс',
      en: 'Algebra & Calculus Grade 10-11',
    },
    author: {
      kg: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      ru: 'А. А. Бөрүбаев, И. Б. Бекбоев',
      en: 'A. A. Borubaev, I. B. Bekboev',
    },
    desc: {
      kg: 'Жогорку класстар үчүн алгебра жана анализ окуу китеби. Тригонометриялык функциялар, туунду, интеграл жана экстремумдар.',
      ru: 'Учебник по алгебре и математическому анализу для старших классов. Тригонометрические функции, производные, интегралы и экстремумы.',
      en: 'Advanced high school textbook covering trigonometric functions, derivatives, integrals, and mathematical analysis fundamentals.',
    },
  },
  b_104: {
    title: {
      kg: 'Физика 9-класс',
      ru: 'Физика 9 класс',
      en: 'Physics Grade 9',
    },
    author: {
      kg: 'Э. М. Мамбетакунов, Т. М. Мамытов',
      ru: 'Э. М. Мамбетакунов, Т. М. Мамытов',
      en: 'E. M. Mambetakunov, T. M. Mamytov',
    },
    desc: {
      kg: '9-класстар үчүн физика курсу. Кинематика, динамика, сакталуу закондору, механикалык термелүүлөр жана толкундар.',
      ru: 'Курс физики для 9 классов. Кинематика, динамика, законы сохранения, механические колебания и волновая теория.',
      en: 'Grade 9 physics course textbook. Kinematics, dynamics, conservation laws, mechanical oscillations, and acoustic waves.',
    },
  },
  b_105: {
    title: {
      kg: 'Химия 8-класс',
      ru: 'Химия 8 класс',
      en: 'Chemistry Grade 8',
    },
    author: {
      kg: 'С. К. Байышева, А. А. Акимбаева',
      ru: 'С. К. Байышева, А. А. Акимбаева',
      en: 'S. K. Baiysheva, A. A. Akimbaeva',
    },
    desc: {
      kg: '8-класстын окуучулары үчүн химиянын баштапкы түшүнүктөрү. Менделеевдин мезгилдик системасы жана кычкылтек, суутек.',
      ru: 'Базовый курс химии для 8 класса. Периодическая система Менделеева, химические реакции, кислород, водород и простые вещества.',
      en: 'Introductory chemistry textbook for Grade 8. Periodic table of elements, chemical equations, oxygen, and hydrogen bonding.',
    },
  },
  b_106: {
    title: {
      kg: 'Кыргызстан тарыхы 9-класс',
      ru: 'История Кыргызстана 9 класс',
      en: 'History of Kyrgyzstan Grade 9',
    },
    author: {
      kg: 'Т. Чоротегин, Т. Өмүрбеков',
      ru: 'Т. Чоротегин, Т. Омурбеков',
      en: 'T. Chorotegin, T. Omurbekov',
    },
    desc: {
      kg: 'XIX кылымдын аягынан XX кылымдын башына чейинки Кыргызстандын тарыхый окуялары, маданий жана коомдук өнүгүүсү.',
      ru: 'Исторические события, культурное и социально-экономическое развитие Кыргызстана с конца XIX до начала XX века.',
      en: 'Historical milestones, cultural heritage, and socio-economic evolution of Kyrgyzstan from the late 19th to early 20th century.',
    },
  },
  b_107: {
    title: {
      kg: 'Биология 8-класс (Адам жана анын ден соолугу)',
      ru: 'Биология 8 класс (Человек и его здоровье)',
      en: 'Biology Grade 8 (Human Anatomy & Health)',
    },
    author: {
      kg: 'К. А. Алымкулов, Б. Т. Токтогулов',
      ru: 'К. А. Алымкулов, Б. Т. Токтогулов',
      en: 'K. A. Alymkulov, B. T. Toktogulov',
    },
    desc: {
      kg: 'Адамдын анатомиясы, физиологиясы жана гигиенасы. Органдар системасы, зат алмашуу жана туура тамактануу эрежелери.',
      ru: 'Анатомия, физиология и гигиена человека. Системы органов, метаболизм, иммунитет и основы здорового образа жизни.',
      en: 'Human anatomy, physiology, and health sciences for Grade 8. Organ systems, metabolism, and nutrition principles.',
    },
  },
  b_108: {
    title: {
      kg: 'Англис тили 8-класс (English 8)',
      ru: 'Английский язык 8 класс (English 8)',
      en: 'English Language Grade 8 (English 8)',
    },
    author: {
      kg: 'К. Юсупова, Дж. Смит',
      ru: 'К. Юсупова, Дж. Смит',
      en: 'K. Yusupova, J. Smith',
    },
    desc: {
      kg: '8-класс үчүн англис тили окуу китеби. Грамматика, сөздүк курам, диалогдор жана эл аралык байланыш көндүмдөрү.',
      ru: 'Учебник английского языка для 8 класса. Грамматика, расширенный словарный запас, диалоги и практическая речь.',
      en: 'English textbook for secondary school Grade 8. Communicative grammar, topical vocabulary, dialogues, and reading comprehension.',
    },
  },
  b_109: {
    title: {
      kg: 'Алиппе 1-класс',
      ru: 'Алиппе (Кыргызский букварь) 1 класс',
      en: 'Alippe (Kyrgyz ABC Primer) Grade 1',
    },
    author: {
      kg: 'С. Р. Рысбаев',
      ru: 'С. Р. Рысбаев',
      en: 'S. R. Rysbaev',
    },
    desc: {
      kg: '1-класстын окуучулары үчүн эң биринчи окуу китеби. Түстүү сүрөттөр, тамгалар жана окуу көндүмдөрүн калыптандыруу.',
      ru: 'Первый букварь для первоклассников. Яркие иллюстрации, буквы кыргызского алфавита и развитие навыков начального чтения.',
      en: 'First reading textbook and alphabet primer for 1st grade students in Kyrgyzstan with vibrant illustrations and reading exercises.',
    },
  },
  b_110: {
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
      kg: 'Кыргыз классикалык жана заманбап адабияты боюнча хрестоматия. Акын-жазуучулардын өмүр таржымалы жана чыгармалары.',
      ru: 'Хрестоматия по кыргызской классической и современной литературе. Биографии писателей, поэтов и анализ шедевров.',
      en: 'Anthology of classic and modern Kyrgyz literature. Literary analysis, author biographies, and poetic masterpieces.',
    },
  },
  b_111: {
    title: {
      kg: 'ОРТ: Математика боюнча колдонмо',
      ru: 'ОРТ / ЖРТ: Пособие по математике',
      en: 'ORT / JRT: Mathematics Guidebook',
    },
    author: {
      kg: 'Билимди баалоо борбору (ЦООМО)',
      ru: 'Центр оценки в образовании (ЦООМО)',
      en: 'Center for Educational Assessment (CEATM)',
    },
    desc: {
      kg: 'Жалпы республикалык тестирлөөгө даярдануу үчүн атайын чыгарылган математикалык тесттер, салыштыруулар жана маселелер.',
      ru: 'Специальное пособие для подготовки к Общереспубликанскому тестированию (ОРТ). Тесты, количественные сравнения и разбор задач.',
      en: 'Official preparatory guidebook for the National University Entrance Exam (ORT/JRT) with quantitative comparison problems.',
    },
  },
  b_112: {
    title: {
      kg: 'География 8-класс (КР Географиясы)',
      ru: 'География 8 класс (География КР)',
      en: 'Geography Grade 8 (Geography of KR)',
    },
    author: {
      kg: 'М. Баратов, К. Матикеев',
      ru: 'М. Баратов, К. Матикеев',
      en: 'M. Baratov, K. Matikeev',
    },
    desc: {
      kg: 'Кыргызстандын физикалык географиясы. Тоолору, дарыялары, көлдөрү, кен байлыктары жана экологиялык аймактары.',
      ru: 'Физическая география Кыргызстана. Горные хребты Тянь-Шаня, реки, озёра, природные ресурсы и экологические зоны.',
      en: 'Physical geography of Kyrgyzstan. Mountain ranges, water resources, climatic zones, and national ecological parks.',
    },
  },
  b_113: {
    title: {
      kg: 'Адам жана коом 10-класс',
      ru: 'Человек и общество 10 класс',
      en: 'Man and Society Grade 10',
    },
    author: {
      kg: 'Э. Ж. Маанаев, К. К. Конкобаев',
      ru: 'Э. Ж. Маанаев, К. К. Конкобаев',
      en: 'E. Zh. Maanaev, K. K. Konkobaev',
    },
    desc: {
      kg: 'Коом таануу курсу. Мамлекет, укуктук система, жарандык коом, экономиканын негиздери жана инсандын укуктары.',
      ru: 'Курс обществознания для 10 класса. Государство, правовая система, гражданское общество, основы экономики и права человека.',
      en: 'Social studies course for Grade 10. Governance, legal system, civil society, basic economics, and human rights.',
    },
  },
  b_114: {
    title: {
      kg: 'Алгебра 7-класс',
      ru: 'Алгебра 7 класс',
      en: 'Algebra Grade 7',
    },
    author: {
      kg: 'Ю. Н. Макарычев, Н. Г. Миндюк',
      ru: 'Ю. Н. Макарычев, Н. Г. Миндюк',
      en: 'Yu. N. Makarychev, N. G. Mindyuk',
    },
    desc: {
      kg: '7-класс үчүн алгебранын башталышы. Сызыктуу теңдемелер, даражалар, көп мүчөлөр жана функция түшүнүгү.',
      ru: 'Начальный курс алгебры для 7 класса. Линейные уравнения, степени, многочлены, формулы сокращенного умножения и графики.',
      en: 'Introductory algebra course for Grade 7. Linear equations, monomials, polynomials, powers, and coordinate graphing.',
    },
  },
  b_115: {
    title: {
      kg: 'Химия 9-класс',
      ru: 'Химия 9 класс',
      en: 'Chemistry Grade 9',
    },
    author: {
      kg: 'Г. Е. Рудзитис, Ф. Г. Фельдман',
      ru: 'Г. Е. Рудзитис, Ф. Г. Фельдман',
      en: 'G. E. Rudzitis, F. G. Feldman',
    },
    desc: {
      kg: '9-класс үчүн органикалык эмес химия. Металлдар, металл эместер, электролиттик диссоциация жана реакциялардын түрлөрү.',
      ru: 'Неорганическая химия для 9 класса. Металлы, неметаллы, электролитическая диссоциация и химические свойства веществ.',
      en: 'Inorganic chemistry for Grade 9. Metals, non-metals, electrolytic dissociation, and chemical reaction dynamics.',
    },
  },
  b_116: {
    title: {
      kg: 'Физика 7-класс',
      ru: 'Физика 7 класс',
      en: 'Physics Grade 7',
    },
    author: {
      kg: 'А. В. Перышкин',
      ru: 'А. В. Перышкин',
      en: 'A. V. Peryshkin',
    },
    desc: {
      kg: 'Физика илимине киришүү. Заттын түзүлүшү, кыймыл жана күчтөр, басым, Паскаль жана Архимед закондору.',
      ru: 'Введение в физику для 7 класса. Строение вещества, механическое движение, плотность, давление, законы Паскаля и Архимеда.',
      en: 'Introductory physics for Grade 7. Matter composition, motion, force, density, Pascal principle, and Archimedes buoyancy.',
    },
  },
  b_117: {
    title: {
      kg: 'Адабий окуу 3-класс',
      ru: 'Литературное чтение 3 класс',
      en: 'Literary Reading Grade 3',
    },
    author: {
      kg: 'А. Сапарбаев, Б. Алымов',
      ru: 'А. Сапарбаев, Б. Алымов',
      en: 'A. Saparbaev, B. Alymov',
    },
    desc: {
      kg: 'Башталгыч класстар үчүн адабий окуу китеби. Жомоктор, ырлар, тамсилдер жана макал-лакаптар жыйнагы.',
      ru: 'Учебник литературного чтения для 3 класса. Сказки, стихи, басни и поучительные рассказы для младших школьников.',
      en: 'Literary reading textbook for Grade 3. Kyrgyz and world folk tales, poetry, fables, and reading comprehension.',
    },
  },
  b_118: {
    title: {
      kg: 'Орус тили 5-класс',
      ru: 'Русский язык 5 класс',
      en: 'Russian Language Grade 5',
    },
    author: {
      kg: 'Т. А. Ладыженская, М. Т. Баранов',
      ru: 'Т. А. Ладыженская, М. Т. Баранов',
      en: 'T. A. Ladyzhenskaya, M. T. Baranov',
    },
    desc: {
      kg: '5-класс үчүн орус тили окуу китеби. Фонетика, лексика, сөз жасоо жана сүйлөм мүчөлөрүнүн эрежелери.',
      ru: 'Учебник русского языка для 5 класса. Фонетика, лексика, морфемика, синтаксис и пунктуация.',
      en: 'Russian language textbook for Grade 5. Phonetics, vocabulary, morphology, sentence syntax, and punctuation rules.',
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
      kg: '7-класс үчүн маалыматтык-коммуникациялык технологиялар. Компьютердин архитектурасы, операциялык системалар, алгоритмдер жана киберкоопсуздук негиздери.',
      ru: 'Учебник по информационно-коммуникационным технологиям для 7 класса. Архитектура компьютера, операционные системы, алгоритмы и основы кибербезопасности.',
      en: 'Information and communication technologies textbook for Grade 7. Computer architecture, operating systems, algorithms, and cybersecurity fundamentals.',
    },
  },
  b_120: {
    title: {
      kg: 'Дүйнөлүк тарых 8-класс',
      ru: 'Всемирная история 8 класс',
      en: 'World History Grade 8',
    },
    author: {
      kg: 'А. Я. Юдовская, П. А. Баранов',
      ru: 'А. Я. Юдовская, П. А. Баранов',
      en: 'A. Ya. Yudovskaya, P. A. Baranov',
    },
    desc: {
      kg: 'Жаңы доордогу дүйнөлүк тарых. Өнөр жай төңкөрүшү, Европа жана Азия мамлекеттеринин өнүгүү жолдору.',
      ru: 'История Нового времени для 8 класса. Промышленная революция, великие открытия, развитие стран Европы, Азии и Америки.',
      en: 'Modern World History for Grade 8. Industrial revolution, political revolutions, and economic history of world nations.',
    },
  },
  b_121: {
    title: {
      kg: 'ОРТ: Кыргыз тили жана синтаксис',
      ru: 'ОРТ / ЖРТ: Кыргызский язык и грамматика',
      en: 'ORT / JRT: Kyrgyz Language & Grammar',
    },
    author: {
      kg: 'Билимди баалоо борбору (ЦООМО)',
      ru: 'Центр оценки в образовании (ЦООМО)',
      en: 'Center for Educational Assessment (CEATM)',
    },
    desc: {
      kg: 'ЖРТ сынагына кыргыз тили бөлүмү боюнча даярдануу куралы. Окуу жана түшүнүү, практикалык грамматикалык тесттер.',
      ru: 'Пособие для подготовки к блоку кыргызского языка ОРТ/ЖРТ. Чтение и понимание текста, практические грамматические тесты.',
      en: 'ORT / JRT preparation guide for the Kyrgyz language section. Reading comprehension, syntax rules, and sample tests.',
    },
  },
  b_122: {
    title: {
      kg: 'Манас таануу 5-класс',
      ru: 'Манасоведение 5 класс',
      en: 'Manas Studies Grade 5',
    },
    author: {
      kg: 'С. Мусаев, А. Акматалиев',
      ru: 'С. Мусаев, А. Акматалиев',
      en: 'S. Musaev, A. Akmataliev',
    },
    desc: {
      kg: 'Улуу «Манас» эпосу боюнча 5-класстын окуу куралы. Эпостун каармандары, тарыхый мааниси жана кыргыз элинин баалуулуктары.',
      ru: 'Учебное пособие по эпосу «Манас» для 5 класса. Образы баатыров, историческое наследие и духовные ценности кыргызского народа.',
      en: 'Study guide on the monumental Epic of Manas for Grade 5. Heroic tales, cultural heritage, and spiritual values of the Kyrgyz nation.',
    },
  },
  b_123: {
    title: {
      kg: 'Англис тили 6-класс',
      ru: 'Английский язык 6 класс',
      en: 'English Language Grade 6',
    },
    author: {
      kg: 'Т. А. Баранова, Д. Дули',
      ru: 'Т. А. Баранова, Д. Дули',
      en: 'T. A. Baranova, J. Dooley',
    },
    desc: {
      kg: '6-класс үчүн англис тили окуу китеби. Лексикалык темалар, грамматикалык көнүгүүлөр жана байланыш көндүмдөрү.',
      ru: 'Учебник английского языка для 6 класса. Тематическая лексика, грамматические упражнения и развитие устной речи.',
      en: 'English textbook for Grade 6. Conversational vocabulary, verb tenses, reading passages, and interactive exercises.',
    },
  },
  b_124: {
    title: {
      kg: 'Мекен таануу 4-класс',
      ru: 'Родиноведение 4 класс',
      en: 'Homeland Studies Grade 4',
    },
    author: {
      kg: 'Э. М. Мамбетакунов, В. М. Мамытов',
      ru: 'Э. М. Мамбетакунов, В. М. Мамытов',
      en: 'E. M. Mambetakunov, V. M. Mamytov',
    },
    desc: {
      kg: 'Башталгыч класс окуучулары үчүн Ата Мекендин табияты, тарыхы, географиясы жана маданий мурастары тууралуу кызыктуу маалыматтар.',
      ru: 'Увлекательные сведения о природе, истории, географии и культурном наследии родного Кыргызстана для 4 класса.',
      en: 'Integrated nature and homeland studies textbook for Grade 4. Natural history, geography, and cultural traditions of Kyrgyzstan.',
    },
  },
  b_125: {
    title: {
      kg: 'ОРТ: Тарых боюнча даярдоо',
      ru: 'ОРТ / ЖРТ: Подготовка к истории',
      en: 'ORT / JRT: History Preparation Guide',
    },
    author: {
      kg: 'КР Билим берүү жана илим министрлиги',
      ru: 'Министерство образования и науки КР',
      en: 'Ministry of Education and Science of KR',
    },
    desc: {
      kg: 'ЖРТга тарых предмети боюнча толук даярдоо куралы. Хронологиялык таблицалар, карталар жана тесттик тапшырмалар.',
      ru: 'Полное пособие для подготовки к разделу истории ОРТ. Хронологические таблицы, исторические карты и тренировочные тесты.',
      en: 'Comprehensive test preparation guide for the history section of ORT. Chronological timelines, maps, and practice tests.',
    },
  },
  b_126: {
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
      kg: '9-класс үчүн программалоо негиздери (Python), маалыматтар базасы, желе технологиялары жана санарип коопсуздук.',
      ru: 'Основы программирования на Python, базы данных, веб-технологии и цифровая безопасность для 9 класса.',
      en: 'Programming fundamentals in Python, relational databases, web networking, and digital safety for Grade 9.',
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
