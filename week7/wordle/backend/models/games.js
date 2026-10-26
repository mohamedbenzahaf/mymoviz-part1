const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    uppercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
