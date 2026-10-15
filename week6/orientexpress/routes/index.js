var express = require('express');
var router = express.Router();

let trips = [{ departure: 'Paris', arrival: 'Lyon' }, { departure: 'Lyon', arrival: 'Marseille' }];
router.post('/trips', (req, res) => {
  trips.push({
    departure: req.body.departure,
    arrival: req.body.arrival
  });

  res.json({ allTrips: trips });
});

router.get('/trips', (req, res) => {
  res.json({ allTrips: trips });
});

router.get('/lastTrip', (req, res) => {
  res.json({ lastTrip: trips[trips.length - 1] });
});

router.delete('/trips', (req, res) => {
  trips.length = 0;
  res.json({ allTrips: trips });
});

// POST /trips - Sample result: 
// "allTrips": [
//   {
//     "departure": "Paris",
//     "arrival": "Lyon"
//   },
//   {
//     "departure": "Lyon",
//     "arrival": "Marseille"
//   },
//   {
//     "departure": "Grenoble",
//     "arrival": "Strasbourg"
//   }
// ]


// GET /trips - Sample result:
// "allTrips": [
//   {
//     "departure": "Paris",
//     "arrival": "Lyon"
//   },
//   {
//     "departure": "Lyon",
//     "arrival": "Marseille"
//   },
//   {
//     "departure": "Grenoble",
//     "arrival": "Strasbourg"
//   }
// ]

// GET /lastTrip - Sample result:
// "lastTrip": {
//   "departure": "Grenoble",
//   "arrival": "Strasbourg"
// }

// DELETE /trips - Sample result:
// "allTrips": []

module.exports = router;