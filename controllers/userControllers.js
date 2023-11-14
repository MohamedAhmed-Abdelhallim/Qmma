const User = require('../models/User')
const Company = require('../models/Company')
const UserChannel = require('../models/UserChannel')
const userHelperFun = require('../helpers/user')
const bcrypt = require('bcrypt')
const jwtControllers = require('../helpers/auth')

const create = async (req, res) => {
    const { creationUserID } = req.body
    const adminUser = await User.findByPk(creationUserID)
    if (adminUser && adminUser.isAdmin) {
        let user = req.body
        const salt = await bcrypt.genSalt();
        user.UserPassword = await bcrypt.hash(user.UserPassword, salt)
        try {
            user = await User.create(user)
            res.status(200).send(user)
        } catch (error) {
            let errorMessage = errorHandler(error)
            if (errorMessage) res.status(400).send(errorMessage)
            else {
                console.log(error)
                res.sendStatus(500)
            }
        }
    } else res.status(403).send('Not Authorized')
}

const createAdmin = async (req, res) => {
    let adminUser = req.body
    const salt = await bcrypt.genSalt();
    adminUser.UserPassword = await bcrypt.hash(adminUser.UserPassword, salt)
    adminUser = await User.create(req.body)
    res.status(200).send(adminUser)
}

const find = async (req, res) => {
    await User.findByPk(req.params['userID'])
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log(err)
            res.status(500).send('error')
        })
}

//need to apply pagination
const findAll = async (req, res) => {
    await User.findAll()
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log(err)
            res.status(500).send('error')
        })
}

const remove = async (req, res) => {
    try {
        if (!req.body.userID) throw 3
        const user = await User.update({ Active: false }, {
            where: {
                userID: req.body.userID
            }
        })
        if (user) res.status(200).send('user deleted')
        else res.status(400).send("the requested user is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("user is not defined")
        else res.status(500).send("Internal Server Error")
    }
}

const update = async (req, res) => {
    try {
        const { userID } = req.body
        if (req.body.hasOwnProperty('UserPassword')) {
            let userPassword = req.body.UserPassword
            userPassword = await jwtControllers.hashPassword(userPassword)
            req.body.UserPassword = userPassword
            console.log(req.body)
        }
        const user = await User.update(req.body, {
            where: {
                UserID: userID
            }
        }
        )
        if (user[0] === 0) res.status(400).send('Not Found')
        else res.status(200).send('User Successfully updated')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}


const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                UserName: req.body.UserName
            },
            attributes: ['NameArabic', 'NameEnglish', 'UserPassword', 'isAdmin','CompanyID']
        })
        if (user == null) res.status(400).send("user not found")
        else {
            const auth = await bcrypt.compare(req.body.password, user.UserPassword)
            if (auth) {
                const token = jwtControllers.createToken(user.UserName)
                console.log(token)
                let companies = null;
                let companyUsers = null;
                if (user.isAdmin) {
                    companies = await Company.findAll({
                        attributes: ['NameArabic', 'NameEnglish', 'CompanyID']
                    });
                    if(user.CompanyID){
                        companyUsers = await User.findAll({
                            where: {CompanyID: user.CompanyID},
                            attributes : ['NameArabic', 'NameEnglish','UserMail' , 'UserPhone','Active' , 'Enabled']
                        })
                    }
                }
                console.log(JSON.stringify(companies))
                res.status(200).json([user, companies, companyUsers])
            }
            else res.status(400).send(' Incorrect Password ')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('error')
    }
}

const addChannel = async (req, res) => {
    try {
        await UserChannel.create(req.body)
        const userChannels = await userHelperFun.getUserChannels(req.body.UserID)
        res.status(200).send(userChannels)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}

const getChannels = async (req, res) => {
    try {
        const { UserID } = req.body
        const userChannels = await userHelperFun.getUserChannels(UserID)
        res.status(200).send(userChannels)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

const removeChannel = async (req, res) => {
    try {
        const removedChannels = await UserChannel.destroy({
            where: {
                UserID: req.body.UserID,
                ChannelID: req.body.ChannelID
            }
        })
        if (removedChannels) res.status(200).send('Channel deleted successfully')
        else res.status(200).send('data not found')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

const updateChannel = async (req, res) => {
    try {
        const userChannel = await UserChannel.update(req.body, {
            where: {
                UserID: req.body.UserID,
                ChannelID: req.body.ChannelID
            }
        })
        if (userChannel[0] === 0) res.status(400).send('Not Found')
        else res.status(200).send('Channel Successfully updated')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}





const errorHandler = (error) => {
    if (error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
        return 'Validation Error ,, one or more of the data dont exist'
    else if (error.hasOwnProperty('name') && error.name === 'SequelizeValidationError') {
        let ValidationErrorItem = error.errors[0]
        if (ValidationErrorItem.validatorKey === 'is_null') {
            return `${ValidationErrorItem.path} cannot be empty`
        }
    } else if (error.hasOwnProperty('name') && error.name === 'SequelizeUniqueConstraintError') {
        return `${error.errors[0].value} is already exist`
    }
}

module.exports = {
    create,
    find,
    findAll,
    remove,
    login,
    createAdmin,
    update,
    addChannel,
    getChannels,
    removeChannel,
    updateChannel
}