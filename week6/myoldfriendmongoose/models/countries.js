const mongoose = require('mongoose');

const populationSchema = mongoose.Schema({
	populationNbr: Number,
	year: Date,
});

const countrySchema = mongoose.Schema({
	name: String,
	flagImg: String,
	currency: String,
	population: [populationSchema],
});

const Country = mongoose.model('countries', countrySchema);

module.exports = Country;
