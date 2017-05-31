'use strict'

const path = require('path')
const { ProvidePlugin } = require('webpack')

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
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  resolve: {
    modules: [
      'node_modules',
      'web_modules'
    ]
  },
}
