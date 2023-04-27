const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@projetoclienteservidor.gcvzies.mongodb.net/?retryWrites=true&w=majority`)
let database = mongoose.connection

module.exports = { database }