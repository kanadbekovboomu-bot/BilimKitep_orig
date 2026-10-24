import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BookPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { ImageDropzone } from '../components/modules/ImageDropzone';
import { createBookListing } from '../features/books/booksSlice';

export const AddBookPage = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('Математика / Алгебра');
  const [grade, setGrade] = useState('8');
  const [language, setLanguage] = useState('KG');
  const [dealType, setDealType] = useState('BOTH');
  const [price, setPrice] = useState('320');
  const [rentPricePerMonth, setRentPricePerMonth] = useState('40');
  const [deposit, setDeposit] = useState('150');
  const [condition, setCondition] = useState('EXCELLENT');
  const [year, setYear] = useState('2023');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError('Китептин аталышын жана авторун толтуруңуз');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookPayload = {
        title: title.trim(),
        author: author.trim(),
        subject,
        grade: Number(grade),
        language,
        dealType,
        price: Number(price),
        rentPricePerMonth: Number(rentPricePerMonth),
        deposit: Number(deposit),
        condition,
        year: Number(year),
        description: description.trim() || 'Китеп жакшы абалда, барактары толук.',
        images: images.length > 0 ? images : undefined,
        owner: {
          id: user?.id || 'u_502',
          name: user?.name || 'Айбек Нурланов',
          phone: user?.phone || '+996 700 123 456',
          city: 'Бишкек',
          rating: 5.0,
        },
      };

      await dispatch(createBookListing(bookPayload)).unwrap();
      navigate('/catalog');
    } catch (err) {
      setError(err || 'Ошибка добавления книги');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Жаңы китеп кошуу' }]} />

      <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Эко-шеринг жана киреше табуу</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            {t('addBookTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t('addBookSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Upload Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {t('bookForm.images')}
            </label>
            <ImageDropzone images={images} onChange={setImages} />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t('bookForm.title')}
              placeholder="Мис. Геометрия 8-класс"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label={t('bookForm.author')}
              placeholder="Мис. И. Б. Бекбоев, А. А. Бөрүбаев"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label={t('bookForm.subject')}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Математика / Алгебра', label: 'Математика / Алгебра' },
                { value: 'Геометрия', label: 'Геометрия' },
                { value: 'Кыргыз тили', label: 'Кыргыз тили' },
                { value: 'Кыргыз адабияты', label: 'Кыргыз адабияты' },
                { value: 'ОРТ / ЖРТ', label: 'ОРТ / ЖРТ пособия' },
                { value: 'Физика', label: 'Физика' },
                { value: 'Химия', label: 'Химия' },
                { value: 'Биология', label: 'Биология' },
                { value: 'Тарых', label: 'Кыргызстан тарыхы' },
                { value: 'Русский язык', label: 'Русский язык' },
                { value: 'Англис тили', label: 'Английский язык' },
              ]}
            />

            <Select
              label={t('bookForm.grade')}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              options={[
                { value: '1', label: '1-класс' },
                { value: '2', label: '2-класс' },
                { value: '3', label: '3-класс' },
                { value: '4', label: '4-класс' },
                { value: '5', label: '5-класс' },
                { value: '6', label: '6-класс' },
                { value: '7', label: '7-класс' },
                { value: '8', label: '8-класс' },
                { value: '9', label: '9-класс' },
                { value: '10', label: '10-класс' },
                { value: '11', label: '11-класс / ЖРТ' },
              ]}
            />

            <Select
              label={t('bookForm.language')}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={[
                { value: 'KG', label: 'Кыргыз тилинде' },
                { value: 'RU', label: 'Орус тилинде' },
                { value: 'EN', label: 'Англис тилинде' },
              ]}
            />
          </div>

          {/* Pricing & Deal Type */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-darkBorder/40">
            <Select
              label={t('bookForm.dealType')}
              value={dealType}
              onChange={(e) => setDealType(e.target.value)}
              options={[
                { value: 'BOTH', label: 'Ижара жана Сатуу' },
                { value: 'RENT', label: 'Ижарага гана' },
                { value: 'BUY', label: 'Сатуу гана' },
              ]}
            />

            <Input
              label={t('bookForm.rentPricePerMonth')}
              type="number"
              value={rentPricePerMonth}
              onChange={(e) => setRentPricePerMonth(e.target.value)}
              disabled={dealType === 'BUY'}
            />

            <Input
              label={t('bookForm.deposit')}
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              disabled={dealType === 'BUY'}
            />

            <Input
              label={t('bookForm.price')}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label={t('bookForm.condition')}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              options={[
                { value: 'NEW', label: 'Жаңы (Таза, чийилген эмес)' },
                { value: 'EXCELLENT', label: 'Эң жакшы (Идеалдуу)' },
                { value: 'GOOD', label: 'Жакшы (Барактары бүтүн)' },
                { value: 'FAIR', label: 'Орточо' },
              ]}
            />

            <Input
              label="Басылган жылы"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              {t('bookForm.description')}
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Китептин сакталышы, барактарынын бүтүндүгү жана башка өзгөчөлүктөрү тууралуу жазыңыз..."
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            type="submit"
            loading={loading}
            icon={BookPlus}
          >
            {t('bookForm.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
