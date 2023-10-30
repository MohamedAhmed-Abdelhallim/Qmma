const Team = require('../models/Team')

const create = async(req,res)=>{
    try {
        const team = await Team.create(req.body)
        res.status(200).send(team)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async(req,res) =>{
    try {
        const team = await Team.findByPk(req.params.teamID)
        if(team) res.status(200).send(team)
        else res.status(400).send("requested team is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async (req,res) =>{
    try {
        const teams = await Team.findAll()
        res.status(200).send(teams)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if (!req.body.teamID) throw 3
        const team = await Team.destroy({
            where :{
                TeamID : req.body.teamID
            }
        })
        if(team) res.status(200).send('team deleted')
        else res.status(400).send("the requested team is not exist")
    } catch (error) {
        if (error === 3) res.status(400).send("teamID is not defined")
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