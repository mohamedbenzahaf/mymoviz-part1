var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const owmApiKey = 'A179bee55b87eaecd3908122a4353b76';

let weather = [
  { cityName: "London", description: "cloudy", main: "clouds", tempMin: 12.95, tempMax: 17.39 },
  {
    cityName: "Rio de Janeiro",
    main: "clear",
    description: "sunny",
    tempMin: 23.98,
    tempMax: 28.63,
  },
  {
    cityName: "Stockholm",
    description: "sunny",
    main: "clear",
    tempMin: 6.03,
    tempMax: 10.59,
  },
];


router.post('/weather', async (req, res) => {
  const cityName = req.body.cityName?.trim();

  if (!cityName) {
    return res.json({
      result: false,
      error: 'City name is required',
    });
  }

  if (weather.some(e =>
    e.cityName.toLowerCase() === cityName.toLowerCase()
  )) {
    return res.json({
      result: false,
      error: 'City already saved',
    });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${owmApiKey}&units=metric`
    );

    const apiData = await response.json();

    if (!response.ok) {
      return res.json({
        result: false,
        error: apiData.message || 'City not found',
      });
    }

    const newCity = {
      cityName: apiData.name,
      main: apiData.weather[0].main,
      description: apiData.weather[0].description,
      tempMin: apiData.main.temp_min,
      tempMax: apiData.main.temp_max,
    };

    weather.push(newCity);

    return res.json({
      result: true,
      weather: newCity,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      error: 'Weather service unavailable',
    });
  }
});

router.get('/weather', (req, res) => {
  res.json({ weather });
});

router.get('/weather/:cityName', (req, res) => {
  const searchedWeather = weather.find(e => e.cityName === req.params.cityName);

  if (searchedWeather) {
    res.json({ result: true, weather: searchedWeather });
  } else {
    res.json({ result: false, error: 'City not found' });
  }
});

router.delete('/weather/:cityName', (req, res) => {
  const searchedWeather = weather.find(e => e.cityName === req.params.cityName);

  if (searchedWeather) {
    weather = weather.filter(e => e.cityName !== req.params.cityName);
    res.json({ result: true, weather });
  } else {
    res.json({ result: false, error: 'City not found' });
  }
});

module.exports = router;
