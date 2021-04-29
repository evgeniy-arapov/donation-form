const Koa = require('koa')

const app = new Koa()

require('./utils/webpack')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
