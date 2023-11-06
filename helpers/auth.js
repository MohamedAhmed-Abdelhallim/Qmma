const jwt = require('jsonwebtoken')
const config = require('../configuration/config')

const createToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtMaxAge
    })
}

module.exports = {
    createToken
}