const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'OK com o GET da Raiz (AUTH TOKEN - SECRET)'});
});

router.post('/', (req, res) => {
    return res.send({message: 'OK com o POST da Raiz'});
});

module.exports = router;