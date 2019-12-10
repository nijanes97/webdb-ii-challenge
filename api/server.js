const express = require('express');
const helmet = require('helmet');
const carsRouter = require('./carsRouter')
const salesRouter = require('./salesRouter')

const server = express();

server.use(express.json());

server.use('/cars', helmet(), carsRouter);
server.use('/sales', helmet(), salesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'sanity check' });
})


module.exports = server;