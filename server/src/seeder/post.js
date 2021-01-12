const mongoose = require('mongoose');
const Post = require('../models/post.model');

const faker = require('faker');

mongoose.connect('mongodb+srv://Paul:R7WRVKuuz8pMw6a@nothingwrongcluster.nkdm7.mongodb.net/NOTHINGWRONGDB?retryWrites=true&w=majority');

async function seedBase() {
  for (let i = 0; i < 20; i++) {
    let newPost = new Post({
      category: 'Семейные',
      postText: faker.lorem.words(),
      postWishText: faker.lorem.words(),
      status: 'open', 
      //offenderId: 
      //authorId: 
      rating: 10,
      date: Date.now(),
      state: "Private",
    });

    await newPost.save();
  }
  mongoose.disconnect();
}

seedBase();
