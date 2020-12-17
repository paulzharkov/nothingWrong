const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const commentSchema = new Schema({
  commentAuthor: {
    type: String,
  },
  commentText: {
    type: String,
  },
})

module.exports = { commentSchema, Comment: mongoose.model('Comment', commentSchema) };
