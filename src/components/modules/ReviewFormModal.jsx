import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';

export const ReviewFormModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation(['book', 'common']);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError(t('reviewModal.errorName'));
      return;
    }
    if (!comment.trim()) {
      setError(t('reviewModal.errorComment'));
      return;
    }

    onSubmit({
      user: userName.trim(),
      rating,
      comment: comment.trim(),
    });

    setUserName('');
    setComment('');
    setRating(5);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('reviewModal.title')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            {t('reviewModal.ratingLabel')}
          </label>
          <RatingStars
            rating={rating}
            size="md"
            interactive
            onRatingChange={(r) => setRating(r)}
          />
        </div>

        <Input
          label={t('reviewModal.nameLabel')}
          placeholder={t('reviewModal.namePlaceholder')}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            {t('reviewModal.commentLabel')}
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('reviewModal.commentPlaceholder')}
            className="w-full text-xs rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            {t('actions.cancel', { ns: 'common' })}
          </Button>
          <Button variant="primary" size="sm" type="submit">
            {t('reviewModal.submitBtn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewFormModal;
