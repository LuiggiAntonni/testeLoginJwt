const express =  require('express');
const app = express();
const morgan = require('morgan');

const rotaMain = require('./routes/main');

app.use(morgan('dev'));

app.use('/main', rotaMain);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status(404);
    next(erro);
})

module.exports = app;