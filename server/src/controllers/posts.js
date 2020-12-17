const User = require('../models/user.model');
const Post = require('../models/post.model');
const Chat = require('../models/chat.model')
// Добавить мидлвар проверки авторизации ?

const cabinet = async (req, res) => {
  const user = req.session.user.login; // Узнаем юзера 
  const userPosts = await Post.find({ authorId: user }).exec();
  res.json(userPosts);
};

const lenta = async (req, res) => {
  const lentaPosts = await Post.find(); // Отдаем в ленту все посты из базы
  res.json(lentaPosts);
};

const postId = async (req, res) => {
  const currentPost = await Post.findOne({ _id: req.params.id }); // Находим конкретный пост
  res.json(currentPost);
};

const postComment = async (req, res) => { // Добавить try-catch block
  const currentPost = await Post.findOne({ _id: req.params.id })
  const commentAuthor = req.session.user.login;
  const commentText = req.body.comment;
  const newComment = await new Comment({
    commentAuthor,
    commentText
  }).save();
  currentPost.comments.push(newComment);
  await currentPost.save()
  res.sendStatus(200);
};

const peoplesAll = async (req, res) => {
  const peoplesAll = await User.find();
  res.json(peoplesAll.login);
};

const peoplesSubscribers = async (req, res) => {
  const peoplesSubscribers = await User.find();
  res.json(peoplesSubscribers.subscribers);
};

const statsOffended = async (req, res) => {
  const user = await User.findOne({ login: req.session.user.login })
  const statsOffended = await Post.find({ authorId: user._id });
  res.json(statsOffended); // Добавить сразу параметр status ?
};

const statsOffender = async (req, res) => {
  const user = await User.findOne({ login: req.session.user.login })
  const statsOffender = await Post.find({ offenderId: user._id });
  res.json(statsOffender); // Добавить сразу параметр status ?
};

const advices = async (req, res) => {
  const someFetch = { "text": "advice" }
  res.json(someFetch); // Добавить fetch на какой то сайт с советами
};

const makewrong = async (req, res) => {
  const { category, postText, postWishText, status, rating, state } = req.body;
  const user = await User.findOne({ login: req.session.user.login })
  const offender = await User.findOne({ login: req.body.offender }) // В форме вводим логин обидчика, здесь делаем поиск по его логину в базе и кладем в пост его монго ID
  const date = Date.now() //  Сделать запись даты в правильном формате
  const newPost = await new Post({
    category, postText, postWishText, status, rating, state,
    offenderId: offender._id,
    authorId: user._id,
    date
  }).save()
  res.sendStatus(200);
};

const chat = async (req, res) => {
  const chat = await Chat.findOne({ postId: req.params.post })
  res.json(chat);
};

const chatSendMessage = async (req, res) => {
  const chat = await Chat.findOne({ postId: req.params.post })
  const messageAuthor = await User.findOne({ login: req.session.user.login })
  const message = req.body.message;
  chat.messages.push({ messageAuthor: message })
  await chat.save()
  res.sendStatus(200);
};

module.exports = {
  cabinet,
  lenta,
  postId,
  postComment,
  peoplesAll,
  peoplesSubscribers,
  statsOffended,
  statsOffender,
  advices,
  makewrong,
  chat,
  chatSendMessage
};
