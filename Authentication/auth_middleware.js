const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('jwt-token')

    if(!token) {
        return res.status(401).json({msg: 'NO TOKEN | AUTHORIZE DENIED. 😡'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwt_secret_key'));
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'catch error | auth_mddleware | 🖕🖕🖕'})
    }
}