const Post = require('../models/post.model');
// Добавить мидлвар проверки авторизации ?
const { checkAuth } = require('../middleware/auth');

const lenta = async (req, res) => {
  const feed = await Post.find({ state: 'Публичная' }); // Отдаем в ленту все посты из базы
  res.json(feed);
};

const postId = async (req, res) => {
  const currentPost = await Post.findOne({ _id: req.params.id }); // Находим конкретный пост
  res.json(currentPost.comments);
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

// const patchPost = async (req, res) => {
//   const { category, postText, postWishText, status, rating, state } = req.body;
//   const soundUpdate = await Post.findByIdAndUpdate(
//     { _id: req.params.id },
//     { category, postText, postWishText, status, rating, state }
//   );
//   res.sendStatus(200);
// };

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

module.exports = {
  lenta,
  postId,
  postComment,
  // patchPost,
  deletePost,
  likePost,
};
