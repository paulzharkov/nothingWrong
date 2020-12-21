const mongoose = require('mongoose');
const User = require('../models/user.model');

const faker = require('faker');
const bcrypt = require('bcrypt');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};


mongoose.connect('mongodb+srv://Paul:R7WRVKuuz8pMw6a@nothingwrongcluster.nkdm7.mongodb.net/NOTHINGWRONGDB?retryWrites=true&w=majority', options);

async function seedBase() {
  for (let i = 0; i < 20; i++) {
    let newUser = new User({
      login: faker.internet.userName(),
      pass: await bcrypt.hash(faker.internet.password(), 10), // генерим рандомный пароль и сразу его хешируем
      email: faker.internet.email()
    });

    await newUser.save();
  }
  mongoose.disconnect();
}

seedBase();
