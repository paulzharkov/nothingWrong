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

// const dbConnectionURL = process.env.DB;
// ATLAS
// mongodb+srv://Paul:R7WRVKuuz8pMw6a@nothingwrongcluster.nkdm7.mongodb.net/NOTHINGWRONGDB?retryWrites=true&w=majority

function dbConnect() {
  mongoose.connect('mongodb://localhost:27017/nothingWrongDB', options, (err) => {
    if (err) return console.log(err);
    return console.log('Success connected to mongo');
  });
}

module.exports = dbConnect;
