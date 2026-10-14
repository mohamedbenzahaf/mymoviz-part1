const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	total: Number,
	shippingFees: Number,
	isPaid: Boolean,
	purchaseDate: Date,
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
