const { Schema, model } = require('mongoose');
const { commentSchema } = require('./comment.model')


const postSchema = new Schema({
  category: String, // бытовые, семейные, финансовые ... - подбирает эмоджи под категорию
  postText: { // Текст самого поста
    type: String,
    maxLength: 140, // ограничение по длине поста
  },
  postWishText: { // Текст нашего пожелания, что обидчик должен сделать
    type: String,
    maxLength: 140, // ограничение по длине поста
  },
  status: String, // open, pending, closed
  offenderId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  authorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: [], // Push userId to array, only use array.length for likes count
  comments: [commentSchema],
  rating: Number, // from 1 to 10
  date: Date, // format: 'YYYY-MM-DD'
  status: String, // Private or Public
})

module.exports = model('Post', postSchema);

