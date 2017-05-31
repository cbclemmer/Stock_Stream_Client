'use strict'

const $ = require('jquery')
const ko = require('knockout')
const _ = require('lodash')
const Promise = require('promise')
const cookie = require('./cookie')

// use like: api.get(url, this)
function get(url, data) {
  return ajax('GET', url, data)
}

// use like: api.post(url, this)
function post(url, data) {
  return ajax('POST', url, data)
}

function ajax(type, url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      data: type == 'POST'
        ? ko.toJSON(data)
        : ko.toJS(data),
      type,
      contentType: 'application/json'
    })
      .fail((e) => {
        reject(e)
      })
      .done((res) => {
        res.err ? reject(res) : resolve(res)
      })
  })
}

module.exports = {
  get,
  post
}
