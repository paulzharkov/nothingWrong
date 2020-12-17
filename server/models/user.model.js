const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  login:{
    type: String,
    unique: true,
  }, 
  password: String,
  email:{
    type: String,
    unique: true,
  }, 
  subscribers: Array
})

module.exports = model('User', userSchema);
