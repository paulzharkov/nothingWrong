require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const dbConnect = require('./src/config/db');
const http = require("http");
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

// const PORT = process.env.PORT || 8000;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const sessionMiddleware = session({
  name: 'sid',
  secret: process.env.SECRETSESSION,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
  }),
  saveUninitialized: false,
  cookie: { secure: false },
})
// register middleware in Express
app.use(sessionMiddleware);
// register middleware in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
  // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
  // connections, as 'socket.request.res' will be undefined in that case
});

io.on('connection', (socket) => {

  const session = socket.request.session;

  if (session.user) {
    session.connections++;
    session.save();
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
      io.emit("message", body)
    })
  }
});

app.use((req, res, next) => {
  res.locals.login = req.session?.user?.login;
  res.locals.id = req.session?.user?.id;
  next();
});

app.use('/', postsRouter);
app.use('/users', usersRouter);

server.listen(8000, () => console.log("Server is running on port 8000"));
