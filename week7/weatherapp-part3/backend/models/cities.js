const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  cityName: String,
  main: String,
  description: String,
  tempMin: Number,
  tempMax: Number,
});

module.exports = mongoose.model('cities', citySchema);
