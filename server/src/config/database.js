const mongoose = require('mongoose')
require('dotenv').config()

const user = process.env.DB_USER
const pass = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT

mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}`)

let database = mongoose.connection

module.exports = { database }