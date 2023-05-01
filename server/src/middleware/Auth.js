const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({
            message: "Não autorizado"
        })
    }

    const secret = '24BRUNANUNES1234567'

    try {
        jwt.verify(totken, secret)
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Não autorizado"
        })
    }
}

module.exports = { checkAuth }