var express = require('express');
var router = express.Router();
var Sentiment = require('sentiment');

var sentiment = new Sentiment();

router.post('/analyze', function(req, res) {
  const message = req.body.message;

  if (typeof message !== 'string' || message.trim() === '') {
    return res.json({ result: false });
  }

  const analysis = sentiment.analyze(message);

  return res.json({
    result: true,
    score: analysis.score
  });
});

module.exports = router;