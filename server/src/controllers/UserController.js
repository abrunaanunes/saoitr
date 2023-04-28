const Users = require("../models/User")
const { body } = require("express-validator")
const { validationResult } = require("express-validator")

class UserController {
    static async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }
        const id = (await Users.countDocuments()) + 1
        const {name, email, password} = req.body
        
        let user = new Users({
            id: id,
            name: name,
            email: email,
            password: password,
        })

        await user.save()
        res.status(201).json({
            message: 'Usuário criado com sucesso.'
        })
    }

    static async show(req, res) {
        const { userId } = req.params
        if(!userId) {
            return res.status(400).json({
                message: "Por favor, informe um ID do usuário."
            })
        }

        const query = { id: userId }
        const user = await Users.findOne(query).exec()
        
        if(!user) {
            return res.status(400).json({
                message: "Essas credenciais não correspondem aos nossos registros.."
            })
        }

        return res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    static async update(req, res) {
        const { userId } = req.params
        if(!userId) {
            return res.status(400).json({
                message: "Por favor, informe um ID do usuário."
            })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        const query = { id: userId }
        const {name, email, password} = req.body
        const user = !password ? await Users.findOneAndUpdate(query, { name, email }, { new: true }) : await Users.findOneAndUpdate(query, { name, email, password }, { new: true })
        
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    static async delete(req, res) {
        const { userId } = req.params
        if(!userId) {
            return res.status(400).json({
                message: "Por favor, informe um ID do usuário."
            })
        }

        const query = { id: userId }
        await Users.findOneAndDelete(query)
        res.status(200).json({
            message: 'Usuário deletado com sucesso.'
        })
    }

    static validate(method) {
        switch (method) {
            case 'create':
                return [ 
                    body('name')
                        .exists().withMessage('O nome é obrigatório.')
                        .isLength({min: 2, max: 125}).withMessage('O nome deve ter no mínimo 2 e no máximo 125 caracteres.'),

                    body('email')
                        .exists().withMessage('O e-mail é obrigatório.')
                        .isEmail().withMessage('O e-mail precisa ser válido.')
                        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.'),
                        // .custom(async (value) => {
                        //     return await Users.findOne({email: value}).then(user => {
                        //     if (user) {
                        //         return Promise.reject('Este e-mail já está sendo utilizado.')
                        //     }
                        //     })
                        // }),

                    body('password')
                        .exists().withMessage('A senha é obrigatória.')
                        .isMD5()
                        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.'),
                ]   
            break
            case 'update':
                return [
                    body('name')
                        .exists().withMessage('O nome é obrigatório.')
                        .isLength({min: 2, max: 125}).withMessage('O nome deve ter no mínimo 2 e no máximo 125 caracteres.'),

                    body('email')
                        .exists().withMessage('O e-mail é obrigatório.')
                        .isEmail().withMessage('O e-mail precisa ser válido.')
                        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.'),
                        // .custom(async (value) => {
                        //     return await Users.findOne({email: value}).then(user => {
                        //     if (user) {
                        //         return Promise.reject('Este e-mail já está sendo utilizado.')
                        //     }
                        //     })
                        // }),
                    body('password')
                        .exists().withMessage('A senha é obrigatória.')
                        .optional(true, null)
                        .isMD5()
                        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.')
                ]
            break
        }
    }
}

module.exports = UserController