const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.argv.indexOf('--mode=production') === -1
console.log(devMode)

const Happypack = require('happypack')
const os = require('os')
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length})

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.js$/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
        use: [{
          loader: 'happypack/loader?id=happyBabel'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            },
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist/css/',
              hmr: devMode
            }
          }, 'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist/css/',
              hmr: devMode
            }
          }, 'css-loader', 'less-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            },
            include: [path.resolve(__dirname, 'src/assets/img')],
            exclude: /node_modules/
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
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
      },
      {
        test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'fonts/[nam].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'components': path.resolve(__dirname, 'src/components'),
      'modules': path.resolve(__dirname, 'src/modules'),
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash:8].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash:8].css'
    }),
    new Happypack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool // 共享进程池
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/vendor-manifest.json')
    }),
    new CopyWebpackPlugin([
      { from: 'static', to: 'static'}
    ]),
  ]
}