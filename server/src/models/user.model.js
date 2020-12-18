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
  subscribers: Array
})

module.exports = model('User', userSchema);
