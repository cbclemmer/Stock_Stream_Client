import api from 'api'
import io from 'socket'

export default class {
  constructor() {
    // Test API
    api.get('/api/ping')
    .then((res) => {
      console.log('API: ', res)
    })
    // Test socket
    io.then((socket) => {
      socket.emit('test1', { ping: true })
      socket.on('test2', (data) => {
        console.log('SOCKET: ', data)
      })
    })
  }
}
