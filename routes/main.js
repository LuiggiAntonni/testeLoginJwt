const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o Get na rota main'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST na rota main'
    })
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    res.status(200).send({
        id: id
    })
})


module.exports = router;