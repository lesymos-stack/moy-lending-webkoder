const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID;
const API = 'https://api.telegram.org/bot' + TOKEN;

// Отправка сообщения (с опциональной inline-клавиатурой)
async function sendMessage(chatId, text, replyMarkup) {
  const body = { chat_id: chatId, text: text };
  if (replyMarkup) body.reply_markup = replyMarkup;
  await fetch(API + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  try {
    const msg = req.body?.message;
    if (!msg || !msg.text) return res.status(200).send('ok');
    if (msg.from?.is_bot) return res.status(200).send('ok');

    const chatId = String(msg.chat.id);
    const text = msg.text.toLowerCase().trim();
    const name = msg.from.first_name || 'друг';

    if (text === '/start') {
      await sendMessage(chatId,
        '👋 Привет, ' + name + '!\n\n' +
        'Я — бот студии ТвойКод.\n' +
        'Создаю сайты, Telegram-ботов, приложения и AI-агентов для бизнеса.\n\n' +
        '📝 Опишите вашу задачу — что нужно сделать, для какого бизнеса, какие сроки?\n\n' +
        'Или выберите команду:\n' +
        '/services — услуги и цены\n' +
        '/contact — связаться напрямую',
        {
          inline_keyboard: [[
            { text: '📋 Каталог услуг', web_app: { url: 'https://moy-lending-webkoder.vercel.app/tg-app/' } }
          ]]
        }
      );
    }
    else if (text === '/services') {
      await sendMessage(chatId,
        '💼 Услуги и цены:\n\n' +
        '🌐 Лендинг — от 35 000 руб (3-7 дней)\n' +
        'Дизайн, верстка, адаптив, SEO\n\n' +
        '📱 Мобильное приложение — от 150 000 руб\n' +
        'iOS + Android из единой кодовой базы\n\n' +
        '🤖 Telegram-бот — от 30 000 руб (1-2 недели)\n' +
        'Автозапись, каталоги, оплата, рассылки\n\n' +
        '🧠 AI-агент — от 80 000 руб (2-4 недели)\n' +
        'Обучение на ваших данных, интеграции\n\n' +
        '📝 Опишите задачу — назову точную цену!'
      );
    }
    else if (text === '/contact') {
      await sendMessage(chatId,
        '📬 Связаться со мной:\n\n' +
        '📧 Email: tvoikod@mail.ru\n' +
        '💬 WhatsApp: https://whatsapp.com/dl/\n\n' +
        'Или просто напишите сюда — отвечу в течение 2 часов!'
      );
    }
    else {
      if (chatId !== OWNER_CHAT_ID) {
        await sendMessage(OWNER_CHAT_ID,
          '📩 Новое сообщение в боте!\n\n' +
          '👤 ' + name + ' (@' + (msg.from.username || 'нет') + ')\n' +
          '💬 ' + msg.text
        );
      }
      await sendMessage(chatId,
        'Спасибо, ' + name + '! Ваше сообщение получено.\n\n' +
        'Отвечу лично в течение 2 часов (10:00-20:00 МСК).\n' +
        'Если срочно — напишите на почту tvoikod@mail.ru'
      );
    }
  } catch (err) {}

  return res.status(200).send('ok');
}
