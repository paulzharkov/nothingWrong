const mongoose = require('mongoose');
const Post = require('../models/post.model');

const faker = require('faker');
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
    let newPost = new Post({
      category: 'Финансовая',
      postText: faker.lorem.words(),
      postWishText: faker.lorem.words(),
      status: 'open', 
      //offenderId: 
      //authorId: 
      rating: 2,
      date: Date.now().toLocaleDateString(),
      state: "Публичная",
    });

    await newPost.save();
  }
  mongoose.disconnect();
}

seedBase();
