# GREEN-API - Chat

Веб-чат для отправки и получения текстовых сообщений через [GREEN-API](https://green-api.com). Тестовое задание на позицию Frontend-разработчика.

**Автор — Адиль Каирбеков**

- Резюме: [CV_Frontend_Adil_Kairbekov.pdf](https://qwertycamedy-portfolio.vercel.app/CV_Frontend_Adil_Kairbekov.pdf)
- Портфолио: [qwertycamedy-portfolio.vercel.app](https://qwertycamedy-portfolio.vercel.app/)
- GitHub: [github.com/qwertycamedy](https://github.com/qwertycamedy)

## О проекте

Пользователь вводит данные своего инстанса GREEN-API (`idInstance`, `apiTokenInstance`), создаёт чат по номеру телефона, пишет сообщение и видит ответ собеседника прямо в чате. Внешний вид основан на [web.max.ru](https://web.max.ru/): палитра светлой и тёмной темы взята из CSS-переменных этого сайта.

- Демо: [grinapi-chat.vercel.app](https://grinapi-chat.vercel.app/)
- Репозиторий: [github.com/qwertycamedy/grinapi-chat](https://github.com/qwertycamedy/grinapi-chat)

> **Почему Telegram, а не MAX.** В [консоли GREEN-API](https://console.green-api.com) сейчас можно создать инстанс только для WhatsApp или Telegram. Задание это допускает, поэтому приложение работает с **Telegram-инстансом**. Методы API (`SendMessage`, `ReceiveNotification`, `DeleteNotification`, `CheckAccount`) и форматы уведомлений у MAX и Telegram совпадают, так что для MAX-инстанса код менять не нужно.

**Стек:** React 19, TypeScript, Vite, Redux Toolkit, RTK Query, axios, React Router, Tailwind CSS 4, shadcn/ui, Vitest, Testing Library, MSW, Feature-Sliced Design.

## Запуск локально

Нужны **Node.js 22+** и **pnpm 10+**.

```bash
git clone https://github.com/qwertycamedy/grinapi-chat.git
cd grinapi-chat
pnpm install
pnpm dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

| Команда | Что делает |
| --- | --- |
| `pnpm dev` | dev-сервер с HMR |
| `pnpm build` | проверка типов и production-сборка в `dist/` |
| `pnpm preview` | локальный просмотр production-сборки |
| `pnpm lint` | ESLint и проверка архитектуры FSD через [steiger](https://github.com/feature-sliced/steiger) |
| `pnpm test` | тесты один раз |
| `pnpm test:watch` | тесты в режиме наблюдения |
| `pnpm test:coverage` | тесты с отчётом о покрытии в `coverage/` |

Бэкенд и переменные окружения не нужны: приложение обращается к GREEN-API напрямую из браузера.

## Как авторизоваться

1. **Создайте инстанс.** Зарегистрируйтесь в [console.green-api.com](https://console.green-api.com) и создайте инстанс Telegram. Подойдёт бесплатный тариф `Developer`.
2. **Авторизуйте инстанс.** Привяжите к нему аккаунт Telegram по инструкции в консоли и дождитесь статуса «Авторизован».
3. **Скопируйте данные.** В карточке инстанса возьмите `idInstance` и `apiTokenInstance`.
4. **Войдите.** Откройте приложение и введите эти данные. Поле `apiUrl` заполнится само по первым четырём цифрам `idInstance`, например `4100…` даёт `https://4100.api.green-api.com`. Если в консоли указан другой адрес, его можно изменить вручную.
5. **Включите входящие уведомления.** Если в настройках инстанса они выключены, в списке чатов появится жёлтая плашка. Нажмите в ней «Включить». То же самое можно сделать в консоли: «Изменить» → «Получать уведомления о входящих сообщениях и файлах». Инстанс перезапустится, настройки применяются в течение 5 минут.
6. **Начните переписку.** Нажмите на карандаш, введите номер собеседника в Telegram и отправьте сообщение. Ответ появится в чате автоматически.

> Номер, скрытый настройками приватности Telegram, найти нельзя. В этом случае приложение покажет ошибку.

## Что реализовано

**Обязательное по заданию**

- Вход по `idInstance` и `apiTokenInstance`.
- Создание чата по номеру телефона получателя.
- Отправка текстовых сообщений методом [SendMessage](https://green-api.com/v3/docs/api/sending/SendMessage/).
- Получение сообщений через [HTTP API](https://green-api.com/v3/docs/api/receiving/technology-http-api/): `ReceiveNotification` → обработка → `DeleteNotification`.
- Интерфейс по образцу web.max.ru с минимальным набором функций.

**Дополнительно**

- **Проверка инстанса при входе** методом `getStateInstance`. Для статусов `notAuthorized`, `blocked`, `sleepMode`, `starting` и `yellowCard` показываются понятные сообщения.
- **Автоподстановка `apiUrl`** по `idInstance`. У каждого инстанса свой хост.
- **Проверка настроек инстанса** методом `getSettings`. Если получение входящих выключено, его можно включить одной кнопкой (`setSettings`).
- **Поиск аккаунта по номеру** методом `CheckAccount`: так приложение получает настоящий `chatId` получателя и сразу сообщает, если аккаунта нет.
- **Статусы отправки:** «отправляется», «отправлено», «не отправлено» с уведомлением об ошибке.
- **Автосоздание чата**, если пишет номер, с которым переписки ещё не было.
- **Счётчик непрочитанных**, превью последнего сообщения, сортировка чатов по времени.
- **Обработка ошибок API:** неверные данные, лимиты, сбои сервера, обрыв сети, таймаут. При 401/403 во время работы выполняется автоматический выход.
- **Сохранение в localStorage:** сессия, чаты и история переписки остаются после перезагрузки страницы.
- **Тёмная тема.** Переключается кнопкой, по умолчанию берётся системная.
- **Адаптивная вёрстка:** на телефоне виден либо список чатов, либо открытый чат, с кнопкой «назад».
- **Адресация чатов:** у каждого чата свой адрес `/chats/:chatId`, работают кнопки «назад» и «вперёд» в браузере.
- **Тесты:** 91 тест на Vitest, Testing Library и MSW. Покрытие около 88% statements и 95% lines.

### Как работает получение сообщений

Хук `useReceiveNotifications` запускает цикл, пока открыта страница чатов:

1. `GET receiveNotification?receiveTimeout=20` держит соединение до 20 секунд и ждёт новое уведомление (long polling).
2. Входящее текстовое сообщение (`incomingMessageReceived`) добавляется в чат. Если чата с этим собеседником нет, он создаётся.
3. `DELETE deleteNotification/{receiptId}` удаляет уведомление из очереди. Без этого GREEN-API будет снова и снова отдавать то же уведомление.
4. При сетевой ошибке или ошибке сервера цикл повторяет запрос через 5 секунд. При ответе 401/403 выполняется выход из аккаунта. При уходе со страницы активный запрос прерывается.

### Ограничения

- Только текстовые сообщения и личные чаты. Группы, медиафайлы и сообщения, отправленные с телефона, приложение не показывает.
- История хранится только в браузере. Переписка, которая была до первого входа, не загружается.
- `apiTokenInstance` хранится в localStorage. Для клиентского приложения без бэкенда это неизбежно, поэтому выходите из аккаунта на чужих устройствах.

## Архитектура

Проект построен по методологии [Feature-Sliced Design](https://feature-sliced.design/). Слой может импортировать только нижележащие слои, а у каждого слайса есть публичный API в `index.ts`. Эти правила проверяет `steiger` (`pnpm lint`).

```
src/
├── app/                        инициализация приложения
│   ├── providers/              Redux Provider
│   ├── routes/                 маршруты, ProtectedRoute и GuestRoute
│   ├── store/                  configureStore, сохранение в localStorage
│   └── styles/                 Tailwind и палитра светлой и тёмной темы
├── pages/
│   ├── login/                  страница входа
│   └── chat/                   список чатов, переписка, запуск получения сообщений
├── widgets/
│   ├── chat-sidebar/           шапка, список чатов, плашка настроек
│   └── chat-window/            шапка чата, лента сообщений, поле ввода
├── features/
│   ├── login/                  форма входа и проверка инстанса
│   ├── logout/                 выход с очисткой данных
│   ├── create-chat/            создание чата через CheckAccount
│   ├── send-message/           отправка сообщения и статусы
│   ├── receive-notifications/  цикл получения и обработка уведомлений
│   ├── configure-notifications/ проверка и включение входящих в настройках инстанса
│   └── toggle-theme/           переключение темы
├── entities/
│   ├── session/                данные инстанса, getStateInstance, getSettings, setSettings
│   ├── chat/                   чаты (entity adapter), checkAccount, аватар, элемент списка
│   └── message/                сообщения, sendMessage, receive/deleteNotification, пузырь сообщения
└── shared/
    ├── api/                    RTK Query + axiosBaseQuery, сборка URL, тексты ошибок
    ├── config/                 маршруты, константы API, ключи хранилища
    ├── lib/                    телефон, форматирование, localStorage, тема, хуки store
    └── ui/                     компоненты shadcn/ui

tests/                          инфраструктура тестов: MSW-сервер, фикстуры, renderWithProviders
```

### Ключевые решения

- **Запросы к API.** Все запросы идут через RTK Query с собственным `axiosBaseQuery`. Endpoint передаёт только имя метода, например `sendMessage`. URL вида `{apiUrl}/waInstance{idInstance}/{method}/{apiTokenInstance}` собирается из данных сессии в store. Эндпоинты подключаются в слоях `entities` через `injectEndpoints`.
- **Ошибки.** Все ошибки приводятся к виду `{ status, message }` и переводятся в понятный текст в одном месте (`shared/api/get-error-message.ts`).
- **Состояние.** Сессия, чаты и сообщения хранятся в Redux и сохраняются в localStorage. Ответы RTK Query туда не попадают. Открытый чат хранится в адресе страницы, а не в store.
- **Тема.** Собственный небольшой модуль на `useSyncExternalStore` вместо `next-themes`: тот вставляет `<script>` и вызывает предупреждение в React 19.
- **Тесты** лежат рядом с кодом (`*.test.ts(x)`). Общие хелперы вынесены в `tests/`, чтобы не нарушать правила импорта между слоями FSD. MSW отвечает с CORS-заголовками, как настоящий GREEN-API, потому что jsdom проверяет CORS так же, как браузер.
- **Деплой** на Vercel. `vercel.json` перенаправляет все пути на `index.html`, поэтому прямые ссылки на `/login` и `/chats/:id` открываются без 404.
