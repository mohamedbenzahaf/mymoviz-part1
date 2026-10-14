const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  total: Number,
  shippingFees: Number,
  isPaid: Boolean,
  purchaseDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
