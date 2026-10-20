const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
});

module.exports = mongoose.model("Trip", tripsSchema);