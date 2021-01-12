# NothingWrong
NothingWrong - это ресурс, который позволяет регулировать отношения между людьми во время конфликтов, тем самым позволяя сохранять близкую связь между ними.

### Стек технологий используемых в проекте

- React
- Redux+Thunk
- Material-UI
- Node.js
- Express
- MongoDB Atlas
- WebSockets (socket.io)
- CSS Grid Layout

### Запуск проекта

1. Перейти в корневой каталог проекта (nothingWrong)
2. В командной строке выполнить (однократно для установки): npm installall
3. переименовать .env.sample в .env (/server, /client) и дописать отсутствующие поля:

- PORT= порт на котором будет запущен сервер
- REACT_APP_DEVELOPMENT_BACK= порт на котором будет запущен React
- DB= ссылка для подключения к базе данных Atlas
- SECRETSESSION= набор рандомных символов для секретной сессии

4. Запуск проекта: npm start

#### Авторизация пользователя:

![Authorization](https://github.com/paulzharkov/nothingWrong/blob/main/client/src/assets/screenshots/registration.png 'Авторизация')

#### Список всех постов (доступны после авторизации)

![Wrongs](https://github.com/paulzharkov/nothingWrong/blob/main/client/src/assets/screenshots/wrongs.png 'Посты')

#### Приватный чат между двумя пользователями, реализован на WebSocket.

![Chat1](https://github.com/paulzharkov/nothingWrong/blob/main/client/src/assets/screenshots/chat1.png 'Чат 1')
![Chat2](https://github.com/paulzharkov/nothingWrong/blob/main/client/src/assets/screenshots/chat2.png 'Чат 2')

### Краткое описание функционала системы:

Пользователь после регистраиции или входа в систему заполняет форму поста, где указывает "обидчика", причину конфликта, каких действий он ожидает он него и тд. После публикации поста, тому, кому он адресован, приходит уведомление, где пользователь может перейти в чат в реальном времени, где обе стороны конфликта обсуждают дальнейшие действия в сложившейся ситуации. В приложении существуют разделы:

1. Личный кабинет - посты, адресованные пользователю и созданные им
2. Люди - списки фолловеров (существует ф-я подписки) и всех пользователей
3. Лента - список всех публичных постов (есть приватные). Пост можно лайкать и комментировать
4. Советы - раздел с познавательными статьями по психологии

### Наша команда

- [Ирина Таршинаева](https://github.com/irinatarshinaeva)
- [Александр Борисов](https://github.com/Alexandr-Borisov)
- [Игорь Шевцов](https://github.com/Igor-Shevtsov)
- [Павел Жарков](https://github.com/paulzharkov)

### Планы на будущее

1. Расширение функционала приложения: добавление аватара и статуса в "Личном кабинете", голосовые сообщения и видеочат, раздел "Статистика"
2. Создание приложения на React Native
3. Релиз приложения в App Store/Google Play
4. Монетизация
5. ...To be continued...
