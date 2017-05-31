'use strict'

/*

  REQ: exxpress request object
  RES: express response object
  db: mongoDB connection object
  cb: callback that returns to the client whatever you put in as a parameter
*/

const ping = (req, res, db, cb) => {
  cb({ pong: true })
}

module.exports = { ping }
