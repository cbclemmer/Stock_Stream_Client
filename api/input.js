'use strict'

const ping = (req, res, db, cb) => {
  cb({ pong: true })
}

const get = (req, res, db, cb) => {
  console.log('GET')
  const raw = db.collection('raw')
  console.log(req.query)
  cb({ saved: true })
}

const post = (req, res, db, cb) => {
  console.log('POST')
  const raw = db.collection('raw')
  console.log(req.body)
  cb({ saved: true })
}

module.exports = { get, post }
