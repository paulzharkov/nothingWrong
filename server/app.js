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
const User = require('../server/src/models/user.model')
const Post = require('../server/src/models/post.model')

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

io.on('connection', async (socket) => {

  const session = socket.request.session;

  if (session.user) {
    session.connections++;
    session.save();
    socket.emit("your id", socket.id);

    await User.findOneAndUpdate({_id: session.user.id}, {socketID: socket.id})

    socket.on("send message", body => {
      console.log(body)
      io.emit("message", body)
    })

    socket.on("private message", async body => {

      console.log('body', body);
      io.to(socket.id).emit("hey", "I just met you");
      // const post = await Post.findOne({ _id: body.idOne})
      // post.sms.push({ body: body.body, id: body.id })
      // await post.save()

      // const myName = await User.findOne({ _id: body.userId })
      // const yourName = await User.findOne({ _id: body.authorId})

      // function idToSrting(arr) {
      //   return arr.map((e) => {
      //     return e.toString()
      //     })
      // }
      // const myNameMyHurt = idToSrting(myName.myHurt)
      // const myNameToMeHurt = idToSrting(myName.toMeHurt)
      // const yourNameMyHurt = idToSrting(yourName.myHurt)
      // const yourNameToMeHurt = idToSrting(yourName.toMeHurt)

      // const userHurtIdMy = myNameMyHurt.find((e) => e === body.idOne)


      // console.log('yourName', yourName);
      // console.log('myName', myName);
      // // const body2 = [{}, {}]


      // const userHurtIdApponent = myNameToMeHurt.find((e) => e === body.idOne)
      // const apponentHurtIdMy = yourNameMyHurt.find((e) => e === body.idOne)
      // const apponentHurtIdUser = yourNameToMeHurt.find((e) => e === body.idOne)
      
      // io.emit("private message", post.sms)
      // if (userHurtIdMy === apponentHurtIdUser || userHurtIdApponent === apponentHurtIdMy) {
      //   io.emit(`${body.idOne}`, body)
      // }
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
