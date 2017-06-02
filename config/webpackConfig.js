'use strict'

const path = require('path')
const webpack = require('webpack')
const userConfig = require('../config')

module.exports = {
  entry: path.resolve(__dirname, '../client/index.js'),
  output: {
    path: path.resolve(__dirname),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  resolve: {
    modules: [
      'node_modules',
      'web_modules'
    ]
  },
}
