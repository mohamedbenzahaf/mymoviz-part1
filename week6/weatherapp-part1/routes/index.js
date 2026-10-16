var express = require('express');
var router = express.Router();

let weather = [
  { cityName: 'London', description: 'cloudy', tempMin: 12.95, tempMax: 17.39 },
  { cityName: 'Rio de Janeiro', description: 'sunny', tempMin: 23.98, tempMax: 28.63 },
  { cityName: 'Stockholm', description: 'sunny', tempMin: 6.03, tempMax: 10.59 },
];

// POST /weather
router.post('/weather', (req, res) => {
  const { cityName, description, tempMin, tempMax } = req.body;

  if (!cityName || !cityName.trim()) {
    return res.json({
      result: false,
      error: 'City name is required',
    });
  }

  const cityExists = weather.some(
    (city) => city.cityName.toLowerCase() === cityName.trim().toLowerCase()
  );

  if (cityExists) {
    return res.json({
      result: false,
      error: 'City already saved',
    });
  }

  const newCity = {
    cityName: cityName.trim(),
    description: description,
    tempMin: tempMin,
    tempMax: tempMax,
  };

  weather.push(newCity);

  return res.json({
    result: true,
    weather: newCity,
  });
});

// GET /weather
router.get('/weather', (req, res) => {
  return res.json({
    weather: weather,
  });
});

// GET /weather/:cityName
router.get('/weather/:cityName', (req, res) => {
  const searchedWeather = weather.find(
    (city) =>
      city.cityName.toLowerCase() === req.params.cityName.toLowerCase()
  );

  if (searchedWeather) {
    return res.json({
      result: true,
      weather: searchedWeather,
    });
  }

  return res.json({
    result: false,
    error: 'City not found',
  });
});

// DELETE /weather/:cityName
router.delete('/weather/:cityName', (req, res) => {
  const cityIndex = weather.findIndex(
    (city) =>
      city.cityName.toLowerCase() === req.params.cityName.toLowerCase()
  );

  if (cityIndex === -1) {
    return res.json({
      result: false,
      error: 'City not found',
    });
  }

  weather.splice(cityIndex, 1);

  return res.json({
    result: true,
    weather: weather,
  });
});

module.exports = router;
