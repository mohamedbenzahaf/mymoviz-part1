const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/average/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();

  const products = data.filter(
    product => product.brand.toLowerCase() === brand
  );

  const total = products.reduce((sum, product) => sum + product.price, 0);
  const average = Math.round((total / products.length) * 100) / 100;

  res.status(200).json({ average });
});

router.get('/averageUnit/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();

  const products = data.filter(
    product => product.brand.toLowerCase() === brand
  );

  const total = products.reduce(
    (sum, product) => sum + product.unitPrice, 0
  );
  const average = Math.round((total / products.length) * 100) / 100;

  res.status(200).json({ average });
});

module.exports = router;