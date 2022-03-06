const express =  require('express');
const app = express();

const rotaMain = require('./routes/main');

app.use('/main', rotaMain);

module.exports = app;