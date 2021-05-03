const base = require('./webpack.config.base.js')
const merge = require('webpack-merge').default

module.exports = merge(base, {
  mode: 'development',

  optimization: {
    noEmitOnErrors: true
  }
})
