var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');

// Ajouter un trajet
router.post('/trips', async (req, res) => {
  try {
    await Trip.create({
      departure: req.body.departure,
      arrival: req.body.arrival
    });

    const trips = await Trip.find();
    res.json({ allTrips: trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer tous les trajets
router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json({ allTrips: trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer les trajets
router.get('/lastTrip', async (req, res) => {
  try {
    const lastTrip = await Trip.findOne().sort({ _id: -1 });
    res.json({ lastTrip: lastTrip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer tous les trajets
router.delete('/trips', async (req, res) => {
  try {
    await Trip.deleteMany({});

    const trips = await Trip.find();
    res.json({ allTrips: trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifier un trajet
router.put('/trips/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      {
        departure: req.body.departure,
        arrival: req.body.arrival
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        error: 'Trajet introuvable'
      });
    }

    const trips = await Trip.find();
    res.json({ allTrips: trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;