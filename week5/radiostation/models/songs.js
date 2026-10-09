const mongoose = require('mongoose');

const songsSchema = mongoose.Schema({
  annoying: Boolean,
  artist: String,
  creationDate: Date,
  title: String
});

const songsModel = mongoose.model('songs', songsSchema, 'songs');

module.exports = songsModel;
