const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url);
//mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexao com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados');
});

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const productsRoute = require('./Routes/products');

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.get('/', (req, res) => {
    return res.send({message: 'OK com o GET da Raiz'});
});

app.post('/', (req, res) => {
    return res.send({message: 'OK com o POST da Raiz'});
});

app.listen(3000);

module.exports = app;