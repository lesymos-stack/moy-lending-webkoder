var TOKEN = '8634608757:AAEMOw-6ONdT48HMC5oIfMNZ2FvlGx8CwHI';
var OWNER_CHAT_ID = '2001560341';
var API = 'https://api.telegram.org/bot' + TOKEN;

function doPost(e) {
  try {
    var update = JSON.parse(e.postData.contents);
    var msg = update.message;
    if (!msg || !msg.text) return ContentService.createTextOutput('ok');
    if (msg.from && msg.from.is_bot) return ContentService.createTextOutput('ok');

    var chatId = String(msg.chat.id);
    var text = msg.text.toLowerCase().trim();
    var name = msg.from.first_name || 'друг';

    if (text === '/start') {
      sendMessage(chatId,
        '👋 Привет, ' + name + '!\n\n' +
        'Я — бот студии ТвойКод.\n' +
        'Создаю сайты, Telegram-ботов, приложения и AI-агентов для бизнеса.\n\n' +
        '📝 Опишите вашу задачу — что нужно сделать, для какого бизнеса, какие сроки?\n\n' +
        'Или выберите команду:\n' +
        '/services — услуги и цены\n' +
        '/contact — связаться напрямую'
      );
    }
    else if (text === '/services') {
      sendMessage(chatId,
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
      sendMessage(chatId,
        '📬 Связаться со мной:\n\n' +
        '📧 Email: laser.time.anapa@mail.ru\n' +
        '💬 WhatsApp: https://whatsapp.com/dl/\n\n' +
        'Или просто напишите сюда — отвечу в течение 2 часов!'
      );
    }
    else {
      if (chatId !== OWNER_CHAT_ID) {
        sendMessage(OWNER_CHAT_ID,
          '📩 Новое сообщение в боте!\n\n' +
          '👤 ' + name + ' (@' + (msg.from.username || 'нет') + ')\n' +
          '💬 ' + msg.text
        );
      }
      sendMessage(chatId,
        'Спасибо, ' + name + '! Ваше сообщение получено.\n\n' +
        'Отвечу лично в течение 2 часов (10:00-20:00 МСК).\n' +
        'Если срочно — напишите на почту laser.time.anapa@mail.ru'
      );
    }
  } catch(err) {}
  return ContentService.createTextOutput('ok');
}

function sendMessage(chatId, text) {
  UrlFetchApp.fetch(API + '/sendMessage', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}
