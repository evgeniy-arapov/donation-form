const Koa = require('koa')
const app = new Koa()

const middleware = require('./middleware')
middleware.forEach(handler => app.use(handler))

const webpackInit = require('./lib/initializers/webpack')

const router = require('./router')

module.exports = app

module.exports.ready = async () => {
  await webpackInit(app, router)
  app.use(router.routes())
  return app
}
