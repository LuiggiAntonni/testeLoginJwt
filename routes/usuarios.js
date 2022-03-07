const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios-controller')

router.post('/cadastro', usuariosController.setCadastro);

router.post('/login', usuariosController.getLogin)

module.exports = router