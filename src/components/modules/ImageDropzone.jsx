import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadBookImage } from '../../services/cloudinary';

export const ImageDropzone = ({
  images = [],
  onChange,
  maxImages = 4,
}) => {
  const { t, i18n } = useTranslation(['profile', 'common']);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const isEn = i18n.language === 'en';
  const isKg = i18n.language === 'kg';

  const uploadText = isEn
    ? 'Uploading images to Cloudinary...'
    : (isKg ? 'Сүрөттөр Cloudinary булутуна жүктөлүүдө...' : 'Загрузка фотографий в Cloudinary...');
  const clickToSelect = isEn
    ? 'Click to choose files'
    : (isKg ? 'Сүрөттү тандоо үчүн басыңыз' : 'Нажмите для выбора фото');
  const orDrag = isEn
    ? ' or drag & drop here'
    : (isKg ? ' же бул жакка сүйрөңүз' : ' или перетащите их сюда');
  const formatHint = isEn
    ? `PNG, JPG, WEBP (up to ${maxImages} images)`
    : (isKg ? `PNG, JPG, WEBP (максимум ${maxImages} сүрөт)` : `PNG, JPG, WEBP (до ${maxImages} фото)`);

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
      setError(err.message || 'Image upload error');
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
              {uploadText}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-emerald-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                {clickToSelect}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{orDrag}</span>
            </div>
            <p className="text-[11px] text-gray-400">
              {formatHint}
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Previews grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div key={idx} className="relative aspect-3/4 rounded-xl overflow-hidden group bg-gray-100 dark:bg-darkBorder">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
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
