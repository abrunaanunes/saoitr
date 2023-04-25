import Users from "../models/User.js"
import { body } from "express-validator"

class UserController {
    static create = (req, res) => {
        req
        .getValidationResult() // to get the result of above validate fn
        .then(validationHandler())
        .then(() => {
            const data = req.body
        })

        let user = new Users(data);

        try {
            user.save()
            res.status(201).json({
                message: 'Usuário criado com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static show = (req, res) => {
        let user = new Users(req.body);

        try {
            user.save()
            res.status(201).json({
                message: 'Usuário criado com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static update = (req, res) => {
        let user = new Users(req.body);

        try {
            user.save()
            res.status(201).json({
                message: 'Usuário criado com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static delete = (req, res) => {
        let user = new Users(req.body);

        try {
            user.save()
            res.status(201).json({
                message: 'Usuário criado com sucesso'
            })
        } catch(error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static validate = (method) => {
        switch (method) {
        case 'create': {
                return [ 
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
                ]   
            }
        }
    }
}

export default UserController