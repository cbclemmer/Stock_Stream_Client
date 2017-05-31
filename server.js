'use strict'

const log = require('npmlog')
const fs = require('fs')
const Promise = require('promise')
const path = require('path')
const http = require('http')
const sio = require('socket.io')
const socketRoutes = require('./sockets')
const MongoClient = require('mongodb').MongoClient
const app = require('./config/express')
const routes = require('./routes')
const userConfig = require('./config')

// Replace url
const url = userConfig.mongodb

// Connect to the mongo database
new Promise((res, rej) => MongoClient.connect(url, (err, db) => err ? rej(err) : res(db)))
.then((db) => {

  routes.post(app, db)
  routes.get(app, db)

  app.get(/\/.*/, (req, res) => {
    res.render(path.resolve(__dirname, 'client/index.html'))
  })

  const server = http.createServer(app)
  const io = sio(server)
  io.on('connection', (socket) => socketRoutes(socket, db))

  server.listen(8081)
  console.log('Server has started on port ' + 8081)
})
.catch((err) => {console.log(err)})
