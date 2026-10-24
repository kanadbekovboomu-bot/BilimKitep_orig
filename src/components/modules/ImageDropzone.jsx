import React, { useState } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadBookImage } from '../../services/cloudinary';

export const ImageDropzone = ({
  images = [],
  onChange,
  maxImages = 4,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setError('');

    const files = Array.from(fileList).slice(0, maxImages - images.length);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadBookImage(file));
      const urls = await Promise.all(uploadPromises);
      onChange([...images, ...urls]);
    } catch (err) {
      setError(err.message || 'Ошибка загрузки изображений');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const updated = images.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-200 dark:border-darkBorder hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-darkCard/40 transition-colors cursor-pointer"
        onClick={() => document.getElementById('book-image-input')?.click()}
      >
        <input
          id="book-image-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading || images.length >= maxImages}
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            <span className="text-xs text-gray-500 font-medium">
              Сүрөттөр Cloudinary булутуна жүктөлүүдө...
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                Сүрөттү тандоо үчүн басыңыз
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400"> же бул жакка сүйрөңүз</span>
            </div>
            <p className="text-[11px] text-gray-400">
              PNG, JPG, WEBP (максимум {maxImages} сүрөт)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Previews grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-100 dark:border-darkBorder h-24">
              <img src={url} alt={`Сүрөт ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                className="absolute top-1 right-1 p-1 rounded-lg bg-black/60 text-white hover:bg-red-500 transition-colors cursor-pointer"
                title="Сүрөттү өчүрүү"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
