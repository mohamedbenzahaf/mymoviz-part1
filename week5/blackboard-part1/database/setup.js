// You should close this file and not modify it 😉

const mongoose = require('mongoose');
const connectionString = require('../connection');

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));

const articleSchema = mongoose.Schema({
	name: String,
	price: Number,
	stock: Number,
	weight: Number,
	image: String,
});

const Article = mongoose.model('articles', articleSchema);

module.exports = Article;
