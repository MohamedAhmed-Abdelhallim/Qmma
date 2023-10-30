const Bot = require('../models/Bot')

const create = async(req,res) =>{
    try {
        const bot =  await Bot.create(req.body)
        res.status(200).send(bot) 
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async (req,res) =>{
    try {
        const bot = await Bot.findByPk(req.params.botid)
        if(bot) res.status(200).send(bot)
        else res.status(400).send("requested bot is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const bots = await Bot.findAll()
        res.status(200).send(bots)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.botID) throw 3
        const bot = await Bot.destroy({
            where : {
                BotID : req.body.botID
            }
        })
        if(bot) res.status(200).send('bot deleted')
        else res.status(400).send("the requested bot is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("bot is not defined")
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