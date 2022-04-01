const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const config = require('../config/config');

router.get('/list', async (req, res) => {
    try {
        const customers = await Customer.find({});
        return res.send(customers);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários'});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const customers = await Customer.findOne({ _id: id })

      if (!customers) {
        res.status(404).json({ message: "Cliente não encontrado" });
        return;
      }

      res.status(200).json(customers)
    } catch (error) {
      res.status(500).json({ message: "Erro ao localizar cliente" })
    }
  });

router.post('/create', async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).send({ error: 'Dados insuficientes' });

    try {
        if (await Customer.findOne({ email })) return res.status(400).send({ error: 'Cliente já registrado' });
        const customer = await Customer.create(req.body);

        return res.status(201).send({customer, message: 'Cliente cadastrado com sucesso.'});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao cadastrar Cliente' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, email, phone, address } = req.body
    const customer = {
      name,
      email,
      phone,
      address
    }
    try {
      const updatedCustomer = await Customer.updateOne({ _id: id }, customer)
      if (updatedCustomer.matchedCount === 0) {
        res.status(404).json({ message: 'Cliente não encontrado!' })
        return
      }
      return res.status(200).json({customer, message: 'Cliente atualizado com sucesso.'});
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Customer.findOneAndDelete({ _id: id })
        return res.status(200).send({ message: 'Cliente deletado com sucesso.' });
    }
    catch (err) {
        return res.status(404).send({ error: 'Cliente já deletado.' });
    }

});

module.exports = router;