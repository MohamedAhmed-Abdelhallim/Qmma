const jwt = require('jsonwebtoken')
const config = require('../configuration/config')
const bcrypt = require('bcrypt')

const createToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtMaxAge
    })
}

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt)
}

module.exports = {
    createToken,
    hashPassword
}