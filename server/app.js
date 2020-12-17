require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersRouter = require('./src/routes/users');
const postsRouter = require('./src/routes/posts');
const dbConnect = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3001;
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
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
);

app.use('/', postsRouter);
app.use('/users', usersRouter);


app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
});
