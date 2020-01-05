// 抽离第三方库

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}