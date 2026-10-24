// Telegram Bot API Notification Service for BilimKitep

export const notifyTelegramOrder = async (order) => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || token.includes('demo_') || !chatId) {
    console.info('[Telegram Bot Simulator] Notification queued:', order);
    return { success: true, simulated: true };
  }

  const itemsList = order.items && order.items.length > 0
    ? order.items.map((i, idx) => `  ${idx + 1}. ${i.book?.title} (${i.type === 'RENT' ? `Ижара ${i.months} ай` : 'Сатып алуу'})`).join('\n')
    : order.bookTitle || 'Учебники';

  const text = `
📦 <b>ЖАҢЫ БУЙРУТМА / НОВЫЙ ЗАКАЗ #${order.id}</b>
➖➖➖➖➖➖➖➖➖➖
📚 <b>Китептер:</b>
${itemsList}
💰 <b>Жалпы сумма:</b> ${order.totalAmount} сом (Күрөө: ${order.depositAmount || 0} сом)
👤 <b>Кардар:</b> ${order.customerName} (${order.customerPhone})
📍 <b>Дареги:</b> ${order.city}, ${order.address}
💳 <b>Төлөм түрү:</b> ${order.paymentMethod || 'Элкарт/MBank'}
🚚 <b>Жеткирүү:</b> ${order.deliveryMethod || 'Өзү алып кетүү'}
⏰ <b>Убактысы:</b> ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    return await response.json();
  } catch (error) {
    console.warn('[Telegram Bot API] Notification dispatch error:', error);
    return { success: false, error: error.message };
  }
};
