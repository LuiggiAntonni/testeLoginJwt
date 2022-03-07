const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

router.get('/', login.obrigatorio,(req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get na rota main'
    })
});

router.post('/', login.obrigatorio,(req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST na rota main'
    })
});

router.get('/:id_produto', login.obrigatorio,(req, res, next) => {
    console.log(req.usuario)
    const id = req.params.id_produto
    res.status(200).send({
        id: id
    })
})


module.exports = router;