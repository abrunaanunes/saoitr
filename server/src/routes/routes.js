const express  = require("express")
const UserController = require("../controllers/UserController")
const OccurrenceController = require("../controllers/OccurrenceController")
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Página inicial"
    })
})

router.post('/users', UserController.validate('create'), (req, res) => {
    UserController.create(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.put('/users/:userId', UserController.validate('update'), (req, res) => {
    UserController.update(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.get('/users/:userId', (req, res) => {
    UserController.show(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.delete('/users/:userId', (req, res) => {
    UserController.delete(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})

router.post('/occurrences', OccurrenceController.create)
router.put('/occurrences/:occurrenceId', OccurrenceController.update)
router.get('/occurrences/:occurrenceId', OccurrenceController.show)
router.delete('/occurrences/:occurrenceId', OccurrenceController.delete)

module.exports = { router }