Робинзон — демо-игра для Telegram WebApp

Структура:
- index.html — фронтенд игры (Canvas, логика, интеграция с API)
- assets/ — сюда нужно положить все PNG-спрайты и фоны:
  bg_ocean.png, robinson.png, island_long.png,
  bird_spritesheet.png (8 кадров птицы в ряд),
  bonus_x2.png, bonus_x3.png, bonus_x5.png, bonus_x10.png, bonus_x20.png, bonus_x50.png, bonus_x100.png
- server/ — простой Node/Express бэкенд с "игровым" балансом

Как запустить сервер:
1. Перейти в папку server:
   cd server
2. Установить зависимости:
   npm install
3. Запустить:
   npm start

Не забудь в index.html заменить:
   const API_BASE = "https://your-backend-domain.com";
на реальный адрес твоего сервера (с HTTPS, если идёшь в Telegram WebApp).
