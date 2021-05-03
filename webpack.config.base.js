const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    './client/main.js'
  ],

  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sa|s?c)ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'client')
    }
  },

  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html'
    }),
    new VueLoaderPlugin()
  ]
}
