const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

const dbConnectionURL = process.env.DB;

function dbConnect() {
  mongoose.connect('mongodb://localhost:27017/nothingWrongDB', options).then(() => console.log('Connected to DB'))
}; 

module.exports = dbConnect;
