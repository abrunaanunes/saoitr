const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({
            message: "Não autorizado | não recebeu o token"
        })
    }

    // @TODO VERIFICAR SE O TOKEN ESTÁ NA BLACKLIST

    const secret = process.env.JWT_SECRET

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Não autorizado | token inválido"
        })
    }
}

module.exports = { checkAuth }