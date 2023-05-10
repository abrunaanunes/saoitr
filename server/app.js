const { router } = require('./src/routes/routes')
const { database } = require('./src/config/database')
const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const PORT = process.env.SERVER_PORT
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.use(router)


database.on('error', console.log.bind(console, 'Connection error'))
database.once('open', () => { console.log('Successful connection') })


app.listen(PORT, console.log(`Server running on port ${PORT}`))

module.exports = { app }