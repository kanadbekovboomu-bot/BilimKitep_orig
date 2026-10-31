// Telegram Bot Notification Engine for BilimKitep Web Platform
// Automatically sends rich HTML alerts for new orders, rentals,
// new textbook listings, and account security notifications to Telegram.

const DEFAULT_BOT_TOKEN = '9192396334:AAFi2pr4TuxDBysf0aM-rfYZyOK3SKk38GQ';
const DEFAULT_CHAT_ID = '8174784625';

export const getTelegramConfig = () => {
  let token = DEFAULT_BOT_TOKEN;
  let chatId = DEFAULT_CHAT_ID;

  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_TELEGRAM_BOT_TOKEN && !import.meta.env.VITE_TELEGRAM_BOT_TOKEN.includes('demo_')) {
      token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    }
    if (import.meta.env.VITE_TELEGRAM_CHAT_ID && !import.meta.env.VITE_TELEGRAM_CHAT_ID.includes('-100123')) {
      chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    }
  }

  return { token, chatId };
};

/**
 * Send raw HTML message to Telegram Chat
 */
export const sendTelegramMessage = async (text, options = {}) => {
  const { token, chatId } = getTelegramConfig();

  if (!token || !chatId) {
    console.warn('[Telegram Bot] Missing bot token or chatId');
    return { success: false, error: 'Telegram credentials not configured' };
  }

  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;

  const body = {
    chat_id: options.chatId || chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: options.disablePreview !== false,
  };

  if (options.reply_markup) {
    body.reply_markup = options.reply_markup;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!data.ok) {
      console.warn('[Telegram API Error]:', data.description);
    }
    return data;
  } catch (error) {
    console.error('[Telegram Dispatch Error]:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 1. Notify about New Order / Book Rental
 */
export const notifyTelegramOrder = async (order) => {
  const orderId = order.id || order.uuid || `BK-${Date.now().toString().slice(-6)}`;

  let itemsList = '';
  if (order.items && order.items.length > 0) {
    itemsList = order.items
      .map((i, idx) => {
        const typeLabel = i.type === 'RENT' ? `Ижара (${i.months || 9} ай)` : 'Сатып алуу';
        const price = i.totalPrice || i.price || (i.book ? i.book.price : 0);
        return `  ${idx + 1}. <b>${i.book?.title || 'Окуу китеби'}</b>\n     └ <i>${typeLabel} • ${price} сом</i>`;
      })
      .join('\n');
  } else {
    itemsList = `  1. <b>${order.bookTitle || 'Окуу китеби'}</b>`;
  }

  const text = `
🛒 <b>ЖАҢЫ БУЙРУТМА / НОВЫЙ ЗАКАЗ #${orderId}</b>
➖➖➖➖➖➖➖➖➖➖
📚 <b>Китептер / Учебники:</b>
${itemsList}

💰 <b>Жалпы сумма / Итого:</b> <b>${order.totalAmount || 0} сом</b>
🛡️ <b>Күрөө / Залог:</b> ${order.depositAmount || 0} сом
👤 <b>Кардар / Покупатель:</b> ${order.customerName || 'Колдонуучу'}
📞 <b>Телефон:</b> <code>${order.customerPhone || '+996 700 000 000'}</code>
📍 <b>Дареги / Адрес:</b> ${order.city || 'Бишкек'}, ${order.address || 'Жеткирүү дареги'}
💳 <b>Төлөм / Оплата:</b> ${order.paymentMethod || 'Элкарт / MBank / О!Деньги'}
🚚 <b>Жеткирүү / Доставка:</b> ${order.deliveryMethod || 'Курьердик кызмат'}
⏰ <b>Убактысы / Время:</b> ${new Date().toLocaleString('ru-RU')}
➖➖➖➖➖➖➖➖➖➖
🇰🇬 <i>BilimKitep — Кыргызстандагы окуу китептер платформасы</i>
  `.trim();

  return sendTelegramMessage(text, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🌐 Открыть заказ на сайте', url: 'https://bilim-kitep.vercel.app/profile' },
        ],
      ],
    },
  });
};

