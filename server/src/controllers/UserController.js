const Users = require("../models/User")
const { body } = require("express-validator")
const { validationResult } = require("express-validator")

class UserController {
    static create = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        const {name, email, password} = res
        
        let user = new Users({
            name: name,
            email: email,
            password: password,
        })

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
        const { id } = req.params
        if(!id) {
            return res.status(400).json({
                message: "Por favor, informe um ID do usuário"
            })
        }

        try {
            const query = { id: id }
            const user = Users.findOne(query)

            if(!user) {
                return res.status(400).json({
                    message: "Essas credenciais não correspondem aos nossos registros."
                })
            }
            return res.status(200).send(user)
            
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
                            return Users.findOne({email: value}).then(user => {
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

module.exports = UserController