const { Schema, model } = require('mongoose');
// const { commentSchema } = require('./comment.model');

const postSchema = new Schema({
  category: String, // бытовые, семейные, финансовые ... - подбирает эмоджи под категорию
  reason: {
    // Текст самого поста
    type: String,
    maxLength: 140, // ограничение по длине поста
  },
  solve: {
    // Текст нашего пожелания, что обидчик должен сделать
    type: String,
    maxLength: 140, // ограничение по длине поста
  },
  status: String, // open, pending, closed
  offenderId: { type: Schema.Types.ObjectId, ref: 'User' },
  offenderName: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [], // Push userId to array, only use array.length for likes count
  comments: [],
  rating: Number, // from 1 to 10
  date: String, // format: 'YYYY-MM-DD'
  state: String, // Private or Public
});

module.exports = model('Post', postSchema);
