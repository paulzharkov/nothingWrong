# NothingWrong
<br/>
<br/>
**NothingWrong** - это ресурс, который позволяет регулировать отношения между людьми во время конфликтов, тем самым позволяя сохранять близкую связь между ними.
### Стек технологий используемых в проекте
* React
* Redux+Thunk
* Material-UI
* Node.js
* Express
* MongoDB Atlas
* WebSockets (socket.io)
* CSS Grid Layout
### Запуск проекта
1. Перейти в корневой каталог проекта (nothingWrong)
2. В командной строке выполнить (однократно для установки): npm installall
2. переименовать .env.sample в .env (/server, /client) и дописать отсутствующие поля:
* PORT= порт на котором будет запущен сервер
* REACT_APP_DEVELOPMENT_BACK= порт на котором будет запущен React
* DB= ссылка для подключения к базе данных Atlas
* SECRETSESSION= набор рандомных символов для секретной сессии
3. Запуск проекта: npm start
