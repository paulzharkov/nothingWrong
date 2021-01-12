require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const peopleRouter = require('./src/routes/people');
const feedRouter = require('./src/routes/feed');
const dbConnect = require('./src/config/db');
const path = require('path');
const http = require('http');
const cors = require('cors');
const User = require('../server/src/models/user.model');
const Post = require('../server/src/models/post.model');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const PORT = process.env.PORT || 8000;

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve('../client/build/')))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);



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
});
// register middleware in Express
app.use(sessionMiddleware);
// register middleware in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
  // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
  // connections, as 'socket.request.res' will be undefined in that case
});

io.on('connection', async (socket) => {
  const session = socket.request.session;
  if (session.user) {
    session.connections++;
    session.save();
    await User.findOneAndUpdate(
      { _id: session.user.id },
      { socketID: socket.id }
    );
    socket.on('wrong notification', async (body) => {
      io.to(body.offenderSocketID).emit('wrong notification', body);
    });

    socket.on('stop machine', async (body) => {
      const wrong = await Post.findById(body.wrongID);
      const offender = await User.findById(wrong.offenderId);
      const author = await User.findById(wrong.authorId);
      io.to(author.socketID).emit('stop machine', body);
    });

    socket.on('stop machine 2', async (body) => {
      const wrong = await Post.findById(body.wrongID);
      const offender = await User.findById(wrong.offenderId);
      const author = await User.findById(wrong.authorId);
      io.to(offender.socketID).emit('stop machine 2', body);
    });

    socket.on('message notification', async (body) => {
      const wrong = await Post.findById(body.wrongID);
      const offender = await User.findById(wrong.offenderId);
      const author = await User.findById(wrong.authorId);
      if (body.offenderSocketID === offender.socketID) {
        return io.to(author.socketID).emit('message notification', body);
      }
      return io.to(offender.socketID).emit('message notification', body);
    });

    socket.on('message', async (body) => {
      const wrong = await Post.findById(body.id);
      wrong.sms.push({ message: body.message, login: body.login });
      await wrong.save();
      io.emit('private message', wrong.sms);
    });
  }
});

app.use('/', postsRouter);
app.use('/feed', feedRouter);
app.use('/users', usersRouter);
app.use('/users/people', peopleRouter);

server.listen(PORT, () => console.log('Server is running on port: ', PORT));
