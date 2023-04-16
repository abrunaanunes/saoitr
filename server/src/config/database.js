const mongoose = require('mongoose')
const express = require('express')

const app = express()
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

app.use(express.json())
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@projetoclienteservidor.2o5ao6l.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log('Conectou ao banco')
}).catch((err) => console.log(err))
