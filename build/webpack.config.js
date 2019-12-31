const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let indexCss = new ExtractTextPlugin('index.css')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve( __dirname, '../src/index.js'),
    layout: path.resolve( __dirname, '../src/layout.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve( __dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: indexCss.extract({
          use: ["css-loader"]
        })
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: [require('autoprefixer')]
          }
        }, "less-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/layout.html'),
      filename: 'layout.html',
      chunks: ['layout'],
    }),
    new CleanWebpackPlugin(),
    indexCss
  ]
}
