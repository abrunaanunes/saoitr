const express  = require("express")
const UserController = require("../controllers/UserController.js")
const UserValidator = require('../validators/UserValidator')
const OccurrenceController = require("../controllers/OccurrenceController.js")
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Página inicial"
    })
})
router.post('/users', UserController.validate('create'), UserController.create)
router.put('/users/{userId}', UserController.update)
router.get('/users/{userId}', UserController.show)
router.delete('/users/{userId}', UserController.delete)

router.post('/occurrences', OccurrenceController.create)
router.put('/occurrences/{occurrenceId}', OccurrenceController.update)
router.get('/occurrences/{occurrenceId}', OccurrenceController.show)
router.delete('/occurrences/{occurrenceId}', OccurrenceController.delete)

module.exports = { router }