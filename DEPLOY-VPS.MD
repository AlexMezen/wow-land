# Инструкция: запуск сайта на своём VPS

Сайт + CMS полностью работают на обычном VPS. Понадобится: **Ubuntu 22/24, Node.js 20+**,
доступ по SSH. Все команды выполняются по SSH на сервере.

Что вы получаете на VPS:

- **Заявки с сайта** сохраняются на сервере (`data/leads.json`) и видны во вкладке «Заявки» CMS
  с любого устройства — в реальном времени.
- **Обновление контента через CMS публикуется сразу**: кнопка «Зберегти зміни» записывает
  контент на сервер, и посетители видят его при следующей загрузке страницы. **Пересборка не нужна.**

---

## 1. Установка Node.js (один раз)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
node -v   # должно показать v20.x или выше
```

## 2. Загрузка проекта на VPS

Вариант А — через GitHub (рекомендуется):

```bash
cd /var/www
sudo git clone https://github.com/<ваш-логин>/wow-land.git
sudo chown -R $USER:$USER /var/www/wow-land
cd wow-land
npm ci
npm run build
```

Вариант Б — без GitHub: загрузите папку проекта на сервер любым способом
(scp, SFTP-клиент типа WinSCP/FileZilla) и выполните `npm ci && npm run build` в ней.

## 3. Первый запуск

```bash
PORT=3000 ADMIN_PASSWORD='ВашСекретныйПароль' npm start
```

Откройте `http://IP-ВАШЕГО-СЕРВЕРА:3000/wow-land/` — сайт должен открыться.
Проверьте CMS: `http://IP:3000/wow-land/admin.html` (пароль — из `ADMIN_PASSWORD`).

Остановить тестовый запуск: `Ctrl+C`.

## 4. Автозапуск через systemd (чтобы сайт работал всегда)

Создайте сервис:

```bash
sudo nano /etc/systemd/system/wowland.service
```

Вставьте (замените пароль и путь, если отличается):

```ini
[Unit]
Description=eLITstroy landing server
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/wow-land
ExecStart=/usr/bin/node server/index.mjs
Environment=PORT=3000
Environment=ADMIN_PASSWORD=ВашСекретныйПароль
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

Запустите:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wowland
sudo systemctl status wowland   # должно быть active (running)
```

## 5. Домен и HTTPS (реклама Google/Meta требует HTTPS)

Самый быстрый способ — Caddy (автоматический SSL-сертификат):

```bash
sudo apt install -y caddy
sudo nano /etc/caddy/Caddyfile
```

Содержимое (замените домен):

```
ваш-домен.ua {
    reverse_proxy localhost:3000
}
```

```bash
sudo systemctl reload caddy
```

Через 1–2 минуты сайт будет доступен по `https://ваш-домен.ua` с действующим сертификатом.

Альтернатива — nginx + certbot (если nginx уже используется):

```nginx
server {
    listen 80;
    server_name ваш-домен.ua;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

```bash
sudo certbot --nginx -d ваш-домен.ua
```

## 6. Как обновлять контент и фото (обычная работа)

1. Откройте `https://ваш-домен.ua/wow-land/admin.html`, войдите с паролем из `ADMIN_PASSWORD`.
2. **Тексты** — вкладка «Контент»: выберите язык (UK/EN), раскройте раздел, измените текст.
3. **Фото** — у каждого фото есть превью и кнопка **«Завантажити фото»**: выберите файл
   с компьютера — он автоматически сожмётся, загрузится на сервер и подставится на сайт.
   Доступно для всех фото: главный экран, «Про нас», этапы, галерея, процесс, карта, логотип.
4. Нажмите **«Зберегти зміни»** — изменения сразу видны посетителям (пересборка не нужна).

Заявки: каждая отправка формы сохраняется на сервере (`data/leads.json`) и сразу
появляется во вкладке **«Заявки»**. Кнопка «Експорт CSV» выгружает их в Excel.

Загруженные фото хранятся в `data/images/` и попадают в бэкап (раздел 8).

## 7. Обновление кода сайта (когда выходят правки)

```bash
cd /var/www/wow-land
git pull
npm ci
npm run build
sudo systemctl restart wowland
```

Заявки и изменения контента **не теряются** — они лежат в папке `data/` отдельно от кода.

## 8. Бэкап (рекомендуется раз в неделю)

```bash
cp -r /var/www/wow-land/data /var/backups/wowland-$(date +%F)
```

---

## Частые вопросы

**«Заявки не появляются в CMS»** — вы вошли в CMS не с тем паролем, что в `ADMIN_PASSWORD`
на сервере, или сервер не запущен (`systemctl status wowland`).

**«Сохранил контент, а сайт не изменился»** — обновите страницу с очисткой кэша
(Ctrl+Shift+R). Сама CMS показывает статус «Збережено на сервері» при успехе.

**Порт занят** — смените `PORT=3000` на любой свободный в systemd-файле и в Caddy/nginx.
