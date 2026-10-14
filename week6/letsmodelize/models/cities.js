const mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  currentPopulation: {
    type: Number,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
});

module.exports = mongoose.model('City', citiesSchema);