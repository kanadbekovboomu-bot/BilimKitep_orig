// Cloudinary Unsigned Upload Service for BilimKitep

export const uploadBookImage = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET || 'unsigned_preset';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!response.ok) {
      // In local/demo mode without configured Cloudinary credentials, convert to base64 DataURL
      return await fileToDataUrl(file);
    }
    const data = await response.json();
    return data.secure_url;
  } catch {
    // Graceful offline fallback
    return await fileToDataUrl(file);
  }
};

const fileToDataUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};
