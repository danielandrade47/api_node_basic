const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const ProductSchema = new Schema({
    nome: { type: String, required: true, unique: true, lowercase: true },
    descricao: { type: String, required: true, select: true },
    created: { type: Date, default: Date.now }
});

ProductSchema.pre('save', async function (next) {
    let product = this;
    //if (!user.isModified('password')) return next();

    //user.password = await bcrypt.hash(user.password, 10);
    //return next();
});

module.exports = mongoose.model('Product', ProductSchema);