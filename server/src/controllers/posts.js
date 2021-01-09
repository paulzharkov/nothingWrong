const User = require('../models/user.model');
const Post = require('../models/post.model');
const Chat = require('../models/chat.model');
const Comment = require('../models/comment.model');
// Добавить мидлвар проверки авторизации ?
const { checkAuth } = require('../middleware/auth');
const axios = require('axios');
const cheerio = require('cheerio');

const cabinet =
  (checkAuth,
  async (req, res) => {
    const user = req.session.user; // Узнаем юзера
    if (user) {
      const userPosts = await Post.find({ authorId: user.id });
      const toMeWrongs = await Post.find({ offenderId: user.id });

      res.json({ userPosts, toMeWrongs });
    }
  });

const lenta = async (req, res) => {
  const lentaPosts = await Post.find({ state: 'Публичная' }); // Отдаем в ленту все посты из базы
  res.json(lentaPosts);
};

const postId = async (req, res) => {
  const currentPost = await Post.findOne({ _id: req.params.id }); // Находим конкретный пост
  res.json(currentPost.comments);
};

const oneWrong = async (req, res) => {
  const wrong = await Post.findOne({ _id: req.params.id }); // Находим конкретный пост
  res.json(wrong);
};

const postComment = async (req, res) => {
  // Добавить try-catch block
  const currentPost = await Post.findOne({ _id: req.params.id });
  const author = req.session.user.login;
  const text = req.body.text;
  if (author && text) {
    const newComment = {
      _id: Math.random(),
      author,
      text,
    };
    currentPost.comments.push(newComment);
    await currentPost.save();
    res.json(newComment);
  } else {
    res.sendStatus(404);
  }
};

const patchPost = async (req, res) => {
  const { category, postText, postWishText, status, rating, state } = req.body;
  const soundUpdate = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { category, postText, postWishText, status, rating, state }
  );
  res.sendStatus(200);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete({ _id: req.params.id });
  res.sendStatus(200);
};

const likePost =
  (checkAuth,
  async (req, res) => {
    const currentPost = await Post.findOne({ _id: req.params.id });
    const user = req.session.user.login;
    if (!currentPost.likes.includes(user)) {
      currentPost.likes.push(user);
      await currentPost.save();
      res.sendStatus(200);
    } else {
      await Post.updateOne({ _id: req.params.id }, { $pull: { likes: user } });
      res.sendStatus(404);
    }
  });

const peoplesAll = async (req, res) => {
  const peoplesAll = await User.find();
  res.json(peoplesAll.login);
};

const peoplesSubscribers = async (req, res) => {
  const peoplesSubscribers = await User.find();
  res.json(peoplesSubscribers.subscribers);
};

const statsOffended =
  (checkAuth,
  async (req, res) => {
    const user = await User.findOne({ login: req.session.user.login });
    const statsOffended = await Post.find({ authorId: user._id });
    res.json(statsOffended); // Добавить сразу параметр status ?
  });

const statsOffender =
  (checkAuth,
  async (req, res) => {
    const user = await User.findOne({ login: req.session.user.login });
    const statsOffender = await Post.find({ offenderId: user._id });
    res.json(statsOffender); // Добавить сразу параметр status ?
  });

const advices = async (req, res) => {
  let parsingResultArray = [];
  await axios.get('https://www.psychologies.ru/articles/').then((res) => {
    const data = res.data.trim();
    const $ = cheerio.load(data, { xmlMode: true });
    let titleArray = [];
    let textArray = [];
    let linksArray = [];
    let photosArray = [];
    let title = $('a.rubric-anons_title').each((i, elem) => {
      titleArray.push($(elem).text());
    });
    let text = $('div.rubric-anons_text').each((i, elem) => {
      textArray.push($(elem).text());
    });
    let links = $('a.rubric-anons_title').each((i, elem) => {
      linksArray.push('https://www.psychologies.ru' + $(elem).attr().href);
    });
    let photos = $('img.images').each((i, elem) => {
      photosArray.push($(elem).attr().src);
    });
    parsingResultArray = titleArray.map((el, i) => ({
      title: el,
      text: textArray[i],
      link: linksArray[i],
      img: photosArray[i],
    }));
  });
  res.json(parsingResultArray);
};

const makewrong =
  (checkAuth,
  async (req, res) => {
    const { category, reason, solve, rating, state } = req.body;
    const user = await User.findOne({ login: req.session.user.login });
    const offender = await User.findOne({ login: req.body.offender }); // В форме вводим логин обидчика, здесь делаем поиск по его логину в базе и кладем в пост его монго ID
    if (category && reason && solve && rating && state && user && offender) {
      const newPost = await new Post({
        category,
        reason,
        solve,
        status: 'Открыта',
        rating,
        state,
        offenderId: offender._id,
        offenderName: req.body.offender,
        authorId: user._id,
        authorName: req.session.user.login,
        date: new Date().toLocaleDateString(),
        authorName: req.session.user.login,
      });
      await newPost.save();
      return res.json({ newPost, offenderSocketID: offender.socketID });
    } else {
      return res.sendStatus(406);
    }
  });

const allMessages = async (req, res) => {
  const wrong = await Post.findById(req.params.id);
  res.json(wrong.sms);
};

const changeAnswer = async (req, res) => {
  const wrong = await Post.findById(req.body.id);
  if (wrong) {
    if (wrong.offenderName === req.body.user) {
      wrong.offenderAnswer = req.body.answer;
    } else {
      wrong.authorAnswer = req.body.answer;
    }
    await wrong.save();
    if (!wrong.authorAnswer || !wrong.offenderAnswer) {
      wrong.state = 'Публичная';
      await wrong.save();
    }
    if (wrong.authorAnswer === true && wrong.offenderAnswer === true) {
      return wrong.remove();
    }
  }
};
module.exports = {
  cabinet,
  lenta,
  postId,
  postComment,
  patchPost,
  deletePost,
  likePost,
  peoplesAll,
  peoplesSubscribers,
  statsOffended,
  statsOffender,
  advices,
  makewrong,
  allMessages,
  oneWrong,
  changeAnswer,
};
