const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/main.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js'
  },
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html'
    }),
    new VueLoaderPlugin()
  ]
}
