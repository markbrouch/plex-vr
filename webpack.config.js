const { resolve } = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PORT = process.env.port || 8000
const DEV_PORT = process.env.DEV_PORT || 8001

module.exports = {
  context: resolve(__dirname, 'client'),

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://0.0.0.0:${DEV_PORT}`,
    'webpack/hot/only-dev-server',
    'index.html',
    'index.css',
    'index'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules'],
    alias: {
      '~client': resolve(__dirname, 'client'),
      '~server': resolve(__dirname, 'server'),
      '~util': resolve(__dirname, 'client/util'),
      '~api': resolve(__dirname, 'client/api'),
      '~components': resolve(__dirname, 'client/components'),
      '~reducers': resolve(__dirname, 'client/reducers'),
      '~actions': resolve(__dirname, 'client/actions')
    }
  },

  devtool: 'inline-source-map',

  devServer: {
    host: '0.0.0.0',
    port: DEV_PORT,
    disableHostCheck: true,
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/video': `http://0.0.0.0:${PORT}`
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(mov|mkv)$/,
        use: 'file-loader?name=video/[path][name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=images/svg+xml&name=assets/[name].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.EnvironmentPlugin({
      VERSION: require('./package.json').version
    })
  ]
}
