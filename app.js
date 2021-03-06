const express =  require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('./mysql').pool;

const rotaMain = require('./routes/main');
const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/main', rotaMain);
app.use('/usuarios', rotaUsuarios)

app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404;
    next(erro);
});

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        mensagem: error.message
    })
});

module.exports = app;