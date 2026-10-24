// Price, Date, and Phone Formatters for Kyrgyzstan

export const formatKGS = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(num) + ' сом';
};

export const formatPhoneKG = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('996')) {
    return `+996 (${cleaned.slice(3, 6)}) ${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
