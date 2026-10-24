// Validation helpers for BilimKitep forms

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

export const isValidPhoneKG = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 12;
};

export const isValidPrice = (price) => {
  const n = Number(price);
  return !isNaN(n) && n > 0 && n <= 100000;
};
