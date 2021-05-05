require('dotenv').config()

module.exports = {
  dbConnectionUri: process.env.DB_URI,
  migrationsDir: 'server/migrations',
  options: {
    useUnifiedTopology: true
  }
}
