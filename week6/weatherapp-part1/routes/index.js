var express = require('express');
var router = express.Router();

let weather = [
  { cityName: 'London', description: 'cloudy', tempMin: 12.95, tempMax: 17.39 },
  { cityName: 'Rio de Janeiro', description: 'sunny', tempMin: 23.98, tempMax: 28.63 },
  { cityName: 'Stockholm', description: 'sunny', tempMin: 6.03, tempMax: 10.59 },
];

// POST /weather - Sample result: 
/*{
  "result": true,
  "weather": {
    "cityName": "Lille",
    "description": "sunny",
    "tempMin": "15.2",
    "tempMax": "22.7"
  }
} 
OR
{
  "result": false,
  "error": "City already saved"
}
*/


// GET /weather - Sample result: 
/*{
  "weather": [
    {
      "city": "London",
      "description": "cloudy",
      "tempMin": 12.95,
      "tempMax": 17.39
    },
    {
      "city": "Rio de Janeiro",
      "description": "sunny",
      "tempMin": 23.98,
      "tempMax": 28.63
    },
    {
      "city": "Stockholm",
      "description": "sunny",
      "tempMin": 6.03,
      "tempMax": 10.59
    }
  ]
} */


// GET /weather/:cityName - Sample result: 
/*{
  "result": true,
  "weather": {
    "cityName": "London",
    "description": "cloudy",
    "tempMin": 12.95,
    "tempMax": 17.39
  }
}
OR
{
  "result": false,
  "error": "City not found"
} */


// DELETE /weather/:cityName - Sample result: 
/*{
  "result": true,
  "weather": [
    {
      "cityName": "Rio de Janeiro",
      "description": "sunny",
      "tempMin": 23.98,
      "tempMax": 28.63
    },
    {
      "cityName": "Stockholm",
      "description": "sunny",
      "tempMin": 6.03,
      "tempMax": 10.59
    }
  ]
}
OR
{
  "result": false,
  "error": "City not found"
} */

module.exports = router;
