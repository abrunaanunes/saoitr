import express from "express"
import database from "./src/config/database.js"
import "./src/routes/routes.js"
import expressValidator from 'express-validator'
const app = express()
app.use(express.json())

// app.use(expressValidator)

// database.on("error", console.log.bind(console, "Erro de conexão"))
// database.once("open", () => { console.log("Conexão realizada com sucesso") })

export default app