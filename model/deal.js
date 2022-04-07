const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deal = mongoose.model('Deal', {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    products: [    { product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number } ],
    total: Number,
    created: { type: Date, default: Date.now }
});

module.exports = Deal;