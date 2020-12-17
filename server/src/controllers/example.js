const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const User = require('../models/user');
const { Comment } = require('../models/comment');
const { checkAuth } = require('../middlewares/auth')

router.get('/cabinet', checkAuth, async (req, res, next) => {
  const userName = res.locals.user.login;
  const userSounds = await Posts.find({ artist: userName }).exec();
  // res.render('cabinet', { userSounds });
});

router.post('/', async (req, res) => {
  const { songname, cover, sound } = req.body;
  const artist = res.locals.user.login;
  const likes = res.locals.likes;
  const newSound = await new Sound({
    songname,
    cover,
    sound,
    artist,
    likes
  }).save()
  req.session.sound = newSound;
  res.redirect('/');
});

router.post('/:id/like',checkAuth,  async (req, res) => {
  const sound = await Sound.findById(req.params.id);
  const user = req.session.user.login;
  if (!sound.likes.includes(user)) {
    sound.likes.push(user);
    await sound.save();
  }
  res.json({ likes: sound.likes.length });
})

router.get('/:id/update',checkAuth,  async (req, res) => {
  const soundId = req.params.id
  const sound = await Sound.findOne({ _id: soundId });
  res.render('update', { sound, soundId });
})

router.get('/:id',  async (req, res) => {
  const soundId = req.params.id
  const sound = await Sound.findOne({ _id: soundId });
  const comments = sound.comments;
  res.render('soundpage', { sound });
})

router.post('/:id/update',checkAuth,  async (req, res) => {
  const { songname, cover, sound } = req.body;
  const soundUpdate = await Sound.findByIdAndUpdate({ _id: req.params.id }, { songname, cover, sound });
  res.redirect('/cabinet');
})


router.post('/:id',checkAuth,  async (req, res) => {
  const sound = await Sound.findOne({ _id: req.params.id });
  const author = req.session.user.login;
  const comment = req.body.comment;
  const newComment = await new Comment({
    author,
    comment
  }).save();
  sound.comments.push(newComment);
  await sound.save();
  res.render('soundpage', { sound });
})

module.exports = router;
