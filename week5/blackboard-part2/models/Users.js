const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
firstName: String,
lastName: String,
email: String,
inscriptionDate: Date,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
