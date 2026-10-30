const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/byProductId/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = data.find(product => product.id === id);

  const stocks = product
    ? product.batches.reduce((total, batch) => total + batch.quantity, 0)
    : 0;

  res.status(200).json({ stocks });
});

router.get('/byTimestamp', (req, res) => {
  const productId = Number(req.query.productId);
  const start = Number(req.query.start);
  const end = Number(req.query.end);

  const product = data.find(product => product.id === productId);

  const stocks = product
    ? product.batches
        .filter(batch => {
          const expiration = new Date(batch.expirationDate).getTime();
          return expiration >= start && expiration <= end;
        })
        .reduce((total, batch) => total + batch.quantity, 0)
    : 0;

  res.status(200).json({ stocks });
});

module.exports = router;