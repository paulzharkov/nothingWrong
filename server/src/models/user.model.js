const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  login:{
    type: String,
    unique: true,
  }, 
  pass: String,
  email:{
    type: String,
    unique: true,
  }, 
  subscribers: Array,
  myHurt: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  toMeHurt: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

module.exports = model('User', userSchema);
