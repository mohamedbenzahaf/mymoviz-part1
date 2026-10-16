var express = require('express');
var router = express.Router();

router.get('/message', (req, res) => {
  res.status(200).json({
    result: true,
    message: 'Hello world!',
  });
});

module.exports = router;
