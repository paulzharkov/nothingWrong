const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const chatSchema = new Schema({
  offenderId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  authorId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postId: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  chatUrl: {
    type: String,
  },
  messages: {
    type: Array, // Запись через push в формате [{userId: 1, text: "Ты такой"}, {userId: 2, text: "Нет, ты такой"}]
  },
})

module.exports = model('Chat', chatSchema);
