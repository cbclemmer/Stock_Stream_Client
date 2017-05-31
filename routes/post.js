'use strict'

const _ = require('lodash')
const API = require('../API')

// All the GET routes for the API
const routes = {
  // EX: '/api/foo/bar: API.foo.bar'
  '/api/input': API.input.post
}

module.exports = (app, db) => {
  _.each(routes, (func, route) =>
    app.post(route, (req, res) =>
      func(req, res, db, (data) => {
        if (typeof data.redirect === 'string') return res.redirect(data.redirect)
        else if (data.redirVal && data.redirErr) return res.redirect(data.status ? data.redirVal : data.redirErr)
        res.json(data)
      })
  ))
}
