var express = require('express');
var router = express.Router();

router.get('/home', (req, res) => {
  res.json({ message: 'Welcome to /home' });
});

router.get('/about', (req, res) => {
  res.json({ message: 'Welcome to /about' });
});

router.post('/moderator/login', (req, res) => {
  const password = 'modpwd123';
  if (req.body.password === password) {
    res.json({ result: true });
  }
  else {
    res.json({ result: false, error: 'Invalid password for moderator' });
  }
});

router.post('/moderator/secretaction', (req, res) => {
  const password = 'modpwd123';
  if (req.body.password === password) {
    res.json({ result: true });
  }
  else {
    res.json({ result: false, error: 'Invalid password for moderator' });
  }
});

router.post('/admin/login', (req, res) => {
  const password = 'adminazerty123';
  if (req.body.password === password) {
    res.json({ result: true });
  }
  else {
    res.json({ result: false, error: 'Invalid password for admin' });
  }
});

router.post('/admin/supersecretaction', (req, res) => {
  const password = 'adminazerty123';
  if (req.body.password === password) {
    res.json({ result: true });
  }
  else {
    res.json({ result: false, error: 'Invalid password for admin' });
  }
});

module.exports = router;
