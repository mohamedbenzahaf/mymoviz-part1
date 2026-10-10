
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  weight: Number,
  image: String,
});

const Article = mongoose.model('articles', articleSchema);

module.exports = Article;