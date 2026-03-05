# CLAUDE.md — Документация проекта ВебКодер

## Структура проекта

```
moy-lending-webkoder/
├── index.html              <- Лендинг-портфолио (основной сайт)
├── tg-app/
│   └── index.html          <- Telegram Mini App (каталог услуг)
├── api/
│   ├── bot.js              <- Вебхук Telegram-бота (автоответы, команды)
│   └── order.js            <- Прием заявок из Mini App
├── research.md             <- Исследование рынка и конкурентов
├── brief.md                <- Техническое задание + план TMA
└── CLAUDE.md               <- Этот файл
```

## Telegram Mini App (tg-app/)

### Файлы
- **tg-app/index.html** — Весь Mini App в одном файле (HTML + CSS + JS). Три экрана переключаются через JS без перезагрузки страницы.

### Экраны и навигация
```
Экран 1: КАТАЛОГ (главный)
  └── Тап по карточке → Экран 2: ДЕТАЛИ
       ├── BackButton → Экран 1
       └── MainButton "Записаться" → POST /api/order → Экран 3: ПОДТВЕРЖДЕНИЕ
            └── MainButton "Закрыть" → tg.close()
```

### Где менять данные
- **Услуги (цены, сроки, описания, фичи):** массив `services` в `<script>` внутри `tg-app/index.html`
- **Стили:** секция `<style>` в том же файле, CSS-переменные в `:root`
- **Текст подтверждения:** функция `showConfirm()` в JS

### Telegram Web App SDK
- Подключен через `<script src="https://telegram.org/js/telegram-web-app.js">`
- Используется: `tg.ready()`, `tg.expand()`, `tg.MainButton`, `tg.BackButton`, `tg.HapticFeedback`, `tg.close()`, `tg.initDataUnsafe.user`
- Тема берется автоматически из CSS-переменных Telegram (`--tg-theme-*`)

## API (api/)

### bot.js — Вебхук бота @webkoder_leads_bot
- **Команды:** /start (с инлайн-кнопкой Mini App), /services, /contact
- **Пересылка:** любое сообщение от клиента пересылается владельцу
- **Автоответ:** подтверждение получения сообщения
- **Токен и chat_id:** захардкожены в начале файла

### order.js — Прием заявок из Mini App
- **Метод:** POST
- **Тело запроса:** `{ userId, username, firstName, service }`
- **Действие:** отправляет уведомление владельцу в Telegram
- **Токен и chat_id:** те же, что в bot.js

## Хостинг
- **Платформа:** Vercel (автодеплой из GitHub)
- **URL:** https://moy-lending-webkoder.vercel.app/
- **Mini App:** https://moy-lending-webkoder.vercel.app/tg-app/
- **Бот:** @webkoder_leads_bot

## Важные константы
- **Telegram Bot Token:** в api/bot.js и api/order.js
- **Owner Chat ID:** 2001560341
- **TMA URL:** https://moy-lending-webkoder.vercel.app/tg-app/
