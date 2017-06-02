'use strict'

const get = (req, res, db, cb) => {
  const raw = db.collection('raw')
  
  raw.find().sort({ timeStamp: -1 }).limit(1).toArray()
  .then((docs) => cb(docs[0]))
}

module.exports = { get }
