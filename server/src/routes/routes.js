const express = require('express')
const app = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Meu endpoint em NODE!!!!!"
    })
})
app.post('/users',
    body('name')
        .isLength({min: 2, max: 125}).withMessage('O nome deve ter no mínimo 2 e no máximo 125 caracteres.'),

    body('email')
        .isEmail().withMessage('O e-mail precisa ser válido.')
        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.')
        .custom(value => {
            return User.findUserByEmail(value).then(user => {
              if (user) {
                return Promise.reject('Este e-mail já está sendo utilizado.')
              }
            })
        }),

    body('password')
        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.'),
    
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
            // return res.status(400).json({ message: errors.array()[0].msg })
        }

        // Hash senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Criar o usuário
        const user = new User({
            name,
            email, 
            password: passwordHash
        })

        try {
            await user.save()
            res.status(201).json({
                message: 'Usuário criado com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    },
)