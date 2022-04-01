const express = require('express');
const router = express.Router();
const Deal = require('../model/deal');
const config = require('../config/config');

router.post('/create', async (req, res) => {
	const { clientId, products } = req.body
	const deal = {}
	try {
		const customer = await Customer.findOne({ _id: clientId })
		deal.customer = customer
		deal.products = []
		var total = 0
		for (let item of products) {
			var product = await Product.findOne({ _id: item.id })
			total += product.price * item.quantity
			deal.products.push(product)
		}
		deal.total = total
		await Deal.create(deal)
		res.status(201).json(deal)
	} catch (error) {
		res.status(500).json({ erro: error })
	}
});

router.get('/list', async (req, res) => {
  try {
    const deals = await Deal.find().populate({ path: 'products', model: 'Product' }).populate('customer')
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).send({ error: "Erro na consulta de orçamentos" });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deal = await Deal.findOne({ _id: id })
  if (!deal) {
    res.status(404).json({ message: 'Orçamento não encontrado!' })
    return
  }
  try {
    await Deal.deleteOne({ _id: id })
    res.status(200).json({ message: 'Orçamento removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
});

module.exports = router;