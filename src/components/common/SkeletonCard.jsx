import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder p-4 flex flex-col h-full animate-pulse">
      <div className="w-full h-52 bg-gray-200 dark:bg-darkBorder rounded-xl mb-4" />
      <div className="flex gap-2 mb-2">
        <div className="h-5 w-16 bg-gray-200 dark:bg-darkBorder rounded-full" />
        <div className="h-5 w-20 bg-gray-200 dark:bg-darkBorder rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-darkBorder rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-darkBorder rounded mb-4" />
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-darkBorder flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-200 dark:bg-darkBorder rounded" />
        <div className="h-8 w-20 bg-gray-200 dark:bg-darkBorder rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCard;
