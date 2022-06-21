const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, select: true },
    address: {
      state: String,
      city: String,
      street: String,
      number: String,
    },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
