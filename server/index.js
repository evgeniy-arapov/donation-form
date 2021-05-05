require('dotenv').config()

const app = require('./app')

app.ready().then((app) => {
  const mongoose = require('mongoose')
  mongoose.connect(process.env.DB_URI, {
    poolSize: 5,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const port = process.env.API_PORT || 3000
  app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
  })
})
