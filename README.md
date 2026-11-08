# AD Signature

Одностраничный магазин одежды на Next.js (App Router, static export) + Tailwind CSS +
Decap CMS: владелец добавляет и редактирует товары в админ-панели без правки кода.

## Команды

```bash
npm install        # установка зависимостей (один раз)
npm run dev        # сайт на http://localhost:3000
npm run build      # production-сборка (статика -> out/)
npm run cms        # локальная админ-панель (порт 8081)
```

## Локальная админка

1. В одном терминале: `npm run dev`
2. Во втором: `npm run cms`
3. Открыть `http://localhost:3000/admin/` — раздел «Товары», изменения пишутся
   в `content/products/*.md` напрямую.

## Деплой на Netlify

1. Залейте проект на GitHub.
2. Netlify -> Add new site -> Import an existing project (настройки возьмёт `netlify.toml`).
3. Site settings -> Identity -> Enable Identity (Registration: Invite only),
   затем Identity -> Git Gateway -> Enable, и Identity -> Invite users (приглашение на почту).
4. Пройти регистрацию из письма. Дальше вход в админку: `https://<ваш-сайт>/admin/`.
   Каждый «Publish» в CMS = коммит в репозиторий = автопересборка сайта (~1-2 мин).

## Что заменить

- `lib/site.ts` — номер WhatsApp и ник Instagram (единственное место с контактами).
- Заявки собираются через **Netlify Forms** (форма «request» создаётся автоматически
  после первой отправки; конфигурация в коде: скрытая форма-прокси в `app/page.tsx`
  и программный сабмит в `components/RequestModal.tsx`).
  Почтовые уведомления включаются в Netlify UI -> Forms -> request ->
  Settings -> Email notifications (адрес your email). Лимит: 100 заявок/мес бесплатно.
