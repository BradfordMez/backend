require('dotenv').config()

const pg = require('pg')

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './app/data/migrations'},
  seeds: { directory: './app/data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
}
}