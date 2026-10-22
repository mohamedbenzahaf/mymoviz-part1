var express = require('express');
var router = express.Router();

const { checkModeratorPassword } = require('../modules/checkPasswords');

router.post('/login', (req, res) => {
  if (checkModeratorPassword(req.body.password)) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Invalid password for moderator' });
  }
});

router.post('/secretaction', (req, res) => {
  if (checkModeratorPassword(req.body.password)) {
    res.json({ result: true });
  } else {
    res.json({ result: false, error: 'Invalid password for moderator' });
  }
});

module.exports = router;

