import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookPlus,
  Sparkles,
  CheckCircle2,
  Calculator,
  Compass,
  BookOpen,
  GraduationCap,
  Zap,
  FlaskConical,
  Leaf,
  Landmark,
  Globe,
  Laptop,
  Layers,
  Calendar,
  Coins,
  ThumbsUp,
  Clock,
  Package
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { ImageDropzone } from '../components/modules/ImageDropzone';
import { TyndykEmblem } from '../components/common/KyrgyzOrnament';
import { createBookListing } from '../features/books/booksSlice';
import { notifyTelegramNewBook } from '../services/telegram';

export const AddBookPage = () => {
  const { t, i18n } = useTranslation(['profile', 'common', 'catalog']);
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
  const [quantity, setQuantity] = useState('1');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isAdmin = user?.role === 'ADMIN';

  // Localized Dropdown Option Lists with Site Decor Icons
  const subjectOptions = useMemo(() => [
    { value: 'Математика / Алгебра', label: t('bookForm.subjects.math', { defaultValue: 'Математика / Алгебра' }), icon: Calculator },
    { value: 'Геометрия', label: t('bookForm.subjects.geometry', { defaultValue: 'Геометрия' }), icon: Compass },
    { value: 'Кыргыз тили', label: t('bookForm.subjects.kyrgyzLang', { defaultValue: 'Кыргыз тили' }), icon: BookOpen },
    { value: 'Кыргыз адабияты', label: t('bookForm.subjects.kyrgyzLit', { defaultValue: 'Кыргыз адабияты' }), icon: BookOpen },
    { value: 'ОРТ / ЖРТ', label: t('bookForm.subjects.ort', { defaultValue: 'ОРТ / ЖРТ пособия' }), icon: GraduationCap },
    { value: 'Физика', label: t('bookForm.subjects.physics', { defaultValue: 'Физика' }), icon: Zap },
    { value: 'Химия', label: t('bookForm.subjects.chemistry', { defaultValue: 'Химия' }), icon: FlaskConical },
    { value: 'Биология', label: t('bookForm.subjects.biology', { defaultValue: 'Биология' }), icon: Leaf },
    { value: 'Тарых', label: t('bookForm.subjects.history', { defaultValue: 'Кыргызстан тарыхы' }), icon: Landmark },
    { value: 'Русский язык', label: t('bookForm.subjects.russian', { defaultValue: 'Русский язык' }), icon: BookOpen },
    { value: 'Англис тили', label: t('bookForm.subjects.english', { defaultValue: 'Английский язык' }), icon: Globe },
    { value: 'Информатика', label: t('bookForm.subjects.informatics', { defaultValue: 'Информатика / ИКТ' }), icon: Laptop },
  ], [t, i18n.language]);

  const gradeOptions = useMemo(() => Array.from({ length: 11 }, (_, i) => {
    const g = String(i + 1);
    return {
      value: g,
      label: g === '11'
        ? `${t('units.grade', { count: 11, ns: 'common', defaultValue: '11-класс' })} / ОРТ`
        : t('units.grade', { count: Number(g), ns: 'common', defaultValue: `${g}-класс` }),
      icon: GraduationCap,
    };
  }), [t, i18n.language]);

  const languageOptions = useMemo(() => [
    { value: 'KG', label: t('bookForm.languages.kg', { defaultValue: 'Кыргызский (Кыргыз тилинде)' }), icon: BookOpen },
    { value: 'RU', label: t('bookForm.languages.ru', { defaultValue: 'Русский язык' }), icon: BookOpen },
    { value: 'EN', label: t('bookForm.languages.en', { defaultValue: 'Английский язык' }), icon: Globe },
  ], [t, i18n.language]);

  const dealTypeOptions = useMemo(() => [
    { value: 'BOTH', label: t('bookForm.dealTypes.both', { defaultValue: 'Ижара жана Сатуу' }), icon: Layers },
    { value: 'RENT', label: t('bookForm.dealTypes.rent', { defaultValue: 'Ижарага гана' }), icon: Calendar },
    { value: 'BUY', label: t('bookForm.dealTypes.buy', { defaultValue: 'Сатуу гана' }), icon: Coins },
  ], [t, i18n.language]);

  const conditionOptions = useMemo(() => [
    { value: 'NEW', label: t('bookForm.conditions.new', { defaultValue: 'Жаңы (Таза, чийилген эмес)' }), icon: Sparkles },
    { value: 'EXCELLENT', label: t('bookForm.conditions.excellent', { defaultValue: 'Эң жакшы (Идеалдуу)' }), icon: CheckCircle2 },
    { value: 'GOOD', label: t('bookForm.conditions.good', { defaultValue: 'Жакшы (Барактары бүтүн)' }), icon: ThumbsUp },
    { value: 'FAIR', label: t('bookForm.conditions.fair', { defaultValue: 'Орточо' }), icon: Clock },
  ], [t, i18n.language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError(t('bookForm.title') + ' & ' + t('bookForm.author'));
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
        condition: isAdmin ? (condition || 'NEW') : (condition === 'NEW' ? 'EXCELLENT' : condition),
        year: Number(year),
        quantity: Math.max(1, Number(quantity) || 1),
        initialStock: Math.max(1, Number(quantity) || 1),
        isAdminBook: isAdmin,
        isUsed: !isAdmin,
        description: description.trim() || 'Good condition, intact pages.',
        images: images.length > 0 ? images : undefined,
        owner: {
          uuid: user?.uuid || user?.id || (isAdmin ? 'a0010000-7c2a-41e9-9011-000000000001' : 'a0020000-7c2a-41e9-9011-000000000002'),
          id: user?.id || user?.uuid || (isAdmin ? 'a0010000-7c2a-41e9-9011-000000000001' : 'a0020000-7c2a-41e9-9011-000000000002'),
          name: user?.name || (isAdmin ? 'BilimKitep (Администрация)' : 'Айбек Нурланов'),
          role: user?.role || (isAdmin ? 'ADMIN' : 'USER'),
          phone: user?.phone || (isAdmin ? '+996 555 999 000' : '+996 700 123 456'),
          city: user?.city || 'Бишкек',
          rating: 5.0,
        },
      };

      await dispatch(createBookListing(bookPayload)).unwrap();

      // Dispatch alert to Telegram Bot
      notifyTelegramNewBook(bookPayload).catch((e) =>
        console.warn('Telegram notify listing error:', e)
      );

      navigate('/catalog');
    } catch (err) {
      setError(err || 'Error adding book listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: t('addBookTitle') }]} />

      <div className="bg-white dark:bg-darkCard rounded-3xl border border-gray-100 dark:border-darkBorder shadow-xs space-y-8 overflow-hidden">
        {/* Kyrgyz National Tricolor Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600" />

        <div className="p-6 sm:p-10 pt-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>{t('ecoSharing')}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] bg-amber-500/10 text-amber-900 dark:text-amber-200 px-2.5 py-0.5 rounded-full font-bold border border-amber-300/40">
                <TyndykEmblem size={13} className="text-amber-500" />
                <span>{t('badgeKyrgyzstan', { defaultValue: 'Кыргызстан • Окуу китептери' })}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              {t('addBookTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {t('addBookSubtitle')}
            </p>

            {/* Seller Role Notice: New for Admin vs б/у for regular users */}
            <div className="mt-4">
              {!isAdmin ? (
                <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md font-black lowercase text-[11px] bg-amber-200/90 dark:bg-amber-900 text-amber-950 dark:text-amber-200 shrink-0 mt-0.5 border border-amber-300 dark:border-amber-700 shadow-2xs">
                    {t('usedBadge', { defaultValue: 'б/у' })}
                  </span>
                  <div className="space-y-0.5">
                    <div className="font-bold text-amber-950 dark:text-amber-200">
                      {t('bookForm.userNoticeTitle', { defaultValue: 'Вы выставляете книгу как пользователь — метка «б/у»' })}
                    </div>
                    <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                      {t('bookForm.userNoticeDesc', { defaultValue: 'Поскольку вы уже использовали эту книгу для учёбы, в каталоге рядом с ней будет автоматически указано маленькими буквами б/у.' })}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-emerald-200/90 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 shrink-0 mt-0.5 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                    {t('newBadge', { defaultValue: 'Новая' })}
                  </span>
                  <div className="space-y-0.5">
                    <div className="font-bold text-emerald-950 dark:text-emerald-200">
                      {t('bookForm.adminNoticeTitle', { defaultValue: 'Режим Администратора — продажа новых книг' })}
                    </div>
                    <p className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                      {t('bookForm.adminNoticeDesc', { defaultValue: 'Книги администрации выставляются как новые и отображаются в каталоге в первую очередь (в начале списка).' })}
                    </p>
                  </div>
                </div>
              )}
            </div>
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
              placeholder={t('bookForm.titlePlaceholder', { defaultValue: 'Напр. Геометрия 8-класс' })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              label={t('bookForm.author')}
              placeholder={t('bookForm.authorPlaceholder', { defaultValue: 'Напр. И. Б. Бекбоев, А. А. Бөрүбаев' })}
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
              options={subjectOptions}
            />

            <Select
              label={t('bookForm.grade')}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              options={gradeOptions}
            />

            <Select
              label={t('bookForm.language')}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={languageOptions}
            />
          </div>

          {/* Pricing & Deal Type */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-darkBorder/40">
            <Select
              label={t('bookForm.dealType')}
              value={dealType}
              onChange={(e) => setDealType(e.target.value)}
              options={dealTypeOptions}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label={t('bookForm.condition')}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              options={conditionOptions}
            />

            <Input
              label={t('bookForm.year', { defaultValue: 'Год издания' })}
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <Input
              label={t('bookForm.quantity', { defaultValue: 'Количество в наличии (шт.)' })}
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="1"
              required
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
              placeholder={t('bookForm.descriptionPlaceholder', { defaultValue: 'Опишите сохранность книги, целостность страниц, наличие пометок и другие особенности...' })}
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
    </div>
  );
};

export default AddBookPage;
