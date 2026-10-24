import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ListingManageRow } from '../components/modules/ListingManageRow';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook } from '../features/books/booksSlice';

export const MyListingsPage = () => {
  const { t } = useTranslation(['profile', 'common']);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const res = await api.getBooks({ limit: 100 });
        const filtered = res.items.filter(
          (b) => b.owner?.id === user?.id || b.owner?.id === 'u_502'
        );
        setMyBooks(filtered);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm(t('deleteListingConfirm'))) {
      await dispatch(deleteBook(id));
      setMyBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.profile', { ns: 'common' }), to: '/profile' },
          { label: t('myListingsTitle') },
        ]}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
          {t('myListingsTitle')} ({myBooks.length})
        </h1>
        <Link to="/add-book">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            {t('addBookBtn')}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {myBooks.length > 0 ? (
          myBooks.map((b) => (
            <ListingManageRow key={b.id} book={b} onDelete={handleDelete} />
          ))
        ) : (
          <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-12 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-500">{t('noListings')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;
