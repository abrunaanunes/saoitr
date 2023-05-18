const Users = require("../models/User")
const { body, param } = require("express-validator")
const { validationResult } = require("express-validator")
const md5 = require('md5')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static async login(req, res) {
        // CAMPOS VÁLIDOS?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }
        const {email, password} = req.body
        
        // O USUÁRIO EXISTE?
        const query = { email: email}
        const user = await Users.findOne(query).exec()
        
        if(!user) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros."
            })
        }

        const secret = process.env.JWT_SECRET
       
        // O HASH RECEBIDO É IGUAL AO DO BANCO?
        const checkedPaasword = password == user.password ?? false
        if(!checkedPaasword) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- SENHA INCORRETA"
            })
        } 

        // ASSINATURA DO TOKEN
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1H PARA EXPIRAR
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

    static async logout(req, res) {
        // FOI INFORMADO UM ID?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        // O USUÁRIO EXISTE?
        const { id } = req.params
        const query = { id: id }
        const user = await Users.findOne(query).exec()
        if(!user) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros."
            })
        }
        
        // ID DA URL CORRESPONDE AO ID SOLICITANTE?
        const secret = process.env.JWT_SECRET
        const bearerHeader = req.headers['authorization']
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(bearerToken, secret)

        if(decoded.id != user.id) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros.  -- ID NÃO CORRESPONDE AO TOKEN"
            })
        }

        // ADICIONA O TOKEN NO ARRAY DE BLACKLIST
        blacklist.push(bearerToken)
        console.log(blacklist)


        res.status(200).json({
            message: "Logout realizado com sucesso."
        })
    }

    static async create(req, res) {
        // CAMPOS VÁLIDOS?
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
        // CAMPOS VÁLIDOS?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        const { userId } = req.params
        const query = { id: userId }
        const user = await Users.findOne(query).exec()
        
        if(!user) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros."
            })
        }

        // ID DA URL CORRESPONDE AO ID SOLICITANTE?
        const secret = process.env.JWT_SECRET
        const bearerHeader = req.headers['authorization']
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(bearerToken, secret)

        if(decoded.id != user.id) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros.  -- ID NÃO CORRESPONDE AO TOKEN"
            })
        }

        // O TOKEN ESTÁ BLOQUEADO?
        console.error('global: ', blacklist)
        const isTokenBlocked = blacklist.includes(bearerToken) ?? false
        
        if(isTokenBlocked) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- TOKEN BLOQUEADO"
            })
        }
        

        return res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    static async update(req, res) {
        // CAMPOS VÁLIDOS?
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        // ID DA URL CORRESPONDE AO ID SOLICITANTE?
        const secret = process.env.JWT_SECRET
        const bearerHeader = req.headers['authorization']
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(bearerToken, secret)

        if(decoded.id != user.id) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros.  -- ID NÃO CORRESPONDE AO TOKEN"
            })
        }

        // O TOKEN ESTÁ BLOQUEADO?
        const isTokenBlocked = blacklist.includes(bearerToken) ?? false
        
        if(isTokenBlocked) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- TOKEN BLOQUEADO"
            })
        }

        const { userId } = req.params
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
            })
        }

        // ID DA URL CORRESPONDE AO ID SOLICITANTE?
        const secret = process.env.JWT_SECRET
        const bearerHeader = req.headers['authorization']
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jwt.verify(bearerToken, secret)

        if(decoded.id != user.id) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- ID NÃO CORRESPONDE AO TOKEN"
            })
        }

        // O TOKEN ESTÁ BLOQUEADO?
        const isTokenBlocked = blacklist.includes(bearerToken) ?? false
        
        if(isTokenBlocked) {
            return res.status(401).json({
                message: "Essas credenciais não correspondem aos nossos registros. -- TOKEN BLOQUEADO"
            })
        }

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
                        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.')
                        .custom(async (value) => {
                            return await Users.findOne({email: value}).then(user => {
                            if (user) {
                                return Promise.reject('Este e-mail já está sendo utilizado.')
                            }
                            })
                        }),

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
                    param('userId')
                        .exists().withMessage('Informe o ID do usuário'),
                    body('name')
                        .exists().withMessage('O nome é obrigatório.')
                        .isLength({min: 2, max: 125}).withMessage('O nome deve ter no mínimo 2 e no máximo 125 caracteres.'),

                    body('email')
                        .exists().withMessage('O e-mail é obrigatório.')
                        .isEmail().withMessage('O e-mail precisa ser válido.')
                        .isLength({min: 2, max: 125}).withMessage('O email deve ter no mínimo 10 e no máximo 125 caracteres.')
                        .custom(async (value) => {
                            return await Users.findOne({email: value}).then(user => {
                            if (user) {
                                return Promise.reject('Este e-mail já está sendo utilizado.')
                            }
                            })
                        }),
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
            case 'logout': 
                return [
                    body('id')
                        .exists().withMessage('Informe o ID do usuário')
                ]
        }
    }
}

module.exports = UserController