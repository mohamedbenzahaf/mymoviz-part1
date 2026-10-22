var express = require('express');
var router = express.Router();

const { checkAdminPassword } = require('../modules/checkPasswords');

router.post('/login', (req, res) => {
  if (checkAdminPassword(req.body.password)) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Invalid password for admin' });
  }
});

router.post('/supersecretaction', (req, res) => {
  if (checkAdminPassword(req.body.password)) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Invalid password for admin' });
  }
});

module.exports = router;

