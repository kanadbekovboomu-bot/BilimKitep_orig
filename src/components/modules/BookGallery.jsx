import React, { useState } from 'react';

export const BookGallery = ({ images = [] }) => {
  const defaultImages = images.length > 0
    ? images
    : ['/covers/geometry-8.svg'];

  const [activeImage, setActiveImage] = useState(defaultImages[0]);

  return (
    <div className="space-y-3">
      {/* Main big preview */}
      <div className="w-full h-80 sm:h-[420px] bg-gray-50 dark:bg-darkBorder/40 rounded-2xl overflow-hidden border border-gray-100 dark:border-darkBorder shadow-xs flex items-center justify-center p-4">
        <img
          src={activeImage}
          alt=""
          className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {defaultImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {defaultImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`w-16 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 dark:bg-darkBorder/40 transition-all shrink-0 cursor-pointer p-1 ${
                activeImage === img
                  ? 'border-brand-500 ring-2 ring-brand-500/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookGallery;
