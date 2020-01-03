const Webpack = require('webpack')
const BaseConfig = require('./webpack.base')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge(BaseConfig, {
  devServer: {
    port: 8080,
    hot: true,
    contentBase: '../dist'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
})