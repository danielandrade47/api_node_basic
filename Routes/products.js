const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const config = require('../config/config');

router.get('/list', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.send(products);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de produtos'});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const products = await Product.findOne({ _id: id })

      if (!products) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }

      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: "Erro ao localizar produto" })
    }
  });

  router.post('/insert', async (req, res) => {
    const { name, brand, description, price } = req.body;
    if (!name || !brand || !description || !price) return res.status(400).send({ error: 'Dados insuficientes para cadastrar produto' });

    try {
        if (await Product.findOne({ name })) return res.status(400).send({ error: 'Produto já cadastrado' });
        const product = await Product.create(req.body);

        return res.status(201).send({product, message: 'Produto cadastrado com sucesso.'});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao cadastrar produto' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, brand, description, price } = req.body
    const product = {
      name,
      brand,
      description,
      price,
    }
    try {
      const updatedProduct = await Product.updateOne({ _id: id }, product)
      if (updatedProduct.matchedCount === 0) {
        res.status(404).json({ message: 'Produto não encontrado!' })
        return
      }
      return res.status(200).json({product, message: 'Produto atualizado com sucesso.'});
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar produto" })
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.body;
    try{
        if (await Product.findOneAndDelete({ id })) return res.status(200).send({ message: 'Produto deletado com sucesso.' });
        const product = await Products.delete(req.body);
    }
    catch (err) {
        return res.status(404).send({ error: 'Produto já deletado.' });
    }
    
});

module.exports = router;