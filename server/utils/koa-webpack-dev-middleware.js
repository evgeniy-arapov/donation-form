const devMiddleware = require('webpack-dev-middleware')

module.exports = (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts)

  async function middleware (ctx, next) {
    const resMock = {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.response.set(name, value)
      },
      getHeader: (name) => {
        return ctx.response.get(name)
      },
      status: (status) => ctx.status = status
    }

    expressMiddleware(ctx.req, resMock, next)
  }

  middleware.waitUntilValid = expressMiddleware.waitUntilValid
  middleware.invalidate = expressMiddleware.invalidate
  middleware.close = expressMiddleware.close
  middleware.context = expressMiddleware.context

  return middleware
}
