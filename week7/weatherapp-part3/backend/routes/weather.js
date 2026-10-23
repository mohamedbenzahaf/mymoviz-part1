var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const City = require('../models/cities');

const OWM_API_KEY = process.env.OWM_API_KEY;

// Ajouter une ville
router.post('/', async (req, res) => {
  try {
    const cityName = req.body.cityName;

    if (!cityName) {
      return res.json({ result: false, error: 'City name is required' });
    }

    const existingCity = await City.findOne({
      cityName: { $regex: new RegExp(`^${cityName}$`, 'i') },
    });

    if (existingCity) {
      return res.json({ result: false, error: 'City already saved' });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${OWM_API_KEY}&units=metric`
    );
    const apiData = await response.json();

    if (!response.ok || !apiData.main || !apiData.weather?.length) {
      return res.json({ result: false, error: 'City not found' });
    }

    const newCity = new City({
      cityName: apiData.name,
      main: apiData.weather[0].main,
      description: apiData.weather[0].description,
      tempMin: apiData.main.temp_min,
      tempMax: apiData.main.temp_max,
    });

    await newCity.save();
    return res.json({ result: true, weather: newCity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: false, error: 'Server error' });
  }
});

// Lister toutes les villes
router.get('/', async (req, res) => {
  try {
    const weather = await City.find();
    return res.json({ weather });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: false, error: 'Server error' });
  }
});

// Rechercher une ville
router.get('/:cityName', async (req, res) => {
  try {
    const city = await City.findOne({
      cityName: { $regex: new RegExp(`^${req.params.cityName}$`, 'i') },
    });

    if (city) {
      return res.json({ result: true, weather: city });
    }

    return res.json({ result: false, error: 'City not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: false, error: 'Server error' });
  }
});

// Supprimer une ville
router.delete('/:cityName', async (req, res) => {
  try {
    const city = await City.findOneAndDelete({
      cityName: { $regex: new RegExp(`^${req.params.cityName}$`, 'i') },
    });

    if (!city) {
      return res.json({ result: false, error: 'City not found' });
    }

    const weather = await City.find();
    return res.json({ result: true, weather });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: false, error: 'Server error' });
  }
});

module.exports = router;
