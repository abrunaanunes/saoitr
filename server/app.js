const { router } = require("./src/routes/routes.js")
const { database } = require("./src/config/database")
const express = require("express")
const expressValidator = require('express-validator')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(router)
// app.use(expressValidator)

database.on("error", console.log.bind(console, "Connection error"))
database.once("open", () => { console.log("Successful connection") })


app.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports = { app }