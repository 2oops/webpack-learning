const path = require('path')
const BaseConfig = require('./webpack.base')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackParallelUglifyPlugin = require('')

module.exports = WebpackMerge( BaseConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin({
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    })
  ],
  optimization: {
    minimizer: [
      // new UglifyjsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
      new WebpackParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false,
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          est: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})