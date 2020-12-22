const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = new Schema({
  author: String,
  text: String,
});

module.exports = model('Comment', commentSchema);
