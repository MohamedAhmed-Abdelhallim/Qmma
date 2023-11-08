const User = require('../models/User')
const Company = require('../models/Company')
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
        const user = await User.destroy({
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

// const register = async(req,res) =>{
//     const user = await User.findByPk(req.body.id)
//     if(user){

//     }
// }

const login = async (req, res) => {
    const user = await User.findOne({
        where: {
            UserName: req.body.UserName
        },
        attributes :['NameArabic' , 'NameEnglish' , 'UserPassword' , 'isAdmin']
    })
    if (user == null) res.status(400).send("user not found")
    else {
        const auth = await bcrypt.compare(req.body.password, user.UserPassword)
        if (auth) {
            const token = jwtControllers.createToken(user.UserName)
            console.log(token)
            let companies = null;
            if(user.isAdmin){
                 companies = await Company.findAll({
                    attributes : ['NameArabic' , 'NameEnglish' , 'CompanyID']
                })
            }
            console.log(JSON.stringify(companies))
            res.status(200).json([user , companies])
        }
        else res.status(400).send(' Incorrect Password ')
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
    createAdmin
}