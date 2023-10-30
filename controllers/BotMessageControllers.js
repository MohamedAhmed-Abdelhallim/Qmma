const BotMessage = require('../models/BotMessage')

const create = async(req,res)=>{
    try {
        const botMessage =  await BotMessage.create(req.body)
        res.status(200).send(botMessage) 
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}

const find = async (req,res) =>{
    try {
        const  botMessage= await BotMessage.findByPk(req.params.botMessageID)
        if(botMessage) res.status(200).send(botMessage)
        else res.status(400).send("requested botMessage is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const botMessage = await BotMessage.findAll()
        res.status(200).send(botMessage)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.botMessageID) throw 3
        const botMessage = await BotMessage.destroy({
            where : {
                BotMessageID : req.body.botMessageID
            }
        })
        if(botMessage) res.status(200).send('botMessage deleted')
        else res.status(400).send("the requested botMessage is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("botMessage is not defined")
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