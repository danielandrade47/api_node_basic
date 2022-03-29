const express = require('express');
const router = express.Router();
const Products = require('../model/product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


router.get('/', async (req, res) => {
    try {
        const products = await Products.find({});
        return res.send(products);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de produtos'});
    }
});

router.post('/insert', async (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome || !descricao) return res.status(400).send({ error: 'Dados insuficientes para cadastrar produto' });

    try {
        if (await Products.findOne({ nome })) return res.status(400).send({ error: 'Produto já cadastrado' });
        const product = await Products.create(req.body);

        return res.status(201).send({product});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar produto' });
    }
});

module.exports = router;