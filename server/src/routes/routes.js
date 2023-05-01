const express  = require("express")
const UserController = require("../controllers/UserController")
const OccurrenceController = require("../controllers/OccurrenceController")
const router = express.Router()
const { checkAuth } = require('../middleware/Auth')

// Login
router.post('/login', UserController.validate('login'), (req, res) => {
    UserController.login(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})

// Cadastrar
router.post('/users', UserController.validate('create'), (req, res) => {
    UserController.create(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.get('/users/:userId', checkAuth, UserController.validate('read'), (req, res) => {
    UserController.read(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.put('/users/:userId', checkAuth, UserController.validate('update'), (req, res) => {
    UserController.update(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.delete('/users/:userId', checkAuth,  UserController.validate('delete'), (req, res) => {
    UserController.delete(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})

// Ocorrências
router.get('occurrences', (req, res) => {
    OccurrenceController.index(req, res).catch(error => {
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.post('/occurrences', checkAuth, OccurrenceController.validate('create'), (req, res) => {
    OccurrenceController.create(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.get('/occurrences/:occurrenceId', checkAuth, OccurrenceController.validate('read'), (req, res) => {
    OccurrenceController.read(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.put('/occurrences/:occurrenceId', checkAuth, OccurrenceController.validate('update'), (req, res) => {
    OccurrenceController.update(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})
router.delete('/occurrences/:occurrenceId', checkAuth, OccurrenceController.validate('delete'), (req, res) => {
    OccurrenceController.delete(req, res).catch(error => {
        console.log('Erro no servidor: ', error)
        res.status(500).json({
            message: 'Erro no servidor.'
        })
    })
})

module.exports = { router }