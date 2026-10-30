
const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/byId/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = data.find(item => item.id === id);

  res.status(200).json({ product });
});

router.get('/byBrand/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();

  const products = data.filter(
    item => item.brand.toLowerCase() === brand
  );

  res.status(200).json({ products });
});

router.get('/byBatchId/:id', (req, res) => {
  const batchId = Number(req.params.id);

  const product = data.find(item =>
    item.batches.some(batch => batch.id === batchId)
  );

  res.status(200).json({ product });
});

module.exports = router;
