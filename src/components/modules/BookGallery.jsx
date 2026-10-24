import React, { useState } from 'react';

export const BookGallery = ({ images = [] }) => {
  const defaultImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'];

  const [activeImage, setActiveImage] = useState(defaultImages[0]);

  return (
    <div className="space-y-3">
      {/* Main big preview */}
      <div className="w-full h-80 sm:h-96 bg-gray-100 dark:bg-darkBorder rounded-2xl overflow-hidden border border-gray-100 dark:border-darkBorder shadow-xs">
        <img
          src={activeImage}
          alt="Учебник"
          className="w-full h-full object-cover transition-all duration-300"
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
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeImage === img
                  ? 'border-brand-500 ring-2 ring-brand-500/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Превью ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookGallery;
