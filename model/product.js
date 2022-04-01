const Double = require('@mongoosejs/double/lib');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true},
    brand: { type: String, required: true, select: true },
    description: { type: String, required: true, select: true },
    price: { type: Double, required: true, select: true},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);