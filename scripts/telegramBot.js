/**
 * Standalone Telegram Bot Daemon for BilimKitep Platform
 * Powered by Telegram Bot API (Long Polling)
 * Bot: @BilimKitep_bot
 * Handles /start, /orders, /catalog, /status, /help
 */

import fs from 'fs';
import path from 'path';

// Load .env variables if present
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  }
}

const BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || '9192396334:AAFi2pr4TuxDBysf0aM-rfYZyOK3SKk38GQ';
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

console.log('🤖 Запуск Telegram-бота BilimKitep (@BilimKitep_bot)...');

async function tgRequest(method, payload = {}) {
  try {
    const res = await fetch(`${API_BASE}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error(`[Telegram Error ${method}]:`, err.message);
    return null;
  }
}

async function sendMessage(chatId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  return tgRequest('sendMessage', payload);
}

let lastUpdateId = 0;

async function pollUpdates() {
  const data = await tgRequest('getUpdates', {
    offset: lastUpdateId + 1,
    timeout: 25,
  });

  if (data && data.ok && Array.isArray(data.result)) {
    for (const update of data.result) {
      lastUpdateId = update.update_id;
      if (update.message && update.message.text) {
        await handleMessage(update.message);
      }
    }
  }

  // Continue polling loop
  setTimeout(pollUpdates, 1500);
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const user = msg.from;
  const text = msg.text.trim();

  console.log(`[Telegram IN] От ${user.first_name || user.username} (${chatId}): ${text}`);

  if (text === '/start') {
    const welcomeText = `
📚 <b>Салам, ${user.first_name || 'досум'}!</b>
Кош келиңиз <b>BilimKitep</b> расмий Telegram-ботуна! 🇰🇬

Бул бот аркылуу сиз:
• 📦 Жаңы ижара жана сатып алуу буйрутмаларын кабыл аласыз
• 📖 Каталогдогу жаңы окуу китептери тууралуу кабардар болосуз
• 🔐 Аккаунтуңузга кирүү жана коопсуздук эскертүүлөрүн көрөсүз

<i>Сиздин Telegram Chat ID:</i> <code>${chatId}</code>
    `.trim();

    const keyboard = {
      inline_keyboard: [
        [
          { text: '🌐 Сайтты ачуу (BilimKitep)', url: 'https://bilim-kitep.vercel.app' },
          { text: '📚 Каталог', url: 'https://bilim-kitep.vercel.app/catalog' },
        ],
        [
          { text: '👤 Жеке кабинет', url: 'https://bilim-kitep.vercel.app/profile' },
        ],
      ],
    };

    await sendMessage(chatId, welcomeText, keyboard);
    return;
  }

  if (text === '/status') {
    const statusText = `
📊 <b>СТАТУС ПЛАТФОРМЫ BILIMKITEP</b>
➖➖➖➖➖➖➖➖➖➖
✅ <b>Веб-сервер:</b> Онлайн (Vite + Vercel)
✅ <b>База данных:</b> Neon Serverless PostgreSQL
✅ <b>Защита аккаунтов:</b> PBKDF2-SHA256 (100k итераций)
✅ <b>Telegram Бот:</b> Активен (@BilimKitep_bot)
⏰ <b>Серверное время:</b> ${new Date().toLocaleString('ru-RU')}
➖➖➖➖➖➖➖➖➖➖
🇰🇬 <i>Кыргыз Республикасы • Эко-шеринг платформасы</i>
    `.trim();
    await sendMessage(chatId, statusText);
    return;
  }

  if (text === '/orders') {
    const ordersText = `
📦 <b>ПОСЛЕДНИЕ ЗАКАЗЫ И АРЕНДА (ДЕМО):</b>
➖➖➖➖➖➖➖➖➖➖
1. Заказ #BK-88219: <b>Информатика 7 класс</b>
   └ <i>Аренда 9 месяцев • 450 сом (Залог: 200 сом) • Бишкек</i>
2. Заказ #BK-88218: <b>Кыргыз тили 8 класс</b>
   └ <i>Покупка • 350 сом • Ош</i>
3. Заказ #BK-88217: <b>Геометрия 8 класс</b>
   └ <i>Аренда 9 месяцев • 450 сом • Жалал-Абад</i>
➖➖➖➖➖➖➖➖➖➖
💡 Полный список доступен в вашем <a href="https://bilim-kitep.vercel.app/profile">Личном кабинете</a>
    `.trim();
    await sendMessage(chatId, ordersText);
    return;
  }

  if (text === '/catalog') {
    const catalogText = `
📚 <b>КАТАЛОГ ШКОЛЬНЫХ УЧЕБНИКОВ:</b>
В каталоге доступно более 26 учебников стандартов КР (1–11 классы).
Доставка курьером по всем 7 областям Кыргызстана!
    `.trim();
    const keyboard = {
      inline_keyboard: [
        [{ text: '🔍 Перейти в каталог', url: 'https://bilim-kitep.vercel.app/catalog' }],
      ],
    };
    await sendMessage(chatId, catalogText, keyboard);
    return;
  }

  // Fallback for other commands or messages
  const helpText = `
🤖 <b>Команды бота @BilimKitep_bot:</b>
/start — Главное меню и ваш Telegram ID
/orders — Последние заказы и статус аренды
/catalog — Каталог школьных учебников
/status — Состояние серверов и защиты
/help — Справка по командам
  `.trim();
  await sendMessage(chatId, helpText);
}

// Start polling
tgRequest('getMe').then((res) => {
  if (res && res.ok) {
    console.log(`✅ Бот @${res.result.username} успешно авторизован в Telegram API!`);
    console.log(`📡 Начинаем опрос сообщений (Long Polling)...`);
    pollUpdates();
  } else {
    console.error('❌ Ошибка авторизации бота:', res);
  }
});
