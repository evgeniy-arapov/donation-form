const {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack')
const base = require('./webpack.config.base')
const merge = require('webpack-merge').default

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client'
  ],
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
})