/**
 * 2. Notify about New Book Listing Submitted by User
 */
export const notifyTelegramNewBook = async (book) => {
  const text = `
📖 <b>ЖАҢЫ КИТЕП КОШУЛДУ / НОВАЯ КНИГА В КАТАЛОГЕ</b>
➖➖➖➖➖➖➖➖➖➖
📘 <b>Аталышы / Название:</b> <b>${book.title}</b>
✍️ <b>Автору / Автор:</b> ${book.author || 'Белгисиз'}
🏫 <b>Класс жана предмет:</b> ${book.grade || '—'} класс • ${book.subject || '—'}
🌐 <b>Тили / Язык:</b> ${book.language || 'Кыргызча'}
✨ <b>Абалы / Состояние:</b> ${book.condition || 'Жакшы'}

💵 <b>Баасы / Цена продажи:</b> ${book.price ? `${book.price} сом` : '—'}
📅 <b>Айлык ижарасы / Аренда в мес:</b> ${book.rentPricePerMonth ? `${book.rentPricePerMonth} сом/ай` : '—'}
🛡️ <b>Күрөө / Залог:</b> ${book.deposit ? `${book.deposit} сом` : '0 сом'}

👤 <b>Сатуучу / Владелец:</b> ${book.owner?.name || 'Колдонуучу'}
📞 <b>Байланыш / Телефон:</b> <code>${book.owner?.phone || '+996 700 123 456'}</code>
📍 <b>Шаар / Город:</b> ${book.owner?.city || 'Бишкек'}
⏰ <b>Убактысы:</b> ${new Date().toLocaleString('ru-RU')}
➖➖➖➖➖➖➖➖➖➖
🇰🇬 <i>BilimKitep Marketplace</i>
  `.trim();

  return sendTelegramMessage(text);
};

/**
 * 3. Notify about Security Alerts (e.g. Account Lockout / Password Change)
 */
export const notifyTelegramSecurityAlert = async (alert) => {
  const text = `
🚨 <b>КООПСУЗДУК ЭСКЕРТҮҮСҮ / СИСТЕМНОЕ ОПОВЕЩЕНИЕ</b>
➖➖➖➖➖➖➖➖➖➖
⚠️ <b>Окуя / Событие:</b> <b>${alert.event || 'Шектүү аракет / Подозрительная активность'}</b>
👤 <b>Аккаунт:</b> <code>${alert.email || 'user@example.com'}</code>
📍 <b>Жайгашкан жери / Локация:</b> ${alert.location || 'Бишкек, Кыргызстан'}
💻 <b>Түзмөк / Устройство:</b> ${alert.device || 'Мобильное устройство'}
⏰ <b>Убактысы / Время:</b> ${new Date().toLocaleString('ru-RU')}
➖➖➖➖➖➖➖➖➖➖
🔒 <i>PBKDF2-SHA256 Security Guard • BilimKitep</i>
  `.trim();

  return sendTelegramMessage(text);
};

/**
 * Test Connection Function
 */
export const testTelegramConnection = async () => {
  const text = `
🔔 <b>ТЕСТОВОЕ УВЕДОМЛЕНИЕ ОТ BILIMKITEP!</b>
➖➖➖➖➖➖➖➖➖➖
✅ Бот <b>@BilimKitep_bot</b> успешно подключен к платформе!
📦 Уведомления о новых заказах и аренде будут приходить сюда в реальном времени.
➖➖➖➖➖➖➖➖➖➖
⏰ <b>Время теста:</b> ${new Date().toLocaleString('ru-RU')}
🇰🇬 <i>Платформа шеринга и аренды учебников BilimKitep</i>
  `.trim();

  return sendTelegramMessage(text);
};
