const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
  },
  pass: String,
  email: {
    type: String,
    unique: true,
  },
  subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('User', userSchema);
