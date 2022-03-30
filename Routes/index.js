const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Autenticação realizada com sucesso (GET DA RAIZ)'});
});

router.post('/', (req, res) => {
    return res.send({message: 'OK com o POST da Raiz'});
});

module.exports = router;