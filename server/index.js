const Koa = require('koa')
const path = require('path')
const webpack = require('webpack');

const clientConfig = require('../webpack.config.dev.js');
const clientCompiler = webpack(clientConfig);
const devMiddleware = require('./utils/koa-webpack-dev-middleware')(
  clientCompiler, {
    publicPath: clientConfig.output.publicPath,
  }
);

const app = new Koa()

app.use(devMiddleware);

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html')

  ctx.body = devMiddleware.context.outputFileSystem.readFileSync(path.join(clientConfig.output.path, 'index.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('http://localhost:'+PORT)
})
