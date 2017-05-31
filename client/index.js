'use strict'

const $ = require('jquery')
const ko = require('knockout')
require('./js')
require('ko-component-router')
require('knockout-punches')

// enable handelbars markup
ko.punches.interpolationMarkup.enable();

// define app component that contains our router
ko.components.register('app', require('./app'))

ko.components.register('home', require('./home'))

require('./web_modules')

$(document).ready(() => ko.applyBindings())
