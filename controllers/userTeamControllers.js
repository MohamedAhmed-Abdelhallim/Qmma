const User = require('../models/User')
const UserTeam = require('../models/UserTeam')

const create = async(req,res ) =>{
    try {
        const userTeam = await UserTeam.create(req.body)
        res.status(200).send(userTeam)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async (req,res) =>{
    try {
        const userTeam = await UserTeam.findByPk(req.params.userteamid)
        if(userTeam) res.status(200).send(userTeam)
        else res.status(400).send("requested userTeam is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const userTeams = await UserTeam.findAll()
        res.status(200).send(userTeams)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.userTeamID) throw 3
        const userTeam = await UserTeam.destroy({
            where : {
                id : req.body.userTeamID
            }
        })
        if(userTeam) res.status(200).send('userTeam deleted')
        else res.status(400).send("the requested userTeam is not exist")
    } catch (error) {
        if (error === 3) res.status(400).send("userTeamID is not defined")
        else res.status(500).send("Internal Server Error")
    }
}

const errorHandler = (error) => {
    if (error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
        return 'Validation Error ,, one or more of the data dont exist'
    else if (error.hasOwnProperty('name') && error.name === 'SequelizeValidationError'){
            let ValidationErrorItem = error.errors[0]
            if (ValidationErrorItem.validatorKey === 'is_null'){
                return `${ValidationErrorItem.path} cannot be empty`
            }
    }else if(error.hasOwnProperty('name') && error.name === 'SequelizeUniqueConstraintError'){
            return `${error.errors[0].value} is already exist`
    }
}

module.exports = {
    create,
    find,
    findAll,
    remove
}