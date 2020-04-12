const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

let indexCss = new ExtractTextPlugin('index.css')

// const firstPlugin = require('./webpack-firstPlugin')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve( __dirname, '../src/main.js'),
    // layout: path.resolve( __dirname, '../src/layout.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve( __dirname, '../dist')
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: '../dist'
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
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ] 
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    // new firstPlugin(),
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
    indexCss,
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}
