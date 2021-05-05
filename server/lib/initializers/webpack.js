module.exports = async function webpackInit (app, router) {
  const webpack = require('webpack')
  const config = require('../../../webpack.config.dev')
  const koaWebpack = require('koa-webpack')
  const compiler = webpack(config)

  const middleware = await koaWebpack({ compiler })
  app.use(middleware)

  const path = require('path')

  router.get('*', async ctx => {
    const filename = path.join(compiler.outputPath, 'index.html')

    ctx.response.type = 'html'
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
  })
}
