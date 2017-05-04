const { resolve } = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: resolve(__dirname, 'client'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'index'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules']
  },

  devtool: 'inline-source-map',

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/video': 'http://0.0.0.0:8181'
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
        use: ['style-loader', 'css-loader?modules']
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
    new webpack.NamedModulesPlugin()
  ]
}
