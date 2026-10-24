import { neon } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_jwoQV4CJE0NT@ep-ancient-credit-b5qop6cz-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(connectionString);

const books = [
  {
    id: "b_101",
    title: "Геометрия 8-класс",
    author: "И. Б. Бекбоев, А. А. Бөрүбаев",
    subject: "Геометрия",
    images: ["/covers/geometry-8.svg"],
    description: "Кыргыз тилиндеги 8-класстар үчүн геометрия окуу китеби. Планиметрия, көп бурчтуктар, Пифагордун теоремасы жана фигуралардын аянттары."
  },
  {
    id: "b_102",
    title: "Кыргыз тили 7-класс",
    author: "А. Ибраимов, А. Сапарбаев",
    subject: "Кыргыз тили",
    images: ["/covers/kyrgyz-7.svg"],
    description: "Жаңыдай сакталган окуу китеби. Кеп маданияты, морфология, этиштер жана бардык эрежелер так берилген."
  },
  {
    id: "b_103",
    title: "Алгебра жана анализдин башталышы 10-11-класс",
    author: "А. А. Бөрүбаев, И. Б. Бекбоев",
    subject: "Алгебра",
    images: ["/covers/algebra-10.svg"],
    description: "Жогорку класстар үчүн алгебра жана анализ окуу китеби. Тригонометриялык функциялар, туунду, интеграл жана экстремумдар."
  },
  {
    id: "b_104",
    title: "Кыргызстан тарыхы 9-класс",
    author: "Т. Чоротегин, Ө. Осмонов",
    subject: "Тарых",
    images: ["/covers/history-9.svg"],
    description: "Кыргызстандын байыркы доордон бүгүнкү күнгө чейинки тарыхы. Бурана мунарасы, Улуу Жибек жолу, тарыхый карталар."
  },
  {
    id: "b_105",
    title: "ЖРТ Математика: Алтын Сертификатка жол",
    author: "С. Акматов, Б. Садыков",
    subject: "ОРТ / ЖРТ",
    images: ["/covers/ort-math.svg"],
    description: "Жалпы республикалык тестирлөөгө (ЖРТ/ОРТ) даярдануу үчүн 1500дөн ашык тесттер жана алардын толук чыгарылыштары."
  },
  {
    id: "b_106",
    title: "Физика 9-класс (на русском языке)",
    author: "Э. Мамбетакунов, В. Гутник",
    subject: "Физика",
    images: ["/covers/physics-9.svg"],
    description: "Официальный учебник физики для 9 классов общеобразовательных школ. Законы механики, электромагнитные волны, оптика, квантовая физика."
  },
  {
    id: "b_107",
    title: "Химия 8-класс (на русском языке)",
    author: "С. Сатыбалдиев, О. Рудзитис",
    subject: "Химия",
    images: ["/covers/chemistry-8.svg"],
    description: "Базовый учебник неорганической химии для 8 класса. Периодический закон Д. И. Менделеева, химические формулы, реакции и лабораторные опыты."
  },
  {
    id: "b_108",
    title: "English 6 (Student's Book)",
    author: "В. Эванс, А. Алымова",
    subject: "Англис тили",
    images: ["/covers/english-6.svg"],
    description: "Кыргызстан мектептеринин 6-класстары үчүн англис тили окуу китеби. Грамматика, лексикалык темалар, диалогдор жана көнүгүүлөр."
  },
  {
    id: "b_109",
    title: "Манас таануу 5-класс",
    author: "С. Байгазиев",
    subject: "Манас таануу",
    images: ["/covers/manas-5.svg"],
    description: "Улуу «Манас» эпосун үйрөнүүчү 5-класстын окуу куралы. Айкөл Манастын баатырдык эрдиктери жана көркөм сүрөттөр."
  },
  {
    id: "b_110",
    title: "Биология: Адам жана ден соолук 8-класс",
    author: "Ж. Абдырахманов, Д. Тентимишев",
    subject: "Биология",
    images: ["/covers/biology-8.svg"],
    description: "8-класс үчүн адам анатомиясы жана физиологиясы. Органдар системасы, ДНК, кан айлануу жана ден соолукту сактоо эрежелери."
  },
  {
    id: "b_111",
    title: "Русский язык 5-класс",
    author: "М. М. Разумовская, П. Лекант",
    subject: "Русский язык",
    images: ["/covers/russian-5.svg"],
    description: "Учебник русского языка для школ с русским языком обучения. Все правила орфографии, синтаксис, теория и практические упражнения."
  },
  {
    id: "b_112",
    title: "ЖРТ Кыргыз тили жана окуу боюнча колдонмо",
    author: "Г. Орозова, Т. Бакасова",
    subject: "ОРТ / ЖРТ",
    images: ["/covers/ort-kyrgyz.svg"],
    description: "ЖРТ негизги тесттин кыргыз тили бөлүмү: аналогиялар, сүйлөм толуктоо жана текстти түшүнүү боюнча тесттердин толук чыгарылышы."
  }
];

async function main() {
  console.log(`Updating ${books.length} books in Neon Postgres...`);
  
  for (const b of books) {
    await sql.query(
      `UPDATE books 
       SET title = $1, 
           author = $2, 
           subject = $3, 
           description = $4, 
           images = $5::jsonb 
       WHERE id = $6`,
      [
        b.title,
        b.author,
        b.subject,
        b.description,
        JSON.stringify(b.images),
        b.id
      ]
    );
    console.log(`Updated in Neon: [${b.id}] ${b.title} -> ${b.images[0]}`);
  }
  
  console.log('Neon database successfully updated with new textbook covers and titles!');
}

main().catch(err => {
  console.error('Failed to update Neon:', err);
  process.exit(1);
});
