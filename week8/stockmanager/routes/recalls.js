
const express = require('express');
const router = express.Router();
const data = require('../data');
const moment = require('moment');

router.get('/byBrand/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();

  const products = data
    .filter(product =>
      product.brand.toLowerCase() === brand &&
      product.batches.some(batch => batch.recall === true)
    )
    .map(product => product.id);

  res.status(200).json({ products });
});

router.get('/byTimestamp/:timestamp', (req, res) => {
  const timestamp = Number(req.params.timestamp);

  const products = data
    .filter(product =>
      product.batches.some(batch =>
        batch.recall === true &&
        moment(batch.expirationDate).valueOf() === timestamp
      )
    )
    .map(product => product.id);

  res.status(200).json({ products });
});

module.exports = router;
