const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount')
const fs = require('fs')
const path = require('path')
const util = require('util');

const readFile = util.promisify(fs.readFile);

const app = new Koa()

app.use(mount('/dist', serve(path.join(__dirname, '../dist'))))

app.use(async (ctx) => {
  ctx.set('Content-Type', 'text/html')
  ctx.body = await readFile(path.join(__dirname, '../dist/index.html'))
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('http://localhost:'+PORT)
})
