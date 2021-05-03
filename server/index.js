require('dotenv').config()
const webpack = require("webpack");
const config = require("../webpack.config.dev");
const path = require("path");

const Koa = require("koa");
const app = new Koa();

const router = require('./routes')
const port = process.env.API_PORT || 3000;
const koaWebpack = require("koa-webpack");
const compiler = webpack(config);

const middleware = require("./middleware");
middleware.forEach(handler => app.use(handler));

koaWebpack({compiler})
  .then(middleware => {
    app.use(middleware);

    const fs = middleware.devMiddleware.fileSystem;
    router.get("*", async ctx => {
      ctx.type = "html";
      ctx.body = await new Promise((resolve, reject) => {
        fs.readFile(path.join(compiler.outputPath, "index.html"), (err, file) => {
          if (err) reject(err);
          resolve(file);
        });
      });
    });

    app.use(router.routes());

    app.listen(port, () => {
      console.log(`Listen on port ${port}`);
    });
  });
