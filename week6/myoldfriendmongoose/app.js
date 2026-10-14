require('./models/connection');
const Country = require('./models/countries');
const City = require('./models/cities');


// Create country with name, flag image, currency and population
function createCountry(name, flagImg, currency, population) { }
// Sample call:
// createCountry('Australia', 'autralia.png', 'AUD', [
//  { populationNbr: 25400000, year: new Date('2015-08-24') },
// ]);


// Create city with name, population and country foreign key
function createCity(name, currentPopulation, countryId) { }
// Sample call:
// createCity('Sydney', 5312163, 'COUNTRY_ID_TO_REPLACE');


// Display country population from country name
function displayCountryPopulation(countryName) { }


// Display country informations from city name (with populate)
function displayCountryFromCityName(cityName) { }


module.exports = { createCountry, createCity, displayCountryPopulation, displayCountryFromCityName }; // Do not edit/remove this line
