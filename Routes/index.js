const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'OK com o GET da Raiz'});
});

router.post('/', (req, res) => {
    return res.send({message: 'OK com o POST da Raiz'});
});

module.exports = router;