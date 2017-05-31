'use strict'

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')

const webpackConfig = require('./webpackConfig')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const p = false
if(p == 'true') {
  webpackConfig.plugins = [new webpack.optimize.UglifyJsPlugin({minimize: true})]
} else {
  webpackConfig.devtool = 'eval-source-map'
}

const compiler = webpack(webpackConfig)

const app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    next()
}

app.use(webpackDevMiddleware(compiler, { noInfo: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.get(/node_modules/, (req, res) => res.sendFile(path.resolve(__dirname, req.path.substring(1))))
app.get(/client/, (req, res) => res.sendFile((path.resolve(__dirname, '../' + req.path.substring(1)))))
app.set('views', __dirname + '/pages')
app.engine('html', require('ejs').renderFile)
app.engine('txt', require('ejs').renderFile)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'html')
app.use((req, res, next) => {
  if (req.url.match(/^\/(css|js|img|font)\/.+/)) res.setHeader('Cache-Control', 'public, max-age=3600')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(allowCrossDomain)
app.use(compression())

module.exports = app
