require('./models/connection');
const Country = require('./models/countries');
const City = require('./models/cities');

// Create country with name, flag image, currency and population
async function createCountry(name, flagImg, currency, population) {
  const country = new Country({
    name,
    flagImg,
    currency,
    population,
  });

  const savedCountry = await country.save();
  console.log(savedCountry);
  return savedCountry;
}

// Create city with name, population and country foreign key
async function createCity(name, currentPopulation, countryId) {
  const city = new City({
    name,
    currentPopulation,
    country: countryId,
  });

  const savedCity = await city.save();
  console.log(savedCity);
  return savedCity;
}

// Display country population from country name
async function displayCountryPopulation(countryName) {
  const country = await Country.findOne({ name: countryName });

  if (country) {
    console.log(country.population);
    return country.population;
  }

  console.log('Country not found');
  return null;
}

// Display country informations from city name (with populate)
async function displayCountryFromCityName(cityName) {
  const city = await City.findOne({ name: cityName }).populate('country');

  if (city && city.country) {
    console.log(city.country.name);
    return city.country;
  }

  console.log('City or country not found');
  return null;
}

// Temporary test — comment out before submitting
async function test() {
  const country = await createCountry('Australia', 'australia.png', 'AUD', [
    { populationNbr: 25400000, year: new Date('2015-08-24') },
  ]);

  await createCity('Sydney', 5312163, country._id);

  await displayCountryPopulation('Australia');
  await displayCountryFromCityName('Sydney');
}

// test();

module.exports = {
  createCountry,
  createCity,
  displayCountryPopulation,
  displayCountryFromCityName,
}; // Do not edit/remove this line