const express = require('express')
const cors = require('cors')

const usersRouter = require('./users/users-router')
const itemsRouter = require('./items/items-router')
const marketsRouter = require('./markets/markets-router')

const server = express()

server.use(cors())
server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/markets', marketsRouter)
server.use('/api/items', itemsRouter)


server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;
