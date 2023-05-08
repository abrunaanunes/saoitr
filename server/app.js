const { router } = require("./src/routes/routes.js")
const { database } = require("./src/config/database")
const express = require("express")
const expressValidator = require('express-validator')
const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:25000')
    res.setHeader('Access-Control-Allow-Methods', 'http://localhost:25000')
    res.setHeader('Access-Control-Allow-Headers', 'http://localhost:25000')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.use(router)


database.on("error", console.log.bind(console, "Connection error"))
database.once("open", () => { console.log("Successful connection") })


app.listen(PORT, console.log(`Server running on port ${PORT}`))

module.exports = { app }