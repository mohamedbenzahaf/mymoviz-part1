var express = require('express');
var router = express.Router();

router.get('/home', (req, res) => {
  res.json({ message: 'Welcome to /home' });
});

router.get('/about', (req, res) => {
  res.json({ message: 'Welcome to /about' });
});

module.exports = router;
