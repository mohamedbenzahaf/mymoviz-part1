const mongoose = require('mongoose');

const emissionsSchema = mongoose.Schema({
  discontinued: Boolean,
  mainAnimator: String,
  name: String,
  nbAnimators: Number
});

const emissionsModel = mongoose.model('emissions', emissionsSchema, 'emissions');

module.exports = emissionsModel;
