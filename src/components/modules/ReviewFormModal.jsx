import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';

export const ReviewFormModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Сураныч, аты-жөнүңүздү жазыңыз');
      return;
    }
    if (!comment.trim()) {
      setError('Сураныч, пикириңизди калтырыңыз');
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
    <Modal isOpen={isOpen} onClose={onClose} title="Окуу китебине пикир калтыруу">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Бааңыз (Рейтинг):
          </label>
          <RatingStars
            rating={rating}
            size="md"
            interactive
            onRatingChange={(r) => setRating(r)}
          />
        </div>

        <Input
          label="Аты-жөнүңүз (ФИО)"
          placeholder="Мис. Айгүл Касымова"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Сиздин пикириңиз жана китептин абалы жөнүндө:
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Китептин барактары, жеткирүү жана ижара тажрыйбасы тууралуу жазыңыз..."
            className="w-full text-xs rounded-xl border border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Жокко чыгаруу
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Пикирди жарыялоо
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewFormModal;
