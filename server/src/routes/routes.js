import express from "express"
import UserController from "../controllers/UserController.js"
import OccurrenceController from "../controllers/OccurrenceController.js"
const app = express.Router()

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Página inicial"
    })
})
app.post('/users', UserController.validate('create'), UserController.create)
app.put('/users/{userId}', UserController.update)
app.get('/users/{userId}', UserController.show)
app.delete('/users/{userId}', UserController.delete)

app.post('/occurrences', OccurrenceController.create)
app.put('/occurrences/{occurrenceId}', OccurrenceController.update)
app.get('/occurrences/{occurrenceId}', OccurrenceController.show)
app.delete('/occurrences/{occurrenceId}', OccurrenceController.delete)