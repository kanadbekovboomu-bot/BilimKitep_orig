import React from 'react';
import { RatingStars } from '../common/RatingStars';
import { User } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-50 dark:bg-darkBorder/30 rounded-2xl p-4 space-y-2 border border-gray-100 dark:border-darkBorder">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
            {review.user ? review.user.charAt(0) : 'U'}
          </div>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
            {review.user || 'Колдонуучу'}
          </span>
        </div>
        <span className="text-[11px] text-gray-400">{review.date}</span>
      </div>

      <RatingStars rating={review.rating || 5} size="sm" />

      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
