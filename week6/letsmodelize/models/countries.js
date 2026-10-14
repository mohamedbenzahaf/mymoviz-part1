const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  flagImg: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  population: [{
    populationNbr: {
      type: Number,
      required: true
    },
    year: {
      type: Date,
      required: true
    }
  }]
});

module.exports = mongoose.model('Country', countriesSchema);

