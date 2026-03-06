// Серверная функция для приёма заявок из Telegram Mini App
// Принимает POST с данными пользователя и услуги,
// отправляет уведомление владельцу в Telegram

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID;
const API = 'https://api.telegram.org/bot' + TOKEN;

export default async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true });
  }

  try {
    const { userId, username, firstName, service } = req.body || {};

    // Проверяем обязательные поля
    if (!userId || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Формируем сообщение для владельца
    const userLink = username
      ? '@' + username
      : 'ID: ' + userId;

    const text =
      '\uD83D\uDCE9 \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u0438\u0437 Mini App!\n\n' +
      '\uD83D\uDCCB \u0423\u0441\u043B\u0443\u0433\u0430: ' + service + '\n' +
      '\uD83D\uDC64 \u041A\u043B\u0438\u0435\u043D\u0442: ' + (firstName || '\u2014') + '\n' +
      '\uD83D\uDCAC ' + userLink + '\n' +
      '\uD83C\uDD94 ID: ' + userId;

    // Отправляем уведомление владельцу
    await fetch(API + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: text
      })
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
