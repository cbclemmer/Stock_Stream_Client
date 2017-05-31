'use strict'

module.exports = (socket, db) => {

  socket.on('connected', () => {

  })

  socket.on('test1', () => {
    console.log('TEST')
    socket.emit('test2', { pong: true })
  })

  socket.on('disconnect', () => {

  })
}
