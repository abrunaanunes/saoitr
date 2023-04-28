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

// Ocorrências
router.post('/occurrences', OccurrenceController.validate('create'), (req, res) => {
    OccurrenceController.create(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.put('/occurrences/:occurrenceId', OccurrenceController.validate('update'), (req, res) => {
    OccurrenceController.update(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.get('/occurrences/:occurrenceId', (req, res) => {
    OccurrenceController.show(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.delete('/occurrences/:occurrenceId', (req, res) => {
    OccurrenceController.delete(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})

module.exports = { router }