const Users = require("../models/User")
const { body, param } = require("express-validator")
const { validationResult } = require("express-validator")
const md5 = require('md5')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }
        const {email, password} = req.body
        
        const query = { email: email}
        const user = await Users.findOne(query).exec()
        
        if(!user) {
            return res.status(400).json({
                message: "Essas credenciais não correspondem aos nossos registros."
            })
        }

        // Check if password match
        const checkedPaasword = password == user.password ?? false

        if(!checkedPaasword) {
            return res.status(400).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- SENHA INCORRETA"
            })
        } 

        // Autenticação
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({
            id: user.id
        },
        secret)
        
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        })
    }

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
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    static async read(req, res) {
        const { userId } = req.params
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
        const query = { id: userId }
        await Users.findOneAndDelete(query)
        res.status(200)
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
                        .isMD5().withMessage('A senha não possui o formato MD5')
                        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.'),
                ]   
            case 'read': 
                return [
                    param('userId')
                        .exists().withMessage('Informe o ID do usuário')
                ]
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
                        .isMD5().withMessage('A senha não possui o formato MD5')
                        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.')
                ]
            case 'delete': 
                return [
                    param('userId')
                        .exists().withMessage('Informe o ID do usuário')
                ]
            case 'login':
                return [
                    body('email')
                        .exists().withMessage('O e-mail é obrigatório.')
                        .isEmail().withMessage('O e-mail precisa ser válido.')
                        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.'),

                    body('password')
                        .exists().withMessage('A senha é obrigatória.')
                        .isLength({min: 2, max: 125}).withMessage('A senha deve ter no mínimo 2 e no máximo 125 caracteres.')
                        .isMD5().withMessage('A senha não possui o formato MD5')
                ]
        }
    }
}

module.exports = UserController