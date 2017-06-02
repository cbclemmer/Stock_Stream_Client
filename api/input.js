'use strict'
const http = require('http')
const _ = require('lodash')
const config = require('../config')

module.exports = (req, res, db, cb) => {
  const raw = db.collection('raw')
  
  if (req.get('x-amz-sns-message-type') === 'SubscriptionConfirmation') {
    console.log('SUB URL: ', req.body.SubscribeURL)
  } else {
    if (req.get('x-amz-sns-subscription-arn') === config.snsSubscription) {
      raw.insertOne(_.extend({
        timeStamp: new Date(req.body.Timestamp)
      }, JSON.parse(req.body.Message)))
    }
  }
  cb({ saved: true })
}
