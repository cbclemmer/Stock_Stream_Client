'use strict'

const Promise = require('promise')

const socket = require('socket.io-client')('http://localhost:8081')

import cookie from 'cookie'

module.exports = new Promise((r) => socket.on('connect', () => {
  socket.emit('connected', {})
  cookie.save('socket', socket.id)
  r(socket)
}))
